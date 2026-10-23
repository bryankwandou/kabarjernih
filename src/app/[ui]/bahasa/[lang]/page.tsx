import type { Metadata } from "next";
import { Listing } from "@/components/Listing";
import { byLang } from "@/lib/data";
import { LANGS, UI, t, type Ui } from "@/lib/i18n";

export const dynamicParams = false;
export const generateStaticParams = () => UI.flatMap((ui) => Object.keys(LANGS).map((lang) => ({ ui, lang })));

type P = { params: Promise<{ ui: Ui; lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  return { title: LANGS[lang]?.name ?? lang };
}

export default async function LangPage({ params }: P) {
  const { ui, lang } = await params;
  const d = t(ui);
  return <Listing ui={ui} path={`bahasa/${lang}/`} kicker={d.languages} title={LANGS[lang]?.name ?? lang} lang={lang} intro={d.contentNote} items={byLang(lang)} />;
}
