import type { Metadata } from "next";
import { Masthead, Footer } from "@/components/Chrome";
import { byTopic } from "@/lib/data";
import { TOPICS, t, topicName, type Ui } from "@/lib/i18n";

export const metadata: Metadata = { title: "Topik / Sections" };

export default async function Topics({ params }: { params: Promise<{ ui: Ui }> }) {
  const { ui } = await params;
  const d = t(ui);
  return (
    <>
      <Masthead ui={ui} path="topik/" current="topik" />
      <main id="isi" className="wrap">
        <header className="page-head">
          <h1>{d.topics}</h1>
          <p>{d.topicsIntro}</p>
        </header>
        <div className="topic-index">
          {TOPICS.map((tp) => {
            const items = byTopic(tp);
            return (
              <section key={tp}>
                <h2><a href={`/${ui}/topik/${tp}/`}>{topicName(ui, tp)}</a> <span className="mono muted">{items.length}</span></h2>
                <ul>
                  {items.slice(0, 4).map((a) => (
                    <li key={a.id} lang={a.lang} dir={a.lang === "ar" ? "rtl" : "ltr"}><a href={`/${ui}/a/${a.id}/`}>{a.title}</a></li>
                  ))}
                </ul>
                <a className="mono" href={`/${ui}/topik/${tp}/`}>{d.allIn} {topicName(ui, tp)} →</a>
              </section>
            );
          })}
        </div>
      </main>
      <Footer ui={ui} />
    </>
  );
}
