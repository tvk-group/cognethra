import { esc, seoHead, languageOptions, languageOptionsLegal, scriptJsonLd, jsonLdOrganization, jsonLdWebsite, jsonLdBreadcrumb, jsonLdFAQ, jsonLdArticle } from "./seo.mjs";
import { localeUrl } from "./locales.js";

function prefix(locale) {
  return `/${locale.path}`;
}

function asset(path) {
  return path.startsWith("/") ? path : `/${path}`;
}

function headCommon(locale, pageId, t, canonicalPath, jsonLdBlocks = "") {
  const meta = t.meta[pageId];
  const extra = pageId === "app"
    ? `<link rel="manifest" href="/manifest.webmanifest" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="Cognethra" />
  <meta name="mobile-web-app-capable" content="yes" />`
    : `<link rel="manifest" href="/manifest.webmanifest" />
  <link rel="icon" href="/assets/icons/cognethra-app-icon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/assets/icons/cognethra-app-icon.svg" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-title" content="Cognethra" />`;

  return `<!DOCTYPE html>
<html lang="${locale.hreflang}" dir="${locale.dir}">
<head>
  ${seoHead({ locale, pageId, meta, canonicalPath, extra })}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/assets/cognethra-home.css" />
  ${pageId === "app" ? '<link rel="stylesheet" href="/assets/cognethra-app.css" />' : ""}
  ${jsonLdBlocks}
  ${pageId === "home" ? '<script src="/assets/cognethra-home.js" defer></script>\n  <script src="/assets/cognethra-motion.js" defer></script>\n  <script src="/assets/pwa.js" defer></script>' : ""}
  ${pageId === "app" ? '<script src="/assets/cognethra-app.js" defer></script>\n  <script src="/assets/pwa.js" defer></script>\n  <script src="/assets/cognethra-motion.js" defer></script>' : ""}
</head>`;
}

function nav(locale, t, active = "") {
  const p = prefix(locale);
  const is = (id) => (active === id ? ' class="active"' : "");
  return `<header>
    <div class="container nav">
      <a href="${p}/" class="brand" aria-label="${esc(t.nav.brandHome)}"><span class="mark"></span><span>Cognethra</span></a>
      <nav class="nav-links" aria-label="${esc(t.nav.primaryNav)}">
        <a href="${p}/#about"${is("about")}>${esc(t.nav.about)}</a>
        <a href="${p}/#capabilities"${is("capabilities")}>${esc(t.nav.capabilities)}</a>
        <a href="${p}/#process"${is("process")}>${esc(t.nav.architecture)}</a>
        <a href="${p}/#ecosystem"${is("ecosystem")}>${esc(t.nav.ecosystem)}</a>
        <a href="${p}/#usecases"${is("usecases")}>${esc(t.nav.useCases)}</a>
        <a href="${p}/#roadmap"${is("roadmap")}>${esc(t.nav.roadmap)}</a>
        <a href="${p}/#faq"${is("faq")}>${esc(t.nav.faq)}</a>
        <a href="${p}/blog/cognitive-architecture-overview.html"${is("blog")}>${esc(t.nav.blog)}</a>
        <a href="${p}/app/" class="nav-app">${esc(t.nav.getApp)}</a>
        <span class="language-wrap">
          <select class="language-select" aria-label="${esc(t.nav.selectLanguage)}" data-language-select data-page-kind="home">
            ${languageOptions(locale)}
          </select>
        </span>
        <a href="${p}/#contact" class="nav-cta">${esc(t.nav.contact)}</a>
      </nav>
      <button class="mobile-toggle" type="button" aria-label="${esc(t.nav.openMenu)}" aria-expanded="false" data-mobile-toggle><span></span><span></span><span></span></button>
    </div>
    <div class="mobile-menu" data-mobile-menu><div class="mobile-menu-inner">
      <a href="${p}/#about">${esc(t.nav.about)}</a>
      <a href="${p}/#capabilities">${esc(t.nav.capabilities)}</a>
      <a href="${p}/#process">${esc(t.nav.architecture)}</a>
      <a href="${p}/#ecosystem">${esc(t.nav.ecosystem)}</a>
      <a href="${p}/#usecases">${esc(t.nav.useCases)}</a>
      <a href="${p}/#roadmap">${esc(t.nav.roadmap)}</a>
      <a href="${p}/#faq">${esc(t.nav.faq)}</a>
      <a href="${p}/blog/cognitive-architecture-overview.html">${esc(t.nav.blog)}</a>
      <a href="${p}/app/">${esc(t.nav.getApp)}</a>
      <label>${esc(t.nav.language)}
        <select class="language-select" aria-label="${esc(t.nav.selectLanguage)}" data-language-select data-page-kind="home">
          ${languageOptions(locale)}
        </select>
      </label>
      <a href="${p}/#contact" class="nav-cta">${esc(t.nav.contact)}</a>
    </div></div>
  </header>`;
}

