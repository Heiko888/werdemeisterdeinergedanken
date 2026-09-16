// Serie B – Ganzkörper-Posen: 8 Posts, freigestellte Posen ins Bergmotiv gesetzt.
// Platzierung exakt über die gemessene Silhouetten-Box jeder Pose.
const fs = require("node:fs");
const path = require("node:path");
const a = require("./assets");
const QUOTES = require("./quotes");

const BUILD = path.join(__dirname, "build");
fs.mkdirSync(BUILD, { recursive: true });

const q = (id) => QUOTES.find((x) => x.id === id).html;
const NAT = { w: 1024, h: 1536 };

// Silhouetten-Boxen (minx,maxx,miny,maxy) der Quellbilder (public/social/weisheiten/quellen)
const BBOX = {
  stehend:    { minx: 295, maxx: 739, miny: 15, maxy: 1535 },
  portrait34: { minx: 163, maxx: 902, miny: 32, maxy: 1535 },
  faust:      { minx: 295, maxx: 850, miny: 30, maxy: 1522 },
  nachdenken: { minx: 65,  maxx: 988, miny: 41, maxy: 1509 },
  taschen:    { minx: 318, maxx: 887, miny: 26, maxy: 1526 },
};

// 8 Posts: Pose + Weisheit (zur Haltung passend). 6–8 gespiegelt (Figur links, Text rechts).
const POSTS = [
  { pose: "faust",      q: q("autopilot"), textSide: "left",  targetH: 1250, centerX: 760, footY: 1345 },
  { pose: "nachdenken", q: q("wahr"),      textSide: "left",  targetH: 1120, centerX: 690, footY: 1345 },
  { pose: "stehend",    q: q("freiheit"),  textSide: "left",  targetH: 1250, centerX: 748, footY: 1345 },
  { pose: "taschen",    q: q("haltung"),   textSide: "left",  targetH: 1255, centerX: 742, footY: 1345 },
  { pose: "portrait34", q: q("welt"),      textSide: "left",  targetH: 1250, centerX: 726, footY: 1345 },
  { pose: "taschen", flip: true, q: q("umstaende"), textSide: "right", targetH: 1255, centerX: 338, footY: 1345 },
  { pose: "stehend", flip: true, q: q("bemerkt"),   textSide: "right", targetH: 1250, centerX: 332, footY: 1345 },
  { pose: "faust",   flip: true, q: q("muster"),    textSide: "right", targetH: 1250, centerX: 320, footY: 1345 },
];

function place(pose, targetH, centerX, footY) {
  const bb = BBOX[pose];
  const scale = targetH / (bb.maxy - bb.miny);
  return {
    dispW: Math.round(NAT.w * scale),
    dispH: Math.round(NAT.h * scale),
    left: Math.round(centerX - ((bb.minx + bb.maxx) / 2) * scale),
    top: Math.round(footY - bb.maxy * scale),
  };
}

