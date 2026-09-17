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
  // Wechselnde Berg-/Sonnenaufgang-Hintergründe (für Abwechslung im Feed).
  // Index 0 = Original-Bergmotiv, 1–6 = zusätzliche Panoramen (unter quellen/hintergruende).
  backdrops: [
    dataUri(path.join(pub, "hero-bg-berge.webp"), "image/webp"),
    ...["berg-01", "berg-02", "berg-03", "berg-04", "berg-05", "berg-06"].map((n) =>
      dataUri(path.join(__dirname, "quellen/hintergruende", n + ".png"), "image/png")),
  ],
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
    // Mini-Serie „Muster & Vermeidung"
    kopfkratzen: dataUri(path.join(__dirname, "quellen/heiko-pose-kopfkratzen.png"), "image/png"),
    augenZu: dataUri(path.join(__dirname, "quellen/heiko-pose-augen-zu.png"), "image/png"),
    ohrenZu: dataUri(path.join(__dirname, "quellen/heiko-pose-ohren-zu.png"), "image/png"),
    mundZu: dataUri(path.join(__dirname, "quellen/heiko-pose-mund-zu.png"), "image/png"),
    schulterzucken: dataUri(path.join(__dirname, "quellen/heiko-pose-schulterzucken.png"), "image/png"),
    // Serie „Klartext & Entscheidung" + E-Book
    fingerhoch: dataUri(path.join(__dirname, "quellen/heiko-pose-fingerhoch.png"), "image/png"),
    zeigen: dataUri(path.join(__dirname, "quellen/heiko-pose-zeigen.png"), "image/png"),
    stopp: dataUri(path.join(__dirname, "quellen/heiko-pose-stopp.png"), "image/png"),
    handBrust: dataUri(path.join(__dirname, "quellen/heiko-pose-hand-brust.png"), "image/png"),
    punkt: dataUri(path.join(__dirname, "quellen/heiko-pose-punkt.png"), "image/png"),
    ebook: dataUri(path.join(__dirname, "quellen/heiko-pose-ebook.png"), "image/png"),
    // Serie „Einladung & Reflexion"
    kinn: dataUri(path.join(__dirname, "quellen/heiko-pose-kinn.png"), "image/png"),
    offeneHand: dataUri(path.join(__dirname, "quellen/heiko-pose-offenehand.png"), "image/png"),
    handHerz: dataUri(path.join(__dirname, "quellen/heiko-pose-hand-herz.png"), "image/png"),
    ansprache: dataUri(path.join(__dirname, "quellen/heiko-pose-ansprache.png"), "image/png"),
    offeneHand2: dataUri(path.join(__dirname, "quellen/heiko-pose-offenehand2.png"), "image/png"),
    // Story „Papa, kannste mal erklären?" (2 Personen: Papa + Kind)
    papaTaschen: dataUri(path.join(__dirname, "quellen/heiko-pose-papa-taschen.png"), "image/png"),
    kindRucksack: dataUri(path.join(__dirname, "quellen/kind-pose-rucksack.png"), "image/png"),
  },
};
