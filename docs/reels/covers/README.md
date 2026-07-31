# Cover-Studio – alle Bereiche, alle Formate

Fertige Reel-/Themen-Cover für **jeden** Inhaltsbereich, in **fünf** Formaten.
Marken-Schrift (Fraunces/Inter) und leaf→teal-Verlauf wie auf der Website,
Logo (freigestelltes Neon-Gehirn) und Handle sind schon gesetzt.

## Struktur
```
covers/
  build.mjs           ← Generator (eine Quelle der Wahrheit)
  _fonts.css          ← eingebettete Marken-Schriften (geteilt)
  logo.png            ← Logo (geteilt)
  index.html          ← Übersicht aller Bereiche  ➜ hier starten
  <bereich>/
    index.html        ← Format-Auswahl des Bereichs
    <format>/
      cover-01.html … ← die Cover
      _cover.css      ← Layout des Formats
      index.html      ← Galerie des Formats
      vorlage.png     ← DU legst hier deinen Hintergrund ab (optional)
```

## Bereiche
| Bereich | Ordner | Motive | Tag oben |
|---|---|---|---|
| Mentale Selbstverteidigung | `selbstverteidigung/` | 16 | „Mentale Selbstverteidigung · NN" |
| Die 7 Stufen | `stufen/` | 7 | „Die 7 Stufen · NN" |
| Praxis (Autopilot-Check, Atem, …) | `praxis/` | 13 | „Praxis · NN" |
| Vertiefungen | `vertiefungen/` | 13 | „Vertiefung · NN" |

## Formate
| Ordner | Format | Größe | Wofür |
|---|---|---|---|
| `reel-9x16/` | 9:16 | 1080×1920 | Reels, Stories, TikTok |
| `feed-4x5/` | 4:5 | 1080×1350 | Instagram-Feed (Hochformat) |
| `feed-1x1/` | 1:1 | 1080×1080 | Feed-Post quadratisch |
| `landscape-16x9/` | 16:9 | 1920×1080 | YouTube-Thumbnail, Querformat |
| `pin-2x3/` | 2:3 | 1000×1500 | Pinterest |

## So machst du daraus Bilder
1. Optional: dein Hintergrundbild als **`vorlage.png`** in den jeweiligen
   `<bereich>/<format>/`-Ordner legen (sonst zeigt sich der gebrandete Verlauf).
2. `index.html` im Ordner `covers/` öffnen und durchklicken – oder direkt eine
   `cover-NN.html` im Browser öffnen.
3. **Automatisch als PNG exportieren** (empfohlen – ein Befehl, alle Cover):
   ```
   npm run covers:png                       # alle Bereiche & Formate
   node docs/reels/covers/export-png.mjs stufen          # nur ein Bereich
   node docs/reels/covers/export-png.mjs stufen reel-9x16   # Bereich + Format
   SCALE=2 npm run covers:png               # doppelte Auflösung
   ```
   Ergebnis: `docs/reels/covers/export/<bereich>/<format>/cover-NN.png` –
   pixelgenau, gerendert mit demselben Chromium wie die PDF-Pipeline.
   (Alternativ von Hand: DevTools-Geräteansicht auf die Zielgröße, Screenshot.)

## Texte/Motive ändern oder ergänzen
Alles steht **an einer Stelle**: in `build.mjs` im Array `COLLECTIONS`
(Headline, Akzentwort via `A("…")`, `cls:"small"` bei viel Text). Danach:
```
node docs/reels/covers/build.mjs
```
…und alle Cover in allen Formaten werden neu erzeugt.

Mit optionalem Pfad zusätzlich eine in sich geschlossene Galerie
(Fonts + Logo eingebettet) für die Browser-/Artifact-Vorschau:
```
node docs/reels/covers/build.mjs /pfad/cover-studio.html
```
