/**
 * Buchcover „Werde Meister deiner Gedanken" als PNG.
 *
 *   node tools/print/buchcover.mjs        (npm run buchcover)
 *
 * Rendert das Cover des Hauptbuchs im Markendesign – cinematisch-ruhiges
 * Anthrazit mit goldenem Gehirn-Emblem, Wortmarke im Gold-Verlauf (Fraunces-
 * Serif) und feiner Gold-Rahmenlinie – einmal via Chromium in ein PNG.
 *
 * Titel/Untertitel/Autor stammen 1:1 aus der Leserfassung des Buches
 * (docs/ebook/werde-meister-deiner-gedanken.md), Farben/Schriften aus dem
 * Marken-Design (marke.mjs + tools/pdf/assets/fonts.css), passend zur
 * Titelseite in tools/pdf/build-buch.py.
 *
 * Ausgabe:  public/buchcover-werde-meister.png   (1600 × 2400, 2:3)
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { CONTACT, C } from "./marke.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const fontsCss = readFileSync(join(ROOT, "tools/pdf/assets/fonts.css"), "utf8");

// Freigestelltes Gold-Gehirn (transparent) – leuchtet auf dunklem Grund.
const brain =
  "data:image/png;base64," +
  readFileSync(join(ROOT, "public/logo-brain-gold-freigestellt.png")).toString("base64");

// Inhalt aus der Leserfassung des Buches.
const TITLE = { pre: "Werde", gold: "Meister", sub: "deiner Gedanken" };
const SUBTITLE =
  "Wie du mit Energie, Bewusstsein und Praxis dein Leben neu gestaltest";
const AUTHOR = CONTACT.name; // Heiko Schwaninger
const TAGLINE = CONTACT.tagline; // Bewusstseinsentwicklung in 7 Stufen
const WEB = CONTACT.web; // www.werdemeisterdeinergedanken.de

const W = 1600;
const H = 2400; // 2:3 – Standard für Print (6×9) & E-Book-Stores

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
${fontsCss}
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:${C.navy950}}
.cover{
  position:relative;width:${W}px;height:${H}px;overflow:hidden;
  background:
    radial-gradient(120% 70% at 50% 40%, rgba(232,193,95,.16), rgba(232,193,95,0) 60%),
    radial-gradient(140% 90% at 50% 8%, ${C.navy800}, ${C.navy900} 45%, ${C.navy950} 100%);
  color:${C.cream};font-family:Inter,sans-serif;
}
/* feine Vignette für Tiefe */
.cover::after{content:"";position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(130% 100% at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,.55) 100%);}
/* Gold-Rahmenlinie (Buchkanten-Anmutung) */
.frame{position:absolute;inset:64px;border:2px solid rgba(216,169,58,.32);z-index:3}
.frame::before{content:"";position:absolute;inset:10px;border:1px solid rgba(216,169,58,.18)}
.corner{position:absolute;width:34px;height:34px;border:2px solid ${C.gold400};z-index:4}
.corner.tl{top:52px;left:52px;border-right:0;border-bottom:0}
.corner.tr{top:52px;right:52px;border-left:0;border-bottom:0}
.corner.bl{bottom:52px;left:52px;border-right:0;border-top:0}
.corner.br{bottom:52px;right:52px;border-left:0;border-top:0}

.inner{position:absolute;inset:0;z-index:5;display:flex;flex-direction:column;
  align-items:center;justify-content:space-between;text-align:center;padding:180px 150px 156px}
/* Hero-Block (Gehirn + Titel + Untertitel) zentriert zwischen Eyebrow & Autor */
.hero{margin:auto 0;display:flex;flex-direction:column;align-items:center}

/* Eyebrow / Tagline */
.eyebrow{display:flex;align-items:center;gap:22px;
  font-weight:600;letter-spacing:.30em;text-transform:uppercase;
  font-size:24px;color:${C.gold300}}
.eyebrow i{display:block;width:56px;height:1px;
  background:linear-gradient(90deg,rgba(232,193,95,0),${C.gold500})}
.eyebrow i.r{background:linear-gradient(90deg,${C.gold500},rgba(232,193,95,0))}

/* Hero-Gehirn */
.brainwrap{position:relative}
.brainwrap::before{content:"";position:absolute;left:50%;top:52%;
  width:760px;height:760px;transform:translate(-50%,-50%);
  background:radial-gradient(circle, rgba(232,193,95,.30), rgba(232,193,95,0) 62%);
  filter:blur(6px)}
