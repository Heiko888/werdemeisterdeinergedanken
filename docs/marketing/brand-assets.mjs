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
// Zwei Emblem-Farbwelten: Gold (Standard „dunkel") und Türkis (Variante).
const brainGoldUrl = pathToFileURL(join(ROOT, "public/logo-brain-gold.png")).href;
const brainTealUrl = pathToFileURL(join(ROOT, "public/logo-brain-tuerkis.png")).href;
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
  radial-gradient(52% 110% at 86% 10%, rgba(233,193,95,.20), transparent 60%),
  radial-gradient(46% 110% at 6% 96%, rgba(168,132,42,.10), transparent 60%),
  radial-gradient(42% 90% at 74% 92%, rgba(217,169,58,.12), transparent 60%),
  #090b10;}`;
// Helle Creme-Fläche – 1:1 wie der Website-Header (.bg-paper-aura).
const BG_HELL = `
.bg{position:absolute;inset:0;background:
  radial-gradient(78% 62% at 50% -10%, rgba(232,193,95,.26), transparent 62%),
  radial-gradient(60% 55% at 96% 4%, rgba(242,212,137,.12), transparent 60%),
  radial-gradient(58% 52% at 4% 108%, rgba(217,169,58,.13), transparent 60%),
  #f6f4ee;
  box-shadow:inset 0 26px 44px -34px rgba(8,16,42,.22);}`;
// Türkis-Variante: dunkler Navy-Grund wie „dunkel", aber führender Teal-Schimmer
// (statt Gold). Passt zum Türkis-Emblem (public/logo-brain.png).
const BG_TUERKIS = `
.bg{position:absolute;inset:0;background:
  radial-gradient(54% 112% at 84% 8%, rgba(52,196,196,.24), transparent 60%),
  radial-gradient(48% 110% at 6% 96%, rgba(33,178,189,.14), transparent 60%),
  radial-gradient(44% 92% at 74% 94%, rgba(140,198,63,.12), transparent 60%),
  #090b10;}`;
// Creme-Grund mit Teal-Schimmer (für „tuerkis-hell": helle Fläche + Türkis-Emblem).
const BG_HELL_TEAL = `
.bg{position:absolute;inset:0;background:
  radial-gradient(78% 62% at 50% -10%, rgba(52,196,196,.20), transparent 62%),
  radial-gradient(60% 55% at 96% 4%, rgba(140,198,63,.12), transparent 60%),
  radial-gradient(58% 52% at 4% 108%, rgba(33,178,189,.12), transparent 60%),
  #f6f4ee;
  box-shadow:inset 0 26px 44px -34px rgba(8,16,42,.22);}`;

/**
 * Farb-Palette – zwei Achsen: Grund (hell=Creme / dunkel=Navy) × Akzent
 * (teal=Türkis-Emblem+Grün→Teal / gold). Vier Themes:
 *   dunkel (gold+navy, Standard), hell (gold+creme, -hell),
 *   tuerkis (teal+navy, -tuerkis), tuerkis-hell (teal+creme, -tuerkis-hell).
 */
function palette(theme) {
  const hell = theme === "hell" || theme === "tuerkis-hell";
  const teal = theme === "tuerkis" || theme === "tuerkis-hell";
  return {
    theme, hell, teal,
    bg: teal ? (hell ? BG_HELL_TEAL : BG_TUERKIS) : (hell ? BG_HELL : BG),
    // Emblem je Welt: Gold-Front-Emblem für die Gold-Welten (dunkel + hell/Creme),
    // buntes Seitenansicht-Gehirn für die Türkis-Welten.
    brainUrl: theme === "tuerkis" || theme === "tuerkis-hell" ? brainTealUrl : brainGoldUrl,
    // rgb-Tripel für radiale Glows/Auren (Gold vs. Teal)
    glow: teal ? "52,196,196" : "233,193,95",
    // Akzent-Verlauf für Schlüsselwörter (<em>/<span>) – teal auf Hell tiefer (AA)
    accentGrad: teal
      ? (hell ? "linear-gradient(100deg,#8cc63f,#0f766e)" : "linear-gradient(100deg,#a3d64f,#21b2bd)")
      : (hell ? "linear-gradient(100deg,#e0a92e,#8a5e05)" : "linear-gradient(100deg,#f2d489,#e8c15f)"),
    wmGrad: teal
      ? (hell ? "linear-gradient(100deg,#8cc63f,#0f766e)" : "linear-gradient(100deg,#a3d64f,#21b2bd)")
      : (hell ? "linear-gradient(100deg,#e0a92e,#8a5e05)" : "linear-gradient(100deg,#f2d489,#d9a93a)"),
    eyebrow: teal ? (hell ? "#0f766e" : "#5fd6d2") : (hell ? "#8a6608" : "#f2d489"),
    url: teal ? (hell ? "#0f766e" : "#5fd6d2") : (hell ? "#8a6608" : "#e8c15f"),
    // E-Book-CTA + Häkchen
    ctaBg: teal
      ? "linear-gradient(100deg,#199aa8,#0f766e)"
      : (hell ? "linear-gradient(100deg,#c79a2f,#7e6410)" : "linear-gradient(100deg,#f2d489,#e8c15f)"),
    ctaFg: teal ? (hell ? "#f4faf9" : "#f4f2ec") : (hell ? "#fdfaf1" : "#241a06"),
    ckBg: teal ? (hell ? "rgba(15,118,110,.16)" : "rgba(52,196,196,.18)") : (hell ? "rgba(168,132,42,.20)" : "rgba(232,193,95,.16)"),
    ckCol: teal ? (hell ? "#0f766e" : "#5fd6d2") : (hell ? "#7e6410" : "#e8c15f"),
    // feine Deko-Linie / Fuß-Tick
    tick: teal ? (hell ? "rgba(15,118,110,.85)" : "rgba(95,214,210,.85)") : (hell ? "rgba(168,132,42,.85)" : "rgba(242,212,137,.85)"),
    // Ring ums runde Profilbild
    ring: teal ? (hell ? "15,118,110,.38" : "52,196,196,.30") : (hell ? "168,132,42,.38" : "233,193,95,.18"),
  };
}

