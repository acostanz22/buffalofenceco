import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { services, locations, homeFaqs } from "./data.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const SITE = "https://www.albuquerquefencecompany.net";
const PHONE = "(505) 210-9903";
const TEL = "+15052109903";
const NAME = "Albuquerque Fence Company";
const SOURCE = "Albuquerque Fence Company";
const TALLY = `https://tally.so/embed/xX6B0y?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&source=${encodeURIComponent(SOURCE)}`;

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const paras = (items) =>
  items
    .map((p) => `<p>${p}</p>`)
    .join("\n");

const logo = (href) => `<a class="logo" href="${href}" aria-label="${NAME} home">
  <svg viewBox="0 0 40 40" aria-hidden="true">
    <rect width="40" height="40" rx="6" fill="#161616"/>
    <rect x="6" y="7" width="3" height="26" fill="#c90000"/>
    <rect x="18.5" y="7" width="3" height="26" fill="#c90000"/>
    <rect x="31" y="7" width="3" height="26" fill="#c90000"/>
    <rect x="6" y="13" width="28" height="2.4" fill="#c90000"/>
    <rect x="6" y="22" width="28" height="2.4" fill="#c90000"/>
  </svg>
  <span><strong>ALBUQUERQUE</strong><small>FENCE COMPANY</small></span>
</a>`;

function nav(active, quoteHref) {
  const item = (href, label) =>
    `<a href="${href}"${active === href ? ' aria-current="page"' : ""}>${label}</a>`;
  const serviceLinks = services
    .map((s) => `<li><a href="${s.slug}">${esc(s.nav)}</a></li>`)
    .join("");
  return `<header class="site-header">
    <div class="wrap header-inner">
      ${logo("index.html")}
      <button class="menu-btn" type="button" data-menu aria-expanded="false" aria-controls="site-nav">Menu</button>
      <nav class="nav" id="site-nav" data-nav aria-label="Primary">
        <div class="nav-drop">
          <button type="button" aria-expanded="false">Services</button>
          <ul>
            <li><a href="services.html">All services</a></li>
            ${serviceLinks}
          </ul>
        </div>
        ${item("service-areas.html", "Service Areas")}
        ${item("faq.html", "FAQs")}
        ${item("about.html", "About")}
        ${item("contact.html", "Contact")}
        <a class="btn header-cta" href="${quoteHref}">Estimate</a>
      </nav>
    </div>
  </header>`;
}

function footer() {
  const svc = services.map((s) => `<li><a href="${s.slug}">${esc(s.nav)}</a></li>`).join("");
  return `<footer class="site-footer">
    <div class="wrap footer-grid">
      <div>
        <h2>Company</h2>
        <p>Fence installation and repair for homes, acreage, and commercial lots in Albuquerque and nearby communities.</p>
        <p>Service-area business. No public storefront.</p>
        <p><a href="tel:${TEL}">${PHONE}</a></p>
        <ul>
          <li><a href="about.html">About</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="faq.html">FAQs</a></li>
          <li><a href="privacy.html">Privacy</a></li>
        </ul>
      </div>
      <div>
        <h2>Services</h2>
        <ul>${svc}</ul>
      </div>
      <div>
        <h2>Quick Links</h2>
        <ul>
          <li><a href="service-areas.html">Service Areas</a></li>
          <li><a href="services.html">All services</a></li>
          <li><a href="contact.html#quote">Request an estimate</a></li>
          <li><a href="faq.html">Fence FAQs</a></li>
          <li><a href="sitemap.xml">Sitemap</a></li>
        </ul>
      </div>
    </div>
    <div class="wrap fine">
      <p>&copy; ${new Date().getFullYear()} ${NAME}. Also known as Albuquerque's Premier Fence Company. All rights reserved.</p>
    </div>
  </footer>`;
}

function callbar(quoteHref) {
  return `<div class="callbar" data-callbar>
    <a class="btn btn-dark" href="tel:${TEL}">Call ${PHONE}</a>
    <a class="btn" href="${quoteHref}">Request estimate</a>
    <button class="dismiss" type="button" data-dismiss-bar aria-label="Dismiss call bar">&times;</button>
  </div>`;
}

