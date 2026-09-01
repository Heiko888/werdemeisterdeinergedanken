# YouTube-Redaktionsplan — Woche 26

**Wochenthema:** Block C · Mentale Selbstverteidigung — Bildmacht
**Frequenz-Stufe:** fokussiert → 1× Hauptvideo (+ 1 Short als Crosspost)

Quelle Wochenthema: `docs/marketing/redaktionsplan/themen-backlog.md`, Block C,
Zeile 100 („Bildmacht" · Reel-Hook „Ein Bild ist kein Beweis" · Blog
`bildmacht-ein-bild-ist-kein-beweis` · Deep-Dive `bildmacht`).

---

## Wochenübersicht

| Tag | Uhrzeit | Format | Titel | Skript-/Quelle | CTA |
|---|---|---|---|---|---|
| Mi | 17:00 | ▶️ Video | Bildmacht: Warum ein Bild kein Beweis ist | Blog `src/lib/blog.ts` → Slug `bildmacht-ein-bild-ist-kein-beweis` + Deep-Dive `src/lib/deep-dives.ts` → Slug `bildmacht` (PDF `content/pdf/vertiefung-bildmacht.pdf`) | „Kostenloses E-Book sichern" → `/#ebook` |
| Do | 12:00 | ⚡ Short | Ein Bild fühlt sich an wie ein Beweis — ist aber nur ein Ausschnitt | Reel `selbstverteidigung` / Topic „Bildmacht" aus `src/lib/reels.ts`, Skript `docs/skripte/reels/mentale-selbstverteidigung.md` Zeile 127–131 (identisch zu IG/FB-Reel dieser Woche) | „Ganzes Video verlinkt oben ↑" |

Begründung Zeitpunkt: Hauptvideo Mittwoch 17:00 (Richtwert). Short am
Folgetag (Do 12:00) statt spätnachmittags, weil Shorts als Zubringer über den
Tag verteilt bessere Sichtung bei Pendel-/Pausenzeiten bekommen — inhaltlich
bleibt der direkte Verweis aufs Hauptvideo vom Vortag erhalten.

---

## ▶️ Hauptvideo — Mi, 17:00

**Skript-/Materialbasis:**
- Kernaussage & Struktur: Blog-Artikel „Bildmacht: Warum ein Bild kein
  Beweis ist" (`src/lib/blog.ts`, Slug `bildmacht-ein-bild-ist-kein-beweis`,
  Kategorie „Mentale Selbstverteidigung") — ein Bild überzeugt schneller
  als jedes Argument, und genau darin liegt die Gefahr, weil es am
  kritischen Denken vorbeigeht.
- Vertiefung/Fachteil: Deep-Dive „Bilder statt Argumente"
  (`src/lib/deep-dives.ts`, Slug `bildmacht`, Untertitel „Warum ein Bild
  schneller wirkt als ein Beweis", Kategorie „Mentale Selbstverteidigung"),
  PDF `content/pdf/vertiefung-bildmacht.pdf`
- Programmbezug/Einordnung: Wissensdatenbank `/mitglieder/wissen/bildmacht`

**Videotitel-Vorschlag:**
„Bildmacht: Warum ein Bild kein Beweis ist"

**Beschreibung (2–3 Sätze inkl. Funnel-Link):**
Ein Bild geht direkt ins Gefühl, am Verstand vorbei — und wirkt wie ein
Beweis, ist aber immer nur ein Ausschnitt. In diesem Video zeige ich dir,
wie Bildausschnitt, Zeitpunkt und Musik eine Wirklichkeit formen, und mit
welcher Frage du lernst, wieder hinter den Rand des Bildes zu schauen. Hol
dir dazu das kostenlose E-Book „Werde Meister deiner Gedanken":
https://werdemeisterdeinergedanken.de/#ebook

**Stichwort-Tags:** Bildmacht, Mentale Selbstverteidigung, Manipulation erkennen, kritisches Denken, Medienkompetenz

**Thumbnail:** Kein stufenspezifisches Motiv für Block C vorhanden. Basis
`docs/marketing/youtube/thumbnails/WMDG-Thumbnail-vorlage-hell.png`
(Creme-Variante, Standard laut Kanal-Vorgabe) — Motiv noch zu produzieren.

---

## ⚡ Short — Do, 12:00

**Reel-Quelle:** Serie „selbstverteidigung" (`src/lib/reels.ts`), Topic
„Bildmacht" — Hook „Ein Bild ist kein Beweis" (Reel-Skript-Hook: „Ein Bild
fühlt sich an wie ein Beweis. Ist aber nur ein Ausschnitt."). Skripttext:
`docs/skripte/reels/mentale-selbstverteidigung.md`, Zeile 127–131. Dasselbe
Reel-Thema (Bildmacht) läuft in dieser Woche parallel auf
Instagram/Facebook — ein Kernthema über alle Kanäle.

**Short-Titel:** „Ein Bild fühlt sich an wie ein Beweis — ist aber nur ein
Ausschnitt"

**Beschreibung:** Der Ausschnitt ist die Botschaft — was außerhalb des
Rands liegt, sieht man nie. Die volle Erklärung im Hauptvideo „Bildmacht:
Warum ein Bild kein Beweis ist" — komplett oben verlinkt. Kostenloses
E-Book: https://werdemeisterdeinergedanken.de/#ebook

**On-Screen-Text (aus Skript):** „Der Ausschnitt ist die Botschaft."

**CTA im Video:** „Ton weg, dann urteilen. Speichern — ganzes Video oben
verlinkt."

**Thumbnail:** Kein stufenspezifisches Motiv für Block C vorhanden. Basis
`docs/marketing/youtube/thumbnails/WMDG-Thumbnail-vorlage-hell.png`
(Creme-Variante, Standard laut Kanal-Vorgabe) — Motiv noch zu produzieren.

---

## Funnel-Pfad

Video/Short → `/#ebook` (Lead-Magnet, Anker in `src/components/sections/LeadMagnet.tsx`)
→ E-Book-Funnel → `/mitglieder` (Programmzugang, Wissensdatenbank `/mitglieder/wissen/bildmacht`).