// P = palette(theme). hell=true → Creme; teal → Türkis; sonst Gold/dunkel.
const shell = (w, h, extra, body, P) => `<!doctype html><html><head><meta charset="utf8">
<link rel="stylesheet" href="${fontsUrl}"><style>
*{margin:0;box-sizing:border-box}
body{width:${w}px;height:${h}px;overflow:hidden;font-family:Inter,sans-serif;position:relative;background:${P.hell ? "#f6f4ee" : "#090b10"}}
${P.bg}
.brain{position:relative;object-fit:contain;filter:drop-shadow(0 10px 60px rgba(${P.glow},.6))}
.glow{position:absolute;border-radius:50%;background:radial-gradient(circle, rgba(${P.glow},${P.hell ? ".48" : ".55"}), transparent 66%);filter:blur(44px)}
.wordmark{font-weight:800;text-transform:uppercase;color:${P.hell ? "rgba(22,35,31,.92)" : "rgba(244,242,236,.92)"}}
.wordmark span{background:${P.accentGrad};-webkit-background-clip:text;background-clip:text;color:transparent}
.url{font-weight:700;color:${P.url};letter-spacing:.3px}
.eyebrow{font-weight:700;letter-spacing:4px;text-transform:uppercase;color:${P.eyebrow}}
${extra}
</style></head><body><div class="bg"></div>${body}</body></html>`;

// ---------- Layouts ---------------------------------------------------------

// Rundes Profilbild – Icon zentriert, komplett kreis-sicher (kein Text am Rand)
const avatarRound = (w, P) => {
  const ringGlow = `
.ring{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:${Math.round(w*0.84)}px;height:${Math.round(w*0.84)}px;border-radius:50%;border:1px solid rgba(${P.ring})}
.glow{left:50%;top:50%;transform:translate(-50%,-50%);width:${Math.round(w*0.62)}px;height:${Math.round(w*0.62)}px}`;
  // Alle Welten: Emblem + kompakte Wortmarke wie im Header (kreis-sicher zentriert).
  return shell(w, w, `${ringGlow}
.stack{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${Math.round(w*0.03)}px;text-align:center;padding:0 ${Math.round(w*0.1)}px}
.brain{width:${Math.round(w*0.46)}px;height:auto}
.wm1{font-family:Fraunces,serif;font-weight:500;text-transform:uppercase;letter-spacing:.08em;color:${P.hell ? "#16231f" : "#f4f2ec"};font-size:${Math.round(w*0.06)}px;line-height:1}
.wm1 span{background:${P.accentGrad};-webkit-background-clip:text;background-clip:text;color:transparent}
.wm2{display:flex;align-items:center;justify-content:center;gap:${Math.round(w*0.012)}px;font-family:Fraunces,serif;font-weight:400;text-transform:uppercase;letter-spacing:.22em;color:${P.hell ? "rgba(22,35,31,.72)" : "rgba(244,242,236,.75)"};font-size:${Math.round(w*0.026)}px;line-height:1}
.wm2 i{display:block;height:1px;width:${Math.round(w*0.03)}px;background:${P.tick}}
`, `<div class="ring"></div><div class="glow"></div>
  <div class="stack"><img class="brain" src="${P.brainUrl}">
    <div class="wm1">Werde <span>Meister</span></div>
    <div class="wm2"><i></i>Deiner Gedanken<i></i></div>
  </div>`, P);
};

// Nur das leuchtende Gehirn auf TRANSPARENTEM Grund – zum Überlagern über ein
// eigenes/persönliches Bild. Wird mit screenshot({omitBackground:true}) gerendert.
const brainTransparent = (w, P) => `<!doctype html><html><head><meta charset="utf8">
<link rel="stylesheet" href="${fontsUrl}"><style>
*{margin:0;box-sizing:border-box}
body{width:${w}px;height:${w}px;overflow:hidden;position:relative;background:transparent}
.wrap{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
.glow{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:${Math.round(w*0.78)}px;height:${Math.round(w*0.78)}px;border-radius:50%;background:radial-gradient(circle, rgba(${P.glow},.42), transparent 66%);filter:blur(50px)}
.brain{position:relative;width:${Math.round(w*0.72)}px;height:auto;object-fit:contain;filter:drop-shadow(0 10px 46px rgba(${P.glow},.55))}
</style></head><body>
<div class="wrap"><div class="glow"></div><img class="brain" src="${P.brainUrl}"></div>
</body></html>`;

// Quadratisches Kanalbild mit Wortmarke (Telegram/WhatsApp-Kanal, App-Kachel).
// Trägt das echte Schriftlogo-Lockup wie im Website-Header: „WERDE MEISTER“
// (Fraunces, „Meister“ in Gold) über „— DEINER GEDANKEN —“ mit Flankier-Strichen.
const channelSquare = (w, P) => shell(w, w, `
.stack{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${Math.round(w*0.038)}px;text-align:center;padding:0 ${Math.round(w*0.08)}px}
.glow{left:50%;top:38%;transform:translate(-50%,-50%);width:${Math.round(w*0.5)}px;height:${Math.round(w*0.5)}px}
.brain{width:${Math.round(w*0.42)}px;height:auto}
.wm1{font-family:Fraunces,serif;font-weight:500;text-transform:uppercase;letter-spacing:.07em;color:${P.hell ? "#16231f" : "#f4f2ec"};font-size:${Math.round(w*0.082)}px;line-height:1.06;margin-top:${Math.round(w*0.01)}px}
.wm1 span{background:${P.accentGrad};-webkit-background-clip:text;background-clip:text;color:transparent}
.wm2{display:flex;align-items:center;justify-content:center;gap:${Math.round(w*0.016)}px;font-family:Fraunces,serif;font-weight:400;text-transform:uppercase;letter-spacing:.24em;color:${P.hell ? "rgba(22,35,31,.72)" : "rgba(244,242,236,.75)"};font-size:${Math.round(w*0.034)}px;line-height:1}
.wm2 i{display:block;height:1px;width:${Math.round(w*0.05)}px;background:${P.tick}}
.url{font-size:${Math.round(w*0.03)}px;margin-top:${Math.round(w*0.02)}px}
`, `<div class="stack">
  <img class="brain" src="${P.brainUrl}">
  <div class="wm1">Werde <span>Meister</span></div>
  <div class="wm2"><i></i>Deiner Gedanken<i></i></div>
  <div class="url">www.werdemeisterdeinergedanken.de</div>
</div>`, P);

