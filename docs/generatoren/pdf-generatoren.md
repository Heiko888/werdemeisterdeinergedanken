# PDF-Generatoren

Basisverzeichnis: `tools/pdf/`. Zuständiger Team-Agent: **pdf-dokumentar**.

**Gemeinsame Konventionen:** Alle Generatoren finden Chromium/Chrome über
dieselbe `findChrome()`-Logik (Env `CHROME_BIN` → Playwright-Browser bzw.
`PLAYWRIGHT_BROWSERS_PATH`/`/opt/pw-browsers` → `google-chrome`/`chromium` im
PATH) und rendern per Headless-Chromium `--print-to-pdf`. Env `KEEP_HTML` (bei
den `.mjs`-Drehbüchern) behält die temporäre HTML-Datei. Zwischen-HTML der
Haupt-Pipeline liegt in `tools/pdf/.build/` (git-ignoriert).

**npm-Scripts:** nur `pdf` (→ `generate.mjs`), `reel-drehbuch` und
`langvideo-drehbuch` starten PDF-Generatoren direkt. `carousel-texte.mjs`,
`intro-video-drehbuch.mjs` und `build-ebook-gedanken.py` haben **kein**
npm-Script und werden von keinem Orchestrator aufgerufen — manuell starten.

---

## generate.mjs — Haupt-Pipeline (`npm run pdf`)

- **Zweck:** Orchestrator; erzeugt das Gratis-E-Book und alle Mitglieder-PDFs
  (inkl. Merge des Arbeitshefts aus Cover + Innenteil).
- **Aufruf:** `npm run pdf` (= `node tools/pdf/generate.mjs`)
- **Voraussetzungen:** Node (ESM); Python 3; Chromium/Chrome; npm-Pakete
  `pdf-lib` (Merge) und `playwright` (Chromium-Pfad); intern: `typescript` (über
  `extract-content.mjs`). Env: optional `CHROME_BIN`, `PLAYWRIGHT_BROWSERS_PATH`.
- **Eingaben / Datenzugriff:** ruft `extract-content.mjs`, `build-ebook.py`,
  `build-member.py` auf; liest deren Zwischenprodukte aus `tools/pdf/.build/`
  (`ebook.html`, `m-manifest.json`, `m-*.html`).
- **Ablauf:**
  1. Legt `tools/pdf/.build/` und `content/pdf/` an.
  2. `findChrome()` + `python()` bestimmen die Binaries.
  3. `extract-content.mjs` → `content.json`.
  4. `build-ebook.py` und `build-member.py` → HTML-Dateien.
  5. Rendert `ebook.html` → `public/Die-7-Stufen-der-Bewusstseinsentwicklung.pdf`.
  6. Liest `m-manifest.json`, rendert je `single`-Eintrag → `content/pdf/<name>.pdf`.
  7. Rendert `m-arbeitsheft-cover.html` + `m-arbeitsheft-body.html`, mergt sie via
     `mergePdfs()` → `content/pdf/arbeitsheft.pdf`.
- **Ausgaben:**
  - `public/Die-7-Stufen-der-Bewusstseinsentwicklung.pdf` (Lead-Magnet)
  - `content/pdf/*.pdf`: `stufe-<1..7>-lektion.pdf`, `stufe-<1..7>-uebungen.pdf`,
    `vertiefung-<slug>.pdf`, `arbeitsheft.pdf`
- **Verbundene Komponenten:** setzt `extract-content.mjs`, `build-ebook.py`,
  `build-member.py`, `assets/fonts.css`, `assets/brain-freigestellt.png`,
  `public/logo-brain.png`, `public/heiko-portrait.webp` voraus; speist die
  Runtime-Module `src/lib/pdf/ebook-file.ts` und `src/lib/pdf/static-pdf.ts`.
