export const BASE_URL = "https://www.cognethra.org";
export const OG_IMAGE = `${BASE_URL}/assets/icons/cognethra-app-icon.svg`;

/** @type {import('./types.js').Locale[]} */
export const LOCALES = [
  { code: "en", path: "en", hreflang: "en", name: "English", flag: "🇬🇧", dir: "ltr" },
  { code: "tr", path: "tr", hreflang: "tr", name: "Türkçe", flag: "🇹🇷", dir: "ltr" },
  { code: "de", path: "de", hreflang: "de", name: "Deutsch", flag: "🇩🇪", dir: "ltr" },
  { code: "fr", path: "fr", hreflang: "fr", name: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "es", path: "es", hreflang: "es", name: "Español", flag: "🇪🇸", dir: "ltr" },
  { code: "it", path: "it", hreflang: "it", name: "Italiano", flag: "🇮🇹", dir: "ltr" },
  { code: "pt", path: "pt", hreflang: "pt", name: "Português", flag: "🇵🇹", dir: "ltr" },
  { code: "nl", path: "nl", hreflang: "nl", name: "Nederlands", flag: "🇳🇱", dir: "ltr" },
  { code: "ar", path: "ar", hreflang: "ar", name: "العربية", flag: "🇸🇦", dir: "rtl" },
  { code: "ru", path: "ru", hreflang: "ru", name: "Русский", flag: "🇷🇺", dir: "ltr" },
  { code: "zh-cn", path: "zh-cn", hreflang: "zh-Hans", name: "简体中文", flag: "🇨🇳", dir: "ltr" },
  { code: "zh-tw", path: "zh-tw", hreflang: "zh-Hant", name: "繁體中文", flag: "🇹🇼", dir: "ltr" },
  { code: "ja", path: "ja", hreflang: "ja", name: "日本語", flag: "🇯🇵", dir: "ltr" },
  { code: "ko", path: "ko", hreflang: "ko", name: "한국어", flag: "🇰🇷", dir: "ltr" },
  { code: "hi", path: "hi", hreflang: "hi", name: "हिन्दी", flag: "🇮🇳", dir: "ltr" },
  { code: "ur", path: "ur", hreflang: "ur", name: "اردو", flag: "🇵🇰", dir: "rtl" },
  { code: "pl", path: "pl", hreflang: "pl", name: "Polski", flag: "🇵🇱", dir: "ltr" },
  { code: "ro", path: "ro", hreflang: "ro", name: "Română", flag: "🇷🇴", dir: "ltr" },
  { code: "el", path: "el", hreflang: "el", name: "Ελληνικά", flag: "🇬🇷", dir: "ltr" },
  { code: "sv", path: "sv", hreflang: "sv", name: "Svenska", flag: "🇸🇪", dir: "ltr" },
  { code: "no", path: "no", hreflang: "nb", name: "Norsk", flag: "🇳🇴", dir: "ltr" },
  { code: "da", path: "da", hreflang: "da", name: "Dansk", flag: "🇩🇰", dir: "ltr" },
  { code: "fi", path: "fi", hreflang: "fi", name: "Suomi", flag: "🇫🇮", dir: "ltr" },
  { code: "he", path: "he", hreflang: "he", name: "עברית", flag: "🇮🇱", dir: "rtl" },
  { code: "id", path: "id", hreflang: "id", name: "Bahasa Indonesia", flag: "🇮🇩", dir: "ltr" }
];

export const PAGES = [
  { id: "home", file: "index.html", path: "" },
  { id: "privacy", file: "privacy.html", path: "privacy.html" },
  { id: "terms", file: "terms.html", path: "terms.html" },
  { id: "disclaimer", file: "disclaimer.html", path: "disclaimer.html" },
  { id: "app", file: "app/index.html", path: "app/" },
  { id: "blog", file: "blog/cognitive-architecture-overview.html", path: "blog/cognitive-architecture-overview.html" }
];

export function localeUrl(locale, pagePath = "") {
  const base = `${BASE_URL}/${locale.path}/`;
  return pagePath ? `${base}${pagePath}` : base;
}

export function getLocale(codeOrPath) {
  return LOCALES.find((l) => l.code === codeOrPath || l.path === codeOrPath) || LOCALES[0];
}
