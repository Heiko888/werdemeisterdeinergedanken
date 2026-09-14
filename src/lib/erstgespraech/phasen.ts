/**
 * Inhalt des Klarheitsgesprächs-Cockpits – die feste Gesprächsführung.
 *
 * Bewusst als Code-Konstante (nicht in der Datenbank): Der Ablauf ändert sich
 * selten und gehört zum Werkzeug. Quelle: „Auftrag Gesprächs-Cockpit“,
 * Abschnitte 5–7. Wird vom Cockpit (`/admin/erstgespraeche/[id]`) gelesen.
 */

export type Frage = { id: string; text: string };

export type Kasten = { titel: string; text: string };

export type Phase = {
  /** Schlüssel für Notizen/Abhaken in der Datenbank: notizen["p1"], abgehakt["p2"]. */
  key: "p1" | "p2" | "p3" | "p4" | "p5" | "p6";
  nummer: number;
  /** Zeitfenster in Minuten ab Gesprächsbeginn – steuert die Uhr. */
  vonMin: number;
  bisMin: number;
  zeitfenster: string;
  name: string;
  ziel: string;
  /** Vorbereitete Sätze zum Mitlesen (Serifenschrift, klar abgesetzt). */
  wortlaut: string[];
  /** Optionaler Einstiegssatz vor den Fragen. */
  einstieg?: string;
  fragen: Frage[];
  /** „Warum“- und „Nicht tun“-Kästen. */
  hinweise: Kasten[];
};

