export const UI = ["id", "en"] as const;
export type Ui = (typeof UI)[number];
export const isUi = (s: string): s is Ui => (UI as readonly string[]).includes(s);

// Languages the articles themselves arrive in. Labels are endonyms so a reader
// spots their own language without knowing the UI language.
export const LANGS: Record<string, { name: string; dir: "ltr" | "rtl" }> = {
  id: { name: "Bahasa Indonesia", dir: "ltr" },
  en: { name: "English", dir: "ltr" },
  es: { name: "Español", dir: "ltr" },
  fr: { name: "Français", dir: "ltr" },
  pt: { name: "Português", dir: "ltr" },
  de: { name: "Deutsch", dir: "ltr" },
  ar: { name: "العربية", dir: "rtl" },
  ja: { name: "日本語", dir: "ltr" },
};

export const TOPICS = ["politik", "ekonomi", "lingkungan", "sains", "kesehatan", "teknologi", "budaya", "dunia"] as const;

const dict = {
  id: {
    tagline: "Berita dunia dari sumber berlisensi terbuka. Tanpa iklan, tanpa pelacak, tanpa paywall.",
    latest: "Terbaru",
    topics: "Rubrik",
    languages: "Bahasa",
    search: "Cari",
    saved: "Disimpan",
    about: "Tentang",
    readMin: "mnt baca",
    by: "Oleh",
    source: "Sumber",
    license: "Lisensi",
    original: "Baca di situs asli",
    save: "Simpan",
    unsave: "Hapus dari simpanan",
    more: "Lainnya di rubrik ini",
    allIn: "Semua dalam",
    articles: "artikel",
    searchPh: "Cari judul, ringkasan, atau penulis…",
    searchEmpty: "Tidak ada artikel yang cocok. Coba kata lain, atau hapus filter bahasa.",
    searchHint: "Ketik minimal dua huruf. Pencarian berjalan di peramban Anda, tidak dikirim ke server.",
    savedEmpty: "Belum ada artikel yang disimpan. Tekan Simpan di halaman artikel; daftarnya hanya tersimpan di perangkat ini.",
    updated: "Diperbarui",
    edition: "Edisi",
    allLangs: "Semua bahasa",
    contentNote: "Artikel ditampilkan dalam bahasa aslinya. Lisensi sebagian sumber (CC BY-ND) tidak mengizinkan terjemahan.",
    skip: "Langsung ke isi",
    back: "Kembali ke beranda",
    notFound: "Halaman ini tidak ada, atau artikelnya sudah lebih dari 45 hari dan diarsipkan.",
    fromTheWorld: "Dari seluruh dunia",
    lead: "Utama",
    sources: "Sumber",
    textSize: "Ukuran teks",
  },
  en: {
    tagline: "World news from openly licensed sources. No ads, no trackers, no paywall.",
    latest: "Latest",
    topics: "Sections",
    languages: "Languages",
    search: "Search",
    saved: "Saved",
    about: "About",
    readMin: "min read",
    by: "By",
    source: "Source",
    license: "Licence",
    original: "Read on the original site",
    save: "Save",
    unsave: "Remove from saved",
    more: "More in this section",
    allIn: "Everything in",
    articles: "articles",
    searchPh: "Search titles, summaries or authors…",
    searchEmpty: "No matching articles. Try another word, or clear the language filter.",
    searchHint: "Type at least two letters. Search runs in your browser and is never sent to a server.",
    savedEmpty: "Nothing saved yet. Press Save on an article; the list lives only on this device.",
    updated: "Updated",
    edition: "Edition",
    allLangs: "All languages",
    contentNote: "Articles appear in their original language. Some licences (CC BY-ND) do not allow translation.",
    skip: "Skip to content",
    back: "Back to front page",
    notFound: "This page does not exist, or the article is older than 45 days and has been archived.",
    fromTheWorld: "From around the world",
    lead: "Lead",
    sources: "Sources",
    textSize: "Text size",
  },
} as const;

export type Dict = { [K in keyof (typeof dict)["id"]]: string };
export const t = (ui: Ui): Dict => dict[ui];

const topicNames: Record<Ui, Record<string, string>> = {
  id: { politik: "Politik", ekonomi: "Ekonomi", lingkungan: "Lingkungan", sains: "Sains", kesehatan: "Kesehatan", teknologi: "Teknologi", budaya: "Budaya", dunia: "Dunia" },
  en: { politik: "Politics", ekonomi: "Economy", lingkungan: "Environment", sains: "Science", kesehatan: "Health", teknologi: "Technology", budaya: "Culture", dunia: "World" },
};
export const topicName = (ui: Ui, topic: string) => topicNames[ui][topic] ?? topic;

export function formatDate(iso: string, ui: Ui, withTime = false) {
  return new Intl.DateTimeFormat(ui === "id" ? "id-ID" : "en-GB", {
    day: "numeric", month: "long", year: "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta", timeZoneName: "short" } : { timeZone: "Asia/Jakarta" }),
  }).format(new Date(iso));
}
