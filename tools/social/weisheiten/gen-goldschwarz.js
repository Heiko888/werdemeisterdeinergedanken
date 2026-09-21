// Einzel-Motiv „Gold auf Schwarz" – die Wandbild-Szene (heiko-szene-goldwand,
// Vollszene mit Hintergrund) als Full-Bleed-Bild mit Markentext. 4:5 + 9:16.
const fs = require("node:fs");
const path = require("node:path");
const a = require("./assets");

const BUILD = path.join(__dirname, "build");
fs.mkdirSync(BUILD, { recursive: true });

const TEXT = `Wo andere nur<br><em>Schwarz</em> sehen,<br>tr&auml;gst du <em>Gold</em> auf.`;

// Text sitzt UNTEN (über dem dunklen Eimer-/Boden-Bereich), damit das Gesicht oben frei bleibt.
const FMT = {
  "4x5":  { w: 1080, h: 1350, contentBottom: 190, font: 56, maxw: 960, logoBottom: 60,  ruleTop: 22, objPos: "50% 34%" },
  "9x16": { w: 1080, h: 1920, contentBottom: 320, font: 66, maxw: 980, logoBottom: 150, ruleTop: 26, objPos: "54% 40%" },
};

function page(fmtKey) {
  const f = FMT[fmtKey];
  const isStory = fmtKey === "9x16";
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><style>
@font-face{font-family:'Inter';src:url('${a.inter}') format('woff2');font-weight:100 900;font-style:normal;font-display:block;}
@font-face{font-family:'Fraunces';src:url('${a.fraunces}') format('woff2');font-weight:100 900;font-style:normal;font-display:block;}
@font-face{font-family:'Fraunces';src:url('${a.frauncesI}') format('woff2');font-weight:100 900;font-style:italic;font-display:block;}
:root{--navy-950:#090b10;--navy-900:#0f1218;--gold-300:#f2d489;--gold-400:#e8c15f;--gold-500:#d9a93a;--gold-600:#a8842a;--cream:#f4f2ec;}
*{margin:0;box-sizing:border-box;}
html,body{width:${f.w}px;height:${f.h}px;}
body{font-family:'Inter',system-ui,sans-serif;background:var(--navy-950);color:var(--cream);overflow:hidden;position:relative;-webkit-font-smoothing:antialiased;}
.stage{position:absolute;inset:0;overflow:hidden;isolation:isolate;}
.backdrop{position:absolute;inset:0;z-index:-30;}
.backdrop img{width:100%;height:100%;object-fit:cover;object-position:${f.objPos};}
.veil-t{position:absolute;left:0;right:0;top:0;height:22%;z-index:-18;
  background:linear-gradient(to bottom,color-mix(in oklab,var(--navy-950) 46%,transparent) 0%,color-mix(in oklab,var(--navy-950) 18%,transparent) 55%,transparent);}
.veil-b{position:absolute;left:0;right:0;bottom:0;height:52%;z-index:-18;
  background:linear-gradient(to top,color-mix(in oklab,var(--navy-950) 92%,transparent) 0%,color-mix(in oklab,var(--navy-950) 74%,transparent) 34%,color-mix(in oklab,var(--navy-950) 38%,transparent) 62%,transparent 90%);}
.grain{position:absolute;inset:0;z-index:5;pointer-events:none;opacity:.06;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");}
.content{position:absolute;z-index:4;bottom:${f.contentBottom}px;left:50%;transform:translateX(-50%);width:${f.maxw}px;text-align:center;}
h1{margin:0;font-size:${f.font}px;line-height:1.14;font-weight:500;letter-spacing:-.5px;color:var(--cream);text-shadow:0 2px 34px rgba(9,11,16,.85);}
h1 em{font-family:'Fraunces',serif;font-style:italic;font-weight:500;font-size:1.34em;line-height:1;
  color:transparent;background:linear-gradient(120deg,#f2d489,#d9a93a);-webkit-background-clip:text;background-clip:text;}
.rule{margin:${f.ruleTop}px auto 0;width:70px;height:4px;border-radius:2px;background:linear-gradient(90deg,var(--gold-400),var(--gold-500));box-shadow:0 0 16px rgba(217,169,58,.5);}
.brand{position:absolute;bottom:${f.logoBottom}px;left:50%;transform:translateX(-50%);z-index:6;display:inline-flex;align-items:center;gap:15px;filter:drop-shadow(0 2px 20px rgba(9,11,16,.85));}
.brand img{height:${isStory ? 62 : 58}px;width:auto;display:block;filter:drop-shadow(0 0 18px rgba(217,169,58,.28));}
.brand .wm{display:flex;flex-direction:column;gap:6px;line-height:1;color:var(--cream);}
.brand .l1{font-family:'Fraunces',serif;font-weight:400;text-transform:uppercase;letter-spacing:.1em;font-size:${isStory ? 24 : 22}px;line-height:1;}
.brand .l1 em{font-style:normal;color:transparent;background:linear-gradient(100deg,var(--gold-300),var(--gold-500));-webkit-background-clip:text;background-clip:text;}
.brand .l2{display:flex;align-items:center;gap:8px;}
.brand .l2 .ln{height:1px;width:13px;background:rgba(242,212,137,.85);}
.brand .l2 .t{font-family:'Fraunces',serif;font-weight:400;text-transform:uppercase;letter-spacing:.24em;font-size:${isStory ? 11.5 : 11}px;line-height:1;}
</style></head><body><div class="stage">
  <div class="backdrop"><img src="${a.goldwand}" alt="Heiko Schwaninger"></div>
  <div class="veil-t"></div><div class="veil-b"></div>
  <div class="content"><h1>${TEXT}</h1><div class="rule"></div></div>
  <div class="brand"><img src="${a.logo}" alt="Werde Meister deiner Gedanken">
    <div class="wm"><div class="l1">Werde <em>Meister</em></div>
      <div class="l2"><span class="ln"></span><span class="t">Deiner Gedanken</span><span class="ln"></span></div></div></div>
  <div class="grain"></div>
</div></body></html>`;
}

fs.writeFileSync(path.join(BUILD, `goldschwarz-4x5.html`), page("4x5"));
fs.writeFileSync(path.join(BUILD, `goldschwarz-9x16.html`), page("9x16"));
console.log(`Motiv „Gold auf Schwarz": 4:5 + 9:16 -> tools/social/weisheiten/build/`);
