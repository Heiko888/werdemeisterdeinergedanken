# Marketing-Renderer & Vorlagen-Galerie

Zuständiger Team-Agent: **visual-dokumentar**.

Zwei klar getrennte Familien:

1. **`docs/marketing/*.mjs`** — reine **Bild-Renderer**. Bauen HTML im
   WMDG-Look, schießen mit Playwright/Chromium Screenshots und legen PNGs
   **neben sich** in `docs/marketing/…` (bzw. `video-thumbnails.mjs` nach
   `public/`) ab. Sie lesen/schreiben **nichts** unter `content/vorlagen/`.
   Start jeweils direkt per `node …` (kein npm-Script).
2. **`tools/vorlagen/*.mjs`** — der **Galerie-Bauer** fürs Admin-Dashboard
   `/admin/vorlagen`. Sammelt fertige Dateien aus `docs/**`, wandelt sie in
   webp/ZIP, schreibt nach **`content/vorlagen/`** und erzeugt den Katalog
   `src/lib/vorlagen-assets.ts`. Start: **`npm run vorlagen:galerie`** (einziges
   npm-Script dieser Familie).

Gemeinsame Assets: `tools/pdf/assets/fonts.css` (Fraunces/Inter),
`public/logo-brain.png`. Chromium wird nur von den drei `docs/marketing/*`-
Renderern gebraucht (`npx playwright install chromium`), **nicht** vom Galerie-Build.

---

## docs/marketing/social-banners.mjs

- **Zweck:** Kanal-Banner (YouTube 2560×1440, Facebook 1640×624, Instagram-Story
  1080×1920, Instagram-Story-Logo).
- **Aufruf:** `node docs/marketing/social-banners.mjs`
- **Voraussetzungen:** Node, `playwright`, Chromium (`findChrome()`:
  `CHROME_BIN` → Playwright → `PLAYWRIGHT_BROWSERS_PATH`/`/opt/pw-browsers`).
- **Eingaben:** keine Datenquellen — Inhalte fest im `TARGETS`-Array. Assets:
  `tools/pdf/assets/fonts.css`, `public/logo-brain.png`.
- **Ausgaben** (relativ zu `docs/marketing/`): `youtube/WMDG-YouTube-Banner.png`,
  `facebook/WMDG-Facebook-Cover.png`, `instagram/WMDG-Instagram-Story.png`,
  `instagram/WMDG-Instagram-Story-Logo.png`.
- **Verbundene Komponenten:** speist mittelbar die Galerie (`build-gallery.mjs →
  buildSocial()` liest alle `docs/marketing/**/*.png`).
- **Stolperfalle:** temporäre `.<key>.html` liegen kurz im Quellordner; bei
  Abbruch bleiben sie liegen.

## docs/marketing/brand-assets.mjs

- **Zweck:** Marken-Zusatzvorlagen: Profil/Avatar, Kanalbild, YouTube-Thumbnails
  (3), Zitat-Kacheln (14), Studien-Fakt-Kacheln (14), E-Book-Post, Instagram-Story
  — jeweils in mehreren Formaten.
- **Aufruf:** `node docs/marketing/brand-assets.mjs`; Teilmenge via Env `ONLY`
  (z. B. `ONLY=instagram node …`).
- **Voraussetzungen:** wie social-banners. Zusätzlich `public/ebook-mockup.webp`
  (**Pflicht**, base64-Read) und optional `public/heiko-freigestellt.png`.
- **Eingaben:** alle Texte inline (`THUMBS`, `QUOTES`, `FACTS`, `EBOOK_FORMATS`).
- **Ausgaben:** PNGs unter `docs/marketing/…` (`profil/`, `messenger/`,
  `youtube/thumbnails/`, `zitate/{1x1,4x5,9x16}/`, `zitate/studien-*`, `ebook/`,
  `instagram/`).
- **Stolperfalle:** sehr viele Targets → langer Lauf; `ONLY` zum Eingrenzen.

## docs/marketing/video-thumbnails.mjs

- **Zweck:** Je ein 16:9-Thumbnail (1280×720) pro Inhalt für den
  Mitgliederbereich — Titel **live aus den TS-Datenquellen** (bleiben synchron).
