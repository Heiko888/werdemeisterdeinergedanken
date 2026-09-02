# LinkedIn – Woche 22 · Block C · Mentale Selbstverteidigung – Medien-Agenda

> Kanal-Planer: linkedin. Frequenz-Stufe: **fokussiert (3 Posts)**. Quelle:
> `docs/marketing/redaktionsplan/themen-backlog.md`, Block C, Zeile
> „Medien-Agenda" (Zeile 96). Reel-Serie `selbstverteidigung` in
> `src/lib/reels.ts`, Zeile 34: „Medien-Agenda", Hook „Nicht WAS – sondern
> WORÜBER", `filmed: false`. Alle Slugs/Pfade gegen `src/lib/blog.ts`
> (Zeile 1416), `src/lib/deep-dives.ts` (Zeile 1017),
> `docs/carousels/marketing-serien.mjs` geprüft (`rg`/`ls`, s. Prüfvermerke
> unten).
>
> Bild-Assets: **Creme-Variante als Standard** (`-hell.png`), s.
> `docs/marketing/zitate/4x5/` bzw. `docs/marketing/zitate/studien-4x5/`.

## Woche

| Tag | Uhrzeit | Format | Inhalt / Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Di | 07:30 | 📝 Beitrag | **Hook (1. Zeile):** „Wer die Tagesordnung eines Meetings schreibt, entscheidet mehr als jeder Redebeitrag danach." Text überträgt den Blog-Kern (Agenda-Setting: Medien sagen uns nicht, was wir denken sollen, sondern worüber – ein Thema, das täglich auftaucht, wirkt automatisch wichtig, eines, das fehlt, existiert in der Debatte praktisch nicht) auf Arbeitsstrukturen: Die Reihenfolge der Tagesordnungspunkte lenkt, wie viel Zeit und Ernsthaftigkeit ein Thema bekommt; wer bestimmt, welche drei Themen im Jour fixe wöchentlich vorkommen, bestimmt mit, was im Team als „gerade wichtig" gilt – unabhängig davon, was objektiv am dringendsten wäre; ein Projekt, das nie im Statusbericht auftaucht, existiert für die Geschäftsführung praktisch nicht, egal wie viel Arbeit dahintersteckt. Kern: Nicht die Antwort formt die Meinung, sondern die Frage, die überhaupt gestellt wird. Schluss: die Frage aus dem Artikel, auf den Job zugespitzt – „Welches wichtige Thema kommt in unseren Meetings eigentlich nie vor?" | Blog `/blog/medien-agenda-nicht-was-sondern-worueber` (verifiziert in `src/lib/blog.ts`, Zeile 1416–1479: Zitat „Nicht die Antwort formt deine Meinung, sondern die Frage, die man dir überhaupt stellt" Zeile 1450–1451, Abschnitt „Die Macht der Auswahl" Zeile 1442–1447, Übungsliste Zeile 1466–1472) | Kommentar-Frage: „Welches Thema müsste in eurem nächsten Team-Meeting eigentlich auf die Tagesordnung – steht aber nie drauf?" (Soft-Engagement, kein harter Link) |
| Mi | 08:00 | 🖼️ Carousel | Document-Post „Wer denkt hier eigentlich?" – sachlicher Ton, Fokus auf das Step-Slide „Algorithmen & Filterblasen": „Algorithmen wissen, welche Inhalte dich fesseln, und zeigen gezielt genau das. So entstehen Filterblasen, die deine Sicht Stück für Stück verengen." Im Begleittext auf interne Informationskanäle im Job zugespitzt: Wie ein Algorithmus im Feed, entscheidet auch die interne Themenauswahl (Intranet, Team-Chat, Rundmail) darüber, worüber im Unternehmen überhaupt gesprochen wird – die Auswahl selbst ist die Botschaft. ⚠ Hinweis: Dieses Slide wurde bereits in Woche 12 (Algorithmen & Filterblasen) als Hauptbeleg genutzt; es wird hier erneut herangezogen, weil Algorithmus-Kuratierung und journalistisches Agenda-Setting denselben Grundmechanismus teilen (Auswahl entscheidet über Aufmerksamkeit) – keine der 5 evergreenen Serien führt ein eigenes Agenda-Setting-Slide. | Carousel-Serie `wer-denkt-hier` in `docs/carousels/marketing-serien.mjs`, Zeilen 91–114 (Step-Slide „Algorithmen & Filterblasen" Zeile 99–100) | „Speichern für die nächste Team-Runde, in der ein wichtiges Thema einfach nie auf der Agenda steht." → kein Link, reines Save/Share |
| Do | 07:45 | 🎯 Pitch | **Hook:** „Die Agenda zu durchschauen macht dich nicht zynisch – es macht dich zum aufmerksameren Kollegen." Kurzer Text stellt Medien-Agenda als zwölften Baustein der Reihe „Mentale Selbstverteidigung" vor, mit Verweis auf die konkrete Übung aus der Vertiefung („Die Weglass-Frage": bei jedem Titelthema fragen, warum genau dieses Thema, warum jetzt, warum so groß – und was gar nicht vorkommt). Einstieg über das kostenlose E-Book, vollständige Vertiefung samt PDF im Mitgliederbereich. | Deep-Dive `medien-agenda` (verifiziert in `src/lib/deep-dives.ts`, Zeile 1017–1072: Abschnitt „Auswahl, Häufigkeit, Weglassen" Zeile 1029, Übung „Die Weglass-Frage" Zeile 1043–1050) · Route `/mitglieder/wissen/medien-agenda` (`src/app/mitglieder/wissen/[slug]/page.tsx`) + PDF `content/pdf/vertiefung-medien-agenda.pdf` (verifiziert per `ls content/pdf/`) | Soft-CTA: „Kostenloses E-Book sichern" → `/#ebook`; für bereits Registrierte: „Vertiefung „Medien & Aufmerksamkeit" direkt in der Mitgliedschaft" → `/mitglieder` |

## Hinweise zur Umsetzung

- **Rhythmus eingehalten:** Textbeitrag früh in der Pendelzeit (Di 07:30), Carousel Mitte der Woche (Mi 08:00), Pitch zum Wochenausklang (Do 07:45) – identischer Rhythmus wie in Woche 11–21.
- **Kein Freitag/Wochenende belegt** – bei „fokussiert" bleiben drei Slots Di–Do.
- **Carousel-Auswahl mit Abweichung:** Kein Slide der 5 evergreenen Serien behandelt Agenda-Setting direkt. Das Step-Slide „Algorithmen & Filterblasen" aus `wer-denkt-hier` (bereits Hauptbeleg in Woche 12) ist die nächstpassende reale Slide, da Themenauswahl durch Redaktionen und Kuratierung durch Algorithmen denselben Mechanismus teilen – klar als Zweitverwendung (⚠) markiert.
- **Berufsbezug durchgängig:** Meeting-Tagesordnungen, Statusberichte, interne Kommunikationskanäle – dieselbe Kernthese wie in den anderen Kanälen (Medien-Agenda: „Nicht die Antwort formt deine Meinung, sondern die Frage, die man dir überhaupt stellt"), aus Arbeitsperspektive übersetzt.
- **Kein Video-Slot:** Die Reel-Serie „selbstverteidigung" (`src/lib/reels.ts`, Zeile 34, Eintrag „Medien-Agenda") ist zum Planungszeitpunkt mit `filmed: false` markiert – kein natives YouTube-Teilen möglich.
- **Ton:** sachlich, wertig, These zuerst – kein Boulevard-Stil. Bewusst überparteilich (Agenda-Setting wird als Mechanismus erklärt, nicht an einem konkreten Medienhaus aufgehängt).
- Es wurden keine neuen Slugs/Assets erfunden; alle Quellenangaben sind mit Datei/Zeile oder Verzeichnis-Listing belegt.
