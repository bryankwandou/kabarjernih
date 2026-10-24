import { readFileSync } from "node:fs";
import { join } from "node:path";

export type Article = {
  id: string;
  title: string;
  summary: string;
  body: string;
  image: string | null;
  author: string;
  date: string;
  lang: string;
  topic: string;
  tags: string[];
  countries: string[];
  minutes: number;
  url: string;
  source: string;
  sourceName: string;
  license: string;
  licenseUrl: string;
};

export type Card = Omit<Article, "body" | "tags">;

let cache: Article[] | null = null;

// Read once per build. The JSON is never shipped to the browser whole.
export function all(): Article[] {
  if (!cache) cache = JSON.parse(readFileSync(join(process.cwd(), "data", "articles.json"), "utf8"));
  return cache!;
}

export const card = ({ body, tags, ...rest }: Article): Card => rest;
export const byId = (id: string) => all().find((a) => a.id === id);
export const byTopic = (topic: string) => all().filter((a) => a.topic === topic);
export const byLang = (lang: string) => all().filter((a) => a.lang === lang);

export const byCountry = (code: string) => all().filter((a) => a.countries?.includes(code));

export function countryCounts() {
  const m = new Map<string, number>();
  for (const a of all()) for (const c of a.countries ?? []) m.set(c, (m.get(c) ?? 0) + 1);
  return [...m].sort((a, b) => b[1] - a[1]);
}

export function countBy<K extends "topic" | "lang" | "sourceName">(key: K) {
  const m = new Map<string, number>();
  for (const a of all()) m.set(a[key], (m.get(a[key]) ?? 0) + 1);
  return m;
}

// Front page: lead with the newest story that has a picture, then keep any
// single source from crowding the top of the page.
export function frontPage() {
  const list = all();
  const lead = list.find((a) => a.image) ?? list[0];
  const rest = list.filter((a) => a !== lead);
  const perSource = new Map<string, number>();
  const top: Article[] = [];
  for (const a of rest) {
    const n = perSource.get(a.source) ?? 0;
    if (n >= 2) continue;
    perSource.set(a.source, n + 1);
    top.push(a);
    if (top.length === 12) break;
  }
  return { lead, top };
}

export function related(a: Article, n = 4) {
  return all().filter((b) => b.id !== a.id && b.topic === a.topic).slice(0, n);
}

export const lastUpdated = () => all().reduce((m, a) => (a.date > m ? a.date : m), "");
