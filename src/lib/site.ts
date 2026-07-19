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
  email: "heiko.schwaninger@gmail.com", // TODO: ggf. offizielle Business-Adresse
  // TODO: echte Profile eintragen
  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/Heiko.SPunkt",
    youtube: "https://www.youtube.com/",
    linkedin: "https://de.linkedin.com/in/werdemeisterdeinergedanken",
    telegram: "https://t.me/",
  },
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Die 7 Stufen", href: "/die-7-stufen" },
  { label: "Über mich", href: "/ueber-mich" },
  { label: "Angebot", href: "/#angebot" },
  { label: "Stimmen", href: "/#stimmen" },
  { label: "Kontakt", href: "/kontakt" },
];

export const legalNav: NavItem[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];
