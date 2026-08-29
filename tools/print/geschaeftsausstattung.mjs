/**
 * Geschäftsausstattung (Print) — Visitenkarte + Briefpapier.
 *
 * Erzeugt druckfertige PDFs (Vektor, eingebettete Schriften) im Marken-Look:
 *   node tools/print/geschaeftsausstattung.mjs
 *
 * Ausgabe → tools/print/out/
 *   WMDG-Visitenkarte.pdf            2 Seiten (Vorder-/Rückseite), 85×55 mm + 3 mm Beschnitt, Schnittmarken
 *   WMDG-Visitenkarte-Vorschau.png   Bildschirm-Vorschau beider Seiten nebeneinander (ohne Beschnitt)
 *   WMDG-Briefpapier.pdf             A4-Briefbogen, leer (die eigentliche Vorlage zum Beschreiben)
 *   WMDG-Briefpapier-Muster.pdf      A4-Briefbogen mit Beispiel-Anschreiben (zeigt den Satzspiegel)
 *   WMDG-Briefpapier-Vorschau.png    Bildschirm-Vorschau des leeren Bogens
 *
 * Quelle der Wahrheit für Farben/Schrift: docs/brandbook/04-farben.md, 05-typografie.md.
 * Kontaktdaten: src/lib/site.ts + src/app/impressum/page.tsx (unten in CONTACT gespiegelt).
 *
 * Hinweis Druckerei: Playwright rendert in RGB. Für professionellen Offsetdruck
 * die PDFs beim Druckdienstleister nach CMYK wandeln lassen (oder RGB-Workflow
 * wählen). Beschnitt 3 mm ist berücksichtigt; Schnittmarken sind eingezeichnet.
 */
