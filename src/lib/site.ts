/**
 * Zentrale Seiten-Konfiguration.
 * Alle mit «TODO» markierten Felder bitte mit echten Daten befüllen
 * (Kontakt, Social-Links, rechtliche Angaben).
 */

import { MITGLIEDSCHAFT_AKTIV } from "./membership-launch";
import { KUENDIGUNG_BUTTON, KUENDIGUNG_HREF } from "./kuendigung";

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
  // Hier die echte YouTube-ID des «Ein anderer Blickwinkel»-Videos eintragen
  // (der Teil hinter youtu.be/… bzw. hinter v=). Solange sie null ist, läuft
  // das globale Platzhalter-Video (placeholderVideoId) – dann aber mit dem
  // gebrandeten Marken-Thumbnail (public/video-thumbnails/landing/…, erzeugt
  // von docs/marketing/video-thumbnails.mjs) statt dessen unpassendem YouTube-
  // Vorschaubild. Sobald hier eine echte ID steht, greift automatisch deren
  // eigenes Thumbnail (siehe MaybeNotYou-Sektion).
  videoMessage: {
    youtubeId: "rAfmZMtpOIc" as string | null,
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
  { label: "Das Buch", href: "/buch" },
  { label: "Mitgliedschaft", href: "/mitgliedschaft" },
  { label: "Bewusstseinstest", href: "/bewusstseinstest" },
  { label: "Über mich", href: "/ueber-mich" },
  { label: "Blog", href: "/blog" },
];

// „Vertrag hier widerrufen“: Widerrufsfunktion (src/lib/widerruf.ts) – muss
// dauerhaft und ohne Login erreichbar sein, deshalb fest im Footer.
// „Verträge hier kündigen“: Kündigungsbutton nach § 312k BGB
// (src/lib/kuendigung.ts) – erscheint, sobald die Mitgliedschaft buchbar ist.
export const legalNav: NavItem[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "Vertrag hier widerrufen", href: "/widerruf" },
  ...(MITGLIEDSCHAFT_AKTIV ? [{ label: KUENDIGUNG_BUTTON, href: KUENDIGUNG_HREF }] : []),
];
