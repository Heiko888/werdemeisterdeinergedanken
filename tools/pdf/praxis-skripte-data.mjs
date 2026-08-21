/**
 * Sprecherskripte für die geführten Praxis-Aufnahmen („Praxis mit Stimme“).
 *
 * Grundlage sind die 13 Übungen aus src/lib/practices.ts – hier aber in
 * GESPROCHENER Form: aus den knappen Anleitungs-Schritten wurde eine warme,
 * langsam vorgetragene Führung mit eingezeichneten Pausen. Das ist ein Entwurf
 * in Heikos Ton; er redigiert ihn, bevor eingesprochen wird.
 *
 * Segment-Typen:
 *   { typ: "text",  inhalt: "…" }   gesprochener Text
 *   { typ: "pause", inhalt: "ca. 60 Sek" }   Stille (Länge als Hinweis)
 *   { typ: "regie", inhalt: "…" }   Regie-/Sprechhinweis, wird NICHT gesprochen
 *
 * Das `mp3`-Feld ist der Ziel-Dateiname – so passt die fertige Aufnahme direkt
 * ins `audio`-Feld der jeweiligen Übung (z. B. /praxis/atembeobachtung.mp3).
 */

export const skripte = [
  {
    slug: "atembeobachtung",
    titel: "Atembeobachtung",
    kategorie: "Meditationen",
    dauer: "5–10 Minuten",
    mp3: "atembeobachtung.mp3",
    worum:
      "Die Basis-Meditation. Ruhig, freundlich, ohne Anspruch. Grundton für alle weiteren Aufnahmen.",
    segmente: [
      { typ: "regie", inhalt: "Warm und langsam sprechen. Selbst ein paar Atemzüge nehmen, bevor du beginnst." },
      { typ: "text", inhalt: "Schön, dass du dir diese Zeit nimmst. Für die nächsten Minuten gibt es nichts zu leisten und nichts zu erreichen. Nur da sein – und dem Atem zusehen." },
      { typ: "text", inhalt: "Setz dich aufrecht und bequem hin. Die Augen darfst du schließen, oder du senkst den Blick weich zu Boden." },
      { typ: "pause", inhalt: "ca. 10 Sek" },
      { typ: "text", inhalt: "Nimm ein paar tiefere Atemzüge. Und dann lass den Atem einfach in seinen eigenen, natürlichen Rhythmus fallen. Du musst nichts steuern." },
      { typ: "pause", inhalt: "ca. 20 Sek" },
      { typ: "text", inhalt: "Richte deine Aufmerksamkeit jetzt dorthin, wo du den Atem am deutlichsten spürst. Vielleicht an der Nasenspitze, vielleicht in der Brust, vielleicht im Bauch. Such dir eine Stelle." },
      { typ: "pause", inhalt: "ca. 15 Sek" },
      { typ: "text", inhalt: "Und nun beobachte einfach. Das Einatmen. Das Ausatmen. Ohne etwas zu verändern. Du schaust nur zu." },
      { typ: "pause", inhalt: "ca. 60 Sek" },
      { typ: "text", inhalt: "Wahrscheinlich sind deine Gedanken inzwischen abgeschweift. Das ist kein Fehler – das ist völlig normal. Bemerke es freundlich, und kehr mit deiner Aufmerksamkeit einfach wieder zum Atem zurück." },
      { typ: "pause", inhalt: "ca. 90 Sek" },
      { typ: "text", inhalt: "Jedes Zurückkehren zählt. Es ist wie eine Wiederholung im Training. Kehr wieder zurück, so oft du magst – ganz ohne Ärger." },
      { typ: "pause", inhalt: "ca. 90 Sek" },
      { typ: "text", inhalt: "Wir kommen langsam zum Ende. Nimm noch ein paar bewusste, etwas tiefere Atemzüge." },
      { typ: "pause", inhalt: "ca. 10 Sek" },
      { typ: "text", inhalt: "Und wenn du bereit bist, öffne langsam wieder die Augen. Nimm die Ruhe mit in das, was als Nächstes kommt." },
    ],
  },

  {
    slug: "innerer-beobachter",
    titel: "Der innere Beobachter",
    kategorie: "Meditationen",
    dauer: "10 Minuten",
    mp3: "innerer-beobachter.mp3",
    worum:
      "Kognitive Defusion – Abstand zu den Gedanken. Bild vom Flussufer. Etwas längere Stillen.",
    segmente: [
      { typ: "text", inhalt: "Mach es dir bequem und schließ die Augen. Nimm ein paar Atemzüge, nur um anzukommen." },
      { typ: "pause", inhalt: "ca. 15 Sek" },
      { typ: "text", inhalt: "Stell dir vor, du sitzt am Ufer eines ruhigen Flusses. Das Wasser zieht langsam an dir vorbei. Du sitzt einfach da und schaust." },
      { typ: "pause", inhalt: "ca. 20 Sek" },
      { typ: "text", inhalt: "Jeder Gedanke, der jetzt in dir auftaucht, ist ein Blatt, das auf dem Wasser vorbeitreibt. Ein Gedanke kommt – du legst ihn auf ein Blatt – und lässt ihn ziehen." },
      { typ: "pause", inhalt: "ca. 30 Sek" },
      { typ: "text", inhalt: "Du musst nichts festhalten und nichts wegschieben. Kommt ein Gedanke, leg ihn auf ein Blatt. Und lass ihn davontreiben. Ohne mitzuschwimmen." },
      { typ: "pause", inhalt: "ca. 90 Sek" },
      { typ: "text", inhalt: "Vielleicht merkst du, dass du in einen Gedanken hineingezogen wurdest – dass du plötzlich mitschwimmst. Das passiert. Kehr einfach ruhig ans Ufer zurück und setz dich wieder hin." },
      { typ: "pause", inhalt: "ca. 120 Sek" },
      { typ: "text", inhalt: "Und jetzt eine leise Frage, an die du dich nur herantasten musst. Wer hat hier eigentlich die ganze Zeit zugesehen? Wer beobachtet die Blätter?" },
      { typ: "pause", inhalt: "ca. 40 Sek" },
      { typ: "text", inhalt: "Genau das bist du. Nicht die Gedanken – das, was sie bemerkt. Ruh noch einen Moment in diesem Bemerken." },
      { typ: "pause", inhalt: "ca. 20 Sek" },
      { typ: "text", inhalt: "Nimm ein paar tiefere Atemzüge und komm langsam zurück. Öffne, wenn du bereit bist, die Augen." },
    ],
  },

  {
    slug: "body-scan",
    titel: "Body-Scan",
    kategorie: "Meditationen",
    dauer: "15 Minuten",
    mp3: "body-scan.mp3",
    worum:
      "Langsam durch den Körper wandern. Sehr ruhiges Tempo, viele kleine Pausen. Nichts muss sich lösen.",
    segmente: [
      { typ: "text", inhalt: "Leg dich hin, oder setz dich bequem. Schließ die Augen und lass den Körper schwer werden." },
      { typ: "pause", inhalt: "ca. 20 Sek" },
      { typ: "text", inhalt: "Wir wandern gleich langsam durch den ganzen Körper. Es gibt nichts zu tun, außer wahrzunehmen. Nichts muss sich verändern." },
      { typ: "text", inhalt: "Beginne bei den Füßen. Spür deine Füße, so wie sie gerade sind. Vielleicht ein Kribbeln, Wärme, Druck – oder auch nichts Bestimmtes." },
      { typ: "pause", inhalt: "ca. 30 Sek" },
      { typ: "text", inhalt: "Wandere langsam nach oben. Die Unterschenkel. Die Knie. Die Oberschenkel. Nimm dir für jede Region ein paar Atemzüge Zeit." },
      { typ: "pause", inhalt: "ca. 40 Sek" },
      { typ: "text", inhalt: "Weiter zum Becken. Zum Bauch. Zur Brust. Wo du Anspannung bemerkst, atme sanft dort hinein – nicht, um sie loszuwerden, nur um ihr Raum zu geben." },
      { typ: "pause", inhalt: "ca. 60 Sek" },
      { typ: "text", inhalt: "Nun die Hände. Die Arme. Die Schultern – die oft so viel tragen. Der Nacken." },
      { typ: "pause", inhalt: "ca. 40 Sek" },
      { typ: "text", inhalt: "Und schließlich das Gesicht. Die Stirn. Der Kiefer, den du vielleicht ein wenig lösen darfst. Der ganze Kopf." },
      { typ: "pause", inhalt: "ca. 40 Sek" },
      { typ: "text", inhalt: "Und jetzt spür den ganzen Körper als Ganzes. Von den Füßen bis zum Scheitel. Ein einziger, atmender Körper. Ruh einen Moment einfach hier." },
      { typ: "pause", inhalt: "ca. 60 Sek" },
      { typ: "text", inhalt: "Beweg langsam die Finger und Zehen. Nimm einen tiefen Atemzug. Und komm in deinem Tempo zurück." },
    ],
  },

  {
    slug: "herz-kohaerenz",
    titel: "Herz-Kohärenz",
    kategorie: "Meditationen",
    dauer: "5–10 Minuten",
    mp3: "herz-kohaerenz.mp3",
    worum:
      "Ruhiger Atem durch die Herzgegend + warmes Gefühl. Ruhig und herzlich vortragen.",
    segmente: [
      { typ: "text", inhalt: "Setz dich ruhig hin und leg, wenn du magst, eine Hand auf dein Herz. Spür die Wärme deiner Hand auf der Brust." },
      { typ: "pause", inhalt: "ca. 15 Sek" },
      { typ: "text", inhalt: "Atme jetzt etwas langsamer als gewohnt. Ungefähr fünf Sekunden ein … und fünf Sekunden aus. Ganz ohne Druck." },
      { typ: "pause", inhalt: "ca. 30 Sek" },
      { typ: "text", inhalt: "Und stell dir vor, der Atem strömt direkt durch die Herzgegend ein und wieder aus. Als würde dein Herz atmen." },
      { typ: "pause", inhalt: "ca. 40 Sek" },
      { typ: "text", inhalt: "Jetzt lade ein warmes Gefühl dazu ein. Denk an einen Menschen, einen Moment, eine Kleinigkeit, für die du dankbar bist. Lass dieses Gefühl in der Brust entstehen." },
      { typ: "pause", inhalt: "ca. 30 Sek" },
      { typ: "text", inhalt: "Und jetzt bleib einfach hier. Ruhiger Atem durch das Herz – und dieses warme Gefühl. Beides zusammen. Ein paar Atemzüge lang." },
      { typ: "pause", inhalt: "ca. 90 Sek" },
      { typ: "text", inhalt: "Kehre langsam zurück. Nimm die Hand vom Herzen, wenn du magst. Und nimm diese Ruhe mit in deinen Tag." },
    ],
  },

  {
    slug: "verlaengertes-ausatmen",
    titel: "Verlängertes Ausatmen",
    kategorie: "Atemübungen",
    dauer: "3–5 Minuten",
    mp3: "verlaengertes-ausatmen.mp3",
    worum:
      "Atemübung. Rhythmus ein paar Mal vorzählen, dann Stille zum Selbstüben. Ausatmen länger als Einatmen.",
    segmente: [
      { typ: "text", inhalt: "Wir beruhigen jetzt gemeinsam den Atem. Der Schlüssel ist einfach: das Ausatmen wird länger als das Einatmen. Mehr braucht es nicht." },
      { typ: "text", inhalt: "Atme durch die Nase ein – zwei, drei, vier. Und atme ruhig aus – zwei, drei, vier, fünf, sechs." },
      { typ: "pause", inhalt: "ca. 5 Sek" },
      { typ: "text", inhalt: "Noch einmal. Ein – zwei, drei, vier. Und aus – zwei, drei, vier, fünf, sechs. Kein Pressen. Das Ausatmen bleibt entspannt." },
      { typ: "pause", inhalt: "ca. 5 Sek" },
      { typ: "regie", inhalt: "Ein bis zwei weitere Runden mit ruhiger Stimme mitzählen, dann in die Stille übergeben." },
      { typ: "text", inhalt: "Und jetzt mach in deinem eigenen Rhythmus weiter. Einatmen kürzer, ausatmen länger. Ich bin still – du atmest." },
      { typ: "pause", inhalt: "ca. 120 Sek" },
      { typ: "text", inhalt: "Spür, wie der Körper mit jedem längeren Ausatmen ein Stück mehr loslässt." },
      { typ: "pause", inhalt: "ca. 30 Sek" },
      { typ: "text", inhalt: "Lass den Atem nun wieder ganz von selbst gehen. Und nimm die Ruhe mit." },
    ],
  },

  {
    slug: "vier-sechs-atmung",
    titel: "4-6-Atmung",
    kategorie: "Atemübungen",
    dauer: "3 Minuten",
    mp3: "vier-sechs-atmung.mp3",
    worum:
      "Kurze, alltagstaugliche Atemübung. Vier ein, sechs aus, kein Anhalten. Zügig, aber ruhig.",
    segmente: [
      { typ: "text", inhalt: "Eine kurze Atemübung für zwischendurch. Vier Sekunden ein, sechs Sekunden aus. Kein Anhalten – der Übergang bleibt weich." },
      { typ: "text", inhalt: "Wir starten. Ein durch die Nase – zwei, drei, vier. Und aus – zwei, drei, vier, fünf, sechs." },
      { typ: "pause", inhalt: "ca. 3 Sek" },
      { typ: "text", inhalt: "Weiter. Ein – zwei, drei, vier. Aus – zwei, drei, vier, fünf, sechs." },
      { typ: "pause", inhalt: "ca. 3 Sek" },
      { typ: "regie", inhalt: "Insgesamt acht bis zehn Runden in ruhigem Tempo mitzählen." },
      { typ: "text", inhalt: "Und noch ein paar Runden in deinem Tempo. Ein – zwei, drei, vier. Aus – zwei, drei, vier, fünf, sechs." },
      { typ: "pause", inhalt: "ca. 60 Sek" },
      { typ: "text", inhalt: "Kehr jetzt zu deinem ganz natürlichen Atem zurück. Und bemerke den Unterschied zu vorhin." },
      { typ: "pause", inhalt: "ca. 10 Sek" },
    ],
  },

  {
    slug: "box-breathing",
    titel: "Box Breathing",
    kategorie: "Atemübungen",
    dauer: "3–5 Minuten",
    mp3: "box-breathing.mp3",
    worum:
      "Quadrat-Atmung: ein–halten–aus–halten, je vier. Gleichmäßig, ruhig, klar.",
    segmente: [
      { typ: "text", inhalt: "Diese Atmung geht in vier gleichen Seiten – wie ein Quadrat. Einatmen, halten, ausatmen, halten. Jeweils vier Sekunden." },
      { typ: "text", inhalt: "Los geht's. Atme ein – zwei, drei, vier. Halte – zwei, drei, vier. Atme aus – zwei, drei, vier. Und halte – zwei, drei, vier." },
      { typ: "pause", inhalt: "ca. 3 Sek" },
      { typ: "text", inhalt: "Und weiter. Ein – zwei, drei, vier. Halten – zwei, drei, vier. Aus – zwei, drei, vier. Halten – zwei, drei, vier." },
      { typ: "pause", inhalt: "ca. 3 Sek" },
      { typ: "regie", inhalt: "Vier bis sechs Runden ruhig mitzählen. Wenn vier Sekunden zu lang wirken, hörbar auf drei gehen." },
      { typ: "text", inhalt: "Mach in diesem gleichmäßigen Rhythmus weiter – ich zähle noch ein paar Runden mit dir. Ein – zwei, drei, vier. Halten – zwei, drei, vier. Aus – zwei, drei, vier. Halten – zwei, drei, vier." },
      { typ: "pause", inhalt: "ca. 60 Sek" },
      { typ: "text", inhalt: "Und jetzt lass das Halten los und atme wieder ganz frei. Spür die Gleichmäßigkeit, die geblieben ist." },
      { typ: "pause", inhalt: "ca. 15 Sek" },
    ],
  },

  {
    slug: "autopilot-check",
    titel: "Der Autopilot-Check",
    kategorie: "Rituale",
    dauer: "2 Minuten",
    mp3: "autopilot-check.mp3",
    worum:
      "Ganz kurz, alltagsnah. Kann im Stehen oder Gehen gehört werden. Wach, freundlich, knapp.",
    segmente: [
      { typ: "text", inhalt: "Ein kurzer Moment für dich – egal, wo du gerade bist. Im Stehen, im Sitzen, im Gehen. Du musst nichts unterbrechen." },
      { typ: "text", inhalt: "Nimm einen bewussten Atemzug. Und frag dich: Was tue ich gerade – und bin ich wirklich dabei?" },
      { typ: "pause", inhalt: "ca. 15 Sek" },
      { typ: "text", inhalt: "Bemerke, was gerade in dir läuft. Welcher Gedanke? Welche Stimmung? Welcher Impuls, gleich weiterzumachen?" },
      { typ: "pause", inhalt: "ca. 15 Sek" },
      { typ: "text", inhalt: "Und jetzt gib dem Ganzen ein einziges Wort. „Eile“. „Sorge“. „Leere“. „Ruhe“. Was auch immer passt – ohne es zu bewerten." },
      { typ: "pause", inhalt: "ca. 10 Sek" },
      { typ: "text", inhalt: "Atme aus. Und geh weiter. Du hast den Autopiloten für einen Moment gesehen – das genügt völlig." },
    ],
  },

  {
    slug: "morgen-ausrichtung",
    titel: "Morgen-Ausrichtung",
    kategorie: "Rituale",
    dauer: "5 Minuten",
    mp3: "morgen-ausrichtung.mp3",
    worum:
      "Direkt nach dem Aufwachen, ohne Handy. Ruhig, ermutigend. Endet mit einer Absicht.",
    segmente: [
      { typ: "text", inhalt: "Guten Morgen. Bleib nach dem Aufwachen noch einen Moment liegen oder sitzen. Ohne Handy, ohne den Tag schon hereinzulassen." },
      { typ: "pause", inhalt: "ca. 10 Sek" },
      { typ: "text", inhalt: "Nimm drei ruhige Atemzüge und komm im Körper an. Spür, dass du da bist, bevor der Tag etwas von dir will." },
      { typ: "pause", inhalt: "ca. 20 Sek" },
      { typ: "text", inhalt: "Und jetzt frag dich: Wie will ich diesem Tag begegnen? Nicht, was ich alles schaffen muss – sondern aus welcher Haltung heraus. Wähle ein Wort oder eine Absicht." },
      { typ: "pause", inhalt: "ca. 30 Sek" },
      { typ: "text", inhalt: "Stell dir kurz vor, wie es sich anfühlt, aus dieser Haltung durch den Tag zu gehen. Wie du gehst, wie du sprichst, wie du reagierst." },
      { typ: "pause", inhalt: "ca. 30 Sek" },
      { typ: "text", inhalt: "Und nimm dir eine kleine, konkrete Sache vor, die zu dieser Ausrichtung passt. Nur eine." },
      { typ: "pause", inhalt: "ca. 20 Sek" },
      { typ: "text", inhalt: "Dein Wort begleitet dich jetzt wie ein leiser Kompass im Hintergrund. Und damit beginnst du deinen Tag." },
    ],
  },

  {
    slug: "abend-reflexion",
    titel: "Abend-Reflexion",
    kategorie: "Rituale",
    dauer: "5–10 Minuten",
    mp3: "abend-reflexion.mp3",
    worum:
      "Am Abend, ruhig. Freundliches Bemerken statt Selbstkritik. Pausen zum Nachspüren/Notieren.",
    segmente: [
      { typ: "text", inhalt: "Der Tag geht zu Ende. Setz dich ruhig hin – vielleicht mit einem Notizbuch in Reichweite. Es geht nicht um Bilanz und nicht um Selbstkritik. Nur um freundliches Bemerken." },
      { typ: "pause", inhalt: "ca. 10 Sek" },
      { typ: "text", inhalt: "Lass den Tag in ein paar Atemzügen vor deinem inneren Auge vorbeiziehen. Vom Aufwachen bis zu diesem Moment. Ohne zu urteilen – du schaust nur." },
      { typ: "pause", inhalt: "ca. 40 Sek" },
      { typ: "text", inhalt: "Und jetzt frag dich: Wo war ich heute bewusst da? Und wo hat der Autopilot übernommen? Beides gehört dazu." },
      { typ: "pause", inhalt: "ca. 40 Sek" },
      { typ: "text", inhalt: "Frag weiter: Wofür bin ich heute dankbar? Und sei es die kleinste Kleinigkeit – ein Licht, ein Wort, ein Schluck Kaffee." },
      { typ: "pause", inhalt: "ca. 40 Sek" },
      { typ: "text", inhalt: "Und zum Schluss: Halte eine Erkenntnis für morgen fest. Etwas, das du mitnehmen willst. Ohne dich für irgendetwas zu verurteilen." },
      { typ: "pause", inhalt: "ca. 40 Sek" },
      { typ: "text", inhalt: "Nimm einen ruhigen Atemzug. Der Tag darf jetzt gehen. Und du darfst zur Ruhe kommen." },
    ],
  },

  {
    slug: "loslass-ritual",
    titel: "Loslass-Ritual",
    kategorie: "Rituale",
    dauer: "15 Minuten",
    mp3: "loslass-ritual.mp3",
    worum:
      "Kraftvolleres Ritual mit Schreiben und einem sichtbaren Zeichen (Zerreißen/Verbrennen). Ernst, aber warm. Sicherheitshinweis zum Feuer.",
    segmente: [
      { typ: "regie", inhalt: "Vorab hörbar erwähnen, dass Papier und Stift bereitliegen sollten – und Feuer nur an einem sicheren Ort." },
      { typ: "text", inhalt: "Für dieses Ritual brauchst du Ruhe, einen Stift und ein Blatt Papier. Nimm dir bewusst die Zeit – hier gibt es nichts zu überspringen." },
      { typ: "pause", inhalt: "ca. 10 Sek" },
      { typ: "text", inhalt: "Schreib jetzt auf, was du loslassen möchtest. Ehrlich und ungefiltert. Niemand außer dir wird das je lesen. Lass dir Zeit – ich warte." },
      { typ: "pause", inhalt: "ca. 180 Sek" },
      { typ: "text", inhalt: "Wenn du fertig bist, lies es dir einmal langsam durch. Und spür, was dabei in dir hochkommt. Lass es da sein." },
      { typ: "pause", inhalt: "ca. 40 Sek" },
      { typ: "text", inhalt: "Und jetzt sprich – innerlich oder laut – einen Satz des Abschlusses, in deinen eigenen Worten. Etwas wie: Ich lasse das jetzt los. Es darf gehen." },
      { typ: "pause", inhalt: "ca. 30 Sek" },
      { typ: "text", inhalt: "Nun mach das Loslassen sichtbar. Zerreiße das Blatt bewusst – oder verbrenne es an einem sicheren Ort. Der Körper glaubt Handlungen mehr als Gedanken." },
      { typ: "pause", inhalt: "ca. 60 Sek" },
      { typ: "text", inhalt: "Und jetzt atme ein paar Mal tief durch. Spür den Raum, der entstanden ist. Da ist jetzt etwas frei geworden." },
      { typ: "pause", inhalt: "ca. 30 Sek" },
      { typ: "text", inhalt: "Bleib noch einen Moment in dieser Weite. Und komm dann langsam zurück." },
    ],
  },

  {
    slug: "praesenz-spaziergang",
    titel: "Präsenz-Spaziergang",
    kategorie: "Rituale",
    dauer: "10–20 Minuten",
    mp3: "praesenz-spaziergang.mp3",
    worum:
      "Wird beim Gehen gehört. Sinne statt Gedanken. Der Hund als Vorbild der Präsenz. Weniger, dafür längere freie Phasen.",
    segmente: [
      { typ: "text", inhalt: "Für die nächste Zeit gehört dieser Weg ganz dem Moment. Schalt das Handy stumm oder steck es weg. Du brauchst es jetzt nicht." },
      { typ: "text", inhalt: "Geh die ersten Minuten bewusst langsamer als gewohnt. Spür, wie deine Füße den Boden berühren. Schritt für Schritt." },
      { typ: "pause", inhalt: "ca. 40 Sek" },
      { typ: "text", inhalt: "Und jetzt komm mit deinen Sinnen in die Welt. Nimm fünf Dinge wahr, die du siehst. Nicht benennen und weiter – wirklich hinschauen." },
      { typ: "pause", inhalt: "ca. 40 Sek" },
      { typ: "text", inhalt: "Dann drei Dinge, die du hörst. Vielleicht etwas Nahes, vielleicht etwas ganz Fernes." },
      { typ: "pause", inhalt: "ca. 30 Sek" },
      { typ: "text", inhalt: "Und eine Sache, die du riechst. Die Luft, Gras, Regen, Stadt – was auch immer da ist." },
      { typ: "pause", inhalt: "ca. 20 Sek" },
      { typ: "text", inhalt: "Wenn du einen Hund dabeihast, schau ihn eine Weile an. Seine Neugier. Seine völlige Gegenwart. Er ist nie woanders als hier. Lass dich davon anstecken." },
      { typ: "pause", inhalt: "ca. 60 Sek" },
      { typ: "text", inhalt: "Und jetzt geh einfach weiter und bleib bei deinen Sinnen. Schweifen die Gedanken ab, kehr freundlich zurück – zum Sehen, zum Hören, zum Gehen. So oft es nötig ist." },
      { typ: "pause", inhalt: "ca. 120 Sek" },
      { typ: "text", inhalt: "Nicht die Strecke zählt, sondern wie oft du bewusst zurückkehrst. Jede Rückkehr ist Training. Genieß den Rest deines Weges." },
    ],
  },

  {
    slug: "taegliche-rueckkehr",
    titel: "Die tägliche Rückkehr",
    kategorie: "Rituale",
    dauer: "5 Minuten",
    mp3: "taegliche-rueckkehr.mp3",
    worum:
      "Die Abschluss-Praxis. Ruhig, würdig, ohne Pathos. Endet mit einer Geste des Weitergebens.",
    segmente: [
      { typ: "text", inhalt: "Setz dich ruhig hin. Und spür für ein paar Atemzüge einfach nach: Wie präsent bin ich heute wirklich? Keine richtige Antwort – nur ein ehrliches Nachspüren." },
      { typ: "pause", inhalt: "ca. 30 Sek" },
      { typ: "text", inhalt: "Erinnere dich an einen Moment in letzter Zeit, in dem du bewusst gestaltet hast, statt einfach zu reagieren. Lass das Gefühl davon kurz wieder da sein." },
      { typ: "pause", inhalt: "ca. 40 Sek" },
      { typ: "text", inhalt: "Und jetzt frag dich: Wo hat mich zuletzt etwas aus der Mitte geworfen? Und – wie bin ich zurückgekehrt? Genau dieses Zurückkehren ist die Kunst." },
      { typ: "pause", inhalt: "ca. 40 Sek" },
      { typ: "text", inhalt: "Richte dich neu aus. Welche Haltung willst du heute verkörpern? Für dich selbst – und für die Menschen um dich herum?" },
      { typ: "pause", inhalt: "ca. 30 Sek" },
      { typ: "text", inhalt: "Und wähle eine kleine Geste des Weitergebens. Ein offenes Ohr. Ein ehrliches Wort. Ein Moment echter Präsenz für einen anderen Menschen." },
      { typ: "pause", inhalt: "ca. 20 Sek" },
      { typ: "text", inhalt: "Nicht das Nie-mehr-Fallen ist Meisterschaft, sondern das ruhige, wertfreie Zurückkehren – jeden Tag aufs Neue. Komm langsam zurück. Bis morgen." },
    ],
  },
];