function quoteCard() {
  return `<div class="quote-card" id="quote">
    <h2>Get a free quote</h2>
    <p>Tell us the city, the material, and roughly how much fence. We use this to call you back about the job.</p>
    <iframe data-tally-src="${TALLY}" loading="lazy" width="100%" height="552" frameborder="0" marginheight="0" marginwidth="0" title="Get a free quote"></iframe>
  </div>
  <script>var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);}</script>`;
}

function crumbs(items) {
  const list = items
    .map((c, i) =>
      i === items.length - 1
        ? `<li aria-current="page">${esc(c.label)}</li>`
        : `<li><a href="${c.href}">${esc(c.label)}</a></li>`
    )
    .join("");
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${list}</ol></nav>`;
}

function faqBlock(faqs) {
  return `<div class="faqs">${faqs
    .map(
      (f) => `<details>
        <summary>${esc(f.q)}</summary>
        <p>${f.a}</p>
      </details>`
    )
    .join("")}</div>`;
}

function cards(list) {
  return `<div class="cards">${list
    .map(
      (s) => `<a class="card" href="${s.slug}">
        <img src="${s.image}" alt="${esc(s.alt)}" width="800" height="533">
        <span class="card-body">
          <h3>${esc(s.name)}</h3>
          <p>${esc(s.card)}</p>
          <span class="more">Details</span>
        </span>
      </a>`
    )
    .join("")}</div>`;
}

function related(slugs) {
  const links = slugs
    .map((slug) => {
      const s = services.find((x) => x.slug === slug);
      return `<a href="${slug}">${esc(s.nav)}</a>`;
    })
    .join("");
  return `<div class="related">${links}</div>`;
}

function serviceGallery(s) {
  const alt = (services.find((x) => s.related.includes(x.slug) && x.image !== s.image)) || services.find((x) => x.slug !== s.slug && x.image !== s.image);
  const shots = [s, alt]
    .filter(Boolean)
    .map(
      (x) => `<figure class="service-shot"><img src="${x.image}" alt="${esc(x.alt)}" width="800" height="533" loading="lazy" decoding="async"></figure>`
    )
    .join("");
  return `<div class="service-gallery">${shots}</div>`;
}

function sideLinks(slugs) {
  const items = slugs
    .map((slug) => {
      const x = services.find((y) => y.slug === slug);
      return `<li><a href="${slug}">${esc(x.nav)}</a></li>`;
    })
    .join("");
  return `<ul class="side-links">${items}</ul>`;
}

function businessNode() {
  return {
    "@type": ["HomeAndConstructionBusiness", "GeneralContractor"],
    "@id": `${SITE}/#business`,
    name: NAME,
    alternateName: "Albuquerque's Premier Fence Company",
    url: `${SITE}/`,
    telephone: TEL,
    image: `${SITE}/images/hero.jpg`,
    description:
      "Fence installation and repair for homes, acreage, and commercial lots in Albuquerque, New Mexico and nearby communities.",
    areaServed: locations.map((l) => ({
      "@type": "City",
      name: l.name,
      containedInPlace: { "@type": "State", name: "New Mexico" }
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Albuquerque",
      addressRegion: "NM",
      addressCountry: "US"
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Fence services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          url: `${SITE}/${s.slug}`
        }
      }))
    }
  };
}

function jsonLd(graph) {
  const data = { "@context": "https://schema.org", "@graph": graph };
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;
}

function layout({ title, description, canonical, active, quoteHref, body, graph, home = false }) {
  const pathName = canonical.replace(SITE, "") || "/";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonical}">
  <meta property="og:site_name" content="${NAME}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${SITE}/images/hero.jpg">
  <meta property="og:locale" content="en_US">
  <meta name="theme-color" content="#0d0d0d">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600&amp;family=Source+Sans+3:wght@400;600;700&amp;display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/styles.css">
  ${home ? '<link rel="preload" as="image" href="images/hero.jpg">' : ""}
  ${jsonLd(graph)}
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <div class="topbar">
    <div class="wrap topbar-inner">
      <span>Albuquerque, New Mexico</span>
      <a href="tel:${TEL}">${PHONE}</a>
    </div>
  </div>
  ${nav(active, quoteHref)}
  <main id="main">
    ${body}
  </main>
  ${footer()}
  ${callbar(quoteHref)}
  <script src="assets/site.js"></script>
