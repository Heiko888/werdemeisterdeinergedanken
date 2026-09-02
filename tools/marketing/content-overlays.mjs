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
const brainTeal = pathToFileURL(join(ROOT, "public/logo-brain-tuerkis.png")).href;
const OUT = join(ROOT, "docs/marketing/content-overlays");

// Vier Farbwelten (Grund × Akzent). Suffixe parallel zu -hell.
const THEME_SUFFIX = { dunkel: "", hell: "-hell", tuerkis: "-tuerkis", "tuerkis-hell": "-tuerkis-hell" };
const THEMES = (process.env.THEME
  ? [process.env.THEME]
  : ["dunkel", "hell", "tuerkis", "tuerkis-hell"]).filter((t) => t in THEME_SUFFIX);
const brainFor = (theme) => (theme === "tuerkis" || theme === "tuerkis-hell" ? brainTeal : brain);

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

// Helle Marken-Fläche (Creme) – 1:1 wie der Website-Header (.bg-paper-aura):
// Papier-Grund #f6f4ee mit dezenten Gold-Schimmern (gold-400/300/500) und
// weichem Inset-Schatten oben. Ohne Sternchen (die wären auf Hell unsichtbar).
const bgCssHell = `
.bg-hell{position:absolute;inset:0;background:
  radial-gradient(78% 62% at 50% -10%, rgba(232,193,95,.26), transparent 62%),
  radial-gradient(60% 55% at 96% 4%, rgba(242,212,137,.12), transparent 60%),
  radial-gradient(58% 52% at 4% 108%, rgba(217,169,58,.13), transparent 60%),
  #f6f4ee;
  box-shadow:inset 0 26px 44px -34px rgba(8,16,42,.22);}`;

// Türkis-Hintergrund: dunkler Navy-Grund wie „dunkel", aber Teal-Schimmer
// (statt Gold). Nutzt dieselbe .bg-Klasse + Sternchen wie bgCss.
const bgCssTeal = `
.bg{position:absolute;inset:0;background:
  radial-gradient(50% 120% at 88% 12%, rgba(52,196,196,.30), transparent 60%),
  radial-gradient(46% 120% at 6% 96%, rgba(33,178,189,.24), transparent 60%),
  radial-gradient(40% 90% at 74% 90%, rgba(140,198,63,.14), transparent 60%),
  #090b10;}
.stars{position:absolute;inset:0;background-image:
  radial-gradient(1.6px 1.6px at 20% 30%,rgba(255,255,255,.7),transparent),
  radial-gradient(1.5px 1.5px at 68% 22%,rgba(255,255,255,.5),transparent),
  radial-gradient(1.3px 1.3px at 82% 62%,rgba(180,210,255,.55),transparent),
  radial-gradient(1.2px 1.2px at 55% 48%,rgba(255,255,255,.45),transparent),
  radial-gradient(1.4px 1.4px at 90% 38%,rgba(200,180,255,.5),transparent),
  radial-gradient(1.1px 1.1px at 44% 74%,rgba(255,255,255,.4),transparent);}`;

// Creme-Grund mit Teal-Schimmer (für „tuerkis-hell"): helle Fläche, keine Sterne.
const bgCssHellTeal = `
.bg-hell{position:absolute;inset:0;background:
  radial-gradient(78% 62% at 50% -10%, rgba(52,196,196,.20), transparent 62%),
  radial-gradient(60% 55% at 96% 4%, rgba(140,198,63,.12), transparent 60%),
  radial-gradient(58% 52% at 4% 108%, rgba(33,178,189,.12), transparent 60%),
  #f6f4ee;
  box-shadow:inset 0 26px 44px -34px rgba(8,16,42,.22);}`;

// Scrim: dunkelt die Mitte (Textzone) genug ab, damit heller Fraunces-Satz auf
// jedem Foto lesbar bleibt – ohne das Foto komplett zu verdecken.
const scrimCss = `
.scrim{position:absolute;inset:0;z-index:1;background:
  radial-gradient(72% 58% at 50% 48%, rgba(5,9,20,.72), rgba(5,9,20,.46) 66%, rgba(5,9,20,.30) 100%),
  linear-gradient(to bottom, rgba(5,9,20,.30) 0%, rgba(5,9,20,.30) 62%, rgba(5,9,20,.58) 100%);}`;
