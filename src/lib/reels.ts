/**
 * Reels-Produktion (Kurzvideos für Instagram/TikTok/Shorts).
 *
 * Die ausformulierten Skripte liegen in `docs/skripte/reels/`. Hier steht der
 * Produktions-Status je Reel fürs Marketing-Cockpit: sobald ein Reel gedreht
 * (bzw. veröffentlicht) ist, `filmed` auf `true` setzen.
 */
export type Reel = {
  topic: string;
  /** Bei mehreren Reels pro Thema: A / B / C */
  variant?: string;
  /** Kurz-Hook / Aufhänger (Kurzfassung; volles Skript in docs/skripte/reels) */
  hook?: string;
  filmed: boolean;
};

export type ReelSeries = {
  key: string;
  label: string;
  /** Quelle der ausformulierten Skripte (relativ zum Repo) */
  script: string;
  reels: Reel[];
};

export const reelSeries: ReelSeries[] = [
  {
    key: "selbstverteidigung",
    label: "Mentale Selbstverteidigung",
    script: "docs/skripte/reels/mentale-selbstverteidigung.md",
    reels: [
      { topic: "Propaganda", hook: "Ohne eine einzige Lüge", filmed: false },
      { topic: "Framing", hook: "Ein Wort ändert alles", filmed: false },
      { topic: "Sprache & Etiketten", hook: "Ein Wort beendet jede Debatte", filmed: false },
      { topic: "Medien-Agenda", hook: "Nicht WAS – sondern WORÜBER", filmed: false },
      { topic: "Algorithmen", hook: "Dein Feed ≠ die Welt", filmed: false },
      { topic: "Werbung & Mangel", hook: "Sie verkauft dir den Mangel", filmed: false },
      { topic: "Gruppendruck", hook: "Laut ≠ Mehrheit", filmed: false },
      { topic: "Autoritätshörigkeit", hook: "Titel ≠ Wahrheit", filmed: false },
      { topic: "Angst-Steuerung", hook: "Angst macht dich lenkbar", filmed: false },
      { topic: "Wiederholung", hook: "Oft gehört = wahr?", filmed: false },
      { topic: "Ablenkung", hook: "Keine Lüge. Nur Lärm.", filmed: false },
      { topic: "Kognitive Dissonanz", hook: "Warum du wegschaust", filmed: false },
      { topic: "Normalisierung", hook: "„War doch schon immer so?“", filmed: false },
      { topic: "Bildmacht", hook: "Ein Bild ist kein Beweis", filmed: false },
      { topic: "Identität & Meinung", hook: "Hast du eine Meinung – oder sie dich?", filmed: false },
      { topic: "Reizüberflutung", hook: "Dein Gehirn im Daueralarm", filmed: false },
    ],
  },
  {
    key: "stufen",
    label: "Die 7 Stufen",
    script: "docs/skripte/reels/stufen.md",
    reels: [
      { topic: "Autopilot", variant: "A", hook: "Das meiste an deinem Tag hast du heute nicht entschieden.", filmed: false },
      { topic: "Autopilot", variant: "B", hook: "Vieles, was du für deinen Charakter hältst, ist antrainiert.", filmed: false },
      { topic: "Autopilot", variant: "C", hook: "Eine Frage, die dich mitten am Tag aufweckt.", filmed: false },
      { topic: "Erwachen", variant: "A", hook: "Zwischen dir und deinen Gedanken ist ein winziger Abstand.", filmed: false },
      { topic: "Erwachen", variant: "B", hook: "Wenn du deine Gedanken hören kannst – wer hört dann zu?", filmed: false },
      { topic: "Erwachen", variant: "C", hook: "Drei Atemzüge, die deinen Autopiloten unterbrechen.", filmed: false },
      { topic: "Selbstbeobachtung", variant: "A", hook: "Du schwimmst in deinen Gedanken mit – ohne es zu merken.", filmed: false },
      { topic: "Selbstbeobachtung", variant: "B", hook: "Ein einziges Wort löst dich aus dem Griff eines Gedankens.", filmed: false },
      { topic: "Selbstbeobachtung", variant: "C", hook: "So bringst du Ordnung in dein Gedankenchaos.", filmed: false },
      { topic: "Emotionale Reifung", variant: "A", hook: "Gefühle, die du nicht fühlst, verschwinden nicht. Sie warten.", filmed: false },
      { topic: "Emotionale Reifung", variant: "B", hook: "Ein schweres Gefühl dauert kürzer, als du befürchtest.", filmed: false },
      { topic: "Emotionale Reifung", variant: "C", hook: "Sag deinem Gefühl diesen einen Satz.", filmed: false },
      { topic: "Schöpferkraft", variant: "A", hook: "Was du oft denkst, wird zur Straße in deinem Kopf.", filmed: false },
      { topic: "Schöpferkraft", variant: "B", hook: "Deshalb funktionieren die meisten Affirmationen nicht.", filmed: false },
      { topic: "Schöpferkraft", variant: "C", hook: "Die ersten drei Minuten entscheiden über deinen Tag.", filmed: false },
      { topic: "Innere Ausrichtung", variant: "A", hook: "Du denkst das eine, fühlst das andere, tust ein drittes.", filmed: false },
      { topic: "Innere Ausrichtung", variant: "B", hook: "Dein Kopf ist ein brillanter Diener – aber ein schlechter Meister.", filmed: false },
      { topic: "Innere Ausrichtung", variant: "C", hook: "Drei Fragen, die deine innere Spannung sichtbar machen.", filmed: false },
      { topic: "Meisterschaft", variant: "A", hook: "Meisterschaft ist kein Zustand ohne Sturm.", filmed: false },
      { topic: "Meisterschaft", variant: "B", hook: "Niemand ist ‚für immer' Meister. Auch du nicht.", filmed: false },
      { topic: "Meisterschaft", variant: "C", hook: "Wenn dich etwas triggert, stell dir diese eine Frage.", filmed: false },
    ],
  },
  {
    key: "praxis",
    label: "Praxis",
    script: "docs/skripte/reels/praxis.md",
    reels: [
      { topic: "Atembeobachtung", variant: "A", filmed: false },
      { topic: "Atembeobachtung", variant: "B", filmed: false },
      { topic: "Der innere Beobachter", variant: "A", filmed: false },
      { topic: "Der innere Beobachter", variant: "B", filmed: false },
      { topic: "Body-Scan", variant: "A", filmed: false },
      { topic: "Body-Scan", variant: "B", filmed: false },
      { topic: "Herz-Kohärenz", variant: "A", filmed: false },
      { topic: "Herz-Kohärenz", variant: "B", filmed: false },
      { topic: "Verlängertes Ausatmen", variant: "A", filmed: false },
      { topic: "Verlängertes Ausatmen", variant: "B", filmed: false },
      { topic: "4-6-Atmung", variant: "A", filmed: false },
      { topic: "4-6-Atmung", variant: "B", filmed: false },
      { topic: "Box Breathing", variant: "A", filmed: false },
      { topic: "Box Breathing", variant: "B", filmed: false },
      { topic: "Der Autopilot-Check", variant: "A", filmed: false },
      { topic: "Der Autopilot-Check", variant: "B", filmed: false },
      { topic: "Morgen-Ausrichtung", variant: "A", filmed: false },
      { topic: "Morgen-Ausrichtung", variant: "B", filmed: false },
      { topic: "Abend-Reflexion", variant: "A", filmed: false },
      { topic: "Abend-Reflexion", variant: "B", filmed: false },
      { topic: "Loslass-Ritual", variant: "A", filmed: false },
      { topic: "Loslass-Ritual", variant: "B", filmed: false },
      { topic: "Präsenz-Spaziergang", variant: "A", filmed: false },
      { topic: "Präsenz-Spaziergang", variant: "B", filmed: false },
      { topic: "Die tägliche Rückkehr", variant: "A", filmed: false },
      { topic: "Die tägliche Rückkehr", variant: "B", filmed: false },
    ],
  },
  {
    key: "vertiefungen",
    label: "Vertiefungen",
    script: "docs/skripte/reels/vertiefungen.md",
    reels: [
      { topic: "Automatische Gedanken", variant: "A", filmed: false },
      { topic: "Automatische Gedanken", variant: "B", filmed: false },
      { topic: "Konditionierung", variant: "A", filmed: false },
      { topic: "Konditionierung", variant: "B", filmed: false },
      { topic: "Kognitive Verzerrungen", variant: "A", filmed: false },
      { topic: "Kognitive Verzerrungen", variant: "B", filmed: false },
      { topic: "Kernüberzeugungen", variant: "A", filmed: false },
      { topic: "Kernüberzeugungen", variant: "B", filmed: false },
      { topic: "Der innere Kritiker", variant: "A", filmed: false },
      { topic: "Der innere Kritiker", variant: "B", filmed: false },
      { topic: "Neuroplastizität", variant: "A", filmed: false },
      { topic: "Neuroplastizität", variant: "B", filmed: false },
      { topic: "Die Reiz-Reaktions-Lücke", variant: "A", filmed: false },
      { topic: "Die Reiz-Reaktions-Lücke", variant: "B", filmed: false },
      { topic: "Grübeln & Gedankenkreisen", variant: "A", filmed: false },
      { topic: "Grübeln & Gedankenkreisen", variant: "B", filmed: false },
      { topic: "Emotionsregulation", variant: "A", filmed: false },
      { topic: "Emotionsregulation", variant: "B", filmed: false },
      { topic: "Selbstmitgefühl", variant: "A", filmed: false },
      { topic: "Selbstmitgefühl", variant: "B", filmed: false },
      { topic: "Werte & Ziele", variant: "A", filmed: false },
      { topic: "Werte & Ziele", variant: "B", filmed: false },
      { topic: "Muster, Körper & Gesundheit", variant: "A", filmed: false },
      { topic: "Muster, Körper & Gesundheit", variant: "B", filmed: false },
      { topic: "Integration & Weitergabe", variant: "A", filmed: false },
      { topic: "Integration & Weitergabe", variant: "B", filmed: false },
    ],
  },
  {
    key: "landing",
    label: "Landing / Funnel",
    script: "docs/skripte/landing/reel-nicht-deine-schuld.md",
    reels: [
      { topic: "Nicht deine Schuld", hook: "Was, wenn dein Problem nie zu wenig Disziplin war?", filmed: false },
    ],
  },
  {
    key: "wissenschaft",
    label: "Die Wissenschaft dahinter",
    script: "docs/skripte/reels/wissenschaft.md",
    reels: [
      { topic: "Freier Wille", hook: "Dein Gehirn entscheidet, bevor du es merkst.", filmed: false },
      { topic: "Neuroplastizität", hook: "Dein Gehirn baut sich ständig um.", filmed: false },
      { topic: "Gefühle benennen", hook: "Ein Wort beruhigt dein aufgewühltes Gehirn.", filmed: false },
      { topic: "Denkfehler", hook: "Du liegst nicht zufällig daneben – sondern vorhersehbar.", filmed: false },
      { topic: "Willenskraft", hook: "Wenn Disziplin reicht – warum scheitert sie so oft?", filmed: false },
      { topic: "Abschweifender Geist", hook: "Fast die Hälfte des Tages bist du gedanklich woanders.", filmed: false },
      { topic: "Placebo", hook: "Eine Überzeugung verändert echte Körperprozesse.", filmed: false },
    ],
  },
];

export const allReels: Reel[] = reelSeries.flatMap((s) => s.reels);
