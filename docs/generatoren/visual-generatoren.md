# Bild-Generatoren: Carousels & Reels-Cover

Zuständiger Team-Agent: **visual-dokumentar**.

**Gemeinsames Marken-System:** Verlauf `linear-gradient(120deg,#8cc63f→#21b2bd)`
(leaf→teal), Schriften Fraunces (Serif) / Inter (Sans), Handle
`www.werdemeisterdeinergedanken.de`. Geteilte Assets `docs/reels/covers/_fonts.css`
und `docs/reels/covers/logo.png` (das Cover-Studio ist die Quelle; das
Carousel-`build.mjs` kopiert sie herüber). Generierte Ordner `build/` und
`export/` sind git-ignoriert.

**Chromium-Suche** in allen PNG-Exportern (`findChrome`): `CHROME_BIN` →
`require("playwright").chromium.executablePath()` → `PLAYWRIGHT_BROWSERS_PATH`
bzw. `/opt/pw-browsers` → System-`which`. Bewusst Playwright-Viewport-Screenshot
statt Chromium-CLI `--window-size` (letzteres kappt je Build ~87px unten).

---

## Skript-Übersicht

| Skript | Chromium | npm-Script | Ausgabe |
|---|---|---|---|
| `carousels/data.mjs` | nein | – (Modul) | Exporte (Parser) |
| `carousels/build.mjs` | nein | `carousels:slides` | `docs/carousels/build/**` HTML |
| `carousels/export-png.mjs` | **ja** | `carousels:png` | `docs/carousels/export/**/slide-NN.png` |
| `carousels/marketing-serien.mjs` | **ja** | – (`node …`) | `docs/carousels/export/<serie>/**` PNG |
| `carousels/stufen-ueberblick.mjs` | **ja** | – (`node …`) | `docs/carousels/export/stufen-ueberblick/**` PNG |
| `reels/covers/data.mjs` | nein | – (Modul) | Exporte (Motive/Formate) |
| `reels/covers/build.mjs` | nein | `covers` | `docs/reels/covers/**` HTML |
| `reels/covers/export-png.mjs` | **ja** | `covers:png` | `docs/reels/covers/export/**/cover-NN.png` |
| `reels/covers/endcard.mjs` | nein | `endcard` | `docs/reels/covers/endcard/*.html+css` |
| `reels/cover-template.html` | nein | – (statisch) | Design-Referenz |

---

## Carousel-Studio (`docs/carousels/`) — MD-basiert

**`data.mjs`** — Parser/Config-Modul (kein direkter Start; importiert).
Liest die vier Serien-Markdowns aus `docs/skripte/carousels/`
(`selbstverteidigung.md`, `stufen.md`, `praxis.md`, `vertiefungen.md`;
`marketing.md` wird hier **nicht** geladen). `loadCarousels()` zerlegt sie per
Regex (`## slug · Topic — Untertitel`, `**Slide N · Cover/CTA:** …`) in
Carousel-/Slide-Objekte. Exportiert `FORMATS` (3 Formate, alle 1080px breit:
`feed-4x5` 1080×1350, `feed-1x1` 1080×1080, `reel-9x16` 1080×1920). **Single
Source of Truth = die MD-Dateien**; die Serienliste `SERIES` ist hartkodiert.

**`build.mjs`** (`npm run carousels:slides`) — rendert jede Slide als gebrandetes
HTML in 3 Formaten + Vorschau-Galerien. Kein Chromium. Kopiert vorab
`_fonts.css`/`logo.png` aus `../reels/covers/`. Ausgaben unter
`docs/carousels/build/<serie>/<slug>/<format>/slide-NN.html` +
`build/index.html`. Optionales Arg = eigenständige Artifact-Galerie mit
eingebetteten Fonts/Logo. Stolperfalle: das `OV`-Overrides-Objekt referenziert
Slides per `serie/slug/num` — bei geänderter MD-Nummerierung greifen die
Rich-Layouts nicht mehr.

**`export-png.mjs`** (`npm run carousels:png`) — **ruft zuerst automatisch
`build.mjs` auf** (`spawnSync`) und rendert dann die HTMLs pixelgenau als PNG.
Filter: `node … stufen` (Serie), `… stufen autopilot` (Serie+Carousel). Env:
`SCALE` (Default 1), `FORMAT` (einzelnes Format), `CHROME_BIN`,
`PLAYWRIGHT_BROWSERS_PATH`. Ausgaben:
`docs/carousels/export/<serie>/<slug>/<format>/slide-NN.png`. Chromium
zwingend, sonst harter Abbruch.

**`marketing-serien.mjs`** (`node …`, kein npm-Script) — eigenständiger Generator
für 5 Marketing-Carousels (`60000-gedanken`, `4-wege-freiheit`, `wer-denkt-hier`,
`studien-fakten`, `gratis-ebook`); Slide-Daten **inline** (`SERIES`-Array), baut
HTML **und** PNG in einem Durchgang. Kein `data.mjs`/keine MD. Ausgabe
`<OUTBASE>/<serie>/<format>/slide-NN.png` (Default `docs/carousels/export/`).
Kein `SCALE`-Support.

**`stufen-ueberblick.mjs`** (`node …`, kein npm-Script) — eigenständiges
9-Slide-Carousel „Die 7 Stufen deiner Meisterschaft" (Cover + 7 Stufen + CTA),
Inhalte inline (`SLIDES`), direkt als PNG nach
`docs/carousels/export/stufen-ueberblick/<format>/slide-NN.png`.

---

## Cover-Studio (`docs/reels/covers/`) — inline-Daten

