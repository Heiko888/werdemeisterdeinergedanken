/**
 * Sprecherskripte „Praxis mit Stimme" → gebrandete PDFs zum Vorlesen.
 * Reines HTML→Chromium (print-to-pdf), keine Zusatz-Tools.
 *
 *   node tools/pdf/praxis-sprecherskript.mjs [ausgabe-verzeichnis]
 *
 * Erzeugt:
 *   • 13 Einzel-PDFs – ein Skript pro Übung (grosse, ruhige Vorlese-Typo)
 *   • 1 Gesamtmappe   – Leitfaden + alle 13 Skripte in einem Dokument
 *   • 1 Aufnahme-Leitfaden – die eine Seite mit den Aufnahme-Hinweisen
 *
 * Grundlage: tools/pdf/praxis-skripte-data.mjs (gesprochene Fassung der 13
 * Übungen aus src/lib/practices.ts, mit eingezeichneten Pausen).
 *
 * Standard-Ausgabe: docs/mitglieder/sprecherskripte/
 */
import {
  readFileSync,
  writeFileSync,
  existsSync,
  readdirSync,
  rmSync,
  mkdirSync,
} from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { skripte, leitfaden } from "./praxis-skripte-data.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const OUT_DIR =
  process.argv[2] || join(ROOT, "docs", "mitglieder", "sprecherskripte");