// Quadratisches Profilbild NUR Emblem (ohne Schriftzug) – lebendige Fläche mit
// warmem Kern-Verlauf, Sheen, Eck-Vignette, feinem Innenrahmen und Aura hinter
// dem Gehirn (gleiche Bildsprache wie das runde Emblem-Profilbild).
const avatarSquarePlain = (w, P, opts = {}) => {
  const hell = P.hell;
  const discBase = hell
    ? "radial-gradient(circle at 50% 42%, #faf7f0 0%, #f2ecdd 55%, #e7dfcc 100%)"
    : "radial-gradient(circle at 50% 42%, #141821 0%, #0c0e13 58%, #060710 100%)";
  const sheen = hell ? "rgba(255,255,255,.7)" : "rgba(255,255,255,.10)";
  const edgeShadow = P.teal
    ? (hell ? "rgba(10,66,76,.26)" : "rgba(0,0,0,.62)")
    : (hell ? "rgba(120,86,14,.26)" : "rgba(0,0,0,.62)");
  return `<!doctype html><html><head><meta charset="utf8">
<link rel="stylesheet" href="${fontsUrl}"><style>
*{margin:0;box-sizing:border-box}
body{width:${w}px;height:${w}px;overflow:hidden;position:relative;background:${hell ? "#f6f4ee" : "#090b10"}}
.disc{position:absolute;inset:0;
  background:
    radial-gradient(circle at 50% 47%, rgba(${P.glow},${hell ? ".52" : ".62"}), transparent 42%),
    radial-gradient(circle at 50% 47%, rgba(${P.glow},${hell ? ".26" : ".34"}), transparent 66%),
    radial-gradient(circle at 30% 20%, ${sheen}, transparent 44%),
    ${discBase};
  box-shadow:inset 0 6px 30px ${sheen}, inset 0 -70px 130px -30px ${edgeShadow}, inset 0 0 ${Math.round(w*0.13)}px -${Math.round(w*0.01)}px ${edgeShadow}}
.frame{position:absolute;inset:${Math.round(w*0.045)}px;border-radius:${Math.round(w*0.06)}px;border:2px solid rgba(${P.ring});box-shadow:0 0 ${Math.round(w*0.03)}px rgba(${P.glow},${hell ? ".22" : ".34"}), inset 0 0 ${Math.round(w*0.02)}px rgba(${P.glow},${hell ? ".14" : ".20"})}
.aura{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:${Math.round(w*0.8)}px;height:${Math.round(w*0.8)}px;border-radius:50%;background:radial-gradient(circle, rgba(${P.glow},${hell ? ".5" : ".62"}), transparent 66%);filter:blur(44px)}
.core{position:absolute;left:50%;top:49%;transform:translate(-50%,-50%);width:${Math.round(w*0.52)}px;height:${Math.round(w*0.52)}px;border-radius:50%;background:radial-gradient(circle, rgba(${P.glow},${hell ? ".4" : ".48"}), transparent 60%);filter:blur(22px)}
.center{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
.brain{width:${Math.round(w*0.6)}px;height:auto;object-fit:contain;filter:drop-shadow(0 14px 50px rgba(${P.glow},.65)) drop-shadow(0 2px 6px rgba(0,0,0,${hell ? ".2" : ".42"}))}
</style></head><body>
<div class="disc"></div>${opts.noFrame ? "" : '<div class="frame"></div>'}
<div class="aura"></div><div class="core"></div>
<div class="center"><img class="brain" src="${P.brainUrl}"></div>
</body></html>`;
};

// Rundes Profilbild NUR Emblem (ohne Schriftzug) – runde Scheibe mit feinem
// Ring, mittig das Gehirn. Der Grund liegt als Kreis (border-radius:50%), die
// Ecken sind weiß – so wirkt es als eigenständige runde Grafik und wird von
// allen Plattformen sauber kreisförmig beschnitten.
const avatarRoundPlain = (w, P, opts = {}) => {
  const hell = P.hell;
  // Lebendige Scheibe: warmer Kern-Verlauf, diagonaler Sheen, Rand-Vignette und
  // Rim-Light per inset-Schatten – so wirkt das Medaillon plastisch statt flach.
  const discBase = hell
    ? "radial-gradient(circle at 50% 40%, #faf7f0 0%, #f2ecdd 55%, #e7dfcc 100%)"
    : "radial-gradient(circle at 50% 40%, #141821 0%, #0c0e13 58%, #060710 100%)";
  const sheen = hell ? "rgba(255,255,255,.7)" : "rgba(255,255,255,.10)";
  const edgeShadow = P.teal
    ? (hell ? "rgba(10,66,76,.26)" : "rgba(0,0,0,.62)")
    : (hell ? "rgba(120,86,14,.26)" : "rgba(0,0,0,.62)");
  return `<!doctype html><html><head><meta charset="utf8">
<link rel="stylesheet" href="${fontsUrl}"><style>
*{margin:0;box-sizing:border-box}
body{width:${w}px;height:${w}px;overflow:hidden;position:relative;background:#ffffff}
.disc{position:absolute;inset:0;border-radius:50%;
  background:
    radial-gradient(circle at 50% 47%, rgba(${P.glow},${hell ? ".52" : ".62"}), transparent 40%),
    radial-gradient(circle at 50% 47%, rgba(${P.glow},${hell ? ".26" : ".34"}), transparent 64%),
    radial-gradient(circle at 32% 22%, ${sheen}, transparent 42%),
    ${discBase};
  box-shadow:inset 0 4px 26px ${sheen}, inset 0 -54px 100px -20px ${edgeShadow}, inset 0 0 0 1px rgba(${P.glow},${hell ? ".20" : ".24"})}
.ring{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:${Math.round(w*0.955)}px;height:${Math.round(w*0.955)}px;border-radius:50%;border:2px solid rgba(${P.ring});box-shadow:0 0 ${Math.round(w*0.03)}px rgba(${P.glow},${hell ? ".30" : ".44"}), inset 0 0 ${Math.round(w*0.018)}px rgba(${P.glow},${hell ? ".18" : ".26"})}
.ring2{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:${Math.round(w*0.86)}px;height:${Math.round(w*0.86)}px;border-radius:50%;border:1px solid rgba(${P.glow},${hell ? ".18" : ".22"})}
.aura{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:${Math.round(w*0.8)}px;height:${Math.round(w*0.8)}px;border-radius:50%;background:radial-gradient(circle, rgba(${P.glow},${hell ? ".5" : ".62"}), transparent 66%);filter:blur(42px)}
.core{position:absolute;left:50%;top:48%;transform:translate(-50%,-50%);width:${Math.round(w*0.5)}px;height:${Math.round(w*0.5)}px;border-radius:50%;background:radial-gradient(circle, rgba(${P.glow},${hell ? ".4" : ".48"}), transparent 60%);filter:blur(22px)}
.center{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
.brain{width:${Math.round(w*0.56)}px;height:auto;object-fit:contain;filter:drop-shadow(0 14px 50px rgba(${P.glow},.65)) drop-shadow(0 2px 6px rgba(0,0,0,${hell ? ".2" : ".42"}))}
</style></head><body>
<div class="disc"></div>${opts.noRing ? "" : '<div class="ring2"></div><div class="ring"></div>'}
<div class="aura"></div><div class="core"></div>
<div class="center"><img class="brain" src="${P.brainUrl}"></div>
</body></html>`;
};

