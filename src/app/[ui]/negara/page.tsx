import type { Metadata } from "next";
import { Masthead, Footer } from "@/components/Chrome";
import { countryCounts } from "@/lib/data";
import { countryName, t, type Ui } from "@/lib/i18n";

export const metadata: Metadata = { title: "Negara / Countries" };

export default async function Countries({ params }: { params: Promise<{ ui: Ui }> }) {
  const { ui } = await params;
  const d = t(ui);
  const list = countryCounts().sort((a, b) => b[1] - a[1] || countryName(ui, a[0]).localeCompare(countryName(ui, b[0]), ui));
  return (
    <>
      <Masthead ui={ui} path="negara/" current="negara" />
      <main id="isi" className="wrap">
        <header className="page-head">
          <h1>{d.countries}</h1>
          <p>{d.countriesIntro} {list.length} {d.countries.toLowerCase()}.</p>
        </header>
        <nav className="index-grid" aria-label={d.countries}>
          {list.map(([code, n]) => (
            <a key={code} href={`/${ui}/negara/${code.toLowerCase()}/`}>
              <span className="code">{code}</span>
              <span className="name">{countryName(ui, code)}</span>
              <span className="mono muted">{n}</span>
            </a>
          ))}
        </nav>
      </main>
      <Footer ui={ui} />
    </>
  );
}
