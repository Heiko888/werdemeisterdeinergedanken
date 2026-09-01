# Instagram – Wochenplan

**Wochenthema:** Block B · Praxis & Wissenschaft – Was Meditation im Gehirn verändert (Woche 9)
**Frequenz-Stufe:** fokussiert → **4 Posts** (keine täglichen Stories in dieser Stufe)
**Dramaturgie der Woche:** Aufmerksamkeit → Aha → Anwenden → Angebot

> Alle Quellen unten wurden gegen den Code geprüft (`src/lib/reels.ts`,
> `src/lib/blog.ts`, `src/lib/deep-dives.ts`, `src/lib/practices.ts`,
> `docs/carousels/marketing-serien.mjs`, `docs/marketing/content-data.mjs`,
> `docs/marketing/zitate/`). Blog-Route real unter **`/blog/…`**
> (`src/app/blog/[slug]/page.tsx`), Deep-Dive-Route real unter
> **`/mitglieder/wissen/…`** (`src/app/mitglieder/wissen/[slug]/page.tsx`).
> Themenquelle: `docs/marketing/redaktionsplan/themen-backlog.md`, Block B,
> Zeile „Was Meditation im Gehirn verändert".

> **Cross-Channel-Abgleich:** `docs/marketing/redaktionsplan/woche-9/youtube.md`
> und `.../facebook.md` (beide bereits vorhanden) setzen für diese Woche
> explizit das Reel-Thema **„Abschweifender Geist"** (Serie „wissenschaft")
> als kanalübergreifenden Crosspost-Kern ein, da `src/lib/reels.ts` kein
> eigenes Reel-Thema „Meditation" führt. Dieser Plan übernimmt dasselbe Reel
> für Konsistenz über alle Kanäle.

## Woche 9 · Was Meditation im Gehirn verändert

