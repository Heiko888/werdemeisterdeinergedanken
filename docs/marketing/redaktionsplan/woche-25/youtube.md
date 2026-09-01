# YouTube-Redaktionsplan — Woche 25

**Wochenthema:** Block C · Mentale Selbstverteidigung — Normalisierung
**Frequenz-Stufe:** fokussiert → 1× Hauptvideo (+ 1 Short als Crosspost)

Quelle Wochenthema: `docs/marketing/redaktionsplan/themen-backlog.md`, Block C,
Zeile 99 („Normalisierung" · Reel-Hook „War doch schon immer so?" · Blog
`normalisierung-war-doch-schon-immer-so` · Deep-Dive `normalisierung`).

---

## Wochenübersicht

| Tag | Uhrzeit | Format | Titel | Skript-/Quelle | CTA |
|---|---|---|---|---|---|
| Mi | 17:00 | ▶️ Video | Normalisierung: Warum „war schon immer so" kein Argument ist | Blog `src/lib/blog.ts` → Slug `normalisierung-war-doch-schon-immer-so` + Deep-Dive `src/lib/deep-dives.ts` → Slug `normalisierung` (PDF `content/pdf/vertiefung-normalisierung.pdf`) | „Kostenloses E-Book sichern" → `/#ebook` |
| Do | 12:00 | ⚡ Short | Was gestern undenkbar war, ist heute normal — wie geht das? | Reel `selbstverteidigung` / Topic „Normalisierung" aus `src/lib/reels.ts`, Skript `docs/skripte/reels/mentale-selbstverteidigung.md` Zeile 121–125 (identisch zu IG/FB-Reel dieser Woche) | „Ganzes Video verlinkt oben ↑" |

Begründung Zeitpunkt: Hauptvideo Mittwoch 17:00 (Richtwert). Short am
Folgetag (Do 12:00) statt spätnachmittags, weil Shorts als Zubringer über den
Tag verteilt bessere Sichtung bei Pendel-/Pausenzeiten bekommen — inhaltlich
bleibt der direkte Verweis aufs Hauptvideo vom Vortag erhalten.

---

## ▶️ Hauptvideo — Mi, 17:00

**Skript-/Materialbasis:**
- Kernaussage & Struktur: Blog-Artikel „Normalisierung: Warum „war schon
  immer so" kein Argument ist" (`src/lib/blog.ts`, Slug
  `normalisierung-war-doch-schon-immer-so`, Kategorie „Mentale
  Selbstverteidigung") — was oft genug wiederholt wird, fühlt sich
  irgendwann normal an, auch das, was es nicht sein sollte; schleichende
  Gewöhnung verschiebt Grenzen in kleinen, unauffälligen Schritten.
- Vertiefung/Fachteil: Deep-Dive „Normalisierung" (`src/lib/deep-dives.ts`,
  Slug `normalisierung`, Untertitel „Wie das Ungewöhnliche selbstverständlich
  wird", Kategorie „Mentale Selbstverteidigung"), PDF
  `content/pdf/vertiefung-normalisierung.pdf`
- Programmbezug/Einordnung: Wissensdatenbank
  `/mitglieder/wissen/normalisierung`

**Videotitel-Vorschlag:**
„Normalisierung: Warum „war schon immer so" kein Argument ist"

**Beschreibung (2–3 Sätze inkl. Funnel-Link):**
Was gestern undenkbar war, ist heute normal — nicht durch einen großen
Schlag, sondern durch winzige Schritte, von denen jeder einzelne zu klein
zum Aufregen wirkt. In diesem Video zeige ich dir, wie Normalisierung
funktioniert und warum es sich lohnt, deine erste, noch wache Reaktion
ernst zu nehmen, bevor die Gewöhnung sie überschreibt. Hol dir dazu das
kostenlose E-Book „Werde Meister deiner Gedanken":
https://werdemeisterdeinergedanken.de/#ebook

**Stichwort-Tags:** Normalisierung, Mentale Selbstverteidigung, Manipulation erkennen, kritisches Denken, Medienkompetenz

**Thumbnail:** Kein stufenspezifisches Motiv für Block C vorhanden. Basis
`docs/marketing/youtube/thumbnails/WMDG-Thumbnail-vorlage-hell.png`
(Creme-Variante, Standard laut Kanal-Vorgabe) — Motiv noch zu produzieren.

---

## ⚡ Short — Do, 12:00

**Reel-Quelle:** Serie „selbstverteidigung" (`src/lib/reels.ts`), Topic
„Normalisierung" — Hook „War doch schon immer so?" (Reel-Skript-Hook: „Was
gestern undenkbar war, ist heute normal. Wie geht das?"). Skripttext:
`docs/skripte/reels/mentale-selbstverteidigung.md`, Zeile 121–125. Dasselbe
Reel-Thema (Normalisierung) läuft in dieser Woche parallel auf
Instagram/Facebook — ein Kernthema über alle Kanäle.

**Short-Titel:** „Was gestern undenkbar war, ist heute normal — wie geht
das?"

**Beschreibung:** Kleine Schritte, keine Brüche — „das war doch schon immer
so" stimmt fast nie. Die volle Erklärung im Hauptvideo „Normalisierung:
Warum „war schon immer so" kein Argument ist" — komplett oben verlinkt.
Kostenloses E-Book: https://werdemeisterdeinergedanken.de/#ebook

**On-Screen-Text (aus Skript):** „Kleine Schritte. Keine Brüche. · ‚War
doch schon immer so.'"

**CTA im Video:** „Speicher das — und beobachte dich selbst — ganzes Video
oben verlinkt."

**Thumbnail:** Kein stufenspezifisches Motiv für Block C vorhanden. Basis
`docs/marketing/youtube/thumbnails/WMDG-Thumbnail-vorlage-hell.png`
(Creme-Variante, Standard laut Kanal-Vorgabe) — Motiv noch zu produzieren.

---

## Funnel-Pfad

Video/Short → `/#ebook` (Lead-Magnet, Anker in `src/components/sections/LeadMagnet.tsx`)
→ E-Book-Funnel → `/mitglieder` (Programmzugang, Wissensdatenbank `/mitglieder/wissen/normalisierung`).
