/**
 * Baut die Vorlagen-Galerie fürs Admin-Dashboard (/admin/vorlagen).
 * ------------------------------------------------------------------
 * Die fertigen Vorlagen liegen in `docs/` – dieser Ordner wird aber NICHT mit
 * der Website veröffentlicht. Damit du die Vorlagen im Dashboard sehen und
 * herunterladen kannst, kopiert dieses Skript die fertigen Dateien nach
 * `content/vorlagen/` und erzeugt dabei:
 *
 * ACHTUNG: Zielordner ist `content/`, NICHT `public/`. Alles unter public/
 * liefert Next.js direkt unter seinem Dateipfad aus – an jeder Prüfung
 * vorbei. Die Workshop-Workbooks und Moderationspläne wären damit ohne
 * Login abrufbar. Ausgeliefert wird ausschließlich über die Route
 * /admin/vorlagen/datei/… hinter dem Admin-Check.
 *
 *   1. kleine webp-Vorschaubilder  → schnelles Laden im Dashboard
 *   2. optimierte Voll-Downloads   → webp für Bilder, Originale für Dokumente
 *   3. einen Katalog               → src/lib/vorlagen-assets.ts (statisch)
 *
 * Neu erzeugen (z. B. nach neuen Grafiken):
 *   npm run vorlagen:galerie
 *
 * Vorher ggf. die Cover exportieren:  npm run covers && npm run covers:png
 */
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { spawnSync } from "node:child_process";
import { basename, dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { parallel, webpOpts } from "./bild-jobs.mjs";
import {
  attachCaptions,
  backfillMasse,
  buildMarketingCarousels,
  FORMAT_META,
  renderManifest,
} from "./marketing-carousels.mjs";
import { THEMES, THEME_SUFFIX, THEME_LABEL } from "../../docs/reels/covers/data.mjs";

// Reverse-Map Datei-Suffix → Farbwelt (z. B. "-tuerkis" → "tuerkis").
// Längste Suffixe zuerst prüfen, damit "-tuerkis-hell" nicht faelschlich als
// "-hell" erkannt wird.
const THEME_BY_SUFFIX = Object.fromEntries(
  Object.entries(THEME_SUFFIX).map(([theme, sfx]) => [sfx, theme]),
);
const THEME_SUFFIXES_LONGEST_FIRST = Object.values(THEME_SUFFIX)
  .filter(Boolean)
  .sort((a, b) => b.length - a.length);

/** Datei-Suffix einer Slide/Cover-PNG ableiten: "slide-03-tuerkis.png" → "-tuerkis". */
function themeSuffixOf(file) {
  const b = basename(file).replace(/\.[a-z0-9]+$/i, "");
  const m = b.match(/^(?:slide|cover)-\d+(.*)$/i);
  return m ? m[1] : "";
}

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const OUT = join(ROOT, "content", "vorlagen");
const THUMB_DIR = join(OUT, "thumbs");

const THUMB_WIDTH = 640; // Vorschau
const FULL_WIDTH = 2160; // Download-Obergrenze (Grafiken) – passt zu @2x-Quellen (z. B. Zitat 4:5 = 2160×2700)

// --- Helfer ----------------------------------------------------------------

function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

/** Rekursiv alle Dateien mit passender Endung sammeln. */
function collect(dir, exts) {
  const out = [];
  const walk = (d) => {
    if (!existsSync(d)) return;
    for (const entry of readdirSync(d, { withFileTypes: true })) {
      if (entry.name.startsWith(".")) continue;
      const full = join(d, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (exts.includes(extname(entry.name).toLowerCase())) out.push(full);
    }
  };
  walk(dir);
  return out.sort();
}

/** „WMDG-Zitat-01.png" / Ordnernamen → lesbarer Titel. */
function prettifyName(name) {
  return name
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/^WMDG-/i, "")
    .replace(/@2x/i, "")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function prettifyLabel(str) {
  const map = {
    "selbstverteidigung": "Mentale Selbstverteidigung",
    "stufen": "Die 7 Stufen",
    "praxis": "Praxis",
    "vertiefungen": "Vertiefungen",
    "wissenschaft": "Wissenschaft",
    "landing": "Landing / Allgemein",
  };
  return map[str] ?? prettifyName(str);
}

const assets = [];

// --- 1. Social-Grafiken -----------------------------------------------------

async function buildSocial() {
  const src = join(ROOT, "docs", "marketing");
  // Story-Overlays & Story-Carousels haben eigene Aufbaufunktionen.
  const alle = collect(src, [".png"]).filter(
    (f) => !f.includes("/story-overlays/") && !f.includes("/story-carousels/"),
  );
  // @2x bevorzugen: existiert zu einer Grafik eine @2x-Variante, wird die
  // schärfere @2x-Datei genommen und die 1x-Version übersprungen (statt @2x
  // pauschal zu verwerfen). So liefert die Galerie z. B. den LinkedIn-Banner
  // in 3168px statt 1584px.
  const hat2x = new Set(
    alle
      .filter((f) => /@2x\./i.test(f))
      .map((f) => f.replace(/@2x(\.[a-z0-9]+)$/i, "$1")),
  );
  const files = alle.filter((f) => (/@2x\./i.test(f) ? true : !hat2x.has(f)));
  const dir = join(OUT, "social");
  ensureDir(dir);
  ensureDir(join(THUMB_DIR, "social"));

  const KANAL = {
    facebook: "Facebook",
    instagram: "Instagram",
    linkedin: "LinkedIn",
    youtube: "YouTube",
    messenger: "Messenger",
    whatsapp: "WhatsApp",
    profil: "Profil & Kanal",
    zitate: "Zitate & Fakten",
  };

  // Jede Datei ist unabhaengig -> nebenlaeufig abarbeiten. parallel() haelt die
  // Eingabereihenfolge ein; die laufende Nummer kommt deshalb aus dem Index
  // (vorher ein Zaehler in der Schleife) und bleibt damit unveraendert.
  const eintraege = await parallel(files, async (file, idx) => {
    const rel = file.slice(src.length + 1); // z. B. "zitate/1x1/WMDG-Zitat-01.png"
    const parts = rel.split("/");
    const kanalKey = parts[0];

    // Format aus dem zweiten Pfadsegment ableiten – aber nur, wenn es wirklich
    // ein Format-Ordner ist (z. B. "1x1", "4x5", "9x16", "studien-4x5").
    // "youtube/thumbnails/…" o. Ä. sind KEINE Formate und bleiben unberührt.
    const seg = parts.length > 2 ? parts[1] : "";
    const istFormatSeg = /^(studien-)?\d+x\d+$/i.test(seg);
    const istStudien = istFormatSeg && /^studien-/i.test(seg);
    const fmtLabel = istFormatSeg
      ? seg.replace(/^studien-/i, "").replace(/x/i, ":") // "4x5" → "4:5"
      : "";

    // Zitate und Studien-Fakten liegen im selben Kanal-Ordner, sind aber
    // inhaltlich verschieden – hier sauber in zwei Unterkategorien trennen.
    const kanal =
      kanalKey === "zitate"
        ? istStudien
          ? "Studien-Fakten"
          : "Zitate"
        : (KANAL[kanalKey] ?? prettifyName(kanalKey));

    const id = `social-${String(idx + 1).padStart(3, "0")}`;

    const fullName = `${id}.webp`;
    const thumbName = `${id}.webp`;
    // Voll-Download: höhere Qualität + smartSubsample, damit farbige Textkanten
    // (Akzentwörter im Marken-Grün) nicht ausfransen.
    await sharp(file)
      .resize({ width: FULL_WIDTH, withoutEnlargement: true })
      .webp(await webpOpts(file, { quality: 90 }))
      .toFile(join(dir, fullName));
    // Thumbnail: nach dem Downscale leicht nachschärfen, sonst wirkt Text weich.
    await sharp(file)
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .sharpen({ sigma: 0.7 })
      .webp(await webpOpts(file, { quality: 82 }))
      .toFile(join(THUMB_DIR, "social", thumbName));

    // Format in den Titel aufnehmen, damit die drei Varianten je Zitat
    // (1:1 / 4:5 / 9:16) unterscheidbar und einzeln durchsuchbar sind.
    const basisTitel = prettifyName(basename(file));
    return {
      kategorie: "social",
      titel: fmtLabel ? `${basisTitel} · ${fmtLabel}` : basisTitel,
      unterKategorie: kanal,
      kind: "image",
      thumb: `/admin/vorlagen/datei/thumbs/social/${thumbName}`,
      href: `/admin/vorlagen/datei/social/${fullName}`,
    };
  });
  assets.push(...eintraege);
  return files.length;
}

// --- 2. Reel-Cover (nur vertikales 9x16-Format) -----------------------------

async function buildReels() {
  const src = join(ROOT, "docs", "reels", "covers", "export");
  if (!existsSync(src)) return 0;
  const files = collect(src, [".png"]).filter((f) =>
    f.includes("/reel-9x16/"),
  );
  const dir = join(OUT, "reels");
  ensureDir(dir);
  ensureDir(join(THUMB_DIR, "reels"));

  // Der Cover-Generator erzeugt je Cover mehrere Formate. Die Galerie zeigt
  // weiterhin 9:16 als Karte, bietet aber ALLE vorhandenen Zusatzformate als
  // ZIP-Download an – bisher wurden sie erzeugt und verworfen.
  const REEL_FMT = [
    { key: "reel-9x16", label: "9:16", w: 1080, h: 1920 },
    { key: "feed-4x5", label: "4:5", w: 1080, h: 1350 },
    { key: "feed-1x1", label: "1:1", w: 1080, h: 1080 },
    { key: "pin-2x3", label: "2:3", w: 1080, h: 1620 },
    { key: "landscape-16x9", label: "16:9", w: 1920, h: 1080 },
  ];
  const tmpRoot = join(OUT, ".tmp-reels");
  // Ein Cover je Einheit: eigene webp, eigener Temp-Ordner, eigenes ZIP -
  // untereinander unabhaengig, also nebenlaeufig.
  const eintraege = await parallel(files, async (file) => {
    const rel = file.slice(src.length + 1); // "stufen/reel-9x16/cover-03.png"
    const bereich = rel.split("/")[0];
    const coverFile = basename(file); // "cover-03.png" | "cover-03-tuerkis.png"
    const nrMatch = coverFile.match(/^cover-(\d+)/i);
    const nr = nrMatch ? nrMatch[1] : coverFile.replace(/[^0-9]/g, "");
    // Farbwelt aus dem Datei-Suffix ableiten (Standard/dunkel = ohne Suffix).
    // Ohne diese Unterscheidung kollidierten alle vier Welten auf DIESELBE ID
    // (`reel-<bereich>-<nr>`) – drei Varianten fielen still aus der Galerie und
    // schrieben zudem nebenlaeufig auf dieselbe Datei.
    const base = coverFile.replace(/\.png$/i, ""); // "cover-03-tuerkis"
    const sfx = THEME_SUFFIXES_LONGEST_FIRST.find((s) => base.endsWith(s)) || "";
    const theme = THEME_BY_SUFFIX[sfx] ?? "dunkel";
    const id = `reel-${bereich}-${nr}${sfx}`;

    const fullName = `${id}.webp`;
    await sharp(file)
      .resize({ width: 1080, withoutEnlargement: true })
      .webp(await webpOpts(file, { quality: 86 }))
      .toFile(join(dir, fullName));
    // Thumb von 420 → 512 px (bei 420 war der Cover-Text kaum lesbar) und
    // nach dem Downscale nachschärfen.
    await sharp(file)
      .resize({ width: 512, withoutEnlargement: true })
      .sharpen({ sigma: 0.7 })
      .webp(await webpOpts(file, { quality: 80 }))
      .toFile(join(THUMB_DIR, "reels", fullName));

    // Vorhandene Zusatzformate zu diesem Cover einsammeln.
    const vorhandene = REEL_FMT.filter((F) =>
      existsSync(join(src, bereich, F.key, coverFile)),
    );
    let zipHref;
    let formate;
    if (vorhandene.length > 1) {
      const tmp = join(tmpRoot, id);
      for (const F of vorhandene) {
        const fdir = join(tmp, F.key);
        ensureDir(fdir);
        await sharp(join(src, bereich, F.key, coverFile))
          .resize({ width: F.w, withoutEnlargement: true })
          .webp(await webpOpts(join(src, bereich, F.key, coverFile), { quality: 86 }))
          .toFile(join(fdir, `cover-${nr}.webp`));
      }
      const zipName = `${id}.zip`;
      const zipPath = join(dir, zipName);
      if (existsSync(zipPath)) rmSync(zipPath);
      const res = spawnSync("zip", ["-r", "-q", zipPath, "."], {
        cwd: tmp,
        stdio: "inherit",
      });
      if (res.status !== 0) throw new Error(`zip fehlgeschlagen für ${id}`);
      zipHref = `/admin/vorlagen/datei/reels/${zipName}`;
      formate = vorhandene.map((F) => ({ label: F.label, w: F.w, h: F.h }));
    }

    return {
      kategorie: "reels",
      titel: `${prettifyLabel(bereich)} · Cover ${nr} · ${THEME_LABEL[theme]}`,
      unterKategorie: prettifyLabel(bereich),
      kind: "image",
      thumb: `/admin/vorlagen/datei/thumbs/reels/${fullName}`,
      href: `/admin/vorlagen/datei/reels/${fullName}`,
      ...(formate ? { formate } : {}),
      ...(zipHref ? { zipHref } : {}),
    };
  });
  assets.push(...eintraege);

  // Temp-Ordner entfernen – nur ZIPs bleiben.
  if (existsSync(tmpRoot)) rmSync(tmpRoot, { recursive: true, force: true });
  return files.length;
}

// --- 3. Carousels (Cover als Vorschau, alle Slides als ZIP) -----------------

async function buildCarousels() {
  const src = join(ROOT, "docs", "carousels", "export");
  if (!existsSync(src)) return 0;

  const dir = join(OUT, "carousels");
  ensureDir(dir);
  const tmpRoot = join(OUT, ".tmp-carousels");

  const SERIE = {
    "selbstverteidigung": "Mentale Selbstverteidigung",
    "stufen": "Die 7 Stufen",
    "praxis": "Praxis",
    "vertiefungen": "Vertiefungen",
  };

  // Struktur: export/<serie>/<slug>/<format>/slide-NN.png
  // Nur die Studio-Serien (SERIE) verarbeiten – Marketing-Serien liegen im
  // selben export/ mit anderer Struktur (<key>/<format>/) und gehören nicht
  // in die Admin-Carousel-Galerie.
  const aufgaben = [];
  for (const serie of readdirSync(src, { withFileTypes: true })) {
    if (!serie.isDirectory()) continue;
    if (!SERIE[serie.name]) continue;
    const serieDir = join(src, serie.name);
    for (const carousel of readdirSync(serieDir, { withFileTypes: true })) {
      if (!carousel.isDirectory()) continue;
      // Je Carousel eine eigene Einheit PRO Farbwelt.
      for (const theme of THEMES) {
        aufgaben.push({ serie, carousel, cDir: join(serieDir, carousel.name), theme });
      }
    }
  }

  // Jedes Carousel×Farbwelt ist eine eigene Einheit (eigener Slide-Ordner,
  // eigenes ZIP) und damit unabhaengig von den anderen.
  const ergebnisse = await parallel(aufgaben, async ({ serie, carousel, cDir, theme }) => {
    const sfx = THEME_SUFFIX[theme];
    // Seit der Format-Erweiterung liegen die Slides unter <slug>/<format>/.
    // Vorschau immer 4:5; das Download-ZIP enthält alle vorhandenen Formate.
    const FMT_ORDER = ["feed-4x5", "feed-1x1", "reel-9x16"];
    const formats = FMT_ORDER.filter((f) => existsSync(join(cDir, f)));
    const flat = formats.length === 0; // alte flache Struktur
    const previewRoot = flat
      ? cDir
      : join(cDir, formats.includes("feed-4x5") ? "feed-4x5" : formats[0]);
    // Nur die Slides DIESER Farbwelt (sonst kollidieren die vier Welten).
    const slides = collect(previewRoot, [".png"]).filter(
      (f) => themeSuffixOf(f) === sfx,
    );
    if (slides.length === 0) return null;

    const id = `${serie.name}__${carousel.name}${sfx}`;
    const slideDir = join(dir, id);
    ensureDir(slideDir);

    // Kleine Preview-webp (4:5) für die Galerie-Karten.
    const tmp = join(tmpRoot, id);
    const slidePaths = [];
    let n = 0;
    for (const slide of slides) {
      n++;
      const name = `slide-${String(n).padStart(2, "0")}.webp`;
      await sharp(slide)
        .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
        .sharpen({ sigma: 0.7 })
        .webp(await webpOpts(slide, { quality: 82 }))
        .toFile(join(slideDir, name));
      slidePaths.push(`/admin/vorlagen/datei/carousels/${id}/${name}`);
    }

    // Download-Inhalt: alle vorhandenen Formate als webp@1080, je in eigenem Ordner.
    const zipFormats = flat
      ? [{ key: "feed-4x5", root: cDir }]
      : formats.map((f) => ({ key: f, root: join(cDir, f) }));
    for (const zf of zipFormats) {
      const fslides = collect(zf.root, [".png"]).filter(
        (f) => themeSuffixOf(f) === sfx,
      );
      const fdir = join(tmp, zf.key);
      ensureDir(fdir);
      let m = 0;
      for (const slide of fslides) {
        m++;
        await sharp(slide)
          .resize({ width: 1080, withoutEnlargement: true })
          .webp(await webpOpts(slide, { quality: 88 }))
          .toFile(join(fdir, `slide-${String(m).padStart(2, "0")}.webp`));
      }
    }

    const zipName = `${id}.zip`;
    const zipPath = join(dir, zipName);
    if (existsSync(zipPath)) rmSync(zipPath);
    const res = spawnSync("zip", ["-r", "-q", zipPath, "."], { cwd: tmp, stdio: "inherit" });
    if (res.status !== 0) {
      throw new Error(`zip fehlgeschlagen für ${id}`);
    }

    return {
      kategorie: "carousel",
      titel: `${prettifyName(carousel.name)} · ${THEME_LABEL[theme]}`,
      unterKategorie: SERIE[serie.name] ?? prettifyLabel(serie.name),
      kind: "carousel",
      slides: slides.length,
      sizeMB: Number((statSync(zipPath).size / 1024 / 1024).toFixed(1)),
      thumb: slidePaths[0],
      slidePaths,
      href: `/admin/vorlagen/datei/carousels/${zipName}`,
      formate: zipFormats.map((zf) => FORMAT_META[zf.key]).filter(Boolean),
    };
  });
  const fertige = ergebnisse.filter(Boolean);
  assets.push(...fertige);

  // Temp-Ordner entfernen – nur ZIPs bleiben.
  if (existsSync(tmpRoot)) rmSync(tmpRoot, { recursive: true, force: true });
  return fertige.length;
}

// --- 3b. Story-Overlays „Persönliche Geschichten" (Bild-Carousel-Vorlage) ---
// Pro Story ein Eintrag: Vorschau je Format (Hintergrund + Overlay komponiert),
// Download-ZIP mit allen Formaten (transparente Overlays + Hintergründe) für
// den Canva-Workflow. Wird als kategorie:"carousel" gelistet (Tab „Carousels").

async function buildStoryOverlays() {
  const src = join(ROOT, "docs", "marketing", "story-overlays");
  if (!existsSync(src)) return 0;

  const FMT = [
    { key: "4x5",  label: "4:5", w: 1080, h: 1350 },
    { key: "1x1",  label: "1:1", w: 1080, h: 1080 },
    { key: "9x16", label: "9:16", w: 1080, h: 1920 },
  ].filter((f) => existsSync(join(src, f.key)));
  if (FMT.length === 0) return 0;

  const dir = join(OUT, "story");
  ensureDir(dir);
  const tmpRoot = join(OUT, ".tmp-story");

  // Overlay-Dateien im ersten Format bestimmen die Story-Liste.
  const base = FMT[0];
  const overlays = collect(join(src, base.key), [".png"]).filter(
    (f) => /overlay-\d+/.test(basename(f)),
  );

  // Eine Story je Einheit: eigener Vorschau-Ordner, eigenes ZIP.
  const ergebnisse = await parallel(overlays, async (ovBase) => {
    const file = basename(ovBase); // overlay-01-slug.png
    const m = file.match(/^overlay-(\d+)-(.+)\.png$/);
    if (!m) return null;
    const nr = m[1];
    const slug = m[2];
    const id = `story-${nr}-${slug}`;

    // Vorschau je Format: Hintergrund + Overlay komponieren → webp.
    const slideDir = join(dir, id);
    ensureDir(slideDir);
    const slidePaths = [];
    const tmp = join(tmpRoot, id);
    ensureDir(tmp);

    for (const F of FMT) {
      const bg = join(src, F.key, "_hintergrund.png");
      const ov = join(src, F.key, file);
      if (!existsSync(bg) || !existsSync(ov)) continue;
      // sharp wendet resize intern VOR composite an → beide Ebenen vorab auf
      // Vorschaubreite bringen, dann compositen (sonst Dimensions-Fehler).
      const bgBuf = await sharp(bg).resize({ width: THUMB_WIDTH, withoutEnlargement: true }).toBuffer();
      const ovBuf = await sharp(ov).resize({ width: THUMB_WIDTH, withoutEnlargement: true }).toBuffer();
      const preview = await sharp(bgBuf)
        .composite([{ input: ovBuf }])
        .webp({ quality: 78 })
        .toBuffer();
      const name = `preview-${F.key}.webp`;
      writeFileSync(join(slideDir, name), preview);
      slidePaths.push(`/admin/vorlagen/datei/story/${id}/${name}`);
      // Original-PNGs (transparent + Hintergrund) fürs ZIP ablegen.
      cpSync(ov, join(tmp, `overlay-${F.key}.png`));
      cpSync(bg, join(tmp, `hintergrund-${F.key}.png`));
    }

    // Kurzanleitung ins ZIP.
    writeFileSync(
      join(tmp, "SO-GEHTS.txt"),
      [
        "Persönliche Geschichten – Bild-Carousel-Vorlage",
        "",
        "In Canva 3 Ebenen stapeln (von hinten nach vorne):",
        "  1) hintergrund-<format>.png   (ganz nach hinten)",
        "  2) dein freigestelltes Foto   (Mitte, rechts platzieren)",
        "  3) overlay-<format>.png       (ganz nach vorne)",
        "",
        "Der dunkle Verlauf (Scrim) im Overlay hält den Text lesbar.",
        "Formate: 4:5 (Feed), 1:1 (Feed), 9:16 (Story/Reel).",
      ].join("\n"),
    );

    const zipName = `${id}.zip`;
    const zipPath = join(dir, zipName);
    if (existsSync(zipPath)) rmSync(zipPath);
    const res = spawnSync("zip", ["-r", "-q", zipPath, "."], { cwd: tmp, stdio: "inherit" });
    if (res.status !== 0) throw new Error(`zip fehlgeschlagen für ${id}`);

    return {
      kategorie: "carousel",
      titel: prettifyName(slug),
      unterKategorie: "Persönliche Geschichten",
      kind: "carousel",
      slides: slidePaths.length,
      sizeMB: Number((statSync(zipPath).size / 1024 / 1024).toFixed(1)),
      thumb: slidePaths[0],
      slidePaths,
      href: `/admin/vorlagen/datei/story/${zipName}`,
      formate: FMT.map((f) => ({ label: f.label, w: f.w, h: f.h })),
    };
  });
  const fertige = ergebnisse.filter(Boolean);
  assets.push(...fertige);

  if (existsSync(tmpRoot)) rmSync(tmpRoot, { recursive: true, force: true });
  return fertige.length;
}

// --- 3c. Story-Carousels „Persönliche Geschichten" (komplette Geschichten) ---
// Vollständige Bild-Geschichten (Titel-Overlay + fertige Body-Slides) je Story.
// Vorschau: alle Slides im 4:5-Format; ZIP enthält alle Formate + Anleitung.

async function buildStoryCarousels() {
  const src = join(ROOT, "docs", "marketing", "story-carousels");
  if (!existsSync(src)) return 0;

  const dir = join(OUT, "story-carousel");
  ensureDir(dir);
  const tmpRoot = join(OUT, ".tmp-story-carousel");

  const FMT = [
    { key: "4x5", label: "4:5", w: 1080, h: 1350 },
    { key: "1x1", label: "1:1", w: 1080, h: 1080 },
    { key: "9x16", label: "9:16", w: 1080, h: 1920 },
  ];

  // Klartext-Titel je Story-Ordner (sonst prettifyName als Fallback).
  const TITEL = {
    "sommer-2023": "Der Sommer, der alles veränderte",
  };

  // Eine Story je Einheit: eigener Vorschau-Ordner, eigenes ZIP.
  const ergebnisse = await parallel(
    readdirSync(src, { withFileTypes: true }),
    async (story) => {
    if (!story.isDirectory()) return null;
    const storyDir = join(src, story.name);
    const previewFmt = existsSync(join(storyDir, "4x5")) ? "4x5" : FMT.find((f) => existsSync(join(storyDir, f.key)))?.key;
    if (!previewFmt) return null;

    const id = `story-carousel-${story.name}`;
    const slideDir = join(dir, id);
    ensureDir(slideDir);

    // Vorschau (4:5): alle Slides in Reihenfolge. Cover = Hintergrund+Overlay.
    const pdir = join(storyDir, previewFmt);
    const bg = join(pdir, "_hintergrund.png");
    const files = collect(pdir, [".png"]).filter((f) => !basename(f).startsWith("_"));
    // Reihenfolge: 01-overlay zuerst, dann 02..NN numerisch.
    files.sort((a, b) => {
      const na = basename(a).startsWith("01-overlay") ? 1 : parseInt(basename(a), 10);
      const nb = basename(b).startsWith("01-overlay") ? 1 : parseInt(basename(b), 10);
      return na - nb;
    });

    const slidePaths = [];
    let n = 0;
    for (const f of files) {
      n++;
      const name = `slide-${String(n).padStart(2, "0")}.webp`;
      const isCover = basename(f).startsWith("01-overlay");
      let buf;
      if (isCover && existsSync(bg)) {
        const bgBuf = await sharp(bg).resize({ width: THUMB_WIDTH, withoutEnlargement: true }).toBuffer();
        const ovBuf = await sharp(f).resize({ width: THUMB_WIDTH, withoutEnlargement: true }).toBuffer();
        buf = await sharp(bgBuf).composite([{ input: ovBuf }]).webp({ quality: 78 }).toBuffer();
      } else {
        buf = await sharp(f).resize({ width: THUMB_WIDTH, withoutEnlargement: true }).webp({ quality: 78 }).toBuffer();
      }
      writeFileSync(join(slideDir, name), buf);
      slidePaths.push(`/admin/vorlagen/datei/story-carousel/${id}/${name}`);
    }

    // ZIP: gesamte Story (alle Formate + SO-GEHTS.txt).
    const tmp = join(tmpRoot, id);
    ensureDir(tmp);
    cpSync(storyDir, join(tmp, story.name), { recursive: true });
    const zipName = `${id}.zip`;
    const zipPath = join(dir, zipName);
    if (existsSync(zipPath)) rmSync(zipPath);
    const res = spawnSync("zip", ["-r", "-q", zipPath, "."], { cwd: tmp, stdio: "inherit" });
    if (res.status !== 0) throw new Error(`zip fehlgeschlagen für ${id}`);

    const formate = FMT.filter((f) => existsSync(join(storyDir, f.key))).map((f) => ({ label: f.label, w: f.w, h: f.h }));

    return {
      kategorie: "carousel",
      titel: TITEL[story.name] ?? prettifyName(story.name),
      unterKategorie: "Persönliche Geschichten · Story",
      kind: "carousel",
      slides: slidePaths.length,
      sizeMB: Number((statSync(zipPath).size / 1024 / 1024).toFixed(1)),
      thumb: slidePaths[0],
      slidePaths,
      href: `/admin/vorlagen/datei/story-carousel/${zipName}`,
      formate,
    };
  });
  const fertige = ergebnisse.filter(Boolean);
  assets.push(...fertige);

  if (existsSync(tmpRoot)) rmSync(tmpRoot, { recursive: true, force: true });
  return fertige.length;
}

// --- 3d. Content-Overlays „Zitate" & „Studien-Fakten" -----------------------
// Overlay-Variante der bestehenden Zitat-/Fakten-Posts: transparentes Text-
// Overlay + Marken-Hintergrund je Format, zum Legen über ein eigenes Foto in
// Canva. Pro Zitat/Fakt ein Eintrag (kategorie:"carousel", Tab „Carousels").

async function buildContentOverlays() {
  const root = join(ROOT, "docs", "marketing", "content-overlays");
  if (!existsSync(root)) return 0;

  const FMT = [
    { key: "4x5", label: "4:5", w: 1080, h: 1350 },
    { key: "1x1", label: "1:1", w: 1080, h: 1080 },
    { key: "9x16", label: "9:16", w: 1080, h: 1920 },
  ];
  const SERIE = {
    "zitate": "Zitate · Overlay",
    "studien-fakten": "Studien-Fakten · Overlay",
  };

  const dir = join(OUT, "content-overlay");
  ensureDir(dir);
  const tmpRoot = join(OUT, ".tmp-content-overlay");

  // Erst alle Overlays beider Serien einsammeln, dann nebenlaeufig abarbeiten:
  // jedes Overlay ist eine eigene Einheit (Vorschau-Ordner + ZIP).
  const aufgaben = [];
  for (const [serie, label] of Object.entries(SERIE)) {
    const src = join(root, serie);
    if (!existsSync(src)) continue;
    const formate = FMT.filter((f) => existsSync(join(src, f.key)));
    if (formate.length === 0) continue;

    const base = formate[0];
    const overlays = collect(join(src, base.key), [".png"]).filter((f) =>
      /overlay-\d+/.test(basename(f)),
    );
    for (const ovBase of overlays) {
      aufgaben.push({ serie, label, src, formate, ovBase });
    }
  }

  const ergebnisse = await parallel(
    aufgaben,
    async ({ serie, label, src, formate, ovBase }) => {
    const file = basename(ovBase); // overlay-NN.png
    const m = file.match(/^overlay-(\d+)\.png$/);
    if (!m) return null;
    const nr = m[1];
    const id = `overlay-${serie}-${nr}`;

    // Vorschau je Format: Hintergrund + Overlay komponieren → webp.
    const slideDir = join(dir, id);
    ensureDir(slideDir);
    const slidePaths = [];
    const tmp = join(tmpRoot, id);
    ensureDir(tmp);

    for (const F of formate) {
      const bg = join(src, F.key, "_hintergrund.png");
      const ov = join(src, F.key, file);
      if (!existsSync(ov)) continue;
      // sharp wendet resize intern VOR composite an → beide Ebenen vorab auf
      // Vorschaubreite bringen, dann compositen (sonst Dimensions-Fehler).
      const ovBuf = await sharp(ov)
        .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
        .toBuffer();
      const name = `preview-${F.key}.webp`;
      let previewBuf;
      if (existsSync(bg)) {
        const bgBuf = await sharp(bg)
          .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
          .toBuffer();
        previewBuf = await sharp(bgBuf)
          .composite([{ input: ovBuf }])
          .webp(await webpOpts(bgBuf, { quality: 82 }))
          .toBuffer();
      } else {
        previewBuf = await sharp(ovBuf)
          .webp(await webpOpts(ovBuf, { quality: 82 }))
          .toBuffer();
      }
      writeFileSync(join(slideDir, name), previewBuf);
      slidePaths.push(`/admin/vorlagen/datei/content-overlay/${id}/${name}`);
      // Original-PNGs (transparent + Hintergrund) fürs ZIP ablegen.
      cpSync(ov, join(tmp, `overlay-${F.key}.png`));
      if (existsSync(bg)) cpSync(bg, join(tmp, `hintergrund-${F.key}.png`));
    }
    if (slidePaths.length === 0) return null;

    // Kurzanleitung ins ZIP.
    writeFileSync(
      join(tmp, "SO-GEHTS.txt"),
      [
        `${label} – Overlay-Vorlage`,
        "",
        "In Canva 3 Ebenen stapeln (von hinten nach vorne):",
        "  1) hintergrund-<format>.png   ODER dein eigenes Foto (ganz nach hinten)",
        "  2) optional: dein freigestelltes Foto (Mitte)",
        "  3) overlay-<format>.png       (ganz nach vorne)",
        "",
        "Der dunkle Scrim im Overlay hält den Text auf jedem Foto lesbar.",
        "Formate: 4:5 (Feed), 1:1 (Feed), 9:16 (Story/Reel).",
      ].join("\n"),
    );

    const zipName = `${id}.zip`;
    const zipPath = join(dir, zipName);
    if (existsSync(zipPath)) rmSync(zipPath);
    const res = spawnSync("zip", ["-r", "-q", zipPath, "."], {
      cwd: tmp,
      stdio: "inherit",
    });
    if (res.status !== 0) throw new Error(`zip fehlgeschlagen für ${id}`);

    return {
      kategorie: "carousel",
      titel: `${serie === "zitate" ? "Zitat" : "Fakt"} ${nr}`,
      unterKategorie: label,
      kind: "carousel",
      slides: slidePaths.length,
      sizeMB: Number((statSync(zipPath).size / 1024 / 1024).toFixed(1)),
      thumb: slidePaths[0],
      slidePaths,
      href: `/admin/vorlagen/datei/content-overlay/${zipName}`,
      formate: formate.map((f) => ({ label: f.label, w: f.w, h: f.h })),
    };
  });
  const fertige = ergebnisse.filter(Boolean);
  assets.push(...fertige);

  if (existsSync(tmpRoot)) rmSync(tmpRoot, { recursive: true, force: true });
  return fertige.length;
}

// --- 3e. Cover-Overlays (Reel-/Feed-Cover als transparente Ebene) -----------
// Aus docs/reels/covers/export-overlay/<bereich>/<format>/overlay-NN.png:
// pro Cover ein Eintrag, Vorschau = fertiges Cover, ZIP = transparente Overlays
// aller Formate + Anleitung. Zum Legen über ein eigenes Foto in Canva.

const OVERLAY_HELP = [
  "Overlay-Vorlage (transparent) – 3-Ebenen-Workflow in Canva:",
  "",
  "  1) dein eigenes Foto / Hintergrund   (ganz nach hinten)",
  "  2) overlay-<format>.png              (ganz nach vorne)",
  "",
  "Der Scrim im Overlay hält den Text auf jedem Foto lesbar.",
  "Overlay in Originalgröße (1080 Breite) 1:1 auf das Format legen.",
].join("\n");

async function buildCoverOverlays() {
  const ovRoot = join(ROOT, "docs", "reels", "covers", "export-overlay");
  const fullRoot = join(ROOT, "docs", "reels", "covers", "export");
  if (!existsSync(ovRoot)) return 0;

  const FMT = [
    { key: "reel-9x16", label: "9:16", w: 1080, h: 1920 },
    { key: "feed-4x5", label: "4:5", w: 1080, h: 1350 },
    { key: "feed-1x1", label: "1:1", w: 1080, h: 1080 },
    { key: "pin-2x3", label: "2:3", w: 1080, h: 1620 },
    { key: "landscape-16x9", label: "16:9", w: 1920, h: 1080 },
  ];
  const dir = join(OUT, "cover-overlay");
  ensureDir(dir);
  const tmpRoot = join(OUT, ".tmp-cover-overlay");

  // Erst alle Cover-Overlays aller Bereiche einsammeln, dann nebenlaeufig
  // abarbeiten: jedes Cover ist eine eigene Einheit (Vorschau-Ordner + ZIP).
  const aufgaben = [];
  for (const bereich of readdirSync(ovRoot, { withFileTypes: true })) {
    if (!bereich.isDirectory()) continue;
    const bDir = join(ovRoot, bereich.name);
    const formate = FMT.filter((f) => existsSync(join(bDir, f.key)));
    if (formate.length === 0) continue;

    const prevFmt = formate.find((f) => f.key === "reel-9x16") ?? formate[0];
    const overlays = collect(join(bDir, prevFmt.key), [".png"]).filter((f) =>
      /overlay-\d+/.test(basename(f)),
    );
    for (const ov of overlays) {
      aufgaben.push({ bereich, bDir, formate, ov });
    }
  }

  const ergebnisse = await parallel(
    aufgaben,
    async ({ bereich, bDir, formate, ov }) => {
    const nr = basename(ov).replace(/[^0-9]/g, "");
    const id = `cover-overlay-${bereich.name}-${nr}`;
    const slideDir = join(dir, id);
    ensureDir(slideDir);
    const tmp = join(tmpRoot, id);
    ensureDir(tmp);

    const slidePaths = [];
    for (const F of formate) {
      const ovPng = join(bDir, F.key, `overlay-${nr}.png`);
      if (!existsSync(ovPng)) continue;
      const full = join(fullRoot, bereich.name, F.key, `cover-${nr}.png`);
      const name = `preview-${F.key}.webp`;
      // Vorschau: fertiges Cover (falls vorhanden), sonst Overlay auf Dunkel.
      let buf;
      if (existsSync(full)) {
        buf = await sharp(full)
          .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
          .webp(await webpOpts(full, { quality: 82 }))
          .toBuffer();
      } else {
        buf = await sharp(ovPng)
          .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
          .flatten({ background: "#08102a" })
          // flatten() legt das Overlay auf Dunkel und entfernt damit den
          // Alpha-Kanal – hier ist effort 6 billig und bleibt.
          .webp({ quality: 82, effort: 6, smartSubsample: true })
          .toBuffer();
      }
      writeFileSync(join(slideDir, name), buf);
      slidePaths.push(`/admin/vorlagen/datei/cover-overlay/${id}/${name}`);
      cpSync(ovPng, join(tmp, `overlay-${F.key}.png`));
    }
    if (slidePaths.length === 0) return null;

    writeFileSync(join(tmp, "SO-GEHTS.txt"), OVERLAY_HELP);
    const zipName = `${id}.zip`;
    const zipPath = join(dir, zipName);
    if (existsSync(zipPath)) rmSync(zipPath);
    const res = spawnSync("zip", ["-r", "-q", zipPath, "."], { cwd: tmp, stdio: "inherit" });
    if (res.status !== 0) throw new Error(`zip fehlgeschlagen für ${id}`);

    return {
      // Gehoert in den Tab "Reel-Cover", nicht zu den Carousels: die Quelle
      // ist docs/reels/covers/export-overlay, es sind also Reel-/Feed-Cover.
      // kind bleibt "carousel", damit die Galerie die Slide-Ansicht und den
      // ZIP-Download je Format rendert (VorlagenBrowser waehlt die Karte
      // nach a.kind, nicht nach a.kategorie).
      kategorie: "reels",
      titel: `${prettifyLabel(bereich.name)} · Cover ${nr}`,
      unterKategorie: `${prettifyLabel(bereich.name)} · Cover-Overlay`,
      kind: "carousel",
      slides: slidePaths.length,
      sizeMB: Number((statSync(zipPath).size / 1024 / 1024).toFixed(1)),
      thumb: slidePaths[0],
      slidePaths,
      href: `/admin/vorlagen/datei/cover-overlay/${zipName}`,
      formate: formate.map((f) => ({ label: f.label, w: f.w, h: f.h })),
    };
  });
  const fertige = ergebnisse.filter(Boolean);
  assets.push(...fertige);

  if (existsSync(tmpRoot)) rmSync(tmpRoot, { recursive: true, force: true });
  return fertige.length;
}

// --- 3f. Carousel-Overlays (jede Slide als transparente Ebene) --------------
// Aus docs/carousels/export-overlay/<serie>/<slug>/<format>/slide-NN.png:
// pro Carousel ein Eintrag, Vorschau = fertige Slides (4:5), ZIP = transparente
// Overlays aller Slides in allen Formaten + Anleitung.

async function buildCarouselOverlays() {
  const ovRoot = join(ROOT, "docs", "carousels", "export-overlay");
  const fullRoot = join(ROOT, "docs", "carousels", "export");
  if (!existsSync(ovRoot)) return 0;

  const FMT = [
    { key: "feed-4x5", label: "4:5", w: 1080, h: 1350 },
    { key: "feed-1x1", label: "1:1", w: 1080, h: 1080 },
    { key: "reel-9x16", label: "9:16", w: 1080, h: 1920 },
  ];
  const SERIE = {
    "selbstverteidigung": "Mentale Selbstverteidigung",
    "stufen": "Die 7 Stufen",
    "praxis": "Praxis",
    "vertiefungen": "Vertiefungen",
    "mitgliederbereich": "Mitgliederbereich",
  };
  const dir = join(OUT, "carousel-overlay");
  ensureDir(dir);
  const tmpRoot = join(OUT, ".tmp-carousel-overlay");

  // Erst alle Carousels aller Serien einsammeln, dann nebenlaeufig abarbeiten:
  // jedes Carousel ist eine eigene Einheit (Slide-Ordner + ZIP).
  const aufgaben = [];
  for (const serie of readdirSync(ovRoot, { withFileTypes: true })) {
    if (!serie.isDirectory()) continue;
    const serieDir = join(ovRoot, serie.name);
    for (const carousel of readdirSync(serieDir, { withFileTypes: true })) {
      if (!carousel.isDirectory()) continue;
      aufgaben.push({ serie, carousel, cDir: join(serieDir, carousel.name) });
    }
  }

  const ergebnisse = await parallel(
    aufgaben,
    async ({ serie, carousel, cDir }) => {
    const formate = FMT.filter((f) => existsSync(join(cDir, f.key)));
    if (formate.length === 0) return null;

    const prevFmt = formate.find((f) => f.key === "feed-4x5") ?? formate[0];
    const slides = collect(join(cDir, prevFmt.key), [".png"]);
    if (slides.length === 0) return null;

    const id = `carousel-overlay-${serie.name}__${carousel.name}`;
    const slideDir = join(dir, id);
    ensureDir(slideDir);
    const tmp = join(tmpRoot, id);

    // Vorschau: fertige Slides (falls vorhanden), sonst Overlay auf Dunkel.
    const slidePaths = [];
    let n = 0;
    for (const slide of slides) {
      n++;
      const nn = String(n).padStart(2, "0");
      const full = join(fullRoot, serie.name, carousel.name, prevFmt.key, basename(slide));
      const name = `slide-${nn}.webp`;
      let buf;
      if (existsSync(full)) {
        buf = await sharp(full)
          .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
          .webp(await webpOpts(full, { quality: 82 }))
          .toBuffer();
      } else {
        buf = await sharp(slide)
          .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
          .flatten({ background: "#08102a" })
          // flatten() legt das Overlay auf Dunkel und entfernt damit den
          // Alpha-Kanal – hier ist effort 6 billig und bleibt.
          .webp({ quality: 82, effort: 6, smartSubsample: true })
          .toBuffer();
      }
      writeFileSync(join(slideDir, name), buf);
      slidePaths.push(`/admin/vorlagen/datei/carousel-overlay/${id}/${name}`);
    }

    // ZIP: transparente Overlays aller Formate (je Format ein Ordner).
    for (const F of formate) {
      const fdir = join(tmp, F.key);
      ensureDir(fdir);
      for (const slide of collect(join(cDir, F.key), [".png"])) {
        cpSync(slide, join(fdir, basename(slide)));
      }
    }
    writeFileSync(join(tmp, "SO-GEHTS.txt"), OVERLAY_HELP);
    const zipName = `${id}.zip`;
    const zipPath = join(dir, zipName);
    if (existsSync(zipPath)) rmSync(zipPath);
    const res = spawnSync("zip", ["-r", "-q", zipPath, "."], { cwd: tmp, stdio: "inherit" });
    if (res.status !== 0) throw new Error(`zip fehlgeschlagen für ${id}`);

    return {
      kategorie: "carousel",
      titel: prettifyName(carousel.name),
      unterKategorie: `${SERIE[serie.name] ?? prettifyLabel(serie.name)} · Overlay`,
      kind: "carousel",
      slides: slidePaths.length,
      sizeMB: Number((statSync(zipPath).size / 1024 / 1024).toFixed(1)),
      thumb: slidePaths[0],
      slidePaths,
      href: `/admin/vorlagen/datei/carousel-overlay/${zipName}`,
      formate: formate.map((f) => ({ label: f.label, w: f.w, h: f.h })),
    };
  });
  const fertige = ergebnisse.filter(Boolean);
  assets.push(...fertige);

  if (existsSync(tmpRoot)) rmSync(tmpRoot, { recursive: true, force: true });
  return fertige.length;
}

// --- 4. Workshop-Dateien (Download, keine Vorschau) -------------------------

function buildWorkshop() {
  const src = join(ROOT, "docs", "workshop");
  const files = collect(src, [".pptx", ".pdf"]);
  const dir = join(OUT, "workshop");
  ensureDir(dir);

  const THEMA = {
    "7-stufen": "Die 7 Stufen",
    "mentale-selbstverteidigung": "Mentale Selbstverteidigung",
    "praxis": "Praxis-Werkzeugkasten",
    "vertiefungen": "Deinen Kopf verstehen",
    "wissensdatenbank": "Wissensdatenbank",
    "bewusstseinstest": "Bewusstseinstest & Profil",
    "blog": "Blog & Deep-Dives",
    "journal": "Journal & Impulse",
    "reel-skripte": "Reel-Drehbücher",
    "video-drehbuecher": "Video-Drehbücher",
    "carousel-texte": "Carousel-Texte",
    "anleitungen": "Anleitungen",
  };

  for (const file of files) {
    const rel = file.slice(src.length + 1);
    const parts = rel.split("/");
    const thema = parts.length > 1 ? (THEMA[parts[0]] ?? prettifyLabel(parts[0])) : "Universell";
    const name = basename(file);
    cpSync(file, join(dir, name));

    const ext = extname(name).slice(1).toUpperCase();
    assets.push({
      kategorie: "workshop",
      titel: prettifyName(name),
      unterKategorie: thema,
      kind: "file",
      format: ext,
      sizeMB: Number((statSync(file).size / 1024 / 1024).toFixed(1)),
      href: `/admin/vorlagen/datei/workshop/${name}`,
    });
  }
  return files.length;
}

// --- Katalog schreiben ------------------------------------------------------

function writeManifest() {
  const path = join(ROOT, "src", "lib", "vorlagen-assets.ts");
  writeFileSync(path, renderManifest(assets));
  return path;
}

// --- Lauf -------------------------------------------------------------------

async function main() {
  // Alten Stand entfernen, sauber neu aufbauen.
  if (existsSync(OUT)) rmSync(OUT, { recursive: true, force: true });
  ensureDir(OUT);

  const social = await buildSocial();
  console.log(`✓ Social-Grafiken: ${social}`);
  const reels = await buildReels();
  console.log(`✓ Reel-Cover (9x16): ${reels}`);
  const carousels = await buildCarousels();
  console.log(`✓ Carousels (Studio, als ZIP): ${carousels}`);
  const stories = await buildStoryOverlays();
  console.log(`✓ Story-Overlays (Persönliche Geschichten, als ZIP): ${stories}`);
  const storyCarousels = await buildStoryCarousels();
  console.log(`✓ Story-Carousels (komplette Geschichten, als ZIP): ${storyCarousels}`);
  const contentOverlays = await buildContentOverlays();
  console.log(`✓ Content-Overlays (Zitate & Fakten, als ZIP): ${contentOverlays}`);
  const coverOverlays = await buildCoverOverlays();
  console.log(`✓ Cover-Overlays (Reel-/Feed-Cover, als ZIP): ${coverOverlays}`);
  const carouselOverlays = await buildCarouselOverlays();
  console.log(`✓ Carousel-Overlays (Slides als transparente Ebenen, als ZIP): ${carouselOverlays}`);
  const marketing = await buildMarketingCarousels({ OUT, assets });
  console.log(`✓ Carousels (Marketing/Funnel, als ZIP): ${marketing}`);
  const workshop = buildWorkshop();
  console.log(`✓ Workshop-Dateien: ${workshop}`);

  // Post-Captions aus den Skripten an Carousels & 7-Stufen-Reels hängen.
  attachCaptions(assets);
  console.log(`✓ Captions gesetzt: ${assets.filter((a) => a.caption).length} Einträge`);

  // Pixelmaße an alle Bild-Grafiken hängen.
  await backfillMasse(OUT, assets);
  console.log(`✓ Maße gesetzt: ${assets.filter((a) => a.masse).length} Bild-Grafiken`);

  const path = writeManifest();
  console.log(`✓ Katalog: ${path} (${assets.length} Einträge)`);

  // Deploy-Größe ausgeben
  const size = collect(OUT, [".webp", ".pptx", ".pdf", ".png", ".zip"]).reduce(
    (s, f) => s + statSync(f).size,
    0,
  );
  console.log(`→ content/vorlagen/ ≈ ${(size / 1024 / 1024).toFixed(1)} MB`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
