/**
 * Interaktive Instagram-Story „Auf welcher Seite stehst du?" (9:16).
 *
 * Anders als story-carousels.mjs (Feed-Carousel, 3 Formate) rendert dieses
 * Tool eine echte STORY-Sequenz: nur 9:16, Instagram-Safe-Zones (oben/unten
 * frei für Fortschrittsbalken und Antwortleiste) und ein freier Bereich für
 * den Sticker (Umfrage, Emoji-Slider, Fragen-Sticker), der in Instagram
 * selbst gesetzt wird.
 *
 *   npm run interaktive-story
 *   THEME=hell npm run interaktive-story      (nur eine Farbwelt)
 *
 *   Ausgabe: docs/marketing/interaktive-stories/<slug>/9x16/
 *     NN.png               Text-Frame mit Marken-Hintergrund (fertig)
 *     NN-overlay.png       transparentes Overlay – kommt ÜBER das Bild
 *     NN-vorschau.png      Overlay + Bild zusammen (nur wenn das Bild unter
 *                          story.bild existiert)
 *
 * role: text | overlay | bild.  sticker: "oben" | "unten" | null – wo im
 * Frame Platz für den Instagram-Sticker bleibt. Akzentwort mit <em>…</em>.
 * Das komplette Skript (Sprechtext, Sticker-Texte) steht in
 * docs/skripte/stories/auf-welcher-seite-stehst-du.md – Texte dort und hier
 * gemeinsam pflegen.
 */