export const PHASEN: Phase[] = [
  {
    key: "p1",
    nummer: 1,
    vonMin: 0,
    bisMin: 3,
    zeitfenster: "0–3 Min",
    name: "Ankommen und Rahmen setzen",
    ziel: "Sicherheit, Erlaubnis, klare Agenda",
    wortlaut: [
      "„Schön, dass du da bist. Wie geht’s dir gerade — so richtig, nicht die Höflichkeitsantwort?“",
      "(kurz zuhören, dann)",
      "„Ich sag dir kurz, wie ich mir die nächsten 30 Minuten vorstelle, dann weißt du, woran du bist.",
      "Ich stelle dir zuerst ein paar Fragen. Manche davon sind unangenehm — nicht, weil ich dich testen will, sondern weil an unangenehmen Stellen meistens das Interessante liegt. Danach schauen wir uns eine konkrete Situation von dir gemeinsam an, und du nimmst etwas mit, das du sofort anwenden kannst.",
      "Am Ende sage ich dir ehrlich, was ich denke. Vielleicht ist das: ‚Ich glaube, ich kann dir helfen, und so würde das aussehen.‘ Vielleicht ist es auch: ‚Mach das erst mal allein weiter, du brauchst mich gar nicht.‘ Beides ist ein gutes Ergebnis.",
      "Passt das für dich?“",
    ],
    fragen: [],
    hinweise: [
      {
        titel: "Warum",
        text: "Nimmt die Verkaufsangst aus dem Raum, bevor sie entsteht. Und holt die Erlaubnis für unangenehme Fragen.",
      },
    ],
  },
  {
    key: "p2",
    nummer: 2,
    vonMin: 3,
    bisMin: 10,
    zeitfenster: "3–10 Min",
    name: "Standort",
    ziel: "Was ist — ehrlich und konkret",
    wortlaut: [],
    einstieg:
      "„Du hast geschrieben: ‚{Zitat aus dem Fragebogen}.‘ Erzähl mir mehr davon.“",
    fragen: [
      { id: "q1", text: "Seit wann geht das so?" },
      {
        id: "q2",
        text: "Wann war es das letzte Mal richtig deutlich? Erzähl mir die Situation — was ist da genau passiert?",
      },
      { id: "q3", text: "Und was ging dir in dem Moment durch den Kopf?" },
      { id: "q4", text: "Wo im Körper hast du das gemerkt?" },
      {
        id: "q5",
        text: "Erwischt dich das eher morgens, nachts, oder in bestimmten Situationen mit bestimmten Menschen?",
      },
      { id: "q6", text: "Wer außer dir merkt, dass da was ist?" },
    ],
    hinweise: [
      {
        titel: "Technik — Kapseln öffnen",
        text: "„Ich bin einfach oft gestresst“ ist keine Antwort. → „Stress ist so ein Sammelwort. Wenn du es genauer sagen müsstest — ist das eher Angst, eher Druck, eher Ärger, eher Erschöpfung?“",
      },
      {
        titel: "Nicht tun",
        text: "Lösungen anbieten, erklären, vom eigenen Modell erzählen. Einzige Aufgabe: die exakten Worte mitschreiben, nicht die eigene Übersetzung.",
      },
    ],
  },
  {
    key: "p3",
    nummer: 3,
    vonMin: 10,
    bisMin: 16,
    zeitfenster: "10–16 Min",
    name: "Der Preis des Bleibens",
    ziel: "Er spürt selbst, was es kostet",
    wortlaut: [
      "„Ich möchte kurz die Perspektive wechseln. Stell dir vor, es ändert sich nichts. In zwei Jahren ist genau das noch so wie heute, vielleicht ein Stück ausgeprägter. Was hast du dann verloren?“",
      "(Dann Stille. Lange Stille. Aushalten.)",
    ],
    fragen: [
      {
        id: "q1",
        text: "Was kostet dich das aktuell — nicht in Geld, sondern in Lebensqualität?",
      },
      { id: "q2", text: "Wen kostet es außer dir noch etwas?" },
      {
        id: "q3",
        text: "Du hast gesagt, du hast schon {X} versucht. Was hat da gefehlt?",
      },
      {
        id: "q4",
        text: "Warum jetzt? Du lebst damit seit {Zeitraum}. Was ist gerade anders, dass du dir heute einen Termin geholt hast? ← die stärkste Frage, die Antwort ist der wahre Kaufgrund",
      },
    ],
    hinweise: [
      {
        titel: "Dann drehen",
        text: "„Und jetzt andersrum: Stell dir vor, in einem Jahr hättest du wirklich gelernt, deinen Gedanken zuzuschauen, statt in ihnen zu leben. Was wäre dann anders? Ganz konkret, an einem normalen Dienstag.“",
      },
      {
        titel: "Grenze",
        text: "Niemandem Schmerz einreden. Sagt jemand ehrlich „so schlimm ist es nicht“ — glauben. Dann ist er nicht so weit, und das ist in Ordnung.",
      },
    ],
  },
  {
    key: "p4",
    nummer: 4,
    vonMin: 16,
    bisMin: 21,
    zeitfenster: "16–21 Min",
    name: "Der Aha-Moment",
    ziel: "Eine echte Erfahrung, kein Vortrag",
    wortlaut: [
      "„Ich möchte dir kurz etwas zeigen. Dauert drei Minuten. Hast du Lust?“",
      "„Geh nochmal in die Situation von letzter Woche. Der Moment, in dem {Situation}. Bist du drin? Und jetzt sag mir den Satz, der in deinem Kopf war. Wörtlich, so wie er da stand.“",
      "(z. B. „Ich schaffe das nie.“)",
      "„Gut. Und jetzt sag ihn nochmal — aber so: ‚Da ist der Gedanke, dass ich das nie schaffe.‘“",
      "„Merkst du den Unterschied?“",
      "„Beim ersten Satz warst du der Gedanke. Beim zweiten hattest du ihn. Ein winziger Unterschied in der Sprache — und ein riesiger in der Erfahrung. Genau darum geht es auf Stufe 3, Selbstbeobachtung. Was du gerade gemacht hast, war der ganze Mechanismus in Kurzform. Der Rest ist Wiederholung, Vertiefung und die Frage, was du mit dem Raum machst, der da entsteht.“",
    ],
    fragen: [],
    hinweise: [
      {
        titel: "Wenn nichts ankommt",
        text: "„Bei dir kommt das gerade nicht an, das merke ich. Das ist normal — manchmal braucht es ein paar Anläufe, manchmal ist es einfach nicht dein Zugang. Lass uns trotzdem weiterschauen.“ Kostet vielleicht den Abschluss, nie die Glaubwürdigkeit.",
      },
      {
        titel: "Übergang",
        text: "„Darf ich dir sagen, wie ich deine Situation von außen sehe?“ — immer erst um Erlaubnis fragen.",
      },
    ],
  },
  {
    key: "p5",
    nummer: 5,
    vonMin: 21,
    bisMin: 26,
    zeitfenster: "21–26 Min",
    name: "Die Empfehlung",
    ziel: "Klar, ohne Druck, mit Preis",
    wortlaut: [
      "Schritt 1 — Spiegeln, in seinen Worten:",
      "„Was ich gehört habe: Du {Problem in seinen Worten}. Das geht seit {Zeitraum}. Du hast {Versuche} probiert, und es hat nicht gehalten. Und was dich am meisten stört, ist {sein Punkt}. Richtig? Habe ich was Wichtiges ausgelassen?“ — auf ein klares „Ja, genau“ warten.",
      "Schritt 2 — Einordnen:",
      "„Du hast dich im Fragebogen auf Stufe {X} eingeschätzt. Von außen würde ich sagen: Du bist eigentlich schon bei {Y} — du bemerkst es ja, sonst säßest du nicht hier. Was fehlt, ist nicht Einsicht. Was fehlt, ist Übung und jemand, der dranbleibt, wenn du es nicht tust.“",
      "Schritt 3 — Eine Option empfehlen, nicht drei. (Wortlaute je Angebot rechts unter „Angebote“.)",
      "Schritt 4 — Nach dem Preis schweigen. Wer nach dem Preis weiterredet, verhandelt gegen sich selbst.",
    ],
    fragen: [],
    hinweise: [
      {
        titel: "Grundregel",
        text: "Nur EINE Option empfehlen, passend zu dem, was du gehört hast — nicht das ganze Menü vorlesen.",
      },
    ],
  },
  {
    key: "p6",
    nummer: 6,
    vonMin: 26,
    bisMin: 30,
    zeitfenster: "26–30 Min",
    name: "Entscheidung und Abschluss",
    ziel: "Konkreter nächster Schritt",
    wortlaut: [
      "Die Frage: „Was ist dein erster Impuls dazu?“ — nicht „Was denkst du?“, das lädt den Kopf ein.",
      "Bei Zustimmung: „Freut mich. Ich schicke dir gleich nach dem Gespräch den Link. Wann startest du — heute Abend oder am Wochenende?“ (Der Startzeitpunkt ist wichtiger als die Unterschrift.)",
      "Bei klarem Nein: „Alles gut, ehrlich. Dann nimm mit, was du heute hier hattest — der Perspektivwechsel von vorhin funktioniert auch ohne mich. Mach ihn zwei Wochen lang jeden Tag einmal. Ich schicke dir noch das E-Book. Und wenn du in einem halben Jahr merkst, dass du doch Begleitung willst, meld dich einfach.“",
      "Immer zum Schluss: „Eine letzte Frage noch, die hilft mir sehr: Was war für dich das Wertvollste an diesen 30 Minuten?“ → gehört ins Feld „Wertvollstes“.",
    ],
    fragen: [],
    hinweise: [
      {
        titel: "Haltung",
        text: "Heiko redet höchstens 30 % der Zeit. Er ist nicht der Bittsteller, der einen Kunden braucht, sondern der, der einen Weg kennt und schaut, ob dieser Mensch ihn gehen will.",
      },
    ],
  },
];