// YouTube-Video-Thumbnail 16:9 – klickstark, großer Titel + Akzentwort
const thumbnail = (w, h, data, P) => shell(w, h, `
.wrap{position:absolute;left:64px;top:50%;transform:translateY(-50%);width:${w-640}px}
.eyebrow{font-size:23px;margin-bottom:20px}
.title{font-family:Fraunces,serif;font-weight:600;color:${P.hell ? "#16231f" : "#f4f2ec"};font-size:62px;line-height:1.06;letter-spacing:-.5px}
.title em{background:${P.accentGrad};-webkit-background-clip:text;background-clip:text;color:transparent;font-style:italic}
.kicker{margin-top:24px;font-size:24px;font-weight:700;color:${P.hell ? "rgba(22,35,31,.72)" : "rgba(244,242,236,.72)"};line-height:1.3}
.glow{right:100px;top:50%;transform:translateY(-50%);width:${Math.round(h*0.6)}px;height:${Math.round(h*0.6)}px}
.brain{position:absolute;right:120px;top:50%;transform:translateY(-50%);width:${Math.round(h*0.6)}px;height:${Math.round(h*0.6)}px}
`, `<div class="wrap">
  <div class="eyebrow">${data.eyebrow}</div>
  <div class="title">${data.title}</div>
  <div class="kicker">${data.kicker}</div>
</div>
<div class="glow"></div><img class="brain" src="${P.brainUrl}">`, P);

// Zitat-Kachel – großer Serifensatz, Marke als dezente Signatur unten.
// Designcode: ein Wort im Zitat trägt den Grün-Türkis-Verlauf (<em>) und ist
// die visuelle Pointe. Großes, sehr transparentes Anführungszeichen hinter dem
// Text; weiche Tiefe im Hintergrund (Glow, keine konkreten Motive).
// hell=true → Creme-Theme (dunkle Tinte-Schrift, Akzent in tiefem Gold #7e6410).
const quoteTile = (w, h, q, P) => shell(w, h, `
.aura{position:absolute;left:50%;top:47%;transform:translate(-50%,-50%);width:${Math.round(w*0.95)}px;height:${Math.round(w*0.95)}px;border-radius:50%;background:radial-gradient(circle, rgba(${P.glow},${P.hell ? ".16" : ".10"}), rgba(${P.glow},0) 66%);filter:blur(46px)}
.qstars{display:none}
.qmark{position:absolute;left:50%;top:${Math.round(h*0.35)}px;transform:translate(-50%,-50%);font-family:Fraunces,serif;font-weight:600;font-size:${Math.round(w*0.6)}px;line-height:.62;color:${P.hell ? "rgba(126,100,16,.10)" : P.teal ? "rgba(95,214,210,.10)" : "rgba(242,212,137,.095)"};pointer-events:none}
.qwrap{position:absolute;left:50%;top:47%;transform:translate(-50%,-50%);width:${w-Math.round(w*0.3)}px;text-align:center}
.quote{font-family:Fraunces,serif;font-weight:500;color:${P.hell ? "#16231f" : "#f4f2ec"};font-size:${Math.round(w*0.067)}px;line-height:1.32;letter-spacing:-.3px}
.quote em{font-style:italic;font-weight:600;font-size:1.07em;background:${P.accentGrad};-webkit-background-clip:text;background-clip:text;color:transparent}
.foot{position:absolute;left:0;right:0;bottom:${Math.round(w*0.072)}px;display:flex;align-items:center;justify-content:center;gap:${Math.round(w*0.016)}px}
.foot img{width:${Math.round(w*0.052)}px;height:${Math.round(w*0.052)}px;object-fit:contain}
.foot .wm{display:flex;flex-direction:column;gap:${Math.round(w*0.006)}px;line-height:1;text-align:left}
.foot .wm1{font-family:Fraunces,serif;font-weight:400;font-size:${Math.round(w*0.028)}px;letter-spacing:.1em;text-transform:uppercase;color:${P.hell ? "rgba(22,35,31,.92)" : "rgba(244,242,236,.92)"}}
.foot .wm1 em{font-style:normal;background:${P.wmGrad};-webkit-background-clip:text;background-clip:text;color:transparent}
.foot .wm2{display:flex;align-items:center;gap:${Math.round(w*0.008)}px;font-family:Fraunces,serif;font-weight:400;font-size:${Math.round(w*0.0145)}px;letter-spacing:.22em;text-transform:uppercase;color:${P.hell ? "rgba(22,35,31,.72)" : "rgba(244,242,236,.72)"}}
.foot .wm2 i{display:block;height:1px;width:${Math.round(w*0.022)}px;background:${P.tick}}
`, `<div class="aura"></div><div class="qstars"></div><div class="qmark">„</div>
<div class="qwrap"><div class="quote">${q}</div></div>
<div class="foot"><img src="${P.brainUrl}"><div class="wm"><span class="wm1">Werde <em>Meister</em></span><span class="wm2"><i></i>Deiner Gedanken<i></i></span></div></div>`, P);

