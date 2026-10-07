/**
 * Über-mich-Skripte als gebrandete PDFs (Reel-Talk-Serie + YouTube-Talk).
 * Optik wie tools/pdf/reel-drehbuch.mjs; reines HTML→Chromium (print-to-pdf).
 *
 *   node tools/pdf/ueber-mich-skripte.mjs [out-dir]
 *   npm run ueber-mich-skripte
 *
 * Quellen (Markdown, Quelle der Wahrheit): docs/skripte/ueber-mich/*.md
 * Ausgabe: docs/workshop/ueber-mich-skripte/ (wie die Reel-Skripte unter
 * docs/workshop/, damit die Vorlagen-Galerie die PDFs als Downloads aufnimmt).
 *
 * Gegenüber reel-drehbuch.mjs versteht der Konverter zusätzlich: umbrochene
 * Absätze, eingerückte Listen-Fortsetzungen, `Inline-Regie` in Backticks,
 * > Zitate und ```Code-Blöcke``` (z. B. die YouTube-Beschreibung).
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, rmSync, mkdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const SRC = join(ROOT, "docs", "skripte", "ueber-mich");
const OUT_DIR = process.argv[2] || join(ROOT, "docs", "workshop", "ueber-mich-skripte");

/**
 * card: welche Überschrift eine Karte (Block, der nicht umbricht) beginnt.
 *   "h2num" – „## 1 · …“ (je Reel eine Karte)
 *   "h3"    – „### …“ (je Kapitel eine Karte)
 */
