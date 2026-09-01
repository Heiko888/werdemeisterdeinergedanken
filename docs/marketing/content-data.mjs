/**
 * Gemeinsame Textquelle für die Marken-Kernsätze.
 * ------------------------------------------------
 * Wird von zwei Generatoren genutzt, damit Zitat-/Fakten-Texte nur an EINER
 * Stelle gepflegt werden:
 *   • docs/marketing/brand-assets.mjs      → volle Grafik-Kacheln (Vollhintergrund)
 *   • tools/marketing/content-overlays.mjs → transparente Overlays (über eigenes Foto)
 *
 * Ein Wort je Satz trägt den Grün-Türkis-Akzent (<em>…</em>) und ist die Pointe.
 */

export const QUOTES = [
  { key: "01", t: `Nicht jeder Gedanke, den du denkst, ist <em>von dir</em>.` },
  { key: "02", t: `Zwischen Reiz und Reaktion liegt ein Raum. In diesem Raum liegt deine <em>Freiheit</em>.` },
  { key: "03", t: `Du bist nicht deine Gedanken. Du bist der, der sie <em>bemerkt</em>.` },
  { key: "04", t: `Raus aus dem Autopilot – rein in echte innere <em>Klarheit</em>.` },
  { key: "05", t: `Ein Gedanke wird erst zur Wahrheit, wenn du aufhörst, ihn zu <em>hinterfragen</em>.` },
  { key: "06", t: `Alte Muster sind keine Schwäche. Sie waren einmal dein <em>Schutz</em>.` },
  { key: "07", t: `Freiheit beginnt mit einer Frage: Ist dieser Gedanke wirklich <em>meiner</em>?` },
  { key: "08", t: `Du musst deine Gedanken nicht bekämpfen. Nur aufhören, jedem zu <em>glauben</em>.` },
  { key: "09", t: `Nicht die Situation macht dein Gefühl – der <em>Gedanke</em> dazwischen.` },
  { key: "10", t: `Ein Gefühl zu benennen heißt: es halten, ohne mitgerissen zu <em>werden</em>.` },
  { key: "11", t: `Was du wiederholst, wird zu deiner Bahn. Also wähle <em>bewusst</em>.` },
  { key: "12", t: `Wovon du überzeugt bist, formt mit, wie es dir <em>geht</em>.` },
  { key: "13", t: `Der erste Schritt ist nicht Kontrolle. Es ist <em>Bemerken</em>.` },
  { key: "14", t: `Zwischen „so bin ich eben“ und „so wähle ich“ liegt deine ganze <em>Freiheit</em>.` },
  { key: "15", t: `Dein Atem ist die Fernbedienung für dein <em>Nervensystem</em>.` },
  { key: "16", t: `Acht Wochen Übung – und dein Gehirn ist messbar ein <em>anderes</em>.` },
  { key: "17", t: `Deine Erwartung schreibt an deiner Wirklichkeit <em>mit</em>.` },
  { key: "18", t: `Wie etwas genannt wird, entscheidet, wie du es <em>fühlst</em>.` },
  { key: "19", t: `Dein Feed ist nicht die Welt. Nur ein <em>Ausschnitt</em>.` },
  { key: "20", t: `Oft gehört ist nicht wahr. Nur <em>vertraut</em>.` },
  { key: "21", t: `Man verkauft dir den Mangel, den du vorher gar nicht <em>hattest</em>.` },
  { key: "22", t: `Laut ist nicht Mehrheit. Und Mehrheit ist nicht <em>Wahrheit</em>.` },
  { key: "23", t: `Ein Titel ist kein Argument. Prüf die <em>Sache</em>.` },
  { key: "24", t: `Manipulation braucht keine Lüge – nur die richtige <em>Auswahl</em>.` },
  { key: "25", t: `Angst macht dich lenkbar. Ruhe macht dich <em>frei</em>.` },
  { key: "26", t: `Ein Bild ist kein Beweis. Frag, was außerhalb des <em>Rands</em> liegt.` },
];

// Studien-Fakten (belegt; Umstrittenes wird in der Quellenzeile gekennzeichnet)
export const FACTS = [
  { key: "01", t: `In rund <em>47 %</em> der Wachzeit ist unser Geist nicht bei der Sache – und dann unglücklicher.`,
    src: `Killingsworth & Gilbert, Harvard, 2010 („Science“)` },
  { key: "02", t: `Ein Gefühl zu <em>benennen</em> dämpft die Amygdala – die Alarmzentrale des Gehirns.`,
    src: `Lieberman et al., UCLA, 2007` },
  { key: "03", t: `Jonglieren zu lernen verändert in drei Monaten die <em>Struktur</em> des Gehirns.`,
    src: `Draganski et al., 2004 („Nature“)` },
  { key: "04", t: `Wir liegen nicht zufällig daneben – sondern <em>vorhersehbar</em>.`,
    src: `Tversky & Kahneman, 1974 („Science“)` },
  { key: "05", t: `Willenskraft als „Muskel“, der ermüdet? Eine große Replikation fand den Effekt <em>nicht</em>.`,
    src: `Baumeister 1998 – Replikation: Hagger 2016 (umstritten)` },
  { key: "06", t: `Dein Gehirn bleibt <em>formbar</em> – ein Leben lang.`,
    src: `Maguire 2000 · Draganski 2004 (Neuroplastizität)` },
  { key: "07", t: `Rund ein <em>Drittel</em> folgt einer sichtbar falschen Mehrheit – gegen die eigenen Augen.`,
    src: `Solomon Asch, 1951 (Konformitätsexperiment)` },
  { key: "08", t: `Bloße <em>Wiederholung</em> lässt eine Aussage glaubwürdiger wirken – auch wenn sie falsch ist.`,
    src: `Hasher, Goldstein & Toppino, 1977 (Illusory-Truth-Effekt)` },
  { key: "09", t: `Ein Verlust wiegt gefühlt fast <em>doppelt</em> so schwer wie ein gleich großer Gewinn.`,
    src: `Kahneman & Tversky, 1979 (Prospect Theory)` },
  { key: "10", t: `Grübeln löst Probleme nicht – es <em>verlängert</em> und vertieft die trübe Stimmung.`,
    src: `Nolen-Hoeksema, 1991 (Response-Styles-Theorie)` },
  { key: "11", t: `Acht Wochen Achtsamkeit – und die graue Substanz im Hippocampus nimmt <em>messbar</em> zu.`,
    src: `Hölzel et al., 2011 (MBSR; kleine Stichprobe)` },
  { key: "12", t: `Der Placebo-Effekt ist real: Erwartung setzt körpereigene <em>Endorphine</em> frei.`,
    src: `Placebo-Forschung, u. a. Benedetti` },
  { key: "13", t: `Unter dem Druck einer <em>Autorität</em> handeln viele gegen ihr eigenes Gewissen.`,
    src: `Stanley Milgram, 1963 (ethisch umstritten)` },
  { key: "14", t: `Die Überzeugung, wachsen zu können, verbessert das <em>Lernen</em> – der Effekt ist real, aber kleiner als oft behauptet.`,
    src: `Carol Dweck, „Mindset“ – Replikation zeigt bescheidene Effekte` },
];