// Heller Creme-Scrim (für Overlays mit dunkler Schrift): hellt die Textzone
// auf, damit die Tinte-Schrift auch über einem Foto lesbar bleibt.
const scrimHellCss = `
.scrim{position:absolute;inset:0;z-index:1;background:
  radial-gradient(72% 58% at 50% 48%, rgba(246,244,238,.80), rgba(246,244,238,.55) 66%, rgba(246,244,238,.36) 100%),
  linear-gradient(to bottom, rgba(246,244,238,.36) 0%, rgba(246,244,238,.36) 62%, rgba(246,244,238,.62) 100%);}`;

// Zwei Themes: dunkel (Standard, helle Schrift) und hell (dunkle Tinte-Schrift
// auf Creme; Akzent in tiefem Gold #7e6410 – AA-lesbar wie die Website-Links).
const PAL = (theme) => theme === "hell" ? {
  scrim: scrimHellCss, text: "#16231f", shadow: "0 1px 10px rgba(246,244,238,.5)",
  accent: "linear-gradient(100deg,#d9a93a,#7e6410)", qmark: "rgba(168,132,42,.16)",
  eyebrow: "#7e6410", srcMuted: "rgba(22,35,31,.66)", srcB: "#7e6410",
  wm1: "rgba(22,35,31,.92)", wm2: "rgba(22,35,31,.64)", stroke: "rgba(168,132,42,.9)",
} : theme === "tuerkis-hell" ? {
  scrim: scrimHellCss, text: "#16231f", shadow: "0 1px 10px rgba(246,244,238,.5)",
  accent: "linear-gradient(100deg,#8cc63f,#0f766e)", qmark: "rgba(15,118,110,.16)",
  eyebrow: "#0f766e", srcMuted: "rgba(22,35,31,.66)", srcB: "#0f766e",
  wm1: "rgba(22,35,31,.92)", wm2: "rgba(22,35,31,.64)", stroke: "rgba(15,118,110,.9)",
} : theme === "tuerkis" ? {
  scrim: scrimCss, text: "#f4f2ec", shadow: "0 2px 24px rgba(0,0,0,.45)",
  accent: "linear-gradient(100deg,#a3d64f,#21b2bd)", qmark: "rgba(95,214,210,.14)",
  eyebrow: "#5fd6d2", srcMuted: "rgba(244,242,236,.7)", srcB: "rgba(95,214,210,.95)",
  wm1: "rgba(244,242,236,.92)", wm2: "rgba(244,242,236,.72)", stroke: "rgba(95,214,210,.85)",
} : {
  scrim: scrimCss, text: "#f4f2ec", shadow: "0 2px 24px rgba(0,0,0,.45)",
  accent: "linear-gradient(100deg,#f2d489,#d9a93a)", qmark: "rgba(242,212,137,.14)",
  eyebrow: "#f2d489", srcMuted: "rgba(244,242,236,.7)", srcB: "rgba(242,212,137,.95)",
  wm1: "rgba(244,242,236,.92)", wm2: "rgba(244,242,236,.72)", stroke: "rgba(242,212,137,.85)",
};

