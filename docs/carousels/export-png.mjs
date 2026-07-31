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
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { FORMAT, loadCarousels } from "./data.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const BUILD = join(HERE, "build");
const SCALE = Number(process.env.SCALE || "1") || 1;
const [onlySeries, onlySlug] = process.argv.slice(2);

function findChrome() {
  if (process.env.CHROME_BIN && existsSync(process.env.CHROME_BIN)) return process.env.CHROME_BIN;
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

const CHROME = findChrome();
const { w: W, h: H } = FORMAT;

function shot(htmlPath, pngPath) {
  const r = spawnSync(
    CHROME,
    [
      "--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars",
      `--force-device-scale-factor=${SCALE}`, `--window-size=${W},${H}`,
      "--virtual-time-budget=2500", `--screenshot=${pngPath}`, pathToFileURL(htmlPath).href,
    ],
    { stdio: "ignore" },
  );
  if (r.status !== 0 || !existsSync(pngPath)) throw new Error(`Render fehlgeschlagen: ${htmlPath}`);
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
    car.slides.forEach((_sl, i) => {
      const nn = String(i + 1).padStart(2, "0");
      shot(join(srcDir, `slide-${nn}.html`), join(outDir, `slide-${nn}.png`));
      n++;
    });
    console.log(`✓ ${s.key}/${car.slug} · ${car.slides.length} Slides`);
  }
}
console.log(`\nFertig: ${n} PNG in docs/carousels/export/${SCALE > 1 ? `  (×${SCALE})` : ""}`);
