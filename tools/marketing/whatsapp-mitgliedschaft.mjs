/**
 * WhatsApp-Verkaufsserie für den Mitgliederbereich.
 * ------------------------------------------------
 * Sieben gebrandete Bild-Folien in zwei Formaten – 4:5 (1080×1350) fürs
 * Teilen im Chat/Broadcast und 9:16 (1080×1920) für den WhatsApp-Status.
 * Sie verkaufen die Mitgliedschaft: Hook → Problem → Weg (7 Stufen) →
 * Inhalte → So funktioniert's → Preis → CTA.
 *
 *   node tools/marketing/whatsapp-mitgliedschaft.mjs
 *   Ausgabe: docs/marketing/whatsapp-mitgliedschaft/{4x5,9x16}/01.png … 07.png
 *
 * Gleiche Marken-Optik (Navy/Leaf/Teal, Fraunces/Inter, Gehirn-Logo) wie die
 * übrigen Marketing-Generatoren. Texte unten in SLIDES pflegen. Akzentwort in
 * <em>…</em>.
 */
import { writeFileSync, existsSync, readdirSync, mkdirSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const fonts = pathToFileURL(join(ROOT, "docs/reels/covers/_fonts.css")).href;
const brain = pathToFileURL(join(ROOT, "public/logo-brain-gold.png")).href;
const brainTeal = pathToFileURL(join(ROOT, "public/logo-brain-tuerkis.png")).href;
const OUT = join(ROOT, "docs/marketing/whatsapp-mitgliedschaft");

// Vier Farbwelten (Grund × Akzent). Suffixe parallel zu -hell.
const THEME_SUFFIX = { dunkel: "", hell: "-hell", tuerkis: "-tuerkis", "tuerkis-hell": "-tuerkis-hell" };
const THEMES = (process.env.THEME
  ? [process.env.THEME]
  : ["dunkel", "hell", "tuerkis", "tuerkis-hell"]).filter((t) => t in THEME_SUFFIX);
// Gold-Front-Emblem nur im Standard „dunkel"; sonst das bunte Seitenansicht-Gehirn.
const brainFor = (theme) => (theme === "dunkel" ? brain : brainTeal);

// Zwei Formate: 4:5 fürs Teilen im Chat/Broadcast (kein Crop), 9:16 für den
// WhatsApp-Status. padTop/padBottom halten Kopf- und Fußzeile aus den
// Status-Bedienleisten (oben Profil, unten Antwortfeld) heraus.
// pad = seitlicher Rand der Textspalte. Beim breiten 16:9 größer, damit die
// Zeilen nicht über die volle Breite laufen (zentrierte, ruhige Spalte).
const FORMATS = [
  { key: "4x5", w: 1080, h: 1350, padTop: 60, padBottom: 56, pad: 72 },
  { key: "9x16", w: 1080, h: 1920, padTop: 150, padBottom: 150, pad: 72 },
  { key: "1x1", w: 1080, h: 1080, padTop: 60, padBottom: 56, pad: 72 },
  { key: "16x9", w: 1920, h: 1080, padTop: 60, padBottom: 56, pad: 380 },
];
const DOMAIN = "werdemeisterdeinergedanken.de";

// ===========================================================================
// INHALT. role: cover | statement | list | features | steps | price | cta
// ===========================================================================
const SLIDES = [
  {
    role: "cover",
    eyebrow: "Der Mitgliederbereich",
    head: `Vom <em>Autopilot</em><br>zur Meisterschaft`,
    sub: `Ein geführter Weg in 7 Stufen – mit Videos, Praxis und einem System, das mit dir wächst.`,
  },
  {
    role: "statement",
    lead: `Dein Leben läuft.<br>Nur <em>ohne dich</em>.`,
    body: `Alte Muster steuern im Hintergrund – Tag für Tag. Der erste Schritt zurück zu dir ist nicht Kontrolle. Es ist <em>Bemerken</em>.`,
  },
  {
    role: "list",
    kicker: "Der Weg",
    lead: `Sieben Stufen.<br>Ein <em>klarer</em> Weg.`,
    items: [
      "Autopilot – du wirst gelebt",
      "Erwachen – du bemerkst es",
      "Selbstbeobachtung – du siehst dir zu",
      "Emotionale Reifung – du lässt los",
      "Schöpferkraft – du erschaffst bewusst",
      "Innere Ausrichtung – Kopf, Herz & Handeln",
      "Meisterschaft – du gestaltest",
    ],
  },
  {
    role: "features",
    kicker: "Was du bekommst",
    lead: `Alles an <em>einem</em> Ort`,
    items: [
      ["Geführte Videos", "Zu jeder Stufe ein ruhiger Impuls zum Mitgehen."],
      ["15 Praxis-Übungen", "Atem, Meditationen & Rituale für den Alltag."],
      ["31 Vertiefungen", "Das Wissen hinter der Veränderung."],
      ["Bewusstseinstest & Kurve", "Finde deinen Start – und sieh dein Wachstum."],
      ["Dein Journal", "Alle Reflexionen an einem Ort."],
      ["Arbeitshefte & PDFs", "Zum Ausdrucken und Vertiefen."],
    ],
  },
  {
    role: "steps",
    kicker: "So funktioniert's",
    lead: `In deinem <em>Tempo</em>`,
    items: [
      ["Bewusstseinstest machen", "In wenigen Minuten siehst du, wo du stehst."],
      ["Deiner Stufe folgen", "Geführt, ohne Druck, ganz in deinem Tempo."],
      ["Dranbleiben & wachsen", "Journal und Kurve halten dich sanft auf Kurs."],
    ],
  },
  {
    role: "price",
    kicker: "Deine Mitgliedschaft",
    lead: `Ein <em>Ja</em> zu dir`,
    plans: [
      { label: "Monatlich", price: "49 €", per: "/ Monat", note: "Monatlich kündbar" },
      { label: "Jährlich", price: "490 €", per: "/ Jahr", note: "2 Monate gratis · ≈ 40,83 €/Monat", best: true },
    ],
  },
  {
    role: "cta",
    kicker: "Dein nächster Schritt",
    lead: `Du bist nicht kaputt.<br>Du läufst nur auf einem <em>alten Programm</em>.`,
    action: `Starte heute deinen Weg.`,
    url: DOMAIN + "/mitgliedschaft",
  },
];

// ===========================================================================
// Stil
// ===========================================================================
// theme: "dunkel" (Gold) · "hell" (Creme) · "tuerkis" (Teal auf Navy).
// Gefüllte Chips (Nummern, Badge, CTA-Button) sind je Theme gold bzw. teal.
const cssFor = (F, theme) => {
  const hell = theme === "hell" || theme === "tuerkis-hell";
  const teal = theme === "tuerkis" || theme === "tuerkis-hell";
  const glowRGB = teal ? "52,196,196" : "233,193,95";
  const eyebrowCol = teal ? (hell ? "#0f766e" : "#5fd6d2") : (hell ? "#7e6410" : "#f2d489");
  const pagenoCol = teal ? (hell ? "#0f766e" : "#5fd6d2") : (hell ? "#7e6410" : "rgba(242,212,137,.9)");
  const accentGrad = teal
    ? (hell ? "linear-gradient(100deg,#8cc63f,#0f766e)" : "linear-gradient(100deg,#a3d64f,#21b2bd)")
    : (hell ? "linear-gradient(100deg,#d9a93a,#7e6410)" : "linear-gradient(100deg,#f2d489,#d9a93a)");
  const chipGrad = teal ? "linear-gradient(120deg,#5fd6d2,#199aa8)" : "linear-gradient(120deg,#f2d489,#d9a93a)";
  const ctaBorder = teal
    ? (hell ? "linear-gradient(120deg,#8cc63f,#0f766e)" : "linear-gradient(120deg,#a3d64f,#21b2bd)")
    : (hell ? "linear-gradient(120deg,#d9a93a,#7e6410)" : "linear-gradient(120deg,#f2d489,#d9a93a)");
  const fcheckBg = teal ? (hell ? "rgba(15,118,110,.14)" : "rgba(52,196,196,.16)") : (hell ? "rgba(217,169,58,.16)" : "rgba(242,212,137,.16)");
  const fcheckBorder = teal ? (hell ? "rgba(15,118,110,.5)" : "rgba(95,214,210,.5)") : (hell ? "rgba(126,100,16,.45)" : "rgba(242,212,137,.5)");
  const bestBorder = teal ? (hell ? "rgba(15,118,110,.55)" : "rgba(52,196,196,.5)") : (hell ? "rgba(168,132,42,.6)" : "rgba(242,212,137,.55)");
  const bestBg = teal ? (hell ? "rgba(52,196,196,.12)" : "rgba(52,196,196,.10)") : (hell ? "rgba(232,193,95,.16)" : "rgba(242,212,137,.08)");
  const bgLayers = hell
    ? (teal ? `
 radial-gradient(78% 62% at 50% -10%, rgba(52,196,196,.20), transparent 62%),
 radial-gradient(58% 52% at 4% 108%, rgba(33,178,189,.12), transparent 60%),
 radial-gradient(40% 60% at 82% 6%, rgba(140,198,63,.12), transparent 60%),#f6f4ee` : `
 radial-gradient(78% 62% at 50% -10%, rgba(232,193,95,.26), transparent 62%),
 radial-gradient(58% 52% at 4% 108%, rgba(217,169,58,.13), transparent 60%),
 radial-gradient(40% 60% at 82% 6%, rgba(242,212,137,.14), transparent 60%),#f6f4ee`)
    : teal ? `
 radial-gradient(52% 70% at 20% 12%, rgba(52,196,196,.28), transparent 60%),
 radial-gradient(48% 72% at 92% 92%, rgba(33,178,189,.20), transparent 60%),
 radial-gradient(40% 60% at 78% 20%, rgba(140,198,63,.12), transparent 60%),#090b10` : `
 radial-gradient(52% 70% at 20% 12%, rgba(233,193,95,.28), transparent 60%),
 radial-gradient(48% 72% at 92% 92%, rgba(168,132,42,.20), transparent 60%),
 radial-gradient(40% 60% at 78% 20%, rgba(242,212,137,.12), transparent 60%),#090b10`;
  return `
*{margin:0;padding:0;box-sizing:border-box}
body{width:${F.w}px;height:${F.h}px;overflow:hidden;font-family:Inter,sans-serif;position:relative;background:${hell ? "#f6f4ee" : "#090b10"}}
.bg{position:absolute;inset:0;background:${bgLayers}}
.stars{display:${hell ? "none" : "block"};position:absolute;inset:0;background-image:
 radial-gradient(1.6px 1.6px at 22% 24%,rgba(255,255,255,.55),transparent),
 radial-gradient(1.4px 1.4px at 66% 16%,rgba(255,255,255,.4),transparent),
 radial-gradient(1.4px 1.4px at 84% 58%,rgba(180,210,255,.45),transparent),
 radial-gradient(1.2px 1.2px at 40% 72%,rgba(255,255,255,.35),transparent)}
.scrim{position:absolute;inset:0;z-index:4;background:${hell ? "linear-gradient(180deg, rgba(246,244,238,.72) 0%, rgba(246,244,238,.55) 32%, rgba(246,244,238,.55) 66%, rgba(246,244,238,.85) 100%)" : "linear-gradient(180deg, rgba(5,9,20,.72) 0%, rgba(5,9,20,.55) 32%, rgba(5,9,20,.55) 66%, rgba(5,9,20,.82) 100%)"}}
.brainmini{position:absolute;top:${F.padTop}px;left:64px;width:80px;z-index:6;filter:drop-shadow(0 6px 30px rgba(${glowRGB},.5))}
.pageno{position:absolute;top:${F.padTop + 14}px;right:64px;font-size:22px;font-weight:700;letter-spacing:2px;color:${pagenoCol};z-index:6}
em{background:${accentGrad};-webkit-background-clip:text;background-clip:text;color:transparent;font-style:italic}
.wrap{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 ${F.pad}px;z-index:5}
.tick{width:66px;height:6px;border-radius:4px;background:${accentGrad};margin-bottom:28px}
.kicker{font-size:22px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${eyebrowCol};margin-bottom:20px}
.lead{font-family:Fraunces,serif;font-weight:600;color:${hell ? "#16231f" : "#f4f2ec"};font-size:62px;line-height:1.06;letter-spacing:-.4px}
.sub{margin-top:28px;font-size:34px;line-height:1.34;color:${hell ? "rgba(22,35,31,.8)" : "rgba(244,242,236,.82)"}}
.body{margin-top:26px;font-size:36px;line-height:1.36;color:${hell ? "rgba(22,35,31,.8)" : "rgba(244,242,236,.82)"}}
/* Cover */
.cover-eb{font-size:24px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${eyebrowCol};margin-bottom:26px}
.cover-h{font-family:Fraunces,serif;font-weight:600;color:${hell ? "#16231f" : "#f4f2ec"};font-size:86px;line-height:1.03;letter-spacing:-.6px}
.brainbig{width:150px;margin-bottom:44px;filter:drop-shadow(0 10px 40px rgba(${glowRGB},.55))}
/* Liste 7 Stufen */
.rows{margin-top:40px;display:flex;flex-direction:column;gap:16px}
.row{display:flex;align-items:center;gap:22px}
.num{flex:none;width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;
 font-family:Fraunces,serif;font-size:26px;font-weight:600;color:#090b10;background:${chipGrad}}
.rowtext{font-size:29px;line-height:1.2;color:${hell ? "rgba(22,35,31,.9)" : "rgba(244,242,236,.9)"}}
/* Features */
.feat{margin-top:40px;display:flex;flex-direction:column;gap:22px}
.fitem{display:flex;gap:20px;align-items:flex-start}
.fcheck{flex:none;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;
 background:${fcheckBg};border:2px solid ${fcheckBorder}}
.fcheck svg{width:22px;height:22px}
.ftext .ft{font-size:30px;font-weight:700;color:${hell ? "#16231f" : "#f4f2ec"};line-height:1.2}
.ftext .fd{margin-top:4px;font-size:25px;line-height:1.28;color:${hell ? "rgba(22,35,31,.66)" : "rgba(244,242,236,.72)"}}
/* Steps */
.steps{margin-top:44px;display:flex;flex-direction:column;gap:30px}
.step{display:flex;gap:26px;align-items:flex-start}
.stepnum{flex:none;width:64px;height:64px;border-radius:18px;display:flex;align-items:center;justify-content:center;
 font-family:Fraunces,serif;font-size:32px;font-weight:600;color:#090b10;background:${chipGrad}}
.steptext .st{font-size:33px;font-weight:700;color:${hell ? "#16231f" : "#f4f2ec"};line-height:1.2}
.steptext .sd{margin-top:6px;font-size:27px;line-height:1.3;color:${hell ? "rgba(22,35,31,.7)" : "rgba(244,242,236,.75)"}}
/* Price */
.plans{margin-top:44px;display:flex;flex-direction:column;gap:22px}
.plan{position:relative;border-radius:22px;padding:30px 34px;background:${hell ? "rgba(22,35,31,.03)" : "rgba(255,255,255,.04)"};border:1.5px solid ${hell ? "rgba(22,35,31,.14)" : "rgba(255,255,255,.12)"}}
.plan.best{border-color:${bestBorder};background:${bestBg}}
.plan .pl{font-size:24px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${hell ? "rgba(22,35,31,.66)" : "rgba(244,242,236,.7)"}}
.plan .pp{margin-top:8px;font-family:Fraunces,serif;font-weight:600;color:${hell ? "#16231f" : "#f4f2ec"};font-size:58px;line-height:1}
.plan .pp span{font-family:Inter,sans-serif;font-size:28px;font-weight:600;color:${hell ? "rgba(22,35,31,.6)" : "rgba(244,242,236,.65)"}}
.plan .pn{margin-top:10px;font-size:25px;color:${hell ? "rgba(22,35,31,.66)" : "rgba(244,242,236,.72)"}}
.badge{position:absolute;top:26px;right:30px;font-size:20px;font-weight:700;letter-spacing:1px;text-transform:uppercase;
 color:#090b10;background:${chipGrad};padding:7px 16px;border-radius:999px}
/* CTA */
.cta-action{margin-top:30px;padding-left:24px;border-left:6px solid;border-image:${ctaBorder} 1;font-size:36px;line-height:1.35;color:${hell ? "#16231f" : "#f4f2ec"};font-weight:600}
.cta-url{margin-top:40px;display:inline-flex;align-items:center;gap:14px;align-self:flex-start;
 font-size:30px;font-weight:700;color:#090b10;background:${chipGrad};padding:20px 34px;border-radius:16px}
/* Footer */
.foot{position:absolute;left:64px;right:64px;bottom:${F.padBottom}px;display:flex;justify-content:space-between;align-items:center;z-index:6}
.foot .h{font-size:22px;font-weight:700;color:${hell ? "rgba(22,35,31,.6)" : "rgba(244,242,236,.6)"}}
.dots{display:flex;gap:8px}.dot{width:9px;height:9px;border-radius:50%;background:${hell ? "rgba(22,35,31,.2)" : "rgba(244,242,236,.25)"}}
.dot.on{background:${accentGrad}}
.foot .c{font-size:22px;font-weight:700;color:${hell ? "rgba(22,35,31,.6)" : "rgba(244,242,236,.6)"}}`;
};

const CHECK = (theme) => {
  const hell = theme === "hell" || theme === "tuerkis-hell";
  const teal = theme === "tuerkis" || theme === "tuerkis-hell";
  const stroke = teal ? (hell ? "#0f766e" : "#5fd6d2") : (hell ? "#7e6410" : "#f2d489");
  return `<svg viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;
};

const dots = (i, total) =>
  `<div class="dots">${Array.from({ length: total }, (_, k) => `<span class="dot ${k === i ? "on" : ""}"></span>`).join("")}</div>`;

function inner(s, theme) {
  switch (s.role) {
    case "cover":
      return `<div class="wrap"><img class="brainbig" src="${brainFor(theme)}"><div class="cover-eb">${s.eyebrow}</div><div class="cover-h">${s.head}</div><div class="sub">${s.sub}</div></div>`;
    case "statement":
      return `<div class="wrap"><div class="tick"></div><div class="lead">${s.lead}</div><div class="body">${s.body}</div></div>`;
    case "list":
      return `<div class="wrap"><div class="tick"></div><div class="kicker">${s.kicker}</div><div class="lead">${s.lead}</div>
        <div class="rows">${s.items.map((t, k) => `<div class="row"><div class="num">${k + 1}</div><div class="rowtext">${t}</div></div>`).join("")}</div></div>`;
    case "features":
      return `<div class="wrap"><div class="tick"></div><div class="kicker">${s.kicker}</div><div class="lead">${s.lead}</div>
        <div class="feat">${s.items.map(([t, d]) => `<div class="fitem"><div class="fcheck">${CHECK(theme)}</div><div class="ftext"><div class="ft">${t}</div><div class="fd">${d}</div></div></div>`).join("")}</div></div>`;
    case "steps":
      return `<div class="wrap"><div class="tick"></div><div class="kicker">${s.kicker}</div><div class="lead">${s.lead}</div>
        <div class="steps">${s.items.map(([t, d], k) => `<div class="step"><div class="stepnum">${k + 1}</div><div class="steptext"><div class="st">${t}</div><div class="sd">${d}</div></div></div>`).join("")}</div></div>`;
    case "price":
      return `<div class="wrap"><div class="tick"></div><div class="kicker">${s.kicker}</div><div class="lead">${s.lead}</div>
        <div class="plans">${s.plans.map((p) => `<div class="plan${p.best ? " best" : ""}">${p.best ? `<div class="badge">Beliebt</div>` : ""}<div class="pl">${p.label}</div><div class="pp">${p.price} <span>${p.per}</span></div><div class="pn">${p.note}</div></div>`).join("")}</div></div>`;
    case "cta":
      return `<div class="wrap"><div class="tick"></div><div class="kicker">${s.kicker}</div><div class="lead">${s.lead}</div><div class="cta-action">${s.action}</div><div class="cta-url">${s.url} →</div></div>`;
    default:
      return "";
  }
}

function docFor(F, s, i, total, overlay = false, theme = "dunkel") {
  const foot = `<div class="foot"><span class="h">${DOMAIN}</span>${dots(i, total)}<span class="c">${i + 1}/${total}</span></div>`;
  // Cover trägt das große Logo im Textblock – kein zweites Mini-Logo oben.
  const pageno = i === 0 ? "" : `<div class="pageno">${String(i + 1).padStart(2, "0")}</div>`;
  const brainmini = i === 0 ? "" : `<img class="brainmini" src="${brainFor(theme)}">`;
  // Overlay-Modus für Canva: transparenter Hintergrund (eigenes Foto darunter),
  // nur ein weicher Scrim hält den Text auf jedem Bild lesbar.
  const layers = overlay
    ? `<div class="scrim"></div>`
    : `<div class="bg"></div><div class="stars"></div>`;
  const bodyStyle = overlay ? ` style="background:transparent"` : "";
  return `<!doctype html><html><head><meta charset="utf8"><link rel="stylesheet" href="${fonts}">
<style>${cssFor(F, theme)}</style></head><body${bodyStyle}>${layers}
${brainmini}${pageno}${inner(s, theme)}${foot}</body></html>`;
}

// ===========================================================================
// Rendern (HTML → Chromium → PNG)
// ===========================================================================
const require = createRequire(import.meta.url);
function findChrome() {
  if (process.env.CHROME_BIN && existsSync(process.env.CHROME_BIN)) return process.env.CHROME_BIN;
  try { const p = require("playwright").chromium.executablePath(); if (p && existsSync(p)) return p; } catch {}
  for (const r of [process.env.PLAYWRIGHT_BROWSERS_PATH, "/opt/pw-browsers"].filter(Boolean)) {
    try { for (const d of readdirSync(r)) { if (d.startsWith("chromium")) { const p = join(r, d, "chrome-linux/chrome"); if (existsSync(p)) return p; } } } catch {}
  }
  throw new Error("Kein Chromium gefunden.");
}
const { chromium } = require("playwright");
if (existsSync(OUT)) rmSync(OUT, { recursive: true, force: true });
const browser = await chromium.launch({ executablePath: findChrome() });
const total = SLIDES.length;
for (const F of FORMATS) {
  const dir = join(OUT, F.key);
  const overlayDir = join(dir, "overlay");
  mkdirSync(dir, { recursive: true });
  mkdirSync(overlayDir, { recursive: true });
  // Marken-Hintergrund (Ebene 1 in Canva) – nur bg + Sterne; je Farbwelt einer.
  // Stapel in Canva: _hintergrund.png → (eigenes Foto) → overlay/NN.png.
  for (const theme of THEMES) {
    const sfx = THEME_SUFFIX[theme];
    const pg = await browser.newPage({ viewport: { width: F.w, height: F.h }, deviceScaleFactor: 2 });
    const tmp = join(HERE, `.wbg-${F.key}${sfx}.html`);
    writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf8"><style>${cssFor(F, theme)}</style></head><body><div class="bg"></div><div class="stars"></div></body></html>`);
    await pg.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
    await pg.screenshot({ path: join(overlayDir, `_hintergrund${sfx}.png`) });
    await pg.close();
    rmSync(tmp, { force: true });
  }
  for (let i = 0; i < SLIDES.length; i++) {
    // Je Folie eine Variante pro Farbwelt (dunkel/hell/türkis).
    for (const theme of THEMES) {
      const suffix = THEME_SUFFIX[theme];
      const name = `${String(i + 1).padStart(2, "0")}${suffix}.png`;
      // 1) Fertige Folie mit Marken-Hintergrund.
      {
        const pg = await browser.newPage({ viewport: { width: F.w, height: F.h }, deviceScaleFactor: 2 });
        const tmp = join(HERE, `.wa-${F.key}-${i}${suffix}.html`);
        writeFileSync(tmp, docFor(F, SLIDES[i], i, total, false, theme));
        await pg.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
        await pg.screenshot({ path: join(dir, name) });
        await pg.close();
        rmSync(tmp, { force: true });
      }
      // 2) Transparentes Overlay für Canva (Foto kommt in Canva darunter).
      {
        const pg = await browser.newPage({ viewport: { width: F.w, height: F.h }, deviceScaleFactor: 2 });
        const tmp = join(HERE, `.wo-${F.key}-${i}${suffix}.html`);
        writeFileSync(tmp, docFor(F, SLIDES[i], i, total, true, theme));
        await pg.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
        await pg.screenshot({ path: join(overlayDir, name), omitBackground: true });
        await pg.close();
        rmSync(tmp, { force: true });
      }
    }
  }
  console.log("✓", F.key, `(${total} Folien + ${total} Overlays) ×${THEMES.length}`);
}
await browser.close();
console.log("\nFertig → docs/marketing/whatsapp-mitgliedschaft/{4x5,9x16,1x1,16x9}/(overlay/)");
