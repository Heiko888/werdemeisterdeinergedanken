# Audit & Dokumentation: Vorlagen-Generatoren und `/admin/vorlagen`

**Projekt:** werdemeisterdeinergedanken (Next.js 16.2.10)
**Stand:** 2026-08-13
**Umfang:** Kartierung aller Generatoren, Analyse des „Durcheinanders" in der Vorlagen-Galerie
(Bild-Fehlzuordnung, Format-Labels), Bildqualität, Canva-Anbindung & -Generierung, weitere
externe Content-/Bildquellen, priorisierter Maßnahmenplan.

> Erstellt durch ein Audit-Team (Generator-Inventar, Bildqualität, externe Dienste) plus
> praktische Prüfung der Canva-Verbindung über den aktiven Canva-Connector.

---

## 0. Management-Summary

| Frage | Kurzantwort |
|---|---|
| Warum sieht `/admin/vorlagen` „durcheinander" aus? | Der Generator wirft die **Format-Info** (1:1 / 4:5 / 9:16 / studien) weg und wirft alle 84 Zitat-/Faktengrafiken in **eine** Gruppe. Formate sind blockweise gemischt, Karten rendern im echten Seitenverhältnis → eine 1:1-Karte sitzt sichtbar in einer 4:5-Reihe. |
| Ist das „1:1 im 4:5" eine falsch getaggte Datei? | **Nein.** Alle Quelldateien sind pixelgenau korrekt. Es ist ein **Anzeige-/Gruppierungsfehler**, kein Datei-Fehler. |
| Wie lässt sich die Bildqualität verbessern? | Quellen in **@2x** rendern (aktuell nur 1080 px), WebP-Qualität für Text anheben (82 → 90, `smartSubsample`), nach dem Downscale **nachschärfen**. Siehe §5. |
| Können Canva-Vorlagen erzeugt werden? Ist Canva verbunden? | Canva ist **verbunden & aktiv**, aber **nicht mit dem Repo gekoppelt**. Autofill-fähige **Brand-Templates fehlen** → automatische Serien-Generierung derzeit nicht möglich. KI-Generierung aus Prompt wäre möglich. Siehe §6. |
| Gibt es andere Generatorquellen, die ich übersehe? | Alle Bilder entstehen **lokal** (sharp / Pillow / python-pptx / Chromium-Playwright). Kein Cloud-Bild-Dienst. Externe Dienste: Supabase, Resend, Stripe, Anthropic (nur Gedankenprofil-Reading), GA4, YouTube. Siehe §7. |

**Top-3-Sofortmaßnahmen:** (1) Format in Titel/Kategorie/Sortierung aufnehmen (§4.4), (2) WebP-Parameter für
textlastige Grafiken schärfen (§5, P3/P4), (3) Brand-Template mit Datensatz in Canva anlegen, falls
automatische Vorlagen-Serien gewünscht sind (§6).

---

## 1. Architektur der Vorlagen-Galerie

Die Galerie unter `/admin/vorlagen` ist **statisch aus dem Repo** gespeist – es gibt keine Datenbank
und keinen Storage-Bucket dahinter.

```
 Quell-Renderer (Playwright→PNG, Python→PPTX/PDF)         Nachverarbeitung (sharp: PNG→webp)
 ┌───────────────────────────────────────────┐           ┌─────────────────────────────────┐
 │ docs/marketing/**        (Social-PNGs)     │           │ tools/vorlagen/build-gallery.mjs│
 │ docs/reels/covers/export (Reel-Cover-PNGs) │  ───────► │  + marketing-carousels.mjs      │
 │ docs/carousels/export    (Carousel-PNGs)   │           │  (webp-Thumbs + Voll-Downloads) │
 │ docs/workshop/**         (PPTX/PDF)         │           └───────────────┬─────────────────┘
 └───────────────────────────────────────────┘                           │
                                                                          ▼
                       content/vorlagen/**  ◄── NICHT public/ (Admin-Schutz!)
                       (thumbs/, social/, reels/, carousels/*.zip, workshop/)
                                                                          │
                                    schreibt Katalog ────────────────────┤
                                                                          ▼
                              src/lib/vorlagen-assets.ts  (auto-generiert, 262 Einträge)
                                                                          │
                                                                          ▼
        src/app/admin/vorlagen/page.tsx  →  VorlagenBrowser.tsx  →  Route datei/[...pfad]/route.ts
                        (Admin-Check via Supabase-Auth + isAdminEmail)
```

**Wichtige Design-Entscheidung (korrekt umgesetzt):** Die Dateien liegen bewusst unter `content/`
statt `public/`. Alles unter `public/` würde Next.js zusätzlich ungeschützt unter seinem Dateipfad
ausliefern. Ausgeliefert wird ausschließlich über `src/app/admin/vorlagen/datei/[...pfad]/route.ts`
hinter dem Admin-Check (`isAdminEmail`), inklusive Pfad-Traversal-Schutz und `Cache-Control: private,
no-store`. Das ist sauber gelöst.