const DOCS = [
  {
    file: "reels-talk-meine-geschichte.md",
    out: "WMDG-Reel-Talk-Meine-Geschichte.pdf",
    title: "Reel-Talk",
    subtitle: "Meine Geschichte · Über mich",
    card: "h2num",
    count: (md) => `${(md.match(/^##\s+\d+\s+·/gm) || []).length} Reels`,
  },
  {
    file: "youtube-talk-meine-geschichte.md",
    out: "WMDG-YouTube-Talk-Meine-Geschichte.pdf",
    title: "YouTube-Talk",
    subtitle: "Meine Geschichte · Hauptvideo + Themen-Talks",
    card: "h3",
    count: () => "Hauptvideo · 2 Themen-Talks · Veröffentlichung",
  },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const inline = (s) =>
  esc(s)
    .replace(/`([^`]+)`/g, '<span class="regie">$1</span>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[\s(])\*([^*\s][^*]*?)\*(?=[\s).,;:!?]|$)/g, "$1<em>$2</em>");

/** Markdown → HTML für die Über-mich-Skripte. */
function mdToHtml(md, cardMode) {
  const lines = md.split(/\r?\n/);
  const out = [];
  let para = [];
  let listOpen = false;
  let li = null; // Rohtext des aktuellen Listenpunkts (inkl. Fortsetzungszeilen)
  let inCard = false;

  const flushPara = () => {
    if (!para.length) return;
    const text = para.join(" ");
    const regieOnly = /^`[^`]+`$/.test(text.trim());
    out.push(regieOnly ? `<p class="regie-block">${esc(text.trim().slice(1, -1))}</p>` : `<p>${inline(text)}</p>`);
    para = [];
  };
  const flushLi = () => { if (li !== null) { out.push(`<li>${inline(li)}</li>`); li = null; } };
  const closeList = () => { flushLi(); if (listOpen) { out.push("</ul>"); listOpen = false; } };
  const closeCard = () => { if (inCard) { out.push("</div>"); inCard = false; } };
  const closeAll = () => { flushPara(); closeList(); };

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trimEnd();

    // Code-Block (``` … ```)
    if (line.trim().startsWith("```")) {
      closeAll();
      const buf = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) { buf.push(lines[i]); i++; }
      out.push(`<pre>${esc(buf.join("\n"))}</pre>`);
      continue;
    }

    // Tabelle
    if (line.trim().startsWith("|")) {
      closeAll();
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) { rows.push(lines[i].trim()); i++; }
      i--;
      const cells = (r) => r.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      out.push("<table><thead><tr>" + cells(rows[0]).map((h) => `<th>${inline(h)}</th>`).join("") + "</tr></thead><tbody>");
      for (const r of rows.slice(2)) out.push("<tr>" + cells(r).map((c) => `<td>${inline(c)}</td>`).join("") + "</tr>");
      out.push("</tbody></table>");
      continue;
    }

    if (line === "---") { closeAll(); closeCard(); continue; }
    if (!line.trim()) { closeAll(); continue; }

    let m;
    if ((m = line.match(/^#\s+(.*)$/))) { closeAll(); closeCard(); out.push(`<h1>${inline(m[1])}</h1>`); continue; }
    if ((m = line.match(/^##\s+(.*)$/))) {
      closeAll(); closeCard();
      if (cardMode === "h2num" && /^\d+\s+·/.test(m[1])) { out.push('<div class="card">'); inCard = true; out.push(`<h3>${inline(m[1])}</h3>`); }
      else out.push(`<h2>${inline(m[1])}</h2>`);
      continue;
    }
    if ((m = line.match(/^###\s+(.*)$/))) {
      closeAll(); closeCard();
      if (cardMode === "h3") { out.push('<div class="card">'); inCard = true; }
      out.push(`<h3>${inline(m[1])}</h3>`);
      continue;
    }
    if ((m = line.match(/^>\s?(.*)$/))) { closeAll(); out.push(`<blockquote>${inline(m[1])}</blockquote>`); continue; }
    if ((m = line.match(/^\*\*([A-ZÄÖÜ][A-ZÄÖÜ\- ]+):\*\*\s*(.*)$/))) {
      closeAll();
      out.push(`<p class="field"><span class="lbl">${esc(m[1])}</span> ${inline(m[2])}</p>`);
      continue;
    }
    if ((m = line.match(/^(?:[-*]|\d+\.)\s+(.*)$/))) {
      flushPara();
      flushLi();
      if (!listOpen) { out.push("<ul>"); listOpen = true; }
      li = m[1];
      continue;
    }
    // Eingerückte Fortsetzung eines Listenpunkts
    if (li !== null && /^\s{2,}\S/.test(raw)) {
      li += ` ${line.trim()}`;
      continue;
    }
    closeList();
    para.push(line.trim());
  }
  closeAll(); closeCard();
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

const fontsCss = readFileSync(join(ROOT, "docs", "reels", "covers", "_fonts.css"), "utf8");
const logoUri = `data:image/png;base64,${readFileSync(join(ROOT, "public", "logo-brain-gold.png")).toString("base64")}`;
const DATE = new Date().toISOString().slice(0, 10);

const STYLE = `
${fontsCss}
:root{ --ink:#16231f; --mid:#48524e; --muted:#626b67; --gold:#7e6410; }
@page{ size:A4; margin:20mm 18mm; }
*{ box-sizing:border-box; }
body{ margin:0; font-family:'Inter',system-ui,sans-serif; color:var(--ink); font-size:11pt; line-height:1.5; background:#f6f4ee; }
.cover{ height:257mm; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; page-break-after:always;
  background:radial-gradient(78% 62% at 50% -10%, rgba(232,193,95,.26), transparent 62%),
    radial-gradient(58% 52% at 4% 108%, rgba(217,169,58,.13), transparent 60%), #f6f4ee; }
.cover img{ width:150px; margin-bottom:26px; }
.brow{ display:flex; flex-direction:column; align-items:center; gap:3px; margin-bottom:10px; line-height:1; }
.brow .wm1{ font-family:'Fraunces',serif; font-size:15pt; font-weight:400; letter-spacing:.08em; text-transform:uppercase; color:#16231f; }
.brow .wm1 em{ font-style:normal; background:linear-gradient(100deg,#d9a93a,#7e6410); -webkit-background-clip:text; background-clip:text; color:transparent; }
.brow .wm2{ display:flex; align-items:center; gap:7px; font-family:'Fraunces',serif; font-size:8pt; font-weight:400; letter-spacing:.22em; text-transform:uppercase; color:#48524e; }
.brow .wm2 i{ display:block; height:1px; width:14px; background:#d9a93a; }
.cover h1{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:34pt; margin:0 0 6px; border:0; padding:0; }
.cover p{ color:var(--mid); font-size:12pt; margin:2px 0; }
h1{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:22pt; margin:0 0 4mm;
  padding-bottom:3mm; border-bottom:2px solid; border-image:linear-gradient(90deg,#e8c15f,#d9a93a) 1; }
h2{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:15pt; margin:7mm 0 2mm; break-after:avoid; }
h3{ font-weight:800; font-size:10.5pt; letter-spacing:.02em; margin:0 0 2mm; color:var(--gold); text-transform:uppercase; break-after:avoid; }
p{ margin:0 0 2mm; }
.card{ break-inside:avoid; page-break-inside:avoid; background:#ffffff; border:1px solid #e7e2d4;
  border-radius:8px; padding:4mm 5mm; margin:0 0 4mm; }
.field{ margin:0 0 1.5mm; }
.field .lbl{ display:inline-block; min-width:78px; font-weight:800; font-size:9pt; letter-spacing:.04em;
  text-transform:uppercase; color:var(--gold); }
.regie{ font-size:9pt; color:var(--muted); font-style:italic; background:#f3efe3; border-radius:3px; padding:0 3px; }
.regie-block{ font-size:9.5pt; color:var(--muted); font-style:italic; border-left:2px solid #d9a93a; padding:1mm 0 1mm 3mm; }
blockquote{ margin:2mm 0 3mm; padding:1mm 0 1mm 4mm; border-left:2px solid #d9a93a; font-family:'Fraunces',Georgia,serif; font-style:italic; }
pre{ white-space:pre-wrap; font-family:'Inter',system-ui,sans-serif; font-size:9.5pt; background:#faf8f2; border:1px solid #e7e2d4; border-radius:6px; padding:3mm 4mm; }
ul{ margin:1mm 0 3mm 5mm; padding-left:3mm; } li{ margin:.6mm 0; }
table{ width:100%; border-collapse:collapse; font-size:9pt; margin:2mm 0 4mm; }
th,td{ border:1px solid #e7e2d4; padding:1.6mm 2mm; text-align:left; vertical-align:top; }
th{ background:#efece2; font-weight:700; }
strong{ font-weight:700; }`;

const pageHtml = (d, count, body) =>
  `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>${d.title} · ${d.subtitle}</title>
<style>${STYLE}</style></head><body>
<div class="cover">
  <img src="${logoUri}" alt="Logo">
  <div class="brow"><span class="wm1">Werde <em>Meister</em></span><span class="wm2"><i></i>Deiner Gedanken<i></i></span></div>
  <h1>${d.title}</h1>
  <p>${d.subtitle}</p>
  <p>${count} · Stand ${DATE}</p>
</div>
${body}
</body></html>`;

const CHROME = findChrome();
function renderPdf(html, outPath) {
  const tmp = join(HERE, ".ueber-mich-skripte.html");
  writeFileSync(tmp, html);
  const r = spawnSync(CHROME, [
    "--headless=new", "--no-sandbox", "--disable-gpu", "--no-pdf-header-footer",
    `--print-to-pdf=${outPath}`, tmp,
  ], { stdio: "ignore" });
  if (!process.env.KEEP_HTML) rmSync(tmp, { force: true });
  if (r.status !== 0 || !existsSync(outPath)) throw new Error(`PDF-Render fehlgeschlagen: ${outPath}`);
}

mkdirSync(OUT_DIR, { recursive: true });
for (const d of DOCS) {
  const md = readFileSync(join(SRC, d.file), "utf8");
  const out = join(OUT_DIR, d.out);
  renderPdf(pageHtml(d, d.count(md), mdToHtml(md, d.card)), out);
  console.log(`✓ ${out}`);
}