import { writeFileSync, existsSync, readdirSync, mkdirSync, rmSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const OUT = join(HERE, "out");

// Schriften als data-URI-woff2 (self-contained, identisch zum restlichen Toolset).
const fontsCss = readFileSync(join(ROOT, "tools/pdf/assets/fonts.css"), "utf8");
// Goldenes Gehirn-Emblem als data-URI (wie im Website-Header; erzeugt von
// tools/print/gold-emblem.mjs). PDF bleibt eigenständig.
const brainB64 = readFileSync(join(ROOT, "public/logo-brain-gold.png")).toString("base64");
const BRAIN = `data:image/png;base64,${brainB64}`;

// Kontakt-, Marken- & Farbdaten (Single Source of Truth für tools/print/*).
import { CONTACT, C } from "./marke.mjs";

// Markenzeile mit goldenem „Meister" (wie im Original-Logo).
const brandGold = CONTACT.brand.replace(CONTACT.lockup.gold, `<b>${CONTACT.lockup.gold}</b>`);

// Gemeinsames CSS (Schriften, kosmischer Hintergrund, Verlaufstext).
const base = () => `
${fontsCss}
*{margin:0;padding:0;box-sizing:border-box}
html,body{-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
/* Marken-Signatur-Verlauf (Gold) auf Dunkel – wie der goldene Logo-Schriftzug. */
.grad{background:linear-gradient(100deg,${C.gold300},${C.gold400});-webkit-background-clip:text;background-clip:text;color:transparent}
/* Auf Hell braucht der Schriftzug tieferes Gold, sonst zu blass (Kap. 04). */
.gradLight{background:linear-gradient(100deg,${C.gold500},${C.gold700});-webkit-background-clip:text;background-clip:text;color:transparent}
/* Ruhiger, cinematischer Grund (statt „kosmisch") mit warmem Gold-Schimmer. */
.cosmos{background:
  radial-gradient(70% 120% at 82% 8%, rgba(242,212,137,.16), transparent 62%),
  radial-gradient(60% 120% at 10% 98%, rgba(168,132,42,.12), transparent 60%),
  ${C.navy900};}
.stars{position:absolute;inset:0;pointer-events:none;background-image:
  radial-gradient(1.3px 1.3px at 22% 28%,rgba(255,255,255,.40),transparent),
  radial-gradient(1.2px 1.2px at 66% 20%,rgba(255,255,255,.28),transparent),
  radial-gradient(1.2px 1.2px at 88% 64%,rgba(242,212,137,.30),transparent),
  radial-gradient(1.1px 1.1px at 52% 46%,rgba(255,255,255,.22),transparent);}
`;

// ============================================================================
// VISITENKARTE  85×55 mm  (+ 3 mm Beschnitt ringsum → 91×61 mm)
// ============================================================================
const CARD = { w: 85, h: 55, bleed: 3 };          // mm
const CW = CARD.w + CARD.bleed * 2;               // 91
const CH = CARD.h + CARD.bleed * 2;               // 61

// Schnittmarken in den vier Ecken (außerhalb des Beschnitts, im Anschnittbereich).
function cropMarks() {
  const b = CARD.bleed, len = 2.4, off = 0.0, s = 0.12;
  const mark = (x, y, dx, dy) => `
    <div style="position:absolute;left:${x}mm;top:${y}mm;width:${dx}mm;height:${s}mm;background:#000"></div>
    <div style="position:absolute;left:${x}mm;top:${y}mm;width:${s}mm;height:${dy}mm;background:#000"></div>`;
  // vier Ecken: waagerechte + senkrechte Marke, jeweils an der Beschnittkante
  return `
    ${mark(0, b, len, 0)}${mark(b, 0, 0, len)}
    ${mark(CW - len, b, len, 0)}${mark(CW - b - s, 0, 0, len)}
    ${mark(0, CH - b - s, len, 0)}${mark(b, CH - len, 0, len)}
    ${mark(CW - len, CH - b - s, len, 0)}${mark(CW - b - s, CH - len, 0, len)}
  `;
}

// Vorderseite: dunkel, Emblem + Wortmarke + Tagline, kosmischer Grund.
function cardFront({ marks = false } = {}) {
  const b = CARD.bleed;
  return `<!doctype html><html><head><meta charset="utf-8"><style>${base()}
    @page{size:${CW}mm ${CH}mm;margin:0}
    body{width:${CW}mm;height:${CH}mm;font-family:Inter,sans-serif;position:relative}
    .page{position:absolute;inset:0}
    .safe{position:absolute;left:${b}mm;top:${b}mm;width:${CARD.w}mm;height:${CARD.h}mm;overflow:hidden}
    .fill{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 7mm}
    .brain{width:16mm;height:auto;filter:drop-shadow(0 0 4mm rgba(242,212,137,.40)) drop-shadow(0 0 2mm rgba(232,193,95,.30))}
    .wm{margin-top:7mm;text-align:center}
    .wm .l1{font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:6mm;line-height:1;color:${C.cream}}
    .wm .l2{margin-top:1.7mm;display:flex;align-items:center;justify-content:center;gap:2.4mm;font-weight:600;letter-spacing:.32em;text-transform:uppercase;font-size:2.4mm;color:${C.cream}}
    .wm .l2 i{display:block;width:5mm;height:.35mm;background:linear-gradient(90deg,${C.gold300},${C.gold500})}
    .wm .l2 span{padding-left:.32em}
    .eyebrow{margin-top:3.6mm;font-size:2.35mm;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:${C.gold300}}
    .rule{margin:2.6mm auto 0;width:14mm;height:.4mm;border-radius:1mm;background:linear-gradient(100deg,${C.gold300},${C.gold500})}
  </style></head><body>
    <div class="page cosmos"><div class="stars"></div></div>
    <div class="safe"><div class="fill">
      <img class="brain" src="${BRAIN}" alt="">
      <div class="wm">
        <div class="l1">${CONTACT.lockup.pre} <span class="grad">${CONTACT.lockup.gold}</span></div>
        <div class="l2"><i></i><span>${CONTACT.lockup.sub}</span><i></i></div>
      </div>
      <div class="eyebrow">${CONTACT.tagline}</div>
      <div class="rule"></div>
    </div></div>
    ${marks ? cropMarks() : ""}
  </body></html>`;
}

// Rückseite: hell (Papier), Name/Rolle + Kontaktspalte.
function cardBack({ marks = false } = {}) {
  const b = CARD.bleed;
  const tel = CONTACT.phone
    ? `<div class="row"><span class="k">Tel</span><span class="v">${CONTACT.phone}</span></div>` : "";
  return `<!doctype html><html><head><meta charset="utf-8"><style>${base()}
    @page{size:${CW}mm ${CH}mm;margin:0}
    body{width:${CW}mm;height:${CH}mm;font-family:Inter,sans-serif;position:relative}
    .page{position:absolute;inset:0;background:${C.paper}}
    .safe{position:absolute;left:${b}mm;top:${b}mm;width:${CARD.w}mm;height:${CARD.h}mm;overflow:hidden;padding:6mm 7mm}
    .top{display:flex;align-items:center;gap:2.4mm}
    .top img{width:8.4mm;height:auto}
    .top .nm{font-family:Fraunces,Georgia,serif;font-weight:500;font-size:4.6mm;color:${C.ink};letter-spacing:-.01em;line-height:1.05}
    .role{margin-top:1.1mm;font-size:2.5mm;font-weight:600;letter-spacing:.02em;color:${C.gold700}}
    .contact{margin-top:4.2mm;display:flex;flex-direction:column;gap:1.5mm}
    .row{display:flex;align-items:baseline;gap:2.4mm;font-size:2.7mm}
    .row .k{flex:0 0 8mm;font-weight:700;text-transform:uppercase;letter-spacing:.12em;font-size:2mm;color:${C.inkMuted}}
    .row .v{color:${C.ink};font-weight:500}
    .foot{position:absolute;left:7mm;right:7mm;bottom:5.2mm;display:flex;align-items:center;gap:2mm}
    .foot .line{flex:1;height:.3mm;background:${C.gold600};opacity:.75}
    .foot .site{font-size:2.35mm;font-weight:600;color:${C.inkMid};letter-spacing:.01em;white-space:nowrap}
    .foot .site b{color:${C.gold700};font-weight:700}
  </style></head><body>
    <div class="page"></div>
    <div class="safe">
      <div class="top">
        <img src="${BRAIN}" alt="">
        <div><div class="nm">${CONTACT.name}</div><div class="role">${CONTACT.role}</div></div>
      </div>
      <div class="contact">
        ${tel}
        <div class="row"><span class="k">Mail</span><span class="v">${CONTACT.email}</span></div>
        <div class="row"><span class="k">Web</span><span class="v">${CONTACT.web}</span></div>
        <div class="row"><span class="k">Insta</span><span class="v">${CONTACT.instagram}</span></div>
      </div>
      <div class="foot"><span class="line"></span><span class="site">${brandGold}</span></div>
    </div>
  </body></html>`;
}

// Bildschirm-Vorschau: beide Kartenseiten (ohne Beschnitt) nebeneinander auf Papier-BG.
function cardPreview() {
  const scale = 6; // px/mm
  const one = (inner, bg) => `
    <div style="width:${CARD.w * scale}px;height:${CARD.h * scale}px;border-radius:${2.5 * scale}px;
      overflow:hidden;box-shadow:0 18px 50px rgba(8,16,42,.28);position:relative;${bg}">${inner}</div>`;
  // Wir rendern die »safe«-Inhalte direkt in Karten-Größe.
  return `<!doctype html><html><head><meta charset="utf-8"><style>${base()}
    body{font-family:Inter,sans-serif;background:#e7e3d8;padding:${8 * scale}px;display:flex;gap:${8 * scale}px}
    .card{width:${CARD.w * scale}px;height:${CARD.h * scale}px;border-radius:${3 * scale}px;overflow:hidden;
      box-shadow:0 ${3 * scale}px ${9 * scale}px rgba(8,16,42,.30);position:relative}
    .front{color:${C.cream};display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 ${7 * scale}px}
    .front img{width:${16 * scale}px;margin-bottom:${7 * scale}px;filter:drop-shadow(0 0 ${4 * scale}px rgba(242,212,137,.40))}
    .l1{font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:${6 * scale}px;line-height:1;color:${C.cream}}
    .l2{margin-top:${1.7 * scale}px;display:flex;align-items:center;justify-content:center;gap:${2.4 * scale}px;font-weight:600;letter-spacing:.32em;text-transform:uppercase;font-size:${2.4 * scale}px;color:${C.cream}}
    .l2 i{display:block;width:${5 * scale}px;height:${1.4}px;background:linear-gradient(90deg,${C.gold300},${C.gold500})}
    .l2 span{padding-left:.32em}
    .eb{margin-top:${3.6 * scale}px;font-size:${2.35 * scale}px;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:${C.gold300}}
    .rl{margin-top:${2.6 * scale}px;width:${14 * scale}px;height:${1.6}px;border-radius:2px;background:linear-gradient(100deg,${C.gold300},${C.gold500})}
    .back{background:${C.paper};padding:${6 * scale}px ${7 * scale}px;position:relative}
    .btop{display:flex;align-items:center;gap:${2.4 * scale}px}
    .btop img{width:${8.4 * scale}px}
    .nm{font-family:Fraunces,serif;font-weight:500;font-size:${4.6 * scale}px;color:${C.ink};line-height:1.05}
    .role{margin-top:${1.1 * scale}px;font-size:${2.5 * scale}px;font-weight:600;color:${C.gold700}}
    .ct{margin-top:${4.2 * scale}px;display:flex;flex-direction:column;gap:${1.5 * scale}px}
    .r{display:flex;gap:${2.4 * scale}px;font-size:${2.7 * scale}px}
    .r .k{flex:0 0 ${8 * scale}px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;font-size:${2 * scale}px;color:${C.inkMuted}}
    .r .v{color:${C.ink};font-weight:500}
    .bf{position:absolute;left:${7 * scale}px;right:${7 * scale}px;bottom:${5.2 * scale}px;display:flex;align-items:center;gap:${2 * scale}px}
    .bf .ln{flex:1;height:1.6px;background:${C.gold600};opacity:.75}
    .bf .st{font-size:${2.35 * scale}px;font-weight:600;color:${C.inkMid};white-space:nowrap}
    .bf .st b{color:${C.gold700};font-weight:700}
  </style></head><body>
    <div class="card cosmos front"><div class="stars"></div>
      <img src="${BRAIN}" alt="">
      <div class="wm">
        <div class="l1">${CONTACT.lockup.pre} <span class="grad">${CONTACT.lockup.gold}</span></div>
        <div class="l2"><i></i><span>${CONTACT.lockup.sub}</span><i></i></div>
      </div>
      <div class="eb">${CONTACT.tagline}</div><div class="rl"></div>
    </div>
    <div class="card back">
      <div class="btop"><img src="${BRAIN}" alt=""><div><div class="nm">${CONTACT.name}</div><div class="role">${CONTACT.role}</div></div></div>
      <div class="ct">
        ${CONTACT.phone ? `<div class="r"><span class="k">Tel</span><span class="v">${CONTACT.phone}</span></div>` : ""}
        <div class="r"><span class="k">Mail</span><span class="v">${CONTACT.email}</span></div>
        <div class="r"><span class="k">Web</span><span class="v">${CONTACT.web}</span></div>
        <div class="r"><span class="k">Insta</span><span class="v">${CONTACT.instagram}</span></div>
      </div>
      <div class="bf"><span class="ln"></span><span class="st">${brandGold}</span></div>
    </div>
  </body></html>`;
}

// ============================================================================
// BRIEFPAPIER  A4 (210×297 mm)  —  Kopf + Fuß, Satzspiegel für DIN-5008-Nähe
// ============================================================================
function letterhead({ sample = false } = {}) {
  const telLine = CONTACT.phone ? `Tel ${CONTACT.phone}<br>` : "";
  const body = sample ? `
    <div class="addr">
      <div class="ret">${CONTACT.name} · ${CONTACT.street} · ${CONTACT.city}</div>
      <div class="to">Vorname Nachname<br>Musterstraße 1<br>12345 Musterstadt</div>
    </div>
    <div class="meta">${CONTACT.city.split(" ")[1] || "Großheubach"}, TT. Monat JJJJ</div>
    <h1 class="subj">Betreff: Beispiel-Anschreiben</h1>
    <div class="text">
      <p>Liebe Leserin, lieber Leser,</p>
      <p>dieser Briefbogen zeigt den Satzspiegel der Geschäftsausstattung von
      „${CONTACT.brand}". Kopf- und Fußzeile bleiben auf jeder Seite frei von
      Fließtext; der Textbereich beginnt unterhalb des Adressfelds und läuft bis
      knapp über die Fußzeile.</p>
      <p>Die Marken-Signatur (Lindgrün → Türkis) erscheint als feine Linie unter
      dem Logo und über den Kontaktangaben – zurückhaltend, wie es sich für ein
      seriöses Anschreiben gehört. Schrift ist Fraunces (Überschrift) und Inter
      (Fließtext), identisch zur Website.</p>
      <p>Mit herzlichen Grüßen</p>
      <p style="margin-top:10mm">${CONTACT.name}</p>
    </div>` : `<div class="text placeholder"></div>`;

  return `<!doctype html><html><head><meta charset="utf-8"><style>${base()}
    @page{size:A4;margin:0}
    body{width:210mm;height:297mm;font-family:Inter,sans-serif;color:${C.ink};position:relative;background:${C.paper}}
    /* Kopfzeile */
    .head{position:absolute;top:14mm;left:20mm;right:20mm;display:flex;align-items:center;justify-content:space-between}
    .brandbox{display:flex;align-items:center;gap:4mm}
    .brandbox img{width:15mm;height:auto}
    .wm .l1{font-weight:700;letter-spacing:.1em;text-transform:uppercase;font-size:4.8mm;line-height:1;color:${C.ink}}
    .wm .l2{margin-top:1.1mm;display:flex;align-items:center;gap:2mm;font-weight:600;letter-spacing:.26em;text-transform:uppercase;font-size:2mm;color:${C.ink}}
    .wm .l2 i{display:block;width:4mm;height:.35mm;background:linear-gradient(90deg,${C.gold500},${C.gold600})}
    .wm .l2 span{padding-left:.26em}
    .tag{text-align:right;font-size:2.5mm;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:${C.gold700};max-width:48mm}
    .hrule{position:absolute;top:32mm;left:20mm;right:20mm;height:.5mm;border-radius:1mm;background:linear-gradient(100deg,${C.gold500},${C.gold600})}
    /* Textbereich */
    .body{position:absolute;top:45mm;left:25mm;right:20mm;bottom:34mm}
    .addr{margin-top:0}
    .addr .ret{font-size:2.4mm;color:${C.inkMuted};border-bottom:.2mm solid ${C.inkMuted};padding-bottom:1mm;width:85mm}
    .addr .to{margin-top:5mm;font-size:3.4mm;line-height:1.5;color:${C.ink}}
    .meta{margin-top:12mm;text-align:right;font-size:3mm;color:${C.inkMid}}
    .subj{margin-top:8mm;font-family:Fraunces,Georgia,serif;font-weight:600;font-size:4.6mm;letter-spacing:-.01em;color:${C.ink}}
    .text{margin-top:6mm;font-size:3.4mm;line-height:1.62;color:${C.inkSoft}}
    .text p{margin-bottom:3.4mm;text-wrap:pretty}
    .placeholder{min-height:120mm}
    /* Fußzeile */
    .foot{position:absolute;left:20mm;right:20mm;bottom:14mm}
    .foot .line{height:.4mm;background:${C.gold600};opacity:.8;margin-bottom:3mm}
    .cols{display:flex;justify-content:space-between;gap:8mm;font-size:2.5mm;line-height:1.5;color:${C.inkMuted}}
    .cols b{color:${C.ink};font-weight:600;display:block;margin-bottom:.6mm;font-size:2.5mm;letter-spacing:.04em}
    .cols .green{color:${C.gold700};font-weight:600}
  </style></head><body>
    <div class="head">
      <div class="brandbox">
        <img src="${BRAIN}" alt="">
        <div class="wm"><div class="l1">${CONTACT.lockup.pre} <span class="gradLight">${CONTACT.lockup.gold}</span></div><div class="l2"><i></i><span>${CONTACT.lockup.sub}</span><i></i></div></div>
      </div>
      <div class="tag">${CONTACT.tagline}</div>
    </div>
    <div class="hrule"></div>
    <div class="body">${body}</div>
    <div class="foot">
      <div class="line"></div>
      <div class="cols">
        <div><b>Anschrift</b>${CONTACT.name}<br>${CONTACT.street}<br>${CONTACT.city}</div>
        <div><b>Kontakt</b>${telLine}${CONTACT.email}<br><span class="green">${CONTACT.web}</span></div>
        <div><b>Rechtliches</b>USt-IdNr.<br>${CONTACT.ustId}</div>
      </div>
    </div>
  </body></html>`;
}

// ---------- Render ----------------------------------------------------------
const require = createRequire(import.meta.url);
function findChrome() {
  if (process.env.CHROME_BIN && existsSync(process.env.CHROME_BIN)) return process.env.CHROME_BIN;
  try { const p = require("playwright").chromium.executablePath(); if (p && existsSync(p)) return p; } catch {}
  for (const r of [process.env.PLAYWRIGHT_BROWSERS_PATH, "/opt/pw-browsers"].filter(Boolean)) {
    try { for (const d of readdirSync(r)) { if (d.startsWith("chromium")) { const p = join(r, d, "chrome-linux/chrome"); if (existsSync(p)) return p; } } } catch {}
  }
  throw new Error("Kein Chromium/Chrome gefunden. Führe aus:  npx playwright install chromium");
}
const { chromium } = require("playwright");

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: findChrome() });

