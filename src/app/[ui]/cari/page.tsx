import type { Metadata } from "next";
import { Masthead, Footer } from "@/components/Chrome";
import { Search } from "@/components/Client";
import { countBy, countryCounts } from "@/lib/data";
import { LANGS, TOPICS, countryName, t, topicName, type Ui } from "@/lib/i18n";

export const metadata: Metadata = { title: "Cari / Search" };

export default async function SearchPage({ params }: { params: Promise<{ ui: Ui }> }) {
  const { ui } = await params;
  const d = t(ui);
  const present = countBy("lang");
  const langs = Object.fromEntries(Object.entries(LANGS).filter(([l]) => present.has(l)).map(([l, v]) => [l, v.name]));
  const topics = Object.fromEntries(TOPICS.map((tp) => [tp, topicName(ui, tp)]));
  const countries = Object.fromEntries(
    countryCounts().map(([c]) => [c, countryName(ui, c)] as const).sort((a, b) => a[1].localeCompare(b[1], ui)),
  );
  return (
    <>
      <Masthead ui={ui} path="cari/" current="cari" />
      <main id="isi" className="wrap">
        <header className="page-head"><h1>{d.search}</h1></header>
        <Search
          ui={ui}
          langs={langs}
          topics={topics}
          countries={countries}
          labels={{ ph: d.searchPh, empty: d.searchEmpty, hint: d.searchHint, all: d.allLangs, articles: d.articles, allTopics: d.allTopics, allCountries: d.allCountries }}
        />
      </main>
      <Footer ui={ui} />
    </>
  );
}
