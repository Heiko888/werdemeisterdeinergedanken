/**
 * Soforthilfe im Mitgliederbereich: „Was ist gerade los?"
 *
 * In akuten Momenten sucht niemand in Bibliotheken. Jede Situation führt in
 * zwei Taps zu einem sofort machbaren Mini-Schritt, einer passenden Übung aus
 * der Praxis-Bibliothek und – für später – einer Vertiefung.
 *
 * Die Slugs verweisen auf bestehende Inhalte (`practices.ts`, `deep-dives.ts`);
 * ein Test in `soforthilfe.test.ts` stellt sicher, dass sie existieren.
 */

export type Soforthilfe = {
  slug: string;
  /** Wie die Person ihre Lage beschreibt – kurz, in ihren Worten. */
  label: string;
  /** Ein Satz, der die Situation anerkennt, ohne zu bewerten. */
  anerkennung: string;
  /** Sofort machbar, ohne weitere Seite (ca. 1 Minute). */
  sofort: string[];
  /** Passende geführte Übung (Slug aus practices.ts). */
  practice: string;
  /** Optionale zweite Übung. */
  practiceAlt?: string;
  /** Vertiefung für später (Slug aus deep-dives.ts). */
  deepDive: string;
};

export const soforthilfen: Soforthilfe[] = [
  {
    slug: "gedankenkarussell",
    label: "Meine Gedanken drehen sich im Kreis",
    anerkennung:
      "Grübeln fühlt sich an wie Nachdenken, führt aber selten irgendwohin. Du musst es nicht lösen – nur kurz aussteigen.",
    sofort: [
      "Sag innerlich: „Ah – Grübeln.“ Du benennst den Vorgang, nicht den Inhalt.",
      "Lenk die Aufmerksamkeit für fünf Atemzüge auf deine Füße am Boden.",
      "Frag dich: Gibt es jetzt gerade einen konkreten nächsten Schritt? Wenn nicht, darf der Gedanke warten.",
    ],
    practice: "atembeobachtung",
    practiceAlt: "praesenz-spaziergang",
    deepDive: "gruebeln",
  },
  {
    slug: "stress",
    label: "Ich bin gestresst und angespannt",
    anerkennung:
      "Dein Körper ist gerade im Alarm-Modus. Das ist kein Fehler – und er lässt sich über den Atem am schnellsten beruhigen.",
    sofort: [
      "Atme 4 Sekunden ein und 6 Sekunden aus.",
      "Wiederhole das zehnmal. Die längere Ausatmung ist der Schlüssel.",
      "Lass die Schultern bei jeder Ausatmung ein Stück sinken.",
    ],
    practice: "vier-sechs-atmung",
    practiceAlt: "verlaengertes-ausatmen",
    deepDive: "emotionsregulation",
  },
  {
    slug: "streit",
    label: "Ich bin gerade wütend oder verletzt",
    anerkennung:
      "Starke Gefühle wollen sofort handeln. Zwischen Reiz und Reaktion liegt ein Raum – du darfst ihn dir nehmen.",
    sofort: [
      "Antworte jetzt noch nicht – keine Nachricht, kein Satz.",
      "Nenne das Gefühl beim Namen: „Da ist Wut.“ oder „Da ist Kränkung.“",
      "Atme viermal im Quadrat: 4 ein, 4 halten, 4 aus, 4 halten.",
    ],
    practice: "box-breathing",
    practiceAlt: "herz-kohaerenz",
    deepDive: "reiz-reaktions-luecke",
  },
  {
    slug: "einschlafen",
    label: "Ich kann nicht einschlafen",
    anerkennung:
      "Schlaf lässt sich nicht erzwingen. Aber du kannst deinem Körper signalisieren, dass jetzt nichts mehr zu tun ist.",
    sofort: [
      "Leg das Handy außer Reichweite.",
      "Atme ruhig ein und doppelt so lang aus – ohne Zählzwang.",
      "Wandere mit der Aufmerksamkeit langsam von den Füßen nach oben.",
    ],
    practice: "verlaengertes-ausatmen",
    practiceAlt: "body-scan",
    deepDive: "gruebeln",
  },
  {
    slug: "selbstzweifel",
    label: "Ich mache mich selbst fertig",
    anerkennung:
      "Der innere Kritiker ist laut, aber er hat nicht automatisch recht. Du darfst mit dir sprechen wie mit einem guten Freund.",
    sofort: [
      "Leg eine Hand auf die Brust.",
      "Frag dich: Was würde ich jetzt einem Menschen sagen, den ich mag?",
      "Sag dir genau diesen Satz – leise oder in Gedanken.",
    ],
    practice: "herz-kohaerenz",
    deepDive: "selbstmitgefuehl",
  },
  {
    slug: "reizueberflutung",
    label: "Mir ist gerade alles zu viel",
    anerkennung:
      "Nachrichten, Bildschirme, Erwartungen – dein Nervensystem ist überladen. Weniger Input ist jetzt die wirksamste Übung.",
    sofort: [
      "Schließ alle Tabs und Apps, die du gerade nicht brauchst.",
      "Schau eine Minute aus dem Fenster oder in die Ferne.",
      "Nimm dir vor, die nächste Stunde nur eine Sache zu tun.",
    ],
    practice: "praesenz-spaziergang",
    practiceAlt: "verlaengertes-ausatmen",
    deepDive: "reizueberflutung",
  },
];

export function getSoforthilfe(slug: string): Soforthilfe | undefined {
  return soforthilfen.find((s) => s.slug === slug);
}
