# 07 · Generatoren & Folien

Konsolidierte Übersicht **aller Generatoren, Skripte und Folien-/Präsentations-
Erzeuger** des Projekts. Verifiziert gegen den Code in `tools/` (und die von
`package.json` mitgenutzten Skripte unter `docs/`). Die ausführlichen
Detaildokumente stehen in [`docs/generatoren/`](../generatoren/) und sind am
Ende verlinkt.

---

## 1. Was sind Generatoren und wie werden sie ausgeführt?

Generatoren sind **Build-Skripte**, die aus den redaktionellen Quellen (TypeScript-
Datenmodule in `src/lib/*.ts`, Markdown unter `docs/skripte/**` und `docs/ebook/`,
JSON-Specs unter `tools/workshop/specs/` sowie fest im Skript hinterlegten Inhalten)
fertige **Artefakte** erzeugen: PDFs (E-Book, Buch, Mitglieder-Dokumente, Drehbücher,
Anleitungen), **Bilder/Marketing-Assets** (PNG/WebP), **Print-/Geschäftsausstattung**
(PDF, DOCX, HTML-Signatur) sowie **Folien/Präsentationen** (PPTX für Video-Einblendungen
und Workshops).

Es gibt zwei Aufruf-Arten:

- **npm-Scripts** (`package.json` → `scripts`): der Regelfall, z. B. `npm run pdf`.
  Node-Generatoren laufen über `node …`, einige Folien-/PDF-Generatoren über
  `python3 …` (in `scripts` bereits so hinterlegt, z. B. `video-folien` und
  `buchcover`).
- **Direkte Aufrufe** ohne npm-Script: manche Generatoren startet man von Hand,
  z. B. `python3 tools/pdf/build-ebook-gedanken.py` oder
  `node tools/pdf/anleitung-stripe.mjs [zielordner]`. Viele akzeptieren ein
  optionales **Ausgabe-Verzeichnis als erstes Argument** (`process.argv[2]`).

**Technische Grundlagen**

- **Node** (ESM) für alle `.mjs`-Generatoren; **Python 3** für die `.py`-Skripte.
- **Chromium/Chrome** für alle Skripte, die HTML zu PDF/PNG rendern. Gesucht wird
  einheitlich über `findChrome()`: `CHROME_BIN` → Playwright-Chromium →
  `PLAYWRIGHT_BROWSERS_PATH` bzw. `/opt/pw-browsers` → System-`chromium`/`chrome`.
  In dieser Umgebung ist Chromium unter `/opt/pw-browsers` vorinstalliert.
- **npm-Pakete:** `playwright` (Chromium-Pfad/Screenshots), `pdf-lib` (PDF-Merge in
  `generate.mjs`), `sharp` (WebP/Galerie, Bild-Freistellung), `docx` (Word-Vorlage),
  `typescript` (TS→JSON in `extract-content.mjs`).
- **Python-Pakete:** `python-pptx` + `Pillow` (Workshop- und Video-Folien),
  `pymupdf`/`fitz` (nur `buchcover-png.py`, PDF→PNG). Die E-Book-/Buch-/Member-/
  Brandbook-Python-Skripte nutzen sonst nur die Standardbibliothek.
- **System-Binaries:** `zip`/`unzip` (nur Galerie-Build).
- **Env-Schalter** (häufig): `CHROME_BIN`, `PLAYWRIGHT_BROWSERS_PATH`, `KEEP_HTML`
  (temporäres HTML behalten), `SCALE` (Auflösungsfaktor bei Marketing-Rendern),
  `THEME`/`ONLY` (Teilmengen), `REPO_ROOT`/`BUILD_DIR` (Python-Pipelines).
- Website-Secrets aus `.env.local.example` (Supabase, Resend, Stripe) betreffen
  **nur die Runtime**, nicht die Generatoren.

---

## 2. Übersichtstabelle (aus `package.json` + direkte Aufrufe)

### npm-Scripts

