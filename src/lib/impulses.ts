/**
 * Wöchentliche E-Mail-Impulse für Mitglieder.
 *
 * Die Cron-Route (src/app/api/impulses/route.ts) verschickt pro Lauf den
 * nächsten Impuls an alle Mitglieder mit aktivem Opt-in. `impulse_index` am
 * Profil merkt sich, wie weit jede Person ist – die Serie läuft zyklisch.
 *
 * Bewusst bodenständig und kurz gehalten (ein Gedanke + eine kleine Übung).
 */

export type Impulse = {
  /** Betreffzeile */
  subject: string;
  /** Überschrift im E-Mail-Körper */
  heading: string;
  /** Absätze des Fließtextes */
  body: string[];
  /** Button-Text */
  ctaLabel: string;
  /** Ziel im Mitgliederbereich (relativer Pfad) */
  ctaPath: string;
};

export const impulses: Impulse[] = [
  {
    subject: "Impuls: Bemerkst du deinen Autopiloten?",
    heading: "Der erste Schritt ist das Bemerken",
    body: [
      "Vieles in uns läuft automatisch – Reaktionen, Gewohnheiten, Gedanken. Solange der Autopilot unsichtbar bleibt, fühlt er sich einfach wie „ich“ an.",
      "Deine Mini-Übung für diese Woche: Halte einmal am Tag kurz inne und frag dich – was tue ich gerade, und bin ich wirklich dabei? Mehr braucht es am Anfang nicht.",
    ],
    ctaLabel: "Zu Stufe 1 – Autopilot",
    ctaPath: "/mitglieder/stufe/1",
  },
  {
    subject: "Impuls: „Da ist ein Gedanke“",
    heading: "Erwachen heißt hinterfragen",
    body: [
      "Ein erster Riss im Automatischen entsteht, wenn du spürst: Ich bin mehr als meine Gedanken. Genau dieses Bemerken ist der Anfang jeder echten Veränderung.",
      "Übe diese Woche einen einzigen Satz: Statt „So ist es“ innerlich „Da ist ein Gedanke“. Das schafft schon einen kleinen, wichtigen Abstand.",
    ],
    ctaLabel: "Zu Stufe 2 – Erwachen",
    ctaPath: "/mitglieder/stufe/2",
  },
  {
    subject: "Impuls: Am Ufer sitzen",
    heading: "Dir selbst zusehen lernen",
    body: [
      "Selbstbeobachtung ist die Fähigkeit, deinen Gedanken zuzusehen, ohne dich mit ihnen zu identifizieren. Distanz schafft Wahlfreiheit.",
      "Diese Woche: Wenn ein altes Muster anspringt, benenne es kurz innerlich – „Aha, das kenne ich“ – und kehr ruhig zurück, wie an ein Flussufer.",
    ],
    ctaLabel: "Zu Stufe 3 – Selbstbeobachtung",
    ctaPath: "/mitglieder/stufe/3",
  },
  {
    subject: "Impuls: Gefühle als Welle",
    heading: "Loslassen, was du festhältst",
    body: [
      "Emotionale Reifung heißt, schwierige Gefühle zuzulassen, statt sie wegzudrücken – und Verantwortung für dein Inneres zu übernehmen.",
      "Deine Übung: Wenn ein Gefühl hochkommt, spür es im Körper und atme hinein. Lass es als Welle durch dich hindurchziehen, statt dagegen anzukämpfen.",
    ],
    ctaLabel: "Zu Stufe 4 – Emotionale Reifung",
    ctaPath: "/mitglieder/stufe/4",
  },
  {
    subject: "Impuls: Vom Beobachter zum Gestalter",
    heading: "Deine Schöpferkraft",
    body: [
      "Auf dieser Stufe wählst du bewusst Gedanken, die dich tragen, und übersetzt sie in Handlung. Vision und Tun gehören zusammen.",
      "Diese Woche: Wähle morgens eine stärkende Ausrichtung – ein Wort genügt – und übersetze sie in eine konkrete kleine Handlung.",
    ],
    ctaLabel: "Zu Stufe 5 – Schöpferkraft",
    ctaPath: "/mitglieder/stufe/5",
  },
  {
    subject: "Impuls: Kopf, Herz und Handeln",
    heading: "Innere Ausrichtung",
    body: [
      "Wenn Denken, Fühlen und Tun an einem Strang ziehen, entsteht Präsenz und Klarheit – und dein Handeln wird müheloser.",
      "Übung der Woche: Nimm dir vor einer Entscheidung einen Moment für ruhige Herz-Atmung und frag dich, ob sie sich wirklich stimmig anfühlt.",
    ],
    ctaLabel: "Zu Stufe 6 – Innere Ausrichtung",
    ctaPath: "/mitglieder/stufe/6",
  },
  {
    subject: "Impuls: Die tägliche Rückkehr",
    heading: "Meisterschaft ist eine Haltung",
    body: [
      "Meisterschaft ist kein Zustand, den man erreicht und besitzt, sondern eine Haltung, die täglich neu gelebt wird – mit Demut und ohne sich zu überhöhen.",
      "Diese Woche: Kehre bewusst in deine Mitte zurück, wann immer dich etwas herauswirft. Nicht das Nie-mehr-Fallen zählt, sondern das ruhige Zurückkehren.",
    ],
    ctaLabel: "Zu Stufe 7 – Meisterschaft",
    ctaPath: "/mitglieder/stufe/7",
  },
];
