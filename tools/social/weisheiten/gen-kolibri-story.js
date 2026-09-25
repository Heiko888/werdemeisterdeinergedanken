// Carousel „Die Geschichte vom Kolibri" – die Parabel in 8 Slides erzählt.
// Eine durchgehende cinematische Szene (Waldbrand + Tiere + Kolibri), je Slide ein
// anderer Bildausschnitt (object-position), Text oben mit Scrim, Marken-Schluss.
// Je Slide 4:5 (1080x1350) + 9:16 (1080x1920).
const fs = require("node:fs");
const path = require("node:path");
const a = require("./assets");

const BUILD = path.join(__dirname, "build");
fs.mkdirSync(BUILD, { recursive: true });
const SRC = path.join(__dirname, "quellen", "kolibri-szene.png");
const bg = "data:image/png;base64," + fs.readFileSync(SRC).toString("base64");

// pos = object-position (welcher Ausschnitt), q = Text, cta = optionale Pille
const SLIDES = [
  { n: 1, key: "cover", pos: "60% 26%",
    q: `Die Geschichte<br>vom <em>Kolibri</em>`, sub: "Eine Parabel über deinen Beitrag." },
  { n: 2, key: "feuer", pos: "82% 46%",
    q: `Im Wald bricht<br>ein <em>Feuer</em> aus.` },
  { n: 3, key: "fliehen", pos: "16% 58%",
    q: `Alle Tiere <em>fliehen</em> &ndash;<br>und schauen<br>ohnm&auml;chtig zu.` },
  { n: 4, key: "kolibri", pos: "60% 24%",
    q: `Nur einer bleibt:<br>der <em>Kolibri</em>.` },
  { n: 5, key: "wasser", pos: "58% 22%",
    q: `Tropfen f&uuml;r Tropfen<br>tr&auml;gt er <em>Wasser</em><br>ins Feuer.` },
  { n: 6, key: "spott", pos: "14% 60%",
    q: `Die anderen spotten:<br><em>&bdquo;Was soll das<br>schon bringen?&ldquo;</em>` },
  { n: 7, key: "ichtue", pos: "60% 26%",
    q: `Der Kolibri sagt:<br><em>&bdquo;Ich tue,<br>was ich kann.&ldquo;</em>` },
  { n: 8, key: "moral", pos: "50% 40%",
    q: `Du kannst nicht<br>alles l&ouml;schen.<br>Aber du kannst<br>deinen <em>Teil</em> tun.`,
    cta: "Fang bei deinen Gedanken an" },
];

const FMT = {
  "4x5":  { w: 1080, h: 1350, textTop: 118, eyebrow: 24, font: 74, sub: 34, maxw: 940, veilT: 56, logoBottom: 60, kickerTop: 70, dotsTop: 104, ctaFont: 26 },
  "9x16": { w: 1080, h: 1920, textTop: 214, eyebrow: 26, font: 82, sub: 38, maxw: 960, veilT: 52, logoBottom: 150, kickerTop: 132, dotsTop: 170, ctaFont: 28 },
};

function dots(i, total, story) {
  let s = "";
  for (let k = 0; k < total; k++) s += `<i class="${k === i ? "on" : ""}"></i>`;
  return `<div class="dots">${s}</div>`;
}

