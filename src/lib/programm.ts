/**
 * „21 Tage Autopilot-Ausstieg“ – ein geführtes Programm für den
 * Mitgliederbereich.
 *
 * Anders als die frei zugängliche Praxis-Bibliothek ist dies ein endlicher,
 * aufeinander aufbauender Bogen über drei Wochen: pro Tag ein Impuls und eine
 * kleine, konkrete Übung (2–5 Minuten). Der Bogen folgt lose den 7 Stufen –
 * von „bemerken, dass der Autopilot läuft“ über „beobachten und loslassen“ bis
 * „bewusst gestalten und zurückkehren“.
 *
 * Bewusst selbst-getaktet: kein Kalender-Zwang. Ein verpasster Tag ist kein
 * Bruch – man macht in seinem Tempo weiter. Genau das ist die Haltung des
 * Programms (siehe Tag 20, „die tägliche Rückkehr“).
 *
 * Fortschritt wird über die bestehende `progress`-Tabelle gespeichert
 * (item_type = 'programm', item_key = '01'…'21'); siehe Migration 0011.
 */

export type ProgrammBezug = { label: string; href: string };

export type ProgrammTag = {
  /** 1–21 */
  tag: number;
  /** 1–3, für die Wochen-Gliederung */
  woche: number;
  titel: string;
  /** Der Gedanke des Tages – ein bis zwei Sätze. */
  impuls: string;
  /** Die kleine Übung des Tages, konkret und alltagstauglich. */
  uebung: string;
  /** Weiterführender Bezug zu einer Praxis oder Stufe. */
  bezug: ProgrammBezug;
};

export type ProgrammWoche = {
  nr: number;
  titel: string;
  fokus: string;
};

export const PROGRAMM_TAGE_GESAMT = 21;

/** Auf zwei Stellen aufgefüllter Tages-Schlüssel, z. B. 3 → "03". */
export function tagKey(tag: number): string {
  return String(tag).padStart(2, "0");
}

export const programmWochen: ProgrammWoche[] = [
  {
    nr: 1,
    titel: "Bemerken",
    fokus:
      "Du fängst an zu sehen, was vorher automatisch lief. Mehr braucht es in Woche eins nicht.",
  },
  {
    nr: 2,
    titel: "Beobachten & loslassen",
    fokus:
      "Du übst das Zurücktreten: Gedanken und Gefühlen zusehen, ohne dich in sie zu verstricken.",
  },
  {
    nr: 3,
    titel: "Gestalten & zurückkehren",
    fokus:
      "Du wählst bewusst – und lernst das Wichtigste: nicht das Nie-mehr-Fallen, sondern das ruhige Zurückkehren.",
  },
];

const praxis = (slug: string, label: string): ProgrammBezug => ({
  label,
  href: `/mitglieder/praxis/${slug}`,
});
const stufe = (nr: number, label: string): ProgrammBezug => ({
  label,
  href: `/mitglieder/stufe/${nr}`,
});

