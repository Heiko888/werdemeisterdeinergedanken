# PDF-Generatoren

Basisverzeichnis: `tools/pdf/`. Zuständiger Team-Agent: **pdf-dokumentar**.

**Gemeinsame Konventionen:** Alle Generatoren finden Chromium/Chrome über
dieselbe `findChrome()`-Logik (Env `CHROME_BIN` → Playwright-Browser bzw.
`PLAYWRIGHT_BROWSERS_PATH`/`/opt/pw-browsers` → `google-chrome`/`chromium` im
PATH) und rendern per Headless-Chromium `--print-to-pdf`. Env `KEEP_HTML` (bei
den `.mjs`-Drehbüchern) behält die temporäre HTML-Datei. Zwischen-HTML der
Haupt-Pipeline liegt in `tools/pdf/.build/` (git-ignoriert).

**npm-Scripts:** `pdf` (→ `generate.mjs`), `pdf:brandbook` (→
`build-brandbook.mjs`), `pdf:buch` (→ `build-buch.mjs`), `buchcover` (→
`buchcover-png.py`), `reel-drehbuch`, `langvideo-drehbuch`,
`willkommen-skript`, `videoskripte-md` starten PDF-/Skript-Generatoren direkt.
`carousel-texte.mjs`, `intro-video-drehbuch.mjs`, `build-ebook-gedanken.py`,
`build-reel-skripte.py`, `praxis-sprecherskript.mjs` und `anleitung-stripe.mjs`
haben **kein** npm-Script und werden von keinem Orchestrator aufgerufen —
manuell starten.

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

## build-brandbook.mjs + build-brandbook.py — Markenhandbuch (`npm run pdf:brandbook`)

- **Zweck:** Erzeugt das Brandbook (Markenkern, Tonalität, Logo, Farben,
  Typografie, Bildwelt, Anwendungen, Struktur) als ein PDF im Mitglieder-PDF-Design.
- **Aufruf:** `npm run pdf:brandbook` (= `node tools/pdf/build-brandbook.mjs`).
  Kein Zwei-Schritt-Aufruf nötig — `build-brandbook.py` wird vom `.mjs` per
  `execFileSync` aufgerufen.
- **Voraussetzungen:** Node (ESM); Python 3 (nur Stdlib); Chromium/Chrome
  (gleiche `findChrome()`-Logik wie `generate.mjs`: Env `CHROME_BIN` →
  `playwright`-Paket → `PLAYWRIGHT_BROWSERS_PATH`/`/opt/pw-browsers` →
  `google-chrome`/`chromium` im PATH). Env `REPO_ROOT`/`BUILD_DIR` werden vom
  `.mjs` gesetzt, nicht manuell nötig.
- **Eingaben / Datenzugriff:** `build-brandbook.py` liest `assets/fonts.css`
  sowie `public/logo-brain-gold.png` und `public/logo-full.png` (als
  Base64-`data:`-URIs eingebettet). **Alle Texte stehen fest im Skript**
  (Python-Literale `parts.append(...)` je Kapitel) — es wird **keine**
  `content.json`/`src/lib/*` gelesen; Änderungen an Markenwerten, 7-Stufen-Titeln
  usw. müssen hier redaktionell manuell nachgezogen werden.
- **Ablauf:** `build-brandbook.py` baut acht Kapitel (Marke & Positionierung,
  Tonalität, Logo, Farben, Typografie, Bildwelt, Anwendungen, Struktur) plus
  Deckblatt/Inhaltsverzeichnis als HTML-String und schreibt
  `tools/pdf/.build/brandbook.html`; `build-brandbook.mjs` rendert das per
  Chromium `--print-to-pdf`.
- **Ausgaben:** `docs/brandbook/WMDG-Brandbook.pdf`.
- **Verbundene Komponenten:** referenziert im Kapitel „Struktur" selbst die
  Quellen der Wahrheit (`src/lib/site.ts`, `src/lib/content.ts`,
  `src/app/globals.css`, `src/app/layout.tsx`, `components/visuals/Logo.tsx`,
  `components/ui/Icon.tsx`, `docs/marketing/content-data.mjs`,
  `docs/marketing/brand-assets.mjs`) — diese Referenzen sind aber reiner Text im
  PDF, kein tatsächlicher Lesezugriff des Generators.
