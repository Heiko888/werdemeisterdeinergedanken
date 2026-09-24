/**
 * Logo-Paket zum Herunterladen/Weitergeben (Grafiker, Druckerei, Canva …).
 *
 *   npm run logo-paket        (= node tools/print/logo-paket.mjs)
 *
 * Erzeugt in docs/marketing/logo-paket/:
 *   • Emblem in Gold (freigestellt, transparent)
 *   • Schriftlogo „WERDE MEISTER / DEINER GEDANKEN" – 1:1 wie der Website-
 *     Header (Logo.tsx: Fraunces, „MEISTER" im Gold-Verlauf, goldene
 *     Flankier-Striche) – für helle und für dunkle Flächen, transparent
 *   • Komplett-Logo (Emblem + Schriftlogo), transparent
 *   • Creme-Hintergrund (#f6f4ee = --color-paper) pur und mit Gold-Aura
 *     (wie .bg-paper-aura) in 1:1, 4:5, 9:16, 16:9
 *   • Vorschau: Komplett-Logo auf Creme
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync, copyFileSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { CONTACT, C } from "./marke.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const OUT = join(ROOT, "docs/marketing/logo-paket");
mkdirSync(OUT, { recursive: true });

const fontsCss = readFileSync(join(ROOT, "tools/pdf/assets/fonts.css"), "utf8");
const brainPath = join(ROOT, "public/logo-brain-gold-freigestellt.png");
const brain = "data:image/png;base64," + readFileSync(brainPath).toString("base64");
const L = CONTACT.lockup;
const S = 8; // Skalierung ggü. Web-Header (Header-Wortmarke ≈ 18 px → ~144 px)

// Farben je Untergrund – wie Logo.tsx (tone onLight / onDark).
const TONES = {
  "auf-Hell": { text: C.ink, gold: `linear-gradient(100deg,${C.gold500},${C.gold700})`, line: C.gold500 },
  "auf-Dunkel": { text: C.cream, gold: `linear-gradient(100deg,${C.gold300},${C.gold500})`, line: C.gold300 },
};

const wordmark = (t) => `
  <div class="wm">
    <div class="l1">${L.pre} <span class="g" style="background-image:${t.gold}">${L.gold}</span></div>
    <div class="l2"><i style="background:${t.line}"></i><span>${L.sub}</span><i style="background:${t.line}"></i></div>
  </div>`;

const baseCss = `
${fontsCss}
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:transparent}
.pad{display:inline-flex;align-items:center;gap:${12 * S}px;padding:${4 * S}px}
.emb{height:${48 * S}px;width:auto}
.wm{display:flex;flex-direction:column;gap:${0.32 * 16 * S}px;line-height:1}
.wm .l1{font-family:Fraunces,serif;font-weight:400;text-transform:uppercase;letter-spacing:.1em;font-size:${1.12 * 16 * S}px;line-height:1}
.wm .l1 .g{-webkit-background-clip:text;background-clip:text;color:transparent}
.wm .l2{display:flex;align-items:center;justify-content:center;gap:${8 * S}px}
.wm .l2 span{font-family:Fraunces,serif;font-weight:400;text-transform:uppercase;letter-spacing:.24em;font-size:${0.54 * 16 * S}px;line-height:1;padding-left:.24em}
.wm .l2 i{display:block;height:${1 * S}px;width:${12 * S}px;opacity:.8}
`;

// Creme-Flächen
const AURA = `radial-gradient(78% 62% at 50% -10%, rgba(232,193,95,.26), transparent 62%),
  radial-gradient(60% 55% at 96% 4%, rgba(242,212,137,.12), transparent 60%),
  radial-gradient(58% 52% at 4% 108%, rgba(217,169,58,.13), transparent 60%), ${C.paper}`;
const FORMATE = { "1x1": [1080, 1080], "4x5": [1080, 1350], "9x16": [1080, 1920], "16x9": [1920, 1080] };

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
const browser = await chromium.launch({ executablePath: findChrome() });
const page = await browser.newPage({ viewport: { width: 2400, height: 2400 } });
const tmp = join(HERE, ".tmp-logo-paket.html");

async function render(body, css, file, { selector = ".pad", transparent = true, viewport } = {}) {
  if (viewport) await page.setViewportSize(viewport);
  writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf-8"><style>${baseCss}${css}</style></head><body>${body}</body></html>`);
  await page.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const el = await page.$(selector);
  await el.screenshot({ path: join(OUT, file), omitBackground: transparent });
  console.log("✓ docs/marketing/logo-paket/" + file);
}

// 1) Emblem Gold (Original, 2000×2000, transparent)
copyFileSync(brainPath, join(OUT, "WMDG-Emblem-Gold.png"));
console.log("✓ docs/marketing/logo-paket/WMDG-Emblem-Gold.png");

// 2) Schriftlogo + 3) Komplett-Logo, je für helle/dunkle Flächen
for (const [name, t] of Object.entries(TONES)) {
  await render(`<div class="pad">${wordmark(t)}</div>`, "", `WMDG-Schriftlogo-${name}.png`, { viewport: { width: 2400, height: 2400 } });
  await render(`<div class="pad"><img class="emb" src="${brain}" alt="">${wordmark(t)}</div>`, "", `WMDG-Logo-komplett-${name}.png`);
}

// 4) Creme-Hintergrund pur + mit Aura, 5) Vorschau Logo auf Creme
for (const [fmt, [w, h]] of Object.entries(FORMATE)) {
  const vp = { width: w, height: h };
  const css = `.bg{width:${w}px;height:${h}px}`;
  await render(`<div class="bg" style="background:${C.paper}"></div>`, css, `WMDG-Creme-Hintergrund-${fmt}.png`, { selector: ".bg", transparent: false, viewport: vp });
  await render(`<div class="bg" style="background:${AURA}"></div>`, css, `WMDG-Creme-Hintergrund-Aura-${fmt}.png`, { selector: ".bg", transparent: false, viewport: vp });
}
{
  const [w, h] = FORMATE["16x9"];
  const css = `.bg{width:${w}px;height:${h}px;display:flex;align-items:center;justify-content:center}.bg .pad{transform:scale(.55)}`;
  await render(`<div class="bg" style="background:${AURA}"><div class="pad"><img class="emb" src="${brain}" alt="">${wordmark(TONES["auf-Hell"])}</div></div>`, css, "WMDG-Logo-auf-Creme-16x9.png", { selector: ".bg", transparent: false, viewport: { width: w, height: h } });
}

await browser.close();
rmSync(tmp, { force: true });
