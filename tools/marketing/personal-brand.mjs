/**
 * Persönliche Marken-Grafik: freigestelltes Foto auf dem Marken-Hintergrund
 * (Creme/Navy/Türkis-Schimmer) mit zentralem Glow – OHNE Wortmarke, OHNE Gehirn.
 *
 * Eingabe:  docs/marketing/_input/portrait.png   (freigestelltes PNG, transparent)
 *           (alternativ: erstes *.png in docs/marketing/_input/)
 * Aufruf:   node tools/marketing/personal-brand.mjs
 *           SCALE=2 node tools/marketing/personal-brand.mjs   (doppelte Auflösung)
 *           THEME=hell node …                                 (nur eine Welt)
 * Ausgabe:  docs/marketing/personal/WMDG-Personal-<format><suffix>.png
 */
import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const fontsUrl = pathToFileURL(join(ROOT, "tools/pdf/assets/fonts.css")).href;
const INPUT_DIR = join(ROOT, "docs/marketing/_input");
const OUT_DIR = join(ROOT, "docs/marketing/personal");

// --- Eingabe-Foto finden -----------------------------------------------------
// Reihenfolge: PORTRAIT=<pfad> → docs/marketing/_input/* (png/webp/jpg) →
// Fallback public/heiko-hero.webp (freigestelltes Hero-Portrait).
function findPortrait() {
  if (process.env.PORTRAIT && existsSync(process.env.PORTRAIT)) return process.env.PORTRAIT;
  if (existsSync(INPUT_DIR)) {
    const img = readdirSync(INPUT_DIR).find((f) => /\.(png|webp|jpe?g)$/i.test(f));
    if (img) return join(INPUT_DIR, img);
  }
  const hero = join(ROOT, "public/heiko-hero.webp");
  if (existsSync(hero)) return hero;
  return null;
}
const portrait = findPortrait();
if (!portrait) {
  console.error(
    "Kein Foto gefunden. Lege ein freigestelltes Bild unter\n  docs/marketing/_input/portrait.png\nab (oder PORTRAIT=<pfad>) und starte erneut.",
  );
  process.exit(1);
}
const mime = /\.webp$/i.test(portrait) ? "image/webp" : /\.jpe?g$/i.test(portrait) ? "image/jpeg" : "image/png";
const portraitUri = `data:${mime};base64,${readFileSync(portrait).toString("base64")}`;

// --- Marken-Hintergründe (1:1 aus brand-assets.mjs übernommen) ----------------
const BG_HELL = `
.bg{position:absolute;inset:0;background:
  radial-gradient(78% 62% at 50% -10%, rgba(232,193,95,.26), transparent 62%),
  radial-gradient(60% 55% at 96% 4%, rgba(242,212,137,.12), transparent 60%),
  radial-gradient(58% 52% at 4% 108%, rgba(217,169,58,.13), transparent 60%),
  #f6f4ee; box-shadow:inset 0 26px 44px -34px rgba(8,16,42,.22);}`;
const BG = `
.bg{position:absolute;inset:0;background:
  radial-gradient(52% 110% at 86% 10%, rgba(233,193,95,.20), transparent 60%),
  radial-gradient(46% 110% at 6% 96%, rgba(168,132,42,.10), transparent 60%),
  radial-gradient(42% 90% at 74% 92%, rgba(217,169,58,.12), transparent 60%),
  #090b10;}`;
const BG_TUERKIS = `
.bg{position:absolute;inset:0;background:
  radial-gradient(54% 112% at 84% 8%, rgba(52,196,196,.24), transparent 60%),
  radial-gradient(48% 110% at 6% 96%, rgba(33,178,189,.14), transparent 60%),
  radial-gradient(44% 92% at 74% 94%, rgba(140,198,63,.12), transparent 60%),
  #090b10;}`;
const BG_HELL_TEAL = `
.bg{position:absolute;inset:0;background:
  radial-gradient(78% 62% at 50% -10%, rgba(52,196,196,.20), transparent 62%),
  radial-gradient(60% 55% at 96% 4%, rgba(140,198,63,.12), transparent 60%),
  radial-gradient(58% 52% at 4% 108%, rgba(33,178,189,.12), transparent 60%),
  #f6f4ee; box-shadow:inset 0 26px 44px -34px rgba(8,16,42,.22);}`;