| npm-Script | Skript-Datei | Erzeugt | Ausgabe-Verzeichnis |
|---|---|---|---|
| `npm run pdf` | `tools/pdf/generate.mjs` (+ `extract-content.mjs`, `build-ebook.py`, `build-member.py`) | Gratis-E-Book „7 Stufen" + alle Mitglieder-PDFs (Lektionen, Übungen, Vertiefungen, Arbeitsheft) | `public/Die-7-Stufen-…​.pdf`, `content/pdf/*.pdf` |
| `npm run pdf:brandbook` | `tools/pdf/build-brandbook.mjs` (+ `build-brandbook.py`) | Brandbook als PDF | `docs/brandbook/WMDG-Brandbook.pdf` |
| `npm run pdf:buch` | `tools/pdf/build-buch.mjs` (+ `build-buch.py`) | Vollständiges Buch „Werde Meister deiner Gedanken" (5 Teile, 24 Kapitel) als PDF | `content/pdf/Werde-Meister-deiner-Gedanken.pdf` |
| `npm run buchcover` | `tools/pdf/buchcover-png.py` | Buch-Titelseite als PNG (A4 @ 300 dpi) | `content/pdf/Werde-Meister-deiner-Gedanken-Cover.png` |
| `npm run reel-drehbuch` | `tools/pdf/reel-drehbuch.mjs` | Reel-Drehbücher (5 Serien + „Alle Serien") als PDF | `docs/workshop/reel-skripte/` |
| `npm run langvideo-drehbuch` | `tools/pdf/langvideo-drehbuch.mjs` | Langvideo-Drehbücher „Ablesen" + „Stichpunkt" | **Projekt-Root** (Default) |
| `npm run willkommen-skript` | `tools/pdf/willkommen-skript.mjs` | Willkommensvideo-Skript (Dashboard) als PDF | `docs/skripte/willkommen/` |
| `npm run videoskripte-md` | `tools/pdf/videoskripte-markdown.mjs` | Videoskripte als gebündelte Markdown-Dateien | `docs/skripte/videoskripte/` |
| `npm run video-folien` | `tools/video/foliensatz.py` | **7 PowerPoint-Decks** (On-Screen-Folien für Videos: 1× 16:9-Langvideo, 1× Teaser-Reel, 5× Reel-Serien) | `docs/video/` |
| `npm run covers` | `docs/reels/covers/build.mjs` | Reel-/Feed-Cover als gebrandetes HTML (5 Formate) | `docs/reels/covers/**` |
| `npm run covers:png` | `docs/reels/covers/export-png.mjs` | Cover-PNGs **+** transparente Overlay-Ebenen (Chromium) | `docs/reels/covers/export/**`, `…/export-overlay/**` |
| `npm run carousels:slides` | `docs/carousels/build.mjs` | Carousel-Slides als HTML (3 Formate) | `docs/carousels/build/**` |
| `npm run carousels:png` | `docs/carousels/export-png.mjs` | Carousel-PNGs **+** Overlay-Ebenen (baut vorab selbst neu) | `docs/carousels/export/**`, `…/export-overlay/**` |
| `npm run endcard` | `docs/reels/covers/endcard.mjs` | Outro-/Endcards (nur HTML/CSS, kein PNG) | `docs/reels/covers/endcard/` |
| `npm run brand-assets` | `docs/marketing/brand-assets.mjs` | Marken-Assets: Profil/Avatar, Kanalbilder, YouTube-Thumbnails, Zitat-/Studien-Kacheln, E-Book-Post, Story (mehrere Formate) — **`SCALE=2` verwenden** | `docs/marketing/**` |
| `npm run story-overlays` | `tools/marketing/story-overlays.mjs` | Titel-Overlays „Persönliche Geschichten" (transparent + Marken-Hintergrund, 3 Formate) | `docs/marketing/story-overlays/**` |
| `npm run story-carousels` | `tools/marketing/story-carousels.mjs` | Komplette Bild-Geschichten (Titel-Overlay + Body-/CTA-Slides) | `docs/marketing/story-carousels/**` |
| `npm run content-overlays` | `tools/marketing/content-overlays.mjs` | Overlays für „Zitate" & „Studien-Fakten" (transparent + Hintergrund, 3 Formate) | `docs/marketing/content-overlays/**` |
| `npm run whatsapp:mitgliedschaft` | `tools/marketing/whatsapp-mitgliedschaft.mjs` | WhatsApp-Verkaufsserie (7 Folien, 4:5 + 9:16, Overlay + Hintergrund) | `docs/marketing/whatsapp-mitgliedschaft/**` |
| `npm run whatsapp:safezone` | `docs/marketing/whatsapp-safezone.mjs` | WhatsApp-Business-Banner mit eingezeichneter Safe-Zone (1920×1080) | `docs/marketing/**` |
| `npm run marketing:all` | Orchestrator | Kette: `brand-assets` → `content-overlays` → `story-overlays` → `story-carousels` → `whatsapp:mitgliedschaft` → `vorlagen:galerie` | s. o. + `content/vorlagen/` |
| `npm run vorlagen:galerie` | `tools/vorlagen/build-gallery.mjs` (+ `marketing-carousels.mjs`, `bild-jobs.mjs`) | Baut die Admin-Galerie neu: webp/ZIP + Katalog (**destruktiv**) | `content/vorlagen/**`, `src/lib/vorlagen-assets.ts` |
| `npm run gold-emblem` | `tools/print/gold-emblem.mjs` (+ Kette `logo-lockup.mjs`) | Optimiertes Gold-Emblem fürs Einbetten (240 px) | `public/email/wmdg-signatur-logo.png` |
| `npm run logo-lockup` | `tools/print/logo-lockup.mjs` | Volles Logo-Lockup (Emblem + Wortmarke, echter Verlauf) als transparentes PNG | `public/email/wmdg-logo-lockup.png` |
| `npm run print` | `tools/print/geschaeftsausstattung.mjs` | Visitenkarte (2-seitig) + Briefpapier (leer + Muster) als druckfertige PDFs + Vorschau-PNGs | `tools/print/out/` |
| `npm run signatur` | `tools/print/email-signatur.mjs` | E-Mail-Signatur: Anleitungsseite, hell/dunkel-Snippets, Text-Fallback, Vorschau-PNGs | `tools/print/out/` |
| `npm run briefpapier:word` | `tools/print/briefpapier-word.mjs` | Briefpapier als beschreibbare Word-Vorlage | `tools/print/out/WMDG-Briefpapier-Vorlage.docx` |

### Nur direkt aufrufbar (kein npm-Script)

| Aufruf | Skript-Datei | Erzeugt | Ausgabe-Verzeichnis |
|---|---|---|---|
| `python3 tools/pdf/build-ebook.py` | `build-ebook.py` | HTML des Gratis-E-Books (wird von `generate.mjs` gerendert) | `tools/pdf/.build/ebook.html` |
| `python3 tools/pdf/build-ebook-gedanken.py` | `build-ebook-gedanken.py` | HTML des 2. E-Books „Die Gedanken, die nicht deine sind" (PDF-Schritt manuell) | `tools/pdf/.build/ebook-gedanken.html` |
| `node tools/pdf/carousel-texte.mjs [ziel]` | `carousel-texte.mjs` | Carousel-Texte je Serie als PDF + „Alle Serien" | `docs/workshop/carousel-texte/` (Default) |
| `node tools/pdf/intro-video-drehbuch.mjs [ziel]` | `intro-video-drehbuch.mjs` | Intro-/Teaser-Video-Drehbuch als PDF | **Projekt-Root** (Default) |
| `node tools/pdf/anleitung-stripe.mjs [ziel]` | `anleitung-stripe.mjs` | Anleitung „Stripe-Mitgliedschaft einrichten" als PDF | `docs/workshop/anleitungen/` (Default) |
| `node tools/pdf/praxis-sprecherskript.mjs [ziel]` | `praxis-sprecherskript.mjs` (+ `praxis-skripte-data.mjs`) | 13 Sprecher-Skripte „Praxis mit Stimme" + Gesamtmappe + Aufnahme-Leitfaden als PDF | `docs/mitglieder/sprecherskripte/` (Default) |
| `python3 tools/pdf/build-reel-skripte.py` | `build-reel-skripte.py` | „Reel-Skripte · Die 7 Stufen" als HTML (Web + Print-HTML mit eingebetteten Fonts) | `docs/skripte/reels/reel-skripte-7-stufen.html`, `.build/…print.html` |
| `node docs/marketing/social-banners.mjs` | `social-banners.mjs` | Kanal-Banner (YouTube, Facebook, Instagram-Story) | `docs/marketing/**` |
| `node docs/marketing/video-thumbnails.mjs` | `video-thumbnails.mjs` | 16:9-Thumbnails je Inhalt (Titel live aus TS) | `public/video-thumbnails/**` |
| `SCALE=2 node docs/carousels/marketing-serien.mjs` | `marketing-serien.mjs` | 5 Marketing-Carousels (HTML + PNG in einem Lauf) | `docs/carousels/export/<serie>/**` |
| `node docs/carousels/stufen-ueberblick.mjs` | `stufen-ueberblick.mjs` | 9-Slide-Carousel „Die 7 Stufen deiner Meisterschaft" | `docs/carousels/export/stufen-ueberblick/**` |
| `node tools/marketing/personal-brand.mjs` | `personal-brand.mjs` | Persönliche Marken-Grafik (freigestelltes Foto auf Marken-Hintergrund) | `docs/marketing/personal/**` |
| `node tools/vorlagen/marketing-carousels.mjs` | `marketing-carousels.mjs` | Marketing-Carousels **non-destruktiv** in die Galerie (Standalone-Modus) | `content/vorlagen/carousels/marketing__*` |
| `node tools/images/eisvogel-transparent.mjs [src] [ziel]` | `eisvogel-transparent.mjs` | Eisvogel freistellen → transparentes WebP (Footer) | `public/eisvogel-gold.webp` (Default) |
| `node tools/images/schneeleopard-webp.mjs [src] [ziel]` | `schneeleopard-webp.mjs` | Schneeleopard trimmen/verkleinern → transparentes WebP (Footer) | `public/schneeleopard.webp` (Default) |
| `python3 tools/workshop/build.py <spec.json> …` | `tools/workshop/build.py` | Pro Spec: **Workshop-PPTX (16:9)** + Workbook-PDF + Moderationsplan-PDF | `docs/workshop/<slug>/` (+ Spiegel `content/vorlagen/workshop/`) |

**Reine Datenmodule / Helfer** (kein eigener Lauf, werden importiert):
`tools/pdf/praxis-skripte-data.mjs`, `tools/pdf/extract-content.mjs` (via `generate.mjs`),
`tools/print/marke.mjs` (Kontakt-/Markendaten, Single Source of Truth für `tools/print/*`),
`tools/vorlagen/bild-jobs.mjs` (Parallelität + WebP-Optionen für den Galerie-Build),
`docs/marketing/content-data.mjs` (Zitate/Fakten), `docs/reels/covers/data.mjs`,
`docs/carousels/data.mjs`, `docs/_glyphs.mjs` (gezeichnete Sonderzeichen →/≠/⋯).

---

## 3. Generatoren nach Kategorie

### 3.1 PDF-Generatoren (`tools/pdf/`)

Gemeinsam: HTML → Headless-Chromium `--print-to-pdf`; Chromium via `findChrome()`;
Zwischen-HTML in `tools/pdf/.build/` (git-ignoriert); Schriften Fraunces/Inter
eingebettet aus `tools/pdf/assets/fonts.css`.

- **`generate.mjs` — Haupt-Pipeline (`npm run pdf`).**
  Orchestriert `extract-content.mjs` (TS → `.build/content.json` via `typescript`),
  `build-ebook.py` und `build-member.py`, rendert deren HTML zu PDF und **mergt**
  das Arbeitsheft (Cover + Innenteil) mit `pdf-lib`.
  Datenquelle: `src/lib/{content,stage-lessons,deep-dives}.ts` (für die Mitglieder-
  PDFs); das E-Book selbst trägt seine Texte fest im Skript.
  Ausgabe: `public/Die-7-Stufen-der-Bewusstseinsentwicklung.pdf` (Lead-Magnet) und
  `content/pdf/*.pdf` (`stufe-1..7-lektion`, `stufe-1..7-uebungen`,
  `vertiefung-<slug>`, `arbeitsheft`). Mitglieder-PDFs bewusst nach `content/pdf/`
  (Login-Schutz), nicht `public/`.
  Voraussetzungen: Node, Python 3, Chromium, `pdf-lib`, `playwright`, `typescript`;
  Assets `public/logo-brain.png`, `public/heiko-portrait.webp`,
  `assets/brain-freigestellt.png`.

- **`build-ebook.py` — Gratis-E-Book „7 Stufen".** Erzeugt das HTML (bewusst
  gekürzte Fassung, Texte fest im Skript in `STAGES_FULL`/`COVER`/…). Läuft über
  `npm run pdf`. Nur Python-Stdlib.

