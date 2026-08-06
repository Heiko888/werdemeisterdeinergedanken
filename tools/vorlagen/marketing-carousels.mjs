/**
 * Marketing-Carousels für die Admin-Vorlagen-Galerie (/admin/vorlagen).
 * ---------------------------------------------------------------------
 * Die gebrandeten Funnel-Carousels aus docs/carousels/marketing-serien.mjs
 * liegen – anders als die Studio-Serien – unter
 *   docs/carousels/export/<key>/<format>/slide-NN.png
 * (eine Ebene flacher). build-gallery.mjs überspringt sie deshalb bewusst.
 *
 * Dieses Modul stellt die passende Verarbeitung bereit und wird an zwei
 * Stellen genutzt:
 *   1. build-gallery.mjs importiert `buildMarketingCarousels` und nimmt die
 *      Marketing-Carousels beim vollständigen Galerie-Build mit auf.
 *   2. Direkt ausgeführt (`node tools/vorlagen/marketing-carousels.mjs`)
 *      trägt es die Marketing-Carousels NON-DESTRUKTIV in den bestehenden
 *      Katalog ein – ohne content/vorlagen/ komplett neu zu bauen. Das ist
 *      nützlich, wenn nicht alle Quell-Exporte lokal vorliegen.
 *
 * Die Post-Captions werden aus docs/skripte/carousels/marketing.md gelesen,
 * damit sie nur an einer Stelle gepflegt werden müssen.
 */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const THUMB_WIDTH = 640;

/** Reihenfolge & Anzeigetitel der Marketing-Serien (key → Titel). */
export const MARKETING_TITEL = {
  "60000-gedanken": "Bis zu 60.000 Gedanken am Tag",
  "4-wege-freiheit": "4 Wege zur mentalen Freiheit",
  "wer-denkt-hier": "Wer denkt hier eigentlich?",
  "studien-fakten": "Studien-Fakten",
  "gratis-ebook": "Gratis-E-Book",
};

const UNTER_KATEGORIE = "Marketing / Funnel";

