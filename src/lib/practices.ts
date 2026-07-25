/**
 * Praxis-Bibliothek des Mitgliederbereichs: gelebte Praxis statt Wissen.
 * Meditationen, Atemübungen und Rituale – jeweils mit geführter
 * Schritt-für-Schritt-Anleitung und einem Audio-/Video-Slot.
 *
 * Bodenständig gehalten (alltagstauglich, ohne Esoterik-Floskeln).
 * `relatedStage` verweist auf die passende Stufe (1–7).
 * Audio/Video: sobald eine Aufnahme vorliegt, YouTube-ID eintragen.
 */

export type Practice = {
  slug: string;
  title: string;
  /** Gruppierung: Meditationen · Atemübungen · Rituale */
  category: string;
  duration: string;
  /** Teaser für die Karten */
  summary: string;
  /** Wofür ist die Praxis gut? */
  purpose: string;
  /** Wann anwenden? */
  when: string;
  /** Kurzer einführender Text */
  intro: string;
  /** Die geführte Anleitung */
  steps: string[];
  /** Optionaler Tipp */
  tip?: string;
  /** Passende Stufe (1–7) */
  relatedStage: number;
  /** YouTube-ID (Audio/Video) – oder null */
  video: string | null;
};

export const practices: Practice[] = [
  // ---------------- Meditationen ----------------
  {
    slug: "atembeobachtung",
    title: "Atembeobachtung",
    category: "Meditationen",
    duration: "5–10 Minuten",
    summary:
      "Die Basis-Meditation: den Atem beobachten und immer wieder freundlich zurückkehren.",
    purpose:
      "Trainiert Aufmerksamkeit und den ruhigen Beobachter – die Grundfähigkeit für alles Weitere.",
    when: "Ideal für den Einstieg, morgens oder wann immer der Kopf voll ist.",
    intro:
      "Nichts leisten, nichts erreichen – nur da sein und dem Atem zusehen. Die Kunst liegt nicht darin, nicht abzuschweifen, sondern im freundlichen Zurückkehren.",
    steps: [
      "Setz dich aufrecht und bequem hin, die Augen geschlossen oder den Blick weich gesenkt.",
      "Nimm ein paar tiefere Atemzüge und lass den Atem dann in seinen natürlichen Rhythmus fallen.",
      "Richte die Aufmerksamkeit dorthin, wo du den Atem am deutlichsten spürst – Nasenspitze, Brust oder Bauch.",
      "Beobachte das Ein- und Ausatmen, ohne es zu verändern.",
      "Wenn du merkst, dass du abgeschweift bist, ist das kein Fehler. Bemerke es und kehr freundlich zum Atem zurück.",
      "Beende die Übung mit ein paar bewussten Atemzügen und öffne langsam die Augen.",
    ],
    tip: "Das Abschweifen und Zurückkehren ist die Übung – jede Rückkehr zählt wie eine Wiederholung im Training.",
    relatedStage: 2,
    video: null,
  },
  {
    slug: "innerer-beobachter",
    title: "Der innere Beobachter",
    category: "Meditationen",
    duration: "10 Minuten",
    summary:
      "Gedanken kommen und gehen lassen – und bemerken, wer da eigentlich zusieht.",
    purpose:
      "Stärkt die Distanz zwischen dir und deinen Gedanken (kognitive Defusion).",
    when: "Wenn du dich oft von Gedanken mitreißen lässt.",
    intro:
      "In dieser Meditation bist du nicht der Denker, sondern der Zeuge. Du sitzt am Ufer und siehst den Gedanken beim Vorbeiziehen zu.",
    steps: [
      "Sitz ruhig, Augen geschlossen, ein paar Atemzüge zum Ankommen.",
      "Stell dir vor, du sitzt am Ufer eines ruhigen Flusses.",
      "Jeder Gedanke, der auftaucht, ist ein Blatt, das auf dem Wasser vorbeitreibt.",
      "Leg jeden Gedanken auf ein Blatt und lass ihn ziehen – ohne mitzuschwimmen.",
      "Wenn du merkst, dass du in einen Gedanken hineingezogen wurdest, kehr ruhig ans Ufer zurück.",
      "Frage zum Schluss innerlich: Wer hat hier eigentlich die ganze Zeit zugesehen?",
    ],
    tip: "Es geht nicht darum, keine Gedanken zu haben – sondern darum, ihnen nicht zu folgen.",
    relatedStage: 3,
    video: null,
  },
  {
    slug: "body-scan",
    title: "Body-Scan",
    category: "Meditationen",
    duration: "15 Minuten",
    summary:
      "Mit der Aufmerksamkeit durch den Körper wandern und Anspannung lösen.",
    purpose:
      "Bringt dich aus dem Kopf in den Körper – die Basis für die Arbeit mit Gefühlen.",
    when: "Abends zum Runterkommen oder bei innerer Anspannung.",
    intro:
      "Gefühle und Anspannung sitzen im Körper. Der Body-Scan holt dich aus dem Grübeln ins Spüren.",
    steps: [
      "Leg dich hin oder setz dich bequem, schließe die Augen.",
      "Beginne bei den Füßen: Spür sie, ohne etwas zu verändern.",
      "Wandere langsam nach oben – Unterschenkel, Knie, Oberschenkel, Becken, Bauch, Brust.",
      "Nimm jede Region ein paar Atemzüge lang wahr. Wo Anspannung ist, atme sanft hinein.",
      "Weiter über Hände, Arme, Schultern, Nacken bis zum Gesicht und Kopf.",
      "Spür zum Schluss den ganzen Körper als Ganzes und ruhe einen Moment.",
    ],
    tip: "Nichts muss sich lösen. Allein das freundliche Wahrnehmen entspannt oft von selbst.",
    relatedStage: 4,
    video: null,
  },
  {
    slug: "herz-kohaerenz",
    title: "Herz-Kohärenz",
    category: "Meditationen",
    duration: "5–10 Minuten",
    summary:
      "Über Atem und Herz einen Zustand innerer Stimmigkeit herstellen.",
    purpose:
      "Bringt Kopf und Herz in denselben Takt – Ruhe und Klarheit zugleich.",
    when: "Vor Entscheidungen, bei Stress oder als täglicher Anker.",
    intro:
      "Wenn Atem, Herz und Gefühl zusammenspielen, entsteht ein Zustand von Ruhe und Klarheit – Herz-Kohärenz.",
    steps: [
      "Setz dich ruhig hin und leg eine Hand auf dein Herz.",
      "Atme etwas langsamer als gewohnt – etwa fünf Sekunden ein, fünf Sekunden aus.",
      "Stell dir vor, der Atem strömt direkt durch die Herzgegend ein und aus.",
      "Ruf ein Gefühl von Dankbarkeit oder Wärme hervor – für einen Menschen, einen Moment, eine Kleinigkeit.",
      "Bleib fünf bis zehn Atemzüge in diesem Zusammenspiel aus ruhigem Atem und warmem Gefühl.",
      "Kehre dann langsam zurück und nimm die Ruhe in deinen Tag mit.",
    ],
    tip: "Schon drei Minuten reichen, um deinen Zustand spürbar zu verschieben.",
    relatedStage: 6,
    video: null,
  },

  // ---------------- Atemübungen ----------------
  {
    slug: "verlaengertes-ausatmen",
    title: "Verlängertes Ausatmen",
    category: "Atemübungen",
    duration: "3–5 Minuten",
    summary:
      "Länger ausatmen als einatmen – der schnellste Weg, das Nervensystem zu beruhigen.",
    purpose:
      "Aktiviert den beruhigenden Teil des Nervensystems (den Parasympathikus).",
    when: "Bei Anspannung, Aufregung oder vor dem Einschlafen.",
    intro:
      "Ein einfacher Hebel mit großer Wirkung: Wenn das Ausatmen länger ist als das Einatmen, schaltet der Körper auf Beruhigung.",
    steps: [
      "Atme durch die Nase ein und zähle dabei innerlich bis vier.",
      "Atme ruhig aus und zähle bis sechs oder acht.",
      "Kein Pressen – das Ausatmen soll länger, aber entspannt sein.",
      "Wiederhole das für ein paar Minuten in ruhigem Rhythmus.",
      "Spür, wie der Körper mit jedem Ausatmen ein Stück mehr loslässt.",
    ],
    tip: "Nicht die Menge Luft zählt, sondern das Verhältnis: Ausatmen länger als Einatmen.",
    relatedStage: 4,
    video: null,
  },
  {
    slug: "vier-sechs-atmung",
    title: "4-6-Atmung",
    category: "Atemübungen",
    duration: "3 Minuten",
    summary:
      "Ein klarer Rhythmus – 4 Sekunden ein, 6 Sekunden aus – für schnelle Beruhigung.",
    purpose:
      "Bringt Atem und Nervensystem in wenigen Minuten zur Ruhe.",
    when: "Akut bei Stress, vor Gesprächen oder in Wartemomenten.",
    intro:
      "Wenn du einen festen Rhythmus brauchst, gibt dir die 4-6-Atmung Halt: einatmen auf vier, ausatmen auf sechs.",
    steps: [
      "Atme durch die Nase ein und zähle langsam bis vier.",
      "Atme durch die Nase oder den leicht geöffneten Mund aus und zähle bis sechs.",
      "Halte keine Luft an – der Übergang bleibt weich.",
      "Wiederhole den Zyklus etwa acht bis zehn Mal.",
      "Kehre danach zu deinem natürlichen Atem zurück und bemerke den Unterschied.",
    ],
    tip: "Unauffällig genug für den Alltag – niemand merkt, dass du sie gerade nutzt.",
    relatedStage: 4,
    video: null,
  },
  {
    slug: "box-breathing",
    title: "Box Breathing",
    category: "Atemübungen",
    duration: "3–5 Minuten",
    summary: "Vier gleiche Phasen im Quadrat – für Fokus und Ruhe unter Druck.",
    purpose:
      "Schafft Klarheit und Zentrierung, besonders in fordernden Situationen.",
    when: "Vor herausfordernden Momenten, wenn du Fokus und Gelassenheit zugleich brauchst.",
    intro:
      "Box Breathing wird sogar in Hochdruck-Berufen genutzt: vier gleich lange Phasen bilden ein „Quadrat“ aus Atem – ruhig und klar.",
    steps: [
      "Atme vier Sekunden lang ein.",
      "Halte den Atem vier Sekunden.",
      "Atme vier Sekunden lang aus.",
      "Halte vier Sekunden – dann beginnt der Zyklus von vorn.",
      "Wiederhole vier bis sechs Runden in ruhigem Tempo.",
    ],
    tip: "Wenn vier Sekunden zu lang sind, beginne mit drei. Der gleichmäßige Rhythmus ist wichtiger als die Länge.",
    relatedStage: 6,
    video: null,
  },

  // ---------------- Rituale ----------------
  {
    slug: "morgen-ausrichtung",
    title: "Morgen-Ausrichtung",
    category: "Rituale",
    duration: "5 Minuten",
    summary: "Den Tag bewusst beginnen, bevor der Autopilot übernimmt.",
    purpose:
      "Setzt eine bewusste Ausrichtung, statt unbemerkt in den Tag zu stolpern.",
    when: "Direkt nach dem Aufwachen, vor dem ersten Griff zum Handy.",
    intro:
      "Die ersten Minuten des Tages prägen seinen Ton. Statt sofort in Nachrichten und To-dos zu kippen, richtest du dich bewusst aus.",
    steps: [
      "Bleib nach dem Aufwachen einen Moment liegen oder sitzen – ohne Handy.",
      "Nimm drei ruhige Atemzüge und komm im Körper an.",
      "Frage dich: Wie will ich diesem Tag begegnen? Wähle ein Wort oder eine Absicht.",
      "Stell dir kurz vor, wie es sich anfühlt, aus dieser Haltung durch den Tag zu gehen.",
      "Nimm dir eine kleine konkrete Sache vor, die zu dieser Ausrichtung passt.",
    ],
    tip: "Ein Wort reicht – „Ruhe“, „Mut“, „Klarheit“. Es wirkt als leiser Kompass im Hintergrund.",
    relatedStage: 5,
    video: null,
  },
  {
    slug: "abend-reflexion",
    title: "Abend-Reflexion",
    category: "Rituale",
    duration: "5–10 Minuten",
    summary: "Den Tag ohne Wertung anschauen – und daraus lernen.",
    purpose: "Schult den inneren Beobachter und schließt den Tag bewusst ab.",
    when: "Abends, vor dem Schlafengehen.",
    intro:
      "Nicht bewerten, nur bemerken: Die Abend-Reflexion macht Muster sichtbar und beruhigt den Kopf vor dem Schlaf.",
    steps: [
      "Setz dich ruhig hin, vielleicht mit einem Notizbuch.",
      "Lass den Tag in ein paar Atemzügen vor deinem inneren Auge vorbeiziehen.",
      "Frage: Wo war ich heute bewusst? Wo hat der Autopilot übernommen?",
      "Frage: Wofür bin ich heute dankbar – und sei es eine Kleinigkeit?",
      "Halte eine Erkenntnis für morgen fest, ohne dich zu verurteilen.",
    ],
    tip: "Es geht nicht um Bilanz oder Selbstkritik, sondern um freundliches Bemerken.",
    relatedStage: 3,
    video: null,
  },
  {
    slug: "loslass-ritual",
    title: "Loslass-Ritual",
    category: "Rituale",
    duration: "15 Minuten",
    summary: "Bewusst etwas abschließen, das du nicht länger tragen willst.",
    purpose:
      "Gibt dem Loslassen eine Form – Körper und Psyche verstehen Rituale.",
    when: "Wenn dich etwas Altes belastet und du einen Schlusspunkt setzen willst.",
    intro:
      "Manches lässt sich nicht wegdenken, aber verabschieden. Ein Ritual gibt dem Loslassen einen klaren, spürbaren Rahmen.",
    steps: [
      "Nimm dir Zeit und einen ruhigen Ort. Schreib auf, was du loslassen möchtest – ehrlich und ungefiltert.",
      "Lies es dir einmal langsam durch und spür, was hochkommt.",
      "Sprich innerlich oder laut einen Satz des Abschlusses in deinen eigenen Worten.",
      "Zerreiße oder verbrenne das Blatt bewusst als sichtbares Zeichen des Loslassens.",
      "Atme ein paar Mal tief durch und spür den Raum, der entstanden ist.",
    ],
    tip: "Der Körper glaubt Handlungen mehr als Gedanken – das sichtbare Zeichen macht den Unterschied.",
    relatedStage: 4,
    video: null,
  },
];

export function getPractice(slug: string): Practice | undefined {
  return practices.find((p) => p.slug === slug);
}

export function practicesForStage(stageNr: number): Practice[] {
  return practices.filter((p) => p.relatedStage === stageNr);
}

export function practicesByCategory(): { category: string; items: Practice[] }[] {
  const groups: { category: string; items: Practice[] }[] = [];
  for (const practice of practices) {
    let group = groups.find((g) => g.category === practice.category);
    if (!group) {
      group = { category: practice.category, items: [] };
      groups.push(group);
    }
    group.items.push(practice);
  }
  return groups;
}
