import type { Metadata } from "next";
import { Masthead, Footer } from "@/components/Chrome";
import { Search } from "@/components/Client";
import { countBy } from "@/lib/data";
import { LANGS, t, type Ui } from "@/lib/i18n";

export const metadata: Metadata = { title: "Cari / Search" };

export default async function SearchPage({ params }: { params: Promise<{ ui: Ui }> }) {
  const { ui } = await params;
  const d = t(ui);
  const present = countBy("lang");
  const langs = Object.fromEntries(Object.entries(LANGS).filter(([l]) => present.has(l)).map(([l, v]) => [l, v.name]));
  return (
    <>
      <Masthead ui={ui} path="cari/" current="cari" />
      <main id="isi" className="wrap">
        <header className="page-head"><h1>{d.search}</h1></header>
        <Search ui={ui} langs={langs} labels={{ ph: d.searchPh, empty: d.searchEmpty, hint: d.searchHint, all: d.allLangs, articles: d.articles }} />
      </main>
      <Footer ui={ui} />
    </>
  );
}
