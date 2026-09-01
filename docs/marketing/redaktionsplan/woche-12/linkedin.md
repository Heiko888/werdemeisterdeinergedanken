# LinkedIn – Woche 12 · Block C · Mentale Selbstverteidigung – Filterblase & Algorithmen

> Kanal-Planer: linkedin. Frequenz-Stufe: **fokussiert (3 Posts)**. Quelle:
> `docs/marketing/redaktionsplan/themen-backlog.md`, Block C, Zeile
> „Filterblase / Algorithmen" (Zeile 86). Alle Slugs/Pfade gegen
> `src/lib/blog.ts` (Zeile 488), `src/lib/deep-dives.ts` (Zeile 1075),
> `docs/carousels/marketing-serien.mjs` geprüft (`rg`/`ls`, s. Prüfvermerke
> unten).
>
> Bild-Assets: **Creme-Variante als Standard** (`-hell.png`), s.
> `docs/marketing/zitate/4x5/` bzw. `docs/marketing/zitate/studien-4x5/`.

## Woche

| Tag | Uhrzeit | Format | Inhalt / Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Di | 07:30 | 📝 Beitrag | **Hook (1. Zeile):** „Wer nur die Meinungen im eigenen Team-Chat hört, hält sie schnell für den ganzen Markt." Text überträgt den Blog-Kern (Algorithmen zeigen mehr von dem, worauf du reagierst, und bestätigen so die eigene Sicht, statt sie herauszufordern) in den Arbeitsalltag: interne Slack-/Teams-Kanäle, das eigene berufliche Netzwerk auf LinkedIn selbst, Kundenfeedback-Kanäle – überall verstärkt sich, was ohnehin schon Zuspruch bekommt, während leise Gegenstimmen unsichtbar bleiben. Eine Produktentscheidung, die auf „alle im Kanal sehen das so" beruht, beruht oft nur auf einer kuratierten Auswahl. Schluss: die Frage aus dem Artikel, zugespitzt auf Projektentscheidungen – „Warum sehe ich diese Rückmeldungen gerade – und welche sehe ich nicht?" | Blog `/blog/filterblase-warum-dein-feed-nicht-die-welt-ist` (verifiziert in `src/lib/blog.ts`, Zeile 488–550: Zitat „Dein Feed ist ein Spiegel deines Verhaltens, kein Fenster zur Welt" Zeile 515, Übungsliste Zeile 538–545) | Kommentar-Frage: „Wann hast du zuletzt eine Entscheidung getroffen, weil ‚alle‘ derselben Meinung zu sein schienen – und wie viele hast du davon wirklich gefragt?" (Soft-Engagement, kein harter Link) |
| Mi | 08:00 | 🖼️ Carousel | Document-Post „Wer denkt hier eigentlich?" – sachlicher Ton, Fokus auf das Slide „Algorithmen & Filterblasen": „Algorithmen wissen, welche Inhalte dich fesseln, und zeigen gezielt genau das. So entstehen Filterblasen, die deine Sicht Stück für Stück verengen." Im Begleittext auf interne Informationskanäle und Marktbeobachtung im Beruf zugespitzt: Wer sein Marktbild nur aus dem eigenen, algorithmisch kuratierten Feed bezieht, verwechselt die eigene Blase mit der Realität des Marktes. | Carousel-Serie `wer-denkt-hier` in `docs/carousels/marketing-serien.mjs`, Zeilen 91–114 (Slide „Algorithmen & Filterblasen" Zeile 99–100, Warnsignal-Liste Zeile 103–108) | „Speichern für die nächste Entscheidung, die auf ‚dem Feed‘ statt auf echten Daten beruht." → kein Link, reines Save/Share |
| Do | 07:45 | 🎯 Pitch | **Hook:** „Dein beruflicher Marktüberblick ist manchmal nur ein gut kuratierter Ausschnitt – und das lässt sich prüfen." Kurzer Text stellt Algorithmen & Filterblasen als zweiten Baustein der Reihe „Mentale Selbstverteidigung" vor, mit Verweis auf die praktischen Gegenmaßnahmen aus der Vertiefung (bewusst gegensätzliche, seriöse Quellen abonnieren; eine Woche nicht auf reine Empörungs-Inhalte klicken). Einstieg über das kostenlose E-Book, vollständige Vertiefung samt PDF im Mitgliederbereich. | Deep-Dive `algorithmen` (verifiziert in `src/lib/deep-dives.ts`, Zeile 1075–1130: Abschnitt „Du bekommst mehr von dem, worauf du reagierst") · Route `/mitglieder/wissen/algorithmen` (`src/app/mitglieder/wissen/[slug]/page.tsx`) + PDF `content/pdf/vertiefung-algorithmen.pdf` (verifiziert per `ls content/pdf/`) | Soft-CTA: „Kostenloses E-Book sichern" → `/#ebook`; für bereits Registrierte: „Vertiefung „Algorithmen & Filterblasen" direkt in der Mitgliedschaft" → `/mitglieder` |

## Hinweise zur Umsetzung

- **Rhythmus eingehalten:** Di 07:30 Beitrag, Mi 08:00 Carousel, Do 07:45 Pitch – konsistent mit Woche 1–11.
- **Kein Freitag/Wochenende belegt** – drei Slots Di–Do gemäß „fokussiert".
- **Carousel-Auswahl begründet:** Die Serie `wer-denkt-hier` enthält mit dem Slide „Algorithmen & Filterblasen" eine wörtliche Entsprechung des Wochenthemas – die direkteste Übereinstimmung unter den 5 evergreenen Serien. Dieselbe Serie wurde in Woche 2 bereits mit anderem Fokus (Reiz-Reaktions-Lücke, Remedy-Slide) verwendet; hier steht ein anderes Slide im Zentrum, um Redundanz zu vermeiden.
- **Berufsbezug durchgängig:** interne Kommunikationskanäle, das eigene berufliche Netzwerk, kuratierte Kundenfeedback-Kanäle – dieselbe Kernthese wie in den anderen Kanälen (Filterblase: „Dein Feed ist ein Spiegel deines Verhaltens"), aus Arbeitsperspektive übersetzt.
- **Kein Video-Slot:** Reel-Serie „selbstverteidigung" (`src/lib/reels.ts`, Zeile 35, Eintrag „Algorithmen") steht mit `filmed: false` – kein natives Teilen möglich.
- **Ton:** sachlich, wertig, These zuerst – kein Boulevard-Stil.
- Es wurden keine neuen Slugs/Assets erfunden; alle Quellenangaben sind mit Datei/Zeile oder Verzeichnis-Listing belegt.
