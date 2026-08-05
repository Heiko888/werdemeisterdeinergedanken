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
  // Persönliche Videobotschaft – datenschutzfreundlich über youtube-nocookie
  // eingebettet (siehe CSP frame-src in next.config.ts).
  videoMessage: {
    youtubeId: "gOvtKBnqGvk",
    title: "Videobotschaft: Ein anderer Blickwinkel",
  },
  // Platzhalter-Video, das vorerst überall dort erscheint, wo noch kein
  // eigenes Video produziert wurde (Stufen, Vertiefungen, Praxis …). Sobald
  // ein Einzelvideo eingetragen ist, ersetzt es den Platzhalter automatisch.
  // Auf null setzen, um die Platzhalter global zu entfernen (dann erscheint
  // wieder der «folgt in Kürze»-Hinweis).
  placeholderVideoId: "gOvtKBnqGvk" as string | null,
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
  { label: "Wissen", href: "/wissen" },
  { label: "Über mich", href: "/ueber-mich" },
  { label: "Blog", href: "/blog" },
];

export const legalNav: NavItem[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];
