# Instagram – Wochenplan

**Wochenthema:** Block C – Mentale Selbstverteidigung (Woche 15) · Werbung & Mangel
**Frequenz-Stufe:** fokussiert → **4 Posts** (keine täglichen Stories in dieser Stufe)
**Dramaturgie der Woche:** Aufmerksamkeit → Aha → Anwenden → Angebot

> Alle Quellen unten wurden gegen den Code geprüft (`src/lib/reels.ts`, `src/lib/blog.ts`,
> `src/lib/deep-dives.ts`, `src/lib/practices.ts`, `docs/carousels/marketing-serien.mjs`,
> `docs/marketing/content-data.mjs`, `docs/marketing/zitate/`). Blog-Route real unter
> **`/blog/…`**, Deep-Dive-Route real unter **`/mitglieder/wissen/…`**, Praxis-Route real
> unter **`/mitglieder/praxis/…`**.

## Woche 15 · Werbung & Mangel

| Tag | Uhrzeit | Format | Hook/Titel | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel | „Sie verkauft dir den Mangel." | `src/lib/reels.ts` – Serie **„selbstverteidigung"**, Topic **Werbung & Mangel** · Skript: `docs/skripte/reels/mentale-selbstverteidigung.md`, Abschnitt „6 · Werbung & künstlicher Mangel" (Hook im Skript: „Werbung verkauft dir kein Produkt. Sie verkauft dir einen Mangel.") | „24-Stunden-Regel vor jedem Kauf. Speichern & folgen." |
| Mittwoch | 12:30 | 🖼️ Carousel | „Wer denkt hier eigentlich? – Werbung & Medien" | `docs/carousels/marketing-serien.mjs`, Serie **„wer-denkt-hier"**, Schritt „01 · Werbung & Medien" (erwähnt wörtlich „künstlich erzeugter Mangel" – exakter Themen-Treffer) als Aufhänger, vertieft mit Blog `/blog/werbung-und-der-kuenstliche-mangel` (`src/lib/blog.ts`) und Vertiefung `/mitglieder/wissen/werbung-und-mangel` (`src/lib/deep-dives.ts`, `relatedStage: 1`) | „Den Mangel-Check gibt's im Blog – Link in Bio." |
| Freitag | 19:00 | 📚 Story | Umfrage „Was hast du zuletzt gekauft, das eigentlich ein Gefühl kaufen sollte?" + Mini-Übung „Atembeobachtung" (als bewusste Kaufpause) | `src/lib/practices.ts`, Slug **`atembeobachtung`** (Kategorie „Meditationen", 5–10 Minuten, `relatedStage: 2`) → Route `/mitglieder/praxis/atembeobachtung` | „Beim nächsten Kaufimpuls: erst die Übung, dann entscheiden – und in der Umfrage antworten." |
| Sonntag | 08:00 | 💬 Zitat + 🎯 Pitch | „Ein Verlust wiegt gefühlt fast doppelt so schwer wie ein gleich großer Gewinn." | Studien-Kachel `docs/marketing/zitate/studien-1x1/WMDG-Studienfakt-09-hell.png` (Creme-Standard; Text + Quelle lt. `docs/marketing/content-data.mjs`, `FACTS key: "09"`, Kahneman & Tversky 1979, Prospect Theory) · Vertiefung `/mitglieder/wissen/werbung-und-mangel` | „Hol dir das kostenlose E-Book – Link in Bio (`/#ebook`) → die volle Vertiefung „Werbung & künstlicher Mangel" in der Mitgliedschaft (`/mitglieder`)." |

## Rhythmus-Begründung

- **Reel (Mo, 18:00):** Der Hook „Sie verkauft dir den Mangel" trifft das
  Wochenthema wörtlich.
- **Carousel (Mi, 12:30):** **Exakter** Carousel-Treffer – „wer-denkt-hier"
  Schritt 01 nennt „künstlich erzeugten Mangel" explizit, vertieft mit dem
  passgenauen Blogartikel.
- **Story (Fr, 19:00):** Atembeobachtung dient hier bewusst als kurze
  „Kaufpause" – die Deep-Dive-Übung „Mangel-Check" empfiehlt exakt ein
  kurzes Innehalten vor dem Impuls.
- **Zitat + Pitch (So, 08:00):** Verlustaversion (Prospect Theory) ist der
  wissenschaftliche Kernmechanismus hinter künstlich erzeugtem Mangel
  („nur heute", „letzte Chance") – ein **starker inhaltlicher** Treffer,
  auch wenn die Karte den Begriff „Mangel" nicht wörtlich nennt.

## Material-Check (gegen Code/Ordner geprüft)

- ✅ Reel „Werbung & Mangel" in `src/lib/reels.ts` (Serie „selbstverteidigung"), Hook „Sie verkauft dir den Mangel", Skript-Abschnitt „6 · Werbung & künstlicher Mangel" vorhanden.
- ✅ Blog-Slug `werbung-und-der-kuenstliche-mangel` in `src/lib/blog.ts`, reale Route `/blog/werbung-und-der-kuenstliche-mangel`.
- ✅ Deep-Dive `werbung-und-mangel` in `src/lib/deep-dives.ts`, `relatedStage: 1`, reale Route `/mitglieder/wissen/werbung-und-mangel`.
- ✅ Praxis `atembeobachtung` in `src/lib/practices.ts`, `relatedStage: 2`, Route `/mitglieder/praxis/atembeobachtung`.
- ✅ Carousel „wer-denkt-hier" Schritt „01 · Werbung & Medien" real in `docs/carousels/marketing-serien.mjs` gefunden – **exakter** Themen-Treffer (nennt „künstlich erzeugten Mangel" wörtlich).
- ✅ Studien-Kachel `WMDG-Studienfakt-09-hell.png`, Text + Quelle `FACTS key: "09"` aus `docs/marketing/content-data.mjs` – inhaltlich starker Treffer (Verlustaversion als Mechanismus hinter Mangel-Marketing).
- ✅ Funnel `/#ebook` → `/mitglieder` unverändert übernommen.