function footer(locale, t) {
  const p = prefix(locale);
  return `<footer>
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-brand">Cognethra</div>
          <p>${esc(t.footer.tagline)}</p>
        </div>
        <div class="footer-col">
          <h4>${esc(t.footer.platform)}</h4>
          <div class="footer-links">
            <a href="${p}/#capabilities">${esc(t.nav.capabilities)}</a>
            <a href="${p}/#process">${esc(t.nav.architecture)}</a>
            <a href="${p}/#faq">${esc(t.nav.faq)}</a>
            <a href="${p}/#roadmap">${esc(t.nav.roadmap)}</a>
            <a href="${p}/blog/cognitive-architecture-overview.html">${esc(t.nav.blog)}</a>
            <a href="${p}/app/">${esc(t.footer.mobileApp)}</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>${esc(t.footer.ecosystem)}</h4>
          <div class="footer-links">
            <a href="https://www.sovra.network/">SOVRA Network</a>
            <a href="https://www.entelekron.org/">Entelekron</a>
            <a href="https://www.tvk.group/" target="_blank" rel="noopener">${esc(t.footer.tvkGroup)}</a>
            <a href="${p}/privacy.html">${esc(t.nav.privacy)}</a>
            <a href="${p}/terms.html">${esc(t.nav.terms)}</a>
            <a href="${p}/disclaimer.html">${esc(t.nav.disclaimer)}</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div>${esc(t.footer.copyright)}</div>
        <div class="footer-links">
          <a href="${p}/privacy.html">${esc(t.nav.privacy)}</a>
          <a href="${p}/terms.html">${esc(t.nav.terms)}</a>
          <a href="${p}/disclaimer.html">${esc(t.nav.disclaimer)}</a>
        </div>
      </div>
    </div>
  </footer>`;
}

