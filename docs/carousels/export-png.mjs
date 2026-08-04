/**
 * PNG-Export fürs Carousel-Studio.
 * -------------------------------
 * Baut zuerst die Slide-HTMLs (build.mjs) und rendert dann jede Slide
 * pixelgenau als PNG – mit demselben Chromium wie die PDF-Pipeline.
 *
 *   node docs/carousels/export-png.mjs                    # alle
 *   node docs/carousels/export-png.mjs stufen             # nur eine Serie
 *   node docs/carousels/export-png.mjs stufen autopilot   # Serie + Carousel
 *
 * Ausgabe: docs/carousels/export/<serie>/<slug>/slide-NN.png
 * Optional: SCALE=2 node … → doppelte Auflösung.
 */
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { FORMAT, loadCarousels } from "./data.mjs";

const require = createRequire(import.meta.url);
const HERE = dirname(fileURLToPath(import.meta.url));
const BUILD = join(HERE, "build");
const SCALE = Number(process.env.SCALE || "1") || 1;
const [onlySeries, onlySlug] = process.argv.slice(2);

function findChrome() {
  if (process.env.CHROME_BIN && existsSync(process.env.CHROME_BIN)) return process.env.CHROME_BIN;
  // Von Playwright installiertes Chromium (nach `npx playwright install chromium`).
  try {
    const p = require("playwright").chromium.executablePath();
    if (p && existsSync(p)) return p;
  } catch {}
  const roots = [process.env.PLAYWRIGHT_BROWSERS_PATH, "/opt/pw-browsers"].filter(Boolean);
  for (const r of roots) {
    try {
      for (const d of readdirSync(r)) {
        if (!d.startsWith("chromium")) continue;
        for (const bin of ["chrome-linux/chrome", "chrome-mac/Chromium.app/Contents/MacOS/Chromium", "chrome-win/chrome.exe"]) {
          const p = join(r, d, bin);
          if (existsSync(p)) return p;
        }
      }
    } catch {}
  }
  for (const c of ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"]) {
    const r = spawnSync(process.platform === "win32" ? "where" : "which", [c], { encoding: "utf8" });
    if (r.status === 0) return r.stdout.trim().split("\n")[0];
  }
  throw new Error("Kein Chromium/Chrome gefunden. Setze CHROME_BIN oder:  npx playwright install chromium");
}

// Frische Slide-HTMLs erzeugen.
const gen = spawnSync(process.execPath, [join(HERE, "build.mjs")], { stdio: "inherit" });
if (gen.status !== 0) throw new Error("build.mjs fehlgeschlagen");

const { chromium } = require("playwright");
const { w: W, h: H } = FORMAT;

// Playwright rendert das Viewport pixelgenau. Chromium-CLI --window-size lässt
// je nach Build ~87px unten weg → der Footer wurde abgeschnitten.
const browser = await chromium.launch({ executablePath: findChrome() });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: SCALE });
async function shot(htmlPath, pngPath) {
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
  await page.screenshot({ path: pngPath });
  if (!existsSync(pngPath)) throw new Error(`Render fehlgeschlagen: ${htmlPath}`);
}

const data = loadCarousels().filter((s) => !onlySeries || s.key === onlySeries);
if (data.length === 0) {
  console.error(`Unbekannte Serie: ${onlySeries}`);
  process.exit(1);
}

let n = 0;
for (const s of data) {
  const carousels = s.carousels.filter((c) => !onlySlug || c.slug === onlySlug);
  for (const car of carousels) {
    const srcDir = join(BUILD, s.key, car.slug);
    const outDir = join(HERE, "export", s.key, car.slug);
    mkdirSync(outDir, { recursive: true });
    for (let i = 0; i < car.slides.length; i++) {
      const nn = String(i + 1).padStart(2, "0");
      await shot(join(srcDir, `slide-${nn}.html`), join(outDir, `slide-${nn}.png`));
      n++;
    }
    console.log(`✓ ${s.key}/${car.slug} · ${car.slides.length} Slides`);
  }
}
await browser.close();
console.log(`\nFertig: ${n} PNG in docs/carousels/export/${SCALE > 1 ? `  (×${SCALE})` : ""}`);