function page(o, bg) {
  const p = place(o.pose, o.targetH, o.centerX, o.footY);
  const textRight = o.textSide === "right";
  const veilAngle = textRight ? "240deg" : "120deg";
  const logoLeft = !textRight;
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><style>
@font-face{font-family:'Inter';src:url('${a.inter}') format('woff2');font-weight:100 900;font-style:normal;font-display:block;}
@font-face{font-family:'Fraunces';src:url('${a.fraunces}') format('woff2');font-weight:100 900;font-style:normal;font-display:block;}
@font-face{font-family:'Fraunces';src:url('${a.frauncesI}') format('woff2');font-weight:100 900;font-style:italic;font-display:block;}
:root{--navy-950:#090b10;--navy-900:#0f1218;--gold-300:#f2d489;--gold-400:#e8c15f;--gold-500:#d9a93a;--gold-600:#a8842a;--cream:#f4f2ec;}
*{margin:0;box-sizing:border-box;}
html,body{width:1080px;height:1350px;}
body{font-family:'Inter',system-ui,sans-serif;background:var(--navy-900);color:var(--cream);overflow:hidden;position:relative;-webkit-font-smoothing:antialiased;}
.stage{position:absolute;inset:0;overflow:hidden;isolation:isolate;}
.backdrop{position:absolute;inset:0;z-index:-30;}
.backdrop img{width:100%;height:100%;object-fit:cover;object-position:center center;}
.veil-x{position:absolute;inset:0;z-index:-20;background:linear-gradient(${veilAngle},
  color-mix(in oklab,var(--navy-900) 92%,transparent) 0%,color-mix(in oklab,var(--navy-900) 76%,transparent) 30%,
  color-mix(in oklab,var(--navy-900) 40%,transparent) 60%,transparent 100%);}
.veil-b{position:absolute;left:0;right:0;bottom:0;height:52%;z-index:-20;
  background:linear-gradient(to top,color-mix(in oklab,var(--navy-900) 66%,transparent) 0%,color-mix(in oklab,var(--navy-900) 34%,transparent) 42%,transparent 74%);}
.glow{position:absolute;inset:0;z-index:-10;background:
  radial-gradient(55% 42% at ${textRight ? "16%" : "84%"} 8%,color-mix(in oklab,var(--gold-400) 22%,transparent),transparent 60%),
  radial-gradient(56% 46% at ${textRight ? "94%" : "6%"} 96%,color-mix(in oklab,var(--gold-600) 20%,transparent),transparent 62%);}
.toplight{position:absolute;left:0;right:0;top:0;height:44%;z-index:-10;
  background:radial-gradient(80% 100% at 50% 0%,color-mix(in oklab,var(--gold-500) 13%,transparent),transparent 70%);}
.grain{position:absolute;inset:0;z-index:5;pointer-events:none;opacity:.06;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");}
.ground{position:absolute;left:0;right:0;bottom:0;height:20%;z-index:0;pointer-events:none;
  background:radial-gradient(60% 90% at ${Math.round(o.centerX / 1080 * 100)}% 100%,color-mix(in oklab,var(--navy-950) 70%,transparent),transparent 72%);}
.figure{position:absolute;z-index:1;left:${p.left}px;top:${p.top}px;width:${p.dispW}px;height:${p.dispH}px;filter:drop-shadow(0 18px 40px rgba(9,11,16,.55));}
.figure img{width:100%;height:100%;object-fit:contain;object-position:center bottom;display:block;transform:${o.flip ? "scaleX(-1)" : "none"};}
.content{position:absolute;inset:0;z-index:4;display:flex;flex-direction:column;align-items:${textRight ? "flex-end" : "flex-start"};justify-content:flex-start;padding:112px 78px 0;text-align:${textRight ? "right" : "left"};}
h1{margin:0;max-width:520px;font-size:68px;line-height:1.14;font-weight:500;letter-spacing:-.5px;color:var(--cream);text-shadow:0 2px 34px rgba(9,11,16,.7);}
h1 em{font-family:'Fraunces',serif;font-style:italic;font-weight:500;font-size:1.34em;line-height:1;
  color:transparent;background:linear-gradient(120deg,#f2d489,#d9a93a);-webkit-background-clip:text;background-clip:text;}
.rule{margin-top:28px;width:64px;height:4px;border-radius:2px;background:linear-gradient(90deg,var(--gold-400),var(--gold-500));box-shadow:0 0 16px rgba(217,169,58,.5);}
.scrim{position:absolute;bottom:0;${logoLeft ? "left:0" : "right:0"};width:58%;height:22%;z-index:3;pointer-events:none;
  background:radial-gradient(120% 100% at ${logoLeft ? "0%" : "100%"} 100%,color-mix(in oklab,var(--navy-950) 74%,transparent),transparent 70%);}
.brand{position:absolute;${logoLeft ? "left:78px" : "right:78px"};bottom:60px;z-index:6;display:inline-flex;align-items:center;gap:15px;filter:drop-shadow(0 2px 18px rgba(9,11,16,.7));}
.brand img{height:60px;width:auto;display:block;filter:drop-shadow(0 0 18px rgba(217,169,58,.28));}
.brand .wm{display:flex;flex-direction:column;gap:6px;line-height:1;color:var(--cream);}
.brand .l1{font-family:'Fraunces',serif;font-weight:400;text-transform:uppercase;letter-spacing:.1em;font-size:23px;line-height:1;}
.brand .l1 em{font-style:normal;color:transparent;background:linear-gradient(100deg,var(--gold-300),var(--gold-500));-webkit-background-clip:text;background-clip:text;}
.brand .l2{display:flex;align-items:center;gap:8px;}
.brand .l2 .ln{height:1px;width:13px;background:rgba(242,212,137,.85);}
.brand .l2 .t{font-family:'Fraunces',serif;font-weight:400;text-transform:uppercase;letter-spacing:.24em;font-size:11px;line-height:1;}
</style></head><body><div class="stage">
  <div class="backdrop"><img src="${bg}" alt=""></div>
  <div class="veil-x"></div><div class="veil-b"></div><div class="glow"></div><div class="toplight"></div>
  <div class="ground"></div>
  <div class="figure"><img src="${a.posen[o.pose]}" alt="Heiko Schwaninger"></div>
  <div class="content"><h1>${o.q}</h1><div class="rule"></div></div>
  <div class="scrim"></div>
  <div class="brand"><img src="${a.logo}" alt="Werde Meister deiner Gedanken">
    <div class="wm"><div class="l1">Werde <em>Meister</em></div>
      <div class="l2"><span class="ln"></span><span class="t">Deiner Gedanken</span><span class="ln"></span></div></div></div>
  <div class="grain"></div>
</div></body></html>`;
}

POSTS.forEach((o, i) => {
  const n = String(i + 1).padStart(2, "0");
  fs.writeFileSync(path.join(BUILD, `weisheit-pose-${n}.html`), page(o, a.backdrops[i % a.backdrops.length]));
});
console.log(`Serie B (Posen): ${POSTS.length} Seiten -> tools/social/weisheiten/build/`);
