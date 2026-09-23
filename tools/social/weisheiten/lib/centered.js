// Gemeinsames Layout-Modul für alle zentrierten Weisheits-Serien (Text oben,
// Figur mittig-unten). Eine Quelle der Wahrheit für Look + grafische Aufwertungen:
//  - Serien-Kicker (Gold-Label) + Fortschritts-Punkte
//  - Kontaktschatten unter den Füßen + Scrim hinter dem Logo
//  - einheitliche Warm-Tonung (Color-Grade) + Typo-Feinschliff
//  - Titel-/Cover-Karte je Serie
const fs = require("node:fs");
const path = require("node:path");
const a = require("../assets");

const BUILD = path.join(__dirname, "..", "build");

const FMT = {
  "4x5":  { w: 1080, h: 1350, targetH: 900,  footY: 1345, textTop: 150, font: 58, maxw: 900, logoBottom: 66,  ruleTop: 24, veilT: 54, kickerTop: 74,  dotsTop: 118 },
  "9x16": { w: 1080, h: 1920, targetH: 1180, footY: 1900, textTop: 360, font: 70, maxw: 940, logoBottom: 196, ruleTop: 28, veilT: 48, kickerTop: 250, dotsTop: 300 },
};

function place(poseObj, targetH, centerX, foot) {
  const [NW, NH] = poseObj.nat;
  const bb = poseObj.bb;
  const scale = targetH / (bb.maxy - bb.miny);
  return {
    dispW: Math.round(NW * scale),
    dispH: Math.round(NH * scale),
    left: Math.round(centerX - ((bb.minx + bb.maxx) / 2) * scale),
    top: Math.round(foot - bb.maxy * scale),
    footCenterX: Math.round(centerX),
  };
}

