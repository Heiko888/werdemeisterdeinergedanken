# YouTube-Redaktionsplan — Woche 4

**Wochenthema:** Block A · Die 7 Stufen — Stufe 4 · Emotionale Reifung
**Frequenz-Stufe:** fokussiert → 1× Hauptvideo (+ 1 Short als Crosspost)

Quelle Wochenthema: `docs/marketing/redaktionsplan/themen-backlog.md`, Block A,
Zeile 37 („Stufe 4 · Emotionale Reifung" · Hook „Wie lang dauert ein Gefühl
wirklich?" · Blog `gefuehle-benennen-beruhigt-das-gehirn` · Deep-Dive
`emotionsregulation` · Praxis `verlaengertes-ausatmen`).

---

## Wochenübersicht

| Tag | Uhrzeit | Format | Titel | Skript-/Quelle | CTA |
|---|---|---|---|---|---|
| Mi | 17:00 | ▶️ Video | Wie lang dauert ein Gefühl wirklich? (Stufe 4: Emotionale Reifung) | Blog `src/lib/blog.ts` → Slug `gefuehle-benennen-beruhigt-das-gehirn` + Deep-Dive `src/lib/deep-dives.ts` → Slug `emotionsregulation` + Lektion `/mitglieder/stufe/4` (PDF `content/pdf/stufe-4-lektion.pdf`) | „Kostenloses E-Book sichern" → `/#ebook` |
| Do | 12:00 | ⚡ Short | Ich hab auf die Uhr geschaut, wie lang ein schweres Gefühl dauert | Reel `stufen` / Topic „Emotionale Reifung" Variante B aus `src/lib/reels.ts`, Skript `docs/skripte/reels/stufen.md` Zeile 225–242 (identisch zu IG/FB-Reel dieser Woche) | „Ganzes Video verlinkt oben ↑ / Playlist ‚Die 7 Stufen'" |

Begründung Zeitpunkt: Hauptvideo Mittwoch 17:00 (Richtwert). Short am
Folgetag (Do 12:00) statt spätnachmittags, weil Shorts als Zubringer über den
Tag verteilt bessere Sichtung bei Pendel-/Pausenzeiten bekommen — inhaltlich
bleibt der direkte Verweis aufs Hauptvideo vom Vortag erhalten.

---

## ▶️ Hauptvideo — Mi, 17:00

**Skript-/Materialbasis:**
- Kernaussage & Struktur: Blog-Artikel „Warum ein Gefühl zu benennen dein
  Gehirn beruhigt" (`src/lib/blog.ts`, Slug
  `gefuehle-benennen-beruhigt-das-gehirn`, Kategorie „Wissenschaft") —
  „Name it to tame it": Schon das Benennen einer Emotion fährt die
  Alarmzentrale im Gehirn herunter.
- Vertiefung/Fachteil: Deep-Dive „Emotionsregulation"
  (`src/lib/deep-dives.ts`, Slug `emotionsregulation`, Untertitel „Gefühle
  steuern, ohne sie zu unterdrücken", Kategorie „Emotion")
- Programmbezug/Einordnung: Lektion `/mitglieder/stufe/4`, PDF
  `content/pdf/stufe-4-lektion.pdf`
- Praxisteil am Ende des Videos: Übung „Verlängertes Ausatmen"
  (`src/lib/practices.ts`, Slug `verlaengertes-ausatmen`, 3–5 Minuten,
  Kategorie „Atemübungen")

**Videotitel-Vorschlag:**
„Wie lang dauert ein Gefühl wirklich? (Stufe 4: Emotionale Reifung)"

**Beschreibung (2–3 Sätze inkl. Funnel-Link):**
Wir weichen unangenehmen Gefühlen aus, weil wir glauben, sie verschlingen
uns — dabei hat jedes Gefühl einen Verlauf: Anstieg, Höhepunkt, Abebben. In
diesem Video zeige ich dir, warum schon das Benennen einer Emotion dein
Gehirn nachweislich beruhigt, und die einfache Atem-Übung, mit der du die
Welle aushältst, statt ihr auszuweichen. Hol dir dazu das kostenlose E-Book
„Werde Meister deiner Gedanken": https://werdemeisterdeinergedanken.de/#ebook

**Stichwort-Tags:** Emotionale Reifung, Gefühle regulieren, Emotionsregulation, Achtsamkeit, Persönlichkeitsentwicklung

**Thumbnail:** `docs/marketing/youtube/thumbnails/WMDG-Thumbnail-stufe-4-hell.png` (Creme-Variante, Standard laut Kanal-Vorgabe; 2560×1440). Stufenspezifisches Motiv für Stufe 4 ist erstellt und einsatzbereit.

---

## ⚡ Short — Do, 12:00

**Reel-Quelle:** Serie „stufen" (`src/lib/reels.ts`), Topic „Emotionale
Reifung", Variante B — „Reite die Welle" (Hook: „Ich hab mal auf die Uhr
geschaut, wie lang ein schweres Gefühl wirklich dauert.").
Skripttext: `docs/skripte/reels/stufen.md`, Zeile 225–242.
Dasselbe Reel-Thema (Stufe 4 · Emotionale Reifung) läuft in dieser Woche
parallel auf Instagram/Facebook — ein Kernthema über alle Kanäle.

**Short-Titel:** „Ich hab auf die Uhr geschaut, wie lang ein schweres Gefühl dauert"

**Beschreibung:** Kürzer, als du denkst. Jedes Gefühl steigt an, hat einen
Höhepunkt — und ebbt ab. Die volle Erklärung im Hauptvideo „Wie lang dauert
ein Gefühl wirklich?" — komplett oben verlinkt. Kostenloses E-Book:
https://werdemeisterdeinergedanken.de/#ebook

**On-Screen-Text (aus Skript):** Ich hab auf die Uhr geschaut · Steigen –
Höhepunkt – Abebben · Am Höhepunkt sitzen bleiben · Die Welle trägt dich

**CTA im Video:** „Mach den kostenlosen Bewusstseinstest — ganzes Video oben
verlinkt."

**Thumbnail:** Basis `docs/marketing/youtube/thumbnails/WMDG-Thumbnail-vorlage-hell.png`
(Creme-Variante, Standard laut Kanal-Vorgabe); Produktion aus der Vorlage
nachholen (siehe Hinweis beim Hauptvideo).

---

## Funnel-Pfad

Video/Short → `/#ebook` (Lead-Magnet, Anker in `src/components/sections/LeadMagnet.tsx`)
→ E-Book-Funnel → `/mitglieder` (Programmzugang, Lektion `/mitglieder/stufe/4`).
