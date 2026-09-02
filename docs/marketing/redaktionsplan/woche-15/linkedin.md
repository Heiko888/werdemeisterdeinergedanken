# LinkedIn – Woche 15 · Block C · Mentale Selbstverteidigung – Werbung & Mangel

> Kanal-Planer: linkedin. Frequenz-Stufe: **fokussiert (3 Posts)**. Quelle:
> `docs/marketing/redaktionsplan/themen-backlog.md`, Block C, Zeile „Werbung &
> Mangel" (Zeile 89). Alle Slugs/Pfade gegen `src/lib/blog.ts` (Zeile 728),
> `src/lib/deep-dives.ts` (Zeile 1133), `docs/carousels/marketing-serien.mjs`
> und `docs/marketing/content-data.mjs` geprüft (`rg`/`ls`, s. Prüfvermerke
> unten).
>
> Bild-Assets: **Creme-Variante als Standard** (`-hell.png`), s.
> `docs/marketing/zitate/4x5/` bzw. `docs/marketing/zitate/studien-4x5/`.

## Woche

| Tag | Uhrzeit | Format | Inhalt / Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Di | 07:30 | 📝 Beitrag | **Hook (1. Zeile):** „‚Nur noch heute‘, ‚letzte Chance‘ – künstlicher Mangel funktioniert im Vertriebsgespräch genauso wie in der Werbung." Text überträgt den Blog-Kern (gute Werbung weckt zuerst ein Gefühl des Fehlens, dann bietet sie die Lösung an) auf Verkaufs- und Verhandlungssituationen im Beruf: befristete Angebote von Lieferanten, künstlicher Zeitdruck in Vertragsverhandlungen, das Gefühl, ein Bewerber oder Kunde „springt sonst ab" – dieselbe Mechanik wie in der Konsumwerbung, nur in Business-Sprache. Kern: Der Mangel wird oft erst in dem Moment erzeugt, in dem das Angebot kommt. Schluss: die 24-Stunden-Regel aus dem Artikel, übertragen auf berufliche Kaufentscheidungen und Zusagen unter Druck. | Blog `/blog/werbung-und-der-kuenstliche-mangel` (verifiziert in `src/lib/blog.ts`, Zeile 728–782: Zitat „Du kaufst nicht die Uhr, sondern das Gefühl …" Zeile 755, Abschnitt „Erst der Mangel, dann das Produkt" Zeile 746–751, Übungsliste Zeile 771–776) | Kommentar-Frage: „Bei welchem beruflichen Angebot hast du zuletzt gemerkt, dass der Zeitdruck künstlich erzeugt war?" (Soft-Engagement, kein harter Link) |
| Mi | 08:00 | 🖼️ Carousel | Document-Post „Wer denkt hier eigentlich?" – sachlicher Ton, Fokus auf das Slide „Werbung & Medien": „Hunderte Botschaften täglich formen Werte, Kaufentscheidungen und Selbstbild. Emotionale Ansprache und künstlich erzeugter Mangel lenken deine Gedanken in gewünschte Bahnen." Im Begleittext auf Verhandlungssituationen und Beschaffungsentscheidungen im Job zugespitzt, ergänzt um den wissenschaftlichen Hintergrund der Verlustaversion – warum künstlicher Mangel überhaupt so wirksam ist. | Carousel-Serie `wer-denkt-hier` in `docs/carousels/marketing-serien.mjs`, Zeilen 91–114 (Slide „Werbung & Medien" Zeile 97–98). Ergänzend als Sharepic: `docs/marketing/zitate/studien-4x5/WMDG-Studienfakt-09-hell.png` (Text „Ein Verlust wiegt gefühlt fast doppelt so schwer wie ein gleich großer Gewinn.", Quelle Kahneman & Tversky 1979, Prospect Theory, `docs/marketing/content-data.mjs`, FACTS `key: "09"`, Zeile 47–48) | „Speichern für das nächste Angebot mit ‚nur noch heute‘." → kein Link, reines Save/Share |
| Do | 07:45 | 🎯 Pitch | **Hook:** „Der Ausweg ist nicht Verzicht um jeden Preis – sondern die Pause zwischen Impuls und Zusage." Kurzer Text stellt Werbung & künstlichen Mangel als fünften Baustein der Reihe „Mentale Selbstverteidigung" vor, mit Verweis auf die konkrete Übung aus der Vertiefung (Kaufimpuls benennen, 24 Stunden warten, die Verknüpfung von Produkt und Gefühl laut aussprechen). Einstieg über das kostenlose E-Book, vollständige Vertiefung samt PDF im Mitgliederbereich. | Deep-Dive `werbung-und-mangel` (verifiziert in `src/lib/deep-dives.ts`, Zeile 1133–1188: Abschnitt „Vergleich und Status") · Route `/mitglieder/wissen/werbung-und-mangel` (`src/app/mitglieder/wissen/[slug]/page.tsx`) + PDF `content/pdf/vertiefung-werbung-und-mangel.pdf` (verifiziert per `ls content/pdf/`) | Soft-CTA: „Kostenloses E-Book sichern" → `/#ebook`; für bereits Registrierte: „Vertiefung „Werbung & künstlicher Mangel" direkt in der Mitgliedschaft" → `/mitglieder` |

## Hinweise zur Umsetzung

- **Rhythmus eingehalten:** Di 07:30 Beitrag, Mi 08:00 Carousel, Do 07:45 Pitch – konsistent mit den Vorwochen.
- **Kein Freitag/Wochenende belegt** – drei Slots Di–Do gemäß „fokussiert".
- **Carousel-Auswahl begründet:** `wer-denkt-hier` enthält mit dem Slide „Werbung & Medien" die wörtliche Formulierung „künstlich erzeugter Mangel" – die direkteste Übereinstimmung unter den 5 evergreenen Serien. Der Standalone-Sharepic zur Verlustaversion (Prospect Theory) liefert den wissenschaftlichen Unterbau, warum der Mechanismus wirkt.
- **Berufsbezug durchgängig:** Vertriebsgespräche, Beschaffung, Vertragsverhandlungen unter Zeitdruck – dieselbe Kernthese wie in den anderen Kanälen (erst der Mangel, dann das Angebot), aus Arbeitsperspektive übersetzt.
- **Kein Video-Slot:** Reel-Serie „selbstverteidigung" (`src/lib/reels.ts`, Zeile 36, Eintrag „Werbung & Mangel") steht mit `filmed: false` – kein natives Teilen möglich.
- **Ton:** sachlich, wertig, These zuerst – kein Boulevard-Stil.
- Es wurden keine neuen Slugs/Assets erfunden; alle Quellenangaben sind mit Datei/Zeile oder Verzeichnis-Listing belegt.
