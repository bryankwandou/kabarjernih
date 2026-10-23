// Checks the built site in out/ against the promises the README makes.
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT = new URL("../out/", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1");
const articles = JSON.parse(readFileSync(new URL("../data/articles.json", import.meta.url), "utf8"));
const fails = [];
const check = (ok, msg) => { if (!ok) fails.push(msg); };

const html = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith(".html")) html.push(p);
  }
})(OUT);

for (const ui of ["id", "en"]) {
  for (const a of articles) check(existsSync(join(OUT, ui, "a", a.id, "index.html")), `missing page ${ui}/a/${a.id}`);
}

const internal = new Set();
let pages = 0;
for (const p of html) {
  const s = readFileSync(p, "utf8");
  pages++;
  check(!/counter\.theconversation\.com/.test(s), `tracker pixel in ${p}`);
  check(!/googletagmanager|google-analytics|doubleclick|adsbygoogle|facebook\.net/.test(s), `ad/analytics script in ${p}`);
  for (const m of s.matchAll(/<script[^>]+src="([^"]+)"/g)) check(m[1].startsWith("/"), `external script ${m[1]} in ${p}`);
  for (const m of s.matchAll(/href="(\/[^"#?]*)"/g)) internal.add(m[1]);
}

for (const href of internal) {
  const f = href.endsWith("/") ? join(OUT, href, "index.html") : join(OUT, href);
  check(existsSync(f), `broken internal link ${href}`);
}

const search = JSON.parse(readFileSync(join(OUT, "search.json"), "utf8"));
check(search.length === articles.length, `search index has ${search.length}, data has ${articles.length}`);
check(!("body" in search[0]), "search index leaks article bodies");

console.log(`${pages} pages, ${internal.size} internal links, ${articles.length} articles, search ${(JSON.stringify(search).length / 1024).toFixed(0)} KB`);
if (fails.length) { console.log(`\n${fails.length} FAILED:\n` + [...new Set(fails)].slice(0, 30).join("\n")); process.exit(1); }
console.log("all checks passed");