- **`build-ebook-gedanken.py` — E-Book „Die Gedanken, die nicht deine sind".**
  Inhalt aus Markdown (`docs/ebook/die-gedanken-die-nicht-deine-sind.md`, per Env
  `EBOOK_MD` überschreibbar). **Kein npm-Script, nicht in `generate.mjs`** — HTML
  danach separat zu PDF rendern.

- **`build-buch.py` + `build-buch.mjs` — Vollständiges Buch (`npm run pdf:buch`).**
  Quelle ausschließlich `docs/ebook/werde-meister-deiner-gedanken.md` (reine
  Leserfassung; `docs/ebook/intern/` ist bewusst ausgeschlossen). Aufbau: Titelseite,
  Autoren-Hinweis, generiertes Inhaltsverzeichnis, Teil-Trennseiten, Kapitel,
  Schlusswort, Anhang. Ausgabe `content/pdf/Werde-Meister-deiner-Gedanken.pdf`.
  Nutzt `tools/pdf/assets/cover-treppe.png` als Cover-Motiv, sonst Fallback auf das
  goldene Gehirn.

- **`buchcover-png.py` — Buchcover als PNG (`npm run buchcover`).**
  Stellt via `build-buch.py` das Buch-HTML sicher, löst die `<section class="cover">`
  heraus, rendert sie als 1-seitige A4-PDF und rastert sie mit **PyMuPDF** zu PNG
  (`content/pdf/…-Cover.png`, 2479×3508 @ 300 dpi; DPI per Env `BUCHCOVER_DPI`).
  Zusätzliche Voraussetzung: `pip install pymupdf`.

