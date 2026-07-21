/**
 * Ausführliche Lektions-Inhalte für die 7 Stufen (Mitgliederbereich).
 * Ergänzt die Kurzfassung aus `content.ts` um Lektionstext, Übungen,
 * Reflexionsfragen und einen Video-Platz.
 *
 * Texte sind markengerecht vorformuliert – gern anpassen/verfeinern.
 * Video: sobald ein Video fertig ist, einfach die YouTube-ID eintragen
 *        (der Teil nach `v=` bzw. hinter `youtu.be/`), z. B. "dQw4w9WgXcQ".
 */

export type LessonSection = { heading: string; body: string };

export type LessonExercise = {
  title: string;
  duration?: string;
  steps: string[];
};

export type StageLesson = {
  number: string;
  /** Kerngedanke der Stufe – eine prägnante Zeile */
  keyIdea: string;
  /** Einführender Text, der die Stufe eröffnet */
  intro: string;
  /** Die eigentliche Lektion in mehreren Abschnitten */
  sections: LessonSection[];
  /** Praktische Übungen zum Umsetzen */
  exercises: LessonExercise[];
  /** Reflexionsfragen zum Innehalten */
  reflection: string[];
  /** Abschließende Verankerung / Leitsatz */
  affirmation: string;
  /** YouTube-Video-ID – oder null, solange noch keins vorliegt */
  video: string | null;
};

