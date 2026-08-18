# Content-Inventar

Vollständige Bestandsaufnahme aller Inhalte (Quell-Daten und erzeugte Assets).
Alle Zahlen sind per `grep`/`find`/`ls` gezählt, nicht geschätzt. Zuständiger
Team-Agent: **content-inventar**.

---

## 1. Daten-Module (`src/lib/*.ts`) — Quelle der Wahrheit

### Inhalts-tragende Kern-Module

| Datei | Inhaltsart | Einträge | Genutzt von Generator |
|---|---|---|---|
| `content.ts` | Startseite: 7 Stufen, 4 Werte, 3 Erwartungen, 6 Testimonials, 5 FAQs | — | `extract-content.mjs`, `video-thumbnails.mjs` |
| `deep-dives.ts` | Vertiefungen (Langtexte) | **29** | `extract-content.mjs`, `video-thumbnails.mjs` |
| `stage-lessons.ts` | Lektions-Inhalte der 7 Stufen (Mitglieder) | **7** | `extract-content.mjs` → `build-member.py` |
| `practices.ts` | Praxis-Übungen | **13** | `video-thumbnails.mjs` |
| `blog.ts` | Blog-Artikel | **23** | (Website-Runtime) |
| `consciousness-test.ts` | Bewusstseinstest | 21 Aussagen / 7 Test-Stufen | (Website-Runtime) |
| `impulses.ts` | Wöchentliche E-Mail-Impulse | **7** | (E-Mail-Runtime) |
| `wissensdatenbank.ts` | Loader für `content/wissensdatenbank/*.md` | — | liest MD zur Laufzeit |

### Produktions-Status-Tracker (Marketing-Cockpit)

| Datei | Inhaltsart | Einträge | Serien |
|---|---|---|---|
| `reels.ts` | Reel-Produktionsstatus | **97** | 6: selbstverteidigung 16, stufen 21, praxis 26, vertiefungen 26, landing 1, wissenschaft 7 |
| `carousels.ts` | Carousel-Produktionsstatus | **53** | 5: Selbstverteidigung 16, 7 Stufen 8, Praxis 13, Vertiefungen 13, Marketing 3 |

### Struktur/Logik-Module

- `vorlagen.ts` — `vorlagenKatalog` (8 Gruppen).
- `vorlagen-assets.ts` — **AUTO-GENERIERT** (`npm run vorlagen:galerie`),
  Galerie-Index aller `content/vorlagen/`-Dateien (~170 KB).
- `gedankenprofil.ts`, `standortbestimmung.ts`, `journal.ts` — Auswertungslogik.
- `site.ts` — Seiten-Metadaten, `mainNav`, `legalNav`.
- Infrastruktur (kein redaktioneller Inhalt): `admin*.ts`, `analytics.ts`,
  `blog-accent.ts`, `cn.ts`, `ebook-mail.ts`, `gradients.ts`, `membership.ts`,
  `stripe.ts`.

> **Hinweis Deep-Dives:** Die **29** teilen sich in 13 klassische Vertiefungen
> und 16 „Mentale Selbstverteidigung". Die öffentliche `projektstruktur.md`
> zählt teils nur die 13 Vertiefungen — beim Reproduzieren der Mitglieder-PDFs
> zählen alle 29 (`vertiefung-<slug>.pdf`).

---

## 2. Content-Ordner (`content/`)

**`content/wissensdatenbank/`** — 29 Markdown: 27 nummerierte Fachartikel
(`01-neuroanatomie…` bis `27-das-unbewusste`) + `README.md` + `glossar.md`.

**`content/vorlagen/carousels/`** — 54 Ordner (+ 54 gleichnamige `.zip`); je
Ordner `slide-01.webp … slide-NN.webp` (5–9 Slides):

| Präfix | Ordner |
|---|---|
| `marketing__` | 5 |
| `praxis__` | 13 |
| `stufen__` | 7 |
| `vertiefungen__` | 13 |
| `selbstverteidigung__` | 16 |
| **Summe** | **54** (+ 54 ZIP) |

**`content/vorlagen/reels/`** — 59 `.webp` (reel-landing 3, reel-praxis 13,
reel-selbstverteidigung 16, reel-stufen 7, reel-vertiefungen 13,
reel-wissenschaft 7).

**`content/vorlagen/thumbs/`** — `reels/` 59 `.webp`, `social/` 108 `.webp`.

**`content/vorlagen/social/`** — 108 `.webp` (`social-001 … social-108`).

**`content/vorlagen/story/`** — 6 Ordner + 6 gleichnamige `.zip`
(Titel-Overlays „Persönliche Geschichten", aus
`tools/marketing/story-overlays.mjs`).

