# LinkedIn – Woche 17 · Block C · Mentale Selbstverteidigung – Autoritätshörigkeit

> Kanal-Planer: linkedin. Frequenz-Stufe: **fokussiert (3 Posts)**. Quelle:
> `docs/marketing/redaktionsplan/themen-backlog.md`, Block C, Zeile
> „Autoritätshörigkeit" (Zeile 91). Alle Slugs/Pfade gegen `src/lib/blog.ts`
> (Zeile 873), `src/lib/deep-dives.ts` (Zeile 1249),
> `docs/carousels/marketing-serien.mjs` und `docs/marketing/content-data.mjs`
> geprüft (`rg`/`ls`, s. Prüfvermerke unten).
>
> Bild-Assets: **Creme-Variante als Standard** (`-hell.png`), s.
> `docs/marketing/zitate/4x5/` bzw. `docs/marketing/zitate/studien-4x5/`.

## Woche

| Tag | Uhrzeit | Format | Inhalt / Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Di | 07:30 | 📝 Beitrag | **Hook (1. Zeile):** „Ein Titel ist ein Grund zuzuhören – kein Grund, nicht mehr zu prüfen." Text überträgt den Blog-Kern (dieselbe Aussage klingt glaubwürdiger, wenn ein Titel, eine Uniform oder eine Institution dahintersteht; gefährlich wird es, wenn der Status das Argument ersetzt und Rückfragen als Respektlosigkeit gelten) auf Führungssituationen im Job: die teure Beratungs-Folie, die niemand hinterfragt, weil eine bekannte Marke draufsteht; die Entscheidung der Geschäftsführung, die ungeprüft weitergetragen wird; der Senior-Kollege, dessen Meinung zu jedem Thema als Fakt gilt, auch außerhalb seines eigentlichen Fachgebiets. Kern: Fachwissen ist nicht dasselbe wie Meinung – ein guter Prüfstein ist die Frage, ob eine Aussage aus belegbarem Fachwissen stammt oder eine persönliche Einschätzung ist, die auch ein Kollege haben könnte. Schluss: Ein Experte darf sich irren und korrigieren – das ist ein Zeichen von Seriosität, nicht von Schwäche, und gilt für Führungskräfte genauso. | Blog `/blog/wann-vertrauen-zu-blindem-gehorsam-wird` (verifiziert in `src/lib/blog.ts`, Zeile 873–915: Zitat „Ein Titel ist ein Grund zuzuhören – kein Grund, nicht mehr zu prüfen" Zeile 899–900, Abschnitt „Fachwissen ist nicht dasselbe wie Meinung" Zeile 903–908) | Kommentar-Frage: „Bei welcher Aussage einer Führungskraft oder externen Beratung hast du zuletzt nicht nachgefragt – nur weil der Titel stimmte?" (Soft-Engagement, kein harter Link) |
| Mi | 08:00 | 🖼️ Carousel | Document-Post „4 Wege zur mentalen Freiheit" – sachlicher Ton, Fokus auf das Slide „Kritisch denken": „Nicht jede Botschaft meint es gut mit dir. Prüfe sie, bevor du sie zu deiner eigenen machst." mit dem Hinweis-Kasten „Frag dich: Woher stammt die Info? Wer profitiert davon? Welche Emotion soll sie in mir auslösen?" Im Begleittext auf Entscheidungen unter Autoritätsdruck im Job zugespitzt, ergänzt um den historischen wissenschaftlichen Beleg zum Gehorsam gegenüber Autoritäten. | Carousel-Serie `4-wege-freiheit` in `docs/carousels/marketing-serien.mjs`, Zeilen 61–89 (Slide „Kritisch denken" Zeile 73–75). Ergänzend als Sharepic – die präziseste Entsprechung des Wochenthemas: `docs/marketing/zitate/studien-4x5/WMDG-Studienfakt-13-hell.png` (Text „Unter dem Druck einer Autorität handeln viele gegen ihr eigenes Gewissen.", Quelle Stanley Milgram 1963, mit dem Hinweis „ethisch umstritten", `docs/marketing/content-data.mjs`, FACTS `key: "13"`, Zeile 55–56) | „Speichern für die nächste Entscheidung, die du nur wegen eines Titels unterschreibst." → kein Link, reines Save/Share |
| Do | 07:45 | 🎯 Pitch | **Hook:** „Vertraue Fachwissen – aber hör nicht auf mitzudenken. Genau darin liegt die eigentliche Kompetenz." Kurzer Text stellt Autorität & Gehorsam als siebten Baustein der Reihe „Mentale Selbstverteidigung" vor, mit Verweis auf die praktische Übung aus der Vertiefung („Sache statt Status": Status ausblenden und prüfen, ob die Begründung für sich allein überzeugt). Einstieg über das kostenlose E-Book, vollständige Vertiefung samt PDF im Mitgliederbereich. | Deep-Dive `autoritaetshoerigkeit` (verifiziert in `src/lib/deep-dives.ts`, Zeile 1249–1304: Abschnitt „Ein Experte darf irren", Übung „Sache statt Status" Zeile 1273–1279) · Route `/mitglieder/wissen/autoritaetshoerigkeit` (`src/app/mitglieder/wissen/[slug]/page.tsx`) + PDF `content/pdf/vertiefung-autoritaetshoerigkeit.pdf` (verifiziert per `ls content/pdf/`) | Soft-CTA: „Kostenloses E-Book sichern" → `/#ebook`; für bereits Registrierte: „Vertiefung „Autorität & Gehorsam" direkt in der Mitgliedschaft" → `/mitglieder` |

## Hinweise zur Umsetzung

- **Rhythmus eingehalten:** Di 07:30 Beitrag, Mi 08:00 Carousel, Do 07:45 Pitch – konsistent mit den Vorwochen.
- **Kein Freitag/Wochenende belegt** – drei Slots Di–Do gemäß „fokussiert".
- **Carousel-Auswahl begründet:** `4-wege-freiheit` liefert mit dem Slide „Kritisch denken" die inhaltlich passendste Übereinstimmung (Quelle/Motiv/Emotion hinterfragen), da keine der 5 evergreenen Serien ein eigenes Autoritäts-Slide enthält. Der Standalone-Sharepic zum Milgram-Experiment liefert den historisch bekanntesten, direkt einschlägigen wissenschaftlichen Beleg – inklusive des im Quelltext hinterlegten Hinweises auf die ethische Kontroverse um das Experiment.
- **Berufsbezug durchgängig:** Beratungsfolien, Geschäftsführungsentscheidungen, Senior-Kollegen als ungeprüfte Autorität – dieselbe Kernthese wie in den anderen Kanälen (Vertrauen ja, blinder Gehorsam nein), aus Arbeitsperspektive übersetzt.
- **Kein Video-Slot:** Reel-Serie „selbstverteidigung" (`src/lib/reels.ts`, Zeile 38, Eintrag „Autoritätshörigkeit") steht mit `filmed: false` – kein natives Teilen möglich.
- **Ton:** sachlich, wertig, These zuerst – kein Boulevard-Stil; Führungs- und Fachautorität werden differenziert dargestellt, nicht pauschal diskreditiert.
- Es wurden keine neuen Slugs/Assets erfunden; alle Quellenangaben sind mit Datei/Zeile oder Verzeichnis-Listing belegt.
