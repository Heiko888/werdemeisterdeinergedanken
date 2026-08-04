// Reproduzierbare Erzeugung aller gestalteten PDFs (E-Book + Mitglieder-
// Dokumente). Ein Befehl:  npm run pdf
//
// Ablauf:
//   1. Inhalte aus den TS-Quellen extrahieren  -> .build/content.json
//   2. HTML erzeugen (Python)                  -> .build/*.html
//   3. Mit Chromium zu PDF rendern             -> public/…
//   4. Arbeitsheft aus Cover + Innenteil mergen
//
// Voraussetzungen: Node, Python 3 und ein Chromium/Chrome-Binary.
// Chromium wird gesucht über (in dieser Reihenfolge):
//   - Env CHROME_BIN
//   - Playwright-Browser (PLAYWRIGHT_BROWSERS_PATH bzw. /opt/pw-browsers)
//   - google-chrome / chromium im PATH
// Falls keines gefunden wird:  npx playwright install chromium
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync, spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..", "..");
const BUILD = path.join(HERE, ".build");
const PUBLIC = path.join(ROOT, "public");
// Mitglieder-PDFs bewusst NICHT nach public/: alles dort liefert Next.js
// direkt unter seinem Dateipfad aus, also am Login-Schutz vorbei.
// Ausgeliefert werden sie ausschließlich über die Routen unter /mitglieder.
const PDFDIR = path.join(ROOT, "content", "pdf");
const env = { ...process.env, REPO_ROOT: ROOT, BUILD_DIR: BUILD };

fs.mkdirSync(BUILD, { recursive: true });
fs.mkdirSync(PDFDIR, { recursive: true });

function python() {
  for (const c of ["python3", "python"]) {
    const r = spawnSync(c, ["--version"], { stdio: "ignore" });
    if (r.status === 0) return c;
  }
  throw new Error("Python 3 nicht gefunden – bitte installieren.");
}

function findChrome() {
  if (process.env.CHROME_BIN && fs.existsSync(process.env.CHROME_BIN)) return process.env.CHROME_BIN;
  // Von Playwright installiertes Chromium (nach `npx playwright install chromium`).
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
  throw new Error(
    "Kein Chromium/Chrome gefunden. Setze CHROME_BIN oder führe aus:  npx playwright install chromium",
  );
}

const CHROME = findChrome();
const PY = python();

function renderPdf(htmlPath, pdfPath) {
  const r = spawnSync(
    CHROME,
    ["--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars",
     "--no-pdf-header-footer", `--print-to-pdf=${pdfPath}`, htmlPath],
    { stdio: "ignore" },
  );
  if (r.status !== 0 || !fs.existsSync(pdfPath)) {
    throw new Error(`Chromium-Render fehlgeschlagen für ${path.basename(htmlPath)}`);
  }
}

async function mergePdfs(inPaths, outPath) {
  const { PDFDocument } = require("pdf-lib");
  const out = await PDFDocument.create();
  for (const p of inPaths) {
    const src = await PDFDocument.load(fs.readFileSync(p));
    const pages = await out.copyPages(src, src.getPageIndices());
    pages.forEach((pg) => out.addPage(pg));
  }
  fs.writeFileSync(outPath, await out.save());
}

async function main() {
  console.log(`• Chromium: ${CHROME}`);
  console.log("• Inhalte extrahieren …");
  execFileSync("node", [path.join(HERE, "extract-content.mjs")], { env, stdio: "inherit" });

  console.log("• HTML erzeugen …");
  execFileSync(PY, [path.join(HERE, "build-ebook.py")], { env, stdio: "inherit" });
  execFileSync(PY, [path.join(HERE, "build-member.py")], { env, stdio: "inherit" });

  console.log("• E-Book rendern …");
  renderPdf(path.join(BUILD, "ebook.html"), path.join(PUBLIC, "Die-7-Stufen-kompakt.pdf"));

  console.log("• Mitglieder-Dokumente rendern …");
  const manifest = JSON.parse(fs.readFileSync(path.join(BUILD, "m-manifest.json"), "utf8"));
  for (const name of manifest.single) {
    renderPdf(path.join(BUILD, `m-${name}.html`), path.join(PDFDIR, `${name}.pdf`));
  }

  console.log("• Arbeitsheft mergen (Cover + Innenteil) …");
  renderPdf(path.join(BUILD, "m-arbeitsheft-cover.html"), path.join(BUILD, "ah-cover.pdf"));
  renderPdf(path.join(BUILD, "m-arbeitsheft-body.html"), path.join(BUILD, "ah-body.pdf"));
  await mergePdfs(
    [path.join(BUILD, "ah-cover.pdf"), path.join(BUILD, "ah-body.pdf")],
    path.join(PDFDIR, "arbeitsheft.pdf"),
  );

  console.log(`\n✓ Fertig: public/Die-7-Stufen-kompakt.pdf und ${manifest.single.length + 1} Dateien in content/pdf/`);
}

main().catch((e) => {
  console.error("Fehler:", e.message);
  process.exit(1);
});
