import type { Card } from "@/lib/data";
import { LANGS, formatDate, t, topicName, type Ui } from "@/lib/i18n";

export function Thumb({ a, ui, className = "", eager = false }: { a: Card; ui: Ui; className?: string; eager?: boolean }) {
  return (
    <a href={`/${ui}/a/${a.id}/`} className={`thumb ${className}`} tabIndex={-1} aria-hidden="true">
      {a.image ? (
        // Hot-linked from the publisher's own CDN, with no referrer: nothing is
        // stored or resized here, so images cost this site nothing to serve.
        <img src={a.image} alt="" loading={eager ? "eager" : "lazy"} decoding="async" referrerPolicy="no-referrer" fetchPriority={eager ? "high" : "auto"} />
      ) : (
        <span className="cover" data-topic={a.topic}>
          <b>{a.title.trim().charAt(0)}</b>
          <span>{topicName(ui, a.topic)}</span>
        </span>
      )}
    </a>
  );
}

export function Meta({ a, ui, showLang = true }: { a: Card; ui: Ui; showLang?: boolean }) {
  return (
    <div className="meta">
      <a className="topic" href={`/${ui}/topik/${a.topic}/`}>{topicName(ui, a.topic)}</a>
      <span className="sep" />
      <span>{a.sourceName}</span>
      {showLang && a.lang !== ui && (
        <>
          <span className="sep" />
          <span lang={a.lang}>{LANGS[a.lang]?.name ?? a.lang}</span>
        </>
      )}
    </div>
  );
}

export function Story({ a, ui, thumb = true, dek = true }: { a: Card; ui: Ui; thumb?: boolean; dek?: boolean }) {
  const d = t(ui);
  const dir = LANGS[a.lang]?.dir ?? "ltr";
  return (
    <article className="story rise">
      {thumb && <Thumb a={a} ui={ui} />}
      <div>
        <Meta a={a} ui={ui} />
        <h3 lang={a.lang} dir={dir}>
          <a href={`/${ui}/a/${a.id}/`}>{a.title}</a>
        </h3>
        {dek && <p lang={a.lang} dir={dir}>{a.summary}</p>}
        <div className="meta" style={{ marginTop: 8 }}>
          <time dateTime={a.date}>{formatDate(a.date, ui)}</time>
          <span className="sep" />
          <span>{a.minutes} {d.readMin}</span>
        </div>
      </div>
    </article>
  );
}
