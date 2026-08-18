# Marketing-Renderer & Vorlagen-Galerie

Zuständiger Team-Agent: **visual-dokumentar**.

Drei klar getrennte Familien:

1. **`docs/marketing/*.mjs`** — reine **Bild-Renderer**. Bauen HTML im
   WMDG-Look, schießen mit Playwright/Chromium Screenshots und legen PNGs
   **neben sich** in `docs/marketing/…` (bzw. `video-thumbnails.mjs` nach
   `public/`) ab. Sie lesen/schreiben **nichts** unter `content/vorlagen/`.
   Start jeweils direkt per `node …` (kein npm-Script).
2. **`tools/marketing/*.mjs`** — die **Overlay-Renderer**. Gleiche Technik wie
   Familie 1, aber sie erzeugen **transparente Text-Ebenen** (plus passenden
   Marken-Hintergrund) zum Überlagern eines eigenen Fotos in Canva. Ausgabe
   ebenfalls unter `docs/marketing/…`. Drei davon haben ein npm-Script.
3. **`tools/vorlagen/*.mjs`** — der **Galerie-Bauer** fürs Admin-Dashboard
   `/admin/vorlagen`. Sammelt fertige Dateien aus `docs/**`, wandelt sie in
   webp/ZIP, schreibt nach **`content/vorlagen/`** und erzeugt den Katalog
   `src/lib/vorlagen-assets.ts`. Start: **`npm run vorlagen:galerie`** (einziges
   npm-Script dieser Familie).

Gemeinsame Assets: `tools/pdf/assets/fonts.css` bzw.
`docs/reels/covers/_fonts.css` (Fraunces/Inter), `public/logo-brain.png` bzw.
`public/logo-brain-frei.png`. Chromium brauchen die Renderer der Familien 1 und 2
(`npx playwright install chromium`), **nicht** der Galerie-Build.

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
- **Eingaben:** `THUMBS` und `EBOOK_FORMATS` inline; **`QUOTES` und `FACTS`
  werden aus `./content-data.mjs` importiert** (Zeile 23) — dieselbe Quelle, die
  auch `tools/marketing/content-overlays.mjs` nutzt. Zitate/Fakten also **nur
  dort** pflegen, nicht in diesem Skript.
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

## tools/marketing/story-overlays.mjs

- **Zweck:** Titel-Overlays für die Serie „Persönliche Geschichten". Pro Story
  ein **transparentes Text-Overlay** *und* ein passender Marken-Hintergrund,
  je in 3 Formaten (4:5 / 1:1 / 9:16). Canva-Ebenen: Hintergrund →
  freigestelltes Foto → Overlay.
- **Aufruf:** `npm run story-overlays`
- **Voraussetzungen:** Node, `playwright`, Chromium. Assets:
  `docs/reels/covers/_fonts.css`, `public/logo-brain-frei.png`.
- **Eingaben:** Texte **inline** im `STORIES`-Array. Akzentwort per `<em>…</em>`.
- **Ausgaben:** `docs/marketing/story-overlays/<format>/*.png`
  (Ordner wird zu Beginn geleert).
- **Verbundene Komponenten:** `build-gallery.mjs → buildStoryOverlays()` macht
  daraus die Galerie-Karten unter `content/vorlagen/story/`.

## tools/marketing/content-overlays.mjs

- **Zweck:** Dasselbe Prinzip für die **bestehenden** Serien „Zitate" und
  „Studien-Fakten" — transparente Overlays + Marken-Hintergrund in 3 Formaten.
- **Aufruf:** `npm run content-overlays`
- **Voraussetzungen:** Node, `playwright`, Chromium. Assets:
  `tools/pdf/assets/fonts.css`, `public/logo-brain.png`.
- **Eingaben / Datenzugriff:** `QUOTES` und `FACTS` aus
  **`docs/marketing/content-data.mjs`** — dieselbe Quelle, aus der
  `brand-assets.mjs` die fertigen Kacheln baut. Typografie ist 1:1 identisch,
  Texte werden also nur an einer Stelle gepflegt.
- **Ausgaben:** `docs/marketing/content-overlays/<serie>/<format>/*.png`.
- **Verbundene Komponenten:** `build-gallery.mjs → buildContentOverlays()` →
  `content/vorlagen/content-overlay/`.

## tools/marketing/story-carousels.mjs

- **Zweck:** Die **kompletten** Bild-Geschichten statt nur des Titelbilds:
  Titel als transparentes Overlay **plus** alle Body-/CTA-Slides fertig
  gebrandet, in 4:5 / 1:1 / 9:16.
- **Aufruf:** `node tools/marketing/story-carousels.mjs` (**kein npm-Script**).
- **Voraussetzungen:** wie story-overlays.
- **Eingaben:** `STORIES`-Array **inline**.
- **Ausgaben** je `docs/marketing/story-carousels/<slug>/<format>/`:
  `_hintergrund.png` (Ebene 1 in Canva), `01-overlay.png` (transparentes
  Titel-Overlay, Ebene 3), `02.png … NN.png` (fertige Slides).
- **Verbundene Komponenten:** `build-gallery.mjs → buildStoryCarousels()` →
  `content/vorlagen/story-carousel/`.

> **Abgrenzung:** `story-overlays` liefert nur das Titelbild, `story-carousels`
> die ganze Geschichte. Beide lesen ihr eigenes `STORIES`-Array — bei neuen
> Geschichten **beide** pflegen, sonst laufen sie auseinander.

---

