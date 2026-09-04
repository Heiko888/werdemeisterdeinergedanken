// Erzeugt aus dem (bereits freigestellten, transparenten) Schneeleopard-Foto
// ein leichtes, transparentes WebP für das "Krafttier & Symbol"-Band im Footer.
//
// Aufruf:
//   node tools/images/schneeleopard-webp.mjs [quelle] [ziel]
//
// Standard:
//   Quelle: public/schneeleopard.png   (Original, 3000x3000, RGBA, ~11 MB)
//   Ziel:   public/schneeleopard.webp  (zugeschnitten + verkleinert, wird vom Footer geladen)
//
// Das Quellbild hat bereits einen transparenten Hintergrund – daher kein
// Freistellen nötig. Wir schneiden nur den transparenten Rand weg (trim),
// verkleinern auf eine sinnvolle Icon-Größe und exportieren ein kompaktes WebP.

import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..", "..");

const srcArg = process.argv[2] ?? "public/schneeleopard.png";
const outArg = process.argv[3] ?? "public/schneeleopard.webp";
const srcPath = path.resolve(repoRoot, srcArg);
const outPath = path.resolve(repoRoot, outArg);

// Maximale Kantenlänge des Ergebnisses (das Footer-Icon wird mit ~64–80 px
// dargestellt; 720 px liefert genug Reserve für Retina, bleibt aber leicht).
const MAX_EDGE = 720;

const info = await sharp(srcPath)
  // Transparenten Rand entfernen, damit das Motiv den Rahmen füllt.
  .trim({ threshold: 10 })
  .resize({
    width: MAX_EDGE,
    height: MAX_EDGE,
    fit: "inside",
    withoutEnlargement: true,
  })
  .webp({ quality: 82, effort: 6, alphaQuality: 90 })
  .toFile(outPath);

console.log(
  `OK  ${outArg}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`,
);
