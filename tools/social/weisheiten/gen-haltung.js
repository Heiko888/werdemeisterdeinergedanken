// Serie H „Haltung & Klarheit" (6 Posen: Arme verschränkt seitl./frontal, Erklären,
// Zeigen seitl., Doppelzeiger, Finger hoch) mit klaren Weisheiten zum Standpunkt-
// Beziehen. Zentrierter Aufbau (Text oben, Figur mittig-unten), je 4:5 + 9:16.
const fs = require("node:fs");
const path = require("node:path");
const a = require("./assets");

const BUILD = path.join(__dirname, "build");
fs.mkdirSync(BUILD, { recursive: true });

// Pose: native Maße [W,H] + Silhouetten-Box (alpha>110)
const POSES = {
  armeVerschraenktSeite: { nat: [941, 1671],  bb: { minx: 281, maxx: 744, miny: 26, maxy: 1592 } },
  armeVerschraenktB:     { nat: [1024, 1536], bb: { minx: 317, maxx: 751, miny: 35, maxy: 1507 } },
  erklaert:              { nat: [941, 1670],  bb: { minx: 253, maxx: 841, miny: 30, maxy: 1602 } },
  zeigtSeite:            { nat: [941, 1672],  bb: { minx: 292, maxx: 733, miny: 39, maxy: 1583 } },
  doppelzeiger:          { nat: [941, 1672],  bb: { minx: 237, maxx: 748, miny: 48, maxy: 1609 } },
  fingerhochTasche:      { nat: [941, 1672],  bb: { minx: 234, maxx: 737, miny: 40, maxy: 1601 } },
};

const ITEMS = [
  { n: 1, key: "standpunkt", pose: "armeVerschraenktSeite", scale: 1.0,
    q: `Ein klarer <em>Standpunkt</em><br>braucht keine<br><em>Lautst&auml;rke</em>.` },
  { n: 2, key: "haltung", pose: "armeVerschraenktB", scale: 1.0,
    q: `<em>Haltung</em> zeigt sich,<br>wenn es<br><em>unbequem</em> wird.` },
  { n: 3, key: "klar", pose: "erklaert", scale: 1.0,
    q: `Sag es <em>klar</em>.<br>Wahrheit braucht<br>keine <em>Umwege</em>.` },
  { n: 4, key: "glauben", pose: "zeigtSeite", scale: 1.0,
    q: `Du <em>entscheidest</em>,<br>was du<br><em>glaubst</em>.` },
  { n: 5, key: "jetzt", pose: "doppelzeiger", scale: 1.0,
    q: `Fang bei <em>dir</em> an.<br>Und zwar <em>jetzt</em>.` },
  { n: 6, key: "gedanke", pose: "fingerhochTasche", scale: 1.0,
    q: `Ein klarer <em>Gedanke</em><br>schl&auml;gt tausend<br><em>Meinungen</em>.` },
];

const FMT = {
  "4x5":  { w: 1080, h: 1350, targetH: 900,  footY: 1345, textTop: 84,  font: 58, maxw: 900, logoBottom: 66,  ruleTop: 24, veilT: 52 },
  "9x16": { w: 1080, h: 1920, targetH: 1180, footY: 1900, textTop: 300, font: 70, maxw: 940, logoBottom: 196, ruleTop: 28, veilT: 46 },
};

function place(poseKey, targetH, centerX, foot) {
  const { nat, bb } = POSES[poseKey];
  const [NW, NH] = nat;
  const scale = targetH / (bb.maxy - bb.miny);
  return {
    dispW: Math.round(NW * scale),
    dispH: Math.round(NH * scale),
    left: Math.round(centerX - ((bb.minx + bb.maxx) / 2) * scale),
    top: Math.round(foot - bb.maxy * scale),
  };
}