/** Captions je Serien-Key aus docs/skripte/carousels/marketing.md lesen. */
export function readMarketingCaptions() {
  const md = join(ROOT, "docs", "skripte", "carousels", "marketing.md");
  if (!existsSync(md)) return {};
  const text = readFileSync(md, "utf8");
  const caps = {};
  for (const block of text.split(/\n## /).slice(1)) {
    const keyM = block.match(/key:\s*`([^`]+)`/);
    const capM = block.match(/\*\*Caption:\*\*\s*([\s\S]*?)(?:\n\n|\n---|$)/);
    if (keyM && capM) caps[keyM[1]] = capM[1].trim().replace(/\s+/g, " ");
  }
  return caps;
}

/** Slug wie im Studio-Carousel-Build (docs/carousels/data.mjs). */
function slugify(s) {
  return s
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/&/g, "und")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Studio-Carousel-Serien → Skript-Datei. */
const STUDIO_SKRIPTE = {
  selbstverteidigung: "selbstverteidigung.md",
  stufen: "stufen.md",
  praxis: "praxis.md",
  vertiefungen: "vertiefungen.md",
};

/**
 * Captions der Studio-Carousels je Serie → { serie: { slug: caption } }.
 * Slug wird – wie im Build – aus dem Heading-Thema abgeleitet
 * (`## 01 · Autopilot — …` → „Autopilot" → „autopilot").
 */
export function readStudioCaptions() {
  const dir = join(ROOT, "docs", "skripte", "carousels");
  const out = {};
  for (const [serie, file] of Object.entries(STUDIO_SKRIPTE)) {
    const path = join(dir, file);
    if (!existsSync(path)) continue;
    const map = {};
    for (const block of readFileSync(path, "utf8").split(/\n## /).slice(1)) {
      const head = block.split("\n", 1)[0];
      const hm = head.match(/^\S+\s*·\s*(.+)$/);
      if (!hm) continue;
      const topic = hm[1].split(/\s+—\s+/)[0].trim();
      const capM = block.match(/\*\*Caption:\*\*\s*([\s\S]*?)(?:\n\n|\n---|$)/);
      if (topic && capM) map[slugify(topic)] = capM[1].trim().replace(/\s+/g, " ");
    }
    out[serie] = map;
  }
  return out;
}

/**
 * Captions der 7-Stufen-Reels → { "01".."07": kombinierter Text }.
 * Pro Stufe existiert nur EIN Cover, aber drei Reel-Varianten (A/B/C) – daher
 * werden die drei Captions je Stufe klar beschriftet zusammengefasst.
 */
export function readStufenReelCaptions() {
  const path = join(ROOT, "docs", "skripte", "reels", "stufen.md");
  if (!existsSync(path)) return {};
  const text = readFileSync(path, "utf8");
  const out = {};
  for (const stage of text.split(/\n## /).slice(1)) {
    const head = stage.split("\n", 1)[0];
    const nr = head.match(/^(\d+)/);
    if (!nr) continue;
    const parts = [];
    for (const v of stage.split(/\n### /).slice(1)) {
      const vh = v.split("\n", 1)[0]; // z. B. Variante A — „Läuft das automatisch?"
      const label = vh.match(/^(Variante\s+[A-C])/)?.[1] ?? "Variante";
      const titel = vh.match(/[„“"]([^„“"]+)[”“"]/)?.[1] ?? "";
      const capM = v.match(/\*\*Caption:\*\*\s*([\s\S]*?)(?:\n\n|\n---|$)/);
      if (capM) {
        const cap = capM[1].trim().replace(/\s+/g, " ");
        parts.push(`${label}${titel ? ` · „${titel}“` : ""}\n${cap}`);
      }
    }
    if (parts.length) out[nr[1].padStart(2, "0")] = parts.join("\n\n");
  }
  return out;
}

/**
 * Captions an bestehende Katalog-Einträge hängen (mutiert `assets`):
 *  - Studio-Carousels  → passende Skript-Caption (per Serie+Slug aus href)
 *  - 7-Stufen-Reel-Cover → kombinierte Stufen-Caption
 * Marketing-Carousels bleiben unberührt (setzen ihre Caption selbst).
 */
export function attachCaptions(assets) {
  const studio = readStudioCaptions();
  const reelStufen = readStufenReelCaptions();
  for (const a of assets) {
    const href = String(a.href || "");
    if (a.kind === "carousel") {
      const m = href.match(/\/carousels\/([a-z0-9]+)__([a-z0-9-]+)\.zip$/);
      if (!m || m[1] === "marketing") continue;
      const cap = studio[m[1]]?.[m[2]];
      if (cap) a.caption = cap;
    } else if (a.kategorie === "reels") {
      const m = href.match(/\/reels\/reel-stufen-(\d+)\.webp$/);
      const cap = m && reelStufen[m[1].padStart(2, "0")];
      if (cap) a.caption = cap;
    }
  }
  return assets;
}

/** Alle PNG-Slides eines Ordners in Reihenfolge (slide-01, slide-02, …). */
function collectPng(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && !e.name.startsWith(".") && /\.png$/i.test(e.name))
    .map((e) => join(dir, e.name))
    .sort();
}

/**
 * Marketing-Carousels rendern (Preview-webp + Voll-ZIP) und als Katalog-
 * Einträge in `assets` einhängen. Liest aus docs/carousels/export/.
 * @returns Anzahl eingefügter Carousels.
 */
export async function buildMarketingCarousels({ OUT, assets }) {
  const src = join(ROOT, "docs", "carousels", "export");
  if (!existsSync(src)) return 0;

  const dir = join(OUT, "carousels");
  mkdirSync(dir, { recursive: true });
  const tmpRoot = join(OUT, ".tmp-marketing");
  const captions = readMarketingCaptions();
  const FMT_ORDER = ["feed-4x5", "feed-1x1", "reel-9x16"];

  let count = 0;
  for (const key of Object.keys(MARKETING_TITEL)) {
    const cDir = join(src, key);
    if (!existsSync(cDir)) continue;
    const formats = FMT_ORDER.filter((f) => existsSync(join(cDir, f)));
    if (formats.length === 0) continue;

    const previewRoot = join(
      cDir,
      formats.includes("feed-4x5") ? "feed-4x5" : formats[0],
    );
    const slides = collectPng(previewRoot);
    if (slides.length === 0) continue;

    const id = `marketing__${key}`;
    const slideDir = join(dir, id);
    mkdirSync(slideDir, { recursive: true });

    // Kleine Preview-webp (4:5) für die Galerie-Karten.
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

    // Download-Inhalt: alle vorhandenen Formate als webp@1080, je eigener Ordner.
    const tmp = join(tmpRoot, id);
    for (const f of formats) {
      const fdir = join(tmp, f);
      mkdirSync(fdir, { recursive: true });
      let m = 0;
      for (const slide of collectPng(join(cDir, f))) {
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
    const res = spawnSync("zip", ["-r", "-q", zipPath, "."], {
      cwd: tmp,
      stdio: "inherit",
    });
    if (res.status !== 0) throw new Error(`zip fehlgeschlagen für ${id}`);

    assets.push({
      kategorie: "carousel",
      titel: MARKETING_TITEL[key],
      unterKategorie: UNTER_KATEGORIE,
      kind: "carousel",
      slides: slides.length,
      sizeMB: Number((statSync(zipPath).size / 1024 / 1024).toFixed(1)),
      thumb: slidePaths[0],
      slidePaths,
      href: `/admin/vorlagen/datei/carousels/${zipName}`,
      ...(captions[key] ? { caption: captions[key] } : {}),
    });
    count++;
  }

  if (existsSync(tmpRoot)) rmSync(tmpRoot, { recursive: true, force: true });
  return count;
}

/** Vollständigen Katalog-Text (src/lib/vorlagen-assets.ts) erzeugen. */
export function renderManifest(assets) {
  return `/**
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
  /** Nur bei Marketing-Carousels: fertige Post-Caption zum Kopieren. */
  caption?: string;
  sizeMB?: number;
};

export const vorlagenAssets: VorlagenAsset[] = ${JSON.stringify(assets, null, 2)};
`;
}

// --- Standalone: additiv & idempotent in bestehenden Katalog eintragen ------

async function applyStandalone() {
  const OUT = join(ROOT, "content", "vorlagen");
  const manifestPath = join(ROOT, "src", "lib", "vorlagen-assets.ts");
  if (!existsSync(manifestPath)) {
    throw new Error("src/lib/vorlagen-assets.ts fehlt – zuerst npm run vorlagen:galerie ausführen.");
  }
  const text = readFileSync(manifestPath, "utf8");
  const m = text.match(/vorlagenAssets: VorlagenAsset\[\] = (\[[\s\S]*\]);\s*$/);
  if (!m) throw new Error("Katalog-Array in vorlagen-assets.ts nicht gefunden.");

  let assets = JSON.parse(m[1]);
  // Idempotent: bestehende Marketing-Einträge entfernen und neu aufbauen.
  assets = assets.filter(
    (a) => !String(a.href || "").includes("/carousels/marketing__"),
  );
  const before = assets.length;
  const n = await buildMarketingCarousels({ OUT, assets });
  attachCaptions(assets);
  const mitCaption = assets.filter((a) => a.caption).length;
  writeFileSync(manifestPath, renderManifest(assets));
  console.log(
    `✓ ${n} Marketing-Carousels eingetragen (Katalog: ${before} → ${assets.length} Einträge)`,
  );
  console.log(`✓ Captions gesetzt: ${mitCaption} Einträge (Marketing + Studio-Carousels + Stufen-Reels)`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  applyStandalone().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
