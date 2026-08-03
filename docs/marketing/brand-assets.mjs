/**
 * Marken-Zusatzvorlagen im WMDG-Look:
 *   • Profilbild / Avatar (rund-sicher, universell für alle Kanäle)
 *   • Profil-/Kanalbild quadratisch mit Wortmarke (Telegram/WhatsApp-Kanal)
 *   • YouTube-Video-Thumbnail (16:9, klickstark, Titel-Platzhalter)
 *   • Zitat-Kacheln (1:1 und 4:5) aus Marken-Kernsätzen
 *
 *   node docs/marketing/brand-assets.mjs
 */
import { writeFileSync, existsSync, readdirSync, mkdirSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const fontsUrl = pathToFileURL(join(ROOT, "tools/pdf/assets/fonts.css")).href;
const brainUrl = pathToFileURL(join(ROOT, "public/logo-brain.png")).href;

// ---------- gemeinsame Marken-Optik ----------------------------------------
const BG = `
.bg{position:absolute;inset:0;background:
  radial-gradient(50% 120% at 88% 12%, rgba(33,178,189,.30), transparent 60%),
  radial-gradient(46% 120% at 6% 96%, rgba(54,112,238,.24), transparent 60%),
  radial-gradient(40% 90% at 74% 90%, rgba(140,198,63,.14), transparent 60%),
  #08102a;}
.stars{position:absolute;inset:0;background-image:
  radial-gradient(1.6px 1.6px at 20% 30%,rgba(255,255,255,.7),transparent),
  radial-gradient(1.5px 1.5px at 68% 22%,rgba(255,255,255,.5),transparent),
  radial-gradient(1.3px 1.3px at 82% 62%,rgba(180,210,255,.55),transparent),
  radial-gradient(1.2px 1.2px at 55% 48%,rgba(255,255,255,.45),transparent),
  radial-gradient(1.4px 1.4px at 90% 38%,rgba(200,180,255,.5),transparent),
  radial-gradient(1.1px 1.1px at 44% 74%,rgba(255,255,255,.4),transparent);}`;

const shell = (w, h, extra, body) => `<!doctype html><html><head><meta charset="utf8">
<link rel="stylesheet" href="${fontsUrl}"><style>
*{margin:0;box-sizing:border-box}
body{width:${w}px;height:${h}px;overflow:hidden;font-family:Inter,sans-serif;position:relative;background:#08102a}
${BG}
.brain{position:relative;object-fit:contain;filter:drop-shadow(0 10px 60px rgba(52,196,196,.45))}
.glow{position:absolute;border-radius:50%;background:radial-gradient(circle, rgba(52,196,196,.35), transparent 66%);filter:blur(30px)}
.wordmark{font-weight:800;text-transform:uppercase;color:rgba(244,242,236,.92)}
.wordmark span{background:linear-gradient(100deg,#a3d64f,#34c4c4);-webkit-background-clip:text;background-clip:text;color:transparent}
.url{font-weight:700;color:#a3d64f;letter-spacing:.3px}
.eyebrow{font-weight:700;letter-spacing:4px;text-transform:uppercase;color:#34c4c4}
${extra}
</style></head><body><div class="bg"></div><div class="stars"></div>${body}</body></html>`;

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
.title em{background:linear-gradient(100deg,#a3d64f,#34c4c4);-webkit-background-clip:text;background-clip:text;color:transparent;font-style:italic}
.kicker{margin-top:24px;font-size:24px;font-weight:700;color:rgba(244,242,236,.72);line-height:1.3}
.glow{right:100px;top:50%;transform:translateY(-50%);width:${Math.round(h*0.6)}px;height:${Math.round(h*0.6)}px}
.brain{position:absolute;right:120px;top:50%;transform:translateY(-50%);width:${Math.round(h*0.6)}px;height:${Math.round(h*0.6)}px}
`, `<div class="wrap">
  <div class="eyebrow">${data.eyebrow}</div>
  <div class="title">${data.title}</div>
  <div class="kicker">${data.kicker}</div>
</div>
<div class="glow"></div><img class="brain" src="${brainUrl}">`);

// Zitat-Kachel – großer Serifensatz, Marke dezent unten
const quoteTile = (w, h, q) => shell(w, h, `
.qwrap{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:${w-Math.round(w*0.2)}px;text-align:center}
.quote-mark{font-family:Fraunces,serif;font-size:${Math.round(w*0.16)}px;line-height:.7;color:rgba(52,196,196,.30);margin-bottom:${Math.round(w*0.03)}px}
.quote{font-family:Fraunces,serif;font-weight:500;color:#f4f2ec;font-size:${Math.round(w*0.072)}px;line-height:1.24;letter-spacing:-.3px}
.quote em{background:linear-gradient(100deg,#a3d64f,#34c4c4);-webkit-background-clip:text;background-clip:text;color:transparent;font-style:italic}
.foot{position:absolute;left:0;right:0;bottom:${Math.round(w*0.075)}px;display:flex;align-items:center;justify-content:center;gap:14px}
.foot img{width:${Math.round(w*0.05)}px;height:${Math.round(w*0.05)}px;object-fit:contain}
.foot .t{font-size:${Math.round(w*0.026)}px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:rgba(244,242,236,.7)}
`, `<div class="qwrap">
  <div class="quote-mark">„</div>
  <div class="quote">${q}</div>
</div>
<div class="foot"><img src="${brainUrl}"><span class="t">Werde Meister deiner Gedanken</span></div>`);

// Studien-Fakt-Kachel – Eyebrow, großer Serifen-Fakt, Quellenzeile, Marke unten
const factTile = (w, h, f) => shell(w, h, `
.fwrap{position:absolute;left:50%;top:47%;transform:translate(-50%,-50%);width:${w-Math.round(w*0.18)}px;text-align:center}
.eyebrow{font-size:${Math.round(w*0.026)}px;letter-spacing:.22em;margin-bottom:${Math.round(w*0.05)}px}
.fact{font-family:Fraunces,serif;font-weight:500;color:#f4f2ec;font-size:${Math.round(w*0.066)}px;line-height:1.26;letter-spacing:-.3px}
.fact em{background:linear-gradient(100deg,#a3d64f,#34c4c4);-webkit-background-clip:text;background-clip:text;color:transparent;font-style:italic}
.src{margin-top:${Math.round(w*0.05)}px;font-size:${Math.round(w*0.028)}px;line-height:1.4;color:rgba(244,242,236,.6)}
.src b{color:rgba(163,214,79,.9);font-weight:700}
.foot{position:absolute;left:0;right:0;bottom:${Math.round(w*0.07)}px;display:flex;align-items:center;justify-content:center;gap:14px}
.foot img{width:${Math.round(w*0.05)}px;height:${Math.round(w*0.05)}px;object-fit:contain}
.foot .t{font-size:${Math.round(w*0.026)}px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:rgba(244,242,236,.7)}
`, `<div class="fwrap">
  <div class="eyebrow">Studien-Fakt</div>
  <div class="fact">${f.t}</div>
  <div class="src"><b>Quelle:</b> ${f.src}</div>
</div>
<div class="foot"><img src="${brainUrl}"><span class="t">Werde Meister deiner Gedanken</span></div>`);

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

const QUOTES = [
  { key: "01", t: `Nicht jeder Gedanke, den du denkst, ist <em>von dir</em>.` },
  { key: "02", t: `Zwischen Reiz und Reaktion liegt ein Raum. In diesem Raum liegt deine <em>Freiheit</em>.` },
  { key: "03", t: `Du bist nicht deine Gedanken. Du bist der, der sie <em>bemerkt</em>.` },
  { key: "04", t: `Raus aus dem Autopilot – rein in echte innere <em>Klarheit</em>.` },
];

// Studien-Fakten (belegt; Umstrittenes wird in der Quellenzeile gekennzeichnet)
const FACTS = [
  { key: "01", t: `In rund <em>47 %</em> der Wachzeit ist unser Geist nicht bei der Sache – und dann unglücklicher.`,
    src: `Killingsworth & Gilbert, Harvard, 2010 („Science“)` },
  { key: "02", t: `Ein Gefühl zu <em>benennen</em> dämpft die Amygdala – die Alarmzentrale des Gehirns.`,
    src: `Lieberman et al., UCLA, 2007` },
  { key: "03", t: `Jonglieren zu lernen verändert in drei Monaten die <em>Struktur</em> des Gehirns.`,
    src: `Draganski et al., 2004 („Nature“)` },
  { key: "04", t: `Wir liegen nicht zufällig daneben – sondern <em>vorhersehbar</em>.`,
    src: `Tversky & Kahneman, 1974 („Science“)` },
  { key: "05", t: `Willenskraft als „Muskel“, der ermüdet? Eine große Replikation fand den Effekt <em>nicht</em>.`,
    src: `Baumeister 1998 – Replikation: Hagger 2016 (umstritten)` },
  { key: "06", t: `Dein Gehirn bleibt <em>formbar</em> – ein Leben lang.`,
    src: `Maguire 2000 · Draganski 2004 (Neuroplastizität)` },
];

const TARGETS = [];
// Avatare
TARGETS.push({ file: "profil/WMDG-Profilbild-Rund.png",   w: 1080, h: 1080, html: () => avatarRound(1080) });
TARGETS.push({ file: "profil/WMDG-Kanalbild-Quadrat.png", w: 1080, h: 1080, html: () => channelSquare(1080) });
TARGETS.push({ file: "messenger/WMDG-Messenger-Kanalbild.png", w: 1080, h: 1080, html: () => channelSquare(1080) });
// YouTube-Thumbnails
for (const d of THUMBS)
  TARGETS.push({ file: `youtube/thumbnails/WMDG-Thumbnail-${d.key}.png`, w: 1280, h: 720, html: () => thumbnail(1280, 720, d) });
// Zitat-Kacheln (1:1 und 4:5)
for (const q of QUOTES) {
  TARGETS.push({ file: `zitate/1x1/WMDG-Zitat-${q.key}.png`, w: 1080, h: 1080, html: () => quoteTile(1080, 1080, q.t) });
  TARGETS.push({ file: `zitate/4x5/WMDG-Zitat-${q.key}.png`, w: 1080, h: 1350, html: () => quoteTile(1080, 1350, q.t) });
}
// Studien-Fakten-Kacheln (1:1 und 4:5)
for (const f of FACTS) {
  TARGETS.push({ file: `zitate/studien-1x1/WMDG-Studienfakt-${f.key}.png`, w: 1080, h: 1080, html: () => factTile(1080, 1080, f) });
  TARGETS.push({ file: `zitate/studien-4x5/WMDG-Studienfakt-${f.key}.png`, w: 1080, h: 1350, html: () => factTile(1080, 1350, f) });
}

// ---------- Render ----------------------------------------------------------
function findChrome(){
  for(const r of [process.env.PLAYWRIGHT_BROWSERS_PATH,"/opt/pw-browsers"].filter(Boolean)){
    try{ for(const d of readdirSync(r)){ if(d.startsWith("chromium")){ const p=join(r,d,"chrome-linux/chrome"); if(existsSync(p)) return p; } } }catch{}
  }
}
const require = createRequire(import.meta.url);
const { chromium } = require("/opt/node22/lib/node_modules/playwright");
const browser = await chromium.launch({ executablePath: findChrome() });
for (const t of TARGETS){
  const page = await browser.newPage({ viewport:{ width:t.w, height:t.h }, deviceScaleFactor:1 });
  const tmp = join(HERE, `.tmp-asset.html`);
  writeFileSync(tmp, t.html());
  await page.goto(pathToFileURL(tmp).href, { waitUntil:"networkidle" });
  mkdirSync(join(HERE, dirname(t.file)), { recursive:true });
  await page.screenshot({ path: join(HERE, t.file) });
  await page.close(); rmSync(tmp,{force:true});
  console.log("✓", t.file, `${t.w}×${t.h}`);
}
await browser.close();
