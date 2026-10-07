/**
 * Node-Resolve-Hook für Skripte, die Projektcode aus src/ direkt laden:
 * - "@/…" → src/…  (wie der Pfad-Alias in tsconfig.json)
 * - fehlende Endung → .ts / .tsx / /index.ts ergänzen
 *
 * Nur für Werkzeug-Skripte (z. B. begleiter-probelauf.mjs), nicht für die App.
 */
import { existsSync, statSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../src");

function mitEndung(basis) {
  if (existsSync(basis) && statSync(basis).isFile()) return basis;
  for (const ext of [".ts", ".tsx", ".js", ".mjs"]) {
    if (existsSync(basis + ext)) return basis + ext;
  }
  for (const idx of ["index.ts", "index.tsx", "index.js"]) {
    const p = path.join(basis, idx);
    if (existsSync(p)) return p;
  }
  return null;
}

export async function resolve(specifier, context, next) {
  if (specifier.startsWith("@/")) {
    const datei = mitEndung(path.join(SRC, specifier.slice(2)));
    if (datei) return next(pathToFileURL(datei).href, context);
  }
  if (
    (specifier.startsWith("./") || specifier.startsWith("../")) &&
    context.parentURL?.startsWith("file:") &&
    !path.extname(specifier)
  ) {
    const basis = path.resolve(
      path.dirname(fileURLToPath(context.parentURL)),
      specifier,
    );
    const datei = mitEndung(basis);
    if (datei) return next(pathToFileURL(datei).href, context);
  }
  return next(specifier, context);
}