**Neu-Erzeugung der Galerie:**
```bash
npm run vorlagen:galerie      # baut content/vorlagen/ + src/lib/vorlagen-assets.ts komplett neu
```

Aktueller Katalog-Stand (`src/lib/vorlagen-assets.ts`): **262 Einträge** —
104 social, 60 carousel, 59 reels, 39 workshop.

---

## 2. Generator-Inventar

Die Generatoren teilen sich in **fünf Familien** plus den Galerie-Ingest:

| Familie | Ort | Technik | erzeugt |
|---|---|---|---|
| PDF-Pipeline (E-Book + Mitglieder) | `tools/pdf/generate.mjs` + Python | Node → TS-Extract → Python-HTML → Chromium-PDF → pdf-lib-Merge | `public/…pdf`, `content/pdf/*.pdf` |
| Drehbuch-/Textbündel-PDFs | `tools/pdf/*-drehbuch.mjs`, `carousel-texte.mjs` | Markdown → HTML → Chromium-PDF | `docs/workshop/…`, Repo-Root |
| Cover- & Carousel-Studio | `docs/reels/covers/`, `docs/carousels/` | HTML-Gen → Playwright-Screenshot-PNG | `docs/*/export/…png` |
| Social-Grafiken | `docs/marketing/*.mjs` | HTML → Playwright-Screenshot-PNG | `docs/marketing/…png`, `public/video-thumbnails/…` |
| Workshop | `tools/workshop/build.py` + JSON-Specs | python-pptx + Pillow + Playwright-PDF | `docs/workshop/<slug>/…` → `content/vorlagen/workshop/` |
| Galerie-Ingest | `tools/vorlagen/build-gallery.mjs` (+ `marketing-carousels.mjs`) | sharp (webp) + zip | `content/vorlagen/…`, `src/lib/vorlagen-assets.ts` |

> **Wichtig:** `docs/` wird **nicht** mit der Website ausgeliefert. Erst `build-gallery.mjs` kopiert/optimiert die fertigen Dateien nach `content/vorlagen/` und schreibt den Katalog.

### 2.1 PDF-Pipeline (`tools/pdf/`)

| # | Datei | Zweck | Aufruf | Ausgabe | Abhängigkeiten |
|---|---|---|---|---|---|
| 1 | `generate.mjs` | Orchestrator gesamte PDF-Pipeline (E-Book + 28 Mitglieder-PDFs), Arbeitsheft-Merge | `npm run pdf` | `public/Die-7-Stufen….pdf`; `content/pdf/*.pdf` | Node, Chromium, **pdf-lib**, Python 3 |
| 2 | `extract-content.mjs` | Liest TS-Inhalte via TS-Transpiler → JSON | via generate.mjs | `.build/content.json` | **typescript** |
| 3 | `build-ebook.py` | HTML fürs Gratis-E-Book (Texte im Skript, `STAGES_FULL`) | via generate.mjs | `.build/ebook.html` | Python 3 (stdlib) |
| 4 | `build-member.py` | HTML aller Mitglieder-Dokumente + Manifest | via generate.mjs | `.build/m-*.html` | Python 3 (stdlib) |
| 5 | `build-ebook-gedanken.py` | 2. E-Book „Die Gedanken, die nicht deine sind" | **Direktaufruf** (nicht in generate.mjs eingebunden — separates Skript) | `ebook-gedanken.html` | Python 3 (stdlib) |

### 2.2 Drehbuch- & Text-PDFs (Markdown → Chromium, kein sharp/Python)

| # | Datei | Zweck | Aufruf | Eingabe | Ausgabe |
|---|---|---|---|---|---|
| 6 | `reel-drehbuch.mjs` | 5 Reel-Serien → gebrandete PDFs | `npm run reel-drehbuch` | `docs/skripte/reels/*.md` | `docs/workshop/reel-skripte/*.pdf` |
| 7 | `carousel-texte.mjs` | Carousel-Slide-Texte je Serie → PDFs | Direktaufruf | `docs/skripte/carousels/*.md` | `docs/workshop/carousel-texte/*.pdf` |
| 8 | `langvideo-drehbuch.mjs` | Langvideo-Skripte → 2 PDFs (Ablesen/Stichpunkt) | `npm run langvideo-drehbuch [outdir]` | `docs/skripte/{stufen,praxis,vertiefungen}/*.md` | Default **Repo-Root** |
| 9 | `intro-video-drehbuch.mjs` | Intro-Video-Teleprompter-PDF | Direktaufruf | `docs/skripte/landing/*.md` | `WMDG-Video-Drehbuch-Intro.pdf` |

