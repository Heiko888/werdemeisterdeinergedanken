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
| `WMDG-Video-Folien.pptx` | 16:9 | **Langvideos** – pro Stufe eine Titel-Einblendung + eine Merksatz-Folie; pro Praxis-Übung eine Titelfolie; pro Vertiefung Titel- + Merksatz-Folie. Plus Cover und Abschnitts-Trenner. |
| `WMDG-Video-Folien-Reel.pptx` | 9:16 (Hochformat) | **Teaser-Reel** „Nicht deine Schuld" – Cover/Thumbnail, Hook, drei On-Screen-Overlays, CTA-Folie. |

Stand des letzten Baus: **57 Folien** im 16:9-Deck (7 Stufen · 13 Praxis ·
13 Vertiefungen) und **6 Folien** im Reel-Deck.

## Datenquelle → Folie

Der Generator liest dieselben Markdown-Skripte wie die Drehbücher unter
`docs/skripte/` und zieht die Folientexte direkt aus den `[Regie]`-Einblende-
Cues bzw. den Merksätzen:

| Quelle | Folien |
|---|---|
| `docs/skripte/stufen-komplett/*.md` | H1 `Stufe 0X – Name · „Claim"` → **Titelfolie**; Absatz nach „Für heute nimm diesen … Satz mit:" → **Merksatz-Folie** |
| `docs/skripte/praxis/*.md` | H1 `Praxis – Name (Typ)` + `**Stufe N**`/Länge → **Titelfolie** |
| `docs/skripte/vertiefungen-komplett/*.md` (ohne `mentale-selbstverteidigung-komplett.md`) | H1 `Vertiefung – Titel (komplett)` → **Titelfolie**; „Nimm diesen Gedanken mit: …" → **Merksatz-Folie** |
| `docs/skripte/landing/reel-nicht-deine-schuld.md` | `HOOK`, `ON-SCREEN` (·-getrennt), `CTA`, Cover-Text → **Reel-Folien** |

Ändert sich ein Skript, einfach `npm run video-folien` erneut ausführen – die
Decks werden vollständig neu gebaut (idempotent).

## Branding (identisch zu den Drehbuch-PDFs)

- Grund **`#f6f4ee`**, Karten `#ffffff`, Rahmen `#e7e2d4`
- Tinte `#16231f`, Fließtext `#48524e`, gedämpft `#626b67`
- Gold-Verlauf `#e8c15f → #d9a93a → #7e6410` (Discs, Linien, Button, Trenner)
- Headline-Serife **Fraunces**, Fließtext **Inter**
- Logo: freigestelltes Gold-Gehirn `tools/pdf/assets/brain-freigestellt.png`

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

- Weitere Reels/Serien: einen `parse_*` + Folien-Builder ergänzen und in
  `build_langvideo()`/`build_reel()` einhängen.
- Die 16 Themen „Mentale Selbstverteidigung" sind bewusst **nicht** enthalten
  (eigene Bündeldatei); bei Bedarf analog zu den Vertiefungen ergänzen.
