/**
 * Intro-/Landingpage-Video-Drehbuch → ein gebrandetes PDF (Teleprompter).
 *   node tools/pdf/intro-video-drehbuch.mjs [ausgabe-verzeichnis]
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const OUTDIR = process.argv[2] || ROOT;

const BUILD = {
  title: "Landing-Video-Drehbuch",
  subtitle: "Was, wenn es nicht an dir liegt? · Intro-Video + Teaser-Reel",
  file: "WMDG-Video-Drehbuch-Intro.pdf",
  sources: [
    join(ROOT, "docs", "skripte", "landing", "intro-nicht-deine-schuld.md"),
    join(ROOT, "docs", "skripte", "landing", "reel-nicht-deine-schuld.md"),
  ],
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function inline(s) {
  return esc(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}
function mdToHtml(md) {
  const out = [];
  let listOpen = false;
  const closeList = () => { if (listOpen) { out.push("</ul>"); listOpen = false; } };
  for (const raw of md.split(/\r?\n/)) {
    const line = raw.trimEnd();
    if (line === "---" || !line.trim()) { closeList(); continue; }
    let m;
    if ((m = line.match(/^#\s+(.*)$/))) { closeList(); out.push(`<h1>${inline(m[1])}</h1>`); }
    else if ((m = line.match(/^##\s+(.*)$/))) { closeList(); out.push(`<h2>${inline(m[1])}</h2>`); }
    else if ((m = line.match(/^\*\*([^:*]+):\*\*\s*(.*)$/))) { closeList(); out.push(`<p class="field"><span class="lbl">${esc(m[1])}</span> ${inline(m[2])}</p>`); }
    else if (/^`\[Regie\]/.test(line)) { closeList(); out.push(`<p class="regie">${inline(line.replace(/^`|`$/g, ""))}</p>`); }
    else if ((m = line.match(/^[-*]\s+(.*)$/))) { if (!listOpen) { out.push("<ul>"); listOpen = true; } out.push(`<li>${inline(m[1])}</li>`); }
    else { closeList(); out.push(`<p>${inline(line)}</p>`); }
  }
  closeList();
  return out.join("\n");
}
function findChrome() {
  if (process.env.CHROME_BIN && existsSync(process.env.CHROME_BIN)) return process.env.CHROME_BIN;
  for (const r of [process.env.PLAYWRIGHT_BROWSERS_PATH, "/opt/pw-browsers"].filter(Boolean)) {
    try { for (const d of readdirSync(r)) {
      if (!d.startsWith("chromium")) continue;
      const p = join(r, d, "chrome-linux/chrome");
      if (existsSync(p)) return p;
    } } catch {}
  }
  for (const c of ["google-chrome", "chromium", "chromium-browser"]) {
    const r = spawnSync("which", [c], { encoding: "utf8" });
    if (r.status === 0) return r.stdout.trim().split("\n")[0];
  }
  throw new Error("Kein Chromium/Chrome gefunden.");
}

const fontsCss = readFileSync(join(ROOT, "docs", "reels", "covers", "_fonts.css"), "utf8");
const logoUri = `data:image/png;base64,${readFileSync(join(ROOT, "docs", "reels", "covers", "logo.png")).toString("base64")}`;
const CHROME = findChrome();

const CSS = `
${fontsCss}
:root{ --ink:#1a2230; --mid:#4b5769; --leaf:#6aab24; --teal:#199aa8; }
@page{ size:A4; margin:22mm 20mm; }
*{ box-sizing:border-box; }
body{ margin:0; font-family:'Inter',system-ui,sans-serif; color:var(--ink); font-size:13.5pt; line-height:1.7; }
.cover{ height:253mm; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; page-break-after:always; }
.cover img{ width:150px; margin-bottom:26px; }
.brow{ font-size:11pt; font-weight:800; letter-spacing:.2em; text-transform:uppercase; color:var(--teal); margin-bottom:10px; }
.cover h1{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:31pt; margin:0 0 8px; border:0; padding:0; }
.cover p{ color:var(--mid); font-size:12pt; margin:2px 0; max-width:150mm; }
h1{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:23pt; line-height:1.2; margin:0 0 5mm; padding-bottom:3mm;
  border-bottom:2px solid; border-image:linear-gradient(90deg,#8cc63f,#21b2bd) 1; }
p{ margin:0 0 3.5mm; }
p.field .lbl{ display:inline-block; min-width:70px; font-weight:800; font-size:9pt; letter-spacing:.04em; text-transform:uppercase; color:var(--leaf); }
p.field{ font-size:10.5pt; color:var(--mid); margin-bottom:5mm; }
p.regie{ font-family:ui-monospace,'SF Mono',Menlo,monospace; font-size:10pt; color:#6b788a; background:#f2f6f9;
  border-left:3px solid var(--teal); padding:2mm 3mm; margin:4mm 0; break-inside:avoid; }
strong{ font-weight:700; } em{ font-style:italic; color:#3a4a5e; }
code{ font-family:inherit; color:inherit; background:transparent; padding:0; }
`;

const body = BUILD.sources
  .map((src, i) => {
    const section = mdToHtml(readFileSync(src, "utf8"));
    return i === 0 ? section : `<section style="break-before:page">${section}</section>`;
  })
  .join("\n");

const html = `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>${BUILD.title}</title>
<style>${CSS}</style></head><body>
<div class="cover">
  <img src="${logoUri}" alt="Logo">
  <div class="brow">Werde Meister deiner Gedanken</div>
  <h1>${BUILD.title.replace(" · ", "<br>")}</h1>
  <p>${BUILD.subtitle}</p>
</div>
${body}
</body></html>`;

const tmp = join(HERE, ".intro-video.html");
writeFileSync(tmp, html);
const out = join(OUTDIR, BUILD.file);
const r = spawnSync(CHROME, ["--headless=new", "--no-sandbox", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${out}`, tmp], { stdio: "ignore" });
if (!process.env.KEEP_HTML) rmSync(tmp, { force: true });
if (r.status !== 0 || !existsSync(out)) throw new Error("PDF-Render fehlgeschlagen");
console.log(`✓ ${out}`);