export function renderHome(locale, t) {
  const p = prefix(locale);
  const url = localeUrl(locale);
  const jsonLd = [
    jsonLdOrganization(t),
    jsonLdWebsite(locale, t),
    jsonLdBreadcrumb([{ name: t.nav.home, url }]),
    jsonLdFAQ(t)
  ].map(scriptJsonLd).join("\n  ");

  const faqItems = t.faq.items.map((item) => `
          <details class="faq-item">
            <summary><h3>${esc(item.q)}</h3></summary>
            <p>${esc(item.a)}</p>
          </details>`).join("");

  return `${headCommon(locale, "home", t, "", jsonLd)}
<body data-page="home" data-locale="${locale.code}">
  <div class="subtle-grid" aria-hidden="true"></div>
  ${nav(locale, t)}
  <main>
    <section class="hero hero-cinematic">
      <canvas class="hero-network-canvas" data-hero-network aria-hidden="true"></canvas>
      <div class="container hero-grid">
        <div class="hero-copy">
          <div class="eyebrow"><span class="pulse-dot"></span> ${esc(t.hero.eyebrow)}</div>
          <h1>${esc(t.hero.title)}</h1>
          <span class="hero-subtitle">${esc(t.hero.subtitle)}</span>
          <p class="lead">${esc(t.hero.lead)}</p>
          <span class="home-supporting">${esc(t.hero.supporting)}</span>
          <div class="disclosure">${esc(t.hero.disclosure)}</div>
          <div class="actions">
            <a class="btn primary" href="${p}/#capabilities">${esc(t.hero.explore)}</a>
            <a class="btn secondary" href="${p}/#process">${esc(t.hero.architectureBtn)}</a>
            <a class="btn app-btn" href="${p}/app/">${esc(t.hero.getApp)}</a>
          </div>
        </div>
        <div class="hero-visual-wrap">
          <aside class="cmd-center" aria-label="${esc(t.hero.runtimePreview)}">
            <div class="cmd-topbar"><span>${esc(t.hero.cognitiveRuntime)}</span><span class="cmd-live">${esc(t.hero.devPreview)}</span></div>
            <div class="cmd-grid">
              <div class="cmd-panel"><h4>${esc(t.hero.reasoningGraph)}</h4><div class="cmd-map" aria-hidden="true"></div></div>
              <div class="cmd-panel"><h4>${esc(t.hero.memoryContext)}</h4><div class="cmd-nodes"><span class="cmd-node">GraphVAULT</span><span class="cmd-node warn">${esc(t.hero.entities)}</span><span class="cmd-node risk">${esc(t.hero.events)}</span></div></div>
              <div class="cmd-panel"><h4>${esc(t.hero.thoughtProofs)}</h4><div class="cmd-nodes"><span class="cmd-node">PoT</span><span class="cmd-node warn">MindDAO</span><span class="cmd-node">Seal</span></div></div>
              <div class="cmd-panel"><h4>${esc(t.hero.learningTimeline)}</h4><div class="cmd-timeline" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span></div></div>
              <div class="cmd-panel wide"><h4>${esc(t.hero.cognitiveLayer)}</h4><div class="cmd-nodes"><span class="cmd-node">${esc(t.hero.reasoning)}</span><span class="cmd-node">${esc(t.hero.memory)}</span><span class="cmd-node">${esc(t.hero.governance)}</span></div></div>
            </div>
          </aside>
        </div>
      </div>
    </section>
    <section style="padding-top:0" data-reveal><div class="container"><div class="stage-notice"><strong>${esc(t.stage.title)}</strong><span>${esc(t.stage.text)}</span></div></div></section>
    <section id="about" data-reveal><div class="container split">
      <div class="statement featured"><h3>${esc(t.about.featuredTitle)}</h3><p>${esc(t.about.featuredText)}</p></div>
      <div class="statement"><h3>${esc(t.about.sisterTitle)}</h3><p>${esc(t.about.sisterText)}</p></div>
    </div></section>
    <section id="capabilities" class="band-silver" data-reveal><div class="container">
      <div class="section-head centered"><div class="kicker">${esc(t.capabilities.kicker)}</div><h2>${esc(t.capabilities.title)}</h2><p class="section-text">${esc(t.capabilities.text)}</p></div>
      <div class="card-grid">
        <article class="card"><div class="card-icon">01</div><h3>${esc(t.capabilities.c1t)}</h3><p>${esc(t.capabilities.c1d)}</p></article>
        <article class="card"><div class="card-icon">02</div><h3>${esc(t.capabilities.c2t)}</h3><p>${esc(t.capabilities.c2d)}</p></article>
        <article class="card"><div class="card-icon">03</div><h3>${esc(t.capabilities.c3t)}</h3><p>${esc(t.capabilities.c3d)}</p></article>
        <article class="card"><div class="card-icon">04</div><h3>${esc(t.capabilities.c4t)}</h3><p>${esc(t.capabilities.c4d)}</p></article>
        <article class="card"><div class="card-icon">05</div><h3>${esc(t.capabilities.c5t)}</h3><p>${esc(t.capabilities.c5d)}</p></article>
        <article class="card"><div class="card-icon">06</div><h3>${esc(t.capabilities.c6t)}</h3><p>${esc(t.capabilities.c6d)}</p></article>
      </div>
      <p class="section-text" style="margin-top:24px;text-align:center"><a href="${p}/blog/cognitive-architecture-overview.html">${esc(t.internal.learnArchitecture)}</a> · <a href="${p}/app/">${esc(t.internal.installApp)}</a></p>
    </div></section>
    <section id="process" data-reveal><div class="container">
      <div class="section-head centered"><div class="kicker">${esc(t.process.kicker)}</div><h2>${esc(t.process.title)}</h2><p class="section-text">${esc(t.process.text)}</p></div>
      <div class="process-grid">
        <div class="process-step"><strong>${esc(t.process.l1)}</strong><h3>${esc(t.process.l1t)}</h3><p>${esc(t.process.l1d)}</p></div>
        <div class="process-step"><strong>${esc(t.process.l2)}</strong><h3>${esc(t.process.l2t)}</h3><p>${esc(t.process.l2d)}</p></div>
        <div class="process-step"><strong>${esc(t.process.l3)}</strong><h3>${esc(t.process.l3t)}</h3><p>${esc(t.process.l3d)}</p></div>
        <div class="process-step"><strong>${esc(t.process.l4)}</strong><h3>${esc(t.process.l4t)}</h3><p>${esc(t.process.l4d)}</p></div>
      </div>
    </div></section>
    <section id="ecosystem" data-reveal><div class="container"><div class="dark-band stack-layout">
      <div><div class="kicker">${esc(t.ecosystem.kicker)}</div><h2>${esc(t.ecosystem.title)}</h2><p class="section-text">${esc(t.ecosystem.text)}</p>
        <p class="section-text"><a href="https://www.sovra.network/" rel="noopener">SOVRA</a> · <a href="https://www.entelekron.org/" rel="noopener">Entelekron</a> · <a href="${p}/blog/cognitive-architecture-overview.html">${esc(t.internal.readMore)}</a></p></div>
      <div class="layers">
        <div class="layer"><span>${esc(t.ecosystem.sovraCore)}</span><span>${esc(t.ecosystem.sovraCoreD)}</span></div>
        <div class="layer"><span>${esc(t.ecosystem.cerebthra)}</span><span>${esc(t.ecosystem.cerebthraD)}</span></div>
        <div class="layer"><span>${esc(t.ecosystem.graphvault)}</span><span>${esc(t.ecosystem.graphvaultD)}</span></div>
        <div class="layer"><span>${esc(t.ecosystem.chronoseal)}</span><span>${esc(t.ecosystem.chronosealD)}</span></div>
        <div class="layer"><span>${esc(t.ecosystem.minddao)}</span><span>${esc(t.ecosystem.minddaoD)}</span></div>
        <div class="layer"><span>${esc(t.ecosystem.entelevault)}</span><span>${esc(t.ecosystem.entelevaultD)}</span></div>
        <div class="layer"><span>${esc(t.ecosystem.sentient)}</span><span>${esc(t.ecosystem.sentientD)}</span></div>
        <div class="layer"><span>${esc(t.ecosystem.ava)}</span><span>${esc(t.ecosystem.avaD)}</span></div>
      </div>
    </div></div></section>
    <section id="usecases" class="band-silver" data-reveal><div class="container">
      <div class="section-head centered"><div class="kicker">${esc(t.usecases.kicker)}</div><h2>${esc(t.usecases.title)}</h2><p class="section-text">${esc(t.usecases.text)}</p></div>
      <div class="card-grid">
        <article class="card"><div class="card-icon">AI</div><h3>${esc(t.usecases.u1t)}</h3><p>${esc(t.usecases.u1d)}</p></article>
        <article class="card"><div class="card-icon">DAO</div><h3>${esc(t.usecases.u2t)}</h3><p>${esc(t.usecases.u2d)}</p></article>
        <article class="card"><div class="card-icon">DOC</div><h3>${esc(t.usecases.u3t)}</h3><p>${esc(t.usecases.u3d)}</p></article>
        <article class="card"><div class="card-icon">VAL</div><h3>${esc(t.usecases.u4t)}</h3><p>${esc(t.usecases.u4d)}</p></article>
        <article class="card"><div class="card-icon">SIG</div><h3>${esc(t.usecases.u5t)}</h3><p>${esc(t.usecases.u5d)}</p></article>
        <article class="card"><div class="card-icon">HCI</div><h3>${esc(t.usecases.u6t)}</h3><p>${esc(t.usecases.u6d)}</p></article>
      </div>
    </div></section>
    <section id="roadmap" data-reveal><div class="container">
      <div class="section-head centered"><div class="kicker">${esc(t.roadmap.kicker)}</div><h2>${esc(t.roadmap.title)}</h2></div>
      <div class="timeline">
        <div class="timeline-step"><strong>${esc(t.roadmap.p1)}</strong><div><h3>${esc(t.roadmap.p1t)}</h3><p>${esc(t.roadmap.p1d)}</p></div></div>
        <div class="timeline-step"><strong>${esc(t.roadmap.p2)}</strong><div><h3>${esc(t.roadmap.p2t)}</h3><p>${esc(t.roadmap.p2d)}</p></div></div>
        <div class="timeline-step"><strong>${esc(t.roadmap.p3)}</strong><div><h3>${esc(t.roadmap.p3t)}</h3><p>${esc(t.roadmap.p3d)}</p></div></div>
        <div class="timeline-step"><strong>${esc(t.roadmap.p4)}</strong><div><h3>${esc(t.roadmap.p4t)}</h3><p>${esc(t.roadmap.p4d)}</p></div></div>
      </div>
    </div></section>
    <section id="faq" class="band-silver" data-reveal><div class="container">
      <div class="section-head centered"><div class="kicker">${esc(t.faq.kicker)}</div><h2>${esc(t.faq.title)}</h2><p class="section-text">${esc(t.faq.text)}</p></div>
      <div class="faq-list">${faqItems}</div>
    </div></section>
    <section class="app-promo-section" data-reveal><div class="container"><div class="app-promo">
      <div class="app-promo-copy"><div class="kicker">${esc(t.appPromo.kicker)}</div><h2>${esc(t.appPromo.title)}</h2><p>${esc(t.appPromo.text)}</p>
        <div class="app-promo-actions"><a class="btn primary" href="${p}/app/">${esc(t.appPromo.openApp)}</a><a class="btn secondary" href="${p}/app/#install">${esc(t.appPromo.howInstall)}</a></div></div>
      <div class="app-promo-steps">
        <div class="install-step"><h3>${esc(t.appPromo.iphone)}</h3><p>${esc(t.appPromo.iphoneD)}</p></div>
        <div class="install-step"><h3>${esc(t.appPromo.android)}</h3><p>${esc(t.appPromo.androidD)}</p></div>
        <div class="install-step"><h3>${esc(t.appPromo.desktop)}</h3><p>${esc(t.appPromo.desktopD)}</p></div>
      </div>
    </div></div></section>
    <section id="contact" data-reveal><div class="container"><div class="cta-band">
      <div><div class="kicker">${esc(t.contact.kicker)}</div><h2>${esc(t.contact.title)}</h2><p>${esc(t.contact.text)}</p></div>
      <div class="actions"><a class="btn primary" href="mailto:team@cognethra.org">${esc(t.contact.emailBtn)}</a><a class="btn secondary" href="https://www.sovra.network/">${esc(t.contact.sovra)}</a><a class="btn secondary" href="https://www.entelekron.org/">${esc(t.contact.entelekron)}</a></div>
    </div></div></section>
  </main>
  ${footer(locale, t)}
</body></html>`;
}