// Gemeinsames <style> (inkl. aller Aufwertungen). isStory schaltet Story-Feinheiten.
function styleHead(f, isStory) {
  return `<style>
@font-face{font-family:'Inter';src:url('${a.inter}') format('woff2');font-weight:100 900;font-style:normal;font-display:block;}
@font-face{font-family:'Fraunces';src:url('${a.fraunces}') format('woff2');font-weight:100 900;font-style:normal;font-display:block;}
@font-face{font-family:'Fraunces';src:url('${a.frauncesI}') format('woff2');font-weight:100 900;font-style:italic;font-display:block;}
:root{--navy-950:#090b10;--navy-900:#0f1218;--gold-300:#f2d489;--gold-400:#e8c15f;--gold-500:#d9a93a;--gold-600:#a8842a;--cream:#f4f2ec;}
*{margin:0;box-sizing:border-box;}
html,body{width:${f.w}px;height:${f.h}px;}
body{font-family:'Inter',system-ui,sans-serif;background:var(--navy-900);color:var(--cream);overflow:hidden;position:relative;
  -webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;font-feature-settings:"kern" 1,"liga" 1;font-kerning:normal;}
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
/* Kontaktschatten unter den Füßen – erdet die Figur */
.shadow{position:absolute;z-index:0;pointer-events:none;height:${isStory ? 66 : 54}px;border-radius:50%;
  background:radial-gradient(50% 50% at 50% 50%,rgba(9,11,16,.62),rgba(9,11,16,.28) 55%,transparent 78%);filter:blur(3px);}
.figure{position:absolute;z-index:1;filter:drop-shadow(0 20px 46px rgba(9,11,16,.5));}
.figure img{width:100%;height:100%;object-fit:contain;object-position:center bottom;display:block;}
/* Einheitliche Warm-Tonung übers Gesamtbild – „wie aus einem Guss" */
.grade{position:absolute;inset:0;z-index:2;pointer-events:none;mix-blend-mode:soft-light;opacity:.26;
  background:linear-gradient(150deg,color-mix(in oklab,var(--gold-400) 60%,transparent) 0%,transparent 42%,color-mix(in oklab,#12203a 70%,transparent) 100%);}
.grade2{position:absolute;inset:0;z-index:2;pointer-events:none;mix-blend-mode:multiply;opacity:.14;
  background:radial-gradient(120% 80% at 50% 30%,transparent 55%,rgba(9,11,16,.9) 100%);}
.grain{position:absolute;inset:0;z-index:5;pointer-events:none;opacity:.055;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");}
/* Fortschritts-Punkte */
.dots{position:absolute;z-index:6;top:${f.dotsTop}px;left:50%;transform:translateX(-50%);display:flex;gap:${isStory ? 12 : 10}px;}
.dots i{width:${isStory ? 9 : 8}px;height:${isStory ? 9 : 8}px;border-radius:50%;background:rgba(244,242,236,.32);}
.dots i.on{background:linear-gradient(120deg,var(--gold-300),var(--gold-500));box-shadow:0 0 10px rgba(217,169,58,.6);}
/* Serien-Kicker */
.kicker{position:absolute;z-index:6;top:${f.kickerTop}px;left:50%;transform:translateX(-50%);
  font-family:'Fraunces',serif;font-weight:500;text-transform:uppercase;letter-spacing:.26em;
  font-size:${isStory ? 20 : 18}px;color:transparent;background:linear-gradient(100deg,var(--gold-300),var(--gold-500));
  -webkit-background-clip:text;background-clip:text;white-space:nowrap;}
.content{position:absolute;z-index:4;top:${f.textTop}px;left:50%;transform:translateX(-50%);width:${f.maxw}px;text-align:center;}
h1{margin:0;font-size:${f.font}px;line-height:1.13;font-weight:500;letter-spacing:-.5px;color:var(--cream);text-shadow:0 2px 34px rgba(9,11,16,.74);}
h1 em{font-family:'Fraunces',serif;font-style:italic;font-weight:500;font-size:1.34em;line-height:1;letter-spacing:-.01em;
  color:transparent;background:linear-gradient(120deg,#f2d489,#d9a93a);-webkit-background-clip:text;background-clip:text;
  -webkit-text-stroke:1.6px rgba(9,11,16,.92);paint-order:stroke fill;}
.rule{margin:${f.ruleTop}px auto 0;width:68px;height:4px;border-radius:2px;background:linear-gradient(90deg,var(--gold-400),var(--gold-500));box-shadow:0 0 16px rgba(217,169,58,.5);}
.cta{margin:${Math.round(f.ruleTop * 0.9)}px auto 0;display:inline-block;padding:${isStory ? "14px 28px" : "12px 24px"};border-radius:999px;
  font-size:${isStory ? 26 : 23}px;font-weight:600;letter-spacing:.02em;color:var(--navy-950);
  background:linear-gradient(120deg,var(--gold-300),var(--gold-500));box-shadow:0 6px 24px -6px rgba(217,169,58,.6);}
/* Scrim hinter dem Logo – hält es auch über hellen Strahlen lesbar */
.brand-scrim{position:absolute;z-index:5;left:50%;bottom:${f.logoBottom - (isStory ? 46 : 40)}px;transform:translateX(-50%);
  width:${isStory ? 640 : 560}px;height:${isStory ? 200 : 170}px;pointer-events:none;
  background:radial-gradient(50% 50% at 50% 50%,rgba(9,11,16,.74),rgba(9,11,16,.32) 55%,transparent 78%);filter:blur(6px);}
.brand{position:absolute;bottom:${f.logoBottom}px;left:50%;transform:translateX(-50%);z-index:6;display:inline-flex;align-items:center;gap:15px;filter:drop-shadow(0 2px 20px rgba(9,11,16,.78));}
.brand img{height:${isStory ? 62 : 58}px;width:auto;display:block;filter:drop-shadow(0 0 18px rgba(217,169,58,.28));}
.brand .wm{display:flex;flex-direction:column;gap:6px;line-height:1;color:var(--cream);}
.brand .l1{font-family:'Fraunces',serif;font-weight:400;text-transform:uppercase;letter-spacing:.1em;font-size:${isStory ? 24 : 22}px;line-height:1;}
.brand .l1 em{font-style:normal;color:transparent;background:linear-gradient(100deg,var(--gold-300),var(--gold-500));-webkit-background-clip:text;background-clip:text;}
.brand .l2{display:flex;align-items:center;gap:8px;}
.brand .l2 .ln{height:1px;width:13px;background:rgba(242,212,137,.85);}
.brand .l2 .t{font-family:'Fraunces',serif;font-weight:400;text-transform:uppercase;letter-spacing:.24em;font-size:${isStory ? 11.5 : 11}px;line-height:1;}
/* Cover-Karte */
.cover{position:absolute;z-index:4;left:50%;top:50%;transform:translate(-50%,-50%);width:${Math.round(f.w * 0.84)}px;text-align:center;}
.cover .eyebrow{font-family:'Fraunces',serif;text-transform:uppercase;letter-spacing:.32em;font-size:${isStory ? 22 : 20}px;font-weight:500;
  color:transparent;background:linear-gradient(100deg,var(--gold-300),var(--gold-500));-webkit-background-clip:text;background-clip:text;}
.cover h2{margin:${isStory ? 26 : 20}px 0 0;font-family:'Fraunces',serif;font-weight:500;font-size:${isStory ? 96 : 82}px;line-height:1.04;letter-spacing:-.01em;color:var(--cream);text-shadow:0 2px 40px rgba(9,11,16,.8);}
.cover h2 em{font-style:italic;color:transparent;background:linear-gradient(120deg,#f2d489,#d9a93a);-webkit-background-clip:text;background-clip:text;}
.cover .sub{margin:${isStory ? 26 : 20}px auto 0;max-width:${isStory ? 760 : 720}px;font-size:${isStory ? 34 : 30}px;line-height:1.35;color:rgba(244,242,236,.9);}
.cover .cvrule{margin:${isStory ? 34 : 26}px auto 0;width:90px;height:4px;border-radius:2px;background:linear-gradient(90deg,var(--gold-400),var(--gold-500));box-shadow:0 0 16px rgba(217,169,58,.5);}
</style>`;
}