- **`build-brandbook.py` + `build-brandbook.mjs` — Brandbook (`npm run pdf:brandbook`).**
  Erzeugt das Brandbook im Mitglieder-PDF-Design (Deckblatt, Inhaltsverzeichnis,
  ein Kapitel je Abschnitt). Ausgabe `docs/brandbook/WMDG-Brandbook.pdf`. Assets:
  `public/logo-brain-gold.png`, `public/logo-full.png`, `fonts.css`.

- **`build-member.py` — Mitglieder-Dokumente.** Baut aus `.build/content.json` das
  HTML aller Lektionen/Übungen/Vertiefungen + Arbeitsheft-Cover/-Innenteil und ein
  `m-manifest.json`. Läuft über `npm run pdf`. Verlangt genau eine Lesson je
  Stage-`number`.

- **`reel-drehbuch.mjs` — Reel-Drehbücher (`npm run reel-drehbuch [ziel]`).**
  Bündelt 5 Serien (Tokens: `7-Stufen`, `Praxis`, `Vertiefungen`,
  `Mentale-Selbstverteidigung`, `Wissenschaft`) + „Alle-Serien" zu PDFs.
  Quelle: `docs/skripte/reels/*.md`. Default-Ausgabe `docs/workshop/reel-skripte/`.

- **`carousel-texte.mjs` — Carousel-Texte als PDF** (kein npm-Script).
  Quelle: `docs/skripte/carousels/{stufen,praxis,vertiefungen,selbstverteidigung}.md`
  (`marketing.md` **nicht**). Default-Ausgabe `docs/workshop/carousel-texte/`.

- **`langvideo-drehbuch.mjs` — Langvideo-Drehbücher (`npm run langvideo-drehbuch [ziel]`).**
  Zwei PDFs „Ablesen" (Teleprompter) und „Stichpunkt". Quelle: `docs/skripte/`
  (`stufen-komplett/`, `praxis/`, `vertiefungen-komplett/` bzw. `stufen/`,
  `vertiefungen/`). **Default-Ausgabe: Projekt-Root** — für die Galerie ein
  `docs/workshop/`-Ziel übergeben.

- **`intro-video-drehbuch.mjs` — Intro-/Landing-Video** (kein npm-Script).
  Quelle: `docs/skripte/landing/{intro,reel}-nicht-deine-schuld.md`. Ausgabe
  `WMDG-Video-Drehbuch-Intro.pdf`, **Default: Projekt-Root**.

- **`willkommen-skript.mjs` — Willkommensvideo (`npm run willkommen-skript [ziel]`).**
  Text 1:1 aus `docs/skripte/willkommen/dashboard-willkommen.md`. Ausgabe
  `Willkommensvideo-Dashboard.pdf` in `docs/skripte/willkommen/` (Default).

- **`praxis-sprecherskript.mjs` — „Praxis mit Stimme"** (kein npm-Script).
  13 Einzel-PDFs + Gesamtmappe + Aufnahme-Leitfaden. Datenquelle
  `praxis-skripte-data.mjs` (gesprochene Fassung der 13 Übungen aus
  `src/lib/practices.ts`). Default-Ausgabe `docs/mitglieder/sprecherskripte/`
  (Unterordner `einzel/`).