</body>
</html>`;
}

function pageGraph({ canonical, title, description, crumbsItems, faqs, service }) {
  const graph = [
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: `${SITE}/`,
      name: NAME,
      publisher: { "@id": `${SITE}/#business` }
    },
    businessNode(),
    {
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: title,
      description,
      isPartOf: { "@id": `${SITE}/#website` },
      about: service ? { "@id": `${canonical}#service` } : { "@id": `${SITE}/#business` },
      breadcrumb: crumbsItems ? { "@id": `${canonical}#breadcrumb` } : undefined
    }
  ];
  if (service) {
    graph.push({
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: service.name,
      serviceType: service.name,
      url: canonical,
      description: service.lede,
      provider: { "@id": `${SITE}/#business` },
      areaServed: { "@type": "City", name: "Albuquerque" }
    });
  }
  if (crumbsItems) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: crumbsItems.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.label,
        item: c.href.startsWith("http") ? c.href : `${SITE}/${c.href === "index.html" ? "" : c.href}`
      }))
    });
  }
  if (faqs) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a.replace(/<[^>]+>/g, "") }
      }))
    });
  }
  return graph;
}

function cta(heading, text) {
  return `<section class="cta-band">
    <div class="wrap">
      <h2>${esc(heading)}</h2>
      <p class="lede">${text}</p>
      <div class="actions">
        <a class="btn" href="contact.html#quote">Request an estimate</a>
        <a class="btn btn-ghost" href="tel:${TEL}">Call ${PHONE}</a>
      </div>
    </div>
  </section>`;
}

function write(file, html) {
  fs.writeFileSync(path.join(root, file), html);
}

const homeBody = `<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <p class="eyebrow">Albuquerque, New Mexico</p>
      <h1>Fence Company in Albuquerque, NM</h1>
      <p class="lede"><a href="wood-fencing.html">Wood</a>, <a href="vinyl-fencing.html">vinyl</a>, <a href="aluminum-fencing.html">aluminum</a>, <a href="chain-link-fencing.html">chain link</a>, and <a href="metal-fencing.html">steel</a> fences for houses, acreage, and commercial lots. New lines, <a href="fence-repair.html">repairs</a>, and <a href="gate-installation.html">gates</a> — quoted from the property, not a catalog.</p>
      <div class="hero-actions">
        <a class="btn" href="#quote">Request an estimate</a>
        <a class="btn btn-ghost" href="tel:${TEL}">Call ${PHONE}</a>
      </div>
    </div>
    ${quoteCard()}
  </div>
</section>
<section class="section">
  <div class="wrap">
    <h2>What we install and fix</h2>
    <p class="intro">Start with the job, then the material. A backyard screen, a horse lot, a front-yard picket, and a storage yard are not the same fence.</p>
    ${cards(services)}
  </div>
</section>
<section class="section" style="padding-top:0">
  <div class="wrap">
    <div class="panel-grid">
      <article class="panel">
        <h2>Houses</h2>
        <p>Backyard privacy, pet yards, low front-yard fences, and replacements on city and subdivision lots. Most Albuquerque house jobs are wood or vinyl, with a gate that clears the mower, or chain link where a screen is not the point.</p>
        <p><a href="services.html">See residential fence services</a></p>
      </article>
      <article class="panel">
        <h2>Lots and sites</h2>
        <p>Acreage needs rail, wire, or pipe. A commercial yard needs a heavier chain-link spec and a gate a truck can use. A backyard panel is the wrong product for both.</p>
        <p><a href="farm-fencing.html">Farm fencing</a> · <a href="commercial-fencing.html">Commercial fencing</a></p>
      </article>
    </div>
  </div>
</section>
<section class="section" style="padding-top:0">
  <div class="wrap">
    <h2>How to choose a fence for the lot</h2>
    <ul class="choose">
      <li><h3>Name the job</h3><p>Screen a yard, contain a dog, hold livestock, or secure a work site. Those four goals pick the material faster than a style photo.</p></li>
      <li><h3>Account for wind and caliche</h3><p>Solid panels catch spring wind, especially on the West Mesa. A lot of the digging is caliche or rock, and that changes the posts.</p></li>
      <li><h3>Count the openings</h3><p>A fence with the wrong gate is a daily problem. Walk gates, drive gates, and farm gates are part of the layout.</p></li>
      <li><h3>Repair what is still sound</h3><p>Tight posts can take new panels. Posts that have walked out of line cannot. Start with <a href="fence-repair.html">fence repair</a> if the line is mostly intact.</p></li>
    </ul>
  </div>
</section>
<section class="section" style="padding-top:0">
  <div class="wrap split">
    <img src="images/gates.jpg" alt="Fence hinge hardware being adjusted" width="800" height="533">
    <div>
      <h2>Repairs and gates</h2>
      <p>Leaning posts, missing boards, and dragging gates are a large share of the calls. If the rest of the line is sound, we repair it. If the posts have failed, we will say replacement is the better spend.</p>
      <p><a href="fence-repair.html">Fence repair</a> · <a href="gate-installation.html">Gates</a></p>
    </div>
  </div>
</section>
<section class="section" style="padding-top:0">
  <div class="wrap">
    <h2>Service area</h2>
    <p class="intro">We schedule fence work in Albuquerque and nearby communities. The towns below are the ones we plan around. Rules, soil, and lot size change from one to the next.</p>
    <div class="area-grid">
      ${locations
        .map(
          (l) => `<a class="area-card" href="${l.slug}"><strong>${esc(l.name)}</strong><span>${esc(l.card)}</span></a>`
        )
        .join("")}
    </div>
    <p style="margin-top:16px"><a href="service-areas.html">All service areas</a></p>
  </div>
</section>
<section class="section" style="padding-top:0">
  <div class="wrap">
    <h2>Questions before you call</h2>
    ${faqBlock(homeFaqs)}
    <p style="margin-top:16px"><a href="faq.html">More fence questions</a></p>
  </div>
</section>
${cta("Ready to talk through the line?", `Call ${PHONE} or send the lot details. We will tell you if the job is a repair, a replacement, or a different material than you started with.`)}`;

