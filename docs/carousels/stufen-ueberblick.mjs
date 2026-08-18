/**
 * Überblick-Carousel „Die 7 Stufen deiner Meisterschaft" – 9 Slides (4:5).
 * Cover + 7 Stufen (je 1 Slide) + CTA. Eigenständig, im Carousel-Studio-Look.
 * Website-konforme Stufen-Benennung.
 *
 *   node docs/carousels/stufen-ueberblick.mjs [ausgabe-verzeichnis]
 */
import { readFileSync, existsSync, readdirSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { ARROW } from "../_glyphs.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const COVERS = join(ROOT, "docs", "reels", "covers");
const OUTBASE = process.argv[2] || join(HERE, "export", "stufen-ueberblick");
const FORMATS = [
  { key: "feed-4x5", w: 1080, h: 1350, pad: 88 },
  { key: "feed-1x1", w: 1080, h: 1080, pad: 62 },
  { key: "reel-9x16", w: 1080, h: 1920, pad: 130 },
];
const HANDLE = "www.werdemeisterdeinergedanken.de";
const GRAD = "linear-gradient(120deg,#8cc63f 0%,#21b2bd 100%)";

const SLIDES = [
  { role: "cover", tag: "Die 7 Stufen", eyebrow: "Bewusstseinsentwicklung",
    title: "Die 7 Stufen deiner Meisterschaft",
    sub: "Kein loser Werkzeugkasten – ein klarer Weg. Von der ersten Ahnung bis zur echten Meisterschaft über deine Gedanken." },
  { role: "stage", n: "01", label: "Autopilot", title: "Du wirst gelebt",
    text: "Vieles läuft automatisch ab – Reaktionen, Gewohnheiten, Gedanken. Der erste Schritt ist kein Kraftakt, sondern das Bemerken: „Moment – das läuft hier gerade von selbst.“" },
  { role: "stage", n: "02", label: "Erwachen", title: "Du bist nicht deine Gedanken",
    text: "Du erkennst: Du bist nicht deine Gedanken, sondern der, der sie wahrnimmt. In diesem winzigen Abstand beginnt jede echte Veränderung." },
  { role: "stage", n: "03", label: "Selbstbeobachtung", title: "Setz dich ans Ufer",
    text: "Du siehst deinen Gedanken ruhig zu, ohne mitzuschwimmen. Distanz schafft Klarheit – und Klarheit schafft Wahlfreiheit." },
  { role: "stage", n: "04", label: "Emotionale Reifung", title: "Fühlen, was ist",
    text: "Du hältst schwierige Gefühle, statt sie wegzudrücken, und schließt alte Geschichten ab. Es entsteht Raum – für Ruhe, für Energie, für dich." },
  { role: "stage", n: "05", label: "Schöpferkraft", title: "Du schreibst den Code neu",
    text: "Jetzt gestaltest du bewusst. Du wählst Gedanken, die dich stärken, und verankerst sie, bis sie zu deiner neuen Normalität werden." },
  { role: "stage", n: "06", label: "Innere Ausrichtung", title: "Kopf, Herz und Handeln",
    text: "Denken, Fühlen und Tun ziehen an einem Strang. Diese innere Stimmigkeit ist die Quelle von Präsenz, Ausstrahlung und Wirkung." },
  { role: "stage", n: "07", label: "Meisterschaft", title: "Meister deiner Gedanken",
    text: "Du reagierst nicht mehr – du gestaltest. Bewusstsein wird zu deinem Zuhause, aus dem heraus du dein Leben souverän formst." },
  { role: "cta", eyebrow: "Dein nächster Schritt", title: "Bereit, deinen Weg zu gehen?",
    sub: "Sieh dir die 7 Stufen im Detail an und finde heraus, wo du gerade stehst.", button: `Find meine Stufe ${ARROW}` },
];

const TOTAL = SLIDES.length;
const bodyFs = (t) => (t.length <= 130 ? 46 : t.length <= 200 ? 41 : 37);

const cssFor = (W, H, PAD) => `
*{ margin:0; padding:0; box-sizing:border-box; }
html,body{ background:#05060c; overflow:hidden; }
.slide{ position:relative; width:${W}px; height:${H}px; overflow:hidden;
  font-family:'Inter',system-ui,sans-serif; color:#f4f7ff; }
.slide::before{ content:""; position:absolute; inset:0; z-index:0;
  background:
    radial-gradient(55% 40% at 82% 18%, rgba(52,196,196,.30), transparent 60%),
    radial-gradient(60% 45% at 12% 88%, rgba(40,90,150,.32), transparent 60%),
    linear-gradient(160deg,#071026 0%,#0b2138 48%,#0a1730 100%); }
.numbg{ position:absolute; z-index:1; right:36px; top:50%; transform:translateY(-50%); font-family:'Fraunces',Georgia,serif;
  font-weight:600; font-size:520px; line-height:.8; color:rgba(255,255,255,.05); }
.content{ position:absolute; inset:0; z-index:3; display:flex; flex-direction:column; padding:${PAD}px 84px ${Math.max(56, PAD - 12)}px; }
.top{ display:flex; align-items:flex-start; justify-content:space-between; gap:32px; }
.logo{ width:170px; height:auto; filter:drop-shadow(0 4px 22px rgba(52,196,196,.30)); }
.tag{ text-align:right; padding-top:6px; font-weight:800; font-size:20px; letter-spacing:.13em;
  text-transform:uppercase; background:${GRAD}; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
.mid{ flex:1 1 auto; display:flex; flex-direction:column; justify-content:center; gap:22px; }
.eyebrow{ font-weight:800; font-size:22px; letter-spacing:.15em; text-transform:uppercase;
  background:${GRAD}; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
.headline{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:88px; line-height:1.03;
  letter-spacing:-1px; filter:drop-shadow(0 6px 30px rgba(0,0,0,.55)); }
.title{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:66px; line-height:1.06; letter-spacing:-.5px;
  filter:drop-shadow(0 6px 30px rgba(0,0,0,.55)); }
.bar{ width:120px; height:6px; border-radius:6px; background:${GRAD}; }
.sub{ font-size:34px; line-height:1.35; color:#b7c6dc; max-width:86%; }
.body{ font-family:'Fraunces',Georgia,serif; font-weight:500; line-height:1.34; color:#eef3fb;
  filter:drop-shadow(0 4px 22px rgba(0,0,0,.5)); }
.cta{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:72px; line-height:1.1; letter-spacing:-.5px; }
.btn{ align-self:flex-start; margin-top:10px; padding:22px 40px; border-radius:999px; background:${GRAD};
  color:#04121a; font-weight:800; font-size:30px; letter-spacing:.01em; }
.foot{ display:flex; align-items:center; justify-content:space-between; gap:24px; }
.handle{ font-weight:600; font-size:26px; letter-spacing:.03em; color:#9db1cb; }
.dots{ display:flex; align-items:center; gap:10px; }
.dot{ width:11px; height:11px; border-radius:50%; background:rgba(255,255,255,.22); }
.dot.on{ background:${GRAD}; box-shadow:0 0 12px rgba(52,196,196,.5); }
.count{ font-size:24px; color:#9db1cb; font-variant-numeric:tabular-nums; }
.swipe{ font-size:26px; color:#9db1cb; font-weight:600; }
`;

const fontsCss = readFileSync(join(COVERS, "_fonts.css"), "utf8");
const logoUri = `data:image/png;base64,${readFileSync(join(COVERS, "logo.png")).toString("base64")}`;

function dots(active) {
  return `<div class="dots">${Array.from({ length: TOTAL }, (_, i) => `<span class="dot${i === active ? " on" : ""}"></span>`).join("")}</div>`;
}
function mid(s) {
  if (s.role === "cover") return `<div class="mid"><div class="eyebrow">${s.eyebrow}</div><div class="headline">${s.title}</div><div class="bar"></div><div class="sub">${s.sub}</div></div>`;
  if (s.role === "cta") return `<div class="mid"><div class="eyebrow">${s.eyebrow}</div><div class="cta">${s.title}</div><div class="sub">${s.sub}</div><div class="btn">${s.button}</div></div>`;
  return `<div class="mid"><div class="eyebrow">Stufe ${s.n} · ${s.label}</div><div class="title">${s.title}</div><div class="body" style="font-size:${bodyFs(s.text)}px">${s.text}</div></div>`;
}
function slideHtml(s, idx, css) {
  const isCover = s.role === "cover";
  const foot = `<div class="foot"><span class="handle">${isCover ? "Die 7 Stufen" : HANDLE}</span>${dots(idx)}<span class="count">${isCover ? `<span class="swipe">wischen ${ARROW}</span>` : `${idx + 1}/${TOTAL}`}</span></div>`;
  const numbg = s.role === "stage" ? `<div class="numbg">${s.n}</div>` : "";
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><style>${fontsCss}\n${css}</style></head>
<body><div class="slide">${numbg}<div class="content">
  <div class="top"><img class="logo" src="${logoUri}" alt=""><div class="tag">${isCover ? "" : (s.role === "cta" ? "Die 7 Stufen" : "Bewusstseinsentwicklung")}</div></div>
  ${mid(s)}
  ${foot}
</div></div></body></html>`;
}

const require = createRequire(import.meta.url);
function findChrome() {
  if (process.env.CHROME_BIN && existsSync(process.env.CHROME_BIN)) return process.env.CHROME_BIN;
  try { const p = require("playwright").chromium.executablePath(); if (p && existsSync(p)) return p; } catch {}
  for (const r of [process.env.PLAYWRIGHT_BROWSERS_PATH, "/opt/pw-browsers"].filter(Boolean)) {
    try { for (const d of readdirSync(r)) { if (d.startsWith("chromium")) { const p = join(r, d, "chrome-linux/chrome"); if (existsSync(p)) return p; } } } catch {}
  }
  throw new Error("Kein Chromium/Chrome gefunden. Führe aus:  npx playwright install chromium");
}
const { chromium } = require("playwright");
const only = process.env.FORMAT;
// Playwright rendert pixelgenau (Chromium-CLI --window-size kappt je nach Build ~87px unten).
const browser = await chromium.launch({ executablePath: findChrome() });
for (const F of FORMATS) {
  if (only && F.key !== only) continue;
  const css = cssFor(F.w, F.h, F.pad);
  const dir = join(OUTBASE, F.key);
  mkdirSync(dir, { recursive: true });
  const page = await browser.newPage({ viewport: { width: F.w, height: F.h }, deviceScaleFactor: 1 });
  for (let i = 0; i < SLIDES.length; i++) {
    await page.setContent(slideHtml(SLIDES[i], i, css), { waitUntil: "networkidle" });
    await page.screenshot({ path: join(dir, `slide-${String(i + 1).padStart(2, "0")}.png`) });
  }
  await page.close();
  console.log(`✓ ${F.key}: ${TOTAL} Slides`);
}
await browser.close();
console.log("Fertig.");
