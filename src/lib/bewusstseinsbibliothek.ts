/**
 * Inhaltsdaten der Bewusstseinsbibliothek (Admin-Werkzeug unter
 * /admin/bewusstseinsbibliothek).
 *
 * Bewusst als typisierte Daten statt als fertiges HTML: So wird die Seite mit
 * den Projekt-Komponenten (Container, Card, Eyebrow …) im Website-Design
 * gerendert und ist durchsuch- und filterbar. Ursprung: das gleichnamige
 * Artifact (Stand 4. September 2026).
 */

export const BIBLIOTHEK_STAND = "Stand 4. September 2026";

/** Quellenkennzeichnung – trennt Forschung, Philosophie, Gesellschaft, Erfahrung, Literatur. */
export const QUELLEN = {
  W: {
    name: "Wissenschaftlich",
    desc: "empirische Forschung, Neurowissenschaft, Psychologie oder Kognitionswissenschaft.",
  },
  P: {
    name: "Philosophisch",
    desc: "begriffliche Argumentation über Bewusstsein, Selbst, Freiheit oder Wirklichkeit.",
  },
  G: {
    name: "Gesellschaftlich",
    desc: "Medien, Sprache, Macht, Kultur, Gruppendynamik und soziale Systeme.",
  },
  E: {
    name: "Erfahrungsorientiert",
    desc: "Meditation, Achtsamkeit, Kontemplation oder spirituelle Innenperspektive.",
  },
  L: {
    name: "Literatur",
    desc: "Romane und Erzählungen, durch die eine fremde Perspektive erlebt werden kann.",
  },
} as const;

export type QuellCode = keyof typeof QUELLEN;

export const QUELL_CODES = Object.keys(QUELLEN) as QuellCode[];

/** Aus einem Tag wie "W/P" oder "W, englisch" die enthaltenen Kürzel ziehen. */
export function codesOf(tag: string): QuellCode[] {
  return tag
    .split(/[/,]/)
    .map((s) => s.trim())
    .filter((s): s is QuellCode => (QUELL_CODES as string[]).includes(s));
}

export type Buch = { autor: string; titel: string; tag: string };

export type Thema = {
  n: string;
  titel: string;
  sub?: string;
  buecher: Buch[];
  felder: string[];
  kritisch?: string;
};

export type Roman = { autor: string; titel: string; thema: string };

export type ArteDoc = {
  titel: string;
  link: string;
  format?: string;
  laenge?: string;
  reihe?: string;
  verf?: string;
  teile?: string[];
  themen: string;
  ableitungen?: string[];
};

export type Taetigkeit = {
  n: string;
  titel: string;
  gruppen: { sub?: string; items: string[] }[];
};

export type ReservoirKategorie = {
  n: string;
  titel: string;
  start: number;
  items: string[];
};

export type Runde = { n: string; titel: string; items: string[]; ergebnis: string };

// ------------------------------------------------------------- Teil I

