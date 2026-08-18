# Workshop-Generator

Erzeugt aus einer JSON-Content-Spec die drei gebrandeten Bausteine eines
WMDG-Workshops. Design, Marke und Folien-Bogen sind fest im Code; die Spec
liefert nur den Inhalt.

Zuständiger Team-Agent: **workshop-dokumentar**.

---

## tools/workshop/build.py

- **Zweck:** Baut aus einer Spec drei Artefakte: eine editierbare PowerPoint
  (16:9, mit Sprecher-Notizen), ein Teilnehmer-Workbook (A4-PDF) und einen
  Moderations-/Ablaufplan (A4-PDF).
- **Aufruf:**
  ```bash
  python3 tools/workshop/build.py <spec.json> [<spec2.json> ...]
  # Beispiel:
  python3 tools/workshop/build.py tools/workshop/specs/journal.json
  ```
  Spec-Auswahl **nur über Positions-Argumente** (`sys.argv[1:]`), keine Flags.
  Mehrere Specs werden nacheinander gebaut. Ohne Argument: Hinweis + Exit-Code 1.
  Der Ausgabe-Unterordner ergibt sich aus `slug`/`fileStem` **in** der Spec,
  nicht aus dem Dateinamen des Arguments.
- **Laufzeit-Voraussetzungen:**
  - **Python 3** (`#!/usr/bin/env python3`).
  - Pakete: `python-pptx`, `Pillow`, `playwright` (Sync-API). Stdlib: `base64`,
    `html`, `json`, `os`, `sys`, `shutil`.
  - **Chromium:** sucht fest `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`;
    existiert der Pfad, wird er als `executable_path` genutzt, sonst Playwright-
    Standard-Chromium.
  - **Fonts:** PPTX referenziert **Cambria** (Überschrift) und **Calibri**
    (Text) als Systemschriften. Die PDFs laden **Fraunces**/**Inter** über
    `tools/pdf/assets/fonts.css`, die beim Modul-Import gelesen wird.
  - Optionale Env `REPO_ROOT`; sonst Repo-Root aus Skriptpfad (`../..`).
- **Eingaben / Datenzugriff:**
  - Die per Argument übergebene `specs/*.json` (UTF-8, `json.load`).
  - `tools/workshop/assets/`: `bg-title.png` (Titel-/Angebot-Hintergrund),
    `bg-divider.png` (Kernbotschaft/Trenner/Abschluss), `brain.png` (Logo
    640×588, in PPTX per `add_picture`, in PDFs als Base64-Data-URI),
    `circle.png` (Leaf→Teal-Scheibe für Nummern-Kreise).
  - `tools/pdf/assets/fonts.css` (inline in beide PDFs).
- **Ablauf:**
  1. `main(argv)` iteriert über alle Argumente → je Spec `build_one(spec_path)`.
  2. `build_one` lädt die Spec, liest `fileStem` und `slug`.
  3. Legt `docs/workshop/<slug>/` an (`makedirs(..., exist_ok=True)`).
  4. `build_pptx(s, path)` baut die Folien in fixer Reihenfolge: Titel → Agenda
     → Kernbotschaft → Ausgangspunkt/Kennzahl → Übung 1 → Kapitel-Divider →
     Themen-Überblick → **je eine Folie pro `module`-Eintrag** → Übung 2 →
     Zusammenfassung → Angebot → Abschluss. Notizen je Folie über
     `slide.notes_slide`.
  5. `render_pdfs(...)` erzeugt aus `workbook_html(s)` und `moderation_html(s)`
     HTML (inline CSS via `_pdf_shell`) und rendert mit Chromium zu A4-PDF
     (`print_background=True`, `prefer_css_page_size=True`).
  6. Spiegelt alle drei Dateien per `shutil.copy2` nach
     `content/vorlagen/workshop/` (Admin-Galerie).
  7. Erfolgszeile `✓ <slug>: <n> Folien · <k> Module`.
- **Ausgaben** (pro Spec unter `docs/workshop/<slug>/`):
  - `WMDG-Workshop-<fileStem>.pptx` — PowerPoint (16:9, editierbar, mit Notizen)
  - `WMDG-Workbook-<fileStem>.pdf` — A4-PDF
  - `WMDG-Moderationsplan-<fileStem>.pdf` — A4-PDF
  - Zusätzlich Kopien aller drei Dateien in `content/vorlagen/workshop/`.
- **Verbundene Komponenten:**
  - `tools/pdf/assets/fonts.css` (Schrift-Einbindung der PDFs).
  - `content/vorlagen/workshop/` als Spiegel-Ziel; Katalogeintrag laut README in
    `src/lib/vorlagen-assets.ts`.
  - `npm run vorlagen:galerie` baut die Galerie neu — **mit Vorsicht** (löscht
    Reels/Carousels, deren Quellen nicht im Repo liegen).
  - `docs/workshop/README.md` (Themenübersicht, Marke),
    `docs/workshop/WMDG-Praesentationsvorlage.pptx` (separate Leervorlage, vom
    Generator **nicht** genutzt).
- **Reproduzierbarkeit / Stolperfallen:**
  - **Chromium-Pfad hartkodiert** — auf anderen Umgebungen Playwright-Chromium
    installieren (`playwright install chromium`), sonst schlägt PDF-Rendering fehl.
  - **`fonts.css` muss existieren** — wird beim Import (Top-Level) geöffnet; fehlt
    sie, bricht das Skript vor dem ersten Build ab.
  - **PPTX-Fonts** (Cambria/Calibri) werden nur referenziert, nicht eingebettet.
  - **Ausgabeort hängt von `slug`/`fileStem` in der Spec ab**, nicht vom Dateinamen.
  - **`build_pptx` verlangt bestimmte Keys** (u. a. `title1/title2`, `agenda`,
    `kernbotschaft`, `ausgangspunkt`, `uebung1`, `kapitelIntro`, `landkarte`,
    `module`, `uebung2`, `zusammenfassung`, `angebot`, `abschluss` + `workbook`/
    `moderation`); fehlt einer → `KeyError`.
  - **Spiegelung überschreibt** gleichnamige Dateien in `content/vorlagen/workshop/`
    ohne Nachfrage.
  - Preis `49 €/Monat` (`angebot.preis`/`preisSuffix`) ist ein Platzhalter — vor
    Einsatz prüfen.

---

## Spec-Format (`specs/*.json`)

Jede Spec ist ein einzelnes JSON-Objekt. Alle vier Specs teilen **exakt dasselbe
Schema**. Textwerte werden 1:1 übernommen (in PDFs HTML-escaped via `esc()`).
Die Specs enthalten **keine Bildpfade** — alle Bilder sind fest aus
`tools/workshop/assets/` verdrahtet. Nummerierungen entstehen automatisch aus
Array-Indizes (bei Modulen aus `badge`). Fehlt ein `notes`-Feld, setzt der Code
je Folientyp einen deutschen Standard-Notiztext.

**Top-Level-Metadaten (Strings):** `slug` (Ausgabeordner), `fileStem`
(Dateiname-Baustein), `eyebrow` (Kicker Titelfolie), `title1`/`title2`
(zweizeiliger Titel, `title2` teal-akzentuiert), `subtitle`, `author`,
`format`, `dauer`, `gruppe`, `leitung`.

**Inhalts-Blöcke (je ein Slide-Typ):**

| Key | Typ | Erzeugt |
|---|---|---|
| `agenda` | Array `{title, desc}` | Agenda-Folie (nummerierte Kreise) |
| `kernbotschaft` | `{pre, accent, post, tail?, notes?}` | Statement-Folie (`accent` hervorgehoben) |
| `ausgangspunkt` | `{kicker, title, p1, p2, metricPre, metric, metricLabel, metricNote, notes?}` | Metric-Folie mit Kennzahl-Karte |
| `uebung1`, `uebung2` | `{kicker, title, steps[], mitnehmen, notes?}` | Exercise-Folien (nummerierte Schritte + „MITNEHMEN") |
| `kapitelIntro` | `{kicker, title, subtitle, notes?}` | Kapiteltrenner auf Bildhintergrund |
| `landkarte` | `{kicker, title, items[], notes?}` | Themen-Überblick (`items` = `{title, sub?}`) |
| `module` | Array `{badge, title, sub, body, reflexion, notes?}` | **eine Folie pro Eintrag** — Länge bestimmt die Folienzahl |
| `zusammenfassung` | `{kicker, title, items[], notes?}` | `items` = `{title, text}` als Karten |
| `angebot` | `{kicker, title, features[], preis, preisSuffix, url, note, notes?}` | Angebots-Folie mit Preis-Karte |
| `abschluss` | `{pre, accent, post, thanks, url, notes?}` | Abschluss-Folie mit Logo |

**Nur für die PDFs:**
- `workbook` — `{coverSubtitle, intro:{body, grundKicker, grundText}, sections[]}`;
  jede `section` = `{kicker, title, body, uebungKicker?, steps?[], prompt, lines}`
  (`lines` = Anzahl leerer Schreiblinien, `prompt` = teal Reflexionsfrage).
- `moderation` — `{ziel[], material[], ablauf[]}`; `ablauf` = `{time, dur, block,
  what, material?, pause?}` (Tabellenzeilen; `pause:true` färbt die Zeile grün).

**Die vier vorhandenen Specs:**

| Spec-Datei | slug | Thema (title1 — title2) | Format | Module | Folien (11 fix + Module) |
|---|---|---|---|---|---|
| `journal.json` | `journal` | Die Kraft der Reflexion — Journaling-Halbtag | Halbtag | 7 | 18 |
| `wissensdatenbank.json` | `wissensdatenbank` | Dein Gehirn verstehen — Wissensreise (10 Module) | Ganztag | 10 | 21 |
| `blog.json` | `blog` | Deinen Kopf durchdenken — Blog & Deep-Dives | Ganztag | 11 | 22 |
| `bewusstseinstest.json` | `bewusstseinstest` | Wo stehst du gerade? — Bewusstseinstest (7 Stufen) | Halbtag | 7 | 18 |

Folienzahl = **11 feste Folien + 1 Folie je `module`-Eintrag**.
