# Marketing-Renderer & Vorlagen-Galerie

Zuständiger Team-Agent: **visual-dokumentar**.

Drei klar getrennte Familien:

1. **`docs/marketing/*.mjs`** — reine **Bild-Renderer**. Bauen HTML im
   WMDG-Look, schießen mit Playwright/Chromium Screenshots und legen PNGs
   **neben sich** in `docs/marketing/…` (bzw. `video-thumbnails.mjs` nach
   `public/`) ab. Sie lesen/schreiben **nichts** unter `content/vorlagen/`.
   Meist direkt per `node …` gestartet; `whatsapp-safezone.mjs` hat inzwischen
   ein npm-Script (`npm run whatsapp:safezone`). `profile-avatar.mjs` ist in
   README/Agenten-Revier gelistet, **existiert aber nicht im Repo** — siehe
   eigener Abschnitt unten.
2. **`tools/marketing/*.mjs`** — die **Overlay-Renderer**. Gleiche Technik wie
   Familie 1, aber sie erzeugen **transparente Text-Ebenen** (plus passenden
   Marken-Hintergrund) zum Überlagern eines eigenen Fotos in Canva. Ausgabe
   ebenfalls unter `docs/marketing/…`. Vier davon haben ein npm-Script
   (`story-overlays`, `content-overlays`, `story-carousels`,
   `whatsapp:mitgliedschaft`) — `whatsapp-mitgliedschaft.mjs` liefert dabei
   zusätzlich zu den Overlays auch fertige, marken-hinterlegte Folien (siehe
   eigener Abschnitt unten).
3. **`tools/vorlagen/*.mjs`** — der **Galerie-Bauer** fürs Admin-Dashboard
   `/admin/vorlagen`. Sammelt fertige Dateien aus `docs/**`, wandelt sie in
   webp/ZIP, schreibt nach **`content/vorlagen/`** und erzeugt den Katalog
   `src/lib/vorlagen-assets.ts`. Start: **`npm run vorlagen:galerie`** (einziges
   npm-Script dieser Familie). `bild-jobs.mjs` ist kein eigener Generator,
   sondern ein gemeinsames Hilfsmodul für die beiden anderen Skripte dieser
   Familie.

Außerhalb dieser drei Familien und außerhalb der Galerie-Integration steht die
**Instagram-Weisheiten-Serie** unter `tools/social/weisheiten/` (eigener
Abschnitt weiter unten) — eigenes Verzeichnis, eigenes Build-Skript
(`render.sh`), kein npm-Script, keine Anbindung an `build-gallery.mjs`.

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
  `facebook/WMDG-Facebook-Cover.png` (zusätzlich `@2x` in 3280×1248 für hohe
  Qualität, dank `retina`-Flag), `instagram/WMDG-Instagram-Story.png`,
  `instagram/WMDG-Instagram-Story-Logo.png`. Banner mit `retina: true`
  (LinkedIn, WhatsApp, Facebook) werden zusätzlich in doppelter Auflösung
  (`…@2x.png`) ausgegeben. Einheitliche Marken-Optik über alle Kanäle über
  zwei geteilte Konstanten: `GLOW` (Größe/Weichheit des Gehirn-Halos via
  `glowScale`/`glowBlur`) und `CREME_GOLD` (kräftigeres Gold + stärkerer
  Glow der hellen Creme-Variante via `palHell`). Kanäle ohne Gehirn
  (WhatsApp) übernehmen nur das kräftigere Creme-Gold.
- **Verbundene Komponenten:** speist mittelbar die Galerie (`build-gallery.mjs →
  buildSocial()` liest alle `docs/marketing/**/*.png`).
- **Stolperfalle:** temporäre `.<key>.html` liegen kurz im Quellordner; bei
  Abbruch bleiben sie liegen.

## docs/marketing/brand-assets.mjs

- **Zweck:** Marken-Zusatzvorlagen: Profil/Avatar, Kanalbild, YouTube-Thumbnails
  (3), Zitat-Kacheln (14), Studien-Fakt-Kacheln (14), E-Book-Post, Instagram-Story
  — jeweils in mehreren Formaten.
