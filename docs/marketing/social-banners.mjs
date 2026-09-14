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
const brainUrl = pathToFileURL(join(ROOT, "public/logo-brain-gold.png")).href;

// Einheitliche Marken-Optik über ALLE Kanäle:
// GLOW = größerer, weicherer Halo rund ums Gehirn (Größe/Weichzeichnung).
// CREME_GOLD = kräftigeres Gold + stärkerer Glow für die helle Creme-Variante
// (überschreibt gezielt die helle Palette via palHell).
const GLOW = { glowScale: 2.0, glowBlur: 70 };
const CREME_GOLD = {
  glow1: "rgba(224,168,45,.52)", glow2: "rgba(200,148,30,.34)", glow3: "rgba(240,205,120,.32)",
  eyebrow: "#8a6608", accent: "linear-gradient(100deg,#e0a92e,#8a5e05)", url: "#8a6608",
  brainGlow: "rgba(230,178,55,.9)", brainShadow: "rgba(150,110,15,.6)",
};

// Headline-Spruch der Banner. Bewusst NICHT „Werde Meister deiner Gedanken" –
// dieser Satz ist jetzt das Wortlogo (Gehirn + Wortmarke, wie im Website-
// Header) und würde sich sonst mit dem Logo doppeln. Hier steht der werbliche
// Zweitspruch; zum Wechseln einfach diese eine Zeile ändern (das gold gesetzte
// Schlüsselwort in <em>…</em>).
const HEADLINE = "Rein ins eigene <em>Denken</em>.";

const TARGETS = [
  { key: "youtube", file: "youtube/WMDG-YouTube-Banner.png", w: 2560, h: 1440,
    brain: 316, gap: 90, textW: 880, h1: 72, eb: 20, sub: 21, url: 20, safe: true,
    ...GLOW, palHell: CREME_GOLD },
  { key: "facebook", file: "facebook/WMDG-Facebook-Cover.png", w: 1640, h: 624,
    brain: 270, gap: 74, textW: 780, h1: 60, eb: 18, sub: 19, url: 18, safe: false, retina: true,
    ...GLOW, palHell: CREME_GOLD },
  { key: "instagram", file: "instagram/WMDG-Instagram-Story.png", w: 1080, h: 1920,
    brain: 460, gap: 56, textW: 920, h1: 82, eb: 20, sub: 27, url: 24, vertical: true,
    ...GLOW, palHell: CREME_GOLD },
  { key: "instagram-logo", file: "instagram/WMDG-Instagram-Story-Logo.png", w: 1080, h: 1920,
    brain: 560, eb: 24, url: 42, logoOnly: true, wm1: 82,
    ...GLOW, palHell: CREME_GOLD },
  // Niedriger Banner (396 px): kleineres Gehirn, damit Gehirn + Wortmarke als
  // gestapeltes Lockup vollständig in die Höhe passen (kein Beschnitt).
  { key: "linkedin", file: "linkedin/WMDG-LinkedIn-Banner.png", w: 1584, h: 396,
    brain: 196, gap: 58, textW: 720, h1: 62, eb: 18, sub: 20, url: 18, wm1: 32, linkedin: true, retina: true,
    ...GLOW, palHell: CREME_GOLD },
  // WhatsApp-Banner in derselben breiten LinkedIn-Optik (Gehirn rechts, Text
  // links). Gleiche Maße, damit die Grafik 1:1 wie der LinkedIn-Banner wirkt.
  // WhatsApp-Titelbild: das runde Profilbild liegt mittig ueber dem Banner.
  // Deshalb KEIN Gehirn (Profilbild ist bereits eins) und der Text steht
  // komplett in der linken Spalte, ausserhalb des mittigen Profilkreises.
  // Ohne Gehirn greift nur das kräftigere Creme-Gold (kein Glow-Halo).
  { key: "whatsapp", file: "whatsapp/WMDG-WhatsApp-Banner.png", w: 1584, h: 396,
    textW: 450, h1: 42, eb: 14, sub: 17, url: 17, pinned: true, padX: 80,
    noBrain: true, noUrl: true, retina: true, palHell: CREME_GOLD,
    eyebrowText: "Mentale Selbstverteidigung",
    subText: "Raus aus fremden Mustern." },
  // WhatsApp-Banner auf 1920×1080-Arbeitsflaeche (passend zur Safe-Zone-Vorlage):
  // Text links in der Safe-Zone, mittiger Profilkreis bleibt frei, keine URL.
  { key: "whatsapp-xl", file: "whatsapp/WMDG-WhatsApp-Banner-1920x1080.png", w: 1920, h: 1080,
    textW: 540, h1: 64, eb: 19, sub: 24, url: 24, pinned: true, padX: 140,
    noBrain: true, noUrl: true, palHell: CREME_GOLD,
    eyebrowText: "Mentale Selbstverteidigung",
    subText: "Raus aus fremden Mustern." },
];

