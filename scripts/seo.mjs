import { BASE_URL, OG_IMAGE, LOCALES, localeUrl } from "./locales.js";

export function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function hreflangTags(pagePath) {
  return LOCALES.map((locale) => {
    const href = localeUrl(locale, pagePath);
    return `<link rel="alternate" hreflang="${locale.hreflang}" href="${esc(href)}" />`;
  }).join("\n  ") + `\n  <link rel="alternate" hreflang="x-default" href="${esc(localeUrl(LOCALES[0], pagePath))}" />`;
}

export function languageOptions(currentLocale) {
  return LOCALES.map((locale) => {
    const selected = locale.code === currentLocale.code ? " selected" : "";
    return `<option value="/${locale.path}/"${selected}>${locale.flag} ${esc(locale.name)}</option>`;
  }).join("\n            ");
}

export function languageOptionsLegal(currentLocale, page) {
  return LOCALES.map((locale) => {
    const selected = locale.code === currentLocale.code ? " selected" : "";
    const href = page === "blog/cognitive-architecture-overview.html"
      ? `/${locale.path}/blog/cognitive-architecture-overview.html`
      : `/${locale.path}/${page}`;
    return `<option value="${href}"${selected}>${locale.flag} ${esc(locale.name)}</option>`;
  }).join("\n            ");
}

export function seoHead({ locale, pageId, meta, canonicalPath, extra = "" }) {
  const canonical = localeUrl(locale, canonicalPath);
  const m = meta;
  return `<meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0${pageId === "app" ? ", viewport-fit=cover" : ""}" />
  <title>${esc(m.title)}</title>
  <meta name="description" content="${esc(m.description)}" />
  <meta name="keywords" content="${esc(m.keywords)}" />
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
  <meta name="author" content="T.V.K. Labs &amp; Technologies LTD" />
  <meta property="og:title" content="${esc(m.ogTitle)}" />
  <meta property="og:description" content="${esc(m.ogDescription)}" />
  <meta property="og:type" content="${pageId === "blog" ? "article" : "website"}" />
  <meta property="og:url" content="${esc(canonical)}" />
  <meta property="og:site_name" content="Cognethra" />
  <meta property="og:locale" content="${locale.hreflang.replace("-", "_")}" />
  <meta property="og:image" content="${OG_IMAGE}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(m.twitterTitle)}" />
  <meta name="twitter:description" content="${esc(m.twitterDescription)}" />
  <meta name="twitter:image" content="${OG_IMAGE}" />
  <meta name="theme-color" content="#0f2744" />
  <link rel="canonical" href="${esc(canonical)}" />
  ${hreflangTags(canonicalPath)}
  ${extra}`;
}

export function jsonLdOrganization(t) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cognethra",
    legalName: "T.V.K. Labs & Technologies LTD",
    url: BASE_URL,
    logo: OG_IMAGE,
    email: "team@cognethra.org",
    description: t.schema.orgDescription,
    sameAs: [
      "https://www.sovra.network/",
      "https://www.entelekron.org/",
      "https://www.tvk.group/"
    ]
  };
}

export function jsonLdWebsite(locale, t) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Cognethra",
    url: localeUrl(locale),
    description: t.schema.websiteDescription,
    inLanguage: locale.hreflang,
    publisher: { "@type": "Organization", name: "Cognethra" }
  };
}

export function jsonLdBreadcrumb(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function jsonLdFAQ(t) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a }
    }))
  };
}

export function jsonLdArticle({ locale, t, url }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t.blog.title,
    description: t.meta.blog.description,
    author: { "@type": "Organization", name: t.blog.author },
    publisher: {
      "@type": "Organization",
      name: "Cognethra",
      logo: { "@type": "ImageObject", url: OG_IMAGE }
    },
    datePublished: "2026-06-01",
    dateModified: "2026-06-01",
    mainEntityOfPage: url,
    inLanguage: locale.hreflang,
    image: OG_IMAGE
  };
}

export function scriptJsonLd(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
}

export function sitemapForLocale(locale, pages) {
  const urls = pages.map((page) => {
    const loc = localeUrl(locale, page.path);
    const priority = page.id === "home" ? "1.0" : page.id === "blog" ? "0.8" : "0.7";
    const changefreq = page.id === "home" ? "weekly" : "monthly";
    return `  <url>
    <loc>${esc(loc)}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export function sitemapIndex() {
  const entries = LOCALES.map((locale) => `  <sitemap>
    <loc>${BASE_URL}/sitemap-${locale.path}.xml</loc>
  </sitemap>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;
}

export function robotsTxt() {
  return `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Yandex
Allow: /

User-agent: Baiduspider
Allow: /

Sitemap: ${BASE_URL}/sitemap-index.xml
`;
}
