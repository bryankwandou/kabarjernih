"use client";
import { useEffect, useMemo, useState } from "react";

// Saved articles and text size live in this browser only. Storage can throw
// (private mode, blocked site data), so every access is guarded.
const KEY = "kj:saved";
type Saved = { id: string; title: string; lang: string; source: string; date: string };

function readSaved(): Saved[] {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
function writeSaved(list: Saved[]) {
  try { localStorage.setItem(KEY, JSON.stringify(list)); } catch {}
}

export function SaveButton({ item, labels }: { item: Saved; labels: { save: string; unsave: string } }) {
  const [on, setOn] = useState(false);
  useEffect(() => setOn(readSaved().some((s) => s.id === item.id)), [item.id]);
  const toggle = () => {
    const list = readSaved().filter((s) => s.id !== item.id);
    if (!on) list.unshift(item);
    writeSaved(list);
    setOn(!on);
  };
  return (
    <button type="button" className="btn" aria-pressed={on} onClick={toggle}>
      {on ? labels.unsave : labels.save}
    </button>
  );
}

export function TextSize({ label }: { label: string }) {
  const steps = [0.9, 1, 1.12, 1.25];
  const [i, setI] = useState(1);
  useEffect(() => {
    try { const v = Number(localStorage.getItem("kj:scale")); if (steps.includes(v)) setI(steps.indexOf(v)); } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.style.setProperty("--scale", String(steps[i]));
    try { localStorage.setItem("kj:scale", String(steps[i])); } catch {}
  }, [i]);
  return (
    <span className="tools" role="group" aria-label={label}>
      <button type="button" className="btn" onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0} aria-label={`${label} −`}>A−</button>
      <button type="button" className="btn" onClick={() => setI(Math.min(steps.length - 1, i + 1))} disabled={i === steps.length - 1} aria-label={`${label} +`}>A+</button>
    </span>
  );
}

export function SavedList({ ui, empty }: { ui: string; empty: string }) {
  const [list, setList] = useState<Saved[] | null>(null);
  useEffect(() => setList(readSaved()), []);
  if (list === null) return null;
  if (!list.length) return <p className="empty">{empty}</p>;
  return (
    <ol className="list" style={{ listStyle: "none", padding: 0 }}>
      {list.map((s) => (
        <li key={s.id} className="story" style={{ gridTemplateColumns: "1fr auto" }}>
          <div>
            <div className="meta">{s.source}</div>
            <h3 lang={s.lang}><a href={`/${ui}/a/${s.id}/`}>{s.title}</a></h3>
          </div>
          <button type="button" className="btn" onClick={() => { const n = list.filter((x) => x.id !== s.id); writeSaved(n); setList(n); }}>×</button>
        </li>
      ))}
    </ol>
  );
}

type Entry = { id: string; t: string; s: string; a: string; l: string; src: string; d: string; tp: string; c: string[] };

const fold = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");

export function Search({ ui, labels, langs, topics, countries }: {
  ui: string;
  labels: { ph: string; empty: string; hint: string; all: string; articles: string; allTopics: string; allCountries: string };
  langs: Record<string, string>;
  topics: Record<string, string>;
  countries: Record<string, string>;
}) {
  const [index, setIndex] = useState<Entry[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [q, setQ] = useState("");
  const [lang, setLang] = useState("");
  const [topic, setTopic] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    setQ(p.get("q") ?? "");
    setLang(p.get("lang") ?? "");
    setTopic(p.get("topik") ?? "");
    setCountry((p.get("negara") ?? "").toUpperCase());
    fetch("/search.json").then((r) => (r.ok ? r.json() : Promise.reject())).then(setIndex).catch(() => setFailed(true));
  }, []);

  useEffect(() => {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (lang) p.set("lang", lang);
    if (topic) p.set("topik", topic);
    if (country) p.set("negara", country.toLowerCase());
    history.replaceState(null, "", p.size ? `?${p}` : location.pathname);
  }, [q, lang, topic, country]);

  // A filter alone is enough to list results; text needs two letters.
  const active = q.trim().length >= 2 || !!(lang || topic || country);

  const hits = useMemo(() => {
    if (!index || !active) return [];
    const terms = q.trim().length >= 2 ? fold(q).split(/\s+/).filter(Boolean) : [];
    return index
      .filter((e) => (!lang || e.l === lang) && (!topic || e.tp === topic) && (!country || e.c?.includes(country)))
      .map((e) => {
        const title = fold(e.t), rest = fold(`${e.s} ${e.a} ${e.src}`);
        let score = 0;
        for (const term of terms) {
          if (title.includes(term)) score += 3;
          else if (rest.includes(term)) score += 1;
          else return null;
        }
        return { e, score };
      })
      .filter((x): x is { e: Entry; score: number } => !!x)
      .sort((a, b) => b.score - a.score || b.e.d.localeCompare(a.e.d))
      .slice(0, 60);
  }, [index, q, lang, topic, country, active]);

  return (
    <div>
      <form className="search-box" role="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="q" className="skip">{labels.ph}</label>
        <input id="q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={labels.ph} autoFocus autoComplete="off" />
        <select value={lang} onChange={(e) => setLang(e.target.value)} aria-label={labels.all}>
          <option value="">{labels.all}</option>
          {Object.entries(langs).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select value={topic} onChange={(e) => setTopic(e.target.value)} aria-label={labels.allTopics}>
          <option value="">{labels.allTopics}</option>
          {Object.entries(topics).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select value={country} onChange={(e) => setCountry(e.target.value)} aria-label={labels.allCountries}>
          <option value="">{labels.allCountries}</option>
          {Object.entries(countries).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </form>
      <p className="mono muted" aria-live="polite">
        {failed ? "Index gagal dimuat / failed to load." : !index ? "…" : !active ? labels.hint : `${hits.length} ${labels.articles}`}
      </p>
      {index && active && !hits.length && <p className="empty">{labels.empty}</p>}
      <ol className="list" style={{ listStyle: "none", padding: 0 }}>
        {hits.map(({ e }) => (
          <li key={e.id} className="story" style={{ gridTemplateColumns: "1fr" }}>
            <div>
              <div className="meta"><span>{e.src}</span><span className="sep" /><span>{langs[e.l]}</span><span className="sep" /><time dateTime={e.d}>{e.d.slice(0, 10)}</time></div>
              <h3 lang={e.l} dir={e.l === "ar" ? "rtl" : "ltr"}><a href={`/${ui}/a/${e.id}/`}>{e.t}</a></h3>
              <p lang={e.l} dir={e.l === "ar" ? "rtl" : "ltr"}>{e.s}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
