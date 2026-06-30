import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { LOCALES, PAGES } from "./locales.js";
import { sitemapForLocale, sitemapIndex, robotsTxt } from "./seo.mjs";
import { renderHome, renderLegal, renderApp, renderBlog } from "./render.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const i18nDir = path.join(root, "i18n");
const distRoot = path.join(root, "public");

function copyPath(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyPath(path.join(src, entry), path.join(dest, entry));
    }
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function copyStaticAssets() {
  copyPath(path.join(root, "assets"), path.join(distRoot, "assets"));
  for (const file of ["manifest.webmanifest", "sw.js"]) {
    copyPath(path.join(root, file), path.join(distRoot, file));
  }
}

function loadTranslations(code) {
  const file = path.join(i18nDir, `${code}.json`);
  if (!fs.existsSync(file)) {
    throw new Error(`Missing translation file: i18n/${code}.json`);
  }
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeFileRelative(relPath, content) {
  const full = path.join(distRoot, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
}

function renderPage(locale, t, pageId) {
  switch (pageId) {
    case "home":
      return renderHome(locale, t);
    case "privacy":
      return renderLegal(locale, t, "privacy");
    case "terms":
      return renderLegal(locale, t, "terms");
    case "disclaimer":
      return renderLegal(locale, t, "disclaimer");
    case "app":
      return renderApp(locale, t);
    case "blog":
      return renderBlog(locale, t);
    default:
      throw new Error(`Unknown page: ${pageId}`);
  }
}

function rootRedirectHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="refresh" content="0; url=/en/" />
  <link rel="canonical" href="https://www.cognethra.org/en/" />
  <title>Cognethra</title>
  <script>location.replace("/en/");</script>
</head>
<body><p><a href="/en/">Cognethra</a></p></body>
</html>`;
}

console.log("Building Cognethra multilingual site…");

if (fs.existsSync(distRoot)) {
  fs.rmSync(distRoot, { recursive: true, force: true });
}
fs.mkdirSync(distRoot, { recursive: true });
copyStaticAssets();

for (const locale of LOCALES) {
  const t = loadTranslations(locale.code);
  console.log(`  → ${locale.path}`);

  for (const page of PAGES) {
    const html = renderPage(locale, t, page.id);
    const outPath = path.join(locale.path, page.file);
    writeFileRelative(outPath, html);
  }

  writeFileRelative(`sitemap-${locale.path}.xml`, sitemapForLocale(locale, PAGES));
}

writeFileRelative("sitemap-index.xml", sitemapIndex());
writeFileRelative("robots.txt", robotsTxt());
writeFileRelative("index.html", rootRedirectHtml());

console.log(`Built ${LOCALES.length} locales × ${PAGES.length} pages = ${LOCALES.length * PAGES.length} HTML files in public/.`);
