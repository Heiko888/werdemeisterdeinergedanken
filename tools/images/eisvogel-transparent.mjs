// Stellt den goldenen Eisvogel frei (weißer Hintergrund -> transparent) und
// exportiert ihn als transparentes WebP für das "Krafttier & Symbol"-Band im
// Footer.
//
// Aufruf:
//   node tools/images/eisvogel-transparent.mjs [quelle] [ziel]
//
// Standard:
//   Quelle: tools/images/eisvogel-gold-source.png  (Original mit weißem Hintergrund)
//   Ziel:   public/eisvogel-gold.webp        (freigestellt, wird vom Footer geladen)
//
// Warum Flood-Fill statt simpler Schwelle: So wird nur der zusammenhängende
// weiße Hintergrund am Rand entfernt. Weiße/cremefarbene Stellen INNERHALB des
// Vogels (z. B. der helle Wangen-/Halsfleck) bleiben erhalten – keine Löcher.

import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..", "..");

const srcArg = process.argv[2] ?? "tools/images/eisvogel-gold-source.png";
const outArg = process.argv[3] ?? "public/eisvogel-gold.webp";
const srcPath = path.resolve(repoRoot, srcArg);
const outPath = path.resolve(repoRoot, outArg);

// Ab diesem "Weiß-Wert" (min(r,g,b)) gilt ein Pixel als Hintergrund-Kandidat.
const BG_MIN = 240; // reines Weiß/Fast-Weiß
// Weiche Kante: zwischen EDGE_LO und BG_MIN wird die Deckkraft linear
// hochgezogen, damit die Silhouette nicht ausgefranst/hart wirkt.
const EDGE_LO = 224;

async function main() {
  const input = sharp(srcPath).ensureAlpha();
  const { data, info } = await input
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const idx = (x, y) => (y * width + x) * channels;
  const whiteness = (i) => Math.min(data[i], data[i + 1], data[i + 2]);

  // 1) Flood-Fill vom Rand über zusammenhängende (fast-)weiße Pixel.
  const isBg = new Uint8Array(width * height);
  const stack = [];
  const pushIfWhite = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = y * width + x;
    if (isBg[p]) return;
    if (whiteness(idx(x, y)) >= BG_MIN) {
      isBg[p] = 1;
      stack.push(x, y);
    }
  };
  for (let x = 0; x < width; x++) {
    pushIfWhite(x, 0);
    pushIfWhite(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    pushIfWhite(0, y);
    pushIfWhite(width - 1, y);
  }
  while (stack.length) {
    const y = stack.pop();
    const x = stack.pop();
    pushIfWhite(x + 1, y);
    pushIfWhite(x - 1, y);
    pushIfWhite(x, y + 1);
    pushIfWhite(x, y - 1);
  }

  // 2) Hintergrund transparent setzen. Weiche Kante NUR an Vordergrund-Pixeln,
  //    die direkt an den Hintergrund grenzen – so bleiben helle/weiße Flächen
  //    im Inneren des Vogels voll deckend (keine Löcher).
  const touchesBg = (x, y) => {
    if (x > 0 && isBg[y * width + (x - 1)]) return true;
    if (x < width - 1 && isBg[y * width + (x + 1)]) return true;
    if (y > 0 && isBg[(y - 1) * width + x]) return true;
    if (y < height - 1 && isBg[(y + 1) * width + x]) return true;
    return false;
  };
  let removed = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const p = y * width + x;
      const a = p * channels + 3;
      if (isBg[p]) {
        data[a] = 0;
        removed++;
        continue;
      }
      // Nur echte Silhouetten-Randpixel weich ausblenden.
      const w = whiteness(p * channels);
      if (w > EDGE_LO && touchesBg(x, y)) {
        const t = Math.min((w - EDGE_LO) / (BG_MIN - EDGE_LO), 1); // 0..1
        data[a] = Math.round(data[a] * (1 - t));
      }
    }
  }

  const pct = ((removed / (width * height)) * 100).toFixed(1);
  console.log(`Quelle: ${srcArg} (${width}x${height})`);
  console.log(`Hintergrund entfernt: ${removed} px (${pct}%)`);

  // 3) Auf den sichtbaren Inhalt zuschneiden, moderat verkleinern, WebP mit Alpha.
  await sharp(data, { raw: { width, height, channels } })
    .trim() // transparente Ränder wegschneiden
    .resize({ width: 640, withoutEnlargement: true })
    .webp({ quality: 90, alphaQuality: 100, effort: 6 })
    .toFile(outPath);

  console.log(`Fertig -> ${outArg}`);
}

main().catch((err) => {
  console.error("Fehler:", err.message);
  process.exit(1);
});