const homeCanonical = `${SITE}/`;
write(
  "index.html",
  layout({
    title: "Fence Company in Albuquerque, NM | Albuquerque Fence Company",
    description:
      "Wood, vinyl, chain link, aluminum, and metal fence installation and repair in Albuquerque, NM. Gates and farm fencing. Call (505) 210-9903 for an estimate.",
    canonical: homeCanonical,
    active: "index.html",
    quoteHref: "#quote",
    home: true,
    body: homeBody,
    graph: pageGraph({
      canonical: homeCanonical,
      title: "Fence Company in Albuquerque, NM",
      description:
        "Fence installation and repair in Albuquerque, New Mexico for homes, acreage, and commercial lots.",
      faqs: homeFaqs
    })
  })
);

for (const s of services) {
  const canonical = `${SITE}/${s.slug}`;
  const crumbItems = [
    { href: "index.html", label: "Home" },
    { href: "services.html", label: "Services" },
    { href: s.slug, label: s.name }
  ];
  const body = `<div class="crumb-bar"><div class="wrap">${crumbs(crumbItems)}</div></div>
  <section class="hero slim-hero service-hero">
    <div class="wrap service-hero-inner">
      <p class="eyebrow">${esc(s.nav)}</p>
      <h1>${esc(s.h1)}</h1>
      <p class="lede">${esc(s.lede)}</p>
      <div class="hero-actions">
        <a class="btn" href="tel:${TEL}">Call ${PHONE}</a>
        <a class="btn btn-ghost" href="contact.html#quote">Request an estimate</a>
      </div>
    </div>
  </section>
  <section class="section service-body">
    <div class="wrap service-layout">
      <div class="service-main">
        ${serviceGallery(s)}
        <div class="service-copy">
          <h2>${esc(s.whenTitle)}</h2>
          ${paras(s.when)}
          <h2>${esc(s.processTitle)}</h2>
          <ol class="steps">
            ${s.process.map((step) => `<li class="step"><h3>${esc(step.t)}</h3><p>${esc(step.d)}</p></li>`).join("")}
          </ol>
          <h2>${esc(s.costTitle)}</h2>
          <p class="intro">We do not publish a price list. These are the details that move an estimate.</p>
          <div class="factor-grid">
            ${s.costs.map((c) => `<article class="factor"><h3>${esc(c.t)}</h3><p>${esc(c.d)}</p></article>`).join("")}
          </div>
          <h2>Questions before you call</h2>
          ${faqBlock(s.faqs)}
        </div>
      </div>
      <aside class="service-aside" aria-label="Estimate and related services">
        <div class="side-card">
          <p class="side-kicker">Talk through the line</p>
          <p>Call or send the lot details. We will tell you if the job is a repair, a replacement, or a different material than you started with.</p>
          <p class="side-phone"><a class="phone-link-lg" href="tel:${TEL}">${PHONE}</a></p>
          <p><a class="btn" href="contact.html#quote">Request an estimate</a></p>
        </div>
        <div class="side-card side-card-muted">
          <p class="side-kicker">Related</p>
          ${sideLinks(s.related)}
        </div>
      </aside>
    </div>
  </section>
  <section class="section section-towns" style="padding-top:0">
    <div class="wrap">
      <h2>Towns we serve</h2>
      <div class="related">${locations.map((l) => `<a href="${l.slug}">${esc(l.name)}</a>`).join("")}</div>
      <p class="towns-links"><a href="service-areas.html">Service area</a> &middot; <a href="contact.html#quote">Request an estimate</a> &middot; <a href="services.html">All services</a></p>
    </div>
  </section>`;
  write(
    s.slug,
    layout({
      title: `${s.title} | ${NAME}`,
      description: s.description,
      canonical,
      active: s.slug,
      quoteHref: "contact.html#quote",
      body,
      graph: pageGraph({
        canonical,
        title: s.title,
        description: s.description,
        crumbsItems: crumbItems,
        faqs: s.faqs,
        service: s
      })
    })
  );
}

