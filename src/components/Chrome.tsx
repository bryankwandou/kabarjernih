import { Mark, Wordmark } from "./Logo";
import { LANGS, TOPICS, formatDate, t, topicName, type Ui } from "@/lib/i18n";
import { lastUpdated, countBy } from "@/lib/data";

// scope: on a section, country or language page the search box offers to stay inside it.
export type Scope = { param: "topik" | "negara" | "lang"; value: string; label: string };

export function Masthead({ ui, path = "", current, scope }: { ui: Ui; path?: string; current?: string; scope?: Scope }) {
  const d = t(ui);
  const updated = lastUpdated();
  return (
    <header className="mast">
      <a className="skip" href="#isi">{d.skip}</a>
      <div className="wrap">
        <div className="mast-top">
          <span className="mono">
            {d.updated} {updated ? formatDate(updated, ui, true) : "—"}
          </span>
          <span className="mono hide-sm">{d.tagline.split(".")[1]?.trim()}</span>
          <nav className="ui-switch" aria-label="Bahasa antarmuka / Interface language">
            {(["id", "en"] as const).map((u) => (
              <a key={u} href={`/${u}/${path}`} aria-current={u === ui ? "true" : undefined} hrefLang={u} lang={u}>
                {u.toUpperCase()}
              </a>
            ))}
          </nav>
        </div>
        <div className="mast-brand">
          <a className="brand" href={`/${ui}/`} aria-label="Kabar Jernih">
            <Mark />
            <Wordmark />
          </a>
        </div>
        <p className="tagline">{d.tagline}</p>
        {current !== "cari" && (
          // A plain GET form: it works on every page without any script.
          <form className="mast-search" role="search" action={`/${ui}/cari/`} method="get">
            <input type="search" name="q" placeholder={d.searchPh} aria-label={d.searchPh} autoComplete="off" />
            {scope && (
              <select name={scope.param} defaultValue={scope.value} aria-label={d.search}>
                <option value={scope.value}>{scope.label}</option>
                <option value="">{d.everywhere}</option>
              </select>
            )}
            <button type="submit" className="btn">{d.searchGo}</button>
          </form>
        )}
        <nav className="nav" aria-label={d.topics}>
          {TOPICS.map((tp) => (
            <a key={tp} href={`/${ui}/topik/${tp}/`} aria-current={current === tp ? "page" : undefined}>{topicName(ui, tp)}</a>
          ))}
          <a href={`/${ui}/negara/`} aria-current={current === "negara" ? "page" : undefined}>{d.countries}</a>
          <a href={`/${ui}/cari/`} aria-current={current === "cari" ? "page" : undefined}>{d.search}</a>
          <a href={`/${ui}/simpan/`} aria-current={current === "simpan" ? "page" : undefined}>{d.saved}</a>
        </nav>
      </div>
    </header>
  );
}

export function Footer({ ui }: { ui: Ui }) {
  const d = t(ui);
  const langs = countBy("lang");
  const sources = countBy("sourceName");
  return (
    <footer className="foot">
      <div className="wrap foot-grid">
        <div>
          <h4>Kabar Jernih</h4>
          <p style={{ marginTop: 0 }}>{d.tagline}</p>
          <p>
            <a href={`/${ui}/tentang/`}>{d.about}</a> · <a href="https://github.com/bryankwandou/kabarjernih" rel="noopener">GitHub</a>
          </p>
        </div>
        <div>
          <h4>{d.languages}</h4>
          <ul>
            {[...langs].sort((a, b) => b[1] - a[1]).map(([l, n]) => (
              <li key={l}><a href={`/${ui}/bahasa/${l}/`} lang={l}>{LANGS[l]?.name ?? l}</a> <span className="muted">{n}</span></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>{d.sources}</h4>
          <ul>
            {[...sources].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([s, n]) => (
              <li key={s}>{s} <span className="muted">{n}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