import { execFileSync } from "node:child_process";
import { writeFileSync, existsSync, readdirSync, mkdirSync, rmSync, copyFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const fonts = pathToFileURL(join(ROOT, "docs/reels/covers/_fonts.css")).href;
const brain = pathToFileURL(join(ROOT, "public/logo-brain-gold.png")).href;
const brainTeal = pathToFileURL(join(ROOT, "public/logo-brain-tuerkis.png")).href;
const OUT = join(ROOT, "docs/marketing/interaktive-stories");
const F = { w: 1080, h: 1920 };

// Standard: dunkel + Creme. Türkis-Welten bei Bedarf per THEME=… nachrendern.
const THEME_SUFFIX = { dunkel: "", hell: "-hell", tuerkis: "-tuerkis", "tuerkis-hell": "-tuerkis-hell" };
const THEMES = (process.env.THEME ? [process.env.THEME] : ["dunkel", "hell"]).filter((t) => t in THEME_SUFFIX);

// ===========================================================================
// STORIES
// ===========================================================================
const STORIES = [
  {
    slug: "auf-welcher-seite-stehst-du",
    bild: "docs/marketing/_input/takt-rhythmus.jpeg", // Originalbild (relativ zum Repo) – für die Vorschau-Frames
    frames: [
      { role: "text", sticker: null, lead: `Schau dir dieses Bild mal <em>ganz genau</em> an.`, body: `Nicht nur kurz. Wirklich genau.` },
      { role: "bild" },
      { role: "overlay", sticker: "unten", lead: `Wohin wandert dein Blick <em>zuerst</em>?` },
      { role: "text", sticker: "unten", lead: `Und was löst dieses Bild in dir aus?`, body: `Freiheit? Sehnsucht? Druck?<br>Oder ein Gefühl, das du gerade gar nicht richtig beschreiben kannst?` },
      { role: "overlay", sticker: null, eyebrow: `Schau noch mal hin`, lead: `Hast du die <em>Herzlinie</em> gesehen?`, body: `Und den Mann ganz unten rechts?` },
      { role: "overlay", sticker: "unten", eyebrow: `Jetzt eine ganz andere Frage`, lead: `Auf welcher Seite siehst du <em>dich selbst</em>?` },
      { role: "text", sticker: null, lead: `Lebst du dein Leben in deinem <em>eigenen Rhythmus</em>?`, body: `Oder bist du längst Teil eines Systems geworden, in dem du jeden Tag einfach nur noch funktionierst?` },
      { role: "text", sticker: null, stakkato: [`Aufstehen.`, `Arbeiten.`, `Verpflichtungen erfüllen.`, `Schlafen.`], body: `Und am nächsten Morgen beginnt alles <em>wieder von vorne</em>.` },
      { role: "text", sticker: "unten", lead: `Oder stehst du genau <em>dazwischen</em>?`, body: `Du spürst, dass sich etwas verändern müsste. Aber irgendwie läuft trotzdem alles weiter wie bisher.` },
      { role: "text", sticker: null, eyebrow: `Die für mich entscheidende Frage`, lead: `Ist das Leben, das du gerade führst, das Leben, für das du dich <em>bewusst entschieden</em> hast?`, body: `Oder das Leben, an das du dich irgendwann einfach <em>gewöhnt</em> hast?` },
      { role: "overlay", sticker: null, lead: `Weißt du, was ich an diesem Bild so <em>faszinierend</em> finde?` },
      { role: "overlay", sticker: null, lead: `Wir schauen alle auf <em>dasselbe</em> Bild.`, body: `Aber wir sehen nicht zwangsläufig dasselbe.` },
      { role: "text", sticker: null, lead: `Jeder von uns sieht es durch seine eigenen <em>Erfahrungen</em>, Überzeugungen und Vorstellungen.`, body: `Der eine sieht rechts Struktur und Sicherheit.<br>Der andere einen Käfig.` },
      { role: "text", sticker: "unten", eyebrow: `Ich bin gespannt`, lead: `Was siehst <em>DU</em> in diesem Bild?` },
    ],
  },
];

const cssFor = (theme) => {
  const hell = theme === "hell" || theme === "tuerkis-hell";
  const teal = theme === "tuerkis" || theme === "tuerkis-hell";
  const eyebrowCol = teal ? (hell ? "#0f766e" : "#5fd6d2") : (hell ? "#7e6410" : "#f2d489");
  const glowRGB = teal ? "52,196,196" : "233,193,95";
  const accentGrad = teal
    ? (hell ? "linear-gradient(100deg,#8cc63f,#0f766e)" : "linear-gradient(100deg,#a3d64f,#21b2bd)")
    : (hell ? "linear-gradient(100deg,#d9a93a,#7e6410)" : "linear-gradient(100deg,#f2d489,#d9a93a)");
  const ink = hell ? "#16231f" : "#f4f2ec";
  const inkSoft = hell ? "rgba(22,35,31,.82)" : "rgba(244,242,236,.85)";
  const bg = hell
    ? `radial-gradient(78% 52% at 50% -6%, rgba(${glowRGB},.24), transparent 62%),
 radial-gradient(58% 42% at 4% 108%, rgba(${glowRGB},.12), transparent 60%),#f6f4ee`
    : `radial-gradient(60% 50% at 22% 12%, rgba(${glowRGB},.26), transparent 60%),
 radial-gradient(56% 50% at 92% 96%, rgba(${glowRGB},.16), transparent 60%),#090b10`;
  return `*{margin:0;box-sizing:border-box}
body{width:${F.w}px;height:${F.h}px;overflow:hidden;font-family:Inter,sans-serif;position:relative}
.bg{position:absolute;inset:0;background:${bg}}
.photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.stars{display:${hell ? "none" : "block"};position:absolute;inset:0;background-image:
 radial-gradient(1.5px 1.5px at 24% 26%,rgba(255,255,255,.55),transparent),
 radial-gradient(1.3px 1.3px at 66% 18%,rgba(255,255,255,.4),transparent),
 radial-gradient(1.3px 1.3px at 82% 60%,rgba(180,210,255,.45),transparent)}
.scrim{position:absolute;left:0;right:0;top:0;height:50%;background:linear-gradient(to bottom, rgba(5,9,20,.88) 0%, rgba(5,9,20,.66) 50%, transparent 100%)}
.brandlock{position:absolute;left:0;right:0;bottom:250px;display:flex;justify-content:center;align-items:center;gap:14px;z-index:6}
.brainmini{width:56px;filter:drop-shadow(0 6px 24px rgba(${glowRGB},.5))}
.wm{font-family:Fraunces,serif;font-size:24px;letter-spacing:.14em;text-transform:uppercase;color:VAR_INK;opacity:.8}
.wrap{position:absolute;left:84px;right:84px;z-index:5;display:flex;flex-direction:column}
.wrap.mitte{top:0;bottom:0;justify-content:center}
.wrap.oben{top:330px}
em{background:${accentGrad};-webkit-background-clip:text;background-clip:text;color:transparent;font-style:italic}
.tick{width:64px;height:6px;border-radius:4px;background:${accentGrad};margin-bottom:34px}
.eyebrow{font-size:26px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:VAR_EB;margin-bottom:26px}
.lead{font-family:Fraunces,serif;font-weight:600;color:VAR_INK;font-size:76px;line-height:1.08;letter-spacing:-.4px}
.body{margin-top:34px;font-size:42px;line-height:1.4;color:VAR_SOFT}
.stakkato{display:flex;flex-direction:column;gap:18px;font-family:Fraunces,serif;font-weight:600;font-size:80px;line-height:1.05;color:VAR_INK}
.stakkato span:nth-child(2){opacity:.82}.stakkato span:nth-child(3){opacity:.64}.stakkato span:nth-child(4){opacity:.46}`
    .replaceAll("VAR_INK", ink).replaceAll("VAR_SOFT", inkSoft).replaceAll("VAR_EB", eyebrowCol);
};

// Overlays liegen immer auf dem (dunklen, detailreichen) Bild → Schrift hell.
const overlayCss = () => cssFor("dunkel").replace(/\.wm\{[^}]*\}/, ".wm{font-family:Fraunces,serif;font-size:24px;letter-spacing:.14em;text-transform:uppercase;color:#f4f2ec;opacity:.85}");

