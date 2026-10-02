/**
 * Animierte Einblende-Folien „Volles Video auf YouTube" / „… auf Instagram"
 * (jeweils mit animiertem Plattform-Logo).
 *
 *   npm run video-cta-folie              # alle Varianten
 *   npm run video-cta-folie -- youtube   # nur eine Variante
 *
 * Baut eine selbst-enthaltene HTML-Animation (Fonts eingebettet) und rendert
 * sie per Playwright Frame für Frame (deterministisch über die Web-Animations-
 * API) und ffmpeg als MP4 – im hellen Creme-Branding der Video-Folien
 * (tools/video/foliensatz.py).
 *
 * Ausgabe je Variante (docs/video/<id>-folie/):
 *   <id>-folie.html                    – Animation zum Ansehen im Browser
 *   <id>-folie-16x9.mp4                – 1920×1080 (Langvideo)
 *   <id>-folie-9x16.mp4                – 1080×1920 (Reels / Shorts / Stories)
 *   <id>-folie-16x9.png / -9x16.png    – Standbild (Endzustand)
 *
 * Texte unten in VARIANTS anpassen und neu bauen.
 */
import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const KICKER = "Werde Meister deiner Gedanken";

const FPS = 30;
const DURATION = 4; // Sekunden (Einblendung ~2,7 s, danach kurz ruhig stehen)

const FORMATS = [
  { id: "16x9", w: 1920, h: 1080 },
  { id: "9x16", w: 1080, h: 1920 },
];

// ---------- Fonts (eingebettet) --------------------------------------------
const font = (f) =>
  readFileSync(join(ROOT, "src", "app", "fonts", f)).toString("base64");
const FRAUNCES = font("Fraunces-latin-variable.woff2");
const INTER = font("Inter-latin-variable.woff2");

// ---------- YouTube-Glyph (Play-Dreieck auf rotem Rechteck) -----------------
const YT_LOGO = `
<svg viewBox="0 0 512 360" class="ig" aria-label="YouTube">
  <defs>
    <linearGradient id="ytA" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ff2a2a"/>
      <stop offset="1" stop-color="#e00000"/>
    </linearGradient>
    <linearGradient id="igShine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/>
      <stop offset="0.5" stop-color="#fff" stop-opacity="0.5"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="igClip"><rect width="512" height="360" rx="96"/></clipPath>
  </defs>
  <rect width="512" height="360" rx="96" fill="url(#ytA)"/>
  <g clip-path="url(#igClip)">
    <rect class="ig-shine" x="-260" y="-160" width="160" height="680"
          fill="url(#igShine)" transform="rotate(20 256 180)"/>
  </g>
  <path class="ig-draw yt-play" d="M206 112 L328 180 L206 248 Z" fill="#fff"
        stroke="#fff" stroke-width="18" stroke-linejoin="round"/>
</svg>`;

// ---------- Instagram-Glyph (Kamera-Outline auf Verlaufs-Quadrat) -----------
const IG_LOGO = `
<svg viewBox="0 0 512 512" class="ig" aria-label="Instagram">
  <defs>
    <radialGradient id="igA" cx="0.28" cy="1.05" r="1.25">
      <stop offset="0" stop-color="#fdf497"/>
      <stop offset="0.08" stop-color="#fdf497"/>
      <stop offset="0.45" stop-color="#fd5949"/>
      <stop offset="0.62" stop-color="#d6249f"/>
      <stop offset="0.9" stop-color="#285AEB"/>
    </radialGradient>
    <linearGradient id="igShine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/>
      <stop offset="0.5" stop-color="#fff" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="igClip"><rect width="512" height="512" rx="120"/></clipPath>
  </defs>
  <rect width="512" height="512" rx="120" fill="url(#igA)"/>
  <g clip-path="url(#igClip)">
    <rect class="ig-shine" x="-260" y="-100" width="160" height="712"
          fill="url(#igShine)" transform="rotate(20 256 256)"/>
  </g>
  <g fill="none" stroke="#fff" stroke-width="34" stroke-linecap="round">
    <rect class="ig-draw ig-frame" x="106" y="106" width="300" height="300" rx="86"/>
    <circle class="ig-draw ig-lens" cx="256" cy="256" r="72"/>
  </g>
  <circle class="ig-dot" cx="351" cy="161" r="22" fill="#fff"/>
</svg>`;

// ---------- Varianten -------------------------------------------------------
const VARIANTS = {
  youtube: {
    platform: "YouTube",
    logo: YT_LOGO,
    ratio: 360 / 512, // Logo-Höhe : -Breite
    shadow: "rgba(224,0,0,.28)",
    accent: "linear-gradient(90deg,#e00000,#ff4d2e 55%,var(--gold))",
    link: "youtube.com/@WerdeMeisterdeinerGedanken",
  },
  instagram: {
    platform: "Instagram",
    logo: IG_LOGO,
    ratio: 1,
    shadow: "rgba(214,36,159,.28)",
    accent: "linear-gradient(90deg,#d6249f,#fd5949 55%,var(--gold))",
    link: "instagram.com/werde.meister.deiner.gedanken",
  },
};

