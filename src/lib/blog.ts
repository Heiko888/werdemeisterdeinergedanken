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
    slug: "wie-gedanken-koerper-und-gesundheit-formen",
    title: "Wie Gedanken deinen Körper und deine Gesundheit formen",
    excerpt:
      "Vom Placebo-Effekt bis zur Neuroplastizität: Wie deine Denkmuster ganz konkret auf Körper, Verhalten und Wohlbefinden wirken – und wie du das für dich nutzt.",
    category: "Bewusstsein",
    date: "2026-07-27",
    dateLabel: "27. Juli 2026",
    readingMinutes: 7,
    content: [
      {
        type: "p",
        text: "Dass Gedanken „irgendwie“ wirken, spürt jeder. Doch der Einfluss unseres Denkens auf Verhalten und Gesundheit ist kein vages Gefühl, sondern lässt sich über konkrete psychologische und körperliche Mechanismen erklären. Wer diese kennt, versteht, warum die eigene innere Haltung so viel Gewicht hat.",
      },
      {
        type: "h2",
        text: "Psychosomatische Effekte",
      },
      {
        type: "p",
        text: "Gedanken und Emotionen können echte körperliche Symptome auslösen. Anhaltender Stress oder Angst führen zu Kopfschmerzen, Magenproblemen oder erhöhtem Blutdruck – vermittelt über Stresshormone wie Adrenalin und Cortisol. Der Körper reagiert nicht auf die Situation selbst, sondern auf ihre gedankliche Bewertung.",
      },
      {
        type: "h2",
        text: "Der Placebo-Effekt",
      },
      {
        type: "p",
        text: "Positive Erwartungen können Heilungsprozesse anstoßen. Ist ein Mensch überzeugt, dass eine Behandlung wirkt, verbessert sich sein Zustand oft tatsächlich – selbst wenn kein pharmakologisch wirksamer Stoff im Spiel ist. Die Überzeugung allein setzt körperliche Prozesse in Gang.",
      },
      {
        type: "quote",
        text: "Der Körper reagiert nicht auf das, was passiert, sondern auf das, was du darüber denkst.",
      },
      {
        type: "h2",
        text: "Gedanken steuern Verhalten",
      },
      {
        type: "p",
        text: "Wie wir denken, prägt, wie wir handeln. Eine zuversichtliche Grundhaltung führt eher zu gesunden Gewohnheiten – Bewegung, gute Ernährung, Verzicht auf Schädliches. Negative, pessimistische Denkmuster begünstigen das Gegenteil und erhöhen langfristig das Krankheitsrisiko.",
      },
      {
        type: "h2",
        text: "Kognitive Verzerrungen",
      },
      {
        type: "p",
        text: "Unser Denken verzerrt die Wirklichkeit oft, ohne dass wir es merken. Schwarz-Weiß-Denken, Katastrophisieren oder Übergeneralisieren malen die Lage düsterer, als sie ist – und verstärken so negative Gefühle und stressbedingte Beschwerden. Diese Muster zu erkennen, ist bereits der erste Schritt, sie zu entkräften.",
      },
      {
        type: "h2",
        text: "Neuroplastizität: Das Gehirn verändert sich",
      },
      {
        type: "p",
        text: "Unser Gehirn ist formbar. Es passt sich an Erfahrungen und wiederkehrende Gedanken an. Achtsamkeit und Meditation stärken neuronale Verbindungen, die mit Wohlbefinden und Widerstandskraft zusammenhängen – während ständiges Grübeln schädliche Muster festigt. Du trainierst mit jedem Gedanken, ob du willst oder nicht.",
      },
      {
        type: "h2",
        text: "Selbstwirksamkeit",
      },
      {
        type: "p",
        text: "Der Glaube, Herausforderungen aus eigener Kraft meistern zu können, wirkt sich messbar auf Verhalten und psychische Gesundheit aus. Wer sich etwas zutraut, handelt aktiver und lösungsorientierter – und erzielt damit oft die besseren gesundheitlichen und sozialen Ergebnisse.",
      },
      {
        type: "h2",
        text: "Was du daraus mitnehmen kannst",
      },
      {
        type: "ul",
        items: [
          "Beobachte deine Gedanken, bevor du sie glaubst – vor allem in Stressmomenten.",
          "Achte auf typische Verzerrungen wie Katastrophisieren und stelle sie infrage.",
          "Nutze Achtsamkeit oder Meditation, um förderliche neuronale Muster zu stärken.",
          "Erinnere dich an frühere Situationen, die du gemeistert hast – das nährt deine Selbstwirksamkeit.",
        ],
      },
      {
        type: "p",
        text: "All diese Mechanismen zeigen dasselbe: Deine Gedanken wirken tief in Körper und Psyche hinein. Das ist keine Esoterik, sondern Physiologie. Und es ist eine gute Nachricht – denn wer sein Denken bewusst gestaltet, gestaltet damit auch sein Wohlbefinden.",
      },
    ],
  },
  {
    slug: "wie-frei-ist-unser-geist",
    title: "Wie frei ist unser Geist?",
    excerpt:
      "Bis zu 60.000 Gedanken am Tag – doch wie viele davon sind wirklich deine? Über Gedankenkontrolle, äußere Einflüsse und den Weg zurück zur mentalen Freiheit.",
    category: "Bewusstsein",
    date: "2026-07-27",
    dateLabel: "27. Juli 2026",
    readingMinutes: 6,
    content: [
      {
        type: "p",
        text: "Der menschliche Geist ist faszinierend: Er erzeugt unaufhörlich Gedanken, reflektiert, plant und analysiert. Doch in einer Welt voller Einflüsse – von sozialen Medien bis zu subtilen gesellschaftlichen Normen – stellt sich eine Frage: Wie viel Kontrolle haben wir wirklich über unsere Gedanken? Und was bedeutet Gedankenkontrolle überhaupt?",
      },
      {
        type: "h2",
        text: "Die unaufhörliche innere Stimme",
      },
      {
        type: "p",
        text: "Wir denken bis zu 60.000 Gedanken pro Tag – und viele davon laufen unbewusst und automatisiert ab. Sie entspringen Erinnerungen, Emotionen und Eindrücken, die wir über die Jahre gesammelt haben. Oft wiederholen sich dieselben Muster, besonders die negativen. Diese „mentale Endlosschleife“ kann uns in Zweifel und Stress gefangen halten, ohne dass wir es überhaupt bemerken.",
      },
      {
        type: "h2",
        text: "Zwei Gesichter der Gedankenkontrolle",
      },
      {
        type: "p",
        text: "Der Begriff hat zwei sehr unterschiedliche Bedeutungen. Das eine ist die Selbstkontrolle: die Fähigkeit, den eigenen Geist bewusst zu steuern, störende Gedanken zu entkräften und klarere Denkmuster zu fördern – der Kern jeder Achtsamkeitspraxis. Das andere ist die Manipulation von außen: die gezielte Beeinflussung deiner Gedanken durch andere, sei es durch Werbung, Propaganda oder psychologische Techniken.",
      },
      {
        type: "quote",
        text: "Selbstkontrolle ist ein Ausdruck von Freiheit. Manipulation zielt darauf ab, genau diese Freiheit einzuschränken.",
      },
      {
        type: "h2",
        text: "Wie äußere Faktoren dein Denken lenken",
      },
      {
        type: "p",
        text: "Werbung und Medien setzen uns täglich hunderten Botschaften aus, die unsere Kaufentscheidungen, Werte und sogar die Selbstwahrnehmung formen. Emotionale Ansprache oder künstlich erzeugter Mangel lenken die Gedanken in gewünschte Bahnen. Soziale Medien verstärken das: Algorithmen wissen, welche Inhalte uns fesseln, und zeigen gezielt das, was Aufmerksamkeit bindet – so entstehen Filterblasen, die unsere Sicht verengen.",
      },
      {
        type: "p",
        text: "Dazu kommt der Gruppendruck. Unser Bedürfnis nach Zugehörigkeit macht uns empfänglich für die Denkweisen unseres Umfelds. Oft übernehmen wir Meinungen und Verhaltensweisen, ohne sie je kritisch zu hinterfragen.",
      },
      {
        type: "h2",
        text: "Vier Wege zu mehr mentaler Freiheit",
      },
      {
        type: "ul",
        items: [
          "Achtsamkeit üben: Regelmäßige Meditation beruhigt den Geist und lässt dich Gedanken beobachten, ohne dich von ihnen mitreißen zu lassen.",
          "Informationsdiät: Schränke den Konsum von Nachrichten und sozialen Medien bewusst ein – das schützt vor unbemerkter Beeinflussung.",
          "Kritisch denken: Frag dich, woher eine Information stammt und welche Absicht dahinterstehen könnte.",
          "Positive Gewohnheiten: Richte den Fokus auf Dankbarkeit, lösungsorientiertes Denken und deine eigenen Ziele.",
        ],
      },
      {
        type: "p",
        text: "Unsere Gedanken formen unsere Realität – doch wir sind nicht immer ihre alleinigen Architekten. Die Balance zwischen bewusster Selbstkontrolle und der Abwehr äußerer Einflüsse entscheidet über ein freies, erfülltes Leben. Wer versteht, wie Gedanken entstehen und gelenkt werden, gewinnt ein Stück Kontrolle zurück – und damit seine geistige Freiheit. Frag dich einmal ganz bewusst: Welche deiner Gedanken sind wirklich deine eigenen?",
      },
    ],
  },
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
  {
    slug: "framing-wie-ein-wort-deine-meinung-macht",
    title: "Framing: Wie ein einziges Wort deine Meinung macht",
    excerpt:
      "Investition oder Ausgabe, Reform oder Kürzung – dieselbe Wirklichkeit, zwei Gefühle. Wie sprachliche Rahmen dein Urteil lenken, bevor du überhaupt nachdenkst.",
    category: "Mentale Selbstverteidigung",
    date: "2026-07-28",
    dateLabel: "28. Juli 2026",
    readingMinutes: 6,
    content: [
      {
        type: "p",
        text: "Du glaubst, du reagierst auf Fakten. In Wirklichkeit reagierst du häufig zuerst auf den Rahmen, in dem dir diese Fakten präsentiert werden. Ein Frame – ein gedanklicher Deutungsrahmen – bestimmt, aus welcher Perspektive du ein Thema siehst. Und das Erstaunliche daran: Die verwendeten Informationen müssen dafür nicht einmal falsch sein.",
      },
      {
        type: "h2",
        text: "Der Rahmen liefert die Bewertung gleich mit",
      },
      {
        type: "p",
        text: "„Der Staat investiert zehn Milliarden Euro“ und „Der Staat gibt weitere zehn Milliarden aus“ beschreiben dieselbe Zahl. Doch „investiert“ klingt nach Zukunft und Nutzen, „gibt aus“ nach Kosten und Verschwendung. Die Zahl bleibt gleich, der gedankliche Rahmen verändert alles. Genauso bei Menschen: Ob jemand „Experte“, „Kritiker“ oder „Leugner“ genannt wird, entscheidet über dein Urteil, bevor du ein einziges Argument gehört hast.",
      },
      {
        type: "quote",
        text: "Ein Wort kann aus einer Kürzung eine Reform und aus Kontrolle plötzlich Schutz machen.",
      },
      {
        type: "h2",
        text: "Framing steckt schon in der Frage",
      },
      {
        type: "p",
        text: "„Warum weigert sich Person X, Verantwortung zu übernehmen?“ – diese Frage enthält das Urteil bereits. Sie setzt voraus, dass die Person sich weigert. Die offenere Variante wäre: „Wie begründet Person X ihre Entscheidung?“ Der erste Satz liefert die Bewertung mit, der zweite lässt sie offen. Achte darauf, wie oft dir eine Meinung schon in der Fragestellung untergeschoben wird.",
      },
      {
        type: "h2",
        text: "Auch Weglassen ist ein Rahmen",
      },
      {
        type: "p",
        text: "Fehlt die Vorgeschichte, fehlen Gegenargumente, steht eine Zahl ohne Vergleich da oder wird ein Einzelfall verallgemeinert – schon erscheint ein Thema in einem bestimmten Licht. Das ist nicht immer Absicht; jede Kommunikation braucht einen Rahmen, niemand kann alles zeigen. Problematisch wird es dort, wo ein Rahmen als einzige mögliche Wahrheit auftritt und jede andere Sicht moralisch abwertet.",
      },
      {
        type: "h2",
        text: "So erkennst du einen Frame",
      },
      {
        type: "ul",
        items: [
          "Welche Wörter enthalten bereits eine Bewertung? Welche Emotion soll bei mir entstehen?",
          "Welche Annahme wird als selbstverständlich vorausgesetzt? Welche Information fehlt?",
          "Wie würde die Gegenseite denselben Vorgang beschreiben?",
          "Und die schärfste Frage: Wer profitiert von genau diesem Deutungsrahmen?",
        ],
      },
      {
        type: "p",
        text: "Framing bedeutet nicht, dass alles gelogen ist. Es bedeutet, dass jede Botschaft eine Brille mitliefert. Gedankenfreiheit beginnt nicht damit, zu allem eine Gegenmeinung zu haben – sondern damit, den Rahmen zu erkennen, bevor du die Bewertung darin übernimmst. Im Mitgliederbereich findest du dazu die ausführliche Vertiefung „Framing“ mit Übungen; einen kompakten Überblick über alle diese Mechanismen gibt das kostenlose E-Book „Die Gedanken, die nicht deine sind“.",
      },
    ],
  },
  {
    slug: "filterblase-warum-dein-feed-nicht-die-welt-ist",
    title: "Die Filterblase: Warum dein Feed nicht die Welt ist",
    excerpt:
      "Online siehst du keine Wirklichkeit, sondern eine Auswahl, die auf deinem Verhalten beruht. Wie Algorithmen dein Weltbild formen – und wie du gegensteuerst.",
    category: "Mentale Selbstverteidigung",
    date: "2026-07-28",
    dateLabel: "28. Juli 2026",
    readingMinutes: 6,
    content: [
      {
        type: "p",
        text: "Was du online siehst, ist kein Abbild der Welt. Es ist eine Auswahl, berechnet aus dem, worauf du bisher reagiert hast. Und das Ziel dahinter ist nicht Wahrheit, sondern Aufmerksamkeit – denn Aufmerksamkeit ist das Geschäftsmodell.",
      },
      {
        type: "h2",
        text: "Du bekommst mehr von dem, worauf du reagierst",
      },
      {
        type: "p",
        text: "Jeder Klick, jedes Verweilen ist ein Signal: „Davon will ich mehr.“ Der Algorithmus liefert prompt – und verstärkt so, was ohnehin schon da war. Deine Meinung wird dir immer öfter bestätigt, selten herausgefordert. So entsteht eine Filterblase, in der die eigene Sicht wie der gesunde Menschenverstand wirkt, weil alles andere ausgeblendet ist.",
      },
      {
        type: "quote",
        text: "Dein Feed ist ein Spiegel deines Verhaltens, kein Fenster zur Welt.",
      },
      {
        type: "h2",
        text: "Warum Empörung nach oben gespült wird",
      },
      {
        type: "p",
        text: "Inhalte, die starke Gefühle auslösen – vor allem Empörung und Angst –, werden häufiger geteilt und kommentiert. Also werden genau sie weiter verbreitet. Das Ruhige, Abwägende verschwindet, das Zugespitzte und Extreme wird sichtbar. Nicht weil es wahrer wäre, sondern weil es besser „performt“.",
      },
      {
        type: "h2",
        text: "Der Verlust der gemeinsamen Wirklichkeit",
      },
      {
        type: "p",
        text: "Wenn jeder eine andere, auf ihn zugeschnittene Auswahl sieht, zerfällt die gemeinsame Grundlage, über die man überhaupt streiten könnte. Zwei Menschen halten sich für gut informiert und leben doch in verschiedenen Welten. Das erklärt viel von der Härte heutiger Debatten – man streitet nicht nur über Meinungen, sondern über verschiedene Realitäten.",
      },
      {
        type: "h2",
        text: "So durchlöcherst du die Blase",
      },
      {
        type: "ul",
        items: [
          "Folge bewusst ein, zwei seriösen Stimmen, die anderer Meinung sind als du.",
          "Klicke eine Woche lang nicht auf das, was dich nur empört.",
          "Suche aktiv die ruhigste, sachlichste Darstellung eines Streitthemas.",
          "Frag dich bei jedem Beitrag: Warum sehe ich das gerade – und was sehe ich nicht?",
        ],
      },
      {
        type: "p",
        text: "Die Filterblase ist kein Grund für Technikangst, sondern für bewussten Umgang. Behandle deinen Feed als das, was er ist: eine Auswahl. Die vollständige Vertiefung „Algorithmen & Filterblasen“ mit Übungen findest du im Mitgliederbereich – Teil des Themenblocks „Wie dein Denken gelenkt wird“.",
      },
    ],
  },
  {
    slug: "warum-oft-gehoert-sich-wie-wahr-anfuehlt",
    title: "Warum sich „oft gehört“ wie „wahr“ anfühlt",
    excerpt:
      "Der Wiederholungseffekt: Je öfter du eine Aussage hörst, desto wahrer erscheint sie – ganz ohne Beweis. Wie das funktioniert und wie du dich davor schützt.",
    category: "Mentale Selbstverteidigung",
    date: "2026-07-28",
    dateLabel: "28. Juli 2026",
    readingMinutes: 5,
    content: [
      {
        type: "p",
        text: "Es gibt einen gut belegten Effekt in der Psychologie: Je öfter wir eine Aussage hören, desto wahrer erscheint sie uns – unabhängig davon, ob sie stimmt. Das Gehirn nimmt eine Abkürzung und verwechselt „kommt mir bekannt vor“ mit „ist wahr“.",
      },
      {
        type: "h2",
        text: "Vertrautheit fühlt sich an wie Wahrheit",
      },
      {
        type: "p",
        text: "Beim ersten Hören sind wir skeptisch. Beim zehnten Mal fühlt sich dieselbe Aussage flüssig und vertraut an – und diese Flüssigkeit interpretiert das Gehirn als Wahrheit. Es braucht keine neuen Belege, nur Wiederholung. Genau deshalb wirken eingängige Slogans stärker als komplizierte, aber korrekte Erklärungen.",
      },
      {
        type: "quote",
        text: "Vertrautheit ist kein Beweis. Was oft wiederholt wird, verdient dieselbe Prüfung wie beim ersten Mal.",
      },
      {
        type: "h2",
        text: "Der scheinbare Konsens",
      },
      {
        type: "p",
        text: "Wenn viele dasselbe sagen, halten wir es für wahr – auch wenn alle es nur voneinander abgeschrieben haben. Eine einzige Quelle, oft genug zitiert, kann aussehen wie breite Übereinstimmung. Die entscheidende Frage lautet deshalb nicht „Wie viele sagen es?“, sondern „Auf wie viele unabhängige Quellen geht es zurück?“",
      },
      {
        type: "h2",
        text: "Dein einfacher Schutz",
      },
      {
        type: "ul",
        items: [
          "Nimm eine Aussage, die du für selbstverständlich hältst – und frag: Kenne ich einen echten Beleg, oder habe ich das nur oft gehört?",
          "Suche die ursprüngliche Quelle, nicht weitere Wiederholungen.",
          "Zähle unabhängige Quellen, nicht laute Stimmen.",
          "Prüfe bei einem griffigen Slogan: Ist das ein Argument – oder nur eine hübsch verpackte Behauptung?",
        ],
      },
      {
        type: "p",
        text: "Wiederholung ist der älteste Trick der Beeinflussung – und einer der wirksamsten, gerade weil er ohne Lüge auskommt. Wer den Effekt kennt, misstraut der bloßen Vertrautheit. Mehr dazu in der Vertiefung „Wiederholung wird zur Wahrheit“ im Mitgliederbereich und im kostenlosen E-Book „Die Gedanken, die nicht deine sind“.",
      },
    ],
  },
  {
    slug: "reizueberflutung-warum-dein-gehirn-nicht-abschaltet",
    title: "Reizüberflutung: Warum dein Gehirn nicht mehr abschaltet",
    excerpt:
      "Nachrichten, Pushs, Dauer-Empörung: Wie ständige Reize dein Nervensystem in Alarm halten – und warum du in diesem Zustand schlechter denkst und leichter lenkbar bist.",
    category: "Mentale Selbstverteidigung",
    date: "2026-07-28",
    dateLabel: "28. Juli 2026",
    readingMinutes: 7,
    content: [
      {
        type: "p",
        text: "Geräusche, Nachrichten, Benachrichtigungen, Gespräche und die Gedanken im eigenen Kopf konkurrieren jeden Tag um deine Aufmerksamkeit. Das Problem ist nicht, dass dein Gehirn keine vielen Reize verarbeiten könnte. Es entsteht, wenn zu viele Reize gleichzeitig wichtig erscheinen, ständig wechseln und emotional aufgeladen sind. Dann bleibt dein System in Alarmbereitschaft.",
      },
      {
        type: "h2",
        text: "Zwei Stressreaktionen – die schnelle und die langsame",
      },
      {
        type: "p",
        text: "Bewertet dein Gehirn etwas als relevant, aktiviert es zuerst den schnellen Weg: Adrenalin und Noradrenalin machen dich in Sekunden wacher und reaktionsbereit. Hält die Belastung an, kommt die langsamere Stressachse dazu, an deren Ende Cortisol steht. Beides ist für sich gesund. Zum Problem wird eine Stressreaktion, die zu oft anspringt und nicht mehr richtig herunterfährt.",
      },
      {
        type: "quote",
        text: "Ein Gehirn im Daueralarm trifft andere Entscheidungen als ein reguliertes.",
      },
      {
        type: "h2",
        text: "Warum du im Alarm schlechter denkst",
      },
      {
        type: "p",
        text: "Unter starkem Stress arbeitet der präfrontale Cortex weniger effektiv – also genau der Teil, der für planvolles Denken, Impulskontrolle und Abwägen zuständig ist. Gleichzeitig gewinnen die schnellen, emotionalen Systeme an Einfluss. Das erklärt, warum du dann unkonzentriert, vergesslich und impulsiv bist. Und es hat eine unbequeme Folge: Ein Mensch in Daueralarm denkt enger, sucht schnelle Antworten und ist dadurch leichter über Angst und einfache Parolen erreichbar.",
      },
      {
        type: "h2",
        text: "Der Kreislauf – und der Ausweg",
      },
      {
        type: "p",
        text: "Digitale Reize sind meist unvorhersehbar, und die bloße Möglichkeit, dass gleich etwas Wichtiges kommt, lässt dich immer wieder zur selben Quelle zurückkehren, die dich zugleich belastet. So entsteht ein widersprüchlicher Kreislauf: Der Reiz stresst dich – und du suchst den nächsten Reiz zur Beruhigung. Der Ausweg ist kein weiterer Input, sondern Ruhe.",
      },
      {
        type: "ul",
        items: [
          "Zähle einmal, wie viele Reizquellen gerade gleichzeitig laufen – und schalte eine ab.",
          "Gönn dir bei Überforderung eine reizarme Pause: kein Bildschirm, keine neue Information.",
          "Atme ein paar Minuten mit längerem Ausatmen als Einatmen – das signalisiert dem Körper Sicherheit.",
          "Triff im Alarmzustand keine großen Entscheidungen. Warte, bis der Kopf klarer ist.",
        ],
      },
      {
        type: "p",
        text: "Ruhe ist keine Zeitverschwendung. Sie ist der Zustand, in dem dein präfrontaler Cortex wieder Kontrolle übernimmt und der Raum zwischen Reiz und Reaktion entsteht, in dem du frei bist. Du kannst deine Gedanken nicht meistern, solange dein System glaubt, auf alles reagieren zu müssen. Die vollständige Vertiefung „Reizüberflutung & Alarmbereitschaft“ findest du im Mitgliederbereich.",
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
