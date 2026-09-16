// Lädt Schriften & Bilder aus dem Repo und liefert sie als base64-Data-URIs,
// damit die gerenderten HTML-Seiten voll eigenständig sind (keine externen Pfade).
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..", "..");
const fontsDir = path.join(ROOT, "src", "app", "fonts");
const pub = path.join(ROOT, "public");

function dataUri(file, mime) {
  return `data:${mime};base64,` + fs.readFileSync(file).toString("base64");
}

module.exports = {
  ROOT,
  // Schriften (self-hosted, OFL – siehe src/app/fonts/*-OFL.txt)
  inter: dataUri(path.join(fontsDir, "Inter-latin-variable.woff2"), "font/woff2"),
  fraunces: dataUri(path.join(fontsDir, "Fraunces-latin-variable.woff2"), "font/woff2"),
  frauncesI: dataUri(path.join(fontsDir, "Fraunces-latin-italic-variable.woff2"), "font/woff2"),
  // Motive
  berge: dataUri(path.join(pub, "hero-bg-berge.webp"), "image/webp"),
  logo: dataUri(path.join(pub, "logo-brain-gold-freigestellt.png"), "image/png"),
  portrait: dataUri(path.join(pub, "heiko-hero.webp"), "image/webp"),
  // Freigestellte Ganzkörper-Posen (transparent). Liegen als Build-Inputs unter
  // tools/.../quellen – NICHT unter public/, damit sie nicht mitdeployt werden.
  posen: {
    stehend: dataUri(path.join(__dirname, "quellen/heiko-pose-stehend.png"), "image/png"),
    portrait34: dataUri(path.join(__dirname, "quellen/heiko-pose-portrait34.png"), "image/png"),
    faust: dataUri(path.join(__dirname, "quellen/heiko-pose-faust.png"), "image/png"),
    nachdenken: dataUri(path.join(__dirname, "quellen/heiko-pose-nachdenken.png"), "image/png"),
    taschen: dataUri(path.join(__dirname, "quellen/heiko-pose-taschen.png"), "image/png"),
  },
};
