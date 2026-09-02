/**
 * Logo-Lockup als Bild (für Word – dort geht kein Verlaufstext).
 *
 *   node tools/print/logo-lockup.mjs      (läuft mit in npm run gold-emblem-Kette)
 *
 * Rendert das vollständige Marken-Logo – goldenes Emblem + Wortmarke
 * „WERDE MEISTER / DEINER GEDANKEN" (MEISTER im Gold-Verlauf, wie Header/
 * Briefbogen) – einmal via Chromium in ein transparentes PNG, damit es 1:1
 * (inkl. Verlauf) in die Word-Vorlage eingebettet werden kann.
 *
 * Ausgabe: public/email/wmdg-logo-lockup.png
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { CONTACT, C } from "./marke.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const fontsCss = readFileSync(join(ROOT, "tools/pdf/assets/fonts.css"), "utf8");
const brain = "data:image/png;base64," + readFileSync(join(ROOT, "public/logo-brain-gold-freigestellt.png")).toString("base64");
const L = CONTACT.lockup;
const SCALE = 4; // Wiedergabe-Auflösung (Retina für scharfen Druck)

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
${fontsCss}
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:transparent}
.lock{display:inline-flex;align-items:center;gap:${5 * SCALE}px;padding:${3 * SCALE}px}
.lock img{width:${34 * SCALE}px;height:${34 * SCALE}px;filter:drop-shadow(0 0 ${2 * SCALE}px rgba(216,169,58,.30))}
.wm .l1{font-family:Inter,sans-serif;font-weight:700;letter-spacing:.1em;text-transform:uppercase;font-size:${13 * SCALE}px;line-height:1;color:${C.ink}}
.wm .l1 .g{background:linear-gradient(100deg,${C.gold500},${C.gold700});-webkit-background-clip:text;background-clip:text;color:transparent}
.wm .l2{margin-top:${2.4 * SCALE}px;display:flex;align-items:center;gap:${2.4 * SCALE}px;font-family:Inter,sans-serif;font-weight:600;letter-spacing:.26em;text-transform:uppercase;font-size:${5 * SCALE}px;color:${C.ink}}
.wm .l2 i{display:block;width:${5 * SCALE}px;height:${0.9 * SCALE}px;background:linear-gradient(90deg,${C.gold500},${C.gold600})}
.wm .l2 span{padding-left:.26em}
</style></head><body>
  <div class="lock">
    <img src="${brain}" alt="">
    <div class="wm">
      <div class="l1">${L.pre} <span class="g">${L.gold}</span></div>
      <div class="l2"><i></i><span>${L.sub}</span><i></i></div>
    </div>
  </div>
</body></html>`;

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
const tmp = join(HERE, ".tmp-lockup.html");
writeFileSync(tmp, html);
const browser = await chromium.launch({ executablePath: findChrome() });
const page = await browser.newPage({ deviceScaleFactor: 1 });
await page.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
const el = await page.$(".lock");
const out = join(ROOT, "public/email/wmdg-logo-lockup.png");
await el.screenshot({ path: out, omitBackground: true });
await browser.close();
try { require("node:fs").rmSync(tmp, { force: true }); } catch {}
console.log("✓ public/email/wmdg-logo-lockup.png");
