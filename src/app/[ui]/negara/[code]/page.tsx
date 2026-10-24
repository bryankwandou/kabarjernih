import type { Metadata } from "next";
import { Listing } from "@/components/Listing";
import { byCountry, countryCounts } from "@/lib/data";
import { UI, countryName, t, type Ui } from "@/lib/i18n";

export const dynamicParams = false;
export const generateStaticParams = () => UI.flatMap((ui) => countryCounts().map(([c]) => ({ ui, code: c.toLowerCase() })));

type P = { params: Promise<{ ui: Ui; code: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { ui, code } = await params;
  return { title: countryName(ui, code.toUpperCase()) };
}

export default async function CountryPage({ params }: P) {
  const { ui, code } = await params;
  const cc = code.toUpperCase();
  return <Listing ui={ui} path={`negara/${code}/`} current="negara" kicker={t(ui).countries} title={countryName(ui, cc)} items={byCountry(cc)} />;
}
