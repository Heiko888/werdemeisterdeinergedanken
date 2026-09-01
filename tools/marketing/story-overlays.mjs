/**
 * Story-Overlays für die Bild-Carousel-Serie „Persönliche Geschichten".
 *
 * Erzeugt pro Story ein TRANSPARENTES Text-Overlay + einen Marken-Hintergrund,
 * jeweils in 3 Formaten (4:5 / 1:1 / 9:16). In Canva:
 *   Hintergrund → freigestelltes Foto → Overlay  (Scrim hält Text lesbar).
 *
 *   node tools/marketing/story-overlays.mjs
 *   Ausgabe: docs/marketing/story-overlays/<format>/*.png
 *
 * Neue Story? Einfach unten in STORIES ergänzen. Akzentwort mit <em>…</em>.
 */
import { writeFileSync, existsSync, readdirSync, mkdirSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { ARROW } from "../../docs/_glyphs.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const fonts = pathToFileURL(join(ROOT, "docs/reels/covers/_fonts.css")).href;
const brain = pathToFileURL(join(ROOT, "public/logo-brain-gold.png")).href;
const brainTeal = pathToFileURL(join(ROOT, "public/logo-brain-tuerkis.png")).href;
const OUT = join(ROOT, "docs/marketing/story-overlays");

// Drei Farbwelten. Türkis erhält das Suffix -tuerkis (parallel zu -hell).
// Optional nur eine rendern:  THEME=tuerkis node tools/marketing/story-overlays.mjs
const THEME_SUFFIX = { dunkel: "", hell: "-hell", tuerkis: "-tuerkis" };
const THEMES = (process.env.THEME
  ? [process.env.THEME]
  : ["dunkel", "hell", "tuerkis"]).filter((t) => t in THEME_SUFFIX);

// ===========================================================================
// FORMATE. Breite überall 1080. Schriftgrößen/Positionen je Format.
// ===========================================================================
const FORMATS = [
  { key: "4x5",  w: 1080, h: 1350, headFs: 78, subFs: 29, ebFs: 24, txtBottom: 150, brainTop: 54, scrimTop: 34 },
  { key: "1x1",  w: 1080, h: 1080, headFs: 62, subFs: 26, ebFs: 22, txtBottom: 92,  brainTop: 46, scrimTop: 30 },
  { key: "9x16", w: 1080, h: 1920, headFs: 92, subFs: 32, ebFs: 26, txtBottom: 300, brainTop: 84, scrimTop: 40 },
];

// ===========================================================================
// STORY-KATALOG. headline: <em>Wort</em> = grün-türkiser Akzent. Kurz halten.
// ===========================================================================
const STORIES = [
  { slug: "ja-ich-meine-dich",   head: `Ja, ich<br>meine <em>dich</em>`,           sub: `Wie ich vom Autopilot in mein eigenes Leben zurückfand.` },
  { slug: "aufgehoert-zu-funktionieren", head: `Der Tag, an dem<br>ich <em>aufhörte</em><br>zu funktionieren`, sub: `Und warum genau das der Anfang von allem war.` },
  { slug: "nie-faul",            head: `Ich war nie faul –<br>ich war <em>fremd&shy;gesteuert</em>`, sub: `Wie ich den Unterschied zwischen Wollen und Müssen fand.` },
  { slug: "lautester-kritiker",  head: `Mein lautester<br>Kritiker war<br><em>nicht ich</em>`, sub: `Wessen Stimme da wirklich in meinem Kopf sprach.` },
  { slug: "nicht-meine-gedanken", head: `Das sind gar<br>nicht <em>meine</em><br>Gedanken`, sub: `Der Moment, in dem ich anfing, hinzuhören statt zu glauben.` },
  { slug: "vom-gruebeln-zur-stille", head: `Vom Grübeln<br>zur <em>Stille</em>`, sub: `Was passierte, als ich aufhörte, gegen mich zu kämpfen.` },
];

// theme: "dunkel" (Gold, Standard) · "hell" (Creme) · "tuerkis" (Teal-Akzente
// auf Navy). Türkis erbt den dunklen Grund von „dunkel", nur Akzent/Glow teal.
const cssFor = (F, theme) => {
  const hell = theme === "hell";
  const teal = theme === "tuerkis";
  const eyebrowCol = hell ? "#7e6410" : teal ? "#5fd6d2" : "#f2d489";
  const accentGrad = hell
    ? "linear-gradient(100deg,#d9a93a,#7e6410)"
    : teal
      ? "linear-gradient(100deg,#a3d64f,#21b2bd)"
      : "linear-gradient(100deg,#f2d489,#d9a93a)";
  const glowRGB = teal ? "52,196,196" : "233,193,95";
  const bgLayers = hell
    ? `
 radial-gradient(78% 62% at 50% -10%, rgba(232,193,95,.26), transparent 62%),
 radial-gradient(58% 52% at 4% 108%, rgba(217,169,58,.13), transparent 60%),#f6f4ee`
    : teal
      ? `
 radial-gradient(50% 90% at 20% 16%, rgba(52,196,196,.30), transparent 60%),
 radial-gradient(46% 90% at 92% 96%, rgba(33,178,189,.20), transparent 60%),#090b10`
      : `
 radial-gradient(50% 90% at 20% 16%, rgba(233,193,95,.30), transparent 60%),
 radial-gradient(46% 90% at 92% 96%, rgba(168,132,42,.22), transparent 60%),#090b10`;
  return `*{margin:0;box-sizing:border-box}
body{width:${F.w}px;height:${F.h}px;overflow:hidden;font-family:Inter,sans-serif;position:relative;background:transparent}
.eyebrow{font-size:${F.ebFs}px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${eyebrowCol}}
h1{font-family:Fraunces,serif;font-weight:600;color:${hell ? "#16231f" : "#f4f2ec"};font-size:${F.headFs}px;line-height:1.03;letter-spacing:-.5px}
h1 em{background:${accentGrad};-webkit-background-clip:text;background-clip:text;color:transparent;font-style:italic}
.bar{width:92px;height:6px;border-radius:4px;background:${accentGrad}}
.sub{font-size:${F.subFs}px;color:${hell ? "rgba(22,35,31,.85)" : "rgba(244,242,236,.85)"};line-height:1.35;max-width:${Math.round(F.w*0.6)}px}
.brainmini{position:absolute;top:${F.brainTop}px;left:60px;width:92px;z-index:9;filter:drop-shadow(0 6px 30px rgba(${glowRGB},.5))}
.txt{position:absolute;left:64px;bottom:${F.txtBottom}px;width:${Math.round(F.w*0.6)}px;z-index:9;display:flex;flex-direction:column;gap:20px}
.foot{position:absolute;left:64px;right:64px;bottom:52px;display:flex;justify-content:space-between;align-items:center;z-index:9}
.foot .h{font-size:22px;font-weight:700;color:${hell ? "rgba(22,35,31,.72)" : "rgba(244,242,236,.72)"}}
.foot .s{font-size:22px;font-weight:700;color:${eyebrowCol}}
.scrim{position:absolute;inset:0;z-index:5;background:${hell ? `
 linear-gradient(to bottom, transparent ${F.scrimTop}%, rgba(246,244,238,.5) ${F.scrimTop+30}%, rgba(246,244,238,.92) 100%),
 linear-gradient(to right, rgba(246,244,238,.75) 0%, rgba(246,244,238,.15) 42%, transparent 62%)` : `
 linear-gradient(to bottom, transparent ${F.scrimTop}%, rgba(5,9,20,.5) ${F.scrimTop+30}%, rgba(5,9,20,.92) 100%),
 linear-gradient(to right, rgba(5,9,20,.75) 0%, rgba(5,9,20,.15) 42%, transparent 62%)`}}
.bg{position:absolute;inset:0;background:${bgLayers}}
.stars{display:${hell ? "none" : "block"};position:absolute;inset:0;background-image:
 radial-gradient(1.6px 1.6px at 24% 30%,rgba(255,255,255,.6),transparent),
 radial-gradient(1.4px 1.4px at 60% 18%,rgba(255,255,255,.4),transparent),
 radial-gradient(1.3px 1.3px at 84% 60%,rgba(180,210,255,.5),transparent)}`;
};

const overlayBody = (s, i, theme) => `<div class="scrim"></div>
<img class="brainmini" src="${theme === "tuerkis" ? brainTeal : brain}">
<div class="txt">
  <div class="eyebrow">Persönliche Geschichte · ${String(i + 1).padStart(2, "0")}</div>
  <h1>${s.head}</h1><div class="bar"></div>
  <div class="sub">${s.sub}</div>
</div>
<div class="foot"><span class="h">Persönliche Geschichten</span><span class="s">wischen ${ARROW}</span></div>`;

const doc = (F, body, transparent, theme) =>
  `<!doctype html><html><head><meta charset="utf8"><link rel="stylesheet" href="${fonts}">
<style>body{background:${transparent ? "transparent" : (theme === "hell" ? "#f6f4ee" : "#090b10")}}${cssFor(F, theme)}</style></head><body>${body}</body></html>`;

const require = createRequire(import.meta.url);
function findChrome(){
  if(process.env.CHROME_BIN && existsSync(process.env.CHROME_BIN)) return process.env.CHROME_BIN;
  try{ const p=require("playwright").chromium.executablePath(); if(p && existsSync(p)) return p; }catch{}
  for(const r of [process.env.PLAYWRIGHT_BROWSERS_PATH,"/opt/pw-browsers"].filter(Boolean)){
    try{ for(const d of readdirSync(r)){ if(d.startsWith("chromium")){ const p=join(r,d,"chrome-linux/chrome"); if(existsSync(p)) return p; } } }catch{}
  }
  throw new Error("Kein Chromium gefunden.");
}
const { chromium } = require("playwright");
if (existsSync(OUT)) rmSync(OUT, { recursive: true, force: true });
const browser = await chromium.launch({ executablePath: findChrome() });

for (const F of FORMATS) {
  const fdir = join(OUT, F.key);
  mkdirSync(fdir, { recursive: true });
  // Gemeinsamer Hintergrund je Format – dunkel + Creme + Türkis.
  for (const theme of THEMES) {
    const sfx = THEME_SUFFIX[theme];
    const pg = await browser.newPage({ viewport:{ width:F.w, height:F.h } });
    const tmp = join(HERE, `.bg-${F.key}${sfx}.html`);
    writeFileSync(tmp, doc(F, `<div class="bg"></div><div class="stars"></div>`, false, theme));
    await pg.goto(pathToFileURL(tmp).href, { waitUntil:"networkidle" });
    await pg.screenshot({ path: join(fdir, `_hintergrund${sfx}.png`) });
    await pg.close(); rmSync(tmp, { force:true });
  }
  // Pro Story ein transparentes Overlay – je Farbwelt eine Variante.
  for (let i = 0; i < STORIES.length; i++) {
    const s = STORIES[i];
    for (const theme of THEMES) {
      const sfx = THEME_SUFFIX[theme];
      const pg = await browser.newPage({ viewport:{ width:F.w, height:F.h } });
      const tmp = join(HERE, `.ov-${F.key}-${s.slug}${sfx}.html`);
      writeFileSync(tmp, doc(F, overlayBody(s, i, theme), true, theme));
      await pg.goto(pathToFileURL(tmp).href, { waitUntil:"networkidle" });
      await pg.screenshot({ path: join(fdir, `overlay-${String(i+1).padStart(2,"0")}-${s.slug}${sfx}.png`), omitBackground:true });
      await pg.close(); rmSync(tmp, { force:true });
    }
  }
  console.log("✓ Format", F.key, "→", STORIES.length, "Overlays ×", THEMES.length, "+", THEMES.length, "Hintergründe");
}
await browser.close();
