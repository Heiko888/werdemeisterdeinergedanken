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

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const OUT = join(ROOT, "content", "vorlagen");
const THUMB_DIR = join(OUT, "thumbs");

const THUMB_WIDTH = 640; // Vorschau
const FULL_WIDTH = 2000; // Download-Obergrenze (Grafiken)

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
  const files = collect(src, [".png"]).filter(
    // @2x-Varianten überspringen – die 1x-Version reicht als Download
    (f) => !/@2x\./i.test(f),
  );
  const dir = join(OUT, "social");
  ensureDir(dir);
  ensureDir(join(THUMB_DIR, "social"));

  const KANAL = {
    facebook: "Facebook",
    instagram: "Instagram",
    linkedin: "LinkedIn",
    youtube: "YouTube",
    messenger: "Messenger",
    profil: "Profil & Kanal",
    zitate: "Zitate & Fakten",
  };

  let i = 0;
  for (const file of files) {
    const rel = file.slice(src.length + 1); // z. B. "zitate/1x1/WMDG-Zitat-01.png"
    const kanalKey = rel.split("/")[0];
    const kanal = KANAL[kanalKey] ?? prettifyName(kanalKey);
    const id = `social-${String(++i).padStart(3, "0")}`;

    const fullName = `${id}.webp`;
    const thumbName = `${id}.webp`;
    await sharp(file)
      .resize({ width: FULL_WIDTH, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(join(dir, fullName));
    await sharp(file)
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .webp({ quality: 72 })
      .toFile(join(THUMB_DIR, "social", thumbName));

    assets.push({
      kategorie: "social",
      titel: prettifyName(basename(file)),
      unterKategorie: kanal,
      kind: "image",
      thumb: `/admin/vorlagen/datei/thumbs/social/${thumbName}`,
      href: `/admin/vorlagen/datei/social/${fullName}`,
    });
  }
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

  let i = 0;
  for (const file of files) {
    const rel = file.slice(src.length + 1); // "stufen/reel-9x16/cover-03.png"
    const bereich = rel.split("/")[0];
    const nr = basename(file).replace(/[^0-9]/g, "");
    const id = `reel-${bereich}-${nr}`;

    const fullName = `${id}.webp`;
    await sharp(file)
      .resize({ width: 1080, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(join(dir, fullName));
    await sharp(file)
      .resize({ width: 420, withoutEnlargement: true })
      .webp({ quality: 70 })
      .toFile(join(THUMB_DIR, "reels", fullName));

    assets.push({
      kategorie: "reels",
      titel: `${prettifyLabel(bereich)} · Cover ${nr}`,
      unterKategorie: prettifyLabel(bereich),
      kind: "image",
      thumb: `/admin/vorlagen/datei/thumbs/reels/${fullName}`,
      href: `/admin/vorlagen/datei/reels/${fullName}`,
    });
  }
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

  let count = 0;
  // Struktur: export/<serie>/<slug>/<format>/slide-NN.png
  // Nur die Studio-Serien (SERIE) verarbeiten – Marketing-Serien liegen im
  // selben export/ mit anderer Struktur (<key>/<format>/) und gehören nicht
  // in die Admin-Carousel-Galerie.
  for (const serie of readdirSync(src, { withFileTypes: true })) {
    if (!serie.isDirectory()) continue;
    if (!SERIE[serie.name]) continue;
    const serieDir = join(src, serie.name);
    for (const carousel of readdirSync(serieDir, { withFileTypes: true })) {
      if (!carousel.isDirectory()) continue;
      const cDir = join(serieDir, carousel.name);
      // Seit der Format-Erweiterung liegen die Slides unter <slug>/<format>/.
      // Vorschau immer 4:5; das Download-ZIP enthält alle vorhandenen Formate.
      const FMT_ORDER = ["feed-4x5", "feed-1x1", "reel-9x16"];
      const formats = FMT_ORDER.filter((f) => existsSync(join(cDir, f)));
      const flat = formats.length === 0; // alte flache Struktur
      const previewRoot = flat
        ? cDir
        : join(cDir, formats.includes("feed-4x5") ? "feed-4x5" : formats[0]);
      const slides = collect(previewRoot, [".png"]);
      if (slides.length === 0) continue;

      const id = `${serie.name}__${carousel.name}`;
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
          .webp({ quality: 76 })
          .toFile(join(slideDir, name));
        slidePaths.push(`/admin/vorlagen/datei/carousels/${id}/${name}`);
      }

      // Download-Inhalt: alle vorhandenen Formate als webp@1080, je in eigenem Ordner.
      const zipFormats = flat
        ? [{ key: "feed-4x5", root: cDir }]
        : formats.map((f) => ({ key: f, root: join(cDir, f) }));
      for (const zf of zipFormats) {
        const fslides = collect(zf.root, [".png"]);
        const fdir = join(tmp, zf.key);
        ensureDir(fdir);
        let m = 0;
        for (const slide of fslides) {
          m++;
          await sharp(slide)
            .resize({ width: 1080, withoutEnlargement: true })
            .webp({ quality: 80 })
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

      assets.push({
        kategorie: "carousel",
        titel: prettifyName(carousel.name),
        unterKategorie: SERIE[serie.name] ?? prettifyLabel(serie.name),
        kind: "carousel",
        slides: slides.length,
        sizeMB: Number((statSync(zipPath).size / 1024 / 1024).toFixed(1)),
        thumb: slidePaths[0],
        slidePaths,
        href: `/admin/vorlagen/datei/carousels/${zipName}`,
      });
      count++;
    }
  }

  // Temp-Ordner entfernen – nur ZIPs bleiben.
  if (existsSync(tmpRoot)) rmSync(tmpRoot, { recursive: true, force: true });
  return count;
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
  const header = `/**
 * AUTO-GENERIERT von tools/vorlagen/build-gallery.mjs – NICHT von Hand ändern.
 * Neu erzeugen mit:  npm run vorlagen:galerie
 *
 * Liste aller Vorlagen-Dateien, die unter content/vorlagen/ liegen und über
 * die Route /admin/vorlagen/datei/… (nur für Admins) ausgeliefert werden
 * und im Dashboard (/admin/vorlagen) als Galerie erscheinen.
 */

export type VorlagenAsset = {
  kategorie: "social" | "reels" | "carousel" | "workshop";
  titel: string;
  unterKategorie: string;
  kind: "image" | "file" | "carousel";
  /** Nur bei kind === "image" | "carousel": kleines Vorschaubild (Cover). */
  thumb?: string;
  /** Download-/Ansehen-Link (Route /admin/vorlagen/datei/…, nur für Admins). */
  href: string;
  /** Nur bei kind === "file". */
  format?: string;
  /** Nur bei kind === "carousel": Anzahl der Slides. */
  slides?: number;
  /** Nur bei kind === "carousel": Pfade aller Slide-Vorschaubilder in Reihenfolge. */
  slidePaths?: string[];
  sizeMB?: number;
};

export const vorlagenAssets: VorlagenAsset[] = ${JSON.stringify(
    assets,
    null,
    2,
  )};
`;
  writeFileSync(path, header);
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
  console.log(`✓ Carousels (als ZIP): ${carousels}`);
  const workshop = buildWorkshop();
  console.log(`✓ Workshop-Dateien: ${workshop}`);

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
