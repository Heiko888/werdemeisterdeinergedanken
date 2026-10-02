/**
 * Animierte Marken-Folie – nur der Schriftzug „WERDE MEISTER / DEINER GEDANKEN"
 * (Original-Lockup wie Header/Briefbogen, MEISTER im Gold-Verlauf), ohne
 * Emblem, ohne weiteren Text.
 *
 *   npm run video-marken-folie     # = node tools/video/marken-folie.mjs
 *
 * Gleiche Technik wie tools/video/cta-folie.mjs: selbst-enthaltenes HTML,
 * Playwright setzt pro Frame alle CSS-Animationen auf die Zielzeit, ffmpeg
 * kodiert das MP4.
 *
 * Ausgabe (docs/video/marken-folie/):
 *   marken-folie.html                  – Animation zum Ansehen im Browser
 *   marken-folie-16x9.mp4              – 1920×1080
 *   marken-folie-9x16.mp4              – 1080×1920 (Reels / Shorts / Stories)
 *   marken-folie-16x9.png / -9x16.png  – Standbild (Endzustand)
 */
import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CONTACT, C } from "../print/marke.mjs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const OUT = join(ROOT, "docs", "video", "marken-folie");
const L = CONTACT.lockup; // { pre: "Werde", gold: "Meister", sub: "Deiner Gedanken" }

const FPS = 30;
const DURATION = 4; // Sekunden (Einblendung ~2,4 s, danach ruhig stehen)

const FORMATS = [
  { id: "16x9", w: 1920, h: 1080 },
  { id: "9x16", w: 1080, h: 1920 },
];

const font = (f) =>
  readFileSync(join(ROOT, "src", "app", "fonts", f)).toString("base64");
const INTER = font("Inter-latin-variable.woff2");

const letters = (word, start, step) =>
  [...word.toUpperCase()]
    .map((ch, i) => `<span style="animation-delay:${(start + i * step).toFixed(2)}s">${ch}</span>`)
    .join("");

const html = (w, h) => {
  const portrait = h > w;
  const fs = portrait ? 90 : 150; // Größe Zeile 1 (Lockup-Verhältnis 13 : 5)
  const fs2 = fs * (5 / 13);
  const bar = fs * (5 / 13);
  return `<!doctype html>
<html lang="de"><head><meta charset="utf-8">
<title>Werde Meister deiner Gedanken</title>
<style>
@font-face{font-family:Inter;src:url(data:font/woff2;base64,${INTER}) format("woff2");font-weight:100 900}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${w}px;height:${h}px;overflow:hidden;background:${C.paper}}
.stage{position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center;
  background:radial-gradient(ellipse at 50% 50%,#fffdf6 0%,${C.paper} 55%,#ece8dc 100%)}
.glow{position:absolute;left:50%;top:50%;width:${fs * 9}px;height:${fs * 5}px;margin:${-fs * 2.5}px 0 0 ${-fs * 4.5}px;
  border-radius:50%;background:radial-gradient(ellipse,rgba(232,193,95,.30) 0%,rgba(232,193,95,0) 65%);
  opacity:0;animation:fade 1.4s ease .2s forwards, breathe 3s ease-in-out 1.6s infinite}
@keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}
.wm{position:relative;display:flex;flex-direction:column;align-items:center}
.l1{font-family:Inter,sans-serif;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  font-size:${fs}px;line-height:1;color:${C.ink};white-space:nowrap;display:flex}
.l1 .pre span{display:inline-block;opacity:0;filter:blur(${fs * 0.08}px);
  animation:rise .7s cubic-bezier(.2,.8,.2,1) forwards}
.l1 .gap{width:.32em}
.l1 .g{position:relative;display:inline-block;
  background:linear-gradient(100deg,${C.gold500} 0%,${C.gold700} 40%,#fff3c4 50%,${C.gold700} 60%,${C.gold500} 100%);
  background-size:300% 100%;background-position:100% 0;
  -webkit-background-clip:text;background-clip:text;color:transparent;
  clip-path:inset(0 100% 0 0);
  animation:wipe .9s cubic-bezier(.65,0,.35,1) .75s forwards, shine 1.2s ease-in-out 2.1s forwards}
@keyframes wipe{to{clip-path:inset(0 -5% 0 0)}}
@keyframes shine{from{background-position:100% 0}to{background-position:0% 0}}
@keyframes rise{0%{transform:translateY(${fs * 0.35}px);opacity:0;filter:blur(${fs * 0.08}px)}
  100%{transform:none;opacity:1;filter:blur(0)}}
.l2{margin-top:${fs * 0.24}px;display:flex;align-items:center;gap:${fs * 0.24}px;
  font-family:Inter,sans-serif;font-weight:600;text-transform:uppercase;font-size:${fs2}px;color:${C.ink}}
.l2 i{display:block;width:${bar}px;height:${Math.max(3, fs * 0.07)}px;
  background:linear-gradient(90deg,${C.gold500},${C.gold600});transform:scaleX(0);
  animation:grow .7s cubic-bezier(.2,.8,.2,1) 1.45s forwards}
.l2 i:first-child{transform-origin:100% 50%}
.l2 i:last-child{transform-origin:0 50%}
.l2 span{letter-spacing:.6em;padding-left:.6em;opacity:0;
  animation:track 1s cubic-bezier(.2,.8,.2,1) 1.3s forwards}
@keyframes track{to{letter-spacing:.26em;padding-left:.26em;opacity:1}}
@keyframes grow{to{transform:scaleX(1)}}
@keyframes fade{to{opacity:1}}
</style></head>
<body><div class="stage">
  <div class="glow"></div>
  <div class="wm" aria-label="${L.pre} ${L.gold} ${L.sub}">
    <div class="l1"><span class="pre">${letters(L.pre, 0.15, 0.08)}</span><span class="gap"></span><span class="g">${L.gold.toUpperCase()}</span></div>
    <div class="l2"><i></i><span>${L.sub.toUpperCase()}</span><i></i></div>
  </div>
</div></body></html>`;
};

function ffmpeg(args) {
  const p = spawn("ffmpeg", args, { stdio: ["pipe", "ignore", "inherit"] });
  const done = new Promise((res, rej) =>
    p.on("close", (c) => (c === 0 ? res() : rej(new Error(`ffmpeg exit ${c}`)))),
  );
  return { stdin: p.stdin, done };
}

const seek = (page, t) =>
  page.evaluate((ms) => {
    for (const a of document.getAnimations()) {
      a.pause();
      a.currentTime = ms;
    }
  }, t);

async function render(browser, { id, w, h }) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.setContent(html(w, h));
  await page.evaluate(() => document.fonts.ready);

  const mp4 = join(OUT, `marken-folie-${id}.mp4`);
  const enc = ffmpeg([
    "-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS),
    "-i", "-", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18",
    "-preset", "slow", "-movflags", "+faststart", mp4,
  ]);
  const frames = FPS * DURATION;
  for (let i = 0; i < frames; i++) {
    await seek(page, (i / FPS) * 1000);
    const buf = await page.screenshot({ type: "png" });
    if (!enc.stdin.write(buf)) await new Promise((r) => enc.stdin.once("drain", r));
  }
  enc.stdin.end();
  await enc.done;

  await seek(page, DURATION * 1000 - 1);
  await page.screenshot({ path: join(OUT, `marken-folie-${id}.png`) });
  await page.close();
  console.log(`✓ ${id}: ${frames} Frames → ${mp4}`);
}

mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, "marken-folie.html"), html(1920, 1080));
const browser = await chromium.launch();
for (const f of FORMATS) await render(browser, f);
await browser.close();
