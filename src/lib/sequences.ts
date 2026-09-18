/**
 * E-Mail-Verkaufsstrecken (Kampagnen-Check 2026-09-18, Punkt 4).
 *
 * Reine Daten – Versand und Zustand liegen in src/lib/sequence-mailer.ts.
 *
 *   testLeadSequence  – 7 Mails nach Test/E-Book (Tag 0, 1, 3, 5, 7, 9, 11):
 *                       Story → Beweis → Angebot. Danach übernimmt die
 *                       wöchentliche Impuls-Rotation (src/lib/impulses.ts).
 *   bookBuyerSequence – 3 Mails für Buch-Käufer (Tag 3, 10, 21) mit der
 *                       Einladung in die Mitgliedschaft.
 *
 * Regeln (CTA-Regel aus dem Audit): pro Mail genau EIN nächster Schritt –
 * entweder antworten, üben, Buch ODER Mitgliedschaft, nie beides. Du-Form,
 * kurz, warm, ohne Guru-Sprech (docs/brandbook/02-tonalitaet.md). Heikos
 * eigene Geschichte (2004 Insolvenz, gelbe Briefe, erste Meditation) darf
 * vorkommen; der Verlust von Lena (2020) nur in Mail 2 und nur zusammen mit
 * dem Telefonseelsorge-Hinweis im Fuß.
 *
 * Platzhalter im Text: {stufe} (1–7) und {stufenName} (z. B. „Autopilot") –
 * werden beim Versand ersetzt. Mails mit `requiresStufe` gehen
 * nur an Leads, die den Test gemacht haben (E-Book-Leads überspringen sie).
 */

export type SequenceMail = {
  /** Tag nach dem Anker (Bestätigung bzw. Kauf), an dem die Mail fällig ist. */
  day: number;
  subject: string;
  /** Vorschautext (Preheader) – erste Zeile im Posteingang. */
  preheader: string;
  /** Absätze des Fließtextes. */
  body: string[];
  /** Button-Text – ohne `ctaPath` wird kein Button gerendert (Antwort-Mails). */
  ctaLabel: string;
  /** Ziel (relativer Pfad); fehlt bei Mails, deren Schritt „antworten" ist. */
  ctaPath?: string;
  /** Nur an Leads mit gespeicherter Test-Stufe senden. */
  requiresStufe?: boolean;
  /** Zusätzlicher ruhiger Hinweis im Fuß (z. B. Telefonseelsorge). */
  footerNote?: string;
};

export type Sequence = {
  /** Schlüssel in lead_sequence_state.sequence */
  id: "test-lead" | "book-buyer";
  /** Grund im Fuß der Mail („Du erhältst diese Mail, weil …"). */
  aboGrund: string;
  steps: SequenceMail[];
};

export const TELEFONSEELSORGE_HINWEIS =
  "Wenn es dir gerade schwer geht: Die Telefonseelsorge ist rund um die Uhr erreichbar, kostenlos und anonym – 0800 111 0 111.";

