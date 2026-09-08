# PDF-Generator

Erzeugt alle gestalteten PDFs im Markendesign neu – aus einem Befehl:

```bash
npm run pdf
```

## Das Buch „Werde Meister deiner Gedanken"

Das vollständige Buch (5 Teile, 24 Kapitel, ~129 Seiten) hat einen eigenen
Generator und wird separat gebaut:

```bash
npm run pdf:buch
```

Das schreibt `content/pdf/Werde-Meister-deiner-Gedanken.pdf`.

- **Quelle:** `docs/ebook/werde-meister-deiner-gedanken.md` – die reine
  **Leserfassung**. Nur diese Datei wird eingelesen.
- **Nicht im Build:** `docs/ebook/intern/` enthält das Story-Rohmaterial und die
  redaktionellen Notizen (teils sensible/rechtliche Rohdaten). Das ist bewusst
  vom Generator ausgeschlossen und darf nicht in die vermarktete Fassung.
- **Aufbau des PDFs:** Titelseite · Hinweis des Autors · generiertes
  Inhaltsverzeichnis · Teil-Trennseiten (Navy, Gehirn-Motiv) · Kapitel (Initial,
  Zwischenüberschriften, Zitat-/Übungsboxen) · Schlusswort · Anhang.
- **Generator:** `build-buch.py` (Markdown → HTML) + `build-buch.mjs` (Chromium → PDF).
  Der Markdown-Parser versteht `#`–`#####`, Zitate (`>`), nummerierte und
  Aufzählungslisten, `**fett**`/`*kursiv*`.

> Ziel ist `content/pdf/` und **nicht** `public/`: unter `public/` würde Next.js
> die Datei direkt unter ihrem Pfad ausliefern. Das Buch soll nur über eine
> geschützte bzw. verkaufte Route zugänglich sein.

Das schreibt:

- `public/Die-7-Stufen-der-Bewusstseinsentwicklung.pdf` – das kostenlose Lead-Magnet-E-Book (13 Seiten, mit Inhaltsverzeichnis und persönlicher Seite „Warum es diesen Weg gibt")
- `content/pdf/*.pdf` – die 28 Mitglieder-Dokumente:
  - `arbeitsheft.pdf` – Gesamt-Arbeitsheft (mit Gehirn-Cover)
  - `stufe-<1..7>-lektion.pdf` – Lektion je Stufe
  - `stufe-<1..7>-uebungen.pdf` – Übungsblatt je Stufe (mit Ausfüll-Linien)
  - `vertiefung-<slug>.pdf` – je Vertiefung (Deep-Dive)

## Wann neu erzeugen?

Immer wenn sich Inhalte ändern, die in den PDFs stehen:

- `src/lib/content.ts` (Stufen: Titel/Untertitel)
- `src/lib/stage-lessons.ts` (Lektionen, Übungen, Reflexionsfragen)
- `src/lib/deep-dives.ts` (Vertiefungen)

Die **Mitglieder-PDFs lesen diese Inhalte direkt** – nach `npm run pdf` sind sie
automatisch aktuell. Danach die neuen PDFs committen.

> Hinweis: Das **E-Book** enthält eine bewusst gekürzte, redaktionell
> aufbereitete Fassung (Erkennungsmerkmale, kurze Kerntexte). Diese Texte
> stehen direkt im Generator (`build-ebook.py`, Liste `STAGES_FULL`) und werden
> dort gepflegt, nicht aus den Lektionen übernommen.

## Voraussetzungen

- **Node** (bereits fürs Projekt vorhanden)
- **Python 3** (`python3`)
- **Chromium/Chrome** – wird automatisch gesucht (Playwright-Browser, System-Chrome).
  Falls keines vorhanden ist:
  ```bash
  npx playwright install chromium
  ```
  Alternativ ein eigenes Binary per Env vorgeben: `CHROME_BIN=/pfad/zu/chrome npm run pdf`

## Wie es funktioniert

1. `extract-content.mjs` – liest die TS-Inhalte via TypeScript-Transpiler → `.build/content.json`
2. `build-ebook.py` / `build-member.py` – erzeugen das HTML im Markendesign → `.build/*.html`
   (Schriften aus `assets/fonts.css`, Gehirn-Motiv aus `assets/brain-freigestellt.png`,
   Logo/Portrait aus `public/`)
3. `generate.mjs` – rendert die HTML-Seiten mit Chromium zu PDF und mergt das
   Arbeitsheft (Cover + Innenteil)

Zwischenstände landen in `tools/pdf/.build/` (git-ignoriert).

## Dateien

```
tools/pdf/
  generate.mjs          Orchestrator (npm run pdf)
  extract-content.mjs   Inhalte aus TS → content.json
  build-ebook.py        HTML fürs E-Book
  build-member.py       HTML für die Mitglieder-Dokumente
  assets/
    fonts.css           Marken-Schriften (Fraunces + Inter, eingebettet)
    brain-freigestellt.png  Gehirn-Motiv (freigestellt) fürs Cover
  README.md
```
