/**
 * Carousel-Studio – rendert jede Slide als gebrandetes Bild (4:5).
 * ---------------------------------------------------------------
 *   node docs/carousels/build.mjs [artifact-galerie.html]
 *
 * Quelle der Slide-Texte: docs/skripte/carousels/*.md (via data.mjs geparst).
 * Erzeugt (alles unter build/, gitignored):
 *   build/_slide.css
 *   build/<serie>/<slug>/slide-NN.html   die Slides
 *   build/<serie>/<slug>/index.html      Vorschau eines Carousels
 *   build/index.html                     Übersicht aller Carousels
 * Schriften/Logo werden aus ../reels/covers/ hierher kopiert (gitignored).
 *
 * PNG-Export: node docs/carousels/export-png.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { HANDLE, GRAD, FORMAT, slugify, loadCarousels } from "./data.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const BUILD = join(HERE, "build");
const COVERS = join(HERE, "..", "reels", "covers");

// Geteilte Assets aus dem Cover-Studio übernehmen (nicht doppelt versionieren).
mkdirSync(BUILD, { recursive: true });
copyFileSync(join(COVERS, "_fonts.css"), join(HERE, "_fonts.css"));
copyFileSync(join(COVERS, "logo.png"), join(HERE, "logo.png"));

const { w: W, h: H } = FORMAT;

/** Schriftgröße der Body-Slide nach Textlänge (damit alles reinpasst). */
function bodyFs(text) {
  const n = text.length;
  if (n <= 90) return 62;
  if (n <= 150) return 52;
  if (n <= 230) return 44;
  if (n <= 320) return 38;
  return 33;
}

const SLIDE_CSS = `/* Carousel-Slide 4:5 · generiert – nicht von Hand ändern */
*{ margin:0; padding:0; box-sizing:border-box; }
html,body{ background:#05060c; overflow:hidden; }
.slide{ position:relative; width:${W}px; height:${H}px; overflow:hidden;
  font-family:'Inter',system-ui,sans-serif; color:#f4f7ff; }
.slide::before{ content:""; position:absolute; inset:0; z-index:0;
  background:
    radial-gradient(55% 40% at 82% 18%, rgba(52,196,196,.30), transparent 60%),
    radial-gradient(60% 45% at 12% 88%, rgba(40,90,150,.32), transparent 60%),
    linear-gradient(160deg,#071026 0%,#0b2138 48%,#0a1730 100%); }
.bg{ position:absolute; inset:0; z-index:1;
  background-image:url("vorlage.png"); background-size:cover; background-position:center; opacity:.9; }
.scrim{ position:absolute; inset:0; z-index:2;
  background:linear-gradient(180deg, rgba(5,9,20,.62), rgba(5,9,20,.42) 40%, rgba(5,9,20,.72)); }
.content{ position:absolute; inset:0; z-index:3; display:flex; flex-direction:column;
  padding:88px 84px 76px; }
.top{ display:flex; align-items:flex-start; justify-content:space-between; gap:32px; }
.logo{ width:170px; height:auto; filter:drop-shadow(0 4px 22px rgba(52,196,196,.30)); }
.tag{ text-align:right; padding-top:6px; font-weight:800; font-size:20px; letter-spacing:.13em;
  text-transform:uppercase; background:${GRAD};
  -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; color:transparent; }
.mid{ flex:1 1 auto; display:flex; flex-direction:column; justify-content:center; gap:22px; }
.eyebrow{ font-weight:800; font-size:22px; letter-spacing:.15em; text-transform:uppercase;
  background:${GRAD}; -webkit-background-clip:text; background-clip:text;
  -webkit-text-fill-color:transparent; color:transparent; }
.headline{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:92px; line-height:1.03;
  letter-spacing:-1px; filter:drop-shadow(0 6px 30px rgba(0,0,0,.55)); }
.bar{ width:120px; height:6px; border-radius:6px; background:${GRAD}; }
.sub{ font-size:34px; line-height:1.35; color:#b7c6dc; max-width:80%; }
.body{ font-family:'Fraunces',Georgia,serif; font-weight:500; line-height:1.32; color:#eef3fb;
  filter:drop-shadow(0 4px 22px rgba(0,0,0,.5)); }
.numbg{ position:absolute; z-index:2; right:44px; top:50%; transform:translateY(-50%);
  font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:460px; line-height:.8;
  color:rgba(255,255,255,.05); pointer-events:none; }
.minibar{ width:72px; height:5px; border-radius:5px; background:${GRAD}; }
.lead{ font-family:'Fraunces',Georgia,serif; font-weight:600; line-height:1.12; letter-spacing:-.5px;
  color:#f4f7ff; filter:drop-shadow(0 6px 30px rgba(0,0,0,.55)); }
.body.sec{ color:#c3d1e4; }
.cta{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:56px; line-height:1.16;
  letter-spacing:-.5px; }
.cta-action{ margin-top:20px; padding-left:24px; border-left:5px solid; border-image:${GRAD} 1;
  font-size:31px; line-height:1.38; color:#cfe0d6; font-weight:600; max-width:88%; }
.cta-handle{ margin-top:22px; font-weight:700; font-size:30px; letter-spacing:.02em;
  background:${GRAD}; -webkit-background-clip:text; background-clip:text;
  -webkit-text-fill-color:transparent; color:transparent; }
.foot{ display:flex; align-items:center; justify-content:space-between; gap:24px; }
.handle{ font-weight:600; font-size:26px; letter-spacing:.03em; color:#9db1cb; }
.dots{ display:flex; align-items:center; gap:10px; }
.dot{ width:11px; height:11px; border-radius:50%; background:rgba(255,255,255,.22); }
.dot.on{ background:${GRAD}; box-shadow:0 0 12px rgba(52,196,196,.5); }
.count{ font-size:24px; color:#9db1cb; font-variant-numeric:tabular-nums; }
.swipe{ font-size:26px; color:#9db1cb; font-weight:600; }
`;