export const TAETIGKEITEN: Taetigkeit[] = [
  {
    n: "3",
    titel: "Wahrnehmung und Aufmerksamkeit",
    gruppen: [
      {
        sub: "3.1 Autopilot unterbrechen",
        items: [
          "Einen vollständigen Tagesablauf in einer anderen Reihenfolge gestalten.",
          "Einen anderen Weg zu einem vertrauten Ziel nehmen.",
          "An einem ungewohnten Platz essen, arbeiten oder sitzen.",
          "Eine alltägliche Tätigkeit mit der nicht dominanten Hand ausführen.",
          "Eine Mahlzeit schweigend und ohne Bildschirm zu sich nehmen.",
          "Eine bekannte Tätigkeit absichtlich sehr langsam ausführen.",
        ],
      },
      {
        sub: "3.2 Sinneswahrnehmung differenzieren",
        items: [
          "Einen Spaziergang ausschließlich auf Geräusche ausrichten.",
          "Einen zweiten Spaziergang auf Farben, Formen, Licht und Schatten ausrichten.",
          "Einen vertrauten Raum für fünf Minuten nur über Gerüche und Körperempfindungen wahrnehmen.",
          "Ein Lebensmittel mit geschlossenen Augen ertasten, riechen und schmecken.",
          "Eine Stunde ohne Musik, Podcast, Telefon und Gespräch verbringen.",
          "Einen bekannten Ort zu einer völlig ungewohnten Tageszeit besuchen.",
        ],
      },
      {
        sub: "3.3 Aufmerksamkeit zurückerobern",
        items: [
          "Einen halben oder ganzen Tag sämtliche Push-Benachrichtigungen abschalten.",
          "Das Smartphone für eine festgelegte Zeit außerhalb des eigenen Sichtfeldes aufbewahren.",
          "Einen Tag lang jeden automatischen Griff zum Smartphone um zehn Minuten verschieben.",
          "Einen vollständigen Text ohne parallele Tabs, Nachrichten oder Musik lesen.",
          "Einen Tag lang nur zu zwei vorher festgelegten Zeiten Nachrichten konsumieren.",
          "Einen analogen Gegenstand benutzen, wo sonst automatisch das Smartphone verwendet wird: Uhr, Notizbuch, Kamera, Karte oder Wecker.",
        ],
      },
    ],
  },
  {
    n: "4",
    titel: "Neue Perspektiven erleben",
    gruppen: [
      {
        sub: "4.1 Andere Lebenswelten",
        items: [
          "Eine öffentliche Veranstaltung besuchen, deren Publikum normalerweise nicht zum eigenen Umfeld gehört.",
          "Einen Menschen für einige Stunden bei seiner Arbeit begleiten.",
          "In einem sozialen Projekt, Tierheim, Hospiz oder einer Lebensmittelausgabe mithelfen.",
          "Eine religiöse oder kulturelle Veranstaltung als respektvoller Gast besuchen.",
          "Ein Gericht aus einer unbekannten Kultur gemeinsam mit Menschen aus dieser Kultur zubereiten.",
          "Eine Ausstellung, ein Theaterstück oder ein Konzert außerhalb des eigenen Geschmacks besuchen.",
        ],
      },
      {
        sub: "4.2 Andere Weltbilder",
        items: [
          "Ein ausführliches Gespräch mit einem Menschen führen, dessen Weltbild dem eigenen widerspricht – mit dem einzigen Ziel, seine innere Logik zu verstehen.",
          "Eine ernstzunehmende Gegenposition zur eigenen Überzeugung vollständig lesen oder ansehen.",
          "Dieselbe Nachricht bei mehreren Medien mit unterschiedlichen politischen und kulturellen Hintergründen vergleichen.",
          "Einen historischen Konflikt aus den Quellen mehrerer beteiligter Seiten betrachten.",
          "Einen Roman lesen, dessen Hauptfigur aus einer fremden sozialen, kulturellen oder körperlichen Lebenswirklichkeit stammt.",
        ],
      },
      {
        sub: "4.3 Anfängerbewusstsein",
        items: [
          "Etwas lernen, in dem man keinerlei Vorsprung besitzt: Tanzen, Zeichnen, Sprache, Instrument, Kochen, Handwerk oder Improvisation.",
          "Einen Kurs besuchen, ohne das Ergebnis veröffentlichen oder verwerten zu wollen.",
          "Sich von einem deutlich jüngeren oder älteren Menschen etwas beibringen lassen.",
          "Eine Tätigkeit ausprobieren, für die man sich bisher für „nicht talentiert“ hielt.",
          "Ein kleines Objekt herstellen, reparieren oder gestalten, statt es neu zu kaufen.",
        ],
      },
    ],
  },
  {
    n: "5",
    titel: "Handlungsspielraum erweitern",
    gruppen: [
      {
        sub: "5.1 Unsicherheit aushalten",
        items: [
          "Allein ein Café, Restaurant, Kino oder eine Veranstaltung besuchen.",
          "Eine fremde Person respektvoll ansprechen.",
          "In einer geeigneten Situation als Erste oder Erster eine ehrliche Meinung äußern.",
          "Eine Aufgabe beginnen, bevor man sich vollkommen vorbereitet fühlt.",
          "Einen kleinen Fehler sichtbar stehen lassen, wenn seine Korrektur nur dem Perfektionismus dienen würde.",
        ],
      },
      {
        sub: "5.2 Grenzen und Verantwortung",
        items: [
          "Eine unnötige Verpflichtung freundlich, aber eindeutig ablehnen.",
          "Eine Zusage einhalten, obwohl die ursprüngliche Motivation bereits verschwunden ist.",
          "Einen selbst verursachten Fehler ohne Rechtfertigung korrigieren.",
          "Eine Entscheidung treffen, die dem erkannten Wert entspricht, obwohl das alte Muster bequemer wäre.",
          "Eine offene Angelegenheit durch einen konkreten ersten Schritt in Bewegung bringen.",
        ],
      },
      {
        sub: "5.3 Schaffen statt konsumieren",
        items: [
          "Eine Seite schreiben, ein Bild gestalten, etwas bauen oder eine Mahlzeit entwickeln, ohne es zu veröffentlichen.",
          "Einen konsumfreien Abend gestalten.",
          "Aus einer gelesenen oder gesehenen Idee ein eigenes Experiment entwickeln.",
          "Einen Gedanken in eine konkrete Hilfe für einen anderen Menschen übersetzen.",
          "Eine Woche lang jeden Tag etwas Kleines erschaffen.",
        ],
      },
    ],
  },
  {
    n: "6",
    titel: "Stille, Natur und veränderte Umgebung",
    gruppen: [
      {
        items: [
          "Einen halben Tag schweigend verbringen.",
          "Allein und ohne Kopfhörer durch einen Wald gehen.",
          "Sonnenaufgang oder Sonnenuntergang ohne Kamera beobachten.",
          "Eine Nacht oder einen längeren Zeitraum sicher vorbereitet in der Natur verbringen.",
          "An einem seriös begleiteten Schweige- oder Meditationsretreat teilnehmen.",
          "Einen Ort bereisen, an dem Sprache, Alltag und soziale Regeln ungewohnt sind.",
          "Eine lokale Mikroreise unternehmen: einen unbekannten Ort in der eigenen Region wie ein Reisender erkunden.",
        ],
      },
    ],
  },
];

// ------------------------------------------------------------- Teil II

