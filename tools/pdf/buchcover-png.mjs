/**
 * Buchcover „Werde Meister deiner Gedanken" als PNG.
 *
 *   node tools/pdf/buchcover-png.mjs        (npm run buchcover)
 *
 * Gibt die FERTIGE Titelseite (Cover) des Buches als PNG aus – exakt dieselbe
 * Gestaltung wie im Buch-PDF, kein Nachbau: Das Skript baut das Buch-HTML mit
 * build-buch.py, löst daraus die `<section class="cover">` (creme Grund,
 * goldenes Gehirn, „Das Buch", Titel/Untertitel, Autor) heraus und rendert
 * genau diese A4-Seite via Chromium in ein PNG.
 *
 * Quelle des Covers: tools/pdf/build-buch.py  (Inhalt aus
 * docs/ebook/werde-meister-deiner-gedanken.md).
 *
 * Ausgabe:  public/buchcover-werde-meister.png   (2481 × 3509 px, A4 ~300 dpi)
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const BUILD = join(HERE, ".build");
const BOOK_HTML = join(BUILD, "book-wmdg.html");
const OUT = join(ROOT, "public/buchcover-werde-meister.png");

// A4 in CSS-Pixeln (96 dpi) – das Cover ist in build-buch.py 210mm × 297mm.
const CSS_W = Math.ceil((210 / 25.4) * 96); // 794
const CSS_H = Math.ceil((297 / 25.4) * 96); // 1123
const SCALE = 3.125; // → 2481 × 3509 px (A4 bei ~300 dpi)

// 1) Buch-HTML sicherstellen (mit dem vorhandenen Generator bauen).
if (!existsSync(BOOK_HTML)) {
  console.log("• baue Buch-HTML (build-buch.py) …");
  execFileSync("python3", [join(HERE, "build-buch.py")], { stdio: "inherit" });
}

// 2) Nur die Cover-Section + den <head> (Fonts/Styles) herauslösen.
const book = readFileSync(BOOK_HTML, "utf8");
const head = book.slice(book.indexOf("<head>") + 6, book.indexOf("</head>"));
const i = book.indexOf('<section class="cover">');
const j = book.indexOf("</section>", i) + "</section>".length;
if (i < 0 || j < 0) throw new Error("Cover-Section nicht in book-wmdg.html gefunden.");
const cover = book.slice(i, j);

// Standalone-Dokument: exakt eine A4-Coverseite, creme Grund (deckt Rundungen).
const doc = `<!doctype html><html><head>${head}
<style>html,body{margin:0;padding:0;background:#f6f4ee}
.cover{break-after:auto!important}</style></head><body>${cover}</body></html>`;

const tmp = join(BUILD, ".tmp-buchcover.html");
writeFileSync(tmp, doc);

// 3) Rendern: bevorzugt Playwright (elementgenau), sonst Chromium-Headless.
const require = createRequire(import.meta.url);
function findChrome() {
  if (process.env.CHROME_BIN && existsSync(process.env.CHROME_BIN)) return process.env.CHROME_BIN;
  try {
    const p = require("playwright").chromium.executablePath();
    if (p && existsSync(p)) return p;
  } catch {}
  for (const r of [process.env.PLAYWRIGHT_BROWSERS_PATH, "/opt/pw-browsers"].filter(Boolean)) {
    try {
      for (const d of readdirSync(r)) {
        if (d.startsWith("chromium")) {
          const p = join(r, d, "chrome-linux/chrome");
          if (existsSync(p)) return p;
        }
      }
    } catch {}
  }
  throw new Error("Kein Chromium/Chrome gefunden. Führe aus:  npx playwright install chromium");
}

async function renderWithPlaywright() {
  const { chromium } = require("playwright");
  const browser = await chromium.launch({ executablePath: findChrome() });
  const page = await browser.newPage({
    viewport: { width: CSS_W, height: CSS_H },
    deviceScaleFactor: SCALE,
  });
  await page.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
  const el = await page.$(".cover");
  await el.screenshot({ path: OUT });
  await browser.close();
}

function renderWithChromeHeadless() {
  execFileSync(
    findChrome(),
    [
      "--headless=new",
      "--no-sandbox",
      "--hide-scrollbars",
      `--force-device-scale-factor=${SCALE}`,
      `--window-size=${CSS_W},${CSS_H}`,
      "--default-background-color=f6f4eeff",
      "--virtual-time-budget=8000",
      `--screenshot=${OUT}`,
      pathToFileURL(tmp).href,
    ],
    { stdio: "ignore" }
  );
}

try {
  await renderWithPlaywright();
} catch {
  renderWithChromeHeadless();
}
try { rmSync(tmp, { force: true }); } catch {}
console.log("✓ public/buchcover-werde-meister.png (" + Math.round(CSS_W * SCALE) + "×" + Math.round(CSS_H * SCALE) + ")");
