/**
 * Daten für die Marken-Übersicht (/admin/marken-uebersicht).
 *
 * Eine Referenz-Seite, die auf einen Blick zeigt:
 *  1. die zwei Farbwelten (Creme/Hell ↔ Dunkel/Navy),
 *  2. das komplette Farbsystem mit Hex-Werten und Rolle,
 *  3. alle Logo-Dateien,
 *  4. den Vorlagen-Bestand inkl. Lücken-Check (welches Motiv fehlt in
 *     welcher Welt).
 *
 * QUELLEN DER WAHRHEIT (bei Änderungen hier nachziehen):
 *  - Farbwerte:  src/app/globals.css  (@theme … --color-*)
 *  - Logos:      public/logo-*.{png,svg}, public/email/…, src/app/icon.png
 *  - Bestand:    docs/marketing/**  – gezählt über das Paar-Prinzip
 *                „Dateiname ohne '-hell' = ein Motiv, das in beiden Welten
 *                existieren soll". Neu zählen nach dem Erzeugen neuer
 *                Grafiken (siehe README/brand-assets.mjs). Der aktuelle
 *                Stand unten wurde am 01.09.2026 ermittelt.
 */

export type Swatch = {
  /** Hex-Wert exakt wie in globals.css. */
  hex: string;
  /** Token-Name (globals.css). */
  token: string;
  /** Wofür die Farbe steht / wo sie eingesetzt wird. */
  rolle: string;
};

export type FarbGruppe = {
  titel: string;
  beschreibung: string;
  swatches: Swatch[];
};

export type LogoDatei = {
  /** Web-Pfad (public/) oder App-Icon-Pfad. */
  src: string;
  /** Dateiname zur Anzeige. */
  datei: string;
  /** Verwendung laut Brandbook. */
  verwendung: string;
  /** Optionaler Hinweis (z. B. Dublette). */
  hinweis?: string;
};

export type BestandZeile = {
  familie: string;
  /** Anzahl Motive (ein Sujet in einem Format). */
  motive: number;
  /** In wie vielen davon existiert die Creme-Variante. */
  creme: number;
  /** In wie vielen davon existiert die Dunkel-Variante. */
  dunkel: number;
};

/** Die drei Grundwelten – kurz erklärt. */
export const farbWelten = {
  dunkel: {
    name: "Dunkel · Gold",
    grund: "#090b10",
    tinte: "#f4f2ec",
    akzent: "#e8c15f",
    emblem: "Gold-Gehirn",
    suffix: "Standard (ohne Suffix)",
  },
  hell: {
    name: "Hell · Creme",
    grund: "#f6f4ee",
    tinte: "#16231f",
    akzent: "#7e6410",
    emblem: "Buntes Gehirn (Gold-Akzente)",
    suffix: "Datei-Suffix „-hell“",
  },
  tuerkis: {
    name: "Türkis · Navy",
    grund: "#090b10",
    tinte: "#f4f2ec",
    akzent: "#5fd6d2",
    emblem: "Türkis-Gehirn",
    suffix: "Datei-Suffix „-tuerkis“",
  },
  tuerkisHell: {
    name: "Türkis · Creme",
    grund: "#f6f4ee",
    tinte: "#16231f",
    akzent: "#0f766e",
    emblem: "Türkis-Gehirn",
    suffix: "Datei-Suffix „-tuerkis-hell“",
  },
} as const;

/**
 * Status der Türkis-Welt: als Akzent-Variante in allen Marketing-Generatoren
 * angelegt (Gold-Gehirn → Türkis-Gehirn, Gold-Akzente → Grün→Teal) – in zwei
 * Grundvarianten: „-tuerkis" (auf Navy) und „-tuerkis-hell" (auf Creme). Die
 * Dateien entstehen beim nächsten Rendern. Optional nur eine Welt rendern:
 *   THEME=tuerkis      node docs/marketing/brand-assets.mjs
 *   THEME=tuerkis-hell node docs/marketing/brand-assets.mjs   (usw.)
 * danach: npm run vorlagen:galerie
 */