| Tag | Uhrzeit | Format | Hook/Titel | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel | „Fast die Hälfte des Tages bist du gedanklich woanders." | `src/lib/reels.ts` – Serie „wissenschaft", Topic **Abschweifender Geist** · Skript: `docs/skripte/reels/wissenschaft.md`, Abschnitt „06 · Der abschweifende Geist — 47 %" (Zeile 58), Quelle Killingsworth & Gilbert (Harvard, 2010, „Science") | „Was Meditation genau daran verändert, steht im Blog – Link in Bio." |
| Mittwoch | 12:30 | 🖼️ Carousel | „Dein Gehirn bleibt formbar – auch durch Meditation" | `docs/carousels/marketing-serien.mjs`, Carousel **„studien-fakten"**, Slide „Fakt 01 · Dein Gehirn bleibt formbar" (Maguire 2000 · Draganski 2004, Neuroplastizität) als Aufhänger, vertieft mit Blog `/blog/was-meditation-im-gehirn-veraendert` (`src/lib/blog.ts`, Kategorie „Wissenschaft") und Vertiefung `/mitglieder/wissen/neuroplastizitaet` (`src/lib/deep-dives.ts`) | „Den ganzen Artikel gibt's im Blog – Link in Bio. Speichern, wenn du gerade übst." |
| Freitag | 19:00 | 📚 Story | Umfrage „Schweifst du beim Meditieren oft ab – und denkst, das sei ein Fehler?" + Mini-Übung „Atembeobachtung" | `src/lib/practices.ts`, Slug **`atembeobachtung`** (Kategorie „Meditationen", 5–10 Minuten) → Route `/mitglieder/praxis/atembeobachtung` | „Probier die Basis-Übung jetzt und antworte auf die Umfrage: Abschweifen ist Teil der Übung, nicht ihr Gegenteil." |
| Sonntag | 08:00 | 💬 Zitat + 🎯 Pitch | „Acht Wochen Achtsamkeit – und die graue Substanz im Hippocampus nimmt messbar zu." | Studien-Kachel `docs/marketing/zitate/studien-4x5/WMDG-Studienfakt-11-hell.png` (Creme-Standard; Text lt. `docs/marketing/content-data.mjs`, `FACTS`, `key: "11"`, Quelle Hölzel et al. 2011, MBSR, kleine Stichprobe) | „Hol dir das kostenlose E-Book – Link in Bio (`/#ebook`) → alle Meditations-Übungen in der Mitgliedschaft (`/mitglieder`)." |

## Rhythmus-Begründung

- **Reel (Mo, 18:00):** Startzeit für Reichweite. „Abschweifender Geist" statt
  eines eigenen Meditations-Reels, weil `src/lib/reels.ts` (Serie
  „wissenschaft") kein Thema „Meditation" führt – die zitierte Studie
  (Killingsworth & Gilbert) ist derselbe Beleg, mit dem der Wochenblog
  beginnt, und ist zugleich das kanalübergreifend abgestimmte Reel-Thema
  laut `woche-9/youtube.md` und `woche-9/facebook.md`.
- **Carousel (Mi, 12:30):** Aha-Moment in der Wochenmitte. Slide „Fakt 01"
  der Serie „studien-fakten" behandelt Neuroplastizität allgemein
  (Taxifahrer/Jonglieren) – als Brücke zum Blog, der genau diesen Mechanismus
  auf Meditation überträgt. Deep-Dive `neuroplastizitaet` ist eine
  inhaltliche Analogie (Gehirnveränderung durch Übung), nicht die im
  Blogartikel selbst verlinkte Vertiefung – wie bereits in
  `woche-9/facebook.md` vermerkt.
- **Story (Fr, 19:00):** Anwenden zum Wochenausklang – Umfrage-Sticker plus
  die reale Praxis `atembeobachtung`, die im Blogartikel selbst als
  Einstiegs-Übung genannt wird („drei Minuten Atemfokus am Tag genügen").
- **Zitat + Pitch (So, 08:00):** Studienfakt-Kachel **Key 11** (Hölzel 2011,
  MBSR) statt eines Alltags-Zitats, weil sie 1:1 zum Wochenthema passt –
  die einzige Studie im gesamten `FACTS`-Bestand, die direkt Achtsamkeit und
  messbare Gehirnveränderung verbindet. Ruhiger Sonntagmorgen-Slot
  beibehalten.

## Material-Check (gegen Code/Ordner geprüft)

- ✅ Reel „Abschweifender Geist" in `src/lib/reels.ts` (Serie „wissenschaft"), Skript in `docs/skripte/reels/wissenschaft.md`, Zeile 58.
- ✅ Blog-Slug `was-meditation-im-gehirn-veraendert` existiert in `src/lib/blog.ts` (Kategorie „Wissenschaft"), reale Route `/blog/was-meditation-im-gehirn-veraendert`.
- ✅ Deep-Dive `neuroplastizitaet` in `src/lib/deep-dives.ts`, reale Route `/mitglieder/wissen/neuroplastizitaet`.
- ✅ Praxis `atembeobachtung` in `src/lib/practices.ts`, Route `/mitglieder/praxis/atembeobachtung`.
- ✅ Carousel „studien-fakten" real in `docs/carousels/marketing-serien.mjs` (Zeile 117), Slide „Fakt 01 · Dein Gehirn bleibt formbar" wortgleich vorhanden.
- ✅ Studien-Kachel `WMDG-Studienfakt-11-hell.png`, Text `FACTS.key: "11"` aus `docs/marketing/content-data.mjs` – Datei real vorhanden in `docs/marketing/zitate/studien-4x5/` (vom Themen-Backlog für diese Woche vorgeschlagenes Format).
- ✅ Funnel `/#ebook` → `/mitglieder` unverändert übernommen.
- ⚠️ **Korrektur zum Cross-Channel-Material gemeldet:**
  `docs/marketing/redaktionsplan/woche-9/facebook.md` referenziert für die
  Hölzel-Studie fälschlich `WMDG-Studienfakt-05-hell.png` (Text-Key „05" in
  `docs/marketing/content-data.mjs`, `FACTS` ist jedoch **Baumeister/
  Willenskraft**, nicht Hölzel/Meditation) und merkt selbst an, das unsicher
  zu sein. Der tatsächlich passende Fakt ist **`key: "11"`** – „Acht Wochen
  Achtsamkeit … Hippocampus … Hölzel et al., 2011 (MBSR; kleine
  Stichprobe)". Bitte `woche-9/facebook.md` entsprechend korrigieren.