// ---------- HTML ------------------------------------------------------------
const html = (v, w, h) => {
  const portrait = h > w;
  const u = Math.min(w, h) / 1080; // Basiseinheit
  const logo = (portrait ? 360 : 300) * u * (v.ratio < 1 ? 1.25 : 1);
  const logoH = logo * v.ratio;
  return `<!doctype html>
<html lang="de"><head><meta charset="utf-8">
<title>Volles Video auf ${v.platform}</title>
<style>
@font-face{font-family:Fraunces;src:url(data:font/woff2;base64,${FRAUNCES}) format("woff2");font-weight:100 900}
@font-face{font-family:Inter;src:url(data:font/woff2;base64,${INTER}) format("woff2");font-weight:100 900}
:root{--paper:#f6f4ee;--ink:#16231f;--mid:#48524e;--muted:#626b67;
  --gold:#d9a93a;--gold-deep:#7e6410;--gold-light:#e8c15f}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${w}px;height:${h}px;overflow:hidden;background:var(--paper)}
.stage{position:relative;width:100%;height:100%;display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:${(portrait ? 64 : 44) * u}px;
  font-family:Inter,sans-serif;color:var(--ink);
  background:radial-gradient(ellipse at 50% ${portrait ? 40 : 45}%,#fffdf6 0%,var(--paper) 55%,#ece8dc 100%)}
/* goldene Ringe hinter dem Logo */
.halo{position:absolute;inset:0;z-index:-1;pointer-events:none}
.ring{position:absolute;inset:0;border-radius:${v.ratio < 1 ? 26 : 28}%;border:${3 * u}px solid var(--gold);opacity:0}
.ring:nth-child(1){animation:ring 2.4s cubic-bezier(.2,.7,.3,1) .5s infinite}
.ring:nth-child(2){animation:ring 2.4s cubic-bezier(.2,.7,.3,1) 1.3s infinite}
.ring:nth-child(3){animation:ring 2.4s cubic-bezier(.2,.7,.3,1) 2.1s infinite}
@keyframes ring{0%{transform:scale(1);opacity:.55}100%{transform:scale(1.9);opacity:0}}
.glow{position:absolute;z-index:-2;left:50%;top:50%;width:${logo * 2.4}px;height:${logo * 2.4}px;
  margin-left:${-logo * 1.2}px;margin-top:${-logo * 1.2}px;border-radius:50%;
  background:radial-gradient(circle,rgba(232,193,95,.35) 0%,rgba(232,193,95,0) 65%);
  opacity:0;animation:fade 1.2s ease .3s forwards, breathe 3s ease-in-out 1.5s infinite}
@keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}

.kicker{font-family:Fraunces,serif;font-size:${(portrait ? 30 : 26) * u}px;letter-spacing:.32em;
  text-transform:uppercase;color:var(--muted);opacity:0;animation:up .9s cubic-bezier(.2,.8,.2,1) .1s forwards}
.kicker b{color:var(--gold-deep);font-weight:500}

.logo-wrap{width:${logo}px;height:${logoH}px;position:relative;z-index:1;isolation:isolate;
  animation:pop 1s cubic-bezier(.34,1.56,.64,1) .25s both, float 3s ease-in-out 1.6s infinite}
.ig{width:100%;height:100%;display:block;filter:drop-shadow(0 ${18 * u}px ${36 * u}px ${v.shadow})}
@keyframes pop{0%{transform:scale(0) rotate(-14deg);opacity:0}100%{transform:scale(1) rotate(0);opacity:1}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(${-10 * u}px)}}
.ig-draw{stroke-dasharray:1200;stroke-dashoffset:1200;animation:draw 1s ease-out .7s forwards}
.ig-lens{stroke-dasharray:460;stroke-dashoffset:460;animation-delay:.95s}
@keyframes draw{to{stroke-dashoffset:0}}
.yt-play{stroke-dasharray:520;stroke-dashoffset:520;fill-opacity:0;transform-box:fill-box;transform-origin:center;
  animation:draw .7s ease-out .7s forwards, fillin .4s ease-out 1.2s forwards, beat 3s ease-in-out 2.2s infinite}
@keyframes fillin{to{fill-opacity:1}}
@keyframes beat{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
.ig-dot{transform-origin:351px 161px;transform:scale(0);animation:dot .45s cubic-bezier(.34,1.56,.64,1) 1.45s forwards}
@keyframes dot{to{transform:scale(1)}}
.ig-shine{animation:shine 1.1s ease-in-out 1.7s both, shine 1.1s ease-in-out 4.4s}
@keyframes shine{0%{transform:rotate(20deg) translateX(0)}100%{transform:rotate(20deg) translateX(820px)}}

h1{font-family:Fraunces,serif;font-weight:600;line-height:1.05;text-align:center;
  font-size:${(portrait ? 112 : 104) * u}px;letter-spacing:-.01em;z-index:1}
h1 span{display:block;opacity:0;animation:up .9s cubic-bezier(.2,.8,.2,1) forwards}
h1 span:nth-child(1){animation-delay:1.05s}
h1 span:nth-child(2){animation-delay:1.3s}
h1 em{font-style:italic;font-weight:500;
  background:${v.accent};
  -webkit-background-clip:text;background-clip:text;color:transparent}
@keyframes up{0%{transform:translateY(${40 * u}px);opacity:0}100%{transform:none;opacity:1}}
@keyframes fade{to{opacity:1}}

.rule{width:${(portrait ? 260 : 220) * u}px;height:${3 * u}px;background:var(--gold);
  transform:scaleX(0);animation:grow .8s cubic-bezier(.2,.8,.2,1) 1.6s forwards}
@keyframes grow{to{transform:scaleX(1)}}

.link{display:flex;align-items:center;gap:${16 * u}px;padding:${18 * u}px ${36 * u}px;
  border-radius:999px;border:${2 * u}px solid rgba(168,132,42,.55);background:#fff;
  box-shadow:0 ${10 * u}px ${30 * u}px rgba(22,35,31,.08);
  font-size:${(portrait ? 36 : 32) * u}px;font-weight:500;color:var(--ink);letter-spacing:.01em;
  opacity:0;animation:up .9s cubic-bezier(.2,.8,.2,1) 1.85s forwards, nudge 3s ease-in-out 3s infinite}
.link svg{width:${(portrait ? 36 : 32) * u}px;height:${(portrait ? 36 : 32) * u}px;flex:none}
@keyframes nudge{0%,100%{box-shadow:0 ${10 * u}px ${30 * u}px rgba(22,35,31,.08)}
  50%{box-shadow:0 ${10 * u}px ${30 * u}px rgba(22,35,31,.08),0 0 0 ${10 * u}px rgba(232,193,95,.25)}}
</style></head>
<body><div class="stage">
  <div class="kicker">${KICKER.replace("Meister", "<b>Meister</b>")}</div>
  <div class="logo-wrap">
    <div class="glow"></div>
    <div class="halo"><div class="ring"></div><div class="ring"></div><div class="ring"></div></div>
    ${v.logo}
  </div>
  <h1><span>Volles Video</span><span>auf <em>${v.platform}</em></span></h1>
  <div class="rule"></div>
  <div class="link">
    <svg viewBox="0 0 24 24" fill="none" stroke="#7e6410" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5"/>
      <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5"/>
    </svg>${v.link}
  </div>
</div></body></html>`;
};

