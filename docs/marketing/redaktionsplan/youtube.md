# YouTube-Redaktionsplan — Woche 1

**Wochenthema:** Block A · Die 7 Stufen — Stufe 1 · Autopilot
**Frequenz-Stufe:** fokussiert → 1× Hauptvideo (+ 1 Short als Crosspost)

Quelle Wochenthema: `docs/marketing/redaktionsplan/themen-backlog.md`, Zeile 34
(„Stufe 1 · Autopilot" · Hook „Wie oft entscheide ich wirklich?" · Blog
`drei-muster-die-dich-unbewusst-steuern` · Deep-Dive `automatische-gedanken` ·
Praxis `autopilot-check`).

---

## Wochenübersicht

| Tag | Uhrzeit | Format | Titel | Skript-/Quelle | CTA |
|---|---|---|---|---|---|
| Mi | 17:00 | ▶️ Video | Autopilot: Warum du oft gar nicht selbst entscheidest | Blog `src/lib/blog.ts` → Slug `drei-muster-die-dich-unbewusst-steuern` + Deep-Dive `src/lib/deep-dives.ts` → Slug `automatische-gedanken` + Lektion `/mitglieder/stufe/1` (PDF `content/pdf/stufe-1-lektion.pdf`) | „Kostenloses E-Book sichern" → `/#ebook` |
| Do | 12:00 | ⚡ Short | Der Autopilot-Check (30 Sek.) | Reel `stufen` / Topic „Autopilot" Variante C aus `src/lib/reels.ts`, Skript `docs/skripte/reels/stufen.md` Zeile 67–84 (identisch zu IG/FB-Reel dieser Woche) | „Ganzes Video verlinkt oben ↑ / Playlist ‚Die 7 Stufen'" |

Begründung Zeitpunkt: Hauptvideo Mittwoch 17:00 (Richtwert). Short am
Folgetag (Do 12:00) statt Mittagszeit statt spätnachmittags, weil Shorts als
Zubringer über den Tag verteilt bessere Sichtung bei Pendel-/Pausenzeiten
bekommen — inhaltlich bleibt der direkte Verweis aufs Hauptvideo vom Vortag
erhalten.

---

## ▶️ Hauptvideo — Mi, 17:00

**Skript-/Materialbasis:**
- Kernaussage & Struktur: Blog-Artikel „Drei Muster, die dich unbewusst
  steuern" (`src/lib/blog.ts`, Slug `drei-muster-die-dich-unbewusst-steuern`,
  Kategorie „Selbstführung")
- Vertiefung/Fachteil: Deep-Dive „Automatische Gedanken" (`src/lib/deep-dives.ts`,
  Slug `automatische-gedanken`, Untertitel „Die Stimme, die immer schon
  urteilt")
- Programmbezug/Einordnung: Lektion `/mitglieder/stufe/1`, PDF
  `content/pdf/stufe-1-lektion.pdf`
- Praxisteil am Ende des Videos: Übung „Der Autopilot-Check"
  (`src/lib/practices.ts`, Slug `autopilot-check`, 2 Minuten, Kategorie
  „Rituale")

**Videotitel-Vorschlag:**
„Autopilot: Warum du oft gar nicht selbst entscheidest (Stufe 1)"

**Beschreibung (2–3 Sätze inkl. Funnel-Link):**
Fast alles, was wir für unseren Charakter halten, ist antrainiert – und läuft
den ganzen Tag automatisch mit, ohne dass wir es merken. In diesem Video zeige
ich dir die drei unbewussten Muster, die deine Entscheidungen und Gefühle
leise steuern, und die einfache Übung, mit der du deinen Autopiloten zum
ersten Mal sichtbar machst. Hol dir dazu das kostenlose E-Book „Werde Meister
deiner Gedanken": https://werdemeisterdeinergedanken.de/#ebook

**Stichwort-Tags:** Autopilot, unbewusste Muster, Selbstführung, Achtsamkeit, Persönlichkeitsentwicklung

**Thumbnail:** `docs/marketing/youtube/thumbnails/WMDG-Thumbnail-01-hell.png`
(Creme-Variante, Standard laut Kanal-Vorgabe)

---

## ⚡ Short — Do, 12:00

**Reel-Quelle:** Serie „stufen" (`src/lib/reels.ts`, Zeile 50–52), Topic
„Autopilot", Variante C — „Der Autopilot-Check" (Hook: „Diese eine Frage
stell ich mir seit Jahren mehrmals am Tag.")
Skripttext: `docs/skripte/reels/stufen.md`, Zeile 67–84.
Dasselbe Reel läuft in dieser Woche parallel auf Instagram/Facebook — ein
Kernthema über alle Kanäle.

**Short-Titel:** „Diese eine Frage entlarvt deinen Autopiloten"

**Beschreibung:** Bewusst oder automatisch? Die Mini-Übung aus dem
Hauptvideo „Autopilot: Warum du oft gar nicht selbst entscheidest" – komplett
oben verlinkt. Kostenloses E-Book: https://werdemeisterdeinergedanken.de/#ebook

**On-Screen-Text (aus Skript):** Kurz innehalten · „Bewusst oder automatisch?"
· Nicht bewerten – nur sehen · Ein Riss im Automatischen

**CTA im Video:** „Speicher das und probier es heute dreimal – ganzes Video
oben verlinkt."

**Thumbnail:** `docs/marketing/youtube/thumbnails/WMDG-Thumbnail-02-hell.png`
(Creme-Variante, Standard laut Kanal-Vorgabe)

---

## Funnel-Pfad

Video/Short → `/#ebook` (Lead-Magnet, Anker in `src/components/sections/LeadMagnet.tsx`)
→ E-Book-Funnel → `/mitglieder` (Programmzugang, Lektion `/mitglieder/stufe/1`).