export function renderLegal(locale, t, kind) {
  const p = prefix(locale);
  const l = t.legal[kind];
  const pagePath = `${kind}.html`;
  const url = localeUrl(locale, pagePath);
  const jsonLd = [
    jsonLdOrganization(t),
    jsonLdBreadcrumb([
      { name: t.nav.home, url: localeUrl(locale) },
      { name: l.h1, url }
    ])
  ].map(scriptJsonLd).join("\n  ");

  return `${headCommon(locale, kind, t, pagePath, jsonLd)}
<body data-locale="${locale.code}">
  <div class="subtle-grid" aria-hidden="true"></div>
  <header class="header-scrolled"><div class="container nav">
    <a href="${p}/" class="brand"><span class="mark"></span><span>Cognethra</span></a>
    <nav class="nav-links" aria-label="${esc(t.nav.primaryNav)}">
      <a href="${p}/">${esc(t.nav.home)}</a>
      <a href="${p}/app/">${esc(t.nav.app)}</a>
      <a href="${p}/privacy.html">${esc(t.nav.privacy)}</a>
      <a href="${p}/terms.html">${esc(t.nav.terms)}</a>
      <a href="${p}/disclaimer.html">${esc(t.nav.disclaimer)}</a>
      <span class="language-wrap"><select class="language-select" aria-label="${esc(t.nav.selectLanguage)}" data-language-select data-page-kind="${kind}">
        ${languageOptionsLegal(locale, pagePath)}
      </select></span>
    </nav>
  </div></header>
  <main class="legal-page"><div class="container">
    <h1>${esc(l.h1)}</h1>
    <p class="updated">${esc(l.updated)}</p>
    <p>${esc(l.intro)}</p>
    <h2>${esc(l.s1t)}</h2><p>${esc(l.s1p)}</p>
    <h2>${esc(l.s2t)}</h2><p>${esc(l.s2p)}</p>
    <h2>${esc(l.s3t)}</h2><p>${esc(l.s3p)}</p>
    ${l.s4p ? `<h2>${esc(l.s4t)}</h2><p>${esc(l.s4p)}${kind === "privacy" ? ` <a href="mailto:team@cognethra.org">team@cognethra.org</a>` : ""}</p>` : l.s4t ? `<h2>${esc(l.s4t)}</h2><p><a href="mailto:team@cognethra.org">team@cognethra.org</a></p>` : ""}
    ${l.s5t ? `<h2>${esc(l.s5t)}</h2><p><a href="mailto:team@cognethra.org">team@cognethra.org</a></p>` : ""}
    <p style="margin-top:32px"><a href="${p}/">${esc(t.legal.back)}</a></p>
    <p class="section-text">${esc(t.footer.relatedLinks)}: <a href="${p}/privacy.html">${esc(t.nav.privacy)}</a> · <a href="${p}/terms.html">${esc(t.nav.terms)}</a> · <a href="${p}/disclaimer.html">${esc(t.nav.disclaimer)}</a></p>
  </div></main>
  ${footer(locale, t)}
</body></html>`;
}

