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
  /** YouTube-ID (Video) – oder null */
  video: string | null;
  /** MP3-Quelle zum Anhören: /pfad-in-public.mp3 oder volle URL – oder weglassen */
  audio?: string | null;
  /**
   * Eigene Reflexionsfragen für den „Nachklang"-Block (fließen ins Journal).
   * Weglassen → es greifen die allgemeinen Fragen (DEFAULT_PRACTICE_REFLECTION).
   */
  reflection?: string[];
};

/**
 * Allgemeine Reflexionsfragen nach einer Praxis. Bewusst kurz und für jede Übung
 * passend – so lässt sich die Praxis sofort ans Journal anbinden, auch bevor für
 * jede Übung eigene Fragen formuliert sind. Einzelne Übungen können über das
 * optionale `reflection`-Feld eigene Fragen setzen.
 */
export const DEFAULT_PRACTICE_REFLECTION: string[] = [
  "Was hast du während dieser Übung bemerkt – im Körper, im Atem, in den Gedanken?",
  "Wie fühlst du dich jetzt im Vergleich zu vorher?",
];

/** Die Reflexionsfragen einer Praxis (eigene, sonst die allgemeinen). */
export function practiceReflection(practice: Practice): string[] {
  return practice.reflection && practice.reflection.length > 0
    ? practice.reflection
    : DEFAULT_PRACTICE_REFLECTION;
}

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
    video: "3XiHP4U683Q",
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
    slug: "autopilot-check",
    title: "Der Autopilot-Check",
    category: "Rituale",
    duration: "2 Minuten",
    summary:
      "Ein kurzer Stopp mitten im Tag, der den Autopiloten für einen Moment sichtbar macht.",
    purpose:
      "Trainiert das Bemerken – die erste und wichtigste Fähigkeit, um aus automatischen Mustern auszusteigen.",
    when: "Ein- bis dreimal am Tag, am besten an eine feste Gewohnheit gekoppelt (z. B. nach dem Mittagessen).",
    intro:
      "Solange der Autopilot unsichtbar bleibt, fühlt er sich einfach wie „du“ an. Dieser Mini-Check unterbricht den Automatismus für einen Augenblick – mehr braucht es am Anfang nicht.",
    steps: [
      "Halte kurz inne, wo immer du gerade bist – im Stehen, Sitzen oder Gehen.",
      "Nimm einen bewussten Atemzug und frag dich: Was tue ich gerade – und bin ich wirklich dabei?",
      "Bemerke, was in dir läuft: Welcher Gedanke, welche Stimmung, welcher Impuls?",
      "Benenne es innerlich in einem Wort („Eile“, „Sorge“, „Leere“) – ohne es zu bewerten.",
      "Atme aus und geh weiter. Du hast den Autopiloten für einen Moment gesehen – das genügt.",
    ],
    tip: "Koppel den Check an einen festen Auslöser – Türklinke, rote Ampel, erster Schluck Kaffee. So erinnerst du dich, ohne daran denken zu müssen.",
    relatedStage: 1,
    video: null,
  },
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
  {
    slug: "praesenz-spaziergang",
    title: "Präsenz-Spaziergang",
    category: "Rituale",
    duration: "10–20 Minuten",
    summary:
      "Ein Spaziergang, der dich raus aus dem Kopf und rein in den Moment holt – besonders schön mit Hund.",
    purpose:
      "Trainiert Präsenz im Alltag über die Sinne – Bewusstsein wird konkret erfahrbar.",
    when: "Wann immer der Kopf voll ist. Ein Hund ist dabei der beste Lehrer.",
    intro:
      "Präsenz muss nicht auf dem Meditationskissen stattfinden. Ein bewusster Spaziergang ist gelebte Achtsamkeit – und ein Hund lebt ganz selbstverständlich im Jetzt, was wir sonst mühsam üben.",
    steps: [
      "Lass das Handy weg oder schalt es stumm. Dieser Spaziergang gehört dem Moment.",
      "Geh die ersten Minuten bewusst langsamer als gewohnt und spüre deine Schritte.",
      "Nimm nacheinander wahr: fünf Dinge, die du siehst, drei, die du hörst, eines, das du riechst.",
      "Wenn du einen Hund dabei hast, beobachte ihn eine Weile – seine Neugier, seine völlige Gegenwart.",
      "Wenn deine Gedanken abschweifen, kehr freundlich zu deinen Sinnen zurück – so oft es nötig ist.",
    ],
    tip: "Nicht die Strecke zählt, sondern wie oft du bewusst zurückkehrst. Jede Rückkehr ist Training.",
    relatedStage: 2,
    video: null,
  },
  {
    slug: "taegliche-rueckkehr",
    title: "Die tägliche Rückkehr",
    category: "Rituale",
    duration: "5 Minuten",
    summary:
      "Meisterschaft ist kein Zustand, den man erreicht – sondern eine tägliche Rückkehr in die eigene Mitte.",
    purpose:
      "Verankert das Erreichte als gelebte Haltung – und hält den Blick offen fürs Weitergeben.",
    when: "Als täglicher Ankerpunkt, morgens oder abends – gerade dann, wenn scheinbar „alles läuft“.",
    intro:
      "Auf dieser Stufe geht es nicht mehr ums Erreichen, sondern ums Bewahren und Weitergeben. Die Kunst ist, immer wieder bewusst in die eigene Mitte zurückzukehren, statt sie für selbstverständlich zu halten.",
    steps: [
      "Setz dich ruhig hin und spür für ein paar Atemzüge nach: Wie präsent bin ich heute wirklich?",
      "Erinnere dich an einen Moment, in dem du kürzlich bewusst gestaltet hast, statt zu reagieren. Lass das Gefühl kurz da sein.",
      "Frag dich: Wo hat mich zuletzt etwas aus der Mitte geworfen – und wie bin ich zurückgekehrt?",
      "Richte dich neu aus: Welche Haltung will ich heute verkörpern – für mich und für die Menschen um mich?",
      "Wähle eine kleine Geste des Weitergebens: ein offenes Ohr, ein ehrliches Wort, ein Moment echter Präsenz.",
    ],
    tip: "Nicht das Nie-mehr-Fallen ist Meisterschaft, sondern das ruhige, wertfreie Zurückkehren – jeden Tag aufs Neue.",
    relatedStage: 7,
    video: null,
  },
];

export function getPractice(slug: string): Practice | undefined {
  return practices.find((p) => p.slug === slug);
}

/** Erste Praxis mit einer Aufnahme (Video oder MP3) – fürs „Jetzt anhören". */
export function featuredPractice(): Practice | undefined {
  return practices.find((p) => p.video || p.audio);
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