> 6 & 7 schreiben nach `docs/workshop/…` → landen in der Galerie. 8 & 9 landen per Default im **Repo-Root** und erscheinen nur mit explizitem `outdir` (`docs/workshop/video-drehbuecher`) in der Galerie.

### 2.3 Cover-Studio (`docs/reels/covers/`)

| # | Datei | Zweck | Aufruf | Ausgabe | Abhängigkeiten |
|---|---|---|---|---|---|
| 10 | `data.mjs` | Datenquelle: 6 Bereiche × **5 Formate** (9:16, 4:5, 1:1, 16:9, 2:3) | Modul | Konstanten | — |
| 11 | `build.mjs` | Cover-HTML aller Bereiche × Formate + Galerien | `npm run covers` | `<bereich>/<format>/cover-NN.html` | Node |
| 12 | `export-png.mjs` | Cover-HTML → PNG (Env `SCALE`, `FORMAT`) | `npm run covers:png` | `export/<bereich>/<format>/cover-NN.png` | **playwright** |
| 13 | `endcard.mjs` | Outro-Cards (3 Formate) HTML | `npm run endcard` | `endcard/*.html` | Node |

Assets: `_fonts.css` (1,4 MB eingebettet), `logo.png` — **von vielen Skripten mitbenutzt**.

### 2.4 Carousel-Studio (`docs/carousels/`)

| # | Datei | Zweck | Aufruf | Ausgabe | Abhängigkeiten |
|---|---|---|---|---|---|
| 14 | `data.mjs` | Parser Markdown → Carousels; 5 Studio-Serien, 3 Formate | Modul | Objekte | — |
| 15 | `build.mjs` | Studio-Slide-HTML je Format | `npm run carousels:slides` | `build/<serie>/<slug>/<format>/slide-NN.html` | Node |
| 16 | `export-png.mjs` | baut 15, rendert Slides → PNG | `npm run carousels:png` | `export/<serie>/<slug>/<format>/slide-NN.png` | **playwright** |
| 17 | `marketing-serien.mjs` | Funnel-Carousels (60000-gedanken, 4-wege-freiheit, wer-denkt-hier, studien-fakten, gratis-ebook) | Direktaufruf | `export/<key>/<format>/slide-NN.png` (**flachere Struktur**) | **playwright** |
| 18 | `stufen-ueberblick.mjs` | Überblicks-Carousel „7 Stufen" (9 Slides) | Direktaufruf | `export/stufen-ueberblick/<format>/…` | **playwright** |

### 2.5 Social-Grafiken (`docs/marketing/`) — Herkunft der PNGs

Die PNGs in `docs/marketing/{facebook,instagram,linkedin,youtube,profil,messenger,zitate,ebook}/` sind **nicht von Hand** erstellt, sondern **Outputs dieser drei Generatoren** (HTML → Playwright-Screenshot):

| # | Datei | Zweck | Ausgabe | Abhängigkeiten |
|---|---|---|---|---|
| 19 | `brand-assets.mjs` | Profil-/Kanalbild, YT-Thumbnails, **Zitat-Kacheln (1:1/4:5/9:16)**, Studienfakt-Kacheln, E-Book-/Story-Posts | `docs/marketing/{profil,messenger,youtube/thumbnails,zitate/*,ebook,instagram}/*.png` | **playwright** |
| 20 | `social-banners.mjs` | YouTube-Banner, Facebook-Cover, Instagram-Story, LinkedIn-Banner (**+@2x retina**) | `docs/marketing/{youtube,facebook,instagram,linkedin}/*.png` (+`@2x`) | **playwright** |
| 21 | `video-thumbnails.mjs` | 16:9-Poster je Mitglieder-Video (Titel aus TS) | **`public/video-thumbnails/<bereich>/<slug>.png`** (direkt servierbar) | **playwright** |

> `brand-assets.mjs` ist der Ursprung der 84 Zitat-/Faktengrafiken aus Befund A (§3). Es rendert mit festem `deviceScaleFactor: 1` → nur 1080 px (siehe §5).

### 2.6 Workshop (`tools/workshop/build.py`)