## tools/vorlagen/build-gallery.mjs — Galerie-Vollbau

- **Zweck:** Baut `content/vorlagen/` und den Katalog `src/lib/vorlagen-assets.ts`
  komplett neu aus fertigen Dateien unter `docs/**`.
- **Aufruf:** `npm run vorlagen:galerie`. Empfohlener Vorlauf (Header-Kommentar):
  `npm run covers && npm run covers:png`.
- **Voraussetzungen:**
  - Paket **`sharp`** (Import) — **nicht in `package.json` deklariert**. Es ist
    heute nur deshalb auflösbar, weil `next@16.2.10` es transitiv mitbringt
    (`sharp@0.34.5`). Ein `npm ls sharp` zeigt das. Sobald Next die Abhängigkeit
    fallen lässt oder gegen eine andere Version tauscht, bricht
    `vorlagen:galerie` ohne Vorwarnung → gehört als **direkte** Dependency
    deklariert.
  - System-Binaries **`zip`** und (via `marketing-carousels.mjs`) **`unzip`**.
  - **Kein** Playwright/Chromium (arbeitet nur mit fertigen PNGs).
  - Importiert `./marketing-carousels.mjs`.
- **Eingaben / Datenzugriff:** `docs/marketing/**/*.png` (Social),
  `docs/reels/covers/export/**/reel-9x16/*.png` (Reel-Cover),
  `docs/carousels/export/<serie>/<slug>/<format>/slide-NN.png` (Studio-Carousels,
  Serien `selbstverteidigung|stufen|praxis|vertiefungen`), Marketing-Carousels via
  `buildMarketingCarousels()`, `docs/marketing/{story-overlays,story-carousels,
  content-overlays}/**` (Overlay-Renderer), `docs/reels/covers/export-overlay/**`
  und `docs/carousels/export-overlay/**` (transparente Ebenen aus den
  PNG-Exportern), `docs/workshop/**/*.{pptx,pdf}`; Captions aus
  `docs/skripte/carousels/*.md` und `docs/skripte/reels/stufen.md`.
- **Ablauf:**
  1. `main()` **löscht `content/vorlagen/` komplett** und legt es neu an (destruktiv).
  2. `buildSocial()` → webp-Full (max 2000px) + Thumb (640px).
  3. `buildReels()` → nur `reel-9x16` → webp@1080 + Thumb@420.
  4. `buildCarousels()` → Preview-webp (4:5, 640px) je Slide + Voll-ZIP (alle
     Formate webp@1080).
  5. `buildStoryOverlays()` → `story/` (Persönliche Geschichten, als ZIP).
  6. `buildStoryCarousels()` → `story-carousel/` (komplette Geschichten, ZIP).
  7. `buildContentOverlays()` → `content-overlay/` (Zitate & Fakten, ZIP).
  8. `buildCoverOverlays()` → `cover-overlay/` — Vorschau = fertiges Cover,
     ZIP = transparente Ebenen aus `docs/reels/covers/export-overlay/`.
  9. `buildCarouselOverlays()` → `carousel-overlay/` — analog aus
     `docs/carousels/export-overlay/`.
  10. `buildMarketingCarousels()` → `carousels/marketing__<key>/…` + ZIP.
  11. `buildWorkshop()` → kopiert pptx/pdf.
  12. `attachCaptions()`, `backfillMasse()` (Pixelmaße via `sharp`).
  13. `writeManifest()` → `src/lib/vorlagen-assets.ts`.
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
├── social/            social-NNN.webp         (Full-Downloads)
├── reels/             reel-<bereich>-NN.webp  (Reel-Cover)
├── thumbs/{social,reels}/                     (Vorschau-webp)
├── carousels/
│   ├── <serie>__<slug>/  slide-01.webp … slide-NN.webp   (4:5-Preview)
│   └── <serie>__<slug>.zip                                (Voll-Download)
├── story/             story-NN-<slug>/ + .zip   (Titel-Overlays)
├── story-carousel/    story-carousel-<slug>/ + .zip
├── content-overlay/   <serie>-NN/ + .zip        (Zitate & Fakten)
├── cover-overlay/     <bereich>-NN/ + .zip      (Reel-/Feed-Cover)
├── carousel-overlay/  <serie>__<slug>/ + .zip   (Slides als Ebenen)
└── workshop/          WMDG-*.pptx / WMDG-*.pdf
```

**Stand im Repo:** `social`, `reels`, `thumbs`, `carousels`, `story`,
`story-carousel` und `workshop` sind eingecheckt. Die drei Overlay-Bereiche
`content-overlay`, `cover-overlay` und `carousel-overlay` entstehen erst beim
**nächsten** Galerie-Vollbau — die zugehörigen Generatoren (#77) und der
Overlay-Export (#78) kamen nach dem letzten `vorlagen:galerie`-Lauf dazu.

Trenner im Carousel-Namen: **doppelter Unterstrich** `<serie>__<slug>`. Ein
Carousel-Ordner enthält **ausschließlich `slide-NN.webp`** — **kein `meta.json`**,
keine SVG/PNG. Alle Metadaten (Titel, Slide-Anzahl, Captions, Formate, Maße)
stehen zentral im generierten Katalog `src/lib/vorlagen-assets.ts`.

Ordner je Präfix: `marketing__` 5 · `praxis__` 13 · `selbstverteidigung__` 16 ·
`stufen__` 7 · `vertiefungen__` 13 = **54 Ordner** (+ je ein gleichnamiges ZIP).