function brandBlock() {
  return `<div class="brand-scrim"></div>
  <div class="brand"><img src="${a.logo}" alt="Werde Meister deiner Gedanken">
    <div class="wm"><div class="l1">Werde <em>Meister</em></div>
      <div class="l2"><span class="ln"></span><span class="t">Deiner Gedanken</span><span class="ln"></span></div></div></div>`;
}

function dotsBlock(index, total) {
  if (!total || total < 2) return "";
  let s = "";
  for (let i = 0; i < total; i++) s += `<i class="${i < index ? "on" : ""}"></i>`;
  return `<div class="dots">${s}</div>`;
}

function motifPage(fmtKey, cfg, item, i, bg) {
  const f0 = FMT[fmtKey];
  const f = Object.assign({}, f0, { font: item.font || f0.font, textTop: item.textTop != null ? item.textTop : f0.textTop });
  const isStory = fmtKey === "9x16";
  const poseObj = cfg.poses[item.pose];
  const targetH = Math.round(f.targetH * (item.scale || 1));
  const foot = f.footY - (item.lift || 0);
  const p = place(poseObj, targetH, f.w / 2, foot);
  const shadowW = Math.round((poseObj.bb.maxx - poseObj.bb.minx) * (targetH / (poseObj.bb.maxy - poseObj.bb.miny)) * 0.92);
  const kicker = cfg.tag ? `<div class="kicker">${cfg.tag}</div>` : "";
  const dots = dotsBlock(i + 1, cfg.items.length);
  const cta = item.cta ? `<div class="cta">${item.cta}</div>` : "";
  return `<!doctype html><html lang="de"><head><meta charset="utf-8">${styleHead(f, isStory)}</head><body><div class="stage">
  <div class="backdrop"><img src="${bg}" alt=""></div>
  <div class="veil-t"></div><div class="veil-b"></div><div class="glow"></div>
  <div class="shadow" style="left:${p.footCenterX - Math.round(shadowW / 2)}px;top:${foot - (isStory ? 40 : 32)}px;width:${shadowW}px;"></div>
  <div class="figure" style="left:${p.left}px;top:${p.top}px;width:${p.dispW}px;height:${p.dispH}px;"><img src="${a.posen[item.pose]}" alt="Heiko Schwaninger"></div>
  <div class="grade"></div><div class="grade2"></div>
  ${kicker}${dots}
  <div class="content"><h1>${item.q}</h1><div class="rule"></div>${cta}</div>
  ${brandBlock()}
  <div class="grain"></div>
</div></body></html>`;
}

function coverPage(fmtKey, cfg, bg) {
  const f = FMT[fmtKey];
  const isStory = fmtKey === "9x16";
  const sub = cfg.coverSubtitle ? `<div class="sub">${cfg.coverSubtitle}</div>` : "";
  return `<!doctype html><html lang="de"><head><meta charset="utf-8">${styleHead(f, isStory)}</head><body><div class="stage">
  <div class="backdrop"><img src="${bg}" alt=""></div>
  <div class="veil-t" style="height:100%;background:linear-gradient(to bottom,color-mix(in oklab,var(--navy-950) 82%,transparent),color-mix(in oklab,var(--navy-950) 66%,transparent) 50%,color-mix(in oklab,var(--navy-950) 84%,transparent));"></div>
  <div class="glow"></div><div class="grade"></div>
  <div class="cover">
    <div class="eyebrow">${cfg.coverEyebrow || "Werde Meister deiner Gedanken"}</div>
    <h2>${cfg.coverTitle || cfg.tag}</h2>
    <div class="cvrule"></div>
    ${sub}
  </div>
  ${brandBlock()}
  <div class="grain"></div>
</div></body></html>`;
}

// cfg: { prefix, tag, coverTitle, coverEyebrow, coverSubtitle, coverBg?, poses, items:[{n?,key,pose,q,cta?,lift?,scale?}] }
function buildSeries(cfg) {
  fs.mkdirSync(BUILD, { recursive: true });
  const bd = a.backdrops;
  const formats = cfg.formats || ["4x5", "9x16"];
  cfg.items.forEach((item, i) => {
    const nn = String(item.n || i + 1).padStart(2, "0");
    const bg = bd[i % bd.length];
    formats.forEach((fmt) => {
      fs.writeFileSync(path.join(BUILD, `${cfg.prefix}-${nn}-${item.key}-${fmt}.html`), motifPage(fmt, cfg, item, i, bg));
    });
  });
  if ((cfg.coverTitle || cfg.tag) && !cfg.noCover) {
    const cbg = cfg.coverBg != null ? bd[cfg.coverBg % bd.length] : bd[0];
    formats.forEach((fmt) => {
      fs.writeFileSync(path.join(BUILD, `${cfg.prefix}-00-cover-${fmt}.html`), coverPage(fmt, cfg, cbg));
    });
  }
  return cfg.items.length;
}

module.exports = { buildSeries, FMT };
