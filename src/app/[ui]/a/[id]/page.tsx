import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Masthead, Footer } from "@/components/Chrome";
import { Story, Meta } from "@/components/Story";
import { SaveButton, TextSize } from "@/components/Client";
import { all, byId, card, related } from "@/lib/data";
import { LANGS, UI, formatDate, t, type Ui } from "@/lib/i18n";

export const dynamicParams = false;
export const generateStaticParams = () => UI.flatMap((ui) => all().map((a) => ({ ui, id: a.id })));

type P = { params: Promise<{ ui: Ui; id: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { id } = await params;
  const a = byId(id);
  if (!a) return {};
  return {
    title: a.title,
    description: a.summary,
    // The publisher's page stays the canonical copy; this is a credited republication.
    alternates: { canonical: a.url },
    openGraph: { title: a.title, description: a.summary, type: "article", images: a.image ? [a.image] : undefined,publishedTime: a.date },
  };
}

export default async function ArticlePage({ params }: P) {
  const { ui, id } = await params;
  const a = byId(id);
  if (!a) notFound();
  const d = t(ui);
  const dir = LANGS[a.lang]?.dir ?? "ltr";
  const more = related(a);

  return (
    <>
      <Masthead ui={ui} path={`a/${a.id}/`} current={a.topic} />
      <main id="isi" className="wrap">
        <article className="article">
          <header className="article-head">
            <Meta a={card(a)} ui={ui} />
            <h1 lang={a.lang} dir={dir}>{a.title}</h1>
            <p className="dek" lang={a.lang} dir={dir}>{a.summary}</p>
            <div className="byline">
              <div>
                <div>{d.by} <strong>{a.author}</strong></div>
                <div className="meta" style={{ marginTop: 4 }}>
                  <time dateTime={a.date}>{formatDate(a.date, ui, true)}</time><span className="sep" />
                  <span>{a.minutes} {d.readMin}</span>
                </div>
              </div>
              <div className="tools">
                <TextSize label={d.textSize} />
                <SaveButton item={{ id: a.id, title: a.title, lang: a.lang, source: a.sourceName, date: a.date }} labels={{ save: d.save, unsave: d.unsave }} />
              </div>
            </div>
          </header>

          <div className="prose" lang={a.lang} dir={dir} dangerouslySetInnerHTML={{ __html: a.body }} />

          <aside className="credit" aria-label={d.license}>
            <dl>
              <dt>{d.by}</dt><dd>{a.author}</dd>
              <dt>{d.source}</dt><dd>{a.sourceName}</dd>
              <dt>{d.license}</dt><dd><a href={a.licenseUrl} rel="license noopener">{a.license}</a></dd>
              <dt>URL</dt><dd><a href={a.url} rel="noopener">{a.url}</a></dd>
            </dl>
            <a className="btn" href={a.url} rel="noopener">{d.original} ↗</a>
          </aside>
        </article>

        {more.length > 0 && (
          <>
            <div className="kicker"><h2>{d.more}</h2></div>
            <div className="grid">{more.map((m) => <Story key={m.id} a={card(m)} ui={ui} />)}</div>
          </>
        )}
      </main>
      <Footer ui={ui} />
    </>
  );
}