- **Aufruf:** `SCALE=2 node docs/marketing/brand-assets.mjs`; Teilmenge via Env
  `ONLY` (z. B. `SCALE=2 ONLY=instagram node …`). **`SCALE=2` ist Pflicht** –
  siehe Stolperfalle unten.
- **Voraussetzungen:** wie social-banners. Zusätzlich `public/ebook-mockup.webp`
  (**Pflicht**, base64-Read) und optional `public/heiko-freigestellt.png`.
- **Eingaben:** `THUMBS` und `EBOOK_FORMATS` inline; **`QUOTES` und `FACTS`
  werden aus `./content-data.mjs` importiert** (Zeile 23) — dieselbe Quelle, die
  auch `tools/marketing/content-overlays.mjs` nutzt. Zitate/Fakten also **nur
  dort** pflegen, nicht in diesem Skript.
- **Ausgaben:** PNGs unter `docs/marketing/…` (`profil/`, `messenger/`,
  `youtube/thumbnails/`, `zitate/{1x1,4x5,9x16}/`, `zitate/studien-*`, `ebook/`,
  `instagram/`).
- **Stolperfallen:**
  - Sehr viele Targets → langer Lauf; `ONLY` zum Eingrenzen.
  - **`SCALE` hat den Default 1, die eingecheckten Assets sind aber 2×.** Ohne
    `SCALE=2` werden sie beim Neubauen stillschweigend halbiert (2160×2700 →
    1080×1350) – ohne Warnung, nur kleinere Dateien. Der Schalter wirkt über
    `deviceScaleFactor` und passt zu `FULL_WIDTH=2160` im Galerie-Build.
  - Der Pfeil im CTA kommt aus **`docs/_glyphs.mjs`** (`ARROW`), nicht als
    Textzeichen – `U+2192` fehlt im eingebetteten Schrift-Subset.

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

## docs/marketing/profile-avatar.mjs — ⚠ zu klären: Skript fehlt im Repo

- **Befund:** Die Datei `docs/marketing/profile-avatar.mjs` existiert **nicht**
  im Arbeitsbaum (`find`/`ls` liefern nichts) und hat **auch in der
  Git-Historie nie existiert** (`git log --all -- docs/marketing/profile-avatar.mjs`
  liefert keinen Treffer). Dennoch wird sie an zwei Stellen als vorhanden
  referenziert:
  - `docs/generatoren/README.md` (Tabelle „Alle Generatoren auf einen Blick":
    `Profil-Avatar | node docs/marketing/profile-avatar.mjs | Inline |
    docs/marketing/profil/*.png`) und in der Liste „Ohne npm-Script".
  - `.claude/agents/visual-dokumentar.md` (Zeile 13, Revier-Aufzählung
    `docs/marketing/{social-banners,brand-assets,video-thumbnails,
    profile-avatar}.mjs`).