export function renderApp(locale, t) {
  const p = prefix(locale);
  const url = localeUrl(locale, "app/");
  const jsonLd = [
    jsonLdOrganization(t),
    jsonLdBreadcrumb([
      { name: t.nav.home, url: localeUrl(locale) },
      { name: t.nav.app, url }
    ])
  ].map(scriptJsonLd).join("\n  ");
  const a = t.appPage;

  return `${headCommon(locale, "app", t, "app/", jsonLd)}
<body class="app-shell" data-page="app" data-locale="${locale.code}">
  <header class="app-topbar"><a href="${p}/app/" class="app-brand" aria-label="${esc(a.brandHome)}"><span class="app-mark" aria-hidden="true"></span><span>Cognethra</span></a>
    <span class="language-wrap"><select class="language-select" aria-label="${esc(t.nav.selectLanguage)}" data-language-select data-page-kind="app">${languageOptionsLegal(locale, "app/")}</select></span>
  </header>
  <main class="app-main">
    <section class="app-panel active" data-panel="home">
      <div class="app-hero-bg" aria-hidden="true"><canvas class="app-network-canvas" data-hero-network></canvas></div>
      <div class="app-hero"><div class="app-badge">${esc(a.badge)}</div><img class="app-icon" src="/assets/icons/cognethra-app-icon.svg" alt="" width="72" height="72" /><h1>${esc(a.title)}</h1><p class="lead">${esc(a.lead)}</p><button type="button" class="app-install-btn" id="pwa-install-btn" hidden>${esc(a.installBtn)}</button></div>
      <nav class="app-actions" aria-label="${esc(a.quickActions)}">
        <a class="app-action-card" href="#runtime" data-goto-tab="runtime"><strong>${esc(a.runtime)}</strong><span>${esc(a.runtimeD)}</span></a>
        <a class="app-action-card" href="#memory" data-goto-tab="memory"><strong>${esc(a.memory)}</strong><span>${esc(a.memoryD)}</span></a>
        <a class="app-action-card" href="#research" data-goto-tab="research"><strong>${esc(a.research)}</strong><span>${esc(a.researchD)}</span></a>
        <a class="app-action-card" href="${p}/#ecosystem"><strong>${esc(a.ecosystem)}</strong><span>${esc(a.ecosystemD)}</span></a>
      </nav>
      <section class="app-section" id="install"><h2>${esc(a.howInstall)}</h2><div class="install-steps">
        <div class="install-step"><h3>${esc(a.iphone)}</h3><p>${esc(a.iphoneD)}</p></div>
        <div class="install-step" id="pwa-ios-hint" hidden><h3>${esc(a.iphone)}</h3><p>${esc(a.iphoneHint)}</p></div>
        <div class="install-step"><h3>${esc(a.android)}</h3><p>${esc(a.androidD)}</p></div>
        <div class="install-step"><h3>${esc(a.desktop)}</h3><p>${esc(a.desktopD)}</p></div>
      </div><p class="app-muted" style="margin-top:14px">${esc(a.installNote)}</p></section>
      <p class="app-site-link">${esc(a.fullSite)} <a href="${p}/">www.cognethra.org</a></p>
    </section>
    <section class="app-panel" data-panel="runtime"><aside class="cmd-center" aria-label="${esc(a.runtimePreview)}">
      <div class="cmd-topbar"><span>${esc(t.hero.cognitiveRuntime)}</span><span class="cmd-live">${esc(t.hero.devPreview)}</span></div>
      <div class="cmd-grid">
        <div class="cmd-panel"><h4>${esc(t.hero.reasoningGraph)}</h4><div class="cmd-map" aria-hidden="true"></div></div>
        <div class="cmd-panel"><h4>${esc(t.hero.thoughtProofs)}</h4><div class="cmd-nodes"><span class="cmd-node">PoT</span><span class="cmd-node warn">MindDAO</span><span class="cmd-node risk">ChronoSeal</span></div></div>
        <div class="cmd-panel"><h4>${esc(a.agentCognition)}</h4><div class="cmd-nodes"><span class="cmd-node">SOVRA</span><span class="cmd-node warn">${esc(a.planning)}</span><span class="cmd-node">${esc(a.context)}</span></div></div>
        <div class="cmd-panel"><h4>${esc(t.hero.learningTimeline)}</h4><div class="cmd-timeline" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span></div></div>
        <div class="cmd-panel wide"><h4>${esc(a.cognitiveLayer)}</h4><div class="cmd-nodes"><span class="cmd-node">${esc(t.hero.reasoning)}</span><span class="cmd-node">${esc(t.hero.memory)}</span><span class="cmd-node">${esc(a.proof)}</span></div></div>
      </div>
    </aside></section>
    <section class="app-panel" data-panel="memory"><div class="memory-card"><h2>${esc(a.memoryLayer)}</h2><p>${esc(a.memoryLayerD)}</p><div class="memory-stats">
      <div class="memory-stat"><label>${esc(a.entities)}</label><strong>—</strong></div>
      <div class="memory-stat"><label>${esc(a.relations)}</label><strong>—</strong></div>
      <div class="memory-stat"><label>${esc(a.events)}</label><strong>—</strong></div>
      <div class="memory-stat"><label>${esc(a.contextDepth)}</label><strong>—</strong></div>
    </div></div></section>
    <section class="app-panel" data-panel="research"><div class="research-card"><h2>${esc(a.researchNetwork)}</h2><p>${esc(a.researchNetworkD)}</p><a class="btn" href="mailto:team@cognethra.org">${esc(a.contactBtn)}</a></div></section>
  </main>
  <div id="pwa-install-banner" hidden><span>${esc(a.banner)}</span><button type="button" id="pwa-install-banner-btn">${esc(a.bannerInstall)}</button></div>
  <nav class="app-tabbar" aria-label="${esc(a.appNav)}">
    <a href="#home" data-tab="home" class="active" aria-current="page"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V9.5z"/></svg><span>${esc(a.tabHome)}</span></a>
    <a href="#runtime" data-tab="runtime"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg><span>${esc(a.tabRuntime)}</span></a>
    <a href="#memory" data-tab="memory"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg><span>${esc(a.tabMemory)}</span></a>
    <a href="#research" data-tab="research"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg><span>${esc(a.tabResearch)}</span></a>
  </nav>
</body></html>`;
}