- **Reproduzierbarkeit:** Fehlt Chromium → `npx playwright install chromium` oder
  `CHROME_BIN=/pfad npm run pdf`. Mitglieder-PDFs bewusst nach `content/pdf/`
  (nicht `public/`), damit der Login-Schutz greift — Verzeichnis muss ins
  Docker-Image. `build-ebook-gedanken.py` wird hier **nicht** aufgerufen.

---

## extract-content.mjs

- **Zweck:** Extrahiert redaktionelle Inhalte aus den TS-Quellen als `content.json`,
  damit die Mitglieder-PDFs inhaltlich synchron bleiben.
- **Aufruf:** `node tools/pdf/extract-content.mjs` (i. d. R. über `npm run pdf`).
- **Voraussetzungen:** Node; npm-Paket `typescript` (`ts.transpileModule`).
- **Eingaben:** `src/lib/content.ts` (`stages`), `src/lib/stage-lessons.ts`
  (`stageLessons`), `src/lib/deep-dives.ts` (`deepDives`). `loadTs()` transpiliert
  jede Datei nach CJS in temporäre `.build/._extract_*.cjs` und `require`t sie.
- **Ausgaben:** `tools/pdf/.build/content.json`.
- **Verbundene Komponenten:** von `generate.mjs` aufgerufen; Datengrundlage für
  `build-member.py`.
- **Reproduzierbarkeit:** Braucht `typescript`. Bricht ab, wenn TS-Exporte
  umbenannt werden oder Pfade sich ändern; die TS-Dateien müssen reine
  Datenmodule ohne externe Imports sein.

---

## build-ebook.py — Gratis-E-Book „7 Stufen"

