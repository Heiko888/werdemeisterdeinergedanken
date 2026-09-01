# YouTube-Redaktionsplan — Woche 24

**Wochenthema:** Block C · Mentale Selbstverteidigung — Ablenkung
**Frequenz-Stufe:** fokussiert → 1× Hauptvideo (+ 1 Short als Crosspost)

Quelle Wochenthema: `docs/marketing/redaktionsplan/themen-backlog.md`, Block C,
Zeile 98 („Ablenkung" · Reel-Hook „Keine Lüge. Nur Lärm." · Blog
`ablenkung-keine-luege-nur-laerm` · Deep-Dive `ablenkung`).

---

## Wochenübersicht

| Tag | Uhrzeit | Format | Titel | Skript-/Quelle | CTA |
|---|---|---|---|---|---|
| Mi | 17:00 | ▶️ Video | Ablenkung: Keine Lüge — nur Lärm | Blog `src/lib/blog.ts` → Slug `ablenkung-keine-luege-nur-laerm` + Deep-Dive `src/lib/deep-dives.ts` → Slug `ablenkung` (PDF `content/pdf/vertiefung-ablenkung.pdf`) | „Kostenloses E-Book sichern" → `/#ebook` |
| Do | 12:00 | ⚡ Short | Man muss dir die Wahrheit nicht verbergen — es reicht, dich abzulenken | Reel `selbstverteidigung` / Topic „Ablenkung" aus `src/lib/reels.ts`, Skript `docs/skripte/reels/mentale-selbstverteidigung.md` Zeile 109–113 (identisch zu IG/FB-Reel dieser Woche) | „Ganzes Video verlinkt oben ↑" |

Begründung Zeitpunkt: Hauptvideo Mittwoch 17:00 (Richtwert). Short am
Folgetag (Do 12:00) statt spätnachmittags, weil Shorts als Zubringer über den
Tag verteilt bessere Sichtung bei Pendel-/Pausenzeiten bekommen — inhaltlich
bleibt der direkte Verweis aufs Hauptvideo vom Vortag erhalten.

---

## ▶️ Hauptvideo — Mi, 17:00

**Skript-/Materialbasis:**
- Kernaussage & Struktur: Blog-Artikel „Ablenkung: Keine Lüge — nur Lärm"
  (`src/lib/blog.ts`, Slug `ablenkung-keine-luege-nur-laerm`, Kategorie
  „Mentale Selbstverteidigung") — man muss die Wahrheit nicht verbieten,
  wenn man sie im Lärm verschwinden lässt; Ablenkung kapert deine
  Aufmerksamkeit, ohne dass eine einzige Lüge nötig ist.
- Vertiefung/Fachteil: Deep-Dive „Ablenkung & Überflutung"
  (`src/lib/deep-dives.ts`, Slug `ablenkung`, Untertitel „Wenn Aufmerksamkeit
  selbst zum Ziel wird", Kategorie „Mentale Selbstverteidigung"), PDF
  `content/pdf/vertiefung-ablenkung.pdf`
- Programmbezug/Einordnung: Wissensdatenbank `/mitglieder/wissen/ablenkung`

**Videotitel-Vorschlag:**
„Ablenkung: Keine Lüge — nur Lärm"

**Beschreibung (2–3 Sätze inkl. Funnel-Link):**
Man muss dir die Wahrheit nicht verbergen — es reicht, dich mit einem
ständig wechselnden Karussell aus Aufregern zu beschäftigen und zu
erschöpfen. In diesem Video zeige ich dir, wie Ablenkung deine
Aufmerksamkeit kapert und mit welcher einfachen Frage du deinen Fokus
zurückholst. Hol dir dazu das kostenlose E-Book „Werde Meister deiner
Gedanken": https://werdemeisterdeinergedanken.de/#ebook

**Stichwort-Tags:** Ablenkung, Mentale Selbstverteidigung, Manipulation erkennen, Aufmerksamkeit, Medienkompetenz

**Thumbnail:** Kein stufenspezifisches Motiv für Block C vorhanden. Basis
`docs/marketing/youtube/thumbnails/WMDG-Thumbnail-vorlage-hell.png`
(Creme-Variante, Standard laut Kanal-Vorgabe) — Motiv noch zu produzieren.

---

## ⚡ Short — Do, 12:00

**Reel-Quelle:** Serie „selbstverteidigung" (`src/lib/reels.ts`), Topic
„Ablenkung" — Hook „Keine Lüge. Nur Lärm." (Reel-Skript-Hook: „Man muss dir
die Wahrheit nicht verbergen. Es reicht, dich abzulenken."). Skripttext:
`docs/skripte/reels/mentale-selbstverteidigung.md`, Zeile 109–113. Dasselbe
Reel-Thema (Ablenkung) läuft in dieser Woche parallel auf
Instagram/Facebook — ein Kernthema über alle Kanäle.

**Short-Titel:** „Man muss dir die Wahrheit nicht verbergen — es reicht,
dich abzulenken"

**Beschreibung:** Empörung führt zu Erschöpfung, und ein erschöpfter Mensch
prüft nicht mehr, er reagiert nur noch. Die volle Erklärung im Hauptvideo
„Ablenkung: Keine Lüge — nur Lärm" — komplett oben verlinkt. Kostenloses
E-Book: https://werdemeisterdeinergedanken.de/#ebook

**On-Screen-Text (aus Skript):** „Empörung → Erschöpfung → keine Prüfung
mehr."

**CTA im Video:** „Deine Aufmerksamkeit ist wertvoll. Schütz sie — ganzes
Video oben verlinkt."

**Thumbnail:** Kein stufenspezifisches Motiv für Block C vorhanden. Basis
`docs/marketing/youtube/thumbnails/WMDG-Thumbnail-vorlage-hell.png`
(Creme-Variante, Standard laut Kanal-Vorgabe) — Motiv noch zu produzieren.

---

## Funnel-Pfad

Video/Short → `/#ebook` (Lead-Magnet, Anker in `src/components/sections/LeadMagnet.tsx`)
→ E-Book-Funnel → `/mitglieder` (Programmzugang, Wissensdatenbank `/mitglieder/wissen/ablenkung`).
