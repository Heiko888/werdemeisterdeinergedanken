/**
 * WhatsApp-Business-Banner – Safe-Zone-Vorlage (Arbeitsfläche 1920×1080).
 * Markiert: Arbeitsfläche, Safe-Zone für Logo/Text, Rand-Bereiche die je nach
 * Display abgeschnitten werden können, und die Position des mittigen
 * Profilbildes (dort nichts Wichtiges platzieren).
 *
 *   node docs/marketing/whatsapp-safezone.mjs
 */
import { writeFileSync, existsSync, readdirSync, mkdirSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const fontsUrl = pathToFileURL(join(ROOT, "tools/pdf/assets/fonts.css")).href;

const W = 1920, H = 1080;
// Rand, der je nach Display/Zuschnitt wegfallen kann (≈ 7 % je Seite).
const CROP = Math.round(W * 0.07); // 134 px seitlich
const CROP_Y = Math.round(H * 0.07); // 76 px oben/unten
// Safe-Zone: alles Wichtige innerhalb dieses Rahmens.
const SAFE_X = CROP, SAFE_Y = CROP_Y;
const SAFE_W = W - 2 * CROP, SAFE_H = H - 2 * CROP_Y;
// Profilbild: WhatsApp legt es mittig; hier unteres Drittel, mittig.
const PB_CX = Math.round(W * 0.5), PB_CY = Math.round(H * 0.66), PB_R = Math.round(W * 0.13);
// Empfohlene Textspalte (links, frei vom Profilbild). Etwas nach unten
// gerückt, damit oben Platz für die Beschriftungen bleibt.
const TEXT_X = SAFE_X + 20, TEXT_Y = SAFE_Y + 150;
const TEXT_W = PB_CX - PB_R - TEXT_X - 40, TEXT_H = SAFE_H - 170;

const html = `<!doctype html><html><head><meta charset="utf8">
<link rel="stylesheet" href="${fontsUrl}"><style>
*{margin:0;box-sizing:border-box}
body{width:${W}px;height:${H}px;overflow:hidden;font-family:Inter,sans-serif;position:relative;background:#08102a}
.bg{position:absolute;inset:0;background:
  radial-gradient(50% 120% at 88% 12%, rgba(233,193,95,.30), transparent 60%),
  radial-gradient(46% 120% at 6% 96%, rgba(168,132,42,.24), transparent 60%),
  radial-gradient(40% 90% at 74% 90%, rgba(242,212,137,.14), transparent 60%),
  #08102a;}
/* Crop-Bänder (können abgeschnitten werden) */
.crop{position:absolute;background:
  repeating-linear-gradient(45deg, rgba(255,90,90,.16) 0 14px, rgba(255,90,90,0) 14px 28px);
  border:1px dashed rgba(255,120,120,.55)}
.crop.top{left:0;top:0;width:${W}px;height:${CROP_Y}px}
.crop.bottom{left:0;bottom:0;width:${W}px;height:${CROP_Y}px}
.crop.left{left:0;top:0;width:${CROP}px;height:${H}px}
.crop.right{right:0;top:0;width:${CROP}px;height:${H}px}
.croplbl{position:absolute;bottom:${Math.round(CROP_Y/2)}px;left:50%;transform:translate(-50%,50%);
  font-size:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,160,160,.95)}
/* Safe-Zone */
.safe{position:absolute;left:${SAFE_X}px;top:${SAFE_Y}px;width:${SAFE_W}px;height:${SAFE_H}px;
  border:2px dashed rgba(242,212,137,.85);border-radius:10px}
.safelbl{position:absolute;right:${CROP + 14}px;top:${SAFE_Y + 14}px;text-align:right;
  font-size:17px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#f2d489}
/* Empfohlene Textspalte */
.textzone{position:absolute;left:${TEXT_X}px;top:${TEXT_Y}px;width:${TEXT_W}px;height:${TEXT_H}px;
  border:2px solid rgba(233,193,95,.85);border-radius:10px;background:rgba(233,193,95,.06);
  display:flex;flex-direction:column;justify-content:center;gap:18px;padding:0 34px}
.tz-eyebrow{font-size:19px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#f2d489}
.tz-h{font-family:Fraunces,serif;font-weight:600;color:#f4f2ec;font-size:60px;line-height:1.05;letter-spacing:-.5px}
.tz-h em{font-style:italic;background:linear-gradient(100deg,#f2d489,#d9a93a);-webkit-background-clip:text;background-clip:text;color:transparent}
.tz-note{position:absolute;left:${TEXT_X}px;top:${TEXT_Y - 30}px;font-size:15px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#f2d489}
/* Profilbild */
.pb{position:absolute;left:${PB_CX - PB_R}px;top:${PB_CY - PB_R}px;width:${PB_R*2}px;height:${PB_R*2}px;
  border-radius:50%;border:3px solid rgba(168,132,42,.95);
  background:rgba(8,16,42,.72);backdrop-filter:blur(2px);
  display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:8px}
.pb b{font-size:26px;font-weight:800;color:#fff;letter-spacing:1px}
.pb span{font-size:15px;color:rgba(255,255,255,.8);max-width:70%;line-height:1.35}
/* Titel oben */
.title{position:absolute;left:50%;top:${Math.round(CROP_Y/2)}px;transform:translate(-50%,-50%);
  font-size:16px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:rgba(244,242,236,.92)}
.dims{position:absolute;right:${CROP + 12}px;bottom:${CROP_Y + 10}px;
  font-size:15px;font-weight:700;letter-spacing:1px;color:rgba(244,242,236,.6)}
/* Mittelachsen (dezent) */
.axis{position:absolute;background:rgba(255,255,255,.08)}
.axis.v{left:${PB_CX}px;top:0;width:1px;height:${H}px}
.axis.h{left:0;top:${Math.round(H/2)}px;width:${W}px;height:1px}
</style></head><body>
<div class="bg"></div>
<div class="axis v"></div><div class="axis h"></div>

<div class="crop top"></div><div class="crop bottom"></div>
<div class="crop left"></div><div class="crop right"></div>
<div class="title">WhatsApp-Business-Banner · Vorlage mit Safe-Zone</div>
<div class="croplbl">Randbereich – kann je nach Display abgeschnitten werden</div>

<div class="safe"></div>
<div class="safelbl">Safe-Zone · alles Wichtige hier hinein</div>

<div class="tz-note">Empfohlene Textspalte (frei vom Profilbild)</div>
<div class="textzone">
  <div class="tz-eyebrow">Mentale Selbstverteidigung</div>
  <div class="tz-h">Werde Meister deiner <em>Gedanken</em>.</div>
</div>

<div class="pb"><b>Profilbild</b><span>WhatsApp legt es mittig darüber – hier nichts Wichtiges platzieren</span></div>

<div class="dims">Arbeitsfläche 1920 × 1080 px</div>
</body></html>`;

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
const page = await browser.newPage({ viewport:{ width:W, height:H }, deviceScaleFactor:1 });
const tmp = join(HERE, ".safezone.html");
writeFileSync(tmp, html);
await page.goto(pathToFileURL(tmp).href, { waitUntil:"networkidle" });
const out = join(HERE, "whatsapp", "WMDG-WhatsApp-SafeZone-Vorlage.png");
mkdirSync(dirname(out), { recursive:true });
await page.screenshot({ path: out });
await page.close(); rmSync(tmp,{force:true});
await browser.close();
console.log("✓ whatsapp/WMDG-WhatsApp-SafeZone-Vorlage.png", `${W}×${H}`);
