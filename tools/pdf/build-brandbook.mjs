// Erzeugt das Brandbook als gestaltetes PDF im Mitglieder-PDF-Design.
//   node tools/pdf/build-brandbook.mjs
//
// Ablauf: build-brandbook.py -> .build/brandbook.html, dann Chromium -> PDF.
// Chromium-Suche wie in generate.mjs (CHROME_BIN, Playwright, PATH).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync, spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..", "..");
const BUILD = path.join(HERE, ".build");
const OUT = path.join(ROOT, "docs", "brandbook", "WMDG-Brandbook.pdf");
const env = { ...process.env, REPO_ROOT: ROOT, BUILD_DIR: BUILD };

fs.mkdirSync(BUILD, { recursive: true });

function python() {
  for (const c of ["python3", "python"]) {
    if (spawnSync(c, ["--version"], { stdio: "ignore" }).status === 0) return c;
  }
  throw new Error("Python 3 nicht gefunden – bitte installieren.");
}

function findChrome() {
  if (process.env.CHROME_BIN && fs.existsSync(process.env.CHROME_BIN)) return process.env.CHROME_BIN;
  try {
    const p = require("playwright").chromium.executablePath();
    if (p && fs.existsSync(p)) return p;
  } catch {}
  const roots = [process.env.PLAYWRIGHT_BROWSERS_PATH, "/opt/pw-browsers"].filter(Boolean);
  for (const r of roots) {
    try {
      for (const d of fs.readdirSync(r)) {
        if (!d.startsWith("chromium")) continue;
        for (const bin of ["chrome-linux/chrome", "chrome-mac/Chromium.app/Contents/MacOS/Chromium", "chrome-win/chrome.exe"]) {
          const p = path.join(r, d, bin);
          if (fs.existsSync(p)) return p;
        }
      }
    } catch {}
  }
  for (const c of ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"]) {
    const r = spawnSync(process.platform === "win32" ? "where" : "which", [c], { encoding: "utf8" });
    if (r.status === 0) return r.stdout.trim().split("\n")[0];
  }
  throw new Error("Kein Chromium/Chrome gefunden. Setze CHROME_BIN oder: npx playwright install chromium");
}

const CHROME = findChrome();
const PY = python();

console.log(`• Chromium: ${CHROME}`);
console.log("• HTML erzeugen …");
execFileSync(PY, [path.join(HERE, "build-brandbook.py")], { env, stdio: "inherit" });

console.log("• PDF rendern …");
const htmlPath = path.join(BUILD, "brandbook.html");
const r = spawnSync(
  CHROME,
  ["--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars",
   "--no-pdf-header-footer", `--print-to-pdf=${OUT}`, htmlPath],
  { stdio: "ignore" },
);
if (r.status !== 0 || !fs.existsSync(OUT)) {
  throw new Error("Chromium-Render fehlgeschlagen für brandbook.html");
}
console.log(`\n✓ Fertig: ${path.relative(ROOT, OUT)}`);
