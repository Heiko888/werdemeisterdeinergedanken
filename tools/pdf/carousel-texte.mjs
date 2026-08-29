/**
 * Carousel-Texte-PDF – bündelt die Carousel-Skripte (Texte hinter den Slides)
 * je Serie in ein gebrandetes PDF + ein „Alle Serien". Reines HTML→Chromium.
 *
 *   node tools/pdf/carousel-texte.mjs [ausgabe-verzeichnis]
 *
 * Standard-Ausgabe: docs/workshop/carousel-texte/ (→ Vorlagen-Galerie nimmt die
 * PDFs im Workshop-Tab automatisch auf).
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, rmSync, mkdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const SK = join(ROOT, "docs", "skripte", "carousels");
const OUT_DIR = process.argv[2] || join(ROOT, "docs", "workshop", "carousel-texte");

const SERIES = [
  { file: "stufen.md", label: "Die 7 Stufen", token: "7-Stufen" },
  { file: "praxis.md", label: "Praxis", token: "Praxis" },
  { file: "vertiefungen.md", label: "Vertiefungen", token: "Vertiefungen" },
  { file: "selbstverteidigung.md", label: "Mentale Selbstverteidigung", token: "Mentale-Selbstverteidigung" },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const inline = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

/** Carousel-Markdown → HTML (Karten je „##"-Carousel mit Slides). */
function mdToHtml(md) {
  const lines = md.split(/\r?\n/);
  const out = [];
  let open = false;
  const close = () => { if (open) { out.push("</div>"); open = false; } };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line === "---" || !line.trim()) continue;

    let m;
    if ((m = line.match(/^#\s+(.*)$/))) { continue; } // Serien-Titel steht schon aufs Cover
    if ((m = line.match(/^##\s+(.*)$/))) {
      close();
      out.push(`<div class="car"><h3>${inline(m[1])}</h3>`);
      open = true;
      continue;
    }
    if ((m = line.match(/^\*\*Ziel:\*\*\s*(.*)$/i))) {
      out.push(`<p class="ziel">${inline(m[1])}</p>`);
      continue;
    }
    if ((m = line.match(/^\*\*Caption:\*\*\s*(.*)$/i))) {
      out.push(`<p class="caption"><span class="lbl">Caption</span> ${inline(m[1])}</p>`);
      continue;
    }
    // **Slide N · Rolle:** Text  /  **Slide N:** Text
    if ((m = line.match(/^\*\*Slide\s+(\d+)\s*(?:·\s*([^:*]+))?:\*\*\s*(.*)$/i))) {
      const role = m[2] ? m[2].trim() : "";
      out.push(
        `<p class="slide"><span class="sn">${m[1]}</span>` +
        (role ? `<span class="role">${esc(role)}</span>` : "") +
        `<span class="stext">${inline(m[3])}</span></p>`,
      );
      continue;
    }
    // sonstige **Label:** Zeilen
    if ((m = line.match(/^\*\*([^:*]+):\*\*\s*(.*)$/))) {
      out.push(`<p class="field"><span class="lbl">${esc(m[1])}</span> ${inline(m[2])}</p>`);
      continue;
    }
    out.push(`<p>${inline(line)}</p>`);
  }
  close();
  return out.join("\n");
}

function findChrome() {
  if (process.env.CHROME_BIN && existsSync(process.env.CHROME_BIN)) return process.env.CHROME_BIN;
  for (const r of [process.env.PLAYWRIGHT_BROWSERS_PATH, "/opt/pw-browsers"].filter(Boolean)) {
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
  throw new Error("Kein Chromium/Chrome gefunden (CHROME_BIN setzen).");
}

const fontsCss = readFileSync(join(ROOT, "docs", "reels", "covers", "_fonts.css"), "utf8");
const logoUri = `data:image/png;base64,${readFileSync(join(ROOT, "public", "logo-brain-gold.png")).toString("base64")}`;
const DATE = new Date().toISOString().slice(0, 10);
const carCount = (md) => (md.match(/^##\s+/gm) || []).length;

const STYLE = `
${fontsCss}
:root{ --ink:#16231f; --mid:#48524e; --muted:#626b67; --leaf:#7e6410; --teal:#7e6410; }
@page{ size:A4; margin:20mm 18mm; }
*{ box-sizing:border-box; }
body{ margin:0; font-family:'Inter',system-ui,sans-serif; color:var(--ink); background:#f6f4ee; font-size:11.5pt; line-height:1.5; }
.cover{ height:257mm; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; page-break-after:always; }
.cover img{ width:150px; margin-bottom:26px; }
.brow{ display:flex; flex-direction:column; align-items:center; gap:3px; margin-bottom:10px; line-height:1; }
.brow .wm1{ font-family:'Fraunces',serif; font-size:15pt; font-weight:400; letter-spacing:.08em; text-transform:uppercase; color:#16231f; }
.brow .wm1 em{ font-style:normal; background:linear-gradient(100deg,#d9a93a,#7e6410); -webkit-background-clip:text; background-clip:text; color:transparent; }
.brow .wm2{ display:flex; align-items:center; gap:7px; font-family:'Fraunces',serif; font-size:8pt; font-weight:400; letter-spacing:.22em; text-transform:uppercase; color:#48524e; }
.brow .wm2 i{ display:block; height:1px; width:14px; background:#d9a93a; }
.cover h1{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:34pt; margin:0 0 6px; border:0; }
.cover p{ color:var(--mid); font-size:12pt; margin:2px 0; }
.serie{ page-break-before:always; }
h1{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:24pt; margin:0 0 4mm; padding-bottom:3mm;
  border-bottom:2px solid; border-image:linear-gradient(90deg,#e8c15f,#d9a93a) 1; }
.car{ break-inside:avoid; page-break-inside:avoid; background:#ffffff; border:1px solid #e7e0cf;
  border-radius:8px; padding:4mm 5mm; margin:0 0 4mm; }
h3{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:13.5pt; margin:0 0 2mm; color:#16231f; }
.ziel{ margin:0 0 2.5mm; font-size:9.5pt; color:var(--mid); font-style:italic; }
.slide{ margin:0 0 1.6mm; padding-left:12mm; text-indent:-12mm; }
.slide .sn{ display:inline-block; width:6mm; height:6mm; line-height:6mm; text-align:center; border-radius:50%;
  background:linear-gradient(120deg,#e8c15f,#d9a93a); color:#241a06; font-weight:800; font-size:8pt; margin-right:2mm; text-indent:0; }
.slide .role{ display:inline-block; font-size:7.5pt; font-weight:800; letter-spacing:.06em; text-transform:uppercase;
  color:var(--teal); margin-right:2mm; text-indent:0; }
.slide .stext{ text-indent:0; }
.caption{ margin:2.5mm 0 0; font-size:9pt; color:var(--muted); }
.field .lbl, .caption .lbl{ display:inline-block; font-weight:800; font-size:8pt; letter-spacing:.04em;
  text-transform:uppercase; color:var(--leaf); margin-right:1.5mm; }
strong{ font-weight:700; }`;

const pageHtml = (title, subtitle, count, body) =>
  `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>${title}</title>
<style>${STYLE}</style></head><body>
<div class="cover">
  <img src="${logoUri}" alt="Logo">
  <div class="brow"><span class="wm1">Werde <em>Meister</em></span><span class="wm2"><i></i>Deiner Gedanken<i></i></span></div>
  <h1>Carousel-Texte</h1>
  <p>${subtitle}</p>
  <p>${count} Carousels · Stand ${DATE}</p>
</div>
${body}
</body></html>`;

const CHROME = findChrome();
function renderPdf(html, outPath) {
  const tmp = join(HERE, ".carousel-texte.html");
  writeFileSync(tmp, html);
  const r = spawnSync(CHROME, [
    "--headless=new", "--no-sandbox", "--disable-gpu", "--no-pdf-header-footer",
    `--print-to-pdf=${outPath}`, tmp,
  ], { stdio: "ignore" });
  if (!process.env.KEEP_HTML) rmSync(tmp, { force: true });
  if (r.status !== 0 || !existsSync(outPath)) throw new Error(`PDF-Render fehlgeschlagen: ${outPath}`);
}

mkdirSync(OUT_DIR, { recursive: true });
let grand = 0;
const allSections = [];
for (const s of SERIES) {
  const md = readFileSync(join(SK, s.file), "utf8");
  const c = carCount(md);
  grand += c;
  const section = `<section class="serie"><h1>${s.label}</h1>\n${mdToHtml(md)}</section>`;
  allSections.push(section);
  const out = join(OUT_DIR, `WMDG-Carousel-Texte-${s.token}.pdf`);
  renderPdf(pageHtml(`Carousel-Texte · ${s.label}`, s.label, c, section), out);
  console.log(`✓ ${out} (${c} Carousels)`);
}
const outAll = join(OUT_DIR, "WMDG-Carousel-Texte-Alle-Serien.pdf");
renderPdf(
  pageHtml("Carousel-Texte · Alle Serien",
    "Alle Serien · 7 Stufen · Praxis · Vertiefungen · Mentale Selbstverteidigung",
    grand, allSections.join("\n")),
  outAll,
);
console.log(`✓ ${outAll} (${grand} Carousels gesamt)`);
