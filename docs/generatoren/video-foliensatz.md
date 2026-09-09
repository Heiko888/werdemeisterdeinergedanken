# Video-Foliensatz-Generator (`tools/video/foliensatz.py`)

Erzeugt die **On-Screen-Folien**, die in den einzelnen Videos eingeblendet
werden – als editierbare PowerPoint im **hellen Creme-Branding** der
Video-Drehbücher (nicht im dunklen Navy-Workshop-Design).

```bash
npm run video-folien          # = python3 tools/video/foliensatz.py
```

## Ausgabe (`docs/video/`)

| Datei | Format | Inhalt |
|---|---|---|
| `WMDG-Video-Folien.pptx` | 16:9 | **Langvideos** – pro Stufe eine Titel-Einblendung + eine Merksatz-Folie; pro Praxis-Übung eine Titelfolie; pro Vertiefung Titel- + Merksatz-Folie; die 16 Themen „Mentale Selbstverteidigung" Titel- + Merksatz-Folie. Plus Cover und Abschnitts-Trenner. |
| `WMDG-Video-Folien-Reel.pptx` | 9:16 (Hochformat) | **Teaser-Reel** „Nicht deine Schuld" – Cover/Thumbnail, Hook, drei On-Screen-Overlays, CTA-Folie. |
| `WMDG-Video-Folien-Reels-7-Stufen.pptx` | 9:16 | **Reel-Serie „Die 7 Stufen"** – 7 Stufen × 3 Varianten; je Reel Trennfolie + Hook-, On-Screen- und CTA-Folien. |
| `WMDG-Video-Folien-Reels-Vertiefungen.pptx` | 9:16 | **Reel-Serie „Vertiefungen"** (Varianten A/B). |
| `WMDG-Video-Folien-Reels-Praxis.pptx` | 9:16 | **Reel-Serie „Praxis-Übungen"** (Varianten A/B). |
| `WMDG-Video-Folien-Reels-Wissenschaft.pptx` | 9:16 | **Reel-Serie „Die Wissenschaft dahinter"** (je 1 Reel/Thema). |
| `WMDG-Video-Folien-Reels-Selbstverteidigung.pptx` | 9:16 | **Reel-Serie „Wie dein Denken gelenkt wird"** (16 Themen). |

Stand des letzten Baus: **90 Folien** im 16:9-Deck (7 Stufen · 13 Praxis ·
13 Vertiefungen · 16 Selbstverteidigung), **6 Folien** im Teaser-Reel-Deck und
die fünf Reel-Serien-Decks mit **136 / 161 / 185 / 50 / 76 Folien**
(21 / 26 / 26 / 7 / 16 Reels).

## Datenquelle → Folie

Der Generator liest dieselben Markdown-Skripte wie die Drehbücher unter
`docs/skripte/` und zieht die Folientexte direkt aus den `[Regie]`-Einblende-
Cues bzw. den Merksätzen:

| Quelle | Folien |
|---|---|
| `docs/skripte/stufen-komplett/*.md` | H1 `Stufe 0X – Name · „Claim"` → **Titelfolie**; Absatz nach „Für heute nimm diesen … Satz mit:" → **Merksatz-Folie** |
| `docs/skripte/praxis/*.md` | H1 `Praxis – Name (Typ)` + `**Stufe N**`/Länge → **Titelfolie** |
| `docs/skripte/vertiefungen-komplett/*.md` (ohne `mentale-selbstverteidigung-komplett.md`) | H1 `Vertiefung – Titel (komplett)` → **Titelfolie**; „Nimm diesen Gedanken mit: …" → **Merksatz-Folie** |
| `docs/skripte/vertiefungen-komplett/mentale-selbstverteidigung-komplett.md` | je `## N · Titel` → **Titelfolie**; letzter Absatz (Schutz/Gegenmittel/Test) → **Merksatz-Folie** |
| `docs/skripte/landing/reel-nicht-deine-schuld.md` | `HOOK`, `ON-SCREEN` (·-getrennt), `CTA`, Cover-Text → **Teaser-Reel-Folien** |
| `docs/skripte/reels/{stufen,vertiefungen,praxis,wissenschaft,mentale-selbstverteidigung}.md` | je `## N · Name [— Claim]`, optional `### Variante A/B/C`, mit `HOOK`/`ON-SCREEN`/`CTA` → **je ein eigenes 9:16-Reel-Deck**. Nicht-nummerierte Abschnitte (z. B. „Thumbnail-Texte") werden übersprungen. |

Ändert sich ein Skript, einfach `npm run video-folien` erneut ausführen – die
Decks werden vollständig neu gebaut (idempotent).

## Branding (identisch zu den Drehbuch-PDFs)

- Grund **`#f6f4ee`**, Karten `#ffffff`, Rahmen `#e7e2d4`
- Tinte `#16231f`, Fließtext `#48524e`, gedämpft `#626b67`
- Gold-Verlauf `#e8c15f → #d9a93a → #7e6410` (Discs, Linien, Button, Trenner)
- Headline-Serife **Fraunces**, Fließtext **Inter**
- Logo: goldenes Gehirn-Emblem `public/logo-brain-gold.png` (transparent,
  identisch zum Drehbuch-Cover)

> **Schriften:** Die Folien setzen die Font-Namen `Fraunces`/`Inter`. Für
> 1:1-Rendering sollten diese (kostenlosen) Google-Fonts installiert sein –
> sie werden ohnehin auf der Website genutzt. Fehlen sie, ersetzt PowerPoint
> sie durch die nächstbeste Schrift; Farben, Layout und Texte bleiben korrekt.
> `python-pptx` bettet Schriften nicht ein.

Jede Folie trägt zusätzlich eine **Notiz** (Sprecher-/Regie-Kontext), z. B.
„Titel-Einblendung. Stufe 01 – Autopilot. Ziellänge: 6–8 Min."

## Voraussetzungen

- **Python 3** mit `python-pptx` und `Pillow` (wie `tools/workshop/build.py`).
- Kein Chromium/Node nötig – reine PPTX-Erzeugung.

## Erweitern

- Weitere Reel-Serien: einen Eintrag in der Liste `REEL_SERIES` ergänzen
  (`src`, `outfile`, `cover_title`, `kicker_label`, `subtitle`). Der generische
  `parse_reels` + `build_reel_series` deckt Themen mit und ohne Varianten ab.
- Neue Folientypen im Langvideo-Deck: `parse_*` + Builder ergänzen und in
  `build_langvideo()` einhängen.
