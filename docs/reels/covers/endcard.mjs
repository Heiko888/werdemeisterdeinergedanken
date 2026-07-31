/**
 * Schluss-Cover / Outro-Card – gebrandete Endkarte für Reels & Carousels.
 *   node docs/reels/covers/endcard.mjs
 * Erzeugt endcard/<format>.html (+ _endcard.css). Schriften/Logo aus diesem
 * Ordner (../_fonts.css, ../logo.png). PNG: siehe README (Chromium-Screenshot).
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const DIR = join(HERE, "endcard");
mkdirSync(DIR, { recursive: true });

const HANDLE = "www.werdemeisterdeinergedanken.de";
const GRAD = "linear-gradient(120deg,#8cc63f 0%,#21b2bd 100%)";

const FORMATS = [
  { key: "9x16", w: 1080, h: 1920, logo: 320, head: 108, brow: 26, cta: 36, act: 30, handle: 32 },
  { key: "4x5",  w: 1080, h: 1350, logo: 300, head: 100, brow: 25, cta: 34, act: 29, handle: 31 },
  { key: "1x1",  w: 1080, h: 1080, logo: 260, head: 88,  brow: 24, cta: 32, act: 28, handle: 30 },
];

function css(f) {
  return `/* Schluss-Cover ${f.key} · generiert */
*{ margin:0; padding:0; box-sizing:border-box; }
html,body{ background:#05060c; }
.card{ position:relative; width:${f.w}px; height:${f.h}px; overflow:hidden;
  font-family:'Inter',system-ui,sans-serif; color:#f4f7ff; }
.card::before{ content:""; position:absolute; inset:0; z-index:0;
  background:
    radial-gradient(60% 40% at 50% 22%, rgba(52,196,196,.30), transparent 62%),
    radial-gradient(70% 45% at 50% 92%, rgba(40,90,150,.30), transparent 60%),
    linear-gradient(160deg,#071026 0%,#0b2138 48%,#0a1730 100%); }
.bg{ position:absolute; inset:0; z-index:1; background-image:url("vorlage.png");
  background-size:cover; background-position:center; opacity:.9; }
.scrim{ position:absolute; inset:0; z-index:2;
  background:linear-gradient(180deg, rgba(5,9,20,.6), rgba(5,9,20,.5) 45%, rgba(5,9,20,.78)); }
.inner{ position:absolute; inset:0; z-index:3; display:flex; flex-direction:column;
  align-items:center; justify-content:center; text-align:center; gap:34px; padding:0 96px; }
.logo{ width:${f.logo}px; height:auto; filter:drop-shadow(0 6px 30px rgba(52,196,196,.32)); }
.brow{ font-weight:800; font-size:${f.brow}px; letter-spacing:.18em; text-transform:uppercase;
  background:${GRAD}; -webkit-background-clip:text; background-clip:text;
  -webkit-text-fill-color:transparent; color:transparent; }
.head{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:${f.head}px;
  line-height:1.04; letter-spacing:-1px; filter:drop-shadow(0 6px 30px rgba(0,0,0,.55)); }
.head .accent{ font-style:italic; font-weight:500; padding-right:.1em;
  background:${GRAD}; -webkit-background-clip:text; background-clip:text;
  -webkit-text-fill-color:transparent; color:transparent; }
.cta{ font-size:${f.cta}px; color:#c3d2e6; line-height:1.4; max-width:80%; }
.actions{ display:flex; align-items:center; gap:22px; font-weight:700; font-size:${f.act}px;
  letter-spacing:.02em; color:#e7eefb; }
.actions .sep{ width:7px; height:7px; border-radius:50%;
  background:${GRAD}; }
.handle{ position:absolute; z-index:3; left:0; right:0; bottom:${Math.round(f.h * 0.07)}px;
  text-align:center; font-weight:600; font-size:${f.handle}px; letter-spacing:.03em;
  background:${GRAD}; -webkit-background-clip:text; background-clip:text;
  -webkit-text-fill-color:transparent; color:transparent; }
`;
}

function html(f) {
  return `<!doctype html>
<html lang="de"><head><meta charset="utf-8"><title>Schluss-Cover ${f.key}</title>
<link rel="stylesheet" href="../_fonts.css">
<link rel="stylesheet" href="_endcard.css"></head>
<body>
  <div class="card">
    <div class="bg"></div>
    <div class="scrim"></div>
    <div class="inner">
      <img class="logo" src="../logo.png" alt="Logo">
      <div class="brow">Danke fürs Zuschauen</div>
      <div class="head">Werde Meister<br>deiner <span class="accent">Gedanken</span></div>
      <div class="cta">Folge für mehr Klarheit im Kopf.</div>
      <div class="actions"><span>Folgen</span><span class="sep"></span><span>Speichern</span><span class="sep"></span><span>Teilen</span></div>
    </div>
    <div class="handle">${HANDLE}</div>
  </div>
</body></html>
`;
}

// je Format eigene CSS + HTML (CSS-Datei pro Format eindeutig benennen)
for (const f of FORMATS) {
  writeFileSync(join(DIR, `_endcard-${f.key}.css`), css(f));
  const page = html(f).replace('href="_endcard.css"', `href="_endcard-${f.key}.css"`);
  writeFileSync(join(DIR, `endcard-${f.key}.html`), page);
}
console.log(`✓ Schluss-Cover: ${FORMATS.map((f) => f.key).join(", ")} → docs/reels/covers/endcard/`);