export function renderBlog(locale, t) {
  const p = prefix(locale);
  const pagePath = "blog/cognitive-architecture-overview.html";
  const url = localeUrl(locale, pagePath);
  const b = t.blog;
  const jsonLd = [
    jsonLdOrganization(t),
    jsonLdArticle({ locale, t, url }),
    jsonLdBreadcrumb([
      { name: t.nav.home, url: localeUrl(locale) },
      { name: t.nav.blog, url: localeUrl(locale, "blog/cognitive-architecture-overview.html") },
      { name: b.title, url }
    ])
  ].map(scriptJsonLd).join("\n  ");

  return `${headCommon(locale, "blog", t, pagePath, jsonLd)}
<body data-locale="${locale.code}">
  <div class="subtle-grid" aria-hidden="true"></div>
  ${nav(locale, t, "blog")}
  <main class="legal-page article-page"><div class="container">
    <nav class="breadcrumb" aria-label="Breadcrumb"><a href="${p}/">${esc(b.breadcrumbHome)}</a> / <a href="${p}/blog/cognitive-architecture-overview.html">${esc(b.breadcrumbBlog)}</a> / <span>${esc(b.title)}</span></nav>
    <p class="updated">${esc(b.published)} · ${esc(b.readTime)} · ${esc(b.author)}</p>
    <h1>${esc(b.title)}</h1>
    <p class="lead">${esc(b.excerpt)}</p>
    <p>${esc(b.intro)}</p>
    <h2>${esc(b.s1t)}</h2><p>${esc(b.s1p)}</p>
    <h2>${esc(b.s2t)}</h2><p>${esc(b.s2p)}</p>
    <h2>${esc(b.s3t)}</h2><p>${esc(b.s3p)}</p>
    <h2>${esc(b.s4t)}</h2><p>${esc(b.s4p)}</p>
    <section style="margin-top:40px;padding:24px;border:1px solid var(--line);border-radius:12px;background:white">
      <h2>${esc(b.relatedTitle)}</h2>
      <p><a href="${p}/#capabilities">${esc(b.relatedCapabilities)}</a> · <a href="${p}/#process">${esc(b.relatedArchitecture)}</a> · <a href="${p}/app/">${esc(b.relatedApp)}</a> · <a href="mailto:team@cognethra.org">${esc(b.relatedContact)}</a></p>
    </section>
    <p style="margin-top:32px"><a href="${p}/">${esc(t.legal.back)}</a></p>
  </div></main>
  ${footer(locale, t)}
</body></html>`;
}
