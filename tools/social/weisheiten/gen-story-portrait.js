// Serie A als Story 9:16 (1080x1920): Sonnenaufgang-Porträt (heiko-hero),
// variiert per Spiegelung + Ausschnitt. Text oben, Logo unten (Story-UI-safe).
const fs = require("node:fs");
const path = require("node:path");
const a = require("./assets");
const QUOTES = require("./quotes");

const BUILD = path.join(__dirname, "build");
fs.mkdirSync(BUILD, { recursive: true });
const FRAME = { w: 1080, h: 1920 };

// Rahmungs-Variante je Weisheit (Reihenfolge = quotes.js).
const VARIANTS = [
  { side: "right", flip: false, bgFlip: false, zoom: "normal" }, // umstaende
  { side: "left",  flip: true,  bgFlip: true,  zoom: "normal" }, // bemerkt
  { side: "right", flip: false, bgFlip: true,  zoom: "close"  }, // freiheit
  { side: "left",  flip: true,  bgFlip: false, zoom: "wide"   }, // autopilot
  { side: "right", flip: false, bgFlip: false, zoom: "wide"   }, // wahr
  { side: "left",  flip: true,  bgFlip: true,  zoom: "wide"   }, // muster
  { side: "right", flip: false, bgFlip: true,  zoom: "normal" }, // haltung
  { side: "left",  flip: true,  bgFlip: false, zoom: "wide"   }, // welt
];
const ZOOM = { normal: { pw: 780, ph: 1060 }, wide: { pw: 660, ph: 900 }, close: { pw: 940, ph: 1280 } };

function page(quoteHTML, o) {
  const left = o.side === "left";
  const z = ZOOM[o.zoom] || ZOOM.normal;
  const textRight = left;
  const veilAngle = textRight ? "240deg" : "120deg";
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
.backdrop img{width:100%;height:100%;object-fit:cover;object-position:center 40%;transform:${o.bgFlip ? "scaleX(-1)" : "none"};}
.veil-x{position:absolute;inset:0;z-index:-20;background:linear-gradient(${veilAngle},
  color-mix(in oklab,var(--navy-900) 92%,transparent) 0%,color-mix(in oklab,var(--navy-900) 74%,transparent) 32%,
  color-mix(in oklab,var(--navy-900) 38%,transparent) 62%,transparent 100%);}
.veil-t{position:absolute;left:0;right:0;top:0;height:26%;z-index:-18;
  background:linear-gradient(to bottom,color-mix(in oklab,var(--navy-950) 62%,transparent),transparent);}
.veil-b{position:absolute;left:0;right:0;bottom:0;height:32%;z-index:-18;
  background:linear-gradient(to top,color-mix(in oklab,var(--navy-950) 72%,transparent) 0%,color-mix(in oklab,var(--navy-900) 30%,transparent) 46%,transparent 78%);}
.glow{position:absolute;inset:0;z-index:-10;background:
  radial-gradient(48% 30% at ${textRight ? "16%" : "84%"} 10%,color-mix(in oklab,var(--gold-400) 20%,transparent),transparent 60%),
  radial-gradient(52% 30% at ${textRight ? "92%" : "8%"} 92%,color-mix(in oklab,var(--gold-600) 18%,transparent),transparent 62%);}
.grain{position:absolute;inset:0;z-index:5;pointer-events:none;opacity:.06;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");}
.portrait{position:absolute;bottom:0;width:${z.pw}px;height:${z.ph}px;z-index:1;${left ? "left:-30px" : "right:-30px"};}
.portrait .aura{position:absolute;inset:0;z-index:-1;filter:blur(90px);opacity:.85;
  background:radial-gradient(44% 40% at 52% 34%,color-mix(in oklab,var(--gold-500) 34%,transparent) 0%,color-mix(in oklab,var(--gold-500) 15%,transparent) 42%,transparent 82%);}
.portrait img{width:100%;height:100%;object-fit:contain;object-position:${left ? "left" : "right"} bottom;transform:${o.flip ? "scaleX(-1)" : "none"};
  filter:drop-shadow(0 0 32px rgba(217,169,58,.16)) drop-shadow(0 0 90px rgba(217,169,58,.12));
  -webkit-mask-image:linear-gradient(to bottom,#000 74%,rgba(0,0,0,.5) 90%,transparent 100%);
  mask-image:linear-gradient(to bottom,#000 74%,rgba(0,0,0,.5) 90%,transparent 100%);}
.content{position:absolute;z-index:4;top:300px;${textRight ? "right:76px" : "left:76px"};max-width:620px;text-align:${textRight ? "right" : "left"};}
h1{margin:0;font-size:72px;line-height:1.13;font-weight:500;letter-spacing:-.5px;color:var(--cream);text-shadow:0 2px 38px rgba(9,11,16,.72);}
h1 em{font-family:'Fraunces',serif;font-style:italic;font-weight:500;font-size:1.34em;line-height:1;
  color:transparent;background:linear-gradient(120deg,#f2d489,#d9a93a);-webkit-background-clip:text;background-clip:text;}
.rule{margin-top:30px;${textRight ? "margin-left:auto;" : ""}width:70px;height:4px;border-radius:2px;background:linear-gradient(90deg,var(--gold-400),var(--gold-500));box-shadow:0 0 16px rgba(217,169,58,.5);}
.brand{position:absolute;bottom:200px;left:50%;transform:translateX(-50%);z-index:6;display:inline-flex;align-items:center;gap:16px;filter:drop-shadow(0 2px 20px rgba(9,11,16,.75));}
.brand img{height:64px;width:auto;display:block;filter:drop-shadow(0 0 18px rgba(217,169,58,.28));}
.brand .wm{display:flex;flex-direction:column;gap:7px;line-height:1;color:var(--cream);}
.brand .l1{font-family:'Fraunces',serif;font-weight:400;text-transform:uppercase;letter-spacing:.1em;font-size:24px;line-height:1;}
.brand .l1 em{font-style:normal;color:transparent;background:linear-gradient(100deg,var(--gold-300),var(--gold-500));-webkit-background-clip:text;background-clip:text;}
.brand .l2{display:flex;align-items:center;gap:9px;}
.brand .l2 .ln{height:1px;width:14px;background:rgba(242,212,137,.85);}
.brand .l2 .t{font-family:'Fraunces',serif;font-weight:400;text-transform:uppercase;letter-spacing:.24em;font-size:11.5px;line-height:1;}
</style></head><body><div class="stage">
  <div class="backdrop"><img src="${a.berge}" alt=""></div>
  <div class="veil-x"></div><div class="veil-t"></div><div class="veil-b"></div><div class="glow"></div>
  <div class="portrait"><div class="aura"></div><img src="${a.portrait}" alt="Heiko Schwaninger"></div>
  <div class="content"><h1>${quoteHTML}</h1><div class="rule"></div></div>
  <div class="brand"><img src="${a.logo}" alt="Werde Meister deiner Gedanken">
    <div class="wm"><div class="l1">Werde <em>Meister</em></div>
      <div class="l2"><span class="ln"></span><span class="t">Deiner Gedanken</span><span class="ln"></span></div></div></div>
  <div class="grain"></div>
</div></body></html>`;
}

QUOTES.forEach((q, i) => {
  const n = String(i + 1).padStart(2, "0");
  fs.writeFileSync(path.join(BUILD, `weisheit-story-portrait-${n}.html`), page(q.html, VARIANTS[i]));
});
console.log(`Serie A Story (Porträt 9:16): ${QUOTES.length} Seiten -> tools/social/weisheiten/build/`);
