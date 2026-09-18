/**
 * Zentrale Inhalte der Website.
 * Texte sind markengerecht vorformuliert – gern anpassen/verfeinern.
 */

export type Stage = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  /**
   * Optionale Vertiefung je Stufe – nur auf /die-7-stufen gerendert, damit
   * aus sieben Karten sieben echte Entwicklungsschritte werden. Startseite
   * (SevenStages) nutzt weiterhin nur die Kurzbeschreibung.
   */
  detail?: {
    /** Woran du diese Stufe erkennst – Anzeichen und Gefühl. */
    recognize: string;
    /** Was dich auf dieser Stufe festhält – die typische Falle. */
    stuck: string;
    /** Welche Fähigkeit hier entsteht. */
    skill: string;
    /** Dein nächster Schritt in Richtung der folgenden Stufe. */
    next: string;
  };
};

/** Die 7 Stufen der Bewusstseinsentwicklung (Entwicklungsreise) */
export const stages: Stage[] = [
  {
    number: "01",
    title: "Autopilot",
    subtitle: "Du wirst gelebt",
    description:
      "Vieles läuft automatisch – Reaktionen, Gewohnheiten, Gedanken. Der erste Schritt ist zu bemerken, dass du im Autopilot lebst.",
    detail: {
      recognize:
        "Du funktionierst, aber du entscheidest wenig bewusst. Reaktionen kommen schneller, als du denken kannst, und abends fragst du dich, wohin der Tag verschwunden ist. Es fühlt sich normal an – gerade deshalb fällt es kaum auf.",
      stuck:
        "Der Autopilot ist bequem. Solange nichts wirklich wehtut, gibt es keinen Grund, ihn zu hinterfragen – und genau diese Unauffälligkeit hält dich in ihm fest.",
      skill:
        "Die erste Fähigkeit ist winzig und entscheidend: überhaupt zu bemerken, dass da ein Automatismus läuft.",
      next: "Schau dir einmal am Tag bewusst über die Schulter. Ein einziger wacher Moment reicht als Anfang.",
    },
  },
  {
    number: "02",
    title: "Erwachen",
    subtitle: "Du bemerkst es",
    description:
      "Ein erster Riss im Automatischen: Du spürst, dass du mehr bist als deine Gedanken – und beginnst zu hinterfragen.",
    detail: {
      recognize:
        "Das „So bin ich eben“ stimmt nicht mehr ganz. Du ertappst dich bei Gedanken und fragst zum ersten Mal: Ist der wirklich meiner? Ein leiser Riss im Selbstverständlichen.",
      stuck:
        "Der Reflex, den Riss schnell wieder zuzukleben – mit Ablenkung, Erklärungen, Weitermachen. Erwachen ist unbequem, und Unbequemes will man loswerden.",
      skill:
        "Du beginnst zu unterscheiden zwischen dem, was in dir passiert, und dem, was du bist. Diese Unterscheidung ist der Anfang von Freiheit.",
      next: "Halte den Fragen stand, statt sie wegzuschieben. Schreib auf, was dir auffällt – Bemerken wird stärker, wenn du es festhältst.",
    },
  },
  {
    number: "03",
    title: "Selbstbeobachtung",
    subtitle: "Du siehst dir zu",
    description:
      "Du lernst, deinen Gedanken und Mustern zuzusehen, ohne dich mit ihnen zu identifizieren. Distanz schafft Wahlfreiheit.",
    detail: {
      recognize:
        "Du kannst einen Gedanken denken und ihn zugleich betrachten. Zwischen Reiz und Reaktion öffnet sich ein Spalt, in dem du zum ersten Mal wählen kannst.",
      stuck:
        "Die Identifikation. Du verwechselst dich noch oft mit dem, was du beobachtest, und wirst vom Gefühl mitgerissen, statt bei ihm zu bleiben.",
      skill:
        "Distanz ohne Kälte. Du lernst dabeizubleiben, ohne dich zu verlieren – der Beobachter in dir wird ruhiger und verlässlicher.",
      next: "Übe den Spalt bewusst: eine kurze Pause zwischen Auslöser und Antwort, jeden Tag ein Stück länger.",
    },
  },
  {
    number: "04",
    title: "Emotionale Reifung",
    subtitle: "Du lässt los",
    description:
      "Du löst festgehaltene Gefühle und alte Geschichten und übernimmst Verantwortung für dein Inneres. Es entsteht Raum – für Ruhe und Kraft.",
    detail: {
      recognize:
        "Alte Gefühle tauchen auf – und du drückst sie nicht mehr weg, sondern lässt sie da sein. Du merkst, dass ein Gefühl dich nicht zerstört, wenn du es wirklich fühlst.",
      stuck:
        "Die Geschichten, die du um deine Gefühle gebaut hast – Schuld, Groll, „hätte nur“. Solange die Geschichte bleibt, bleibt das Gefühl.",
      skill:
        "Du übernimmst Verantwortung für dein Inneres, ohne dich dafür zu verurteilen. Es entsteht Raum – und in ihm: Ruhe und Kraft.",
      next: "Geh dorthin, wo es sich eng anfühlt, statt darum herum. Was du fühlst, darfst du loslassen.",
    },
  },
  {
    number: "05",
    title: "Schöpferkraft",
    subtitle: "Du erschaffst bewusst",
    description:
      "Vom Beobachter zum Gestalter: Du wählst Gedanken, die dich tragen, richtest dich innerlich aus und setzt sie in Handlung um.",
    detail: {
      recognize:
        "Du wartest nicht mehr, bis Gedanken dir passieren – du wählst sie. Du merkst, dass du innere Zustände selbst herstellen kannst, statt auf sie zu hoffen.",
      stuck:
        "Der alte Glaube, dass du nur Passagier bist. Schöpferkraft fühlt sich anfangs fast vermessen an – „darf ich das überhaupt?“.",
      skill:
        "Vom Beobachter zum Gestalter. Du richtest dich innerlich aus und setzt das, was du wählst, in Handlung um.",
      next: "Wähle bewusst einen tragenden Gedanken pro Tag – und handle einmal danach, und sei es klein.",
    },
  },
  {
    number: "06",
    title: "Innere Ausrichtung",
    subtitle: "Kopf, Herz und Handeln",
    description:
      "Denken, Fühlen und Tun ziehen an einem Strang. Aus dieser Stimmigkeit entstehen Präsenz, Klarheit und Wirkung.",
    detail: {
      recognize:
        "Denken, Fühlen und Tun widersprechen sich seltener. Entscheidungen fühlen sich stimmig an statt zerrissen – du erkennst dich in deinem Handeln wieder.",
      stuck:
        "Die letzten Kompromisse mit dir selbst – dort, wo du noch gegen dein besseres Wissen lebst, weil es bequemer oder erwartet ist.",
      skill:
        "Stimmigkeit. Aus dem Einklang von Kopf, Herz und Handeln entstehen Präsenz, Klarheit und echte Wirkung.",
      next: "Bring die eine Stelle in Ordnung, an der du noch gegen dich lebst. Ausrichtung zeigt sich im Konkreten.",
    },
  },
  {
    number: "07",
    title: "Meisterschaft",
    subtitle: "Du gestaltest",
    description:
      "Du reagierst nicht mehr – du gestaltest. Bewusstsein wird zu deinem Zuhause, aus dem heraus du dein Leben souverän formst.",
    detail: {
      recognize:
        "Du reagierst nicht mehr, du gestaltest. Auch unter Druck bleibt ein ruhiger Ort in dir, aus dem heraus du antwortest, statt zurückzuschlagen.",
      stuck:
        "Nichts hält dich mehr fest – aber Meisterschaft ist kein Ziel, das man erreicht und ablegt. Sie will täglich gelebt werden.",
      skill:
        "Bewusstsein wird zu deinem Zuhause – der Ort, aus dem du dein Leben souverän formst, statt es zu erleiden.",
      next: "Gib weiter, was du gefunden hast. Nichts festigt Meisterschaft so sehr, wie einen anderen Menschen auf seinem Weg zu begleiten.",
    },
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

// Stimmen speziell zum Buch (/buch). Bewusst getrennt von `testimonials`:
// die dort hinterlegten Stimmen beziehen sich auf den Weg und die 7 Stufen,
// also auf den Mitgliederbereich – auf der Buchseite gelesen wirken sie, als
// beschrieben sie das Buch. Hier gehören ausschließlich Rückmeldungen echter
// Leserinnen und Leser hinein, wörtlich und mit deren Einverständnis.
// Solange die Liste leer ist, blendet /buch den Stimmen-Abschnitt aus.
export const bookTestimonials: Testimonial[] = [];

// Stimmen für Startseite (Testimonials.tsx) und /mitgliedschaft. Hier gehören
// ausschließlich echte Stimmen mit Einverständnis hinein (Name, Rolle, Zitat
// wörtlich). Die früheren drei Platzhalter (Sandra M., Michael R., Julia K.)
// wurden am 18.09.2026 entfernt – erfundene Zitate schaden dem Vertrauen mehr,
// als ein leerer Abschnitt es tut. Solange die Liste leer ist, blenden die
// Startseite und /mitgliedschaft den Stimmen-Abschnitt aus.
export const testimonials: Testimonial[] = [];

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
