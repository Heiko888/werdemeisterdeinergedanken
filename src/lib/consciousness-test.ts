/**
 * Bewusstseinstest „Wo findest du dich gerade?“
 * 7 Stufen der Bewusstseinsentwicklung (Entwicklungsreise-Fassung),
 * 21 Aussagen (3 pro Stufe) und ausführliche Auswertungen.
 *
 * Auswertung: Pro Stufe werden die 3 zugehörigen Antworten summiert
 * (0–4 je Aussage → max. 12 pro Stufe). Die Stufe mit der höchsten
 * Punktzahl ist die aktuelle Hauptstufe; bei Gleichstand die niedrigere.
 *
 * Texte sind markengerecht vorformuliert – gern anpassen/verfeinern.
 */

export type TestStageResult = {
  /** Merkmale + aktuelle Denk-/Verhaltensweisen */
  summary: string;
  /** Aktuelle Herausforderung */
  challenge: string;
  /** Potenzial dieser Stufe */
  potential: string;
  /** Nächster Entwicklungsschritt */
  nextStep: string;
  /** Konkrete Empfehlung */
  recommendation: string;
};

export type TestStage = {
  nr: number;
  name: string;
  tagline: string;
  result: TestStageResult;
};

export type TestQuestion = {
  /** Zugehörige Stufe (1–7) */
  stage: number;
  text: string;
};

export type AnswerOption = { label: string; value: number };

/** Antwortskala (0–4) */
export const answerScale: AnswerOption[] = [
  { label: "Trifft gar nicht zu", value: 0 },
  { label: "Trifft eher nicht zu", value: 1 },
  { label: "Teils, teils", value: 2 },
  { label: "Trifft eher zu", value: 3 },
  { label: "Trifft voll zu", value: 4 },
];

export const MAX_PER_STAGE = 12; // 3 Aussagen × 4 Punkte

