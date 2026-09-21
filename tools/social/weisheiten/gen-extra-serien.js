// Weitere Weisheits-Serien aus der bestehenden Pose-Bibliothek:
//   Serie I „Loslassen & Frieden"   (prefix loslassen)
//   Serie J „Mut & Selbstwert"      (prefix mut)
//   Serie K „Fokus & Disziplin"     (prefix fokus)
//   Serie L „Verantwortung & Handeln" (prefix handeln)
// Zentrierter Aufbau (Text oben, Figur mittig-unten), je Motiv 4:5 + 9:16.
const fs = require("node:fs");
const path = require("node:path");
const a = require("./assets");

const BUILD = path.join(__dirname, "build");
fs.mkdirSync(BUILD, { recursive: true });

// Pose: native Maße [W,H] + Silhouetten-Box (alpha>110)
const POSES = {
  offeneArme:            { nat: [941, 1672],  bb: { minx: 19,  maxx: 928,  miny: 11, maxy: 1614 } },
  augenZu:               { nat: [1024, 1536], bb: { minx: 166, maxx: 836,  miny: 30, maxy: 1454 } },
  handHerz:              { nat: [1024, 1536], bb: { minx: 172, maxx: 864,  miny: 34, maxy: 1534 } },
  offeneHand:            { nat: [1024, 1536], bb: { minx: 208, maxx: 882,  miny: 32, maxy: 1534 } },
  offeneHand2:           { nat: [1024, 1536], bb: { minx: 122, maxx: 846,  miny: 38, maxy: 1534 } },
  kinn:                  { nat: [1024, 1536], bb: { minx: 160, maxx: 858,  miny: 28, maxy: 1534 } },
  faust:                 { nat: [1024, 1536], bb: { minx: 295, maxx: 850,  miny: 30, maxy: 1522 } },
  handBrust:             { nat: [1024, 1536], bb: { minx: 198, maxx: 714,  miny: 32, maxy: 1502 } },
  armeVerschraenktA:     { nat: [1024, 1536], bb: { minx: 305, maxx: 743,  miny: 16, maxy: 1504 } },
  armeVerschraenktB:     { nat: [1024, 1536], bb: { minx: 317, maxx: 751,  miny: 35, maxy: 1507 } },
  sprung:                { nat: [1024, 1536], bb: { minx: 9,   maxx: 1013, miny: 97, maxy: 1302 } },
  stopp:                 { nat: [1024, 1536], bb: { minx: 166, maxx: 808,  miny: 32, maxy: 1534 } },
  fingerhoch:            { nat: [1024, 1536], bb: { minx: 44,  maxx: 1022, miny: 12, maxy: 1534 } },
  fingerhochTasche:      { nat: [941, 1672],  bb: { minx: 234, maxx: 737,  miny: 40, maxy: 1601 } },
  punkt:                 { nat: [1024, 1536], bb: { minx: 152, maxx: 882,  miny: 24, maxy: 1534 } },
  zeigen:                { nat: [1024, 1536], bb: { minx: 134, maxx: 938,  miny: 38, maxy: 1534 } },
  merke:                 { nat: [941, 1670],  bb: { minx: 202, maxx: 724,  miny: 28, maxy: 1604 } },
  nachdenken:            { nat: [1024, 1536], bb: { minx: 65,  maxx: 987,  miny: 42, maxy: 1508 } },
  zeigtSeite:            { nat: [941, 1672],  bb: { minx: 292, maxx: 733,  miny: 39, maxy: 1583 } },
  gehtZeigt:             { nat: [941, 1672],  bb: { minx: 219, maxx: 746,  miny: 15, maxy: 1607 } },
  rennt:                 { nat: [1024, 1536], bb: { minx: 226, maxx: 833,  miny: 10, maxy: 1516 } },
  doppelzeiger:          { nat: [941, 1672],  bb: { minx: 237, maxx: 748,  miny: 48, maxy: 1609 } },
  reichtHand:            { nat: [1024, 1536], bb: { minx: 287, maxx: 768,  miny: 28, maxy: 1465 } },
  ansprache:             { nat: [1024, 1536], bb: { minx: 288, maxx: 838,  miny: 30, maxy: 1458 } },
};

