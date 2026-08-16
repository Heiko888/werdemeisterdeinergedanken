/**
 * Story-Overlays für die Bild-Carousel-Serie „Persönliche Geschichten".
 *
 * Erzeugt pro Story ein TRANSPARENTES Text-Overlay (4:5) + einen gemeinsamen
 * Marken-Hintergrund. In Canva:  Hintergrund → freigestelltes Foto → Overlay.
 * Der Scrim im Overlay hält den Text lesbar, egal wie hell das Foto ist.
 *
 *   node tools/marketing/story-overlays.mjs
 *   Ausgabe: docs/marketing/story-overlays/*.png
 *
 * Neue Story? Einfach unten in STORIES ergänzen. Akzentwort mit <em>…</em>.
 */
import { writeFileSync, existsSync, readdirSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const fonts = pathToFileURL(join(ROOT, "docs/reels/covers/_fonts.css")).href;
const brain = pathToFileURL(join(ROOT, "public/logo-brain-frei.png")).href;
const OUT = join(ROOT, "docs/marketing/story-overlays");

const W = 1080, H = 1350;

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

const shared = `*{margin:0;box-sizing:border-box}
body{width:${W}px;height:${H}px;overflow:hidden;font-family:Inter,sans-serif;position:relative;background:transparent}
.eyebrow{font-size:24px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#a3d64f}
h1{font-family:Fraunces,serif;font-weight:600;color:#f4f2ec;font-size:78px;line-height:1.03;letter-spacing:-.5px}
h1 em{background:linear-gradient(100deg,#a3d64f,#34c4c4);-webkit-background-clip:text;background-clip:text;color:transparent;font-style:italic}
.bar{width:92px;height:6px;border-radius:4px;background:linear-gradient(100deg,#a3d64f,#34c4c4)}
.sub{font-size:29px;color:rgba(244,242,236,.85);line-height:1.35;max-width:600px}
.brainmini{position:absolute;top:54px;left:60px;width:92px;z-index:9;filter:drop-shadow(0 6px 30px rgba(52,196,196,.5))}
.txt{position:absolute;left:64px;bottom:150px;width:640px;z-index:9;display:flex;flex-direction:column;gap:22px}
.foot{position:absolute;left:64px;right:64px;bottom:52px;display:flex;justify-content:space-between;align-items:center;z-index:9}
.foot .h{font-size:22px;font-weight:700;color:rgba(244,242,236,.72)}
.foot .s{font-size:22px;font-weight:700;color:#a3d64f}
.scrim{position:absolute;inset:0;z-index:5;background:
 linear-gradient(to bottom, transparent 34%, rgba(5,9,20,.5) 66%, rgba(5,9,20,.92) 100%),
 linear-gradient(to right, rgba(5,9,20,.75) 0%, rgba(5,9,20,.15) 42%, transparent 62%)}`;

const bgCss = `.bg{position:absolute;inset:0;background:
 radial-gradient(50% 90% at 20% 16%, rgba(33,178,189,.30), transparent 60%),
 radial-gradient(46% 90% at 92% 96%, rgba(54,112,238,.22), transparent 60%),#08102a}
.stars{position:absolute;inset:0;background-image:
 radial-gradient(1.6px 1.6px at 24% 30%,rgba(255,255,255,.6),transparent),
 radial-gradient(1.4px 1.4px at 60% 18%,rgba(255,255,255,.4),transparent),
 radial-gradient(1.3px 1.3px at 84% 60%,rgba(180,210,255,.5),transparent)}`;

const overlayBody = (s, i) => `<div class="scrim"></div>
<img class="brainmini" src="${brain}">
<div class="txt">
  <div class="eyebrow">Persönliche Geschichte · ${String(i + 1).padStart(2, "0")}</div>
  <h1>${s.head}</h1><div class="bar"></div>
  <div class="sub">${s.sub}</div>
</div>
<div class="foot"><span class="h">Persönliche Geschichten</span><span class="s">wischen →</span></div>`;

const doc = (css, body, transparent) =>
  `<!doctype html><html><head><meta charset="utf8"><link rel="stylesheet" href="${fonts}">
<style>body{background:${transparent ? "transparent" : "#08102a"}}${css}</style></head><body>${body}</body></html>`;

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
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: findChrome() });

// 1) Gemeinsamer Hintergrund (einmal)
{
  const pg = await browser.newPage({ viewport:{ width:W, height:H } });
  const tmp = join(HERE, ".bg.html");
  writeFileSync(tmp, doc(shared + bgCss, `<div class="bg"></div><div class="stars"></div>`, false));
  await pg.goto(pathToFileURL(tmp).href, { waitUntil:"networkidle" });
  await pg.screenshot({ path: join(OUT, "_hintergrund-4x5.png") });
  await pg.close();
  console.log("✓ _hintergrund-4x5.png");
}
// 2) Pro Story ein transparentes Overlay
for (let i = 0; i < STORIES.length; i++) {
  const s = STORIES[i];
  const pg = await browser.newPage({ viewport:{ width:W, height:H } });
  const tmp = join(HERE, `.ov-${s.slug}.html`);
  writeFileSync(tmp, doc(shared, overlayBody(s, i), true));
  await pg.goto(pathToFileURL(tmp).href, { waitUntil:"networkidle" });
  await pg.screenshot({ path: join(OUT, `overlay-${String(i+1).padStart(2,"0")}-${s.slug}.png`), omitBackground:true });
  await pg.close();
  console.log("✓", `overlay-${String(i+1).padStart(2,"0")}-${s.slug}.png`);
}
await browser.close();
