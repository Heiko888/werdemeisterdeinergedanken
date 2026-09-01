# LinkedIn – Woche 24 · Block C · Mentale Selbstverteidigung – Ablenkung

> Kanal-Planer: linkedin. Frequenz-Stufe: **fokussiert (3 Posts)**. Quelle:
> `docs/marketing/redaktionsplan/themen-backlog.md`, Block C, Zeile
> „Ablenkung" (Zeile 98). Reel-Serie `selbstverteidigung` in
> `src/lib/reels.ts`, Zeile 41: „Ablenkung", Hook „Keine Lüge. Nur Lärm.",
> `filmed: false`. Alle Slugs/Pfade gegen `src/lib/blog.ts` (Zeile 1546),
> `src/lib/deep-dives.ts` (Zeile 1423), `docs/carousels/marketing-serien.mjs`
> geprüft (`rg`/`ls`, s. Prüfvermerke unten).
>
> Bild-Assets: **Creme-Variante als Standard** (`-hell.png`), s.
> `docs/marketing/zitate/4x5/` bzw. `docs/marketing/zitate/studien-4x5/`.

## Woche

| Tag | Uhrzeit | Format | Inhalt / Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Di | 07:30 | 📝 Beitrag | **Hook (1. Zeile):** „Niemand muss dir eine unbequeme Kennzahl verbieten – es reicht, dass zehn andere Dinge gleichzeitig ‚dringend‘ sind." Text überträgt den Blog-Kern (die wirksamste Art, eine unbequeme Wahrheit unschädlich zu machen, ist nicht das Verbot, sondern der Lärm – bei hundert lauten Reizen geht das Wichtige unter, ohne dass jemand es verbieten müsste) auf den Arbeitsalltag: ein voller Kalender aus Meetings und Slack-Nachrichten lässt keine Zeit, die eine wirklich wichtige, aber leise Entwicklung im Projekt in Ruhe anzuschauen; „dringend" verdrängt „wichtig", weil das Laute immer zuerst Aufmerksamkeit bekommt; wer ständig auf das nächste Feuer reagiert, verpasst genau die stille Entwicklung, die das Geschäft in einem halben Jahr wirklich prägt. Kern: Deine Aufmerksamkeit ist begrenzt und wertvoll – wer sie in Beschlag nimmt, entscheidet mit, worüber du überhaupt nachdenkst. Schluss: die Unterscheidung aus dem Artikel, auf den Job zugespitzt – „Ist das gerade dringend, oder ist es nur laut?" | Blog `/blog/ablenkung-keine-luege-nur-laerm` (verifiziert in `src/lib/blog.ts`, Zeile 1546–1609: Zitat „Du musst niemandem den Mund verbieten, wenn alle gleichzeitig reden" Zeile 1580–1581, Abschnitt „Aufmerksamkeit ist die eigentliche Währung" Zeile 1572–1577, Übungsliste Zeile 1596–1602) | Kommentar-Frage: „Welche wichtige, aber leise Entwicklung in deinem Projekt ist zuletzt im Trubel des Tagesgeschäfts untergegangen?" (Soft-Engagement, kein harter Link) |
| Mi | 08:00 | 🖼️ Carousel | Document-Post „4 Wege zur mentalen Freiheit" – sachlicher Ton, Fokus auf das Step-Slide „Informationsdiät": „Der ständige Strom aus Nachrichten und Social Media macht dich empfänglich für unbemerkte Beeinflussung." mit dem Hinweis-Kasten „Feste Handy-Zeiten. Erste Stunde nach dem Aufwachen und letzte vor dem Schlafen: bildschirmfrei." Im Begleittext auf Benachrichtigungsflut und Dauererreichbarkeit im Job zugespitzt: Wer im Job ständig auf jede Nachricht reagiert, verwechselt Reaktionsgeschwindigkeit mit Wichtigkeit – feste, bewusst reizarme Zeitfenster sind der Gegenzug. | Carousel-Serie `4-wege-freiheit` in `docs/carousels/marketing-serien.mjs`, Zeilen 61–89 (Step-Slide „Informationsdiät" Zeile 70–72) | „Speichern für den nächsten Tag, an dem zehn Dinge gleichzeitig ‚dringend‘ sind." → kein Link, reines Save/Share |
| Do | 07:45 | 🎯 Pitch | **Hook:** „Fokus ist im Dauerlärm keine Selbstverständlichkeit, sondern eine Entscheidung, die du im Job täglich neu triffst." Kurzer Text stellt Ablenkung als vierzehnten Baustein der Reihe „Mentale Selbstverteidigung" vor, mit Verweis auf die konkrete Übung aus der Vertiefung („Der Aufreger-Filter": bei jeder Aufregung fragen, ob sie das eigene Leben wirklich betrifft oder nur die eigene Erregung bedient). Einstieg über das kostenlose E-Book, vollständige Vertiefung samt PDF im Mitgliederbereich. | Deep-Dive `ablenkung` (verifiziert in `src/lib/deep-dives.ts`, Zeile 1423–1478: Abschnitt „Informationsüberflutung" Zeile 1443, Übung „Der Aufreger-Filter" Zeile 1449–1456) · Route `/mitglieder/wissen/ablenkung` (`src/app/mitglieder/wissen/[slug]/page.tsx`) + PDF `content/pdf/vertiefung-ablenkung.pdf` (verifiziert per `ls content/pdf/`) | Soft-CTA: „Kostenloses E-Book sichern" → `/#ebook`; für bereits Registrierte: „Vertiefung „Ablenkung & Überflutung" direkt in der Mitgliedschaft" → `/mitglieder` |

## Hinweise zur Umsetzung

- **Rhythmus eingehalten:** Textbeitrag früh in der Pendelzeit (Di 07:30), Carousel Mitte der Woche (Mi 08:00), Pitch zum Wochenausklang (Do 07:45) – identischer Rhythmus wie in Woche 11–23.
- **Kein Freitag/Wochenende belegt** – bei „fokussiert" bleiben drei Slots Di–Do.
- **Carousel-Auswahl begründet:** Das Step-Slide „Informationsdiät" aus `4-wege-freiheit` trifft den Kern von Ablenkung/Überflutung direkt (Reizmenge, bewusste reizarme Zeitfenster) – kein ⚠ nötig, da der Mechanismus (zu viel gleichzeitiger Input erschöpft die Urteilsfähigkeit) identisch zum Blogthema ist.
- **Berufsbezug durchgängig:** Meeting-Dichte, Benachrichtigungsflut, Dringend-vs-wichtig – dieselbe Kernthese wie in den anderen Kanälen (Ablenkung: „Du musst niemandem den Mund verbieten, wenn alle gleichzeitig reden"), aus Arbeitsperspektive übersetzt.
- **Kein Video-Slot:** Die Reel-Serie „selbstverteidigung" (`src/lib/reels.ts`, Zeile 41, Eintrag „Ablenkung") ist zum Planungszeitpunkt mit `filmed: false` markiert – kein natives YouTube-Teilen möglich.
- **Ton:** sachlich, wertig, These zuerst – kein Boulevard-Stil. Bewusst überparteilich (Ablenkung wird als allgemeiner Aufmerksamkeitsmechanismus erklärt, nicht an einem konkreten Aufreger-Thema aufgehängt).
- Es wurden keine neuen Slugs/Assets erfunden; alle Quellenangaben sind mit Datei/Zeile oder Verzeichnis-Listing belegt.
