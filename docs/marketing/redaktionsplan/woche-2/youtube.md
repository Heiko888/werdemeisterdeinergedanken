# YouTube-Redaktionsplan — Woche 2

**Wochenthema:** Block A · Die 7 Stufen — Stufe 2 · Erwachen
**Frequenz-Stufe:** fokussiert → 1× Hauptvideo (+ 1 Short als Crosspost)

Quelle Wochenthema: `docs/marketing/redaktionsplan/themen-backlog.md`, Block A,
Zeile 35 („Stufe 2 · Erwachen" · Hook „Wer hört zu, wenn du denkst?" · Blog
`du-bist-nicht-deine-gedanken` · Deep-Dive `reiz-reaktions-luecke` · Praxis
`atembeobachtung`).

---

## Wochenübersicht

| Tag | Uhrzeit | Format | Titel | Skript-/Quelle | CTA |
|---|---|---|---|---|---|
| Mi | 17:00 | ▶️ Video | Wer hört eigentlich zu, wenn du denkst? (Stufe 2: Erwachen) | Blog `src/lib/blog.ts` → Slug `du-bist-nicht-deine-gedanken` + Deep-Dive `src/lib/deep-dives.ts` → Slug `reiz-reaktions-luecke` + Lektion `/mitglieder/stufe/2` (PDF `content/pdf/stufe-2-lektion.pdf`) | „Kostenloses E-Book sichern" → `/#ebook` |
| Do | 12:00 | ⚡ Short | Wenn du deine Gedanken hören kannst — wer hört dann zu? | Reel `stufen` / Topic „Erwachen" Variante B aus `src/lib/reels.ts`, Skript `docs/skripte/reels/stufen.md` Zeile 108–125 (identisch zu IG/FB-Reel dieser Woche) | „Ganzes Video verlinkt oben ↑ / Playlist ‚Die 7 Stufen'" |

Begründung Zeitpunkt: Hauptvideo Mittwoch 17:00 (Richtwert). Short am
Folgetag (Do 12:00) statt spätnachmittags, weil Shorts als Zubringer über den
Tag verteilt bessere Sichtung bei Pendel-/Pausenzeiten bekommen — inhaltlich
bleibt der direkte Verweis aufs Hauptvideo vom Vortag erhalten.

---

## ▶️ Hauptvideo — Mi, 17:00

**Skript-/Materialbasis:**
- Kernaussage & Struktur: Blog-Artikel „Du bist nicht deine Gedanken"
  (`src/lib/blog.ts`, Slug `du-bist-nicht-deine-gedanken`, Kategorie
  „Bewusstsein") — der innere Beobachter, der Raum zwischen Reiz und
  Reaktion, die Wolken-Übung.
- Vertiefung/Fachteil: Deep-Dive „Die Reiz-Reaktions-Lücke"
  (`src/lib/deep-dives.ts`, Slug `reiz-reaktions-luecke`, Untertitel „Der
  Raum, in dem du frei bist", Kategorie „Denken & Wahrnehmung")
- Programmbezug/Einordnung: Lektion `/mitglieder/stufe/2`, PDF
  `content/pdf/stufe-2-lektion.pdf`
- Praxisteil am Ende des Videos: Übung „Atembeobachtung"
  (`src/lib/practices.ts`, Slug `atembeobachtung`, 5–10 Minuten, Kategorie
  „Meditationen")

**Videotitel-Vorschlag:**
„Wer hört eigentlich zu, wenn du denkst? (Stufe 2: Erwachen)"

**Beschreibung (2–3 Sätze inkl. Funnel-Link):**
Die meisten Menschen halten jeden Gedanken für die Wahrheit — und werden von
ihm gelebt, statt umgekehrt. In diesem Video zeige ich dir den inneren
Beobachter, der deine Gedanken nur wahrnimmt, ohne sie zu sein, und die
einfache Atem-Übung, mit der du diesen Raum zwischen Reiz und Reaktion zum
ersten Mal spürst. Hol dir dazu das kostenlose E-Book „Werde Meister deiner
Gedanken": https://werdemeisterdeinergedanken.de/#ebook

**Stichwort-Tags:** Erwachen, innerer Beobachter, Reiz-Reaktions-Lücke, Achtsamkeit, Persönlichkeitsentwicklung

**Thumbnail:** Basis `docs/marketing/youtube/thumbnails/WMDG-Thumbnail-vorlage-hell.png`
(Creme-Variante, Standard laut Kanal-Vorgabe). Die stufenspezifischen
Thumbnails `WMDG-Thumbnail-01-hell.png`/`-02-hell.png` sind bereits für
Woche 1 (Stufe 1) belegt; für Stufe 2 liegt noch kein eigenes nummeriertes
Motiv vor — Produktion aus der Vorlage nachholen, bevor das Video live geht.

---

## ⚡ Short — Do, 12:00

**Reel-Quelle:** Serie „stufen" (`src/lib/reels.ts`), Topic „Erwachen",
Variante B — „Du bist nicht deine Gedanken" (Hook: „Wenn du deine Gedanken
hören kannst – wer hört dann eigentlich zu?").
Skripttext: `docs/skripte/reels/stufen.md`, Zeile 108–125.
Dasselbe Reel-Thema (Stufe 2 · Erwachen) läuft in dieser Woche parallel auf
Instagram/Facebook — ein Kernthema über alle Kanäle.

**Short-Titel:** „Wenn du deine Gedanken hören kannst — wer hört dann zu?"

**Beschreibung:** Du kannst deine Gedanken bemerken — also bist du mehr als
sie. Die volle Erklärung im Hauptvideo „Wer hört eigentlich zu, wenn du
denkst?" — komplett oben verlinkt. Kostenloses E-Book:
https://werdemeisterdeinergedanken.de/#ebook

**On-Screen-Text (aus Skript):** Du bemerkst deine Gedanken · Also bist du
mehr als sie · Der Zuhörer war immer da · Erinnern statt werden

**CTA im Video:** „Mach den kostenlosen Bewusstseinstest und finde deine
Stufe — ganzes Video oben verlinkt."

**Thumbnail:** Basis `docs/marketing/youtube/thumbnails/WMDG-Thumbnail-vorlage-hell.png`
(Creme-Variante, Standard laut Kanal-Vorgabe); Produktion aus der Vorlage
nachholen (siehe Hinweis beim Hauptvideo).

---

## Funnel-Pfad

Video/Short → `/#ebook` (Lead-Magnet, Anker in `src/components/sections/LeadMagnet.tsx`)
→ E-Book-Funnel → `/mitglieder` (Programmzugang, Lektion `/mitglieder/stufe/2`).