.brainwrap img{position:relative;width:560px;height:560px;object-fit:contain;
  filter:drop-shadow(0 0 60px rgba(232,193,95,.45)) drop-shadow(0 22px 46px rgba(0,0,0,.5))}

/* Titel */
.title{margin-top:104px;font-family:Fraunces,serif;font-weight:600;
  font-size:118px;line-height:1.02;color:${C.cream};letter-spacing:-.01em}
.title .g{font-style:italic;
  background:linear-gradient(96deg,${C.gold300},${C.gold500} 55%,${C.gold600});
  -webkit-background-clip:text;background-clip:text;color:transparent}
.title .sub{display:block;margin-top:6px;font-size:96px;font-weight:500;color:${C.creamDim}}

.rule{margin:52px 0 40px;width:132px;height:2px;
  background:linear-gradient(90deg,rgba(232,193,95,0),${C.gold500},rgba(232,193,95,0))}

/* Untertitel */
.promise{max-width:900px;font-size:36px;line-height:1.42;font-weight:400;
  color:${C.slate};font-style:italic}

/* Fuß: Autor + Web */
.foot{display:flex;flex-direction:column;align-items:center;gap:18px}
.author{font-family:Fraunces,serif;font-weight:600;font-size:52px;color:${C.cream}}
.web{font-weight:600;letter-spacing:.22em;text-transform:uppercase;
  font-size:22px;color:${C.gold300}}
</style></head><body>
  <div class="cover">
    <div class="frame"></div>
    <span class="corner tl"></span><span class="corner tr"></span>
    <span class="corner bl"></span><span class="corner br"></span>
    <div class="inner">
      <div class="eyebrow"><i></i><span>${TAGLINE}</span><i class="r"></i></div>
      <div class="hero">
        <div class="brainwrap"><img src="${brain}" alt=""></div>
        <h1 class="title">${TITLE.pre} <span class="g">${TITLE.gold}</span><span class="sub">${TITLE.sub}</span></h1>
        <div class="rule"></div>
        <p class="promise">${SUBTITLE}</p>
      </div>
      <div class="foot">
        <div class="author">${AUTHOR}</div>
        <div class="web">${WEB.replace(/^www\./, "")}</div>
      </div>
    </div>
  </div>
</body></html>`;

const require = createRequire(import.meta.url);
const { rmSync } = require("node:fs");

function findChrome() {
  if (process.env.CHROME_BIN && existsSync(process.env.CHROME_BIN)) return process.env.CHROME_BIN;
  try {
    const p = require("playwright").chromium.executablePath();
    if (p && existsSync(p)) return p;
  } catch {}
  for (const r of [process.env.PLAYWRIGHT_BROWSERS_PATH, "/opt/pw-browsers"].filter(Boolean)) {
    try {
      for (const d of readdirSync(r)) {
        if (d.startsWith("chromium")) {
          const p = join(r, d, "chrome-linux/chrome");
          if (existsSync(p)) return p;
        }
      }
    } catch {}
  }
  throw new Error("Kein Chromium/Chrome gefunden. Führe aus:  npx playwright install chromium");
}

const tmp = join(HERE, ".tmp-buchcover.html");
const out = join(ROOT, "public/buchcover-werde-meister.png");
writeFileSync(tmp, html);

// Bevorzugt Playwright (scharfer, elementgenauer Screenshot). Ist das npm-Paket
// nicht installiert (frischer Clone), fällt der Generator auf Chromium-Headless
// zurück – die .cover-Fläche füllt das Fenster exakt (W×H), also identisches PNG.
async function renderWithPlaywright() {
  const { chromium } = require("playwright");
  const browser = await chromium.launch({ executablePath: findChrome() });
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
  const el = await page.$(".cover");
  await el.screenshot({ path: out });
  await browser.close();
}

function renderWithChromeHeadless() {
  const { execFileSync } = require("node:child_process");
  const chrome = findChrome();
  execFileSync(
    chrome,
    [
      "--headless=new",
      "--no-sandbox",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      "--default-background-color=00000000",
      `--window-size=${W},${H}`,
      `--screenshot=${out}`,
      pathToFileURL(tmp).href,
    ],
    { stdio: "ignore" }
  );
}

try {
  await renderWithPlaywright();
} catch (e) {
  renderWithChromeHeadless();
}
try { rmSync(tmp, { force: true }); } catch {}
console.log("✓ public/buchcover-werde-meister.png (" + W + "×" + H + ")");