writeFileSync(join(BUILD, "_slide.css"), SLIDE_CSS);

function dots(active, total) {
  return `<div class="dots">${Array.from({ length: total }, (_, i) =>
    `<span class="dot${i === active ? " on" : ""}"></span>`).join("")}</div>`;
}

function midHtml(car, slide, total) {
  if (slide.role === "cover") {
    return `<div class="mid">
        <div class="headline">${slide.text}</div>
        <div class="bar"></div>
        ${slide.sub ? `<div class="sub">${slide.sub}</div>` : ""}
      </div>`;
  }
  if (slide.role === "cta") {
    // CTA gliedern: „Merksatz:"-Präfix → Kicker; erste Aussage = Kernsatz,
    // Rest = abgesetzte Handlungszeile (statt eines langen Fließtexts).
    let t = slide.text.trim();
    let kicker = "Dein nächster Schritt";
    const mk = t.match(/^Merksatz:\s*/i);
    if (mk) { t = t.slice(mk[0].length).trim(); kicker = "Merksatz"; }
    const sent = t.match(/[^.!?]+[.!?]+(?:\s|$)/g);
    let lead = t, action = "";
    if (sent && sent.length >= 2) { lead = sent[0].trim(); action = sent.slice(1).join(" ").trim(); }
    action = action.replace(/^Handlung:\s*/i, "");
    const leadFs = lead.length > 96 ? 44 : lead.length > 64 ? 50 : 56;
    return `<div class="mid">
        <div class="eyebrow">${kicker}</div>
        <div class="cta" style="font-size:${leadFs}px">${lead}</div>
        ${action ? `<div class="cta-action">${action}</div>` : ""}
      </div>`;
  }
  // Body edler gliedern: erster Satz als Lead-Titel (Fraunces), Rest als
  // sekundärer Fließtext. Bei langem/einzelnem Satz bleibt es ein Block.
  const t = slide.text.trim();
  const sents = t.match(/[^.!?]+[.!?]+(?:\s|$)/g);
  let lead = "", body = t, sec = false;
  if (sents && sents.length >= 2 && sents[0].trim().length <= 118) {
    lead = sents[0].trim();
    body = sents.slice(1).join(" ").trim();
    sec = true;
  }
  const leadFs = lead.length > 96 ? 46 : lead.length > 60 ? 52 : 58;
  const bfs = sec ? (body.length <= 120 ? 36 : body.length <= 220 ? 32 : 29) : bodyFs(body);
  return `<div class="mid">
        <div class="eyebrow">${car.topic}</div>
        <div class="minibar"></div>
        ${lead ? `<div class="lead" style="font-size:${leadFs}px">${lead}</div>` : ""}
        ${body ? `<div class="body${sec ? " sec" : ""}" style="font-size:${bfs}px">${body}</div>` : ""}
      </div>`;
}