export const testStages: TestStage[] = [
  {
    nr: 1,
    name: "Autopilot",
    tagline: "Du wirst gelebt",
    result: {
      summary:
        "Du lebst gerade vieles im Autopilot. Reaktionen, Gewohnheiten und Gedanken laufen weitgehend automatisch ab, ohne dass du sie bewusst wählst. Das ist kein Makel – dein System hält dich so funktionsfähig. Oft zeigt sich diese Stufe als ständiges Funktionieren, wenig Zwischenraum und das Gefühl, eher getrieben zu werden als zu gestalten.",
      challenge:
        "Deine größte Herausforderung ist, den Autopiloten überhaupt zu bemerken. Solange Muster unsichtbar bleiben, fühlen sie sich einfach wie „du“ an – und genau deshalb wiederholen sie sich.",
      potential:
        "In dir steckt bereits die leise Ahnung, dass mehr möglich ist. Diese Unruhe ist kein Problem, sondern der erste Funke: Sie zeigt, dass ein Teil von dir schon wacher werden will.",
      nextStep:
        "Hol dir kleine Momente der Bewusstheit in den Alltag: einmal am Tag kurz innehalten und bemerken, was du gerade denkst und fühlst – ganz ohne es zu ändern.",
      recommendation:
        "Ein guter Einstieg ist das kostenlose E-Book. Wenn du magst, schauen wir in einem Gespräch gemeinsam, wo dein Autopilot dich am stärksten steuert.",
    },
  },
  {
    nr: 2,
    name: "Erwachen",
    tagline: "Du bemerkst es",
    result: {
      summary:
        "Du bist am Erwachen. Du spürst zunehmend, dass etwas nicht mehr stimmt – auch wenn du es noch nicht genau benennen kannst. Die Vorstellung, dass du mehr bist als deine Gedanken und Reaktionen, fühlt sich für dich stimmig an. Du beginnst zu hinterfragen, warum du bestimmte Dinge tust.",
      challenge:
        "Erwachen ist unbequem: Du siehst Dinge, die du vorher übersehen hast, kannst sie aber noch nicht auflösen. Die Gefahr ist, in Grübeln oder Selbstkritik hängen zu bleiben, statt neugierig weiterzuschauen.",
      potential:
        "Du stehst an der Schwelle jeder echten Veränderung. Was du jetzt erkennst, kann nicht mehr unbemerkt über dich bestimmen – das ist eine enorme Chance.",
      nextStep:
        "Übe, deine Gedanken zu bemerken, ohne dich sofort mit ihnen zu identifizieren. Ein einfacher Satz hilft: „Da ist ein Gedanke“ statt „So ist es“.",
      recommendation:
        "Die ersten Stufen im Mitgliederbereich und tägliche kleine Beobachtungsübungen passen jetzt ideal. Bei Fragen begleite ich dich gern persönlich.",
    },
  },
  {
    nr: 3,
    name: "Selbstbeobachtung",
    tagline: "Du siehst dir zu",
    result: {
      summary:
        "Du hast gelernt, dir selbst zuzusehen. Du kannst deine Gedanken zunehmend beobachten, ohne ihnen sofort zu glauben, und bemerkst im Moment, wenn ein altes Muster anspringt. Immer öfter gelingt es dir, kurz innezuhalten, bevor du reagierst.",
      challenge:
        "Die Herausforderung ist, vom Erkennen ins Verändern zu kommen. Beobachten kann bequem werden – du siehst deine Muster, aber sie laufen trotzdem noch. Jetzt geht es darum, an die Wurzel zu gehen.",
      potential:
        "Du hast den inneren Beobachter etabliert – das Fundament für alles Weitere. Aus dieser Distanz heraus kannst du beginnen, bewusst zu wählen statt nur zu reagieren.",
      nextStep:
        "Nimm dir ein wiederkehrendes Muster vor und geh seiner Herkunft nach: Welcher Glaubenssatz, welche alte Erfahrung steckt darunter?",
      recommendation:
        "Die Stufe „Entprogrammieren“ und die Vertiefungen zu Konditionierung und Kernüberzeugungen sind jetzt dein nächster Schritt.",
    },
  },
  {
    nr: 4,
    name: "Emotionale Reifung",
    tagline: "Du lässt los",
    result: {
      summary:
        "Du reifst emotional. Du kannst schwierige Gefühle zulassen und aushalten, ohne sie wegzudrücken oder an ihnen zu zerbrechen. Alte Verletzungen haben immer weniger Macht über dein heutiges Handeln, und du übernimmst Verantwortung für deine Gefühle, statt anderen die Schuld zu geben.",
      challenge:
        "Die Herausforderung ist, alte Geschichten wirklich abzuschließen, statt sie nur zu verstehen. Manchmal hält der Verstand fest, was das Herz längst loslassen möchte.",
      potential:
        "Mit jeder losgelassenen Last wird Energie frei. Du gewinnst innere Ruhe und Stabilität – die Basis, um dein Leben aktiv zu gestalten, statt es zu verwalten.",
      nextStep:
        "Gib festgehaltenen Gefühlen bewusst Raum. Spür sie im Körper, atme hinein und lass sie als Welle durch dich hindurchziehen.",
      recommendation:
        "Die Stufe „Emotionale Reifung“ und die Vertiefung zur Emotionsregulation unterstützen dich hier gezielt.",
    },
  },
  {
    nr: 5,
    name: "Schöpferkraft",
    tagline: "Du erschaffst bewusst",
    result: {
      summary:
        "Du entdeckst deine Schöpferkraft. Du wählst bewusst Gedanken und Überzeugungen, die dich stärken, und erlebst, dass deine innere Ausrichtung deine äußere Realität beeinflusst. Vor allem setzt du das, was du erkennst, aktiv in Handlungen um.",
      challenge:
        "Die Herausforderung ist, Vision und Handlung verbunden zu halten – nicht ins reine Wünschen abzurutschen und nicht ins reine Machen ohne inneren Kompass. Manifestation lebt vom Zusammenspiel beider.",
      potential:
        "Du bewegst dich vom Bewältigen zum Gestalten. Du bist nicht mehr nur Beobachter deines Lebens, sondern beginnst, es bewusst zu formen.",
      nextStep:
        "Verankere eine stärkende innere Ausrichtung täglich – mit Gefühl – und übersetze sie in eine konkrete Handlung, so klein sie auch ist.",
      recommendation:
        "Die Stufe „Schöpferkraft“ und die Vertiefungen zu Neuroplastizität und Werten & Zielen bringen dich hier weiter.",
    },
  },
  {
    nr: 6,
    name: "Innere Ausrichtung",
    tagline: "Kopf, Herz und Handeln",
    result: {
      summary:
        "Du lebst zunehmend in innerer Ausrichtung. Dein Denken, Fühlen und Handeln ziehen meist an einem Strang. Du triffst Entscheidungen aus einer inneren Stimmigkeit heraus statt aus Angst und spürst eine klare Richtung, die sich ruhig und stimmig anfühlt.",
      challenge:
        "Die Herausforderung ist, diese Kohärenz auch unter Druck und in Konflikten zu halten – gerade dann, wenn das alte System dich in Hektik oder Anpassung ziehen will.",
      potential:
        "Aus dieser Stimmigkeit entstehen Präsenz und Ausstrahlung. Menschen spüren deine Klarheit, und dein Handeln wird müheloser, weil kein innerer Widerspruch mehr Energie frisst.",
      nextStep:
        "Pflege bewusst Momente der Kohärenz – etwa über ruhige Herz-Atmung – und richte auch die kleinen Alltagsentscheidungen an deinen Werten aus.",
      recommendation:
        "Die Stufe „Innere Ausrichtung“ vertieft genau das. Ein begleitendes Gespräch hilft, deine Ausrichtung konkret ins Leben zu bringen.",
    },
  },
  {
    nr: 7,
    name: "Meisterschaft",
    tagline: "Du gestaltest",
    result: {
      summary:
        "Du bewegst dich in Richtung Meisterschaft. Du ruhst so in dir, dass äußere Umstände dich selten aus der Mitte werfen. Auch in Herausforderungen bleibst du präsent und gestaltest bewusst, statt zu reagieren – und aus deiner inneren Freiheit heraus gibst du etwas weiter.",
      challenge:
        "Die Herausforderung ist, nicht stehen zu bleiben. Meisterschaft ist kein Zustand, den man erreicht und besitzt, sondern eine Haltung, die täglich neu gelebt wird – mit Demut und ohne sich zu überhöhen.",
      potential:
        "Du bist zu einem ruhigen Zentrum geworden – für dich und für andere. Dein größtes Potenzial liegt jetzt im Weitergeben: als Vorbild durch die Art, wie du bist.",
      nextStep:
        "Bleib in der täglichen Praxis und richte deinen Blick nach außen: Wo kannst du das, was du gefunden hast, für andere nutzbar machen?",
      recommendation:
        "Lass uns über Wege sprechen, wie du deine Reife weitergeben und vertiefen kannst – im Austausch oder in gemeinsamer Arbeit.",
    },
  },
];