- **Zweck:** Erzeugt das HTML des Lead-Magnet-E-Books (13 Seiten, mit Inhaltsverzeichnis und persönlicher Seite „Warum es diesen Weg gibt") im Markendesign.
- **Aufruf:** `python3 tools/pdf/build-ebook.py` (über `npm run pdf`).
- **Voraussetzungen:** Python 3 (nur Stdlib). Fonts aus `assets/fonts.css`.
- **Eingaben:** `assets/fonts.css`, `assets/brain-freigestellt.png`,
  `public/logo-brain.png`, `public/heiko-portrait.webp`. **Textinhalte stehen fest
  im Skript** (`STAGES_FULL`, `COVER`, `WELCOME`, `STORY`, `OVERVIEW`, `CLOSING`) — **nicht**
  aus `content.json`. Das Inhaltsverzeichnis (`toc_page`) und die einheitliche
  Fußzeile mit Seitenzahlen (`with_footer`) werden aus der festen Seitenreihenfolge
  erzeugt; wird diese in `inner`/`book` geändert, müssen die Seitenzahlen in
  `toc_page` mitgezogen werden.
- **Ausgaben:** `tools/pdf/.build/ebook.html` (→ von `generate.mjs` zu PDF gerendert).
- **Reproduzierbarkeit:** Inhaltsänderungen direkt in `STAGES_FULL` pflegen
  (bewusst gekürzte Fassung, laut README abweichend von den Lektionen). Die vier
  Assets müssen existieren.

---

## build-ebook-gedanken.py — E-Book „Die Gedanken, die nicht deine sind"

- **Zweck:** Erzeugt das HTML des zweiten E-Books; Inhalt aus Markdown statt Code.
- **Aufruf:** `python3 tools/pdf/build-ebook-gedanken.py` — **kein npm-Script**,
  **nicht** in `generate.mjs`; eigenständig, HTML danach separat zu PDF rendern.
- **Voraussetzungen:** Python 3 (Stdlib). Env `EBOOK_MD` überschreibt die Quelle.
- **Eingaben:** `docs/ebook/die-gedanken-die-nicht-deine-sind.md` (Default);
  `assets/fonts.css`, `assets/brain-freigestellt.png`, `public/logo-brain.png`,
  `public/heiko-portrait.webp`.
- **Ablauf:** Parst das Markdown (`#`→Titel, `### `→Promise/Untertitel, `## N.`→
  Kapitel, kursive Zeilen→Tagline/Closing), `inline()` für `**fett**`/`*kursiv*`,
  baut Cover + Kapitelseiten mit Drop-Cap, hängt Abschluss-CTA an.
- **Ausgaben:** `tools/pdf/.build/ebook-gedanken.html` (kein PDF-Schritt im Skript).
- **Reproduzierbarkeit:** Ausgabe hängt an exakter Markdown-Struktur (`## N. Titel`,
  Kursiv-Konventionen). PDF braucht separaten Chromium-Aufruf. Leicht zu übersehen,
  da nicht in der Pipeline.

---

## build-member.py — Mitglieder-Dokumente

- **Zweck:** Erzeugt aus `content.json` das HTML aller Mitglieder-Dokumente
  (Lektionen, Übungsblätter, Vertiefungen, Arbeitsheft-Cover + -Innenteil).
- **Aufruf:** `python3 tools/pdf/build-member.py` (über `npm run pdf`; setzt
  gelaufenes `extract-content.mjs` voraus).
- **Voraussetzungen:** Python 3 (Stdlib). Fonts aus `assets/fonts.css`.
- **Eingaben:** `tools/pdf/.build/content.json` (`stages`, `stageLessons`,
  `deepDives`); `assets/fonts.css`, `assets/brain-freigestellt.png`,
  `public/logo-brain.png`.
- **Ausgaben:** `tools/pdf/.build/m-*.html` (`m-stufe-1..7-lektion.html`,
  `m-stufe-1..7-uebungen.html`, `m-vertiefung-<slug>.html`,
  `m-arbeitsheft-cover.html`, `m-arbeitsheft-body.html`) + `m-manifest.json`
  (`single` = alle außer `arbeitsheft-*`).
- **Reproduzierbarkeit:** `content.json` muss vorliegen. Stufe↔Lektion-Zuordnung
  (`l["number"] == s["number"]`) verlangt genau eine Lesson je Stage-`number`
  (sonst `StopIteration`). Vertiefungs-`slug` bestimmt Dateinamen und muss zu
  `hasStaticPdf`/Routen passen.

---

## carousel-texte.mjs — Carousel-Skripte als PDF

- **Zweck:** Bündelt die Carousel-Texte je Serie zu je einem PDF plus „Alle Serien".
- **Aufruf:** `node tools/pdf/carousel-texte.mjs [ausgabe-verzeichnis]` (kein
  npm-Script). Default-Ausgabe: `docs/workshop/carousel-texte/`.
- **Voraussetzungen:** Node; Chromium/Chrome. Env `CHROME_BIN`,
  `PLAYWRIGHT_BROWSERS_PATH`, `KEEP_HTML`.
- **Eingaben:** `docs/skripte/carousels/{stufen,praxis,vertiefungen,selbstverteidigung}.md`;
  `docs/reels/covers/_fonts.css`; `docs/reels/covers/logo.png`.
- **Ausgaben** (Default `docs/workshop/carousel-texte/`):
  `WMDG-Carousel-Texte-{7-Stufen,Praxis,Vertiefungen,Mentale-Selbstverteidigung,Alle-Serien}.pdf`.
- **Reproduzierbarkeit:** Node + Chromium. `docs/skripte/carousels/marketing.md`
  wird hier **nicht** eingebunden. Ausgabe unter `docs/workshop/` wird von der
  Vorlagen-Galerie aufgenommen.

---

## reel-drehbuch.mjs — Reel-Skripte als PDF

- **Zweck:** Bündelt die Reel-Skripte (5 Serien) zu je einem PDF plus „Alle Serien".
- **Aufruf:** `npm run reel-drehbuch [ausgabe-verzeichnis]`. Default:
  `docs/workshop/reel-skripte/`.
- **Voraussetzungen:** Node; Chromium/Chrome. Env wie oben.
- **Eingaben:** `docs/skripte/reels/{stufen,praxis,vertiefungen,mentale-selbstverteidigung,wissenschaft}.md`;
  `docs/reels/covers/_fonts.css`; `docs/reels/covers/logo.png`.
- **Ausgaben:** `WMDG-Reel-Drehbuch-{7-Stufen,Praxis,Vertiefungen,Mentale-Selbstverteidigung,Wissenschaft,Alle-Serien}.pdf`.
- **Reproduzierbarkeit:** Alle fünf Markdowns nötig; Tabellen brauchen die
  Trennzeile `|---|` in Zeile 2.

---

## langvideo-drehbuch.mjs — Langvideo-Drehbücher

- **Zweck:** Zwei PDFs für den Mitgliederbereich: „Wort für Wort" (Teleprompter)
  und „Stichpunkt" (freies Sprechen).
- **Aufruf:** `npm run langvideo-drehbuch [ausgabe-verzeichnis]`. **Default:
  Projekt-Root.**
- **Voraussetzungen:** Node; Chromium/Chrome. Env wie oben.
- **Eingaben:** Markdown-Ordner unter `docs/skripte/` (`stufen-komplett/`, `praxis/`,
  `vertiefungen-komplett/` bzw. `stufen/`, `vertiefungen/`), Selbstverteidigung
  jeweils separat; `docs/reels/covers/_fonts.css` + `logo.png`.
- **Ausgaben:** `WMDG-Video-Drehbuch-Ablesen.pdf`, `WMDG-Video-Drehbuch-Stichpunkt.pdf`.
- **Reproduzierbarkeit:** Default-Ausgabe ist der **Repo-Root** — für die Galerie
  `docs/workshop/`-Ziel übergeben. Ausschluss-Dateinamen (`SV_KOMPL`/`SV_STICH`)
  müssen exakt stimmen.

---

## intro-video-drehbuch.mjs — Intro-/Landing-Video

- **Zweck:** Ein Teleprompter-PDF für das Intro-Video + Teaser-Reel „Was, wenn es
  nicht an dir liegt?".
- **Aufruf:** `node tools/pdf/intro-video-drehbuch.mjs [ausgabe-verzeichnis]`
  (kein npm-Script). **Default: Projekt-Root.**
- **Voraussetzungen:** Node; Chromium/Chrome. Env wie oben.
- **Eingaben:** `docs/skripte/landing/{intro,reel}-nicht-deine-schuld.md`;
  `docs/reels/covers/_fonts.css` + `logo.png`.
- **Ausgaben:** `WMDG-Video-Drehbuch-Intro.pdf`.
- **Reproduzierbarkeit:** Beide Landing-Markdowns nötig; Regie-Hinweise im
  Backtick-`[Regie]`-Format am Zeilenanfang.

---

## Assets & Runtime-Konsumenten

**`tools/pdf/assets/`:** `brain-freigestellt.png` (Cover-Motiv),
`fonts.css` (eingebettete Marken-Schriften Fraunces + Inter, base64) für alle
Python-Generatoren. Zusätzlich extern genutzt: `docs/reels/covers/_fonts.css`,
`docs/reels/covers/logo.png` (alle `.mjs`-Drehbücher/Carousel) sowie
`public/logo-brain.png`, `public/heiko-portrait.webp` (Python-E-Book/Member).

**`src/lib/pdf/*` (keine Generatoren, Runtime-Auslieferung):**
- `ebook-file.ts` — `getEbookPdfBytes()` liest das E-Book aus `public/`.
- `static-pdf.ts` — `getStaticPdf(name)`/`hasStaticPdf(name)` lesen
  `content/pdf/<name>.pdf` (bewusst `content/` wegen Login-Schutz).
- `slug.ts` — `worksheetSlug(title)` bildet Download-Dateinamen (Umlaut-Umschrift).
