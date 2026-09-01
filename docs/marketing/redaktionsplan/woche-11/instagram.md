# Instagram – Wochenplan

**Wochenthema:** Block C – Mentale Selbstverteidigung (Woche 11) · Framing
**Frequenz-Stufe:** fokussiert → **4 Posts** (keine täglichen Stories in dieser Stufe)
**Dramaturgie der Woche:** Aufmerksamkeit → Aha → Anwenden → Angebot

> Alle Quellen unten wurden gegen den Code geprüft (`src/lib/reels.ts`, `src/lib/blog.ts`,
> `src/lib/deep-dives.ts`, `src/lib/practices.ts`, `docs/carousels/marketing-serien.mjs`,
> `docs/marketing/content-data.mjs`, `docs/marketing/zitate/`). Blog-Route real unter
> **`/blog/…`** (`src/app/blog/[slug]/page.tsx`), Deep-Dive-Route real unter
> **`/mitglieder/wissen/…`** (`src/app/mitglieder/wissen/[slug]/page.tsx`), Praxis-Route
> real unter **`/mitglieder/praxis/…`** (`src/app/mitglieder/praxis/[slug]/page.tsx`).

## Woche 11 · Framing

| Tag | Uhrzeit | Format | Hook/Titel | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel | „Ein Wort ändert alles." | `src/lib/reels.ts` – Serie **„selbstverteidigung"**, Topic **Framing** · Skript: `docs/skripte/reels/mentale-selbstverteidigung.md`, Abschnitt „2 · Framing" (Hook im Skript: „Diese zwei Sätze meinen dasselbe – und fühlen sich völlig anders an.") | „Speicher das für die nächsten Schlagzeilen – und folge für den nächsten Trick." |
| Mittwoch | 12:30 | 🖼️ Carousel | „Wer denkt hier eigentlich? – Nicht alle deine Gedanken sind wirklich deine eigenen." | `docs/carousels/marketing-serien.mjs`, Serie **„wer-denkt-hier"**, Cover-/Setup-Slide als Aufhänger ⚠️ *(kein 1:1-Slide zu „Framing" vorhanden, siehe Material-Check)*, vertieft mit Blog `/blog/framing-wie-ein-wort-deine-meinung-macht` (`src/lib/blog.ts`) und Vertiefung `/mitglieder/wissen/framing` (`src/lib/deep-dives.ts`, `relatedStage: 3`) | „Die vier Frage-Fragen gegen jeden Frame gibt's im Blog – Link in Bio." |
| Freitag | 19:00 | 📚 Story | Umfrage „Bei welchem Wort merkst du, dass du reagierst, bevor du den Inhalt geprüft hast?" + Mini-Übung „Der innere Beobachter" | `src/lib/practices.ts`, Slug **`innerer-beobachter`** (Kategorie „Meditationen", 10 Minuten, `relatedStage: 3`) → Route `/mitglieder/praxis/innerer-beobachter` | „Probier die Mini-Version jetzt und antworte auf die Umfrage." |
| Sonntag | 08:00 | 💬 Zitat + 🎯 Pitch | „Ein Gedanke wird erst zur Wahrheit, wenn du aufhörst, ihn zu hinterfragen." | Zitat-Kachel `docs/marketing/zitate/1x1/WMDG-Zitat-05-hell.png` (Creme-Standard; Text lt. `docs/marketing/content-data.mjs`, `key: "05"`) · Vertiefung `/mitglieder/wissen/framing` | „Hol dir das kostenlose E-Book – Link in Bio (`/#ebook`) → die volle Vertiefung „Framing" in der Mitgliedschaft (`/mitglieder`)." |

## Rhythmus-Begründung

- **Reel (Mo, 18:00):** Der Reel-Hook „Ein Wort ändert alles" trifft exakt den
  Wochenkern (Framing) und ist der zugänglichste Einstieg in die Serie
  „Mentale Selbstverteidigung" – Reihenfolge-Empfehlung des Skripts bestätigt
  Framing sogar als Serien-Starter.
- **Carousel (Mi, 12:30):** Die Serie „wer-denkt-hier" hat keinen eigenen
  Framing-Schritt; Cover/Setup dient als visueller Aha-Rahmen, die eigentliche
  Tiefe (die vier Frame-Fragen) liefert der Blogartikel.
- **Story (Fr, 19:00):** „Der innere Beobachter" trainiert genau die Distanz,
  die es braucht, um einen Rahmen zu bemerken, bevor man die Bewertung darin
  übernimmt – reale Praxis mit `relatedStage: 3`, passend zur Denk-Ebene von
  Framing (`deep-dives.ts`: `relatedStage: 3`).
- **Zitat + Pitch (So, 08:00):** Ruhiger Wochenausklang mit Bogen zum Angebot
  (E-Book → Mitgliedschaft).

## Material-Check (gegen Code/Ordner geprüft)

- ✅ Reel „Framing" in `src/lib/reels.ts` (Serie „selbstverteidigung"), Hook „Ein Wort ändert alles", Skript-Abschnitt „2 · Framing" in `docs/skripte/reels/mentale-selbstverteidigung.md` vorhanden.
- ✅ Blog-Slug `framing-wie-ein-wort-deine-meinung-macht` in `src/lib/blog.ts`, reale Route `/blog/framing-wie-ein-wort-deine-meinung-macht`.
- ✅ Deep-Dive `framing` in `src/lib/deep-dives.ts`, `relatedStage: 3`, reale Route `/mitglieder/wissen/framing`.
- ✅ Praxis `innerer-beobachter` in `src/lib/practices.ts`, `relatedStage: 3`, Route `/mitglieder/praxis/innerer-beobachter`.
- ⚠️ **Carousel-Lücke:** `docs/carousels/marketing-serien.mjs` enthält aktuell keinen dedizierten Slide zu „Framing" (die Serie „wer-denkt-hier" deckt nur Werbung/Mangel, Algorithmen/Filterblasen und Gruppendruck als eigene Schritte ab). Gelöst über Cover-/Setup-Slide + Blog-Vertiefung; **Empfehlung an den Themen-Strategen/Carousel-Team:** eigenen Framing-Schritt ergänzen.
- ✅ Zitat-Kachel `WMDG-Zitat-05-hell.png`, Text `key: "05"` aus `docs/marketing/content-data.mjs` – passt inhaltlich („aufhören zu hinterfragen" = den Rahmen unbemerkt übernehmen).
- ✅ Funnel `/#ebook` → `/mitglieder` unverändert übernommen.
