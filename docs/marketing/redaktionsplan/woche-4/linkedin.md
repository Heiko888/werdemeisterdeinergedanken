# LinkedIn – Woche 4 · Block A · Stufe 4 „Emotionale Reifung"

> Kanal-Planer: linkedin. Frequenz-Stufe: **fokussiert (3 Posts)**. Quelle:
> `docs/marketing/redaktionsplan/themen-backlog.md`, Block A, Zeile „Woche 4 –
> Stufe 4 · Emotionale Reifung". Alle Slugs/Pfade gegen `src/lib/blog.ts`
> (Zeile 1091), `src/lib/deep-dives.ts` (Zeile 533), `src/lib/practices.ts`
> (Zeile 161), `docs/carousels/marketing-serien.mjs` und
> `docs/marketing/content-data.mjs` geprüft (`rg`/`ls`, s. Prüfvermerke unten).
>
> Bild-Assets: **Creme-Variante als Standard** (`-hell.png`), s.
> `docs/marketing/zitate/4x5/` bzw. `docs/marketing/zitate/studien-4x5/`.

## Woche

| Tag | Uhrzeit | Format | Inhalt / Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Di | 07:30 | 📝 Beitrag | **Hook (1. Zeile):** „Ein einziges Wort kann verhindern, dass eine schwierige Rückmeldung zur Eskalation wird." Text übersetzt die UCLA-Studie von Matthew Lieberman (2007) in eine Führungssituation: Vor einem kritischen Feedback-Gespräch steigt innerlich Ärger oder Anspannung. Wer das Gefühl kurz benennt („Da ist gerade Ärger", „Da ist Nervosität"), senkt nachweislich die Aktivität der Amygdala – der Alarmzentrale – und aktiviert den präfrontalen Kortex, der für überlegtes Handeln zuständig ist. Aus „Ich bin sauer" (verschmolzen, wird ausagiert) wird „Ich bemerke Ärger" (mit Abstand, steuerbar). Ergänzt um die Beobachtung, dass die körperliche Welle einer Emotion oft schneller abklingt, als sie sich anfühlt – wenn man sie nicht mit weiteren Gedanken befeuert. Schluss: Das macht Affect Labeling zu einem der am besten belegten Führungswerkzeuge – kein Soft-Skill-Klischee, sondern messbare Neurobiologie. | Blog `/blog/gefuehle-benennen-beruhigt-das-gehirn` (verifiziert in `src/lib/blog.ts`, Zeile 1091–1141: Abschnitt „Die Studie: Feelings into Words", Lieberman/UCLA 2007, Affect Labeling) | Kommentar-Frage: „Vor welcher Art Gespräch hilft dir das Benennen des eigenen Gefühls am meisten – vor Feedback, Konflikt oder Präsentation?" (Soft-Engagement, kein harter Link) |
| Mi | 08:15 | 🖼️ Carousel | Document-Post „Studien-Fakten: Was die Forschung über dein Denken weiß" – sachlicher Ton, Fokus auf das Fakt-Slide „Ein Gefühl zu benennen beruhigt" (Lieberman, UCLA 2007) sowie die Eröffnung „Der abschweifende Geist" (47 % der Wachzeit ist der Geist nicht bei der Sache, Killingsworth & Gilbert, Harvard 2010). Im Begleittext auf Meeting-Präsenz zugespitzt: Ein abgelenkter, unregulierter Kopf trifft nachweislich schlechtere Entscheidungen und wird als weniger präsent erlebt – zwei einfache, beforschte Werkzeuge (Benennen, Aufmerksamkeit zurückholen) wirken dagegen direkt. | Carousel-Serie `studien-fakten` in `docs/carousels/marketing-serien.mjs`, Zeilen 117–145 (Fakt-Slide „02" Zeile 128–130, Stat-Slide „47 %" Zeile 122–124). Ergänzend als Sharepic: `docs/marketing/zitate/studien-4x5/WMDG-Studienfakt-02-hell.png` (Text „Ein Gefühl zu benennen dämpft die Amygdala – die Alarmzentrale des Gehirns", `docs/marketing/content-data.mjs`, `FACTS`-Eintrag `key: "02"`) | „Speichern für das nächste Gespräch, in dem du merkst, wie ein Gefühl hochkommt." → kein Link, reines Save/Share |
| Do | 07:45 | 🎯 Pitch | **Hook:** „Bevor du die scharfe Antwort abschickst: ein Atemzug, der länger aus- als einatmet, reicht oft schon." Kurzer Text stellt die Übung „Verlängertes Ausatmen" als schnellsten Hebel vor, um das Nervensystem aktiv zu beruhigen (Ausatmen länger als Einatmen aktiviert den Parasympathikus) – anwendbar direkt am Schreibtisch vor einer E-Mail-Antwort im Ärger oder vor einem angespannten Call. Verweis auf das kostenlose E-Book „Die 7 Stufen kompakt" als Einstieg, mit Blick auf die vollständige Lektion zu Stufe 4 für alle, die tiefer einsteigen wollen. | Praxis `verlaengertes-ausatmen` (verifiziert in `src/lib/practices.ts`, Zeile 161–182, `relatedStage: 4`) · Deep-Dive `emotionsregulation` (`src/lib/deep-dives.ts`, Zeile 533–556: Abschnitt „Den Körper als Hebel nutzen") · Lektion `/mitglieder/stufe/4` + PDF `content/pdf/stufe-4-lektion.pdf` und Vertiefungs-PDF `content/pdf/vertiefung-emotionsregulation.pdf` (beide per `ls content/pdf/` verifiziert) | Soft-CTA: „Kostenloses E-Book sichern" → `/#ebook`; für bereits Registrierte: „Lektion 4 direkt in der Mitgliedschaft" → `/mitglieder` |

## Hinweise zur Umsetzung

- **Rhythmus eingehalten:** Textbeitrag früh (Di 07:30), Carousel Mitte der Woche (Mi 08:15), Pitch zum Wochenausklang (Do 07:45) – identisch zu den Vorwochen.
- **Kein Freitag/Wochenende belegt** – drei Slots Di–Do für „fokussiert".
- **Carousel-Wiederverwendung begründet:** `studien-fakten` wird diese Woche mit Fokus auf Fakt „02" (Gefühl benennen) plus der Eröffnungs-Stat (47 %) gezeigt – beide Slides sind bereits Teil der Serie und wurden in Woche 3 (Fakt „04") nicht verwendet. Keine Überschneidung der zitierten Slides zwischen den Wochen.
- **Kein Video-Slot:** Für Woche 4 liegt noch kein `docs/marketing/redaktionsplan/woche-4/youtube.md` vor (Stand dieser Planung); selbst wenn ein Hauptvideo für diese Stufe entsteht, gilt dieselbe Regel wie in Woche 1–3: ohne veröffentlichte URL kein natives Teilen auf LinkedIn.
- **Berufsbezug durchgängig:** Feedback-Gespräche, Konflikteskalation, E-Mail-Kommunikation unter Ärger – dieselbe Kernthese wie in den anderen Kanälen (Stufe 4 · Emotionale Reifung), aus Arbeitsperspektive übersetzt.
- **Ton:** sachlich, wertig, These zuerst – kein Boulevard-Stil.
- Es wurden keine neuen Slugs/Assets erfunden; alle Quellenangaben sind mit Datei/Zeile oder Verzeichnis-Listing belegt.
