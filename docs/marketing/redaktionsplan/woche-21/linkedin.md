# LinkedIn – Woche 21 · Block C · Mentale Selbstverteidigung – Sprache & Etiketten

> Kanal-Planer: linkedin. Frequenz-Stufe: **fokussiert (3 Posts)**. Quelle:
> `docs/marketing/redaktionsplan/themen-backlog.md`, Block C, Zeile
> „Sprache & Etiketten" (Zeile 95). Reel-Serie `selbstverteidigung` in
> `src/lib/reels.ts`, Zeile 33: „Sprache & Etiketten", Hook „Ein Wort beendet
> jede Debatte", `filmed: false`. Alle Slugs/Pfade gegen `src/lib/blog.ts`
> (Zeile 1351), `src/lib/deep-dives.ts` (Zeile 959),
> `docs/carousels/marketing-serien.mjs` und `docs/marketing/content-data.mjs`
> geprüft (`rg`/`ls`, s. Prüfvermerke unten).
>
> Bild-Assets: **Creme-Variante als Standard** (`-hell.png`), s.
> `docs/marketing/zitate/4x5/` bzw. `docs/marketing/zitate/studien-4x5/`.

## Woche

| Tag | Uhrzeit | Format | Inhalt / Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Di | 07:30 | 📝 Beitrag | **Hook (1. Zeile):** „Sobald ein Kollege im Meeting als ‚Bedenkenträger‘ einsortiert ist, hört niemand mehr, was er inhaltlich sagt." Text überträgt den Blog-Kern (ein Etikett verpackt eine ganze Bewertung in ein einziges Wort – wer es benutzt, muss nichts mehr begründen; die Wertung reist im Begriff mit) auf Arbeitssprache: „Bedenkenträger" statt „hat eine kritische Rückfrage", „Blockierer" statt „hat einen validen Einwand", „Traditionalist" statt „kennt die Altlasten des Systems" – dieselbe Aussage, aber mit Etikett schon vorverurteilt, bevor der Inhalt geprüft wurde. Kern: Sobald ein Etikett klebt, hören wir nicht mehr die Aussage, sondern nur noch die Kategorie – auch ein richtiger Einwand wirkt dann falsch, weil er aus dem „falschen" Mund kommt. Schluss: die entscheidende Frage aus dem Artikel, auf den Job zugespitzt – „Wird hier ein Argument widerlegt, oder nur ein Kollege abgestempelt?" | Blog `/blog/sprache-und-etiketten-wie-ein-etikett-das-denken-beendet` (verifiziert in `src/lib/blog.ts`, Zeile 1351–1414: Zitat „Ein Etikett muss nichts beweisen. Es muss nur kleben bleiben" Zeile 1385–1387, Abschnitt „Vom Menschen zur Kategorie" Zeile 1389–1394, Übungsliste Zeile 1401–1407) | Kommentar-Frage: „Welches Etikett wird in deinem Team benutzt, um einen Einwand nicht mehr inhaltlich prüfen zu müssen?" (Soft-Engagement, kein harter Link) |
| Mi | 08:00 | 🖼️ Carousel | Document-Post „Studien-Fakten" – sachlicher Ton, Fokus auf Fakt 04 „Dein Kopf verzerrt – systematisch" (Tversky & Kahneman, 1974): Was leicht einfällt, halten wir für häufig; das zuerst genannte Wort oder die zuerst genannte Zahl färbt jedes weitere Urteil. Im Begleittext auf Etiketten im Job zugespitzt: Ein einziges Wort im Protokoll oder in der internen Kommunikation wirkt wie dieser Anker – es setzt die Bewertung, bevor der Sachverhalt geprüft ist. ⚠ Hinweis: Diese Slide wurde bereits in Woche 11 (Framing) als Beleg für den Anker-Effekt genutzt; sie wird hier mit anderem Fokus (Etiketten als Wort-Anker statt Zahlen-Anker) erneut herangezogen, da keine der 5 evergreenen Serien ein eigenes Slide zu Sprache & Etiketten führt. | Carousel-Serie `studien-fakten` in `docs/carousels/marketing-serien.mjs`, Zeilen 117–146 (Fakt 04 „Dein Kopf verzerrt – systematisch" Zeile 134–136) | „Speichern für das nächste Etikett, das im Meeting fällt, bevor ein Argument geprüft wurde." → kein Link, reines Save/Share |
| Do | 07:45 | 🎯 Pitch | **Hook:** „Ein Etikett zu lösen heißt nicht, jede Aussage gutzuheißen – es heißt, den Kollegen wieder vom Wort zu trennen." Kurzer Text stellt Sprache & Etiketten als elften Baustein der Reihe „Mentale Selbstverteidigung" vor, mit Verweis auf die konkrete Übung aus der Vertiefung („Etikett abziehen": das Etikett aus einer Aussage streichen und neutral prüfen, ob sie noch überzeugt). Einstieg über das kostenlose E-Book, vollständige Vertiefung samt PDF im Mitgliederbereich. | Deep-Dive `sprache-und-etiketten` (verifiziert in `src/lib/deep-dives.ts`, Zeile 959–1014: Abschnitt „Das Etikett ersetzt das Argument" Zeile 971, Übung „Etikett abziehen" Zeile 985–992) · Route `/mitglieder/wissen/sprache-und-etiketten` (`src/app/mitglieder/wissen/[slug]/page.tsx`) + PDF `content/pdf/vertiefung-sprache-und-etiketten.pdf` (verifiziert per `ls content/pdf/`) | Soft-CTA: „Kostenloses E-Book sichern" → `/#ebook`; für bereits Registrierte: „Vertiefung „Sprache & Etiketten" direkt in der Mitgliedschaft" → `/mitglieder` |

## Hinweise zur Umsetzung

- **Rhythmus eingehalten:** Textbeitrag früh in der Pendelzeit (Di 07:30), Carousel Mitte der Woche (Mi 08:00), Pitch zum Wochenausklang (Do 07:45) – identischer Rhythmus wie in Woche 11–20.
- **Kein Freitag/Wochenende belegt** – bei „fokussiert" bleiben drei Slots Di–Do.
- **Carousel-Auswahl mit Abweichung:** Kein Slide der 5 evergreenen Serien behandelt Etiketten/Sprache direkt. Fakt 04 „Dein Kopf verzerrt – systematisch" (Anchoring-Effekt, Tversky & Kahneman) ist die nächstpassende reale Slide, weil derselbe Mechanismus – das zuerst Genannte färbt das Urteil – bei einem Etikett genauso greift wie bei einer Zahl. Bereits in Woche 11 verwendet; hier mit anderem inhaltlichen Fokus, klar als Zweitverwendung/Abweichung (⚠) markiert.
- **Berufsbezug durchgängig:** Meeting-Sprache, interne Protokolle, Team-Kommunikation – dieselbe Kernthese wie in den anderen Kanälen (Sprache & Etiketten: „Ein Etikett muss nichts beweisen. Es muss nur kleben bleiben"), aus Arbeitsperspektive übersetzt.
- **Kein Video-Slot:** Die Reel-Serie „selbstverteidigung" (`src/lib/reels.ts`, Zeile 33, Eintrag „Sprache & Etiketten") ist zum Planungszeitpunkt mit `filmed: false` markiert – kein natives YouTube-Teilen möglich.
- **Ton:** sachlich, wertig, These zuerst – kein Boulevard-Stil. Bewusst überparteilich (Etiketten werden als Sprachmechanismus erklärt, nicht an einem politischen Reizwort aufgehängt).
- Es wurden keine neuen Slugs/Assets erfunden; alle Quellenangaben sind mit Datei/Zeile oder Verzeichnis-Listing belegt.
