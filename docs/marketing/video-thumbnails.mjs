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
const brainGoldUrl = pathToFileURL(join(ROOT, "public/logo-brain-gold.png")).href;
const brainTealUrl = pathToFileURL(join(ROOT, "public/logo-brain-tuerkis.png")).href;
const heikoUrl = pathToFileURL(join(ROOT, "public/heiko-hero.webp")).href;

// Vier Farbwelten (Grund × Akzent), Suffixe parallel zu allen Generatoren.
const THEME_SUFFIX = { dunkel: "", hell: "-hell", tuerkis: "-tuerkis", "tuerkis-hell": "-tuerkis-hell" };
const THEMES = Object.keys(THEME_SUFFIX);
const palette = (theme) => {
  const hell = theme === "hell" || theme === "tuerkis-hell";
  const teal = theme === "tuerkis" || theme === "tuerkis-hell";
  return {
    hell, teal,
    brain: teal ? brainTealUrl : brainGoldUrl,
    accent: teal
      ? (hell ? "linear-gradient(120deg,#8cc63f,#0f766e)" : "linear-gradient(120deg,#8cc63f,#21b2bd)")
      : (hell ? "linear-gradient(120deg,#d9a93a,#7e6410)" : "linear-gradient(120deg,#f2d489,#d9a93a)"),
    tagAccent: teal
      ? (hell ? "linear-gradient(120deg,#8cc63f,#0f766e)" : "linear-gradient(120deg,#5fd6d2,#21b2bd)")
      : (hell ? "linear-gradient(120deg,#d9a93a,#7e6410)" : "linear-gradient(120deg,#f2d489,#e8c15f)"),
    eyebrow: teal ? (hell ? "#0f766e" : "#5fd6d2") : (hell ? "#7e6410" : "#f2d489"),
    footU: teal ? (hell ? "#0f766e" : "#5fd6d2") : (hell ? "#7e6410" : "#e8c15f"),
    tick: teal ? (hell ? "rgba(15,118,110,.85)" : "rgba(95,214,210,.85)") : (hell ? "rgba(168,132,42,.85)" : "rgba(242,212,137,.85)"),
    glowRGB: teal ? "52,196,196" : "217,169,58",
  };
};
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

// Realistisch-cinematische Bildwelt: Anthrazit-Basis (an globals.css navy-950
// angeglichen), kein Sternenfeld. Eyebrow in Teal (Bewusstsein), Tag in Gold
// (Signatur, wie die Website-Wortmarke), Titel in ruhigem Off-White.
// hell=true → Creme-Grund (#f6f4ee, wie Website-Header) statt Navy.
const css = (P) => {
  const hell = P.hell;
  const glows = P.teal
    ? (hell
      ? `radial-gradient(64% 92% at 82% 4%, rgba(52,196,196,.20), transparent 62%),radial-gradient(60% 95% at 4% 100%, rgba(33,178,189,.12), transparent 60%),radial-gradient(50% 80% at 80% 98%, rgba(95,214,210,.12), transparent 60%),`
      : `radial-gradient(58% 90% at 86% 8%, rgba(52,196,196,.18), transparent 60%),radial-gradient(60% 95% at 6% 98%, rgba(33,178,189,.10), transparent 60%),radial-gradient(50% 80% at 78% 96%, rgba(52,196,196,.10), transparent 60%),`)
    : (hell
      ? `radial-gradient(64% 92% at 82% 4%, rgba(232,193,95,.26), transparent 62%),radial-gradient(60% 95% at 4% 100%, rgba(217,169,58,.14), transparent 60%),radial-gradient(50% 80% at 80% 98%, rgba(242,212,137,.14), transparent 60%),`
      : `radial-gradient(58% 90% at 86% 8%, rgba(233,193,95,.18), transparent 60%),radial-gradient(60% 95% at 6% 98%, rgba(168,132,42,.10), transparent 60%),radial-gradient(50% 80% at 78% 96%, rgba(217,169,58,.10), transparent 60%),`);
  const base = hell ? "linear-gradient(160deg,#f8f6f0 0%,#f1eee5 55%,#f6f4ee 100%)" : "linear-gradient(160deg,#0c0e13 0%,#12141c 55%,#090b10 100%)";
  return `
*{margin:0;box-sizing:border-box}
body{width:${W}px;height:${H}px;overflow:hidden;font-family:Inter,sans-serif;position:relative;background:${hell ? "#f6f4ee" : "#090b10"};color:${hell ? "#16231f" : "#f4f7ff"}}
.bg{position:absolute;inset:0;background:${glows}${base}}
.frame{position:absolute;inset:0;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between;z-index:3}
.top{display:flex;align-items:center;justify-content:space-between;gap:28px}
.brand{display:flex;align-items:center;gap:15px}
.logo{width:96px;height:auto;filter:drop-shadow(0 4px 20px rgba(${P.glowRGB},.28))}
.wm{display:flex;flex-direction:column;gap:5px;line-height:1}
.wm1{font-family:Fraunces,serif;font-weight:400;font-size:27px;letter-spacing:.05em;text-transform:uppercase;white-space:nowrap;color:${hell ? "rgba(22,35,31,.92)" : "rgba(244,242,236,.94)"}}
.wm1 em{font-style:normal;background:${P.accent};-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent}
.wm2{display:flex;align-items:center;gap:7px;font-family:Fraunces,serif;font-weight:400;font-size:13px;letter-spacing:.2em;text-transform:uppercase;white-space:nowrap;color:${hell ? "rgba(22,35,31,.66)" : "rgba(244,242,236,.68)"}}
.wm2 i{display:block;height:1px;width:18px;background:${P.tick}}
.tag{padding-top:6px;text-align:right;font-weight:800;font-size:19px;letter-spacing:.14em;text-transform:uppercase;
  background:${P.tagAccent};-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.mid{max-width:820px}
.eyebrow{font-weight:800;font-size:22px;letter-spacing:.13em;text-transform:uppercase;color:${P.eyebrow};margin-bottom:22px}
.title{font-family:Fraunces,serif;font-weight:600;line-height:1.05;letter-spacing:-1px;text-wrap:balance;filter:drop-shadow(0 6px 28px ${hell ? "rgba(246,244,238,.6)" : "rgba(0,0,0,.5)"})}
.sub{margin-top:20px;font-size:29px;line-height:1.34;color:${hell ? "rgba(22,35,31,.72)" : "rgba(244,242,236,.82)"};max-width:760px}
.foot{display:flex;align-items:center;gap:16px}
.foot .u{font-weight:600;font-size:23px;color:${P.footU};letter-spacing:.02em}
.num{position:absolute;right:64px;top:50%;transform:translateY(-50%);z-index:1;font-family:Fraunces,serif;font-weight:600;
  font-size:420px;line-height:.8;color:${hell ? "rgba(22,35,31,.05)" : "rgba(255,255,255,.05)"}}
/* Freigestelltes Porträt rechts (nur Willkommens-Folie) */
.pglow{position:absolute;right:150px;bottom:56px;width:520px;height:520px;border-radius:50%;z-index:1;
  background:radial-gradient(circle, rgba(${P.glowRGB},${hell ? ".26" : ".30"}), transparent 66%);filter:blur(46px)}
.portrait{position:absolute;right:48px;bottom:0;height:704px;width:auto;z-index:2;
  filter:drop-shadow(0 24px 60px rgba(0,0,0,${hell ? ".28" : ".5"}))}
.frame.has-portrait .mid{max-width:600px}
/* Tag nicht über den Kopf: bei Porträt nach oben links neben das Logo, etwas kleiner */
.frame.has-portrait .top{justify-content:flex-start}
.frame.has-portrait .tag{align-self:center;text-align:left;font-size:16px}
`;
};