export const testLeadSequence: Sequence = {
  id: "test-lead",
  aboGrund:
    "Du erhältst diese Mail, weil du den Bewusstseinstest gemacht bzw. das E-Book angefordert und deine Anmeldung bestätigt hast.",
  steps: [
    {
      day: 0,
      requiresStufe: true,
      subject: "Dein Ergebnis: Stufe {stufe} – {stufenName}",
      preheader: "Was diese Stufe bedeutet – und dein Gratis-Kapitel dazu.",
      body: [
        "danke fürs Bestätigen. Dein Ergebnis im Bewusstseinstest: Stufe {stufe} – {stufenName}.",
        "Das ist keine Note und kein Etikett. Es ist ein Foto von dem, wo du gerade stehst – und jede der sieben Stufen hat ihren eigenen nächsten Schritt. Auf der Ergebnisseite findest du, woran du diese Stufe erkennst, was dich dort festhält und was jetzt dran ist.",
        "Dazu bekommst du das Kapitel zu deiner Stufe als PDF geschenkt – ohne Login, einfach herunterladen. Lies es in Ruhe, am besten nicht am Handy zwischen zwei Nachrichten.",
        "In den nächsten Tagen schreibe ich dir noch ein paar Mal. Kurz, ehrlich, mit dem, was mir selbst geholfen hat. Wenn dich etwas trifft: Antworte einfach. Ich lese jede Mail.",
      ],
      ctaLabel: "Ergebnis und Kapitel lesen",
      ctaPath: "/bewusstseinstest/ergebnis/{stufe}",
    },
    {
      day: 1,
      subject: "Was, wenn es nie an dir lag?",
      preheader: "2004 stand ein Gerichtsvollzieher vor meiner Tür. Und ein Satz in meinem Kopf.",
      body: [
        "ich erzähle dir kurz, wie das bei mir angefangen hat. Nicht, weil meine Geschichte besonders ist – sondern weil du vielleicht deinen Satz darin erkennst.",
        "2004. Ich arbeitete in der Versicherungsbranche, die Firma lag in den letzten Zügen. Gleichzeitig zahlte der Mieter meiner Wohnung nicht mehr. Erst kamen die Mahnungen, dann die gelben Briefe, dann stand der Gerichtsvollzieher vor der Tür. Insolvenz. Und in meinem Kopf lief seit Monaten derselbe Satz: „Du hast versagt.“",
        "Der Satz fühlte sich an wie die Wahrheit. Nicht wie ein Gedanke – wie eine Tatsache, die mir nur noch niemand gesagt hatte. Ich habe ihn jahrelang geglaubt, ohne ihn je anzuschauen.",
        "Der Wendepunkt war winzig. Bei meiner ersten Meditation – Jucken am Arm, Gedankenkarussell, Zweifel – habe ich zum ersten Mal gemerkt: Ich höre diesen Satz. Ich bin nicht der Satz. Da ist jemand, der ihn hört. Und dieser Jemand war schon immer da – mit sechs, mit zwanzig, hinter der Tür mit dem Gerichtsvollzieher.",
        "Ich dachte lange, irgendwann wackelt nichts mehr. Dann kam der Juli 2020, und ich habe einen Menschen verloren, den ich geliebt habe. Es gab keine Technik, die das weggemacht hat. Aber zwischen dem, was passiert, und dem, was ich tue, war ein Raum – und in dem Raum hatte ich den Atem. Er hat nichts geheilt. Er hat mich bis zum Auto gebracht.",
        "Was ich dir damit sagen will: Es lag nie an deiner Disziplin. Der Satz, der dich festhält, ist ein Programm. Und Programme kann man sehen – deshalb kann man sie ändern.",
        "Meine Frage an dich, ganz ohne Hintergedanken: Welcher Satz läuft bei dir? Schreib ihn mir – ein einziger Satz reicht. Antworte einfach auf diese Mail.",
      ],
      ctaLabel: "Antworte einfach auf diese Mail",
      footerNote: TELEFONSEELSORGE_HINWEIS,
    },
    {
      day: 3,
      subject: "Der Satz, der alles einfärbt",
      preheader: "Kernüberzeugungen – und eine Übung, die zwei Minuten dauert.",
      body: [
        "in der letzten Mail habe ich dich nach deinem Satz gefragt. Falls du geantwortet hast: danke. Falls nicht: Der Satz ist trotzdem da.",
        "Psychologen nennen so etwas eine Kernüberzeugung. Das ist kein Gedanke unter vielen – es ist die Brille, durch die alle anderen Gedanken gesehen werden. „Ich bin nicht gut genug.“ „Ich muss es allein schaffen.“ „Auf mich kann man sich nicht verlassen.“ Wer so eine Brille trägt, sieht in jeder Situation den Beweis dafür. Ein Lob wird zum Zufall, eine Kritik zur Bestätigung.",
        "Bei mir hieß der Satz „Du hast versagt“. Ich habe ihn nicht 2004 erfunden. Ich habe ihn mit sechs zum ersten Mal gehört, als „zu langsam“. 2004 hat er nur endlich Beweise bekommen.",
        "Die Übung, die mir das Erste gegen diesen Satz gegeben hat, dauert zwei Minuten. Sprich deinen Satz einmal laut aus – so, wie er in dir klingt. Und dann sprich ihn noch einmal, mit vier Wörtern davor: „Ich bemerke den Gedanken, dass …“",
        "Hörst du den Unterschied? Beim zweiten Mal ist der Satz plötzlich ein Ding in deinem Kopf. Du kannst ihn anschauen. Er ist nicht mehr die Brille – er ist etwas, das du in der Hand hältst.",
        "Mach das heute dreimal, wenn der Satz auftaucht. Mehr nicht. Es geht nicht darum, ihn wegzumachen. Es geht darum, ihn zu sehen.",
      ],
      ctaLabel: "Übung: Ich bemerke den Gedanken, dass …",
    },
    {
      day: 5,
      subject: "90 Sekunden",
      preheader: "So lange dauert ein Gefühl wirklich. Der Rest ist Grübeln.",
      body: [
        "eine Zahl, die mich damals verblüfft hat: 90 Sekunden.",
        "Die Hirnforscherin Jill Bolte Taylor beschreibt, dass die körperliche Reaktion auf ein Gefühl – Adrenalin, Herzklopfen, der enge Hals – nach etwa 90 Sekunden durchgelaufen ist. Dann hat der Körper die Stoffe abgebaut. Alles, was danach kommt, ist nicht mehr das Gefühl. Es ist der Gedanke, der das Gefühl neu anwirft. Und dann noch einmal. Und noch einmal.",
        "Deshalb kann eine Kränkung von mittags um drei Uhr nachts noch wach halten: nicht weil das Gefühl so groß ist, sondern weil der Kopf es alle paar Minuten neu bestellt.",
        "Ich habe das lange nicht geglaubt. Bis ich es ausprobiert habe: Wenn es hochkommt, nicht erklären, nicht bekämpfen – nur im Körper spüren, wo es sitzt, und atmen. Neunzig Sekunden lang. Kein Trick, einfach Zeit geben. Die Welle kommt, und die Welle geht. Das Grübeln hält sie fest.",
        "Und jetzt die Frage, die ich dir wirklich stellen will: Welcher Gedanke hält dich nachts wach? Nicht das Gefühl – der Gedanke dahinter. Schreib ihn mir. Antworte auf diese Mail, ein Satz genügt.",
      ],
      ctaLabel: "Antworte: Welcher Gedanke hält dich nachts wach?",
    },
    {
      day: 7,
      subject: "Das Buch",
      preheader: "Warum ich es geschrieben habe – und drei Kapitel, die dich angehen könnten.",
      body: [
        "ich habe dir in den letzten Tagen von meinem Satz erzählt, von Kernüberzeugungen und von den 90 Sekunden. Das alles steht ausführlicher in meinem Buch „Werde Meister deiner Gedanken“. Heute erzähle ich dir kurz, warum es das gibt.",
        "Ich habe es geschrieben, weil ich zwanzig Jahre gebraucht habe, um zu verstehen, dass die lautesten Gedanken in meinem Kopf gar nicht meine waren. Der eine kam von meinem Vater. Der nächste aus der Schule. Und viele kommen bis heute jeden Tag von außen – aus Nachrichten, Werbung, dem Feed. Ich wollte ein Buch, das beides zeigt: die Programme in dir und die Programme, die dir jeden Tag neu eingespielt werden.",
        "Drei Kapitel, die dich angehen könnten: Kapitel 1 – „Du bist nicht jeder Gedanke, den du denkst“. Kapitel 19 – „Wer denkt hier eigentlich?“. Kapitel 21 – „Framing – wie ein einziges Wort deine Wahrnehmung verändert“.",
        "Fünf Teile, 24 Kapitel, in klarer Sprache und ohne Guru-Ton. Als PDF für 29,90 Euro, gedruckt für 39,90 Euro. Auf der Buchseite findest du das komplette Inhaltsverzeichnis, damit du vorher weißt, was du bekommst.",
        "Wenn du lieber erst weiter mitliest: völlig in Ordnung. Die Mails hören nicht auf, nur weil du nichts kaufst.",
      ],
      ctaLabel: "Das Buch ansehen",
      ctaPath: "/buch",
    },
    {
      day: 9,
      subject: "Was im Mitgliederbereich passiert",
      preheader: "Ein ehrlicher Rundgang – und für wen es nichts ist.",
      body: [
        "viele fragen mich, was „Mitgliedschaft“ bei mir eigentlich heißt. Also ein Rundgang, so ehrlich wie möglich.",
        "Du fängst bei deiner Stufe an – der Bewusstseinstest zeigt sie dir in drei Minuten, falls du ihn noch nicht gemacht hast. Dort wartet keine Vorlesung, sondern eine Übung für diese Woche, ein Übungsblatt zum Ausdrucken und die Lektion als PDF. Eine Übung. Nicht zehn.",
        "Dann das Journal: ein Ort, an dem du deinen Satz aufschreibst, wenn er kommt – mit Datum. Nach zwei Wochen siehst du zum ersten Mal ein Muster, statt es nur zu fühlen.",
        "Und der Begleiter: ein KI-Gespräch, das die Methoden der sieben Stufen kennt und dir abends um elf eine Frage zurückstellt, wenn ich nicht erreichbar bin. Kein Therapeut, kein Orakel – ein ruhiger Gesprächspartner, der nachfragt statt zu urteilen.",
        "Für wen es nichts ist: Wenn du eine schnelle Technik suchst, die nach drei Tagen alles löst – dann nicht. Wenn du gerade in einer akuten Krise steckst, brauchst du Menschen, nicht eine Website. Und wenn du keine zehn Minuten am Tag hast, wird es dich eher belasten als tragen.",
        "Für alle anderen: Du kannst die Mitgliedschaft sieben Tage testen. Wenn es nichts für dich ist, hörst du einfach auf – ohne Diskussion.",
      ],
      ctaLabel: "7-Tage-Test starten",
      ctaPath: "/mitgliedschaft",
    },
    {
      day: 11,
      subject: "Letzte Mail dieser Reihe",
      preheader: "Drei Einwände, ehrlich beantwortet – und was danach kommt.",
      body: [
        "das ist die letzte Mail dieser Reihe. Danach schreibe ich dir nur noch einmal pro Woche einen kurzen Impuls – und du kannst dich jederzeit mit einem Klick abmelden.",
        "Kurz zusammengefasst: Nicht jeder Gedanke, den du denkst, ist von dir. Der Satz, der dich festhält, ist ein Programm, kein Urteil. Ein Gefühl dauert 90 Sekunden – der Rest ist Grübeln. Und zwischen Reiz und Reaktion liegt ein Raum, den du üben kannst.",
        "Drei Einwände, die ich oft höre. „Ich habe keine Zeit.“ – Die Übungen dauern zehn Minuten. Wenn du täglich 40 Minuten grübelst, ist das eine Zeitersparnis. „Das klingt nach Esoterik.“ – Ich war 2004 in der Versicherungsbranche und bin bis heute allergisch gegen Guru-Sprech. Was ich zeige, ist Beobachtung, Wiederholung und ein bisschen Hirnforschung. „Ich habe schon alles probiert.“ – Wahrscheinlich hast du versucht, Gedanken zu bekämpfen. Das ist etwas anderes, als aufzuhören, ihnen zu glauben.",
        "Wenn du es ausprobieren willst: sieben Tage, dann entscheidest du. Wenn nicht: auch gut. Die Impulse kommen trotzdem, und du kannst mir jederzeit antworten.",
        "Danke, dass du bis hierher gelesen hast. Das ist mehr, als die meisten Gedanken je bekommen.",
      ],
      ctaLabel: "Mitgliedschaft 7 Tage testen",
      ctaPath: "/mitgliedschaft",
    },
  ],
};