- **Was es stattdessen gibt:** Der Zielordner `docs/marketing/profil/` **ist**
  befüllt (siehe `docs/AENDERUNGEN.md`, Eintrag „2026-09-05 – Geänderte
  Profil-Vorlagen in die Vorlagen-Galerie eingepflegt") und wird auch von
  `build-gallery.mjs → buildSocial()` eingesammelt (liest alle
  `docs/marketing/**/*.png`, siehe Abschnitt weiter unten). Die dort liegenden
  PNGs sind also vorhanden, aber es ist **unklar, mit welchem Skript sie
  erzeugt wurden** — möglicherweise Handarbeit, ein gelöschtes Skript oder ein
  Teil von `brand-assets.mjs` (dessen `THUMBS`/Profil-Targets dieselbe Optik
  wie andere `docs/marketing/*.mjs`-Renderer haben).
- **Reproduzierbarkeit:** Aktuell **nicht reproduzierbar** — ohne Quellskript
  lässt sich `docs/marketing/profil/*.png` nicht aus Repo-Daten neu erzeugen.
  ⚠ zu klären: Wurde das Skript versehentlich nie committet, umbenannt (z. B.
  in `brand-assets.mjs` aufgegangen) oder war es nie mehr als ein geplanter
  Programmpunkt? Bis das geklärt ist, sollten README/Agent-Revier diesen
  Eintrag entweder korrigieren oder explizit als fehlend kennzeichnen.

## docs/marketing/whatsapp-safezone.mjs

- **Zweck:** Reine **Planungsvorlage** (kein fertiges Marken-Asset): zeigt für
  das WhatsApp-Business-Banner (Arbeitsfläche 1920×1080) die Safe-Zone, die
  Rand-Bereiche, die je nach Display abgeschnitten werden können, sowie die
  Position des mittigen Profilbild-Overlays, damit dort nichts Wichtiges
  platziert wird.
- **Aufruf:** `npm run whatsapp:safezone` (`node
  docs/marketing/whatsapp-safezone.mjs`).
- **Voraussetzungen:** Node, `playwright`, Chromium. `findChrome()`:
  `CHROME_BIN` → Playwright → `PLAYWRIGHT_BROWSERS_PATH`/`/opt/pw-browsers`.
  Assets: `tools/pdf/assets/fonts.css`.
- **Eingaben:** keine Datenquelle — alle Maße (`CROP`, `SAFE_X/Y/W/H`,
  `PB_CX/CY/R`, `TEXT_X/Y/W/H`) und der Beispieltext („Mentale
  Selbstverteidigung" / „Werde Meister deiner Gedanken") sind fest im Skript
  berechnet bzw. inline.
- **Ablauf:** baut ein einzelnes HTML (Crop-Bänder, Safe-Zone-Rahmen,
  Textspalten-Rahmen, Profilbild-Kreis, Mittelachsen) in eine temporäre Datei
  `.safezone.html` neben dem Skript, rendert sie mit Chromium
  (`deviceScaleFactor: 1`) und löscht die temporäre Datei danach.
- **Ausgaben:** `docs/marketing/whatsapp/WMDG-WhatsApp-SafeZone-Vorlage.png`
  (1920×1080).
- **Verbundene Komponenten:** dient als Referenz beim manuellen Gestalten
  eines echten WhatsApp-Business-Banners (z. B. mit `whatsapp-mitgliedschaft`-
  Motiven oder in Canva) — erzeugt selbst kein ausspielbares Banner. Nicht Teil
  des Galerie-Einsammelns im engeren Sinn (liegt aber unter
  `docs/marketing/**/*.png` und würde von `buildSocial()` technisch
  mit-eingesammelt, wenn `vorlagen:galerie` läuft — ⚠ zu klären, ob das so
  gewollt ist, da es sich um eine interne Planungsgrafik und kein
  Kunden-Asset handelt).

---

## docs/_glyphs.mjs — gezeichnete Sonderzeichen

- **Zweck:** Stellt Zeichen bereit, die die eingebetteten Schriften nicht
  abdecken – `ARROW` (→), `NEQ` (≠) und `DOTS` (⋯), alle als Inline-SVG.
- **Warum:** Der `unicode-range` des Latin-Subsets in
  `tools/pdf/assets/fonts.css` und `docs/reels/covers/_fonts.css` enthält
  `U+2191` (↑) und `U+2193` (↓), aber **weder `U+2192` (→), `U+2260` (≠) noch
  `U+22EF` (⋯)**. Für ein nicht abgedecktes Zeichen greift Chromium auf eine
  Schrift des Betriebssystems zurück. Folge: dieselbe Codebasis erzeugt auf
  verschiedenen Rechnern minimal verschiedene PNGs/PDFs (andere Grundlinie,
  andere Strichstärke), und die abweichende Glyphen-Metrik verschiebt
  zusätzlich die Zeile darunter.
- **Eigenschaften:** Jedes SVG bringt seine Maße selbst mit (`1em`, folgt also
  der Schriftgröße) und erbt die Farbe über `currentColor`. Es braucht in
  keinem Generator-Stylesheet eine eigene Regel. `NEQ` ist auf die fetten
  Cover-Headlines (Fraunces 600) ausgelegt – kräftige Balken mit flachen Enden.
- **Genutzt von:** `ARROW` in `docs/marketing/brand-assets.mjs`,
  `docs/carousels/build.mjs`, `docs/carousels/marketing-serien.mjs`,
  `docs/carousels/stufen-ueberblick.mjs`, `tools/marketing/story-overlays.mjs`,
  `tools/marketing/story-carousels.mjs`; `NEQ` in `docs/reels/covers/data.mjs`;
  `ARROW` + `DOTS` in `tools/pdf/anleitung-stripe.mjs` (Stripe-PDF).
- **Regel:** Neue Sonderzeichen in gerendertem Markup vorher gegen den
  `unicode-range` prüfen – oder hier ergänzen. In Kommentaren, `console.log`
  und den HTML-Galerieseiten sind „→"/„≠"/„⋯" unproblematisch, die werden nicht
  zu PNG/PDF gerendert.

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

## tools/marketing/whatsapp-mitgliedschaft.mjs

- **Zweck:** Siebenteilige WhatsApp-Verkaufsserie für die Mitgliedschaft
  (Hook → Problem → 7-Stufen-Weg → Inhalte → So funktioniert's → Preis → CTA),
  in vier Farbwelten (`dunkel`/`hell`/`tuerkis`/`tuerkis-hell`) und vier
  Formaten (4:5, 9:16, 1:1, 16:9). Liegt technisch in der Overlay-Familie
  (`tools/marketing/*.mjs`), erzeugt aber **zusätzlich zu** den transparenten
  Canva-Overlays auch die fertigen, marken-hinterlegten Folien in einem Lauf —
  anders als `story-overlays`/`content-overlays`, die nur Overlays liefern.
- **Aufruf:** `npm run whatsapp:mitgliedschaft` (`node
  tools/marketing/whatsapp-mitgliedschaft.mjs`). Einzelne Farbwelt über Env:
  `THEME=tuerkis node tools/marketing/whatsapp-mitgliedschaft.mjs` (löscht dann
  den Zielordner **nicht** vorher, anders als der Voll-Lauf).
- **Voraussetzungen:** Node, `playwright`, Chromium (`findChrome()`:
  `CHROME_BIN` → Playwright → `PLAYWRIGHT_BROWSERS_PATH`/`/opt/pw-browsers`).
  Assets: `docs/reels/covers/_fonts.css`, `public/logo-brain-gold.png`
  (Themes `dunkel`/`hell`), `public/logo-brain-tuerkis.png` (Themes
  `tuerkis`/`tuerkis-hell`).
- **Eingaben:** Texte/Struktur **inline** im `SLIDES`-Array (Rollen `cover`,
  `statement`, `list`, `features`, `steps`, `price`, `cta`); Akzentwort per
  `<em>…</em>`. Stile/Farbverläufe je Theme in `cssFor()`.
- **Ablauf:** Für jedes Format (`FORMATS`) zuerst je Farbwelt einen reinen
  Marken-Hintergrund rendern (`overlay/_hintergrund<suffix>.png`, Ebene 1 in
  Canva), danach für jede der 7 Folien × jede Farbwelt zwei Screenshots:
  (1) die fertige Folie mit Hintergrund nach `<format>/NN<suffix>.png`, (2)
  dieselbe Folie transparent (`omitBackground: true`) nach
  `<format>/overlay/NN<suffix>.png`. Ohne gesetztes `THEME` wird der
  Zielordner zu Beginn komplett geleert (`rmSync`, destruktiv).
- **Ausgaben:** `docs/marketing/whatsapp-mitgliedschaft/{4x5,9x16,1x1,16x9}/`
  mit `01.png … 07.png` (+ Theme-Suffix `-hell`/`-tuerkis`/`-tuerkis-hell` für
  alle Themes außer `dunkel`) sowie je Unterordner `overlay/` mit denselben
  Namen (transparent) plus `_hintergrund<suffix>.png`.
- **Verbundene Komponenten:** Wird von `build-gallery.mjs` **nicht**
  automatisch eingesammelt — weder `buildSocial()` (liest nur
  `docs/marketing/**/*.png`, würde die fertigen Folien technisch mit
  erfassen) noch ein eigener `buildWhatsapp…()`-Schritt existiert in
  `tools/vorlagen/build-gallery.mjs` (kein Treffer für „whatsapp" dort). ⚠ zu
  klären: Die fertigen Folien unter `<format>/*.png` **würden** von
  `buildSocial()` eingesammelt (liegen unter `docs/marketing/**`), die
  `overlay/`-Unterordner dagegen nicht (kein `buildCoverOverlays`-Äquivalent
  für diese Serie) — ob das beabsichtigt ist, ist unklar.
- **Stolperfalle:** `npm run marketing:all` ruft dieses Skript mit auf
  (`brand-assets && content-overlays && story-overlays && story-carousels &&
  whatsapp:mitgliedschaft && vorlagen:galerie`), aber `whatsapp:safezone` ist
  **nicht** Teil dieser Kette.

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
  - Paket **`sharp`** (Import) — als **direkte Dependency** in `package.json`
    (`^0.34.5`), mit `next` dedupliziert. Historie: früher nur transitiv über
    `next` verfügbar und dort **optional** — `npm ci --omit=optional` hätte den
    Galerie-Build brechen lassen.
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
  - `npm ci` (bringt `sharp` mit); `zip`/`unzip` im PATH.
  - Quellordner müssen vorbefüllt sein: **`docs/carousels/export/` existiert
    aktuell nicht** → ohne vorherigen Export tragen die Carousel-/Reel-Schritte
    **still 0 Einträge** ein (`existsSync`-Guards, kein Fehler).
  - **Destruktiv** — für additives Ergänzen der Marketing-Carousels stattdessen
    den Standalone-Modus von `marketing-carousels.mjs` nutzen.
  - Ziel bewusst `content/` statt `public/` (Admin-Schutz der Workbooks/Pläne).

### Server-Deploy: `tools/deploy/update-vorlagen-galerie.sh`

Auf dem Server liegen die Galerie-Dateien im Volume `/opt/website-vorlagen`
(gemountet nach `/app/content/vorlagen`). Da der Vollbau **destruktiv** ist und
die Reels-/Carousel-Quellen dort fehlen können (gitignored, per Chromium
gerendert), NICHT einfach `npm run vorlagen:galerie` auf dem Server laufen
lassen – das würde Reels/Carousels aus der Galerie werfen. Stattdessen:

```bash
sudo REPO_DIR=/pfad/zum/checkout VOLUME_DIR=/opt/website-vorlagen \
  bash tools/deploy/update-vorlagen-galerie.sh
```

Es baut die Galerie neu, **stellt den versionierten Katalog wieder her**,
**bewahrt** vorhandene Reels/Carousels aus dem Volume, prüft per
Konsistenz-Check, dass kein referenziertes Bild fehlt, und synchronisiert erst
dann. Mit voller Render-Toolchain macht `FULL_REBUILD=1 …` einen Komplett-Neubau
(inkl. `npm run covers && npm run covers:png` für alle 4 Reel-Farbwelten).

> Der aktualisierte **Katalog** wird erst live, wenn das App-Image neu gebaut
> und der Container neu gestartet wird (Katalog ist ins Next.js-Build
> eingebacken). Bilder aus dem Volume erscheinen sofort.

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
- **Stolperfalle Server:** Der Standalone-Lauf schreibt nach
  `<checkout>/content/vorlagen`, ausgeliefert wird aber das Volume
  `/opt/website-vorlagen` (`:ro` nach `/app/content/vorlagen`). Ohne Spiegelung
  zeigen die neuen Katalog-Einträge auf 404. Für den reinen Marketing-Lauf
  genügt additives Spiegeln — `--delete` ist hier **nicht** nötig und wäre
  riskant, weil im Volume Reels/Carousels liegen können, die der Teil-Lauf nicht
  erzeugt:
  ```bash
  rsync -a /opt/website/content/vorlagen/ /opt/website-vorlagen/
  ```
  Für den **Vollbau** stattdessen `tools/deploy/update-vorlagen-galerie.sh`
  nehmen (siehe oben) — das Skript bewahrt die Volume-Bestände selbst.

## tools/vorlagen/bild-jobs.mjs — kein eigener Generator, gemeinsames Hilfsmodul

- **Zweck:** Zwei Helfer für die Galerie-Generatoren, kein eigenständig
  aufrufbares Skript (kein `main()`, keine Shebang, kein npm-Script):
  1. `parallel(items, fn)` — wie `Promise.all(items.map(fn))`, aber mit
     höchstens `MAX_JOBS` gleichzeitigen Läufen (Warteschlange begrenzter
     Breite), Ergebnisreihenfolge bleibt erhalten (wichtig für Katalog-IDs wie
     `social-001…` und Slide-Reihenfolgen). Ausdrücklich **nicht
     verschachtelbar** (Deadlock-Gefahr laut Kommentar im Code).
  2. `webpOpts(quelle, { quality, effort })` — liest nur den Bild-Header
     (`sharp().metadata()`, kein Decode) und senkt `effort` bei Bildern **mit
     Alpha-Kanal** von 6 auf `ALPHA_EFFORT = 4` (laut Modul-Kommentar 7,39 s →
     0,60 s Renderzeit für ein transparentes 2160px-Overlay, bei nur 12 %
     größerer Datei).
- **Aufruf:** nur als ES-Modul-Import — `import { parallel, webpOpts } from
  "./bild-jobs.mjs"` in `tools/vorlagen/build-gallery.mjs` und
  `tools/vorlagen/marketing-carousels.mjs`.
- **Voraussetzungen:** Node, `sharp` (für `webpOpts`).
- **Env-Variable:** `GALERIE_JOBS` überschreibt `MAX_JOBS` (Default:
  `cpus().length`); `GALERIE_JOBS=1` erzwingt sequenzielle Verarbeitung.
- **Eingaben/Ausgaben:** keine eigenen — reine Bibliotheksfunktionen, wirken
  nur über die aufrufenden Generatoren (siehe `build-gallery.mjs` und
  `marketing-carousels.mjs` oben).

---

## Wo `content/vorlagen/` liegt (seit 18.08.2026)

Das Verzeichnis ist **nicht mehr im Repo** und **nicht mehr im Docker-Image**:
es steht in `.gitignore` und liegt auf dem Server unter
**`/opt/website-vorlagen`**. Von dort mountet `docker-compose.yml`
(Service `website`) es schreibgeschützt nach `/app/content/vorlagen` — also
genau an die Stelle, an der es vorher im Image lag. Für den Code ändert sich
dadurch nichts: die Ausliefer-Route liest weiterhin
`join(process.cwd(), "content", "vorlagen")`.

Grund: Der Vollbau schreibt jede Datei neu, und die transparenten Overlays
komprimieren schlecht. Versioniert wären das mehrere hundert MB **pro Lauf**
in der Git-Historie, bei rund 650 MB Gesamtbestand. Die Dateien sind aus
`docs/**` jederzeit reproduzierbar; versioniert bleibt nur der Katalog
`src/lib/vorlagen-assets.ts`.

Folgen für die Praxis:

- **Generator-Läufe** müssen nach `/opt/website-vorlagen` schreiben. Im
  Container also zusätzlich `-v /opt/website-vorlagen:/app/content/vorlagen`
  mounten (schreibend), dann stimmt der Standardpfad wieder.
- **Ein frischer Clone hat keine Galerie.** `/admin/vorlagen` zeigt dann leere
  Karten, bis `npm run vorlagen:galerie` gelaufen ist. Der Katalog listet die
  Einträge trotzdem, weil er im Repo liegt.
- **Der Deploy braucht keinen Rebuild mehr**, wenn sich nur Galerie-Dateien
  geändert haben — das Volume wird zur Laufzeit gelesen. Ein Rebuild ist nur
  nötig, wenn sich `src/lib/vorlagen-assets.ts` ändert (der Katalog wird
  einkompiliert).

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

**Stand im Repo:** eingecheckt sind `social` (198 webp), `reels` (59 webp +
59 ZIP), `thumbs`, `carousels` (54 Ordner), `story` (6), `story-carousel` (1),
`content-overlay` (28) und `workshop`; der Katalog zählt 386 Einträge.

`cover-overlay` und `carousel-overlay` fehlen noch. Sie lesen aus
`docs/{reels/covers,carousels}/export-overlay/` — diese Ordner sind
git-ignoriert und entstehen erst durch einen lokalen Lauf von
`npm run covers:png` bzw. `npm run carousels:png`. Fehlen sie, tragen
`buildCoverOverlays()` und `buildCarouselOverlays()` **still 0 Einträge** ein
(`existsSync`-Guard, kein Fehler).

Trenner im Carousel-Namen: **doppelter Unterstrich** `<serie>__<slug>`. Ein
Carousel-Ordner enthält **ausschließlich `slide-NN.webp`** — **kein `meta.json`**,
keine SVG/PNG. Alle Metadaten (Titel, Slide-Anzahl, Captions, Formate, Maße)
stehen zentral im generierten Katalog `src/lib/vorlagen-assets.ts`.

Ordner je Präfix: `marketing__` 5 · `praxis__` 13 · `selbstverteidigung__` 16 ·
`stufen__` 7 · `vertiefungen__` 13 = **54 Ordner** (+ je ein gleichnamiges ZIP).

---

## tools/social/weisheiten/ — Instagram-Weisheiten-Serie (A–F)

Eigenständiges Verzeichnis **außerhalb** der drei oben beschriebenen Familien:
eigene HTML-Generatoren, eigenes Render-Skript, eigene Bild-Quellen — **kein**
npm-Script, **keine** Anbindung an `tools/vorlagen/build-gallery.mjs` (kein
Treffer für „weisheiten" in `build-gallery.mjs`/`marketing-carousels.mjs`).
Primärquelle ist `tools/social/weisheiten/README.md`; die folgenden Angaben
sind gegen den Code geprüft.

- **Zweck:** Zwei bis sieben markengerechte, 8- bzw. 5/10/12-teilige
  Instagram-Serien (Feed 4:5 = 1080×1350 bzw. zusätzlich Story 9:16 =
  1080×1920) mit denselben 8 Kern-Weisheiten (Serien A–C) bzw. eigenen
  Weisheiten für thematische Mini-Serien (D–F). Das Gesicht ist immer das
  echte Foto von Heiko Schwaninger (Rahmung/Spiegelung/Ausschnitt, keine
  KI-Veränderung).
- **Serien (laut README, gegen Code geprüft):**
  - **A – Kopf-Porträt** (`gen-portrait.js`, 94 Zeilen): `VARIANTS`-Array mit
    8 Einträgen (`side`/`flip`/`bgFlip`/`zoom`), 1:1 zu den 8 Einträgen in
    `quotes.js` (Reihenfolge gekoppelt, siehe Kommentar „Reihenfolge =
    quotes.js"). Quelle: `public/heiko-hero.webp`.
  - **B – Ganzkörper-Posen** (`gen-posen.js`, 111 Zeilen): 5 freigestellte
    Posen aus `quellen/`, vor rotierenden Berg-Hintergründen
    (`assets.js` → `backdrops`, 7 Panoramen: `public/hero-bg-berge.webp` +
    6× `quellen/hintergruende/berg-0N.png`).
  - **C1 – Posen-Story** (`gen-story-posen.js`, 110 Zeilen) und **C2 –
    Porträt-Story** (`gen-story-portrait.js`, 89 Zeilen): dieselben Motive wie
    A/B im 9:16-Story-Format, Text oben/Logo unten (Story-UI-safe).
  - **D – Mini „Muster & Vermeidung"** (`gen-mini-muster.js`, 111 Zeilen): 5
    frontale Gesten-Posen (nichts sehen/hören/sagen, ratlos, Schulterzucken),
    eigene Weisheiten, je Motiv 4:5 **und** 9:16 → 10 Dateien.
  - **E – „Klartext & Entscheidung" + E-Book** (`gen-klartext.js`, 116
    Zeilen): 5 aufrechte Gesten + 1 E-Book-CTA-Motiv, je 4:5 + 9:16 → 12
    Dateien.
  - **F – „Einladung & Reflexion"** (`gen-einladung.js`, 107 Zeilen): 5
    ruhige/einladende Gesten, je 4:5 + 9:16 → 10 Dateien.
- **Aufruf:** kein npm-Script. Aus dem Ordner selbst:
  ```bash
  cd tools/social/weisheiten
  ./render.sh            # nutzt Playwright-Chromium des Environments
  CHROME=/pfad/zu/chrome ./render.sh   # eigenes Chromium erzwingen
  ```
- **Voraussetzungen:** `bash`, `node` (die `gen-*.js`-Skripte sind CommonJS,
  `require(...)`, kein ESM), ein headless Chromium-Binary. `render.sh` nutzt
  **nicht** `playwright.chromium.executablePath()` wie die übrigen
  Generatoren, sondern einen fest verdrahteten Default-Pfad
  `CHROME="${CHROME:-/opt/pw-browsers/chromium-1194/chrome-linux/chrome}"` —
  ⚠ zu klären: dieser Pfad ist an eine konkrete Chromium-Build-Nummer
  (`chromium-1194`) gebunden und bricht mit `Chromium nicht gefunden`, sobald
  sich die installierte Version ändert (die übrigen `.mjs`-Generatoren im Repo
  suchen stattdessen dynamisch per `readdirSync` nach einem `chromium*`-
  Verzeichnis). Aufruf selbst rendert **ohne** Playwright-API, direkt per
  `chrome --headless --no-sandbox --disable-gpu …`.
- **Eingaben / Datenzugriff:**
  - `quotes.js` — die 8 Kern-Weisheiten (`html` mit `<br>`/`<em>`), geteilt von
    Serie A–C.
  - `assets.js` — lädt Schriften (`src/app/fonts/{Inter,Fraunces}-latin*
    -variable.woff2`) und Bilder aus dem Repo als Base64-Data-URIs:
    `public/hero-bg-berge.webp`, `public/logo-brain-gold-freigestellt.png`,
    `public/heiko-hero.webp`, sowie 21 freigestellte Posen-PNGs und 6
    Hintergrund-Panoramen unter `tools/social/weisheiten/quellen/`.
  - Motiv-/Weisheiten-Texte für Serien D–F liegen **inline** in den
    jeweiligen `gen-*.js` (nicht in `quotes.js`).
- **Ablauf:** `render.sh` räumt `build/*.html`/`build/*.png` auf, ruft
  nacheinander alle sieben `gen-*.js` (jedes schreibt nur HTML nach
  `build/`), rendert dann jede `build/*.html` mit dem CLI-Chrome in
  **Überscan**-Auflösung (`W=1080`, `H+OVERSCAN` mit `OVERSCAN=120`, Story-
  Dateien anhand `*story*`/`*9x16*` im Namen mit `H=1920`, sonst `H=1350`) und
  schneidet danach mit `lib/pngcrop.js` (reine Node/zlib-Implementierung, ohne
  Fremd-Libs) exakt auf `1080×1350` bzw. `1080×1920` zu. Grund für den
  Überscan-Umweg laut Kommentar: „Headless-Chromium hat einen kleinen
  Viewport-Versatz".
- **Ausgaben:** `tools/social/weisheiten/output/*.png`, **64 Dateien** laut
  README (`weisheit-portrait-01…08`, `weisheit-pose-01…08`,
  `weisheit-story-posen-01…08`, `weisheit-story-portrait-01…08`,
  `muster-01…05-<key>-{4x5,9x16}`, `klartext-01…05-<key>-{4x5,9x16}` +
  `ebook-01-gratis-{4x5,9x16}`, `einladung-01…05-<key>-{4x5,9x16}`) — der
  bestehende Ordnerinhalt (siehe `ls output/`) deckt sich mit diesem Schema.
  Bewusst **nicht** unter `public/` (README: Deploy-Payload/Vercel-
  Größenlimit) und **nicht** unter `content/vorlagen/` — die Serie ist von
  `tools/vorlagen/build-gallery.mjs` nicht erreichbar.
- **Captions:** `captions.md` (Feed-Captions + Hashtags je Weisheit),
  themenzugehörig, wird von keinem Skript automatisch eingelesen (manuelle
  Zuordnung beim Posten).
- **Verbundene Komponenten:** keine — die Serie ist ein Insel-Toolset für
  manuelles Posten, nicht Teil der Vorlagen-Galerie/`content/vorlagen/`-Kette.
- **Reproduzierbarkeit:** vollständig aus Repo-Dateien reproduzierbar
  (`quellen/`, `public/hero-bg-berge.webp`, `public/heiko-hero.webp`,
  `public/logo-brain-gold-freigestellt.png`, `src/app/fonts/*`), solange der
  in `render.sh` fest verdrahtete Chromium-Pfad zur installierten Version
  passt (siehe Stolperfalle oben) oder `CHROME=…` gesetzt wird.
