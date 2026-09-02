# LinkedIn – Woche 25 · Block C · Mentale Selbstverteidigung – Normalisierung

> Kanal-Planer: linkedin. Frequenz-Stufe: **fokussiert (3 Posts)**. Quelle:
> `docs/marketing/redaktionsplan/themen-backlog.md`, Block C, Zeile
> „Normalisierung" (Zeile 99). Reel-Serie `selbstverteidigung` in
> `src/lib/reels.ts`, Zeile 43: „Normalisierung", Hook „‚War doch schon immer
> so?‘", `filmed: false`. Alle Slugs/Pfade gegen `src/lib/blog.ts`
> (Zeile 1611), `src/lib/deep-dives.ts` (Zeile 1539),
> `docs/carousels/marketing-serien.mjs` geprüft (`rg`/`ls`, s. Prüfvermerke
> unten).
>
> Bild-Assets: **Creme-Variante als Standard** (`-hell.png`), s.
> `docs/marketing/zitate/4x5/` bzw. `docs/marketing/zitate/studien-4x5/`.

## Woche

| Tag | Uhrzeit | Format | Inhalt / Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Di | 07:30 | 📝 Beitrag | **Hook (1. Zeile):** „‚Das war schon immer so‘ ist im Job selten eine Begründung – es ist der Satz, mit dem sich Gewöhnung selbst tarnt." Text überträgt den Blog-Kern (was oft genug wiederholt wird, fühlt sich irgendwann normal an, auch wenn es das nicht sein sollte – Normalisierung arbeitet in kleinen Schritten, keiner davon groß genug, um Widerspruch auszulösen) auf Arbeitsstrukturen: unbezahlte Überstunden, die zuerst die Ausnahme waren und irgendwann als selbstverständlich gelten; ein Kommunikationston, der über Jahre schärfer wurde, ohne dass irgendjemand den einzelnen Schritt bemerkt hätte; ein Prozess, der ursprünglich eine Notlösung war und nie wieder infrage gestellt wurde, weil er inzwischen „einfach dazugehört". Kern: Hätte man dir den Endzustand am Anfang gezeigt, hättest du protestiert – in vielen kleinen Schritten gewöhnst du dich daran. Schluss: die Übungsfrage aus dem Artikel, auf den Job zugespitzt – „Hätte mich das vor fünf Jahren noch gestört? Wenn ja – warum jetzt nicht mehr?" | Blog `/blog/normalisierung-war-doch-schon-immer-so` (verifiziert in `src/lib/blog.ts`, Zeile 1611–1674: Zitat „‚War schon immer so‘ beschreibt eine Gewohnheit – und begründet gar nichts" Zeile 1645–1646, Abschnitt „Die verschobene Grenze" Zeile 1637–1642, Übungsliste Zeile 1661–1667) | Kommentar-Frage: „Welche Arbeitsweise in deinem Team würde einem neuen Kollegen am ersten Tag auffallen – dir aber schon lange nicht mehr?" (Soft-Engagement, kein harter Link) |
| Mi | 08:00 | 🖼️ Carousel | Document-Post „Wer denkt hier eigentlich?" – sachlicher Ton, Fokus auf das Setup-Slide: „Nicht alle deine Gedanken sind wirklich deine eigenen. Unsere Gedanken formen unsere Realität. Doch in einer Welt voller Botschaften sind wir nicht immer ihre alleinigen Architekten." Im Begleittext bewusst auf schleichende Gewöhnung im Job zugespitzt: Nicht nur einzelne Botschaften, auch ganze Arbeitsnormen entstehen oft nicht aus bewusster Entscheidung, sondern aus unbemerkter Wiederholung. ⚠ Hinweis: Keine der 5 evergreenen Carousel-Serien führt ein eigenes Slide zu Normalisierung/Gewöhnung; das generische Setup-Slide der Serie `wer-denkt-hier` ist die nächstpassende reale Slide und wird hier bewusst auf schrittweise, unbemerkte Verschiebung statt auf einzelne Botschaften zugespitzt. | Carousel-Serie `wer-denkt-hier` in `docs/carousels/marketing-serien.mjs`, Zeilen 91–114 (Setup-Slide Zeile 95–96) | „Speichern für die nächste Arbeitsweise, die du nur noch normal findest, weil du dich daran gewöhnt hast." → kein Link, reines Save/Share |
| Do | 07:45 | 🎯 Pitch | **Hook:** „Die eigenen Maßstäbe bewusst zu halten, statt sie leise verschieben zu lassen, ist im Job eine Führungsaufgabe." Kurzer Text stellt Normalisierung als fünfzehnten Baustein der Reihe „Mentale Selbstverteidigung" vor, mit Verweis auf die konkrete Übung aus der Vertiefung („Der Zeitsprung": bei etwas, das heute völlig normal wirkt, fragen, ob man es vor zehn Jahren auch normal gefunden hätte). Einstieg über das kostenlose E-Book, vollständige Vertiefung samt PDF im Mitgliederbereich. | Deep-Dive `normalisierung` (verifiziert in `src/lib/deep-dives.ts`, Zeile 1539–1594: Abschnitt „Grenzen verschieben sich unbemerkt" Zeile 1559, Übung „Der Zeitsprung" Zeile 1565–1572) · Route `/mitglieder/wissen/normalisierung` (`src/app/mitglieder/wissen/[slug]/page.tsx`) + PDF `content/pdf/vertiefung-normalisierung.pdf` (verifiziert per `ls content/pdf/`) | Soft-CTA: „Kostenloses E-Book sichern" → `/#ebook`; für bereits Registrierte: „Vertiefung „Normalisierung" direkt in der Mitgliedschaft" → `/mitglieder` |

## Hinweise zur Umsetzung

- **Rhythmus eingehalten:** Textbeitrag früh in der Pendelzeit (Di 07:30), Carousel Mitte der Woche (Mi 08:00), Pitch zum Wochenausklang (Do 07:45) – identischer Rhythmus wie in Woche 11–24.
- **Kein Freitag/Wochenende belegt** – bei „fokussiert" bleiben drei Slots Di–Do.
- **Carousel-Auswahl mit Abweichung:** Normalisierung/schleichende Gewöhnung hat unter den 5 evergreenen Serien kein eigenes Slide. Das Setup-Slide von `wer-denkt-hier` ist die nächstpassende reale Slide (externe/unbemerkte Prägung des eigenen Denkens); die Zuspitzung auf schrittweise Verschiebung statt auf einzelne Botschaften ist eine bewusste, klar markierte Interpretation (⚠) – nichts wurde erfunden oder als eigenes Slide ausgegeben.
- **Berufsbezug durchgängig:** Arbeitszeitkultur, Kommunikationston, eingefahrene Prozesse – dieselbe Kernthese wie in den anderen Kanälen (Normalisierung: „‚War schon immer so‘ beschreibt eine Gewohnheit – und begründet gar nichts"), aus Arbeitsperspektive übersetzt.
- **Kein Video-Slot:** Die Reel-Serie „selbstverteidigung" (`src/lib/reels.ts`, Zeile 43, Eintrag „Normalisierung") ist zum Planungszeitpunkt mit `filmed: false` markiert – kein natives YouTube-Teilen möglich.
- **Ton:** sachlich, wertig, These zuerst – kein Boulevard-Stil. Bewusst überparteilich (Normalisierung wird als allgemeiner Gewöhnungsmechanismus erklärt, nicht an einem politischen Beispiel aufgehängt).
- Es wurden keine neuen Slugs/Assets erfunden; alle Quellenangaben sind mit Datei/Zeile oder Verzeichnis-Listing belegt.