function page(fmtKey, item, bg) {
  const f = FMT[fmtKey];
  const isStory = fmtKey === "9x16";
  const targetH = Math.round(f.targetH * (item.scale || 1));
  const p = place(item.pose, targetH, f.w / 2, f.footY);
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><style>
@font-face{font-family:'Inter';src:url('${a.inter}') format('woff2');font-weight:100 900;font-style:normal;font-display:block;}
@font-face{font-family:'Fraunces';src:url('${a.fraunces}') format('woff2');font-weight:100 900;font-style:normal;font-display:block;}
@font-face{font-family:'Fraunces';src:url('${a.frauncesI}') format('woff2');font-weight:100 900;font-style:italic;font-display:block;}
:root{--navy-950:#090b10;--navy-900:#0f1218;--gold-300:#f2d489;--gold-400:#e8c15f;--gold-500:#d9a93a;--gold-600:#a8842a;--cream:#f4f2ec;}
*{margin:0;box-sizing:border-box;}
html,body{width:${f.w}px;height:${f.h}px;}
body{font-family:'Inter',system-ui,sans-serif;background:var(--navy-900);color:var(--cream);overflow:hidden;position:relative;-webkit-font-smoothing:antialiased;}
.stage{position:absolute;inset:0;overflow:hidden;isolation:isolate;}
.backdrop{position:absolute;inset:0;z-index:-30;}
.backdrop img{width:100%;height:100%;object-fit:cover;object-position:center 40%;}
.veil-t{position:absolute;left:0;right:0;top:0;height:${f.veilT}%;z-index:-18;
  background:linear-gradient(to bottom,color-mix(in oklab,var(--navy-950) 84%,transparent) 0%,color-mix(in oklab,var(--navy-950) 60%,transparent) 45%,color-mix(in oklab,var(--navy-900) 26%,transparent) 78%,transparent);}
.veil-b{position:absolute;left:0;right:0;bottom:0;height:34%;z-index:-18;
  background:linear-gradient(to top,color-mix(in oklab,var(--navy-950) 72%,transparent) 0%,color-mix(in oklab,var(--navy-900) 28%,transparent) 46%,transparent 78%);}
.glow{position:absolute;inset:0;z-index:-10;background:
  radial-gradient(60% 30% at 50% 6%,color-mix(in oklab,var(--gold-400) 18%,transparent),transparent 62%),
  radial-gradient(60% 26% at 50% 96%,color-mix(in oklab,var(--gold-600) 16%,transparent),transparent 64%);}
.grain{position:absolute;inset:0;z-index:5;pointer-events:none;opacity:.06;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");}
.ground{position:absolute;left:0;right:0;bottom:0;height:18%;z-index:0;pointer-events:none;
  background:radial-gradient(50% 90% at 50% 100%,color-mix(in oklab,var(--navy-950) 66%,transparent),transparent 72%);}
.figure{position:absolute;z-index:1;left:${p.left}px;top:${p.top}px;width:${p.dispW}px;height:${p.dispH}px;filter:drop-shadow(0 20px 46px rgba(9,11,16,.58));}
.figure img{width:100%;height:100%;object-fit:contain;object-position:center bottom;display:block;}
.content{position:absolute;z-index:4;top:${f.textTop}px;left:50%;transform:translateX(-50%);width:${f.maxw}px;text-align:center;}
h1{margin:0;font-size:${f.font}px;line-height:1.13;font-weight:500;letter-spacing:-.5px;color:var(--cream);text-shadow:0 2px 34px rgba(9,11,16,.74);}
h1 em{font-family:'Fraunces',serif;font-style:italic;font-weight:500;font-size:1.34em;line-height:1;
  color:transparent;background:linear-gradient(120deg,#f2d489,#d9a93a);-webkit-background-clip:text;background-clip:text;}
.rule{margin:${f.ruleTop}px auto 0;width:68px;height:4px;border-radius:2px;background:linear-gradient(90deg,var(--gold-400),var(--gold-500));box-shadow:0 0 16px rgba(217,169,58,.5);}
.brand{position:absolute;bottom:${f.logoBottom}px;left:50%;transform:translateX(-50%);z-index:6;display:inline-flex;align-items:center;gap:15px;filter:drop-shadow(0 2px 20px rgba(9,11,16,.78));}
.brand img{height:${isStory ? 62 : 58}px;width:auto;display:block;filter:drop-shadow(0 0 18px rgba(217,169,58,.28));}
.brand .wm{display:flex;flex-direction:column;gap:6px;line-height:1;color:var(--cream);}
.brand .l1{font-family:'Fraunces',serif;font-weight:400;text-transform:uppercase;letter-spacing:.1em;font-size:${isStory ? 24 : 22}px;line-height:1;}
.brand .l1 em{font-style:normal;color:transparent;background:linear-gradient(100deg,var(--gold-300),var(--gold-500));-webkit-background-clip:text;background-clip:text;}
.brand .l2{display:flex;align-items:center;gap:8px;}
.brand .l2 .ln{height:1px;width:13px;background:rgba(242,212,137,.85);}
.brand .l2 .t{font-family:'Fraunces',serif;font-weight:400;text-transform:uppercase;letter-spacing:.24em;font-size:${isStory ? 11.5 : 11}px;line-height:1;}
</style></head><body><div class="stage">
  <div class="backdrop"><img src="${bg}" alt=""></div>
  <div class="veil-t"></div><div class="veil-b"></div><div class="glow"></div><div class="ground"></div>
  <div class="figure"><img src="${a.posen[item.pose]}" alt="Heiko Schwaninger"></div>
  <div class="content"><h1>${item.q}</h1><div class="rule"></div></div>
  <div class="brand"><img src="${a.logo}" alt="Werde Meister deiner Gedanken">
    <div class="wm"><div class="l1">Werde <em>Meister</em></div>
      <div class="l2"><span class="ln"></span><span class="t">Deiner Gedanken</span><span class="ln"></span></div></div></div>
  <div class="grain"></div>
</div></body></html>`;
}

ITEMS.forEach((item, i) => {
  const nn = String(item.n).padStart(2, "0");
  const bg = a.backdrops[i % a.backdrops.length];
  fs.writeFileSync(path.join(BUILD, `haltung-${nn}-${item.key}-4x5.html`), page("4x5", item, bg));
  fs.writeFileSync(path.join(BUILD, `haltung-${nn}-${item.key}-9x16.html`), page("9x16", item, bg));
});
console.log(`Serie H „Haltung & Klarheit": ${ITEMS.length}x2 Seiten -> tools/social/weisheiten/build/`);
