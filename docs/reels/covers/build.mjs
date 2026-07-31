/**
 * Cover-Generator · alle Bereiche, alle Formate
 * ---------------------------------------------
 * Eine Quelle der Wahrheit für ALLE Reel-/Themen-Cover.
 *
 *   node docs/reels/covers/build.mjs [artifact-galerie.html]
 *
 * Struktur (erzeugt):
 *   covers/<bereich>/<format>/cover-NN.html   die Cover
 *   covers/<bereich>/<format>/_cover.css      Layout des Formats
 *   covers/<bereich>/<format>/index.html      Galerie des Formats
 *   covers/<bereich>/index.html               Format-Auswahl des Bereichs
 *   covers/index.html                         Übersicht aller Bereiche
 *
 * Geteilt (einmal): _fonts.css, logo.png
 * Hintergrund: pro <bereich>/<format>-Ordner eine eigene vorlage.png ablegen
 * (sonst zeigt sich der gebrandete Verlaufs-Hintergrund).
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const HANDLE = "www.werdemeisterdeinergedanken.de";
const GRAD = "linear-gradient(120deg,#8cc63f 0%,#21b2bd 100%)";
const A = (s) => `<span class="accent">${s}</span>`; // Akzentwort (Verlauf, kursiv)

// ===========================================================================
// BEREICHE (Collections). series = Text im Tag oben. items in Reihenfolge.
// cls: "" = groß, "small" = kleiner (mehr Text / 3 Zeilen).
// ===========================================================================
const COLLECTIONS = [
  {
    key: "selbstverteidigung",
    label: "Mentale Selbstverteidigung",
    series: "Mentale Selbstverteidigung",
    note: "Wie dein Denken gelenkt wird – und wie du gegenhältst.",
    items: [
      { theme: "Propaganda",          cls: "",      html: `Ohne eine<br>einzige ${A("Lüge")}` },
      { theme: "Framing",             cls: "",      html: `Ein ${A("Wort")}<br>ändert alles` },
      { theme: "Sprache & Etiketten", cls: "small", html: `Ein Wort beendet<br>jede ${A("Debatte")}` },
      { theme: "Medien-Agenda",       cls: "small", html: `Nicht WAS –<br>sondern ${A("WORÜBER")}` },
      { theme: "Algorithmen",         cls: "",      html: `Dein ${A("Feed")}<br>≠ die Welt` },
      { theme: "Werbung & Mangel",    cls: "",      html: `Sie verkauft dir<br>den ${A("Mangel")}` },
      { theme: "Gruppendruck",        cls: "",      html: `Laut ≠<br>${A("Mehrheit")}` },
      { theme: "Autoritätshörigkeit", cls: "",      html: `Titel ≠<br>${A("Wahrheit")}` },
      { theme: "Angst-Steuerung",     cls: "",      html: `Angst macht<br>dich ${A("lenkbar")}` },
      { theme: "Wiederholung",        cls: "",      html: `Oft gehört<br>= ${A("wahr?")}` },
      { theme: "Ablenkung",           cls: "",      html: `Keine Lüge.<br>Nur ${A("Lärm.")}` },
      { theme: "Kognitive Dissonanz", cls: "",      html: `Warum du<br>${A("wegschaust")}` },
      { theme: "Normalisierung",      cls: "small", html: `„War doch schon<br>immer ${A("so")}?"` },
      { theme: "Bildmacht",           cls: "",      html: `Ein Bild ist<br>kein ${A("Beweis")}` },
      { theme: "Identität & Meinung", cls: "small", html: `Hast du eine<br>Meinung – oder<br>sie ${A("dich?")}` },
      { theme: "Reizüberflutung",     cls: "small", html: `Dein Gehirn im<br>${A("Daueralarm")}` },
    ],
  },
  {
    key: "stufen",
    label: "Die 7 Stufen",
    series: "Die 7 Stufen",
    note: "Der Weg vom Autopilot zur Meisterschaft.",
    items: [
      { theme: "01 · Autopilot",           cls: "",      html: `Du wirst<br>${A("gelebt")}` },
      { theme: "02 · Erwachen",            cls: "small", html: `Der Moment,<br>in dem du<br>${A("aufwachst")}` },
      { theme: "03 · Selbstbeobachtung",   cls: "",      html: `Sieh dir<br>selbst ${A("zu")}` },
      { theme: "04 · Emotionale Reifung",  cls: "small", html: `Fühlen – ohne<br>${A("festzuhalten")}` },
      { theme: "05 · Schöpferkraft",       cls: "",      html: `Du erschaffst –<br>${A("bewusst")}` },
      { theme: "06 · Innere Ausrichtung",  cls: "",      html: `Kopf, Herz<br>und ${A("Handeln")}` },
      { theme: "07 · Meisterschaft",       cls: "",      html: `Du bist der<br>${A("Gestalter")}` },
    ],
  },
  {
    key: "praxis",
    label: "Praxis",
    series: "Praxis",
    note: "Kleine Übungen, große Wirkung.",
    items: [
      { theme: "Atembeobachtung",       cls: "",      html: `Zurück zum<br>${A("Atem")}` },
      { theme: "Der innere Beobachter", cls: "",      html: `Wer schaut<br>da ${A("zu?")}` },
      { theme: "Body-Scan",             cls: "",      html: `Hör deinem<br>Körper ${A("zu")}` },
      { theme: "Herz-Kohärenz",         cls: "small", html: `Bring Herz und<br>Atem in ${A("Takt")}` },
      { theme: "Verlängertes Ausatmen", cls: "",      html: `Länger aus –<br>${A("ruhiger")}` },
      { theme: "4-6-Atmung",            cls: "",      html: `Vier ein.<br>Sechs ${A("aus.")}` },
      { theme: "Box Breathing",         cls: "",      html: `Atme im<br>${A("Viereck")}` },
      { theme: "Der Autopilot-Check",   cls: "small", html: `Läufst du –<br>oder ${A("lebst")} du?` },
      { theme: "Morgen-Ausrichtung",    cls: "small", html: `Wie willst du<br>den Tag ${A("treffen?")}` },
      { theme: "Abend-Reflexion",       cls: "",      html: `Was war heute<br>${A("wirklich?")}` },
      { theme: "Loslass-Ritual",        cls: "",      html: `Leg es<br>${A("ab")}` },
      { theme: "Präsenz-Spaziergang",   cls: "",      html: `Geh –<br>ganz ${A("da")}` },
      { theme: "Die tägliche Rückkehr", cls: "",      html: `Immer wieder<br>${A("zurück")}` },
    ],
  },
  {
    key: "vertiefungen",
    label: "Vertiefungen",
    series: "Vertiefung",
    note: "Das Wissen hinter der Veränderung.",
    items: [
      { theme: "Automatische Gedanken",     cls: "small", html: `Die Stimme, die<br>schon ${A("geurteilt")} hat` },
      { theme: "Konditionierung",           cls: "",      html: `Alte Reize<br>feuern ${A("noch")}` },
      { theme: "Kognitive Verzerrungen",    cls: "small", html: `Denkfehler, die<br>sich ${A("wahr")} anfühlen` },
      { theme: "Kernüberzeugungen",         cls: "small", html: `Die Regel unter<br>dem ${A("Gedanken")}` },
      { theme: "Der innere Kritiker",       cls: "small", html: `Wessen Stimme<br>ist das ${A("wirklich?")}` },
      { theme: "Neuroplastizität",          cls: "small", html: `Dein Gehirn<br>kann sich ${A("ändern")}` },
      { theme: "Reiz-Reaktions-Lücke",      cls: "small", html: `Zwischen Reiz<br>und Reaktion:<br>${A("du")}` },
      { theme: "Grübeln",                   cls: "small", html: `Raus aus der<br>${A("Endlosschleife")}` },
      { theme: "Emotionsregulation",        cls: "small", html: `Fühlen, ohne<br>zu ${A("ertrinken")}` },
      { theme: "Selbstmitgefühl",           cls: "",      html: `Sei dein<br>eigener ${A("Freund")}` },
      { theme: "Werte & Ziele",             cls: "",      html: `Die Richtung<br>unter dem ${A("Tun")}` },
      { theme: "Muster & Körper",           cls: "small", html: `Wenn Denken<br>unter die ${A("Haut")} geht` },
      { theme: "Integration & Weitergabe",  cls: "small", html: `Vom Wissen zur<br>gelebten ${A("Haltung")}` },
    ],
  },
];

// ===========================================================================
// FORMATE. Flex-Layout (Logo+Tag oben, Headline+Handle unten) → format-agnostisch.
// ===========================================================================
const FORMATS = [
  { key: "reel-9x16",      label: "9:16 · Reel / Story",         w: 1080, h: 1920, pad: 84, logoW: 220, tagFs: 23, headFs: 132, headSmallFs: 100, handleFs: 30, handleGap: 26, headMaxW: "100%" },
  { key: "feed-4x5",       label: "4:5 · Feed (Hochformat)",     w: 1080, h: 1350, pad: 80, logoW: 210, tagFs: 22, headFs: 120, headSmallFs: 96,  handleFs: 29, handleGap: 24, headMaxW: "100%" },
  { key: "feed-1x1",       label: "1:1 · Feed (quadratisch)",    w: 1080, h: 1080, pad: 76, logoW: 200, tagFs: 21, headFs: 104, headSmallFs: 86,  handleFs: 28, handleGap: 22, headMaxW: "100%" },
  { key: "landscape-16x9", label: "16:9 · YouTube / Querformat", w: 1920, h: 1080, pad: 90, logoW: 220, tagFs: 23, headFs: 150, headSmallFs: 120, handleFs: 32, handleGap: 28, headMaxW: "66%" },
  { key: "pin-2x3",        label: "2:3 · Pinterest",             w: 1000, h: 1500, pad: 76, logoW: 200, tagFs: 21, headFs: 120, headSmallFs: 94,  handleFs: 28, handleGap: 24, headMaxW: "100%" },
];

const pad2 = (n) => String(n).padStart(2, "0");

// ---------------------------------------------------------------------------
function coverCss(f) {
  return `/* Format ${f.label} · generiert von build.mjs – nicht von Hand ändern */
