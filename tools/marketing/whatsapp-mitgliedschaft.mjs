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
const brain = pathToFileURL(join(ROOT, "public/logo-brain-frei.png")).href;
const OUT = join(ROOT, "docs/marketing/whatsapp-mitgliedschaft");

// Zwei Formate: 4:5 fürs Teilen im Chat/Broadcast (kein Crop), 9:16 für den
// WhatsApp-Status. padTop/padBottom halten Kopf- und Fußzeile aus den
// Status-Bedienleisten (oben Profil, unten Antwortfeld) heraus.
const FORMATS = [
  { key: "4x5", w: 1080, h: 1350, padTop: 60, padBottom: 56 },
  { key: "9x16", w: 1080, h: 1920, padTop: 150, padBottom: 150 },
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
const cssFor = (F) => `
*{margin:0;padding:0;box-sizing:border-box}
body{width:${F.w}px;height:${F.h}px;overflow:hidden;font-family:Inter,sans-serif;position:relative;background:#08102a}
.bg{position:absolute;inset:0;background:
 radial-gradient(52% 70% at 20% 12%, rgba(33,178,189,.28), transparent 60%),
 radial-gradient(48% 72% at 92% 92%, rgba(54,112,238,.20), transparent 60%),
 radial-gradient(40% 60% at 78% 20%, rgba(140,198,63,.12), transparent 60%),#08102a}
.stars{position:absolute;inset:0;background-image:
 radial-gradient(1.6px 1.6px at 22% 24%,rgba(255,255,255,.55),transparent),
 radial-gradient(1.4px 1.4px at 66% 16%,rgba(255,255,255,.4),transparent),
 radial-gradient(1.4px 1.4px at 84% 58%,rgba(180,210,255,.45),transparent),
 radial-gradient(1.2px 1.2px at 40% 72%,rgba(255,255,255,.35),transparent)}
.scrim{position:absolute;inset:0;z-index:4;background:linear-gradient(180deg,
 rgba(5,9,20,.72) 0%, rgba(5,9,20,.55) 32%, rgba(5,9,20,.55) 66%, rgba(5,9,20,.82) 100%)}
.brainmini{position:absolute;top:${F.padTop}px;left:64px;width:80px;z-index:6;filter:drop-shadow(0 6px 30px rgba(52,196,196,.5))}
.pageno{position:absolute;top:${F.padTop + 14}px;right:64px;font-size:22px;font-weight:700;letter-spacing:2px;color:rgba(163,214,79,.9);z-index:6}
em{background:linear-gradient(100deg,#a3d64f,#34c4c4);-webkit-background-clip:text;background-clip:text;color:transparent;font-style:italic}
.wrap{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 72px;z-index:5}
.tick{width:66px;height:6px;border-radius:4px;background:linear-gradient(100deg,#a3d64f,#34c4c4);margin-bottom:28px}
.kicker{font-size:22px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#a3d64f;margin-bottom:20px}
.lead{font-family:Fraunces,serif;font-weight:600;color:#f4f2ec;font-size:62px;line-height:1.06;letter-spacing:-.4px}
.sub{margin-top:28px;font-size:34px;line-height:1.34;color:rgba(244,242,236,.82)}
.body{margin-top:26px;font-size:36px;line-height:1.36;color:rgba(244,242,236,.82)}
/* Cover */
.cover-eb{font-size:24px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#a3d64f;margin-bottom:26px}
.cover-h{font-family:Fraunces,serif;font-weight:600;color:#f4f2ec;font-size:86px;line-height:1.03;letter-spacing:-.6px}
.brainbig{width:150px;margin-bottom:44px;filter:drop-shadow(0 10px 40px rgba(52,196,196,.55))}
/* Liste 7 Stufen */
.rows{margin-top:40px;display:flex;flex-direction:column;gap:16px}
.row{display:flex;align-items:center;gap:22px}
.num{flex:none;width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;
 font-family:Fraunces,serif;font-size:26px;font-weight:600;color:#08102a;background:linear-gradient(120deg,#a3d64f,#34c4c4)}
.rowtext{font-size:29px;line-height:1.2;color:rgba(244,242,236,.9)}
/* Features */
.feat{margin-top:40px;display:flex;flex-direction:column;gap:22px}
.fitem{display:flex;gap:20px;align-items:flex-start}
.fcheck{flex:none;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;
 background:rgba(140,198,63,.16);border:2px solid rgba(140,198,63,.5)}
.fcheck svg{width:22px;height:22px}
.ftext .ft{font-size:30px;font-weight:700;color:#f4f2ec;line-height:1.2}
.ftext .fd{margin-top:4px;font-size:25px;line-height:1.28;color:rgba(244,242,236,.72)}
/* Steps */
.steps{margin-top:44px;display:flex;flex-direction:column;gap:30px}
.step{display:flex;gap:26px;align-items:flex-start}
.stepnum{flex:none;width:64px;height:64px;border-radius:18px;display:flex;align-items:center;justify-content:center;
 font-family:Fraunces,serif;font-size:32px;font-weight:600;color:#08102a;background:linear-gradient(120deg,#a3d64f,#34c4c4)}
.steptext .st{font-size:33px;font-weight:700;color:#f4f2ec;line-height:1.2}
.steptext .sd{margin-top:6px;font-size:27px;line-height:1.3;color:rgba(244,242,236,.75)}
/* Price */
.plans{margin-top:44px;display:flex;flex-direction:column;gap:22px}
.plan{position:relative;border-radius:22px;padding:30px 34px;background:rgba(255,255,255,.04);border:1.5px solid rgba(255,255,255,.12)}
.plan.best{border-color:rgba(140,198,63,.55);background:rgba(140,198,63,.08)}
.plan .pl{font-size:24px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:rgba(244,242,236,.7)}
.plan .pp{margin-top:8px;font-family:Fraunces,serif;font-weight:600;color:#f4f2ec;font-size:58px;line-height:1}
.plan .pp span{font-family:Inter,sans-serif;font-size:28px;font-weight:600;color:rgba(244,242,236,.65)}
.plan .pn{margin-top:10px;font-size:25px;color:rgba(244,242,236,.72)}
.badge{position:absolute;top:26px;right:30px;font-size:20px;font-weight:700;letter-spacing:1px;text-transform:uppercase;
 color:#08102a;background:linear-gradient(120deg,#a3d64f,#34c4c4);padding:7px 16px;border-radius:999px}
/* CTA */
.cta-action{margin-top:30px;padding-left:24px;border-left:6px solid;border-image:linear-gradient(120deg,#8cc63f,#21b2bd) 1;font-size:36px;line-height:1.35;color:#f4f2ec;font-weight:600}
.cta-url{margin-top:40px;display:inline-flex;align-items:center;gap:14px;align-self:flex-start;
 font-size:30px;font-weight:700;color:#08102a;background:linear-gradient(120deg,#a3d64f,#34c4c4);padding:20px 34px;border-radius:16px}
/* Footer */
.foot{position:absolute;left:64px;right:64px;bottom:${F.padBottom}px;display:flex;justify-content:space-between;align-items:center;z-index:6}
.foot .h{font-size:22px;font-weight:700;color:rgba(244,242,236,.6)}
.dots{display:flex;gap:8px}.dot{width:9px;height:9px;border-radius:50%;background:rgba(244,242,236,.25)}
.dot.on{background:linear-gradient(100deg,#a3d64f,#34c4c4)}
.foot .c{font-size:22px;font-weight:700;color:rgba(244,242,236,.6)}`;

const CHECK = `<svg viewBox="0 0 24 24" fill="none" stroke="#a3d64f" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;

const dots = (i, total) =>
  `<div class="dots">${Array.from({ length: total }, (_, k) => `<span class="dot ${k === i ? "on" : ""}"></span>`).join("")}</div>`;

function inner(s) {
  switch (s.role) {
    case "cover":
      return `<div class="wrap"><img class="brainbig" src="${brain}"><div class="cover-eb">${s.eyebrow}</div><div class="cover-h">${s.head}</div><div class="sub">${s.sub}</div></div>`;
    case "statement":
      return `<div class="wrap"><div class="tick"></div><div class="lead">${s.lead}</div><div class="body">${s.body}</div></div>`;
    case "list":
      return `<div class="wrap"><div class="tick"></div><div class="kicker">${s.kicker}</div><div class="lead">${s.lead}</div>
        <div class="rows">${s.items.map((t, k) => `<div class="row"><div class="num">${k + 1}</div><div class="rowtext">${t}</div></div>`).join("")}</div></div>`;
    case "features":
      return `<div class="wrap"><div class="tick"></div><div class="kicker">${s.kicker}</div><div class="lead">${s.lead}</div>
        <div class="feat">${s.items.map(([t, d]) => `<div class="fitem"><div class="fcheck">${CHECK}</div><div class="ftext"><div class="ft">${t}</div><div class="fd">${d}</div></div></div>`).join("")}</div></div>`;
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

function docFor(F, s, i, total, overlay = false) {
  const foot = `<div class="foot"><span class="h">${DOMAIN}</span>${dots(i, total)}<span class="c">${i + 1}/${total}</span></div>`;
  // Cover trägt das große Logo im Textblock – kein zweites Mini-Logo oben.
  const pageno = i === 0 ? "" : `<div class="pageno">${String(i + 1).padStart(2, "0")}</div>`;
  const brainmini = i === 0 ? "" : `<img class="brainmini" src="${brain}">`;
  // Overlay-Modus für Canva: transparenter Hintergrund (eigenes Foto darunter),
  // nur ein weicher Scrim hält den Text auf jedem Bild lesbar.
  const layers = overlay
    ? `<div class="scrim"></div>`
    : `<div class="bg"></div><div class="stars"></div>`;
  const bodyStyle = overlay ? ` style="background:transparent"` : "";
  return `<!doctype html><html><head><meta charset="utf8"><link rel="stylesheet" href="${fonts}">
<style>${cssFor(F)}</style></head><body${bodyStyle}>${layers}
${brainmini}${pageno}${inner(s)}${foot}</body></html>`;
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
  for (let i = 0; i < SLIDES.length; i++) {
    const name = `${String(i + 1).padStart(2, "0")}.png`;
    // 1) Fertige Folie mit Marken-Hintergrund.
    {
      const pg = await browser.newPage({ viewport: { width: F.w, height: F.h }, deviceScaleFactor: 2 });
      const tmp = join(HERE, `.wa-${F.key}-${i}.html`);
      writeFileSync(tmp, docFor(F, SLIDES[i], i, total, false));
      await pg.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
      await pg.screenshot({ path: join(dir, name) });
      await pg.close();
      rmSync(tmp, { force: true });
    }
    // 2) Transparentes Overlay für Canva (Foto kommt in Canva darunter).
    {
      const pg = await browser.newPage({ viewport: { width: F.w, height: F.h }, deviceScaleFactor: 2 });
      const tmp = join(HERE, `.wo-${F.key}-${i}.html`);
      writeFileSync(tmp, docFor(F, SLIDES[i], i, total, true));
      await pg.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
      await pg.screenshot({ path: join(overlayDir, name), omitBackground: true });
      await pg.close();
      rmSync(tmp, { force: true });
    }
  }
  console.log("✓", F.key, `(${total} Folien + ${total} Overlays)`);
}
await browser.close();
console.log("\nFertig → docs/marketing/whatsapp-mitgliedschaft/{4x5,9x16}/(overlay/)");
