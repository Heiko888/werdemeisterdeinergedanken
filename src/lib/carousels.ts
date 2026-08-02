/**
 * Carousel-Produktion (Foliensequenzen für Instagram/LinkedIn).
 *
 * Die ausgearbeiteten Slide-Texte + Captions liegen in `docs/skripte/carousels/`.
 * Hier steht der Produktions-Status je Carousel fürs Marketing-Cockpit: sobald
 * ein Carousel gestaltet/veröffentlicht ist, `produced` auf `true` setzen.
 */
export type Carousel = {
  topic: string;
  slides: number;
  produced: boolean;
};

export type CarouselSeries = {
  key: string;
  label: string;
  /** Quelle der ausgearbeiteten Slides (relativ zum Repo) */
  script: string;
  carousels: Carousel[];
};

const c = (topic: string, slides: number): Carousel => ({ topic, slides, produced: false });

export const carouselSeries: CarouselSeries[] = [
  {
    key: "selbstverteidigung",
    label: "Mentale Selbstverteidigung",
    script: "docs/skripte/carousels/selbstverteidigung.md",
    carousels: [
      c("Propaganda", 7), c("Framing", 7), c("Sprache & Etiketten", 7),
      c("Medien-Agenda", 7), c("Algorithmen", 7), c("Werbung & Mangel", 7),
      c("Gruppendruck", 7), c("Autoritätshörigkeit", 7), c("Angst-Steuerung", 7),
      c("Wiederholung", 7), c("Ablenkung", 7), c("Kognitive Dissonanz", 7),
      c("Normalisierung", 7), c("Bildmacht", 7), c("Identität & Meinung", 7),
      c("Reizüberflutung", 7),
    ],
  },
  {
    key: "stufen",
    label: "Die 7 Stufen",
    script: "docs/skripte/carousels/stufen.md",
    carousels: [
      c("Überblick · alle 7 Stufen", 9),
      c("Autopilot", 7), c("Erwachen", 7), c("Selbstbeobachtung", 7),
      c("Emotionale Reifung", 7), c("Schöpferkraft", 7), c("Innere Ausrichtung", 7),
      c("Meisterschaft", 7),
    ],
  },
  {
    key: "praxis",
    label: "Praxis",
    script: "docs/skripte/carousels/praxis.md",
    carousels: [
      c("Atembeobachtung", 6), c("Der innere Beobachter", 6), c("Body-Scan", 6),
      c("Herz-Kohärenz", 6), c("Verlängertes Ausatmen", 6), c("4-6-Atmung", 6),
      c("Box Breathing", 6), c("Der Autopilot-Check", 6), c("Morgen-Ausrichtung", 6),
      c("Abend-Reflexion", 6), c("Loslass-Ritual", 6), c("Präsenz-Spaziergang", 6),
      c("Die tägliche Rückkehr", 6),
    ],
  },
  {
    key: "vertiefungen",
    label: "Vertiefungen",
    script: "docs/skripte/carousels/vertiefungen.md",
    carousels: [
      c("Automatische Gedanken", 7), c("Konditionierung", 7), c("Kognitive Verzerrungen", 7),
      c("Kernüberzeugungen", 7), c("Innerer Kritiker", 7), c("Neuroplastizität", 7),
      c("Reiz-Reaktions-Lücke", 7), c("Grübeln", 7), c("Emotionsregulation", 7),
      c("Selbstmitgefühl", 7), c("Werte & Ziele", 7), c("Muster & Körper", 7),
      c("Integration & Weitergabe", 7),
    ],
  },
  {
    key: "marketing",
    label: "Marketing / Funnel",
    script: "docs/carousels/marketing-serien.mjs",
    carousels: [
      c("Bis zu 60.000 Gedanken", 9),
      c("4 Wege zur mentalen Freiheit", 8),
      c("Wer denkt hier eigentlich?", 8),
    ],
  },
];

export const allCarousels: Carousel[] = carouselSeries.flatMap((s) => s.carousels);
