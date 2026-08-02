/**
 * Social-Banner-Generator (YouTube-Kanalbanner + Facebook-Titelbild).
 * Gleiche Marken-Optik wie das LinkedIn-Banner, zentrierte Komposition
 * (crop-sicher fürs jeweilige „Safe-Area").
 *   node docs/marketing/social-banners.mjs
 */
import { writeFileSync, existsSync, readdirSync, mkdirSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const fontsUrl = pathToFileURL(join(ROOT, "tools/pdf/assets/fonts.css")).href;
const brainUrl = pathToFileURL(join(ROOT, "public/logo-brain.png")).href;

const TARGETS = [
  { key: "youtube", file: "youtube/WMDG-YouTube-Banner.png", w: 2560, h: 1440,
    brain: 340, gap: 76, textW: 820, h1: 72, eb: 18, sub: 21, url: 20, safe: true },
  { key: "facebook", file: "facebook/WMDG-Facebook-Cover.png", w: 1640, h: 624,
    brain: 290, gap: 60, textW: 720, h1: 60, eb: 16, sub: 19, url: 18, safe: false },
  { key: "instagram", file: "instagram/WMDG-Instagram-Story.png", w: 1080, h: 1920,
    brain: 460, gap: 56, textW: 920, h1: 82, eb: 20, sub: 27, url: 24, vertical: true },
];

const css = (t) => `
*{margin:0;box-sizing:border-box}
body{width:${t.w}px;height:${t.h}px;overflow:hidden;font-family:Inter,sans-serif;position:relative;background:#08102a}
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
  radial-gradient(1.1px 1.1px at 44% 74%,rgba(255,255,255,.4),transparent);}
.wrap{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;align-items:center;gap:${t.gap}px}
${t.vertical ? `.wrap{flex-direction:column-reverse;text-align:center;gap:52px} .content{width:auto;max-width:${t.textW}px} .sub{margin-left:auto;margin-right:auto} .eyebrow{margin-bottom:20px}` : ""}
.content{width:${t.textW}px}
.eyebrow{font-size:${t.eb}px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:#34c4c4;margin-bottom:16px}
h1{font-family:Fraunces,serif;font-weight:600;color:#f4f2ec;font-size:${t.h1}px;line-height:1.04;letter-spacing:-.5px}
h1 em{background:linear-gradient(100deg,#a3d64f,#34c4c4);-webkit-background-clip:text;background-clip:text;color:transparent;font-style:italic}
.sub{margin-top:18px;font-size:${t.sub}px;color:rgba(244,242,236,.72);line-height:1.4;max-width:${t.textW}px}
.url{margin-top:22px;font-size:${t.url}px;font-weight:700;color:#a3d64f;letter-spacing:.3px}
.bwrap{position:relative;flex:0 0 auto}
.glow{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:${Math.round(t.brain*0.92)}px;height:${Math.round(t.brain*0.92)}px;border-radius:50%;background:radial-gradient(circle, rgba(52,196,196,.35), transparent 66%);filter:blur(30px)}
.brain{position:relative;width:${t.brain}px;height:${t.brain}px;object-fit:contain;filter:drop-shadow(0 10px 60px rgba(52,196,196,.45))}
`;

const htmlFor = (t) => `<!doctype html><html><head><meta charset="utf8">
<link rel="stylesheet" href="${fontsUrl}"><style>${css(t)}</style></head><body>
<div class="bg"></div><div class="stars"></div>
<div class="wrap">
  <div class="content">
    <div class="eyebrow">Bewusstsein · Mentale Selbstverteidigung · 7 Stufen</div>
    <h1>Werde Meister deiner <em>Gedanken</em>.</h1>
    <div class="sub">Raus aus dem Autopilot – rein in echte innere Klarheit. Schritt für Schritt.</div>
    <div class="url">www.werdemeisterdeinergedanken.de</div>
  </div>
  <div class="bwrap"><div class="glow"></div><img class="brain" src="${brainUrl}"></div>
</div></body></html>`;

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
  const tmp = join(HERE, `.${t.key}.html`);
  writeFileSync(tmp, htmlFor(t));
  await page.goto(pathToFileURL(tmp).href, { waitUntil:"networkidle" });
  mkdirSync(join(HERE, dirname(t.file)), { recursive:true });
  await page.screenshot({ path: join(HERE, t.file) });
  await page.close(); rmSync(tmp,{force:true});
  console.log("✓", t.file, `${t.w}×${t.h}`);
}
await browser.close();
