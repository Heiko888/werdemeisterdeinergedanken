/**
 * Blog-Inhalte. Neue Artikel einfach als weiteres Objekt ergänzen.
 * `content` ist eine Liste aus einfachen Blöcken (Absatz, Zwischentitel,
 * Zitat, Liste) – so bleibt die Formatierung sauber und ohne Markdown-Setup.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO, für <time> und Sortierung
  dateLabel: string; // angezeigt
  readingMinutes: number;
  content: Block[];
};

export const posts: Post[] = [
  {
    slug: "du-bist-nicht-deine-gedanken",
    title: "Du bist nicht deine Gedanken",
    excerpt:
      "Der wichtigste Perspektivwechsel auf dem Weg zu einem klaren Kopf – und warum er alles verändert.",
    category: "Bewusstsein",
    date: "2026-06-02",
    dateLabel: "2. Juni 2026",
    readingMinutes: 4,
    content: [
      {
        type: "p",
        text: "Die meisten Menschen halten ihre Gedanken für die Wahrheit. Was der Kopf sagt, wird geglaubt – und danach gehandelt. Genau hier beginnt das Problem: Wenn du dich mit jedem Gedanken identifizierst, wirst du von ihnen gelebt statt umgekehrt.",
      },
      {
        type: "h2",
        text: "Der innere Beobachter",
      },
      {
        type: "p",
        text: "Es gibt in dir eine Instanz, die deine Gedanken bemerkt. Wenn du sagen kannst „Ich habe gerade den Gedanken, dass ich das nicht schaffe“, dann bist du offensichtlich nicht dieser Gedanke – sondern derjenige, der ihn wahrnimmt. Dieser feine Unterschied ist der Anfang von echter Freiheit.",
      },
      {
        type: "quote",
        text: "Zwischen Reiz und Reaktion liegt ein Raum. In diesem Raum liegt unsere Macht, unsere Antwort zu wählen.",
      },
      {
        type: "p",
        text: "Sobald du diesen Raum spürst, verlieren automatische Gedanken ihre Selbstverständlichkeit. Du musst nicht mehr jedem Impuls folgen. Du kannst hinschauen, prüfen – und bewusst entscheiden.",
      },
      {
        type: "h2",
        text: "Eine einfache Übung für heute",
      },
      {
        type: "ul",
        items: [
          "Nimm dir dreimal am Tag 60 Sekunden Zeit.",
          "Beobachte deine Gedanken, als wären sie Wolken, die vorbeiziehen.",
          "Benenne sie innerlich: „Da ist ein Gedanke über die Zukunft.“",
          "Kehr dann sanft zu deinem Atem zurück.",
        ],
      },
      {
        type: "p",
        text: "Klingt banal, ist aber der erste Schritt der Bewusstseinsentwicklung – die Stufe des Erwachens. Wer diesen Beobachter kultiviert, legt das Fundament für alles Weitere.",
      },
    ],
  },
  {
    slug: "warum-willenskraft-ueberschaetzt-wird",
    title: "Warum Willenskraft überschätzt wird",
    excerpt:
      "Wenn du dich immer wieder zusammenreißen musst, ist nicht deine Disziplin das Problem – sondern ein unbewusstes Programm.",
    category: "Muster lösen",
    date: "2026-06-16",
    dateLabel: "16. Juni 2026",
    readingMinutes: 5,
    content: [
      {
        type: "p",
        text: "„Ich müsste nur diszipliniert genug sein.“ Diesen Satz höre ich oft. Dahinter steckt die Annahme, dass Veränderung eine Frage der Härte gegen sich selbst ist. Doch Willenskraft ist eine begrenzte Ressource – und gegen ein tief verankertes Muster verliert sie fast immer.",
      },
      {
        type: "h2",
        text: "Muster sind schneller als Vorsätze",
      },
      {
        type: "p",
        text: "Ein Großteil unseres Verhaltens läuft automatisch. Prägungen aus der Kindheit, wiederholte Reaktionen, alte Schutzstrategien – sie feuern, bevor der bewusste Verstand überhaupt eingreifen kann. Wer nur an der Oberfläche kämpft, bekämpft Symptome.",
      },
      {
        type: "quote",
        text: "Du kannst ein Muster nicht wegdrücken. Aber du kannst es durchschauen – und damit entmachten.",
      },
      {
        type: "h2",
        text: "Von der Wurzel her arbeiten",
      },
      {
        type: "p",
        text: "Statt dich zu zwingen, lohnt sich die Frage: Was genau löst das alte Verhalten aus? Welches Gefühl will es vermeiden? Wenn du das erkennst, kannst du an der Wurzel ansetzen – und plötzlich braucht es viel weniger Willenskraft, weil der innere Widerstand nachlässt.",
      },
      {
        type: "p",
        text: "Genau das ist die Arbeit der Stufen drei und vier: alte Prägungen erkennen und die festgehaltenen Emotionen lösen. Nicht härter, sondern klarer.",
      },
    ],
  },
  {
    slug: "drei-muster-die-dich-unbewusst-steuern",
    title: "Drei Muster, die dich unbewusst steuern",
    excerpt:
      "Diese drei inneren Programme laufen bei fast jedem – und bestimmen leise, wie du entscheidest und fühlst.",
    category: "Selbstführung",
    date: "2026-07-01",
    dateLabel: "1. Juli 2026",
    readingMinutes: 6,
    content: [
      {
        type: "p",
        text: "Wir alle tragen innere Muster in uns – erlernte Reaktionen, die einmal sinnvoll waren und heute oft im Weg stehen. Drei davon begegnen mir in der Arbeit immer wieder.",
      },
      {
        type: "h2",
        text: "1. Der ständige Beweiser",
      },
      {
        type: "p",
        text: "Der Antrieb, sich permanent beweisen zu müssen. Nie ist es genug, immer geht noch mehr. Kurzfristig produktiv, langfristig erschöpfend – weil der innere Maßstab nie erreicht wird.",
      },
      {
        type: "h2",
        text: "2. Die Harmonie um jeden Preis",
      },
      {
        type: "p",
        text: "Das Muster, Konflikte zu vermeiden und es allen recht zu machen. Man funktioniert nach außen, verliert dabei aber den Kontakt zu den eigenen Bedürfnissen.",
      },
      {
        type: "h2",
        text: "3. Die Kontrolle als Sicherheit",
      },
      {
        type: "p",
        text: "Der Versuch, durch Kontrolle Sicherheit herzustellen. Alles muss planbar sein. Sobald das Leben unvorhersehbar wird – und das wird es –, entsteht Stress.",
      },
      {
        type: "quote",
        text: "Ein Muster zu erkennen ist bereits der halbe Weg. Was du siehst, kann dich nicht mehr unbemerkt steuern.",
      },
      {
        type: "p",
        text: "Der nächste Schritt ist nicht, diese Muster zu bekämpfen, sondern sie mit Bewusstheit zu durchleuchten. Dann darfst du neu wählen – und dein Denken bewusst gestalten.",
      },
    ],
  },
  {
    slug: "was-mein-hund-mich-ueber-praesenz-lehrt",
    title: "Was mein Hund mich über Präsenz lehrt",
    excerpt:
      "Ein Hund kennt kein Gestern und kein Morgen – nur das Jetzt. Warum das Zusammenleben mit ihm dein Bewusstsein trainiert.",
    category: "Präsenz",
    date: "2026-07-25",
    dateLabel: "25. Juli 2026",
    readingMinutes: 3,
    content: [
      {
        type: "p",
        text: "Das ist meine ganz persönliche Überzeugung: Ein Hund stärkt dein Bewusstsein. Nicht durch eine Methode, sondern einfach dadurch, wie er ist. Er holt dich sofort in den Moment.",
      },
      {
        type: "h2",
        text: "Ein Hund lebt, was wir üben",
      },
      {
        type: "p",
        text: "In der Meditation trainieren wir mühsam, im Jetzt zu bleiben. Ein Hund kann gar nicht anders. Er grübelt nicht über gestern und sorgt sich nicht um morgen. Er ist einfach da – neugierig, wach, ganz in dem, was gerade ist. Und diese Gegenwärtigkeit steckt an, wenn du dich darauf einlässt.",
      },
      {
        type: "quote",
        text: "Ein Hund holt dich sofort in den Moment. Er kennt kein Gestern und kein Morgen – nur das Jetzt.",
      },
      {
        type: "h2",
        text: "Warum das dein Bewusstsein stärkt",
      },
      {
        type: "p",
        text: "Präsenz ist kein esoterischer Zustand, sondern schlicht Aufmerksamkeit im Hier. Wenn du ohne Handy mit deinem Hund draußen bist, seine Bewegungen beobachtest, den Wind und den Boden spürst, dann bist du automatisch raus aus dem Kopf und drin in den Sinnen. Genau das üben wir auf den ersten Stufen: bemerken, was ist, statt gedanklich woanders zu sein.",
      },
      {
        type: "p",
        text: "Ein Hund wird so zu einem täglichen Lehrer – ohne ein Wort. Er erinnert dich immer wieder daran, wohin die Aufmerksamkeit gehört: in den Moment, der ohnehin der einzige ist, den es gibt.",
      },
      {
        type: "h2",
        text: "Nimm es mit in deinen Alltag",
      },
      {
        type: "ul",
        items: [
          "Geh die nächste Runde bewusst ohne Handy.",
          "Beobachte deinen Hund eine Minute lang – seine Neugier, seine völlige Gegenwart.",
          "Nimm bewusst wahr, was du siehst, hörst und riechst.",
          "Wenn die Gedanken abschweifen, kehr freundlich zu deinen Sinnen zurück.",
        ],
      },
      {
        type: "p",
        text: "Du brauchst keinen Hund, um präsent zu sein. Aber wenn du einen hast, hast du einen der besten Lehrer direkt an deiner Seite. Und Präsenz ist die Tür zu allem Weiteren.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Neueste zuerst. */
export const postsSorted: Post[] = [...posts].sort((a, b) =>
  a.date < b.date ? 1 : -1,
);
