# Instagram – Wochenplan

**Wochenthema:** Block C – Mentale Selbstverteidigung (Woche 12) · Filterblase / Algorithmen
**Frequenz-Stufe:** fokussiert → **4 Posts** (keine täglichen Stories in dieser Stufe)
**Dramaturgie der Woche:** Aufmerksamkeit → Aha → Anwenden → Angebot

> Alle Quellen unten wurden gegen den Code geprüft (`src/lib/reels.ts`, `src/lib/blog.ts`,
> `src/lib/deep-dives.ts`, `src/lib/practices.ts`, `docs/carousels/marketing-serien.mjs`,
> `docs/marketing/content-data.mjs`, `docs/marketing/zitate/`). Blog-Route real unter
> **`/blog/…`**, Deep-Dive-Route real unter **`/mitglieder/wissen/…`**, Praxis-Route real
> unter **`/mitglieder/praxis/…`**.

## Woche 12 · Filterblase / Algorithmen

| Tag | Uhrzeit | Format | Hook/Titel | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel | „Dein Feed ≠ die Welt." | `src/lib/reels.ts` – Serie **„selbstverteidigung"**, Topic **Algorithmen** · Skript: `docs/skripte/reels/mentale-selbstverteidigung.md`, Abschnitt „5 · Algorithmen & Filterblasen" (Hook im Skript: „Du siehst online nicht die Welt. Du siehst dich selbst.") | „Folge heute einer Stimme, die anders denkt – und folge hier für Teil 2." |
| Mittwoch | 12:30 | 🖼️ Carousel | „Wer denkt hier eigentlich? – Algorithmen & Filterblasen" | `docs/carousels/marketing-serien.mjs`, Serie **„wer-denkt-hier"**, Schritt „02 · Algorithmen & Filterblasen" (exakter Themen-Treffer) als Aufhänger, vertieft mit Blog `/blog/filterblase-warum-dein-feed-nicht-die-welt-ist` (`src/lib/blog.ts`) und Vertiefung `/mitglieder/wissen/algorithmen` (`src/lib/deep-dives.ts`, `relatedStage: 1`) | „Den ganzen Artikel gibt's im Blog – Link in Bio. Speichern, falls dein Feed dir gerade recht gibt." |
| Freitag | 19:00 | 📚 Story | Umfrage „Wann hast du zuletzt online etwas gesehen, das deiner Meinung ernsthaft widersprochen hat?" + Mini-Übung „Der Autopilot-Check" | `src/lib/practices.ts`, Slug **`autopilot-check`** (Kategorie „Rituale", 2 Minuten, `relatedStage: 1`) → Route `/mitglieder/praxis/autopilot-check` | „Mach den Check beim nächsten Scrollen und antworte auf die Umfrage." |
| Sonntag | 08:00 | 💬 Zitat + 🎯 Pitch | „Nicht jeder Gedanke, den du denkst, ist von dir." | Zitat-Kachel `docs/marketing/zitate/1x1/WMDG-Zitat-01-hell.png` (Creme-Standard; Text lt. `docs/marketing/content-data.mjs`, `key: "01"`) · Vertiefung `/mitglieder/wissen/algorithmen` | „Hol dir das kostenlose E-Book – Link in Bio (`/#ebook`) → die volle Vertiefung „Algorithmen & Filterblasen" in der Mitgliedschaft (`/mitglieder`)." |

## Rhythmus-Begründung

- **Reel (Mo, 18:00):** Hook „Dein Feed ≠ die Welt" ist einer der beiden im
  Skript selbst als „zugänglichster Einstieg" empfohlenen Reels.
- **Carousel (Mi, 12:30):** Einer der drei Wochen mit **exaktem** Carousel-
  Treffer – „wer-denkt-hier" hat einen eigenen Schritt „Algorithmen &
  Filterblasen", ergänzt um den passgenauen Blogartikel als Vertiefung.
- **Story (Fr, 19:00):** Der Autopilot-Check trainiert das Bemerken des
  automatischen Reagierens – genau das, was gegen unbemerktes Scrollen und
  Filterblasen-Verstärkung hilft.
- **Zitat + Pitch (So, 08:00):** Zitat 01 trifft den Kern der Filterblase
  wörtlich: Was im Feed erscheint, ist nicht zwangsläufig dein eigener
  Gedanke, sondern das, was der Algorithmus dir zuspielt.

## Material-Check (gegen Code/Ordner geprüft)

- ✅ Reel „Algorithmen" in `src/lib/reels.ts` (Serie „selbstverteidigung"), Hook „Dein Feed ≠ die Welt", Skript-Abschnitt „5 · Algorithmen & Filterblasen" vorhanden.
- ✅ Blog-Slug `filterblase-warum-dein-feed-nicht-die-welt-ist` in `src/lib/blog.ts`, reale Route `/blog/filterblase-warum-dein-feed-nicht-die-welt-ist`.
- ✅ Deep-Dive `algorithmen` in `src/lib/deep-dives.ts`, `relatedStage: 1`, reale Route `/mitglieder/wissen/algorithmen`.
- ✅ Praxis `autopilot-check` in `src/lib/practices.ts`, `relatedStage: 1`, Route `/mitglieder/praxis/autopilot-check`.
- ✅ Carousel „wer-denkt-hier" Schritt „02 · Algorithmen & Filterblasen" real in `docs/carousels/marketing-serien.mjs` gefunden – **exakter** Themen-Treffer (nicht nur naheliegend).
- ✅ Zitat-Kachel `WMDG-Zitat-01-hell.png`, Text `key: "01"` aus `docs/marketing/content-data.mjs` – inhaltlich passend.
- ✅ Funnel `/#ebook` → `/mitglieder` unverändert übernommen.
