import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { services, locations, homeFaqs } from "./data.mjs";
import { homeIntro, serviceIntros, locationIntros, pageIntros } from "./intros.mjs";

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

const OFFICE_HOURS = "Monday–Sunday: 7 am – 7 pm";
const OFFICE_HOURS_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const OFFICE_HOURS_TIME = "7 am – 7 pm";

function officeHoursBlock() {
  const rows = OFFICE_HOURS_DAYS.map((day) => `<div><span>${day}</span><span>${OFFICE_HOURS_TIME}</span></div>`).join("");
  return `<div class="hours-list">${rows}</div>`;
}

function footer() {
  const svc = services.map((s) => `<li><a href="${s.slug}">${esc(s.nav)}</a></li>`).join("");
  return `<footer class="site-footer">
    <div class="wrap footer-grid">
      <div>
        <div class="footer-logo">${logo("index.html")}</div>
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
          <li><a href="#quote">Request an estimate</a></li>
          <li><a href="faq.html">Fence FAQs</a></li>
          <li><a href="sitemap.xml">Sitemap</a></li>
        </ul>
      </div>
      <div>
        <h2>Office Hours</h2>
        ${officeHoursBlock()}
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

// Every page carries 5-6 complete sentences in its header intro, starting with the business name.
function checkIntro(label, text) {
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (!text.startsWith(NAME) || sentences.length < 5 || sentences.length > 6) {
    console.error(`Intro problem on ${label}: ${sentences.length} sentences, starts with name: ${text.startsWith(NAME)}`);
    process.exit(1);
  }
  return text;
}

// Slim hero with page-specific H1, intro, and the quote form on the right.
function pageHero({ crumbItems, eyebrow, h1, intro, label, extra = "" }) {
  return `<div class="crumb-bar"><div class="wrap">${crumbs(crumbItems)}</div></div>
  <section class="hero slim-hero">
    <div class="wrap hero-grid">
      <div>
        <p class="eyebrow">${esc(eyebrow)}</p>
        <h1>${esc(h1)}</h1>
        <p class="lede">${checkIntro(label, intro)}</p>
        <div class="hero-actions">
          <a class="btn" href="tel:${TEL}">Call ${PHONE}</a>
          <a class="btn btn-ghost" href="#quote">Request a free quote</a>
        </div>
        ${extra}
      </div>
      ${quoteCard()}
    </div>
  </section>`;
}

const FEATURED_GALLERY = ["wood-fencing.html", "vinyl-fencing.html", "aluminum-fencing.html", "picket-fencing.html", "farm-fencing.html", "metal-fencing.html"];

const timelineFaqs = [
  {
    q: "How long does fence installation take?",
    a: "It depends on the footage, the material, the ground, and how soon materials arrive. A short residential run can go faster than a long acreage line or a site with rock. We talk through the schedule after the on-site evaluation and the estimate, and we do not promise a date before we have seen the property."
  },
  {
    q: "How do I maintain my fence?",
    a: "Wood needs a sealer or stain on a regular schedule, and loose boards or leaning posts should be fixed early. Vinyl and aluminum mostly need an occasional wash and a check of the hardware. Chain link and metal fences do best when chips in the coating are touched up and gates are kept lubricated and aligned."
  }
];
const allHomeFaqs = [...homeFaqs, ...timelineFaqs];

function cta(heading, text) {
  return `<section class="cta-band">
    <div class="wrap">
      <h2>${esc(heading)}</h2>
      <p class="lede">${text}</p>
      <div class="actions">
        <a class="btn" href="#quote">Request a free quote</a>
        <a class="btn btn-ghost" href="tel:${TEL}">Call ${PHONE}</a>
      </div>
    </div>
  </section>`;
}

function write(file, html) {
  fs.writeFileSync(path.join(root, file), html);
}

const homeBody = `<section class="hero" id="top">
  <div class="wrap hero-grid">
    <div>
      <p class="eyebrow">Albuquerque, New Mexico</p>
      <h1>Fence Company Albuquerque NM</h1>
      <p class="lede">${checkIntro("home", homeIntro)}</p>
      <div class="hero-actions">
        <a class="btn" href="#quote">Request a free quote</a>
        <a class="btn btn-ghost" href="tel:${TEL}">Call ${PHONE}</a>
      </div>
    </div>
    ${quoteCard()}
  </div>
</section>
<section class="section bg-paper" id="why-choose-us">
  <div class="wrap">
    <h2>Why choose ${NAME}</h2>
    <p class="intro">A fence is a long-term purchase, so we focus on the parts that decide whether it holds up.</p>
    <div class="panel-grid panel-grid-4">
      <article class="panel">
        <h3>Workmanship that fits the ground</h3>
        <p>Caliche, rock, slope, and wind change how deep posts go and how a line is laid out. We plan for the lot instead of using one standard layout.</p>
      </article>
      <article class="panel">
        <h3>Clear communication</h3>
        <p>You get a straight answer on whether the job is a repair, a replacement, or a different material. We explain the options before the estimate is final.</p>
      </article>
      <article class="panel">
        <h3>The right material for the job</h3>
        <p>A backyard screen, a horse lot, a front-yard picket, and a storage yard are different fences. We match wood, vinyl, aluminum, chain link, or steel to what the fence has to do.</p>
      </article>
      <article class="panel">
        <h3>Estimates from the property</h3>
        <p>Price depends on footage, height, gates, and ground conditions. We quote from the actual property rather than a catalog price.</p>
      </article>
    </div>
  </div>
</section>
<section class="section bg-cream" id="services">
  <div class="wrap">
    <h2>Our Fence Services</h2>
    <p class="intro">Start with the job, then the material. Select a service to see how it works, what changes the price, and which towns it fits.</p>
    ${cards(services)}
  </div>
</section>
<section class="section bg-sand" id="gallery">
  <div class="wrap">
    <h2>Our Gallery</h2>
    <p class="intro">Representative photos of the fence styles we install. These images illustrate each style and are not a record of our completed jobs.</p>
    <div class="gallery-grid">
      ${FEATURED_GALLERY.map((slug) => {
        const s = services.find((x) => x.slug === slug);
        return `<figure class="gallery-item"><img src="${s.image}" alt="${esc(s.alt)}" width="800" height="533" loading="lazy" decoding="async"><figcaption>${esc(s.name)}</figcaption></figure>`;
      }).join("")}
    </div>
  </div>
</section>
<section class="section bg-paper" id="reviews">
  <div class="wrap">
    <h2>Customer Reviews</h2>
    <div class="review-note">
      <p>We have not published customer reviews on this website yet, and we will not invent them. Verified reviews will be added here once customers have given permission to share them.</p>
      <p>If you would like to know more about how we work before you decide, call <a href="tel:${TEL}">${PHONE}</a> and ask your questions, or <a href="#quote">send the quote form</a>.</p>
    </div>
  </div>
</section>
<section class="section bg-cream" id="process">
  <div class="wrap">
    <h2>Our Process</h2>
    <p class="intro">Four simple steps from the first call to a finished fence.</p>
    <ol class="steps">
      <li class="step"><h3>Request a quote</h3><p>Use the form or call ${PHONE} with your city, the material you have in mind, and roughly how much fence you need.</p></li>
      <li class="step"><h3>Discuss the project</h3><p>We talk through the goal, the gates, the ground, and any HOA or permit rules, and arrange an on-site evaluation when it is needed.</p></li>
      <li class="step"><h3>Receive an estimate</h3><p>You get an estimate built from the footage, height, material, gates, and ground conditions of the property.</p></li>
      <li class="step"><h3>Schedule installation</h3><p>Once you approve the estimate, we schedule the work and plan the timeline around materials and site conditions.</p></li>
    </ol>
  </div>
</section>
<section class="section bg-sand" id="areas">
  <div class="wrap">
    <h2>Areas We Serve</h2>
    <p class="intro">We schedule fence work in Albuquerque and nearby communities. Rules, soil, and lot size change from one town to the next.</p>
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
<section class="section bg-paper" id="faq">
  <div class="wrap">
    <h2>Frequently Asked Questions</h2>
    ${faqBlock(allHomeFaqs)}
    <p style="margin-top:16px"><a href="faq.html">More fence questions</a></p>
  </div>
</section>
${cta("Request a Free Quote", `Call ${PHONE} or send the lot details through the quote form. We will tell you if the job is a repair, a replacement, or a different material than you started with.`)}`;

const homeCanonical = `${SITE}/`;
write(
  "index.html",
  layout({
    title: "Fence Company Albuquerque NM | Vinyl Fence, Wood Fence, Aluminum Fence & More",
    description:
      "Albuquerque Fence Company installs and repairs wood, vinyl, aluminum, chain link, and metal fences in Albuquerque, NM. Gates and farm fencing. Call (505) 210-9903 for a free quote.",
    canonical: homeCanonical,
    active: "index.html",
    quoteHref: "#quote",
    home: true,
    body: homeBody,
    graph: pageGraph({
      canonical: homeCanonical,
      title: "Fence Company Albuquerque NM | Vinyl Fence, Wood Fence, Aluminum Fence & More",
      description:
        "Fence installation and repair in Albuquerque, New Mexico for homes, acreage, and commercial lots.",
      faqs: allHomeFaqs
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
  const body = `${pageHero({ crumbItems, eyebrow: s.nav, h1: s.h1, intro: serviceIntros[s.slug], label: s.slug })}
  <section class="section service-body bg-cream">
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
          <p class="side-hours">${OFFICE_HOURS}</p>
          <p><a class="btn" href="#quote">Request an estimate</a></p>
        </div>
        <div class="side-card side-card-muted">
          <p class="side-kicker">Related</p>
          ${sideLinks(s.related)}
        </div>
      </aside>
    </div>
  </section>
  <section class="section section-towns bg-sand">
    <div class="wrap">
      <h2>Towns we serve</h2>
      <div class="related">${locations.map((l) => `<a href="${l.slug}">${esc(l.name)}</a>`).join("")}</div>
      <p class="towns-links"><a href="service-areas.html">Service area</a> &middot; <a href="#quote">Request an estimate</a> &middot; <a href="services.html">All services</a></p>
    </div>
  </section>`;
  write(
    s.slug,
    layout({
      title: `${s.title} | ${NAME}`,
      description: s.description,
      canonical,
      active: s.slug,
      quoteHref: "#quote",
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
  const body = `${pageHero({ crumbItems, eyebrow: `${l.name}, New Mexico`, h1: l.title, intro: locationIntros[l.slug], label: l.slug })}
  <section class="section bg-cream">
    <div class="wrap split">
      <img src="${l.image}" alt="${esc(l.alt)}" width="800" height="533">
      <div>
        <h2>${esc(l.lotsTitle)}</h2>
        ${paras(l.lots)}
      </div>
    </div>
  </section>
  <section class="section section-tight bg-paper">
    <div class="wrap">
      <h2>Materials that fit these lots</h2>
      <p>${esc(l.materials)}</p>
      ${related(l.services)}
    </div>
  </section>
  <section class="section section-tight bg-sand">
    <div class="wrap">
      <h2>Permits and local rules</h2>
      <p>${esc(l.permits)}</p>
    </div>
  </section>
  <section class="section section-tight bg-paper">
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
      quoteHref: "#quote",
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

const servicesBody = `${pageHero({
  crumbItems: [
    { href: "index.html", label: "Home" },
    { href: "services.html", label: "Services" }
  ],
  eyebrow: "Albuquerque, New Mexico",
  h1: "Fence Services in Albuquerque, NM",
  intro: pageIntros.services,
  label: "services"
})}
<section class="section bg-cream">
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
    quoteHref: "#quote",
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

const areasBody = `${pageHero({
  crumbItems: [
    { href: "index.html", label: "Home" },
    { href: "service-areas.html", label: "Service areas" }
  ],
  eyebrow: "Albuquerque, New Mexico",
  h1: "Fence Service Areas around Albuquerque",
  intro: pageIntros.areas,
  label: "service-areas"
})}
<section class="section bg-cream">
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
    quoteHref: "#quote",
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

const faqBody = `${pageHero({
  crumbItems: [
    { href: "index.html", label: "Home" },
    { href: "faq.html", label: "FAQs" }
  ],
  eyebrow: "Albuquerque, New Mexico",
  h1: "Fence Questions in Albuquerque",
  intro: pageIntros.faq,
  label: "faq"
})}
<section class="section bg-cream">
  <div class="wrap">
    ${faqBlock([...allHomeFaqs, ...extraFaqs])}
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
    quoteHref: "#quote",
    body: faqBody,
    graph: pageGraph({
      canonical: `${SITE}/faq.html`,
      title: "Fence FAQs for Albuquerque, NM",
      description: "Common questions about fence installation and repair in Albuquerque.",
      crumbsItems: [
        { href: "index.html", label: "Home" },
        { href: "faq.html", label: "FAQs" }
      ],
      faqs: [...allHomeFaqs, ...extraFaqs]
    })
  })
);

const aboutBody = `${pageHero({
  crumbItems: [
    { href: "index.html", label: "Home" },
    { href: "about.html", label: "About" }
  ],
  eyebrow: "About us",
  h1: "About Albuquerque Fence Company",
  intro: pageIntros.about,
  label: "about"
})}
<section class="section bg-cream">
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
    quoteHref: "#quote",
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

const contactBody = `${pageHero({
  crumbItems: [
    { href: "index.html", label: "Home" },
    { href: "contact.html", label: "Contact" }
  ],
  eyebrow: "Contact us",
  h1: "Request a Fence Estimate",
  intro: pageIntros.contact,
  label: "contact"
})}
<section class="section bg-cream">
  <div class="wrap">
    <h2>What to include in your request</h2>
    <div class="panel-grid panel-grid-4">
      <article class="panel"><h3>Your city</h3><p>Rules, soil, and wind change from town to town, so the city tells us where to start.</p></article>
      <article class="panel"><h3>Material and height</h3><p>Wood, vinyl, aluminum, chain link, steel, or a repair. If you are unsure, describe what the fence has to do.</p></article>
      <article class="panel"><h3>Footage and gates</h3><p>A rough length is fine. Tell us how many walk or drive gates you need and whether an old fence must come out.</p></article>
      <article class="panel"><h3>HOA or property-line notes</h3><p>Send any written HOA standard. You confirm the property line, and we do not survey.</p></article>
    </div>
  </div>
</section>
<section class="section bg-sand">
  <div class="wrap">
    <h2>Prefer to talk?</h2>
    <p>Call <a href="tel:${TEL}">${PHONE}</a>. Office hours are ${OFFICE_HOURS}. This is a service-area business, so there is no public storefront to visit.</p>
    <p><a href="service-areas.html">See the service area</a> &middot; <a href="services.html">See the services</a></p>
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

const privacyBody = `${pageHero({
  crumbItems: [
    { href: "index.html", label: "Home" },
    { href: "privacy.html", label: "Privacy" }
  ],
  eyebrow: "Legal",
  h1: "Privacy Policy",
  intro: pageIntros.privacy,
  label: "privacy"
})}
<section class="section bg-cream">
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
    quoteHref: "#quote",
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
