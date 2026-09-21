# Instagram-Weisheiten (Serie)

Generatoren für zwei markengerechte 8-teilige Instagram-Serien (Format **4:5 / 1080×1350**)
mit den gleichen 8 Weisheiten – reproduzierbar aus Repo-Dateien.

- **Serie A – Kopf-Porträt** (`gen-portrait.js`): das Sonnenaufgang-Porträt
  (`public/heiko-hero.webp`), variiert per Spiegelung + Ausschnitt.
- **Serie B – Ganzkörper-Posen** (`gen-posen.js`): 5 freigestellte Posen
  (`tools/social/weisheiten/quellen/`) ins Bergmotiv (`public/hero-bg-berge.webp`)
  gesetzt, 3 davon gespiegelt → 8 Posts (4:5, 1080×1350).
- **Serie C1 – Posen-Story** (`gen-story-posen.js`): die Posen im **9:16-Format
  (1080×1920)**, Text oben, Logo unten (Story-UI-safe) → 8 Stories.
- **Serie C2 – Porträt-Story** (`gen-story-portrait.js`): das Porträt im **9:16-Format
  (1080×1920)**, gleicher Story-Aufbau → 8 Stories.
- **Serie D – Mini „Muster & Vermeidung"** (`gen-mini-muster.js`): 5 frontale Gesten-Posen
  (nichts sehen/hören/sagen, ratlos, Schulterzucken) mit eigenen Weisheiten, zentrierter
  Aufbau, je Motiv **4:5 + 9:16** → 10 Motive.
- **Serie E – „Klartext & Entscheidung" + E-Book** (`gen-klartext.js`): 5 aufrechte Gesten
  (Finger hoch, zeigen, Stopp, seitlich, Finger/verschränkt) mit klaren Weisheiten, plus
  1 **E-Book-CTA-Motiv** (goldene CTA-Pille). Zentrierter Aufbau, je Motiv **4:5 + 9:16** → 12 Motive.
- **Serie F – „Einladung & Reflexion"** (`gen-einladung.js`): 5 ruhige/einladende Gesten
  (Kinn, offene Hand, Hand aufs Herz, Ansprache) mit reflektierenden Weisheiten, zentrierter
  Aufbau, je Motiv **4:5 + 9:16** → 10 Motive.
- **Serie G – „Aufbruch & Energie"** (`gen-aufbruch.js`): 6 dynamische Posen (Sprung,
  Laufen, Hand reichen, Gehen/Zeigen, offene Arme, Finger hoch) mit energetischen
  Weisheiten, zentrierter Aufbau, je Motiv **4:5 + 9:16** → 12 Motive.
- **Serie H – „Haltung & Klarheit"** (`gen-haltung.js`): 6 Posen (Arme verschränkt
  seitl./frontal, Erklären, Zeigen seitl., Doppelzeiger, Finger hoch) mit klaren
  Weisheiten zum Standpunkt-Beziehen, je Motiv **4:5 + 9:16** → 12 Motive.
- **Motiv „Gold auf Schwarz"** (`gen-goldschwarz.js`): die Wandbild-Szene (Gold auf
  Schwarz streichen) als Full-Bleed-Bild mit Markentext „Wo andere nur Schwarz sehen,
  trägst du Gold auf.", je **4:5 + 9:16** → 2 Motive.
- **Einzel-Story „Papa, kannste mal erklären?"** (`gen-papa.js`): Hook-Story im **9:16-Format
  (1080×1920)** mit **2 Personen** – Junge (freigestellt, Blick nach oben, Rucksack) links,
  Papa (freigestellt, Hände in den Taschen, Blick zum Kind) rechts und größer, einander
  zugewandt. Text oben, Gold-Kursiv auf „erklären", je **9:16 + 4:5** → 2 Motive
  (`output/papa-erklaeren-9x16.png`, `output/papa-erklaeren-4x5.png`).

> **Hinweis:** Die Bilder liegen bewusst unter `tools/…` (Quellen + fertige
> Ausgabe), **nicht** unter `public/`. Sie sind Social-Assets/Build-Inputs und
> sollen **nicht** mit der Website auf Vercel deployt werden (sonst wächst der
> Deploy-Payload und der Vercel-Build schlägt am Größenlimit fehl).