**`data.mjs`** — nebenwirkungsfreies Konstanten-Modul: 6 Bereiche
(`selbstverteidigung` 16, `stufen` 7, `praxis` 13, `vertiefungen` 13,
`wissenschaft` 7, `landing` 3) und 5 Formate (`reel-9x16`, `feed-4x5`,
`feed-1x1`, `landscape-16x9` 1920×1080, `pin-2x3` 1000×1500). Alle Motiv-Texte
inline; hier ändern.

**`build.mjs`** (`npm run covers`) — rendert alle Motive × 5 Formate als
gebrandete HTML-Dateien + Iframe-Galerien. Kein Chromium. Ausgaben unter
`docs/reels/covers/<bereich>/<format>/cover-NN.html` (+ `_cover.css`,
`index.html`) und `covers/index.html`. Optionales Arg = Artifact-Galerie.

**`export-png.mjs`** (`npm run covers:png`) — rendert jede `cover-NN.html` als
PNG. **Baut NICHT selbst** — `npm run covers` muss vorher gelaufen sein
(Unterschied zum Carousel-Export). Filter: `node … selbstverteidigung`,
`node … stufen reel-9x16`. Env `SCALE`. Ausgabe
`docs/reels/covers/export/<bereich>/<format>/cover-NN.png`.

**`endcard.mjs`** (`npm run endcard`) — Outro-Karten in 3 Formaten, Inhalte
inline. **Nur HTML/CSS, kein PNG** (PNG müsste manuell per Chromium-Screenshot).
Ausgabe `docs/reels/covers/endcard/endcard-<key>.html` + `_endcard-<key>.css`.

**`cover-template.html`** — statische Design-Referenz eines 9:16-Covers mit
eingebetteten Fonts (base64). Von keinem Skript referenziert; wird bei
Design-Änderungen **nicht** automatisch mit `build.mjs` synchronisiert.

---

## Pipeline-Reihenfolge

**Carousel-Studio (MD):**
1. Text pflegen in `docs/skripte/carousels/{selbstverteidigung,stufen,praxis,vertiefungen}.md`.
2. `npm run carousels:slides` → HTML in `docs/carousels/build/` (Vorschau `build/index.html`).
3. `npm run carousels:png` → **baut automatisch neu** und rendert PNGs nach
   `docs/carousels/export/`.

**Cover-Studio (inline):**
1. Motive pflegen in `docs/reels/covers/data.mjs`.
2. `npm run covers` → Cover-HTMLs/Galerien.
3. `npm run covers:png` → PNGs nach `docs/reels/covers/export/` (**manueller
   Zweischritt** — baut nicht selbst).

**Eigenständige Generatoren** (`marketing-serien.mjs`, `stufen-ueberblick.mjs`)
und **`endcard.mjs`** laufen ohne Zwischenschritt/`data.mjs`; nur Fonts/Logo aus
`docs/reels/covers/` nötig.

---

## Cover-Nummer ↔ Thema: Vertiefungen

Die Reel-Cover werden fortlaufend nummeriert (`reel-vertiefungen-NN.webp`), und
das Admin-Dashboard `/admin/vorlagen` betitelt sie nach **Nummer**
(„Vertiefungen · Cover NN"), **nicht** nach Thema. Die Reihenfolge ergibt sich
aus dem `vertiefungen`-Block in `docs/reels/covers/data.mjs`. Zuordnung:

| Cover | Thema | Motiv-Text | Slug (Carousel/PDF) |
|:---:|---|---|---|
| 01 | Automatische Gedanken | „Die Stimme, die schon **geurteilt** hat" | `automatische-gedanken` |
| 02 | Konditionierung | „Alte Reize feuern **noch**" | `konditionierung` |
| 03 | Kognitive Verzerrungen | „Denkfehler, die sich **wahr** anfühlen" | `kognitive-verzerrungen` |
| 04 | Kernüberzeugungen | „Die Regel unter dem **Gedanken**" | `kernueberzeugungen` |
| 05 | Der innere Kritiker | „Wessen Stimme ist das **wirklich?**" | `der-innere-kritiker` |
| 06 | Neuroplastizität | „Dein Gehirn kann sich **ändern**" | `neuroplastizitaet` |
| 07 | Reiz-Reaktions-Lücke | „Zwischen Reiz und Reaktion: **du**" | `die-reiz-reaktions-luecke` |
| 08 | Grübeln | „Raus aus der **Endlosschleife**" | `gruebeln-und-gedankenkreisen` |
| 09 | Emotionsregulation | „Fühlen, ohne zu **ertrinken**" | `emotionsregulation` |
| 10 | Selbstmitgefühl | „Sei dein eigener **Freund**" | `selbstmitgefuehl` |
| 11 | **Werte & Ziele** | „Die Richtung unter dem **Tun**" | `werte-und-ziele` |
| 12 | Muster & Körper | „Wenn Denken unter die **Haut** geht" | `muster-koerper-und-gesundheit` |
| 13 | Integration & Weitergabe | „Vom Wissen zur gelebten **Haltung**" | `integration-und-weitergabe` |

Dieselbe Reihenfolge gilt für die Galerie-Thumbnails
(`thumbs/reels/reel-vertiefungen-NN.webp`) und – bis auf die abweichende
Slug-Schreibweise – für die Reel-Drehbücher in
`docs/skripte/reels/vertiefungen.md` (dort als „NN · Thema" nummeriert). Bei den
Deep-Dives in `src/lib/deep-dives.ts` weichen einzelne Slugs ab (z. B.
`innerer-kritiker`, `reiz-reaktions-luecke`, `gruebeln`, `muster-und-koerper`).
