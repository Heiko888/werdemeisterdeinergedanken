/**
 * PNG-Export für alle Cover.
 * --------------------------
 * Rendert jede cover-NN.html mit Chromium pixelgenau als PNG – dasselbe
 * Chromium, das auch die PDF-Pipeline nutzt (kein Zusatz-Tool nötig).
 *
 *   node docs/reels/covers/export-png.mjs                 # alles
 *   node docs/reels/covers/export-png.mjs selbstverteidigung   # nur ein Bereich
 *   node docs/reels/covers/export-png.mjs stufen reel-9x16     # Bereich + Format
 *
 * Ausgabe:  docs/reels/covers/export/<bereich>/<format>/cover-NN.png
 * Für den echten Hintergrund vorher deine vorlage.png in die jeweiligen
 * <bereich>/<format>-Ordner legen (sonst rendert der Marken-Verlauf).
 *
 * Optional: SCALE=2 node … → doppelte Auflösung (z. B. 2160×3840).
 */
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { FORMATS, COLLECTIONS, pad2, THEMES, THEME_SUFFIX } from "./data.mjs";

const require = createRequire(import.meta.url);
const HERE = dirname(fileURLToPath(import.meta.url));
const SCALE = Number(process.env.SCALE || "1") || 1;

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
        for (const bin of [
          "chrome-linux/chrome",
          "chrome-mac/Chromium.app/Contents/MacOS/Chromium",
          "chrome-win/chrome.exe",
        ]) {
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
  throw new Error(
    "Kein Chromium/Chrome gefunden. Setze CHROME_BIN oder führe aus:  npx playwright install chromium",
  );
}

const { chromium } = require("playwright");
const [onlyColl, onlyFormat, onlyTheme] = process.argv.slice(2);
const themes = THEMES.filter((t) => !onlyTheme || t === onlyTheme);
if (themes.length === 0) {
  console.error(`Unbekannte Welt: ${onlyTheme}. Verfügbar: ${THEMES.join(", ")}`);
  process.exit(1);
}

// Overlay-Variante: dasselbe Cover, aber Hintergrund transparent (designter
// Marken-Verlauf + optionale vorlage.png ausgeblendet). Scrim + Inhalt (Logo,
// Headline, Handle) bleiben → transparentes PNG zum Überlagern eines eigenen
// Fotos in Canva. Landet parallel unter export-overlay/.
const OVERLAY_CSS = `html,body{background:transparent !important}
.cover::before,.bg{display:none !important}`;

// Playwright rendert das Viewport pixelgenau. Chromium-CLI --window-size lässt
// je nach Build ~87px unten weg → der Footer/Handle wurde abgeschnitten.
const browser = await chromium.launch({ executablePath: findChrome() });
const page = await browser.newPage({ deviceScaleFactor: SCALE });
async function shot(htmlPath, pngPath, ovPath, w, h) {
  await page.setViewportSize({ width: w, height: h });
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
  await page.screenshot({ path: pngPath });
  if (!existsSync(pngPath)) throw new Error(`Render fehlgeschlagen: ${htmlPath}`);
  // Overlay-Variante (transparent) im selben Seitenaufruf.
  await page.addStyleTag({ content: OVERLAY_CSS });
  await page.screenshot({ path: ovPath, omitBackground: true });
}

let n = 0;
const collections = COLLECTIONS.filter((c) => !onlyColl || c.key === onlyColl);
if (collections.length === 0) {
  console.error(`Unbekannter Bereich: ${onlyColl}. Verfügbar: ${COLLECTIONS.map((c) => c.key).join(", ")}`);
  process.exit(1);
}

for (const coll of collections) {
  const formats = FORMATS.filter((f) => !onlyFormat || f.key === onlyFormat);
  for (const f of formats) {
    const srcDir = join(HERE, coll.key, f.key);
    const outDir = join(HERE, "export", coll.key, f.key);
    const ovDir = join(HERE, "export-overlay", coll.key, f.key);
    mkdirSync(outDir, { recursive: true });
    mkdirSync(ovDir, { recursive: true });
    for (const theme of themes) {
      const sfx = THEME_SUFFIX[theme];
      for (let i = 0; i < coll.items.length; i++) {
        const nn = pad2(i + 1);
        await shot(
          join(srcDir, `cover-${nn}${sfx}.html`),
          join(outDir, `cover-${nn}${sfx}.png`),
          join(ovDir, `overlay-${nn}${sfx}.png`),
          f.w,
          f.h,
        );
        n++;
      }
    }
    console.log(`✓ ${coll.key}/${f.key} · ${coll.items.length} Motive × ${themes.length} Welten`);
  }
}
await browser.close();
console.log(`\nFertig: ${n} PNG in docs/reels/covers/export/${SCALE > 1 ? `  (×${SCALE})` : ""}`);
