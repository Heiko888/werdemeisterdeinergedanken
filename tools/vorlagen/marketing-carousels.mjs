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

/** Format-Metadaten (Label + Pixelmaße) für die Card-Beschriftung. */
export const FORMAT_META = {
  "feed-4x5": { label: "4:5", w: 1080, h: 1350 },
  "feed-1x1": { label: "1:1", w: 1080, h: 1080 },
  "reel-9x16": { label: "9:16", w: 1080, h: 1920 },
};
const FORMAT_ORDER = ["feed-4x5", "feed-1x1", "reel-9x16"];

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
  mitgliederbereich: "mitgliederbereich.md",
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
 * Captions der 7-Stufen-Reels → { "01".."07": [{ label, titel, text }, …] }.
 * Pro Stufe existiert nur EIN Cover, aber drei Reel-Varianten (A/B/C) – jede
 * Variante bleibt ein eigener, einzeln kopierbarer Eintrag.
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
    const varianten = [];
    for (const v of stage.split(/\n### /).slice(1)) {
      const vh = v.split("\n", 1)[0]; // z. B. Variante A — „Läuft das automatisch?"
      const label = vh.match(/^(Variante\s+[A-C])/)?.[1] ?? "Variante";
      const titel = vh.match(/[„“"]([^„“"]+)[”“"]/)?.[1] ?? "";
      const capM = v.match(/\*\*Caption:\*\*\s*([\s\S]*?)(?:\n\n|\n---|$)/);
      if (capM) {
        varianten.push({
          label,
          ...(titel ? { titel } : {}),
          text: capM[1].trim().replace(/\s+/g, " "),
        });
      }
    }
    if (varianten.length) out[nr[1].padStart(2, "0")] = varianten;
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
      const varianten = m && reelStufen[m[1].padStart(2, "0")];
      if (varianten) {
        a.captions = varianten;
        delete a.caption; // evtl. alte kombinierte Einzel-Caption entfernen
      }
    }
  }
  return assets;
}

/**
 * Verfügbare Formate je Carousel aus dem committeten Download-ZIP ableiten
 * (Ordnernamen feed-4x5/feed-1x1/reel-9x16) und als `formate` an die Einträge
 * hängen. So stimmt die Card-Beschriftung auch ohne frischen Voll-Build.
 */
export function backfillFormate(OUT, assets) {
  for (const a of assets) {
    if (a.kind !== "carousel") continue;
    const m = String(a.href || "").match(/\/carousels\/([^/]+)\.zip$/);
    if (!m) continue;
    const zip = join(OUT, "carousels", `${m[1]}.zip`);
    if (!existsSync(zip)) continue;
    const res = spawnSync("unzip", ["-Z1", zip], { encoding: "utf8" });
    if (res.status !== 0 || !res.stdout) continue;
    const dirs = new Set(
      res.stdout.split("\n").map((l) => l.split("/")[0].trim()),
    );
    const formate = FORMAT_ORDER.filter((k) => dirs.has(k)).map(
      (k) => FORMAT_META[k],
    );
    if (formate.length) a.formate = formate;
  }
  return assets;
}

/** Seitenverhältnis-Label aus Pixelmaßen (1080×1350 → „4:5").
 *  Bekannte Zielformate werden mit 2 % Toleranz „eingeschnappt", damit eine
 *  ±1px-Abweichung (z. B. 1081×1350) nicht zu einem leeren oder unsinnigen
 *  Label führt. Nur wirklich krumme Verhältnisse (Teil > 20) liefern "" –
 *  dann zählen im Dashboard nur die Pixelmaße. */