- **Aufruf:** `node docs/marketing/video-thumbnails.mjs`
- **Voraussetzungen:** Node, `playwright`, Chromium. Chromium-Suche hier nur über
  `PLAYWRIGHT_BROWSERS_PATH`/`/opt/pw-browsers` (kein `CHROME_BIN`-Zweig).
- **Eingaben / Datenzugriff:** per Regex aus `src/lib/content.ts` (7 Stufen),
  `src/lib/deep-dives.ts` (Vertiefungen), `src/lib/practices.ts` (Praxis). Assets:
  `fonts.css`, `logo-brain.png`.
- **Ausgaben:** `public/video-thumbnails/{stufen,vertiefungen,praxis}/<slug>.png`
  (bewusst nach **`public/`** — direkt als Video-Poster ausspielbar).
- **Stolperfalle:** Regex ist an feste Feldreihenfolge der TS-Dateien gekoppelt —
  Formatänderungen dort brechen die Extraktion. Wird **nicht** von der Galerie
  eingesammelt (liegt in `public/`).

---

## tools/vorlagen/build-gallery.mjs — Galerie-Vollbau

- **Zweck:** Baut `content/vorlagen/` und den Katalog `src/lib/vorlagen-assets.ts`
  komplett neu aus fertigen Dateien unter `docs/**`.
- **Aufruf:** `npm run vorlagen:galerie`. Empfohlener Vorlauf (Header-Kommentar):
  `npm run covers && npm run covers:png`.
- **Voraussetzungen:**
  - Paket **`sharp`** (Import) — **derzeit NICHT in `package.json`/`node_modules`**,
    muss separat installiert werden.
  - System-Binaries **`zip`** und (via `marketing-carousels.mjs`) **`unzip`**.
  - **Kein** Playwright/Chromium (arbeitet nur mit fertigen PNGs).
  - Importiert `./marketing-carousels.mjs`.
- **Eingaben / Datenzugriff:** `docs/marketing/**/*.png` (Social),
  `docs/reels/covers/export/**/reel-9x16/*.png` (Reel-Cover),
  `docs/carousels/export/<serie>/<slug>/<format>/slide-NN.png` (Studio-Carousels,
  Serien `selbstverteidigung|stufen|praxis|vertiefungen`), Marketing-Carousels via
  `buildMarketingCarousels()`, `docs/workshop/**/*.{pptx,pdf}`; Captions aus
  `docs/skripte/carousels/*.md` und `docs/skripte/reels/stufen.md`.
- **Ablauf:**
  1. `main()` **löscht `content/vorlagen/` komplett** und legt es neu an (destruktiv).
  2. `buildSocial()` → webp-Full (max 2000px) + Thumb (640px).
  3. `buildReels()` → nur `reel-9x16` → webp@1080 + Thumb@420.
  4. `buildCarousels()` → Preview-webp (4:5, 640px) je Slide + Voll-ZIP (alle
     Formate webp@1080).
  5. `buildMarketingCarousels()` → `carousels/marketing__<key>/…` + ZIP.
  6. `buildWorkshop()` → kopiert pptx/pdf.
  7. `attachCaptions()`, `backfillMasse()` (Pixelmaße via `sharp`).
  8. `writeManifest()` → `src/lib/vorlagen-assets.ts`.
- **Ausgaben:** Baum `content/vorlagen/{social,reels,thumbs/{social,reels},
  carousels/<id>,workshop}` mit `*.webp/*.zip/*.pptx/*.pdf` + Katalog
  `src/lib/vorlagen-assets.ts`. Download-/Thumb-Links zeigen auf die
  Admin-Route `/admin/vorlagen/datei/…`.
- **Reproduzierbarkeit:**
  - `sharp` installieren; `zip`/`unzip` im PATH.
  - Quellordner müssen vorbefüllt sein: **`docs/carousels/export/` existiert
    aktuell nicht** → ohne vorherigen Export tragen die Carousel-/Reel-Schritte
    **still 0 Einträge** ein (`existsSync`-Guards, kein Fehler).
  - **Destruktiv** — für additives Ergänzen der Marketing-Carousels stattdessen
    den Standalone-Modus von `marketing-carousels.mjs` nutzen.
  - Ziel bewusst `content/` statt `public/` (Admin-Schutz der Workbooks/Pläne).

