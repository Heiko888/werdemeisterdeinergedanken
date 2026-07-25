/**
 * Vertiefungen – die psychologische Wissens-Bibliothek des Mitgliederbereichs.
 * Querliegende Themen (Mechanismen), die die 7 Stufen ergänzen.
 * Nutzt dieselben Bausteine wie die Stufen-Lektionen (Abschnitte/Übungen).
 *
 * Texte sind fachlich fundiert, aber bewusst alltagsnah formuliert –
 * gern anpassen/verfeinern. `relatedStage` verweist auf die passende Stufe.
 */
import type { LessonSection, LessonExercise } from "@/lib/stage-lessons";

export type DeepDive = {
  slug: string;
  title: string;
  subtitle: string;
  /** Gruppierung im Dashboard */
  category: string;
  /** Kurzer Teaser für die Karten */
  summary: string;
  keyIdea: string;
  intro: string;
  sections: LessonSection[];
  exercises: LessonExercise[];
  reflection: string[];
  /** Kernbotschaft zum Mitnehmen */
  takeaway: string;
  /** Passende Stufe (1–7) für den Querverweis */
  relatedStage: number;
  /** YouTube-Video-ID – oder null */
  video: string | null;
};

export const deepDives: DeepDive[] = [
  // ---------------------------------------------------------------
  {
    slug: "automatische-gedanken",
    title: "Automatische Gedanken",
    subtitle: "Die Stimme, die immer schon urteilt",
    category: "Denken & Wahrnehmung",
    summary:
      "Blitzschnelle, ungefragte Bewertungen, die deine Stimmung steuern – lange bevor du sie bemerkst.",
    keyIdea:
      "Nicht die Situation macht dein Gefühl, sondern der Gedanke, den du blitzschnell darüber hast.",
    intro:
      "Den ganzen Tag läuft in dir ein leiser Kommentar mit: „Das schaffe ich nie.“, „Der findet mich bestimmt langweilig.“, „Typisch ich.“ Diese Gedanken tauchen ungefragt auf, in Sekundenbruchteilen, und fühlen sich an wie schlichte Tatsachen. In der Psychologie heißen sie automatische Gedanken – und sie sind der Hebel, an dem echte Veränderung ansetzt.",
    sections: [
      {
        heading: "Warum sie so schnell und so überzeugend sind",
        body: "Dein Gehirn bewertet permanent, um Energie zu sparen – es greift auf gespeicherte Muster zurück, statt jede Lage neu zu durchdenken. Automatische Gedanken sind diese Abkürzungen. Weil sie so schnell kommen und sich vertraut anfühlen, halten wir sie für die Wahrheit, statt für das, was sie sind: gewohnte Interpretationen.",
      },
      {
        heading: "Der Dreischritt: Situation – Gedanke – Gefühl",
        body: "Wir glauben, die Situation löse direkt das Gefühl aus. Tatsächlich liegt dazwischen immer ein Gedanke. Zwei Menschen, dieselbe Absage – der eine denkt „Ich bin nicht gut genug“ und wird niedergeschlagen, der andere „Das hat nicht gepasst, nächster Versuch“ und bleibt gelassen. Der Gedanke entscheidet, nicht das Ereignis.",
      },
      {
        heading: "Erwischen, nicht bekämpfen",
        body: "Du kannst automatische Gedanken nicht verbieten – aber du kannst sie sichtbar machen. Sobald du einen Gedanken aufschreibst und fragst „Stimmt das wirklich?“, verliert er seinen Automatismus. Genau das ist der Übergang vom Getriebensein zur Wahl.",
      },
    ],
    exercises: [
      {
        title: "Das Gedankenprotokoll",
        duration: "10 Minuten",
        steps: [
          "Denk an einen Moment heute, in dem deine Stimmung gekippt ist.",
          "Schreib auf: Was war die Situation? Welches Gefühl kam? Und welcher Gedanke lag dazwischen?",
          "Formuliere den automatischen Gedanken in einem klaren Satz („Ich …“, „Die anderen …“).",
          "Frage: Würde ich das auch einem guten Freund so sagen? Wenn nein – was wäre fairer?",
        ],
      },
      {
        title: "Der Realitäts-Check",
        duration: "5 Minuten",
        steps: [
          "Nimm einen belastenden Gedanken und behandle ihn wie eine Hypothese, nicht wie eine Tatsache.",
          "Sammle: Welche Belege sprechen dafür? Welche dagegen?",
          "Frage: Was ist die wahrscheinlichste – nicht die schlimmste – Erklärung?",
          "Formuliere einen realistischeren Satz, der sich trotzdem ehrlich anfühlt.",
        ],
      },
    ],
    reflection: [
      "Welcher automatische Gedanke taucht bei dir am häufigsten auf?",
      "In welchen Situationen ist deine innere Stimme besonders streng?",
      "Was würde sich ändern, wenn du deinen Gedanken nur die Hälfte glauben würdest?",
    ],
    takeaway:
      "Zwischen Situation und Gefühl steht immer ein Gedanke. Wer ihn erwischt, gewinnt die Wahl zurück.",
    relatedStage: 1,
    video: null,
  },

  // ---------------------------------------------------------------
  {
    slug: "konditionierung",
    title: "Konditionierung",
    subtitle: "Warum alte Reize noch feuern",
    category: "Prägung & Lernen",
    summary:
      "Wie dein Nervensystem lernt, automatisch zu reagieren – und warum manche Reaktionen längst überholt sind.",
    keyIdea:
      "Vieles, was sich wie dein Charakter anfühlt, ist antrainiertes Reagieren – und was gelernt wurde, kann umgelernt werden.",
    intro:
      "Ein bestimmter Tonfall, ein Gesichtsausdruck, eine Situation – und schon bist du angespannt, obwohl objektiv nichts passiert ist. Das ist keine Charakterschwäche, sondern Konditionierung: dein Nervensystem hat gelernt, auf bestimmte Reize automatisch zu antworten. Wer versteht, wie dieses Lernen funktioniert, kann es auch wieder verändern.",
    sections: [
      {
        heading: "Klassische Konditionierung: Reize koppeln sich",
        body: "Pawlows Hunde speichelten beim Klang einer Glocke, weil sie den Klang mit Futter gekoppelt hatten. Genauso koppelt dein System neutrale Reize an Gefühle: Ein bestimmter Ort, ein Lied, eine Stimme lösen Anspannung oder Wärme aus – nicht wegen des Reizes selbst, sondern wegen der Verbindung, die einmal entstanden ist.",
      },
      {
        heading: "Operante Konditionierung: Folgen formen Verhalten",
        body: "Verhalten, das belohnt wird, nimmt zu; Verhalten, das bestraft oder gemieden wird, nimmt ab. Wer als Kind für Anpassung Zuwendung bekam, lernt: „Ich muss funktionieren, um geliebt zu werden.“ Das Muster läuft weiter, auch wenn die alte Belohnung längst wegfällt.",
      },
      {
        heading: "Löschung: Warum Muster verblassen können",
        body: "Wird ein konditionierter Reiz immer wieder erlebt, ohne dass die alte Folge eintritt, schwächt sich die Reaktion ab – Psychologen nennen das Löschung. Genau das passiert, wenn du eine alte Angst bewusst aushältst und merkst: Es passiert nichts Schlimmes. Nicht Wegdrücken löscht, sondern neue Erfahrung.",
      },
    ],
    exercises: [
      {
        title: "Deine Auslöser kartieren",
        duration: "15 Minuten, schriftlich",
        steps: [
          "Notiere drei Situationen, in denen du regelmäßig überreagierst.",
          "Finde zu jeder den konkreten Auslöser: ein Wort, ein Ton, ein Blick, ein Ort?",
          "Frage: Wann könnte diese Kopplung entstanden sein? Woran erinnert sie dich?",
          "Halte fest: Was ist die alte Erwartung – und stimmt sie heute noch?",
        ],
      },
      {
        title: "Neue Erfahrung zulassen",
        duration: "im Alltag",
        steps: [
          "Wähle einen harmlosen Auslöser, der dich unnötig anspannt.",
          "Wenn er das nächste Mal kommt, halte kurz inne, statt automatisch zu reagieren.",
          "Bleib bewusst im Moment und beobachte: Tritt die befürchtete Folge wirklich ein?",
          "Registriere die neue Erfahrung – jede Wiederholung schwächt die alte Kopplung.",
        ],
      },
    ],
    reflection: [
      "Welche deiner Reaktionen passt eigentlich nicht mehr zu deinem heutigen Leben?",
      "Wofür wurdest du als Kind belohnt – und läuft dieses Muster heute noch?",
      "Welchen Auslöser könntest du bewusst neu erfahren, statt ihm auszuweichen?",
    ],
    takeaway:
      "Konditionierung ist gelerntes Reagieren – kein Schicksal. Neue Erfahrung schreibt die alte Kopplung um.",
    relatedStage: 1,
    video: null,
  },

  // ---------------------------------------------------------------
  {
    slug: "kognitive-verzerrungen",
    title: "Kognitive Verzerrungen",
    subtitle: "Die häufigsten Denkfehler",
    category: "Denken & Wahrnehmung",
    summary:
      "Systematische Denkfehler, die die Wirklichkeit verzerren – und wie du sie im Alltag entlarvst.",
    keyIdea:
      "Nicht jeder Gedanke, der überzeugend klingt, ist auch wahr. Viele folgen einem bekannten Fehlermuster.",
    intro:
      "Unser Denken nimmt Abkürzungen – und manche davon führen zuverlässig in die Irre. Kognitive Verzerrungen sind systematische Denkfehler: Sie fühlen sich völlig logisch an und verfärben trotzdem die Realität ins Dunkle. Die gute Nachricht: Es sind nur eine Handvoll Muster. Wer sie kennt, erkennt sie wieder.",
    sections: [
      {
        heading: "Die üblichen Verdächtigen",
        body: "Schwarz-Weiß-Denken („entweder perfekt oder gescheitert“), Katastrophisieren („das wird eine Katastrophe“), Gedankenlesen („die finden mich bestimmt inkompetent“), Personalisieren („das war sicher meine Schuld“), mentaler Filter (nur das Negative sehen) und Sollte-Sätze („ich müsste längst weiter sein“). Die meisten Grübelschleifen bestehen aus genau diesen wenigen Mustern.",
      },
      {
        heading: "Warum Gefühle keine Beweise sind",
        body: "Eine besonders trickreiche Verzerrung ist die emotionale Beweisführung: „Ich fühle mich wie ein Versager, also bin ich einer.“ Doch ein Gefühl belegt nur, dass du etwas glaubst – nicht, dass es stimmt. Gefühle sind echte Signale, aber keine Faktenprüfer.",
      },
      {
        heading: "Vom Erkennen zum Entschärfen",
        body: "Du musst Verzerrungen nicht wegdiskutieren. Es reicht oft, ihnen einen Namen zu geben: „Ah, das ist gerade Katastrophisieren.“ Das Benennen schafft Abstand – aus einer scheinbaren Wahrheit wird ein erkennbares Muster, das du nicht mehr blind glauben musst.",
      },
    ],
    exercises: [
      {
        title: "Verzerrung benennen",
        duration: "10 Minuten",
        steps: [
          "Schreib einen belastenden Gedanken der letzten Tage auf.",
          "Geh die Liste durch: Welches Muster steckt darin (Schwarz-Weiß, Katastrophisieren, …)?",
          "Manchmal sind es mehrere – benenne alle, die du erkennst.",
          "Formuliere den Gedanken neu, ohne die Verzerrung – nüchtern und fair.",
        ],
      },
      {
        title: "Die Freundes-Perspektive",
        duration: "5 Minuten",
        steps: [
          "Nimm einen harten Gedanken über dich selbst.",
          "Stell dir vor, ein guter Freund sagt exakt diesen Satz über sich.",
          "Was würdest du ihm antworten? Schreib es auf.",
          "Richte dieselbe Fairness an dich selbst.",
        ],
      },
    ],
    reflection: [
      "Welche Verzerrung ist dein persönlicher Klassiker?",
      "In welchem Lebensbereich denkst du am häufigsten in Schwarz-Weiß?",
      "Wie oft verwechselst du ein Gefühl mit einem Beweis?",
    ],
    takeaway:
      "Denkfehler folgen wenigen Mustern. Wer sie benennt, muss ihnen nicht mehr glauben.",
    relatedStage: 3,
    video: null,
  },

  // ---------------------------------------------------------------
  {
    slug: "kernueberzeugungen",
    title: "Kernüberzeugungen",
    subtitle: "Die tiefen Regeln unter den Gedanken",
    category: "Prägung & Lernen",
    summary:
      "Grundannahmen über dich, andere und die Welt – die unsichtbare Schicht unter deinen automatischen Gedanken.",
    keyIdea:
      "Unter den vielen einzelnen Gedanken liegen wenige tiefe Sätze, die alles einfärben. Sie zu finden, verändert am meisten.",
    intro:
      "Automatische Gedanken sind die Blätter, Kernüberzeugungen sind die Wurzel. Es sind die tiefen, oft unausgesprochenen Sätze über dich selbst – „Ich bin nicht genug“, „Ich bin nicht liebenswert“, „Ich muss stark sein“. Meist entstanden sie früh, aus echten Erfahrungen. Und sie färben bis heute, wie du jede neue Situation deutest.",
    sections: [
      {
        heading: "Wie Kernüberzeugungen entstehen",
        body: "Als Kind ziehst du aus dem, was du erlebst, einfache Schlüsse, um dir die Welt zu erklären. Diese Schlüsse waren damals sinnvoll – ein Kind, das gelernt hat „Ich muss leise sein, um zu genügen“, hat sich angepasst, um dazuzugehören. Das Problem ist nicht die Herkunft, sondern dass die Regel unbemerkt weiterläuft.",
      },
      {
        heading: "Der Bestätigungs-Sog",
        body: "Kernüberzeugungen sind selbsterfüllend: Dein Gehirn sucht bevorzugt nach dem, was die alte Regel bestätigt, und übersieht den Rest. Wer glaubt „Ich bin wertlos“, verbucht Kritik als Beweis und Lob als Zufall. So bleibt die Überzeugung stabil – nicht weil sie stimmt, sondern weil sie filtert.",
      },
      {
        heading: "Regeln neu verhandeln",
        body: "Eine Kernüberzeugung verschwindet nicht durch einen positiven Spruch. Sie lockert sich, wenn du sie erstens klar benennst und zweitens gezielt Gegenerfahrungen sammelst – kleine, echte Belege, die der alten Regel widersprechen. Veränderung geschieht in Beweisen, nicht in Behauptungen.",
      },
    ],
    exercises: [
      {
        title: "Die Abwärts-Frage",
        duration: "15 Minuten, schriftlich",
        steps: [
          "Nimm einen wiederkehrenden belastenden Gedanken.",
          "Frage dich: „Und wenn das stimmt – was sagt das über mich?“",
          "Nimm die Antwort und stelle dieselbe Frage erneut. Wiederhole 3–4 Mal.",
          "Der Satz, bei dem es innerlich „klick“ macht, ist meist deine Kernüberzeugung.",
        ],
      },
      {
        title: "Das Gegenbeweis-Tagebuch",
        duration: "1 Woche, täglich 3 Minuten",
        steps: [
          "Formuliere eine neue, realistischere Grundüberzeugung, die du gerne verankern würdest.",
          "Sammle jeden Tag einen kleinen realen Beleg, der zu ihr passt.",
          "Auch Winziges zählt – gerade weil dein Filter es sonst übersieht.",
          "Lies am Wochenende deine Belege am Stück. Spür, wie sich die alte Regel lockert.",
        ],
      },
    ],
    reflection: [
      "Welcher tiefe Satz über dich selbst taucht immer wieder auf?",
      "In welchen Momenten deiner Kindheit könnte diese Regel sinnvoll gewesen sein?",
      "Welche neue Grundüberzeugung möchtest du an ihre Stelle setzen?",
    ],
    takeaway:
      "Unter den Gedanken liegen wenige tiefe Regeln. Sie ändern sich durch Gegenerfahrung, nicht durch Sprüche.",
    relatedStage: 3,
    video: null,
  },

  // ---------------------------------------------------------------
  {
    slug: "innerer-kritiker",
    title: "Der innere Kritiker",
    subtitle: "Die strenge Stimme verstehen",
    category: "Selbstbild",
    summary:
      "Woher die abwertende innere Stimme kommt, was sie eigentlich will – und wie du ihr souverän begegnest.",
    keyIdea:
      "Der innere Kritiker ist kein Feind, sondern ein alter Beschützer mit veralteten Methoden.",
    intro:
      "„Streng dich mehr an.“ „Das war peinlich.“ „Andere können das besser.“ Fast jeder trägt eine innere Stimme in sich, die urteilt, vergleicht und abwertet. Sie kann so vertraut sein, dass wir sie für unsere eigene Wahrheit halten. Dabei ist sie etwas anderes: eine übernommene, gut gemeinte, aber überzogene Schutzstrategie.",
    sections: [
      {
        heading: "Woher die Stimme stammt",
        body: "Der innere Kritiker ist oft die verinnerlichte Stimme von Bezugspersonen oder einer Umgebung, in der Leistung Sicherheit versprach. Er hat einmal einen Zweck erfüllt: Wer sich selbst antreibt und kleinhält, eckt weniger an und wird seltener enttäuscht. Deshalb ist er nicht einfach „schlecht“ – er ist veraltet.",
      },
      {
        heading: "Warum Bekämpfen nicht funktioniert",
        body: "Gegen den Kritiker anzukämpfen, macht ihn meist lauter – Widerstand nährt ihn. Wirksamer ist, ihn zu erkennen und ihm die Autorität zu entziehen: „Ah, da ist wieder die strenge Stimme.“ Du musst sie nicht besiegen, nur aufhören, jedes ihrer Worte für bare Münze zu nehmen.",
      },
      {
        heading: "Vom Kritiker zum inneren Verbündeten",
        body: "Neben dem Kritiker lässt sich eine zweite Stimme kultivieren: die eines wohlwollenden, ehrlichen Mentors. Selbstmitgefühl ist dabei nicht Weichspülen, sondern die realistischere Haltung – Menschen wachsen nachweislich eher durch Ermutigung als durch Abwertung.",
      },
    ],
    exercises: [
      {
        title: "Den Kritiker externalisieren",
        duration: "10 Minuten",
        steps: [
          "Schreib einen typischen Satz deines inneren Kritikers wörtlich auf.",
          "Gib der Stimme einen Namen oder eine Figur – so wird sie ein Gegenüber, nicht du selbst.",
          "Frage sie innerlich: „Wovor willst du mich eigentlich schützen?“",
          "Danke ihr für die Absicht – und entscheide bewusst, ob ihr Rat heute noch taugt.",
        ],
      },
      {
        title: "Die Mentor-Antwort",
        duration: "5 Minuten",
        steps: [
          "Nimm einen harten Kritiker-Satz von heute.",
          "Formuliere die Antwort eines wohlwollenden Mentors – ehrlich, aber unterstützend.",
          "Nicht schönreden, sondern fair einordnen: Was ist dran, was ist übertrieben?",
          "Sag dir diesen Mentor-Satz bewusst – am besten laut.",
        ],
      },
    ],
    reflection: [
      "Wessen Stimme erkennst du in deinem inneren Kritiker wieder?",
      "Wovor will dich deine strenge Stimme im Kern beschützen?",
      "Wie würdest du mit einem Menschen sprechen, den du wirklich wachsen sehen willst?",
    ],
    takeaway:
      "Der innere Kritiker ist ein alter Beschützer. Du besiegst ihn nicht – du nimmst ihm die Autorität.",
    relatedStage: 4,
    video: null,
  },

  // ---------------------------------------------------------------
  {
    slug: "neuroplastizitaet",
    title: "Neuroplastizität",
    subtitle: "Warum Veränderung möglich ist",
    category: "Gehirn",
    summary:
      "Dein Gehirn ist formbar – ein Leben lang. Die neurologische Grundlage dafür, dass Umlernen wirklich geht.",
    keyIdea:
      "Was du wiederholst, verstärkst du – im Gehirn ganz konkret. Deshalb ist Veränderung kein Wunschdenken, sondern Biologie.",
    intro:
      "Lange dachte man, das erwachsene Gehirn sei fest verdrahtet. Heute weiß man: Es verändert sich ständig – abhängig davon, was du tust, denkst und übst. Diese Formbarkeit heißt Neuroplastizität. Sie ist der Grund, warum die Arbeit an deinen Gedanken kein netter Vorsatz bleibt, sondern messbare Spuren hinterlässt.",
    sections: [
      {
        heading: "Was zusammen feuert, verdrahtet sich",
        body: "Nervenzellen, die gemeinsam aktiv sind, verstärken ihre Verbindung – ein Prinzip, das oft mit „what fires together, wires together“ zusammengefasst wird. Jeder Gedanke, jede Reaktion, die du wiederholst, macht die zugehörige Bahn ein Stück breiter und leichter befahrbar. Deine Gewohnheiten sind gebahnte Wege.",
      },
      {
        heading: "Auch das Gegenteil gilt",
        body: "Verbindungen, die du nicht mehr nutzt, werden schwächer – das Gehirn räumt Ungenutztes ab. Deshalb verblassen alte Muster, wenn du ihnen nicht mehr folgst, während neue an Kraft gewinnen, je öfter du sie gehst. Veränderung ist kein Kampf gegen das Alte, sondern konsequentes Bahnen des Neuen.",
      },
      {
        heading: "Warum Wiederholung und Gefühl zählen",
        body: "Neue Bahnen entstehen nicht durch einmalige Einsicht, sondern durch Wiederholung – besonders, wenn ein Gefühl dabei ist. Deshalb wirken Übungen, die du regelmäßig und mit innerer Beteiligung machst, stärker als reines Verstehen. Kleine, häufige Schritte schlagen seltene große.",
      },
    ],
    exercises: [
      {
        title: "Die eine Bahn",
        duration: "2 Minuten, täglich",
        steps: [
          "Wähle einen einzigen stärkenden Gedanken oder eine kleine Handlung.",
          "Wiederhole ihn jeden Tag zur selben Gelegenheit (z. B. nach dem Zähneputzen).",
          "Verbinde ihn bewusst mit einem guten Gefühl – stell dir kurz vor, es sei schon wahr.",
          "Bleib dran: Es geht nicht um Intensität, sondern um Häufigkeit.",
        ],
      },
      {
        title: "Alte Bahn stilllegen",
        duration: "im Alltag",
        steps: [
          "Nimm eine Gewohnheit, die dir nicht mehr dient.",
          "Ertappe dich am Startpunkt – dem Auslöser, der sie sonst anstößt.",
          "Lenke die Handlung bewusst auf eine kleine Alternative um.",
          "Jede Umleitung schwächt die alte Bahn und stärkt die neue.",
        ],
      },
    ],
    reflection: [
      "Welche „Bahn“ in dir ist über die Jahre besonders breit geworden?",
      "Welche neue Bahn würdest du gerne anlegen – und was wäre der kleinste tägliche Schritt?",
      "Wo verwechselst du „einmal verstanden“ mit „schon verändert“?",
    ],
    takeaway:
      "Dein Gehirn folgt dem, was du wiederholst. Häufigkeit schlägt Intensität – und macht Veränderung real.",
    relatedStage: 5,
    video: null,
  },

  // ---------------------------------------------------------------
  {
    slug: "reiz-reaktions-luecke",
    title: "Die Reiz-Reaktions-Lücke",
    subtitle: "Der Raum, in dem du frei bist",
    category: "Denken & Wahrnehmung",
    summary:
      "Zwischen dem, was passiert, und dem, was du tust, liegt ein winziger Moment – dein ganzer Freiraum.",
    keyIdea:
      "Zwischen Reiz und Reaktion liegt ein Raum. In diesem Raum liegt deine Macht zu wählen – und darin dein Wachstum.",
    intro:
      "Etwas passiert – und schon reagierst du. Der Kollege sagt etwas Spitzes, und noch bevor du denkst, bist du gekränkt und schießt zurück. Es fühlt sich an, als gäbe es keinen Zwischenraum. Doch genau dort liegt die wichtigste Fähigkeit überhaupt: den Moment zwischen Auslöser und Antwort zu dehnen. Wer diesen Spalt vergrößert, hört auf, ein Spielball zu sein.",
    sections: [
      {
        heading: "Warum die Lücke oft verschwindet",
        body: "Unter Stress übernimmt das schnelle, automatische System das Kommando – es reagiert in Millisekunden, bevor der überlegte Verstand überhaupt anspringt. Das war evolutionär sinnvoll, wenn hinter dem Busch ein Raubtier lauerte. Im Büro oder in der Beziehung führt dieselbe Blitzreaktion aber meist zu genau dem, was du hinterher bereust.",
      },
      {
        heading: "Den Spalt dehnen",
        body: "Du kannst den Reiz nicht verhindern – aber du kannst den Moment danach verlängern. Ein einziger bewusster Atemzug, ein innerliches „Stopp“, ein kurzes Benennen des Gefühls: Jede dieser Mikro-Pausen schiebt einen Keil zwischen Reiz und Reaktion. Und in diesem Keil entsteht die Wahl.",
      },
      {
        heading: "Antworten statt reagieren",
        body: "Reagieren ist automatisch und vergangenheitsgesteuert; antworten ist bewusst und wertegeleitet. Der Unterschied entscheidet, ob du deine alten Muster wiederholst oder etwas Neues tust. Mit jeder bewussten Antwort wird der Raum ein Stück größer und leichter zugänglich.",
      },
    ],
    exercises: [
      {
        title: "Der eine Atemzug",
        duration: "im Moment der Provokation",
        steps: [
          "Sobald du merkst, dass etwas in dir hochkommt, halte kurz inne.",
          "Nimm bewusst einen einzigen, langsamen Atemzug – das reicht als erster Keil.",
          "Frage innerlich: „Wie will ich hier wirklich antworten?“",
          "Handle aus dieser Antwort – nicht aus dem ersten Impuls.",
        ],
      },
      {
        title: "Der Reaktions-Rückblick",
        duration: "10 Minuten, abends",
        steps: [
          "Denk an eine Situation heute, in der du zu schnell reagiert hast.",
          "Spiel sie in Zeitlupe durch: Wo genau war der Reiz, wo die Reaktion?",
          "Überlege: An welcher Stelle hätte eine Mikro-Pause gepasst?",
          "Stell dir die bewusste Antwort vor – so trainierst du sie für das nächste Mal.",
        ],
      },
    ],
    reflection: [
      "In welchen Situationen ist deine Reiz-Reaktions-Lücke am kleinsten?",
      "Welcher Mensch oder welcher Satz lässt sie bei dir sofort verschwinden?",
      "Was wäre möglich, wenn dir zwischen Reiz und Reaktion nur ein Atemzug mehr bliebe?",
    ],
    takeaway:
      "Du kannst den Reiz nicht wählen – aber den Moment danach. In diesem Spalt liegt deine ganze Freiheit.",
    relatedStage: 2,
    video: null,
  },

  // ---------------------------------------------------------------
  {
    slug: "gruebeln",
    title: "Grübeln & Gedankenkreisen",
    subtitle: "Raus aus der Endlosschleife",
    category: "Denken & Wahrnehmung",
    summary:
      "Warum sich das ewige Wiederkäuen wie Problemlösen anfühlt – und es doch nie eines ist.",
    keyIdea:
      "Grübeln fühlt sich nützlich an, ist aber nur dasselbe Denken in Wiederholung – ohne Ausgang.",
    intro:
      "Nachts um drei drehen sich dieselben Gedanken zum zwanzigsten Mal. Es fühlt sich an, als würdest du an einer Lösung arbeiten – doch am Morgen bist du keinen Schritt weiter, nur erschöpfter. Grübeln ist kein Nachdenken, sondern ein Muster: dieselbe Frage, ohne je zur Antwort zu kommen. Der Ausweg liegt nicht in einem besseren Gedanken, sondern in einem anderen Umgang.",
    sections: [
      {
        heading: "Warum das Gehirn kreisen liebt",
        body: "Unerledigtes zieht Aufmerksamkeit an – das Gehirn hält offene Fragen wach, als wären sie Bedrohungen. Beim Grübeln verwechselt es Wiederholung mit Fortschritt: Weil das Thema wichtig ist, fühlt sich das Kreisen verantwortungsvoll an. Tatsächlich vertieft jede Runde nur die Sorge.",
      },
      {
        heading: "Grübeln erkennt man am Muster, nicht am Inhalt",
        body: "Echtes Problemlösen führt zu einem nächsten Schritt; Grübeln führt zu noch mehr Fragen. Ein einfacher Test: Frag dich nach ein paar Minuten – „Bin ich einer Antwort näher gekommen?“ Wenn nicht, denkst du nicht nach, du grübelst. Und dann hilft nur, das Muster zu unterbrechen.",
      },
      {
        heading: "Unterbrechen statt gewinnen",
        body: "Man kann ein Gedankenkarussell nicht durch Mitdenken anhalten – jede Runde füttert es. Wirksamer ist, die Aufmerksamkeit bewusst woandershin zu lenken: in den Körper, in eine Handlung, in die Sinne. Nicht als Flucht, sondern als klare Entscheidung, dem Kreisen die Energie zu entziehen.",
      },
    ],
    exercises: [
      {
        title: "Der Grübel-Test & Cut",
        duration: "im Moment",
        steps: [
          "Wenn du merkst, dass du kreist, frag: „Löse ich gerade oder wiederhole ich?“",
          "Bei „wiederhole“: Sag dir innerlich klar „Stopp – das ist Grübeln.“",
          "Lenke die Aufmerksamkeit bewusst auf etwas Konkretes: 5 Dinge, die du gerade siehst.",
          "Bei echten Problemen: notiere den einen nächsten Schritt – und leg das Thema weg.",
        ],
      },
      {
        title: "Das Sorgen-Fenster",
        duration: "1x täglich, 15 Minuten",
        steps: [
          "Bestimme eine feste Zeit am Tag als dein „Sorgen-Fenster“.",
          "Taucht tagsüber eine Grübelei auf, notiere sie kurz und vertage sie aufs Fenster.",
          "Im Fenster gehst du die Liste durch – oft ist die Hälfte schon uninteressant.",
          "So trainierst du deinem System ab, rund um die Uhr Alarm zu schlagen.",
        ],
      },
    ],
    reflection: [
      "Zu welcher Tageszeit und in welcher Situation grübelst du am meisten?",
      "Woran erkennst du bei dir den Unterschied zwischen Nachdenken und Kreisen?",
      "Welche konkrete Handlung holt dich am zuverlässigsten aus dem Karussell?",
    ],
    takeaway:
      "Grübeln ist Wiederholung, kein Fortschritt. Du gewinnst es nicht – du unterbrichst es.",
    relatedStage: 3,
    video: null,
  },

  // ---------------------------------------------------------------
  {
    slug: "emotionsregulation",
    title: "Emotionsregulation",
    subtitle: "Gefühle steuern, ohne sie zu unterdrücken",
    category: "Emotion",
    summary:
      "Wie du starke Gefühle halten und lenken lernst – zwischen Wegdrücken und Überflutetwerden.",
    keyIdea:
      "Gefühle sind Wellen, keine Wände. Du musst sie weder wegdrücken noch von ihnen fortgerissen werden.",
    intro:
      "Es gibt zwei verbreitete Umgangsweisen mit starken Gefühlen – und beide funktionieren schlecht: sie wegdrücken, bis sie sich anderswo Bahn brechen, oder von ihnen überflutet werden und im Affekt handeln. Emotionsregulation ist der dritte Weg: das Gefühl spüren, halten und bewusst steuern. Das ist erlernbar wie ein Muskel.",
    sections: [
      {
        heading: "Benennen beruhigt",
        body: "Ein Gefühl in Worte zu fassen – „das ist Angst“, „da ist Wut“ – dämpft messbar seine Wucht. Das bloße Benennen holt die Emotion vom reinen Alarmmodus in einen Bereich, in dem du wieder überlegen kannst. Deshalb ist der erste Schritt nie Bekämpfen, sondern Erkennen.",
      },
      {
        heading: "Die Welle reiten",
        body: "Jedes Gefühl hat einen Verlauf: Es steigt, erreicht einen Höhepunkt und ebbt wieder ab – meist schneller, als wir fürchten. Wer lernt, den Höhepunkt auszuhalten, statt sofort zu handeln oder wegzudrücken, merkt: Die Welle trägt einen, sie verschlingt einen nicht. Aushalten ist eine aktive, kraftvolle Fähigkeit.",
      },
      {
        heading: "Den Körper als Hebel nutzen",
        body: "Emotionen sind auch körperlich. Über den Körper hast du direkten Zugriff: langsames Ausatmen, längeres Aus- als Einatmen, kaltes Wasser, Bewegung – all das beruhigt das Nervensystem schneller als jedes Argument. Regulation beginnt oft unterhalb der Gedanken.",
      },
    ],
    exercises: [
      {
        title: "Benennen & Verorten",
        duration: "5 Minuten",
        steps: [
          "Wenn ein Gefühl hochkommt, gib ihm einen Namen: „Das ist gerade …“.",
          "Spüre nach, wo im Körper es sitzt – Brust, Bauch, Kehle, Schultern?",
          "Atme bewusst dorthin, mit längerem Ausatmen als Einatmen.",
          "Beobachte die Welle: Sie steigt, kippt und sinkt. Du musst nichts tun.",
        ],
      },
      {
        title: "Die 90-Sekunden-Regel",
        duration: "im Affekt",
        steps: [
          "Wenn dich etwas heftig trifft, triff für 90 Sekunden keine Entscheidung.",
          "Atme langsam und zähle innerlich mit – gib der ersten Welle Zeit abzuebben.",
          "Erst danach fragst du: „Was ist jetzt wirklich dran?“",
          "Aus dem ruhigeren Zustand heraus handelst du klüger als im Sturm.",
        ],
      },
    ],
    reflection: [
      "Neigst du eher zum Wegdrücken oder zum Überflutetwerden?",
      "Welches Gefühl fällt dir am schwersten auszuhalten?",
      "Welcher körperliche Hebel beruhigt dich am zuverlässigsten?",
    ],
    takeaway:
      "Gefühle sind Wellen mit Anfang und Ende. Benennen, halten, atmen – dann tragen sie dich, statt dich fortzureißen.",
    relatedStage: 4,
    video: null,
  },

  // ---------------------------------------------------------------
  {
    slug: "selbstmitgefuehl",
    title: "Selbstmitgefühl",
    subtitle: "Der freundliche Umgang mit dir",
    category: "Selbstbild",
    summary:
      "Warum Härte gegen dich selbst dich nicht besser macht – und Freundlichkeit kein Weichspüler ist.",
    keyIdea:
      "Du wächst nicht, indem du dich kleinmachst, sondern indem du dich hältst wie einen Menschen, der dir wichtig ist.",
    intro:
      "Viele glauben insgeheim, sie müssten hart mit sich sein, um nicht nachzulassen – als wäre Selbstkritik der Motor der Entwicklung. Die Forschung zeigt das Gegenteil: Menschen, die sich selbst mit Freundlichkeit begegnen, sind widerstandsfähiger, lernen schneller aus Fehlern und geben seltener auf. Selbstmitgefühl ist kein Nachgeben, sondern innere Stärke.",
    sections: [
      {
        heading: "Die drei Bausteine",
        body: "Selbstmitgefühl besteht aus drei Teilen: Selbstfreundlichkeit statt Selbstverurteilung, dem Bewusstsein für gemeinsames Menschsein („auch andere scheitern, ich bin nicht allein damit“) und Achtsamkeit – dem klaren Hinschauen, ohne zu dramatisieren. Zusammen bilden sie eine Haltung, die trägt.",
      },
      {
        heading: "Kein Weichspüler, sondern Realismus",
        body: "Selbstmitgefühl beschönigt nichts. Es sagt nicht „alles super“, sondern „das war schmerzhaft, und ich stehe trotzdem zu mir“. Gerade weil es die Wahrheit nicht wegdrückt, macht es handlungsfähig – während Selbstverurteilung meist lähmt und in die Vermeidung treibt.",
      },
      {
        heading: "Wie man es übt",
        body: "Der einfachste Einstieg ist eine Frage: „Was würde ich jetzt einem guten Freund in derselben Lage sagen?“ Fast immer sind wir zu anderen wärmer und klüger als zu uns selbst. Diese Wärme bewusst nach innen zu richten, ist der Kern der Übung – anfangs ungewohnt, mit der Zeit selbstverständlich.",
      },
    ],
    exercises: [
      {
        title: "Die Freundes-Hand",
        duration: "5 Minuten",
        steps: [
          "Denk an eine Situation, in der du hart mit dir warst.",
          "Formuliere, was du einem geliebten Freund in genau dieser Lage sagen würdest.",
          "Leg eine Hand auf die Brust und sag dir diese Worte – ruhig und ehrlich.",
          "Spüre, wie sich der Ton in dir verändert, wenn du auf deiner Seite stehst.",
        ],
      },
      {
        title: "Die Selbstmitgefühls-Pause",
        duration: "3 Minuten, im schweren Moment",
        steps: [
          "Sag innerlich: „Das ist gerade schwer.“ (Achtsamkeit)",
          "Dann: „Schwere Momente gehören zum Menschsein – ich bin nicht allein.“ (gemeinsames Menschsein)",
          "Dann: „Möge ich freundlich zu mir sein.“ (Selbstfreundlichkeit)",
          "Atme ruhig und lass diese drei Sätze wirken, bevor du weitermachst.",
        ],
      },
    ],
    reflection: [
      "Sprichst du mit dir härter, als du es mit einem Freund je tätest?",
      "Woher stammt der Glaube, du müsstest streng mit dir sein?",
      "Was würde sich ändern, wenn du fest auf deiner eigenen Seite stündest?",
    ],
    takeaway:
      "Freundlichkeit zu dir ist kein Nachlassen, sondern der stabilere Boden. Menschen wachsen durch Ermutigung, nicht durch Abwertung.",
    relatedStage: 4,
    video: null,
  },

  // ---------------------------------------------------------------
  {
    slug: "werte-und-ziele",
    title: "Werte & Ziele",
    subtitle: "Die Richtung unter dem Tun",
    category: "Ausrichtung",
    summary:
      "Warum Ziele ohne Werte leer bleiben – und wie du eine Richtung findest, die wirklich dich meint.",
    keyIdea:
      "Ziele sind Punkte auf einer Landkarte. Werte sind die Himmelsrichtung – sie geben jedem Schritt Bedeutung.",
    intro:
      "Viele jagen Zielen hinterher und fühlen sich trotzdem leer, wenn sie sie erreichen. Der Grund: Ein Ziel ist ein Punkt, den man abhakt – ein Wert ist eine Richtung, die man lebt. Wer weiß, wofür er eigentlich losgeht, trifft bessere Entscheidungen, hält länger durch und findet Sinn schon im Weg, nicht erst im Ergebnis.",
    sections: [
      {
        heading: "Werte sind Richtungen, keine Ziele",
        body: "„Ein guter Vater sein“ ist kein Ziel, das man erreicht und abhakt – es ist eine Richtung, in die man täglich geht. Ziele („dieses Projekt abschließen“) sind Meilensteine auf dem Weg. Werte geben ihnen erst Bedeutung: Sie beantworten nicht das Was, sondern das Wofür.",
      },
      {
        heading: "Warum Klarheit über Werte entlastet",
        body: "Wer seine Werte kennt, muss nicht jede Entscheidung neu aus dem Bauch treffen – er hat einen Kompass. Konflikte werden klarer („was davon zahlt auf das ein, was mir wichtig ist?“), und Verzicht fällt leichter, weil man weiß, wofür. Werte reduzieren die tägliche Reibung des Entscheidens.",
      },
      {
        heading: "Vom Wert zur konkreten Handlung",
        body: "Ein Wert bleibt folgenlos, wenn er nicht in Handlung übersetzt wird. Die Brücke ist die Frage: „Wie sähe dieser Wert heute in einer kleinen konkreten Handlung aus?“ So wird aus „Gesundheit ist mir wichtig“ ein Spaziergang – und aus einer Absichtserklärung ein gelebtes Leben.",
      },
    ],
    exercises: [
      {
        title: "Die Kern-Werte finden",
        duration: "20 Minuten, schriftlich",
        steps: [
          "Denk an einen Moment, in dem du dich zutiefst stimmig gefühlt hast. Was war da wichtig?",
          "Sammle 8–10 Wörter, die für dich zählen (z. B. Ehrlichkeit, Freiheit, Nähe, Wachstum).",
          "Streiche zusammen, bis 3–4 Kern-Werte übrig bleiben.",
          "Schreib zu jedem einen Satz: „Diesen Wert lebe ich, wenn ich …“.",
        ],
      },
      {
        title: "Der Werte-Check der Woche",
        duration: "10 Minuten, wöchentlich",
        steps: [
          "Blick auf die vergangene Woche: Wo hast du nach deinen Werten gehandelt?",
          "Wo bist du davon abgewichen – und was hat dich abgebracht?",
          "Wähle einen Wert für die kommende Woche.",
          "Lege eine kleine, konkrete Handlung fest, die ihn sichtbar macht.",
        ],
      },
    ],
    reflection: [
      "Verfolgst du gerade Ziele, die eigentlich nicht deine sind?",
      "Welche 3 Werte würden die Menschen nennen, die dich am besten kennen?",
      "Wo klaffen dein Alltag und das, was dir wirklich wichtig ist, auseinander?",
    ],
    takeaway:
      "Ziele erreichst du, Werte lebst du. Wer seine Richtung kennt, findet Sinn im Weg – nicht erst im Ergebnis.",
    relatedStage: 6,
    video: null,
  },
];

export function getDeepDive(slug: string): DeepDive | undefined {
  return deepDives.find((d) => d.slug === slug);
}

/** Alle Vertiefungen, die zu einer Stufe (1–7) gehören. */
export function deepDivesForStage(stageNr: number): DeepDive[] {
  return deepDives.filter((d) => d.relatedStage === stageNr);
}

/** Vertiefungen nach Kategorie gruppiert (Reihenfolge des ersten Auftretens). */
export function deepDivesByCategory(): { category: string; items: DeepDive[] }[] {
  const groups: { category: string; items: DeepDive[] }[] = [];
  for (const dive of deepDives) {
    let group = groups.find((g) => g.category === dive.category);
    if (!group) {
      group = { category: dive.category, items: [] };
      groups.push(group);
    }
    group.items.push(dive);
  }
  return groups;
}
