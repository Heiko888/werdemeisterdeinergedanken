# LinkedIn – Woche 16 · Block C · Mentale Selbstverteidigung – Gruppendruck

> Kanal-Planer: linkedin. Frequenz-Stufe: **fokussiert (3 Posts)**. Quelle:
> `docs/marketing/redaktionsplan/themen-backlog.md`, Block C, Zeile
> „Gruppendruck" (Zeile 90). Alle Slugs/Pfade gegen `src/lib/blog.ts`
> (Zeile 785), `src/lib/deep-dives.ts` (Zeile 1191),
> `docs/carousels/marketing-serien.mjs` und `docs/marketing/content-data.mjs`
> geprüft (`rg`/`ls`, s. Prüfvermerke unten).
>
> Bild-Assets: **Creme-Variante als Standard** (`-hell.png`), s.
> `docs/marketing/zitate/4x5/` bzw. `docs/marketing/zitate/studien-4x5/`.

## Woche

| Tag | Uhrzeit | Format | Inhalt / Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Di | 07:30 | 📝 Beitrag | **Hook (1. Zeile):** „Fast immer denken viel mehr Menschen im Meeting wie du – sie sagen es nur nicht." Text überträgt den Blog-Kern (die Schweigespirale: Wer glaubt, mit seiner Meinung allein zu stehen, schweigt eher, wodurch die andere Sicht noch stärker wirkt) auf Team-Meetings und Entscheidungsrunden: Nicht die Mehrheit setzt sich durch, sondern die lauteste, selbstsicherste Stimme im Raum – vieles, was in einem Projekt wie Konsens aussieht, ist oft nur organisiertes Schweigen der Zweifelnden. Kern: Die Mehrheitsillusion lässt Teams Entscheidungen mittragen, die kaum jemand wirklich für richtig hält. Schluss: der kleine, machbare erste Schritt aus dem Artikel – einmal ruhig sagen, was man wirklich denkt, oft löst sich die gefühlte Mehrheit dann in Luft auf. | Blog `/blog/gruppendruck-und-die-schweigespirale` (verifiziert in `src/lib/blog.ts`, Zeile 785–827: Zitat „Fast immer denken viel mehr Menschen wie du – sie sagen es nur nicht" Zeile 812, Abschnitt „Die Mehrheitsillusion" Zeile 815–821) | Kommentar-Frage: „Wann hast du zuletzt in einer Besprechung geschwiegen, obwohl du anderer Meinung warst als der Rest der Runde?" (Soft-Engagement, kein harter Link) |
| Mi | 08:00 | 🖼️ Carousel | Document-Post „Bis zu 60.000 Gedanken am Tag" – sachlicher Ton, Fokus auf das List-Slide „Wer denkt hier eigentlich?", Punkt „Gruppendruck": „Das Bedürfnis nach Zugehörigkeit lässt uns Meinungen ungeprüft übernehmen." Im Begleittext auf Team-Entscheidungen und Konsens-Illusionen im Job zugespitzt, ergänzt um den klassischen wissenschaftlichen Beleg zur Konformität – wie leicht sichtbar falsche Mehrheitsmeinungen das eigene Urteil überstimmen. | Carousel-Serie `60000-gedanken` in `docs/carousels/marketing-serien.mjs`, Zeilen 28–59 (List-Slide Zeile 42–47, Punkt „Gruppendruck"). Ergänzend als Sharepic – die präziseste Entsprechung des Wochenthemas: `docs/marketing/zitate/studien-4x5/WMDG-Studienfakt-07-hell.png` (Text „Rund ein Drittel folgt einer sichtbar falschen Mehrheit – gegen die eigenen Augen.", Quelle Solomon Asch 1951, Konformitätsexperiment, `docs/marketing/content-data.mjs`, FACTS `key: "07"`, Zeile 43–44) | „Speichern für die nächste Entscheidungsrunde, in der ‚alle‘ derselben Meinung zu sein scheinen." → kein Link, reines Save/Share |
| Do | 07:45 | 🎯 Pitch | **Hook:** „Der Mut, im Meeting die eigene Sicht zu sagen, fängt klein an – und ist eine trainierbare Fähigkeit." Kurzer Text stellt Gruppendruck & Schweigespirale als sechsten Baustein der Reihe „Mentale Selbstverteidigung" vor, mit Verweis auf die konkreten Reflexionsfragen aus der Vertiefung (Wessen Zustimmung ist mir so wichtig, dass ich dafür meine Meinung zurückstelle?). Einstieg über das kostenlose E-Book, vollständige Vertiefung samt PDF im Mitgliederbereich. | Deep-Dive `gruppendruck` (verifiziert in `src/lib/deep-dives.ts`, Zeile 1191–1246: Abschnitt „Die Mehrheitsillusion") · Route `/mitglieder/wissen/gruppendruck` (`src/app/mitglieder/wissen/[slug]/page.tsx`) + PDF `content/pdf/vertiefung-gruppendruck.pdf` (verifiziert per `ls content/pdf/`) | Soft-CTA: „Kostenloses E-Book sichern" → `/#ebook`; für bereits Registrierte: „Vertiefung „Gruppendruck & Schweigespirale" direkt in der Mitgliedschaft" → `/mitglieder` |

## Hinweise zur Umsetzung

- **Rhythmus eingehalten:** Di 07:30 Beitrag, Mi 08:00 Carousel, Do 07:45 Pitch – konsistent mit den Vorwochen.
- **Kein Freitag/Wochenende belegt** – drei Slots Di–Do gemäß „fokussiert".
- **Carousel-Auswahl begründet:** `60000-gedanken` nennt „Gruppendruck" explizit im List-Slide; die Serie `wer-denkt-hier` (die denselben Begriff ebenfalls als eigenes Slide führt) wurde in Woche 12 und Woche 15 bereits genutzt – zur Streuung über die 5 evergreenen Serien fällt die Wahl hier auf `60000-gedanken`. Der Standalone-Sharepic zum Asch-Konformitätsexperiment liefert den exakten wissenschaftlichen Beleg zum Thema.
- **Berufsbezug durchgängig:** Team-Meetings, Konsens-Illusionen, das Schweigen Zweifelnder in Entscheidungsrunden – dieselbe Kernthese wie in den anderen Kanälen (Schweigespirale & Mehrheitsillusion), aus Arbeitsperspektive übersetzt.
- **Kein Video-Slot:** Reel-Serie „selbstverteidigung" (`src/lib/reels.ts`, Zeile 37, Eintrag „Gruppendruck") steht mit `filmed: false` – kein natives Teilen möglich.
- **Ton:** sachlich, wertig, These zuerst – kein Boulevard-Stil.
- Es wurden keine neuen Slugs/Assets erfunden; alle Quellenangaben sind mit Datei/Zeile oder Verzeichnis-Listing belegt.
