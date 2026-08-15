/**
 * Profilbild-Generator (rund + quadratisch) mit dem Gehirn-Logo auf
 * Marken-Hintergrund. Gleiche Optik wie die Social-Banner.
 *   node docs/marketing/profile-avatar.mjs
 *
 * Ausgabe (docs/marketing/profil/):
 *   WMDG-Profilbild-1080.png        1080×1080, quadratisch (Upload → Kreis-Crop)
 *   WMDG-Profilbild-rund-1080.png   1080×1080, echter Kreis (Ecken transparent)
 *   WMDG-Profilbild-rund-500.png    500×500, echter Kreis (kompakt)
 */
import { writeFileSync, existsSync, readdirSync, mkdirSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const brainUrl = pathToFileURL(join(ROOT, "public/logo-brain-frei.png")).href;

// r = Rand-Radius in px (0 = quadratisch, w/2 = Vollkreis)
const TARGETS = [
  { key: "square",   file: "profil/WMDG-Profilbild-1080.png",       w: 1080, round: false },
  { key: "round1080", file: "profil/WMDG-Profilbild-rund-1080.png", w: 1080, round: true },
  { key: "round500",  file: "profil/WMDG-Profilbild-rund-500.png",  w: 500,  round: true },
];

const css = (t) => `
*{margin:0;box-sizing:border-box}
html,body{width:${t.w}px;height:${t.w}px;overflow:hidden;background:transparent}
.disc{position:relative;width:${t.w}px;height:${t.w}px;overflow:hidden;
  ${t.round ? "border-radius:50%;" : ""}
  background:
    radial-gradient(60% 60% at 50% 38%, rgba(33,178,189,.30), transparent 62%),
    radial-gradient(70% 70% at 22% 88%, rgba(54,112,238,.24), transparent 60%),
    radial-gradient(60% 60% at 82% 84%, rgba(140,198,63,.16), transparent 60%),
    #08102a;}
.stars{position:absolute;inset:0;background-image:
  radial-gradient(1.6px 1.6px at 26% 30%,rgba(255,255,255,.7),transparent),
  radial-gradient(1.5px 1.5px at 68% 24%,rgba(255,255,255,.5),transparent),
  radial-gradient(1.3px 1.3px at 80% 60%,rgba(180,210,255,.55),transparent),
  radial-gradient(1.2px 1.2px at 40% 72%,rgba(255,255,255,.45),transparent),
  radial-gradient(1.4px 1.4px at 88% 40%,rgba(200,180,255,.5),transparent);}
.ring{position:absolute;inset:${Math.round(t.w*0.02)}px;border-radius:50%;
  ${t.round ? `border:${Math.max(2,Math.round(t.w*0.006))}px solid rgba(163,214,79,.28);` : ""}}
.glow{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
  width:${Math.round(t.w*0.62)}px;height:${Math.round(t.w*0.62)}px;border-radius:50%;
  background:radial-gradient(circle, rgba(52,196,196,.40), transparent 66%);filter:blur(${Math.round(t.w*0.03)}px)}
.brain{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
  width:${Math.round(t.w*0.56)}px;height:auto;object-fit:contain;
  filter:drop-shadow(0 ${Math.round(t.w*0.01)}px ${Math.round(t.w*0.055)}px rgba(52,196,196,.5))}
`;

const htmlFor = (t) => `<!doctype html><html><head><meta charset="utf8">
<style>${css(t)}</style></head><body>
<div class="disc">
  <div class="stars"></div>
  <div class="glow"></div>
  <img class="brain" src="${brainUrl}">
  <div class="ring"></div>
</div></body></html>`;

const require = createRequire(import.meta.url);
function findChrome(){
  if(process.env.CHROME_BIN && existsSync(process.env.CHROME_BIN)) return process.env.CHROME_BIN;
  try{ const p=require("playwright").chromium.executablePath(); if(p && existsSync(p)) return p; }catch{}
  for(const r of [process.env.PLAYWRIGHT_BROWSERS_PATH,"/opt/pw-browsers"].filter(Boolean)){
    try{ for(const d of readdirSync(r)){ if(d.startsWith("chromium")){ const p=join(r,d,"chrome-linux/chrome"); if(existsSync(p)) return p; } } }catch{}
  }
  throw new Error("Kein Chromium/Chrome gefunden.");
}
const { chromium } = require("playwright");
const browser = await chromium.launch({ executablePath: findChrome() });
for (const t of TARGETS){
  const page = await browser.newPage({ viewport:{ width:t.w, height:t.w }, deviceScaleFactor:1 });
  const tmp = join(HERE, `.avatar-${t.key}.html`);
  writeFileSync(tmp, htmlFor(t));
  await page.goto(pathToFileURL(tmp).href, { waitUntil:"networkidle" });
  mkdirSync(join(HERE, dirname(t.file)), { recursive:true });
  await page.screenshot({ path: join(HERE, t.file), omitBackground: t.round });
  await page.close();
  rmSync(tmp,{force:true});
  console.log("✓", t.file, `${t.w}×${t.w}`, t.round ? "(rund, transparent)" : "(quadratisch)");
}
await browser.close();
