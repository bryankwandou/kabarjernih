// Only sources whose licence allows republishing the full text, with credit.
// Anything NonCommercial is left out on purpose, even though this site carries
// no ads: the licence would bind anyone who forks the repo too.

const GV = { name: "Global Voices", license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0/" };
const TC = { name: "The Conversation", license: "CC BY-ND 4.0", licenseUrl: "https://creativecommons.org/licenses/by-nd/4.0/" };

export const SOURCES = [
  { id: "gv-en", ...GV, lang: "en", url: "https://globalvoices.org/feed/" },
  { id: "gv-id", ...GV, lang: "id", url: "https://id.globalvoices.org/feed/" },
  { id: "gv-es", ...GV, lang: "es", url: "https://es.globalvoices.org/feed/" },
  { id: "gv-fr", ...GV, lang: "fr", url: "https://fr.globalvoices.org/feed/" },
  { id: "gv-pt", ...GV, lang: "pt", url: "https://pt.globalvoices.org/feed/" },
  { id: "gv-de", ...GV, lang: "de", url: "https://de.globalvoices.org/feed/" },
  { id: "gv-ar", ...GV, lang: "ar", url: "https://ar.globalvoices.org/feed/" },
  { id: "gv-ja", ...GV, lang: "ja", url: "https://jp.globalvoices.org/feed/" },
  { id: "tc-global", ...TC, lang: "en", edition: "Global", url: "https://theconversation.com/global/articles.atom" },
  { id: "tc-id", ...TC, lang: "id", edition: "Indonesia", url: "https://theconversation.com/id/articles.atom" },
  { id: "tc-fr", ...TC, lang: "fr", edition: "France", url: "https://theconversation.com/fr/articles.atom" },
  { id: "tc-es", ...TC, lang: "es", edition: "España", url: "https://theconversation.com/es/articles.atom" },
  { id: "tc-uk", ...TC, lang: "en", edition: "UK", url: "https://theconversation.com/uk/articles.atom" },
  { id: "tc-au", ...TC, lang: "en", edition: "Australia", url: "https://theconversation.com/au/articles.atom" },
  { id: "tc-africa", ...TC, lang: "en", edition: "Africa", url: "https://theconversation.com/africa/articles.atom" },
  { id: "tc-ca", ...TC, lang: "en", edition: "Canada", url: "https://theconversation.com/ca/articles.atom" },
  { id: "tc-us", ...TC, lang: "en", edition: "US", url: "https://theconversation.com/us/articles.atom" },
  {
    id: "nasa", name: "NASA", lang: "en", url: "https://www.nasa.gov/news-release/feed/",
    license: "Domain publik (karya pemerintah AS)", licenseUrl: "https://www.nasa.gov/nasa-brand-center/images-and-media/",
  },
];