// Studien-Fakt-Kachel – gleiches Serien-Template wie die Zitate (Verlauf,
// Serifenschrift, Grün-Türkis-Schlüsselwort als Pointe, Signatur unten),
// nur mit Eyebrow + Quellenzeile statt Anführungszeichen.
// hell=true → Creme-Theme (dunkle Tinte-Schrift, Akzent in tiefem Gold #7e6410).
const factTile = (w, h, f, P) => shell(w, h, `
.aura{position:absolute;left:50%;top:46%;transform:translate(-50%,-50%);width:${Math.round(w*0.95)}px;height:${Math.round(w*0.95)}px;border-radius:50%;background:radial-gradient(circle, rgba(${P.glow},${P.hell ? ".16" : ".10"}), rgba(${P.glow},0) 66%);filter:blur(46px)}
.qstars{display:none}
.fwrap{position:absolute;left:50%;top:46%;transform:translate(-50%,-50%);width:${w-Math.round(w*0.24)}px;text-align:center}
.eyebrow{font-size:${Math.round(w*0.024)}px;letter-spacing:.22em;margin-bottom:${Math.round(w*0.045)}px}
.fact{font-family:Fraunces,serif;font-weight:500;color:${P.hell ? "#16231f" : "#f4f2ec"};font-size:${Math.round(w*0.064)}px;line-height:1.3;letter-spacing:-.3px}
.fact em{font-style:italic;font-weight:600;font-size:1.07em;background:${P.accentGrad};-webkit-background-clip:text;background-clip:text;color:transparent}
.src{margin-top:${Math.round(w*0.045)}px;font-size:${Math.round(w*0.026)}px;line-height:1.4;color:${P.hell ? "rgba(22,35,31,.6)" : "rgba(244,242,236,.55)"}}
.src b{color:${P.hell ? "#7e6410" : P.teal ? "#5fd6d2" : "rgba(232,193,95,.9)"};font-weight:700}
.foot{position:absolute;left:0;right:0;bottom:${Math.round(w*0.072)}px;display:flex;align-items:center;justify-content:center;gap:${Math.round(w*0.016)}px}
.foot img{width:${Math.round(w*0.052)}px;height:${Math.round(w*0.052)}px;object-fit:contain}
.foot .wm{display:flex;flex-direction:column;gap:${Math.round(w*0.006)}px;line-height:1;text-align:left}
.foot .wm1{font-family:Fraunces,serif;font-weight:400;font-size:${Math.round(w*0.028)}px;letter-spacing:.1em;text-transform:uppercase;color:${P.hell ? "rgba(22,35,31,.92)" : "rgba(244,242,236,.92)"}}
.foot .wm1 em{font-style:normal;background:${P.wmGrad};-webkit-background-clip:text;background-clip:text;color:transparent}
.foot .wm2{display:flex;align-items:center;gap:${Math.round(w*0.008)}px;font-family:Fraunces,serif;font-weight:400;font-size:${Math.round(w*0.0145)}px;letter-spacing:.22em;text-transform:uppercase;color:${P.hell ? "rgba(22,35,31,.72)" : "rgba(244,242,236,.72)"}}
.foot .wm2 i{display:block;height:1px;width:${Math.round(w*0.022)}px;background:${P.tick}}
`, `<div class="aura"></div><div class="qstars"></div>
<div class="fwrap">
  <div class="eyebrow">Studien-Fakt</div>
  <div class="fact">${f.t}</div>
  <div class="src"><b>Quelle:</b> ${f.src}</div>
</div>
<div class="foot"><img src="${P.brainUrl}"><div class="wm"><span class="wm1">Werde <em>Meister</em></span><span class="wm2"><i></i>Deiner Gedanken<i></i></span></div></div>`, P);

