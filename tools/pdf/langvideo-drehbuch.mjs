/**
 * Langvideo-Drehbuch-PDFs – bündelt die Mitgliederbereich-Video-Skripte in
 * zwei gebrandete PDFs: „Wort für Wort" (Ablesen) und „Stichpunkt" (frei
 * sprechen). Reines HTML→Chromium (print-to-pdf).
 *
 *   node tools/pdf/langvideo-drehbuch.mjs [ausgabe-verzeichnis]
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const SK = join(ROOT, "docs", "skripte");
const OUTDIR = process.argv[2] || ROOT;

const SV_STICH = "mentale-selbstverteidigung-drehbuecher.md";
const SV_KOMPL = "mentale-selbstverteidigung-komplett.md";

/** Dateien eines Ordners (sortiert), optional eine ausschließen. */
function files(dir, exclude) {
  return readdirSync(join(SK, dir))
    .filter((f) => f.endsWith(".md") && f !== exclude)
    .sort()
    .map((f) => join(SK, dir, f));
}

const BUILDS = [
  {
    variant: "komplett",
    title: "Langvideo-Drehbuch · Wort für Wort",
    subtitle: "Zum Ablesen (Teleprompter) · Mitgliederbereich",
    file: "WMDG-Video-Drehbuch-Ablesen.pdf",
    sections: [
      { label: "Die 7 Stufen", files: files("stufen-komplett") },
      { label: "Praxis", files: files("praxis") },
      { label: "Vertiefungen", files: files("vertiefungen-komplett", SV_KOMPL) },
      { label: "Mentale Selbstverteidigung", files: [join(SK, "vertiefungen-komplett", SV_KOMPL)] },
    ],
  },
  {
    variant: "stichpunkt",
    title: "Langvideo-Drehbuch · Stichpunkt",
    subtitle: "Zum freien Sprechen · Mitgliederbereich",
    file: "WMDG-Video-Drehbuch-Stichpunkt.pdf",
    note: "Praxis-Meditationen gibt es nur als Wort-für-Wort-Fassung (siehe zweites PDF) – sie werden ohnehin ruhig vorgelesen.",
    sections: [
      { label: "Die 7 Stufen", files: files("stufen") },
      { label: "Vertiefungen", files: files("vertiefungen", SV_STICH) },
      { label: "Mentale Selbstverteidigung", files: [join(SK, "vertiefungen", SV_STICH)] },
    ],
  },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function inline(s) {
  return esc(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

/** Markdown eines Skripts → HTML. # = Thema (h2), ## = Abschnitt (h3), ### = h4. */
function mdToHtml(md) {
  const lines = md.split(/\r?\n/);
  const out = [];
  let listOpen = false;
  const closeList = () => { if (listOpen) { out.push("</ul>"); listOpen = false; } };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trimEnd();
    if (line.startsWith("|")) {
      closeList();
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) { rows.push(lines[i].trim()); i++; }
      i--;
      const cells = (r) => r.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      out.push("<table><thead><tr>" + cells(rows[0]).map((h) => `<th>${inline(h)}</th>`).join("") + "</tr></thead><tbody>");
      for (const r of rows.slice(2)) out.push("<tr>" + cells(r).map((c) => `<td>${inline(c)}</td>`).join("") + "</tr>");
      out.push("</tbody></table>");
      continue;
    }
    if (line === "---") { closeList(); continue; }
    if (!line.trim()) { closeList(); continue; }
    let m;
    if ((m = line.match(/^#\s+(.*)$/))) { closeList(); out.push(`<h2>${inline(m[1])}</h2>`); }
    else if ((m = line.match(/^##\s+(.*)$/))) { closeList(); out.push(`<h3>${inline(m[1])}</h3>`); }
    else if ((m = line.match(/^###\s+(.*)$/))) { closeList(); out.push(`<h4>${inline(m[1])}</h4>`); }
    else if ((m = line.match(/^\*\*([^:*]+):\*\*\s*(.*)$/))) { closeList(); out.push(`<p class="field"><span class="lbl">${esc(m[1])}</span> ${inline(m[2])}</p>`); }
    else if ((m = line.match(/^[-*]\s+(.*)$/))) { if (!listOpen) { out.push("<ul>"); listOpen = true; } out.push(`<li>${inline(m[1])}</li>`); }
    else { closeList(); out.push(`<p>${inline(line)}</p>`); }
  }
  closeList();
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
const CHROME = findChrome();

const CSS = `
${fontsCss}
:root{ --ink:#16231f; --mid:#48524e; --muted:#626b67; --leaf:#7e6410; --teal:#7e6410; }
@page{ size:A4; margin:20mm 18mm; }
*{ box-sizing:border-box; }
body{ margin:0; font-family:'Inter',system-ui,sans-serif; color:var(--ink); font-size:11.5pt; line-height:1.55; background:#f6f4ee; }
.cover{ height:257mm; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; page-break-after:always;
  background:radial-gradient(78% 62% at 50% -10%, rgba(232,193,95,.26), transparent 62%),
    radial-gradient(58% 52% at 4% 108%, rgba(217,169,58,.13), transparent 60%), #f6f4ee; }
.cover img{ width:150px; margin-bottom:26px; }
.brow{ display:flex; flex-direction:column; align-items:center; gap:3px; margin-bottom:10px; line-height:1; }
.brow .wm1{ font-family:'Fraunces',serif; font-size:15pt; font-weight:400; letter-spacing:.08em; text-transform:uppercase; color:#16231f; }
.brow .wm1 em{ font-style:normal; background:linear-gradient(100deg,#d9a93a,#7e6410); -webkit-background-clip:text; background-clip:text; color:transparent; }
.brow .wm2{ display:flex; align-items:center; gap:7px; font-family:'Fraunces',serif; font-size:8pt; font-weight:400; letter-spacing:.22em; text-transform:uppercase; color:#48524e; }
.brow .wm2 i{ display:block; height:1px; width:14px; background:#d9a93a; }
.cover h1{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:32pt; margin:0 0 6px; border:0; }
.cover p{ color:var(--mid); font-size:12pt; margin:2px 0; max-width:150mm; }
.serie{ page-break-before:always; }
h1{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:24pt; margin:0 0 5mm; padding-bottom:3mm;
  border-bottom:2px solid; border-image:linear-gradient(90deg,#e8c15f,#d9a93a) 1; }
h2{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:16pt; margin:8mm 0 2mm; color:#16231f; break-after:avoid; }
h3{ font-weight:800; font-size:11pt; letter-spacing:.02em; margin:5mm 0 1.5mm; color:var(--teal); text-transform:uppercase; break-after:avoid; }
h4{ font-weight:700; font-size:10.5pt; margin:3mm 0 1mm; color:#2b3a35; break-after:avoid; }
p{ margin:0 0 2mm; } p.field{ margin:0 0 1.5mm; }
.field .lbl{ display:inline-block; min-width:70px; font-weight:800; font-size:9pt; letter-spacing:.04em; text-transform:uppercase; color:var(--leaf); }
ul{ margin:1mm 0 3mm 5mm; } li{ margin:.6mm 0; }
code{ font-family:ui-monospace,'SF Mono',Menlo,monospace; font-size:8.6pt; background:#efece2; color:#48524e;
  padding:.4mm 1.4mm; border-radius:3px; }
.note{ background:#ffffff; border:1px solid #e7e2d4; border-radius:8px; padding:3mm 4mm; color:var(--mid); font-size:10pt; margin:0 0 4mm; }
table{ width:100%; border-collapse:collapse; font-size:9pt; margin:2mm 0 4mm; }
th,td{ border:1px solid #e7e2d4; padding:1.6mm 2mm; text-align:left; vertical-align:top; }
th{ background:#efece2; font-weight:700; }
strong{ font-weight:700; } em{ font-style:italic; color:#48524e; }
`;

function renderPdf(build) {
  const body = build.sections
    .filter((s) => s.files.length)
    .map((s) => {
      const inner = s.files.map((f) => {
        const md = readFileSync(f, "utf8");
        return mdToHtml(md);
      }).join('\n<hr style="border:0;border-top:1px solid #e7e2d4;margin:6mm 0">\n');
      return `<section class="serie"><h1>${s.label}</h1>\n${inner}</section>`;
    })
    .join("\n");

  const html = `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>${build.title}</title>
<style>${CSS}</style></head><body>
<div class="cover">
  <img src="${logoUri}" alt="Logo">
  <div class="brow"><span class="wm1">Werde <em>Meister</em></span><span class="wm2"><i></i>Deiner Gedanken<i></i></span></div>
  <h1>${build.title.replace(" · ", "<br>")}</h1>
  <p>${build.subtitle}</p>
</div>
${build.note ? `<div class="note" style="margin:0 18mm 4mm">${build.note}</div>` : ""}
${body}
</body></html>`;

  const tmp = join(HERE, `.langvideo-${build.variant}.html`);
  writeFileSync(tmp, html);
  const out = join(OUTDIR, build.file);
  const r = spawnSync(CHROME, ["--headless=new", "--no-sandbox", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${out}`, tmp], { stdio: "ignore" });
  if (!process.env.KEEP_HTML) rmSync(tmp, { force: true });
  if (r.status !== 0 || !existsSync(out)) throw new Error(`PDF-Render fehlgeschlagen: ${build.file}`);
  console.log(`✓ ${out}`);
}

for (const b of BUILDS) renderPdf(b);