- **Reproduzierbarkeit:** `public/logo-brain-gold.png` und `public/logo-full.png`
  müssen existieren, sonst bricht `enc()` mit `FileNotFoundError` ab. ⚠ zu
  klären: Inhalte (Werte, Claims, Farbwerte) sind Kopien/Momentaufnahmen im
  Python-Code und können von den tatsächlichen aktuellen Marken-Quellen
  abweichen, ohne dass der Generator das erkennt.

---

## build-buch.mjs + build-buch.py — Buch „Werde Meister deiner Gedanken" (`npm run pdf:buch`)

- **Zweck:** Erzeugt das vollständige Buch (Titelseite, Hinweis des Autors,
  generiertes Inhaltsverzeichnis, Teil-Trennseiten, Kapitel mit Drop-Cap,
  Schlusswort, Anhang) als PDF für den Verkauf/Mitgliederbereich.
- **Aufruf:** `npm run pdf:buch` (= `node tools/pdf/build-buch.mjs`); ruft intern
  `build-buch.py` per `execFileSync` auf.
- **Voraussetzungen:** Node (ESM); Python 3 (Stdlib, Modul `re`); Chromium/Chrome
  (gleiche `findChrome()`-Logik wie `generate.mjs`). Env `BUCH_MD` überschreibt
  die Markdown-Quelle, `BUCH_IMPRESSUM` überschreibt die Anbieterkennzeichnung
  (Default fest im Skript hinterlegt: „Heiko Schwaninger · Dompfaffenweg 30 ·
  63920 Großheubach · info@werdemeisterdeinergedanken.de").
- **Eingaben / Datenzugriff:** `docs/ebook/werde-meister-deiner-gedanken.md`
  (Default-Pfad, reine Leserfassung) — `docs/ebook/intern/` (Story-Rohmaterial,
  redaktionelle Notizen) wird **bewusst nicht** eingelesen. Außerdem
  `assets/fonts.css`, `public/logo-brain-gold.png`, `public/heiko-portrait.webp`;
  optional `tools/pdf/assets/cover-treppe.png` als Cover-Hauptmotiv (fällt sonst
  auf das goldene Gehirn zurück).
- **Ablauf:** `parse_blocks()` liest die Markdown-Zeilen zu Block-Tupeln
  (`h1`…`h5`, `quote`, `ol`, `ul`, `p`, `hr`; Tabellenzeilen `|…` werden
  übersprungen). Ein zweiter Durchlauf gruppiert die Blöcke zu `nodes`
  (`intro`, `part`, `chapter`, `closing`, `appendix`, `section`) anhand der
  Überschriftenstruktur (`# Einleitung`, `# Teil …`, `## Kapitel N` + `### Titel`,
  `# Schlusswort`, `# Anhang …`). `render_blocks()`/`opener_page()` erzeugen daraus
  Titelseite, Teil-Trennseiten (Navy, Gehirn-Motiv), eigene Kapitel-Auftaktseiten
  und Fließtext mit Drop-Cap (`.para.lead`). Schreibt `tools/pdf/.build/book-wmdg.html`;
  `build-buch.mjs` rendert das per Chromium `--print-to-pdf`.
- **Ausgaben:** `content/pdf/Werde-Meister-deiner-Gedanken.pdf` (**nicht**
  `public/`, damit die Datei nur über eine geschützte/verkaufte Route
  ausgeliefert wird — siehe `src/lib/pdf/ebook-file.ts`).
- **Verbundene Komponenten:** `assets/fonts.css`, `public/logo-brain-gold.png`,
  `public/heiko-portrait.webp`, optional `tools/pdf/assets/cover-treppe.png`
  (wird auch von `buchcover-png.py` mitverwendet, da dessen Cover-Section aus
  demselben `book-wmdg.html` stammt).
- **Reproduzierbarkeit:** Struktur hängt strikt an der Überschriftenhierarchie
  der Leserfassung (`# Teil …`, `## Kapitel N`, `### Titel`); Abweichungen
  landen als generische `section`/Zwischenüberschrift. Fehlende Assets
  (`fonts.css`, Logo, Portrait) lassen `enc()`/`open()` mit Python-Exception
  abbrechen.

---

## buchcover-png.py — Buchcover als PNG (`npm run buchcover`)

- **Zweck:** Gibt die fertige Titelseite (Cover) des Buches als eigenständiges
  PNG aus — identisch zur Buch-PDF-Titelseite, kein Nachbau/Re-Implementierung
  des Layouts.
- **Aufruf:** `npm run buchcover` (= `python3 tools/pdf/buchcover-png.py`). Env
  `BUCHCOVER_DPI` steuert die Rasterauflösung (Default `300`).
- **Voraussetzungen:** Python 3; Paket **PyMuPDF** (`pip install pymupdf`,
  Import als `pymupdf`, Fallback `import fitz as pymupdf` für ältere Versionen);
  Chromium/Chrome (`find_chrome()` prüft `CHROME_BIN`,
  `PLAYWRIGHT_BROWSERS_PATH`/`/opt/pw-browsers`, dann `which` für
  `google-chrome`/`chromium`/`chromium-browser`/`chrome`).
- **Eingaben / Datenzugriff:** `tools/pdf/.build/book-wmdg.html` — wird bei
  Bedarf erst per `subprocess.run([sys.executable, "build-buch.py"])` erzeugt,
  d. h. dieser Generator setzt transitiv dieselben Eingaben wie `build-buch.py`
  voraus (`docs/ebook/werde-meister-deiner-gedanken.md`, Fonts, Logo, Portrait,
  optional `cover-treppe.png`).
- **Ablauf:** Liest `book-wmdg.html`, extrahiert daraus per String-Suche den
  `<head>`-Block und exakt die `<section class="cover">…</section>`, baut daraus
  ein minimales Einzel-HTML (`tools/pdf/.build/.tmp-buchcover.html`), rendert es
  per Chromium `--print-to-pdf` (`--virtual-time-budget=15000`) zu einer
  1-seitigen A4-PDF (`.tmp-buchcover.pdf`), öffnet diese mit PyMuPDF und
  rastert Seite 1 mit `zoom = DPI/72` zu PNG. Löscht anschließend die beiden
  Temp-Dateien.
- **Ausgaben:** `content/pdf/Werde-Meister-deiner-Gedanken-Cover.png`
  (2479×3508 px bei 300 dpi; **nicht** `public/`, aus demselben Grund wie das
  Buch-PDF — Next.js würde sonst direkt ausliefern).
- **Verbundene Komponenten:** setzt `build-buch.py` (und dessen Eingaben)
  voraus; nicht zu verwechseln mit `public/ebook-cover.png` (Landingpage-Grafik
  des kostenlosen E-Books „Die 7 Stufen …").
- **Reproduzierbarkeit:** Bricht mit `SystemExit` ab, wenn `<section
  class="cover">` in `book-wmdg.html` nicht gefunden wird (Layout-Umbau in
  `build-buch.py` beachten) oder wenn PyMuPDF fehlt. Rendert deterministisch,
  solange `book-wmdg.html` unverändert vorliegt (kein erzwungenes Neubauen,
  wenn die Datei schon existiert — bei veralteten Inhalten daher vorher
  `npm run pdf:buch` laufen lassen).

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

## build-reel-skripte.py — Reel-Skripte „7 Stufen" im Arbeitsheft-Design

- **Zweck:** Erzeugt „Die 7 Stufen"-Reel-Skripte (21 Reels) im hellen
  Arbeitsheft-Layout mit Navy-Cover, aus einer vorgefertigten HTML-Quelle
  geparst — Web-Fassung (Google Fonts) plus Print-Fassung (Fonts eingebettet).
- **Aufruf:** `python3 tools/pdf/build-reel-skripte.py`. **Kein npm-Script**,
  **keine** Referenz in `package.json`, `README.md` oder einem anderen
  `.mjs`-Orchestrator — muss manuell gestartet werden. ⚠ zu klären: Es ist
  unklar, ob dieses Skript noch aktiv gepflegt wird oder von
  `reel-drehbuch.mjs`/`docs/skripte/reels/*.md` abgelöst wurde, da beide
  denselben Themenbereich („Die 7 Stufen"-Reels) mit unterschiedlichen
  Quellformaten (HTML vs. Markdown) und unterschiedlichem Design abdecken.
- **Voraussetzungen:** Python 3 (Stdlib, Module `re`, `base64`, `pathlib`,
  `html`). Erzeugt selbst **kein PDF** — dafür laut Kopfkommentar zusätzlich
  Chromium/Chrome manuell aufrufen (`--headless --no-pdf-header-footer
  --print-to-pdf=out.pdf --virtual-time-budget=10000
  file://<build>/reel-skripte-7-stufen.print.html`).
- **Eingaben / Datenzugriff:** `tools/pdf/assets/reel-source.html` (der
  `<main>`-Block mit 21 `<article class="reel">`-Elementen, gruppiert in 7
  `<section class="stage">`); `tools/pdf/assets/fonts.css` (Print-Fassung);
  `tools/workshop/assets/brain.png` (Cover-Gehirn, als Base64 eingebettet).
- **Ablauf:** Parst per Regex `<section class="stage">…</section>` und darin je
  `<article class="reel">…</article>` (Chip-Typ/Thema, Hook, Skriptzeilen,
  On-Screen-Text, CTA, optionale Caption mit Tags). `assert len(stages) == 7`
  bricht hart ab, wenn die Quelle nicht genau 7 Stufen liefert. Wortanzahl je
  Reel × `WPM = 145` ergibt die geschätzte Sekundenlänge (`r["secs"]`). Baut
  Deckblatt, Inhaltsverzeichnis und je Stufe einen Block mit
  Ausfüll-Notizlinien („Meine Notizen").
- **Ausgaben:** `docs/skripte/reels/reel-skripte-7-stufen.html` (Web-Fassung,
  Google-Fonts-Link) und `tools/pdf/.build/reel-skripte-7-stufen.print.html`
  (Print-Fassung, Fonts als `data:`-URI eingebettet — Basisordner per Env
  `BUILD_DIR` überschreibbar).
- **Verbundene Komponenten:** unabhängig von `reel-drehbuch.mjs` und
  `docs/skripte/reels/*.md`; einzige Quelle ist `assets/reel-source.html`.
- **Reproduzierbarkeit:** Bricht ab, wenn `reel-source.html` nicht exakt 7
  `<section class="stage">`-Blöcke mit den erwarteten Kind-Elementen
  (`.stage-num`, `h2`, `.stage-sub`, `.chip`, `.hook`, `.script`, `<dt>On-Screen</dt>`,
  `<dt>CTA</dt>`) enthält — jede Regex-`.group(1)` wirft `AttributeError`, wenn
  ein Element fehlt. PDF-Schritt ist nicht automatisiert und muss von Hand
  angehängt werden.

---

## willkommen-skript.mjs — Willkommensvideo-Skript (Dashboard) (`npm run willkommen-skript`)

- **Zweck:** Ein PDF mit Stichpunkt-Drehbuch, Wort-für-Wort-Teleprompter-Text,
  On-Screen-Einblendungen und einer 45-Sekunden-Kurzfassung für das
  Willkommensvideo auf der Dashboard-Startseite (`/mitglieder`).
- **Aufruf:** `npm run willkommen-skript [ausgabe-verzeichnis]` (=
  `node tools/pdf/willkommen-skript.mjs [ausgabe-verzeichnis]`). Default-Ausgabe:
  `docs/skripte/willkommen/`.
- **Voraussetzungen:** Node; Chromium/Chrome (gleiche `findChrome()`-Logik wie
  die anderen `.mjs`-Drehbücher: `CHROME_BIN` → `PLAYWRIGHT_BROWSERS_PATH`/
  `/opt/pw-browsers` → PATH). Env `CHROME_BIN`, `KEEP_HTML` (behält die
  temporäre HTML-Datei `.willkommen.html`).
- **Eingaben / Datenzugriff:** `docs/reels/covers/_fonts.css` (Fonts),
  `public/logo-brain-gold.png` (Logo, Base64). **Der komplette Text steht fest
  im Skript** als JS-Literale (`META`, `DREHBUCH`, `TELEPROMPTER`, `ONSCREEN`,
  `KURZ`) — laut Kopfkommentar 1:1 zu `docs/skripte/willkommen/dashboard-willkommen.md`,
  aber diese Markdown-Datei wird vom Skript **nicht eingelesen**; die
  Übereinstimmung ist rein redaktionelle Konvention, keine technische Kopplung.
- **Ablauf:** `renderDrehbuch()`/`renderTeleprompter()`/`renderOnscreen()` bauen
  aus den Literalen HTML-Abschnitte (Stichpunkt-Blöcke mit Zeitmarken,
  Regie-Hinweisen, „so-fällt-der-Satz"-Boxen; Fließtext-Absätze; Tabelle mit
  Zeitmarke → On-Screen-Text; Kurzfassung). `toPdf()` schreibt eine temporäre
  HTML-Datei und rendert sie per Chromium `--print-to-pdf`.
- **Ausgaben:** `docs/skripte/willkommen/Willkommensvideo-Dashboard.pdf`
  (Default; anderer Pfad via `argv[2]`).
- **Verbundene Komponenten:** gleicher Marken-Stil wie
  `praxis-sprecherskript.mjs` (identisches CSS-Grundgerüst); referenziert
  redaktionell `docs/skripte/willkommen/dashboard-willkommen.md`, die auch von
  `videoskripte-markdown.mjs` (nur in dessen README-Verweis, nicht neu erzeugt)
  erwähnt wird.
- **Reproduzierbarkeit:** ⚠ zu klären — Inhaltsänderungen an
  `dashboard-willkommen.md` ziehen **nicht automatisch** ins PDF; die
  JS-Literale müssen manuell synchron gehalten werden.

---

## praxis-sprecherskript.mjs + praxis-skripte-data.mjs — Sprecherskripte „Praxis mit Stimme"

- **Zweck:** Erzeugt Vorlese-PDFs für die 13 geführten Praxis-Audios (Meditation,
  Atemübungen, Rituale): 13 Einzel-PDFs, einen Aufnahme-Leitfaden und eine
  Gesamtmappe (Leitfaden + alle 13 Skripte).
- **Aufruf:** `node tools/pdf/praxis-sprecherskript.mjs [ausgabe-verzeichnis]`.
  **Kein npm-Script.** Default-Ausgabe: `docs/mitglieder/sprecherskripte/`.
- **Voraussetzungen:** Node; Chromium/Chrome (gleiche `findChrome()`-Logik wie
  die übrigen `.mjs`-Drehbücher). Env `CHROME_BIN`, `KEEP_HTML`.
- **Eingaben / Datenzugriff:** `praxis-skripte-data.mjs` (lokales Nachbar-Modul,
  Named Exports `skripte` und `leitfaden`); `docs/reels/covers/_fonts.css`
  (Fonts); `public/logo-brain-gold.png` (Logo, Base64).
  `praxis-skripte-data.mjs` selbst enthält **keinen Lesezugriff** — laut
  Kopfkommentar ist es eine manuell verfasste, gesprochene Fassung der 13
  Übungen aus `src/lib/practices.ts` (dort knappe Anleitungsschritte), aber
  `src/lib/practices.ts` wird programmatisch **nicht importiert/gelesen**; die
  Übereinstimmung ist redaktionell, nicht technisch erzwungen.
- **Ablauf:** Für jedes Element in `skripte` (13 Einträge, je mit
  `slug`, `titel`, `kategorie`, `dauer`, `mp3`, `worum`, `segmente`) rendert
  `renderSkript()` Kopf + Segmente; Segment-Typen `text`/`pause`/`regie` werden
  von `renderSegment()` unterschiedlich gestylt (Pause als gestrichelte Linie
  mit Zeitangabe-Pille, Regie als orange Hinweisbox, „nicht sprechen"). Baut je
  Einzel-PDF eine eigene Titelseite (`coverFor()`), den Leitfaden separat
  (`renderLeitfaden()` aus `leitfaden.abschnitte`) und die Gesamtmappe
  (Titelseite + Leitfaden + alle 13 Skripte in einem Dokument). `toPdf()`
  schreibt je Render einen deterministischen Temp-Dateinamen
  (`.spr-<hash(outPath)>.html`, `hash()` = einfacher Polynom-Hash) und rendert
  per Chromium `--print-to-pdf`.
- **Ausgaben** (Default `docs/mitglieder/sprecherskripte/`):
  `einzel/<nr>-<slug>.pdf` (13 Stück, `nr` = `01`…`13`),
  `00-Aufnahme-Leitfaden.pdf`, `WMDG-Praxis-mit-Stimme-Gesamtmappe.pdf`.
- **Verbundene Komponenten:** `mp3`-Feld je Skript entspricht dem Zieldateinamen
  im `audio`-Feld der jeweiligen Übung (z. B. `atembeobachtung.mp3`) —
  Zuordnungslogik liegt aber außerhalb dieses Generators (`src/lib/practices.ts`).
- **Reproduzierbarkeit:** `praxis-skripte-data.mjs` muss die Exporte `skripte`
  (Array) und `leitfaden` (`{titel, untertitel, abschnitte:[{h, punkte:[...]}]}`)
  in genau dieser Form liefern. ⚠ zu klären — wie bei `willkommen-skript.mjs`
  gibt es keinen automatischen Abgleich mit `src/lib/practices.ts`; Änderungen
  an den Übungen müssen manuell in `praxis-skripte-data.mjs` nachgezogen werden.

---

## videoskripte-markdown.mjs — Videoskripte als gebündeltes Markdown (`npm run videoskripte-md`)

- **Zweck:** Erzeugt zu jedem Video-PDF-Bündel (Intro/Landing, Langvideo
  Wort-für-Wort, Langvideo Stichpunkt, Reel-Alle-Serien) eine inhaltsgleiche,
  zusammenhängende Markdown-Datei zum Lesen/Editieren außerhalb von PDF.
- **Aufruf:** `npm run videoskripte-md [ausgabe-verzeichnis]` (=
  `node tools/pdf/videoskripte-markdown.mjs [ausgabe-verzeichnis]`).
  Default-Ausgabe: `docs/skripte/videoskripte/`.
- **Voraussetzungen:** Node (reines `node:fs`/`node:path`, keine externen
  Pakete, kein Chromium — erzeugt nur Markdown, kein PDF).
- **Eingaben / Datenzugriff:** Quell-Markdowns identisch zu
  `langvideo-drehbuch.mjs`/`intro-video-drehbuch.mjs`/`reel-drehbuch.mjs`:
  `docs/skripte/landing/{intro,reel}-nicht-deine-schuld.md`;
  `docs/skripte/stufen-komplett/*.md`, `docs/skripte/praxis/*.md`,
  `docs/skripte/vertiefungen-komplett/*.md` (ohne
  `mentale-selbstverteidigung-komplett.md`, die separat als eigener Abschnitt
  eingebunden wird); `docs/skripte/stufen/*.md`,
  `docs/skripte/vertiefungen/*.md` (ohne
  `mentale-selbstverteidigung-drehbuecher.md`, ebenfalls separat);
  `docs/skripte/reels/{stufen,praxis,vertiefungen,mentale-selbstverteidigung,wissenschaft}.md`.
- **Ablauf:** `files(dir, exclude)` listet sortiert alle `.md` eines Ordners
  (optional eine Datei ausschließend). `demoteHeadings(md, by)` setzt alle
  Markdown-Überschriften um `by` Ebenen tiefer (Code-Fences `` ``` `` werden
  dabei übersprungen), damit die Quell-Skripte sauber unter einer
  `##`-Abschnittsüberschrift einhängen. `buildBundle()` fügt Titel, Zitat-Zeile,
  Stand-Datum-Hinweis, optional einen `note`-Absatz und je Abschnitt eine
  `<!-- Quelle: <relativer Pfad> -->`-Kommentarzeile plus den (heruntergestuften)
  Inhalt zusammen.
- **Ausgaben** (Default `docs/skripte/videoskripte/`):
  `landing-intro-drehbuch.md`, `langvideo-ablesen.md`, `langvideo-stichpunkt.md`,
  `reels-alle-serien.md`.
- **Verbundene Komponenten:** bewusst 1:1 zu den Quellen von
  `langvideo-drehbuch.mjs`, `intro-video-drehbuch.mjs`, `reel-drehbuch.mjs` (in
  Kommentaren referenziert); das Willkommensvideo
  (`docs/skripte/willkommen/dashboard-willkommen.md`) wird laut Kopfkommentar
  bewusst **nicht** neu gebündelt, da es bereits als eigenständige,
  vollständige Markdown-Quelle vorliegt.
- **Reproduzierbarkeit:** Bricht mit `ENOENT` ab, wenn einer der referenzierten
  Ordner/Dateien fehlt (z. B. `docs/skripte/stufen-komplett/` leer/umbenannt).
  Die Ausschluss-Dateinamen (`SV_STICH`, `SV_KOMPL`) müssen exakt zu den
  tatsächlichen Dateien passen, sonst werden sie doppelt oder gar nicht
  eingebunden.

---

## anleitung-stripe.mjs — Anleitung „Stripe-Mitgliedschaft einrichten"

- **Zweck:** Ein Schritt-für-Schritt-PDF zum Einrichten der Bezahl-Mitgliedschaft
  (Stripe-Produkt/Preise, API-Schlüssel, Webhook, Env-Variablen, Testlauf,
  Live-Schaltung) — Betriebs-/Setup-Dokumentation, kein Marketing- oder
  Content-Generator im engeren Sinn.
- **Aufruf:** `node tools/pdf/anleitung-stripe.mjs [ausgabe-verzeichnis]`.
  **Kein npm-Script.** Default-Ausgabe: `docs/workshop/anleitungen/` (wird laut
  Kopfkommentar automatisch von der Vorlagen-Galerie im Workshop-Tab
  aufgenommen).
- **Voraussetzungen:** Node; Chromium/Chrome (gleiche `findChrome()`-Logik wie
  die übrigen `.mjs`-Drehbücher). Env `CHROME_BIN`, `KEEP_HTML`.
- **Eingaben / Datenzugriff:** `docs/reels/covers/_fonts.css` (Fonts),
  `public/logo-brain-gold.png` (Logo, Base64), `docs/_glyphs.mjs` (Named
  Exports `ARROW`, `DOTS` für Pfeil-/Auslassungszeichen im Fließtext). Der
  gesamte Anleitungstext (`BODY`) steht fest im Skript.
- **Ablauf:** Reines Template-Literal-HTML (Kapitel „In Kürze" bis
  „Kurz-Checkliste"), keine Parser-Logik. `toPdf`-Äquivalent: schreibt
  `.anleitung-stripe.html` neben dem Skript, rendert per Chromium
  `--print-to-pdf`, löscht die Temp-Datei außer bei `KEEP_HTML`.
- **Ausgaben:** `docs/workshop/anleitungen/WMDG-Anleitung-Stripe-Mitgliedschaft.pdf`.
- **Verbundene Komponenten:** beschreibt (nur als Text, kein Lesezugriff) die
  Stripe-/Supabase-/Resend-Integration des Projekts, u. a.
  `supabase/migrations/0007_membership.sql`, Env-Variablen
  `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, `STRIPE_PRICE_ID_YEARLY`,
  `STRIPE_WEBHOOK_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`,
  `MEMBERSHIP_FROM`, `REQUIRE_ACTIVE_MEMBERSHIP`.
- **Reproduzierbarkeit:** Inhaltsänderungen (Preise, Schritte, Env-Namen) nur
  direkt im Skript pflegbar. ⚠ zu klären: Inhalt ist eine Momentaufnahme des
  Setup-Prozesses und wird nicht gegen die tatsächliche Stripe-/Env-Konfiguration
  geprüft — bei Änderungen am echten Preismodell (z. B. andere €-Beträge) muss
  das PDF manuell nachgezogen werden.

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
