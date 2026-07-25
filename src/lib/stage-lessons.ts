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
  // 01 – Autopilot
  {
    number: "01",
    keyIdea:
      "Was du nicht bewusst steuerst, steuert dich. Alles beginnt damit, den Autopiloten zu bemerken.",
    intro:
      "Die meisten Menschen leben große Teile ihres Lebens im Autopilot: Sie reagieren, funktionieren und wiederholen – gesteuert von Gewohnheiten, Prägungen und automatischen Gedanken, die sie nie bewusst gewählt haben. Diese erste Stufe ist der ehrliche Blick auf genau das. Nicht als Vorwurf, sondern als Ausgangspunkt: Denn was du erkennst, kann beginnen, sich zu verändern.",
    sections: [
      {
        heading: "Das Leben im Autopilot",
        body: "Autopilot bedeutet nicht Faulheit, sondern Effizienz: Dein Gehirn spart Energie, indem es Bewährtes automatisch abspult. Im Alltag ist das praktisch – bis dieselben Reaktionen, Konflikte und Gefühle sich immer wiederholen, obwohl du sie längst nicht mehr willst. Dann arbeitet die Effizienz gegen dich.",
      },
      {
        heading: "Woher deine Programme stammen",
        body: "Deine automatischen Muster sind gelernt: von Eltern, Schule, Erfahrungen, Gesellschaft und Medien – meist lange, bevor du wählen konntest. Jedes war einmal ein sinnvoller Schutz. Das Problem ist nicht ihre Herkunft, sondern dass sie heute noch unbemerkt laufen, obwohl die alte Situation längst vorbei ist.",
      },
      {
        heading: "Warum sich der Autopilot wie Freiheit anfühlt",
        body: "Das Tückische: Automatische Reaktionen fühlen sich an wie freie Entscheidungen. „So bin ich eben.“ Doch vieles, was wir für unseren Charakter halten, ist antrainiertes Reagieren. Genau diese Verwechslung hält den Autopiloten am Laufen – wir verteidigen Muster, die uns steuern, als wären sie wir selbst.",
      },
      {
        heading: "Der erste Riss",
        body: "Veränderung beginnt nicht mit einer Technik, sondern mit einem Bemerken: „Moment – das läuft hier gerade automatisch ab.“ Dieser kleine Riss im Automatischen ist der Anfang von allem. Er lässt sich nicht erzwingen, aber üben – und je öfter er auftaucht, desto mehr Wahl entsteht.",
      },
    ],
    exercises: [
      {
        title: "Der Autopilot-Check",
        duration: "1 Minute, mehrmals täglich",
        steps: [
          "Halte mitten im Alltag kurz inne – an der Ampel, vor dem Griff zum Handy, zwischen zwei Aufgaben.",
          "Frage dich ehrlich: „Handle ich gerade bewusst – oder automatisch?“",
          "Bemerke die Antwort ohne Wertung. Es geht nur ums Sehen, nicht ums Ändern.",
          "Geh dann bewusst weiter – eine Spur wacher als vorher.",
        ],
      },
      {
        title: "Ein Muster benennen",
        duration: "15 Minuten, schriftlich",
        steps: [
          "Denk an eine Situation, in der du zuletzt stärker reagiert hast, als es „nötig“ war.",
          "Schreib auf: Was war der Auslöser? Was hast du gefühlt, gedacht, getan?",
          "Frage dich: „Wie alt fühle ich mich in diesem Moment wirklich?“",
          "Fasse das Muster in einem Satz. Was einmal benannt ist, läuft nicht mehr ganz unbemerkt.",
        ],
      },
    ],
    reflection: [
      "Welche Reaktion von dir wiederholt sich, obwohl du sie längst nicht mehr willst?",
      "An welchen Stellen deines Alltags läufst du am meisten im Autopilot?",
      "Was in dir ahnt schon, dass mehr möglich ist?",
    ],
    affirmation:
      "Ich bin nicht mein Autopilot. Ich kann bemerken, was in mir abläuft – und das verändert alles.",
    video: null,
  },

  // 02 – Erwachen
  {
    number: "02",
    keyIdea:
      "Du bist nicht deine Gedanken. Du bist der Raum, in dem sie erscheinen.",
    intro:
      "Sobald du den Autopiloten bemerkst, geschieht etwas Neues: Du erwachst. Du erkennst, dass da jemand ist, der deine Gedanken wahrnimmt – und dass du nicht deine Gedanken bist, sondern derjenige, der sie bemerkt. In diesem winzigen Abstand liegt der Beginn deiner Freiheit.",
    sections: [
      {
        heading: "Der Moment, in dem alles beginnt",
        body: "Erwachen ist kein spektakuläres Ereignis. Es ist ein leises Erkennen: „Oh – ich denke gerade.“ Genau dieses Erkennen kann kein Gedanke sein, denn es sieht dem Denken zu. Damit ist der erste bewusste Schritt getan: Du hast dich zum ersten Mal von deinen Gedanken unterschieden.",
      },
      {
        heading: "Warum wir uns mit dem Denken verwechseln",
        body: "Von klein auf haben wir gelernt, jeden Gedanken für bare Münze zu nehmen. Niemand hat uns gezeigt, dass Gedanken nur Angebote sind – Vorschläge, die kommen und gehen. Dieses lebenslange Übersehen ist der Grund, warum sich alte Muster so echt und so zwingend anfühlen.",
      },
      {
        heading: "Erwachen ist kein Ziel, sondern ein Erinnern",
        body: "Du musst nichts Neues werden. Das Bewusstsein, das jetzt diese Worte liest, war immer schon da – hinter jedem Gedanken, in jedem Alter deines Lebens. Auf dieser Stufe geht es nur darum, dich immer öfter daran zu erinnern, wer da eigentlich wahrnimmt.",
      },
      {
        heading: "Metakognition – Denken über das Denken",
        body: "Die Fähigkeit, den eigenen Gedanken zuzusehen, hat auch einen nüchternen Namen: Metakognition, das Denken über das Denken. Sie ist keine spirituelle Sonderbegabung, sondern eine trainierbare Funktion deines Gehirns. Jedes Mal, wenn du bemerkst „ich denke gerade“, aktivierst du genau diesen Beobachter-Modus – und je öfter du das tust, desto selbstverständlicher wird er.",
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

  // 03 – Selbstbeobachtung
  {
    number: "03",
    keyIdea:
      "Was du ruhig beobachten kannst, bestimmt dich nicht mehr blind.",
    intro:
      "Nach dem Erwachen beginnt die eigentliche Übung: das ruhige Zusehen. Du lernst, deinen Gedanken und Reaktionen zuzusehen, ohne dich sofort mit ihnen zu identifizieren – und dabei die Muster zu erkennen, die dich bisher gesteuert haben. Der innere Beobachter urteilt nicht, kämpft nicht und will nichts wegdrücken. Er schaut nur. Und genau dieses Schauen verändert alles.",
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
        heading: "Kognitive Defusion – Abstand statt Kampf",
        body: "In der modernen Psychologie heißt das, was du hier übst, kognitive Defusion: die Verschmelzung mit einem Gedanken lösen, ohne ihn zu bekämpfen. Statt „Ich bin ein Versager“ übst du „Ich bemerke den Gedanken, dass ich ein Versager sei“. Diese kleine sprachliche Verschiebung schafft sofort Distanz – der Gedanke wird zu einem Objekt in deinem Bewusstsein, nicht zur Brille, durch die du schaust.",
      },
      {
        heading: "Muster werden sichtbar",
        body: "Aus der Beobachterposition heraus erkennst du mehr als einzelne Gedanken – du siehst die Muster dahinter: wiederkehrende Reaktionen, Glaubenssätze, alte Prägungen. Was du klar benennen kannst, verliert seinen unbewussten Griff. Bewusstheit entzieht dem Automatismus den Boden.",
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
        title: "Der Muster-Spürsinn",
        duration: "15 Minuten, schriftlich",
        steps: [
          "Denk an eine Situation, in der du zuletzt stärker reagiert hast, als es nötig war.",
          "Schreib auf: Auslöser, Gefühl, Gedanke, Handlung.",
          "Frage: An welche frühere Situation erinnert dich das? Woher könnte das Muster stammen?",
          "Halte fest, wie das Muster heißt – so erkennst du es beim nächsten Mal früher.",
        ],
      },
    ],
    reflection: [
      "In welchen Situationen reißen dich deine Gedanken am schnellsten mit?",
      "Welches Muster erkennst du gerade zum ersten Mal klar bei dir?",
      "Wie fühlt es sich an, am Ufer zu sitzen – statt mitzuschwimmen?",
    ],
    affirmation:
      "Ich sehe meinen Gedanken und Mustern ruhig zu. Ich muss ihnen nicht folgen.",
    video: null,
  },

  // 04 – Emotionale Reifung
  {
    number: "04",
    keyIdea:
      "Emotionale Reife heißt: fühlen, was ist – und loslassen, was war.",
    intro:
      "Erkennen allein reicht oft nicht – manche Muster sitzen in festgehaltenen Gefühlen und im Körper. Auf dieser Stufe reifst du emotional: Du lernst, schwierige Gefühle zu halten statt wegzudrücken, alte Geschichten abzuschließen und Verantwortung für dein Inneres zu übernehmen. Wo etwas losgelassen wird, entsteht Raum – für Ruhe, für Energie, für dich.",
    sections: [
      {
        heading: "Was wir festhalten, hält uns fest",
        body: "Nicht gefühlte Gefühle verschwinden nicht – sie warten. Sie binden Energie, färben deine Stimmung und melden sich in den unpassendsten Momenten. Emotionale Reifung beginnt paradoxerweise damit, das Gefühl endlich zuzulassen, statt es weiter wegzudrücken.",
      },
      {
        heading: "Fühlen statt analysieren",
        body: "Der Verstand liebt es, Gefühle zu erklären, statt sie zu fühlen. Doch ein Gefühl löst sich nicht durch Analyse, sondern durch bewusste Anwesenheit. Wenn du einer Emotion Raum gibst – im Körper, ohne Geschichte drumherum – darf sie durch dich hindurchziehen und gehen.",
      },
      {
        heading: "Die Geschichte beenden",
        body: "Oft halten wir nicht am Gefühl fest, sondern an der Geschichte: „Er hat mir das angetan.“ „So bin ich eben.“ Reifung heißt auch, eine Geschichte zu Ende zu erzählen – nicht um zu vergessen, sondern um nicht mehr aus der alten Wunde heraus zu leben, sondern Verantwortung für das Heute zu übernehmen.",
      },
      {
        heading: "Die Welle reiten – warum Fühlen entlädt",
        body: "Jedes Gefühl hat einen Verlauf: Es steigt, erreicht einen Höhepunkt und ebbt wieder ab, meist schneller als befürchtet. Wer lernt, den Höhepunkt auszuhalten, statt sofort zu handeln oder wegzudrücken, merkt: Die Welle trägt einen, sie verschlingt einen nicht. Aushalten ist eine aktive, kraftvolle Fähigkeit.",
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

  // 05 – Schöpferkraft
  {
    number: "05",
    keyIdea:
      "Du bist nicht nur Beobachter deines Lebens – du bist sein Gestalter.",
    intro:
      "Wo Altes gegangen ist, entsteht Raum für Neues. Jetzt wirst du vom Beobachter zum bewussten Gestalter: Du wählst nicht länger nur die Gedanken, die dir zufällig einfallen, sondern jene, die dich stärken – und setzt sie in Handlung um. Denn innere Ausrichtung entfaltet ihre Kraft erst im Tun.",
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
        heading: "Ausrichtung wird erst durch Handlung wirksam",
        body: "Ein stärkender Gedanke bleibt Theorie, bis er in eine Handlung mündet. Schöpferkraft ist kein reines Wünschen – sie ist das Zusammenspiel von innerer Ausrichtung und konkretem Tun. Erst wenn beides zusammenkommt, verändert sich deine gelebte Realität.",
      },
      {
        heading: "Selbstbild und Wiederholung – woran dein System glaubt",
        body: "Dein Verhalten folgt selten deinen guten Vorsätzen, sondern deinem inneren Selbstbild – dem, was du tief für wahr über dich hältst. Genau dieses Bild formst du hier neu: nicht durch einmalige Einsicht, sondern durch wiederholte Gedanken, die mit Gefühl verankert werden. Was du oft genug denkst und fühlst, wird zu deiner neuen Normalität – und dein Handeln zieht wie von selbst nach.",
      },
    ],
    exercises: [
      {
        title: "Den Satz umschreiben",
        duration: "15 Minuten, schriftlich",
        steps: [
          "Nimm einen einengenden Glaubenssatz, den du in den letzten Stufen erkannt hast.",
          "Formuliere eine neue, ehrliche Version – glaubwürdig, in der Gegenwart, in deinen Worten.",
          "Prüfe: Fühlt sich der neue Satz erreichbar an? Wenn nicht, mach ihn eine Stufe realistischer.",
          "Schreib ihn auf, platziere ihn sichtbar – und wähle eine kleine Handlung, die zu ihm passt.",
        ],
      },
      {
        title: "Morgen-Ausrichtung",
        duration: "3 Minuten, täglich",
        steps: [
          "Nimm dir direkt nach dem Aufwachen einen Moment, bevor der Autopilot startet.",
          "Wähle bewusst einen Gedanken oder eine Absicht für den Tag.",
          "Spür kurz nach, wie es sich anfühlt, aus diesem Gedanken heraus in den Tag zu gehen.",
          "Lege eine konkrete kleine Handlung fest, die diese Ausrichtung heute sichtbar macht.",
        ],
      },
    ],
    reflection: [
      "Welchen Gedanken würdest du gerne öfter denken – und was hält dich bisher davon ab?",
      "Wie würdest du über dich sprechen, wenn du dein bester Freund wärst?",
      "Welche neue innere Grundhaltung möchtest du in den nächsten Wochen verankern?",
    ],
    affirmation: "Ich wähle meine Gedanken bewusst. Was ich nähre, wächst.",
    video: null,
  },

  // 06 – Innere Ausrichtung
  {
    number: "06",
    keyIdea:
      "Wenn Kopf, Herz und Handeln an einem Strang ziehen, entsteht echte Kraft.",
    intro:
      "Wissen allein verändert wenig – erst wenn Denken, Fühlen und Tun in dieselbe Richtung zeigen, wirst du wirklich frei und wirksam. Auf dieser Stufe geht es um innere Ausrichtung: die Stimmigkeit, aus der Präsenz, Ausstrahlung und ruhige Kraft entstehen.",
    sections: [
      {
        heading: "Der stille Widerspruch",
        body: "Viele Menschen denken das eine, fühlen das andere und tun ein drittes. Dieser innere Widerspruch kostet enorm viel Energie – meist unbemerkt. Innere Ausrichtung bedeutet, diese Spaltung zu schließen: Was du denkst, fühlst und tust, gehört wieder zusammen.",
      },
      {
        heading: "Das Herz als Kompass",
        body: "Der Kopf ist ein brillanter Diener, aber ein schlechter Meister. Auf dieser Stufe lernst du, dein Fühlen als Kompass ernst zu nehmen – nicht als Launen, sondern als leise, ehrliche Rückmeldung. Wenn Kopf und Herz sich einig sind, wird Handeln müheloser.",
      },
      {
        heading: "Integrität als Kraftquelle",
        body: "Jedes Mal, wenn dein Handeln deinen Werten entspricht, gewinnst du Vertrauen zu dir selbst. Diese Selbst-Übereinstimmung ist die Wurzel echter Ausstrahlung. Menschen spüren, ob du stimmig bist – lange bevor du ein Wort sagst.",
      },
      {
        heading: "Kohärenz – wenn die Systeme zusammenspielen",
        body: "Kohärenz ist mehr als ein gutes Gefühl – sie ist ein Zustand, in dem Kopf, Herz und Nervensystem im selben Takt schwingen. In ihm denkst du klarer, entscheidest ruhiger und wirkst auf andere stimmiger. Er entsteht nicht durch Anstrengung, sondern durch Ausrichtung: Wenn Denken, Fühlen und Handeln in dieselbe Richtung zeigen, hört der innere Widerstand auf, deine Energie zu fressen.",
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
      {
        heading: "Von der Praxis zur Haltung",
        body: "Am Anfang ist jede dieser Fähigkeiten eine bewusste Technik – innehalten, beobachten, wählen. Mit genügend Wiederholung wird aus der Technik eine Haltung, die von selbst greift, auch ohne dass du daran denkst. Das ist Meisterschaft im eigentlichen Sinn: kein Zustand ohne Sturm, sondern ein Zuhause, in das du immer schneller zurückfindest.",
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