export const BIBLIOTHEK: Thema[] = [
  {
    n: "7",
    titel: "Wahrnehmung und Wirklichkeit",
    buecher: [
      { autor: "Donald D. Hoffman", titel: "Relativ real: Warum wir die Wirklichkeit nicht erfassen können und wie die Evolution unsere Wahrnehmung geformt hat", tag: "W/P" },
      { autor: "Alva Noë", titel: "Du bist nicht dein Gehirn: Eine radikale Philosophie des Bewusstseins", tag: "P/W" },
      { autor: "Humberto R. Maturana und Francisco J. Varela", titel: "Der Baum der Erkenntnis: Die biologischen Wurzeln menschlichen Erkennens", tag: "W/P" },
      { autor: "Anil Seth", titel: "Being You: A New Science of Consciousness", tag: "W, englisch" },
    ],
    felder: [
      "Wir sehen kein neutrales Abbild der Wirklichkeit.",
      "Wahrnehmung ist Auswahl, Vorhersage und Interpretation.",
      "Warum zwei Menschen dasselbe Ereignis unterschiedlich erleben.",
      "Das Gehirn ergänzt fehlende Informationen, ohne um Erlaubnis zu fragen.",
      "Gewissheit ist ein inneres Gefühl und noch kein Beweis.",
      "Wahrnehmung dient dem Überleben – nicht zwingend der objektiven Wahrheit.",
    ],
    kritisch:
      "Hoffmans These ist provokant und nicht mit einem wissenschaftlichen Konsens gleichzusetzen. Gerade deshalb eignet sie sich gut im Vergleich mit Noë, Seth und klassisch realistischen Positionen.",
  },
  {
    n: "8",
    titel: "Bewusstsein, Selbst und Ego",
    buecher: [
      { autor: "Thomas Metzinger", titel: "Der Ego-Tunnel: Eine neue Philosophie des Selbst", tag: "P/W" },
      { autor: "Antonio Damasio", titel: "Selbst ist der Mensch: Körper, Geist und die Entstehung des menschlichen Bewusstseins", tag: "W" },
      { autor: "Douglas Hofstadter", titel: "Ich bin eine seltsame Schleife", tag: "P/W" },
      { autor: "Siri Hustvedt", titel: "Die Illusion der Gewissheit", tag: "P/W" },
    ],
    felder: [
      "Existiert ein festes Ich – oder entsteht es fortwährend neu?",
      "Das Selbst als Modell, Geschichte und sozialer Prozess.",
      "Wer oder was bemerkt einen Gedanken?",
      "Warum wir unsere innere Erzählung mit unserer Identität verwechseln.",
      "Körper und Umwelt als Bestandteile des Bewusstseins.",
      "Was nach dem Wegfall einer Rolle vom Menschen übrig bleibt.",
    ],
  },
  {
    n: "9",
    titel: "Autopilot, Unterbewusstsein und Denkfehler",
    buecher: [
      { autor: "David Eagleman", titel: "Inkognito: Die geheimen Eigenleben unseres Gehirns", tag: "W" },
      { autor: "Daniel Kahneman", titel: "Schnelles Denken, langsames Denken", tag: "W" },
      { autor: "Leonard Mlodinow", titel: "Subliminal: Wie unser Unterbewusstsein unser Verhalten steuert", tag: "W" },
      { autor: "Stanislas Dehaene", titel: "Denken: Wie das Gehirn Bewusstsein schafft", tag: "W" },
      { autor: "Rolf Dobelli", titel: "Die Kunst des klaren Denkens", tag: "populärwissenschaftlich" },
    ],
    felder: [
      "Wie oft der Verstand Entscheidungen lediglich nachträglich erklärt.",
      "Warum mentale Abkürzungen gleichzeitig nützlich und gefährlich sind.",
      "Bestätigungsfehler, Verfügbarkeitsheuristik und Verlustangst.",
      "Wie Erwartungen beeinflussen, was überhaupt wahrgenommen wird.",
      "Warum Intelligenz nicht automatisch vor Selbsttäuschung schützt.",
      "Der Unterschied zwischen einem schnellen Impuls und einer bewussten Entscheidung.",
    ],
    kritisch:
      "Kahnemans Werk ist grundlegend, einzelne Befunde aus dem Umfeld der älteren Priming-Forschung wurden jedoch später nicht stabil repliziert. Nicht jede populäre Denkfehlerliste darf daher ungeprüft als Naturgesetz übernommen werden.",
  },
  {
    n: "10",
    titel: "Emotionen, Körper und Nervensystem",
    buecher: [
      { autor: "Lisa Feldman Barrett", titel: "Wie Gefühle entstehen: Eine neue Sicht auf unsere Emotionen", tag: "W" },
      { autor: "Antonio Damasio", titel: "Descartes' Irrtum: Fühlen, Denken und das menschliche Gehirn", tag: "W" },
      { autor: "Bessel van der Kolk", titel: "Verkörperter Schrecken", tag: "klinisch/wissenschaftlich" },
      { autor: "Gabor Maté und Daniel Maté", titel: "Der Mythos des Normalen", tag: "klinisch/gesellschaftlich" },
    ],
    felder: [
      "Gefühle sind nicht einfach das Gegenteil von Vernunft.",
      "Wie das Gehirn Körpersignalen Bedeutung gibt.",
      "Weshalb der Körper manchmal reagiert, bevor der Verstand eine Erklärung besitzt.",
      "Emotionale Begriffe erweitern den möglichen Umgang mit Empfindungen.",
      "Alarmbereitschaft, Stress und verengte Wahrnehmung.",
      "Warum „normal“ nicht automatisch gesund bedeutet.",
    ],
    kritisch:
      "Barretts Theorie der konstruierten Emotionen ist ein einflussreicher Forschungsansatz, aber nicht die einzige Emotionstheorie. Klinische und gesellschaftliche Deutungen von Maté sind ebenfalls nicht mit einem einheitlichen wissenschaftlichen Konsens gleichzusetzen.",
  },
  {
    n: "11",
    titel: "Freier Wille, Prägung und Verantwortung",
    sub: "Bewusst gegensätzliche Bücher",
    buecher: [
      { autor: "Peter Bieri", titel: "Das Handwerk der Freiheit: Über die Entdeckung des eigenen Willens", tag: "P" },
      { autor: "Christian List", titel: "Warum der freie Wille existiert", tag: "P" },
      { autor: "Robert M. Sapolsky", titel: "Determined: A Science of Life Without Free Will", tag: "W/P, englisch" },
      { autor: "Sam Harris", titel: "Free Will", tag: "P/W, englisch" },
    ],
    felder: [
      "Muss eine freie Entscheidung vollkommen ursachenlos sein?",
      "Wie Gene, Erfahrungen, Umgebung und momentaner Zustand Entscheidungen beeinflussen.",
      "Freiheit als wachsender Handlungsspielraum statt völliger Unabhängigkeit.",
      "Verantwortung ohne moralische Selbstverdammung.",
      "Der Unterschied zwischen Erklärung und Entschuldigung.",
      "Kann Bewusstheit eine Kausalkette unterbrechen oder zumindest verändern?",
    ],
  },
  {
    n: "12",
    titel: "Sprache, Begriffe und Framing",
    buecher: [
      { autor: "Elisabeth Wehling", titel: "Politisches Framing", tag: "G/W" },
      { autor: "George Lakoff und Elisabeth Wehling", titel: "Auf leisen Sohlen ins Gehirn", tag: "G/W" },
      { autor: "Victor Klemperer", titel: "LTI: Notizbuch eines Philologen", tag: "G" },
      { autor: "Marshall B. Rosenberg", titel: "Gewaltfreie Kommunikation", tag: "G/Praxis" },
    ],
    felder: [
      "Sprache beschreibt Wirklichkeit nicht nur, sondern ordnet sie.",
      "Wie Metaphern unsichtbare Schlussfolgerungen mitliefern.",
      "Warum das Wiederholen einer Verneinung den zugrunde liegenden Rahmen stärken kann.",
      "Etiketten verändern, was wir in einem Menschen sehen.",
      "Wie politische Begriffe Gefühle aktivieren.",
      "Der Unterschied zwischen Beobachtung, Bewertung und Unterstellung.",
    ],
    kritisch:
      "Framing ist real, seine Reichweite wird in populären Darstellungen aber teilweise überzogen. Wehlings konkrete Deutungen sollten als Perspektive und nicht als unbestrittene Letzterklärung behandelt werden.",
  },
  {
    n: "13",
    titel: "Gruppendruck, Gehorsam und soziale Prägung",
    buecher: [
      { autor: "Robert B. Cialdini", titel: "Die Psychologie des Überzeugens", tag: "W/G" },
      { autor: "Stanley Milgram", titel: "Das Milgram-Experiment", tag: "W/G" },
      { autor: "Erich Fromm", titel: "Die Furcht vor der Freiheit", tag: "P/G" },
      { autor: "Gustave Le Bon", titel: "Psychologie der Massen", tag: "historisch/G" },
      { autor: "Jonathan Haidt", titel: "The Righteous Mind", tag: "W/G, englisch" },
    ],
    felder: [
      "Weshalb Zugehörigkeit häufig stärker wirkt als ein sachliches Argument.",
      "Wie Autoritäten persönliche Verantwortung verschieben können.",
      "Warum Menschen ihre Wahrnehmung einer Gruppe anpassen.",
      "Moralische Intuition kommt oft vor der rationalen Begründung.",
      "Sympathie, Knappheit, Gegenseitigkeit und soziale Bewährtheit.",
      "Wann eine Gruppe klüger wird – und wann sie kollektiv irrt.",
    ],
  },
  {
    n: "14",
    titel: "Propaganda, Medien und digitale Steuerung",
    buecher: [
      { autor: "Edward Bernays", titel: "Propaganda: Die Kunst der Public Relations", tag: "G" },
      { autor: "Edward S. Herman und Noam Chomsky", titel: "Die Konsensfabrik", tag: "G" },
      { autor: "Eli Pariser", titel: "Filter Bubble: Wie wir im Internet entmündigt werden", tag: "G" },
      { autor: "Shoshana Zuboff", titel: "Das Zeitalter des Überwachungskapitalismus", tag: "G" },
      { autor: "Jaron Lanier", titel: "Zehn Gründe, warum du deine Social Media Accounts sofort löschen musst", tag: "G" },
      { autor: "Neil Postman", titel: "Wir amüsieren uns zu Tode", tag: "G" },
    ],
    felder: [
      "Wie Themen ausgewählt werden, bevor über sie diskutiert wird.",
      "Warum Reichweite nicht dasselbe wie gesellschaftliche Bedeutung ist.",
      "Algorithmen zeigen nicht die Welt, sondern eine berechnete Auswahl.",
      "Aufmerksamkeit als Geschäftsmodell.",
      "Empörung als Bindungsinstrument.",
      "Wie Wiederholung Vertrautheit und scheinbare Wahrheit erzeugt.",
      "Warum Beeinflussung keinen geheimen zentralen Steuerer benötigt.",
      "Der Unterschied zwischen Propaganda, Werbung, PR und Information.",
    ],
  },
  {
    n: "15",
    titel: "Kultur und die Illusion des Normalen",
    buecher: [
      { autor: "Joseph Henrich", titel: "Die seltsamsten Menschen der Welt", tag: "W/G" },
      { autor: "David Graeber und David Wengrow", titel: "Anfänge: Eine neue Geschichte der Menschheit", tag: "G" },
      { autor: "Hans Rosling, Ola Rosling und Anna Rosling Rönnlund", titel: "Factfulness", tag: "W/G" },
      { autor: "Rutger Bregman", titel: "Im Grunde gut", tag: "G" },
      { autor: "Yuval Noah Harari", titel: "Eine kurze Geschichte der Menschheit", tag: "G, große Synthese" },
    ],
    felder: [
      "Das eigene „Normal“ ist häufig nur das vertraute kulturelle Modell.",
      "Warum westliche Psychologie nicht automatisch die gesamte Menschheit beschreibt.",
      "Wie Institutionen Persönlichkeit und Denken mitformen.",
      "Was historische Alternativen über heutige Grenzen verraten.",
      "Warum negative Nachrichten unser Weltbild systematisch verzerren können.",
      "Menschenbilder verändern Politik, Erziehung und Zusammenarbeit.",
    ],
    kritisch:
      "Henrich, Graeber/Wengrow, Bregman und Harari erzählen große historische Zusammenhänge. Solche Synthesen sind erkenntnisreich, enthalten aber zwangsläufig Auswahl, Deutung und umstrittene Verallgemeinerungen.",
  },
  {
    n: "16",
    titel: "Systeme, Wechselwirkungen und Verbundenheit",
    buecher: [
      { autor: "Gregory Bateson", titel: "Ökologie des Geistes", tag: "P/W" },
      { autor: "Donella H. Meadows", titel: "Thinking in Systems", tag: "W/G, englisch" },
      { autor: "Fritjof Capra", titel: "Lebensnetz", tag: "W/P" },
      { autor: "Nassim Nicholas Taleb", titel: "Antifragilität", tag: "P/G" },
    ],
    felder: [
      "Warum lineares Ursache-Wirkungs-Denken häufig zu kurz greift.",
      "Rückkopplungen: Wenn die Reaktion ein Problem verstärkt.",
      "Kurzfristige Lösungen mit langfristigen Nebenwirkungen.",
      "Verhalten als Ergebnis von Person und System.",
      "Wie Beziehungen Eigenschaften hervorbringen, die kein Einzelteil besitzt.",
      "Kontrolle versus Anpassungsfähigkeit.",
    ],
  },
  {
    n: "17",
    titel: "Meditation, Kontemplation und innere Beobachtung",
    buecher: [
      { autor: "Jiddu Krishnamurti", titel: "Einbruch in die Freiheit", tag: "E/P" },
      { autor: "Jon Kabat-Zinn", titel: "Im Alltag Ruhe finden", tag: "E/W" },
      { autor: "Eckhart Tolle", titel: "Jetzt! Die Kraft der Gegenwart", tag: "E" },
      { autor: "Michael A. Singer", titel: "Die unbändige Seele", tag: "E" },
      { autor: "Thich Nhat Hanh", titel: "Das Wunder der Achtsamkeit", tag: "E" },
    ],
    felder: [
      "Der Unterschied zwischen einem Gedanken und dem Bemerken eines Gedankens.",
      "Beobachten ohne unmittelbares Eingreifen.",
      "Warum der Kampf gegen Gedanken sie verstärken kann.",
      "Präsenz als Fähigkeit, nicht als Dauerzustand.",
      "Stille als Kontakt mit der Wirklichkeit statt als Flucht.",
      "Meditation ohne spirituelle Überhöhung.",
    ],
    kritisch:
      "Erfahrungsberichte und spirituelle Modelle können wertvoll sein, sind aber keine neurowissenschaftlichen Beweise. Wo wissenschaftliche Aussagen gemacht werden, benötigen sie zusätzliche empirische Quellen.",
  },
  {
    n: "18",
    titel: "Tod, Verlust, Sinn und Endlichkeit",
    buecher: [
      { autor: "Viktor E. Frankl", titel: "… trotzdem Ja zum Leben sagen", tag: "P/Erfahrung" },
      { autor: "Irvin D. Yalom", titel: "In die Sonne schauen", tag: "P/klinisch" },
      { autor: "Ernest Becker", titel: "Die Verleugnung des Todes", tag: "P/G" },
      { autor: "Sheldon Solomon, Jeff Greenberg und Tom Pyszczynski", titel: "Der Wurm in unserem Herzen", tag: "W/G" },
      { autor: "Pema Chödrön", titel: "Wenn alles zusammenbricht", tag: "E" },
    ],
    felder: [
      "Wie Todesbewusstsein Prioritäten verändert.",
      "Warum Verlust die bisherige Identität erschüttern kann.",
      "Kontrolle als Antwort auf existenzielle Angst.",
      "Sinn wird nicht nur gefunden, sondern auch durch Handeln geschaffen.",
      "Trauer verändert Zeit, Körper und Wahrnehmung.",
      "Was Krisen sichtbar machen, das vorher bereits im Leben angelegt war.",
    ],
  },
];

