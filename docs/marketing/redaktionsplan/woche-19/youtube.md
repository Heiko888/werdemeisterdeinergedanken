# YouTube-Redaktionsplan — Woche 19

**Wochenthema:** Block C · Mentale Selbstverteidigung — Kognitive Dissonanz
**Frequenz-Stufe:** fokussiert → 1× Hauptvideo (+ 1 Short als Crosspost)

Quelle Wochenthema: `docs/marketing/redaktionsplan/themen-backlog.md`, Block C,
Zeile 93 („Kognitive Dissonanz" · Reel-Hook „Warum du wegschaust" · Blog
`warum-du-verteidigst-was-dir-schadet` · Deep-Dive `kognitive-dissonanz`).

---

## Wochenübersicht

| Tag | Uhrzeit | Format | Titel | Skript-/Quelle | CTA |
|---|---|---|---|---|---|
| Mi | 17:00 | ▶️ Video | Warum du verteidigst, was dir schadet (Kognitive Dissonanz) | Blog `src/lib/blog.ts` → Slug `warum-du-verteidigst-was-dir-schadet` + Deep-Dive `src/lib/deep-dives.ts` → Slug `kognitive-dissonanz` (PDF `content/pdf/vertiefung-kognitive-dissonanz.pdf`) | „Kostenloses E-Book sichern" → `/#ebook` |
| Do | 12:00 | ⚡ Short | Wir lehnen Informationen nicht ab, weil sie falsch sind | Reel `selbstverteidigung` / Topic „Kognitive Dissonanz" aus `src/lib/reels.ts`, Skript `docs/skripte/reels/mentale-selbstverteidigung.md` Zeile 115–119 (identisch zu IG/FB-Reel dieser Woche) | „Ganzes Video verlinkt oben ↑" |

Begründung Zeitpunkt: Hauptvideo Mittwoch 17:00 (Richtwert). Short am
Folgetag (Do 12:00) statt spätnachmittags, weil Shorts als Zubringer über den
Tag verteilt bessere Sichtung bei Pendel-/Pausenzeiten bekommen — inhaltlich
bleibt der direkte Verweis aufs Hauptvideo vom Vortag erhalten.

---

## ▶️ Hauptvideo — Mi, 17:00

**Skript-/Materialbasis:**
- Kernaussage & Struktur: Blog-Artikel „Warum du verteidigst, was dir
  schadet" (`src/lib/blog.ts`, Slug `warum-du-verteidigst-was-dir-schadet`,
  Kategorie „Mentale Selbstverteidigung") — wir lehnen Informationen oft
  nicht ab, weil sie falsch sind, sondern weil sie unser Weltbild bedrohen;
  statt die eigene Sicht zu prüfen, wird die Quelle abgewertet.
- Vertiefung/Fachteil: Deep-Dive „Kognitive Dissonanz"
  (`src/lib/deep-dives.ts`, Slug `kognitive-dissonanz`, Untertitel „Warum wir
  Unpassendes abwehren", Kategorie „Mentale Selbstverteidigung"), PDF
  `content/pdf/vertiefung-kognitive-dissonanz.pdf`
- Programmbezug/Einordnung: Wissensdatenbank
  `/mitglieder/wissen/kognitive-dissonanz`

**Videotitel-Vorschlag:**
„Warum du verteidigst, was dir schadet — Kognitive Dissonanz erklärt"

**Beschreibung (2–3 Sätze inkl. Funnel-Link):**
Wir lehnen Informationen selten ab, weil sie falsch sind — sondern weil sie
unser Weltbild bedrohen. In diesem Video zeige ich dir, wie kognitive
Dissonanz dich dazu bringt, unbequeme Fakten wegzuschieben statt genauer
hinzuschauen, und wie du dieses Unbehagen künftig als Hinweis statt als
Alarm liest. Hol dir dazu das kostenlose E-Book „Werde Meister deiner
Gedanken": https://werdemeisterdeinergedanken.de/#ebook

**Stichwort-Tags:** Kognitive Dissonanz, Mentale Selbstverteidigung, Manipulation erkennen, kritisches Denken, Selbstreflexion

**Thumbnail:** Kein stufenspezifisches Motiv für Block C vorhanden. Basis
`docs/marketing/youtube/thumbnails/WMDG-Thumbnail-vorlage-hell.png`
(Creme-Variante, Standard laut Kanal-Vorgabe) — Motiv noch zu produzieren.

---

## ⚡ Short — Do, 12:00

**Reel-Quelle:** Serie „selbstverteidigung" (`src/lib/reels.ts`), Topic
„Kognitive Dissonanz" — Hook „Warum du wegschaust" (Reel-Skript-Hook: „Wir
lehnen Informationen nicht ab, weil sie falsch sind."). Skripttext:
`docs/skripte/reels/mentale-selbstverteidigung.md`, Zeile 115–119. Dasselbe
Reel-Thema (Kognitive Dissonanz) läuft in dieser Woche parallel auf
Instagram/Facebook — ein Kernthema über alle Kanäle.

**Short-Titel:** „Wir lehnen Informationen nicht ab, weil sie falsch sind"

**Beschreibung:** Unbequem heißt nicht falsch — und trotzdem schauen wir
lieber weg. Die volle Erklärung im Hauptvideo „Warum du verteidigst, was dir
schadet" — komplett oben verlinkt. Kostenloses E-Book:
https://werdemeisterdeinergedanken.de/#ebook

**On-Screen-Text (aus Skript):** „Unbequem ≠ falsch."

**CTA im Video:** „Wann hast du zuletzt zugegeben, dich geirrt zu haben? —
ganzes Video oben verlinkt."

**Thumbnail:** Kein stufenspezifisches Motiv für Block C vorhanden. Basis
`docs/marketing/youtube/thumbnails/WMDG-Thumbnail-vorlage-hell.png`
(Creme-Variante, Standard laut Kanal-Vorgabe) — Motiv noch zu produzieren.

---

## Funnel-Pfad

Video/Short → `/#ebook` (Lead-Magnet, Anker in `src/components/sections/LeadMagnet.tsx`)
→ E-Book-Funnel → `/mitglieder` (Programmzugang, Wissensdatenbank `/mitglieder/wissen/kognitive-dissonanz`).
