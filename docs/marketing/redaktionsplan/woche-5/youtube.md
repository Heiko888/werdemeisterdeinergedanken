# YouTube-Redaktionsplan — Woche 5

**Wochenthema:** Block A · Die 7 Stufen — Stufe 5 · Schöpferkraft
**Frequenz-Stufe:** fokussiert → 1× Hauptvideo (+ 1 Short als Crosspost)

Quelle Wochenthema: `docs/marketing/redaktionsplan/themen-backlog.md`, Block A,
Zeile 38 („Stufe 5 · Schöpferkraft" · Hook „Was du oft denkst, wird zur
Straße im Kopf" · Blog `neuroplastizitaet-warum-dein-gehirn-formbar-ist` ·
Deep-Dive `neuroplastizitaet` · Praxis `morgen-ausrichtung`).

---

## Wochenübersicht

| Tag | Uhrzeit | Format | Titel | Skript-/Quelle | CTA |
|---|---|---|---|---|---|
| Mi | 17:00 | ▶️ Video | Was du oft denkst, wird zur Straße im Kopf (Stufe 5: Schöpferkraft) | Blog `src/lib/blog.ts` → Slug `neuroplastizitaet-warum-dein-gehirn-formbar-ist` + Deep-Dive `src/lib/deep-dives.ts` → Slug `neuroplastizitaet` + Lektion `/mitglieder/stufe/5` (PDF `content/pdf/stufe-5-lektion.pdf`) | „Kostenloses E-Book sichern" → `/#ebook` |
| Do | 12:00 | ⚡ Short | Vom Beobachter zum Gestalter | Reel `stufen` / Topic „Schöpferkraft" Variante A aus `src/lib/reels.ts`, Skript `docs/skripte/reels/stufen.md` Zeile 267–283 (identisch zu IG/FB-Reel dieser Woche) | „Ganzes Video verlinkt oben ↑ / Playlist ‚Die 7 Stufen'" |

Begründung Zeitpunkt: Hauptvideo Mittwoch 17:00 (Richtwert). Short am
Folgetag (Do 12:00) statt spätnachmittags, weil Shorts als Zubringer über den
Tag verteilt bessere Sichtung bei Pendel-/Pausenzeiten bekommen — inhaltlich
bleibt der direkte Verweis aufs Hauptvideo vom Vortag erhalten.

---

## ▶️ Hauptvideo — Mi, 17:00

**Skript-/Materialbasis:**
- Kernaussage & Struktur: Blog-Artikel „Neuroplastizität: Warum sich dein
  Gehirn ein Leben lang verändert" (`src/lib/blog.ts`, Slug
  `neuroplastizitaet-warum-dein-gehirn-formbar-ist`, Kategorie
  „Wissenschaft") — von Taxifahrern mit größerem Hippocampus bis zur
  Trampelpfad-Straße-Autobahn-Metapher fürs eigene Denken.
- Vertiefung/Fachteil: Deep-Dive „Neuroplastizität"
  (`src/lib/deep-dives.ts`, Slug `neuroplastizitaet`, Untertitel „Warum
  Veränderung möglich ist", Kategorie „Gehirn")
- Programmbezug/Einordnung: Lektion `/mitglieder/stufe/5`, PDF
  `content/pdf/stufe-5-lektion.pdf`
- Praxisteil am Ende des Videos: Übung „Morgen-Ausrichtung"
  (`src/lib/practices.ts`, Slug `morgen-ausrichtung`, 5 Minuten, Kategorie
  „Rituale")

**Videotitel-Vorschlag:**
„Was du oft denkst, wird zur Straße im Kopf (Stufe 5: Schöpferkraft)"

**Beschreibung (2–3 Sätze inkl. Funnel-Link):**
Taxifahrer mit größerem Hippocampus, Jongleure mit mehr grauer Substanz:
Dein Gehirn baut sich um, solange du lebst — nach dem, was du oft denkst und
tust. In diesem Video zeige ich dir, wie aus einem wiederholten Gedanken
buchstäblich eine „Straße" im Kopf wird, und die Morgen-Übung, mit der du ab
heute bewusst entscheidest, welche du anlegst. Hol dir dazu das kostenlose
E-Book „Werde Meister deiner Gedanken":
https://werdemeisterdeinergedanken.de/#ebook

**Stichwort-Tags:** Schöpferkraft, Neuroplastizität, Gedankenkraft, Mindset, Persönlichkeitsentwicklung

**Thumbnail:** Basis `docs/marketing/youtube/thumbnails/WMDG-Thumbnail-vorlage-hell.png`
(Creme-Variante, Standard laut Kanal-Vorgabe). Die nummerierten Motive
`WMDG-Thumbnail-01-hell.png`/`-02-hell.png` sind für Woche 1 belegt; für
Stufe 5 noch aus der Vorlage zu produzieren.

---

## ⚡ Short — Do, 12:00

**Reel-Quelle:** Serie „stufen" (`src/lib/reels.ts`), Topic „Schöpferkraft",
Variante A — „Vom Beobachter zum Gestalter" (Hook: „Was du oft denkst, wird
zur Straße in deinem Kopf. Und das ist wörtlich gemeint.").
Skripttext: `docs/skripte/reels/stufen.md`, Zeile 267–283.
Dasselbe Reel-Thema (Stufe 5 · Schöpferkraft) läuft in dieser Woche parallel
auf Instagram/Facebook — ein Kernthema über alle Kanäle.

**Short-Titel:** „Was du oft denkst, wird zur Straße im Kopf"

**Beschreibung:** Neuroplastizität heißt: Dein Gehirn baut sich nach dem um,
was du oft machst. Die volle Erklärung im Hauptvideo „Was du oft denkst,
wird zur Straße im Kopf" — komplett oben verlinkt. Kostenloses E-Book:
https://werdemeisterdeinergedanken.de/#ebook

**On-Screen-Text (aus Skript):** Neuroplastizität = dein Gehirn baut sich um
· Gedanke → Trampelpfad → Straße · Bisher unbewusst gebaut · Was du
fütterst, wächst

**CTA im Video:** „Folge für die nächste Stufe — ganzes Video oben
verlinkt."

**Thumbnail:** Basis `docs/marketing/youtube/thumbnails/WMDG-Thumbnail-vorlage-hell.png`
(Creme-Variante, Standard laut Kanal-Vorgabe); Produktion aus der Vorlage
nachholen (siehe Hinweis beim Hauptvideo).

---

## Funnel-Pfad

Video/Short → `/#ebook` (Lead-Magnet, Anker in `src/components/sections/LeadMagnet.tsx`)
→ E-Book-Funnel → `/mitglieder` (Programmzugang, Lektion `/mitglieder/stufe/5`).