- **`videoskripte-markdown.mjs` — Videoskripte als Markdown (`npm run videoskripte-md [ziel]`).**
  Bündelt dieselben Quellen wie die Video-Drehbuch-PDFs zu je einer zusammen-
  hängenden `.md`. Default-Ausgabe `docs/skripte/videoskripte/`. Kein Chromium
  (reines Markdown).

- **`build-reel-skripte.py` — Reel-Skripte-Heft** (kein npm-Script).
  Quelle `tools/pdf/assets/reel-source.html` (`<main>`-Block der 21 Reels). Erzeugt
  eine Web-HTML (`docs/skripte/reels/reel-skripte-7-stufen.html`, Google-Fonts) und
  eine Print-HTML mit eingebetteten Fonts in `.build/`; PDF danach per Chromium.

- **`anleitung-stripe.mjs` — Stripe-Anleitung** (kein npm-Script).
  Ein gebrandetes PDF, Inhalt inline; nutzt `ARROW`/`DOTS` aus `docs/_glyphs.mjs`.
  Default-Ausgabe `docs/workshop/anleitungen/` (Galerie nimmt es im Workshop-Tab auf).

### 3.2 Marketing-Assets (`tools/marketing/` + `docs/marketing/`)

Zwei Familien: **Overlay-Renderer** in `tools/marketing/` (erzeugen transparente
Text-Ebenen + passenden Marken-Hintergrund zum Unterlegen eigener Fotos in Canva)
und **Bild-Renderer** in `docs/marketing/` (fertige PNGs). Alle rendern per
Playwright/Chromium.

- **`tools/marketing/story-overlays.mjs` (`npm run story-overlays`)** — Titel-Overlays
  „Persönliche Geschichten"; Texte inline (`STORIES`). Ausgabe
  `docs/marketing/story-overlays/<format>/*.png`.
- **`tools/marketing/content-overlays.mjs` (`npm run content-overlays`)** — Overlays
  für „Zitate"/„Studien-Fakten"; Daten aus `docs/marketing/content-data.mjs`.
  Ausgabe `docs/marketing/content-overlays/<serie>/<format>/*.png`.
- **`tools/marketing/story-carousels.mjs` (`npm run story-carousels`)** — komplette
  Bild-Geschichten (Titel-Overlay + Body-/CTA-Slides); Texte inline (`STORIES`).
  Ausgabe `docs/marketing/story-carousels/<slug>/<format>/`.
- **`tools/marketing/whatsapp-mitgliedschaft.mjs` (`npm run whatsapp:mitgliedschaft`)**
  — 7-teilige Verkaufsserie (Hook → Problem → 7 Stufen → Inhalte → Ablauf → Preis →
  CTA) in 4:5 + 9:16, mit Overlay- und Hintergrund-Ebenen; vier Farbwelten (Env
  `THEME`). Texte inline (`SLIDES`). Ausgabe `docs/marketing/whatsapp-mitgliedschaft/`.
- **`tools/marketing/personal-brand.mjs`** (kein npm-Script) — freigestelltes Foto
  auf Marken-Hintergrund. Eingabe `docs/marketing/_input/portrait.png` (bzw. Env
  `PORTRAIT`, Fallback `public/heiko-hero.webp`). Env `SCALE`, `THEME`. Ausgabe
  `docs/marketing/personal/`.
- **`docs/marketing/brand-assets.mjs` (`npm run brand-assets`)** — Profil/Avatar,
  Kanalbild, YouTube-Thumbnails, Zitat-/Studien-Kacheln, E-Book-Post, Story.
  Zitate/Fakten aus `docs/marketing/content-data.mjs`. **`SCALE=2` ist Pflicht**
  (Default 1 halbiert die Assets stillschweigend); Teilmenge via `ONLY`.
- **`docs/marketing/social-banners.mjs`** (kein npm-Script) — Kanal-Banner
  (YouTube/Facebook/Instagram-Story), Inhalte inline; `@2x` bei `retina`.
- **`docs/marketing/video-thumbnails.mjs`** (kein npm-Script) — 16:9-Thumbnails,
  Titel live aus `src/lib/{content,deep-dives,practices}.ts`; Ausgabe nach
  `public/video-thumbnails/` (direkt als Video-Poster).
- **`docs/marketing/whatsapp-safezone.mjs` (`npm run whatsapp:safezone`)** —
  Business-Banner mit eingezeichneter Safe-Zone (1920×1080).

> Sonderzeichen: `→`, `≠`, `⋯` fehlen im eingebetteten Schrift-Subset und kommen
> als Inline-SVG aus `docs/_glyphs.mjs` — nie als Textzeichen ins gerenderte Markup.

### 3.3 Print / Geschäftsausstattung (`tools/print/`)

Kontakt-/Markendaten zentral in `tools/print/marke.mjs` (Single Source of Truth;
`CONTACT.phone = ""` blendet die Telefonzeile überall aus). Rendering via
Playwright/Chromium, Schriften aus `tools/pdf/assets/fonts.css`, Emblem aus
`public/logo-brain-gold.png`. Ausgabe durchweg nach `tools/print/out/`.

- **`geschaeftsausstattung.mjs` (`npm run print`)** — Visitenkarte (2-seitig,
  85×55 mm + 3 mm Beschnitt, Schnittmarken) + Briefpapier (leer + Muster) als
  Vektor-PDFs (Merge via `pdf-lib`) + Vorschau-PNGs.