// Gratis-E-Book-Einzelpost – orientierungsbewusst (Querformat = zweispaltig),
// bewusst luftig. Schriftgrößen an der kürzeren Kante ausgerichtet.
// hell=true → Creme-Theme (dunkle Tinte-Schrift, Akzent/Buttons in tiefem Gold).
const ebookPost = (w, h, P) => {
  const hell = P.hell;
  const land = w > h * 1.15;            // deutlich breiter → Querformat
  const base = Math.min(w, h);
  const b = (v) => Math.round(base * v); // Schrift an kürzerer Kante
  // Farb-Tokens je Theme (türkis erbt die dunklen Grund-/Textwerte)
  const ink      = hell ? "#16231f" : "#f4f2ec";
  const accent   = P.accentGrad;
  const ctaBg    = P.ctaBg;
  const ctaFg    = P.ctaFg;
  const noteCol  = hell ? "rgba(22,35,31,.66)" : "rgba(244,242,236,.68)";
  const bulCol   = hell ? "rgba(22,35,31,.82)" : "rgba(244,242,236,.84)";
  const ckBg     = P.ckBg;
  const ckCol    = P.ckCol;
  const bookSh   = hell ? "0 22px 50px rgba(8,16,42,.28)" : "0 22px 50px rgba(0,0,0,.55)";
  const bookShSq = hell ? "0 24px 58px rgba(8,16,42,.30)" : "0 24px 58px rgba(0,0,0,.62)";

  // Quadratformat (1:1): Conversion-Post – kurzer Eyebrow, großes Cover als
  // Produkt, Headline, aktiver CTA + „Link in Bio" (keine URL).
  if (w === h) {
    const bookHsq = Math.round(h * 0.54);
    return shell(w, h, `
.post{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:${Math.round(h*0.045)}px ${Math.round(w*0.09)}px;gap:${b(0.03)}px}
.eyebrow{font-size:${b(0.026)}px;letter-spacing:.16em}
.bookwrap{position:relative;display:flex;justify-content:center}
.bookglow{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:${Math.round(bookHsq*0.82)}px;height:${Math.round(bookHsq*0.82)}px;border-radius:50%;background:radial-gradient(circle, rgba(${P.glow},.24), transparent 68%);filter:blur(44px)}
.book{position:relative;height:${bookHsq}px;width:auto;filter:drop-shadow(${bookShSq})}
.h{font-family:Fraunces,serif;font-weight:600;color:${ink};font-size:${b(0.06)}px;line-height:1.16;letter-spacing:-.5px;max-width:98%}
.h em{background:${accent};-webkit-background-clip:text;background-clip:text;color:transparent;font-style:italic}
.ctaGroup{display:flex;flex-direction:column;align-items:center;gap:${b(0.007)}px;margin-top:${b(0.006)}px}
.cta{padding:${b(0.019)}px ${b(0.042)}px;border-radius:999px;background:${ctaBg};color:${ctaFg};font-weight:800;font-size:${b(0.032)}px;letter-spacing:.01em}
.cta-note{font-size:${b(0.023)}px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${noteCol}}
`, `<div class="post">
  <div class="eyebrow">Dein Gratis-Einstieg</div>
  <div class="bookwrap"><div class="bookglow"></div><img class="book" src="${ebookUri}"></div>
  <div class="h">Werde zum bewussten <em>Gestalter deiner Gedanken</em></div>
  <div class="ctaGroup">
    <div class="cta">E-Book gratis sichern ${ARROW}</div>
    <div class="cta-note">Link in Bio</div>
  </div>
</div>`, P);
  }

  // Buch höhenbasiert dimensionieren → verlässlicher Rand oben/unten,
  // kein Überlaufen mehr (Mockup-Ratio h/w ≈ 1,37).
  const bookH = land ? Math.round(h * 0.66)
    : Math.round(h * (h > w * 1.4 ? 0.34 : h > w ? 0.35 : 0.40));
  const bookW = Math.round(bookH / 1.37);
  const common = `
.eyebrow{font-size:${b(0.026)}px;letter-spacing:.2em}
.bookglow{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:${Math.round(bookW*1.35)}px;height:${Math.round(bookW*1.35)}px;border-radius:50%;background:radial-gradient(circle, rgba(${P.glow},.24), transparent 68%);filter:blur(38px)}
.book{position:relative;width:auto;height:${bookH}px;filter:drop-shadow(${bookSh})}
.h{font-family:Fraunces,serif;font-weight:600;color:${ink};font-size:${b(0.062)}px;line-height:1.14;letter-spacing:-.5px}
.h em{background:${accent};-webkit-background-clip:text;background-clip:text;color:transparent;font-style:italic}
.bul{display:flex;flex-direction:column;gap:${b(0.022)}px}
.bul .li{display:flex;align-items:center;gap:${b(0.016)}px;font-size:${b(0.031)}px;color:${bulCol}}
.bul .ck{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:${b(0.042)}px;height:${b(0.042)}px;border-radius:50%;background:${ckBg};color:${ckCol};font-size:${b(0.024)}px;font-weight:800}
.cta{align-self:${land ? "flex-start" : "center"};padding:${b(0.024)}px ${b(0.05)}px;border-radius:999px;background:${ctaBg};color:${ctaFg};font-weight:800;font-size:${b(0.032)}px;letter-spacing:.02em}
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
.cta-note{font-size:${b(0.022)}px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${noteCol}}
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
</div>`, P);
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
.cta-note{font-size:${b(0.021)}px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${noteCol}}
`, `<div class="post">
  <div class="eyebrow">Dein Gratis-Einstieg</div>
  <div class="bookwrap"><div class="bookglow"></div><img class="book" src="${ebookUri}"></div>
  <div class="h">Werde zum bewussten <em>Gestalter deiner Gedanken</em></div>
  <div class="ctaGroup">
    <div class="cta">E-Book gratis sichern ${ARROW}</div>
    <div class="cta-note">Link in Bio</div>
  </div>
</div>`, P);
};

// Instagram-Story / Key-Visual – Brain + Marke, orientierungsbewusst.
// Querformat = zweispaltig (Brain + Text), sonst zentrierte Säule.
const STORY_TEXT = `
    <div class="eyebrow">Bewusstsein · Mentale Selbstverteidigung · 7 Stufen</div>
    <div class="h">Werde Meister deiner<br><span class="g">Gedanken</span>.</div>
    <div class="sub">Raus aus fremden Mustern. Rein in dein eigenes Denken.</div>
    <div class="url">www.werdemeisterdeinergedanken.de</div>`;

const storyPost = (w, h, P) => {
  const hell = P.hell;
  const land = w > h * 1.15;
  const base = Math.min(w, h);
  const b = (v) => Math.round(base * v);
  const brainSize = land
    ? Math.round(h * 0.66)
    : Math.round(base * (h > w * 1.4 ? 0.5 : h > w ? 0.44 : 0.36));
  const common = `
.eyebrow{font-size:${b(0.024)}px;letter-spacing:.16em}
.brainglow{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle, rgba(${P.glow},${hell ? ".8" : ".6"}), transparent 66%);filter:blur(62px);width:${Math.round(brainSize*1.8)}px;height:${Math.round(brainSize*1.8)}px}
.brain{position:relative;width:${brainSize}px;height:${brainSize}px}
.h{font-family:Fraunces,serif;font-weight:600;color:${hell ? "#16231f" : "#f4f2ec"};font-size:${b(0.084)}px;line-height:1.06;letter-spacing:-.5px}
.h .g{background:${P.accentGrad};-webkit-background-clip:text;background-clip:text;color:transparent}
.sub{font-size:${b(0.033)}px;line-height:1.42;color:${hell ? "rgba(22,35,31,.80)" : "rgba(244,242,236,.80)"}}
.url{font-size:${b(0.028)}px}`;

  if (land) {
    return shell(w, h, `${common}
.post{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:${Math.round(w*0.05)}px;padding:0 ${Math.round(w*0.08)}px}
.brainwrap{position:relative;flex:0 0 auto;display:flex;align-items:center;justify-content:center}
.col{display:flex;flex-direction:column;align-items:flex-start;text-align:left;gap:${b(0.036)}px;max-width:${Math.round(w*0.5)}px}
`, `<div class="post">
  <div class="brainwrap"><div class="brainglow"></div><img class="brain" src="${P.brainUrl}"></div>
  <div class="col">${STORY_TEXT}</div>
</div>`, P);
  }
  // Hoch-/Quadratformat: Brain oben, zentrierte Textsäule darunter
  return shell(w, h, `${common}
.post{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:${Math.round(h*0.06)}px ${Math.round(w*0.09)}px;gap:${b(0.045)}px}
.brainwrap{position:relative;display:flex;align-items:center;justify-content:center}
.col{display:flex;flex-direction:column;align-items:center;gap:${b(0.034)}px;max-width:96%}
`, `<div class="post">
  <div class="brainwrap"><div class="brainglow"></div><img class="brain" src="${P.brainUrl}"></div>
  <div class="col">${STORY_TEXT}</div>