for (const l of locations) {
  const canonical = `${SITE}/${l.slug}`;
  const crumbItems = [
    { href: "index.html", label: "Home" },
    { href: "service-areas.html", label: "Service areas" },
    { href: l.slug, label: l.name }
  ];
  const body = `<section class="page-hero">
    <div class="wrap">
      ${crumbs(crumbItems)}
      <h1>${esc(l.title)}</h1>
      <p class="lede">${esc(l.lede)}</p>
      <div class="hero-actions">
        <a class="btn" href="tel:${TEL}">Call ${PHONE}</a>
        <a class="btn btn-ghost" href="contact.html#quote">Request an estimate</a>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="wrap split">
      <img src="${l.image}" alt="${esc(l.alt)}" width="800" height="533">
      <div>
        <h2>${esc(l.lotsTitle)}</h2>
        ${paras(l.lots)}
      </div>
    </div>
  </section>
  <section class="section section-tight">
    <div class="wrap">
      <h2>Materials that fit these lots</h2>
      <p>${esc(l.materials)}</p>
      ${related(l.services)}
    </div>
  </section>
  <section class="section section-tight">
    <div class="wrap">
      <h2>Permits and local rules</h2>
      <p>${esc(l.permits)}</p>
    </div>
  </section>
  <section class="section section-tight">
    <div class="wrap">
      <h2>Questions from ${esc(l.name)}</h2>
      ${faqBlock(l.faqs)}
    </div>
  </section>
  ${cta(`Estimate a fence in ${l.name}`, `Call ${PHONE} or send the form with ${esc(l.name)} as the city. Include the material you think you want and whether animals, a slope, or an HOA are part of the job.`)}`;
  write(
    l.slug,
    layout({
      title: `${l.title} | ${NAME}`,
      description: l.description,
      canonical,
      active: "service-areas.html",
      quoteHref: "contact.html#quote",
      body,
      graph: pageGraph({
        canonical,
        title: l.title,
        description: l.description,
        crumbsItems: crumbItems,
        faqs: l.faqs,
        service: { name: `Fence installation in ${l.name}, NM`, lede: l.lede }
      })
    })
  );
}

const servicesBody = `<section class="page-hero">
  <div class="wrap">
    ${crumbs([
      { href: "index.html", label: "Home" },
      { href: "services.html", label: "Services" }
    ])}
    <h1>Fence Services in Albuquerque, NM</h1>
    <p class="lede">Each fence on this list is a different job. Pick the one that matches the yard, the animals, or the site, then call ${PHONE} if you are between two of them.</p>
    <div class="hero-actions">
      <a class="btn" href="tel:${TEL}">Call ${PHONE}</a>
      <a class="btn btn-ghost" href="contact.html#quote">Request an estimate</a>
    </div>
  </div>
</section>
<section class="section">
  <div class="wrap">
    ${cards(services)}
  </div>
</section>
${cta("Not sure which fence you need?", "Describe the job instead of the product. Screen, contain, secure, or mark a line. We will name the material that fits.")}`;

