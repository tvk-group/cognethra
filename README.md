# Cognethra

Cognitive intelligence architecture for reasoning, knowledge synthesis, semantic memory, and Proof-of-Thought systems inside the SOVRA / Entelekron ecosystem.

**Live site:** https://www.cognethra.org  
**Default locale:** https://www.cognethra.org/en/  
**Mobile app:** https://www.cognethra.org/en/app/

## Multilingual SEO (25 languages)

| Code | Language | URL |
|------|----------|-----|
| en | English | `/en/` |
| tr | Türkçe | `/tr/` |
| de | Deutsch | `/de/` |
| fr | Français | `/fr/` |
| es | Español | `/es/` |
| it | Italiano | `/it/` |
| pt | Português | `/pt/` |
| nl | Nederlands | `/nl/` |
| ar | العربية | `/ar/` |
| ru | Русский | `/ru/` |
| zh-cn | 简体中文 | `/zh-cn/` |
| zh-tw | 繁體中文 | `/zh-tw/` |
| ja | 日本語 | `/ja/` |
| ko | 한국어 | `/ko/` |
| hi | हिन्दी | `/hi/` |
| ur | اردو | `/ur/` |
| pl | Polski | `/pl/` |
| ro | Română | `/ro/` |
| el | Ελληνικά | `/el/` |
| sv | Svenska | `/sv/` |
| no | Norsk | `/no/` |
| da | Dansk | `/da/` |
| fi | Suomi | `/fi/` |
| he | עברית | `/he/` |
| id | Bahasa Indonesia | `/id/` |

Each locale includes fully translated pages (no Google Translate widgets):

- Home (`index.html`) — FAQ section + JSON-LD (Organization, WebSite, Breadcrumb, FAQPage)
- Privacy, Terms, Disclaimer
- Mobile app (`app/index.html`)
- Blog article (`blog/cognitive-architecture-overview.html`) — Article schema

SEO assets: `sitemap-index.xml`, `sitemap-{locale}.xml`, `robots.txt`, hreflang on every page, unique meta/OG/Twitter per locale.

## Build

```bash
npm run build          # Generate 150 HTML pages + sitemaps
npm run validate-i18n  # Verify all locale JSON keys match en.json
```

Translations live in `i18n/{locale}.json`. Edit strings there, then rebuild.

## Structure

```
├── i18n/               # 25 locale JSON translation files
├── scripts/
│   ├── build.mjs       # Static site generator
│   ├── render.mjs      # Page templates
│   ├── seo.mjs         # hreflang, JSON-LD, sitemaps
│   └── locales.js      # Locale configuration
├── en/, tr/, de/, ...  # Generated locale directories
├── assets/             # CSS, JS, icons
├── sitemap-index.xml
└── robots.txt
```

## Deploy

Vercel runs `npm run build` automatically. Static output — no runtime required.

## Ecosystem

- [SOVRA Network](https://www.sovra.network/)
- [Entelekron](https://www.entelekron.org/)
- [T.V.K. Group](https://www.tvk.group/)

## License

MIT — see [LICENSE](LICENSE)
