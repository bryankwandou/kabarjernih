import { Masthead, Footer } from "./Chrome";
import { Story } from "./Story";
import { card, type Article } from "@/lib/data";
import { t, type Ui } from "@/lib/i18n";

// Shared shape for section and language pages: a head, then every story as a row.
export function Listing({ ui, path, current, kicker, title, intro, items, lang }: {
  ui: Ui; path: string; current?: string; kicker: string; title: string; intro?: string; items: Article[]; lang?: string;
}) {
  const d = t(ui);
  return (
    <>
      <Masthead ui={ui} path={path} current={current} />
      <main id="isi" className="wrap">
        <header className="page-head">
          <div className="mono muted">{kicker}</div>
          <h1 lang={lang}>{title}</h1>
          <p>{intro ? `${intro} ` : ""}{items.length} {d.articles}.</p>
        </header>
        {items.length ? (
          <div className="list">{items.map((a) => <Story key={a.id} a={card(a)} ui={ui} />)}</div>
        ) : (
          <p className="empty">{d.searchEmpty}</p>
        )}
      </main>
      <Footer ui={ui} />
    </>
  );
}