export function ratioLabel(w, h) {
  if (!w || !h) return "";
  const r = w / h;
  const KNOWN = [
    [1, 1], [4, 5], [5, 4], [9, 16], [16, 9],
    [2, 3], [3, 2], [3, 4], [4, 3], [4, 1],
  ];
  for (const [rw, rh] of KNOWN) {
    if (Math.abs(r - rw / rh) / (rw / rh) <= 0.02) return `${rw}:${rh}`;
  }
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const d = gcd(w, h) || 1;
  const rw = w / d, rh = h / d;
  return Math.max(rw, rh) > 20 ? "" : `${rw}:${rh}`;
}

/**
 * Pixelmaße + Seitenverhältnis an alle Bild-Grafiken (kind === "image") hängen.
 * Liest die Maße aus der ausgelieferten Datei unter content/vorlagen/, sodass
 * die Card-Angabe zum tatsächlichen Download passt.
 */
export async function backfillMasse(OUT, assets) {
  for (const a of assets) {
    if (a.kind !== "image") continue;
    const rel = String(a.href || "").replace(/^\/admin\/vorlagen\/datei\//, "");
    const file = join(OUT, rel);
    if (!rel || !existsSync(file)) continue;
    try {
      const md = await sharp(file).metadata();
      if (md.width && md.height) {
        a.masse = { label: ratioLabel(md.width, md.height), w: md.width, h: md.height };
      }
    } catch {
      /* Datei nicht lesbar – überspringen */
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
        .sharpen({ sigma: 0.7 })
        .webp({ quality: 82, effort: 6, smartSubsample: true })
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
          .webp({ quality: 88, effort: 6, smartSubsample: true })
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
      formate: formats.map((f) => FORMAT_META[f]).filter(Boolean),
      ...(captions[key] ? { caption: captions[key] } : {}),
    });
    count++;
  }

  if (existsSync(tmpRoot)) rmSync(tmpRoot, { recursive: true, force: true });
  return count;
}

/** Vollständigen Katalog-Text (src/lib/vorlagen-assets.ts) erzeugen. */
export function renderManifest(assets) {
  // Der Katalog wird in getypte Teil-Arrays aufgeteilt und per Spread wieder
  // zusammengesetzt. Grund: Ein einzelnes Array-Literal mit sehr vielen (>1000)
  // Objekt-Literalen sprengt beim `next build`/`tsc` die TypeScript-Grenze
  // „Expression produces a union type that is too complex to represent". In
  // kleinere, jeweils als `VorlagenAsset[]` annotierte Blöcke zerlegt bleibt
  // jeder Block darstellbar; das finale Export-Array ist nur noch ein Spread
  // getypter Arrays (kein großes Objekt-Literal mehr).
  const CHUNK = 250;
  const chunks = [];
  for (let i = 0; i < assets.length; i += CHUNK) {
    chunks.push(assets.slice(i, i + CHUNK));
  }
  if (chunks.length === 0) chunks.push([]);
  const chunkConsts = chunks
    .map(
      (c, i) => `const vorlagenAssets${i}: VorlagenAsset[] = ${JSON.stringify(c, null, 2)};`,
    )
    .join("\n\n");
  const spread = chunks.map((_, i) => `  ...vorlagenAssets${i},`).join("\n");
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
  /** Fertige Post-Caption zum Kopieren (Marketing- & Studio-Carousels). */
  caption?: string;
  /** Mehrere einzeln kopierbare Captions (z. B. Reel-Varianten A/B/C je Stufe). */
  captions?: { label: string; titel?: string; text: string }[];
  /** Nur bei kind === "carousel": enthaltene Formate (Label + Pixelmaße). */
  formate?: { label: string; w: number; h: number }[];
  /** Nur bei kind === "image": Pixelmaße + Seitenverhältnis der Grafik. */
  masse?: { label: string; w: number; h: number };
  /** Optionaler Zusatz-Download, z. B. Reel-Cover als ZIP mit allen Formaten. */
  zipHref?: string;
  sizeMB?: number;
};

${chunkConsts}

export const vorlagenAssets: VorlagenAsset[] = [
${spread}
];
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
  backfillFormate(OUT, assets);
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