export const bookBuyerSequence: Sequence = {
  id: "book-buyer",
  aboGrund:
    "Du erhältst diese Mail, weil du das Buch „Werde Meister deiner Gedanken“ gekauft hast. Sie ergänzt deinen Kauf um Hinweise zu passenden Angeboten.",
  steps: [
    {
      day: 3,
      subject: "Wie liest sich das Buch bei dir?",
      preheader: "Eine Frage – und ein Tipp fürs Lesen.",
      body: [
        "danke, dass du dir das Buch geholt hast. Ich hoffe, du bist schon ein paar Seiten weit.",
        "Ein Tipp, der mir selbst beim Schreiben klar wurde: Lies es nicht wie einen Roman. Wenn dich ein Satz trifft, hör auf zu lesen. Leg das Buch weg. Der Satz arbeitet dann in dir weiter – das ist der eigentliche Inhalt.",
        "Und eine Frage, ohne Hintergedanken: Welches Kapitel hat dich bisher am meisten erwischt? Antworte mir einfach – ich lese jede Mail und antworte, wenn ich kann.",
      ],
      ctaLabel: "Antworte einfach auf diese Mail",
    },
    {
      day: 10,
      subject: "Vom Lesen ins Üben",
      preheader: "Das Buch zeigt den Weg. Die Mitgliedschaft geht ihn mit dir.",
      body: [
        "das Buch erklärt, woher deine Gedanken kommen – die eigenen und die eingespielten. Was es nicht kann: dich beim Üben begleiten. Wissen verändert nichts. Wiederholung verändert.",
        "Dafür gibt es den Mitgliederbereich: die sieben Stufen als Weg, mit je einer Übung für die Woche, einem Journal für deinen Satz und einem KI-Begleiter, der nachfragt, wenn ich nicht erreichbar bin. Du fängst dort an, wo du gerade stehst – nicht bei Kapitel 1.",
        "Als Leserin oder Leser weißt du schon, worum es geht. Deshalb ist der Einstieg für dich kurz: Bewusstseinstest, deine Stufe, erste Übung. Zehn Minuten am Tag reichen.",
      ],
      ctaLabel: "Mitgliederbereich ansehen",
      ctaPath: "/mitgliedschaft",
    },
    {
      day: 21,
      subject: "Eine Einladung",
      preheader: "Sieben Tage testen – ohne Diskussion, wenn es nichts für dich ist.",
      body: [
        "drei Wochen ist dein Kauf jetzt her. Vielleicht hast du das Buch durch, vielleicht liegt es auf dem Nachttisch. Beides ist in Ordnung.",
        "Ich lade dich ein, den nächsten Schritt sieben Tage lang auszuprobieren: die Mitgliedschaft mit den sieben Stufen, den Übungen und dem Begleiter. Wenn es dir nichts gibt, hörst du einfach wieder auf.",
        "Danach schreibe ich dir nur noch gelegentlich einen kurzen Impuls – und du kannst dich jederzeit mit einem Klick abmelden. Danke, dass du das Buch gelesen hast.",
      ],
      ctaLabel: "Mitgliedschaft 7 Tage testen",
      ctaPath: "/mitgliedschaft",
    },
  ],
};

export const sequences: Sequence[] = [testLeadSequence, bookBuyerSequence];

/** Sequenz per Schlüssel nachschlagen. */
export function getSequence(id: string): Sequence | undefined {
  return sequences.find((s) => s.id === id);
}

/** Letzter Tag der Sequenz – danach ist sie abgeschlossen. */
export function sequenceLength(seq: Sequence): number {
  return Math.max(...seq.steps.map((s) => s.day));
}

/** Platzhalter ({stufe}, {stufenName}) in einem Text ersetzen. */
export function fillPlaceholders(
  text: string,
  ctx: { stufe?: number | null; stufenName?: string | null },
): string {
  return text
    .replace(/\{stufe\}/g, ctx.stufe ? String(ctx.stufe) : "")
    .replace(/\{stufenName\}/g, ctx.stufenName ?? "");
}