write(
  "services.html",
  layout({
    title: `Fence Services in Albuquerque, NM | ${NAME}`,
    description:
      "Wood, vinyl, chain link, aluminum, metal, picket, farm, commercial fencing, gates, and fence repair in Albuquerque, NM. Call (505) 210-9903.",
    canonical: `${SITE}/services.html`,
    active: "services.html",
    quoteHref: "contact.html#quote",
    body: servicesBody,
    graph: pageGraph({
      canonical: `${SITE}/services.html`,
      title: "Fence Services in Albuquerque, NM",
      description: "Fence installation and repair services in Albuquerque, New Mexico.",
      crumbsItems: [
        { href: "index.html", label: "Home" },
        { href: "services.html", label: "Services" }
      ]
    })
  })
);

const areasBody = `<section class="page-hero">
  <div class="wrap">
    ${crumbs([
      { href: "index.html", label: "Home" },
      { href: "service-areas.html", label: "Service areas" }
    ])}
    <h1>Fence Service Areas around Albuquerque</h1>
    <p class="lede">We work in Albuquerque and the nearby communities listed here. Soil, wind, lot size, and the permit office change by town. The page for each place covers the fence work, not a town history.</p>
    <div class="hero-actions">
      <a class="btn" href="tel:${TEL}">Call ${PHONE}</a>
      <a class="btn btn-ghost" href="contact.html#quote">Request an estimate</a>
    </div>
  </div>
</section>
<section class="section">
  <div class="wrap">
    <div class="area-grid">
      ${locations
        .map(
          (l) => `<a class="area-card" href="${l.slug}"><strong>${esc(l.name)}, NM</strong><span>${esc(l.card)}</span></a>`
        )
        .join("")}
    </div>
    <p style="margin-top:22px">If your town is not on this list, call and ask. We would rather say no to a long drive for a small repair than pretend every community in the state is a service area.</p>
  </div>
</section>`;

write(
  "service-areas.html",
  layout({
    title: `Fence Service Areas near Albuquerque, NM | ${NAME}`,
    description:
      "Fence installation and repair in Albuquerque, Rio Rancho, Corrales, Los Ranchos, Bernalillo, Placitas, Los Lunas, Bosque Farms, Belen, Edgewood, Tijeras, and Cedar Crest.",
    canonical: `${SITE}/service-areas.html`,
    active: "service-areas.html",
    quoteHref: "contact.html#quote",
    body: areasBody,
    graph: pageGraph({
      canonical: `${SITE}/service-areas.html`,
      title: "Fence Service Areas near Albuquerque, NM",
      description: "Communities where Albuquerque Fence Company installs and repairs fences.",
      crumbsItems: [
        { href: "index.html", label: "Home" },
        { href: "service-areas.html", label: "Service areas" }
      ]
    })
  })
);

const extraFaqs = [
  {
    q: "Who is responsible for marking the property line?",
    a: "You are. We build on the line you confirm. We do not survey, and an old fence is not proof of the boundary. If the line is disputed, get it settled before posts go in the ground."
  },
  {
    q: "What should I have ready when I ask for an estimate?",
    a: "The city, about how many feet of fence, the height you want, how many gates, and whether an old fence has to come out. Photos help. An HOA style sheet helps more. You do not need a perfect measurement for the first conversation."
  },
  {
    q: "Do HOA rules change the fence I can build?",
    a: "Yes, in a lot of Rio Rancho and Albuquerque subdivisions. The association can require a color, a height, or a material on top of the city or county rule. Send the written standard with the estimate request so we do not order the wrong panel."
  }
];