/** Grundregeln, die im Cockpit sichtbar bleiben sollen. */
export const GRUNDREGELN = [
  "Heiko redet höchstens 30 % der Zeit.",
  "Nicht der Bittsteller, der einen Kunden braucht — der, der einen Weg kennt und schaut, ob dieser Mensch ihn gehen will.",
];

// --- Einwände (Schnellzugriff) ---------------------------------------------

export type Einwand = { id: string; titel: string; antwort: string[] };

export const EINWAND_GRUNDMUSTER =
  "annehmen („Verstehe ich.“) → vertiefen („Was genau meinst du damit?“) → prüfen (echter Einwand oder höfliche Verpackung?) → antworten, ehrlich und ohne Rechtfertigung. Nie „Ja, aber …“. Nie mehr als einmal nachfassen.";

export const EINWAENDE: Einwand[] = [
  {
    id: "nachdenken",
    titel: "„Ich muss darüber nachdenken.“",
    antwort: [
      "„Klar, mach das. Damit ich dir helfen kann: Was genau willst du dir überlegen? Ob du Zeit hast, ob das Geld passt, oder ob das der richtige Weg für dich ist?“",
      "Falls nichts kommt: „Dann schicke ich dir alles schriftlich, und wir sprechen in einer Woche fünf Minuten. Passt Dienstag oder Donnerstag besser?“ — nie ein „Ich melde mich“ stehen lassen, immer ein Datum.",
    ],
  },
  {
    id: "teuer",
    titel: "„Das ist mir zu teuer.“",
    antwort: [
      "„Darf ich fragen — ist es zu teuer im Sinne von: Du hast das Geld gerade nicht? Oder: Du bist dir nicht sicher, ob es das wert ist?“",
      "Geld fehlt: Raten anbieten oder ehrlich sagen „warte, bis es passt“.",
      "Zweifel am Wert: „Du hast gesagt, das Thema kostet dich {seine Worte}. Seit {Zeitraum}. 49 € im Monat sind ungefähr zweimal Essen gehen. Die Frage ist nicht, ob das viel Geld ist, sondern ob du glaubst, dass sich für dich etwas ändert. Und das kann ich dir nicht beantworten — nur du.“",
    ],
  },
  {
    id: "zeit",
    titel: "„Ich habe keine Zeit.“",
    antwort: [
      "„Wie viel Zeit hast du denn in den letzten {Zeitraum} damit verbracht, über das Thema zu grübeln?“ (Pause) „Es geht um zehn Minuten am Tag. Nicht um zehn Stunden die Woche.“",
    ],
  },
  {
    id: "probiert",
    titel: "„Ich habe schon so viel probiert.“",
    antwort: [
      "„Das glaube ich dir. Was hast du probiert?“ (zuhören) „Was du beschreibst, hat fast immer denselben Bruch: Du hast etwas verstanden, aber nicht geübt. Verstehen dauert einen Nachmittag, Verändern dauert Monate — und genau da hört bei den meisten die Begleitung auf. Ich verspreche dir keine Abkürzung. Ich sage dir sogar: Es dauert.“",
    ],
  },
  {
    id: "partner",
    titel: "„Ich muss das mit meinem Partner besprechen.“",
    antwort: [
      "„Absolut richtig. Was denkst du, was er oder sie sagen wird?“ (meist kommt jetzt der wahre Einwand) „Was wäre für ihn oder sie die wichtigste Frage? Dann lass uns die kurz beantworten, damit du das gut erklären kannst.“",
    ],
  },
  {
    id: "funktioniert",
    titel: "„Funktioniert das wirklich?“",
    antwort: [
      "„Ehrliche Antwort: Es funktioniert nicht bei jedem. Es funktioniert bei denen, die dranbleiben, wenn es unbequem wird. Ich kann dir nicht versprechen, dass du das tust — das kann nur einer, und der sitzt gerade mir gegenüber. Was ich sagen kann: Du kannst monatlich kündigen.“",
    ],
  },
  {
    id: "ebook",
    titel: "„Kann ich nicht einfach das E-Book lesen?“",
    antwort: [
      "„Kannst du, sofort und kostenlos, ich schicke es dir gleich. Meine Erfahrung ist nur: Das E-Book erklärt dir die Landkarte. Es geht dir aber nicht den Weg.“",
    ],
  },
];