export const tuerkisStatus = {
  angelegt: true,
  gerendert: false,
  erwarteteMotive: 360,
} as const;

export const farbGruppen: FarbGruppe[] = [
  {
    titel: "Dunkel · Navy / Anthrazit",
    beschreibung:
      "Die dunkle Grundwelt. Basis aller Standard-Grafiken (ohne Datei-Suffix).",
    swatches: [
      { hex: "#090b10", token: "navy-950", rolle: "Haupt-Hintergrund dunkel" },
      { hex: "#0f1218", token: "navy-900", rolle: "Sektionen" },
      { hex: "#141821", token: "navy-850", rolle: "Karten auf Dunkel" },
      { hex: "#1b202b", token: "navy-800", rolle: "erhöhte Flächen" },
      { hex: "#232935", token: "navy-700", rolle: "Linien / Kanten" },
    ],
  },
  {
    titel: "Hell · Creme / Papier",
    beschreibung: "Die helle Grundwelt. Basis aller „-hell“-Grafiken.",
    swatches: [
      { hex: "#f6f4ee", token: "paper", rolle: "Haupt-Hintergrund hell" },
      { hex: "#ffffff", token: "surface", rolle: "weiße Karten" },
      { hex: "#efece2", token: "surface-2", rolle: "Wechsel-Sektionen" },
      { hex: "#f4f2ec", token: "cream", rolle: "Off-White auf Dunkel" },
      { hex: "#16231f", token: "ink", rolle: "Tinte / Überschriften" },
    ],
  },
  {
    titel: "Türkis · Teal — Akzent „Bewusstsein“",
    beschreibung:
      "Der Marken-Türkis: Emblem-Verlauf und Schimmer. teal-700 ist AA-tauglicher Text auf Hell.",
    swatches: [
      { hex: "#5fd6d2", token: "teal-300", rolle: "Glow auf Dunkel" },
      { hex: "#34c4c4", token: "teal-400", rolle: "leuchtend" },
      { hex: "#21b2bd", token: "teal-500", rolle: "Kern-Türkis" },
      { hex: "#199aa8", token: "teal-600", rolle: "tiefer" },
      { hex: "#0f766e", token: "teal-700", rolle: "AA-Text auf Hell ✓" },
    ],
  },
  {
    titel: "Gold — Akzent „Erkenntnis“",
    beschreibung:
      "Der tragende Akzent: Wortmarke, CTAs, Feinlinien. gold-700 ist AA-tauglicher Text auf Hell.",
    swatches: [
      { hex: "#f2d489", token: "gold-300", rolle: "leuchtet auf Dunkel" },
      { hex: "#e8c15f", token: "gold-400", rolle: "warm" },
      { hex: "#d9a93a", token: "gold-500", rolle: "Antikgold" },
      { hex: "#a8842a", token: "gold-600", rolle: "Deko auf Hell" },
      { hex: "#7e6410", token: "gold-700", rolle: "AA-Text auf Hell ✓" },
    ],
  },
  {
    titel: "Lindgrün · Leaf",
    beschreibung: "Natur-Grün aus dem Emblem, sparsamer Zweitakzent.",
    swatches: [
      { hex: "#b6e06a", token: "leaf-300", rolle: "hell" },
      { hex: "#a3d64f", token: "leaf-400", rolle: "frisch" },
      { hex: "#8cc63f", token: "leaf-500", rolle: "Marken-Grün" },
      { hex: "#74ab2f", token: "leaf-600", rolle: "tiefer" },
    ],
  },
];

