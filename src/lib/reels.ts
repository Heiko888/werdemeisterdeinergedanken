/**
 * Reels-Produktion (Kurzvideos für Instagram/TikTok/Shorts).
 *
 * Die ausformulierten Skripte liegen in `docs/skripte/reels/`. Hier steht der
 * Produktions-Status je Reel fürs Marketing-Cockpit: sobald ein Reel gedreht
 * (bzw. veröffentlicht) ist, `filmed` auf `true` setzen.
 *
 * Neufassung 2026-09-18: Die Serien „Stufen“, „Vertiefungen“ und
 * „Selbstverteidigung“ wurden nach dem Rezept „Emotionale Aufladung“ neu
 * geschrieben (docs/audit/kampagnen-check-2026-09-18.md). Jedes Reel trägt
 * jetzt Folgen-Nummer, Format, Primär-Hook + zwei Alternativen und Felder für
 * die Messwerte des After-Action Reviews. CTA-Regel für alle Serien: nur in
 * Caption/angepinntem Kommentar („Schreib TEST …“), nie im Video.
 */
export type ReelFormat = "A" | "B" | "C";

export type ReelMetrics = {
  /** 3-Sekunden-Haltequote in % (Ziel > 60) */
  hold3s?: number;
  /** Durchschauquote in % (Ziel > 40) */
  watchThrough?: number;
  /** Saves + Shares je 1.000 Views */
  savesPer1k?: number;
  /** Follows je 1.000 Views */
  followsPer1k?: number;
  /** Anzahl TEST-Kommentare (Kommentar-Keyword → Bewusstseinstest) */
  testComments?: number;
};

