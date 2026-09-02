# Instagram – Wochenplan

**Wochenthema:** Block C – Mentale Selbstverteidigung (Woche 16) · Gruppendruck
**Frequenz-Stufe:** fokussiert → **4 Posts** (keine täglichen Stories in dieser Stufe)
**Dramaturgie der Woche:** Aufmerksamkeit → Aha → Anwenden → Angebot

> Alle Quellen unten wurden gegen den Code geprüft (`src/lib/reels.ts`, `src/lib/blog.ts`,
> `src/lib/deep-dives.ts`, `src/lib/practices.ts`, `docs/carousels/marketing-serien.mjs`,
> `docs/marketing/content-data.mjs`, `docs/marketing/zitate/`). Blog-Route real unter
> **`/blog/…`**, Deep-Dive-Route real unter **`/mitglieder/wissen/…`**, Praxis-Route real
> unter **`/mitglieder/praxis/…`**.

## Woche 16 · Gruppendruck

| Tag | Uhrzeit | Format | Hook/Titel | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel | „Laut ≠ Mehrheit." | `src/lib/reels.ts` – Serie **„selbstverteidigung"**, Topic **Gruppendruck** · Skript: `docs/skripte/reels/mentale-selbstverteidigung.md`, Abschnitt „7 · Gruppendruck & Schweigespirale" (Hook im Skript: „Die Mehrheit, vor der du dich fürchtest, gibt es oft gar nicht.") | „Sag einmal ruhig, was du wirklich denkst – und folge für Teil 2." |
| Mittwoch | 12:30 | 🖼️ Carousel | „Wer denkt hier eigentlich? – Gruppendruck" | `docs/carousels/marketing-serien.mjs`, Serie **„wer-denkt-hier"**, Schritt „03 · Gruppendruck" (exakter Themen-Treffer) als Aufhänger, vertieft mit Blog `/blog/gruppendruck-und-die-schweigespirale` (`src/lib/blog.ts`) und Vertiefung `/mitglieder/wissen/gruppendruck` (`src/lib/deep-dives.ts`, `relatedStage: 2`) | „Die Mehrheitsillusion erklärt – ganzer Artikel im Blog, Link in Bio." |
| Freitag | 19:00 | 📚 Story | Umfrage „Wo sagst du öffentlich etwas anderes, als du privat denkst?" + Mini-Übung „Die tägliche Rückkehr" | `src/lib/practices.ts`, Slug **`taegliche-rueckkehr`** (Kategorie „Rituale", 5 Minuten, `relatedStage: 7`) → Route `/mitglieder/praxis/taegliche-rueckkehr` | „Nimm dir die 5 Minuten, bevor du das nächste Mal schweigst – und antworte auf die Umfrage." |
| Sonntag | 08:00 | 💬 Zitat + 🎯 Pitch | „Rund ein Drittel folgt einer sichtbar falschen Mehrheit – gegen die eigenen Augen." | Studien-Kachel `docs/marketing/zitate/studien-1x1/WMDG-Studienfakt-07-hell.png` (Creme-Standard; Text + Quelle lt. `docs/marketing/content-data.mjs`, `FACTS key: "07"`, Solomon Asch 1951) · Vertiefung `/mitglieder/wissen/gruppendruck` | „Hol dir das kostenlose E-Book – Link in Bio (`/#ebook`) → die volle Vertiefung „Gruppendruck & Schweigespirale" in der Mitgliedschaft (`/mitglieder`)." |

## Rhythmus-Begründung

- **Reel (Mo, 18:00):** Hook „Laut ≠ Mehrheit" bringt die Schweigespirale
  auf den Punkt und macht neugierig auf den Mechanismus dahinter.
- **Carousel (Mi, 12:30):** **Exakter** Carousel-Treffer – „wer-denkt-hier"
  Schritt 03 heißt bereits „Gruppendruck", vertieft mit dem passgenauen
  Blogartikel zur Schweigespirale und Mehrheitsillusion.
- **Story (Fr, 19:00):** „Die tägliche Rückkehr" trainiert, trotz äußerem
  Druck bei der eigenen Haltung zu bleiben – passend zur Kernfrage der
  Woche (öffentlich vs. privat).
- **Zitat + Pitch (So, 08:00):** Studienfakt 07 ist ein **exakter** Treffer:
  das Asch-Konformitätsexperiment ist der Klassiker der Gruppendruck-
  Forschung und wird auch im Deep-Dive sinngemäß referenziert.

## Material-Check (gegen Code/Ordner geprüft)

- ✅ Reel „Gruppendruck" in `src/lib/reels.ts` (Serie „selbstverteidigung"), Hook „Laut ≠ Mehrheit", Skript-Abschnitt „7 · Gruppendruck & Schweigespirale" vorhanden.
- ✅ Blog-Slug `gruppendruck-und-die-schweigespirale` in `src/lib/blog.ts`, reale Route `/blog/gruppendruck-und-die-schweigespirale`.
- ✅ Deep-Dive `gruppendruck` in `src/lib/deep-dives.ts`, `relatedStage: 2`, reale Route `/mitglieder/wissen/gruppendruck`.
- ✅ Praxis `taegliche-rueckkehr` in `src/lib/practices.ts`, `relatedStage: 7`, Route `/mitglieder/praxis/taegliche-rueckkehr` – Stage weicht vom Wochenthema ab, die Übung selbst (bewusst zur eigenen Haltung zurückkehren) passt aber inhaltlich zum Widerstehen von Gruppendruck.
- ✅ Carousel „wer-denkt-hier" Schritt „03 · Gruppendruck" real in `docs/carousels/marketing-serien.mjs` gefunden – **exakter** Themen-Treffer.
- ✅ Studien-Kachel `WMDG-Studienfakt-07-hell.png`, Text + Quelle `FACTS key: "07"` aus `docs/marketing/content-data.mjs` – **exakter** Themen-Treffer (Asch-Konformitätsexperiment).
- ✅ Funnel `/#ebook` → `/mitglieder` unverändert übernommen.
