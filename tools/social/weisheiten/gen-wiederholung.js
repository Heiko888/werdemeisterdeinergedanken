// Einzel-Motiv „Wiederholung → Meisterschaft": ruhig-selbstbewusste Pose
// (Arme verschränkt, frontal) mit längerer Weisheit. 4:5 + 9:16.
const fs = require("node:fs");
const path = require("node:path");
const a = require("./assets");

const BUILD = path.join(__dirname, "build");
fs.mkdirSync(BUILD, { recursive: true });

const POSE = { key: "armeVerschraenktB", nat: [1024, 1536], bb: { minx: 317, maxx: 751, miny: 35, maxy: 1507 } };
const TEXT = `Du kannst nicht<br>eine Sache st&auml;ndig<br><em>wiederholen</em>,<br>ohne dabei immer<br><em>besser</em> zu werden.`;

const FMT = {
  "4x5":  { w: 1080, h: 1350, targetH: 820,  footY: 1345, textTop: 74,  font: 52, maxw: 920, logoBottom: 62,  ruleTop: 20, veilT: 58 },
  "9x16": { w: 1080, h: 1920, targetH: 1120, footY: 1900, textTop: 258, font: 62, maxw: 960, logoBottom: 196, ruleTop: 24, veilT: 50 },
};

function place(targetH, centerX, foot) {
  const { nat, bb } = POSE;
  const [NW, NH] = nat;
  const scale = targetH / (bb.maxy - bb.miny);
  return {
    dispW: Math.round(NW * scale),
    dispH: Math.round(NH * scale),
    left: Math.round(centerX - ((bb.minx + bb.maxx) / 2) * scale),
    top: Math.round(foot - bb.maxy * scale),
  };
}

function page(fmtKey, bg) {
  const f = FMT[fmtKey];
  const isStory = fmtKey === "9x16";
  const p = place(f.targetH, f.w / 2, f.footY);
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
  background:linear-gradient(to bottom,color-mix(in oklab,var(--navy-950) 86%,transparent) 0%,color-mix(in oklab,var(--navy-950) 62%,transparent) 46%,color-mix(in oklab,var(--navy-900) 26%,transparent) 78%,transparent);}
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
h1{margin:0;font-size:${f.font}px;line-height:1.16;font-weight:500;letter-spacing:-.5px;color:var(--cream);text-shadow:0 2px 34px rgba(9,11,16,.78);}
h1 em{font-family:'Fraunces',serif;font-style:italic;font-weight:500;font-size:1.3em;line-height:1;
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
  <div class="figure"><img src="${a.posen[POSE.key]}" alt="Heiko Schwaninger"></div>
  <div class="content"><h1>${TEXT}</h1><div class="rule"></div></div>
  <div class="brand"><img src="${a.logo}" alt="Werde Meister deiner Gedanken">
    <div class="wm"><div class="l1">Werde <em>Meister</em></div>
      <div class="l2"><span class="ln"></span><span class="t">Deiner Gedanken</span><span class="ln"></span></div></div></div>
  <div class="grain"></div>
</div></body></html>`;
}

const bg = a.backdrops[0];
fs.writeFileSync(path.join(BUILD, `wiederholung-4x5.html`), page("4x5", bg));
fs.writeFileSync(path.join(BUILD, `wiederholung-9x16.html`), page("9x16", bg));
console.log(`Motiv „Wiederholung → Meisterschaft": 4:5 + 9:16 -> tools/social/weisheiten/build/`);
