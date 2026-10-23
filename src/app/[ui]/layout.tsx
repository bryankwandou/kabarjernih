import type { Metadata, Viewport } from "next";
import { Newsreader, IBM_Plex_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { UI, isUi, t } from "@/lib/i18n";
import "../globals.css";

const serif = Newsreader({ subsets: ["latin", "latin-ext"], variable: "--f-serif", style: ["normal", "italic"], axes: ["opsz"], display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--f-mono", display: "swap" });

export const dynamicParams = false;
export const generateStaticParams = () => UI.map((ui) => ({ ui }));

export async function generateMetadata({ params }: { params: Promise<{ ui: string }> }): Promise<Metadata> {
  const { ui } = await params;
  const d = t(isUi(ui) ? ui : "id");
  return {
    metadataBase: new URL("https://kabarjernih.vercel.app"),
    title: { default: "Kabar Jernih", template: "%s · Kabar Jernih" },
    description: d.tagline,
    icons: { icon: "/icon.svg" },
    alternates: { languages: { id: "/id/", en: "/en/" } },
    openGraph: { siteName: "Kabar Jernih", type: "website" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f3ec" },
    { media: "(prefers-color-scheme: dark)", color: "#14130f" },
  ],
};

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ ui: string }> }) {
  const { ui } = await params;
  if (!isUi(ui)) notFound();
  return (
    <html lang={ui} className={`${serif.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