const faqBody = `<section class="page-hero">
  <div class="wrap">
    ${crumbs([
      { href: "index.html", label: "Home" },
      { href: "faq.html", label: "FAQs" }
    ])}
    <h1>Fence Questions in Albuquerque</h1>
    <p class="lede">Straight answers on price, soil, materials, permits, and wind repairs. Service pages go deeper on each product.</p>
  </div>
</section>
<section class="section">
  <div class="wrap">
    ${faqBlock([...homeFaqs, ...extraFaqs])}
    <h2 style="margin-top:36px">Questions about a specific fence</h2>
    ${related(services.map((s) => s.slug))}
  </div>
</section>
${cta("Still have a site-specific question?", `Call ${PHONE}. The useful details are the city, the material, and what the fence has to do.`)}`;

write(
  "faq.html",
  layout({
    title: `Fence FAQs for Albuquerque, NM | ${NAME}`,
    description:
      "Answers on Albuquerque fence cost, caliche, permits, materials, HOA rules, and wind-damage repair. Call (505) 210-9903.",
    canonical: `${SITE}/faq.html`,
    active: "faq.html",
    quoteHref: "contact.html#quote",
    body: faqBody,
    graph: pageGraph({
      canonical: `${SITE}/faq.html`,
      title: "Fence FAQs for Albuquerque, NM",
      description: "Common questions about fence installation and repair in Albuquerque.",
      crumbsItems: [
        { href: "index.html", label: "Home" },
        { href: "faq.html", label: "FAQs" }
      ],
      faqs: [...homeFaqs, ...extraFaqs]
    })
  })
);

const aboutBody = `<section class="page-hero">
  <div class="wrap">
    ${crumbs([
      { href: "index.html", label: "Home" },
      { href: "about.html", label: "About" }
    ])}
    <h1>About Albuquerque Fence Company</h1>
    <p class="lede">We install and repair fences for homes, acreage, and commercial lots in Albuquerque and nearby towns. This is a service-area business. There is no public storefront to visit.</p>
    <div class="hero-actions">
      <a class="btn" href="tel:${TEL}">Call ${PHONE}</a>
      <a class="btn btn-ghost" href="contact.html#quote">Request an estimate</a>
    </div>
  </div>
</section>
<section class="section">
  <div class="wrap">
    <h2>What we actually do</h2>
    <p>The work is wood, vinyl, chain link, aluminum, steel and iron, picket, and farm fencing, plus gates and repairs. The old site called the company Albuquerque's Premier Fence Company. The work is the same: a fence quoted from the property.</p>
    <p>We do not publish a street address, a license number, a warranty term, or a year founded, because those are not listed as facts we are willing to invent. The phone number for estimates is ${PHONE}.</p>
    <h2>How an estimate works</h2>
    <p>Tell us the city, the rough length, the material you have in mind, and whether this is new work or a repair. If the material does not fit the wind, the animals, or the height rule, we will say so. You confirm the property line. We do not survey.</p>
    <p><a href="service-areas.html">See the service area</a> · <a href="services.html">See the services</a></p>
  </div>
</section>`;

write(
  "about.html",
  layout({
    title: `About Albuquerque Fence Company | Albuquerque, NM`,
    description:
      "Albuquerque Fence Company installs and repairs wood, vinyl, metal, chain link, and farm fences in Albuquerque and nearby communities. Call (505) 210-9903.",
    canonical: `${SITE}/about.html`,
    active: "about.html",
    quoteHref: "contact.html#quote",
    body: aboutBody,
    graph: pageGraph({
      canonical: `${SITE}/about.html`,
      title: "About Albuquerque Fence Company",
      description: "Service-area fence installation and repair based in Albuquerque, New Mexico.",
      crumbsItems: [
        { href: "index.html", label: "Home" },
        { href: "about.html", label: "About" }
      ]
    })
  })
);

const contactBody = `<section class="page-hero">
  <div class="wrap">
    ${crumbs([
      { href: "index.html", label: "Home" },
      { href: "contact.html", label: "Contact" }
    ])}
    <h1>Request a Fence Estimate</h1>
    <p class="lede">Call ${PHONE} or use the form. Include the city and what the fence needs to do. We do not take payment through this form.</p>
    <div class="hero-actions">
      <a class="btn" href="tel:${TEL}">Call ${PHONE}</a>
    </div>
  </div>
</section>
<section class="section">
  <div class="wrap" style="max-width:760px">
    ${quoteCard()}
  </div>
</section>`;