</div>`, P);
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
  // Die 7 Stufen – Stufe 2–7 (Woche 2–7 im Redaktionsplan). Stufe 1 ist "02".
  { key: "stufe-2", eyebrow: "Die 7 Stufen · Stufe 2",
    title: `Wer hört zu,<br>wenn du <em>denkst</em>?`,
    kicker: "Stufe 2: Der Moment des Erwachens" },
  { key: "stufe-3", eyebrow: "Die 7 Stufen · Stufe 3",
    title: `Dein Kopf hält Gedanken<br>für <em>Fakten</em>.`,
    kicker: "Stufe 3: Selbstbeobachtung" },
  { key: "stufe-4", eyebrow: "Die 7 Stufen · Stufe 4",
    title: `Wie lang dauert<br>ein <em>Gefühl</em> wirklich?`,
    kicker: "Stufe 4: Emotionale Reifung" },
  { key: "stufe-5", eyebrow: "Die 7 Stufen · Stufe 5",
    title: `Oft gedacht wird<br>zur <em>Straße</em> im Kopf.`,
    kicker: "Stufe 5: Schöpferkraft" },
  { key: "stufe-6", eyebrow: "Die 7 Stufen · Stufe 6",
    title: `Guter Diener,<br>schlechter <em>Chef</em>.`,
    kicker: "Stufe 6: Innere Ausrichtung" },
  { key: "stufe-7", eyebrow: "Die 7 Stufen · Stufe 7",
    title: `Niemand ist für<br>immer <em>Meister</em>.`,
    kicker: "Stufe 7: Meisterschaft" },
  // Block B – Praxis & Wissenschaft (Wochen 8–10)
  { key: "atmung", eyebrow: "Praxis & Wissenschaft",
    title: `Zwei Schalter fürs<br><em>Nervensystem</em>.`,
    kicker: "Atmung, die dich runterfährt" },
  { key: "meditation", eyebrow: "Praxis & Wissenschaft",
    title: `Was Meditation im<br><em>Gehirn</em> verändert.`,
    kicker: "Acht Wochen, messbar im Hippocampus" },
  { key: "placebo", eyebrow: "Praxis & Wissenschaft",
    title: `Erwartung wirkt –<br><em>körperlich</em>.`,
    kicker: "Der Placebo-Effekt, ehrlich erklärt" },
  // Block C – Mentale Selbstverteidigung (Wochen 11–26)
  { key: "framing", eyebrow: "Mentale Selbstverteidigung",
    title: `Ein <em>Wort</em><br>ändert alles.`, kicker: "Framing erkennen" },
  { key: "algorithmen", eyebrow: "Mentale Selbstverteidigung",
    title: `Dein Feed ist<br>nicht die <em>Welt</em>.`, kicker: "Filterblase & Algorithmen" },
  { key: "wiederholung-wahrheit", eyebrow: "Mentale Selbstverteidigung",
    title: `Oft gehört<br>ist nicht <em>wahr</em>.`, kicker: "Der Wiederholungs-Effekt" },
  { key: "reizueberflutung", eyebrow: "Mentale Selbstverteidigung",
    title: `Dein Gehirn im<br><em>Daueralarm</em>.`, kicker: "Reizüberflutung" },
  { key: "werbung-und-mangel", eyebrow: "Mentale Selbstverteidigung",
    title: `Sie verkauft dir<br>den <em>Mangel</em>.`, kicker: "Werbung & künstlicher Mangel" },
  { key: "gruppendruck", eyebrow: "Mentale Selbstverteidigung",
    title: `Laut ist nicht<br><em>Mehrheit</em>.`, kicker: "Gruppendruck & Schweigespirale" },
  { key: "autoritaetshoerigkeit", eyebrow: "Mentale Selbstverteidigung",
    title: `Titel ist nicht<br><em>Wahrheit</em>.`, kicker: "Autoritätshörigkeit" },
  { key: "propaganda", eyebrow: "Mentale Selbstverteidigung",
    title: `Ohne eine einzige<br><em>Lüge</em>.`, kicker: "Propaganda erkennen" },
  { key: "kognitive-dissonanz", eyebrow: "Mentale Selbstverteidigung",
    title: `Warum du<br><em>wegschaust</em>.`, kicker: "Kognitive Dissonanz" },
  { key: "identitaet-und-meinung", eyebrow: "Mentale Selbstverteidigung",
    title: `Meinung – oder<br>hat sie <em>dich</em>?`, kicker: "Identität & Meinung" },
  { key: "sprache-und-etiketten", eyebrow: "Mentale Selbstverteidigung",
    title: `Ein Etikett beendet<br>das <em>Denken</em>.`, kicker: "Sprache & Etiketten" },
  { key: "medien-agenda", eyebrow: "Mentale Selbstverteidigung",
    title: `Nicht was –<br>sondern <em>worüber</em>.`, kicker: "Medien-Agenda" },
  { key: "angst-steuerung", eyebrow: "Mentale Selbstverteidigung",
    title: `Angst macht dich<br><em>lenkbar</em>.`, kicker: "Angst-Steuerung" },
  { key: "ablenkung", eyebrow: "Mentale Selbstverteidigung",
    title: `Keine Lüge.<br>Nur <em>Lärm</em>.`, kicker: "Ablenkung" },
  { key: "normalisierung", eyebrow: "Mentale Selbstverteidigung",
    title: `„War doch schon<br>immer <em>so</em>."`, kicker: "Normalisierung" },
  { key: "bildmacht", eyebrow: "Mentale Selbstverteidigung",
    title: `Ein Bild ist<br>kein <em>Beweis</em>.`, kicker: "Bildmacht" },
];

// QUOTES und FACTS werden aus ./content-data.mjs importiert (siehe oben).