export type Reel = {
  /** Folgen-Nummer innerhalb der Serie (steht im Cover: „#3“) */
  nr?: number;
  topic: string;
  /** Bei mehreren Reels pro Thema: A / B / C bzw. Aha / Werkzeug */
  variant?: string;
  /**
   * Produktionsformat (Neufassung 2026-09):
   * A = Talking Head mit Szene · B = Green Screen vor Beweis-Bild · C = Text-first Fakt
   */
  format?: ReelFormat;
  /** Primär-Hook (wörtlich; volles Skript in docs/skripte/reels) */
  hook?: string;
  /** Zwei Alternativ-Hooks; alle drei werden mit identischem Body gedreht */
  hookAlternatives?: string[];
  /** Welche Hook-Variante nach dem A/B-Test gewonnen hat (0 = Primär, 1/2 = Alternativen) */
  winningHook?: number;
  /** Messwerte aus dem After-Action Review (2 Wochen nach Veröffentlichung) */
  metrics?: ReelMetrics;
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
    label: "Wessen Gedanke ist das? (Mentale Selbstverteidigung)",
    script: "docs/skripte/reels/mentale-selbstverteidigung.md",
    reels: [
      { nr: 1, topic: "Framing", format: "B", hook: "Zwei Sätze. Gleiche Zahl. Und dein Bauch entscheidet anders.", hookAlternatives: ["Lies beide. Merkst du, wie sich dein Kopf bewegt?", "Jemand hat das Wort für dich ausgesucht – und damit dein Gefühl."], filmed: false },
      { nr: 2, topic: "Etiketten", format: "B", hook: "Derselbe Satz. Einmal hörst du zu, einmal weg. Nur wegen eines Wortes.", hookAlternatives: ["Ein Etikett beendet das Prüfen, bevor es anfängt.", "Zieh das Wort ab. Überzeugt der Satz dann noch?"], filmed: false },
      { nr: 3, topic: "Algorithmen", format: "B", hook: "Dein Feed zeigt dir nicht die Welt. Er zeigt dir deine schlechteste Woche.", hookAlternatives: ["Du siehst online nicht die Welt. Du siehst dich selbst – verstärkt.", "Nach drei Wochen sieht die Welt aus wie dein miesester Tag."], filmed: false },
      { nr: 4, topic: "Werbung", format: "B", hook: "Vor dieser Anzeige hat dir nichts gefehlt.", hookAlternatives: ["Werbung verkauft dir kein Produkt. Sie verkauft dir ein Loch.", "Das Ziehen im Bauch ist gemietet."], filmed: false },
      { nr: 5, topic: "Wiederholung", format: "B", hook: "Beim ersten Mal warst du skeptisch. Beim zehnten Mal klingt es wahr. Nichts hat sich geändert.", hookAlternatives: ["Vertrautheit fühlt sich an wie Wahrheit. Dein Gehirn kann die beiden nicht unterscheiden.", "Zehn Accounts, eine Quelle. Das ist kein Konsens."], filmed: false },
      { nr: 6, topic: "Angst", format: "B", hook: "Ein ängstlicher Mensch ist der einfachste, den man lenken kann. Ich war jahrelang leicht zu lenken.", hookAlternatives: ["Erst die Bedrohung, dann der Schutz. Das Muster ist immer gleich.", "Im Alarm denkst du in Schwarz-Weiß. Und kaufst, was weiß ist."], filmed: false },
      { nr: 7, topic: "Schweigespirale", format: "B", hook: "Die Mehrheit, vor der du dich fürchtest, gibt es oft gar nicht.", hookAlternatives: ["Ich hab im Meeting geschwiegen. Danach kamen drei Leute und sagten: Ich auch.", "Laut ist nicht Mehrheit. Laut ist nur laut."], filmed: false },
      { nr: 8, topic: "Autorität", format: "B", hook: "Derselbe Satz klingt wahrer mit einem Titel davor. Ich hab es getestet.", hookAlternatives: ["Vertrauen heißt nicht: jeden Satz glauben.", "Spricht der Experte aus seinem Fach – oder darüber hinaus?"], filmed: false },
      { nr: 9, topic: "Propaganda ohne Lüge", format: "B", hook: "Man kann dich mit lauter wahren Fakten komplett in die Irre führen. Nur durch Auswahl.", hookAlternatives: ["Propaganda erkennst du nicht an Parolen. Sondern an drei leisen Hebeln.", "Woher hab ich das – geprüft oder nur oft gehört?"], filmed: false },
      { nr: 10, topic: "Agenda", format: "B", hook: "Medien müssen dir nicht sagen, was du denken sollst. Nur, worüber.", hookAlternatives: ["Was jeden Tag vorkommt, wirkt wichtig. Was fehlt, existiert nicht.", "Welches wichtige Thema kommt hier gar nicht vor?"], filmed: false },
      { nr: 11, topic: "Ablenkung", format: "B", hook: "Man muss dir die Wahrheit nicht verbergen. Es reicht, dich müde zu machen.", hookAlternatives: ["Kaum bist du über das eine empört, kommt das nächste.", "Betrifft das mein Leben – oder nur meine Erregung?"], filmed: false },
      { nr: 12, topic: "Dissonanz", format: "B", hook: "Wir lehnen Informationen nicht ab, weil sie falsch sind. Sondern weil sie wehtun.", hookAlternatives: ["Der bequemste Ausweg: die Quelle abwerten. Dann muss man den Inhalt nicht lesen.", "Wann hast du zuletzt zugegeben, dich geirrt zu haben?"], filmed: false },
      { nr: 13, topic: "Normalisierung", format: "B", hook: "Was gestern undenkbar war, ist heute normal. In fünf Schritten, jeder zu klein zum Aufregen.", hookAlternatives: ["‚Das war doch schon immer so.‘ – Stimmt fast nie.", "Deine erste, wache Reaktion ist die richtige. Die Gewöhnung überschreibt sie."], filmed: false },
      { nr: 14, topic: "Bilder", format: "B", hook: "Ein Bild fühlt sich an wie ein Beweis. Es ist ein Ausschnitt. Schau dir denselben Moment zweimal an.", hookAlternatives: ["Der Rand des Bildes ist die Botschaft. Wer hat ihn gesetzt?", "Ton weg, dann urteilen."], filmed: false },
      { nr: 15, topic: "Identität", format: "B", hook: "Hast du eine Meinung – oder hat die Meinung längst dich?", hookAlternatives: ["Kritik an der Meinung fühlt sich an wie ein Angriff auf mich. Das ist der Moment, in dem sie mich hat.", "Eine Meinung ist ein Werkzeug. Kein Körperteil."], filmed: false },
      { nr: 16, topic: "Daueralarm", format: "B", hook: "Dein Gehirn ist im Daueralarm. Und im Alarm bist du am leichtesten zu lenken.", hookAlternatives: ["Der Reiz stresst dich – und zur Beruhigung suchst du den nächsten Reiz.", "Der Ausweg ist kein Input. Er ist Ruhe."], filmed: false },
    ],
  },
  {
    key: "stufen",
    label: "Der Satz, der dich festhält – Die 7 Stufen",
    script: "docs/skripte/reels/stufen.md",
    reels: [
      { nr: 1, topic: "Drei Entscheidungen", format: "A", hook: "Ich hab einen Tag lang gezählt, wie oft ich wirklich entscheide. Drei.", hookAlternatives: ["Dein Tag fühlt sich an wie deiner. Ist er aber nicht.", "Die Hand war schneller als ich – jeden Morgen."], filmed: false },
      { nr: 2, topic: "„So bin ich eben“", format: "A", hook: "‚So bin ich eben.‘ Ich hab den Satz gesagt wie eine Diagnose.", hookAlternatives: ["Mein Charakter war zur Hälfte geliehen.", "Der Satz, der mich 20 Jahre bequem gehalten hat."], filmed: false },
      { nr: 3, topic: "Der Autopilot-Check", format: "A", hook: "Ein Wort, drei Sekunden, und der Autopilot geht aus.", hookAlternatives: ["Ich hab ‚Stopp‘ gesagt. Laut. Im Auto.", "Die Übung, die ich an der Ampel mache."], filmed: false },
      { nr: 4, topic: "Im Stau", format: "A", hook: "Ich saß im Stau, hab mich über meinen Chef aufgeregt – und dann war da ein zweiter Satz.", hookAlternatives: ["Der Moment, in dem ich mich beim Denken erwischt hab.", "Kein Blitz. Kein Licht. Nur: ‚Ah, ich denke gerade.‘"], filmed: false },
      { nr: 5, topic: "Wer hört zu?", format: "A", hook: "Du kannst deine Gedanken hören. Also – wer hört da zu?", hookAlternatives: ["Der, der deine Gedanken hört, war schon mit sechs da.", "Die Frage, die mich 2004 aus dem Loch geholt hat."], filmed: false },
      { nr: 6, topic: "Drei Atemzüge", format: "A", hook: "Meine allererste Übung: drei Atemzüge an der Haustür. Ich fand sie lächerlich.", hookAlternatives: ["Die Übung, die keine Zeit kostet und trotzdem alles ändert.", "Wer nimmt das hier gerade wahr?"], filmed: false },
      { nr: 7, topic: "Mitgeschwommen", format: "A", hook: "Eine Sorge kam vorbei – und zwei Stunden später wusste ich nicht mehr, wo ich war.", hookAlternatives: ["Ich bin in jeden Gedanken reingesprungen. Jeden.", "Der Unterschied zwischen Ufer und Wasser."], filmed: false },
      { nr: 8, topic: "Ein Wort dazwischen", format: "A", hook: "‚Ich bin ein Versager.‘ Der Satz fühlt sich nicht an wie ein Gedanke.", hookAlternatives: ["Ein einziges Wort hat mich aus dem Griff eines Gedankens geholt.", "Die Brille, durch die ich sechs Jahre geschaut hab."], filmed: false },
      { nr: 9, topic: "Etiketten", format: "A", hook: "Zehn Minuten, ein Zettel, und mein Gedankenchaos hatte plötzlich vier Sorten.", hookAlternatives: ["So hab ich Ordnung in meinen Kopf gekriegt – mit einem Wort pro Gedanke.", "Planen. Sorgen. Bewerten. Erinnern. Mehr war da nicht."], filmed: false },
      { nr: 10, topic: "Verstehen reicht nicht", format: "A", hook: "Ich konnte jedes meiner Muster erklären. Geändert hat sich nichts.", hookAlternatives: ["Jahrelang dachte ich: Wenn ich es verstehe, ist es weg.", "Mein Kopf war der beste Anwalt meiner Gefühle."], filmed: false },
      { nr: 11, topic: "90 Sekunden", format: "A", hook: "Wut dauert 90 Sekunden. Alles danach ist eine Geschichte, die du dir erzählst.", hookAlternatives: ["Ich hab die Uhr laufen lassen, als die Nachricht kam.", "Die Welle trägt dich. Sie verschluckt dich nicht."], filmed: false },
      { nr: 12, topic: "Du darfst da sein", format: "A", hook: "Diesen einen Satz sag ich zu jedem Gefühl, das nicht gehen will.", hookAlternatives: ["Ich hab aufgehört, gegen meine Angst zu atmen – und angefangen, zu ihr hin.", "Was Raum kriegt, zieht durch."], filmed: false },
      { nr: 13, topic: "Trampelpfad", format: "A", hook: "Was du oft denkst, wird zur Straße in deinem Kopf. Das ist wörtlich gemeint.", hookAlternatives: ["Ich hab sechs Jahre lang dieselbe Autobahn gebaut: ‚Du hast versagt.‘", "Dein Gehirn baut sich nach dem um, was du fütterst."], filmed: false },
      { nr: 14, topic: "Der Spiegel", format: "A", hook: "‚Ich bin voller Selbstvertrauen.‘ Vor dem Spiegel. Und alles in mir hat gelacht.", hookAlternatives: ["Warum Affirmationen bei mir nie funktioniert haben.", "Der kleinere Satz, der gewirkt hat."], filmed: false },
      { nr: 15, topic: "Drei Minuten vor dem Handy", format: "A", hook: "Die ersten drei Minuten nach dem Aufwachen entscheiden, wem der Tag gehört.", hookAlternatives: ["Was ich mache, bevor ich das Handy anfasse.", "Ein Satz, eine Handlung, vor dem ersten Scrollen."], filmed: false },
      { nr: 16, topic: "Müde ohne Grund", format: "A", hook: "Ich war ständig müde. Blutwerte okay, Schlaf okay. Und trotzdem leer.", hookAlternatives: ["Der stille Widerspruch, der mir jeden Tag die Kraft gefressen hat.", "Kopf wollte A, Bauch wollte B, gemacht hab ich C."], filmed: false },
      { nr: 17, topic: "Guter Diener, schlechter Chef", format: "A", hook: "Mein Kopf hat mir ausgerechnet, was ich will. Nur nie, was ich brauche.", hookAlternatives: ["Der Verstand ist ein brillanter Diener. Und ein miserabler Chef.", "Ich hab dem Bauch 20 Jahre nicht geglaubt."], filmed: false },
      { nr: 18, topic: "Drei Fragen", format: "A", hook: "Drei Fragen, ein Zettel – und ich weiß, wo die Spannung sitzt.", hookAlternatives: ["Der Check, den ich vor jeder Entscheidung mache.", "Was denkt mein Kopf? Was fühlt mein Herz? Was tue ich wirklich?"], filmed: false },
      { nr: 19, topic: "Es wackelt noch", format: "A", hook: "Ich dachte, irgendwann wackelt nichts mehr. Dann kam der Juli 2020.", hookAlternatives: ["Meisterschaft ist kein Zustand ohne Sturm.", "Sechzehn Jahre Übung. Und dann klingelt das Handy."], filmed: false },
      { nr: 20, topic: "Wochen, Tage, Minuten", format: "A", hook: "Niemand ist für immer Meister. Ich auch nicht. Das ist die beste Nachricht auf dem ganzen Weg.", hookAlternatives: ["Mich werfen Tage immer noch aus der Bahn.", "Früher Wochen. Dann Tage. Heute manchmal Minuten."], filmed: false },
      { nr: 21, topic: "Wer will ich jetzt sein?", format: "A", hook: "Wenn mich was triggert, stell ich mir genau eine Frage. Aber erst nach dem Atemzug.", hookAlternatives: ["‚Da ist Wut‘ statt ‚ich bin wütend‘ – drei Wörter, die alles drehen.", "Die Frage, mit der sich der Kreis zur ersten Stufe schließt."], filmed: false },
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
    label: "Der Satz, der dich festhält – Vertiefungen",
    script: "docs/skripte/reels/vertiefungen.md",
    reels: [
      { nr: 1, topic: "Automatische Gedanken", variant: "Aha", format: "A", hook: "Zwei Leute, dieselbe Absage. Einer weint, einer geht essen.", hookAlternatives: ["Nicht die Absage hat mich fertiggemacht. Ein Satz dazwischen.", "‚Typisch ich.‘ – der Kommentar, der den ganzen Tag mitläuft."], filmed: false },
      { nr: 2, topic: "Automatische Gedanken", variant: "Werkzeug", format: "A", hook: "Ich behandle meinen schlimmsten Gedanken jetzt wie eine Behauptung vor Gericht.", hookAlternatives: ["Drei Fragen, und der Gedanke verliert vor Gericht.", "Würdest du das einem Freund sagen? Dann war es nie fair."], filmed: false },
      { nr: 3, topic: "Konditionierung", variant: "Aha", format: "A", hook: "Ein bestimmter Tonfall, und ich bin wieder neun. Obwohl nichts passiert ist.", hookAlternatives: ["Deine Überreaktion ist keine Charakterschwäche. Sie ist gelernt.", "Die Glocke klingelt, und mein Körper reagiert, bevor ich es merke."], filmed: false },
      { nr: 4, topic: "Konditionierung", variant: "Werkzeug", format: "A", hook: "Ich hab meine drei Auslöser aufgeschrieben. Alle drei waren älter als dreißig Jahre.", hookAlternatives: ["Finde den einen Reiz, der dich immer wieder kapert.", "Die Landkarte meiner Überreaktionen passt auf einen Bierdeckel."], filmed: false },
      { nr: 5, topic: "Kognitive Verzerrungen", variant: "Aha", format: "A", hook: "‚Ich fühl mich wie ein Versager, also bin ich einer.‘ Klingt logisch. Ist ein Denkfehler.", hookAlternatives: ["Mein düsterstes Denken hat nur fünf Muster. Ich kenne sie jetzt alle.", "Nicht jeder Gedanke, der überzeugend klingt, ist wahr."], filmed: false },
      { nr: 6, topic: "Kognitive Verzerrungen", variant: "Werkzeug", format: "A", hook: "Ich gebe meinen dunklen Gedanken jetzt Namen. Das reicht meistens schon.", hookAlternatives: ["Ah, das ist gerade Katastrophisieren. – Drei Wörter, und der Gedanke ist ein Muster, keine Wahrheit.", "Meine Denkfehler-Checkliste passt auf einen Post-it."], filmed: false },
      { nr: 7, topic: "Kernüberzeugungen", variant: "Aha", format: "A", hook: "Unter tausend Gedanken liegen bei mir genau zwei Sätze. Beide von 1985.", hookAlternatives: ["Lob hab ich als Zufall verbucht. Kritik als Beweis. Zwanzig Jahre lang.", "Dein Gehirn sucht nur, was den alten Satz bestätigt."], filmed: false },
      { nr: 8, topic: "Kernüberzeugungen", variant: "Werkzeug", format: "A", hook: "Vier Mal dieselbe Frage, und ich stand vor dem Satz, der mein Leben einfärbt.", hookAlternatives: ["Die Abwärts-Frage: ‚Und wenn das stimmt – was sagt das über mich?‘", "Eine Woche Gegenbeweise sammeln. Auch die winzigen."], filmed: false },
      { nr: 9, topic: "Innerer Kritiker", variant: "Aha", format: "A", hook: "Die strengste Stimme in meinem Kopf hat die Stimme meines Vaters. Sie will mich beschützen.", hookAlternatives: ["‚Das war peinlich.‘ – Wer sagt das da eigentlich?", "Ich hab zwanzig Jahre gegen meinen Kritiker gekämpft. Er wurde nur lauter."], filmed: false },
      { nr: 10, topic: "Innerer Kritiker", variant: "Werkzeug", format: "A", hook: "Ich hab meinem inneren Kritiker einen Namen gegeben. Seitdem reden wir.", hookAlternatives: ["Wovor willst du mich eigentlich schützen? – Die Frage, die ihn leiser macht.", "Die Mentor-Antwort auf den härtesten Satz."], filmed: false },
      { nr: 11, topic: "Neuroplastizität", variant: "Aha", format: "A", hook: "Veränderung ist kein Wunschdenken. Sie ist Biologie. Ich hab sie im Kopf gebaut.", hookAlternatives: ["Dein Gehirn ist nicht fertig. Es baut jede Nacht um – nach dem, was du tagsüber gedacht hast.", "Was du nicht mehr benutzt, wächst zu."], filmed: false },
      { nr: 12, topic: "Neuroplastizität", variant: "Werkzeug", format: "A", hook: "Zwei Minuten nach dem Zähneputzen. Das ist meine ganze Baustelle.", hookAlternatives: ["Eine Bahn. Eine Gelegenheit. Ein Gefühl. Jeden Tag.", "Einmal verstanden ist nicht schon verändert."], filmed: false },
      { nr: 13, topic: "Reiz-Reaktions-Lücke", variant: "Aha", format: "A", hook: "Der Kollege sagt etwas Spitzes, und ich schieße zurück, bevor ich denke. Da ist kein Zwischenraum. Dachte ich.", hookAlternatives: ["Zwischen dem, was passiert, und dem, was du tust, liegt dein ganzer Freiraum.", "Im Büro reagierst du wie vor einem Raubtier."], filmed: false },
      { nr: 14, topic: "Reiz-Reaktions-Lücke", variant: "Werkzeug", format: "A", hook: "Ein Atemzug. Das ist der Keil, den ich zwischen ihn und mich schiebe.", hookAlternatives: ["Abends spiel ich die Szene in Zeitlupe nach. Da finde ich den Spalt.", "Wie will ich hier antworten? – Die Frage nach dem Atemzug."], filmed: false },
      { nr: 15, topic: "Grübeln", variant: "Aha", format: "A", hook: "3 Uhr nachts, zwanzigste Runde. Es fühlt sich an wie Problemlösen. Ist es nicht.", hookAlternatives: ["Grübeln ist kein Nachdenken. Es ist eine Schleife mit Verantwortungsgefühl.", "Bin ich der Antwort näher gekommen? – Die Frage, die ich um drei vergesse."], filmed: false },
      { nr: 16, topic: "Grübeln", variant: "Werkzeug", format: "A", hook: "‚Löse ich gerade – oder wiederhole ich?‘ Eine Frage, und das Karussell steht.", hookAlternatives: ["Fünf Dinge, die ich sehe. So steige ich um drei Uhr aus.", "Ein nächster Schritt auf den Zettel, und das Thema darf schlafen."], filmed: false },
      { nr: 17, topic: "Emotionsregulation", variant: "Aha", format: "A", hook: "Wegdrücken oder überflutet werden – ich kannte zwanzig Jahre nur diese zwei.", hookAlternatives: ["Es gibt einen dritten Weg. Er heißt: aushalten, bis es kippt.", "Die Welle trägt dich. Ich hab es nachgemessen."], filmed: false },
      { nr: 18, topic: "Emotionsregulation", variant: "Werkzeug", format: "A", hook: "Ein Name, eine Stelle im Körper, ein langer Atem. Dann 90 Sekunden nichts.", hookAlternatives: ["‚Da ist Angst.‘ – Drei Wörter, und die Welle wird messbar kleiner.", "Im Sturm keine Entscheidung. Nach 90 Sekunden die eine Frage."], filmed: false },
      { nr: 19, topic: "Selbstmitgefühl", variant: "Aha", format: "A", hook: "Ich dachte, Härte gegen mich wäre mein Motor. Sie war meine Bremse.", hookAlternatives: ["Du wirst nicht besser, indem du hart mit dir bist. Die Forschung sagt das Gegenteil.", "Selbstmitgefühl ist kein Weichspüler. Es ist der Boden, auf dem du wieder aufstehst."], filmed: false },
      { nr: 20, topic: "Selbstmitgefühl", variant: "Werkzeug", format: "A", hook: "Ich hab mir gesagt, was ich meinem besten Freund gesagt hätte. Und musste weinen.", hookAlternatives: ["Hand auf die Brust, drei Sätze. Ich fand es peinlich. Es hat gewirkt.", "Zu anderen bin ich wärmer als zu mir. Das ist die ganze Übung."], filmed: false },
      { nr: 21, topic: "Werte & Ziele", variant: "Aha", format: "A", hook: "Ich hab das Ziel erreicht, das ich fünf Jahre gejagt hab. Und stand leer in der Wohnung.", hookAlternatives: ["Ein Ziel ist ein Punkt, den du abhakst. Ein Wert ist eine Richtung, die du lebst.", "Du kannst jedes Ziel erreichen und dich trotzdem leer fühlen."], filmed: false },
      { nr: 22, topic: "Werte & Ziele", variant: "Werkzeug", format: "A", hook: "Zehn Wörter, dann streichen, bis drei bleiben. Das sind deine.", hookAlternatives: ["Der stimmigste Moment deines Jahres verrät dir, was dir wichtig ist.", "Ein Wert, der nicht in einer Handlung endet, ist Deko."], filmed: false },
      { nr: 23, topic: "Körper & Muster", variant: "Aha", format: "A", hook: "Mein Nacken wusste vor mir, dass etwas nicht stimmt. Ich hab ihn drei Jahre ignoriert.", hookAlternatives: ["Dein Körper unterscheidet nicht zwischen einem Tiger und einem sorgenvollen Gedanken.", "Stress sitzt nicht im Kopf. Er sitzt im Kiefer."], filmed: false },
      { nr: 24, topic: "Körper & Muster", variant: "Werkzeug", format: "A", hook: "Kiefer, Nacken, Bauch – dreimal am Tag scanne ich, wo der Stress gerade wohnt.", hookAlternatives: ["Ein bis vier, aus bis acht. Mehr braucht dein Nervensystem nicht, um zu glauben, dass es sicher ist.", "Ich notiere, bei welchem Gedanken mein Bauch zumacht. Das sind meine Warnsignale."], filmed: false },
      { nr: 25, topic: "Integration", variant: "Aha", format: "A", hook: "Ich hatte alles verstanden. Und im Streit mit [Name] war ich wieder genau wie früher.", hookAlternatives: ["Wissen ist nicht Können. Der Streit am Küchentisch ist die Prüfung.", "Meisterschaft ist nicht: nie mehr fallen. Sondern: schneller zurück."], filmed: false },
      { nr: 26, topic: "Integration", variant: "Werkzeug", format: "A", hook: "Erklär es jemandem, den du liebst. Dann merkst du, was du wirklich lebst.", hookAlternatives: ["Drei Sätze, ohne Fachbegriffe. Dann alles streichen, was du nicht lebst.", "Was übrig bleibt, ist dein Fundament. Bei mir waren es zwei Sätze."], filmed: false },
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