// Theme-Palette: dunkel (Standard, Navy-Grund #090b10) oder hell (Creme-Grund
// #f6f4ee wie Website-Header, dunkle Tinte-Schrift, Akzent in tiefem Gold).
const PAL = (hell) => hell ? {
  base: "#f6f4ee", stars: "none",
  glow1: "rgba(232,193,95,.30)", glow2: "rgba(217,169,58,.16)", glow3: "rgba(242,212,137,.16)",
  eyebrow: "#7e6410", h1: "#16231f", accent: "linear-gradient(100deg,#d9a93a,#7e6410)",
  sub: "rgba(22,35,31,.72)", url: "#7e6410",
  brainGlow: "rgba(233,193,95,.22)", brainShadow: "rgba(120,100,20,.30)", wordmark: "rgba(22,35,31,.92)",
} : {
  base: "#090b10", stars: "block",
  glow1: "rgba(233,193,95,.30)", glow2: "rgba(168,132,42,.22)", glow3: "rgba(242,212,137,.14)",
  eyebrow: "#f2d489", h1: "#f4f2ec", accent: "linear-gradient(100deg,#f2d489,#d9a93a)",
  sub: "rgba(244,242,236,.72)", url: "#f2d489",
  brainGlow: "rgba(233,193,95,.35)", brainShadow: "rgba(233,193,95,.45)", wordmark: "rgba(244,242,236,.92)",
};

