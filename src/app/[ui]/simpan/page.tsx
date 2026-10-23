import type { Metadata } from "next";
import { Masthead, Footer } from "@/components/Chrome";
import { SavedList } from "@/components/Client";
import { t, type Ui } from "@/lib/i18n";

export const metadata: Metadata = { title: "Disimpan / Saved", robots: { index: false } };

export default async function SavedPage({ params }: { params: Promise<{ ui: Ui }> }) {
  const { ui } = await params;
  const d = t(ui);
  return (
    <>
      <Masthead ui={ui} path="simpan/" current="simpan" />
      <main id="isi" className="wrap">
        <header className="page-head"><h1>{d.saved}</h1></header>
        <SavedList ui={ui} empty={d.savedEmpty} />
      </main>
      <Footer ui={ui} />
    </>
  );
}