export const ROMANE: Roman[] = [
  { autor: "George Orwell", titel: "1984", thema: "Sprache, Macht und Wirklichkeitskontrolle" },
  { autor: "Aldous Huxley", titel: "Schöne neue Welt", thema: "Konditionierung, Konsum und freiwillige Ablenkung" },
  { autor: "Hermann Hesse", titel: "Siddhartha", thema: "Erfahrung jenseits übernommener Lehren" },
  { autor: "Ursula K. Le Guin", titel: "Freie Geister", thema: "alternative Gesellschaftsordnungen" },
  { autor: "Daniel Keyes", titel: "Blumen für Algernon", thema: "Intelligenz, Würde und Identität" },
  { autor: "Kazuo Ishiguro", titel: "Klara und die Sonne", thema: "Bewusstsein, Beziehung und künstliche Intelligenz" },
];

// ------------------------------------------------------------- Teil III

export const ARTE_DOCS: ArteDoc[] = [
  {
    titel: "Wie unser Gehirn uns austrickst",
    link: "https://www.arte.tv/de/videos/RC-027733/wie-unser-gehirn-uns-austrickst/",
    format: "Zweiteiler",
    verf: "bis 13. Dezember 2026",
    teile: ["Teil 1: Mein Hirn und ich", "Teil 2: Mein Hirn und die anderen"],
    themen:
      "mentale Abkürzungen, Wahrnehmungsfilter, optische Täuschungen, kognitive Verzerrungen, Konformismus und sozialer Einfluss.",
    ableitungen: [
      "Dein Gehirn belügt dich nicht – es konstruiert eine brauchbare Version.",
      "Warum wir sehen, was wir erwarten.",
      "Was Zaubertricks über Bewusstsein verraten.",
      "Weshalb andere Menschen unsere Wahrnehmung verändern.",
      "Ein praktischer Tag ohne vorschnelles Urteil.",
    ],
  },
  {
    titel: "Geheimnisse unseres Gehirns",
    link: "https://www.arte.tv/de/videos/RC-027985/geheimnisse-unseres-gehirns/",
    format: "Zweiteiler",
    verf: "bis 30. März 2027",
    teile: ["Teil 1: Von der Nervenzelle zum Denkorgan", "Teil 2: Intelligent durch Beziehungen"],
    themen:
      "Evolution des Gehirns, Intelligenz, Gedächtnis, Emotionen, soziale Beziehungen und biologische gegenüber künstlicher Intelligenz.",
  },
  {
    titel: "Bin ich mein Hirn?",
    link: "https://www.arte.tv/de/videos/108567-004-A/bin-ich-mein-hirn/",
    laenge: "22 Minuten",
    verf: "bis 1. März 2028",
    themen:
      "Neuroreduktionismus, Selbst, Verantwortung und die Grenzen rein biologischer Erklärungen.",
  },
  {
    titel: "Verliert unser Gehirn den Fokus?",
    link: "https://www.arte.tv/de/videos/121326-017-A/verliert-unser-gehirn-den-fokus/",
    reihe: "42 – Die Antwort auf fast alles",
    themen:
      "Push-Nachrichten, Kurzvideos, Konzentration, Ablenkung und Anpassung an die digitale Reizwelt.",
  },
  {
    titel: "Können wir Zeit fühlen?",
    link: "https://www.arte.tv/de/videos/115511-007-A/koennen-wir-zeit-fuehlen/",
    laenge: "26 Minuten",
    verf: "bis 28. März 2028",
    themen:
      "subjektive Zeit, Routinen, Gefahr, Erinnerung und die Veränderbarkeit des persönlichen Zeiterlebens.",
  },
  {
    titel: "Können wir Erinnerung festhalten?",
    link: "https://www.arte.tv/de/videos/115511-005-A/koennen-wir-erinnerung-festhalten/",
    reihe: "42 – Die Antwort auf fast alles",
    themen:
      "Erinnerung, Identität, Rekonstruktion, falsche Erinnerungen und die Veränderung von Erinnerungen durch erneutes Abrufen.",
  },
  {
    titel: "Der digitale Tsunami",
    link: "https://www.arte.tv/de/videos/114598-000-A/der-digitale-tsunami/",
    laenge: "84 Minuten",
    verf: "bis 20. Oktober 2026",
    themen:
      "digitale Medien, künstliche Intelligenz, Wahrnehmung, Entscheidungsdelegation und gesellschaftliche Folgen der Digitalisierung.",
  },
];