/** Alle Logo-Dateien (public/ ist direkt web-erreichbar). */
export const logos: LogoDatei[] = [
  {
    src: "/logo-brain-gold-freigestellt.png",
    datei: "logo-brain-gold-freigestellt.png",
    verwendung:
      "Goldenes Gehirn-Emblem (freigestellt) – aktueller Standard im Web (Header, Footer, Blog, Favicon)",
  },
  {
    src: "/logo-brain.png",
    datei: "logo-brain.png",
    verwendung: "Freigestelltes Gehirn-Emblem (Blau/Grün) – frühere Web-Variante",
  },
  {
    src: "/logo-brain-gold.png",
    datei: "logo-brain-gold.png",
    verwendung: "Gold-Emblem – Marketing-Grafiken (dunkel/hell)",
  },
  {
    src: "/logo-brain-tuerkis.png",
    datei: "logo-brain-tuerkis.png",
    verwendung: "Türkis-Emblem (Seitenansicht) – für die Türkis-Variante",
  },
  {
    src: "/logo-full.png",
    datei: "logo-full.png",
    verwendung: "Vollständiges Logo: Emblem + handgezeichnete Wortmarke",
  },
  {
    src: "/logo.svg",
    datei: "logo.svg",
    verwendung: "Vektor-Logo – skalierbar, für Print / große Flächen",
  },
  {
    src: "/email/wmdg-signatur-logo.png",
    datei: "email/wmdg-signatur-logo.png",
    verwendung: "E-Mail-Signatur-Logo",
  },
  {
    src: "/logo-brain-frei.png",
    datei: "logo-brain-frei.png",
    verwendung: "Freigestellte Emblem-Variante",
    hinweis: "Byte-identisch mit logo-brain.png (Dublette – eine Datei genügt).",
  },
];

/**
 * Vorlagen-Bestand pro Motiv-Familie (Stand 01.09.2026), gezählt aus
 * docs/marketing/. „creme“ und „dunkel“ sagen, in wie vielen der Motive die
 * jeweilige Farbwelt vorliegt. Sind beide == motive, ist die Familie
 * vollständig paarig.
 */
export const vorlagenBestand: BestandZeile[] = [
  { familie: "Zitate", motive: 78, creme: 78, dunkel: 78 },
  { familie: "WhatsApp-Mitgliedschaft (Kampagne)", motive: 56, creme: 56, dunkel: 56 },
  { familie: "Content-Overlays · Studien-Fakten", motive: 42, creme: 42, dunkel: 42 },
  { familie: "Content-Overlays · Zitate", motive: 42, creme: 42, dunkel: 42 },
  { familie: "Zitate · Studien-Fakten", motive: 42, creme: 42, dunkel: 42 },
  { familie: "Story-Carousels · Sommer 2023", motive: 27, creme: 27, dunkel: 27 },
  { familie: "YouTube-Thumbnails", motive: 27, creme: 27, dunkel: 27 },
  { familie: "Story-Overlays", motive: 18, creme: 18, dunkel: 18 },
  { familie: "Instagram-Story", motive: 7, creme: 7, dunkel: 7 },
  { familie: "WhatsApp (Kanal)", motive: 6, creme: 6, dunkel: 6 },
  { familie: "E-Book-Posts", motive: 5, creme: 5, dunkel: 5 },
  { familie: "Profil- & Kanalbilder", motive: 5, creme: 5, dunkel: 5 },
  { familie: "LinkedIn-Banner", motive: 2, creme: 2, dunkel: 2 },
  { familie: "Facebook", motive: 1, creme: 1, dunkel: 1 },
  { familie: "Messenger", motive: 1, creme: 1, dunkel: 1 },
  { familie: "YouTube (Kanal)", motive: 1, creme: 1, dunkel: 1 },
];

/** Kennzahlen für die Kopf-Kacheln. */
export const bestandKennzahlen = {
  motive: vorlagenBestand.reduce((n, r) => n + r.motive, 0),
  creme: vorlagenBestand.reduce((n, r) => n + r.creme, 0),
  dunkel: vorlagenBestand.reduce((n, r) => n + r.dunkel, 0),
  /** Themen-neutrale Vorlagen (Hilfslinien, Hintergründe) ohne Farbwelt. */
  neutraleVorlagen: 18,
  /** Bild-Dateien insgesamt unter docs/marketing/. */
  dateienGesamt: 756,
  logoVarianten: 7,
};
