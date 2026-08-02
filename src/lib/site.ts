/**
 * Zentrale Seiten-Konfiguration.
 * Alle mit «TODO» markierten Felder bitte mit echten Daten befüllen
 * (Kontakt, Social-Links, rechtliche Angaben).
 */

export const site = {
  name: "Werde Meister deiner Gedanken",
  shortName: "WMDG",
  tagline: "Bewusstseinsentwicklung in 7 Stufen",
  description:
    "Dein Bewusstsein ist der Schlüssel, deine Gedanken sind der Code. Durchlaufe die 7 Stufen der Bewusstseinsentwicklung und werde zum Meister deiner Gedanken.",
  url: "https://www.werdemeisterdeinergedanken.de",
  author: "Heiko Schwaninger",
  email: "info@werdemeisterdeinergedanken.de", // offizielle Kontaktadresse
  // Nur echte Profile eintragen (leere/Platzhalter weglassen, sonst tote Links).
  social: {
    instagram: "https://www.instagram.com/werde.meister.deiner.gedanken/",
    youtube: "https://www.youtube.com/@WerdeMeisterdeinerGedanken",
    facebook: "https://www.facebook.com/werde.meister.deiner.gedanken.2024/",
    linkedin: "https://www.linkedin.com/in/werdemeisterdeinergedanken/",
    // TODO: echte URLs ergänzen, dann werden die Icons automatisch angezeigt:
    // telegram: "https://t.me/…",
  },
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Die 7 Stufen", href: "/die-7-stufen" },
  { label: "Mitgliedschaft", href: "/mitgliedschaft" },
  { label: "Bewusstseinstest", href: "/bewusstseinstest" },
  { label: "Über mich", href: "/ueber-mich" },
  { label: "Blog", href: "/blog" },
];

export const legalNav: NavItem[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];