// --- Angebote (Schnellzugriff) ---------------------------------------------

export type Angebot = {
  id: string;
  name: string;
  preis: string;
  /** Klartext für den Follow-up-Text. */
  klartext: string;
  wortlaut?: string[];
};

export const ANGEBOTE: Angebot[] = [
  {
    id: "mitgliedschaft",
    name: "Mitgliedschaft",
    preis: "49 €/Monat oder 490 €/Jahr",
    klartext: "die Mitgliedschaft (49 € im Monat, monatlich kündbar)",
    wortlaut: [
      "„Der Weg, den ich gebaut habe, sind genau diese 7 Stufen — mit geführten Videos, 13 Praxisübungen, Arbeitsheften und deinem eigenen Journal, in dem du siehst, wie sich deine Kurve verändert. Du gehst ihn in deinem Tempo, ohne Deadline. Das kostet 49 € im Monat, monatlich kündbar. Oder 490 € im Jahr, dann hast du zwei Monate geschenkt. Bei dem, was du beschrieben hast, würde ich mit Stufe 3 anfangen.“",
    ],
  },
  {
    id: "standort_session",
    name: "Standort-Session",
    preis: "190 €",
    klartext: "die Standort-Session (90 Minuten, 190 €)",
    wortlaut: [
      "„Wir nehmen uns 90 Minuten, ich schau mir deine Situation richtig an, und du bekommst danach schriftlich, was ich sehe. 190 €. Wenn du dich danach für den begleiteten Weg entscheidest, ziehe ich die 190 € ab.“",
    ],
  },
  {
    id: "begleiteter_weg",
    name: "Der begleitete Weg",
    preis: "1.480 € oder 3 × 540 €",
    klartext: "den begleiteten Weg (12 Wochen Begleitung, 1.480 € oder 3 × 540 €)",
    wortlaut: [
      "„Für dich würde ich nicht die Mitgliedschaft allein empfehlen. Du hast selbst gesagt, dass du Dinge anfängst und dann einschlafen lässt — dann wäre ein Video-Kurs nur die nächste Sache, die du anfängst.",
      "Was ich dir vorschlage, heißt Der begleitete Weg. Zwölf Wochen: ein Startgespräch von 90 Minuten, danach sechs Gespräche à 60 Minuten alle zwei Wochen. Der komplette Zugang ist die ganze Zeit dabei, und zwischendurch kannst du mir schreiben.",
      "Das kostet 1.480 € — oder in drei Raten zu 540 €.",
      "Und weil du selbst gesagt hast, dass du sowas schon mal liegen gelassen hast: Nach dem dritten Termin, das ist Woche vier, frage ich dich einmal direkt, ob dir das was bringt. Wenn du dann Nein sagst, hören wir auf und du bekommst den Rest zurück. Ohne Diskussion.“",
    ],
  },
];

