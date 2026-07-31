/**
 * Reel-Drehbuch-PDF – bündelt alle Reel-Skripte (4 Serien) in ein gebrandetes
 * PDF. Reines HTML→Chromium (print-to-pdf), keine Zusatz-Tools.
 *
 *   node tools/pdf/reel-drehbuch.mjs [out.pdf]
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const REELS = join(ROOT, "docs", "skripte", "reels");
const OUT = process.argv[2] || join(ROOT, "Reel-Drehbuch.pdf");

const SERIES = [
  { file: "mentale-selbstverteidigung.md", label: "Mentale Selbstverteidigung" },
  { file: "stufen.md", label: "Die 7 Stufen" },
  { file: "praxis.md", label: "Praxis" },
  { file: "vertiefungen.md", label: "Vertiefungen" },
];

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const inline = (s) =>
  esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

/** Markdown einer Serie → HTML (kennt #, ##, ###, **Label:**, Tabellen, Listen, ---). */
function mdToHtml(md) {
  const lines = md.split(/\r?\n/);
  const out = [];
  let inReel = false;
  let listOpen = false;
  const closeList = () => { if (listOpen) { out.push("</ul>"); listOpen = false; } };
  const closeReel = () => { if (inReel) { out.push("</div>"); inReel = false; } };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trimEnd();

    // Tabellen-Block
    if (line.startsWith("|")) {
      closeList();
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(lines[i].trim());
        i++;
      }
      i--;
      const cells = (r) => r.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      const header = cells(rows[0]);
      const bodyRows = rows.slice(2); // Zeile 1 = Trennlinie |---|
      out.push('<table><thead><tr>' + header.map((h) => `<th>${inline(h)}</th>`).join("") + "</tr></thead><tbody>");
      for (const r of bodyRows) out.push("<tr>" + cells(r).map((c) => `<td>${inline(c)}</td>`).join("") + "</tr>");
      out.push("</tbody></table>");
      continue;
    }

    if (line === "---") { closeList(); closeReel(); continue; }
    if (!line.trim()) { closeList(); continue; }

    let m;
    if ((m = line.match(/^#\s+(.*)$/))) { closeList(); closeReel(); out.push(`<p class="intro">${inline(m[1])}</p>`); }
    else if ((m = line.match(/^##\s+(.*)$/))) { closeList(); closeReel(); out.push(`<h2>${inline(m[1])}</h2>`); }
    else if ((m = line.match(/^###\s+(.*)$/))) { closeList(); closeReel(); out.push('<div class="reel">'); inReel = true; out.push(`<h3>${inline(m[1])}</h3>`); }
    else if ((m = line.match(/^\*\*([^:*]+):\*\*\s*(.*)$/))) { closeList(); out.push(`<p class="field"><span class="lbl">${esc(m[1])}</span> ${inline(m[2])}</p>`); }
    else if ((m = line.match(/^[-*]\s+(.*)$/))) { if (!listOpen) { out.push("<ul>"); listOpen = true; } out.push(`<li>${inline(m[1])}</li>`); }
    else { closeList(); out.push(`<p>${inline(line)}</p>`); }
  }
  closeList(); closeReel();
  return out.join("\n");
}

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
  throw new Error("Kein Chromium/Chrome gefunden (CHROME_BIN setzen).");
}

// --- HTML zusammenbauen -----------------------------------------------------
const fontsCss = readFileSync(join(ROOT, "docs", "reels", "covers", "_fonts.css"), "utf8");
const logoUri = `data:image/png;base64,${readFileSync(join(ROOT, "docs", "reels", "covers", "logo.png")).toString("base64")}`;

let totalReels = 0;
const sections = SERIES.map((s) => {
  const md = readFileSync(join(REELS, s.file), "utf8");
  totalReels += (md.match(/^###\s+/gm) || []).length || (md.match(/^##\s+\d/gm) || []).length;
  return `<section class="serie"><h1>${s.label}</h1>\n${mdToHtml(md)}</section>`;
}).join("\n");

const html = `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Reel-Drehbuch</title>
<style>
${fontsCss}
:root{ --ink:#1a2230; --mid:#4b5769; --muted:#8b96a6; --leaf:#6aab24; --teal:#199aa8; }
@page{ size:A4; margin:20mm 18mm; }
*{ box-sizing:border-box; }
body{ margin:0; font-family:'Inter',system-ui,sans-serif; color:var(--ink); font-size:11.5pt; line-height:1.5; }
.cover{ height:257mm; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; page-break-after:always; }
.cover img{ width:150px; margin-bottom:26px; }
.brow{ font-size:11pt; font-weight:800; letter-spacing:.2em; text-transform:uppercase;
  color:var(--teal); margin-bottom:10px; }
.cover h1{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:34pt; margin:0 0 6px; border:0; }
.cover p{ color:var(--mid); font-size:12pt; margin:2px 0; }
.serie{ page-break-before:always; }
h1{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:24pt; margin:0 0 4mm;
  padding-bottom:3mm; border-bottom:2px solid; border-image:linear-gradient(90deg,#8cc63f,#21b2bd) 1; }
h2{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:15pt; margin:7mm 0 2mm; color:#12324a; }
h3{ font-weight:800; font-size:10.5pt; letter-spacing:.02em; margin:0 0 2mm; color:var(--teal); text-transform:uppercase; }
.intro{ color:var(--mid); font-size:10.5pt; }
.reel{ break-inside:avoid; page-break-inside:avoid; background:#f7f9fc; border:1px solid #e6ecf4;
  border-radius:8px; padding:4mm 5mm; margin:0 0 4mm; }
.field{ margin:0 0 1.5mm; }
.field .lbl{ display:inline-block; min-width:74px; font-weight:800; font-size:9pt; letter-spacing:.04em;
  text-transform:uppercase; color:var(--leaf); }
ul{ margin:1mm 0 3mm 5mm; } li{ margin:.5mm 0; }
table{ width:100%; border-collapse:collapse; font-size:9pt; margin:2mm 0 4mm; }
th,td{ border:1px solid #e0e7f0; padding:1.6mm 2mm; text-align:left; vertical-align:top; }
th{ background:#eef4f5; font-weight:700; }
strong{ font-weight:700; }
</style></head><body>
<div class="cover">
  <img src="${logoUri}" alt="Logo">
  <div class="brow">Werde Meister deiner Gedanken</div>
  <h1>Reel-Drehbuch</h1>
  <p>Alle Serien · Mentale Selbstverteidigung · 7 Stufen · Praxis · Vertiefungen</p>
  <p>${totalReels} Reels · Stand ${new Date().toISOString().slice(0, 10)}</p>
</div>
${sections}
</body></html>`;

const tmp = join(HERE, ".reel-drehbuch.html");
writeFileSync(tmp, html);
const CHROME = findChrome();
const r = spawnSync(CHROME, [
  "--headless=new", "--no-sandbox", "--disable-gpu", "--no-pdf-header-footer",
  `--print-to-pdf=${OUT}`, tmp,
], { stdio: "ignore" });
if (!process.env.KEEP_HTML) rmSync(tmp, { force: true });
if (r.status !== 0 || !existsSync(OUT)) throw new Error("PDF-Render fehlgeschlagen");
console.log(`✓ ${OUT} (${totalReels} Reels)`);