const css = (t, hell) => { const p = { ...PAL(hell), ...(hell && t.palHell ? t.palHell : {}) };
  // Größe der Wortmarke (Zeile „WERDE MEISTER"). Aus der Headline-Größe
  // abgeleitet, per Target via `wm1` überschreibbar (z. B. reines Logo-Motiv).
  const w1 = t.wm1 ?? Math.round((t.h1 ?? 60) * 0.6);
  return `
*{margin:0;box-sizing:border-box}
body{width:${t.w}px;height:${t.h}px;overflow:hidden;font-family:Inter,sans-serif;position:relative;background:${p.base}}
.bg{position:absolute;inset:0;background:
  radial-gradient(50% 120% at 88% 12%, ${p.glow1}, transparent 60%),
  radial-gradient(46% 120% at 6% 96%, ${p.glow2}, transparent 60%),
  radial-gradient(40% 90% at 74% 90%, ${p.glow3}, transparent 60%),
  ${p.base};}
.stars{display:${p.stars};position:absolute;inset:0;background-image:
  radial-gradient(1.6px 1.6px at 20% 30%,rgba(255,255,255,.7),transparent),
  radial-gradient(1.5px 1.5px at 68% 22%,rgba(255,255,255,.5),transparent),
  radial-gradient(1.3px 1.3px at 82% 62%,rgba(180,210,255,.55),transparent),
  radial-gradient(1.2px 1.2px at 55% 48%,rgba(255,255,255,.45),transparent),
  radial-gradient(1.4px 1.4px at 90% 38%,rgba(200,180,255,.5),transparent),
  radial-gradient(1.1px 1.1px at 44% 74%,rgba(255,255,255,.4),transparent);}
.wrap{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;align-items:center;gap:${t.gap}px}
${t.vertical ? `.wrap{flex-direction:column-reverse;text-align:center;gap:52px} .content{width:auto;max-width:${t.textW}px} .sub{margin-left:auto;margin-right:auto} .eyebrow{margin-bottom:20px}` : ""}
${t.linkedin ? `.wrap{left:410px;top:46%;transform:translateY(-50%)} .content{width:${t.textW}px}` : ""}
.content{width:${t.textW}px}
.eyebrow{font-size:${t.eb}px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${p.eyebrow};margin-bottom:16px}
h1{font-family:Fraunces,serif;font-weight:600;color:${p.h1};font-size:${t.h1}px;line-height:1.04;letter-spacing:-.5px}
h1 em{background:${p.accent};-webkit-background-clip:text;background-clip:text;color:transparent;font-style:italic}
.sub{margin-top:18px;font-size:${t.sub}px;color:${p.sub};line-height:1.4;max-width:${t.textW}px}
.url{margin-top:14px;font-size:${t.url}px;font-weight:700;color:${p.url};letter-spacing:.3px}
.bwrap{position:relative;flex:0 0 auto}
.glow{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:${Math.round(t.brain*(t.glowScale ?? 0.92))}px;height:${Math.round(t.brain*(t.glowScale ?? 0.92))}px;border-radius:50%;background:radial-gradient(circle, ${p.brainGlow}, transparent 66%);filter:blur(${t.glowBlur ?? 30}px)}
.brain{position:relative;width:${t.brain}px;height:${t.brain}px;object-fit:contain;filter:drop-shadow(0 10px 60px ${p.brainShadow})}
.logocard{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:44px;text-align:center}
/* Echtes Schriftlogo-Lockup 1:1 wie im Website-Header (src/components/visuals/
   Logo.tsx): „WERDE MEISTER“ (Fraunces, Gewicht 400, tracking .1em, „Meister“
   in Gold) über „— DEINER GEDANKEN —“ (kleiner, tracking .24em) mit goldenen
   Flankier-Strichen. Proportionen aus w1 abgeleitet. */
.brandmark{display:flex;flex-direction:column;align-items:center;gap:${Math.round(w1 * 0.7)}px}
.wm{display:flex;flex-direction:column;align-items:center;gap:${Math.round(w1 * 0.28)}px}
.wm1{font-family:Fraunces,serif;font-weight:400;font-size:${w1}px;letter-spacing:.1em;text-transform:uppercase;line-height:1.05;color:${p.wordmark};white-space:nowrap}
.wm1 span{background:${p.accent};-webkit-background-clip:text;background-clip:text;color:transparent}
.wm2{display:flex;align-items:center;justify-content:center;white-space:nowrap;gap:${Math.round(w1 * 0.34)}px;font-family:Fraunces,serif;font-weight:400;font-size:${Math.round(w1 * 0.46)}px;letter-spacing:.24em;text-transform:uppercase;color:${p.sub}}
.wm2 i{display:block;height:2px;width:${Math.round(w1 * 0.62)}px;background:${p.url}}
.logocard .url{margin-top:0;font-size:${t.url}px}
${t.pinned ? `.wrap{left:0;top:0;transform:none;width:${t.w}px;height:${t.h}px;display:block;gap:0}
.content{position:absolute;left:${t.padX ?? 110}px;top:50%;transform:translateY(-50%);width:${t.textW}px}
.brandmark{position:absolute;right:${t.padX ?? 110}px;top:50%;transform:translateY(-50%)}` : ""}
`; };

// Wortmarke (Schriftlogo) exakt wie im Website-Header.
const wordmarkHtml = `<div class="wm">
  <div class="wm1">Werde <span>Meister</span></div>
  <div class="wm2"><i></i>Deiner Gedanken<i></i></div>
</div>`;
const brainHtml = `<div class="bwrap"><div class="glow"></div><img class="brain" src="${brainUrl}"></div>`;
// Vollständiges Logo-Lockup = Gehirn (bleibt bestehen) + Wortmarke, gestapelt
// wie das Marken-Emblem der Hauptseite. Ohne Gehirn (WhatsApp: Profilbild ist
// bereits das Gehirn) nur die Wortmarke.
const brandmarkHtml = (t) => `<div class="brandmark">${t.noBrain ? "" : brainHtml}${wordmarkHtml}</div>`;

