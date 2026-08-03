/**
 * Katalog aller „Vorlagen" des Projekts – für die Übersichtsseite unter
 * `/admin/vorlagen`.
 *
 * Hintergrund: Die verschiedenen Vorlagen (PDFs, E-Books, Reel-Cover,
 * Carousels, Social-Grafiken, Drehbücher, Workshop-Folien …) liegen in
 * unterschiedlichen Ordnern und werden über unterschiedliche Befehle erzeugt.
 * Dieses Modul beschreibt sie an EINER Stelle in einfacher Sprache, damit die
 * Verwaltung nicht mehr verwirrt.
 *
 * Bewusst rein statisch (keine Dateisystem-Zugriffe): Die Quell-Ordner wie
 * `docs/` sind nicht Teil des Live-Deployments, und eine Live-Zählung würde das
 * gesamte Projekt unnötig ins Server-Bundle ziehen.
 */

/** Ein einzelner Schritt/Befehl, um eine Vorlage neu zu erzeugen. */
export type VorlagenSchritt = {
  /** Was der Schritt bewirkt. */
  text: string;
  /** Optionaler Terminal-Befehl (Copy-&-Paste). */
  command?: string;
};

export type VorlagenGruppe = {
  key: string;
  /** Name des Icons aus components/ui/Icon (siehe Seite). */
  icon:
    | "Download"
    | "Brain"
    | "Play"
    | "Instagram"
    | "Compass"
    | "Star"
    | "Shield"
    | "Spark";
  titel: string;
  /** Ein bis zwei Sätze in Alltagssprache – wofür ist diese Vorlage da? */
  beschreibung: string;
  /** Ordner, in dem die Vorlagen bzw. ihre Bausteine liegen. */
  ordner: string;
  /** Wo das fertige Ergebnis landet (falls es erzeugt wird). */
  ergebnis?: string;
  /** Konkrete Schritte/Befehle, um die Vorlage neu zu erzeugen. */
  schritte: VorlagenSchritt[];
};

/**
 * Der vollständige Vorlagen-Katalog – die einzige Stelle, an der alle Arten
 * von Vorlagen zusammen beschrieben sind.
 */
export const vorlagenKatalog: VorlagenGruppe[] = [
  {
    key: "pdf",
    icon: "Download",
    titel: "PDF-Dokumente (Mitglieder)",
    beschreibung:
      "Die gestalteten Lektions- und Übungs-PDFs, das Arbeitsheft und die Vertiefungen im Mitgliederbereich. Werden automatisch aus den Texten in der App erzeugt – du musst sie nur neu bauen, wenn sich Inhalte ändern.",
    ordner: "content/pdf/",
    ergebnis: "content/pdf/*.pdf (Download im Mitgliederbereich)",
    schritte: [
      {
        text: "Alle Mitglieder-PDFs auf einmal neu erzeugen",
        command: "npm run pdf",
      },
      { text: "Danach die geänderten PDFs committen." },
    ],
  },
  {
    key: "ebook",
    icon: "Brain",
    titel: "E-Books (Lead-Magnet)",
    beschreibung:
      "Das kostenlose E-Book „Die 7 Stufen – kompakt“, mit dem neue Interessenten in den Newsletter kommen. Die Texte stehen direkt im Generator und werden dort gepflegt.",
    ordner: "docs/ebook/ · tools/pdf/",
    ergebnis: "public/Die-7-Stufen-kompakt.pdf",
    schritte: [
      {
        text: "Wird zusammen mit den PDFs gebaut",
        command: "npm run pdf",
      },
    ],
  },
  {
    key: "reels",
    icon: "Play",
    titel: "Reel-Cover (Kurzvideos)",
    beschreibung:
      "Die gebrandeten Titelbilder für deine Reels – ein Motiv in fünf Formaten (Reel, Feed, Pin, Landscape). Optional legst du ein eigenes Hintergrundbild als vorlage.png in den jeweiligen Ordner.",
    ordner: "docs/reels/covers/",
    ergebnis: "PNG-Dateien je Motiv & Format",
    schritte: [
      { text: "HTML-Cover bauen", command: "npm run covers" },
      { text: "Als PNG exportieren", command: "npm run covers:png" },
      { text: "Endkarte fürs Video-Ende", command: "npm run endcard" },
    ],
  },
  {
    key: "carousels",
    icon: "Compass",
    titel: "Carousels (Foliensequenzen)",
    beschreibung:
      "Mehrseitige Bild-Strecken für Instagram & LinkedIn – zum Durchwischen. Optional eigenes Hintergrundbild als vorlage.png je Slide-Ordner.",
    ordner: "docs/carousels/",
    ergebnis: "PNG-Slides je Carousel",
    schritte: [
      { text: "Slides bauen", command: "npm run carousels:slides" },
      { text: "Als PNG exportieren", command: "npm run carousels:png" },
    ],
  },
  {
    key: "marketing",
    icon: "Instagram",
    titel: "Social-Grafiken & Marke",
    beschreibung:
      "Profilbilder, Banner und Marken-Grafiken für Instagram, Facebook, LinkedIn, YouTube & Co. – plus Zitat-Kacheln aus dem Marketing-Ordner.",
    ordner: "docs/marketing/",
    ergebnis: "PNG-Grafiken je Kanal",
    schritte: [
      {
        text: "Marken-Assets (Logos, Icons …) erzeugen",
        command: "node docs/marketing/brand-assets.mjs",
      },
      {
        text: "Social-Banner erzeugen",
        command: "node docs/marketing/social-banners.mjs",
      },
    ],
  },
  {
    key: "drehbuecher",
    icon: "Spark",
    titel: "Drehbücher (Video-Skripte)",
    beschreibung:
      "Fertige Drehbuch-PDFs für Reels und Langvideos – Szene für Szene, damit das Filmen leichter fällt. Die Text-Skripte liegen in docs/skripte/.",
    ordner: "docs/skripte/ · tools/pdf/",
    ergebnis: "gestaltete Drehbuch-PDFs",
    schritte: [
      { text: "Reel-Drehbuch als PDF", command: "npm run reel-drehbuch" },
      {
        text: "Langvideo-Drehbuch als PDF",
        command: "npm run langvideo-drehbuch",
      },
    ],
  },
  {
    key: "workshop",
    icon: "Star",
    titel: "Workshop & Präsentationen",
    beschreibung:
      "Gebrandete PowerPoint-Vorlagen und Teilnehmer-Workbooks für Workshops. Die universelle Vorlage WMDG-Praesentationsvorlage.pptx ist die Basis – Platzhalter in [Klammern] überschreiben.",
    ordner: "docs/workshop/",
    ergebnis: "fertige .pptx / .pdf zum Bearbeiten",
    schritte: [
      {
        text: "Fertige Dateien – einfach herunterladen, öffnen und Platzhalter ersetzen. Kein Befehl nötig.",
      },
    ],
  },
  {
    key: "technisch",
    icon: "Shield",
    titel: "Technische Vorlagen",
    beschreibung:
      "Konfigurations- und Rechtstext-Vorlagen: die .env-Beispieldatei fürs Deployment sowie Impressum und Datenschutz als anpassbare Grundlage.",
    ordner: "deploy/ · src/app/impressum · src/app/datenschutz",
    schritte: [
      {
        text: "deploy/.env.example nach deploy/.env kopieren und Werte eintragen (nicht committen).",
      },
      {
        text: "Impressum/Datenschutz enthalten Platzhalter in [Klammern] – vor Livegang ersetzen.",
      },
    ],
  },
];
