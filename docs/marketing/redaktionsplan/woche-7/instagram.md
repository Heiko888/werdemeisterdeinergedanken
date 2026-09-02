# Instagram – Wochenplan

**Wochenthema:** Stufe 7 · Meisterschaft (Woche 7, Block A – Die 7 Stufen)
**Frequenz-Stufe:** fokussiert → **4 Posts** (keine täglichen Stories in dieser Stufe)
**Dramaturgie der Woche:** Aufmerksamkeit → Aha → Anwenden → Angebot

> Alle Quellen unten wurden gegen den Code geprüft (`src/lib/reels.ts`,
> `src/lib/blog.ts`, `src/lib/deep-dives.ts`, `src/lib/practices.ts`,
> `docs/carousels/stufen-ueberblick.mjs`, `docs/marketing/content-data.mjs`,
> `docs/marketing/zitate/`, `content/pdf/`). Blog-Route real unter
> **`/blog/…`** (`src/app/blog/[slug]/page.tsx`), nicht `/wissen/blog/…`.
>
> **Backlog-Hinweis geprüft:** Der Themen-Backlog markiert den Blog-Slug für
> Stufe 7 als nur „naheliegend". Verifiziert: `wie-frei-ist-unser-geist`
> existiert real in `src/lib/blog.ts` und der zugehörige Deep-Dive
> `integration-und-weitergabe` trägt `relatedStage: 7` – die Zuordnung ist
> also exakt.

## Woche 7 · Stufe 7 – Meisterschaft

| Tag | Uhrzeit | Format | Hook/Titel | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel | „Niemand ist für immer Meister. Ich auch nicht." | `src/lib/reels.ts` – Serie „stufen", Topic **Meisterschaft**, Variante B · Skript: `docs/skripte/reels/stufen.md`, Abschnitt „07 · Meisterschaft — Variante B" | „Folge für die nächste Woche – wir starten den Praxis-/Wissenschafts-Block." |
| Mittwoch | 12:30 | 🖼️ Carousel | „Meisterschaft – Meister deiner Gedanken: Wie frei ist dein Geist wirklich?" | `docs/carousels/stufen-ueberblick.mjs`, Slide „07 · Meisterschaft – Meister deiner Gedanken" als Aufhänger, vertieft mit Blog `/blog/wie-frei-ist-unser-geist` (`src/lib/blog.ts`) und Vertiefung `/mitglieder/wissen/integration-und-weitergabe` (`src/lib/deep-dives.ts`, `relatedStage: 7`) | „Den ganzen Artikel gibt's im Blog – Link in Bio. Speichern, falls du deine 7 Stufen gerade zusammenfassen willst." |
| Freitag | 19:00 | 📚 Story | Umfrage „Bist du unter Druck eher fokussiert oder wackelig? Teste die Box." + Mini-Übung „Box Breathing" | `src/lib/practices.ts`, Slug **`box-breathing`** (Kategorie „Atemübungen", 3–5 Minuten) → Route `/mitglieder/praxis/box-breathing` | „Probier die 4-Sekunden-Runde jetzt und antworte auf die Umfrage." |
| Sonntag | 08:00 | 💬 Zitat + 🎯 Pitch | „Freiheit beginnt mit einer Frage: Ist dieser Gedanke wirklich meiner?" | Zitat-Kachel `docs/marketing/zitate/1x1/WMDG-Zitat-07-hell.png` (Creme-Standard; Text lt. `docs/marketing/content-data.mjs`, `QUOTES`, `key: "07"`) · Lektion `/mitglieder/stufe/7` + PDF `content/pdf/stufe-7-lektion.pdf` (+ `stufe-7-uebungen.pdf`) | „Hol dir das kostenlose E-Book – Link in Bio (`/#ebook`) → volle Stufe 7 in der Mitgliedschaft (`/mitglieder`)." |

## Rhythmus-Begründung

- **Reel (Mo, 18:00):** Startzeit für Reichweite. Variante B ist wortgleich
  zum Backlog-Hook „Niemand ist für immer Meister" – der stärkste Anti-Klischee-
  Einstieg für den Abschluss der 7-Stufen-Reise.
- **Carousel (Mi, 12:30):** Aha-Moment in der Wochenmitte. Kombiniert das
  Stufen-Carousel-Slide „07 · Meisterschaft" mit dem Blogartikel über
  geistige Freiheit – beide fragen: Wie viele deiner Gedanken sind wirklich
  deine?
- **Story (Fr, 19:00):** Anwenden zum Wochenausklang – Umfrage-Sticker plus
  die reale Praxis `box-breathing`. **Hinweis:** `box-breathing` trägt in
  `src/lib/practices.ts` `relatedStage: 6`, nicht 7 – im Code ist es also
  eher Stufe 6 (Innere Ausrichtung) zugeordnet als Stufe 7. Trotzdem für
  Woche 7 verwendet (Vorgabe des Koordinators), weil die Übung inhaltlich zu
  „Fokus/Ruhe unter Druck" passt und Meisterschaft genau das trainiert. Bitte
  im Backlog gegenprüfen – ggf. `taegliche-rueckkehr` (`relatedStage: 7`) als
  Alternative erwägen.
- **Zitat + Pitch (So, 08:00):** Wochenabschluss mit Bogen zum Angebot
  (E-Book → Mitgliedschaft), ruhiger Sonntagmorgen-Slot beibehalten.

## Material-Check (gegen Code/Ordner geprüft)

- ✅ Reel „Meisterschaft" Variante B in `src/lib/reels.ts` (Serie „stufen"), Skript in `docs/skripte/reels/stufen.md`.
- ✅ Blog-Slug `wie-frei-ist-unser-geist` existiert in `src/lib/blog.ts` (Kategorie „Bewusstsein"), reale Route `/blog/wie-frei-ist-unser-geist`.
- ✅ Deep-Dive `integration-und-weitergabe` in `src/lib/deep-dives.ts`, `relatedStage: 7` – Backlog-Warnung „nur naheliegend" damit aufgelöst, Zuordnung ist exakt.
- ⚠️ Praxis `box-breathing` in `src/lib/practices.ts` existiert real, Route `/mitglieder/praxis/box-breathing`, aber `relatedStage: 6` (nicht 7) – Abweichung von der Vorgabe, siehe Rhythmus-Begründung. Alternative mit `relatedStage: 7`: `taegliche-rueckkehr`.
- ✅ Carousel-Baustein „07 · Meisterschaft – Meister deiner Gedanken" real in `docs/carousels/stufen-ueberblick.mjs` gefunden.
- ✅ Zitat-Kachel `WMDG-Zitat-07-hell.png`, Text `QUOTES.key: "07"` aus `docs/marketing/content-data.mjs`.
- ✅ Lektion-Route `/mitglieder/stufe/7` + PDFs `content/pdf/stufe-7-lektion.pdf` / `stufe-7-uebungen.pdf` vorhanden.
- ✅ Funnel `/#ebook` → `/mitglieder` unverändert übernommen.
