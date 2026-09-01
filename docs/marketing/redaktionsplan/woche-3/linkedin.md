# LinkedIn – Woche 3 · Block A · Stufe 3 „Selbstbeobachtung"

> Kanal-Planer: linkedin. Frequenz-Stufe: **fokussiert (3 Posts)**. Quelle:
> `docs/marketing/redaktionsplan/themen-backlog.md`, Block A, Zeile „Woche 3 –
> Stufe 3 · Selbstbeobachtung". Alle Slugs/Pfade gegen `src/lib/blog.ts`
> (Zeile 1143), `src/lib/deep-dives.ts` (Zeile 162), `src/lib/practices.ts`
> (Zeile 87), `docs/carousels/marketing-serien.mjs` und
> `docs/marketing/content-data.mjs` geprüft (`rg`/`ls`, s. Prüfvermerke unten).
>
> Bild-Assets: **Creme-Variante als Standard** (`-hell.png`), s.
> `docs/marketing/zitate/4x5/` bzw. `docs/marketing/zitate/studien-4x5/`.

## Woche

| Tag | Uhrzeit | Format | Inhalt / Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Di | 07:30 | 📝 Beitrag | **Hook (1. Zeile):** „Die erste Zahl in einer Verhandlung entscheidet mehr, als den meisten lieb ist – auch wenn sie komplett aus der Luft gegriffen war." Text übersetzt drei der im Blog beschriebenen Denkfehler in Arbeitskontexte: (1) *Verankerung* – das erste Gehaltsangebot oder der erste Projektpreis färbt jede spätere Einschätzung, selbst wenn er willkürlich war. (2) *Verfügbarkeitsheuristik* – ein einziger, dramatischer Ausfall aus der Erinnerung lässt ein Risiko riesig wirken, obwohl die Statistik etwas anderes sagt. (3) *Bestätigungsfehler* – im Bewerbungsgespräch oder Projekt-Review sucht man unbewusst nach Belegen für den ersten Eindruck und übersieht den Rest. Schluss (nach Aaron Beck übertragen): Diese Muster verschwinden nicht durch mehr Intelligenz, sondern durch eine kurze Pause vor der Entscheidung – die Frage „Ist das ein Fakt oder meine Interpretation?" | Blog `/blog/denkfehler-wie-dein-kopf-die-wirklichkeit-verzerrt` (verifiziert in `src/lib/blog.ts`, Zeile 1143–1197: Abschnitt „Kahneman und Tversky", Liste „Verfügbarkeitsheuristik / Verankerung / Bestätigungsfehler") | Kommentar-Frage: „Welchen dieser drei Denkfehler hast du bei dir selbst schon in einer Verhandlung oder Entscheidung erwischt?" (Soft-Engagement, kein harter Link) |
| Mi | 08:15 | 🖼️ Carousel | Document-Post „Studien-Fakten: Was die Forschung über dein Denken weiß" – sachlicher Ton, Fokus auf das Fakt-Slide „Dein Kopf verzerrt – systematisch" (Tversky & Kahneman, 1974) sowie das Remedy-Slide „So liest du Studien richtig". Im Begleittext auf Strategie- und Entscheidungsrunden im Job zugespitzt: Wer eine einzelne Kennzahl oder Studie unkritisch übernimmt, wiederholt genau den Denkfehler, den die Forschung seit 50 Jahren beschreibt – die Gegenfrage „Wie groß war die Stichprobe, wurde der Befund repliziert?" gehört in jedes Strategie-Meeting. | Carousel-Serie `studien-fakten` in `docs/carousels/marketing-serien.mjs`, Zeilen 117–145 (Fakt-Slide „04" Zeile 134–136, Remedy-Slide Zeile 140–142). Ergänzend als Sharepic: `docs/marketing/zitate/studien-4x5/WMDG-Studienfakt-04-hell.png` (Text „Wir liegen nicht zufällig daneben – sondern vorhersehbar", `docs/marketing/content-data.mjs`, `FACTS`-Eintrag `key: "04"`) | „Speichern für die nächste Kennzahl, die dir jemand ohne Kontext präsentiert." → kein Link, reines Save/Share |
| Do | 07:45 | 🎯 Pitch | **Hook:** „Du musst deinen inneren Kritiker nicht zum Schweigen bringen – du musst nur lernen, ihm nicht mehr automatisch zu glauben." Kurzer Text stellt die Übung „Der innere Beobachter" als Weg vor, Distanz zu belastenden Arbeitsgedanken zu gewinnen (kognitive Defusion) – gerade nützlich vor wichtigen Präsentationen oder Feedback-Gesprächen, wenn ein Gedanke wie „Ich bin hier nicht kompetent genug" unhinterfragt Macht bekommt. Verweis auf das kostenlose E-Book „Die 7 Stufen kompakt" als Einstieg, mit Blick auf die vollständige Lektion zu Stufe 3 für alle, die tiefer einsteigen wollen. | Praxis `innerer-beobachter` (verifiziert in `src/lib/practices.ts`, Zeile 87–109, `relatedStage: 3`) · Deep-Dive `kognitive-verzerrungen` (`src/lib/deep-dives.ts`, Zeile 162–185: Abschnitt „Vom Erkennen zum Entschärfen") · Lektion `/mitglieder/stufe/3` + PDF `content/pdf/stufe-3-lektion.pdf` und Vertiefungs-PDF `content/pdf/vertiefung-kognitive-verzerrungen.pdf` (beide per `ls content/pdf/` verifiziert) | Soft-CTA: „Kostenloses E-Book sichern" → `/#ebook`; für bereits Registrierte: „Lektion 3 direkt in der Mitgliedschaft" → `/mitglieder` |

## Hinweise zur Umsetzung

- **Rhythmus eingehalten:** Textbeitrag früh (Di 07:30), Carousel Mitte der Woche (Mi 08:15), Pitch zum Wochenausklang (Do 07:45) – identisch zu Woche 1/2.
- **Kein Freitag/Wochenende belegt** – drei Slots Di–Do für „fokussiert".
- **Blog-Slug ist kein „naheliegender" Treffer, sondern exakt passend:** Der Backlog markiert Stufe-3-Blogs generell mit ⚠ („thematisch naheliegend, nicht 1:1"), doch `denkfehler-wie-dein-kopf-die-wirklichkeit-verzerrt` behandelt exakt kognitive Verzerrungen – deckungsgleich mit dem Deep-Dive `kognitive-verzerrungen` dieser Woche. Keine Korrektur nötig.
- **Carousel-Wiederverwendung begründet:** `studien-fakten` wurde bereits so konzipiert, dass jedes Fakt-Slide unabhängig zitierbar ist (Fakt 01–05, je eigene Quelle). Diese Woche wird ausschließlich Fakt „04" (Denkfehler) in den Fokus gerückt; die Slides 01/02/05 werden erst in späteren Wochen (5, 4, 6) mit jeweils eigenem Fach-/Berufsbezug verwendet – keine inhaltliche Doppelung innerhalb der Serie.
- **Kein Video-Slot:** Für Woche 3 existiert ein geplantes YouTube-Hauptvideo (`docs/marketing/redaktionsplan/woche-3/youtube.md`), aber ohne veröffentlichte URL – kein natives Teilen auf LinkedIn möglich, konsistent mit Woche 1/2.
- **Berufsbezug durchgängig:** Verhandlungen, Kennzahlen-Interpretation, Bewerbungs-/Feedbackgespräche – dieselbe Kernthese wie in den anderen Kanälen (Stufe 3 · Selbstbeobachtung), aus Arbeitsperspektive übersetzt.
- **Ton:** sachlich, wertig, These zuerst – kein Boulevard-Stil.
- Es wurden keine neuen Slugs/Assets erfunden; alle Quellenangaben sind mit Datei/Zeile oder Verzeichnis-Listing belegt.