Pro JSON-Spec drei Bausteine: **PPTX** (mit Notizen), **Workbook-PDF**, **Moderationsplan-PDF**.
Aufruf: `python3 tools/workshop/build.py <spec.json>`. Specs: `bewusstseinstest.json`, `blog.json`, `journal.json`, `wissensdatenbank.json`. Ausgabe: `docs/workshop/<slug>/…` **+ Spiegelung nach `content/vorlagen/workshop/`**. Abhängigkeiten: **python-pptx**, **Pillow**, **playwright** (`page.pdf`).
(Die vier „bestehenden" Workshops 7-stufen/mentale-selbstverteidigung/praxis/vertiefungen liegen bereits gerendert in `docs/workshop/`.)

### 2.7 Galerie-Ingest (`tools/vorlagen/`)

| # | Datei | Zweck | Aufruf | Abhängigkeiten |
|---|---|---|---|---|
| 23 | `build-gallery.mjs` | **Zentraler Ingest**: sammelt Grafiken/PDFs/PPTX, erzeugt webp-Thumbs + Voll-Downloads, zippt Carousels, schreibt Katalog | `npm run vorlagen:galerie` | **sharp**, **zip**; importiert 24 |
| 24 | `marketing-carousels.mjs` | Funnel-Carousels + Captions; als Modul in 23 ODER standalone (non-destruktiv) | Import / Direktaufruf | **sharp**, **zip/unzip** |

### 2.8 npm-Scripts & Direktaufrufe

```
pdf → tools/pdf/generate.mjs            covers → docs/reels/covers/build.mjs
covers:png → …/export-png.mjs           carousels:slides → docs/carousels/build.mjs
carousels:png → …/export-png.mjs        reel-drehbuch → tools/pdf/reel-drehbuch.mjs
endcard → …/endcard.mjs                 langvideo-drehbuch → tools/pdf/langvideo-drehbuch.mjs
vorlagen:galerie → tools/vorlagen/build-gallery.mjs
```
**Ohne npm-Script (nur Direktaufruf):** `carousel-texte.mjs`, `intro-video-drehbuch.mjs`, `build-ebook-gedanken.py`, `marketing-serien.mjs`, `stufen-ueberblick.mjs`, `brand-assets.mjs`, `social-banners.mjs`, `video-thumbnails.mjs`, `tools/workshop/build.py`, `marketing-carousels.mjs`.

### 2.9 Detaillierter Datenfluss

```
QUELLEN (committet): src/lib/*.ts · docs/skripte/**/*.md · docs/ebook/*.md
                     tools/workshop/specs/*.json · Inline-Daten in *.mjs
      │
      ▼ GENERATOREN
 A) tools/pdf/generate.mjs → public/…7-Stufen….pdf + content/pdf/*.pdf  ─┐(via /mitglieder, NICHT Galerie)
 B) reels/covers: build.mjs → export-png.mjs → docs/reels/covers/export/<b>/<f>/*.png
 C) carousels: build.mjs → export-png.mjs (+ marketing-serien, stufen-ueberblick) → docs/carousels/export/**
 D) marketing: brand-assets.mjs + social-banners.mjs → docs/marketing/**/*.png
      video-thumbnails.mjs → public/video-thumbnails/**  ─┐(direkt servierbar, NICHT Galerie)
 E) workshop/build.py → docs/workshop/<slug>/*.{pptx,pdf} → content/vorlagen/workshop/
 F) reel-drehbuch / carousel-texte → docs/workshop/{reel-skripte,carousel-texte}/*.pdf
      │
      ▼ INGEST: tools/vorlagen/build-gallery.mjs (+ marketing-carousels.mjs)
      sharp PNG→webp · zip Carousel-Slides · attachCaptions() aus docs/skripte/**
      │
      ├─► content/vorlagen/{social,reels,carousels,workshop,thumbs}/…  (content/ = login-geschützt)
      └─► src/lib/vorlagen-assets.ts  (AUTO-GENERIERT)
                │
                ▼ ANZEIGE
      admin/vorlagen/page.tsx → VorlagenBrowser.tsx
      Download via datei/[...pfad]/route.ts  (Guard: isAdminEmail)
```

**Pipeline-Reihenfolge (kritisch):** erst die Export-Skripte (B–F), **dann** `npm run vorlagen:galerie`. `build-gallery.mjs` überspringt Marketing-Carousels bewusst (flachere Struktur) und delegiert an `marketing-carousels.mjs`. `carousels:png` ruft intern `carousels:slides` auf.

---

## 3. Befund A — Der „1:1 im 4:5-Format"-Fehler (Ursache & Fix)

### 3.1 Symptom
In der Galerie sitzt in einer Reihe von 4:5-Karten sichtbar eine 1:1-Karte. Bilder wirken „nicht
richtig zugeordnet oder ausgewiesen".

### 3.2 Ursache (belegt)
Die Quelldateien sind **fehlerfrei** — ein Scan aller `docs/marketing/**`-PNGs ergab **null**
Abweichungen zwischen Ordner-/Dateinamen-Format und tatsächlichen Pixeln (z. B. `zitate/4x5/*`
durchgängig 1080×1350).

Der Fehler entsteht im Generator `tools/vorlagen/build-gallery.mjs`, Funktion `buildSocial()`:

```js
const rel = file.slice(src.length + 1);   // z. B. "zitate/1x1/WMDG-Zitat-01.png"
const kanalKey = rel.split("/")[0];        // NUR "zitate" – das Format "1x1" wird verworfen
```

Konsequenzen (aus dem committeten Katalog belegt):

1. **Alle 84 Zitat-/Faktengrafiken landen in EINER Gruppe** „Zitate & Fakten"
   (28×1:1, 28×4:5, 28×9:16).
2. **Nur 28 verschiedene Titel, jeder erscheint 3×** (`Zitat 01` als 1:1, 4:5 und 9:16) — der Titel
   enthält **keine** Formatangabe. Auch die „studien"-Varianten (Fakten) werden nicht von den Zitaten
   getrennt.
3. `collect()` sortiert nach vollem Pfad → die Karten liegen **blockweise** (erst alle 1:1, dann alle
   4:5, dann 9:16). `BildKarte` in `VorlagenBrowser.tsx` rendert jede Karte im **echten
   Seitenverhältnis** (`a.masse.w / a.masse.h`). Beim Blockübergang sitzt damit optisch eine
   quadratische Karte in der hohen 4:5-Reihe. **Das ist der beobachtete Effekt.**

Es ist also **kein** falsch getaggtes Bild, sondern **fehlende Format-Trennung** in Titel, Kategorie
und Sortierung.

### 3.3 Nebenbefund — fragiles `masse`-Label
`ratioLabel()` in `marketing-carousels.mjs` leitet das Label aus den Pixeln per `ggT` ab und gibt bei
„krummen" Verhältnissen **leer** zurück:
- „Facebook Cover" (1640×624) → Label `""` (leer)
- LinkedIn-Banner → Label `4:1`

Ein um 1 px abweichendes Bild (z. B. 1081×1350) würde ebenfalls ein leeres oder unsinniges Label
erzeugen. Robuster wäre ein **Toleranz-Snapping** auf bekannte Zielformate.

### 3.4 Empfohlener Fix (Format sichtbar & sortiert)
In `buildSocial()` das Format aus dem zweiten Pfadsegment ableiten und in Titel, Unterkategorie und
Sortierung aufnehmen. Skizze:

```js
const parts = rel.split("/");            // ["zitate","1x1","WMDG-Zitat-01.png"]
const kanalKey = parts[0];
const formatKey = parts.length > 2 ? parts[1] : "";   // "1x1" | "4x5" | "9x16" | "studien-4x5" …
const istStudien = /^studien-/.test(formatKey);
const fmtLabel = formatKey.replace(/^studien-/, "").replace("x", ":"); // "4:5"

// Unterkategorie feiner: Zitate vs. Fakten getrennt halten
const unter = kanalKey === "zitate"
  ? (istStudien ? "Studien-Fakten" : "Zitate")
  : (KANAL[kanalKey] ?? prettifyName(kanalKey));

// Titel mit Format, damit die 3 Varianten unterscheidbar sind
titel: `${prettifyName(basename(file))}${fmtLabel ? ` · ${fmtLabel}` : ""}`,
```

Zusätzlich in `VorlagenBrowser.tsx` innerhalb einer Gruppe **nach Format gruppieren** (analog zur
`groupBy`-Logik der Reels/Carousels), sodass 1:1-, 4:5- und 9:16-Karten je eigene Unterüberschrift
bekommen und nicht gemischt in einem Raster liegen.

Optional (`ratioLabel`): bekannte Formate mit Toleranz snappen, statt bei krummen Werten leer
zurückzugeben.

---

## 4. Befund B — Verworfene Generator-Ausgaben

Der Reel-Cover-Generator erzeugt **fünf** Formate je Cover (`feed-1x1`, `feed-4x5`, `pin-2x3`,
`landscape-16x9`, `reel-9x16`). `buildReels()` übernimmt jedoch **nur** `/reel-9x16/` in die Galerie:

```js
const files = collect(src, [".png"]).filter((f) => f.includes("/reel-9x16/"));
```

→ 4 von 5 erzeugten Formaten werden gebaut und weggeworfen. Falls die anderen Formate nutzbar sein
sollen, sollten sie – wie bei den Carousels – als Format-Varianten mit in die Galerie/das ZIP.

---

## 5. Befund C — Bildqualität (Analyse & Empfehlungen)

### 5.1 Zwei getrennte Ebenen
- **Quell-Rendering** (Playwright → PNG): `docs/*/export-png.mjs`, `docs/marketing/brand-assets.mjs`.
  Enthalten **keinen** `sharp()`-Aufruf — nur `page.screenshot()`.
- **Nachverarbeitung** (PNG → webp): ausschließlich in `build-gallery.mjs` und `marketing-carousels.mjs`.

### 5.2 Alle `sharp()`-Ketten

| Skript / Funktion | Zweck | Zielbreite | Format | Quality | Bemerkung |
|---|---|---|---|---|---|
| build-gallery `buildSocial` | Voll-Download | `FULL_WIDTH=2000` | webp | **82** | Quellen nur 1080 → Cap greift nie |
| build-gallery `buildSocial` | Thumbnail | 640 | webp | **72** | textlastig, kein Nachschärfen |
| build-gallery `buildReels` | Voll-Download | 1080 | webp | **80** | |
| build-gallery `buildReels` | Thumbnail | 420 | webp | **70** | für Cover-Text zu klein |
| build-gallery `buildCarousels` | Preview | 640 | webp | **76** | |
| build-gallery `buildCarousels` | ZIP-Download | 1080 | webp | **80** | |
| marketing-carousels | Preview / ZIP | 640 / 1080 | webp | **76 / 80** | |

**Durchgängig:** kein `.sharpen()`, kein `effort:`, kein `smartSubsample`/`chromaSubsampling`. Also
sharp-Standard: WebP `effort:4` und **4:2:0-Chroma-Subsampling** — genau das, was farbige Textkanten
(Akzentwörter im Marken-Grün/Türkis) am stärksten aufweicht.

### 5.3 Tatsächliche Quell-Auflösungen (PNG-Header gelesen)

`brand-assets.mjs` rendert fest mit `deviceScaleFactor: 1` (keine `SCALE`-Option):

| Quelle | Auflösung |
|---|---|
| `zitate/4x5`, `studien-4x5` | **1080 × 1350** |
| `zitate/1x1`, `studien-1x1` | 1080 × 1080 |
| `zitate/9x16`, `studien-9x16` | 1080 × 1920 |
| `youtube/Banner` | 2560 × 1440 |
| `youtube/thumbnails` | 1280 × 720 |
| `facebook/Cover` | 1640 × 624 |
| `linkedin/Banner` / `Banner@2x` | 1584 × 396 / **3168 × 792** (einzige @2x-Datei) |

`docs/reels/covers/export` und `docs/carousels/export` existieren lokal **nicht** (erst durch
`covers:png` / `carousels:png` erzeugt; Default `SCALE=1` → 1080 px, `SCALE=2` → 2160 px).

**Kernbefunde:**
1. **Kein Hochskalieren** (`withoutEnlargement:true`) — gut. Kehrseite: Download faktisch auf **1080 px** begrenzt.
2. **`FULL_WIDTH=2000` ist toter Code** für fast alle Social-Grafiken (Quellen nur 1080 breit).
3. **Die einzige @2x-Datei wird verworfen** — `buildSocial` filtert alle `@2x` bewusst heraus; der scharfe 3168er-LinkedIn-Banner landet nie in der Galerie.

### 5.4 Bewertung
- **WebP-Quality 72–82 für Text:** für Downloads knapp, für Previews zu niedrig. Ab Q < 85 ohne `smartSubsample` fransen farbige Textkanten (Ringing/Farbsäume).
- **Nachschärfen fehlt komplett:** jeder Downscale 1080/1350 → 640/420 ohne `.sharpen()` → weiche Kanten.
- **Downloads auf Quellauflösung begrenzt** — nicht durch `FULL_WIDTH`, sondern durch die Quelle (1080 px wegen `deviceScaleFactor:1`).
- **Retina/@2x** nicht genutzt: genau eine @2x-Datei existiert und wird weggefiltert; die textlastigen Zitate haben gar keine @2x-Variante.

### 5.5 Empfehlungen (priorisiert, mit Zahlenwerten)

**P1 — Zitat-/Faktengrafiken in @2x rendern (größter Hebel).**
In `docs/marketing/brand-assets.mjs` eine `SCALE`-Option ergänzen und mit `deviceScaleFactor: 2`
rendern → `zitate/4x5` wird **2160 × 2700**. Erst damit hat der Download echte Schärfereserve.

**P2 — `FULL_WIDTH` angleichen.** Nach P1 auf **2160** setzen; ohne P1 konsequent auf 1080 senken
(damit der Code die Realität abbildet).

**P3 — WebP für Text schärfen (sofort, ohne Re-Render):**
```js
.webp({ quality: 90, effort: 6, smartSubsample: true })   // Social-Voll (82→90)
.webp({ quality: 88, effort: 6, smartSubsample: true })   // Carousel-/Reel-Downloads (80→88)
```

**P4 — Previews nachschärfen & anheben:**
```js
.resize({ width: 640, withoutEnlargement: true })
.sharpen({ sigma: 0.7 })
.webp({ quality: 82, effort: 6, smartSubsample: true })   // Thumbs 72/76 → 82
```
Reel-Thumbs **420 → 512 px**, Quality **70 → 80**.

**P5 — @2x nicht mehr blind verwerfen:** in `buildSocial` @2x **bevorzugen**, sonst auf 1x zurückfallen.

**Aufwand/Wirkung:** P3 + P4 sind reine Parameteränderungen in zwei Dateien, sofort wirksam.
P1/P2/P5 heben die Download-Auflösung strukturell und lösen den toten `FULL_WIDTH=2000`-Anspruch ein.

**Relevante Zeilen:** `build-gallery.mjs` 50–51, 131–138, 172–179, 245–266 · `marketing-carousels.mjs`
282–300 · `docs/marketing/brand-assets.mjs` (`deviceScaleFactor:1`).

---

## 6. Canva — Anbindung & Vorlagen-Generierung

**Praktisch geprüft über den aktiven Canva-Connector (2026-08-13).**

### 6.1 Ist Canva verbunden?
**Ja.** Der Canva-Connector ist verbunden und in dieser Umgebung aktiv. Im Konto vorhanden:
- **2 Brand-Kits** (eines benannt „Connection Key").
- **~25+ bereits manuell erstellte WMDG-Designs**, u. a. „Du lebst im Autopilot", „Dein Gehirn im
  Daueralarm — Warum du dann enger denkst", „Zwischen Reiz und Reaktion liegt ein Raum …",
  „WMDGModerationsplan7Stufen.pdf" — in Formaten Instagram-Post 4:5, 1:1, 9:16, Facebook-Post.

→ Es gibt bereits einen **aktiven, aber komplett manuellen** Canva-Workflow parallel zur Repo-Pipeline.

### 6.2 Können Vorlagen automatisch erzeugt werden?
**Autofill/Serien-Generierung aus Datensätzen: derzeit NICHT möglich.** Eine Suche nach
autofill-fähigen Brand-Templates (`dataset = non_empty`) ergab **null** Treffer. Für automatische
Vorlagen-Serien (z. B. „14 Zitate → 14 fertige Grafiken") müsste in Canva **zuerst ein Brand-Template
mit Datenfeldern** angelegt und veröffentlicht werden. Danach ließe sich per Autofill/
`create-design-from-brand-template` eine ganze Serie erzeugen.

**Was heute schon ginge:**
- **KI-Generierung aus Prompt** (`generate-design`) – Design aus Textbeschreibung.
- **Import/Export**: Assets aus dem Repo per URL nach Canva hochladen, Designs als PNG/PDF/PPTX
  exportieren.
- **Resize** eines Designs in weitere Formate.

### 6.3 Empfohlener Weg, falls Canva produktiv genutzt werden soll
1. **Ein Brand-Template je Vorlagentyp** in Canva bauen (Zitat 4:5/1:1/9:16, Fakt, Carousel-Slide) und
   die Textfelder als **Dataset-Felder** definieren → dann Serien per Autofill.
2. Marke im **Brand-Kit** hinterlegen (Farben Ink/Accent, Schriften), damit KI-/Template-Designs
   markenkonform sind.
3. Optional als **zweiter Ausgabekanal** neben der lokalen sharp-Pipeline — nicht als Ersatz. Die
   lokale Pipeline ist reproduzierbar & versioniert; Canva ist für schnelle, redaktionelle
   Einzelstücke stark.

### 6.4 Wichtige Klarstellung
Im **Code** existiert **keine** Canva-Integration (kein Treffer in `src/`, `tools/`, `docs/`). Die
Repo-Pipeline und das Canva-Konto sind heute **zwei getrennte Welten**. Eine Kopplung (Repo-Assets →
Canva-Autofill → Export zurück) wäre ein bewusst zu bauendes Projekt.

---

## 7. Externe Dienste & weitere Content-Quellen

### 7.1 Verdrahtete Dienste (laut `.env.local.example`)

| Dienst | Variablen | Zweck |
|---|---|---|
| **Supabase** | `NEXT_PUBLIC_SUPABASE_URL`, `…ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | Auth + Postgres-DB (E-Book-Opt-in, Impulse, Mitgliedschaft, Readings). **Kein Storage-Bucket.** |
| **Resend** | `RESEND_API_KEY`, `CONTACT_TO/FROM`, `EBOOK_FROM`, `IMPULSE_FROM` | E-Mail (Kontakt, E-Book, Impulse, Mitgliedschaft) |
| **Stripe** | `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID(_YEARLY)`, `STRIPE_WEBHOOK_SECRET`, `MEMBERSHIP_FROM` | Abo-Checkout + Webhook |
| **Anthropic** | `ANTHROPIC_API_KEY` | **nur** Gedankenprofil-Reading (optional, serverseitig) |
| **Google Analytics 4** | `NEXT_PUBLIC_GA_ID` | Measurement-ID `G-XF5D83V7HD` **als Default im Code** hinterlegt; lädt nach Cookie-Consent |
| **YouTube** | (keine Env, nur Video-IDs im Code) | Video-Embeds via `youtube-nocookie` |

Zusätzlich `CRON_SECRET` (Impuls-Route), `ENFORCE_CANONICAL_HOST`, Feature-Flags
(`REQUIRE_ACTIVE_MEMBERSHIP`, `ALLOW_SELF_REGISTRATION`). `deploy/.env.example` enthält **kein**
Stripe/Anthropic/GA — dort separat nachzutragen.

### 7.2 Grep-Ergebnis: Was ist NICHT verdrahtet

**Null Treffer** (als Integration) für: **Canva, Figma, OpenAI, DALL-E, Midjourney, Stability,
Replicate, Cloudinary, imgix, Unsplash, Pexels, SendGrid, Gumroad, Mailchimp, Brevo.**
(Brevo/Mailchimp nur als Newsletter-*Alternativvorschlag* in `README.md:55`, kein Code. „GPT" nur als
inhaltlicher Verweis in einem Wissensdatenbank-Artikel.)

### 7.3 KI-Nutzung: exakt eine Stelle
`@anthropic-ai/sdk` wird **ausschließlich** in `src/app/mitglieder/reading-actions.ts` verwendet —
für das persönliche „Reading" zum Gedankenprofil (Modell `claude-opus-5`, nur auf Button-Klick, ohne
Key ausgeblendet, Ergebnis in Supabase `gedanken_readings`).

**Nicht** KI-generiert (rein statisch, hand-codiert): **Blog** (`src/lib/blog.ts`), **Journal**
(`journal.ts`), **Bewusstseinstest** (`consciousness-test.ts`), **Deep-Dives** (`deep-dives.ts`),
**Captions/Marketing-Texte** (Content-Dateien). Für Vorlagen/Bilder/PDFs wird **keine KI** genutzt.

### 7.4 Wo liegen die Bilder?
**Alles im Repo, kein Storage-Bucket** (kein `storage.from()`/`upload()`/`getPublicUrl` in `src/`):
- `public/` — direkt ausgelieferte Website-Bilder + `video-thumbnails/`
- `content/` — hinter Login/Admin (846 Dateien `content/vorlagen/`, 44 PDFs `content/pdf/`)
- `docs/` — Rohquellen, nicht ins Deploy-Image kopiert

### 7.5 Womöglich übersehen
1. **GA4-ID als Code-Default** (`src/lib/site.ts`) — Analytics läuft auch ohne gesetzte Env-Variable.
2. **YouTube** ist ein externer Content-Dienst ohne `.env`-Eintrag (nur Video-IDs im Quellcode) — bei einer Dienste-Inventur leicht zu vergessen.
3. Der **Anthropic-Key** betrifft nur das Reading — Blog/Journal/Captions/Test sind komplett statisch.
4. Diverse Platzhalter-TODOs (echte Social-URLs, Video-IDs) in `src/lib/site.ts`, `stage-lessons.ts`, `deep-dives.ts`, `practices.ts` — redaktionell, keine Integrationen.

---

## 8. Priorisierter Maßnahmenplan

| Prio | Maßnahme | Datei(en) | Aufwand |
|---|---|---|---|
| **P1** | Format in Titel/Unterkategorie aufnehmen + Zitate/Fakten trennen | `tools/vorlagen/build-gallery.mjs` (`buildSocial`) | klein |
| **P1** | In der Galerie je Format-Untergruppe rendern (statt gemischtes Raster) | `src/app/admin/vorlagen/VorlagenBrowser.tsx` | klein |
| **P2** | WebP für Text schärfen: Voll 82→90, Carousel/Reel 80→88, `smartSubsample:true`, `effort:6` | `build-gallery.mjs`, `marketing-carousels.mjs` | klein |
| **P2** | Previews nach Downscale nachschärfen (`.sharpen({sigma:0.7})`), Quality anheben, Reel-Thumb 420→512 | dieselben | klein |
| **P2** | `ratioLabel` robust machen (Toleranz-Snapping auf bekannte Formate) | `marketing-carousels.mjs` | klein |
| **P3** | Quellen der Zitat-/Faktengrafiken in **@2x** (2160 px) rendern; `FULL_WIDTH` auf 2160 angleichen | `docs/marketing/brand-assets.mjs`, `build-gallery.mjs` | mittel |
| **P3** | @2x-Assets nicht mehr blind verwerfen, sondern bevorzugen | `build-gallery.mjs` (`buildSocial`) | klein |
| **P3** | Reel-Cover-Zusatzformate nutzbar machen oder nicht erzeugen | `build-gallery.mjs` (`buildReels`) | mittel |
| **P4** | Falls gewünscht: Canva-Brand-Templates mit Datensatz anlegen (Voraussetzung für Auto-Serien) | Canva (kein Code) | mittel |
| **P4** | GA4-ID nicht als Code-Default, sondern nur per Env; YouTube-Video-IDs zentralisieren | `src/lib/site.ts` u. a. | klein |

> Nach jeder Änderung an den Generatoren: `npm run vorlagen:galerie` neu ausführen und
> `content/vorlagen/` + `src/lib/vorlagen-assets.ts` neu committen.