const logoBody = () => `<div class="bg"></div><div class="stars"></div>
<div class="logocard">
  ${brandmarkHtml({})}
  <div class="url">www.werdemeisterdeinergedanken.de</div>
</div>`;

const htmlFor = (t, hell) => t.logoOnly
  ? `<!doctype html><html><head><meta charset="utf8"><link rel="stylesheet" href="${fontsUrl}"><style>${css(t, hell)}</style></head><body>${logoBody()}</body></html>`
  : `<!doctype html><html><head><meta charset="utf8">
<link rel="stylesheet" href="${fontsUrl}"><style>${css(t, hell)}</style></head><body>
<div class="bg"></div><div class="stars"></div>
<div class="wrap">
  <div class="content">
    <div class="eyebrow">${t.eyebrowText ?? "Bewusstsein · Mentale Selbstverteidigung · 7 Stufen"}</div>
    <h1>${t.headlineHtml ?? HEADLINE}</h1>
    <div class="sub">${t.subText ?? "Raus aus fremden Mustern."}</div>
    ${t.noUrl ? "" : `<div class="url">www.werdemeisterdeinergedanken.de</div>`}
  </div>
  ${brandmarkHtml(t)}
</div></body></html>`;

const require = createRequire(import.meta.url);
function findChrome(){
  if(process.env.CHROME_BIN && existsSync(process.env.CHROME_BIN)) return process.env.CHROME_BIN;
  try{ const p=require("playwright").chromium.executablePath(); if(p && existsSync(p)) return p; }catch{}
  for(const r of [process.env.PLAYWRIGHT_BROWSERS_PATH,"/opt/pw-browsers"].filter(Boolean)){
    try{ for(const d of readdirSync(r)){ if(d.startsWith("chromium")){ const p=join(r,d,"chrome-linux/chrome"); if(existsSync(p)) return p; } } }catch{}
  }
  throw new Error("Kein Chromium/Chrome gefunden. Führe aus:  npx playwright install chromium");
}
const { chromium } = require("playwright");
const browser = await chromium.launch({ executablePath: findChrome() });
for (const t of TARGETS){
  // Jeder Banner in beiden Themes: dunkel (Standard) und hell (Creme, -hell).
  for (const hell of [false, true]){
    const suffix = hell ? "-hell" : "";
    const outFile = t.file.replace(/\.png$/, `${suffix}.png`);
    const page = await browser.newPage({ viewport:{ width:t.w, height:t.h }, deviceScaleFactor:1 });
    const tmp = join(HERE, `.${t.key}${suffix}.html`);
    writeFileSync(tmp, htmlFor(t, hell));
    await page.goto(pathToFileURL(tmp).href, { waitUntil:"networkidle" });
    mkdirSync(join(HERE, dirname(outFile)), { recursive:true });
    await page.screenshot({ path: join(HERE, outFile) });
    await page.close();
    // LinkedIn/WhatsApp zusätzlich in doppelter Auflösung (@2x) als Reserve.
    if (t.retina) {
      const p2 = await browser.newPage({ viewport:{ width:t.w, height:t.h }, deviceScaleFactor:2 });
      await p2.goto(pathToFileURL(tmp).href, { waitUntil:"networkidle" });
      await p2.screenshot({ path: join(HERE, t.file.replace(/\.png$/, `${suffix}@2x.png`)) });
      await p2.close();
      console.log("✓", t.file.replace(/\.png$/, `${suffix}@2x.png`), `${t.w*2}×${t.h*2}`);
    }
    rmSync(tmp,{force:true});
    console.log("✓", outFile, `${t.w}×${t.h}`);
  }
}
await browser.close();