// Marken-Fuß (Lockup wie Website-Header) – Farben je Theme.
const footCss = (w, p) => `
.foot{position:absolute;left:0;right:0;bottom:${Math.round(w * 0.072)}px;display:flex;align-items:center;justify-content:center;gap:${Math.round(w * 0.016)}px;z-index:3}
.foot img{width:${Math.round(w * 0.052)}px;height:${Math.round(w * 0.052)}px;object-fit:contain}
.foot .wm{display:flex;flex-direction:column;gap:${Math.round(w * 0.006)}px;line-height:1;text-align:left}
.foot .wm1{font-family:Fraunces,serif;font-weight:400;font-size:${Math.round(w * 0.028)}px;letter-spacing:.1em;text-transform:uppercase;color:${p.wm1}}
.foot .wm1 em{font-style:normal;background:${p.accent};-webkit-background-clip:text;background-clip:text;color:transparent}
.foot .wm2{display:flex;align-items:center;gap:${Math.round(w * 0.008)}px;font-family:Fraunces,serif;font-weight:400;font-size:${Math.round(w * 0.0145)}px;letter-spacing:.22em;text-transform:uppercase;color:${p.wm2}}
.foot .wm2 i{display:block;height:1px;width:${Math.round(w * 0.022)}px;background:${p.stroke}}`;

// Zitat-Overlay – Typografie 1:1 wie quoteTile in brand-assets.mjs.
const quoteCss = (w, h, theme) => { const p = PAL(theme); return `${p.scrim}
.qmark{position:absolute;left:50%;top:${Math.round(h * 0.35)}px;transform:translate(-50%,-50%);font-family:Fraunces,serif;font-weight:600;font-size:${Math.round(w * 0.6)}px;line-height:.62;color:${p.qmark};pointer-events:none;z-index:2}
.qwrap{position:absolute;left:50%;top:47%;transform:translate(-50%,-50%);width:${w - Math.round(w * 0.3)}px;text-align:center;z-index:3}
.quote{font-family:Fraunces,serif;font-weight:500;color:${p.text};font-size:${Math.round(w * 0.067)}px;line-height:1.32;letter-spacing:-.3px;text-shadow:${p.shadow}}
.quote em{font-style:italic;font-weight:600;font-size:1.07em;background:${p.accent};-webkit-background-clip:text;background-clip:text;color:transparent}
${footCss(w, p)}`; };

const quoteBody = (q, theme) => `<div class="scrim"></div><div class="qmark">„</div>
<div class="qwrap"><div class="quote">${q.t}</div></div>
<div class="foot"><img src="${brainFor(theme)}"><div class="wm"><span class="wm1">Werde <em>Meister</em></span><span class="wm2"><i></i>Deiner Gedanken<i></i></span></div></div>`;

// Fakten-Overlay – Typografie 1:1 wie factTile in brand-assets.mjs.
const factCss = (w, theme) => { const p = PAL(theme); return `${p.scrim}
.fwrap{position:absolute;left:50%;top:46%;transform:translate(-50%,-50%);width:${w - Math.round(w * 0.24)}px;text-align:center;z-index:3}
.eyebrow{font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:${p.eyebrow};font-size:${Math.round(w * 0.024)}px;margin-bottom:${Math.round(w * 0.045)}px}
.fact{font-family:Fraunces,serif;font-weight:500;color:${p.text};font-size:${Math.round(w * 0.064)}px;line-height:1.3;letter-spacing:-.3px;text-shadow:${p.shadow}}
.fact em{font-style:italic;font-weight:600;font-size:1.07em;background:${p.accent};-webkit-background-clip:text;background-clip:text;color:transparent}
.src{margin-top:${Math.round(w * 0.045)}px;font-size:${Math.round(w * 0.026)}px;line-height:1.4;color:${p.srcMuted}}
.src b{color:${p.srcB};font-weight:700}
${footCss(w, p)}`; };

const factBody = (f, theme) => `<div class="scrim"></div>
<div class="fwrap">
  <div class="eyebrow">Studien-Fakt</div>
  <div class="fact">${f.t}</div>
  <div class="src"><b>Quelle:</b> ${f.src}</div>
</div>
<div class="foot"><img src="${brainFor(theme)}"><div class="wm"><span class="wm1">Werde <em>Meister</em></span><span class="wm2"><i></i>Deiner Gedanken<i></i></span></div></div>`;

const doc = (F, css, body, transparent) =>
  `<!doctype html><html><head><meta charset="utf8"><link rel="stylesheet" href="${fonts}">
<style>*{margin:0;box-sizing:border-box}
body{width:${F.w}px;height:${F.h}px;overflow:hidden;font-family:Inter,sans-serif;position:relative;background:${transparent ? "transparent" : "#090b10"}}
${css}</style></head><body>${body}</body></html>`;

