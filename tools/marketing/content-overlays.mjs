/**
 * Content-Overlays für die bestehenden Post-Serien „Zitate" und „Studien-Fakten".
 * ---------------------------------------------------------------------------
 * Analog zu den „Persönliche Geschichten"-Overlays (tools/marketing/story-overlays.mjs):
 * erzeugt pro Zitat / Fakt ein TRANSPARENTES Text-Overlay + einen Marken-
 * Hintergrund, jeweils in 3 Formaten (4:5 / 1:1 / 9:16). In Canva:
 *   Hintergrund (oder eigenes Foto) → optionales Foto → Overlay
 * Der Scrim im Overlay hält den Text auf jedem Foto lesbar.
 *
 *   node tools/marketing/content-overlays.mjs
 *   Ausgabe: docs/marketing/content-overlays/<serie>/<format>/*.png
 *
 * Texte kommen aus docs/marketing/content-data.mjs (dieselbe Quelle wie die
 * fertigen Grafik-Kacheln in brand-assets.mjs) – Typografie 1:1 wie dort.
 */
import { writeFileSync, existsSync, readdirSync, mkdirSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { QUOTES, FACTS } from "../../docs/marketing/content-data.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const fonts = pathToFileURL(join(ROOT, "tools/pdf/assets/fonts.css")).href;
const brain = pathToFileURL(join(ROOT, "public/logo-brain-gold.png")).href;
const OUT = join(ROOT, "docs/marketing/content-overlays");

// Breite überall 1080 → Schriftgrößen (w-basiert) bleiben über alle Formate
// gleich, nur die Höhe (= vertikaler Freiraum) ändert sich.
const FORMATS = [
  { key: "4x5", w: 1080, h: 1350 },
  { key: "1x1", w: 1080, h: 1080 },
  { key: "9x16", w: 1080, h: 1920 },
];

// Marken-Hintergrund (identisch zur Grafik-Kachel) – als eigene Ebene, falls
// kein eigenes Foto genutzt wird.
const bgCss = `
.bg{position:absolute;inset:0;background:
  radial-gradient(50% 120% at 88% 12%, rgba(233,193,95,.30), transparent 60%),
  radial-gradient(46% 120% at 6% 96%, rgba(168,132,42,.24), transparent 60%),
  radial-gradient(40% 90% at 74% 90%, rgba(242,212,137,.14), transparent 60%),
  #090b10;}
.stars{position:absolute;inset:0;background-image:
  radial-gradient(1.6px 1.6px at 20% 30%,rgba(255,255,255,.7),transparent),
  radial-gradient(1.5px 1.5px at 68% 22%,rgba(255,255,255,.5),transparent),
  radial-gradient(1.3px 1.3px at 82% 62%,rgba(180,210,255,.55),transparent),
  radial-gradient(1.2px 1.2px at 55% 48%,rgba(255,255,255,.45),transparent),
  radial-gradient(1.4px 1.4px at 90% 38%,rgba(200,180,255,.5),transparent),
  radial-gradient(1.1px 1.1px at 44% 74%,rgba(255,255,255,.4),transparent);}`;

// Scrim: dunkelt die Mitte (Textzone) genug ab, damit heller Fraunces-Satz auf
// jedem Foto lesbar bleibt – ohne das Foto komplett zu verdecken.
const scrimCss = `
.scrim{position:absolute;inset:0;z-index:1;background:
  radial-gradient(72% 58% at 50% 48%, rgba(5,9,20,.72), rgba(5,9,20,.46) 66%, rgba(5,9,20,.30) 100%),
  linear-gradient(to bottom, rgba(5,9,20,.30) 0%, rgba(5,9,20,.30) 62%, rgba(5,9,20,.58) 100%);}`;

// Zitat-Overlay – Typografie 1:1 wie quoteTile in brand-assets.mjs.
const quoteCss = (w, h) => `
.qmark{position:absolute;left:50%;top:${Math.round(h * 0.35)}px;transform:translate(-50%,-50%);font-family:Fraunces,serif;font-weight:600;font-size:${Math.round(w * 0.6)}px;line-height:.62;color:rgba(130,210,215,.14);pointer-events:none;z-index:2}
.qwrap{position:absolute;left:50%;top:47%;transform:translate(-50%,-50%);width:${w - Math.round(w * 0.3)}px;text-align:center;z-index:3}
.quote{font-family:Fraunces,serif;font-weight:500;color:#f4f2ec;font-size:${Math.round(w * 0.067)}px;line-height:1.32;letter-spacing:-.3px;text-shadow:0 2px 24px rgba(0,0,0,.45)}
.quote em{font-style:italic;font-weight:600;font-size:1.07em;background:linear-gradient(100deg,#f2d489,#d9a93a);-webkit-background-clip:text;background-clip:text;color:transparent}
.foot{position:absolute;left:0;right:0;bottom:${Math.round(w * 0.072)}px;display:flex;align-items:center;justify-content:center;gap:10px;z-index:3}
.foot img{width:${Math.round(w * 0.037)}px;height:${Math.round(w * 0.037)}px;object-fit:contain;opacity:.88}
.foot .t{font-size:${Math.round(w * 0.023)}px;font-weight:800;letter-spacing:2.2px;text-transform:uppercase;color:rgba(244,242,236,.72)}`;

const quoteBody = (q) => `<div class="scrim"></div><div class="qmark">„</div>
<div class="qwrap"><div class="quote">${q.t}</div></div>
<div class="foot"><img src="${brain}"><span class="t">Werde Meister deiner Gedanken</span></div>`;

// Fakten-Overlay – Typografie 1:1 wie factTile in brand-assets.mjs.
const factCss = (w) => `
.fwrap{position:absolute;left:50%;top:46%;transform:translate(-50%,-50%);width:${w - Math.round(w * 0.24)}px;text-align:center;z-index:3}
.eyebrow{font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#f2d489;font-size:${Math.round(w * 0.024)}px;margin-bottom:${Math.round(w * 0.045)}px}
.fact{font-family:Fraunces,serif;font-weight:500;color:#f4f2ec;font-size:${Math.round(w * 0.064)}px;line-height:1.3;letter-spacing:-.3px;text-shadow:0 2px 24px rgba(0,0,0,.45)}
.fact em{font-style:italic;font-weight:600;font-size:1.07em;background:linear-gradient(100deg,#f2d489,#d9a93a);-webkit-background-clip:text;background-clip:text;color:transparent}
.src{margin-top:${Math.round(w * 0.045)}px;font-size:${Math.round(w * 0.026)}px;line-height:1.4;color:rgba(244,242,236,.7)}
.src b{color:rgba(242,212,137,.95);font-weight:700}
.foot{position:absolute;left:0;right:0;bottom:${Math.round(w * 0.072)}px;display:flex;align-items:center;justify-content:center;gap:10px;z-index:3}
.foot img{width:${Math.round(w * 0.037)}px;height:${Math.round(w * 0.037)}px;object-fit:contain;opacity:.88}
.foot .t{font-size:${Math.round(w * 0.023)}px;font-weight:800;letter-spacing:2.2px;text-transform:uppercase;color:rgba(244,242,236,.72)}`;

const factBody = (f) => `<div class="scrim"></div>
<div class="fwrap">
  <div class="eyebrow">Studien-Fakt</div>
  <div class="fact">${f.t}</div>
  <div class="src"><b>Quelle:</b> ${f.src}</div>
</div>
<div class="foot"><img src="${brain}"><span class="t">Werde Meister deiner Gedanken</span></div>`;

const doc = (F, css, body, transparent) =>
  `<!doctype html><html><head><meta charset="utf8"><link rel="stylesheet" href="${fonts}">
<style>*{margin:0;box-sizing:border-box}
body{width:${F.w}px;height:${F.h}px;overflow:hidden;font-family:Inter,sans-serif;position:relative;background:${transparent ? "transparent" : "#090b10"}}
${css}</style></head><body>${body}</body></html>`;

// Serien: key (Ordner) → { css, body, items }.
const SERIES = [
  { key: "zitate", css: (F) => quoteCss(F.w, F.h), body: quoteBody, items: QUOTES },
  { key: "studien-fakten", css: (F) => factCss(F.w), body: factBody, items: FACTS },
];

const require = createRequire(import.meta.url);
function findChrome() {
  if (process.env.CHROME_BIN && existsSync(process.env.CHROME_BIN)) return process.env.CHROME_BIN;
  try { const p = require("playwright").chromium.executablePath(); if (p && existsSync(p)) return p; } catch {}
  for (const r of [process.env.PLAYWRIGHT_BROWSERS_PATH, "/opt/pw-browsers"].filter(Boolean)) {
    try { for (const d of readdirSync(r)) { if (d.startsWith("chromium")) { const p = join(r, d, "chrome-linux/chrome"); if (existsSync(p)) return p; } } } catch {}
  }
  throw new Error("Kein Chromium gefunden.");
}
const { chromium } = require("playwright");
if (existsSync(OUT)) rmSync(OUT, { recursive: true, force: true });
const browser = await chromium.launch({ executablePath: findChrome() });

for (const S of SERIES) {
  for (const F of FORMATS) {
    const fdir = join(OUT, S.key, F.key);
    mkdirSync(fdir, { recursive: true });

    // Gemeinsamer Marken-Hintergrund je Format (opak, ohne Text).
    {
      const pg = await browser.newPage({ viewport: { width: F.w, height: F.h } });
      const tmp = join(HERE, `.bg-${S.key}-${F.key}.html`);
      writeFileSync(tmp, doc(F, bgCss, `<div class="bg"></div><div class="stars"></div>`, false));
      await pg.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
      await pg.screenshot({ path: join(fdir, "_hintergrund.png") });
      await pg.close(); rmSync(tmp, { force: true });
    }

    // Pro Eintrag ein transparentes Overlay (Scrim + Text + Signatur).
    for (const it of S.items) {
      const pg = await browser.newPage({ viewport: { width: F.w, height: F.h } });
      const tmp = join(HERE, `.ov-${S.key}-${F.key}-${it.key}.html`);
      writeFileSync(tmp, doc(F, `${scrimCss}${S.css(F)}`, S.body(it), true));
      await pg.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
      await pg.screenshot({ path: join(fdir, `overlay-${it.key}.png`), omitBackground: true });
      await pg.close(); rmSync(tmp, { force: true });
    }
    console.log("✓", S.key, F.key, "→", S.items.length, "Overlays + Hintergrund");
  }
}
await browser.close();