function inner(fr) {
  // Mit Sticker → Text oben, unteres Drittel bleibt frei. Ohne → zentriert.
  // Overlays immer oben, damit das Bild darunter sichtbar bleibt.
  const pos = fr.role === "overlay" || fr.sticker ? "oben" : "mitte";
  const eb = fr.eyebrow ? `<div class="eyebrow">${fr.eyebrow}</div>` : "";
  const head = fr.stakkato
    ? `<div class="stakkato">${fr.stakkato.map((z) => `<span>${z}</span>`).join("")}</div>`
    : `<div class="lead">${fr.lead}</div>`;
  const body = fr.body ? `<div class="body">${fr.body}</div>` : "";
  return `<div class="wrap ${pos}"><div class="tick"></div>${eb}${head}${body}</div>`;
}

function doc(fr, theme, { photo } = {}) {
  const isOverlay = fr.role === "overlay";
  const brainImg = theme.startsWith("tuerkis") ? brainTeal : brain;
  const layers = isOverlay
    ? `${photo ? `<img class="photo" src="${photo}">` : ""}<div class="scrim"></div>`
    : `<div class="bg"></div><div class="stars"></div>`;
  // Kein Logo auf Frames mit Sticker unten (dort sitzt der Sticker) und
  // nicht auf Overlays (würde Bilddetails verdecken).
  const brand = fr.sticker === "unten" || isOverlay ? "" : `<div class="brandlock"><img class="brainmini" src="${brainImg}"><span class="wm">Werde Meister deiner Gedanken</span></div>`;
  return `<!doctype html><html><head><meta charset="utf8"><link rel="stylesheet" href="${fonts}">
<style>body{background:transparent}${isOverlay ? overlayCss() : cssFor(theme)}</style></head><body>
${layers}${inner(fr)}${brand}</body></html>`;
}

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
if (!process.env.THEME && existsSync(OUT)) rmSync(OUT, { recursive: true, force: true });
const browser = await chromium.launch({ executablePath: findChrome() });

