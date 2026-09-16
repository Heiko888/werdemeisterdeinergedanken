// Serie A – Kopf-Porträt: 8 Posts aus dem Sonnenaufgang-Porträt (heiko-hero),
// variiert per Spiegelung + Ausschnitt. Schreibt HTML nach ./build/.
const fs = require("node:fs");
const path = require("node:path");
const a = require("./assets");
const QUOTES = require("./quotes");

const BUILD = path.join(__dirname, "build");
fs.mkdirSync(BUILD, { recursive: true });

// Rahmungs-Variante je Weisheit (Reihenfolge = quotes.js).
// side: Porträtseite · flip: Porträt spiegeln · bgFlip: Berg spiegeln · zoom
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

const ZOOM = { normal: { pw: 660, ph: 900 }, wide: { pw: 560, ph: 780 }, close: { pw: 800, ph: 1090 } };

function page(quoteHTML, o, bg) {
  const left = o.side === "left";
  const z = ZOOM[o.zoom] || ZOOM.normal;
  const textRight = left;
  const veilAngle = textRight ? "240deg" : "120deg";
  const glowX = left ? "16%" : "84%";
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
.backdrop img{width:100%;height:100%;object-fit:cover;object-position:center center;transform:${o.bgFlip ? "scaleX(-1)" : "none"};}
.veil-x{position:absolute;inset:0;z-index:-20;background:linear-gradient(${veilAngle},
  color-mix(in oklab,var(--navy-900) 94%,transparent) 0%,color-mix(in oklab,var(--navy-900) 80%,transparent) 30%,
  color-mix(in oklab,var(--navy-900) 44%,transparent) 60%,transparent 100%);}
.veil-b{position:absolute;left:0;right:0;bottom:0;height:52%;z-index:-20;
  background:linear-gradient(to top,color-mix(in oklab,var(--navy-900) 62%,transparent) 0%,color-mix(in oklab,var(--navy-900) 34%,transparent) 40%,transparent 72%);}
.glow{position:absolute;inset:0;z-index:-10;background:
  radial-gradient(55% 42% at ${glowX} 8%,color-mix(in oklab,var(--gold-400) 22%,transparent),transparent 60%),
  radial-gradient(56% 46% at ${left ? "94%" : "6%"} 96%,color-mix(in oklab,var(--gold-600) 22%,transparent),transparent 62%);}
.toplight{position:absolute;left:0;right:0;top:0;height:44%;z-index:-10;
  background:radial-gradient(80% 100% at 50% 0%,color-mix(in oklab,var(--gold-500) 14%,transparent),transparent 70%);}
.grain{position:absolute;inset:0;z-index:5;pointer-events:none;opacity:.06;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");}
.portrait{position:absolute;bottom:0;width:${z.pw}px;height:${z.ph}px;z-index:1;${left ? "left:-38px" : "right:-38px"};}
.portrait .aura{position:absolute;inset:0;z-index:-1;filter:blur(90px);opacity:.85;
  background:radial-gradient(44% 40% at 52% 32%,color-mix(in oklab,var(--gold-500) 36%,transparent) 0%,color-mix(in oklab,var(--gold-500) 16%,transparent) 42%,transparent 82%);}
.portrait img{width:100%;height:100%;object-fit:contain;object-position:${left ? "left" : "right"} bottom;transform:${o.flip ? "scaleX(-1)" : "none"};
  filter:drop-shadow(0 0 32px rgba(217,169,58,.16)) drop-shadow(0 0 90px rgba(217,169,58,.12));
  -webkit-mask-image:linear-gradient(to bottom,#000 70%,rgba(0,0,0,.5) 88%,transparent 100%);
  mask-image:linear-gradient(to bottom,#000 70%,rgba(0,0,0,.5) 88%,transparent 100%);}
.content{position:absolute;inset:0;z-index:4;display:flex;flex-direction:column;align-items:${textRight ? "flex-end" : "flex-start"};justify-content:flex-start;padding:108px 80px 0;text-align:${textRight ? "right" : "left"};}
h1{margin:0;max-width:580px;font-size:70px;line-height:1.14;font-weight:500;letter-spacing:-.5px;color:var(--cream);text-shadow:0 2px 40px rgba(9,11,16,.62);}
h1 em{font-family:'Fraunces',serif;font-style:italic;font-weight:500;font-size:1.34em;line-height:1;
  color:transparent;background:linear-gradient(120deg,#f2d489,#d9a93a);-webkit-background-clip:text;background-clip:text;}
.rule{margin-top:30px;width:68px;height:4px;border-radius:2px;background:linear-gradient(90deg,var(--gold-400),var(--gold-500));box-shadow:0 0 16px rgba(217,169,58,.5);}
.scrim{position:absolute;bottom:0;${left ? "right:0" : "left:0"};width:62%;height:24%;z-index:3;pointer-events:none;
  background:radial-gradient(120% 100% at ${left ? "100%" : "0%"} 100%,color-mix(in oklab,var(--navy-950) 78%,transparent),transparent 70%);}
.brand{position:absolute;${left ? "right:80px" : "left:80px"};bottom:66px;z-index:5;display:inline-flex;align-items:center;gap:16px;filter:drop-shadow(0 2px 18px rgba(9,11,16,.6));}
.brand img{height:66px;width:auto;display:block;filter:drop-shadow(0 0 18px rgba(217,169,58,.28));}
.brand .wm{display:flex;flex-direction:column;gap:7px;line-height:1;color:var(--cream);}
.brand .l1{font-family:'Fraunces',serif;font-weight:400;text-transform:uppercase;letter-spacing:.1em;font-size:25px;line-height:1;}
.brand .l1 em{font-style:normal;color:transparent;background:linear-gradient(100deg,var(--gold-300),var(--gold-500));-webkit-background-clip:text;background-clip:text;}
.brand .l2{display:flex;align-items:center;gap:9px;}
.brand .l2 .ln{height:1px;width:14px;background:rgba(242,212,137,.85);}
.brand .l2 .t{font-family:'Fraunces',serif;font-weight:400;text-transform:uppercase;letter-spacing:.24em;font-size:12px;line-height:1;}
</style></head><body><div class="stage">
  <div class="backdrop"><img src="${bg}" alt=""></div>
  <div class="veil-x"></div><div class="veil-b"></div><div class="glow"></div><div class="toplight"></div>
  <div class="portrait"><div class="aura"></div><img src="${a.portrait}" alt="Heiko Schwaninger"></div>
  <div class="content"><h1>${quoteHTML}</h1><div class="rule"></div></div>
  <div class="scrim"></div>
  <div class="brand"><img src="${a.logo}" alt="Werde Meister deiner Gedanken">
    <div class="wm"><div class="l1">Werde <em>Meister</em></div>
      <div class="l2"><span class="ln"></span><span class="t">Deiner Gedanken</span><span class="ln"></span></div></div></div>
  <div class="grain"></div>
</div></body></html>`;
}

QUOTES.forEach((q, i) => {
  const n = String(i + 1).padStart(2, "0");
  fs.writeFileSync(path.join(BUILD, `weisheit-portrait-${n}.html`), page(q.html, VARIANTS[i], a.backdrops[i % a.backdrops.length]));
});
console.log(`Serie A (Porträt): ${QUOTES.length} Seiten -> tools/social/weisheiten/build/`);
