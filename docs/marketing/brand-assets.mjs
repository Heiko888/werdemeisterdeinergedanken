/**
 * Marken-Zusatzvorlagen im WMDG-Look:
 *   • Profilbild / Avatar (rund-sicher, universell für alle Kanäle)
 *   • Profil-/Kanalbild quadratisch mit Wortmarke (Telegram/WhatsApp-Kanal)
 *   • WhatsApp Business (rundes Profilbild, Info-Kachel, Status-Banner 9:16)
 *   • YouTube-Video-Thumbnail (16:9, klickstark, Titel-Platzhalter)
 *   • Zitat-Kacheln (1:1 und 4:5) aus Marken-Kernsätzen
 *
 *   node docs/marketing/brand-assets.mjs
 */
import { writeFileSync, readFileSync, existsSync, readdirSync, mkdirSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const fontsUrl = pathToFileURL(join(ROOT, "tools/pdf/assets/fonts.css")).href;
const brainUrl = pathToFileURL(join(ROOT, "public/logo-brain.png")).href;
const ebookUri = `data:image/webp;base64,${readFileSync(join(ROOT, "public/ebook-mockup.webp")).toString("base64")}`;

// Zitat-/Fakten-Texte kommen aus der gemeinsamen Quelle (auch von den Overlays
// genutzt), damit sie nur an einer Stelle gepflegt werden.
import { QUOTES, FACTS } from "./content-data.mjs";
import { ARROW } from "../_glyphs.mjs";

// ---------- gemeinsame Marken-Optik ----------------------------------------
// Realistisch-cinematische Bildwelt: Anthrazit-Basis (#090b10, an globals.css
// navy-950 angeglichen), ruhige Tiefe statt Kosmos. Führender Teal-Schimmer
// (Bewusstsein), Königsblau stark zurückgenommen, dezenter Gold-Akzent
// (Erkenntnis). KEIN Sternenfeld mehr.
const BG = `
.bg{position:absolute;inset:0;background:
  radial-gradient(52% 110% at 86% 10%, rgba(33,178,189,.20), transparent 60%),
  radial-gradient(46% 110% at 6% 96%, rgba(54,112,238,.10), transparent 60%),
  radial-gradient(42% 90% at 74% 92%, rgba(217,169,58,.12), transparent 60%),
  #090b10;}`;

const shell = (w, h, extra, body) => `<!doctype html><html><head><meta charset="utf8">
<link rel="stylesheet" href="${fontsUrl}"><style>
*{margin:0;box-sizing:border-box}
body{width:${w}px;height:${h}px;overflow:hidden;font-family:Inter,sans-serif;position:relative;background:#090b10}
${BG}
.brain{position:relative;object-fit:contain;filter:drop-shadow(0 10px 60px rgba(52,196,196,.45))}
.glow{position:absolute;border-radius:50%;background:radial-gradient(circle, rgba(52,196,196,.35), transparent 66%);filter:blur(30px)}
.wordmark{font-weight:800;text-transform:uppercase;color:rgba(244,242,236,.92)}
.wordmark span{background:linear-gradient(100deg,#f2d489,#e8c15f);-webkit-background-clip:text;background-clip:text;color:transparent}
.url{font-weight:700;color:#e8c15f;letter-spacing:.3px}
.eyebrow{font-weight:700;letter-spacing:4px;text-transform:uppercase;color:#34c4c4}
${extra}
</style></head><body><div class="bg"></div>${body}</body></html>`;

// ---------- Layouts ---------------------------------------------------------

// Rundes Profilbild – Icon zentriert, komplett kreis-sicher (kein Text am Rand)
const avatarRound = (w) => shell(w, w, `
.center{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
.ring{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:${Math.round(w*0.84)}px;height:${Math.round(w*0.84)}px;border-radius:50%;border:1px solid rgba(52,196,196,.18)}
.glow{left:50%;top:50%;transform:translate(-50%,-50%);width:${Math.round(w*0.62)}px;height:${Math.round(w*0.62)}px}
.brain{width:${Math.round(w*0.6)}px;height:${Math.round(w*0.6)}px}
`, `<div class="center"><div class="ring"></div><div class="glow"></div>
  <img class="brain" src="${brainUrl}"></div>`);

// Quadratisches Kanalbild mit Wortmarke (Telegram/WhatsApp-Kanal, App-Kachel)
const channelSquare = (w) => shell(w, w, `
.stack{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${Math.round(w*0.045)}px;text-align:center;padding:0 ${Math.round(w*0.08)}px}
.glow{left:50%;top:38%;transform:translate(-50%,-50%);width:${Math.round(w*0.5)}px;height:${Math.round(w*0.5)}px}
.brain{width:${Math.round(w*0.44)}px;height:${Math.round(w*0.44)}px}
.wordmark{font-size:${Math.round(w*0.062)}px;letter-spacing:${Math.round(w*0.008)}px;line-height:1.35}
.url{font-size:${Math.round(w*0.03)}px;margin-top:${Math.round(w*0.01)}px}
`, `<div class="stack">
  <img class="brain" src="${brainUrl}">
  <div class="wordmark">Werde Meister deiner<br><span>Gedanken</span></div>
  <div class="url">www.werdemeisterdeinergedanken.de</div>
</div>`);

// YouTube-Video-Thumbnail 16:9 – klickstark, großer Titel + Akzentwort
const thumbnail = (w, h, data) => shell(w, h, `
.wrap{position:absolute;left:64px;top:50%;transform:translateY(-50%);width:${w-640}px}
.eyebrow{font-size:23px;margin-bottom:20px}
.title{font-family:Fraunces,serif;font-weight:600;color:#f4f2ec;font-size:62px;line-height:1.06;letter-spacing:-.5px}
.title em{background:linear-gradient(100deg,#f2d489,#e8c15f);-webkit-background-clip:text;background-clip:text;color:transparent;font-style:italic}
.kicker{margin-top:24px;font-size:24px;font-weight:700;color:rgba(244,242,236,.72);line-height:1.3}
.glow{right:100px;top:50%;transform:translateY(-50%);width:${Math.round(h*0.6)}px;height:${Math.round(h*0.6)}px}
.brain{position:absolute;right:120px;top:50%;transform:translateY(-50%);width:${Math.round(h*0.6)}px;height:${Math.round(h*0.6)}px}
`, `<div class="wrap">
  <div class="eyebrow">${data.eyebrow}</div>
  <div class="title">${data.title}</div>
  <div class="kicker">${data.kicker}</div>
</div>
<div class="glow"></div><img class="brain" src="${brainUrl}">`);

// Zitat-Kachel – großer Serifensatz, Marke als dezente Signatur unten.
// Designcode: ein Wort im Zitat trägt den Grün-Türkis-Verlauf (<em>) und ist
// die visuelle Pointe. Großes, sehr transparentes Anführungszeichen hinter dem
// Text; weiche Tiefe im Hintergrund (Glow, keine konkreten Motive).
const quoteTile = (w, h, q) => shell(w, h, `
.aura{position:absolute;left:50%;top:47%;transform:translate(-50%,-50%);width:${Math.round(w*0.95)}px;height:${Math.round(w*0.95)}px;border-radius:50%;background:radial-gradient(circle, rgba(52,196,196,.10), rgba(52,196,196,0) 66%);filter:blur(46px)}
.qstars{display:none}
.qmark{position:absolute;left:50%;top:${Math.round(h*0.35)}px;transform:translate(-50%,-50%);font-family:Fraunces,serif;font-weight:600;font-size:${Math.round(w*0.6)}px;line-height:.62;color:rgba(130,210,215,.095);pointer-events:none}
.qwrap{position:absolute;left:50%;top:47%;transform:translate(-50%,-50%);width:${w-Math.round(w*0.3)}px;text-align:center}
.quote{font-family:Fraunces,serif;font-weight:500;color:#f4f2ec;font-size:${Math.round(w*0.067)}px;line-height:1.32;letter-spacing:-.3px}
.quote em{font-style:italic;font-weight:600;font-size:1.07em;background:linear-gradient(100deg,#f2d489,#e8c15f);-webkit-background-clip:text;background-clip:text;color:transparent}
.foot{position:absolute;left:0;right:0;bottom:${Math.round(w*0.072)}px;display:flex;align-items:center;justify-content:center;gap:10px}
.foot img{width:${Math.round(w*0.037)}px;height:${Math.round(w*0.037)}px;object-fit:contain;opacity:.88}
.foot .t{font-size:${Math.round(w*0.023)}px;font-weight:800;letter-spacing:2.2px;text-transform:uppercase;color:rgba(244,242,236,.62)}
`, `<div class="aura"></div><div class="qstars"></div><div class="qmark">„</div>
<div class="qwrap"><div class="quote">${q}</div></div>
<div class="foot"><img src="${brainUrl}"><span class="t">Werde Meister deiner Gedanken</span></div>`);

// Studien-Fakt-Kachel – gleiches Serien-Template wie die Zitate (Verlauf,
// Serifenschrift, Grün-Türkis-Schlüsselwort als Pointe, Signatur unten),
// nur mit Eyebrow + Quellenzeile statt Anführungszeichen.
const factTile = (w, h, f) => shell(w, h, `
.aura{position:absolute;left:50%;top:46%;transform:translate(-50%,-50%);width:${Math.round(w*0.95)}px;height:${Math.round(w*0.95)}px;border-radius:50%;background:radial-gradient(circle, rgba(52,196,196,.10), rgba(52,196,196,0) 66%);filter:blur(46px)}
.qstars{display:none}
.fwrap{position:absolute;left:50%;top:46%;transform:translate(-50%,-50%);width:${w-Math.round(w*0.24)}px;text-align:center}
.eyebrow{font-size:${Math.round(w*0.024)}px;letter-spacing:.22em;margin-bottom:${Math.round(w*0.045)}px}
.fact{font-family:Fraunces,serif;font-weight:500;color:#f4f2ec;font-size:${Math.round(w*0.064)}px;line-height:1.3;letter-spacing:-.3px}
.fact em{font-style:italic;font-weight:600;font-size:1.07em;background:linear-gradient(100deg,#f2d489,#e8c15f);-webkit-background-clip:text;background-clip:text;color:transparent}
.src{margin-top:${Math.round(w*0.045)}px;font-size:${Math.round(w*0.026)}px;line-height:1.4;color:rgba(244,242,236,.55)}
.src b{color:rgba(232,193,95,.9);font-weight:700}
.foot{position:absolute;left:0;right:0;bottom:${Math.round(w*0.072)}px;display:flex;align-items:center;justify-content:center;gap:10px}
.foot img{width:${Math.round(w*0.037)}px;height:${Math.round(w*0.037)}px;object-fit:contain;opacity:.88}
.foot .t{font-size:${Math.round(w*0.023)}px;font-weight:800;letter-spacing:2.2px;text-transform:uppercase;color:rgba(244,242,236,.62)}
`, `<div class="aura"></div><div class="qstars"></div>
<div class="fwrap">
  <div class="eyebrow">Studien-Fakt</div>
  <div class="fact">${f.t}</div>
  <div class="src"><b>Quelle:</b> ${f.src}</div>
</div>
<div class="foot"><img src="${brainUrl}"><span class="t">Werde Meister deiner Gedanken</span></div>`);

// Gratis-E-Book-Einzelpost – orientierungsbewusst (Querformat = zweispaltig),
// bewusst luftig. Schriftgrößen an der kürzeren Kante ausgerichtet.
const ebookPost = (w, h) => {
  const land = w > h * 1.15;            // deutlich breiter → Querformat
  const base = Math.min(w, h);
  const b = (v) => Math.round(base * v); // Schrift an kürzerer Kante

  // Quadratformat (1:1): Conversion-Post – kurzer Eyebrow, großes Cover als
  // Produkt, Headline, aktiver CTA + „Link in Bio" (keine URL).
  if (w === h) {
    const bookHsq = Math.round(h * 0.54);
    return shell(w, h, `
.post{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:${Math.round(h*0.045)}px ${Math.round(w*0.09)}px;gap:${b(0.03)}px}
.eyebrow{font-size:${b(0.026)}px;letter-spacing:.16em}
.bookwrap{position:relative;display:flex;justify-content:center}
.bookglow{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:${Math.round(bookHsq*0.82)}px;height:${Math.round(bookHsq*0.82)}px;border-radius:50%;background:radial-gradient(circle, rgba(52,196,196,.24), transparent 68%);filter:blur(44px)}
.book{position:relative;height:${bookHsq}px;width:auto;filter:drop-shadow(0 24px 58px rgba(0,0,0,.62))}
.h{font-family:Fraunces,serif;font-weight:600;color:#f4f2ec;font-size:${b(0.06)}px;line-height:1.16;letter-spacing:-.5px;max-width:98%}
.h em{background:linear-gradient(100deg,#f2d489,#e8c15f);-webkit-background-clip:text;background-clip:text;color:transparent;font-style:italic}
.ctaGroup{display:flex;flex-direction:column;align-items:center;gap:${b(0.007)}px;margin-top:${b(0.006)}px}
.cta{padding:${b(0.019)}px ${b(0.042)}px;border-radius:999px;background:linear-gradient(100deg,#f2d489,#e8c15f);color:#241a06;font-weight:800;font-size:${b(0.032)}px;letter-spacing:.01em}
.cta-note{font-size:${b(0.023)}px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(244,242,236,.68)}
`, `<div class="post">
  <div class="eyebrow">Dein Gratis-Einstieg</div>
  <div class="bookwrap"><div class="bookglow"></div><img class="book" src="${ebookUri}"></div>
  <div class="h">Werde zum bewussten <em>Gestalter deiner Gedanken</em></div>
  <div class="ctaGroup">
    <div class="cta">E-Book gratis sichern ${ARROW}</div>
    <div class="cta-note">Link in Bio</div>
  </div>
</div>`);
  }

  // Buch höhenbasiert dimensionieren → verlässlicher Rand oben/unten,
  // kein Überlaufen mehr (Mockup-Ratio h/w ≈ 1,37).
  const bookH = land ? Math.round(h * 0.66)
    : Math.round(h * (h > w * 1.4 ? 0.34 : h > w ? 0.35 : 0.40));
  const bookW = Math.round(bookH / 1.37);
  const common = `
.eyebrow{font-size:${b(0.026)}px;letter-spacing:.2em}
.bookglow{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:${Math.round(bookW*1.35)}px;height:${Math.round(bookW*1.35)}px;border-radius:50%;background:radial-gradient(circle, rgba(232,193,95,.24), transparent 68%);filter:blur(38px)}
.book{position:relative;width:auto;height:${bookH}px;filter:drop-shadow(0 22px 50px rgba(0,0,0,.55))}
.h{font-family:Fraunces,serif;font-weight:600;color:#f4f2ec;font-size:${b(0.062)}px;line-height:1.14;letter-spacing:-.5px}
.h em{background:linear-gradient(100deg,#f2d489,#e8c15f);-webkit-background-clip:text;background-clip:text;color:transparent;font-style:italic}
.bul{display:flex;flex-direction:column;gap:${b(0.022)}px}
.bul .li{display:flex;align-items:center;gap:${b(0.016)}px;font-size:${b(0.031)}px;color:rgba(244,242,236,.84)}
.bul .ck{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:${b(0.042)}px;height:${b(0.042)}px;border-radius:50%;background:rgba(232,193,95,.16);color:#e8c15f;font-size:${b(0.024)}px;font-weight:800}
.cta{align-self:${land ? "flex-start" : "center"};padding:${b(0.024)}px ${b(0.05)}px;border-radius:999px;background:linear-gradient(100deg,#f2d489,#e8c15f);color:#241a06;font-weight:800;font-size:${b(0.032)}px;letter-spacing:.02em}
.url{font-size:${b(0.026)}px}`;

  if (land) {
    const bookHc = Math.round(h * 0.74);
    return shell(w, h, `${common}
.post{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:${Math.round(w*0.06)}px;padding:0 ${Math.round(w*0.07)}px}
.bookwrap{position:relative;flex:0 0 auto;display:flex;justify-content:center}
.book{height:${bookHc}px}
.bookglow{width:${Math.round(bookHc*0.6)}px;height:${Math.round(bookHc*0.6)}px}
.col{display:flex;flex-direction:column;align-items:flex-start;text-align:left;gap:${b(0.045)}px;max-width:${Math.round(w*0.46)}px}
.eyebrow{letter-spacing:.16em}
.h{line-height:1.16}
.ctaGroup{display:flex;flex-direction:column;align-items:flex-start;gap:${b(0.008)}px;margin-top:${b(0.006)}px}
.cta{align-self:flex-start;padding:${b(0.019)}px ${b(0.044)}px;font-size:${b(0.032)}px;margin-top:0}
.cta-note{font-size:${b(0.022)}px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(244,242,236,.68)}
`, `<div class="post">
  <div class="bookwrap"><div class="bookglow"></div><img class="book" src="${ebookUri}"></div>
  <div class="col">
    <div class="eyebrow">Dein Gratis-Einstieg</div>
    <div class="h">Werde zum bewussten <em>Gestalter deiner Gedanken</em></div>
    <div class="ctaGroup">
      <div class="cta">E-Book gratis sichern ${ARROW}</div>
      <div class="cta-note">Link in Bio</div>
    </div>
  </div>
</div>`);
  }
  // Hochformat (4:5, 9:16, 2:3): Conversion-Aufbau – kurzer Eyebrow, großes
  // Cover, Headline, aktiver CTA + „Link in Bio" (keine Punkte, keine URL).
  const bookHc = Math.round(h * (h > w * 1.4 ? 0.42 : 0.46));
  return shell(w, h, `${common}
.post{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:${Math.round(h*0.06)}px ${Math.round(w*0.1)}px;gap:${b(0.05)}px}
.eyebrow{letter-spacing:.16em}
.bookwrap{position:relative;display:flex;justify-content:center}
.book{height:${bookHc}px}
.bookglow{width:${Math.round(bookHc*0.62)}px;height:${Math.round(bookHc*0.62)}px}
.h{max-width:96%;line-height:1.18}
.ctaGroup{display:flex;flex-direction:column;align-items:center;gap:${b(0.007)}px;margin-top:${b(0.004)}px}
.cta{align-self:center;padding:${b(0.017)}px ${b(0.04)}px;font-size:${b(0.03)}px;margin-top:0}
.cta-note{font-size:${b(0.021)}px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(244,242,236,.68)}
`, `<div class="post">
  <div class="eyebrow">Dein Gratis-Einstieg</div>
  <div class="bookwrap"><div class="bookglow"></div><img class="book" src="${ebookUri}"></div>
  <div class="h">Werde zum bewussten <em>Gestalter deiner Gedanken</em></div>
  <div class="ctaGroup">
    <div class="cta">E-Book gratis sichern ${ARROW}</div>
    <div class="cta-note">Link in Bio</div>
  </div>
</div>`);
};

// Instagram-Story / Key-Visual – Brain + Marke, orientierungsbewusst.
// Querformat = zweispaltig (Brain + Text), sonst zentrierte Säule.
const STORY_TEXT = `
    <div class="eyebrow">Bewusstsein · Mentale Selbstverteidigung · 7 Stufen</div>
    <div class="h">Werde Meister deiner<br><span class="g">Gedanken</span>.</div>
    <div class="sub">Raus aus fremden Mustern. Rein in dein eigenes Denken.</div>
    <div class="url">www.werdemeisterdeinergedanken.de</div>`;

const storyPost = (w, h) => {
  const land = w > h * 1.15;
  const base = Math.min(w, h);
  const b = (v) => Math.round(base * v);
  const brainSize = land
    ? Math.round(h * 0.66)
    : Math.round(base * (h > w * 1.4 ? 0.5 : h > w ? 0.44 : 0.36));
  const common = `
.eyebrow{font-size:${b(0.024)}px;letter-spacing:.16em}
.brainglow{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle, rgba(52,196,196,.32), transparent 66%);filter:blur(34px);width:${Math.round(brainSize*0.98)}px;height:${Math.round(brainSize*0.98)}px}
.brain{position:relative;width:${brainSize}px;height:${brainSize}px}
.h{font-family:Fraunces,serif;font-weight:600;color:#f4f2ec;font-size:${b(0.084)}px;line-height:1.06;letter-spacing:-.5px}
.h .g{background:linear-gradient(100deg,#f2d489,#e8c15f);-webkit-background-clip:text;background-clip:text;color:transparent}
.sub{font-size:${b(0.033)}px;line-height:1.42;color:rgba(244,242,236,.80)}
.url{font-size:${b(0.028)}px}`;

  if (land) {
    return shell(w, h, `${common}
.post{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:${Math.round(w*0.05)}px;padding:0 ${Math.round(w*0.08)}px}
.brainwrap{position:relative;flex:0 0 auto;display:flex;align-items:center;justify-content:center}
.col{display:flex;flex-direction:column;align-items:flex-start;text-align:left;gap:${b(0.036)}px;max-width:${Math.round(w*0.5)}px}
`, `<div class="post">
  <div class="brainwrap"><div class="brainglow"></div><img class="brain" src="${brainUrl}"></div>
  <div class="col">${STORY_TEXT}</div>
</div>`);
  }
  // Hoch-/Quadratformat: Brain oben, zentrierte Textsäule darunter
  return shell(w, h, `${common}
.post{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:${Math.round(h*0.06)}px ${Math.round(w*0.09)}px;gap:${b(0.045)}px}
.brainwrap{position:relative;display:flex;align-items:center;justify-content:center}
.col{display:flex;flex-direction:column;align-items:center;gap:${b(0.034)}px;max-width:96%}
`, `<div class="post">
  <div class="brainwrap"><div class="brainglow"></div><img class="brain" src="${brainUrl}"></div>
  <div class="col">${STORY_TEXT}</div>
</div>`);
};

// ---------- Inhalte ---------------------------------------------------------
const THUMBS = [
  { key: "01", eyebrow: "Mentale Selbstverteidigung",
    title: `Nicht jeder Gedanke<br>ist <em>von dir</em>.`,
    kicker: "Wie fremde Programme dein Denken steuern" },
  { key: "02", eyebrow: "Die 7 Stufen",
    title: `Raus aus dem<br><em>Autopilot</em>.`,
    kicker: "Dein Weg zu echter innerer Klarheit" },
  { key: "vorlage", eyebrow: "Bewusstsein · Klarheit",
    title: `Dein Titel<br>kommt <em>hierhin</em>.`,
    kicker: "Untertitel / Nutzenversprechen als Platzhalter" },
];

// QUOTES und FACTS werden aus ./content-data.mjs importiert (siehe oben).

const TARGETS = [];
// Avatare
TARGETS.push({ file: "profil/WMDG-Profilbild-Rund.png",   w: 1080, h: 1080, html: () => avatarRound(1080) });
TARGETS.push({ file: "profil/WMDG-Kanalbild-Quadrat.png", w: 1080, h: 1080, html: () => channelSquare(1080) });
TARGETS.push({ file: "messenger/WMDG-Messenger-Kanalbild.png", w: 1080, h: 1080, html: () => channelSquare(1080) });
// WhatsApp Business: rundes Profilbild (wird als Kreis angezeigt), quadratische
// Info-/Katalog-Kachel mit Wortmarke und ein Status-Banner im Hochformat (9:16).
TARGETS.push({ file: "whatsapp/WMDG-WhatsApp-Profilbild.png",  w: 1080, h: 1080, html: () => avatarRound(1080) });
TARGETS.push({ file: "whatsapp/WMDG-WhatsApp-Kanalbild.png",   w: 1080, h: 1080, html: () => channelSquare(1080) });
TARGETS.push({ file: "whatsapp/WMDG-WhatsApp-Status-9x16.png", w: 1080, h: 1920, html: () => storyPost(1080, 1920) });
// YouTube-Thumbnails
for (const d of THUMBS)
  TARGETS.push({ file: `youtube/thumbnails/WMDG-Thumbnail-${d.key}.png`, w: 1280, h: 720, html: () => thumbnail(1280, 720, d) });
// Zitat-Kacheln (1:1, 4:5 und 9:16 Story)
for (const q of QUOTES) {
  TARGETS.push({ file: `zitate/1x1/WMDG-Zitat-${q.key}.png`,  w: 1080, h: 1080, html: () => quoteTile(1080, 1080, q.t) });
  TARGETS.push({ file: `zitate/4x5/WMDG-Zitat-${q.key}.png`,  w: 1080, h: 1350, html: () => quoteTile(1080, 1350, q.t) });
  TARGETS.push({ file: `zitate/9x16/WMDG-Zitat-${q.key}.png`, w: 1080, h: 1920, html: () => quoteTile(1080, 1920, q.t) });
}
// Studien-Fakten-Kacheln (1:1, 4:5 und 9:16 Story)
for (const f of FACTS) {
  TARGETS.push({ file: `zitate/studien-1x1/WMDG-Studienfakt-${f.key}.png`,  w: 1080, h: 1080, html: () => factTile(1080, 1080, f) });
  TARGETS.push({ file: `zitate/studien-4x5/WMDG-Studienfakt-${f.key}.png`,  w: 1080, h: 1350, html: () => factTile(1080, 1350, f) });
  TARGETS.push({ file: `zitate/studien-9x16/WMDG-Studienfakt-${f.key}.png`, w: 1080, h: 1920, html: () => factTile(1080, 1920, f) });
}
// Gratis-E-Book – Einzelpost in 5 Formaten (wie die Cover)
const EBOOK_FORMATS = [
  { key: "9x16", w: 1080, h: 1920 }, // Reel / Story
  { key: "4x5",  w: 1080, h: 1350 }, // Feed hoch
  { key: "1x1",  w: 1080, h: 1080 }, // Feed quadratisch
  { key: "16x9", w: 1920, h: 1080 }, // YouTube / Querformat
  { key: "2x3",  w: 1000, h: 1500 }, // Pinterest
];
for (const F of EBOOK_FORMATS)
  TARGETS.push({ file: `ebook/WMDG-Ebook-${F.key}.png`, w: F.w, h: F.h, html: () => ebookPost(F.w, F.h) });
// Instagram-Story / Key-Visual – dieselben 5 Formate wie das E-Book
for (const F of EBOOK_FORMATS)
  TARGETS.push({ file: `instagram/WMDG-Instagram-Story-${F.key}.png`, w: F.w, h: F.h, html: () => storyPost(F.w, F.h) });

// ---------- Render ----------------------------------------------------------
const require = createRequire(import.meta.url);
function findChrome(){
  if(process.env.CHROME_BIN && existsSync(process.env.CHROME_BIN)) return process.env.CHROME_BIN;
  try{ const p=require("playwright").chromium.executablePath(); if(p && existsSync(p)) return p; }catch{}
  for(const r of [process.env.PLAYWRIGHT_BROWSERS_PATH,"/opt/pw-browsers"].filter(Boolean)){
    try{ for(const d of readdirSync(r)){ if(d.startsWith("chromium")){ const p=join(r,d,"chrome-linux/chrome"); if(existsSync(p)) return p; } } }catch{}
  }
  throw new Error("Kein Chromium/Chrome gefunden. Führe aus:  npx playwright install chromium");
}
const { chromium } = require("playwright");
// Optional nur eine Teilmenge rendern:  ONLY=instagram node docs/marketing/brand-assets.mjs
const only = process.env.ONLY;
const targets = only ? TARGETS.filter((t) => t.file.includes(only)) : TARGETS;
// Optional: SCALE=2 node docs/marketing/brand-assets.mjs → doppelte Auflösung.
// Damit werden die textlastigen Zitat-/Faktengrafiken z. B. 2160×2700 statt
// 1080×1350 gerendert – erst so haben die Downloads echte Schärfereserve
// (passt zu FULL_WIDTH=2160 in tools/vorlagen/build-gallery.mjs).
const SCALE = Number(process.env.SCALE || "1") || 1;
const browser = await chromium.launch({ executablePath: findChrome() });
for (const t of targets){
  const page = await browser.newPage({ viewport:{ width:t.w, height:t.h }, deviceScaleFactor: SCALE });
  const tmp = join(HERE, `.tmp-asset.html`);
  writeFileSync(tmp, t.html());
  await page.goto(pathToFileURL(tmp).href, { waitUntil:"networkidle" });
  mkdirSync(join(HERE, dirname(t.file)), { recursive:true });
  await page.screenshot({ path: join(HERE, t.file) });
  await page.close(); rmSync(tmp,{force:true});
  console.log("✓", t.file, `${t.w * SCALE}×${t.h * SCALE}`);
}
await browser.close();