function palette(theme) {
  const hell = theme === "hell" || theme === "tuerkis-hell";
  const teal = theme === "tuerkis" || theme === "tuerkis-hell";
  return {
    hell, base: hell ? "#f6f4ee" : "#090b10",
    bg: teal ? (hell ? BG_HELL_TEAL : BG_TUERKIS) : (hell ? BG_HELL : BG),
    glow: teal ? "52,196,196" : "233,193,95",
  };
}

// --- Layout: Foto zentriert, unten verankert, Glow dahinter ------------------
const html = (w, h, P) => {
  const base = Math.min(w, h);
  const glow = Math.round(base * 0.9);
  return `<!doctype html><html><head><meta charset="utf8">
<link rel="stylesheet" href="${fontsUrl}"><style>
*{margin:0;box-sizing:border-box}
body{width:${w}px;height:${h}px;overflow:hidden;position:relative;background:${P.base};font-family:Inter,sans-serif}
${P.bg}
.glow{position:absolute;left:50%;top:46%;transform:translate(-50%,-50%);width:${glow}px;height:${glow}px;border-radius:50%;
  background:radial-gradient(circle, rgba(${P.glow},${P.hell ? ".5" : ".55"}), transparent 66%);filter:blur(60px)}
.person{position:absolute;left:50%;bottom:0;transform:translateX(-50%);height:${Math.round(h * 0.98)}px;width:auto;max-width:96%;
  object-fit:contain;object-position:bottom;filter:drop-shadow(0 24px 60px rgba(0,0,0,${P.hell ? ".22" : ".5"}))}
</style></head><body>
<div class="bg"></div><div class="glow"></div>
<img class="person" src="${portraitUri}">
</body></html>`;
};

// --- Formate & Render --------------------------------------------------------
const FORMATS = [
  { key: "1x1",  w: 1080, h: 1080 },
  { key: "4x5",  w: 1080, h: 1350 },
  { key: "9x16", w: 1080, h: 1920 },
  { key: "16x9", w: 1920, h: 1080 },
];
const themeSuffix = { hell: "-hell", dunkel: "", tuerkis: "-tuerkis", "tuerkis-hell": "-tuerkis-hell" };
const onlyTheme = process.env.THEME;
let themes = ["hell", "dunkel", "tuerkis", "tuerkis-hell"];
if (onlyTheme) themes = themes.filter((t) => t === onlyTheme);
const SCALE = Number(process.env.SCALE || "1") || 1;

const require = createRequire(import.meta.url);
function findChrome() {
  if (process.env.CHROME_BIN && existsSync(process.env.CHROME_BIN)) return process.env.CHROME_BIN;
  try { const p = require("playwright").chromium.executablePath(); if (p && existsSync(p)) return p; } catch {}
  for (const r of [process.env.PLAYWRIGHT_BROWSERS_PATH, "/opt/pw-browsers"].filter(Boolean)) {
    try { for (const d of readdirSync(r)) { if (d.startsWith("chromium")) { const p = join(r, d, "chrome-linux/chrome"); if (existsSync(p)) return p; } } } catch {}
  }
  throw new Error("Kein Chromium/Chrome gefunden.");
}
const { chromium } = require("playwright");
const browser = await chromium.launch({ executablePath: findChrome() });
mkdirSync(OUT_DIR, { recursive: true });
console.log("Foto:", portrait);
for (const F of FORMATS) {
  for (const theme of themes) {
    const P = palette(theme);
    const page = await browser.newPage({ viewport: { width: F.w, height: F.h }, deviceScaleFactor: SCALE });
    const tmp = join(HERE, `.tmp-personal.html`);
    writeFileSync(tmp, html(F.w, F.h, P));
    await page.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
    const out = join(OUT_DIR, `WMDG-Personal-${F.key}${themeSuffix[theme]}.png`);
    await page.screenshot({ path: out });
    await page.close(); rmSync(tmp, { force: true });
    console.log("✓", `personal/WMDG-Personal-${F.key}${themeSuffix[theme]}.png`, `${F.w * SCALE}×${F.h * SCALE}`);
  }
}
await browser.close();
