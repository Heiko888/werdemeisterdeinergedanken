/**
 * Goldenes Emblem für Print, Word & E-Mail-Signatur.
 *
 *   node tools/print/gold-emblem.mjs      (oder: npm run gold-emblem)
 *
 * Der Website-Header färbt das Gehirn-Emblem per CSS-Filter gold
 * (`.logo-gold` in src/app/globals.css). CSS-Filter funktioniert im
 * PDF-Rendering (Chromium), aber NICHT in Word oder E-Mail-Clients. Damit das
 * Logo überall identisch golden aussieht, backen wir den Filter hier einmal in
 * ein transparentes PNG und nutzen dieses als Quelle für alle Print-Generatoren.
 *
 * Ausgabe:
 *   public/logo-brain-gold.png          640 px, transparent (Emblem-Asset)
 *   public/email/wmdg-signatur-logo.png 240 px, optimiert (Word + Signatur)
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");

// Spiegel des `.logo-gold`-Filters aus src/app/globals.css (Quelle der Wahrheit).
const FILTER = "grayscale(1) sepia(1) saturate(2.6) hue-rotate(-8deg) brightness(1.05) contrast(1.02)";
const SIZE = 640;

const require = createRequire(import.meta.url);
function findChrome() {
  if (process.env.CHROME_BIN && existsSync(process.env.CHROME_BIN)) return process.env.CHROME_BIN;
  try { const p = require("playwright").chromium.executablePath(); if (p && existsSync(p)) return p; } catch {}
  for (const r of [process.env.PLAYWRIGHT_BROWSERS_PATH, "/opt/pw-browsers"].filter(Boolean)) {
    try { for (const d of readdirSync(r)) { if (d.startsWith("chromium")) { const p = join(r, d, "chrome-linux/chrome"); if (existsSync(p)) return p; } } } catch {}
  }
  throw new Error("Kein Chromium/Chrome gefunden. Führe aus:  npx playwright install chromium");
}

const src = "data:image/png;base64," + readFileSync(join(ROOT, "public/logo-brain.png")).toString("base64");
const { chromium } = require("playwright");
const browser = await chromium.launch({ executablePath: findChrome() });
const page = await browser.newPage({ viewport: { width: SIZE, height: SIZE }, deviceScaleFactor: 1 });
await page.setContent(
  `<style>*{margin:0}html,body{background:transparent}</style><img src="${src}" style="width:${SIZE}px;height:${SIZE}px;filter:${FILTER}">`,
  { waitUntil: "networkidle" });
const goldPath = join(ROOT, "public/logo-brain-gold.png");
await (await page.$("img")).screenshot({ path: goldPath, omitBackground: true });
await browser.close();
console.log("✓ public/logo-brain-gold.png");

// Optimierte kleine Variante für Word + E-Mail-Signatur.
const sharp = require("sharp");
await sharp(goldPath).resize(240, 240, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 }).toFile(join(ROOT, "public/email/wmdg-signatur-logo.png"));
console.log("✓ public/email/wmdg-signatur-logo.png (240 px)");
