# LinkedIn – Woche 13 · Block C · Mentale Selbstverteidigung – Wiederholung = Wahrheit?

> Kanal-Planer: linkedin. Frequenz-Stufe: **fokussiert (3 Posts)**. Quelle:
> `docs/marketing/redaktionsplan/themen-backlog.md`, Block C, Zeile
> „Wiederholung = Wahrheit?" (Zeile 87). Alle Slugs/Pfade gegen
> `src/lib/blog.ts` (Zeile 553), `src/lib/deep-dives.ts` (Zeile 1365),
> `docs/carousels/marketing-serien.mjs` und `docs/marketing/content-data.mjs`
> geprüft (`rg`/`ls`, s. Prüfvermerke unten).
>
> Bild-Assets: **Creme-Variante als Standard** (`-hell.png`), s.
> `docs/marketing/zitate/4x5/` bzw. `docs/marketing/zitate/studien-4x5/`.

## Woche

| Tag | Uhrzeit | Format | Inhalt / Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Di | 07:30 | 📝 Beitrag | **Hook (1. Zeile):** „‚Das sagen doch alle‘ ist im Meeting oft kein Beleg – sondern nur ein Satz, der oft genug wiederholt wurde." Text überträgt den Blog-Kern (Vertrautheit fühlt sich an wie Wahrheit, ganz ohne Beweis) auf Unternehmensfloskeln und Branchen-Weisheiten: „Der Kunde will das nicht", „Das haben wir immer so gemacht", „Alle im Markt machen das jetzt so" – Sätze, die in jedem Meeting wiederholt werden, bis sie wie Fakten klingen, obwohl sie oft auf eine einzige, nie geprüfte Quelle zurückgehen. Kern: Nicht „Wie oft wurde es gesagt?" ist die entscheidende Frage, sondern „Auf wie viele unabhängige Quellen geht es zurück?" Schluss: ein Vorschlag, eine oft wiederholte Team-Annahme diese Woche einmal aktiv zu hinterfragen. | Blog `/blog/warum-oft-gehoert-sich-wie-wahr-anfuehlt` (verifiziert in `src/lib/blog.ts`, Zeile 553–607: Zitat „Vertrautheit ist kein Beweis …" Zeile 580, Abschnitt „Der scheinbare Konsens" Zeile 583–589, Übungsliste Zeile 596–601) | Kommentar-Frage: „Welche ‚Das ist doch bekannt‘-Aussage wird in deinem Team wiederholt, ohne dass sie je überprüft wurde?" (Soft-Engagement, kein harter Link) |
| Mi | 08:00 | 🖼️ Carousel | Document-Post „Bis zu 60.000 Gedanken am Tag" – sachlicher Ton, Fokus auf das Stat-Slide: „Oft wiederholen sich dieselben Muster – besonders die negativen. Diese mentale Endlosschleife hält uns in Zweifel und Stress gefangen, ohne dass wir es bemerken." Im Begleittext auf wiederkehrende, ungeprüfte Annahmen im Job zugespitzt (Selbstzweifel vor Präsentationen, aber auch Team-Glaubenssätze), ergänzt um den exakten wissenschaftlichen Beleg für den Effekt auf externe Aussagen. | Carousel-Serie `60000-gedanken` in `docs/carousels/marketing-serien.mjs`, Zeilen 28–59 (Stat-Slide Zeile 34–36). Ergänzend als Sharepic – die präziseste Entsprechung des Wochenthemas: `docs/marketing/zitate/studien-4x5/WMDG-Studienfakt-08-hell.png` (Text „Bloße Wiederholung lässt eine Aussage glaubwürdiger wirken – auch wenn sie falsch ist.", Quelle Hasher, Goldstein & Toppino 1977, Illusory-Truth-Effekt, `docs/marketing/content-data.mjs`, FACTS `key: "08"`, Zeile 45–46) | „Speichern für die nächste Team-Weisheit, die du eigentlich nie geprüft hast." → kein Link, reines Save/Share |
| Do | 07:45 | 🎯 Pitch | **Hook:** „Der älteste Trick der Beeinflussung braucht keine einzige Lüge – nur Wiederholung." Kurzer Text stellt den Wiederholungseffekt als dritten Baustein der Reihe „Mentale Selbstverteidigung" vor, mit Verweis auf den einfachen Alltags-Check aus der Vertiefung: Kenne ich einen echten Beleg – oder habe ich das nur oft gehört? Einstieg über das kostenlose E-Book, vollständige Vertiefung samt PDF im Mitgliederbereich. | Deep-Dive `wiederholung-wahrheit` (verifiziert in `src/lib/deep-dives.ts`, Zeile 1365–1420: Abschnitt „Schlagwort statt Beweis") · Route `/mitglieder/wissen/wiederholung-wahrheit` (`src/app/mitglieder/wissen/[slug]/page.tsx`) + PDF `content/pdf/vertiefung-wiederholung-wahrheit.pdf` (verifiziert per `ls content/pdf/`) | Soft-CTA: „Kostenloses E-Book sichern" → `/#ebook`; für bereits Registrierte: „Vertiefung „Wiederholung wird zur Wahrheit" direkt in der Mitgliedschaft" → `/mitglieder` |

## Hinweise zur Umsetzung

- **Rhythmus eingehalten:** Di 07:30 Beitrag, Mi 08:00 Carousel, Do 07:45 Pitch – konsistent mit den Vorwochen.
- **Kein Freitag/Wochenende belegt** – drei Slots Di–Do gemäß „fokussiert".
- **Carousel-Auswahl begründet:** Unter den 5 evergreenen Serien ist `60000-gedanken` die einzige mit einem Slide, das den Begriff „wiederholen" explizit im Kontext mentaler Muster nennt. Die eigentliche Punktlandung ist der Standalone-Sharepic `WMDG-Studienfakt-08-hell.png`: Er benennt exakt den Illusory-Truth-Effekt, der im Blogartikel beschrieben wird (inkl. Studienquelle Hasher/Goldstein/Toppino 1977) – deutlich präziser als jedes Slide der 5-teiligen Dokument-Serien und daher als vorrangiges Bild für diesen Post empfohlen.
- **Berufsbezug durchgängig:** Unternehmensfloskeln, Branchen-Weisheiten, Team-Glaubenssätze – dieselbe Kernthese wie in den anderen Kanälen (Wiederholung ≠ Beweis), aus Arbeitsperspektive übersetzt.
- **Kein Video-Slot:** Reel-Serie „selbstverteidigung" (`src/lib/reels.ts`, Zeile 40, Eintrag „Wiederholung") steht mit `filmed: false` – kein natives Teilen möglich.
- **Ton:** sachlich, wertig, These zuerst – kein Boulevard-Stil.
- Es wurden keine neuen Slugs/Assets erfunden; alle Quellenangaben sind mit Datei/Zeile oder Verzeichnis-Listing belegt.