export const programmTage: ProgrammTag[] = [
  // ---------- Woche 1 · Bemerken ----------
  {
    tag: 1,
    woche: 1,
    titel: "Der erste Blick auf den Autopilot",
    impuls:
      "Das meiste in dir läuft von selbst – Reaktionen, Gewohnheiten, Gedanken. Solange das unsichtbar bleibt, fühlt es sich einfach wie „ich“ an. Heute geht es nur darum, das einmal zu bemerken.",
    uebung:
      "Halte heute dreimal kurz inne – morgens, mittags, abends – und frag dich: Was tue ich gerade, und bin ich wirklich dabei? Nicht bewerten. Nur bemerken.",
    bezug: praxis("autopilot-check", "Der Autopilot-Check"),
  },
  {
    tag: 2,
    woche: 1,
    titel: "Ein Gedanke ist nicht die Wahrheit",
    impuls:
      "Ein Gedanke fühlt sich oft an wie eine Tatsache. Dabei ist er erst mal nur ein Angebot – einer von zehntausenden am Tag, viele davon alt und ungeprüft.",
    uebung:
      "Wenn dich heute ein Gedanke belastet, frag einmal: Ist das gerade wahr – oder nur vertraut? Du musst ihn nicht widerlegen. Die Frage allein schafft schon Abstand.",
    bezug: stufe(1, "Stufe 1 · Autopilot"),
  },
  {
    tag: 3,
    woche: 1,
    titel: "„Da ist ein Gedanke“",
    impuls:
      "Zwischen „Ich bin unfähig“ und „Da ist der Gedanke, ich sei unfähig“ liegt ein kleiner, entscheidender Abstand. Im ersten steckst du drin. Im zweiten siehst du hin.",
    uebung:
      "Nimm heute einen harten Satz über dich und stell ihm „Da ist der Gedanke, dass …“ voran. Sprich ihn innerlich so aus. Spür den Unterschied.",
    bezug: stufe(2, "Stufe 2 · Erwachen"),
  },
  {
    tag: 4,
    woche: 1,
    titel: "Der Atem ist immer im Jetzt",
    impuls:
      "Der Verstand lebt in Gestern und Morgen. Der Atem nicht – er ist immer nur jetzt. Deshalb ist er der einfachste Weg zurück in den Moment.",
    uebung:
      "Nimm dir fünf Minuten und beobachte einfach deinen Atem, ohne ihn zu verändern. Schweifen die Gedanken ab, kehr freundlich zum Atem zurück. Das Zurückkehren ist die Übung.",
    bezug: praxis("atembeobachtung", "Atembeobachtung"),
  },
  {
    tag: 5,
    woche: 1,
    titel: "Der Raum zwischen Reiz und Reaktion",
    impuls:
      "Zwischen dem, was passiert, und dem, was du tust, liegt ein Raum. Winzig, aber real. In diesem Raum bist du frei – dort entscheidet sich, ob der Autopilot übernimmt.",
    uebung:
      "Wenn dich heute etwas reizt, atme einmal bewusst lang aus, bevor du reagierst. Ein einziger Atemzug reicht, um den Raum zu öffnen.",
    bezug: praxis("verlaengertes-ausatmen", "Verlängertes Ausatmen"),
  },
  {
    tag: 6,
    woche: 1,
    titel: "Wer sieht hier eigentlich zu?",
    impuls:
      "Es gibt den Gedanken – und es gibt das, was ihn bemerkt. Dieses Bemerkende bist du. Nicht der Lärm, sondern der Raum, in dem er auftaucht.",
    uebung:
      "Setz dich zehn Minuten und beobachte deine Gedanken, als säßest du am Flussufer und schautest dem Wasser zu. Nicht hineinspringen. Nur zusehen.",
    bezug: praxis("innerer-beobachter", "Der innere Beobachter"),
  },
  {
    tag: 7,
    woche: 1,
    titel: "Rückblick: eine Woche des Bemerkens",
    impuls:
      "Du hast angefangen zu sehen, was vorher automatisch lief. Das klingt klein, ist aber der ganze Anfang – ohne Bemerken keine Wahl.",
    uebung:
      "Nimm dir heute Abend ein paar Minuten: Wann hast du diese Woche deinen Autopilot ertappt? Schreib eine Situation auf, an die du dich erinnerst.",
    bezug: praxis("abend-reflexion", "Abend-Reflexion"),
  },

  // ---------- Woche 2 · Beobachten & loslassen ----------
  {
    tag: 8,
    woche: 2,
    titel: "Am Flussufer sitzen bleiben",
    impuls:
      "Ein Gedanke wird erst mächtig, wenn du ihm hinterherläufst. Lässt du ihn ziehen wie Wasser, verliert er seinen Griff – ganz ohne Kampf.",
    uebung:
      "Sitz heute fünf Minuten und lass Gedanken kommen und gehen, ohne einen festzuhalten. Bemerkst du, dass du einem gefolgt bist, kehr einfach ans Ufer zurück.",
    bezug: stufe(3, "Stufe 3 · Selbstbeobachtung"),
  },
  {
    tag: 9,
    woche: 2,
    titel: "Die Stimme des inneren Kritikers",
    impuls:
      "Die härteste Stimme in dir ist selten deine eigene. Oft ist sie übernommen – von früher, von anderen. Wer das bemerkt, muss ihr nicht mehr alles glauben.",
    uebung:
      "Schreib heute einen Satz deines inneren Kritikers wörtlich auf. Dann frag: Wessen Stimme ist das eigentlich? Und: Würde ich so mit einem Menschen reden, den ich mag?",
    bezug: stufe(3, "Stufe 3 · Selbstbeobachtung"),
  },
  {
    tag: 10,
    woche: 2,
    titel: "Gefühle wohnen im Körper",
    impuls:
      "Ein Gefühl ist zuerst körperlich – Enge, Wärme, Druck – und wird erst dann zur Geschichte. Wer im Körper nachspürt, kommt vor der Geschichte an.",
    uebung:
      "Nimm dir Zeit für einen Body-Scan: geh mit der Aufmerksamkeit langsam durch den Körper, von den Füßen zum Kopf. Nichts ändern – nur wahrnehmen, was da ist.",
    bezug: praxis("body-scan", "Body-Scan"),
  },
  {
    tag: 11,
    woche: 2,
    titel: "Die Welle reiten",
    impuls:
      "Ein Gefühl zieht als körperliche Welle in etwa neunzig Sekunden durch – wenn du es lässt. Was es lange hält, ist die Geschichte, die wir ihm erzählen.",
    uebung:
      "Beim nächsten starken Gefühl heute: benenne es innerlich („da ist Ärger“), atme, und lass die Welle durch dich hindurchziehen, ohne zu handeln. Schau, was nach einer Minute übrig ist.",
    bezug: stufe(4, "Stufe 4 · Emotionale Reifung"),
  },
  {
    tag: 12,
    woche: 2,
    titel: "Was darf gehen?",
    impuls:
      "Manches trägst du länger mit dir, als es dir dient – einen Groll, eine alte Geschichte, ein „hätte ich nur“. Loslassen ist kein Vergessen. Es ist ein Absetzen.",
    uebung:
      "Nimm dir heute das Loslass-Ritual vor. Wähle eine Sache, die du länger mit dir trägst, und geh die Schritte bewusst durch.",
    bezug: praxis("loslass-ritual", "Loslass-Ritual"),
  },
  {
    tag: 13,
    woche: 2,
    titel: "Freundlich mit dir",
    impuls:
      "Du sprichst mit dir oft, wie du mit niemandem sonst sprechen würdest. Selbstmitgefühl ist keine Schwäche – es ist die Bedingung dafür, dass Veränderung überhaupt hält.",
    uebung:
      "Nimm einen Kritiker-Satz von Tag 9 und formuliere ihn um: Wie würdest du es einem guten Freund sagen, der dasselbe erlebt? Sag dir heute diese Version.",
    bezug: stufe(4, "Stufe 4 · Emotionale Reifung"),
  },
  {
    tag: 14,
    woche: 2,
    titel: "Rückblick: das Zurücktreten",
    impuls:
      "Zwei Wochen lang hast du geübt, einen Schritt zurückzutreten – vom Gedanken, vom Gefühl, von der alten Geschichte. Dieser Abstand ist dein neuer Boden.",
    uebung:
      "Reflexion heute Abend: Wo ist es dir diese Woche gelungen, nicht sofort mitzugehen? Und wo bist du hineingerutscht? Beides ist in Ordnung – schreib es auf.",
    bezug: praxis("abend-reflexion", "Abend-Reflexion"),
  },

  // ---------- Woche 3 · Gestalten & zurückkehren ----------
  {
    tag: 15,
    woche: 3,
    titel: "Vom Beobachter zum Gestalter",
    impuls:
      "Du musst nicht jeden Gedanken glauben – und du darfst welche wählen. Nicht durch Zwang oder positives Denken, sondern indem du entscheidest, welchem Gedanken du heute Raum gibst.",
    uebung:
      "Wähle heute früh einen tragenden Satz für den Tag – einen, der dir gut tut und wahr genug ist. Trag ihn bei dir und kehr innerlich zu ihm zurück, wenn der Tag dich zieht.",
    bezug: stufe(5, "Stufe 5 · Schöpferkraft"),
  },
  {
    tag: 16,
    woche: 3,
    titel: "Den Morgen bewusst beginnen",
    impuls:
      "Wer den Morgen dem Autopilot überlässt, überlässt ihm oft den ganzen Tag. Ein paar bewusste Minuten am Anfang verändern, aus welchem Zustand heraus du handelst.",
    uebung:
      "Nimm dir morgen früh die Morgen-Ausrichtung vor, bevor du zum Telefon greifst. Fünf Minuten reichen, um den Tag aus deiner Mitte heraus zu beginnen.",
    bezug: praxis("morgen-ausrichtung", "Morgen-Ausrichtung"),
  },
  {
    tag: 17,
    woche: 3,
    titel: "Kopf, Herz und Handeln",
    impuls:
      "Stimmigkeit heißt: Denken, Fühlen und Tun ziehen an einem Strang. Aus dieser Kohärenz entsteht Ruhe – nicht, weil alles gelöst ist, sondern weil du nicht mehr gegen dich selbst arbeitest.",
    uebung:
      "Nimm heute eine kleine Handlung, die zu deinem tragenden Satz von Tag 15 passt. Nur eine – aber tu sie bewusst.",
    bezug: stufe(6, "Stufe 6 · Innere Ausrichtung"),
  },
  {
    tag: 18,
    woche: 3,
    titel: "Ruhe lässt sich üben",
    impuls:
      "Innere Ruhe ist kein Zufall und kein Charakterzug, den die einen haben und die anderen nicht. Sie ist ein Zustand, den du im Körper anstoßen kannst – über den Atem, über das Herz.",
    uebung:
      "Nimm dir fünf Minuten für die Herz-Kohärenz: ruhig und gleichmäßig atmen, die Aufmerksamkeit in der Herzgegend. Spür nach, wie sich dein Zustand danach anfühlt.",
    bezug: praxis("herz-kohaerenz", "Herz-Kohärenz"),
  },
  {
    tag: 19,
    woche: 3,
    titel: "Wohin willst du eigentlich?",
    impuls:
      "Ohne Richtung wählt der Autopilot für dich – meist das Gewohnte, das Bequeme, das Erwartete. Werte sind der Kompass, der dir zeigt, wofür sich das bewusste Wählen überhaupt lohnt.",
    uebung:
      "Schreib heute drei Werte auf, nach denen du leben willst – nicht, die gut klingen, sondern die dir wirklich wichtig sind. Frag zu jedem: Lebe ich das gerade?",
    bezug: stufe(5, "Stufe 5 · Schöpferkraft"),
  },
  {
    tag: 20,
    woche: 3,
    titel: "Die tägliche Rückkehr",
    impuls:
      "Das Ziel ist nicht, nie wieder in den Autopilot zu fallen – das schafft niemand. Das Ziel ist das ruhige Zurückkehren: dass du früher bemerkst und freundlicher zurückfindest.",
    uebung:
      "Nimm dir die tägliche Rückkehr vor – die kurze Praxis, in deine Mitte zurückzukommen. Sie ist der Kern dessen, was nach diesem Programm bleibt.",
    bezug: praxis("taegliche-rueckkehr", "Die tägliche Rückkehr"),
  },
  {
    tag: 21,
    woche: 3,
    titel: "Was bleibt",
    impuls:
      "Einundzwanzig Tage verändern keine Persönlichkeit. Aber sie zeigen dir etwas, das niemand mehr wegnehmen kann: Du kannst bemerken, und du kannst wählen. Der Rest ist Wiederholung.",
    uebung:
      "Schau zurück und schreib zwei Dinge auf: Was hat sich verändert, seit du angefangen hast? Und welche eine Praxis willst du behalten? Wähle sie bewusst – sie ist von heute an deine.",
    bezug: praxis("taegliche-rueckkehr", "Die tägliche Rückkehr"),
  },
];
