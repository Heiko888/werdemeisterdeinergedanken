// Story/Feed „Papa, kannste mal erklären?" mit ZWEI Personen: Junge (Blick nach
// oben, Rucksack) links + Papa (Hände in den Taschen, Blick zum Kind) rechts,
// einander zugewandt. Erzeugt 9:16 (1080x1920) und 4:5 (1080x1350).
const fs = require("node:fs");
const path = require("node:path");
const a = require("./assets");

const BUILD = path.join(__dirname, "build");
fs.mkdirSync(BUILD, { recursive: true });
const NAT = { w: 1024, h: 1536 };

// Silhouetten-Boxen (nicht-transparente Fläche, alpha>90)
const BBOX = {
  papaTaschen:  { minx: 314, maxx: 818, miny: 23, maxy: 1513 }, // Papa (5e84e0df)
  kindRucksack: { minx: 283, maxx: 733, miny: 20, maxy: 1442 }, // Junge (e0042f5e)
};

const TEXT = `Papa, kannste<br>mal <em>erkl&auml;ren</em>?`;

// Format-Parameter: Rahmen, Fußlinie, Figurhöhen + horizontale Mitten, Text/Logo.
const FMT = {
  "9x16": { w: 1080, h: 1920, foot: 1885, textTop: 128, font: 74, contentW: 900, logoBottom: 120, ruleTop: 28,
            figs: [ { pose: "kindRucksack", targetH: 985,  centerX: 322 },
                    { pose: "papaTaschen",  targetH: 1295, centerX: 742 } ] },
  "4x5":  { w: 1080, h: 1350, foot: 1345, textTop: 72,  font: 60, contentW: 900, logoBottom: 60,  ruleTop: 22,
            figs: [ { pose: "kindRucksack", targetH: 775,  centerX: 322 },
                    { pose: "papaTaschen",  targetH: 1015, centerX: 742 } ] },
};

function place(pose, targetH, centerX, foot) {
  const bb = BBOX[pose];
  const scale = targetH / (bb.maxy - bb.miny);
  return {
    dispW: Math.round(NAT.w * scale),
    dispH: Math.round(NAT.h * scale),
    left: Math.round(centerX - ((bb.minx + bb.maxx) / 2) * scale),
    top: Math.round(foot - bb.maxy * scale),
  };
}

function figureHTML(fig, foot, z) {
  const p = place(fig.pose, fig.targetH, fig.centerX, foot);
  return `<div class="figure" style="z-index:${z};left:${p.left}px;top:${p.top}px;width:${p.dispW}px;height:${p.dispH}px;">
    <img src="${a.posen[fig.pose]}" alt=""></div>`;
}

function page(fmtKey, bg) {
  const f = FMT[fmtKey];
  const isStory = fmtKey === "9x16";
  const veilTop = isStory ? 44 : 40;
  const figures = f.figs.map((fig, i) => figureHTML(fig, f.foot, i + 1)).join("\n  ");
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
.veil-t{position:absolute;left:0;right:0;top:0;height:${veilTop}%;z-index:-18;
  background:linear-gradient(to bottom,color-mix(in oklab,var(--navy-950) 84%,transparent) 0%,color-mix(in oklab,var(--navy-950) 60%,transparent) 44%,color-mix(in oklab,var(--navy-900) 26%,transparent) 78%,transparent);}
.veil-b{position:absolute;left:0;right:0;bottom:0;height:36%;z-index:-18;
  background:linear-gradient(to top,color-mix(in oklab,var(--navy-950) 74%,transparent) 0%,color-mix(in oklab,var(--navy-900) 30%,transparent) 46%,transparent 80%);}
.glow{position:absolute;inset:0;z-index:-10;background:
  radial-gradient(60% 30% at 50% 6%,color-mix(in oklab,var(--gold-400) 18%,transparent),transparent 62%),
  radial-gradient(60% 26% at 50% 96%,color-mix(in oklab,var(--gold-600) 16%,transparent),transparent 64%);}
.grain{position:absolute;inset:0;z-index:5;pointer-events:none;opacity:.06;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");}
.ground{position:absolute;left:0;right:0;bottom:0;height:20%;z-index:0;pointer-events:none;
  background:radial-gradient(60% 90% at 50% 100%,color-mix(in oklab,var(--navy-950) 68%,transparent),transparent 74%);}
.figure{position:absolute;filter:drop-shadow(0 20px 46px rgba(9,11,16,.6));}
.figure img{width:100%;height:100%;object-fit:contain;object-position:center bottom;display:block;}
.content{position:absolute;z-index:4;top:${f.textTop}px;left:50%;transform:translateX(-50%);width:${f.contentW}px;text-align:center;}
h1{margin:0;font-size:${f.font}px;line-height:1.12;font-weight:500;letter-spacing:-.5px;color:var(--cream);text-shadow:0 2px 36px rgba(9,11,16,.78);}
h1 em{font-family:'Fraunces',serif;font-style:italic;font-weight:500;font-size:1.34em;line-height:1;
  color:transparent;background:linear-gradient(120deg,#f2d489,#d9a93a);-webkit-background-clip:text;background-clip:text;}
.rule{margin:${f.ruleTop}px auto 0;width:70px;height:4px;border-radius:2px;background:linear-gradient(90deg,var(--gold-400),var(--gold-500));box-shadow:0 0 16px rgba(217,169,58,.5);}
.brand{position:absolute;bottom:${f.logoBottom}px;left:50%;transform:translateX(-50%);z-index:6;display:inline-flex;align-items:center;gap:15px;filter:drop-shadow(0 2px 20px rgba(9,11,16,.8));}
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
  ${figures}
  <div class="content"><h1>${TEXT}</h1><div class="rule"></div></div>
  <div class="brand"><img src="${a.logo}" alt="Werde Meister deiner Gedanken">
    <div class="wm"><div class="l1">Werde <em>Meister</em></div>
      <div class="l2"><span class="ln"></span><span class="t">Deiner Gedanken</span><span class="ln"></span></div></div></div>
  <div class="grain"></div>
</div></body></html>`;
}

const bg = a.backdrops[0];
fs.writeFileSync(path.join(BUILD, `papa-erklaeren-9x16.html`), page("9x16", bg));
fs.writeFileSync(path.join(BUILD, `papa-erklaeren-4x5.html`), page("4x5", bg));
console.log(`Story „Papa, kannste mal erklären?" (2 Personen): 9:16 + 4:5 -> tools/social/weisheiten/build/`);