async function shot(html, path, transparent) {
  const pg = await browser.newPage({ viewport: { width: F.w, height: F.h } });
  const tmp = join(HERE, `.is-${Date.now()}-${Math.random().toString(36).slice(2)}.html`);
  writeFileSync(tmp, html);
  await pg.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
  await pg.screenshot({ path, omitBackground: transparent });
  await pg.close(); rmSync(tmp, { force: true });
}

// Download-Paket: hochladen/ (fertige Frames in Story-Reihenfolge, dunkel),
// creme/ (Text-Frames in Creme), overlays/ (transparente Ebenen) + Skript.
function packZip(story, dir) {
  const stage = join(OUT, `.zip-${story.slug}`);
  rmSync(stage, { recursive: true, force: true });
  const files = readdirSync(dir);
  const put = (sub, name) => { mkdirSync(join(stage, sub), { recursive: true }); copyFileSync(join(dir, name), join(stage, sub, name)); };
  story.frames.forEach((fr, i) => {
    const nr = String(i + 1).padStart(2, "0");
    const pick = fr.role === "bild" ? `${nr}-bild-8s.mp4` : fr.role === "overlay" ? `${nr}-vorschau.png` : `${nr}.png`;
    if (files.includes(pick)) put("hochladen", pick);
  });
  files.filter((f) => /-hell\.png$/.test(f)).forEach((f) => put("creme", f));
  files.filter((f) => /-overlay\.png$/.test(f)).forEach((f) => put("overlays", f));
  const skript = join(ROOT, "docs/skripte/stories", `${story.slug}.md`);
  if (existsSync(skript)) copyFileSync(skript, join(stage, "skript.md"));
  const zip = join(OUT, `${story.slug}.zip`);
  rmSync(zip, { force: true });
  try { execFileSync("zip", ["-qr", zip, "."], { cwd: stage }); } catch { console.warn("! zip fehlt – kein Download-Paket"); }
  rmSync(stage, { recursive: true, force: true });
}

for (const story of STORIES) {
  const dir = join(OUT, story.slug, "9x16");
  mkdirSync(dir, { recursive: true });
  const bildPfad = join(ROOT, story.bild);
  const photo = existsSync(bildPfad) ? pathToFileURL(bildPfad).href : null;
  let n = 0;
  for (let i = 0; i < story.frames.length; i++) {
    const fr = story.frames[i];
    const nr = String(i + 1).padStart(2, "0");
    if (fr.role === "bild") {
      // Foto-Storys stehen nur 5 s – als 8-s-Video steht das Bild lange genug.
      if (photo) {
        try {
          execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-loop", "1", "-i", bildPfad, "-t", "8", "-r", "30",
            "-vf", `scale=${F.w}:${F.h}:force_original_aspect_ratio=increase,crop=${F.w}:${F.h}`,
            "-c:v", "libx264", "-pix_fmt", "yuv420p", join(dir, `${nr}-bild-8s.mp4`)]);
          n++;
        } catch { console.warn("! ffmpeg fehlt – Frame", nr, "ohne 8-s-Video"); }
      }
      continue;
    }
    if (fr.role === "overlay") {
      // Overlay ist farbwelt-unabhängig (liegt immer auf dem Bild).
      await shot(doc(fr, "dunkel"), join(dir, `${nr}-overlay.png`), true); n++;
      if (photo) { await shot(doc(fr, "dunkel", { photo }), join(dir, `${nr}-vorschau.png`), false); n++; }
      continue;
    }
    for (const theme of THEMES) {
      await shot(doc(fr, theme), join(dir, `${nr}${THEME_SUFFIX[theme]}.png`), false); n++;
    }
  }
  packZip(story, dir);
  console.log("✓", story.slug, `(${n} Dateien${photo ? ", mit Bild-Vorschau" : ", ohne Bild-Vorschau – Bild fehlt: " + story.bild})`);
}
await browser.close();