async function pdf(html, file, opts = {}) {
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.pdf({ path: join(OUT, file), printBackground: true, preferCSSPageSize: true, ...opts });
  await page.close();
  console.log("✓", file);
}
async function png(html, file, w, h) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.screenshot({ path: join(OUT, file) });
  await page.close();
  console.log("✓", file);
}

// Visitenkarte: 2-seitiges PDF (Vorder- + Rückseite) mit Schnittmarken.
// Wir legen beide Seiten in ein Dokument, indem wir sie als zwei @page-Bögen
// hintereinander rendern.
const cardDoc = `<!doctype html><html><head><meta charset="utf-8"><style>
  @page{size:${CW}mm ${CH}mm;margin:0}
  *{margin:0;padding:0;box-sizing:border-box}
  .sheet{width:${CW}mm;height:${CH}mm;position:relative;overflow:hidden;page-break-after:always}
  .sheet:last-child{page-break-after:auto}
</style></head><body>
  <div class="sheet">${extractBody(cardFront({ marks: true }))}</div>
  <div class="sheet">${extractBody(cardBack({ marks: true }))}</div>
</body></html>`;

function extractBody(doc) {
  // Zieht <style>…</style> + Body-Inhalt aus einem vollständigen Dokument,
  // damit beide Kartenseiten in EIN PDF-Dokument gebündelt werden können.
  const style = doc.match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? "";
  const body = doc.match(/<body>([\s\S]*?)<\/body>/)?.[1] ?? "";
  // @page-Regel entfernen (kommt schon vom Container) und scopen entfällt –
  // die Klassen sind pro Seite eindeutig genug.
  const scoped = style.replace(/@page\{[^}]*\}/g, "");
  return `<style>${scoped}</style>${body}`;
}

await pdf(cardDoc, "WMDG-Visitenkarte.pdf");
await pdf(letterhead({ sample: false }), "WMDG-Briefpapier.pdf");
await pdf(letterhead({ sample: true }), "WMDG-Briefpapier-Muster.pdf");

// Bildschirm-Vorschauen (PNG)
await png(cardPreview(), "WMDG-Visitenkarte-Vorschau.png", (CARD.w * 2 + 8 * 3) * 6, (CARD.h + 16) * 6);
await png(letterhead({ sample: false }), "WMDG-Briefpapier-Vorschau.png", 794, 1123);
await png(letterhead({ sample: true }), "WMDG-Briefpapier-Muster-Vorschau.png", 794, 1123);

await browser.close();
console.log("\nFertig →", OUT);
