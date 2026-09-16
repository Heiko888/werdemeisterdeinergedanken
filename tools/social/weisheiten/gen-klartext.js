// Serie E „Klartext & Entscheidung" (5 aufrechte Gesten) + E-Book-CTA-Motiv.
// Zentrierter Aufbau (Text oben, Figur mittig-unten), je Motiv 4:5 + 9:16.
const fs = require("node:fs");
const path = require("node:path");
const a = require("./assets");

const BUILD = path.join(__dirname, "build");
fs.mkdirSync(BUILD, { recursive: true });
const NAT = { w: 1024, h: 1536 };

const BBOX = {
  fingerhoch: { minx: 44,  maxx: 1022, miny: 12, maxy: 1534 },
  zeigen:     { minx: 134, maxx: 938,  miny: 38, maxy: 1534 },
  stopp:      { minx: 166, maxx: 808,  miny: 32, maxy: 1534 },
  handBrust:  { minx: 198, maxx: 714,  miny: 32, maxy: 1502 },
  punkt:      { minx: 152, maxx: 882,  miny: 24, maxy: 1534 },
  ebook:      { minx: 140, maxx: 978,  miny: 30, maxy: 1534 },
};

const ITEMS = [
  { series: "klartext", n: 1, key: "erkenntnis", pose: "fingerhoch",
    q: `Der Moment der<br><em>Erkenntnis</em><br>ver&auml;ndert<br><em>alles</em>.` },
  { series: "klartext", n: 2, key: "du", pose: "zeigen",
    q: `Niemand denkt<br>das f&uuml;r dich &ndash;<br>nur <em>du</em>.` },
  { series: "klartext", n: 3, key: "nein", pose: "stopp",
    q: `<em>Nein</em> ist ein<br>vollst&auml;ndiger<br><em>Satz</em>.` },
  { series: "klartext", n: 4, key: "beidir", pose: "handBrust",
    q: `Alles beginnt<br>da, wo du<br>hinschaust:<br>bei <em>dir</em>.` },
  { series: "klartext", n: 5, key: "entscheidung", pose: "punkt",
    q: `Eine <em>Entscheidung</em><br>ist st&auml;rker<br>als hundert<br><em>Vors&auml;tze</em>.` },
  { series: "ebook", n: 1, key: "gratis", pose: "ebook",
    q: `Dein <em>Startpunkt</em>:<br>das E-Book<br>&ndash; <em>kostenlos</em>.`,
    cta: "Gratis E-Book &middot; Link in Bio" },
];

const FMT = {
  "4x5":  { w: 1080, h: 1350, targetH: 880,  footY: 1345, textTop: 84,  font: 58, maxw: 860, logoBottom: 66,  ruleTop: 24, veilT: 50 },
  "9x16": { w: 1080, h: 1920, targetH: 1150, footY: 1900, textTop: 296, font: 70, maxw: 900, logoBottom: 196, ruleTop: 28, veilT: 45 },
};

function place(pose, targetH, footY, frameW) {
  const bb = BBOX[pose];
  const scale = targetH / (bb.maxy - bb.miny);
  return {
    dispW: Math.round(NAT.w * scale),
    dispH: Math.round(NAT.h * scale),
    left: Math.round(frameW / 2 - ((bb.minx + bb.maxx) / 2) * scale),
    top: Math.round(footY - bb.maxy * scale),
  };
}

function page(fmtKey, item) {
  const f = FMT[fmtKey];
  const p = place(item.pose, f.targetH, f.footY, f.w);
  const isStory = fmtKey === "9x16";
  const ctaHTML = item.cta
    ? `<div class="cta">${item.cta}</div>` : "";
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
  background:linear-gradient(to bottom,color-mix(in oklab,var(--navy-950) 82%,transparent) 0%,color-mix(in oklab,var(--navy-950) 58%,transparent) 45%,color-mix(in oklab,var(--navy-900) 24%,transparent) 78%,transparent);}
.veil-b{position:absolute;left:0;right:0;bottom:0;height:32%;z-index:-18;
  background:linear-gradient(to top,color-mix(in oklab,var(--navy-950) 70%,transparent) 0%,color-mix(in oklab,var(--navy-900) 28%,transparent) 46%,transparent 78%);}
.glow{position:absolute;inset:0;z-index:-10;background:
  radial-gradient(60% 30% at 50% 6%,color-mix(in oklab,var(--gold-400) 18%,transparent),transparent 62%),
  radial-gradient(60% 26% at 50% 96%,color-mix(in oklab,var(--gold-600) 16%,transparent),transparent 64%);}