// --- Auswahllisten (Abschluss) ---------------------------------------------

export type Ergebnis =
  | "offen"
  | "zusage"
  | "bedenkzeit"
  | "absage"
  | "nicht_passend";

export const ERGEBNIS_OPTIONEN: { wert: Ergebnis; label: string }[] = [
  { wert: "zusage", label: "Zusage" },
  { wert: "bedenkzeit", label: "Bedenkzeit" },
  { wert: "absage", label: "Absage" },
  { wert: "nicht_passend", label: "Passt nicht" },
];

export const ERGEBNIS_LABEL: Record<Ergebnis, string> = {
  offen: "offen",
  zusage: "Zusage",
  bedenkzeit: "Bedenkzeit",
  absage: "Absage",
  nicht_passend: "Passt nicht",
};

export type Empfehlung =
  | "mitgliedschaft"
  | "standort_session"
  | "begleiteter_weg"
  | "keine";

export const EMPFEHLUNG_OPTIONEN: { wert: Empfehlung; label: string }[] = [
  { wert: "mitgliedschaft", label: "Mitgliedschaft" },
  { wert: "standort_session", label: "Standort-Session" },
  { wert: "begleiteter_weg", label: "Der begleitete Weg" },
  { wert: "keine", label: "keine" },
];

export const EMPFEHLUNG_LABEL: Record<Empfehlung, string> = {
  mitgliedschaft: "Mitgliedschaft",
  standort_session: "Standort-Session",
  begleiteter_weg: "Der begleitete Weg",
  keine: "keine",
};

