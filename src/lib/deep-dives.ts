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

  // ---------------------------------------------------------------
  {
    slug: "muster-und-koerper",
    title: "Muster, Körper & Gesundheit",
    subtitle: "Wenn Denken unter die Haut geht",
    category: "Körper & Gesundheit",
    summary:
      "Wie anhaltende Muster und Stress auf den Körper wirken – und warum innere Arbeit auch Körperarbeit ist.",
    keyIdea:
      "Was der Kopf dauerhaft denkt, trägt der Körper mit. Anhaltende Muster hinterlassen körperliche Spuren.",
    intro:
      "Gedanken und Gefühle bleiben nicht im Kopf. Jeder innere Zustand hat eine körperliche Seite – und wenn ein Muster chronisch wird, wird auch seine körperliche Antwort chronisch. Wer versteht, wie mentale Muster auf Körper und Gesundheit wirken, bekommt einen weiteren, sehr konkreten Grund, an ihnen zu arbeiten. Wichtig vorweg: Es geht um Einfluss und Unterstützung, nicht um Schuld – und nichts davon ersetzt eine ärztliche Behandlung.",
    sections: [
      {
        heading: "Die Stressreaktion – genial, aber überfordert",
        body: "Bei Gefahr schaltet dein Körper in Sekunden auf Kampf oder Flucht: Herzschlag hoch, Muskeln angespannt, Verdauung runter, Stresshormone wie Adrenalin und Cortisol werden ausgeschüttet. Für eine akute Bedrohung ist das perfekt. Das Problem: Dieselbe Reaktion springt auch bei einem sorgenvollen Gedanken an – und läuft bei vielen Menschen den ganzen Tag leise im Hintergrund.",
      },
      {
        heading: "Der Körper unterscheidet nicht zwischen real und gedacht",
        body: "Ein bedrohlicher Gedanke löst weitgehend dieselbe Körperantwort aus wie eine echte Gefahr. Deshalb reicht schon Grübeln, Selbstdruck oder ständige Anspannung, um das Stresssystem dauerhaft aktiv zu halten. Bleibt diese Aktivierung chronisch, zeigt sie sich körperlich: verspannter Nacken und Kiefer, flacher Schlaf, Verdauungsprobleme, ein geschwächtes Immunsystem, erhöhter Blutdruck.",
      },
      {
        heading: "Wenn Muster zur Haltung werden",
        body: "Festgehaltene Gefühle und wiederkehrende Muster setzen sich oft als körperliche Haltung fest – hochgezogene Schultern, flacher Atem, ein angespannter Bauch. Der Körper „merkt sich“ den Zustand. Das ist keine Einbildung, sondern hat reale Folgen. Und gleichzeitig ist es kein Grund für Selbstvorwürfe: Muster sind entstanden, nicht gewählt.",
      },
      {
        heading: "Der Weg zurück führt über das Nervensystem",
        body: "Die gute Nachricht: Der Weg funktioniert in beide Richtungen. So wie Muster den Körper anspannen, kann ein reguliertes Nervensystem ihn wieder entlasten. Bewusster Atem, Präsenz, Bewegung und das Lösen alter Muster senken die Stressaktivierung spürbar. Du arbeitest also nicht nur an deinem Kopf – du entlastest deinen ganzen Organismus.",
      },
    ],
    exercises: [
      {
        title: "Der Körper-Stress-Check",
        duration: "5 Minuten, mehrmals täglich kurz",
        steps: [
          "Halte mehrmals am Tag kurz inne und scanne deinen Körper von oben nach unten.",
          "Wo sitzt gerade Anspannung? Kiefer, Nacken, Schultern, Bauch?",
          "Lass die Stelle bewusst ein Stück locker und atme ruhig dorthin.",
          "Notiere über ein paar Tage, in welchen Situationen und bei welchen Gedanken sich dein Körper zusammenzieht.",
        ],
      },
      {
        title: "Das Nervensystem beruhigen",
        duration: "3–5 Minuten",
        steps: [
          "Setz oder leg dich bequem hin.",
          "Atme ein und zähle bis vier, atme aus und zähle bis sechs oder acht.",
          "Verlängere bewusst das Ausatmen – das signalisiert dem Körper Sicherheit.",
          "Bleib ein paar Minuten dabei und spür, wie die Anspannung nachlässt.",
        ],
      },
    ],
    reflection: [
      "Wo im Körper zeigt sich Stress bei dir am zuverlässigsten?",
      "Welcher wiederkehrende Gedanke oder welches Muster spannt dich körperlich am meisten an?",
      "Was würde sich ändern, wenn du die Signale deines Körpers als frühe Hinweise ernst nehmen würdest?",
    ],
    takeaway:
      "Anhaltende Muster gehen in den Körper – ein reguliertes Nervensystem entlastet ihn wieder. Innere Arbeit ist auch Körperarbeit.",
    relatedStage: 4,
    video: null,
  },
  // ---------------------------------------------------------------
  {
    slug: "integration-und-weitergabe",
    title: "Integration & Weitergabe",
    subtitle: "Vom Wissen zur gelebten Haltung",
    category: "Ausrichtung",
    summary:
      "Wie aus einzelnen Erkenntnissen eine stabile innere Haltung wird – und warum Weitergeben sie vertieft.",
    keyIdea:
      "Was du wirklich integriert hast, erkennst du daran, dass du es lebst, ohne darüber nachzudenken – und mühelos weitergeben kannst.",
    intro:
      "Am Ende der Reise steht keine neue Technik, sondern eine Frage: Wird das Erkannte zur gelebten Haltung – auch dann, wenn niemand zusieht und der Alltag rau wird? Integration heißt, dass Bewusstheit vom Vorsatz zur zweiten Natur wird. Und oft ist es gerade das Weitergeben, das diese Haltung festigt.",
    sections: [
      {
        heading: "Wissen ist nicht Integration",
        body: "Etwas zu verstehen und es zu verkörpern sind zwei verschiedene Dinge. Du kannst alles über den inneren Beobachter wissen und trotzdem im Streit reagieren wie früher. Integration passiert nicht im Kopf, sondern durch Wiederholung im echten Leben – bis eine neue Reaktion sich natürlicher anfühlt als die alte.",
      },
      {
        heading: "Rückfälle gehören dazu",
        body: "Meisterschaft ist nicht das Ende des Fallens, sondern ein kürzerer Weg zurück. Wer erwartet, nie wieder in ein altes Muster zu rutschen, macht den Rückfall zum Drama. Wer ihn als normalen Teil des Weges sieht, kehrt ruhig und ohne Selbstverurteilung in die Mitte zurück – genau das ist die reifere Fähigkeit.",
      },
      {
        heading: "Weitergeben vertieft",
        body: "Sobald du etwas in eigenen Worten weitergibst – einem Freund, den eigenen Kindern, einfach durch die Art, wie du bist – musst du es klarer fassen und ehrlicher leben. Weitergeben ist kein Zusatz nach dem Lernen, sondern eine der stärksten Formen, das Gelernte selbst zu vertiefen.",
      },
    ],
    exercises: [
      {
        title: "Die Verkörperungs-Frage",
        duration: "10 Minuten",
        steps: [
          "Wähle eine Einsicht, die dir auf deinem Weg besonders wichtig geworden ist.",
          "Frag ehrlich: Weiß ich das nur – oder lebe ich es bereits, auch unter Druck?",
          "Finde eine konkrete Alltagssituation, in der sich zeigt, ob es Haltung oder nur Theorie ist.",
          "Nimm dir für die nächste Woche eine einzige, kleine Handlung vor, die diese Einsicht verkörpert.",
        ],
      },
      {
        title: "In eigenen Worten",
        duration: "15 Minuten",
        steps: [
          "Stell dir vor, du erklärst einem Menschen, der dir wichtig ist, was dich am meisten verändert hat.",
          "Schreib es in drei bis vier einfachen Sätzen auf – ohne Fachbegriffe.",
          "Streiche alles, was du selbst noch nicht wirklich lebst. Was bleibt, ist dein echtes Fundament.",
          "Überlege: Wem könntest du in nächster Zeit auf natürliche Weise etwas davon weitergeben?",
        ],
      },
    ],
    reflection: [
      "Welche Einsicht lebst du bereits so selbstverständlich, dass du sie kaum noch bemerkst?",
      "Wo rutschst du am ehesten in alte Muster – und wie sieht dein Weg zurück aus?",
      "Was von deinem Weg möchtest du weitergeben – und an wen?",
    ],
    takeaway:
      "Meisterschaft zeigt sich nicht im Nie-mehr-Fallen, sondern im ruhigen Zurückkehren – und im Weitergeben dessen, was du wirklich lebst.",
    relatedStage: 7,
    video: null,
  },

  // ===================================================================
  // KATEGORIE: Mentale Selbstverteidigung
  // Wie dein Denken von außen gelenkt wird – und wie du es bemerkst.
  // Ton bewusst überparteilich: Mechanismus erklären, nicht Partei ergreifen.
  // ===================================================================
  {
    slug: "propaganda",
    title: "Propaganda & Konditionierung",
    subtitle: "Wie Denken von außen geformt wird",
    category: "Mentale Selbstverteidigung",
    summary:
      "Propaganda zwingt selten direkt eine Meinung auf – sie wirkt über Wiederholung, Emotion und Vereinfachung.",
    keyIdea:
      "Wirksame Beeinflussung überzeugt dich nicht mit Argumenten – sie umgeht das Argument und arbeitet an deinem Gefühl.",
    intro:
      "Wir stellen uns Propaganda oft plump vor: laute Parolen, offensichtliche Lügen. Doch die wirksamste Beeinflussung ist leise. Sie sagt dir nicht, was du denken sollst – sie sorgt dafür, dass sich eine Sicht mit der Zeit einfach richtig anfühlt. Über Wiederholung, über Emotion, über Vereinfachung. Wer versteht, wie das funktioniert, wird schwerer steuerbar.",
    sections: [
      {
        heading: "Wiederholung, Emotion, Vereinfachung",
        body: "Drei Hebel wirken fast immer zusammen. Wiederholung macht eine Aussage vertraut – und Vertrautes halten wir für wahr. Emotion, besonders Angst, schaltet das ruhige Prüfen aus. Und Vereinfachung reduziert ein vielschichtiges Thema auf Gut gegen Böse, wo eine klare Seite Halt verspricht. Keiner dieser Hebel braucht eine einzige Lüge, um zu wirken.",
      },
      {
        heading: "Feindbild und Zugehörigkeit",
        body: "Nichts bindet eine Gruppe so schnell wie ein gemeinsamer Gegner. Ein Feindbild liefert eine einfache Ordnung: hier die Guten, dort die Anderen. Wer dazugehören will, übernimmt die Sicht der Gruppe – oft, ohne sie je geprüft zu haben. Zustimmung wird dann zum Zeichen von Zugehörigkeit, Zweifel zum Risiko der Ausgrenzung.",
      },
      {
        heading: "Warum wir Ungeprüftes verteidigen",
        body: "Haben wir eine Aussage einmal übernommen, wird sie Teil von uns. Sie zu hinterfragen fühlt sich dann an, als müssten wir uns selbst infrage stellen. Deshalb verteidigen Menschen mit Inbrunst Behauptungen, die sie nie überprüft haben – nicht aus Dummheit, sondern weil das eigene Selbstbild daran hängt.",
      },
    ],
    exercises: [
      {
        title: "Der Herkunfts-Check",
        duration: "10 Minuten",
        steps: [
          "Wähle eine Überzeugung, die dir stark und selbstverständlich erscheint.",
          "Frag: Woher habe ich das eigentlich? Habe ich es geprüft – oder oft genug gehört?",
          "Prüfe den Ton: Arbeitet die Quelle mit Angst, Empörung oder klaren Feindbildern?",
          "Formuliere die nüchternste, unaufgeregteste Version derselben Aussage. Was bleibt davon übrig?",
        ],
      },
      {
        title: "Die Gegenseite ernst nehmen",
        duration: "15 Minuten",
        steps: [
          "Nimm ein Thema, bei dem du dir sehr sicher bist.",
          "Schreib die beste, fairste Begründung der Gegenseite auf – so, dass sie ihr zustimmen würde.",
          "Bemerke, wie viel Widerstand dabei in dir aufkommt.",
          "Frage dich: Kämpfe ich gerade um die Wahrheit – oder um mein Dazugehören?",
        ],
      },
    ],
    reflection: [
      "Welche Überzeugung hast du übernommen, ohne sie je wirklich geprüft zu haben?",
      "Bei welchem Thema fällt es dir am schwersten, die Gegenseite auch nur anzuhören?",
      "Woran merkst du, dass eine Botschaft eher dein Gefühl als deinen Verstand anspricht?",
    ],
    takeaway:
      "Beeinflussung wirkt über Wiederholung, Emotion und Vereinfachung – nicht über Beweise. Wer das bemerkt, gewinnt Abstand.",
    relatedStage: 1,
    video: null,
  },

  {
    slug: "framing",
    title: "Framing",
    subtitle: "Die unsichtbare Macht hinter den Worten",
    category: "Mentale Selbstverteidigung",
    summary:
      "Ein Frame ist ein Deutungsrahmen: Dieselbe Wirklichkeit wirkt je nach Wortwahl völlig anders – ganz ohne falsche Fakten.",
    keyIdea:
      "Wer den Rahmen bestimmt, beeinflusst deine Wahrnehmung, bevor du bewusst über den Inhalt nachdenkst.",
    intro:
      "Du glaubst, du reagierst auf Fakten. In Wirklichkeit reagierst du häufig zuerst auf den Rahmen, in dem dir diese Fakten präsentiert werden. Ein einziges Wort kann aus einem Kritiker einen Gegner machen, aus einer Kürzung eine Reform und aus Kontrolle plötzlich Schutz. Das Entscheidende: Die Informationen müssen dafür nicht einmal falsch sein.",
    sections: [
      {
        heading: "Der Rahmen liefert die Bewertung gleich mit",
        body: "„Der Staat investiert zehn Milliarden“ und „Der Staat gibt weitere zehn Milliarden aus“ beschreiben dieselbe Zahl. Doch „investiert“ klingt nach Zukunft und Nutzen, „gibt aus“ nach Verschwendung. Ein Frame liefert nie nur eine Information – er liefert immer eine Interpretation gleich mit. Auch bei Menschen: Ob jemand „Experte“, „Kritiker“ oder „Leugner“ genannt wird, entscheidet über dein Urteil, bevor du ein Argument gehört hast.",
      },
      {
        heading: "Gewinn, Verlust und Moral",
        body: "„90 Prozent der Arbeitsplätze bleiben erhalten“ und „10 Prozent gehen verloren“ können dasselbe meinen – und lösen doch verschiedene Gefühle aus. Besonders stark ist das Moral-Framing: Wird eine Maßnahme mit „Schutz“ und „Solidarität“ verknüpft, gerät jeder Zweifel automatisch in den Gegen-Rahmen „verantwortungslos“. Dann wird nicht mehr über die Sache gestritten, sondern über den Charakter der Beteiligten.",
      },
      {
        heading: "Framing durch Weglassen",
        body: "Auch das Nichtgesagte rahmt. Fehlt die Vorgeschichte, fehlen Gegenargumente, stehen Zahlen ohne Vergleich da, wird ein Einzelfall verallgemeinert – schon erscheint das Thema in einem bestimmten Licht. Das ist nicht immer Absicht; jede Kommunikation braucht einen Rahmen, niemand kann alles zeigen. Problematisch wird es, wo ein Rahmen als einzige Wahrheit auftritt und Gegenperspektiven moralisch abwertet.",
      },
    ],
    exercises: [
      {
        title: "Die Umformulierungs-Probe",
        duration: "10 Minuten",
        steps: [
          "Nimm eine Schlagzeile oder Aussage, die dich emotional berührt hat.",
          "Schreib sie so um, dass dieselben Fakten neutral klingen – ohne wertende Wörter.",
          "Schreib sie dann so um, wie die Gegenseite denselben Vorgang beschreiben würde.",
          "Vergleiche die drei Versionen: Was ändert sich am Gefühl, obwohl der Kern gleich bleibt?",
        ],
      },
      {
        title: "Die acht Frame-Fragen",
        duration: "im Alltag, kurz",
        steps: [
          "Welche Wörter enthalten schon eine Bewertung? Welche Emotion soll entstehen?",
          "Welche Annahme wird als selbstverständlich vorausgesetzt? Welche Info fehlt?",
          "Wie würde die Gegenseite es beschreiben? Reagiere ich auf die Sache oder auf ein Etikett?",
          "Und die schärfste Frage: Wer profitiert von genau diesem Deutungsrahmen?",
        ],
      },
    ],
    reflection: [
      "Bei welchem Wort merkst du, dass du reagierst, bevor du den Inhalt geprüft hast?",
      "Wo hast du zuletzt eine Bewertung übernommen, weil sie schon in der Frage steckte?",
      "Würdest du anders denken, wenn dasselbe mit anderen Worten gesagt würde?",
    ],
    takeaway:
      "Gedankenfreiheit beginnt damit, den Rahmen zu erkennen, bevor du die darin enthaltene Bewertung übernimmst.",
    relatedStage: 3,
    video: null,
  },

  {
    slug: "sprache-und-etiketten",
    title: "Sprache & Etiketten",
    subtitle: "Wie Wörter deine Wahrnehmung färben",
    category: "Mentale Selbstverteidigung",
    summary:
      "Wörter beschreiben die Wirklichkeit nicht nur – sie geben ihr bereits eine Bedeutung, oft schon bevor du prüfst.",
    keyIdea:
      "Ein einziges Etikett kann eine Diskussion beenden – weil es die Bewertung ersetzt statt sie zu begründen.",
    intro:
      "Sprache ist nie ganz neutral. Jedes Wort trägt einen Beiklang, eine Wertung, ein Gefühl. Deshalb entscheidet die Wortwahl mit darüber, wie du eine Sache siehst – manchmal stärker als die Sache selbst. Die Kernfrage lautet: Denkst du noch über den Inhalt nach – oder reagierst du bereits auf das verwendete Wort?",
    sections: [
      {
        heading: "Das Etikett ersetzt das Argument",
        body: "Wird ein Mensch als „Experte“ bezeichnet, hört man ihm zu; als „Querulant“, hört man weg – bei identischem Satz. Etiketten sind Abkürzungen fürs Urteilen. Sie sparen Denkarbeit und genau darin liegt ihre Gefahr: Sie beenden das Prüfen, bevor es begonnen hat. Wer ein Etikett akzeptiert, hat die Bewertung schon übernommen.",
      },
      {
        heading: "Weiche und harte Wörter für dieselbe Sache",
        body: "„Sparpaket“ klingt vernünftig, „Leistungsabbau“ schmerzhaft – gemeint sein kann dasselbe. „Preisanpassung“ statt „Preiserhöhung“, „Beitrag“ statt „Abgabe“: Solche Wörter machen Unangenehmes weicher und Notwendiges selbstverständlicher. Das ist nicht automatisch Lüge, aber es lenkt. Die Frage ist immer: Welche Realität wird hier freundlicher angezogen, als sie ist?",
      },
      {
        heading: "Wörter lösen Gefühle vor dem Inhalt aus",
        body: "Manche Begriffe zünden sofort – zustimmend oder ablehnend –, noch bevor der eigentliche Sachverhalt geprüft ist. Genau das ist ihr Zweck. Sobald ein Reizwort fällt, denkst du nicht mehr über die Sache nach, sondern reagierst auf das Wort. Das Gegenmittel ist einfach, aber ungewohnt: einen Moment innehalten und das Wort vom Inhalt trennen.",
      },
    ],
    exercises: [
      {
        title: "Etikett abziehen",
        duration: "5 Minuten",
        steps: [
          "Nimm eine Aussage, in der jemand mit einem Etikett belegt wird („Der Aktivist …“, „Die Leugner …“).",
          "Streiche das Etikett und ersetze es durch eine neutrale Beschreibung der Handlung.",
          "Prüfe die Aussage jetzt noch einmal – überzeugt sie ohne das Etikett noch?",
          "Bemerke, wie viel Urteil vorher allein im Wort steckte.",
        ],
      },
      {
        title: "Die Reizwort-Liste",
        duration: "eine Woche",
        steps: [
          "Notiere Wörter, bei denen du sofort und stark reagierst – zustimmend wie ablehnend.",
          "Frag zu jedem: Reagiere ich auf die Sache oder auf das Wort?",
          "Suche für ein Reizwort eine neutrale Alternative und benutze sie innerlich.",
          "Beobachte, ob sich dein Urteil verändert, wenn das Reizwort weg ist.",
        ],
      },
    ],
    reflection: [
      "Welches Wort bringt dich am schnellsten auf die Palme – und warum eigentlich?",
      "Wo benutzt du selbst Etiketten, um dir das Prüfen zu ersparen?",
      "Wann hat ein einzelnes Wort zuletzt eine Diskussion für dich beendet?",
    ],
    takeaway:
      "Ein Etikett ist eine Bewertung ohne Begründung. Zieh es ab – und schau, was von der Aussage übrig bleibt.",
    relatedStage: 3,
    video: null,
  },

  {
    slug: "medien-agenda",
    title: "Medien & Aufmerksamkeit",
    subtitle: "Worüber du nachdenkst, ist schon eine Entscheidung",
    category: "Mentale Selbstverteidigung",
    summary:
      "Medien müssen dir nicht sagen, was du denken sollst – es reicht, festzulegen, worüber du täglich nachdenkst.",
    keyIdea:
      "Nicht die Meinung wird dir vorgegeben, sondern das Thema. Und wer die Themen setzt, lenkt die Aufmerksamkeit.",
    intro:
      "Es gibt einen leisen, oft übersehenen Hebel: die Themenauswahl. Medien beeinflussen weniger, was du über ein Thema denkst, als vielmehr, über welche Themen du überhaupt nachdenkst. Was ständig vorkommt, erscheint wichtig; was fehlt, existiert im Alltag kaum. Diese Auswahl formt dein Bild der Welt, bevor eine einzige Wertung fällt.",
    sections: [
      {
        heading: "Auswahl, Häufigkeit, Weglassen",
        body: "Drei stille Werkzeuge: Was überhaupt zum Thema gemacht wird, wie oft darüber berichtet wird, und was weggelassen wird. Ein Thema, das täglich erscheint, wirkt dringlicher als eines, das nur einmal vorkommt – unabhängig von seiner tatsächlichen Bedeutung. Und was gar nicht vorkommt, fehlt in deinem Kopf, als gäbe es es nicht.",
      },
      {
        heading: "Bilder, Überschriften, Zuspitzung",
        body: "Dieselbe Nachricht wirkt je nach Bild, Überschrift und Tonfall völlig anders. Ein zugespitzter Titel entscheidet oft, ob und wie du weiterliest – viele lesen nur ihn. Die Auswahl der Bilder und der befragten Fachleute rahmt das Thema zusätzlich. All das kann seriös sein, aber es ist nie neutral: Jemand hat ausgewählt.",
      },
      {
        heading: "Information oder Inszenierung",
        body: "Nicht alles, was informiert aussieht, ist es. Manches ist Inszenierung – gebaut, um Aufmerksamkeit und Emotion zu erzeugen, nicht um einzuordnen. Der Unterschied zeigt sich an einer Frage: Werde ich hier schlauer und ruhiger – oder nur aufgeregter? Einordnung macht ruhig, Inszenierung macht abhängig.",
      },
    ],
    exercises: [
      {
        title: "Die Weglass-Frage",
        duration: "10 Minuten",
        steps: [
          "Schau dir die Titelthemen einer Nachrichtenquelle an.",
          "Frag bei jedem: Warum genau dieses Thema, warum jetzt, warum so groß?",
          "Frag dann: Welches wichtige Thema kommt hier gar nicht vor?",
          "Bemerke, wie sehr allein die Auswahl dein Bild der Lage prägt.",
        ],
      },
      {
        title: "Zwei Quellen, ein Ereignis",
        duration: "15 Minuten",
        steps: [
          "Wähle ein aktuelles Ereignis und lies es bei zwei sehr unterschiedlichen Quellen.",
          "Vergleiche Überschrift, Bildauswahl und welche Fakten betont werden.",
          "Notiere, was die eine erwähnt und die andere weglässt.",
          "Bilde dir dein Urteil erst aus der Zusammenschau – nicht aus einer Quelle.",
        ],
      },
    ],
    reflection: [
      "Woher stammen die Themen, die dich gerade beschäftigen – hast du sie gewählt?",
      "Welche Nachricht hat dich zuletzt aufgeregt, ohne dich klüger zu machen?",
      "Was würde sich ändern, wenn du seltener, aber gründlicher Nachrichten liest?",
    ],
    takeaway:
      "Wer die Themen setzt, lenkt dein Denken – nicht durch die Antwort, sondern durch die Frage, die überhaupt gestellt wird.",
    relatedStage: 1,
    video: null,
  },

  {
    slug: "algorithmen",
    title: "Algorithmen & Filterblasen",
    subtitle: "Die personalisierte Realität",
    category: "Mentale Selbstverteidigung",
    summary:
      "Online siehst du nicht „die Welt“, sondern eine Auswahl, die auf deinem bisherigen Verhalten beruht.",
    keyIdea:
      "Der Algorithmus zeigt dir nicht, was wahr ist, sondern was dich hält – und das ist selten dasselbe.",
    intro:
      "Was du in deinen Feeds siehst, ist kein Abbild der Wirklichkeit. Es ist eine Auswahl, berechnet aus dem, worauf du bisher reagiert hast. Das Ziel dahinter ist nicht Wahrheit, sondern Aufmerksamkeit – denn Aufmerksamkeit ist das Geschäftsmodell. Wer das versteht, schaut mit anderen Augen auf den eigenen Bildschirm.",
    sections: [
      {
        heading: "Du bekommst mehr von dem, worauf du reagierst",
        body: "Jeder Klick, jedes Verweilen ist ein Signal: „Davon will ich mehr.“ Der Algorithmus liefert prompt – und verstärkt so, was ohnehin schon da war. Deine Meinung wird dir immer öfter bestätigt, selten herausgefordert. So entsteht eine Filterblase, in der die eigene Sicht wie der gesunde Menschenverstand wirkt, weil alles andere ausgeblendet ist.",
      },
      {
        heading: "Empörung erzeugt Reichweite",
        body: "Inhalte, die starke Gefühle auslösen – vor allem Empörung und Angst –, werden mehr geteilt und kommentiert. Also werden genau sie weiter nach oben gespült. Das Ruhige, Differenzierte, Abwägende verschwindet, das Zugespitzte und Extreme wird sichtbar. Nicht weil es wahrer wäre, sondern weil es besser „performt“.",
      },
      {
        heading: "Der Verlust der gemeinsamen Wirklichkeit",
        body: "Wenn jeder eine andere, auf ihn zugeschnittene Auswahl sieht, zerfällt die gemeinsame Grundlage, über die man überhaupt streiten könnte. Zwei Menschen halten sich für gut informiert und leben doch in verschiedenen Welten. Das erklärt viel von der Härte heutiger Debatten – man streitet nicht nur über Meinungen, sondern über verschiedene Realitäten.",
      },
    ],
    exercises: [
      {
        title: "Feed-Diagnose",
        duration: "10 Minuten",
        steps: [
          "Scrolle bewusst durch einen deiner Feeds und beobachte, welche Gefühle geweckt werden.",
          "Zähle grob: Wie viel bestätigt deine Sicht, wie viel fordert sie heraus?",
          "Frag: Wovon sehe ich hier auffällig viel – und was fehlt fast völlig?",
          "Bemerke, dass diese Auswahl aus deinem eigenen Verhalten entstanden ist.",
        ],
      },
      {
        title: "Die Blase durchlöchern",
        duration: "im Alltag",
        steps: [
          "Folge bewusst ein, zwei seriösen Stimmen, die anderer Meinung sind als du.",
          "Klicke eine Woche lang nicht auf das, was dich nur empört.",
          "Suche aktiv nach der ruhigsten, sachlichsten Darstellung eines Streitthemas.",
          "Beobachte, ob dein Feed – und dein Gefühl – sich verändern.",
        ],
      },
    ],
    reflection: [
      "Wann hast du zuletzt online etwas gesehen, das deiner Meinung ernsthaft widersprach?",
      "Welche Inhalte ziehen dich so zuverlässig in ihren Bann, dass du die Zeit vergisst?",
      "Wie würde sich dein Weltbild ändern, wenn dein Feed einem anderen Menschen gehörte?",
    ],
    takeaway:
      "Dein Feed ist ein Spiegel deines Verhaltens, kein Fenster zur Welt. Aufmerksamkeit ist die Ware – nicht die Wahrheit.",
    relatedStage: 1,
    video: null,
  },

  {
    slug: "werbung-und-mangel",
    title: "Werbung & künstlicher Mangel",
    subtitle: "Wie ein Bedürfnis erschaffen wird",
    category: "Mentale Selbstverteidigung",
    summary:
      "Werbung verkauft nicht nur Produkte, sondern Vorstellungen davon, wer du sein solltest – und was dir angeblich fehlt.",
    keyIdea:
      "Vieles kaufst du nicht, weil du es brauchst, sondern weil dir vorher das Gefühl gegeben wurde, dass dir etwas fehlt.",
    intro:
      "Gute Werbung verkauft kein Produkt. Sie verkauft ein Gefühl – und zwar meist zuerst ein unangenehmes: den Eindruck, dass etwas fehlt. Erst wird der Mangel geweckt, dann die Lösung angeboten. Wer diesen Mechanismus durchschaut, trifft freiere Entscheidungen, weil er den Impuls von echtem Bedürfnis unterscheiden kann.",
    sections: [
      {
        heading: "Erst der Mangel, dann das Produkt",
        body: "Kaum eine Werbung sagt „Du bist genug“. Sie deutet an, dass dir etwas fehlt: Schönheit, Erfolg, Zugehörigkeit, Ruhe. Dieses Fehlen ist oft künstlich erzeugt – wenige Sekunden zuvor war es gar nicht da. Das Produkt erscheint dann als Erlösung von einem Unbehagen, das die Werbung selbst erst geweckt hat.",
      },
      {
        heading: "Vergleich und Status",
        body: "Ein zweiter Hebel ist der Vergleich. Sobald du dich mit einem idealisierten Bild misst, entsteht ein Abstand – und den soll das Produkt schließen. Es geht selten um die Sache selbst, sondern um Status, Anerkennung, Dazugehören. Man kauft nicht die Uhr, sondern das Gefühl, jemand zu sein, der so eine Uhr trägt.",
      },
      {
        heading: "Vom Gefühl zur Kaufentscheidung",
        body: "Produkte werden gezielt mit Gefühlen verknüpft: Freiheit, Liebe, Sicherheit, Leichtigkeit. Nicht das Produkt löst diese Gefühle aus – die Verknüpfung wird hergestellt und tausendfach wiederholt. So wird Unsicherheit in eine Kaufentscheidung verwandelt. Der Ausweg ist nicht Askese, sondern eine Pause zwischen Impuls und Kauf.",
      },
    ],
    exercises: [
      {
        title: "Der Mangel-Check",
        duration: "im Moment des Kaufimpulses",
        steps: [
          "Wenn du etwas kaufen willst, halte kurz inne.",
          "Frag: Wollte ich das schon vorher – oder erst, seit ich die Werbung gesehen habe?",
          "Frag weiter: Welches Gefühl verspreche ich mir wirklich davon?",
          "Warte 24 Stunden. Ist der Wunsch dann noch da, war er vielleicht echt.",
        ],
      },
      {
        title: "Werbung entschlüsseln",
        duration: "10 Minuten",
        steps: [
          "Nimm eine Werbung, die dich anspricht, und schau genau hin.",
          "Frag: Welches Gefühl wird hier verkauft – nicht welches Produkt?",
          "Frag: Welchen Mangel soll ich empfinden, damit ich kaufe?",
          "Benenne die Verknüpfung laut: „Sie verbinden dieses Produkt mit …“",
        ],
      },
    ],
    reflection: [
      "Was hast du zuletzt gekauft, das eigentlich ein Gefühl kaufen sollte?",
      "In welchem Lebensbereich fühlst du dich am leichtesten „nicht genug“?",
      "Wie oft entsteht dein Wunsch erst durch den Vergleich mit anderen?",
    ],
    takeaway:
      "Werbung weckt den Mangel, den sie dann zu heilen verspricht. Die Pause zwischen Impuls und Kauf ist deine Freiheit.",
    relatedStage: 1,
    video: null,
  },

  {
    slug: "gruppendruck",
    title: "Gruppendruck & Schweigespirale",
    subtitle: "Warum wir uns anpassen, obwohl wir zweifeln",
    category: "Mentale Selbstverteidigung",
    summary:
      "Menschen passen sich häufig an, obwohl sie innerlich Zweifel haben – aus Angst vor Ausgrenzung.",
    keyIdea:
      "Die Angst, nicht dazuzugehören, ist so alt und tief, dass sie unser Urteil überstimmen kann, ohne dass wir es merken.",
    intro:
      "Der Mensch ist ein Gruppenwesen. Über Jahrtausende bedeutete Ausschluss aus der Gruppe Lebensgefahr. Deshalb sitzt die Angst vor Ausgrenzung tief – tiefer als jedes Argument. Sie führt dazu, dass wir öffentlich mittragen, was wir privat bezweifeln. Wer diesen Mechanismus kennt, kann bewusster entscheiden, wann er sich anpasst und wann nicht.",
    sections: [
      {
        heading: "Die Schweigespirale",
        body: "Wer glaubt, mit seiner Meinung allein zu stehen, schweigt eher – aus Angst vor Ablehnung. Dadurch wirkt die andere Sicht noch stärker, was noch mehr Menschen zum Schweigen bringt. So entsteht eine Spirale: Nicht die Mehrheit setzt sich durch, sondern die, die sich am lautesten und selbstsichersten zeigt. Vieles, was wie Konsens aussieht, ist nur organisiertes Schweigen.",
      },
      {
        heading: "Die Mehrheitsillusion",
        body: "Wir überschätzen systematisch, wie viele Menschen so denken wie die lautesten Stimmen – und unterschätzen die stillen Zweifler. Oft sind viel mehr Menschen anderer Meinung, als es scheint; sie sagen es nur nicht. Diese Illusion verstärkt den Druck: Man passt sich einer Mehrheit an, die es so gar nicht gibt.",
      },
      {
        heading: "Selbstzensur im Alltag",
        body: "Anpassung ist nicht nur ein Phänomen großer Debatten – sie geschieht in Familie, Beruf und Freundeskreis. Wir schlucken einen Einwand, um den Frieden zu wahren, und nennen es Höflichkeit. Manchmal ist das klug. Problematisch wird es, wenn wir über die Jahre verlernen, überhaupt zu wissen, was wir selbst denken.",
      },
    ],
    exercises: [
      {
        title: "Privat gegen öffentlich",
        duration: "10 Minuten",
        steps: [
          "Denk an ein Thema, bei dem du öffentlich etwas anderes sagst als privat.",
          "Schreib beide Versionen nebeneinander auf.",
          "Frag: Wovor genau schützt mich das Schweigen? Ist die Gefahr real oder gefühlt?",
          "Überlege einen kleinen, sicheren Schritt, ehrlicher zu sein.",
        ],
      },
      {
        title: "Der Zweifler-Mut",
        duration: "im Alltag",
        steps: [
          "Wenn du in einer Gruppe innerlich anderer Meinung bist, sag es einmal ruhig und freundlich.",
          "Beobachte, wie viele insgeheim zustimmen, sobald einer anfängt.",
          "Achte darauf, wie sich die gefühlte Mehrheit oft in Luft auflöst.",
          "Bemerke: Meist ist die befürchtete Ausgrenzung viel kleiner als gedacht.",
        ],
      },
    ],
    reflection: [
      "Wo sagst du öffentlich etwas anderes, als du privat denkst?",
      "Wann hast du zuletzt geschwiegen, obwohl du Zweifel hattest?",
      "Wessen Zustimmung ist dir so wichtig, dass du dafür deine Meinung zurückstellst?",
    ],
    takeaway:
      "Vieles, was wie Mehrheit aussieht, ist nur lautes Selbstbewusstsein und stilles Schweigen. Deine ehrliche Stimme zählt mehr, als du denkst.",
    relatedStage: 2,
    video: null,
  },

  {
    slug: "autoritaetshoerigkeit",
    title: "Autorität & Gehorsam",
    subtitle: "Wenn Titel das Prüfen ersetzen",
    category: "Mentale Selbstverteidigung",
    summary:
      "Titel, Status und Institutionen können dazu führen, dass Aussagen nicht mehr geprüft, sondern einfach geglaubt werden.",
    keyIdea:
      "Vertrauen in Fachwissen ist sinnvoll – blinder Gehorsam beginnt dort, wo du aufhörst, überhaupt noch mitzudenken.",
    intro:
      "Wir können nicht alles selbst überprüfen – deshalb vertrauen wir Fachleuten, und das ist vernünftig. Doch dasselbe Vertrauen kann kippen: in blinden Gehorsam, bei dem eine Aussage allein deshalb gilt, weil sie von einer Autorität kommt. Die Kunst ist, Vertrauen und Prüfen zusammenzuhalten, statt das eine gegen das andere einzutauschen.",
    sections: [
      {
        heading: "Warum Autorität überzeugt",
        body: "Dieselbe Aussage klingt glaubwürdiger, wenn ein Titel, eine Uniform oder eine Institution dahintersteht. Das ist eine uralte Abkürzung: Statt die Sache zu prüfen, prüfen wir die Quelle. Meist funktioniert das gut. Gefährlich wird es, wenn der Status das Argument komplett ersetzt und Rückfragen als Respektlosigkeit gelten.",
      },
      {
        heading: "Fachwissen ist nicht dasselbe wie Meinung",
        body: "Ein Fachmensch ist Experte auf seinem Gebiet – nicht automatisch bei allem. Oft wird echte Fachkompetenz in einem Bereich auf ganz andere Fragen übertragen, wo sie nichts mehr bedeutet. Ein guter Prüfstein: Spricht die Person hier aus belegbarem Fachwissen – oder äußert sie eine persönliche Meinung, die auch ihr Nachbar haben könnte?",
      },
      {
        heading: "Ein Experte darf irren",
        body: "Fachleute liegen manchmal falsch, korrigieren sich, streiten untereinander – das ist normal und sogar ein Zeichen von Seriosität. Wer Autorität für unfehlbar hält, missversteht, wie Wissen entsteht. Vertrauen heißt nicht, jeden Satz zu glauben, sondern die Redlichkeit und Offenlegung der Quelle einschätzen zu können.",
      },
    ],
    exercises: [
      {
        title: "Sache statt Status",
        duration: "10 Minuten",
        steps: [
          "Nimm eine Aussage, die du glaubst, weil eine Autorität sie gesagt hat.",
          "Blende den Status aus: Überzeugt die Begründung auch für sich allein?",
          "Frag: Spricht die Person aus ihrem Fachgebiet – oder darüber hinaus?",
          "Unterscheide klar: Was ist hier belegtes Wissen, was ist Meinung?",
        ],
      },
      {
        title: "Die Rückfrage üben",
        duration: "im Alltag",
        steps: [
          "Wenn dich eine Autorität überzeugt, stell innerlich eine höfliche Rückfrage: „Woran erkenne ich das?“",
          "Achte darauf, ob eine nachvollziehbare Begründung folgt – oder nur der Verweis auf den Status.",
          "Bemerke, ob Rückfragen willkommen sind oder abgewürgt werden.",
          "Nimm Offenheit für Nachfragen als Zeichen von Seriosität.",
        ],
      },
    ],
    reflection: [
      "Wann ist dein Vertrauen zuletzt in unkritisches Übernehmen gekippt?",
      "Bei welcher Instanz prüfst du grundsätzlich nichts mehr nach?",
      "Wie unterscheidest du für dich Fachwissen von bloßer Meinung?",
    ],
    takeaway:
      "Vertraue Fachwissen – aber hör nicht auf mitzudenken. Ein Titel ist ein Grund zuzuhören, kein Grund, nicht mehr zu prüfen.",
    relatedStage: 3,
    video: null,
  },

  {
    slug: "angst-steuerung",
    title: "Angst als Steuerungsmittel",
    subtitle: "Warum Druck dich lenkbar macht",
    category: "Mentale Selbstverteidigung",
    summary:
      "Angst verengt die Wahrnehmung – unter Druck suchen Menschen nach schnellen Antworten, Sicherheit und klaren Führungsfiguren.",
    keyIdea:
      "Wer Angst erzeugt, muss dich nicht überzeugen – ein verängstigter Mensch prüft nicht mehr, er sucht nur noch Schutz.",
    intro:
      "Angst ist ein lebenswichtiges Signal. Aber sie hat einen Nebeneffekt: Sie verengt das Denken. Unter Bedrohung schaltet der Verstand vom ruhigen Abwägen auf schnelle Reaktion. Genau das macht ängstliche Menschen lenkbar – sie greifen nach jeder Antwort, die Sicherheit verspricht. Zu wissen, was Angst mit dem Denken macht, ist der erste Schutz davor.",
    sections: [
      {
        heading: "Wie Angst das Denken verengt",
        body: "Unter Bedrohung fährt das Gehirn das differenzierte Denken herunter und das schnelle Reagieren hoch. Zwischentöne verschwinden, die Welt wird zu Schwarz und Weiß. Das war bei realer Gefahr überlebenswichtig. Bei dauerhaftem, diffusem Druck aber führt es dazu, dass wir einfache, laute Antworten den komplexen, leisen vorziehen.",
      },
      {
        heading: "Sicherheit gegen Freiheit",
        body: "Ein verängstigter Mensch ist bereit, für das Versprechen von Sicherheit vieles aufzugeben – auch Freiheiten, die er sonst verteidigen würde. Das ist keine Schwäche, sondern ein tiefer Reflex. Deshalb ist das Muster so wirksam: erst Bedrohung betonen, dann Schutz anbieten. Die entscheidende Frage bleibt: Ist die Gefahr wirklich so groß – und ist der angebotene Schutz der Preis wert?",
      },
      {
        heading: "Dauerkrise und erlernte Hilflosigkeit",
        body: "Folgt eine Krise auf die nächste, ohne Atempause, stellt sich Erschöpfung ein. Menschen fühlen sich ohnmächtig, geben das eigene Urteil ab und überlassen anderen die Führung. Diese erlernte Hilflosigkeit ist bequem und gefährlich zugleich. Der Gegenpol ist nicht Sorglosigkeit, sondern die ruhige Frage: Was liegt tatsächlich in meiner Hand?",
      },
    ],
    exercises: [
      {
        title: "Der Angst-Abstand",
        duration: "im Moment der Anspannung",
        steps: [
          "Wenn eine Nachricht dich in Alarm versetzt, atme bewusst langsam aus.",
          "Frag: Ist die Gefahr hier und jetzt real – oder wird sie erzeugt?",
          "Frag: Wer bietet mir gerade Schutz an – und was soll ich dafür geben?",
          "Triff im Angstzustand keine großen Entscheidungen. Warte, bis der Kopf klarer ist.",
        ],
      },
      {
        title: "Zurück in den Einflussbereich",
        duration: "10 Minuten",
        steps: [
          "Schreib auf, was dir gerade Angst macht.",
          "Teile es in zwei Spalten: Was kann ich beeinflussen – und was nicht?",
          "Wähle eine kleine, konkrete Handlung aus der ersten Spalte.",
          "Lass die zweite Spalte bewusst los. Sorge ohne Handlung erschöpft nur.",
        ],
      },
    ],
    reflection: [
      "Welche Entscheidung hast du zuletzt aus Angst statt aus Klarheit getroffen?",
      "Wo bist du bereit, für Sicherheit Freiheit aufzugeben – und ist der Preis es wert?",
      "Wann hast du dich zuletzt ohnmächtig gefühlt – und was lag doch in deiner Hand?",
    ],
    takeaway:
      "Angst verengt den Blick und macht lenkbar. Ruhe zurückzugewinnen ist kein Luxus, sondern Selbstschutz.",
    relatedStage: 4,
    video: null,
  },

  {
    slug: "wiederholung-wahrheit",
    title: "Wiederholung wird zur Wahrheit",
    subtitle: "Warum Vertrautes glaubwürdig wirkt",
    category: "Mentale Selbstverteidigung",
    summary:
      "Eine Aussage kann vertraut und dadurch wahr wirken, obwohl sie nie bewiesen wurde.",
    keyIdea:
      "Dein Gehirn verwechselt Vertrautheit mit Wahrheit – was du oft hörst, fühlt sich richtig an, ganz ohne Beweis.",
    intro:
      "Es gibt einen gut belegten Effekt: Je öfter wir eine Aussage hören, desto wahrer erscheint sie uns – unabhängig davon, ob sie stimmt. Das Gehirn nimmt eine Abkürzung und verwechselt „kommt mir bekannt vor“ mit „ist wahr“. Slogans, Schlagwörter und ständig wiederkehrende Bilder nutzen genau das. Wer den Effekt kennt, misstraut der bloßen Vertrautheit.",
    sections: [
      {
        heading: "Der Wiederholungseffekt",
        body: "Beim ersten Hören sind wir skeptisch. Beim zehnten Mal fühlt sich dieselbe Aussage flüssig und vertraut an – und Flüssigkeit interpretiert das Gehirn als Wahrheit. Es braucht keine neuen Belege, nur Wiederholung. Deshalb wirken eingängige Slogans stärker als komplizierte, aber korrekte Erklärungen.",
      },
      {
        heading: "Scheinbarer Konsens",
        body: "Wenn viele dasselbe sagen, halten wir es für wahr – auch wenn alle es nur voneinander abgeschrieben haben. Eine einzige Quelle, oft genug zitiert, kann wie breiter Konsens aussehen. Die entscheidende Frage lautet nicht „Wie viele sagen es?“, sondern „Auf wie viele unabhängige Quellen geht es zurück?“",
      },
      {
        heading: "Schlagwort statt Beweis",
        body: "Ein griffiges Schlagwort ersetzt oft die Beweisführung. Es klingt gut, lässt sich leicht merken und weiterreichen – und genau das macht es gefährlich. Prüfe bei einem eingängigen Satz bewusst: Ist das ein Argument mit Begründung, oder nur eine oft wiederholte Behauptung im hübschen Gewand?",
      },
    ],
    exercises: [
      {
        title: "Der Beleg-Test",
        duration: "10 Minuten",
        steps: [
          "Nimm eine Aussage, die du für selbstverständlich wahr hältst.",
          "Frag: Kenne ich einen echten Beleg – oder habe ich das nur oft gehört?",
          "Suche nach der ursprünglichen Quelle, nicht nach weiteren Wiederholungen.",
          "Wenn du keine Quelle findest, markiere die Aussage innerlich als „unbelegt“.",
        ],
      },
      {
        title: "Quellen zählen, nicht Stimmen",
        duration: "im Alltag",
        steps: [
          "Wenn „alle“ etwas sagen, frag: Wie viele unabhängige Quellen sind das wirklich?",
          "Prüfe, ob sich alle auf dieselbe eine Ursprungsmeldung berufen.",
          "Unterscheide zwischen vielen Stimmen und vielen Belegen.",
          "Miss der Zahl der Wiederholungen bewusst weniger Gewicht bei.",
        ],
      },
    ],
    reflection: [
      "Welche Aussage glaubst du vor allem, weil du sie oft gehört hast?",
      "Wann hat dich zuletzt ein griffiger Slogan überzeugt statt ein Argument?",
      "Wie oft verwechselst du „viele sagen es“ mit „es ist belegt“?",
    ],
    takeaway:
      "Vertrautheit ist kein Beweis. Was oft wiederholt wird, verdient dieselbe Prüfung wie beim ersten Mal.",
    relatedStage: 1,
    video: null,
  },

  {
    slug: "ablenkung",
    title: "Ablenkung & Überflutung",
    subtitle: "Wenn Aufmerksamkeit selbst zum Ziel wird",
    category: "Mentale Selbstverteidigung",
    summary:
      "Nicht jede Beeinflussung verbreitet falsche Informationen – manchmal reicht es, die Aufmerksamkeit auf Nebensachen zu lenken.",
    keyIdea:
      "Man muss dir die Wahrheit nicht verbergen – es genügt, dich mit so viel Lärm zu fluten, dass du sie nie in Ruhe anschaust.",
    intro:
      "Es gibt eine Form der Beeinflussung, die ohne eine einzige Lüge auskommt: Ablenkung. Statt dir etwas vorzuenthalten, überflutet sie dich mit Reizen, Aufregern und ständig neuen Themen. Am Ende bist du erschöpft, zerstreut und hast den Fokus für das Wesentliche verloren. Aufmerksamkeit bewusst zu lenken – bei dir selbst – ist die Antwort darauf.",
    sections: [
      {
        heading: "Empörung als Dauerzustand",
        body: "Ein ständig wechselndes Karussell aus Aufregerthemen hält dich beschäftigt, ohne dass du je zur Ruhe kommst. Kaum hast du dich über das eine empört, kommt das nächste. Diese Dauererregung fühlt sich wie Anteilnahme an, führt aber zu nichts – außer zu Erschöpfung. Und ein erschöpfter Mensch prüft nicht mehr, er reagiert nur noch.",
      },
      {
        heading: "Unterhaltung statt Einordnung",
        body: "Vieles, was informiert aussieht, unterhält vor allem. Es liefert Aufregung, aber keine Einordnung, Reiz statt Zusammenhang. So entsteht das Gefühl, informiert zu sein, während das Verständnis auf der Strecke bleibt. Der Test ist einfach: Verstehe ich hinterher mehr – oder bin ich nur aufgewühlter?",
      },
      {
        heading: "Informationsüberflutung",
        body: "Zu viel Information wirkt wie zu wenig: Wenn alles gleich laut und dringend erscheint, kann man nichts mehr gewichten. Die schiere Menge lähmt das Urteil. Der Ausweg ist nicht mehr Konsum, sondern weniger und gezielter – ein paar gute Quellen in Ruhe, statt alles gleichzeitig im Halbschlaf.",
      },
    ],
    exercises: [
      {
        title: "Der Aufreger-Filter",
        duration: "im Alltag",
        steps: [
          "Wenn dich etwas empört, frag: Betrifft das mein Leben – oder nur meine Erregung?",
          "Frag: Kann ich hier irgendetwas tun? Wenn nein, ist es vor allem Ablenkung.",
          "Lass bewusst ein Aufregerthema ziehen, ohne dich hineinziehen zu lassen.",
          "Bemerke, wie schnell das nächste kommt – und wie wenig vom letzten bleibt.",
        ],
      },
      {
        title: "Fokus-Diät",
        duration: "eine Woche",
        steps: [
          "Wähle zwei, drei verlässliche Quellen und lies nur diese – dafür in Ruhe.",
          "Setz feste Zeiten für Nachrichten, statt den ganzen Tag zu grasen.",
          "Beobachte, ob du weniger weißt – oder nur weniger aufgewühlt bist.",
          "Nutze die freigewordene Aufmerksamkeit für eine Sache, die dir wirklich wichtig ist.",
        ],
      },
    ],
    reflection: [
      "Worüber hast du dich diese Woche empört – und was ist davon geblieben?",
      "Wann fühlst du dich informiert, obwohl du nur aufgewühlt bist?",
      "Was würdest du klarer sehen, wenn weniger um deine Aufmerksamkeit buhlte?",
    ],
    takeaway:
      "Ablenkung braucht keine Lüge. Deine Aufmerksamkeit bewusst zu schützen, ist eine Form der geistigen Selbstbestimmung.",
    relatedStage: 3,
    video: null,
  },

  {
    slug: "kognitive-dissonanz",
    title: "Kognitive Dissonanz",
    subtitle: "Warum wir Unpassendes abwehren",
    category: "Mentale Selbstverteidigung",
    summary:
      "Menschen weisen Informationen oft nicht zurück, weil sie falsch sind, sondern weil sie das eigene Weltbild bedrohen.",
    keyIdea:
      "Es ist unangenehmer, sich selbst zu widersprechen, als die Wirklichkeit zu verbiegen – deshalb verbiegen wir lieber die Wirklichkeit.",
    intro:
      "Wenn eine neue Information nicht zu dem passt, was wir glauben, entsteht ein unangenehmes Spannungsgefühl – kognitive Dissonanz. Und weil wir Unbehagen scheuen, lösen wir die Spannung meist zur falschen Seite auf: Nicht die Information gewinnt, sondern das bestehende Weltbild. Das zu wissen, macht dich ehrlicher gegenüber dir selbst.",
    sections: [
      {
        heading: "Warum wir Fehler ungern zugeben",
        body: "Einen Irrtum einzugestehen bedroht das Bild, das wir von uns haben: klug, konsequent, auf der richtigen Seite. Also suchen wir Gründe, warum die unbequeme Information nicht zählt – statt unsere Sicht anzupassen. Je mehr wir in eine Überzeugung investiert haben, desto stärker verteidigen wir sie, gerade wenn sie wackelt.",
      },
      {
        heading: "Selektive Wahrnehmung",
        body: "Um die Spannung klein zu halten, filtert der Verstand: Passendes wird bemerkt und gewichtet, Unpassendes übersehen oder kleingeredet. So sammeln wir scheinbar immer mehr Belege für das, was wir ohnehin glauben. Nicht, weil die Belege überwiegen, sondern weil wir die anderen ausblenden.",
      },
      {
        heading: "Abwertung Andersdenkender",
        body: "Ein bequemer Weg, Dissonanz loszuwerden, ist, die Quelle abzuwerten: Wer anderer Meinung ist, ist eben dumm, böswillig oder manipuliert. Dann muss man sich mit dem Inhalt gar nicht mehr auseinandersetzen. Genau hier wird aus einem Denkfehler eine Spaltung – und die eigene Position immun gegen jede Korrektur.",
      },
    ],
    exercises: [
      {
        title: "Der Unbehagen-Marker",
        duration: "im Moment",
        steps: [
          "Bemerke, wenn eine Information sofort Widerstand in dir auslöst.",
          "Halt inne und frag: Wehre ich mich, weil es falsch ist – oder weil es unbequem ist?",
          "Erlaube dir, die Information einen Moment gelten zu lassen, ohne sofort zu urteilen.",
          "Beobachte, wie das Unbehagen selbst schon eine Information ist.",
        ],
      },
      {
        title: "Steelman statt Strohmann",
        duration: "15 Minuten",
        steps: [
          "Nimm eine Position, die du ablehnst.",
          "Formuliere ihre stärkste, klügste Fassung – nicht die schwächste.",
          "Prüfe: Kann ich sie widerlegen, ohne die Menschen dahinter abzuwerten?",
          "Bemerke, ob du wirklich das Argument kritisierst – oder nur die Gruppe.",
        ],
      },
    ],
    reflection: [
      "Welche Information hast du zuletzt abgewehrt, weil sie unbequem war?",
      "Wo wertest du Andersdenkende ab, statt ihre Argumente zu prüfen?",
      "Wann hast du zuletzt öffentlich zugegeben, dich geirrt zu haben?",
    ],
    takeaway:
      "Wir verteidigen oft nicht die Wahrheit, sondern unser Selbstbild. Unbehagen ist ein Hinweis, genauer hinzuschauen – nicht wegzuschauen.",
    relatedStage: 3,
    video: null,
  },

  {
    slug: "normalisierung",
    title: "Normalisierung",
    subtitle: "Wie das Ungewöhnliche selbstverständlich wird",
    category: "Mentale Selbstverteidigung",
    summary:
      "Was häufig genug gezeigt, gesagt oder praktiziert wird, wirkt irgendwann selbstverständlich – auch wenn es das nicht ist.",
    keyIdea:
      "Große Veränderungen geschehen selten mit einem Knall, sondern in kleinen Schritten, an die man sich einzeln gewöhnt.",
    intro:
      "Der Mensch gewöhnt sich an fast alles, wenn es nur langsam genug kommt. Was gestern noch undenkbar war, wird durch stetige Wiederholung erst hinnehmbar, dann normal, schließlich selbstverständlich. Diese schleichende Gewöhnung ist wertneutral – sie kann Gutes wie Bedenkliches tragen. Der Schutz liegt darin, die Verschiebung bewusst zu bemerken.",
    sections: [
      {
        heading: "Der Frosch im langsam heißen Wasser",
        body: "Eine große Veränderung auf einen Schlag würde Widerstand wecken. In kleinen Schritten dagegen rutscht dieselbe Veränderung durch, weil jeder einzelne Schritt gering erscheint. Man passt sich Stück für Stück an – und merkt am Ende nicht, wie weit man gekommen ist. Nicht der Bruch normalisiert, sondern die kleine, ständige Verschiebung.",
      },
      {
        heading: "„Das war doch schon immer so“",
        body: "Ist etwas erst einmal normal, verschwindet die Erinnerung, dass es auch anders war. „Das war doch schon immer so“ ist der Satz, mit dem Gewöhnung sich selbst tarnt. Dabei stimmt es fast nie – vieles, was heute selbstverständlich wirkt, war vor kurzem noch strittig oder unbekannt.",
      },
      {
        heading: "Grenzen verschieben sich unbemerkt",
        body: "Was gesellschaftlich sagbar, machbar oder üblich ist, verschiebt sich ständig – mal zum Besseren, mal zum Schlechteren. Der Punkt ist nicht, jede Veränderung abzulehnen, sondern sie überhaupt zu bemerken. Wer die Verschiebung sieht, kann entscheiden, ob er sie mitträgt – statt sie nur unbewusst zu übernehmen.",
      },
    ],
    exercises: [
      {
        title: "Der Zeitsprung",
        duration: "10 Minuten",
        steps: [
          "Wähle etwas, das dir heute völlig normal vorkommt.",
          "Frag: Hätte ich das vor zehn Jahren auch normal gefunden?",
          "Wenn nein: Wann und wie hat sich das verschoben?",
          "Entscheide bewusst, ob du diese Normalität teilst – oder nur übernommen hast.",
        ],
      },
      {
        title: "Die Erst-Reaktion festhalten",
        duration: "im Alltag",
        steps: [
          "Wenn dir etwas beim ersten Mal seltsam vorkommt, notiere dieses erste Gefühl.",
          "Beobachte, ob es dir nach dem zehnten Mal noch seltsam vorkommt.",
          "Frag: Hat sich die Sache verändert – oder nur meine Gewöhnung?",
          "Nutze die erste, noch wache Reaktion als wertvolle Information.",
        ],
      },
    ],
    reflection: [
      "Was findest du heute normal, das dich früher gestört hätte?",
      "Wo sagst du „das war schon immer so“, ohne es je geprüft zu haben?",
      "Welche Gewöhnung möchtest du bewusst nicht mitmachen?",
    ],
    takeaway:
      "Gewöhnung tarnt Veränderung als Selbstverständlichkeit. Wer die Verschiebung bemerkt, behält die Wahl, ob er sie mitträgt.",
    relatedStage: 1,
    video: null,
  },

  {
    slug: "bildmacht",
    title: "Bilder statt Argumente",
    subtitle: "Warum ein Bild schneller wirkt als ein Beweis",
    category: "Mentale Selbstverteidigung",
    summary:
      "Bilder erreichen Menschen oft schneller als Fakten – und ein Ausschnitt kann eine ganze Wirklichkeit ersetzen.",
    keyIdea:
      "Ein Bild fühlt sich an wie ein Beweis, obwohl es nur ein Ausschnitt ist – gewählt von jemandem, mit einer Absicht.",
    intro:
      "Bilder gehen direkt ins Gefühl, oft am Verstand vorbei. Sie bleiben länger haften als jeder Satz und wirken wie unmittelbare Wirklichkeit. Doch jedes Bild ist eine Auswahl: ein Ausschnitt, eine Perspektive, ein Moment aus vielen. Wer das mitdenkt, lässt sich von Bildern bewegen, ohne sich von ihnen überrumpeln zu lassen.",
    sections: [
      {
        heading: "Der Ausschnitt ist die Botschaft",
        body: "Was außerhalb des Bildrands liegt, existiert für den Betrachter nicht. Eine enge Aufnahme lässt eine kleine Gruppe riesig wirken – eine weite lässt eine große Menge verloren aussehen. Dasselbe Ereignis kann friedlich, bedrohlich, leer oder überwältigend erscheinen, je nachdem, welcher Ausschnitt gewählt wurde. Die Auswahl trifft immer jemand.",
      },
      {
        heading: "Moment, Mimik, Musik",
        body: "Ein einziger Sekundenbruchteil kann einen Menschen sympathisch oder abstoßend zeigen – ein Lächeln oder ein verzerrtes Gesicht, beides echt, beides selektiv. Kommt Musik dazu, wird das Gefühl vollends gesteuert: Dieselben Bilder wirken mit bedrohlicher Musik ganz anders als mit ruhiger. Die Inszenierung ist Teil der Botschaft.",
      },
      {
        heading: "Bilder als Erinnerungsträger",
        body: "Starke Bilder brennen sich ein und werden zur Erinnerung an ein ganzes Ereignis – auch wenn sie nur einen winzigen, untypischen Teil zeigten. Später erinnern wir uns an das Bild, nicht an die Zusammenhänge. So kann ein einzelnes Foto ein Urteil prägen, das durch keine spätere Einordnung mehr zu korrigieren ist.",
      },
    ],
    exercises: [
      {
        title: "Über den Rand hinausdenken",
        duration: "im Alltag",
        steps: [
          "Bei einem wirkmächtigen Bild frag: Was könnte außerhalb des Ausschnitts liegen?",
          "Frag: Warum genau dieser Moment, diese Perspektive, dieser Ausdruck?",
          "Stell dir vor, wie dasselbe Motiv aus anderem Winkel aussähe.",
          "Trenne das Gefühl, das das Bild weckt, von der Frage, was es wirklich belegt.",
        ],
      },
      {
        title: "Ton weg, dann urteilen",
        duration: "5 Minuten",
        steps: [
          "Schau ein emotionales Video einmal ohne Ton.",
          "Bemerke, wie viel schwächer die Wirkung ohne Musik ist.",
          "Frag: Was bleibt an Fakten übrig, wenn die Inszenierung wegfällt?",
          "Bilde dein Urteil aus dem Rest – nicht aus der Stimmung.",
        ],
      },
    ],
    reflection: [
      "Welches Bild hat zuletzt dein Urteil geprägt – und was zeigte es wirklich?",
      "Wie oft hältst du einen Ausschnitt für die ganze Wirklichkeit?",
      "Wann hat dich Musik unter einem Video stärker bewegt als der Inhalt?",
    ],
    takeaway:
      "Ein Bild ist ein gewählter Ausschnitt, kein vollständiger Beweis. Frag immer, was außerhalb des Rands liegt – und wer ihn gesetzt hat.",
    relatedStage: 3,
    video: null,
  },

  {
    slug: "identitaet-und-meinung",
    title: "Identität & Meinung",
    subtitle: "Wenn Kritik als Angriff auf dich wirkt",
    category: "Mentale Selbstverteidigung",
    summary:
      "Sobald eine Meinung Teil deiner Identität wird, fühlt sich Kritik daran wie ein persönlicher Angriff an.",
    keyIdea:
      "Solange du eine Meinung hast, kannst du sie prüfen. Sobald die Meinung dich hat, verteidigst du sie wie dein Leben.",
    intro:
      "Meinungen sind eigentlich Werkzeuge: Man nimmt sie an, prüft sie, legt sie bei Bedarf ab. Doch manche Meinungen verwachsen mit unserer Identität – mit einer Gruppe, einem Lager, einer Lebensweise, der wir uns zugehörig fühlen. Dann ist jede Kritik an der Meinung ein Angriff auf uns selbst. Die Kernfrage lautet: Hast du eine Meinung – oder hat die Meinung inzwischen dich?",
    sections: [
      {
        heading: "Meinung wird zu Zugehörigkeit",
        body: "Ob politisches Lager, Berufsgruppe, Bewegung, Marke, Lebensstil oder spirituelle Gemeinschaft – überall verschmelzen Meinungen mit Zugehörigkeit. Eine Position zu teilen heißt dann: dazuzugehören. Sie infrage zu stellen fühlt sich an, als riskierte man den Platz in der Gruppe. Deshalb prüft man solche Meinungen kaum noch – der Preis wäre zu hoch.",
      },
      {
        heading: "Warum Kritik dann schmerzt",
        body: "Wenn eine Überzeugung Teil deines Selbstbildes ist, aktiviert ein Gegenargument dieselbe Abwehr wie ein persönlicher Angriff. Der Körper geht in Verteidigung, der Verstand sucht Gegenargumente statt Wahrheit. Das ist kein Zeichen von Sturheit, sondern von Verschmelzung: Du verteidigst nicht die Sache, sondern dich.",
      },
      {
        heading: "Meinungen wieder zu Werkzeugen machen",
        body: "Die Freiheit liegt darin, einen Abstand zwischen dich und deine Meinungen zu legen – so wie du gelernt hast, zwischen dich und deine Gedanken zu treten. Eine Überzeugung ändern zu können ist keine Schwäche, sondern Reife. Du bleibst du, auch wenn eine Meinung geht. Was bleibt, bist nicht du minus eine Ansicht – sondern du, eine Illusion leichter.",
      },
    ],
    exercises: [
      {
        title: "Identität oder Ansicht?",
        duration: "10 Minuten",
        steps: [
          "Nimm eine Überzeugung, bei der Kritik dich schnell wütend macht.",
          "Frag: Verteidige ich hier ein Argument – oder ein Stück meiner Identität?",
          "Sag innerlich: „Ich bemerke die Meinung, dass …“ – statt „Ich bin …“.",
          "Spür, ob dadurch ein wenig Abstand und Ruhe entsteht.",
        ],
      },
      {
        title: "Der ehrliche Preis",
        duration: "15 Minuten",
        steps: [
          "Wähle eine Position, die eng mit deiner Gruppe verbunden ist.",
          "Frag ehrlich: Was würde es mich kosten, hier anderer Meinung zu sein?",
          "Unterscheide: Halte ich daran fest, weil es stimmt – oder wegen der Zugehörigkeit?",
          "Erlaube dir, eine Sache zu prüfen, ohne die Gruppe zu verraten.",
        ],
      },
    ],
    reflection: [
      "Bei welcher Meinung fühlt sich Widerspruch wie ein persönlicher Angriff an?",
      "Welche Überzeugung könntest du nicht ablegen, ohne eine Zugehörigkeit zu riskieren?",
      "Hast du deine Meinungen – oder haben sie dich?",
    ],
    takeaway:
      "Eine Meinung ist ein Werkzeug, kein Körperteil. Wer sie prüfen kann, ohne sich bedroht zu fühlen, ist wirklich frei im Denken.",
    relatedStage: 6,
    video: null,
  },

  {
    slug: "reizueberflutung",
    title: "Reizüberflutung & Alarmbereitschaft",
    subtitle: "Warum ein überflutetes Gehirn leichter zu lenken ist",
    category: "Mentale Selbstverteidigung",
    summary:
      "Zu viele gleichzeitige, wechselnde und emotionale Reize halten dein Nervensystem in Daueralarm – und in Alarm denkst du enger und bist leichter steuerbar.",
    keyIdea:
      "Bevor du fragst, was du denkst, entscheidet dein körperlicher Zustand, wie du denkst. Ein Gehirn im Alarm trifft andere Entscheidungen als ein reguliertes.",
    intro:
      "Geräusche, Nachrichten, Benachrichtigungen, Gespräche, Schlagzeilen und die Gedanken im eigenen Kopf konkurrieren jeden Tag um deine Aufmerksamkeit. Das Problem ist nicht, dass dein Gehirn keine vielen Reize verarbeiten könnte. Das Problem entsteht, wenn zu viele Reize gleichzeitig wichtig erscheinen, ständig wechseln und emotional aufgeladen sind. Dann bleibt dein System in Bereitschaft – und dieser Zustand verändert, wie du wahrnimmst, bewertest und entscheidest.",
    sections: [
      {
        heading: "Dein Gehirn bewertet ununterbrochen",
        body: "Jeder Reiz wird blitzschnell einsortiert: wichtig oder nicht, neu oder bekannt, gefährlich oder harmlos. An dieser Bewertung ist besonders die Amygdala beteiligt, vor allem bei Unsicherem und Negativem. Eine einzelne Benachrichtigung löst noch keinen Panikalarm aus. Kommen aber viele unvorhersehbare, emotional aufgeladene Reize zusammen, rutscht das Gehirn in erhöhte Wachsamkeit: „Irgendetwas könnte wichtig sein – bleib wach.“",
      },
      {
        heading: "Zwei Stressreaktionen: die schnelle und die langsame",
        body: "Bewertet dein Gehirn etwas als relevant, aktiviert es zuerst den schnellen Weg: Adrenalin und Noradrenalin machen dich innerhalb von Sekunden wacher und reaktionsbereit – Herz schneller, Atmung flacher, Muskeln angespannt. Hält die Belastung an, kommt die langsamere HPA-Achse dazu, an deren Ende Cortisol steht, das über Minuten Energie bereitstellt. Beides ist für sich gesund und nützlich. Das Problem ist nicht das Cortisol, sondern eine Stressreaktion, die zu oft anspringt und nicht mehr richtig herunterfährt.",
      },
      {
        heading: "Warum du im Alarm schlechter denkst",
        body: "Unter starkem Stress arbeitet der präfrontale Cortex weniger effektiv – also genau der Teil, der für planvolles Denken, Impulskontrolle, Arbeitsgedächtnis und Abwägen zuständig ist. Gleichzeitig gewinnen die schnellen, emotionalen und gewohnheitsbasierten Systeme an Einfluss. Das erklärt, warum du dann unkonzentriert, vergesslich, gereizt und impulsiv bist. Und genau hier liegt die Verbindung zu allem Vorherigen: Ein Mensch in Daueralarm denkt enger, sucht schnelle Antworten und ist dadurch leichter über Angst, Feindbilder und einfache Parolen erreichbar.",
      },
      {
        heading: "Der Kreislauf – und der Ausweg",
        body: "Digitale Reize sind meist unvorhersehbar, und die bloße Möglichkeit, dass gleich etwas Neues oder Wichtiges kommt, lässt dich über Dopamin immer wieder zur selben Quelle zurückkehren, die dich zugleich belastet. So entsteht ein widersprüchlicher Kreislauf: Der Reiz stresst dich – und du suchst den nächsten Reiz zur Beruhigung. Der Ausweg ist kein weiterer Input, sondern Ruhe. Erst wenn das System herunterfährt, übernimmt der präfrontale Cortex wieder, ordnet ein und schafft den Raum zwischen Reiz und Reaktion, in dem du überhaupt frei wählen kannst.",
      },
    ],
    exercises: [
      {
        title: "Die Reiz-Inventur",
        duration: "5 Minuten",
        steps: [
          "Halt einmal mitten im Tag inne und zähle, wie viele Reizquellen gerade gleichzeitig um dich buhlen (Bildschirme, Töne, offene Tabs, Hintergrundgeräusche).",
          "Schalte bewusst eine einzige davon ab – ein Ton, ein Fenster, ein Gerät.",
          "Bemerke, ob dein Körper eine Spur ruhiger wird.",
          "Mach das zur Gewohnheit: immer nur ein Kanal auf einmal, wo es geht.",
        ],
      },
      {
        title: "Das System herunterfahren",
        duration: "10 Minuten, bei Überforderung",
        steps: [
          "Wenn du merkst, dass du nur noch reagierst, gönn dir eine reizarme Pause – kein Handy, kein Bildschirm, keine neue Information.",
          "Atme ein paar Minuten ruhig, mit längerem Ausatmen als Einatmen – das signalisiert dem Körper Sicherheit.",
          "Widerstehe dem Impuls, die Unruhe mit dem nächsten Reiz zu beruhigen.",
          "Kehre erst danach zur Aufgabe zurück und bemerke, wie viel klarer du denkst.",
        ],
      },
    ],
    reflection: [
      "In welchen Situationen greifst du zum Handy, gerade weil du schon überreizt bist?",
      "Woran merkst du bei dir selbst, dass dein Denken von „abwägen“ auf „nur noch reagieren“ umgeschaltet hat?",
      "Wann warst du zuletzt bewusst reizlos – und wie hat sich dein Denken danach angefühlt?",
    ],
    takeaway:
      "Du kannst deine Gedanken nicht meistern, solange dein System glaubt, auf alles reagieren zu müssen. Ruhe ist keine Zeitverschwendung – sie ist der Zustand, in dem du wieder wählen kannst.",
    relatedStage: 4,
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