write(
  "contact.html",
  layout({
    title: `Request a Fence Estimate in Albuquerque | ${NAME}`,
    description:
      "Request a fence estimate in Albuquerque, NM. Call (505) 210-9903 or send the quote form with your city, material, and rough footage.",
    canonical: `${SITE}/contact.html`,
    active: "contact.html",
    quoteHref: "#quote",
    body: contactBody,
    graph: pageGraph({
      canonical: `${SITE}/contact.html`,
      title: "Request a Fence Estimate",
      description: "Contact Albuquerque Fence Company for a fence estimate.",
      crumbsItems: [
        { href: "index.html", label: "Home" },
        { href: "contact.html", label: "Contact" }
      ]
    })
  })
);

const privacyBody = `<section class="page-hero">
  <div class="wrap">
    ${crumbs([
      { href: "index.html", label: "Home" },
      { href: "privacy.html", label: "Privacy" }
    ])}
    <h1>Privacy Policy</h1>
    <p class="lede">This page explains what the estimate form collects and how it is used.</p>
  </div>
</section>
<section class="section">
  <div class="wrap">
    <p>The quote form is embedded from Tally. It asks for the details you type, such as your name and how to reach you, plus notes about the fence job. A hidden field named source is set to ${NAME} so estimate requests from this website can be told apart from requests sent on other sites.</p>
    <p>We use that information to reply about the fence estimate. Do not send payment card numbers or other financial account details through the form. Phone calls go to ${PHONE} and are not stored by this website.</p>
    <p>Tally processes the form submission under its own terms. This site does not run a customer account system, and it does not sell mailing lists. If you want a submitted request deleted, call ${PHONE} and say which request.</p>
  </div>
</section>`;

write(
  "privacy.html",
  layout({
    title: `Privacy Policy | ${NAME}`,
    description:
      "How Albuquerque Fence Company uses estimate requests sent through the quote form, including the source field that identifies this website.",
    canonical: `${SITE}/privacy.html`,
    active: "privacy.html",
    quoteHref: "contact.html#quote",
    body: privacyBody,
    graph: pageGraph({
      canonical: `${SITE}/privacy.html`,
      title: "Privacy Policy",
      description: "Privacy policy for Albuquerque Fence Company estimate requests.",
      crumbsItems: [
        { href: "index.html", label: "Home" },
        { href: "privacy.html", label: "Privacy" }
      ]
    })
  })
);

const pages = [
  "index.html",
  "services.html",
  "service-areas.html",
  "about.html",
  "faq.html",
  "contact.html",
  "privacy.html",
  ...services.map((s) => s.slug),
  ...locations.map((l) => l.slug)
];

const today = "2026-10-16";
const urls = pages
  .map((file) => {
    const loc = file === "index.html" ? `${SITE}/` : `${SITE}/${file}`;
    const priority = file === "index.html" ? "1.0" : file.includes("fence-company-") ? "0.7" : "0.8";
    return `  <url><loc>${loc}</loc><lastmod>${today}</lastmod><priority>${priority}</priority></url>`;
  })
  .join("\n");
fs.writeFileSync(
  path.join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);
fs.writeFileSync(
  path.join(root, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`
);

const htmlFiles = pages.map((f) => fs.readFileSync(path.join(root, f), "utf8"));
const missing = [];
const hrefRe = /href="([^"]+)"/g;
for (const html of htmlFiles) {
  let m;
  while ((m = hrefRe.exec(html))) {
    const href = m[1];
    if (href.startsWith("http") || href.startsWith("tel:") || href.startsWith("#") || href.startsWith("mailto:")) continue;
    const clean = href.split("#")[0];
    if (!clean) continue;
    if (!fs.existsSync(path.join(root, clean))) missing.push(clean);
  }
}
const h1counts = htmlFiles.map((h) => (h.match(/<h1/g) || []).length);
const badH1 = h1counts.filter((n) => n !== 1);
const noindex = htmlFiles.some((h) => /noindex/i.test(h));
const cardLens = services.map((s) => s.card.length);
console.log("pages", pages.length);
console.log("card lengths", Math.min(...cardLens), "-", Math.max(...cardLens));
console.log("h1 issues", badH1.length);
console.log("noindex", noindex);
console.log("missing links", [...new Set(missing)]);
if (missing.length || badH1.length || noindex) process.exit(1);