## tools/vorlagen/marketing-carousels.mjs

- **Zweck:** Verarbeitet die Marketing-/Funnel-Carousels (flachere
  Exportstruktur) und liefert Caption-/Maß-/Format-Helfer sowie den
  Katalog-Renderer (`renderManifest`, Typ `VorlagenAsset`).
- **Aufruf:** zwei Modi:
  1. **Importiert** von `build-gallery.mjs` (Teil des Vollbaus).
  2. **Standalone:** `node tools/vorlagen/marketing-carousels.mjs` —
     **non-destruktiv & idempotent**: liest den bestehenden Katalog, entfernt
     `marketing__*`-Einträge und baut nur diese neu.
- **Voraussetzungen:** Node; `sharp`; `zip`/`unzip`. Standalone setzt ein
  existierendes `src/lib/vorlagen-assets.ts` voraus.
- **Eingaben:** `docs/carousels/export/<key>/<format>/slide-NN.png` für Keys aus
  `MARKETING_TITEL` (`60000-gedanken`, `4-wege-freiheit`, `wer-denkt-hier`,
  `studien-fakten`, `gratis-ebook`); Captions aus `docs/skripte/carousels/*.md`
  und `docs/skripte/reels/stufen.md`.
- **Ausgaben:** `content/vorlagen/carousels/marketing__<key>/slide-NN.webp` + ZIP;
  aktualisierter Katalog.
- **Stolperfalle:** Der Katalog-Parser ist an das exakte Format
  `vorlagenAssets: VorlagenAsset[] = [ … ];` gebunden — manuelle Umformatierung
  bricht ihn.

---

## Verhältnis `tools/vorlagen/*` ↔ `content/vorlagen/*`

- **`tools/vorlagen/*` ERZEUGT `content/vorlagen/*` vollständig** — keine
  Handpflege. `build-gallery.mjs` löscht das Ziel zu Beginn und baut neu.
- **Datenrichtung:** Quellen liegen in `docs/**` (Renderer-PNGs, Cover-/Carousel-
  Exporte, Workshop-Dateien), Skripte/Captions in `docs/skripte/**`.
  `tools/vorlagen/*` liest `docs/**` und schreibt nach `content/vorlagen/**` +
  Katalog `src/lib/vorlagen-assets.ts`.
- **Zurückgelesen** wird `content/vorlagen/` nur begrenzt: `backfillMasse`
  (Pixelmaße), `backfillFormate` (committete ZIPs), im Standalone der Katalog.
- **Auslieferung:** `content/vorlagen/` wird von Next.js **nicht** direkt
  ausgeliefert (anders als `public/`); Zugriff nur über `/admin/vorlagen/datei/…`.

### Struktur & Namensschema von `content/vorlagen/`

```
content/vorlagen/
├── social/           social-NNN.webp        (Full-Downloads)
├── reels/            reel-<bereich>-NN.webp  (Reel-Cover)
├── thumbs/{social,reels}/                    (Vorschau-webp)
├── carousels/
│   ├── <serie>__<slug>/  slide-01.webp … slide-NN.webp   (4:5-Preview)
│   └── <serie>__<slug>.zip                                (Voll-Download)
└── workshop/         WMDG-*.pptx / WMDG-*.pdf
```

Trenner im Carousel-Namen: **doppelter Unterstrich** `<serie>__<slug>`. Ein
Carousel-Ordner enthält **ausschließlich `slide-NN.webp`** — **kein `meta.json`**,
keine SVG/PNG. Alle Metadaten (Titel, Slide-Anzahl, Captions, Formate, Maße)
stehen zentral im generierten Katalog `src/lib/vorlagen-assets.ts`.

Ordner je Präfix: `marketing__` 5 · `praxis__` 13 · `selbstverteidigung__` 16 ·
`stufen__` 7 · `vertiefungen__` 13 = **54 Ordner** (+ je ein gleichnamiges ZIP).