function thumbHtml({ eyebrow, title, sub, num, portrait, tag }, P) {
  const tf = fit(title, 84, 68, 54);
  return `<!doctype html><html lang="de"><head><meta charset="utf8">
<link rel="stylesheet" href="${fontsUrl}"><style>${css(P)}</style></head>
<body>
  <div class="bg"></div>
  ${num ? `<div class="num">${num}</div>` : ""}
  ${portrait ? `<div class="pglow"></div><img class="portrait" src="${heikoUrl}" alt="">` : ""}
  <div class="frame${portrait ? " has-portrait" : ""}">
    <div class="top">
      <div class="brand"><img class="logo" src="${P.brain}" alt="">
        <div class="wm"><span class="wm1">Werde <em>Meister</em></span><span class="wm2"><i></i>Deiner Gedanken<i></i></span></div></div>
      <div class="tag">${tag ?? "Mitgliederbereich · Video"}</div></div>
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
  data: { eyebrow: "Willkommen", title: "Schön, dass du da bist", sub: "Dein Bereich – so findest du dich zurecht", portrait: true } });
// Persönliche Videobotschaft auf der Startseite (Sektion «Ein anderer
// Blickwinkel»). Öffentlich, daher kein «Mitgliederbereich»-Tag.
JOBS.push({ dir: "landing", name: "ein-anderer-blickwinkel",
  data: { tag: "Videobotschaft", eyebrow: "Ein anderer Blickwinkel",
    title: "Was, wenn es nicht an dir liegt?", sub: "Eine persönliche Botschaft" } });
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
// Optional nur bestimmte Jobs rendern: ONLY=willkommen node docs/marketing/video-thumbnails.mjs
const ONLY = process.env.ONLY?.split(",").map((s) => s.trim()).filter(Boolean);
let n = 0;
for (const j of JOBS) {
  if (ONLY && !ONLY.includes(j.name)) continue;
  const outDir = join(ROOT, "public", "video-thumbnails", j.dir);
  mkdirSync(outDir, { recursive: true });
  // Alle vier Farbwelten je Thumbnail (Gold/Türkis × Navy/Creme).
  for (const theme of THEMES) {
    const tmp = join(HERE, `.thumb.html`);
    writeFileSync(tmp, thumbHtml(j.data, palette(theme)));
    await page.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
    await page.screenshot({ path: join(outDir, `${j.name}${THEME_SUFFIX[theme]}.png`) });
    rmSync(tmp, { force: true });
  }
  n++;
}
await browser.close();
console.log(`✓ ${n} Video-Thumbnails ×4 Welten in public/video-thumbnails/`);
