// Country names as they appear in the feed languages. Matching runs on the
// publisher's tags plus the title and summary, never the body, so a passing
// mention deep in an article does not file it under that country.
// Names that are also common words or people ("Turkey", "Jordan", "Chad",
// "Georgia") are tag-only: they count when the publisher tagged them.

export const COUNTRIES = {
  ID: ["Indonesia", "Indonésie", "Indonesien", "Indonésia", "إندونيسيا", "インドネシア"],
  MY: ["Malaysia", "Malasia", "Malaisie", "Malásia", "ماليزيا", "マレーシア"],
  SG: ["Singapore", "Singapura", "Singapur", "Singapour", "Cingapura", "シンガポール"],
  PH: ["Philippines", "Filipina", "Filipinas", "Philippinen", "الفلبين", "フィリピン"],
  TH: ["Thailand", "Tailandia", "Thaïlande", "Tailândia", "تايلاند", "タイ王国"],
  VN: ["Vietnam", "Viet Nam", "Viêt Nam", "Vietnã", "فيتنام", "ベトナム"],
  MM: ["Myanmar", "Burma", "Birmanie", "ميانمار", "ミャンマー"],
  KH: ["Cambodia", "Kamboja", "Camboya", "Cambodge", "Camboja", "カンボジア"],
  TL: ["Timor-Leste", "East Timor", "Timor Leste", "Timor Oriental"],
  CN: ["China", "Tiongkok", "Cina", "Chine", "الصين", "中国"],
  HK: ["Hong Kong", "香港"],
  TW: ["Taiwan", "Taïwan", "Taiwán", "تايوان", "台湾"],
  JP: ["Japan", "Jepang", "Japón", "Japon", "Japão", "اليابان", "日本"],
  KR: ["South Korea", "Korea Selatan", "Corea del Sur", "Corée du Sud", "Coreia do Sul", "Südkorea", "韓国"],
  KP: ["North Korea", "Korea Utara", "Corea del Norte", "Corée du Nord", "Coreia do Norte", "Nordkorea", "北朝鮮"],
  IN: ["India", "Inde", "Índia", "Indien", "الهند", "インド"],
  PK: ["Pakistan", "Paquistán", "Paquistão", "باكستان", "パキスタン"],
  BD: ["Bangladesh", "Bangladés", "بنغلاديش", "バングラデシュ"],
  LK: ["Sri Lanka", "سريلانكا", "スリランカ"],
  NP: ["Nepal", "Népal", "نيبال", "ネパール"],
  AF: ["Afghanistan", "Afganistán", "Afeganistão", "أفغانستان", "アフガニスタン"],
  IR: ["Iran", "Irán", "Irã", "إيران", "イラン"],
  IQ: ["Iraq", "Irak", "Iraque", "العراق", "イラク"],
  SY: ["Syria", "Suriah", "Siria", "Syrie", "Síria", "Syrien", "سوريا", "シリア"],
  LB: ["Lebanon", "Lebanon", "Líbano", "Liban", "Libanon", "لبنان", "レバノン"],
  IL: ["Israel", "Israël", "إسرائيل", "イスラエル"],
  PS: ["Palestine", "Palestina", "Palästina", "Gaza", "West Bank", "فلسطين", "غزة", "パレスチナ", "ガザ"],
  JO: ["tag:Jordan", "Yordania", "Jordania", "Jordanie", "Jordânia", "Jordanien", "الأردن", "ヨルダン"],
  SA: ["Saudi Arabia", "Arab Saudi", "Arabia Saudita", "Arabie saoudite", "Arábia Saudita", "السعودية", "サウジアラビア"],
  AE: ["United Arab Emirates", "UAE", "Uni Emirat Arab", "Emiratos Árabes", "Émirats arabes unis", "الإمارات"],
  QA: ["Qatar", "Catar", "قطر", "カタール"],
  YE: ["Yemen", "Yaman", "Yémen", "Iémen", "اليمن", "イエメン"],
  TR: ["tag:Turkey", "Türkiye", "Turki", "Turquía", "Turquie", "Turquia", "Türkei", "تركيا", "トルコ"],
  EG: ["Egypt", "Mesir", "Egipto", "Égypte", "Egito", "Ägypten", "مصر", "エジプト"],
  MA: ["Morocco", "Maroko", "Marruecos", "Maroc", "Marrocos", "Marokko", "المغرب", "モロッコ"],
  DZ: ["Algeria", "Aljazair", "Argelia", "Algérie", "Argélia", "Algerien", "الجزائر", "アルジェリア"],
  TN: ["Tunisia", "Tunisia", "Túnez", "Tunisie", "Tunísia", "Tunesien", "تونس", "チュニジア"],
  LY: ["Libya", "Libia", "Libye", "Líbia", "Libyen", "ليبيا", "リビア"],
  SD: ["Sudan", "Soudan", "Sudão", "السودان", "スーダン"],
  ET: ["Ethiopia", "Etiopia", "Etiopía", "Éthiopie", "Etiópia", "Äthiopien", "إثيوبيا", "エチオピア"],
  KE: ["Kenya", "Kenia", "Quênia", "كينيا", "ケニア"],
  UG: ["Uganda", "Ouganda", "أوغندا", "ウガンダ"],
  TZ: ["Tanzania", "Tanzanie", "Tanzânia", "تنزانيا", "タンザニア"],
  NG: ["Nigeria", "Nigéria", "نيجيريا", "ナイジェリア"],
  GH: ["Ghana", "Gana", "غانا", "ガーナ"],
  SN: ["Senegal", "Sénégal", "السنغال", "セネガル"],
  CM: ["Cameroon", "Kamerun", "Camerún", "Cameroun", "Camarões", "الكاميرون"],
  CD: ["Democratic Republic of Congo", "DR Congo", "DRC", "RDC", "République démocratique du Congo", "Kongo"],
  ZA: ["South Africa", "Afrika Selatan", "Sudáfrica", "Afrique du Sud", "África do Sul", "Südafrika", "جنوب أفريقيا", "南アフリカ"],
  ZW: ["Zimbabwe", "Zimbábue", "زيمبابوي"],
  MZ: ["Mozambique", "Mosambik", "Moçambique", "موزمبيق"],
  AO: ["Angola", "أنغولا"],
  RU: ["Russia", "Rusia", "Russie", "Rússia", "Russland", "روسيا", "ロシア"],
  UA: ["Ukraine", "Ukraina", "Ucrania", "Ucrânia", "أوكرانيا", "ウクライナ"],
  BY: ["Belarus", "Biélorussie", "Bielorrusia", "Belarus", "بيلاروسيا"],
  GE: ["tag:Georgia", "Géorgie", "Geórgia", "Georgien", "جورجيا"],
  AM: ["Armenia", "Arménie", "Armênia", "Armenien", "أرمينيا"],
  AZ: ["Azerbaijan", "Azerbaiyán", "Azerbaïdjan", "Azerbaijão", "Aserbaidschan", "أذربيجان"],
  KZ: ["Kazakhstan", "Kazajistán", "Cazaquistão", "Kasachstan", "كازاخستان"],
  UZ: ["Uzbekistan", "Uzbekistán", "Ouzbékistan", "Usbequistão", "أوزبكستان"],
  KG: ["Kyrgyzstan", "Kirguistán", "Kirghizistan", "Quirguistão"],
  TJ: ["Tajikistan", "Tayikistán", "Tadjikistan", "Tajiquistão"],
  GB: ["United Kingdom", "Britain", "Inggris", "England", "Scotland", "Wales", "Reino Unido", "Royaume-Uni", "Großbritannien", "بريطانيا", "イギリス"],
  IE: ["Ireland", "Irlandia", "Irlanda", "Irlande", "أيرلندا"],
  FR: ["France", "Prancis", "Francia", "França", "Frankreich", "فرنسا", "フランス"],
  DE: ["Germany", "Jerman", "Alemania", "Allemagne", "Alemanha", "Deutschland", "ألمانيا", "ドイツ"],
  ES: ["Spain", "Spanyol", "España", "Espagne", "Espanha", "Spanien", "إسبانيا", "スペイン"],
  PT: ["Portugal", "البرتغال", "ポルトガル"],
  IT: ["Italy", "Italia", "Italie", "Itália", "Italien", "إيطاليا", "イタリア"],
  NL: ["Netherlands", "Belanda", "Países Bajos", "Pays-Bas", "Holanda", "Niederlande", "هولندا"],
  BE: ["Belgium", "Belgia", "Bélgica", "Belgique", "Belgien", "بلجيكا"],
  CH: ["Switzerland", "Swiss", "Suiza", "Suisse", "Suíça", "Schweiz", "سويسرا"],
  AT: ["Austria", "Autriche", "Áustria", "Österreich", "النمسا"],
  PL: ["Poland", "Polandia", "Polonia", "Pologne", "Polônia", "Polen", "بولندا"],
  HU: ["Hungary", "Hungaria", "Hungría", "Hongrie", "Hungria", "Ungarn", "المجر"],
  RS: ["Serbia", "Serbie", "Sérvia", "Serbien", "صربيا"],
  GR: ["Greece", "Yunani", "Grecia", "Grèce", "Grécia", "Griechenland", "اليونان"],
  SE: ["Sweden", "Swedia", "Suecia", "Suède", "Suécia", "Schweden", "السويد"],
  NO: ["Norway", "Norwegia", "Noruega", "Norvège", "Norwegen", "النرويج"],
  DK: ["Denmark", "Denmark", "Dinamarca", "Danemark", "Dänemark", "الدنمارك"],
  FI: ["Finland", "Finlandia", "Finlande", "Finlândia", "Finnland", "فنلندا"],
  US: ["United States", "U.S.", "USA", "America", "Amerika Serikat", "AS", "Estados Unidos", "EE.UU.", "États-Unis", "EUA", "Vereinigte Staaten", "الولايات المتحدة", "アメリカ", "米国"],
  CA: ["Canada", "Kanada", "Canadá", "كندا", "カナダ"],
  MX: ["Mexico", "Meksiko", "México", "Mexique", "Mexiko", "المكسيك", "メキシコ"],
  GT: ["Guatemala"],
  HN: ["Honduras"],
  SV: ["El Salvador"],
  NI: ["Nicaragua"],
  CU: ["Cuba", "Kuba", "كوبا"],
  HT: ["Haiti", "Haïti", "هايتي"],
  VE: ["Venezuela", "فنزويلا", "ベネズエラ"],
  CO: ["Colombia", "Kolombia", "Colombie", "Colômbia", "Kolumbien", "كولومبيا"],
  EC: ["Ecuador", "Ekuador", "Équateur", "Equador"],
  PE: ["Peru", "Perú", "Pérou", "بيرو"],
  BO: ["Bolivia", "Bolivie", "Bolívia", "Bolivien"],
  BR: ["Brazil", "Brasil", "Brésil", "Brasilien", "البرازيل", "ブラジル"],
  CL: ["Chile", "Chili", "تشيلي"],
  AR: ["Argentina", "Argentine", "Argentinien", "الأرجنتين", "アルゼンチン"],
  UY: ["Uruguay", "Uruguai"],
  PY: ["Paraguay", "Paraguai"],
  AU: ["Australia", "Australie", "Austrália", "Australien", "أستراليا", "オーストラリア"],
  NZ: ["New Zealand", "Selandia Baru", "Nueva Zelanda", "Nouvelle-Zélande", "Nova Zelândia", "Neuseeland", "ニュージーランド"],
  PG: ["Papua New Guinea", "Papua Nugini", "Papouasie-Nouvelle-Guinée"],
  FJ: ["Fiji", "Fidji"],
};

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// Latin names need word boundaries; Arabic and Japanese do not use spaces that way.
const pattern = (name) => (/^[\p{Script=Latin}\s.'-]+$/u.test(name) ? `(?<![\\p{L}])${escape(name)}(?![\\p{L}])` : escape(name));

const COMPILED = Object.entries(COUNTRIES).map(([code, names]) => {
  const tagOnly = names.filter((n) => n.startsWith("tag:")).map((n) => n.slice(4));
  const free = names.filter((n) => !n.startsWith("tag:"));
  // "AS" and "US" only count in capitals, so the Indonesian word "as" never matches.
  const caseSensitive = free.filter((n) => /^[A-Z.]{2,5}$/.test(n));
  const loose = free.filter((n) => !caseSensitive.includes(n));
  return {
    code,
    tag: new RegExp(`^(${[...tagOnly, ...free].map(escape).join("|")})$`, "iu"),
    text: loose.length ? new RegExp(loose.map(pattern).join("|"), "iu") : null,
    exact: caseSensitive.length ? new RegExp(caseSensitive.map((n) => `(?<![\\p{L}.])${escape(n)}(?![\\p{L}])`).join("|"), "u") : null,
  };
});

export function countriesOf(tags, text) {
  const out = [];
  for (const c of COMPILED) {
    if (tags.some((t) => c.tag.test(t.trim())) || c.text?.test(text) || c.exact?.test(text)) out.push(c.code);
  }
  return out.slice(0, 4);
}