function page(fmtKey, sl, i, total) {
  const f = FMT[fmtKey];
  const isStory = fmtKey === "9x16";
  const eyebrow = sl.eyebrow ? `<div class="eyebrow">${sl.eyebrow}</div>` : "";
  const sub = sl.sub ? `<div class="sub">${sl.sub}</div>` : "";
  const cta = sl.cta ? `<div class="cta">${sl.cta}</div>` : "";
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><style>
@font-face{font-family:'Inter';src:url('${a.inter}') format('woff2');font-weight:100 900;font-style:normal;font-display:block;}
@font-face{font-family:'Fraunces';src:url('${a.fraunces}') format('woff2');font-weight:100 900;font-style:normal;font-display:block;}
@font-face{font-family:'Fraunces';src:url('${a.frauncesI}') format('woff2');font-weight:100 900;font-style:italic;font-display:block;}
:root{--navy-950:#090b10;--navy-900:#0f1218;--gold-300:#f2d489;--gold-400:#e8c15f;--gold-500:#d9a93a;--cream:#f4f2ec;}
*{margin:0;box-sizing:border-box;}
html,body{width:${f.w}px;height:${f.h}px;}
body{font-family:'Inter',system-ui,sans-serif;background:var(--navy-950);color:var(--cream);overflow:hidden;position:relative;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;}
.stage{position:absolute;inset:0;overflow:hidden;isolation:isolate;}
.bg{position:absolute;inset:0;z-index:-30;}
.bg img{width:100%;height:100%;object-fit:cover;object-position:${sl.pos};}
.veil-t{position:absolute;left:0;right:0;top:0;height:${f.veilT}%;z-index:-18;
  background:linear-gradient(to bottom,color-mix(in oklab,var(--navy-950) 86%,transparent) 0%,color-mix(in oklab,var(--navy-950) 58%,transparent) 46%,color-mix(in oklab,var(--navy-950) 20%,transparent) 74%,transparent);}
.veil-b{position:absolute;left:0;right:0;bottom:0;height:28%;z-index:-18;
  background:linear-gradient(to top,color-mix(in oklab,var(--navy-950) 84%,transparent) 0%,color-mix(in oklab,var(--navy-950) 34%,transparent) 48%,transparent 82%);}
.grain{position:absolute;inset:0;z-index:5;pointer-events:none;opacity:.05;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");}
.kicker{position:absolute;z-index:6;top:${f.kickerTop}px;left:50%;transform:translateX(-50%);
  font-family:'Fraunces',serif;font-weight:500;text-transform:uppercase;letter-spacing:.3em;font-size:${isStory ? 20 : 18}px;
  color:transparent;background:linear-gradient(100deg,var(--gold-300),var(--gold-500));-webkit-background-clip:text;background-clip:text;}
.dots{position:absolute;z-index:6;top:${f.dotsTop}px;left:50%;transform:translateX(-50%);display:flex;gap:${isStory ? 11 : 9}px;}
.dots i{width:${isStory ? 9 : 8}px;height:${isStory ? 9 : 8}px;border-radius:50%;background:rgba(244,242,236,.34);}
.dots i.on{background:linear-gradient(120deg,var(--gold-300),var(--gold-500));box-shadow:0 0 10px rgba(217,169,58,.6);}
.content{position:absolute;z-index:4;top:${f.textTop}px;left:60px;right:60px;text-align:center;}
.eyebrow{font-family:'Fraunces',serif;font-weight:500;text-transform:uppercase;letter-spacing:.32em;font-size:${f.eyebrow}px;margin-bottom:20px;
  color:transparent;background:linear-gradient(100deg,var(--gold-300),var(--gold-500));-webkit-background-clip:text;background-clip:text;}
h1{margin:0 auto;max-width:${f.maxw}px;font-family:'Fraunces',serif;font-weight:600;font-size:${f.font}px;line-height:1.06;letter-spacing:-.5px;color:var(--cream);text-shadow:0 3px 38px rgba(9,11,16,.85);}
h1 em{font-style:italic;font-weight:600;color:transparent;background:linear-gradient(120deg,#f2d489,#d9a93a);-webkit-background-clip:text;background-clip:text;
  -webkit-text-stroke:1.4px rgba(9,11,16,.5);paint-order:stroke fill;}
.rule{margin:26px auto 0;width:76px;height:5px;border-radius:3px;background:linear-gradient(90deg,var(--gold-400),var(--gold-500));box-shadow:0 0 16px rgba(217,169,58,.5);}
.sub{margin:24px auto 0;max-width:760px;font-family:'Inter',sans-serif;font-weight:500;font-size:${f.sub}px;line-height:1.3;color:rgba(244,242,236,.95);text-shadow:0 2px 22px rgba(9,11,16,.85);}
.cta{margin:26px auto 0;display:inline-block;padding:${isStory ? "14px 30px" : "12px 26px"};border-radius:999px;
  font-family:'Inter',sans-serif;font-size:${f.ctaFont}px;font-weight:600;letter-spacing:.02em;color:var(--navy-950);
  background:linear-gradient(120deg,var(--gold-300),var(--gold-500));box-shadow:0 6px 24px -6px rgba(217,169,58,.6);}
.brand{position:absolute;bottom:${f.logoBottom}px;left:50%;transform:translateX(-50%);z-index:6;display:inline-flex;align-items:center;gap:14px;filter:drop-shadow(0 2px 22px rgba(9,11,16,.9));}
.brand img{height:${isStory ? 56 : 50}px;width:auto;display:block;filter:drop-shadow(0 0 16px rgba(217,169,58,.28));}
.brand .wm{display:flex;flex-direction:column;gap:6px;line-height:1;color:var(--cream);}
.brand .l1{font-family:'Fraunces',serif;font-weight:400;text-transform:uppercase;letter-spacing:.1em;font-size:${isStory ? 22 : 20}px;line-height:1;}
.brand .l1 em{font-style:normal;color:transparent;background:linear-gradient(100deg,var(--gold-300),var(--gold-500));-webkit-background-clip:text;background-clip:text;}
.brand .l2{display:flex;align-items:center;gap:8px;}
.brand .l2 .ln{height:1px;width:13px;background:rgba(242,212,137,.85);}
.brand .l2 .t{font-family:'Fraunces',serif;font-weight:400;text-transform:uppercase;letter-spacing:.24em;font-size:${isStory ? 11 : 10}px;line-height:1;}
</style></head><body><div class="stage">
  <div class="bg"><img src="${bg}" alt=""></div>
  <div class="veil-t"></div><div class="veil-b"></div>
  <div class="kicker">Die Kolibri-Parabel</div>${dots(i, total)}
  <div class="content">${eyebrow}<h1>${sl.q}</h1><div class="rule"></div>${sub}${cta}</div>
  <div class="brand"><img src="${a.logo}" alt="Werde Meister deiner Gedanken">
    <div class="wm"><div class="l1">Werde <em>Meister</em></div>
      <div class="l2"><span class="ln"></span><span class="t">Deiner Gedanken</span><span class="ln"></span></div></div></div>
  <div class="grain"></div>
</div></body></html>`;
}

const total = SLIDES.length;
SLIDES.forEach((sl, i) => {
  const nn = String(sl.n).padStart(2, "0");
  fs.writeFileSync(path.join(BUILD, `kolibri-story-${nn}-${sl.key}-4x5.html`), page("4x5", sl, i, total));
  fs.writeFileSync(path.join(BUILD, `kolibri-story-${nn}-${sl.key}-9x16.html`), page("9x16", sl, i, total));
});
console.log(`Carousel Kolibri-Parabel: ${total} Slides x2 -> build/`);