/** Klartext einer Empfehlung inkl. Preis – für den Follow-up-Text. */
export function empfehlungKlartext(empfehlung: Empfehlung | null): string {
  if (!empfehlung || empfehlung === "keine") return "";
  const a = ANGEBOTE.find((x) => x.id === empfehlung);
  return a ? a.klartext : "";
}

// --- Die 7 Stufen ----------------------------------------------------------

export type Stufe = { nr: number; name: string; halbsatz: string };

export const STUFEN: Stufe[] = [
  { nr: 1, name: "Autopilot", halbsatz: "Du wirst gelebt" },
  { nr: 2, name: "Erwachen", halbsatz: "Du bemerkst es" },
  { nr: 3, name: "Selbstbeobachtung", halbsatz: "Du siehst dir zu" },
  { nr: 4, name: "Emotionale Reifung", halbsatz: "Du lässt los" },
  { nr: 5, name: "Schöpferkraft", halbsatz: "Du erschaffst bewusst" },
  { nr: 6, name: "Innere Ausrichtung", halbsatz: "Kopf, Herz und Handeln" },
  { nr: 7, name: "Meisterschaft", halbsatz: "Du gestaltest" },
];

export function stufeLabel(nr: number | null | undefined): string {
  if (!nr) return "—";
  const s = STUFEN.find((x) => x.nr === nr);
  return s ? `Stufe ${s.nr} · ${s.name}` : `Stufe ${nr}`;
}

// --- Follow-up-Text ---------------------------------------------------------

export type FollowupDaten = {
  interessentName: string | null;
  notizP2: string;
  notizP3: string;
  stufeEingeschaetzt: number | null;
  empfehlung: Empfehlung | null;
  ergebnis: Ergebnis | null;
  naechsterSchrittAm: string | null; // ISO-Datum
};

/** Vornamen aus dem vollen Namen ziehen. */
export function vorname(name: string | null | undefined): string {
  if (!name) return "";
  return name.trim().split(/\s+/)[0] ?? "";
}

/** Deutsches Datum (14.09.2026) aus einem ISO-Datum. */
export function datumDe(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/** Baut den fertigen Follow-up-Text aus den Gesprächsdaten (zum Kopieren). */
export function baueFollowup(d: FollowupDaten): string {
  const name = vorname(d.interessentName) || "…";
  const gehoert = d.notizP2.trim() || "…";
  const kostet = d.notizP3.trim() || "…";
  const stufe = d.stufeEingeschaetzt ? String(d.stufeEingeschaetzt) : "…";
  const vorschlag = empfehlungKlartext(d.empfehlung) || "…";

  const zeilen = [
    `Hallo ${name},`,
    "",
    "danke für die 30 Minuten — das war ein ehrliches Gespräch, und das ist nicht selbstverständlich.",
    "",
    `Was ich gehört habe: ${gehoert}`,
    `Was es dich kostet: ${kostet}`,
    `Wo du stehst: Stufe ${stufe}`,
    `Mein Vorschlag: ${vorschlag}`,
    "",
    "Und unabhängig von jeder Entscheidung — die Übung von vorhin: Immer wenn ein",
    "Gedanke dich packt, sag innerlich „Da ist der Gedanke, dass …“. Zwei Wochen lang.",
    "Das gehört jetzt dir.",
  ];

  if (d.ergebnis === "bedenkzeit") {
    const datum = datumDe(d.naechsterSchrittAm) || "…";
    zeilen.push(
      "",
      `Wir telefonieren am ${datum} kurz. Bis dahin: kein Druck.`,
    );
  }

  zeilen.push("", "Heiko");
  return zeilen.join("\n");
}