export const ERGAENZENDE_THEMEN: string[] = [
  "Aufmerksamkeit und Konzentration",
  "Erinnerung und Identität",
  "Zeitwahrnehmung",
  "Empathie und Mitgefühl",
  "Angst und gesellschaftlicher Stress",
  "Einsamkeit und soziale Ansteckung",
  "künstliche Intelligenz und Emotionserkennung",
  "Konkurrenz und Kooperation",
  "Sucht und Belohnungssystem",
  "Sprache und Wirklichkeit",
  "Medien, Algorithmen und digitale Macht",
];

// ------------------------------------------------------------- Teil IV

export const RESERVOIR: ReservoirKategorie[] = [
  {
    n: "22",
    titel: "Wahrnehmung",
    start: 1,
    items: [
      "Du siehst nicht alles, was vor deinen Augen geschieht.",
      "Aufmerksamkeit ist kein Scheinwerfer mit unbegrenzter Reichweite.",
      "Das Gehirn erkennt Muster – auch dort, wo keine sind.",
      "Erwartungen verändern die Wahrnehmung vor dem bewussten Urteil.",
      "Warum Bekanntes automatisch wahrer wirkt.",
      "Der blinde Fleck existiert nicht nur im Auge.",
      "Wahrnehmung ist eine Wette des Gehirns auf die wahrscheinlichste Erklärung.",
      "Warum zwei ehrliche Zeugen Verschiedenes erinnern können.",
    ],
  },
  {
    n: "23",
    titel: "Gedanken und Identität",
    start: 9,
    items: [
      "Ein Gedanke erscheint – aber wer hat ihn bestellt?",
      "Warum nicht jeder Gedanke eine persönliche Wahrheit ist.",
      "Das Ich als fortlaufende Erzählung.",
      "Was Rollen mit Identität machen.",
      "Der Unterschied zwischen „Ich bin“ und „Ich erlebe gerade“.",
      "Warum wir eine konsistente Geschichte über uns erfinden.",
      "Das Bedürfnis, recht zu behalten, schützt häufig das Selbstbild.",
      "Wenn eine Meinung Teil der Identität wird.",
    ],
  },
  {
    n: "24",
    titel: "Gefühle und Körper",
    start: 17,
    items: [
      "Gefühle sind Informationen, aber keine Befehle.",
      "Der Körper reagiert, während der Verstand noch nach Worten sucht.",
      "Warum derselbe Herzschlag Angst oder Vorfreude bedeuten kann.",
      "Emotionale Differenzierung erweitert Handlungsmöglichkeiten.",
      "Stress verengt nicht nur den Körper, sondern auch das Weltbild.",
      "Was dauerhafte Alarmbereitschaft mit Entscheidungen macht.",
      "Warum Unterdrücken nicht dasselbe wie Regulieren ist.",
      "Der Mythos vom rein rationalen Menschen.",
    ],
  },
  {
    n: "25",
    titel: "Freiheit und Entscheidung",
    start: 25,
    items: [
      "Ist eine Entscheidung frei, wenn sie eine Vorgeschichte besitzt?",
      "Freiheit beginnt möglicherweise zwischen Impuls und Handlung.",
      "Erklärung ist nicht automatisch Entschuldigung.",
      "Verantwortung ohne Schuldspirale.",
      "Warum Einsicht ohne Handlung wirkungslos bleibt.",
      "Jede Gewohnheit war irgendwann eine einzelne Handlung.",
      "Wahlfreiheit wächst mit der Zahl der wahrgenommenen Möglichkeiten.",
      "Wenn Angst eine Entscheidung trifft und Vernunft sie später begründet.",
    ],
  },
  {
    n: "26",
    titel: "Sprache und Manipulation",
    start: 33,
    items: [
      "Wer den Begriff bestimmt, bestimmt einen Teil der Debatte.",
      "Warum Etiketten Menschen unsichtbar machen können.",
      "Worte aktivieren ganze Bedeutungsnetze.",
      "Wiederholung erzeugt Vertrautheit – nicht Wahrheit.",
      "Wie passive Sprache Verantwortung verschwinden lässt.",
      "Warum „alternativlos“ ein Bewusstseinsrahmen ist.",
      "Der Unterschied zwischen Überzeugen und Manipulieren.",
      "Wenn Sprache das Denken verkürzt.",
    ],
  },
  {
    n: "27",
    titel: "Gruppe und Gesellschaft",
    start: 41,
    items: [
      "Warum Menschen der Gruppe widersprechen und trotzdem an sich zweifeln.",
      "Gehorsam beginnt oft mit kleinen, scheinbar harmlosen Schritten.",
      "Zugehörigkeit kann wichtiger werden als Wahrheit.",
      "Moralische Urteile entstehen häufig vor ihrer Begründung.",
      "Warum normale Menschen in unnormalen Systemen problematisch handeln.",
      "Die Verantwortung verschwindet nicht, nur weil sie verteilt wird.",
      "Wann Schwarmintelligenz funktioniert – und wann Gruppendenken entsteht.",
      "Warum Außenseiter für Systeme unbequem und wertvoll sind.",
    ],
  },
  {
    n: "28",
    titel: "Medien und digitale Welt",
    start: 49,
    items: [
      "Dein Feed ist keine Weltkarte.",
      "Algorithmen kennen Reaktionen, nicht deine Wahrheit.",
      "Empörung hält Aufmerksamkeit länger fest als Differenzierung.",
      "Kostenloser Inhalt wird häufig mit Aufmerksamkeit und Daten bezahlt.",
      "Warum extreme Positionen sichtbarer erscheinen als die gesellschaftliche Mitte.",
      "Auswahl kann lenken, ohne dass eine Aussage gelogen ist.",
      "Der Unterschied zwischen Relevanz und Reichweite.",
      "Was Dauerbeschallung mit dem inneren Dialog macht.",
    ],
  },
  {
    n: "29",
    titel: "Kultur, Wirklichkeit und Sinn",
    start: 57,
    items: [
      "Normal ist oft nur das, was nie hinterfragt wurde.",
      "Andere Kulturen erzeugen andere selbstverständliche Wirklichkeiten.",
      "Fortschritt ist real und trotzdem ungleich verteilt.",
      "Menschenbilder erschaffen die Systeme, die sie anschließend bestätigen.",
      "Was der Umgang mit Tod über eine Gesellschaft verrät.",
      "Warum Krisen alte Identitäten aufbrechen.",
      "Sinn ist keine fertige Antwort, sondern zeigt sich im Handeln.",
      "Das Ende einer Gewissheit kann der Beginn von Bewusstsein sein.",
    ],
  },
  {
    n: "30",
    titel: "Bewusstsein im Alltag",
    start: 65,
    items: [
      "Warum Erkenntnis im vertrauten Umfeld wieder verschwindet.",
      "Der Alltag ist der eigentliche Bewusstseinstest.",
      "Kleine Unterbrechungen machen den Autopiloten sichtbar.",
      "Ein neues Verhalten erzeugt Informationen, die Nachdenken allein nicht liefern kann.",
      "Bewusstheit bedeutet nicht permanente Ruhe.",
      "Wer alles bewertet, kann wenig neu wahrnehmen.",
      "Stille ist nicht leer – sie macht vorhandene Aktivität hörbar.",
      "Der nächste Entwicklungsschritt ist häufig kleiner und konkreter als erwartet.",
    ],
  },
];

