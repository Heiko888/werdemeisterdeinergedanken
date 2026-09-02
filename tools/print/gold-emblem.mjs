/**
 * Optimiertes goldenes Emblem für Word & E-Mail-Signatur.
 *
 *   node tools/print/gold-emblem.mjs      (oder: npm run gold-emblem)
 *
 * Quelle ist das **echte** goldene Logo-Emblem `public/logo-brain-gold.png`
 * (freigestellt, transparenter Hintergrund). Dieses Skript erzeugt daraus die
 * kleine, optimierte Variante fürs Einbetten:
 *   public/email/wmdg-signatur-logo.png  (240 px)
 *
 * Hinweis: Früher wurde das Emblem per CSS-Filter aus dem cyan-blauen Gehirn
 * „vergoldet". Seit dem echten Gold-Logo entfällt das – logo-brain-gold.png ist
 * das versionierte Original.
 */
import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const src = join(ROOT, "public/logo-brain-gold.png");
if (!existsSync(src)) throw new Error("public/logo-brain-gold.png fehlt (echtes Gold-Emblem).");

const require = createRequire(import.meta.url);
const sharp = require("sharp");
await sharp(src).resize(240, 240, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 }).toFile(join(ROOT, "public/email/wmdg-signatur-logo.png"));
console.log("✓ public/email/wmdg-signatur-logo.png (240 px, aus logo-brain-gold.png)");