function slideHtml(car, slide, idx, total) {
  const isCover = slide.role === "cover";
  const foot = `<div class="foot">
        <span class="handle">${isCover ? car.seriesLabel : HANDLE}</span>
        ${dots(idx, total)}
        <span class="count">${isCover ? '<span class="swipe">wischen →</span>' : `${idx + 1}/${total}`}</span>
      </div>`;
  return `<!doctype html>
<html lang="de"><head><meta charset="utf-8"><title>${car.topic} – Slide ${idx + 1}</title>
<link rel="stylesheet" href="../../../_fonts.css">
<link rel="stylesheet" href="../../_slide.css"></head>
<body>
  <div class="slide">
    <div class="bg"></div>
    <div class="scrim"></div>
    ${slide.role === "body" ? `<div class="numbg">${String(idx + 1).padStart(2, "0")}</div>` : ""}
    <div class="content">
      <div class="top">
        <img class="logo" src="../../../logo.png" alt="Logo">
        <div class="tag">${car.seriesLabel}</div>
      </div>
      ${midHtml(car, slide, total)}
      ${foot}
    </div>
  </div>
</body></html>
`;
}

// --- Galerie-Bausteine ------------------------------------------------------
function galleryShell(title, sub, cards, back) {
  return `<!doctype html>
<html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>
<style>
  *{ box-sizing:border-box; }
  body{ margin:0; background:radial-gradient(80% 60% at 50% 0%,#0d2240,#070d1c 70%);
    color:#f4f7ff; font-family:system-ui,-apple-system,'Segoe UI',sans-serif; padding:46px 30px 80px; }
  header{ max-width:1200px; margin:0 auto 34px; }
  .eyebrow{ font-size:13px; font-weight:800; letter-spacing:.18em; text-transform:uppercase;
    background:${GRAD}; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; color:transparent; }
  h1{ font-size:32px; margin:8px 0 6px; font-weight:600; }
  p.sub{ color:#a7bad2; margin:0; font-size:15px; }
  a.back{ display:inline-block; margin-bottom:16px; color:#a7bad2; text-decoration:none; font-size:14px; }
  .grid{ max-width:1200px; margin:0 auto; display:grid; gap:26px 22px;
    grid-template-columns:repeat(auto-fill,minmax(216px,1fr)); justify-items:center; }
  .card{ text-decoration:none; color:inherit; }
  .frame{ overflow:hidden; border-radius:12px; box-shadow:0 16px 44px rgba(0,0,0,.5); background:#05060c; }
  figcaption{ margin-top:10px; font-size:13px; color:#a7bad2; text-align:center; line-height:1.4; }
  .go{ color:#8cc63f; font-weight:600; }
</style></head>
<body><header>${back ? `<a class="back" href="${back}">← zurück</a>` : ""}
  <div class="eyebrow">Werde Meister deiner Gedanken</div>
  <h1>${title}</h1><p class="sub">${sub}</p></header>
  <div class="grid">
${cards}
  </div></body></html>
`;
}

const SCALE = 216 / W;
const fw = Math.round(W * SCALE);
const fh = Math.round(H * SCALE);
function frame(src, w, h) {
  return `<div class="frame" style="width:${fw}px;height:${fh}px">
        <iframe src="${src}" width="${w}" height="${h}"
          style="transform:scale(${SCALE.toFixed(4)});transform-origin:top left;border:0"
          loading="lazy" scrolling="no"></iframe></div>`;
}

// --- Schreiben --------------------------------------------------------------
const data = loadCarousels();
let slideCount = 0;
for (const s of data) {
  for (const car of s.carousels) {
    const dir = join(BUILD, s.key, car.slug);
    mkdirSync(dir, { recursive: true });
    const total = car.slides.length;
    car.slides.forEach((slide, i) => {
      writeFileSync(join(dir, `slide-${String(i + 1).padStart(2, "0")}.html`), slideHtml(car, slide, i, total));
      slideCount++;
    });
    // Carousel-Galerie
    const cards = car.slides.map((slide, i) =>
      `    <figure class="card">${frame(`slide-${String(i + 1).padStart(2, "0")}.html`, W, H)}
      <figcaption>Slide ${i + 1}${slide.role !== "body" ? ` · ${slide.role === "cover" ? "Cover" : "CTA"}` : ""}</figcaption></figure>`,
    ).join("\n");
    writeFileSync(join(dir, "index.html"),
      galleryShell(`${car.topic} · Carousel`, `${s.label} · ${total} Slides`, cards, "../../index.html"));
  }
}