// ------------------------------------------------------------- Teil VI

export const RUNDEN: Runde[] = [
  {
    n: "34",
    titel: "Erste Runde: Fundament",
    items: [
      "ARTE: Wie unser Gehirn uns austrickst",
      "David Eagleman: Inkognito",
      "Lisa Feldman Barrett: Wie Gefühle entstehen",
      "Thomas Metzinger: Der Ego-Tunnel",
      "Alva Noë: Du bist nicht dein Gehirn",
    ],
    ergebnis:
      "Wahrnehmung, Autopilot, Emotion, Selbst und Gegenposition zum reinen Gehirnmodell.",
  },
  {
    n: "35",
    titel: "Zweite Runde: Fremdsteuerung",
    items: [
      "Stanley Milgram: Das Milgram-Experiment",
      "Robert Cialdini: Die Psychologie des Überzeugens",
      "Elisabeth Wehling: Politisches Framing",
      "Edward Bernays: Propaganda",
      "Eli Pariser: Filter Bubble",
      "ARTE: Der digitale Tsunami",
    ],
    ergebnis:
      "Gruppendruck, Autorität, Sprache, Medien, Algorithmen und Aufmerksamkeit.",
  },
  {
    n: "36",
    titel: "Dritte Runde: Freiheit und Entwicklung",
    items: [
      "Peter Bieri: Das Handwerk der Freiheit",
      "Christian List: Warum der freie Wille existiert",
      "Robert Sapolsky: Determined",
      "Humberto Maturana und Francisco Varela: Der Baum der Erkenntnis",
      "Jiddu Krishnamurti: Einbruch in die Freiheit",
    ],
    ergebnis:
      "widersprüchliche Modelle von Freiheit, Verantwortung, Beobachtung und Handlung.",
  },
  {
    n: "37",
    titel: "Vierte Runde: Horizonterweiterung",
    items: [
      "Joseph Henrich: Die seltsamsten Menschen der Welt",
      "David Graeber und David Wengrow: Anfänge",
      "Gregory Bateson: Ökologie des Geistes",
      "Viktor Frankl: … trotzdem Ja zum Leben sagen",
      "ein ausgewählter Roman aus Abschnitt 19",
    ],
    ergebnis: "Kultur, Systeme, Geschichte, Sinn und erlebter Perspektivwechsel.",
  },
];