export const stageLessons: StageLesson[] = [
  // 01 – Erwachen
  {
    number: "01",
    keyIdea:
      "Du bist nicht deine Gedanken. Du bist der Raum, in dem sie erscheinen.",
    intro:
      "Alles beginnt mit einem einzigen Moment: Du bemerkst zum ersten Mal, dass da jemand ist, der deine Gedanken wahrnimmt. Solange du glaubst, deine Gedanken zu sein, bist du ihnen ausgeliefert. In dem Augenblick, in dem du sie bemerkst, entsteht ein winziger Abstand – und in diesem Abstand liegt deine ganze Freiheit.",
    sections: [
      {
        heading: "Der Moment, in dem alles beginnt",
        body: "Erwachen ist kein spektakuläres Ereignis. Es ist ein leises Erkennen: „Oh – ich denke gerade.“ Genau dieses Erkennen kann kein Gedanke sein, denn es sieht dem Denken zu. Damit ist der erste Schritt getan: Du hast dich zum ersten Mal von deinen Gedanken unterschieden.",
      },
      {
        heading: "Warum wir uns mit dem Denken verwechseln",
        body: "Von klein auf haben wir gelernt, jeden Gedanken für bare Münze zu nehmen. Niemand hat uns gezeigt, dass Gedanken nur Angebote sind – Vorschläge, die kommen und gehen. Dieses lebenslange Übersehen ist der Grund, warum sich alte Muster so echt und so zwingend anfühlen.",
      },
      {
        heading: "Erwachen ist kein Ziel, sondern ein Erinnern",
        body: "Du musst nichts Neues werden. Das Bewusstsein, das jetzt diese Worte liest, war immer schon da – hinter jedem Gedanken, in jedem Alter deines Lebens. Auf dieser Stufe geht es nur darum, dich immer öfter daran zu erinnern, wer da eigentlich wahrnimmt.",
      },
    ],
    exercises: [
      {
        title: "Die 3-Sekunden-Pause",
        duration: "1 Minute, mehrmals täglich",
        steps: [
          "Halte mitten im Alltag kurz inne – beim Türöffnen, vor dem Griff zum Handy, an der roten Ampel.",
          "Nimm drei ruhige Atemzüge und frage innerlich: „Wer nimmt das hier gerade wahr?“",
          "Erwarte keine Antwort in Worten. Spüre einfach, dass da ein Wahrnehmender ist.",
          "Geh dann bewusst weiter – nur eine Spur wacher als vorher.",
        ],
      },
      {
        title: "Der Zeuge-Moment",
        duration: "5 Minuten",
        steps: [
          "Setz dich ruhig hin und schließe die Augen.",
          "Beobachte, welcher Gedanke als Nächstes auftaucht – ganz ohne ihn zu bewerten.",
          "Sag innerlich: „Da ist ein Gedanke.“ Nicht „ich denke“, sondern „da ist ein Gedanke“.",
          "Merke, wie allein diese Formulierung einen Abstand schafft. Genau dieser Abstand bist du.",
        ],
      },
    ],
    reflection: [
      "Wann in deinem Leben hast du schon einmal gespürt, dass du mehr bist als das, was in deinem Kopf abläuft?",
      "Welche Gedanken hältst du bisher für unumstößlich wahr – nur weil sie in deinem Kopf auftauchen?",
      "Wie würde sich dein Tag anfühlen, wenn du wüsstest, dass du deinen Gedanken zusehen darfst, statt ihnen zu gehorchen?",
    ],
    affirmation:
      "Ich bin nicht meine Gedanken. Ich bin das Bewusstsein, das sie bemerkt.",
    video: null,
  },

  // 02 – Beobachten
  {
    number: "02",
    keyIdea:
      "Zwischen Reiz und Reaktion liegt ein Raum. In diesem Raum liegt deine Wahlfreiheit.",
    intro:
      "Wenn du erst einmal erwacht bist, beginnt die eigentliche Übung: das Beobachten. Es ist die Kunst, deinen Gedanken zuzusehen, ohne dich sofort mit ihnen zu identifizieren. Der innere Beobachter urteilt nicht, kämpft nicht und will nichts wegdrücken – er schaut nur. Und genau dieses Schauen verändert alles.",
    sections: [
      {
        heading: "Der innere Beobachter",
        body: "Stell dir vor, du sitzt am Ufer eines Flusses. Die Gedanken sind das Wasser, das vorbeizieht. Bisher bist du bei jedem Gedanken hineingesprungen und mitgeschwommen. Der Beobachter bleibt am Ufer sitzen und schaut zu. Nichts muss aufgehalten werden – alles darf vorbeiziehen.",
      },
      {
        heading: "Distanz schafft Klarheit",
        body: "Solange du mitten im Gedanken steckst, siehst du nur den Gedanken. Sobald du einen Schritt zurücktrittst, siehst du das Muster dahinter. Diese Distanz ist kein Wegdrücken und keine Kälte – sie ist die ruhige Übersicht, aus der heraus du überhaupt erst wählen kannst.",
      },
      {
        heading: "Beobachten heißt nicht bekämpfen",
        body: "Der häufigste Fehler: gegen die eigenen Gedanken ankämpfen. Doch was du bekämpfst, hältst du fest. Beobachten ist das Gegenteil – ein freundliches, wertfreies Hinsehen. Was gesehen wird, muss sich nicht mehr durchsetzen, um gehört zu werden.",
      },
    ],
    exercises: [
      {
        title: "Gedanken benennen",
        duration: "10 Minuten",
        steps: [
          "Setz dich hin und beobachte für ein paar Minuten deinen Gedankenstrom.",
          "Gib jedem Gedanken eine schlichte Etikette: „planen“, „erinnern“, „sorgen“, „bewerten“.",
          "Kehre nach jeder Etikette zurück zum ruhigen Beobachten.",
          "Beobachte zum Schluss: Bist du der Gedanke – oder der, der ihn benennt?",
        ],
      },
      {
        title: "Der Fluss",
        duration: "5–8 Minuten",
        steps: [
          "Schließe die Augen und stell dir einen ruhig fließenden Fluss vor.",
          "Lege jeden auftauchenden Gedanken gedanklich auf ein Blatt und lass es vorbeitreiben.",
          "Wenn du merkst, dass du „mitgeschwommen“ bist, ist das kein Fehler – kehr einfach ans Ufer zurück.",
          "Übe die freundliche Rückkehr. Genau sie ist das Training.",
        ],
      },
    ],
    reflection: [
      "In welchen Situationen reißen dich deine Gedanken am schnellsten mit?",
      "Was verändert sich, wenn du einen Gedanken nur benennst, statt ihm sofort zu glauben?",
      "Wie fühlt es sich an, am Ufer zu sitzen – statt mitzuschwimmen?",
    ],
    affirmation:
      "Ich sehe meinen Gedanken ruhig zu. Ich muss ihnen nicht folgen.",
    video: null,
  },

  // 03 – Entprogrammieren
  {
    number: "03",
    keyIdea:
      "Was du nicht bewusst wählst, wählt dich. Sichtbare Muster verlieren ihre Macht.",
    intro:
      "Vieles, was du für „deine Persönlichkeit“ hältst, sind in Wahrheit alte Programme: Glaubenssätze, Prägungen und automatische Reaktionen, die du irgendwann übernommen hast – meist lange bevor du wählen konntest. Auf dieser Stufe machst du diese Programme sichtbar. Und alles, was sichtbar wird, verliert seinen unbewussten Griff.",
    sections: [
      {
        heading: "Woher deine Muster stammen",
        body: "Kein Muster ist grundlos entstanden. Jedes war einmal ein cleverer Schutz – eine Strategie, die dir als Kind geholfen hat, dazuzugehören, sicher zu sein oder Liebe zu bekommen. Das Problem ist nicht das Muster. Das Problem ist, dass es heute noch läuft, obwohl die Situation von damals längst vorbei ist.",
      },
      {
        heading: "Glaubenssätze als unsichtbare Regeln",
        body: "„Ich muss stark sein.“ „Ich bin nicht genug.“ „Man kann niemandem trauen.“ Solche Sätze arbeiten im Hintergrund wie Betriebssystem-Regeln. Du hörst sie nicht mehr bewusst – du lebst sie einfach. Der erste Schritt zur Freiheit ist, sie überhaupt in Worte zu fassen.",
      },
      {
        heading: "Sehen ist schon Veränderung",
        body: "Du musst ein Muster nicht mit Gewalt „loswerden“. Sobald du es klar erkennst – seinen Auslöser, seine Geschichte, seinen Preis – kann es nicht mehr unbemerkt ablaufen. Bewusstheit entzieht dem Automatismus den Boden. Was du siehst, steuert dich nicht mehr blind.",
      },
    ],
    exercises: [
      {
        title: "Der Muster-Spürsinn",
        duration: "15 Minuten, schriftlich",
        steps: [
          "Denk an eine Situation, in der du kürzlich stärker reagiert hast, als es „nötig“ gewesen wäre.",
          "Schreib auf: Was genau war der Auslöser? Was hast du gefühlt, gedacht, getan?",
          "Frage dich: „Wie alt fühle ich mich in diesem Moment wirklich?“",
          "Spür nach, an welche frühere Situation dich das erinnert. Da liegt die Wurzel.",
        ],
      },
      {
        title: "Glaubenssatz ans Licht holen",
        duration: "10 Minuten",
        steps: [
          "Vervollständige spontan und ehrlich: „Ich bin …“, „Das Leben ist …“, „Menschen sind …“.",
          "Schreib die ersten Antworten auf, ohne sie zu zensieren.",
          "Markiere die Sätze, die sich schwer oder einengend anfühlen.",
          "Frage bei jedem: „Ist das wirklich wahr – oder nur alt und gewohnt?“",
        ],
      },
    ],
    reflection: [
      "Welche Reaktion von dir wiederholt sich immer wieder, obwohl du sie eigentlich nicht mehr willst?",
      "Welchen Glaubenssatz hast du vielleicht von deinen Eltern oder deinem Umfeld übernommen, ohne ihn je zu prüfen?",
      "Was hat dich dieses Muster bisher gekostet – an Energie, Nähe oder Möglichkeiten?",
    ],
    affirmation:
      "Ich erkenne meine Muster – und was ich erkenne, steuert mich nicht mehr blind.",
    video: null,
  },

  // 04 – Loslassen
  {
    number: "04",
    keyIdea:
      "Loslassen ist kein Verlieren, sondern ein Freiwerden. Es schafft Raum für dich.",
    intro:
      "Erkennen allein reicht oft nicht – manche Muster sitzen im Körper und in festgehaltenen Gefühlen. Auf dieser Stufe geht es ums Loslassen: alte Emotionen fühlen und ziehen lassen, Geschichten beenden, die du dir seit Jahren erzählst. Wo etwas losgelassen wird, entsteht Raum – für Ruhe, für Energie, für dich.",
    sections: [
      {
        heading: "Was wir festhalten, hält uns fest",
        body: "Nicht gefühlte Gefühle verschwinden nicht – sie warten. Sie binden Energie, färben deine Stimmung und melden sich in den unpassendsten Momenten. Loslassen beginnt paradoxerweise damit, das Gefühl endlich zuzulassen, statt es weiter wegzudrücken.",
      },
      {
        heading: "Fühlen statt analysieren",
        body: "Der Verstand liebt es, Gefühle zu erklären, statt sie zu fühlen. Doch ein Gefühl löst sich nicht durch Analyse, sondern durch bewusste Anwesenheit. Wenn du einer Emotion Raum gibst – im Körper, ohne Geschichte drumherum – darf sie durch dich hindurchziehen und gehen.",
      },
      {
        heading: "Die Geschichte beenden",
        body: "Oft halten wir nicht am Gefühl fest, sondern an der Geschichte: „Er hat mir das angetan.“ „So bin ich eben.“ Loslassen heißt auch, eine Geschichte zu Ende zu erzählen – nicht um zu vergessen, sondern um nicht mehr aus der Wunde heraus zu leben.",
      },
    ],
    exercises: [
      {
        title: "Das Gefühl einladen",
        duration: "10–15 Minuten",
        steps: [
          "Erinnere dich an etwas, das dich noch belastet – wähle bewusst etwas Mittelschweres, nichts Überforderndes.",
          "Spür nach: Wo im Körper meldet sich das Gefühl? Brust, Bauch, Kehle?",
          "Atme sanft in diese Stelle hinein und lass das Gefühl da sein, ohne etwas ändern zu wollen.",
          "Sag innerlich: „Du darfst da sein. Und du darfst gehen.“ Beobachte, wie sich die Intensität wandelt.",
        ],
      },
      {
        title: "Der Abschiedsbrief",
        duration: "20 Minuten, schriftlich",
        steps: [
          "Schreib einen Brief an eine Situation, Person oder alte Version von dir, die du loslassen möchtest.",
          "Schreib alles auf – ehrlich, ungefiltert, ohne dass es jemand liest.",
          "Beende den Brief mit einem bewussten Satz des Loslassens in deinen eigenen Worten.",
          "Wenn du magst, zerreiße oder verbrenne den Brief anschließend als Zeichen des Abschlusses.",
        ],
      },
    ],
    reflection: [
      "Welches Gefühl trägst du vielleicht schon lange mit dir, ohne es je wirklich gefühlt zu haben?",
      "Welche Geschichte über dein Leben erzählst du dir immer wieder – und was, wenn sie nicht die ganze Wahrheit ist?",
      "Was würde in dir frei werden, wenn du diese eine Last endlich loslassen dürftest?",
    ],
    affirmation:
      "Ich darf fühlen, was ist – und ich darf loslassen, was war. Ich werde leicht.",
    video: null,
  },

  // 05 – Neu ausrichten
  {
    number: "05",
    keyIdea:
      "Jetzt schreibst du den Code neu. Du wählst die Gedanken, die dich tragen.",
    intro:
      "Wo Altes gegangen ist, entsteht Raum für Neues. Auf dieser Stufe wirst du vom Beobachter zum bewussten Gestalter. Du wählst nicht länger die Gedanken, die dir zufällig einfallen, sondern jene, die dich stärken – und verankerst sie so lange, bis sie zu deiner neuen Normalität werden.",
    sections: [
      {
        heading: "Vom Beobachter zum Gestalter",
        body: "Die ersten Stufen haben dich frei gemacht von automatischem Denken. Jetzt nutzt du diese Freiheit aktiv. Gedanken sind formbar: Was du regelmäßig denkst, wird zur Spur, und was zur Spur wird, wird zur Straße. Du entscheidest, welche Straßen du in dir baust.",
      },
      {
        heading: "Neue Gedanken müssen wahr werden dürfen",
        body: "Ein neuer Gedanke wirkt nur, wenn er glaubwürdig ist. „Ich bin voller Selbstvertrauen“ springt oft zu weit. „Ich lerne gerade, mir selbst zu vertrauen“ ist ehrlich – und genau deshalb kraftvoll. Wähle Sätze, die dein System annehmen kann, und lass sie mit dir wachsen.",
      },
      {
        heading: "Wiederholung verankert",
        body: "Neue Denkbahnen entstehen nicht durch einmalige Einsicht, sondern durch Wiederholung mit Gefühl. Je öfter du einen stärkenden Gedanken denkst und dabei die passende Empfindung spürst, desto tiefer gräbt er sich ein – bis er sich irgendwann wie selbstverständlich anfühlt.",
      },
    ],
    exercises: [
      {
        title: "Den Satz umschreiben",
        duration: "15 Minuten, schriftlich",
        steps: [
          "Nimm einen einengenden Glaubenssatz aus Stufe 3, den du erkannt hast.",
          "Formuliere eine neue, ehrliche Version – glaubwürdig, in der Gegenwart, in deinen Worten.",
          "Prüfe: Fühlt sich der neue Satz erreichbar an? Wenn nicht, mach ihn eine Stufe realistischer.",
          "Schreib ihn auf und platziere ihn dort, wo du ihn täglich siehst.",
        ],
      },
      {
        title: "Morgen-Ausrichtung",
        duration: "3 Minuten, täglich",
        steps: [
          "Nimm dir direkt nach dem Aufwachen einen Moment, bevor der Autopilot startet.",
          "Wähle bewusst einen Gedanken oder eine Absicht für den Tag.",
          "Spür kurz nach, wie es sich anfühlt, aus diesem Gedanken heraus in den Tag zu gehen.",
          "Kehre tagsüber, wann immer du dich verlierst, kurz zu dieser Ausrichtung zurück.",
        ],
      },
    ],
    reflection: [
      "Welchen Gedanken würdest du gerne öfter denken – und was hält dich bisher davon ab?",
      "Wie würdest du über dich sprechen, wenn du dein bester Freund wärst?",
      "Welche neue innere Grundhaltung möchtest du in den nächsten Wochen verankern?",
    ],
    affirmation:
      "Ich wähle meine Gedanken bewusst. Was ich nähre, wächst.",
    video: null,
  },

  // 06 – In Kohärenz kommen
  {
    number: "06",
    keyIdea:
      "Wenn Kopf, Herz und Handeln an einem Strang ziehen, entsteht echte Kraft.",
    intro:
      "Wissen allein verändert wenig – erst wenn Denken, Fühlen und Tun in dieselbe Richtung zeigen, wirst du wirklich frei und wirksam. Auf dieser Stufe geht es um Kohärenz: die innere Stimmigkeit, aus der Präsenz, Ausstrahlung und ruhige Kraft entstehen.",
    sections: [
      {
        heading: "Der stille Widerspruch",
        body: "Viele Menschen denken das eine, fühlen das andere und tun ein drittes. Dieser innere Widerspruch kostet enorm viel Energie – meist unbemerkt. Kohärenz bedeutet, diese Spaltung zu schließen: Was du denkst, fühlst und tust, gehört wieder zusammen.",
      },
      {
        heading: "Das Herz als Kompass",
        body: "Der Kopf ist ein brillanter Diener, aber ein schlechter Meister. Auf dieser Stufe lernst du, dein Fühlen als Kompass ernst zu nehmen – nicht als Launen, sondern als leise, ehrliche Rückmeldung. Wenn Kopf und Herz sich einig sind, wird Handeln müheloser.",
      },
      {
        heading: "Integrität als Kraftquelle",
        body: "Jedes Mal, wenn dein Handeln deinen Werten entspricht, gewinnst du Vertrauen zu dir selbst. Diese Selbst-Übereinstimmung ist die Wurzel echter Ausstrahlung. Menschen spüren, ob du stimmig bist – lange bevor du ein Wort sagst.",
      },
    ],
    exercises: [
      {
        title: "Der Kohärenz-Check",
        duration: "10 Minuten",
        steps: [
          "Denk an eine anstehende Entscheidung oder eine wiederkehrende Situation.",
          "Frage nacheinander: Was denkt mein Kopf? Was fühlt mein Herz? Was tue ich tatsächlich?",
          "Spür, wo diese drei auseinandergehen – dort liegt die Spannung.",
          "Wähle einen kleinen konkreten Schritt, der die drei wieder in Einklang bringt.",
        ],
      },
      {
        title: "Herz-Atmung",
        duration: "5 Minuten",
        steps: [
          "Leg eine Hand auf dein Herz und atme ruhig und etwas langsamer als gewohnt.",
          "Stell dir vor, du atmest direkt durch die Herzgegend ein und aus.",
          "Ruf ein Gefühl von Dankbarkeit oder Wärme hervor – und sei es für eine Kleinigkeit.",
          "Bleib ein paar Atemzüge in diesem Zustand. Aus ihm heraus fällt Klarheit leichter.",
        ],
      },
    ],
    reflection: [
      "In welchem Lebensbereich denkst, fühlst und handelst du gerade nicht stimmig?",
      "Wann hast du dich zuletzt richtig mit dir im Einklang gefühlt – und was war da anders?",
      "Welcher kleine Schritt würde dein Handeln wieder näher an deine Werte bringen?",
    ],
    affirmation:
      "Kopf, Herz und Handeln ziehen an einem Strang. Ich bin stimmig.",
    video: null,
  },

  // 07 – Meisterschaft
  {
    number: "07",
    keyIdea:
      "Du reagierst nicht mehr – du gestaltest. Bewusstsein wird dein Zuhause.",
    intro:
      "Meisterschaft ist kein Endpunkt, an dem du „fertig“ bist, sondern eine neue Art zu leben. Du bist nicht länger Spielball deiner Gedanken und Gefühle – du bist der bewusste Raum, aus dem heraus du dein Leben souverän formst. Aus Reagieren wird Gestalten. Aus Getriebensein wird Präsenz.",
    sections: [
      {
        heading: "Vom Reagieren zum Gestalten",
        body: "Auf den früheren Stufen hast du gelernt innezuhalten, zu beobachten, loszulassen und neu zu wählen. In der Meisterschaft geschieht das nicht mehr als Technik, sondern als Haltung. Der Abstand zwischen Reiz und Reaktion ist zu deinem natürlichen Zuhause geworden.",
      },
      {
        heading: "Meisterschaft ist ein Weg, kein Ziel",
        body: "Niemand ist „für immer“ Meister. Auch dich werden Tage aus der Bahn werfen. Der Unterschied ist: Du findest schneller zurück. Du nimmst dich selbst nicht mehr so ernst und weißt, wohin du zurückkehren kannst – immer wieder, mit Geduld und ohne Selbstverurteilung.",
      },
      {
        heading: "Aus der Fülle leben und weitergeben",
        body: "Wer bei sich zu Hause ist, muss nicht mehr im Außen suchen, was nur innen zu finden ist. Aus dieser inneren Freiheit entsteht oft der Wunsch, weiterzugeben – ein Vorbild zu sein, nicht durch Worte, sondern durch die Art, wie du bist.",
      },
    ],
    exercises: [
      {
        title: "Die tägliche Rückkehr",
        duration: "5 Minuten, morgens & abends",
        steps: [
          "Beginne den Tag mit einem bewussten Moment der Stille – noch vor dem ersten Griff zum Handy.",
          "Erinnere dich: „Ich bin der Raum, in dem der Tag geschieht.“",
          "Am Abend: Blicke ohne Wertung zurück. Wo warst du präsent? Wo hat der Autopilot übernommen?",
          "Kein Urteil, nur Bemerken. Die Rückkehr selbst ist die Meisterschaft.",
        ],
      },
      {
        title: "Der bewusste Umgang mit dem Sturm",
        duration: "im Moment der Herausforderung",
        steps: [
          "Wenn dich etwas triggert, halte für einen Atemzug inne, bevor du reagierst.",
          "Benenne innerlich: „Da ist Wut / Angst / Kränkung.“ Du bist nicht das Gefühl – du bemerkst es.",
          "Frage: „Wer will ich in diesem Moment sein?“",
          "Handle aus dieser Antwort heraus – bewusst gewählt, nicht automatisch ausgelöst.",
        ],
      },
    ],
    reflection: [
      "Woran würdest du merken, dass du beginnst, aus Bewusstsein statt aus Automatismus zu leben?",
      "Wer wärst du, wenn deine alten Muster dich nicht mehr steuern würden?",
      "Was möchtest du mit der Freiheit anfangen, die auf diesem Weg in dir entsteht?",
    ],
    affirmation:
      "Ich reagiere nicht mehr – ich gestalte. Bewusstsein ist mein Zuhause.",
    video: null,
  },
];

export function getStageLesson(number: string): StageLesson | undefined {
  return stageLessons.find((l) => l.number === number);
}