// Master-Übersicht: pro Carousel das Cover (Slide 1)
const mcards = data.flatMap((s) =>
  s.carousels.map((car) =>
    `    <a class="card" href="${s.key}/${car.slug}/index.html">${frame(`${s.key}/${car.slug}/slide-01.html`, W, H)}
      <figcaption>${car.topic}<br><span class="go">${car.slides.length} Slides →</span></figcaption></a>`),
).join("\n");
writeFileSync(join(BUILD, "index.html"),
  galleryShell("Carousel-Studio", `${data.reduce((a, s) => a + s.carousels.length, 0)} Carousels · ${slideCount} Slides. Klick ein Carousel an.`, mcards, null));

console.log(`✓ ${slideCount} Slides in ${data.reduce((a, s) => a + s.carousels.length, 0)} Carousels`);
console.log(`✓ Vorschau: docs/carousels/build/index.html`);

// --- Optional: in sich geschlossene Galerie (Fonts + Logo eingebettet) ------
const outSelf = process.argv[2];
if (outSelf) {
  const fontsCss = readFileSync(join(HERE, "_fonts.css"), "utf8");
  const logoUri = `data:image/png;base64,${readFileSync(join(HERE, "logo.png")).toString("base64")}`;
  const gscale = 200 / W;
  const gfw = Math.round(W * gscale);
  const gfh = Math.round(H * gscale);

  const slideDiv = (car, slide, i, total) => {
    const isCover = slide.role === "cover";
    const mid =
      slide.role === "cover"
        ? `<div class="mid"><div class="headline">${slide.text}</div><div class="bar"></div>${slide.sub ? `<div class="sub">${slide.sub}</div>` : ""}</div>`
        : slide.role === "cta"
          ? `<div class="mid"><div class="eyebrow">Dein nächster Schritt</div><div class="cta">${slide.text}</div><div class="cta-handle">${HANDLE}</div></div>`
          : `<div class="mid"><div class="eyebrow">${car.topic}</div><div class="body" style="font-size:${bodyFs(slide.text)}px">${slide.text}</div></div>`;
    const foot = `<div class="foot"><span class="handle">${isCover ? car.seriesLabel : HANDLE}</span>${dots(i, total)}<span class="count">${isCover ? '<span class="swipe">wischen →</span>' : `${i + 1}/${total}`}</span></div>`;
    return `<div class="frame" style="width:${gfw}px;height:${gfh}px"><div class="slide" style="transform:scale(${gscale.toFixed(4)})">
      <div class="content"><div class="top"><div class="logo"></div><div class="tag">${car.seriesLabel}</div></div>${mid}${foot}</div></div></div>`;
  };

  const sections = data.map((s) => {
    const rows = s.carousels.map((car) => {
      const slides = car.slides.map((sl, i) => slideDiv(car, sl, i, car.slides.length)).join("");
      return `    <div class="car"><h3>${car.topic}<span class="dim"> · ${car.slides.length} Slides</span></h3><div class="strip">${slides}</div></div>`;
    }).join("\n");
    return `  <section class="serie"><h2>${s.label} <span class="dim">· ${s.carousels.length} Carousels</span></h2>\n${rows}\n  </section>`;
  }).join("\n");

  const html = `<!doctype html>
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Carousel-Studio</title><style>
${fontsCss}
:root{ --logo:url("${logoUri}"); }
*{ box-sizing:border-box; }
body{ margin:0; background:radial-gradient(80% 55% at 50% 0%,#0d2240,#070d1c 70%); color:#f4f7ff;
  font-family:system-ui,-apple-system,'Segoe UI',sans-serif; padding:44px 26px 90px; }
header{ max-width:1300px; margin:0 auto 10px; }
.brow{ font-size:13px; font-weight:800; letter-spacing:.18em; text-transform:uppercase; background:${GRAD};
  -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; color:transparent; }
h1{ font-size:34px; margin:8px 0 6px; font-weight:600; }
p.lead{ color:#a7bad2; margin:0; font-size:16px; max-width:680px; line-height:1.5; }
.serie{ max-width:1300px; margin:0 auto; padding-top:22px; }
.serie h2{ font-size:21px; font-weight:600; margin:0 0 4px; border-top:1px solid rgba(255,255,255,.08); padding-top:24px; }
.car{ margin:18px 0 6px; }
.car h3{ font-size:16px; font-weight:600; margin:0 0 10px; color:#dce6f4; }
.dim{ color:#a7bad2; font-weight:400; font-size:14px; }
.strip{ display:flex; gap:14px; overflow-x:auto; padding-bottom:12px; }
.frame{ flex:0 0 auto; overflow:hidden; border-radius:11px; box-shadow:0 12px 34px rgba(0,0,0,.5); background:#05060c; }
/* Slide-Basis (für eingebettete Vorschau) */
.slide{ position:relative; width:${W}px; height:${H}px; overflow:hidden; transform-origin:top left; color:#f4f7ff; font-family:'Inter',system-ui,sans-serif;
  background:radial-gradient(55% 40% at 82% 18%, rgba(52,196,196,.30), transparent 60%),radial-gradient(60% 45% at 12% 88%, rgba(40,90,150,.32), transparent 60%),linear-gradient(160deg,#071026 0%,#0b2138 48%,#0a1730 100%); }
.slide .content{ position:absolute; inset:0; display:flex; flex-direction:column; padding:88px 84px 76px; }
.slide .top{ display:flex; align-items:flex-start; justify-content:space-between; gap:32px; }
.slide .logo{ width:170px; height:134px; background:var(--logo) left top/contain no-repeat; filter:drop-shadow(0 4px 22px rgba(52,196,196,.30)); }
.slide .tag{ text-align:right; padding-top:6px; font-weight:800; font-size:20px; letter-spacing:.13em; text-transform:uppercase; background:${GRAD}; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; color:transparent; }
.slide .mid{ flex:1 1 auto; display:flex; flex-direction:column; justify-content:center; gap:22px; }
.slide .eyebrow{ font-weight:800; font-size:22px; letter-spacing:.15em; text-transform:uppercase; background:${GRAD}; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; color:transparent; }
.slide .headline{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:92px; line-height:1.03; letter-spacing:-1px; }
.slide .bar{ width:120px; height:6px; border-radius:6px; background:${GRAD}; }
.slide .sub{ font-size:34px; line-height:1.35; color:#b7c6dc; max-width:80%; }
.slide .body{ font-family:'Fraunces',Georgia,serif; font-weight:500; line-height:1.32; color:#eef3fb; }
.slide .cta{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:56px; line-height:1.16; letter-spacing:-.5px; }
.slide .cta-handle{ margin-top:8px; font-weight:700; font-size:30px; background:${GRAD}; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; color:transparent; }
.slide .foot{ display:flex; align-items:center; justify-content:space-between; gap:24px; }
.slide .handle{ font-weight:600; font-size:26px; color:#9db1cb; }
.slide .dots{ display:flex; gap:10px; }
.slide .dot{ width:11px; height:11px; border-radius:50%; background:rgba(255,255,255,.22); }
.slide .dot.on{ background:${GRAD}; }
.slide .count{ font-size:24px; color:#9db1cb; }
.slide .swipe{ font-size:26px; color:#9db1cb; font-weight:600; }
</style></head>
<body><header><div class="brow">Werde Meister deiner Gedanken</div>
<h1>Carousel-Studio</h1>
<p class="lead">${data.reduce((a, s) => a + s.carousels.length, 0)} Carousels · ${slideCount} Slides über ${data.length} Bereiche.
Jede Zeile ist ein Carousel zum Durchwischen. Hintergrund hier als Verlaufs-Platzhalter –
im Repo legst du je Ordner optional eine eigene <code>vorlage.png</code> ab.</p></header>
${sections}
</body></html>
`;
  writeFileSync(outSelf, html);
  console.log(`✓ Artifact-Galerie: ${outSelf} (${(html.length / 1e6).toFixed(2)} MB)`);
}
