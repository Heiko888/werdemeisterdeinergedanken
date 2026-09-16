// Serie C – Story/Reel 9:16 (1080x1920): freigestellte Posen ins Bergmotiv,
// Text im oberen sicheren Bereich, Logo unten im sicheren Bereich (Story-UI-safe).
const fs = require("node:fs");
const path = require("node:path");
const a = require("./assets");
const QUOTES = require("./quotes");

const BUILD = path.join(__dirname, "build");
fs.mkdirSync(BUILD, { recursive: true });

const q = (id) => QUOTES.find((x) => x.id === id).html;
const NAT = { w: 1024, h: 1536 };
const FRAME = { w: 1080, h: 1920 };

// Silhouetten-Boxen (minx,maxx,miny,maxy) der Quellbilder
const BBOX = {
  stehend:    { minx: 295, maxx: 739, miny: 15, maxy: 1535 },
  portrait34: { minx: 163, maxx: 902, miny: 32, maxy: 1535 },
  faust:      { minx: 295, maxx: 850, miny: 30, maxy: 1522 },
  nachdenken: { minx: 65,  maxx: 988, miny: 41, maxy: 1509 },
  taschen:    { minx: 318, maxx: 887, miny: 26, maxy: 1526 },
};

// 8 Stories: Pose + Weisheit. 6–8 gespiegelt (Figur links, Text rechts).
// footY nahe Unterkante, targetH = Figurhöhe. centerX = horizontale Mitte.
const POSTS = [
  { pose: "faust",      q: q("autopilot"), textSide: "left",  targetH: 1560, centerX: 760, footY: 1900 },
  { pose: "nachdenken", q: q("wahr"),      textSide: "left",  targetH: 1360, centerX: 700, footY: 1900 },
  { pose: "stehend",    q: q("freiheit"),  textSide: "left",  targetH: 1560, centerX: 752, footY: 1900 },
  { pose: "taschen",    q: q("haltung"),   textSide: "left",  targetH: 1565, centerX: 744, footY: 1900 },
  { pose: "portrait34", q: q("welt"),      textSide: "left",  targetH: 1520, centerX: 720, footY: 1900 },
  { pose: "taschen", flip: true, q: q("umstaende"), textSide: "right", targetH: 1565, centerX: 336, footY: 1900 },
  { pose: "stehend", flip: true, q: q("bemerkt"),   textSide: "right", targetH: 1560, centerX: 328, footY: 1900 },
  { pose: "faust",   flip: true, q: q("muster"),    textSide: "right", targetH: 1560, centerX: 320, footY: 1900 },
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
html,body{width:${FRAME.w}px;height:${FRAME.h}px;}
body{font-family:'Inter',system-ui,sans-serif;background:var(--navy-900);color:var(--cream);overflow:hidden;position:relative;-webkit-font-smoothing:antialiased;}
.stage{position:absolute;inset:0;overflow:hidden;isolation:isolate;}
.backdrop{position:absolute;inset:0;z-index:-30;}
.backdrop img{width:100%;height:100%;object-fit:cover;object-position:center 40%;}
.veil-x{position:absolute;inset:0;z-index:-20;background:linear-gradient(${veilAngle},
  color-mix(in oklab,var(--navy-900) 92%,transparent) 0%,color-mix(in oklab,var(--navy-900) 74%,transparent) 32%,
  color-mix(in oklab,var(--navy-900) 38%,transparent) 62%,transparent 100%);}
/* oben & unten abdunkeln: Story-UI-safe + Text/Logo lesbar */
.veil-t{position:absolute;left:0;right:0;top:0;height:26%;z-index:-18;
  background:linear-gradient(to bottom,color-mix(in oklab,var(--navy-950) 62%,transparent),transparent);}
.veil-b{position:absolute;left:0;right:0;bottom:0;height:34%;z-index:-18;
  background:linear-gradient(to top,color-mix(in oklab,var(--navy-950) 72%,transparent) 0%,color-mix(in oklab,var(--navy-900) 30%,transparent) 46%,transparent 78%);}
.glow{position:absolute;inset:0;z-index:-10;background:
  radial-gradient(48% 30% at ${textRight ? "16%" : "84%"} 10%,color-mix(in oklab,var(--gold-400) 20%,transparent),transparent 60%),
  radial-gradient(52% 30% at ${textRight ? "92%" : "8%"} 92%,color-mix(in oklab,var(--gold-600) 18%,transparent),transparent 62%);}
.grain{position:absolute;inset:0;z-index:5;pointer-events:none;opacity:.06;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");}
.figure{position:absolute;z-index:1;left:${p.left}px;top:${p.top}px;width:${p.dispW}px;height:${p.dispH}px;filter:drop-shadow(0 20px 44px rgba(9,11,16,.55));}
.figure img{width:100%;height:100%;object-fit:contain;object-position:center bottom;display:block;transform:${o.flip ? "scaleX(-1)" : "none"};}
/* Text im oberen sicheren Bereich (unter der Profilzeile) */
.content{position:absolute;z-index:4;top:300px;${textRight ? "right:76px" : "left:76px"};max-width:620px;text-align:${textRight ? "right" : "left"};}
h1{margin:0;font-size:72px;line-height:1.13;font-weight:500;letter-spacing:-.5px;color:var(--cream);text-shadow:0 2px 38px rgba(9,11,16,.72);}
h1 em{font-family:'Fraunces',serif;font-style:italic;font-weight:500;font-size:1.34em;line-height:1;
  color:transparent;background:linear-gradient(120deg,#f2d489,#d9a93a);-webkit-background-clip:text;background-clip:text;}
.rule{margin-top:30px;${textRight ? "margin-left:auto;" : ""}width:70px;height:4px;border-radius:2px;background:linear-gradient(90deg,var(--gold-400),var(--gold-500));box-shadow:0 0 16px rgba(217,169,58,.5);}
/* Logo im unteren sicheren Bereich (über der Antwortleiste) */
.brand{position:absolute;bottom:200px;left:50%;transform:translateX(-50%);z-index:6;display:inline-flex;align-items:center;gap:16px;filter:drop-shadow(0 2px 20px rgba(9,11,16,.75));}
.brand img{height:64px;width:auto;display:block;filter:drop-shadow(0 0 18px rgba(217,169,58,.28));}
.brand .wm{display:flex;flex-direction:column;gap:7px;line-height:1;color:var(--cream);}
.brand .l1{font-family:'Fraunces',serif;font-weight:400;text-transform:uppercase;letter-spacing:.1em;font-size:24px;line-height:1;}
.brand .l1 em{font-style:normal;color:transparent;background:linear-gradient(100deg,var(--gold-300),var(--gold-500));-webkit-background-clip:text;background-clip:text;}
.brand .l2{display:flex;align-items:center;gap:9px;}
.brand .l2 .ln{height:1px;width:14px;background:rgba(242,212,137,.85);}
.brand .l2 .t{font-family:'Fraunces',serif;font-weight:400;text-transform:uppercase;letter-spacing:.24em;font-size:11.5px;line-height:1;}
</style></head><body><div class="stage">
  <div class="backdrop"><img src="${bg}" alt=""></div>
  <div class="veil-x"></div><div class="veil-t"></div><div class="veil-b"></div><div class="glow"></div>
  <div class="figure"><img src="${a.posen[o.pose]}" alt="Heiko Schwaninger"></div>
  <div class="content"><h1>${o.q}</h1><div class="rule"></div></div>
  <div class="brand"><img src="${a.logo}" alt="Werde Meister deiner Gedanken">
    <div class="wm"><div class="l1">Werde <em>Meister</em></div>
      <div class="l2"><span class="ln"></span><span class="t">Deiner Gedanken</span><span class="ln"></span></div></div></div>
  <div class="grain"></div>
</div></body></html>`;
}

POSTS.forEach((o, i) => {
  const n = String(i + 1).padStart(2, "0");
  fs.writeFileSync(path.join(BUILD, `weisheit-story-posen-${n}.html`), page(o, a.backdrops[i % a.backdrops.length]));
});
console.log(`Serie C (Story 9:16): ${POSTS.length} Seiten -> tools/social/weisheiten/build/`);
