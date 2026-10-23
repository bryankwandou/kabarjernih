// Pulls every source in sources.mjs, cleans the HTML and writes data/articles.json.
// Runs at build time and from the scheduled GitHub Action, never per visitor,
// so reading the site costs no server time at all.
import { XMLParser } from "fast-xml-parser";
import sanitizeHtml from "sanitize-html";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { SOURCES } from "./sources.mjs";

const OUT = new URL("../data/articles.json", import.meta.url);
const KEEP_DAYS = 45;
const PER_SOURCE = 60;

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@", textNodeName: "#text", cdataPropName: false });

const text = (v) => {
  if (v == null) return "";
  if (typeof v === "string" || typeof v === "number") return String(v);
  if (Array.isArray(v)) return text(v[0]);
  return text(v["#text"] ?? "");
};
const list = (v) => (v == null ? [] : Array.isArray(v) ? v : [v]);

// Hosts that only exist to count readers. Dropped from every article body.
const TRACKERS = /counter\.theconversation\.com|feeds\.feedburner|pixel|\/stat(s)?\?|doubleclick|google-analytics|scorecardresearch/i;

function clean(html) {
  return sanitizeHtml(html, {
    allowedTags: ["p", "a", "em", "strong", "b", "i", "u", "blockquote", "q", "cite", "ul", "ol", "li", "h2", "h3", "h4", "figure", "figcaption", "img", "br", "hr", "sup", "sub", "table", "thead", "tbody", "tr", "th", "td", "span", "small"],
    allowedAttributes: { a: ["href", "title"], img: ["src", "alt", "width", "height"], td: ["colspan"], th: ["colspan"] },
    allowedSchemes: ["https", "http", "mailto"],
    exclusiveFilter: (f) =>
      (f.tag === "img" && (!f.attribs.src || TRACKERS.test(f.attribs.src) || f.attribs.width === "1")) ||
      (f.tag === "p" && !f.text.trim() && !f.mediaChildren?.length),
    transformTags: {
      a: (tag, attribs) => ({ tagName: "a", attribs: { ...attribs, rel: "noopener noreferrer nofollow", target: "_blank" } }),
      img: (tag, attribs) => ({ tagName: "img", attribs: { ...attribs, loading: "lazy", decoding: "async", referrerpolicy: "no-referrer" } }),
    },
  })
    .replace(/<p>\s*(<br\s*\/?>\s*)*<\/p>/g, "")
    .trim();
}

const plain = (html) =>
  sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&#8220;|&ldquo;/g, "“")
    .replace(/&#8221;|&rdquo;/g, "”")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&[a-z]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function firstImage(html) {
  for (const m of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
    if (!TRACKERS.test(m[1]) && !/\.gif(\?|$)/i.test(m[1])) return m[1].replace(/&amp;/g, "&");
  }
  return null;
}

function summarize(s, max = 260) {
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const end = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("。"));
  return (end > 120 ? cut.slice(0, end + 1) : cut.replace(/\s+\S*$/, "") + "…").trim();
}

// Topic sorting. Keywords cover the feed languages because tags arrive untranslated.
const TOPICS = [
  ["lingkungan", /climate|environment|iklim|lingkungan|clima|climat|umwelt|medio ambiente|meio ambiente|environnement|biodivers|forest|hutan|ocean|laut|energy|energi|pollution|polusi|drought|flood|banjir|wildlife|مناخ|بيئة|環境|気候/i],
  ["sains", /science|sains|ilmu|ciencia|ciência|science|wissenschaft|space|nasa|astronom|physics|fisika|biology|biologi|mars|moon|bulan|artemis|research|riset|penelitian|علوم|科学|宇宙/i],
  ["kesehatan", /health|kesehatan|salud|saúde|santé|gesundheit|medic|disease|penyakit|vaccine|vaksin|mental|hospital|cancer|kanker|virus|nutrition|gizi|صحة|健康|医療/i],
  ["teknologi", /technolog|teknologi|tecnolog|digital|internet|artificial intelligence|\bai\b|kecerdasan buatan|software|cyber|siber|data|privacy|privasi|social media|media sosial|تكنولوجيا|技術|デジタル/i],
  ["ekonomi", /econom|ekonomi|economía|economia|économie|wirtschaft|business|bisnis|finance|keuangan|market|pasar|trade|perdagangan|labou?r|tenaga kerja|inflation|inflasi|tax|pajak|اقتصاد|経済/i],
  ["politik", /politic|politik|política|politique|election|pemilu|elección|eleição|élection|government|pemerintah|protest|demo|war|perang|guerra|guerre|krieg|human rights|hak asasi|law|hukum|democra|demokrasi|سياسة|政治|選挙/i],
  ["budaya", /culture|budaya|cultura|kultur|art|seni|arte|music|musik|film|literat|sastra|language|bahasa|idioma|langue|sprache|history|sejarah|religion|agama|sport|olahraga|ثقافة|文化/i],
];