.grain{position:absolute;inset:0;z-index:5;pointer-events:none;opacity:.06;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");}
.ground{position:absolute;left:0;right:0;bottom:0;height:18%;z-index:0;pointer-events:none;
  background:radial-gradient(50% 90% at 50% 100%,color-mix(in oklab,var(--navy-950) 66%,transparent),transparent 72%);}
.figure{position:absolute;z-index:1;left:${p.left}px;top:${p.top}px;width:${p.dispW}px;height:${p.dispH}px;filter:drop-shadow(0 18px 42px rgba(9,11,16,.55));}
.figure img{width:100%;height:100%;object-fit:contain;object-position:center bottom;display:block;}
.content{position:absolute;z-index:4;top:${f.textTop}px;left:50%;transform:translateX(-50%);width:${f.maxw}px;text-align:center;}
h1{margin:0;font-size:${f.font}px;line-height:1.13;font-weight:500;letter-spacing:-.5px;color:var(--cream);text-shadow:0 2px 34px rgba(9,11,16,.72);}
h1 em{font-family:'Fraunces',serif;font-style:italic;font-weight:500;font-size:1.34em;line-height:1;
  color:transparent;background:linear-gradient(120deg,#f2d489,#d9a93a);-webkit-background-clip:text;background-clip:text;}
.rule{margin:${f.ruleTop}px auto 0;width:68px;height:4px;border-radius:2px;background:linear-gradient(90deg,var(--gold-400),var(--gold-500));box-shadow:0 0 16px rgba(217,169,58,.5);}
.cta{margin:${Math.round(f.ruleTop * 0.9)}px auto 0;display:inline-block;padding:${isStory ? "14px 28px" : "12px 24px"};border-radius:999px;
  font-size:${isStory ? 26 : 23}px;font-weight:600;letter-spacing:.02em;color:var(--navy-950);
  background:linear-gradient(120deg,var(--gold-300),var(--gold-500));box-shadow:0 6px 24px -6px rgba(217,169,58,.6);}
.brand{position:absolute;bottom:${f.logoBottom}px;left:50%;transform:translateX(-50%);z-index:6;display:inline-flex;align-items:center;gap:15px;filter:drop-shadow(0 2px 20px rgba(9,11,16,.75));}
.brand img{height:${isStory ? 62 : 58}px;width:auto;display:block;filter:drop-shadow(0 0 18px rgba(217,169,58,.28));}
.brand .wm{display:flex;flex-direction:column;gap:6px;line-height:1;color:var(--cream);}
.brand .l1{font-family:'Fraunces',serif;font-weight:400;text-transform:uppercase;letter-spacing:.1em;font-size:${isStory ? 24 : 22}px;line-height:1;}
.brand .l1 em{font-style:normal;color:transparent;background:linear-gradient(100deg,var(--gold-300),var(--gold-500));-webkit-background-clip:text;background-clip:text;}
.brand .l2{display:flex;align-items:center;gap:8px;}
.brand .l2 .ln{height:1px;width:13px;background:rgba(242,212,137,.85);}
.brand .l2 .t{font-family:'Fraunces',serif;font-weight:400;text-transform:uppercase;letter-spacing:.24em;font-size:${isStory ? 11.5 : 11}px;line-height:1;}
</style></head><body><div class="stage">
  <div class="backdrop"><img src="${a.berge}" alt=""></div>
  <div class="veil-t"></div><div class="veil-b"></div><div class="glow"></div><div class="ground"></div>
  <div class="figure"><img src="${a.posen[item.pose]}" alt="Heiko Schwaninger"></div>
  <div class="content"><h1>${item.q}</h1><div class="rule"></div>${ctaHTML}</div>
  <div class="brand"><img src="${a.logo}" alt="Werde Meister deiner Gedanken">
    <div class="wm"><div class="l1">Werde <em>Meister</em></div>
      <div class="l2"><span class="ln"></span><span class="t">Deiner Gedanken</span><span class="ln"></span></div></div></div>
  <div class="grain"></div>
</div></body></html>`;
}

for (const item of ITEMS) {
  const nn = String(item.n).padStart(2, "0");
  fs.writeFileSync(path.join(BUILD, `${item.series}-${nn}-${item.key}-4x5.html`), page("4x5", item));
  fs.writeFileSync(path.join(BUILD, `${item.series}-${nn}-${item.key}-9x16.html`), page("9x16", item));
}
console.log(`Serie E „Klartext" + E-Book: ${ITEMS.length}x2 Seiten -> tools/social/weisheiten/build/`);