const TARGETS = [];
// Avatare
TARGETS.push({ file: "profil/WMDG-Profilbild-Rund.png",   w: 1080, h: 1080, hell: true, html: (P) =>avatarRound(1080, P) });
TARGETS.push({ file: "profil/WMDG-Profilbild-Quadrat.png", w: 1080, h: 1080, hell: true, html: (P) =>avatarSquarePlain(1080, P) });
TARGETS.push({ file: "profil/WMDG-Profilbild-Rund-Emblem.png", w: 1080, h: 1080, hell: true, html: (P) =>avatarRoundPlain(1080, P) });
// Reine Gehirn-Icons OHNE Schrift/Logo UND OHNE Rahmen/Ringe – als Basis, um ein
// eigenes/persönliches Bild danebenzusetzen oder frei weiterzuverwenden.
TARGETS.push({ file: "profil/WMDG-Gehirn-Icon-Quadrat.png", w: 1080, h: 1080, hell: true, html: (P) =>avatarSquarePlain(1080, P, { noFrame: true }) });
TARGETS.push({ file: "profil/WMDG-Gehirn-Icon-Rund.png",    w: 1080, h: 1080, hell: true, html: (P) =>avatarRoundPlain(1080, P, { noRing: true }) });
// Gehirn freigestellt (transparenter Hintergrund) – Gold + Türkis. hell:false,
// da der Grund transparent ist; transparent:true schaltet omitBackground ein.
TARGETS.push({ file: "profil/WMDG-Gehirn-Transparent.png", w: 1600, h: 1600, hell: false, transparent: true, html: (P) =>brainTransparent(1600, P) });
TARGETS.push({ file: "profil/WMDG-Kanalbild-Quadrat.png", w: 1080, h: 1080, hell: true, html: (P) =>channelSquare(1080, P) });
TARGETS.push({ file: "messenger/WMDG-Messenger-Kanalbild.png", w: 1080, h: 1080, hell: true, html: (P) =>channelSquare(1080, P) });
// WhatsApp Business: rundes Profilbild (wird als Kreis angezeigt), quadratische
// Info-/Katalog-Kachel mit Wortmarke und ein Status-Banner im Hochformat (9:16).
TARGETS.push({ file: "whatsapp/WMDG-WhatsApp-Profilbild.png",  w: 1080, h: 1080, hell: true, html: (P) =>avatarRound(1080, P) });
TARGETS.push({ file: "whatsapp/WMDG-WhatsApp-Kanalbild.png",   w: 1080, h: 1080, hell: true, html: (P) =>channelSquare(1080, P) });
TARGETS.push({ file: "whatsapp/WMDG-WhatsApp-Status-9x16.png", w: 1080, h: 1920, hell: true, html: (P) =>storyPost(1080, 1920, P) });
// YouTube-Thumbnails
for (const d of THUMBS)
  TARGETS.push({ file: `youtube/thumbnails/WMDG-Thumbnail-${d.key}.png`, w: 1280, h: 720, hell: true, html: (P) =>thumbnail(1280, 720, d, P) });
// Zitat-Kacheln (1:1, 4:5 und 9:16 Story)
for (const q of QUOTES) {
  TARGETS.push({ file: `zitate/1x1/WMDG-Zitat-${q.key}.png`,  w: 1080, h: 1080, hell: true, html: (P) =>quoteTile(1080, 1080, q.t, P) });
  TARGETS.push({ file: `zitate/4x5/WMDG-Zitat-${q.key}.png`,  w: 1080, h: 1350, hell: true, html: (P) =>quoteTile(1080, 1350, q.t, P) });
  TARGETS.push({ file: `zitate/9x16/WMDG-Zitat-${q.key}.png`, w: 1080, h: 1920, hell: true, html: (P) =>quoteTile(1080, 1920, q.t, P) });
}
// Studien-Fakten-Kacheln (1:1, 4:5 und 9:16 Story) – je dunkel + Creme (-hell.png).
for (const f of FACTS) {
  TARGETS.push({ file: `zitate/studien-1x1/WMDG-Studienfakt-${f.key}.png`,  w: 1080, h: 1080, hell: true, html: (P) =>factTile(1080, 1080, f, P) });
  TARGETS.push({ file: `zitate/studien-4x5/WMDG-Studienfakt-${f.key}.png`,  w: 1080, h: 1350, hell: true, html: (P) =>factTile(1080, 1350, f, P) });
  TARGETS.push({ file: `zitate/studien-9x16/WMDG-Studienfakt-${f.key}.png`, w: 1080, h: 1920, hell: true, html: (P) =>factTile(1080, 1920, f, P) });
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
  TARGETS.push({ file: `ebook/WMDG-Ebook-${F.key}.png`, w: F.w, h: F.h, hell: true, html: (P) =>ebookPost(F.w, F.h, P) });
// Instagram-Story / Key-Visual – dieselben 5 Formate wie das E-Book
for (const F of EBOOK_FORMATS)
  TARGETS.push({ file: `instagram/WMDG-Instagram-Story-${F.key}.png`, w: F.w, h: F.h, hell: true, html: (P) =>storyPost(F.w, F.h, P) });

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
// Datei-Suffix je Theme: dunkel = ohne Suffix (Standard), hell = -hell,
// tuerkis = -tuerkis. Optional nur eine Welt rendern:  THEME=tuerkis node …
const themeSuffix = { dunkel: "", hell: "-hell", tuerkis: "-tuerkis", "tuerkis-hell": "-tuerkis-hell" };
const onlyTheme = process.env.THEME; // dunkel | hell | tuerkis | tuerkis-hell
for (const t of targets){
  // Vier Welten: dunkel (Gold+Navy, Standard), tuerkis (Teal+Navy) und – wo
  // markiert (t.hell) – zusätzlich hell (Gold+Creme) und tuerkis-hell (Teal+Creme).
  let themes = ["dunkel", "tuerkis", ...(t.hell ? ["hell", "tuerkis-hell"] : [])];
  if (onlyTheme) themes = themes.filter((x) => x === onlyTheme);
  for (const theme of themes){
    const outFile = t.file.replace(/\.png$/, `${themeSuffix[theme]}.png`);
    const page = await browser.newPage({ viewport:{ width:t.w, height:t.h }, deviceScaleFactor: SCALE });
    const tmp = join(HERE, `.tmp-asset.html`);
    writeFileSync(tmp, t.html(palette(theme)));
    await page.goto(pathToFileURL(tmp).href, { waitUntil:"networkidle" });
    mkdirSync(join(HERE, dirname(outFile)), { recursive:true });
    await page.screenshot({ path: join(HERE, outFile), omitBackground: !!t.transparent });
    await page.close(); rmSync(tmp,{force:true});
    console.log("✓", outFile, `${t.w * SCALE}×${t.h * SCALE}`);
  }
}
await browser.close();
