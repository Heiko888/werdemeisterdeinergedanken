/**
 * Video-Thumbnails für den Mitgliederbereich (16:9, 1280×720).
 * Ein Thumbnail pro Video – Titel werden direkt aus den Datenquellen gelesen,
 * bleiben also automatisch synchron:
 *   • 7 Stufen          → src/lib/content.ts
 *   • Vertiefungen      → src/lib/deep-dives.ts
 *   • Praxis-Übungen    → src/lib/practices.ts
 *
 *   node docs/marketing/video-thumbnails.mjs
 * Ausgabe: public/video-thumbnails/<bereich>/<slug>.png (servierbar, als Video-Poster)
 */
import { writeFileSync, readFileSync, existsSync, readdirSync, mkdirSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const fontsUrl = pathToFileURL(join(ROOT, "tools/pdf/assets/fonts.css")).href;
const brainUrl = pathToFileURL(join(ROOT, "public/logo-brain.png")).href;
const read = (p) => readFileSync(join(ROOT, p), "utf8");

// ---------- Daten aus den TS-Quellen ziehen --------------------------------
function stages() {
  const t = read("src/lib/content.ts");
  const re = /number:\s*"(\d+)",[\s\S]{0,60}?title:\s*"([^"]+)",[\s\S]{0,60}?subtitle:\s*"([^"]+)"/g;
  const out = []; let m;
  while ((m = re.exec(t))) out.push({ num: m[1], title: m[2], subtitle: m[3] });
  return out.slice(0, 7);
}
function deepDives() {
  const t = read("src/lib/deep-dives.ts");
  const re = /slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?subtitle:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"/g;
  const out = []; let m;
  while ((m = re.exec(t))) out.push({ slug: m[1], title: m[2], subtitle: m[3], category: m[4] });
  return out;
}
function practices() {
  const t = read("src/lib/practices.ts");
  const re = /slug:\s*"([^"]+)",[\s\S]{0,60}?title:\s*"([^"]+)"/g;
  const out = []; let m;
  while ((m = re.exec(t))) out.push({ slug: m[1], title: m[2] });
  return out;
}

// ---------- Rendering -------------------------------------------------------
const W = 1280, H = 720;
const fit = (t, big, mid, sm) => (t.length <= 22 ? big : t.length <= 34 ? mid : sm);

// Deckungsgleich mit dem echten Mitglieder-Kopf (.member-hero in globals.css):
// Basis navy-850 → navy-950, Teal-Schimmer oben rechts + Königsblau-Schimmer
// unten links – kein Sternenfeld. Der tragende Marken-Akzent ist Gold (wie die
// Website-Wortmarke und der Eyebrow im LessonHero, „kein Grün mehr"): Eyebrow
// und Tag im Gold-Verlauf, Titel in reinem Weiß, ruhige weiß-getönte Subline.
const css = `
*{margin:0;box-sizing:border-box}
body{width:${W}px;height:${H}px;overflow:hidden;font-family:Inter,sans-serif;position:relative;background:#090b10;color:#ffffff}
.bg{position:absolute;inset:0;background:
  radial-gradient(58% 78% at 82% 0%, rgba(33,178,189,.22), transparent 60%),
  radial-gradient(55% 90% at 4% 100%, rgba(54,112,238,.26), transparent 62%),
  linear-gradient(158deg,#141821 0%,#090b10 100%);}
.frame{position:absolute;inset:0;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between;z-index:3}
.top{display:flex;align-items:flex-start;justify-content:space-between;gap:28px}
.logo{width:150px;height:auto;filter:drop-shadow(0 4px 20px rgba(52,196,196,.28))}
.tag{padding-top:6px;text-align:right;font-weight:800;font-size:19px;letter-spacing:.14em;text-transform:uppercase;
  background:linear-gradient(100deg,#f2d489,#e8c15f);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.mid{max-width:820px}
.eyebrow{font-weight:800;font-size:22px;letter-spacing:.13em;text-transform:uppercase;margin-bottom:22px;
  background:linear-gradient(100deg,#f2d489,#e8c15f);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.title{font-family:Fraunces,serif;font-weight:600;line-height:1.05;letter-spacing:-1px;color:#ffffff;filter:drop-shadow(0 6px 28px rgba(0,0,0,.5))}
.sub{margin-top:20px;font-size:29px;line-height:1.34;color:rgba(255,255,255,.84);max-width:760px}
.foot{display:flex;align-items:center;gap:16px}
.foot .u{font-weight:600;font-size:23px;color:rgba(255,255,255,.6);letter-spacing:.02em}
.num{position:absolute;right:64px;top:50%;transform:translateY(-50%);z-index:1;font-family:Fraunces,serif;font-weight:600;
  font-size:420px;line-height:.8;color:rgba(255,255,255,.05)}
`;

function thumbHtml({ eyebrow, title, sub, num }) {
  const tf = fit(title, 84, 68, 54);
  return `<!doctype html><html lang="de"><head><meta charset="utf8">
<link rel="stylesheet" href="${fontsUrl}"><style>${css}</style></head>
<body>
  <div class="bg"></div>
  ${num ? `<div class="num">${num}</div>` : ""}
  <div class="frame">
    <div class="top"><img class="logo" src="${brainUrl}" alt=""><div class="tag">Mitgliederbereich · Video</div></div>
    <div class="mid">
      <div class="eyebrow">${eyebrow}</div>
      <div class="title" style="font-size:${tf}px">${title}</div>
      ${sub ? `<div class="sub">${sub}</div>` : ""}
    </div>
    <div class="foot"><span class="u">www.werdemeisterdeinergedanken.de</span></div>
  </div>
</body></html>`;
}

const JOBS = [];
// Willkommensvideo auf dem Dashboard (/mitglieder) – Top-Level, kein Unterordner.
JOBS.push({ dir: ".", name: "willkommen",
  data: { eyebrow: "Willkommen", title: "Schön, dass du da bist", sub: "Dein Bereich – so findest du dich zurecht" } });
for (const s of stages())
  JOBS.push({ dir: "stufen", name: `stufe-${s.num}`,
    data: { eyebrow: `Die 7 Stufen · Stufe ${s.num}`, title: s.title, sub: s.subtitle, num: s.num } });
for (const d of deepDives())
  JOBS.push({ dir: "vertiefungen", name: d.slug,
    data: { eyebrow: `Vertiefung · ${d.category}`, title: d.title, sub: d.subtitle } });
for (const p of practices())
  JOBS.push({ dir: "praxis", name: p.slug,
    data: { eyebrow: "Praxis · Geführte Übung", title: p.title, sub: "" } });

// ---------- Chromium --------------------------------------------------------
function findChrome() {
  for (const r of [process.env.PLAYWRIGHT_BROWSERS_PATH, "/opt/pw-browsers"].filter(Boolean)) {
    try { for (const d of readdirSync(r)) { if (d.startsWith("chromium")) { const p = join(r, d, "chrome-linux/chrome"); if (existsSync(p)) return p; } } } catch {}
  }
}
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require("/opt/node22/lib/node_modules/playwright")); }
catch { ({ chromium } = require("playwright")); }

const browser = await chromium.launch({ executablePath: findChrome() });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
let n = 0;
for (const j of JOBS) {
  const tmp = join(HERE, `.thumb.html`);
  writeFileSync(tmp, thumbHtml(j.data));
  await page.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
  const outDir = join(ROOT, "public", "video-thumbnails", j.dir);
  mkdirSync(outDir, { recursive: true });
  await page.screenshot({ path: join(outDir, `${j.name}.png`) });
  rmSync(tmp, { force: true });
  n++;
}
await browser.close();
console.log(`✓ ${n} Video-Thumbnails (Stufen + Vertiefungen + Praxis) in public/video-thumbnails/`);