// ------------------------------------------------------------- Teil VII

export const PFLEGE: string[] = [
  "Neue Quellen werden monatlich geprüft.",
  "Bereits vorhandene Titel werden nicht erneut aufgenommen, außer eine neue Ausgabe oder neue Forschung verändert die Bewertung.",
  "Bei Dokumentationen werden Verfügbarkeit und Abrufdatum notiert.",
  "Wissenschaftliche Behauptungen werden nach Möglichkeit bis zur Primärquelle zurückverfolgt.",
  "Spirituelle, philosophische und empirische Aussagen bleiben erkennbar getrennt.",
  "Jede starke These erhält mindestens eine Gegenposition.",
  "Die Zuordnung zu den sieben Bewusstseinsstufen erfolgt erst nach inhaltlicher Prüfung, nicht allein anhand eines Schlagworts.",
];

export const MINIMAL_OUTPUT: string[] = [
  "eine verständliche Kernaussage,",
  "eine ernstzunehmende Gegenposition,",
  "ein beobachtbares Alltagsbeispiel,",
  "eine konkrete Tätigkeit,",
  "ein ausführlicher Artikel oder Kursbaustein,",
  "drei bis fünf kurze Contentansätze.",
];

export const QUELLENKARTE = `# Quellenkarte

## Basisdaten
- Titel:
- Autorin/Autor bzw. Produktion:
- Jahr:
- Link/ISBN:
- Kennzeichnung: W / P / G / E / L

## Kernaussage in eigenen Worten

## Zentrale Begriffe
-
-

## Verwendete Experimente oder Fallbeispiele
-

## Gegenpositionen und Kritik
-

## Beobachtbares Alltagsphänomen
-

## Konkrete Tätigkeit oder Bewusstseinsexperiment
-

## Content-Ableitungen
- Grundlagenartikel:
- Vertiefungsartikel:
- Reel/Short:
- Video:
- Kursbaustein:
- persönlicher Story-Anschluss:

## Verbindung zu den sieben Stufen
- passende Stufe:
- Funktion innerhalb der Stufe:

## Offene Prüfung
- Welche Aussage benötigt eine Primärquelle?
- Was ist Interpretation statt gesicherter Befund?`;