export const testQuestions: TestQuestion[] = [
  // Stufe 1 – Autopilot
  {
    stage: 1,
    text: "Ich funktioniere meist im Autopilot und merke oft erst hinterher, warum ich so reagiert habe.",
  },
  {
    stage: 1,
    text: "Meine Tage laufen häufig gleich ab, ohne dass ich bewusst entscheide.",
  },
  {
    stage: 1,
    text: "Wenn mich etwas triggert, reagiere ich sofort – bewusstes Nachdenken kommt später, wenn überhaupt.",
  },

  // Stufe 2 – Erwachen
  {
    stage: 2,
    text: "In letzter Zeit spüre ich, dass etwas nicht mehr stimmt – auch wenn ich es nicht genau benennen kann.",
  },
  {
    stage: 2,
    text: "Ich ahne, dass ich mehr bin als meine Gedanken und automatischen Reaktionen.",
  },
  {
    stage: 2,
    text: "Ich fange an, ehrlich zu hinterfragen, warum ich bestimmte Dinge tue.",
  },

  // Stufe 3 – Selbstbeobachtung
  {
    stage: 3,
    text: "Ich kann meine Gedanken zunehmend beobachten, ohne ihnen sofort zu glauben.",
  },
  {
    stage: 3,
    text: "Mir fällt schon im Moment auf, wenn ein altes Muster in mir anspringt.",
  },
  {
    stage: 3,
    text: "Ich schaffe es immer öfter, kurz innezuhalten, bevor ich reagiere.",
  },

  // Stufe 4 – Emotionale Reifung
  {
    stage: 4,
    text: "Ich kann schwierige Gefühle zulassen und aushalten, ohne sie wegzudrücken oder daran zu zerbrechen.",
  },
  {
    stage: 4,
    text: "Alte Verletzungen haben immer weniger Macht über mein heutiges Handeln.",
  },
  {
    stage: 4,
    text: "Ich übernehme Verantwortung für meine Gefühle, statt anderen die Schuld zu geben.",
  },

  // Stufe 5 – Schöpferkraft
  {
    stage: 5,
    text: "Ich wähle bewusst Gedanken und Überzeugungen, die mich stärken.",
  },
  {
    stage: 5,
    text: "Ich erlebe, dass meine innere Ausrichtung meine äußere Realität beeinflusst.",
  },
  {
    stage: 5,
    text: "Ich setze das, was ich erkenne, aktiv in konkrete Handlungen um.",
  },

  // Stufe 6 – Innere Ausrichtung
  {
    stage: 6,
    text: "Mein Denken, Fühlen und Handeln ziehen meist an einem Strang.",
  },
  {
    stage: 6,
    text: "Ich treffe Entscheidungen aus einer inneren Stimmigkeit heraus, nicht aus Angst.",
  },
  {
    stage: 6,
    text: "Ich spüre eine klare Richtung in meinem Leben, die sich ruhig und stimmig anfühlt.",
  },

  // Stufe 7 – Meisterschaft
  {
    stage: 7,
    text: "Ich ruhe so in mir, dass mich äußere Umstände selten aus der Mitte werfen.",
  },
  {
    stage: 7,
    text: "Auch in Herausforderungen bleibe ich präsent und gestalte bewusst, statt nur zu reagieren.",
  },
  {
    stage: 7,
    text: "Ich lebe aus einer inneren Freiheit heraus und gebe davon etwas an andere weiter.",
  },
];

/** Punkte je Stufe (Index 0 = Stufe 1). */
export function scoreByStage(answers: (number | null)[]): number[] {
  const scores = new Array(testStages.length).fill(0);
  testQuestions.forEach((q, i) => {
    scores[q.stage - 1] += answers[i] ?? 0;
  });
  return scores;
}

/** Aktuelle Hauptstufe (1–7); bei Gleichstand die niedrigere. */
export function topStage(scores: number[]): number {
  let best = 0;
  for (let i = 1; i < scores.length; i += 1) {
    if (scores[i] > scores[best]) best = i;
  }
  return best + 1;
}

export function getTestStage(nr: number): TestStage | undefined {
  return testStages.find((s) => s.nr === nr);
}