function findChrome() {
  if (process.env.CHROME_BIN && existsSync(process.env.CHROME_BIN))
    return process.env.CHROME_BIN;
  for (const r of [
    process.env.PLAYWRIGHT_BROWSERS_PATH,
    "/opt/pw-browsers",
  ].filter(Boolean)) {
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
  for (const c of [
    "google-chrome",
    "google-chrome-stable",
    "chromium",
    "chromium-browser",
  ]) {
    const r = spawnSync(process.platform === "win32" ? "where" : "which", [c], {
      encoding: "utf8",
    });
    if (r.status === 0) return r.stdout.trim().split("\n")[0];
  }
  throw new Error("Kein Chromium/Chrome gefunden (CHROME_BIN setzen).");
}

const CHROME = findChrome();
const fontsCss = readFileSync(
  join(ROOT, "docs", "reels", "covers", "_fonts.css"),
  "utf8",
);
const logoUri = `data:image/png;base64,${readFileSync(
  join(ROOT, "public", "logo-brain-gold.png"),
).toString("base64")}`;
const DATE = new Date().toISOString().slice(0, 10);

/** HTML-escape für Text aus dem Datenmodul. */
function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

const STYLE = `
${fontsCss}
:root{ --ink:#16231f; --mid:#48524e; --muted:#626b67; --leaf:#7e6410; --teal:#7e6410; --line:#e4dfd2; --gold:#d9a93a; --gold-deep:#7e6410; }
@page{ size:A4; margin:16mm 18mm; }
*{ box-sizing:border-box; }
body{ margin:0; font-family:'Inter',system-ui,sans-serif; color:var(--ink); font-size:12pt; line-height:1.55; background:#f6f4ee; -webkit-print-color-adjust:exact; print-color-adjust:exact; }

/* Titelseite / Kopf eines Skripts */
.cover{ height:255mm; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; page-break-after:always; background:radial-gradient(78% 62% at 50% -10%, rgba(232,193,95,.26), transparent 62%), radial-gradient(58% 52% at 4% 108%, rgba(217,169,58,.13), transparent 60%), #f6f4ee; }
.cover img{ width:140px; margin-bottom:24px; }
.brow{ font-size:10.5pt; font-weight:800; letter-spacing:.2em; text-transform:uppercase; color:var(--teal); margin-bottom:10px; }
.cover h1{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:30pt; margin:0 0 10px; line-height:1.12; }
.cover p{ color:var(--mid); font-size:12pt; margin:2px 0; }
.cover .meta{ margin-top:22px; color:var(--muted); font-size:10.5pt; }

/* Skript-Kopf */
.skript{ page-break-inside:auto; }
.skript + .skript{ page-break-before:always; }
.kopf{ border-bottom:2px solid; border-image:linear-gradient(90deg,#e8c15f,#d9a93a) 1; padding-bottom:4mm; margin-bottom:6mm; }
.kopf .kat{ font-size:10pt; font-weight:800; letter-spacing:.16em; text-transform:uppercase; color:var(--teal); }
.kopf h2{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:22pt; margin:1.5mm 0 3mm; line-height:1.1; }
.tags{ display:flex; flex-wrap:wrap; gap:6px 10px; font-size:9.5pt; color:var(--mid); }
.tags span{ display:inline-flex; align-items:center; gap:5px; }
.tags .k{ color:var(--muted); }
.tags code{ font-family:'DejaVu Sans Mono',ui-monospace,Menlo,Consolas,monospace; font-size:9pt; background:#efece2; color:#7e6410; padding:.4mm 1.6mm; border-radius:3px; }
.worum{ margin:4mm 0 7mm; padding:3.2mm 4.2mm; background:#faf4e4; border:1px solid #ecdcae; border-left:4px solid #d9a93a; border-radius:8px; color:#5c4708; font-size:10.5pt; line-height:1.5; }
.worum b{ color:#4a3a08; }

/* Gesprochener Text – gross und ruhig zum Vorlesen */
.text{ font-size:14pt; line-height:1.75; margin:0 0 5mm; break-inside:avoid; }

/* Pause – klar abgesetzte Stille */
.pause{ display:flex; align-items:center; gap:10px; margin:0 0 5mm; break-inside:avoid; color:var(--muted); }
.pause .bar{ flex:1; border-top:1.4px dashed #c2ccd8; }
.pause .pill{ display:inline-flex; align-items:center; gap:7px; padding:1.6mm 4mm; border-radius:999px; background:#efece2; border:1px solid var(--line); font-size:10pt; font-weight:700; letter-spacing:.02em; color:#626b67; white-space:nowrap; }
.pause .pill .dot{ width:7px; height:7px; border-radius:50%; background:#d9a93a; }

/* Regie – wird NICHT gesprochen */
.regie{ margin:0 0 5mm; padding:2.6mm 3.8mm; background:#fff7ed; border:1px solid #f2d5a8; border-left:4px solid #e0912f; border-radius:8px; font-size:10pt; line-height:1.5; color:#7a4a0c; break-inside:avoid; }
.regie b{ color:#9a5a0c; font-weight:800; letter-spacing:.04em; text-transform:uppercase; font-size:8.5pt; display:block; margin-bottom:1mm; }

/* Leitfaden */
.leit h1{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:22pt; margin:0 0 5mm; padding-bottom:3mm; border-bottom:2px solid; border-image:linear-gradient(90deg,#e8c15f,#d9a93a) 1; }
.leit h3{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:13.5pt; color:#16231f; margin:6mm 0 2mm; }
.leit ul{ margin:0 0 3mm 5mm; padding:0; } .leit li{ margin:1.6mm 0; line-height:1.5; }
.leit .unter{ color:var(--mid); font-size:11pt; margin:-2mm 0 6mm; }
.leit code{ font-family:'DejaVu Sans Mono',ui-monospace,Menlo,Consolas,monospace; font-size:9.5pt; background:#efece2; color:#7e6410; padding:.4mm 1.6mm; border-radius:3px; }
`;

function renderSegment(seg) {
  if (seg.typ === "pause") {
    return `<div class="pause"><span class="pill"><span class="dot"></span>Stille · ${esc(
      seg.inhalt,
    )}</span><span class="bar"></span></div>`;
  }
  if (seg.typ === "regie") {
    return `<div class="regie"><b>Regie · nicht sprechen</b>${esc(
      seg.inhalt,
    )}</div>`;
  }
  return `<p class="text">${esc(seg.inhalt)}</p>`;
}

/** Kopf + Segmente eines Skripts (ohne umgebendes <html>). */
function renderSkript(s) {
  const segs = s.segmente.map(renderSegment).join("\n");
  return `<section class="skript">
  <div class="kopf">
    <div class="kat">${esc(s.kategorie)}</div>
    <h2>${esc(s.titel)}</h2>
    <div class="tags">
      <span><span class="k">Dauer</span> ${esc(s.dauer)}</span>
      <span><span class="k">Aufnahme</span> <code>${esc(s.mp3)}</code></span>
    </div>
  </div>
  <div class="worum"><b>Worum es geht:</b> ${esc(s.worum)}</div>
  ${segs}
</section>`;
}

function renderLeitfaden() {
  const abschnitte = leitfaden.abschnitte
    .map(
      (a) =>
        `<h3>${esc(a.h)}</h3><ul>${a.punkte
          .map((p) => `<li>${esc(p)}</li>`)
          .join("")}</ul>`,
    )
    .join("\n");
  return `<section class="leit">
  <h1>${esc(leitfaden.titel)}</h1>
  <p class="unter">${esc(leitfaden.untertitel)}</p>
  ${abschnitte}
</section>`;
}

function page(inner, title) {
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>${esc(
    title,
  )}</title><style>${STYLE}</style></head><body>${inner}</body></html>`;
}

function coverFor(titelHtml, unter, meta) {
  return `<div class="cover">
  <img src="${logoUri}" alt="Logo">
  <div class="brow">Werde Meister deiner Gedanken</div>
  <h1>${titelHtml}</h1>
  ${unter ? `<p>${unter}</p>` : ""}
  <p class="meta">${meta}</p>
</div>`;
}

function toPdf(html, outPath) {
  const tmp = join(HERE, `.spr-${Math.abs(hash(outPath))}.html`);
  writeFileSync(tmp, html);
  const r = spawnSync(
    CHROME,
    [
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--no-pdf-header-footer",
      `--print-to-pdf=${outPath}`,
      tmp,
    ],
    { stdio: "ignore" },
  );
  if (!process.env.KEEP_HTML) rmSync(tmp, { force: true });
  if (r.status !== 0 || !existsSync(outPath))
    throw new Error(`PDF-Render fehlgeschlagen: ${outPath}`);
  console.log(`✓ ${outPath}`);
}

/** Stabiler Kurz-Hash für eindeutige Temp-Dateinamen (kein Date/Random). */
function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}

mkdirSync(OUT_DIR, { recursive: true });
const einzelDir = join(OUT_DIR, "einzel");
mkdirSync(einzelDir, { recursive: true });

// 1 · Einzel-PDFs -----------------------------------------------------------
skripte.forEach((s, i) => {
  const nr = String(i + 1).padStart(2, "0");
  const cover = coverFor(
    esc(s.titel),
    "Sprecherskript · Praxis mit Stimme",
    `${esc(s.kategorie)} · ${esc(s.dauer)} · Stand ${DATE}`,
  );
  const html = page(cover + renderSkript(s), `Sprecherskript · ${s.titel}`);
  toPdf(html, join(einzelDir, `${nr}-${s.slug}.pdf`));
});

// 2 · Aufnahme-Leitfaden (eigenständig) -------------------------------------
toPdf(
  page(renderLeitfaden(), leitfaden.titel),
  join(OUT_DIR, "00-Aufnahme-Leitfaden.pdf"),
);

// 3 · Gesamtmappe -----------------------------------------------------------
const mappeCover = coverFor(
  "Praxis mit Stimme",
  "13 Sprecherskripte für die geführten Aufnahmen",
  `Gesamtmappe · Stand ${DATE}`,
);
const mappeLeit = `<div style="page-break-after:always">${renderLeitfaden()}</div>`;
const mappeSkripte = skripte.map(renderSkript).join("\n");
toPdf(
  page(mappeCover + mappeLeit + mappeSkripte, "Praxis mit Stimme · Gesamtmappe"),
  join(OUT_DIR, "WMDG-Praxis-mit-Stimme-Gesamtmappe.pdf"),
);

console.log(
  `\nFertig: ${skripte.length} Einzel-PDFs + Leitfaden + Gesamtmappe in ${OUT_DIR}`,
);