Look: Navy-Grund, Gold-Akzente, Schriften **Inter** (Fließtext) + **Fraunces** (goldene
Kursiv-Schlüsselwörter), Logo unten (freigestelltes Gehirn + Wortmarke). Das **Gesicht
ist immer das echte Foto** – keine KI-Veränderung, nur Rahmung/Spiegelung/Ausschnitt.

**Wechselnde Hintergründe:** Jeder Post nutzt rotierend eines von 7 Sonnenaufgang-
Panoramen (`assets.js` → `backdrops`: das Original `hero-bg-berge.webp` plus 6 unter
`quellen/hintergruende/`). Neue Panoramen dort ablegen und in `assets.js` registrieren.

## Erzeugen

```bash
cd tools/social/weisheiten
./render.sh            # nutzt Playwright-Chromium des Environments
# oder eigenes Chromium:
CHROME=/pfad/zu/chrome ./render.sh
```

Ergebnis: 64 PNGs in `tools/social/weisheiten/output/`
(`weisheit-portrait-01…08`, `weisheit-pose-01…08`, `weisheit-story-posen-01…08`,
`weisheit-story-portrait-01…08`, `muster-01…05-<key>`, `klartext-01…05-<key>`,
`ebook-01-gratis` und `einladung-01…05-<key>` — jeweils `-4x5` und `-9x16`).

Warum „Überscan + Crop": Headless-Chromium hat einen kleinen Viewport-Versatz; deshalb
wird mit 1080×1470 gerendert und mit `lib/pngcrop.js` (nur Node/zlib, ohne Fremd-Libs)
exakt auf 1080×1350 zugeschnitten.

## Anpassen / erweitern

- **Neue Weisheit**: in `quotes.js` einen Eintrag ergänzen
  (`html` mit `<br>` für Zeilen, `<em>…</em>` für goldene Schlüsselwörter, Zeilen kurz halten).
  Dann in `gen-portrait.js` (`VARIANTS`) bzw. `gen-posen.js` (`POSTS`) einen Post zuordnen.
- **Neue Pose**: freigestelltes PNG (transparent, ~1024×1536) nach
  `tools/social/weisheiten/quellen/` legen, in `assets.js` (`posen`) registrieren und in
  `gen-posen.js` die Silhouetten-Box `BBOX` eintragen (min/max x/y der nicht-transparenten
  Fläche) sowie einen `POSTS`-Eintrag ergänzen. Platzierung: `targetH` = Figurhöhe in px,
  `centerX` = horizontale Mitte, `footY` = Fußlinie, `flip` = spiegeln, `textSide` = Textseite.
- **Captions/Hashtags**: siehe `captions.md`.

## Dateien

| Datei | Zweck |
|---|---|
| `quotes.js` | die 8 Weisheiten (geteilt von beiden Serien) |
| `assets.js` | lädt Schriften/Bilder aus dem Repo als base64-Data-URIs |
| `gen-portrait.js` | Serie A (Porträt, 4:5) → HTML nach `build/` |
| `gen-posen.js` | Serie B (Posen, 4:5) → HTML nach `build/` |
| `gen-story-posen.js` | Serie C1 (Posen-Story, 9:16) → HTML nach `build/` |
| `gen-story-portrait.js` | Serie C2 (Porträt-Story, 9:16) → HTML nach `build/` |
| `gen-mini-muster.js` | Serie D (Mini „Muster & Vermeidung", 4:5 + 9:16) → HTML nach `build/` |
| `gen-klartext.js` | Serie E („Klartext & Entscheidung" + E-Book, 4:5 + 9:16) → HTML nach `build/` |
| `gen-einladung.js` | Serie F („Einladung & Reflexion", 4:5 + 9:16) → HTML nach `build/` |
| `gen-papa.js` | Einzel-Story „Papa, kannste mal erklären?" (9:16 + 4:5) → HTML nach `build/` |
| `gen-aufbruch.js` | Serie G („Aufbruch & Energie", 4:5 + 9:16) → HTML nach `build/` |
| `gen-haltung.js` | Serie H („Haltung & Klarheit", 4:5 + 9:16) → HTML nach `build/` |
| `gen-goldschwarz.js` | Motiv „Gold auf Schwarz" (4:5 + 9:16) → HTML nach `build/` |
| `render.sh` | HTML erzeugen + rendern + auf 1080×1350 zuschneiden |
| `lib/pngcrop.js` | PNG-Crop (nur Node/zlib) |
| `captions.md` | fertige Feed-Captions + Hashtags je Weisheit |
