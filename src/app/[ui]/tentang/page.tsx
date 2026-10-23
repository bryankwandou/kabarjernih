import type { Metadata } from "next";
import { Masthead, Footer } from "@/components/Chrome";
import { all, countBy, lastUpdated } from "@/lib/data";
import { formatDate, type Ui } from "@/lib/i18n";
import { SOURCES } from "../../../../scripts/sources.mjs";

export const metadata: Metadata = { title: "Tentang / About" };

const copy = {
  id: {
    title: "Tentang Kabar Jernih",
    intro: "Kabar Jernih mengumpulkan berita dari penerbit yang mengizinkan karyanya diterbitkan ulang secara utuh. Setiap artikel tetap mencantumkan penulis, sumber, lisensi, dan tautan ke halaman aslinya.",
    noAdsH: "Tanpa iklan, tanpa pelacak",
    noAds: "Tidak ada iklan, skrip analitik, cookie, atau akun. Gambar dimuat dari server penerbit tanpa mengirim alamat halaman ini. Artikel yang Anda simpan dan ukuran teks hanya tersimpan di peramban Anda.",
    pickH: "Bagaimana sumber dipilih",
    pick: "Hanya sumber dengan lisensi yang mengizinkan penerbitan ulang teks lengkap. Sumber berlisensi NonCommercial (NC) sengaja tidak dipakai, karena lisensinya ikut mengikat siapa pun yang menyalin repositori ini. Artikel CC BY-ND tidak diterjemahkan dan tidak diubah, hanya dibersihkan dari piksel pelacak.",
    costH: "Kenapa biayanya tetap rendah",
    cost: "Seluruh situs adalah HTML statis di CDN. Membaca artikel tidak menjalankan fungsi server dan tidak menyentuh database, jadi trafik tinggi tidak menambah waktu komputasi. Pembaruan berita berjalan terjadwal di GitHub Actions: skrip menarik feed, menyimpan JSON, lalu situs dibangun ulang. Artikel lebih dari 45 hari diarsipkan supaya ukuran repo tidak terus membesar.",
    tableSource: "Sumber", tableLang: "Bahasa", tableLicense: "Lisensi", tableCount: "Artikel",
    stats: (n: number, l: number, d: string) => `Saat ini ${n} artikel dalam ${l} bahasa. Terakhir diperbarui ${d}.`,
  },
  en: {
    title: "About Kabar Jernih",
    intro: "Kabar Jernih gathers news from publishers who allow their work to be republished in full. Every article keeps its author, source, licence and a link back to the original page.",
    noAdsH: "No ads, no trackers",
    noAds: "No ads, analytics scripts, cookies or accounts. Images load from the publisher's servers without sending this page's address. Saved articles and text size stay in your browser.",
    pickH: "How sources are chosen",
    pick: "Only sources whose licence allows full-text republication. NonCommercial (NC) sources are left out on purpose, because that licence would bind anyone who copies this repository. CC BY-ND articles are neither translated nor altered, only stripped of tracking pixels.",
    costH: "Why it stays cheap to run",
    cost: "The whole site is static HTML on a CDN. Reading an article never runs a server function or touches a database, so heavy traffic adds no compute time. News is refreshed on a schedule in GitHub Actions: a script pulls the feeds, writes JSON, and the site is rebuilt. Articles older than 45 days are archived so the repository does not keep growing.",
    tableSource: "Source", tableLang: "Language", tableLicense: "Licence", tableCount: "Articles",
    stats: (n: number, l: number, d: string) => `Currently ${n} articles in ${l} languages. Last updated ${d}.`,
  },
};

export default async function About({ params }: { params: Promise<{ ui: Ui }> }) {
  const { ui } = await params;
  const c = copy[ui];
  const counts = new Map<string, number>();
  for (const a of all()) counts.set(a.source, (counts.get(a.source) ?? 0) + 1);
  return (
    <>
      <Masthead ui={ui} path="tentang/" />
      <main id="isi" className="wrap">
        <header className="page-head"><h1>{c.title}</h1><p>{c.intro}</p></header>
        <div className="prose-page">
          <p className="mono muted">{c.stats(all().length, countBy("lang").size, formatDate(lastUpdated(), ui))}</p>
          <h2>{c.noAdsH}</h2><p>{c.noAds}</p>
          <h2>{c.pickH}</h2><p>{c.pick}</p>
          <table className="table">
            <thead><tr><th>{c.tableSource}</th><th>{c.tableLang}</th><th>{c.tableLicense}</th><th>{c.tableCount}</th></tr></thead>
            <tbody>
              {SOURCES.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}{"edition" in s ? ` ${s.edition}` : ""}</td>
                  <td>{s.lang}</td>
                  <td><a href={s.licenseUrl} rel="license noopener">{s.license}</a></td>
                  <td>{counts.get(s.id) ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>{c.costH}</h2><p>{c.cost}</p>
        </div>
      </main>
      <Footer ui={ui} />
    </>
  );
}
