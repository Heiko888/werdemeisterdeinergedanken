/**
 * Gemeinsame Marken- & Kontaktdaten für die Print-/Signatur-Generatoren.
 * Single Source of Truth für tools/print/* – gespiegelt aus src/lib/site.ts
 * und src/app/impressum/page.tsx.
 */

// ---------- Kontakt- & Markendaten -----------------------------------------
export const CONTACT = {
  name: "Heiko Schwaninger",
  brand: "Werde Meister deiner Gedanken",
  wordmarkTop: "Werde Meister deiner",
  wordmarkBottom: "Gedanken",
  tagline: "Bewusstseinsentwicklung in 7 Stufen",
  role: "Mentaltraining & Bewusstseinsarbeit",
  email: "info@werdemeisterdeinergedanken.de",
  web: "www.werdemeisterdeinergedanken.de",
  webHref: "https://www.werdemeisterdeinergedanken.de",
  instagram: "@werde.meister.deiner.gedanken",
  instagramHref: "https://www.instagram.com/werde.meister.deiner.gedanken/",
  street: "Dompfaffenweg 30",
  city: "63920 Großheubach",
  country: "Deutschland",
  ustId: "DE415501288",
  // Erscheint automatisch auf Karte, Briefbogen & Signatur. Leeren ("")
  // blendet die Telefonzeile wieder aus.
  phone: "+49 173 6537620",
};

// ---------- Farb-Tokens (Spiegel aus globals.css) ---------------------------
export const C = {
  navy900: "#08102a",
  navy950: "#050914",
  paper: "#f6f4ee",
  surface: "#ffffff",
  ink: "#16231f",
  inkSoft: "#48524e",
  inkMid: "#565f5b",
  inkMuted: "#626b67",
  cream: "#f4f2ec",
  leaf: "#8cc63f",
  leafBright: "#a3d64f",
  teal: "#34c4c4",
  tealAA: "#0f6d77", // AA-taugliches Teal für Text auf Hell
  greenAA: "#3a7615", // AA-taugliches Grün für Text auf Hell
};
