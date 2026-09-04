/**
 * Screenshots des kompletten Mitgliederbereichs.
 *
 * Startet gegen den lokal laufenden Dev-Server (http://localhost:3000) und
 * nimmt von jeder Mitglieder-Seite einen Desktop-Screenshot auf:
 *  - "-full":  komplette Seite (zeigt den ganzen Inhalt, ideal für die Website)
 *  - "-hero":  nur der sichtbare Bereich 1440×900 (sauberer Ausschnitt fürs Social)
 *
 * Nutzung:  node tools/screenshots/mitglieder-screens.mjs
 * Ergebnis: docs/screenshots/mitgliederbereich/*.png
 *
 * Kein Login nötig: ohne konfigurierte Supabase-Umgebung ist der
 * Mitgliederbereich lokal frei zugänglich (siehe src/proxy.ts, Zeile 81).
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";

const BASE = process.env.BASE_URL || "http://localhost:3000";
const OUT = path.join(process.cwd(), "docs", "screenshots", "mitgliederbereich");
mkdirSync(OUT, { recursive: true });

/** Alle Seiten des Mitgliederbereichs mit sprechendem Dateinamen. */
const PAGES = [
  { file: "01-dashboard", url: "/mitglieder" },
  { file: "02-programm", url: "/mitglieder/programm" },
  { file: "03-stufe-1", url: "/mitglieder/stufe/1" },
  { file: "04-praxis-uebersicht", url: "/mitglieder/praxis" },
  { file: "05-praxis-detail", url: "/mitglieder/praxis/atembeobachtung" },
  { file: "06-wissen-uebersicht", url: "/mitglieder/wissen" },
  { file: "07-wissen-detail", url: "/mitglieder/wissen/automatische-gedanken" },
  { file: "08-wissensdatenbank", url: "/mitglieder/wissensdatenbank" },
  {
    file: "09-wissensdatenbank-detail",
    url: "/mitglieder/wissensdatenbank/01-neuroanatomie-aufbau-des-gehirns",
  },
  { file: "10-journal", url: "/mitglieder/journal" },
  { file: "11-detektor", url: "/mitglieder/detektor" },
  { file: "12-gedankenprofil", url: "/mitglieder/gedankenprofil" },
  { file: "13-begleiter", url: "/mitglieder/begleiter" },
  { file: "14-rueckkehr", url: "/mitglieder/rueckkehr" },
  { file: "15-einstellungen", url: "/mitglieder/einstellungen" },
];

// Blendet das Next.js-Dev-Badge und feste Overlays aus, damit die Bilder sauber sind.
const HIDE_CSS = `
  nextjs-portal, [data-next-badge-root], [data-nextjs-toast],
  #__next-build-watcher { display: none !important; }
`;

const results = [];

// In dieser Umgebung ist Chromium vorinstalliert (siehe PLAYWRIGHT_BROWSERS_PATH).
// Bei abweichender Playwright-Version direkt auf das vorhandene Chrome zeigen.
const EXECUTABLE =
  process.env.CHROMIUM_PATH ||
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const browser = await chromium.launch({ executablePath: EXECUTABLE });

/**
 * Nimmt für einen Viewport von jeder Seite Screenshots auf.
 * @param {"desktop"|"mobil"} variante
 * @param {{width:number,height:number}} viewport
 * @param {string} outDir  Zielordner
 * @param {boolean} withHero  zusätzlich einen sichtbaren Ausschnitt speichern?
 */
async function durchlauf(variante, viewport, outDir, withHero) {
  mkdirSync(outDir, { recursive: true });
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 2,
    isMobile: variante === "mobil",
  });
  const page = await context.newPage();

  for (const { file, url } of PAGES) {
    try {
      const resp = await page.goto(BASE + url, {
        waitUntil: "networkidle",
        timeout: 60000,
      });
      const status = resp ? resp.status() : "?";
      await page.addStyleTag({ content: HIDE_CSS });
      // Kurz warten, bis Schriften/Layout sitzen.
      await page.waitForTimeout(700);

      if (withHero) {
        await page.screenshot({
          path: path.join(outDir, `${file}-hero.png`),
          fullPage: false,
        });
      }
      await page.screenshot({
        path: path.join(outDir, `${file}-full.png`),
        fullPage: true,
      });

      results.push(`✓ [${variante}] ${file.padEnd(28)} HTTP ${status}  ${url}`);
      console.log(results[results.length - 1]);
    } catch (err) {
      results.push(`✗ [${variante}] ${file.padEnd(28)} FEHLER  → ${err.message}`);
      console.log(results[results.length - 1]);
    }
  }
  await context.close();
}

// Desktop (1440 breit) – ideal für die Website. Mit Hero-Ausschnitt.
await durchlauf("desktop", { width: 1440, height: 900 }, OUT, true);
// Mobil (Handy-Hochformat) – ideal für Instagram/Stories. Nur Vollseite.
await durchlauf(
  "mobil",
  { width: 390, height: 844 },
  path.join(OUT, "mobil"),
  false,
);

await browser.close();

console.log("\n=== Zusammenfassung ===");
console.log(results.join("\n"));
console.log(`\nGespeichert in: ${OUT}`);