- **`email-signatur.mjs` (`npm run signatur`)** — Anleitungsseite, hell/dunkel-
  Snippets, `.txt`-Fallback, Vorschau-PNGs. Logo als gehostetes Bild
  (`…/email/wmdg-signatur-logo.png`, erst nach Deploy erreichbar). Websichere
  Schriften, Inline-Styles.
- **`briefpapier-word.mjs` (`npm run briefpapier:word`)** — beschreibbare
  `.docx`-Vorlage (`docx`-Paket) mit wiederkehrendem Kopf/Fuß; Logo als Bild aus
  `public/email/wmdg-logo-lockup.png`.
- **`gold-emblem.mjs` (`npm run gold-emblem`)** — optimiertes 240-px-Gold-Emblem
  aus `public/logo-brain-gold-freigestellt.png` (via `sharp`) →
  `public/email/wmdg-signatur-logo.png`.
- **`logo-lockup.mjs` (`npm run logo-lockup`)** — volles Logo-Lockup (Emblem +
  Wortmarke mit echtem Verlauf) als transparentes PNG →
  `public/email/wmdg-logo-lockup.png` (fürs Einbetten in Word).

> Bei geändertem Basis-Emblem einmal `npm run gold-emblem` und danach
> `npm run logo-lockup` laufen lassen.

### 3.4 Bilder (`tools/images/`)

Reine `sharp`-Skripte (kein Chromium). Beide akzeptieren `[quelle] [ziel]` als
Argumente.

- **`eisvogel-transparent.mjs`** — stellt den goldenen Eisvogel per Flood-Fill frei
  (nur zusammenhängendes Randweiß) → `public/eisvogel-gold.webp`.
- **`schneeleopard-webp.mjs`** — trimmt/verkleinert das bereits transparente
  Schneeleopard-PNG → `public/schneeleopard.webp`. Das 11-MB-Quell-PNG liegt
  bewusst nicht mehr im Repo; zum Neubau die Quelle wieder bereitstellen.

### 3.5 Vorlagen-Galerie (`tools/vorlagen/`)

- **`build-gallery.mjs` (`npm run vorlagen:galerie`)** — baut die Admin-Galerie
  `/admin/vorlagen` **komplett neu**: sammelt fertige Dateien aus `docs/**`
  (Social-PNGs, Reel-Cover, Carousels, Overlays, Workshop-PPTX/PDF), wandelt sie via
  `sharp` in webp/ZIP, schreibt nach `content/vorlagen/**` und erzeugt den Katalog
  `src/lib/vorlagen-assets.ts`. **Destruktiv** (löscht `content/vorlagen/` zu Beginn).
  Voraussetzungen: `sharp`, `zip`/`unzip` (kein Chromium). Nutzt `bild-jobs.mjs`
  (begrenzte Parallelität, alpha-bewusste WebP-Optionen) und `marketing-carousels.mjs`.
  > Läuft ein Schritt ohne vorbefüllte Quellordner (z. B. `docs/carousels/export/`
  > existiert erst nach `carousels:png`), trägt er **still 0 Einträge** ein.
- **`marketing-carousels.mjs`** — zwei Modi: importiert vom Vollbau **oder**
  standalone (`node …`) **non-destruktiv/idempotent** (nur `marketing__*` neu). Liest
  `docs/carousels/export/<key>/**` + Captions aus `docs/skripte/`.
- **`bild-jobs.mjs`** — Helfer-Modul (Warteschlange `MAX_JOBS`/`GALERIE_JOBS`,
  `webpOpts()`).
- **Server-Deploy:** `tools/deploy/update-vorlagen-galerie.sh` baut die Galerie auf
  dem Server so, dass vorhandene Reels/Carousels im Volume `/opt/website-vorlagen`
  **erhalten** bleiben (nicht einfach `npm run vorlagen:galerie` auf dem Server).

### 3.6 Video-Folien (`tools/video/foliensatz.py`) — **Folien/Präsentationen**

`npm run video-folien` (= `python3 tools/video/foliensatz.py`). Erzeugt die
**On-Screen-Einblendungen** für die Videos als editierbare PowerPoint im hellen
**Creme-Branding** der Drehbücher. Reine PPTX-Erzeugung (`python-pptx` + `Pillow`),
**kein Chromium/Node**. Idempotent — bei Skript-Änderung neu ausführen.

Sieben Decks in `docs/video/`:

| Datei | Format | Inhalt |
|---|---|---|
| `WMDG-Video-Folien.pptx` | 16:9 | Langvideos: pro Stufe Titel + Merksatz, pro Praxis Titel, pro Vertiefung Titel + Merksatz, 16× Mentale Selbstverteidigung Titel + Merksatz, plus Cover/Trenner |
| `WMDG-Video-Folien-Reel.pptx` | 9:16 | Teaser-Reel „Nicht deine Schuld" |
| `WMDG-Video-Folien-Reels-7-Stufen.pptx` | 9:16 | Reel-Serie „Die 7 Stufen" |
| `WMDG-Video-Folien-Reels-Vertiefungen.pptx` | 9:16 | Reel-Serie „Vertiefungen" |
| `WMDG-Video-Folien-Reels-Praxis.pptx` | 9:16 | Reel-Serie „Praxis-Übungen" |
| `WMDG-Video-Folien-Reels-Wissenschaft.pptx` | 9:16 | Reel-Serie „Die Wissenschaft dahinter" |
| `WMDG-Video-Folien-Reels-Selbstverteidigung.pptx` | 9:16 | Reel-Serie „Wie dein Denken gelenkt wird" |

