# Instagram-Weisheiten (Serie)

Generatoren für zwei markengerechte 8-teilige Instagram-Serien (Format **4:5 / 1080×1350**)
mit den gleichen 8 Weisheiten – reproduzierbar aus Repo-Dateien.

- **Serie A – Kopf-Porträt** (`gen-portrait.js`): das Sonnenaufgang-Porträt
  (`public/heiko-hero.webp`), variiert per Spiegelung + Ausschnitt.
- **Serie B – Ganzkörper-Posen** (`gen-posen.js`): 5 freigestellte Posen
  (`public/social/weisheiten/quellen/`) ins Bergmotiv (`public/hero-bg-berge.webp`)
  gesetzt, 3 davon gespiegelt → 8 Posts.

Look: Navy-Grund, Gold-Akzente, Schriften **Inter** (Fließtext) + **Fraunces** (goldene
Kursiv-Schlüsselwörter), Logo unten (freigestelltes Gehirn + Wortmarke). Das **Gesicht
ist immer das echte Foto** – keine KI-Veränderung, nur Rahmung/Spiegelung/Ausschnitt.

## Erzeugen

```bash
cd tools/social/weisheiten
./render.sh            # nutzt Playwright-Chromium des Environments
# oder eigenes Chromium:
CHROME=/pfad/zu/chrome ./render.sh
```

Ergebnis: 16 PNGs in `public/social/weisheiten/`
(`weisheit-portrait-01…08.png`, `weisheit-pose-01…08.png`).

Warum „Überscan + Crop": Headless-Chromium hat einen kleinen Viewport-Versatz; deshalb
wird mit 1080×1470 gerendert und mit `lib/pngcrop.js` (nur Node/zlib, ohne Fremd-Libs)
exakt auf 1080×1350 zugeschnitten.

## Anpassen / erweitern

- **Neue Weisheit**: in `quotes.js` einen Eintrag ergänzen
  (`html` mit `<br>` für Zeilen, `<em>…</em>` für goldene Schlüsselwörter, Zeilen kurz halten).
  Dann in `gen-portrait.js` (`VARIANTS`) bzw. `gen-posen.js` (`POSTS`) einen Post zuordnen.
- **Neue Pose**: freigestelltes PNG (transparent, ~1024×1536) nach
  `public/social/weisheiten/quellen/` legen, in `assets.js` (`posen`) registrieren und in
  `gen-posen.js` die Silhouetten-Box `BBOX` eintragen (min/max x/y der nicht-transparenten
  Fläche) sowie einen `POSTS`-Eintrag ergänzen. Platzierung: `targetH` = Figurhöhe in px,
  `centerX` = horizontale Mitte, `footY` = Fußlinie, `flip` = spiegeln, `textSide` = Textseite.
- **Captions/Hashtags**: siehe `captions.md`.

## Dateien

| Datei | Zweck |
|---|---|
| `quotes.js` | die 8 Weisheiten (geteilt von beiden Serien) |
| `assets.js` | lädt Schriften/Bilder aus dem Repo als base64-Data-URIs |
| `gen-portrait.js` | Serie A (Porträt) → HTML nach `build/` |
| `gen-posen.js` | Serie B (Posen) → HTML nach `build/` |
| `render.sh` | HTML erzeugen + rendern + auf 1080×1350 zuschneiden |
| `lib/pngcrop.js` | PNG-Crop (nur Node/zlib) |
| `captions.md` | fertige Feed-Captions + Hashtags je Weisheit |
