/**
 * Beliebiges (türkises, freigestelltes) Emblem golden backen.
 *
 *   node tools/print/gold-filter.mjs <quelle.png> [ziel.png] [größe]
 *   npm run gold-filter -- public/logo-brain-seite.png
 *
 * Nutzt exakt denselben Gold-Filter wie tools/print/gold-emblem.mjs
 * (Spiegel von `.logo-gold` in src/app/globals.css), damit jede Variante
 * – z. B. die Seitenansicht – stilistisch 1:1 zum Frontal-Logo passt.
 *
 * Ohne Ziel wird "<quelle>-gold.png" bzw. "<quelle ohne -seite>-gold-seite.png"
 * abgeleitet; Standard: aus "logo-brain-seite.png" wird
 * "logo-brain-gold-seite.png".
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join, isAbsolute, basename } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");

// Spiegel des `.logo-gold`-Filters aus src/app/globals.css (Quelle der Wahrheit).
const FILTER = "grayscale(1) sepia(1) saturate(2.6) hue-rotate(-8deg) brightness(1.05) contrast(1.02)";

const rel = (p) => (isAbsolute(p) ? p : join(ROOT, p));

const srcArg = process.argv[2];
if (!srcArg) {
  console.error("Aufruf: node tools/print/gold-filter.mjs <quelle.png> [ziel.png] [größe]");
  process.exit(1);
}
const srcPath = rel(srcArg);
if (!existsSync(srcPath)) {
  console.error(`Quelle nicht gefunden: ${srcPath}`);
  process.exit(1);
}

// Ziel ableiten: "logo-brain-seite.png" -> "logo-brain-gold-seite.png",
// sonst "<name>-gold.<ext>".
function deriveOut(p) {
  const b = basename(p);
  const m = b.match(/^(.*?)\.(png|webp|jpg|jpeg)$/i);
  if (!m) return p.replace(/(\.[^.]+)$/, "-gold$1");
  const [, name, ext] = m;
  const goldName = name.includes("-gold")
    ? name
    : name.replace(/-(seite|profil|side)$/i, "-gold-$1").replace(/^(?!.*-gold)(.*)$/, (s) =>
        /-gold-/.test(s) ? s : `${name}-gold`,
      );
  return join(dirname(p), `${goldName}.${ext.toLowerCase()}`);
}
const outPath = process.argv[3] ? rel(process.argv[3]) : deriveOut(srcPath);
const SIZE = Number(process.argv[4]) || 640;

const require = createRequire(import.meta.url);
function findChrome() {
  if (process.env.CHROME_BIN && existsSync(process.env.CHROME_BIN)) return process.env.CHROME_BIN;
  try { const p = require("playwright").chromium.executablePath(); if (p && existsSync(p)) return p; } catch {}
  for (const r of [process.env.PLAYWRIGHT_BROWSERS_PATH, "/opt/pw-browsers"].filter(Boolean)) {
    try { for (const d of readdirSync(r)) { if (d.startsWith("chromium")) { const p = join(r, d, "chrome-linux/chrome"); if (existsSync(p)) return p; } } } catch {}
  }
  throw new Error("Kein Chromium/Chrome gefunden. Führe aus:  npx playwright install chromium");
}

const src = "data:image/png;base64," + readFileSync(srcPath).toString("base64");
const { chromium } = require("playwright");
const browser = await chromium.launch({ executablePath: findChrome() });
// deviceScaleFactor 2 -> das Emblem wird intern doppelt so groß gerendert und
// dann in Originalgröße gespeichert; das hält Kanten und Neuronen-Glow scharf.
const page = await browser.newPage({ viewport: { width: SIZE, height: SIZE }, deviceScaleFactor: 2 });
await page.setContent(
  `<style>*{margin:0}html,body{background:transparent}` +
    `img{width:${SIZE}px;height:${SIZE}px;object-fit:contain;filter:${FILTER}}</style>` +
    `<img src="${src}">`,
  { waitUntil: "networkidle" });
await (await page.$("img")).screenshot({ path: outPath, omitBackground: true });
await browser.close();
console.log(`✓ ${outPath.replace(ROOT + "/", "")}`);
