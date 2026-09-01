# YouTube-Redaktionsplan — Woche 20

**Wochenthema:** Block C · Mentale Selbstverteidigung — Identität & Meinung
**Frequenz-Stufe:** fokussiert → 1× Hauptvideo (+ 1 Short als Crosspost)

Quelle Wochenthema: `docs/marketing/redaktionsplan/themen-backlog.md`, Block C,
Zeile 94 („Identität & Meinung" · Reel-Hook „Meinung – oder hat sie dich?" ·
Blog `hast-du-eine-meinung-oder-hat-sie-dich` · Deep-Dive
`identitaet-und-meinung`).

---

## Wochenübersicht

| Tag | Uhrzeit | Format | Titel | Skript-/Quelle | CTA |
|---|---|---|---|---|---|
| Mi | 17:00 | ▶️ Video | Hast du eine Meinung — oder hat die Meinung dich? | Blog `src/lib/blog.ts` → Slug `hast-du-eine-meinung-oder-hat-sie-dich` + Deep-Dive `src/lib/deep-dives.ts` → Slug `identitaet-und-meinung` (PDF `content/pdf/vertiefung-identitaet-und-meinung.pdf`) | „Kostenloses E-Book sichern" → `/#ebook` |
| Do | 12:00 | ⚡ Short | Hast du eine Meinung — oder hat die Meinung längst dich? | Reel `selbstverteidigung` / Topic „Identität & Meinung" aus `src/lib/reels.ts`, Skript `docs/skripte/reels/mentale-selbstverteidigung.md` Zeile 133–137 (identisch zu IG/FB-Reel dieser Woche) | „Ganzes Video verlinkt oben ↑" |

Begründung Zeitpunkt: Hauptvideo Mittwoch 17:00 (Richtwert). Short am
Folgetag (Do 12:00) statt spätnachmittags, weil Shorts als Zubringer über den
Tag verteilt bessere Sichtung bei Pendel-/Pausenzeiten bekommen — inhaltlich
bleibt der direkte Verweis aufs Hauptvideo vom Vortag erhalten.

---

## ▶️ Hauptvideo — Mi, 17:00

**Skript-/Materialbasis:**
- Kernaussage & Struktur: Blog-Artikel „Hast du eine Meinung — oder hat die
  Meinung dich?" (`src/lib/blog.ts`, Slug
  `hast-du-eine-meinung-oder-hat-sie-dich`, Kategorie „Mentale
  Selbstverteidigung") — sobald eine Meinung Teil der Identität wird, fühlt
  sich Kritik daran wie ein persönlicher Angriff an; die Freiheit liegt im
  Abstand zwischen dir und deinen Überzeugungen.
- Vertiefung/Fachteil: Deep-Dive „Identität & Meinung"
  (`src/lib/deep-dives.ts`, Slug `identitaet-und-meinung`, Untertitel „Wenn
  Kritik als Angriff auf dich wirkt", Kategorie „Mentale
  Selbstverteidigung"), PDF `content/pdf/vertiefung-identitaet-und-meinung.pdf`
- Programmbezug/Einordnung: Wissensdatenbank
  `/mitglieder/wissen/identitaet-und-meinung`

**Videotitel-Vorschlag:**
„Hast du eine Meinung — oder hat die Meinung dich? Identität & Meinung erklärt"

**Beschreibung (2–3 Sätze inkl. Funnel-Link):**
Sobald eine Meinung Teil deiner Identität wird, fühlt sich Kritik daran wie
ein Angriff auf dich selbst an — noch bevor du zugehört hast. In diesem
Video zeige ich dir, wie du den Abstand zwischen dir und deinen
Überzeugungen zurückgewinnst, ohne dabei dich selbst zu verlieren. Hol dir
dazu das kostenlose E-Book „Werde Meister deiner Gedanken":
https://werdemeisterdeinergedanken.de/#ebook

**Stichwort-Tags:** Identität und Meinung, Mentale Selbstverteidigung, Manipulation erkennen, kritisches Denken, Selbstreflexion

**Thumbnail:** Kein stufenspezifisches Motiv für Block C vorhanden. Basis
`docs/marketing/youtube/thumbnails/WMDG-Thumbnail-vorlage-hell.png`
(Creme-Variante, Standard laut Kanal-Vorgabe) — Motiv noch zu produzieren.

---

## ⚡ Short — Do, 12:00

**Reel-Quelle:** Serie „selbstverteidigung" (`src/lib/reels.ts`), Topic
„Identität & Meinung" — Hook „Hast du eine Meinung – oder hat sie dich?"
(Reel-Skript-Hook: „Hast du eine Meinung – oder hat die Meinung längst
dich?"). Skripttext: `docs/skripte/reels/mentale-selbstverteidigung.md`,
Zeile 133–137. Dasselbe Reel-Thema (Identität & Meinung) läuft in dieser
Woche parallel auf Instagram/Facebook — ein Kernthema über alle Kanäle.

**Short-Titel:** „Hast du eine Meinung — oder hat die Meinung längst dich?"

**Beschreibung:** Eine Meinung ist ein Werkzeug, kein Körperteil — und
trotzdem geht der Körper in Verteidigung, bevor der Verstand zuhört. Die
volle Erklärung im Hauptvideo „Hast du eine Meinung — oder hat die Meinung
dich?" — komplett oben verlinkt. Kostenloses E-Book:
https://werdemeisterdeinergedanken.de/#ebook

**On-Screen-Text (aus Skript):** „Meinung = Werkzeug, kein Körperteil."

**CTA im Video:** „Bei welchem Thema fühlt sich Widerspruch persönlich an? —
ganzes Video oben verlinkt."

**Thumbnail:** Kein stufenspezifisches Motiv für Block C vorhanden. Basis
`docs/marketing/youtube/thumbnails/WMDG-Thumbnail-vorlage-hell.png`
(Creme-Variante, Standard laut Kanal-Vorgabe) — Motiv noch zu produzieren.

---

## Funnel-Pfad

Video/Short → `/#ebook` (Lead-Magnet, Anker in `src/components/sections/LeadMagnet.tsx`)
→ E-Book-Funnel → `/mitglieder` (Programmzugang, Wissensdatenbank `/mitglieder/wissen/identitaet-und-meinung`).
