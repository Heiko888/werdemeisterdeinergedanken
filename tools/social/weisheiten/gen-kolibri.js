// Reel-Cover „Die Geschichte vom Kolibri" (9:16, 1080x1920).
// Full-Bleed-Szene (Waldbrand + Tiere + Kolibri) mit Markentitel, Gold-Kursiv auf
// „Kolibri", Eyebrow + kurze Subline, Logo unten. Text oben (Himmel/Rauch) mit Scrim.
const fs = require("node:fs");
const path = require("node:path");
const a = require("./assets");

const BUILD = path.join(__dirname, "build");
fs.mkdirSync(BUILD, { recursive: true });

const SRC = path.join(__dirname, "quellen", "kolibri-szene.png");
const bg = "data:image/png;base64," + fs.readFileSync(SRC).toString("base64");

const W = 1080, H = 1920;

const html = `<!doctype html><html lang="de"><head><meta charset="utf-8"><style>
@font-face{font-family:'Inter';src:url('${a.inter}') format('woff2');font-weight:100 900;font-style:normal;font-display:block;}
@font-face{font-family:'Fraunces';src:url('${a.fraunces}') format('woff2');font-weight:100 900;font-style:normal;font-display:block;}
@font-face{font-family:'Fraunces';src:url('${a.frauncesI}') format('woff2');font-weight:100 900;font-style:italic;font-display:block;}
:root{--navy-950:#090b10;--navy-900:#0f1218;--gold-300:#f2d489;--gold-400:#e8c15f;--gold-500:#d9a93a;--cream:#f4f2ec;}
*{margin:0;box-sizing:border-box;}
html,body{width:${W}px;height:${H}px;}
body{font-family:'Inter',system-ui,sans-serif;background:var(--navy-950);color:var(--cream);overflow:hidden;position:relative;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;}
.stage{position:absolute;inset:0;overflow:hidden;isolation:isolate;}
.bg{position:absolute;inset:0;z-index:-30;}
.bg img{width:100%;height:100%;object-fit:cover;object-position:60% 30%;}
/* Titel-Scrim oben, Logo-Scrim unten */
.veil-t{position:absolute;left:0;right:0;top:0;height:52%;z-index:-18;
  background:linear-gradient(to bottom,color-mix(in oklab,var(--navy-950) 84%,transparent) 0%,color-mix(in oklab,var(--navy-950) 55%,transparent) 46%,color-mix(in oklab,var(--navy-950) 18%,transparent) 74%,transparent);}
.veil-b{position:absolute;left:0;right:0;bottom:0;height:30%;z-index:-18;
  background:linear-gradient(to top,color-mix(in oklab,var(--navy-950) 86%,transparent) 0%,color-mix(in oklab,var(--navy-950) 40%,transparent) 46%,transparent 82%);}
.grain{position:absolute;inset:0;z-index:5;pointer-events:none;opacity:.05;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");}
.content{position:absolute;z-index:4;top:150px;left:72px;right:72px;text-align:center;}
.eyebrow{font-family:'Fraunces',serif;font-weight:500;text-transform:uppercase;letter-spacing:.34em;font-size:26px;
  color:transparent;background:linear-gradient(100deg,var(--gold-300),var(--gold-500));-webkit-background-clip:text;background-clip:text;}
h1{margin:26px 0 0;font-family:'Fraunces',serif;font-weight:600;font-size:118px;line-height:1.02;letter-spacing:-1px;color:var(--cream);text-shadow:0 3px 40px rgba(9,11,16,.85);}
h1 em{font-style:italic;font-weight:600;color:transparent;background:linear-gradient(120deg,#f2d489,#d9a93a);-webkit-background-clip:text;background-clip:text;
  -webkit-text-stroke:1.4px rgba(9,11,16,.55);paint-order:stroke fill;}
.rule{margin:34px auto 0;width:84px;height:5px;border-radius:3px;background:linear-gradient(90deg,var(--gold-400),var(--gold-500));box-shadow:0 0 18px rgba(217,169,58,.55);}
.sub{margin:30px auto 0;max-width:760px;font-size:38px;line-height:1.3;color:rgba(244,242,236,.94);text-shadow:0 2px 24px rgba(9,11,16,.85);}
.brand{position:absolute;bottom:104px;left:50%;transform:translateX(-50%);z-index:6;display:inline-flex;align-items:center;gap:16px;filter:drop-shadow(0 2px 22px rgba(9,11,16,.9));}
.brand img{height:66px;width:auto;display:block;filter:drop-shadow(0 0 18px rgba(217,169,58,.3));}
.brand .wm{display:flex;flex-direction:column;gap:7px;line-height:1;color:var(--cream);}
.brand .l1{font-family:'Fraunces',serif;font-weight:400;text-transform:uppercase;letter-spacing:.1em;font-size:25px;line-height:1;}
.brand .l1 em{font-style:normal;color:transparent;background:linear-gradient(100deg,var(--gold-300),var(--gold-500));-webkit-background-clip:text;background-clip:text;}
.brand .l2{display:flex;align-items:center;gap:9px;}
.brand .l2 .ln{height:1px;width:15px;background:rgba(242,212,137,.85);}
.brand .l2 .t{font-family:'Fraunces',serif;font-weight:400;text-transform:uppercase;letter-spacing:.24em;font-size:12px;line-height:1;}
</style></head><body><div class="stage">
  <div class="bg"><img src="${bg}" alt=""></div>
  <div class="veil-t"></div><div class="veil-b"></div>
  <div class="content">
    <div class="eyebrow">Eine Parabel</div>
    <h1>Die Geschichte<br>vom <em>Kolibri</em></h1>
    <div class="rule"></div>
    <div class="sub">Jeder trägt seinen Tropfen bei.</div>
  </div>
  <div class="brand"><img src="${a.logo}" alt="Werde Meister deiner Gedanken">
    <div class="wm"><div class="l1">Werde <em>Meister</em></div>
      <div class="l2"><span class="ln"></span><span class="t">Deiner Gedanken</span><span class="ln"></span></div></div></div>
  <div class="grain"></div>
</div></body></html>`;

fs.writeFileSync(path.join(BUILD, "kolibri-cover-9x16.html"), html);
console.log("Reel-Cover Kolibri: 1 Seite -> build/");