// ---------- Rendern ---------------------------------------------------------
function ffmpeg(args) {
  const p = spawn("ffmpeg", args, { stdio: ["pipe", "ignore", "inherit"] });
  const done = new Promise((res, rej) =>
    p.on("close", (c) => (c === 0 ? res() : rej(new Error(`ffmpeg exit ${c}`)))),
  );
  return { stdin: p.stdin, done };
}

async function render(browser, name, out, { id, w, h }) {
  const src = html(VARIANTS[name], w, h);
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.setContent(src);
  await page.evaluate(() => document.fonts.ready);

  const mp4 = join(out, `${name}-folie-${id}.mp4`);
  const enc = ffmpeg([
    "-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS),
    "-i", "-", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18",
    "-preset", "slow", "-movflags", "+faststart", mp4,
  ]);
  const frames = FPS * DURATION;
  for (let i = 0; i < frames; i++) {
    const ms = (i / FPS) * 1000;
    await page.evaluate((t) => {
      for (const a of document.getAnimations()) {
        a.pause();
        a.currentTime = t;
      }
    }, ms);
    const buf = await page.screenshot({ type: "png" });
    if (!enc.stdin.write(buf)) await new Promise((r) => enc.stdin.once("drain", r));
  }
  enc.stdin.end();
  await enc.done;

  // Standbild im Endzustand (alle Einblendungen fertig, Ringe aus)
  await page.evaluate(() => {
    for (const a of document.getAnimations()) {
      a.pause();
      a.currentTime = 2900;
    }
    document.querySelectorAll(".ring").forEach((r) => (r.style.display = "none"));
  });
  await page.screenshot({ path: join(out, `${name}-folie-${id}.png`) });
  await page.close();
  console.log(`✓ ${name} ${id}: ${frames} Frames → ${mp4}`);
}

const wanted = process.argv.slice(2);
const names = wanted.length ? wanted : Object.keys(VARIANTS);
for (const n of names) if (!VARIANTS[n]) throw new Error(`Unbekannte Variante: ${n}`);

const browser = await chromium.launch();
for (const name of names) {
  const out = join(ROOT, "docs", "video", `${name}-folie`);
  mkdirSync(out, { recursive: true });
  writeFileSync(join(out, `${name}-folie.html`), html(VARIANTS[name], 1920, 1080));
  for (const f of FORMATS) await render(browser, name, out, f);
}
await browser.close();