Datenquelle → Folie: dieselben Markdown-Skripte wie die Drehbücher
(`docs/skripte/stufen-komplett/`, `praxis/`, `vertiefungen-komplett/`, `landing/`,
`reels/`). Folientexte werden aus den `[Regie]`-Einblende-Cues bzw. Merksätzen
gezogen. Neue Reel-Serie = einen Eintrag in `REEL_SERIES` ergänzen. Font-Namen
`Fraunces`/`Inter` werden referenziert, aber nicht eingebettet — fehlen sie, ersetzt
PowerPoint sie (Layout/Farben/Text bleiben korrekt). Logo:
`tools/pdf/assets/brain-freigestellt.png`.

### 3.7 Workshop-Präsentationen / Folien (`tools/workshop/`) — **Folien/Präsentationen**

`python3 tools/workshop/build.py <spec.json> [<spec2.json> …]` (Spec-Auswahl nur über
Positions-Argumente; ohne Argument Exit-Code 1). Pro Spec entstehen **drei**
gebrandete Artefakte unter `docs/workshop/<slug>/`:

- `WMDG-Workshop-<fileStem>.pptx` — editierbare PowerPoint (16:9, mit Sprecher-Notizen)
- `WMDG-Workbook-<fileStem>.pdf` — Teilnehmer-Workbook (A4)
- `WMDG-Moderationsplan-<fileStem>.pdf` — Ablauf-/Moderationsplan (A4)

Alle drei werden zusätzlich nach `content/vorlagen/workshop/` gespiegelt (überschreibt
gleichnamige Dateien). Voraussetzungen: Python 3, `python-pptx`, `Pillow`,
`playwright` (für die PDF-Rendering-Schritte). Chromium: fest gesuchter Pfad
`/opt/pw-browsers/chromium-1194/chrome-linux/chrome`, sonst Playwright-Standard.
Schriften: PPTX referenziert Cambria/Calibri (System), die PDFs betten Fraunces/Inter
aus `tools/pdf/assets/fonts.css` ein (wird beim Import gelesen — muss existieren).
Bilder fest aus `tools/workshop/assets/` (`bg-title.png`, `bg-divider.png`,
`brain.png`, `circle.png`). Ausgabeort ergibt sich aus `slug`/`fileStem` **in der
Spec**, nicht aus dem Argument-Dateinamen.

**Foliensatz (fixe Reihenfolge):** Titel → Agenda → Kernbotschaft → Ausgangspunkt/
Kennzahl → Übung 1 → Kapitel-Divider → Themen-Überblick → **je eine Folie pro
`module`-Eintrag** → Übung 2 → Zusammenfassung → Angebot → Abschluss.
Folienzahl = **11 feste Folien + 1 Folie je `module`**.

**Spec-Format (`specs/*.json`).** Ein einzelnes JSON-Objekt; alle vier Specs teilen
exakt dasselbe Schema. Keine Bildpfade in der Spec (Bilder fest verdrahtet).
Nummerierungen entstehen automatisch (Array-Indizes bzw. `badge`). Fehlt `notes`,
setzt der Code je Folientyp einen deutschen Standard-Notiztext.

- **Top-Level-Metadaten (Strings):** `slug`, `fileStem`, `eyebrow`, `title1`,
  `title2` (teal akzentuiert), `subtitle`, `author`, `format`, `dauer`, `gruppe`,
  `leitung`.
- **Inhalts-Blöcke (je ein Slide-Typ):** `agenda` (Array `{title, desc}`),
  `kernbotschaft` (`{pre, accent, post, tail?}`), `ausgangspunkt`
  (`{kicker, title, p1, p2, metricPre, metric, metricLabel, metricNote}`),
  `uebung1`/`uebung2` (`{kicker, title, steps[], mitnehmen}`), `kapitelIntro`
  (`{kicker, title, subtitle}`), `landkarte` (`{kicker, title, items[]}`),
  `module` (Array `{badge, title, sub, body, reflexion}` — bestimmt die Folienzahl),
  `zusammenfassung` (`{kicker, title, items[]}`), `angebot`
  (`{kicker, title, features[], preis, preisSuffix, url, note}`), `abschluss`
  (`{pre, accent, post, thanks, url}`). Jeder Block erlaubt optional `notes`.
- **Nur für die PDFs:** `workbook`
  (`{coverSubtitle, intro:{body, grundKicker, grundText}, sections[]}`; `section` =
  `{kicker, title, body, uebungKicker?, steps?[], prompt, lines}`) und `moderation`
  (`{ziel[], material[], ablauf[]}`; `ablauf`-Zeile =
  `{time, dur, block, what, material?, pause?}`, `pause:true` färbt die Zeile grün).
- Fehlt ein von `build_pptx` erwarteter Key → `KeyError`.

**Die vier vorhandenen Specs:**

| Spec | slug | Thema (title1 — title2) | Format | Module | Folien |
|---|---|---|---|:---:|:---:|
| `journal.json` | `journal` | Die Kraft der Reflexion — Journaling-Halbtag | Halbtag | 7 | 18 |
| `wissensdatenbank.json` | `wissensdatenbank` | Dein Gehirn verstehen — Wissensreise | Ganztag | 10 | 21 |
| `blog.json` | `blog` | Deinen Kopf durchdenken — Blog & Deep-Dives | Ganztag | 11 | 22 |
| `bewusstseinstest.json` | `bewusstseinstest` | Wo stehst du gerade? — Bewusstseinstest | Halbtag | 7 | 18 |