**`content/vorlagen/story-carousel/`** — 1 Ordner + 1 `.zip` (komplette
Bild-Geschichte, aus `tools/marketing/story-carousels.mjs`).

> **Noch nicht gebaut:** `content-overlay/`, `cover-overlay/` und
> `carousel-overlay/` fehlen im Repo — die zugehörigen Generatoren bzw. der
> Overlay-Export kamen nach dem letzten `npm run vorlagen:galerie`-Lauf dazu.
> Sie entstehen beim nächsten Vollbau.

**`content/vorlagen/workshop/`** — 39 Dateien: 5 Carousel-Text-PDFs, 8
Moderationspläne, 6 Reel-Drehbücher, 3 Video-Drehbücher, 8 Workbooks, 8
Workshops (PPTX) + 1 Präsentationsvorlage (PPTX).

**`content/pdf/`** — 44 fertige PDFs: 14 Stufen-PDFs (`stufe-1…7` × `lektion`/
`uebungen`) + 1 `arbeitsheft.pdf` + 29 `vertiefung-*.pdf`.

---

## 3. Erzeugte Dokumente (`docs/`)

Aggregat: **86 Markdown**, **106 PNG**, **30 PDF**, **9 PPTX**.

- `docs/ebook/` — 2 MD (die Quellen der E-Books).
- `docs/buch-1-verwertung/` — 5 MD.
- `docs/workshop/` — 40 Dateien (12 Themen-Unterordner + README; 30 PDF, 9 PPTX).
- `docs/skripte/` — **70 MD** (Marketing-Rohtexte): carousels 6, landing 2,
  praxis 13, reels 5, stufen 7, stufen-komplett 7, vertiefungen 14,
  vertiefungen-komplett 14, wissenschaft 1 + README. **Quelle der Carousel-/
  Reel-/Video-Generatoren.**
- `docs/marketing/` — **160 PNG** + Generator-Skripte (nach Kanal gruppiert);
  darin die Overlay-Ordner `story-overlays/`, `story-carousels/` und
  `content-overlays/` aus `tools/marketing/*.mjs`.
- `docs/carousels/` & `docs/reels/covers/` — Generatoren + Templates (Ausgabe
  landet in `content/vorlagen/` bzw. `export/`).
- `docs/audit/` — 1 Prüfbericht.
- Lose: `DOMAIN-UMZUG.md`, `EMAIL-IMPULSE.md`, `LOKAL-INSTALLIEREN.md`,
  `STRIPE-MITGLIEDSCHAFT.md`, `projektstruktur.md`.

---

## 4. Öffentliche Downloads (`public/`)

| Asset | Typ |
|---|---|
| `Die-7-Stufen-der-Bewusstseinsentwicklung.pdf` | Haupt-Lead-Magnet (5,3 MB) |
| `ebook-cover.webp`, `ebook-mockup.webp` | E-Book-Grafiken |
| `heiko-*.png/.webp`, `ueber-heiko-hund.webp` | Portrait-Assets |
| `hero-*.webp`, `kompass-weg.webp` | Hero-Bilder |
| `logo-*.png`, `logo.svg` | Logos |
| `video-thumbnails/` | 49 Dateien (praxis, stufen, vertiefungen) |

Nur **eine** fertige PDF im öffentlichen Bereich (7-Stufen-E-Book); die
Mitglieder-PDFs liegen geschützt unter `content/pdf/`.

---

## Gesamt-Zusammenfassung

| Kategorie | Menge |
|---|---|
| Stufen | **7** |
| Vertiefungen / Deep-Dives | **29** (13 Vertiefungen + 16 Mentale Selbstverteidigung) |
| Praxis-Übungen | **13** |
| Blog-Artikel | **23** |
| Wissensdatenbank | **27** Fachartikel (+ README + Glossar) |
| Bewusstseinstest | 21 Aussagen / 7 Test-Stufen |
| E-Mail-Impulse | 7 |
| Carousels | 53 im Status-Katalog · **54 Bildordner** (+ 54 ZIP) |
| Reels | 97 im Status-Katalog · **59 Cover** (+ 59 Thumbs) |
| Social-Grafiken | 108 (+ 108 Thumbs) |
| Mitglieder-PDFs (`content/pdf/`) | 44 |
| Workshop-Materialien | 39 |
| Marketing-Rohtext-Skripte (`docs/skripte/`) | 70 MD |

**Auffälligkeiten:** `carousels.ts`/`reels.ts` sind Status-Tracker fürs Cockpit
und weichen bewusst leicht von den tatsächlich erzeugten Asset-Ordnern ab
(z. B. Marketing 3 im Katalog vs. 5 Bildordner). `src/lib/vorlagen-assets.ts`
ist auto-generiert und indexiert alle `content/vorlagen/`-Dateien für die
Admin-Galerie.
