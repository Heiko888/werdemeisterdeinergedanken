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
  // Basis: ruhiges Anthrazit (PR #192 – „cinematisch, ruhig" statt „kosmisch").
  navy950: "#090b10",
  navy900: "#0f1218",
  navy850: "#141821",
  navy800: "#1b202b",
  paper: "#f6f4ee",
  surface: "#ffffff",
  ink: "#16231f",
  inkSoft: "#48524e",
  inkMid: "#565f5b",
  inkMuted: "#626b67",
  cream: "#f4f2ec",
  creamDim: "#d8d9d2",
  slate: "#9aa7b8", // gedämpftes Hell für Labels auf Dunkel
  // Gold – tragende Markenfarbe (Logo-Schriftzug). gold-300/400 leuchten auf
  // Dunkel; gold-600 = Antikgold für Feinlinien auf Hell; gold-700 = AA-Text/
  // -Links auf Hell (≥4,5:1 auf paper/surface).
  gold300: "#f2d489",
  gold400: "#e8c15f",
  gold500: "#d9a93a",
  gold600: "#a8842a",
  gold700: "#7e6410",
  // Teal weiterhin für die E-Mail-Signatur (dort bewusst Teal-Akzent).
  leaf: "#8cc63f",
  leafBright: "#a3d64f",
  teal: "#34c4c4",
  teal300: "#5fd6d2",
  tealAA: "#0f6d77",
  greenAA: "#3a7615",
};