function topicOf(tags, title) {
  const hay = `${tags.join(" ")} ${title}`;
  for (const [id, re] of TOPICS) if (re.test(hay)) return id;
  return "dunia";
}

function readingMinutes(s, lang) {
  // CJK text has no spaces, so count characters for Japanese instead of words.
  if (lang === "ja") return Math.max(1, Math.round(s.length / 500));
  return Math.max(1, Math.round(s.split(/\s+/).length / 220));
}

function normalizeRss(item) {
  const html = text(item["content:encoded"]) || text(item.description);
  return {
    title: plain(text(item.title)),
    link: text(item.link) || text(item.guid),
    author: plain(text(item["dc:creator"]) || text(item.author)),
    date: text(item.pubDate) || text(item["dc:date"]),
    tags: list(item.category).map((c) => plain(text(c))).filter(Boolean),
    html,
    summaryHtml: text(item.description),
    media: list(item["media:content"]).map((m) => m?.["@url"]).find(Boolean) || list(item.enclosure).map((m) => m?.["@type"]?.startsWith("image") && m["@url"]).find(Boolean) || null,
  };
}

function normalizeAtom(entry) {
  const links = list(entry.link);
  const alt = links.find((l) => !l["@rel"] || l["@rel"] === "alternate") || links[0];
  return {
    title: plain(text(entry.title)),
    link: alt?.["@href"] || text(entry.id),
    author: list(entry.author).map((a) => plain(text(a.name))).filter(Boolean).join(", "),
    date: text(entry.published) || text(entry.updated),
    tags: list(entry.category).map((c) => c?.["@term"] || "").filter(Boolean),
    html: text(entry.content),
    summaryHtml: text(entry.summary),
    media: null,
  };
}

async function get(url, tries = 2) {
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(url, {
        headers: { "user-agent": "KabarJernih/0.1 (+https://github.com/bryankwandou/kabarjernih)", accept: "application/rss+xml, application/atom+xml, text/xml" },
        signal: AbortSignal.timeout(45_000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (e) {
      if (i >= tries) throw e;
    }
  }
}

async function fetchSource(src) {
  const doc = parser.parse(await get(src.url));
  const raw = doc.rss ? list(doc.rss.channel?.item).map(normalizeRss) : list(doc.feed?.entry).map(normalizeAtom);

  return raw.slice(0, PER_SOURCE).flatMap((r) => {
    const body = clean(r.html || r.summaryHtml || "");
    const bodyText = plain(body);
    const date = new Date(r.date);
    if (!r.title || !r.link || isNaN(date) || bodyText.length < 200) return [];
    const id = createHash("sha1").update(r.link).digest("hex").slice(0, 10);
    const summary = summarize(plain(r.summaryHtml || "") || bodyText);
    return [{
      id,
      title: r.title,
      summary,
      body,
      image: r.media || firstImage(body),
      author: r.author || src.name,
      date: date.toISOString(),
      lang: src.lang,
      topic: topicOf(r.tags, `${r.title} ${summary}`),
      tags: r.tags.slice(0, 6),
      minutes: readingMinutes(bodyText, src.lang),
      url: r.link,
      source: src.id,
      sourceName: src.edition ? `${src.name} ${src.edition}` : src.name,
      license: src.license,
      licenseUrl: src.licenseUrl,
    }];
  });
}

async function main() {
  let previous = [];
  try { previous = JSON.parse(await readFile(OUT, "utf8")); } catch {}

  const results = await Promise.allSettled(SOURCES.map(fetchSource));
  const fresh = [];
  results.forEach((r, i) => {
    const s = SOURCES[i];
    if (r.status === "fulfilled") { fresh.push(...r.value); console.log(`ok   ${s.id.padEnd(10)} ${r.value.length}`); }
    else console.log(`FAIL ${s.id.padEnd(10)} ${r.reason?.message}`);
  });

  // Keep older articles that dropped off the feeds, so one broken source never empties a section.
  const byId = new Map(previous.map((a) => [a.id, a]));
  for (const a of fresh) byId.set(a.id, a);
  // Re-sort older entries too, so a change to TOPICS applies to the whole archive.
  for (const a of byId.values()) a.topic = topicOf(a.tags, `${a.title} ${a.summary}`);
  const cutoff = Date.now() - KEEP_DAYS * 864e5;
  const seenTitles = new Set();
  const all = [...byId.values()]
    .filter((a) => new Date(a.date).getTime() > cutoff)
    .sort((a, b) => b.date.localeCompare(a.date))
    .filter((a) => {
      const k = `${a.lang}:${a.title.toLowerCase()}`;
      if (seenTitles.has(k)) return false; // same story syndicated across editions
      seenTitles.add(k);
      return true;
    });

  if (all.length < 50) throw new Error(`Only ${all.length} articles; refusing to overwrite data/articles.json`);
  await mkdir(new URL("../data/", import.meta.url), { recursive: true });
  await writeFile(OUT, JSON.stringify(all));
  console.log(`\n${all.length} articles written (${fresh.length} fetched now)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