/** Kurzer Aufnahme-Leitfaden – wird als eigenes PDF gerendert. */
export const leitfaden = {
  titel: "Aufnahme-Leitfaden",
  untertitel: "Praxis mit Stimme · so entstehen die 13 Aufnahmen",
  abschnitte: [
    {
      h: "Bevor du startest",
      punkte: [
        "Ruhiger Raum, möglichst wenig Hall – ein Raum mit Textilien (Vorhänge, Teppich, Sofa) klingt weicher als ein kahler.",
        "Handy in den Flugmodus, Kühlschrank/Lüfter aus, Fenster zu.",
        "Ein Glas Wasser bereitstellen. Vor der Aufnahme ein paar Minuten still werden – die Ruhe hört man.",
      ],
    },
    {
      h: "Beim Sprechen",
      punkte: [
        "Langsamer sprechen, als sich richtig anfühlt. Bei Meditationen ruhig auf halbes Alltagstempo.",
        "Die eingezeichneten Pausen sind echte Stille. Entweder beim Sprechen wirklich schweigen – oder kurz markieren und die volle Länge im Schnitt einfügen.",
        "„Regie“-Zeilen werden NICHT gesprochen; sie sind nur Hinweise für dich.",
        "Bei einem Versprecher: kurz absetzen, zwei Sekunden Stille lassen, den Satz neu beginnen. Die Stille macht das Schneiden später leicht.",
      ],
    },
    {
      h: "Aufnahme & Export",
      punkte: [
        "Mikro etwa eine Handbreit vor dem Mund, leicht seitlich – das vermeidet harte „P“- und „S“-Laute.",
        "Pegel so, dass die lautesten Stellen nicht anschlagen (Ziel etwa -6 dB Spitze).",
        "Export als MP3, 128–192 kbit/s, mono reicht für Sprache.",
        "Dateiname exakt wie angegeben (z. B. atembeobachtung.mp3) – dann lässt sich die Aufnahme direkt der richtigen Übung zuordnen.",
      ],
    },
    {
      h: "Reihenfolge (Empfehlung)",
      punkte: [
        "Starte mit „Der Autopilot-Check“ (2 Min) – kurz, zum Warmwerden mit Mikro und Tempo.",
        "Dann die Atemübungen (kurz, klarer Rhythmus), danach die Meditationen (lange Pausen), zuletzt die Rituale.",
        "Nicht alle 13 an einem Tag. Die Stimme trägt eine ruhige Aufnahme besser, wenn du selbst ruhig bist.",
      ],
    },
  ],
};