const SERIES = [
  { prefix: "loslassen", name: "Serie I „Loslassen & Frieden\"", items: [
    { key: "loslassen", pose: "offeneArme",  q: `Was du <em>losl&auml;sst</em>,<br>kann dich nicht<br>mehr <em>halten</em>.` },
    { key: "stille",    pose: "augenZu",     q: `<em>Stille</em> ist kein<br>Nichts &ndash;<br>sie ist <em>Antwort</em>.` },
    { key: "frieden",   pose: "handHerz",    q: `<em>Frieden</em> beginnt,<br>wo der Kampf<br><em>endet</em>.` },
    { key: "halten",    pose: "offeneHand",  q: `Halte nichts<br>fest, was<br>gehen <em>will</em>.` },
    { key: "vertrauen", pose: "offeneHand2", q: `Vertrau dem,<br>was <em>kommt</em>,<br>wenn du <em>losl&auml;sst</em>.` },
    { key: "atme",      pose: "kinn",        q: `Nicht alles<br>braucht eine<br><em>Antwort</em>. Atme.` },
  ]},
  { prefix: "mut", name: "Serie J „Mut & Selbstwert\"", items: [
    { key: "mut",       pose: "faust",             q: `<em>Mut</em> ist Angst,<br>die trotzdem<br><em>losgeht</em>.` },
    { key: "wert",      pose: "handBrust",         q: `Dein <em>Wert</em><br>h&auml;ngt an<br>keinem <em>Applaus</em>.` },
    { key: "stehen",    pose: "armeVerschraenktA", q: `Steh zu <em>dir</em>,<br>auch wenn du<br><em>allein</em> stehst.` },
    { key: "trau",      pose: "sprung", lift: 150, scale: 0.92, q: `Trau dich &ndash;<br>der Boden<br>kommt von <em>selbst</em>.` },
    { key: "nein",      pose: "stopp",             q: `<em>Nein</em> sagen<br>ist auch<br><em>Selbstachtung</em>.` },
    { key: "genug",     pose: "fingerhoch",        q: `Du bist <em>genug</em>.<br>Schon <em>jetzt</em>.` },
  ]},
  { prefix: "fokus", name: "Serie K „Fokus & Disziplin\"", items: [
    { key: "fokus",     pose: "fingerhochTasche",  q: `<em>Fokus</em> hei&szlig;t,<br>Nein zu sagen<br>zu fast <em>allem</em>.` },
    { key: "disziplin", pose: "punkt",             q: `<em>Disziplin</em> ist<br>Liebe zu<br>deinem <em>Ziel</em>.` },
    { key: "ziel",      pose: "zeigen",            q: `Ein <em>Ziel</em><br>ohne Plan<br>bleibt ein <em>Wunsch</em>.` },
    { key: "schritte",  pose: "merke",            q: `Kleine Schritte,<br>t&auml;glich &ndash;<br>schlagen <em>Talent</em>.` },
    { key: "weglassen", pose: "armeVerschraenktB", q: `<em>Klarheit</em> entsteht,<br>wenn du<br><em>wegl&auml;sst</em>.` },
    { key: "langsam",   pose: "nachdenken",        q: `Denk <em>langsam</em>.<br>Dann handle<br><em>schnell</em>.` },
  ]},
  { prefix: "handeln", name: "Serie L „Verantwortung & Handeln\"", items: [
    { key: "zug",       pose: "zeigtSeite",   q: `Es ist <em>dein</em><br>Leben. Also<br>dein <em>Zug</em>.` },
    { key: "tun",       pose: "gehtZeigt",    q: `Reden <em>&auml;ndert</em> nichts.<br><em>Tun</em> schon.` },
    { key: "moment",    pose: "rennt",        q: `Warte nicht auf<br>den <em>perfekten</em><br>Moment.` },
    { key: "verantwortung", pose: "doppelzeiger", q: `<em>Du</em> bist dran.<br>Und das ist<br>gute <em>Nachricht</em>.` },
    { key: "eigenehand", pose: "reichtHand",  q: `Nimm dein Leben<br>in die <em>eigene</em><br>Hand.` },
    { key: "gestalten", pose: "ansprache",    q: `H&ouml;r auf zu <em>warten</em>.<br>Fang an zu<br><em>gestalten</em>.` },
  ]},
];

const FMT = {
  "4x5":  { w: 1080, h: 1350, targetH: 900,  footY: 1345, textTop: 84,  font: 58, maxw: 900, logoBottom: 66,  ruleTop: 24, veilT: 52 },
  "9x16": { w: 1080, h: 1920, targetH: 1180, footY: 1900, textTop: 300, font: 70, maxw: 940, logoBottom: 196, ruleTop: 28, veilT: 46 },
};

function place(poseKey, targetH, centerX, foot) {
  const { nat, bb } = POSES[poseKey];
  const [NW, NH] = nat;
  const scale = targetH / (bb.maxy - bb.miny);
  return {
    dispW: Math.round(NW * scale),
    dispH: Math.round(NH * scale),
    left: Math.round(centerX - ((bb.minx + bb.maxx) / 2) * scale),
    top: Math.round(foot - bb.maxy * scale),
  };
}

function page(fmtKey, item, bg) {
  const f = FMT[fmtKey];
  const isStory = fmtKey === "9x16";
  const targetH = Math.round(f.targetH * (item.scale || 1));
  const foot = f.footY - (item.lift || 0);
  const p = place(item.pose, targetH, f.w / 2, foot);
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
  background:linear-gradient(to bottom,color-mix(in oklab,var(--navy-950) 84%,transparent) 0%,color-mix(in oklab,var(--navy-950) 60%,transparent) 45%,color-mix(in oklab,var(--navy-900) 26%,transparent) 78%,transparent);}
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
h1{margin:0;font-size:${f.font}px;line-height:1.13;font-weight:500;letter-spacing:-.5px;color:var(--cream);text-shadow:0 2px 34px rgba(9,11,16,.74);}
h1 em{font-family:'Fraunces',serif;font-style:italic;font-weight:500;font-size:1.34em;line-height:1;
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
  <div class="figure"><img src="${a.posen[item.pose]}" alt="Heiko Schwaninger"></div>
  <div class="content"><h1>${item.q}</h1><div class="rule"></div></div>
  <div class="brand"><img src="${a.logo}" alt="Werde Meister deiner Gedanken">
    <div class="wm"><div class="l1">Werde <em>Meister</em></div>
      <div class="l2"><span class="ln"></span><span class="t">Deiner Gedanken</span><span class="ln"></span></div></div></div>
  <div class="grain"></div>
</div></body></html>`;
}

let total = 0;
SERIES.forEach((s) => {
  s.items.forEach((item, i) => {
    const nn = String(i + 1).padStart(2, "0");
    const bg = a.backdrops[i % a.backdrops.length];
    fs.writeFileSync(path.join(BUILD, `${s.prefix}-${nn}-${item.key}-4x5.html`), page("4x5", item, bg));
    fs.writeFileSync(path.join(BUILD, `${s.prefix}-${nn}-${item.key}-9x16.html`), page("9x16", item, bg));
    total += 2;
  });
  console.log(`${s.name}: ${s.items.length}x2 Seiten`);
});
console.log(`Gesamt: ${total} Seiten -> tools/social/weisheiten/build/`);
