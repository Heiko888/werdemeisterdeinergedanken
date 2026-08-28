/**
 * Zentrale Inhalte der Website.
 * Texte sind markengerecht vorformuliert – gern anpassen/verfeinern.
 */

export type Stage = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
};

/** Die 7 Stufen der Bewusstseinsentwicklung (Entwicklungsreise) */
export const stages: Stage[] = [
  {
    number: "01",
    title: "Autopilot",
    subtitle: "Du wirst gelebt",
    description:
      "Vieles läuft automatisch – Reaktionen, Gewohnheiten, Gedanken. Der erste Schritt ist zu bemerken, dass du im Autopilot lebst.",
  },
  {
    number: "02",
    title: "Erwachen",
    subtitle: "Du bemerkst es",
    description:
      "Ein erster Riss im Automatischen: Du spürst, dass du mehr bist als deine Gedanken – und beginnst zu hinterfragen.",
  },
  {
    number: "03",
    title: "Selbstbeobachtung",
    subtitle: "Du siehst dir zu",
    description:
      "Du lernst, deinen Gedanken und Mustern zuzusehen, ohne dich mit ihnen zu identifizieren. Distanz schafft Wahlfreiheit.",
  },
  {
    number: "04",
    title: "Emotionale Reifung",
    subtitle: "Du lässt los",
    description:
      "Du löst festgehaltene Gefühle und alte Geschichten und übernimmst Verantwortung für dein Inneres. Es entsteht Raum – für Ruhe und Kraft.",
  },
  {
    number: "05",
    title: "Schöpferkraft",
    subtitle: "Du erschaffst bewusst",
    description:
      "Vom Beobachter zum Gestalter: Du wählst Gedanken, die dich tragen, richtest dich innerlich aus und setzt sie in Handlung um.",
  },
  {
    number: "06",
    title: "Innere Ausrichtung",
    subtitle: "Kopf, Herz und Handeln",
    description:
      "Denken, Fühlen und Tun ziehen an einem Strang. Aus dieser Stimmigkeit entstehen Präsenz, Klarheit und Wirkung.",
  },
  {
    number: "07",
    title: "Meisterschaft",
    subtitle: "Du gestaltest",
    description:
      "Du reagierst nicht mehr – du gestaltest. Bewusstsein wird zu deinem Zuhause, aus dem heraus du dein Leben souverän formst.",
  },
];

export type Value = { title: string; text: string };

export const values: Value[] = [
  {
    title: "Authentizität",
    text: "Kein Guru-Getue, keine Floskeln. Ehrliche Arbeit auf Augenhöhe – so, wie ich sie selbst gebraucht hätte.",
  },
  {
    title: "Eigenverantwortung",
    text: "Ich gebe dir Werkzeuge, keine Abhängigkeit. Das Steuer bleibt in deiner Hand.",
  },
  {
    title: "Klarheit",
    text: "Komplexe innere Prozesse in verständliche, umsetzbare Schritte übersetzt.",
  },
  {
    title: "Tiefe",
    text: "Wir kratzen nicht an der Oberfläche. Wir gehen an die Wurzel deiner Muster.",
  },
];

export type Feature = { title: string; text: string; icon: string };

/** „Was dich hier erwartet" */
export const expectations: Feature[] = [
  {
    icon: "compass",
    title: "Ein klarer Weg",
    text: "Statt loser Tipps ein strukturierter Prozess über 7 aufeinander aufbauende Stufen – du weißt jederzeit, wo du stehst.",
  },
  {
    icon: "spark",
    title: "Praktische Werkzeuge",
    text: "Übungen und Impulse, die du sofort im Alltag anwenden kannst – nicht nur Theorie, sondern spürbare Veränderung.",
  },
  {
    icon: "shield",
    title: "Ein sicherer Raum",
    text: "Begleitung ohne Wertung. Ein Ort, an dem du ehrlich hinschauen und wirklich wachsen darfst.",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Zum ersten Mal habe ich verstanden, warum ich immer wieder in denselben Mustern gelandet bin. Heikos Ansatz ist tief, aber unglaublich klar. Das hat mein Leben verändert.",
    name: "Sandra M.",
    role: "Unternehmerin",
    rating: 5,
  },
  {
    quote:
      "Ich war skeptisch bei allem, was nach „Bewusstsein“ klingt. Genau deshalb funktioniert es: bodenständig, ehrlich und ohne esoterisches Blabla. Absolut empfehlenswert.",
    name: "Michael R.",
    role: "Projektleiter",
    rating: 5,
  },
  {
    quote:
      "Die 7 Stufen geben dem Ganzen eine Struktur, an der ich mich festhalten konnte. Ich bin ruhiger, klarer und deutlich freier in meinem Kopf geworden.",
    name: "Julia K.",
    role: "Coachin",
    rating: 5,
  },
];

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "Für wen ist das Ganze gedacht?",
    answer:
      "Für Menschen, die spüren, dass sie mehr sind als ihre Gedanken – und die bereit sind, Eigenverantwortung zu übernehmen. Vorwissen brauchst du keins, nur echte Bereitschaft, hinzuschauen.",
  },
  {
    question: "Muss ich an Esoterik glauben?",
    answer:
      "Nein. Der Weg ist bodenständig und nachvollziehbar. Es geht nicht um Glauben, sondern um Erfahren – Schritt für Schritt, in deinem Tempo.",
  },
  {
    question: "Wie viel Zeit sollte ich einplanen?",
    answer:
      "Schon wenige bewusste Minuten am Tag machen einen Unterschied. Entscheidend ist nicht die Menge, sondern die Kontinuität. Die 7 Stufen begleiten dich langfristig.",
  },
  {
    question: "Was, wenn ich schon vieles ausprobiert habe?",
    answer:
      "Gerade dann. Oft fehlt nicht die nächste Technik, sondern ein roter Faden und die Arbeit an der Wurzel statt an Symptomen. Genau da setzen wir an.",
  },
  {
    question: "Wie fange ich am besten an?",
    answer:
      "Sichere dir das kostenlose E-Book „Die 7 Stufen der Bewusstseinsentwicklung“ oder schreib mir direkt. Von dort finden wir gemeinsam den passenden nächsten Schritt.",
  },
];
