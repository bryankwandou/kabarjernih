import { Masthead, Footer } from "@/components/Chrome";
import { Story, Thumb, Meta } from "@/components/Story";
import { all, card, countBy, frontPage, byTopic } from "@/lib/data";
import { LANGS, TOPICS, formatDate, t, topicName, type Ui } from "@/lib/i18n";

export default async function Home({ params }: { params: Promise<{ ui: Ui }> }) {
  const { ui } = await params;
  const d = t(ui);
  const { lead, top } = frontPage();
  const side = top.slice(0, 4);
  const latest = top.slice(4, 12);
  const used = new Set([lead, ...top].map((a) => a.id));
  const langs = countBy("lang");
  const L = card(lead);

  return (
    <>
      <Masthead ui={ui} />
      <main id="isi" className="wrap">
        <section className="front" aria-label={d.lead}>
          <article className="front-lead rise">
            <Thumb a={L} ui={ui} className="lead-thumb" eager />
            <Meta a={L} ui={ui} />
            <h1 className="lead-title" lang={lead.lang} dir={LANGS[lead.lang]?.dir}>
              <a href={`/${ui}/a/${lead.id}/`}>{lead.title}</a>
            </h1>
            <p className="lead-dek" lang={lead.lang} dir={LANGS[lead.lang]?.dir}>{lead.summary}</p>
            <div className="meta">
              <span>{d.by} {lead.author}</span><span className="sep" />
              <time dateTime={lead.date}>{formatDate(lead.date, ui)}</time><span className="sep" />
              <span>{lead.minutes} {d.readMin}</span>
            </div>
          </article>
          <div className="front-side">
            {side.map((a) => <Story key={a.id} a={card(a)} ui={ui} thumb={false} />)}
          </div>
        </section>

        <div className="kicker"><h2>{d.latest}</h2><span className="mono muted">{all().length} {d.articles}</span></div>
        <div className="grid">
          {latest.map((a) => <Story key={a.id} a={card(a)} ui={ui} />)}
        </div>

        {TOPICS.map((tp) => {
          const items = byTopic(tp).filter((a) => !used.has(a.id)).slice(0, 4);
          if (items.length < 2) return null;
          items.forEach((a) => used.add(a.id));
          return (
            <section key={tp} aria-labelledby={`h-${tp}`}>
              <div className="kicker">
                <h2 id={`h-${tp}`}><a href={`/${ui}/topik/${tp}/`}>{topicName(ui, tp)}</a></h2>
                <a className="mono muted" href={`/${ui}/topik/${tp}/`}>{d.allIn} {topicName(ui, tp)} →</a>
              </div>
              <div className="grid">
                {items.map((a) => <Story key={a.id} a={card(a)} ui={ui} />)}
              </div>
            </section>
          );
        })}

        <div className="kicker"><h2>{d.fromTheWorld}</h2><span className="mono muted">{langs.size} {d.languages.toLowerCase()}</span></div>
        <p className="muted" style={{ marginTop: 0, maxWidth: "70ch" }}>{d.contentNote}</p>
        <nav className="langs" aria-label={d.languages}>
          {Object.entries(LANGS).filter(([l]) => langs.has(l)).map(([l, info]) => (
            <a key={l} href={`/${ui}/bahasa/${l}/`} lang={l} dir={info.dir}>
              <span>{info.name}</span><span className="mono">{langs.get(l)}</span>
            </a>
          ))}
        </nav>
      </main>
      <Footer ui={ui} />
    </>
  );
}
