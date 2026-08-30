/**
 * Willkommensvideo-Skript (Dashboard) → gebrandete PDF.
 * Reines HTML→Chromium (print-to-pdf), gleiche Optik wie die
 * Praxis-Sprecherskripte (tools/pdf/praxis-sprecherskript.mjs).
 *
 *   node tools/pdf/willkommen-skript.mjs [ausgabe-verzeichnis]
 *
 * Grundlage (Text 1:1): docs/skripte/willkommen/dashboard-willkommen.md
 * Standard-Ausgabe:     docs/skripte/willkommen/
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

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const OUT_DIR =
  process.argv[2] || join(ROOT, "docs", "skripte", "willkommen");

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

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

// ---------------------------------------------------------------------------
// Inhalt (1:1 zu docs/skripte/willkommen/dashboard-willkommen.md)
// ---------------------------------------------------------------------------
const META = {
  titel: "Willkommensvideo",
  unter: "Dein Bereich · Startseite Mitgliederbereich (/mitglieder)",
  format: "Stichpunkt-Drehbuch + Wort-für-Wort (Teleprompter)",
  laenge: "2–3 Min",
  regie:
    "Ruhig, warm, direkt in die Kamera. Kein Werbeton – ein persönliches Ankommen. Erst der erste Satz, dann Titel „Dein Bereich“ einblenden.",
};

// Stichpunkt-Drehbuch: Blöcke mit Zeitmarke, Talking Points (→),
// Regie-Hinweisen und dem einen „so-fällt-der-Satz“ (fett).
const DREHBUCH = [
  {
    kopf: "Ankommen",
    zeit: "0:00–0:25",
    zeilen: [
      { t: "fett", x: "„Schön, dass du da bist. Du hast gerade einen Schritt gemacht, den die meisten nur aufschieben.“" },
      { t: "point", x: "Kurz benennen, wer spricht (Heiko) und was das hier ist: kein Kurs zum Wegkonsumieren, sondern dein persönlicher Raum für die Reise durch die 7 Stufen." },
    ],
  },
  {
    kopf: "Worum es wirklich geht",
    zeit: "0:25–1:00",
    zeilen: [
      { t: "point", x: "Der rote Faden von allem: Das meiste in uns läuft automatisch – Reaktionen, Gewohnheiten, Gedanken. Hier lernst du, das zu bemerken und wieder zu wählen." },
      { t: "point", x: "Es geht nicht darum, ein anderer Mensch zu werden. Sondern darum, wacher zu werden für den, der du ohnehin schon bist." },
      { t: "regie", x: "Ein Atemzug Pause. Das ist der Kern – nicht drüberrutschen." },
    ],
  },
  {
    kopf: "So findest du dich zurecht",
    zeit: "1:00–2:00",
    zeilen: [
      { t: "regie", x: "Optional: sanfte Screen-Einblendungen der genannten Bereiche." },
      { t: "point", x: "„Hier weitermachen“ ganz oben ist dein Anker. Du musst dir nie merken, wo du warst – das Dashboard zeigt dir immer den nächsten Schritt." },
      { t: "point", x: "Die 7 Stufen sind dein Weg – von „bemerken, dass der Autopilot läuft“ bis „bewusst gestalten und zurückkehren“. Einer nach dem anderen, in deinem Tempo." },
      { t: "point", x: "Praxis ist das, was die Stufen wirksam macht: kurze geführte Meditationen, Atemübungen, Rituale für den Alltag." },
      { t: "point", x: "Vertiefungen erklären das Warum dahinter – die psychologischen Mechanismen, wenn du tiefer verstehen willst." },
      { t: "point", x: "Und im Werkzeugkasten wartet mehr, wenn du so weit bist: dein Journal, dein Begleiter, das 21-Tage-Programm, die tägliche Rückkehr." },
    ],
  },
  {
    kopf: "Die eine Haltung",
    zeit: "2:00–2:35",
    zeilen: [
      { t: "point", x: "Ein Versprechen und eine Entlastung zugleich: Es geht hier nicht darum, nie wieder in den Autopilot zu fallen. Das schafft niemand." },
      { t: "point", x: "Es geht um das ruhige Zurückkehren – dass du früher bemerkst und freundlicher zurückfindest. Ein verpasster Tag ist kein Bruch." },
      { t: "fett", x: "„Du musst das hier nicht schaffen. Du darfst es gehen.“" },
    ],
  },
  {
    kopf: "Losgehen",
    zeit: "2:35–Ende",
    zeilen: [
      { t: "point", x: "Konkreter erster Schritt: Scroll ein Stück nach unten zu „Hier weitermachen“ und beginne mit Stufe 1. Mehr braucht es heute nicht." },
      { t: "fett", x: "Takeaway: „Fang klein an. Eine Stufe, eine Praxis. Der Rest ergibt sich – ich freue mich, dass du da bist.“" },
    ],
  },
];

// Wort-für-Wort (Teleprompter): Absätze + Regie-Hinweise.
const TELEPROMPTER = [
  { t: "text", x: "Schön, dass du da bist. Wirklich. Du hast gerade einen Schritt gemacht, den die meisten Menschen ihr Leben lang nur aufschieben – du hast beschlossen, einmal genauer hinzuschauen. Auf dich, auf dein Denken, auf das, was in dir jeden Tag abläuft." },
  { t: "text", x: "Ich bin Heiko, und das hier ist dein Bereich. Kein Kurs, den du in einem Rutsch wegkonsumierst und dann abhakst. Sondern dein persönlicher Raum für eine Reise durch sieben Stufen – in deinem Tempo, so oft du willst, ohne dass dir jemand über die Schulter schaut." },
  { t: "regie", x: "kurze Pause, Titel: Dein Bereich" },
  { t: "text", x: "Lass mich in einem Satz sagen, worum es hier eigentlich geht. Das meiste in uns läuft automatisch ab – unsere Reaktionen, unsere Gewohnheiten, die Gedanken, die ungefragt auftauchen. Und solange das unsichtbar bleibt, fühlt es sich einfach wie „ich“ an. Hier lernst du, das zu bemerken. Und wo du etwas bemerkst, kannst du zum ersten Mal wieder wählen." },
  { t: "text", x: "Es geht also nicht darum, ein völlig anderer Mensch zu werden. Es geht darum, wacher zu werden für den, der du ohnehin schon bist. Das ist der ganze rote Faden, der sich durch alles zieht, was du hier findest." },
  { t: "regie", x: "Ein Atemzug Pause." },
  { t: "text", x: "Und weil so ein Mitgliederbereich am Anfang schnell nach viel aussieht, zeige ich dir kurz, wie du dich zurechtfindest. Du musst dir nichts davon merken." },
  { t: "text", x: "Ganz oben findest du immer den Bereich „Hier weitermachen“. Das ist dein Anker. Du musst nie überlegen, wo du zuletzt warst – das Dashboard zeigt dir von selbst, was als Nächstes dran ist. Wenn du nichts anderes tust, als immer diesem einen Knopf zu folgen, bist du auf dem richtigen Weg." },
  { t: "text", x: "Darunter liegt dein eigentlicher Weg: die sieben Stufen. Sie bauen aufeinander auf – von „ich bemerke, dass da ein Autopilot läuft“ über „ich beobachte und lasse los“ bis hin zu „ich gestalte bewusst und kehre immer wieder zurück“. Du gehst sie eine nach der anderen. Keine Eile." },
  { t: "text", x: "Dann gibt es die Praxis. Das ist das, was die Stufen überhaupt erst wirksam macht: kurze geführte Meditationen, Atemübungen und kleine Rituale für den Alltag. Wissen allein verändert wenig – das Üben verändert alles. Such dir eine aus, die dich anspricht, und probier sie einfach." },
  { t: "text", x: "Und wenn du das Warum dahinter verstehen willst, gibt es die Vertiefungen – die psychologischen Mechanismen hinter den Stufen, ehrlich erklärt. Nutze sie, wann immer du neugierig bist, aber lass dich davon nicht aufhalten. Verstehen darf auch später kommen." },
  { t: "text", x: "Alles Weitere – dein Journal, dein persönlicher Begleiter, das 21-Tage-Programm, die tägliche Rückkehr – wartet im Werkzeugkasten auf dich. Bewusst etwas im Hintergrund, damit dein Weg im Vordergrund bleibt. Du holst es dir, wenn du so weit bist. Nicht vorher." },
  { t: "regie", x: "Tempo rausnehmen, wärmer werden." },
  { t: "text", x: "Eine Sache möchte ich dir gleich zu Anfang mitgeben, weil sie dir viel Druck nehmen wird. Es geht hier nicht darum, ab morgen perfekt bewusst zu leben und nie wieder in alte Muster zu fallen. Das schafft kein Mensch, und ich auch nicht. Es geht um etwas viel Freundlicheres: um das Zurückkehren. Darum, dass du mit der Zeit früher bemerkst, wenn dich der Autopilot wieder gepackt hat – und dass du sanfter zu dir selbst zurückfindest." },
  { t: "text", x: "Ein verpasster Tag ist deshalb kein Bruch. Ein Rückfall ist kein Scheitern. Beides gehört dazu. Du musst das hier nicht schaffen. Du darfst es einfach gehen." },
  { t: "text", x: "Und damit du nicht im Überlegen hängen bleibst, hier dein erster Schritt für heute: Scroll ein kleines Stück nach unten, bis zu „Hier weitermachen“, und beginne mit Stufe eins. Mehr braucht es heute wirklich nicht." },
  { t: "text", x: "Fang klein an. Eine Stufe, eine Praxis. Der Rest ergibt sich unterwegs. Ich freue mich sehr, dass du da bist – und wir sehen uns in Stufe eins." },
];

const ONSCREEN = [
  ["0:05", "„Willkommen in deinem Bereich“"],
  ["1:05", "„Hier weitermachen → dein Anker“"],
  ["1:20", "„Die 7 Stufen → dein Weg“"],
  ["1:35", "„Praxis → was es wirksam macht“"],
  ["1:50", "„Vertiefungen → das Warum“"],
  ["2:20", "„Nicht nie fallen. Sondern ruhig zurückkehren.“"],
  ["Ende", "„Starte mit Stufe 1 ↓“"],
];

const KURZ =
  "Schön, dass du da bist. Das hier ist dein Bereich – kein Kurs zum Wegkonsumieren, sondern dein Raum für die Reise durch die 7 Stufen. Der rote Faden: Das meiste in uns läuft automatisch. Hier lernst du, das zu bemerken – und wieder zu wählen. Ganz oben findest du immer „Hier weitermachen“, deinen Anker für den nächsten Schritt. Die Stufen sind dein Weg, die Praxis macht ihn wirksam, die Vertiefungen erklären das Warum. Und keine Sorge: Es geht nicht darum, nie wieder zu fallen, sondern ruhig zurückzukehren. Fang klein an – scroll nach unten und starte mit Stufe 1. Ich freue mich, dass du da bist.";

// ---------------------------------------------------------------------------
// Styling – Marken-Look, angelehnt an praxis-sprecherskript.mjs
// ---------------------------------------------------------------------------
const STYLE = `
${fontsCss}
:root{ --ink:#16231f; --mid:#48524e; --muted:#626b67; --leaf:#7e6410; --teal:#7e6410; --line:#e4dfd2; --gold:#d9a93a; --gold-deep:#7e6410; }
@page{ size:A4; margin:16mm 18mm; }
*{ box-sizing:border-box; }
body{ margin:0; font-family:'Inter',system-ui,sans-serif; color:var(--ink); font-size:12pt; line-height:1.55; background:#f6f4ee; -webkit-print-color-adjust:exact; print-color-adjust:exact; }

.cover{ height:255mm; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; page-break-after:always; background:radial-gradient(78% 62% at 50% -10%, rgba(232,193,95,.26), transparent 62%), radial-gradient(58% 52% at 4% 108%, rgba(217,169,58,.13), transparent 60%), #f6f4ee; }
.cover img{ width:140px; margin-bottom:24px; }
.brow{ display:flex; flex-direction:column; align-items:center; gap:3px; margin-bottom:10px; line-height:1; }
.brow .wm1{ font-family:'Fraunces',serif; font-size:15pt; font-weight:400; letter-spacing:.08em; text-transform:uppercase; color:#16231f; }
.brow .wm1 em{ font-style:normal; background:linear-gradient(100deg,#d9a93a,#7e6410); -webkit-background-clip:text; background-clip:text; color:transparent; }
.brow .wm2{ display:flex; align-items:center; gap:7px; font-family:'Fraunces',serif; font-size:8pt; font-weight:400; letter-spacing:.22em; text-transform:uppercase; color:#48524e; }
.brow .wm2 i{ display:block; height:1px; width:14px; background:#d9a93a; }
.cover h1{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:32pt; margin:0 0 10px; line-height:1.12; }
.cover p{ color:var(--mid); font-size:12pt; margin:2px 0; }
.cover .meta{ margin-top:22px; color:var(--muted); font-size:10.5pt; }

/* Abschnitts-Kopf */
.h1{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:22pt; margin:0 0 2mm; padding-bottom:3mm; border-bottom:2px solid; border-image:linear-gradient(90deg,#e8c15f,#d9a93a) 1; }
.lead{ color:var(--mid); font-size:11pt; margin:0 0 6mm; }
.sec{ page-break-before:always; }

/* Meta-/Legenden-Karte auf der ersten Inhaltsseite */
.card{ margin:0 0 7mm; padding:3.4mm 4.4mm; background:#efece2; border:1px solid var(--line); border-radius:9px; font-size:10.5pt; line-height:1.55; color:var(--mid); }
.card b{ color:var(--ink); }
.card .row{ margin:.6mm 0; }

/* Drehbuch-Block */
.block{ break-inside:avoid; margin:0 0 6mm; }
.block .bk{ display:flex; align-items:baseline; gap:10px; margin:0 0 2.4mm; }
.block .bk h3{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:14pt; margin:0; color:#16231f; }
.block .bk .zeit{ font-family:'DejaVu Sans Mono',ui-monospace,Menlo,Consolas,monospace; font-size:9pt; color:#7e6410; background:#efece2; padding:.5mm 2mm; border-radius:4px; }
.point{ position:relative; margin:0 0 2.6mm 6mm; line-height:1.55; }
.point::before{ content:"→"; position:absolute; left:-6mm; color:var(--teal); font-weight:800; }
.fett{ margin:0 0 2.8mm; padding:2.6mm 3.6mm; background:#faf4e4; border:1px solid #ecdcae; border-left:4px solid #d9a93a; border-radius:8px; font-weight:700; color:#5c4708; line-height:1.5; break-inside:avoid; }

/* Regie – nicht sprechen */
.regie{ margin:0 0 3mm; padding:2.4mm 3.6mm; background:#fff7ed; border:1px solid #f2d5a8; border-left:4px solid #e0912f; border-radius:8px; font-size:10pt; line-height:1.5; color:#7a4a0c; break-inside:avoid; }
.regie b{ color:#9a5a0c; font-weight:800; letter-spacing:.04em; text-transform:uppercase; font-size:8.5pt; display:block; margin-bottom:1mm; }

/* Teleprompter – gross und ruhig */
.text{ font-size:14pt; line-height:1.78; margin:0 0 5mm; break-inside:avoid; }

/* On-Screen-Tabelle */
.osl{ margin:2mm 0 0; border-collapse:collapse; width:100%; font-size:11pt; }
.osl td{ padding:2.2mm 3mm; border-bottom:1px solid var(--line); vertical-align:top; }
.osl td.z{ width:22mm; font-family:'DejaVu Sans Mono',ui-monospace,Menlo,Consolas,monospace; font-size:9.5pt; color:#7e6410; }

/* Kurzfassung */
.kurz{ margin:3mm 0 0; padding:5mm 6mm; background:#efece2; border:1px solid var(--line); border-left:4px solid #d9a93a; border-radius:10px; font-size:12.5pt; line-height:1.7; color:#2a3430; }
`;

function renderDrehbuchZeile(z) {
  if (z.t === "regie")
    return `<div class="regie"><b>Regie · nicht sprechen</b>${esc(z.x)}</div>`;
  if (z.t === "fett") return `<div class="fett">${esc(z.x)}</div>`;
  return `<p class="point">${esc(z.x)}</p>`;
}

function renderDrehbuch() {
  const bloecke = DREHBUCH.map(
    (b) => `<div class="block">
    <div class="bk"><h3>${esc(b.kopf)}</h3><span class="zeit">${esc(b.zeit)}</span></div>
    ${b.zeilen.map(renderDrehbuchZeile).join("\n")}
  </div>`,
  ).join("\n");
  // Erste Inhaltsseite – kein Seitenumbruch davor (Cover bricht bereits um).
  return `<section>
  <h1 class="h1">Stichpunkt-Drehbuch</h1>
  ${firstPageCard()}
  <p class="lead">Frei sprechen · Legende: <b>→</b> Talking Point · <b>fett</b> = der eine Satz, der genau so fällt · Regie-Kästen werden nicht gesprochen.</p>
  ${bloecke}
</section>`;
}

function renderTeleprompter() {
  const inhalt = TELEPROMPTER.map((s) =>
    s.t === "regie"
      ? `<div class="regie"><b>Regie · nicht sprechen</b>${esc(s.x)}</div>`
      : `<p class="text">${esc(s.x)}</p>`,
  ).join("\n");
  return `<section class="sec">
  <h1 class="h1">Wort-für-Wort · Teleprompter</h1>
  <p class="lead">Zum direkten Einsprechen – ruhiger, warmer Ton, Pausen nach Gefühl.</p>
  ${inhalt}
</section>`;
}

function renderOnscreen() {
  const rows = ONSCREEN.map(
    ([z, t]) => `<tr><td class="z">${esc(z)}</td><td>${esc(t)}</td></tr>`,
  ).join("\n");
  return `<section class="sec">
  <h1 class="h1">On-Screen-Text &amp; Kurzfassung</h1>
  <p class="lead">Optionale Einblendungen (Zeitmarke → Text) und eine 45-Sek-Fassung, falls ein knappes Intro gewünscht ist.</p>
  <table class="osl"><tbody>${rows}</tbody></table>
  <h3 style="font-family:'Fraunces',Georgia,serif;font-weight:600;font-size:13.5pt;color:#16231f;margin:8mm 0 2mm;">Kurzfassung (≈ 45 Sek)</h3>
  <div class="kurz">${esc(KURZ)}</div>
</section>`;
}

function firstPageCard() {
  return `<div class="card">
    <div class="row"><b>Format:</b> ${esc(META.format)}</div>
    <div class="row"><b>Ziellänge:</b> ${esc(META.laenge)}</div>
    <div class="row"><b>Ort:</b> Startseite Mitgliederbereich (/mitglieder) – das Erste, was ein neues Mitglied sieht.</div>
    <div class="row"><b>Regie:</b> ${esc(META.regie)}</div>
  </div>`;
}

function coverHtml() {
  return `<div class="cover">
  <img src="${logoUri}" alt="Logo">
  <div class="brow"><span class="wm1">Werde <em>Meister</em></span><span class="wm2"><i></i>Deiner Gedanken<i></i></span></div>
  <h1>${esc(META.titel)}</h1>
  <p>${esc(META.unter)}</p>
  <p class="meta">Video-Skript · ${esc(META.laenge)} · Stand ${DATE}</p>
</div>`;
}

const html = `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Willkommensvideo · Dashboard</title><style>${STYLE}</style></head><body>${
  coverHtml() + renderDrehbuch() + renderTeleprompter() + renderOnscreen()
}</body></html>`;

function toPdf(html, outPath) {
  const tmp = join(HERE, `.willkommen.html`);
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

mkdirSync(OUT_DIR, { recursive: true });
toPdf(html, join(OUT_DIR, "Willkommensvideo-Dashboard.pdf"));
console.log(`\nFertig: Willkommensvideo-Skript als PDF in ${OUT_DIR}`);