### 3.8 Bild-Studios (`docs/carousels/`, `docs/reels/covers/`)

Werden über npm-Scripts (`covers`, `covers:png`, `carousels:slides`, `carousels:png`,
`endcard`) aus `package.json` mitbetrieben und speisen die Vorlagen-Galerie. Details
in [`visual-generatoren.md`](../generatoren/visual-generatoren.md):
Cover-Studio (inline-Daten in `data.mjs`, 6 Bereiche × 5 Formate) und Carousel-Studio
(MD-basiert, 4 Serien × 3 Formate). `covers:png`/`carousels:png` erzeugen im selben
Lauf zusätzlich transparente **Overlay-Ebenen** (`export-overlay/`).

---

## 4. Ausgabe-Verzeichnisse

| Zielordner | Inhalt | Versioniert? |
|---|---|---|
| `public/` | Öffentlicher Lead-Magnet `Die-7-Stufen-…​.pdf`; `video-thumbnails/`; freigestellte Bilder (`eisvogel-gold.webp`, `schneeleopard.webp`); `email/*` (Emblem/Lockup) | ja |
| `content/pdf/` | Login-geschützte PDFs: 14 Stufen-PDFs, `arbeitsheft.pdf`, 29 `vertiefung-*.pdf`, das Buch-PDF + `…-Cover.png`; zusätzlich eine Kopie des 7-Stufen-E-Books | ja |
| `content/vorlagen/` | Admin-Galerie (webp/ZIP/pptx/pdf) — **git-ignoriert**, liegt auf dem Server unter `/opt/website-vorlagen`; im frischen Clone leer | **nein** |
| `docs/brandbook/` | `WMDG-Brandbook.pdf` (+ Brandbook-Markdown) | ja |
| `docs/workshop/<slug>/` | Workshop-PPTX + Workbook-/Moderations-PDF | ja |
| `docs/workshop/{reel-skripte,carousel-texte,anleitungen}/` | Reel-Drehbücher, Carousel-Texte, Stripe-Anleitung (PDF) | ja |
| `docs/video/` | 7 Video-Folien-PPTX (16:9 + 9:16) | ja |
| `docs/marketing/**` | Marketing-PNGs + Overlays (`story-overlays/`, `story-carousels/`, `content-overlays/`, `whatsapp-mitgliedschaft/`, `personal/`, Kanal-Ordner) | ja |
| `docs/carousels/{build,export,export-overlay}/` | Carousel-HTML (`build`, versioniert) + PNG-Exporte (**git-ignoriert**) | teils |
| `docs/reels/covers/{export,export-overlay}/` | Cover-PNG-Exporte (**git-ignoriert**); HTML/Galerie versioniert | teils |
| `docs/skripte/{videoskripte,willkommen,reels}/` | gebündelte Video-Markdown, Willkommens-PDF, Reel-Skripte-HTML | ja |
| `docs/mitglieder/sprecherskripte/` | „Praxis mit Stimme"-PDFs (Einzel + Gesamtmappe + Leitfaden) | ja |
| `tools/print/out/` | Visitenkarte/Briefpapier (PDF), Signatur (HTML/TXT), Word-Vorlage (DOCX), Vorschauen | ja |
| `tools/pdf/.build/` | Zwischen-HTML/JSON der PDF-Pipeline | **nein** (git-ignoriert) |
| `src/lib/vorlagen-assets.ts` | Auto-generierter Galerie-Katalog | ja |

---

## 5. Weiterführende Detail-Dokumentation

Die folgenden Dateien in [`docs/generatoren/`](../generatoren/) enthalten die
ausführlichen Beschreibungen (Datenzugriff, Stolperfallen, Abhängigkeiten):

- [`README.md`](../generatoren/README.md) — Generator-Handbuch, Datenfluss-Diagramm,
  Reproduzierbarkeits-Reihenfolge, Umgebung/Voraussetzungen.
- [`pdf-generatoren.md`](../generatoren/pdf-generatoren.md) — PDF-Pipeline und
  Drehbücher (`tools/pdf/`).
- [`marketing-und-galerie.md`](../generatoren/marketing-und-galerie.md) —
  Marketing-Renderer und Vorlagen-Galerie.
- [`visual-generatoren.md`](../generatoren/visual-generatoren.md) — Carousels &
  Reels-Cover-Studios (`docs/carousels/`, `docs/reels/covers/`), inkl.
  Cover-Nummer↔Thema-Tabellen.
- [`video-foliensatz.md`](../generatoren/video-foliensatz.md) — Video-On-Screen-Folien
  (`tools/video/`).
- [`workshop-generator.md`](../generatoren/workshop-generator.md) — Workshop-Generator
  + Spec-Format (`tools/workshop/`).
- [`content-inventar.md`](../generatoren/content-inventar.md) — vollständige
  Bestandsaufnahme aller Inhalte und Zählungen.

Ergänzend: [`tools/pdf/README.md`](../../tools/pdf/README.md) (PDF-Pipeline & Buch)
und [`tools/print/README.md`](../../tools/print/README.md) (Geschäftsausstattung).

_Stand: 2026-09-11 — automatisch dokumentiert_