// Serien: key (Ordner) → { css, body, items }.
const SERIES = [
  { key: "zitate", css: (F, theme) => quoteCss(F.w, F.h, theme), body: quoteBody, items: QUOTES },
  { key: "studien-fakten", css: (F, theme) => factCss(F.w, theme), body: factBody, items: FACTS },
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
    if (THEMES.includes("dunkel")) {
      const pg = await browser.newPage({ viewport: { width: F.w, height: F.h } });
      const tmp = join(HERE, `.bg-${S.key}-${F.key}.html`);
      writeFileSync(tmp, doc(F, bgCss, `<div class="bg"></div><div class="stars"></div>`, false));
      await pg.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
      await pg.screenshot({ path: join(fdir, "_hintergrund.png") });
      await pg.close(); rmSync(tmp, { force: true });
    }

    // Helle Creme-Variante desselben Hintergrunds (wie Website-Header).
    if (THEMES.includes("hell")) {
      const pg = await browser.newPage({ viewport: { width: F.w, height: F.h } });
      const tmp = join(HERE, `.bghell-${S.key}-${F.key}.html`);
      writeFileSync(tmp, doc(F, bgCssHell, `<div class="bg-hell"></div>`, false));
      await pg.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
      await pg.screenshot({ path: join(fdir, "_hintergrund-hell.png") });
      await pg.close(); rmSync(tmp, { force: true });
    }

    // Türkis-Variante desselben Hintergrunds (Navy-Grund, Teal-Schimmer).
    if (THEMES.includes("tuerkis")) {
      const pg = await browser.newPage({ viewport: { width: F.w, height: F.h } });
      const tmp = join(HERE, `.bgteal-${S.key}-${F.key}.html`);
      writeFileSync(tmp, doc(F, bgCssTeal, `<div class="bg"></div><div class="stars"></div>`, false));
      await pg.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
      await pg.screenshot({ path: join(fdir, "_hintergrund-tuerkis.png") });
      await pg.close(); rmSync(tmp, { force: true });
    }

    // Creme-Grund mit Teal-Schimmer (tuerkis-hell).
    if (THEMES.includes("tuerkis-hell")) {
      const pg = await browser.newPage({ viewport: { width: F.w, height: F.h } });
      const tmp = join(HERE, `.bghellteal-${S.key}-${F.key}.html`);
      writeFileSync(tmp, doc(F, bgCssHellTeal, `<div class="bg-hell"></div>`, false));
      await pg.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
      await pg.screenshot({ path: join(fdir, "_hintergrund-tuerkis-hell.png") });
      await pg.close(); rmSync(tmp, { force: true });
    }

    // Pro Eintrag ein transparentes Overlay je Farbwelt: dunkel (Gold), hell
    // (Creme-Scrim, Tinte-Schrift) und türkis (Teal-Akzente auf dunklem Scrim).
    for (const it of S.items) {
      for (const theme of THEMES) {
        const sfx = THEME_SUFFIX[theme];
        const pg = await browser.newPage({ viewport: { width: F.w, height: F.h } });
        const tmp = join(HERE, `.ov-${theme}-${S.key}-${F.key}-${it.key}.html`);
        writeFileSync(tmp, doc(F, S.css(F, theme), S.body(it, theme), true));
        await pg.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
        // Namensschema: dunkel = overlay-<key>, sonst overlay<sfx>-<key>.
        const name = theme === "dunkel" ? `overlay-${it.key}.png` : `overlay${sfx}-${it.key}.png`;
        await pg.screenshot({ path: join(fdir, name), omitBackground: true });
        await pg.close(); rmSync(tmp, { force: true });
      }
    }
    console.log("✓", S.key, F.key, "→", S.items.length, "×", THEMES.length, "Overlays +", THEMES.length, "Hintergründe");
  }
}
await browser.close();