* { margin:0; padding:0; box-sizing:border-box; }
html,body { background:#05060c; }
.cover { position:relative; width:${f.w}px; height:${f.h}px; overflow:hidden;
  font-family:'Inter',system-ui,sans-serif; }
.cover::before { content:""; position:absolute; inset:0; z-index:0;
  background:
    radial-gradient(60% 40% at 78% 30%, rgba(52,196,196,.35), transparent 60%),
    radial-gradient(70% 50% at 20% 10%, rgba(40,90,150,.35), transparent 60%),
    linear-gradient(160deg,#071026 0%,#0b2138 45%,#0a1730 100%); }
.bg { position:absolute; inset:0; z-index:1;
  background-image:url("vorlage.png"); background-size:cover; background-position:center; }
.scrim { position:absolute; inset:0; z-index:2;
  background:linear-gradient(to bottom, transparent 40%, rgba(5,9,20,.55) 72%, rgba(5,9,20,.92) 100%); }
.content { position:absolute; inset:0; z-index:3; display:flex; flex-direction:column;
  padding:${f.pad}px; }
.top { display:flex; align-items:flex-start; justify-content:space-between; gap:40px; }
.logo { width:${f.logoW}px; height:auto; flex:0 0 auto;
  filter:drop-shadow(0 4px 26px rgba(52,196,196,.30)); }
.tag { text-align:right; padding-top:8px; font-family:'Inter',sans-serif; font-weight:800;
  font-size:${f.tagFs}px; letter-spacing:.14em; text-transform:uppercase;
  background:${GRAD};
  -webkit-background-clip:text; background-clip:text;
  -webkit-text-fill-color:transparent; color:transparent;
  filter:drop-shadow(0 2px 12px rgba(0,0,0,.55)); }
.spacer { flex:1 1 auto; }
.headline { max-width:${f.headMaxW}; font-family:'Fraunces',Georgia,serif; font-weight:600;
  font-size:${f.headFs}px; line-height:1.04; letter-spacing:-1px; color:#f4f7ff;
  filter:drop-shadow(0 6px 34px rgba(0,0,0,.6)); }
.headline.small { font-size:${f.headSmallFs}px; }
/* Kursiv + Verlauf: padding-right, damit der Verlauf den schrägen Überhang
   des letzten Buchstabens voll abdeckt (sonst wird z. B. das „d" abgeschnitten) */
.headline .accent { font-style:italic; font-weight:500;
  padding-right:.14em; margin-right:-.06em;
  background:${GRAD};
  -webkit-background-clip:text; background-clip:text;
  -webkit-text-fill-color:transparent; color:transparent; }
.handle { margin-top:${f.handleGap}px; font-family:'Inter',sans-serif; font-weight:600;
  font-size:${f.handleFs}px; letter-spacing:.04em; color:#a7bad2;
  text-shadow:0 2px 14px rgba(0,0,0,.7); }
`;
}

function coverHtml(coll, item, n) {
  const nn = pad2(n);
  const cls = item.cls ? ` ${item.cls}` : "";
  return `<!doctype html>
<html lang="de"><head><meta charset="utf-8"><title>${coll.label} ${nn} · ${item.theme}</title>
<link rel="stylesheet" href="../../_fonts.css">
<link rel="stylesheet" href="_cover.css"></head>
<body>
  <div class="cover">
    <div class="bg"></div>
    <div class="scrim"></div>
    <div class="content">
      <div class="top">
        <img class="logo" src="../../logo.png" alt="Logo">
        <div class="tag">${coll.series} · ${nn}</div>
      </div>
      <div class="spacer"></div>
      <div class="headline${cls}">${item.html}</div>
      <div class="handle">${HANDLE}</div>
    </div>
  </div>
</body></html>
`;
}

// --- Galerien (Iframe, bleiben immer synchron) -----------------------------
function iframeCard(src, w, h, caption, href) {
  const scale = 300 / w;
  const fw = Math.round(w * scale);
  const fh = Math.round(h * scale);
  const inner = `<div class="frame" style="width:${fw}px;height:${fh}px">
        <iframe src="${src}" width="${w}" height="${h}"
          style="transform:scale(${scale.toFixed(4)});transform-origin:top left;border:0"
          loading="lazy" scrolling="no"></iframe>
      </div>
      <figcaption>${caption}</figcaption>`;
  return href
    ? `    <a class="card" href="${href}">\n      ${inner}\n    </a>`
    : `    <figure class="card">\n      ${inner}\n    </figure>`;
}

function shell(title, sub, cards, backHref) {
  const back = backHref ? `<a class="back" href="${backHref}">← zurück</a>` : "";
  return `<!doctype html>
<html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<style>
  :root{ --muted:#a7bad2; }
  *{ box-sizing:border-box; }
  body{ margin:0; background:radial-gradient(80% 60% at 50% 0%,#0d2240,#070d1c 70%);
    color:#f4f7ff; font-family:system-ui,-apple-system,'Segoe UI',sans-serif;
    padding:48px 32px 80px; }
  header{ max-width:1180px; margin:0 auto 40px; }
  .eyebrow{ font-size:13px; font-weight:800; letter-spacing:.18em; text-transform:uppercase;
    background:${GRAD}; -webkit-background-clip:text; background-clip:text;
    -webkit-text-fill-color:transparent; color:transparent; }
  h1{ font-size:34px; margin:8px 0 6px; font-weight:600; }
  p.sub{ color:var(--muted); margin:0; font-size:16px; }
  .back{ display:inline-block; margin-bottom:18px; color:var(--muted); text-decoration:none; font-size:14px; }
  .back:hover{ color:#f4f7ff; }
  .grid{ max-width:1180px; margin:0 auto; display:grid; gap:30px 26px;
    grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); justify-items:center; }
  .card{ text-decoration:none; color:inherit; margin:0; }
  .frame{ overflow:hidden; border-radius:14px; box-shadow:0 18px 50px rgba(0,0,0,.5); background:#05060c; }
  figcaption{ margin-top:12px; font-size:14px; color:var(--muted); text-align:center; line-height:1.4; }
  .go{ color:#8cc63f; font-weight:600; }
</style></head>
<body>
  <header>
    ${back}
    <div class="eyebrow">Werde Meister deiner Gedanken</div>
    <h1>${title}</h1>
    <p class="sub">${sub}</p>
  </header>
  <div class="grid">
${cards}
  </div>
</body></html>
`;
}

// ---------------------------------------------------------------------------
// Schreiben: Cover + Galerien
// ---------------------------------------------------------------------------
let totalCovers = 0;
for (const coll of COLLECTIONS) {
  for (const f of FORMATS) {
    const dir = join(HERE, coll.key, f.key);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "_cover.css"), coverCss(f));
    coll.items.forEach((it, i) => {
      writeFileSync(join(dir, `cover-${pad2(i + 1)}.html`), coverHtml(coll, it, i + 1));
      totalCovers++;
    });
    // Format-Galerie
    const cards = coll.items
      .map((it, i) => iframeCard(`cover-${pad2(i + 1)}.html`, f.w, f.h, `${pad2(i + 1)} · ${it.theme}`))
      .join("\n");
    writeFileSync(join(dir, "index.html"),
      shell(`${coll.label} · ${f.label}`, `${coll.items.length} Motive · ${f.w}×${f.h}px`, cards, "../index.html"));
  }
  // Bereichs-Übersicht (Format-Auswahl)
  const fcards = FORMATS.map((f) =>
    iframeCard(`${f.key}/cover-01.html`, f.w, f.h,
      `${f.label}<br><span class="go">alle ${coll.items.length} ansehen →</span>`, `${f.key}/index.html`),
  ).join("\n");
  writeFileSync(join(HERE, coll.key, "index.html"),
    shell(`${coll.label} · Formate`, coll.note, fcards, "../index.html"));
  console.log(`✓ ${coll.key}: ${coll.items.length} Motive × ${FORMATS.length} Formate`);
}

// Master-Übersicht (Bereichs-Auswahl)
const mcards = COLLECTIONS.map((coll) =>
  iframeCard(`${coll.key}/reel-9x16/cover-01.html`, 1080, 1920,
    `${coll.label} · ${coll.items.length} Motive<br><span class="go">öffnen →</span>`, `${coll.key}/index.html`),
).join("\n");
writeFileSync(join(HERE, "index.html"),
  shell("Cover-Studio", "Alle Bereiche, alle Formate. Wähle einen Bereich.", mcards, null));
console.log(`✓ Übersicht + ${totalCovers} Cover-Dateien insgesamt`);

// ---------------------------------------------------------------------------
// Optional: in sich geschlossene Galerie (Fonts + Logo eingebettet) → Artifact
// Zeigt alle Motive in 9:16, plus eine Formatreihe zum Vergleich.
// ---------------------------------------------------------------------------
const outSelf = process.argv[2];
if (outSelf) {
  const fontsCss = readFileSync(join(HERE, "_fonts.css"), "utf8");
  const logoUri = `data:image/png;base64,${readFileSync(join(HERE, "logo.png")).toString("base64")}`;

  const coverDiv = (f, coll, item, n) => {
    const scale = 300 / f.w;
    const fw = Math.round(f.w * scale);
    const fh = Math.round(f.h * scale);
    const cls = item.cls ? ` ${item.cls}` : "";
    return `      <figure class="card">
        <div class="frame" style="width:${fw}px;height:${fh}px">
          <div class="cover ${f.key}" style="transform:scale(${scale.toFixed(4)})">
            <div class="content">
              <div class="top"><div class="logo"></div>
                <div class="tag">${coll.series} · ${pad2(n)}</div></div>
              <div class="spacer"></div>
              <div class="headline${cls}">${item.html}</div>
              <div class="handle">${HANDLE}</div>
            </div>
          </div>
        </div>
        <figcaption>${pad2(n)} · ${item.theme}</figcaption>
      </figure>`;
  };

  const reel = FORMATS[0];
  const sections = COLLECTIONS.map((coll) => {
    const cards = coll.items.map((it, i) => coverDiv(reel, coll, it, i + 1)).join("\n");
    return `  <section class="fmt">
    <h2>${coll.label} <span class="dim">· ${coll.items.length} Motive</span></h2>
    <p class="note">${coll.note}</p>
    <div class="grid">
${cards}
    </div>
  </section>`;
  }).join("\n");

  // Format-Demo: ein Motiv über alle 5 Formate
  const demoColl = COLLECTIONS[0];
  const demoItem = demoColl.items[4]; // „Dein Feed ≠ die Welt"
  const demoCards = FORMATS.map((f) => `      <figure class="card">
        <div class="frame" style="width:${Math.round(f.w * 300 / f.w)}px">
          ${coverDiv(f, demoColl, demoItem, 5).split("\n").slice(1).join("\n")}
      </figure>`).join("\n");
  const demo = `  <section class="fmt">
    <h2>Ein Motiv · fünf Formate <span class="dim">· so passt jedes Cover überall</span></h2>
    <p class="note">Im Repo liegt jedes Motiv in allen fünf Formaten – hier am Beispiel „Dein Feed".</p>
    <div class="grid grid-formats">
${demoCards}
    </div>
  </section>`;

  const fmtCss = FORMATS.map((f) => `
  .cover.${f.key}{ width:${f.w}px; height:${f.h}px; }
  .cover.${f.key} .content{ padding:${f.pad}px; }
  .cover.${f.key} .logo{ width:${f.logoW}px; height:${Math.round(f.logoW * 609 / 770)}px; }
  .cover.${f.key} .tag{ font-size:${f.tagFs}px; }
  .cover.${f.key} .headline{ font-size:${f.headFs}px; max-width:${f.headMaxW}; }
  .cover.${f.key} .headline.small{ font-size:${f.headSmallFs}px; }
  .cover.${f.key} .handle{ font-size:${f.handleFs}px; margin-top:${f.handleGap}px; }`).join("\n");

  const html = `<!doctype html>
<html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Cover-Studio</title>
<style>
${fontsCss}
:root{ --muted:#a7bad2; --logo:url("${logoUri}"); }
*{ box-sizing:border-box; }
body{ margin:0; background:radial-gradient(80% 55% at 50% 0%,#0d2240,#070d1c 70%);
  color:#f4f7ff; font-family:system-ui,-apple-system,'Segoe UI',sans-serif; padding:44px 28px 90px; }
header{ max-width:1240px; margin:0 auto 8px; }
.eyebrow{ font-size:13px; font-weight:800; letter-spacing:.18em; text-transform:uppercase;
  background:${GRAD}; -webkit-background-clip:text; background-clip:text;
  -webkit-text-fill-color:transparent; color:transparent; }
h1{ font-size:34px; margin:8px 0 6px; font-weight:600; }
p.lead{ color:var(--muted); margin:0; font-size:16px; max-width:660px; line-height:1.5; }
.fmt{ max-width:1240px; margin:0 auto; padding-top:26px; }
.fmt h2{ font-size:21px; font-weight:600; margin:0 0 4px;
  border-top:1px solid rgba(255,255,255,.08); padding-top:26px; }
.fmt h2 .dim{ color:var(--muted); font-weight:400; font-size:15px; }
.fmt .note{ color:var(--muted); font-size:14px; margin:0 0 18px; }
.grid{ display:grid; gap:28px 24px; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); justify-items:center; }
.grid-formats{ grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); align-items:end; }
.card{ margin:0; }
.frame{ overflow:hidden; border-radius:13px; box-shadow:0 16px 46px rgba(0,0,0,.5); background:#05060c; }
figcaption{ margin-top:11px; font-size:13px; color:var(--muted); text-align:center; }
/* Cover-Basis */
.cover{ position:relative; overflow:hidden; transform-origin:top left; font-family:'Inter',system-ui,sans-serif;
  background:
    radial-gradient(60% 40% at 78% 30%, rgba(52,196,196,.35), transparent 60%),
    radial-gradient(70% 50% at 20% 10%, rgba(40,90,150,.35), transparent 60%),
    linear-gradient(160deg,#071026 0%,#0b2138 45%,#0a1730 100%); }
.cover .content{ position:absolute; inset:0; display:flex; flex-direction:column; }
.cover .top{ display:flex; align-items:flex-start; justify-content:space-between; gap:40px; }
.cover .logo{ flex:0 0 auto; background:var(--logo) center/contain no-repeat; filter:drop-shadow(0 4px 26px rgba(52,196,196,.30)); }
.cover .tag{ text-align:right; padding-top:8px; font-weight:800; letter-spacing:.14em; text-transform:uppercase;
  background:${GRAD}; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; color:transparent; }
.cover .spacer{ flex:1 1 auto; }
.cover .headline{ font-family:'Fraunces',Georgia,serif; font-weight:600; line-height:1.04; letter-spacing:-1px;
  color:#f4f7ff; filter:drop-shadow(0 6px 34px rgba(0,0,0,.6)); }
.cover .headline .accent{ font-style:italic; font-weight:500; padding-right:.14em; margin-right:-.06em;
  background:${GRAD}; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; color:transparent; }
.cover .handle{ font-weight:600; letter-spacing:.04em; color:#a7bad2; text-shadow:0 2px 14px rgba(0,0,0,.7); }
${fmtCss}
</style></head>
<body>
  <header>
    <div class="eyebrow">Werde Meister deiner Gedanken</div>
    <h1>Cover-Studio</h1>
    <p class="lead">${COLLECTIONS.reduce((s, c) => s + c.items.length, 0)} Motive über ${COLLECTIONS.length} Bereiche,
      jeweils in 5 Formaten. Unten alle Motive in 9:16; ganz unten ein Motiv im Formatvergleich.
      Hintergrund hier als Verlaufs-Platzhalter – im Repo legst du je Ordner deine eigene <code>vorlage.png</code> ab.</p>
  </header>
${sections}
${demo}
</body></html>
`;
  writeFileSync(outSelf, html);
  console.log(`✓ Artifact-Galerie: ${outSelf} (${(html.length / 1e6).toFixed(2)} MB)`);
}
