/**
 * Vollständige Bild-Carousel-Geschichten „Persönliche Geschichten".
 *
 * Anders als story-overlays.mjs (nur Titel-Overlay) rendert dieses Tool die
 * KOMPLETTE Geschichte: Titel (als transparentes Overlay für ein Canva-Foto)
 * plus alle Body-/CTA-Slides fertig gebrandet – in 4:5 / 1:1 / 9:16.
 *
 *   node tools/marketing/story-carousels.mjs
 *   Ausgabe: docs/marketing/story-carousels/<slug>/<format>/
 *     _hintergrund.png     (Marken-Hintergrund – Ebene 1 in Canva)
 *     01-overlay.png       (transparentes Titel-Overlay – Ebene 3 in Canva)
 *     02.png … NN.png      (fertige Body-/CTA-Slides)
 *
 * Neue Geschichte? Unten in STORIES ergänzen. Akzentwort mit <em>…</em>.
 */
import { writeFileSync, existsSync, readdirSync, mkdirSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const fonts = pathToFileURL(join(ROOT, "docs/reels/covers/_fonts.css")).href;
const brain = pathToFileURL(join(ROOT, "public/logo-brain-frei.png")).href;
const OUT = join(ROOT, "docs/marketing/story-carousels");

const FORMATS = [
  { key: "4x5",  w: 1080, h: 1350 },
  { key: "1x1",  w: 1080, h: 1080 },
  { key: "9x16", w: 1080, h: 1920 },
];

// ===========================================================================
// GESCHICHTEN. role: cover | body | cta. head/lead/body/action mit <em> = Akzent.
// ===========================================================================
const STORIES = [
  {
    slug: "sommer-2023",
    nr: "01",
    slides: [
      { role: "cover", eyebrow: "Persönliche Geschichte · 01", head: `Der Sommer,<br>der <em>alles</em><br>veränderte` },
      { role: "body", lead: `Von außen sah alles normal aus.`, body: `Ich funktionierte. Ich machte weiter – Tag für Tag.` },
      { role: "body", lead: `Aber innen war ich leer.`, body: `Mein Leben lief. Nur <em>ohne mich</em>.` },
      { role: "body", lead: `Dann kam der Moment, an dem ich es mir eingestehen musste:`, body: `So kann es nicht weitergehen.` },
      { role: "body", lead: `Eine Frage ließ mich nicht mehr los:`, body: `Warum läuft mein Leben wie im <em>Autopilot</em>?` },
      { role: "body", lead: `Also fing ich an, tief zu graben.`, body: `Nicht nach Schuld – nach dem <em>Muster</em> darunter.` },
      { role: "body", lead: `Und da sah ich sie:`, body: `die <em>verdeckten Muster</em>, die mich lenkten.` },
      { role: "body", lead: `Das war nicht das Ende meiner Geschichte.`, body: `Es war der Anfang, sie <em>selbst zu schreiben</em>.` },
      { role: "cta", kicker: `Dein nächster Schritt`, lead: `Du bist nicht kaputt. Du läufst nur auf einem alten Programm.`, action: `Folge für den Weg zurück zu dir. → werdemeisterdeinergedanken.de` },
    ],
  },
];

const cssFor = (F) => `*{margin:0;box-sizing:border-box}
body{width:${F.w}px;height:${F.h}px;overflow:hidden;font-family:Inter,sans-serif;position:relative}
.bg{position:absolute;inset:0;background:
 radial-gradient(52% 80% at 22% 14%, rgba(33,178,189,.28), transparent 60%),
 radial-gradient(46% 80% at 92% 94%, rgba(54,112,238,.20), transparent 60%),#08102a}
.stars{position:absolute;inset:0;background-image:
 radial-gradient(1.5px 1.5px at 24% 26%,rgba(255,255,255,.55),transparent),
 radial-gradient(1.3px 1.3px at 66% 18%,rgba(255,255,255,.4),transparent),
 radial-gradient(1.3px 1.3px at 82% 60%,rgba(180,210,255,.45),transparent)}
.brainmini{position:absolute;top:56px;left:64px;width:84px;z-index:6;filter:drop-shadow(0 6px 30px rgba(52,196,196,.5))}
.pageno{position:absolute;top:70px;right:64px;font-size:21px;font-weight:700;letter-spacing:2px;color:rgba(163,214,79,.9);z-index:6}
em{background:linear-gradient(100deg,#a3d64f,#34c4c4);-webkit-background-clip:text;background-clip:text;color:transparent;font-style:italic}
.foot{position:absolute;left:64px;right:64px;bottom:54px;display:flex;justify-content:space-between;align-items:center;z-index:6}
.foot .h{font-size:21px;font-weight:700;color:rgba(244,242,236,.6)}
.foot .c{font-size:21px;font-weight:700;color:rgba(244,242,236,.6)}
.dots{display:flex;gap:7px}.dot{width:8px;height:8px;border-radius:50%;background:rgba(244,242,236,.25)}.dot.on{background:linear-gradient(100deg,#a3d64f,#34c4c4)}
.scrim{position:absolute;inset:0;z-index:4;background:linear-gradient(to bottom, transparent 40%, rgba(5,9,20,.55) 70%, rgba(5,9,20,.92) 100%),linear-gradient(to right, rgba(5,9,20,.7), transparent 60%)}
.cover-box{position:absolute;left:64px;right:64px;bottom:150px;z-index:5;display:flex;flex-direction:column;gap:18px}
.cover-eb{font-size:22px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#a3d64f}
.cover-h{font-family:Fraunces,serif;font-weight:600;color:#f4f2ec;font-size:84px;line-height:1.03;letter-spacing:-.5px}
.wrap{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 64px;z-index:5}
.tick{width:64px;height:6px;border-radius:4px;background:linear-gradient(100deg,#a3d64f,#34c4c4);margin-bottom:30px}
.lead{font-family:Fraunces,serif;font-weight:600;color:#f4f2ec;font-size:60px;line-height:1.08;letter-spacing:-.3px}
.body{margin-top:26px;font-size:38px;line-height:1.35;color:rgba(244,242,236,.82)}
.cta-kicker{font-size:22px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#a3d64f;margin-bottom:22px}
.cta-lead{font-family:Fraunces,serif;font-weight:600;color:#f4f2ec;font-size:56px;line-height:1.1}
.cta-action{margin-top:26px;padding-left:22px;border-left:5px solid;border-image:linear-gradient(120deg,#8cc63f,#21b2bd) 1;font-size:32px;line-height:1.4;color:rgba(244,242,236,.9)}`;

const dots = (i, total) => `<div class="dots">${Array.from({ length: total }, (_, k) => `<span class="dot ${k === i ? "on" : ""}"></span>`).join("")}</div>`;

function slideInner(s) {
  if (s.role === "cover") {
    // NUR Text + Scrim (transparent) – das Foto kommt in Canva darunter.
    return `<div class="scrim"></div><div class="cover-box"><div class="cover-eb">${s.eyebrow}</div><div class="cover-h">${s.head}</div></div>`;
  }
  if (s.role === "cta") {
    return `<div class="wrap"><div class="tick"></div><div class="cta-kicker">${s.kicker}</div><div class="cta-lead">${s.lead}</div><div class="cta-action">${s.action}</div></div>`;
  }
  return `<div class="wrap"><div class="tick"></div><div class="lead">${s.lead}</div><div class="body">${s.body}</div></div>`;
}

function doc(F, s, i, total, nr, { transparent, withBg }) {
  const foot = `<div class="foot"><span class="h">${i === 0 ? "Persönliche Geschichten" : "werdemeisterdeinergedanken.de"}</span>${dots(i, total)}<span class="c">${i + 1}/${total}</span></div>`;
  const pageno = i === 0 ? "" : `<div class="pageno">${nr}</div>`;
  const bg = withBg ? `<div class="bg"></div><div class="stars"></div>` : "";
  return `<!doctype html><html><head><meta charset="utf8"><link rel="stylesheet" href="${fonts}">
<style>body{background:${transparent ? "transparent" : "#08102a"}}${cssFor(F)}</style></head><body>
${bg}<img class="brainmini" src="${brain}">${pageno}${slideInner(s)}${foot}</body></html>`;
}

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

for (const story of STORIES) {
  for (const F of FORMATS) {
    const dir = join(OUT, story.slug, F.key);
    mkdirSync(dir, { recursive: true });
    const total = story.slides.length;

    // Hintergrund (Ebene 1 in Canva, nur fürs Cover nötig, aber praktisch)
    {
      const pg = await browser.newPage({ viewport: { width: F.w, height: F.h } });
      const tmp = join(HERE, `.h-${F.key}.html`);
      writeFileSync(tmp, `<!doctype html><html><head><style>body{margin:0}${cssFor(F)}</style></head><body><div class="bg"></div><div class="stars"></div></body></html>`);
      await pg.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
      await pg.screenshot({ path: join(dir, "_hintergrund.png") });
      await pg.close(); rmSync(tmp, { force: true });
    }

    for (let i = 0; i < story.slides.length; i++) {
      const s = story.slides[i];
      const pg = await browser.newPage({ viewport: { width: F.w, height: F.h } });
      const tmp = join(HERE, `.s-${F.key}-${i}.html`);
      const isCover = s.role === "cover";
      // Cover → transparentes Overlay (Foto kommt in Canva); sonst mit Hintergrund.
      writeFileSync(tmp, doc(F, s, i, total, story.nr, { transparent: isCover, withBg: !isCover }));
      await pg.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
      const name = isCover
        ? `01-overlay.png`
        : `${String(i + 1).padStart(2, "0")}.png`;
      await pg.screenshot({ path: join(dir, name), omitBackground: isCover });
      await pg.close(); rmSync(tmp, { force: true });
    }
    console.log("✓", story.slug, F.key, `(${total} Slides)`);
  }
}
await browser.close();
