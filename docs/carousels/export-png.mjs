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
import { FORMATS, loadCarousels } from "./data.mjs";

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
const only = process.env.FORMAT; // optional: nur ein Format (z. B. feed-1x1)
const formats = FORMATS.filter((F) => !only || F.key === only);

// Playwright rendert das Viewport pixelgenau. Chromium-CLI --window-size lässt
// je nach Build ~87px unten weg → der Footer wurde abgeschnitten.
// Overlay-Variante: dieselbe Slide, aber Hintergrund (designter Marken-Verlauf
// + Sterne) transparent. Scrim + Inhalt bleiben → transparentes PNG zum
// Überlagern eines eigenen Fotos in Canva. Landet parallel unter export-overlay/.
const OVERLAY_CSS = `html,body{background:transparent !important}
.slide::before,.slide::after,.bg{display:none !important}`;

const browser = await chromium.launch({ executablePath: findChrome() });
async function shot(page, htmlPath, pngPath, ovPath) {
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
  await page.screenshot({ path: pngPath });
  if (!existsSync(pngPath)) throw new Error(`Render fehlgeschlagen: ${htmlPath}`);
  // Overlay-Variante (transparent) im selben Seitenaufruf.
  await page.addStyleTag({ content: OVERLAY_CSS });
  await page.screenshot({ path: ovPath, omitBackground: true });
}

const data = loadCarousels().filter((s) => !onlySeries || s.key === onlySeries);
if (data.length === 0) {
  console.error(`Unbekannte Serie: ${onlySeries}`);
  process.exit(1);
}

let n = 0;
for (const F of formats) {
  // Ein Page pro Format (fixes Viewport) – spart Neu-Setzen je Slide.
  const page = await browser.newPage({ viewport: { width: F.w, height: F.h }, deviceScaleFactor: SCALE });
  for (const s of data) {
    const carousels = s.carousels.filter((c) => !onlySlug || c.slug === onlySlug);
    for (const car of carousels) {
      const srcDir = join(BUILD, s.key, car.slug, F.key);
      const outDir = join(HERE, "export", s.key, car.slug, F.key);
      const ovDir = join(HERE, "export-overlay", s.key, car.slug, F.key);
      mkdirSync(outDir, { recursive: true });
      mkdirSync(ovDir, { recursive: true });
      for (let i = 0; i < car.slides.length; i++) {
        const nn = String(i + 1).padStart(2, "0");
        await shot(
          page,
          join(srcDir, `slide-${nn}.html`),
          join(outDir, `slide-${nn}.png`),
          join(ovDir, `slide-${nn}.png`),
        );
        n++;
      }
    }
    console.log(`✓ ${F.key} · ${s.key}: ${s.carousels.length} Carousels`);
  }
  await page.close();
}
await browser.close();
console.log(`\nFertig: ${n} PNG in docs/carousels/export/${SCALE > 1 ? `  (×${SCALE})` : ""}`);
