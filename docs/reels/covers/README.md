# Cover-Studio – alle Bereiche, alle Formate

Fertige Reel-/Themen-Cover für **jeden** Inhaltsbereich, in **fünf** Formaten
und **vier Farbwelten**. Marken-Schrift (Fraunces/Inter), das Marken-Lockup
oben links (**Gehirn + Wortmarke „Werde Meister / Deiner Gedanken"**) und der
Handle sind schon gesetzt.

## Vier Farbwelten
Jedes Cover gibt es in allen vier Marken-Welten (Datei-Suffix = Welt):

| Welt | Suffix | Grund | Akzent | Gehirn |
|---|---|---|---|---|
| Gold · Dunkel | *(kein)* | Navy | Gold | Gold-Front (`logo-gold.png`) |
| Gold · Creme | `-hell` | Creme | Gold | Gold-Front (`logo-gold.png`) |
| Türkis · Navy | `-tuerkis` | Navy | Grün→Türkis | Seiten-Gehirn bunt (`logo.png`) |
| Türkis · Creme | `-tuerkis-hell` | Creme | Grün→Türkis | Seiten-Gehirn bunt (`logo.png`) |

## Struktur
```
covers/
  build.mjs           ← Generator (eine Quelle der Wahrheit)
  data.mjs            ← Motive, Formate, Farbwelten-Palette
  _fonts.css          ← eingebettete Marken-Schriften (geteilt)
  logo.png            ← Seiten-Gehirn bunt (Türkis-Welten)
  logo-gold.png       ← Gold-Front-Gehirn (Gold-Welten)
  index.html          ← Übersicht aller Bereiche  ➜ hier starten
  <bereich>/
    index.html        ← Format-Auswahl des Bereichs
    <format>/
      cover-01.html …           ← Cover (Gold · Dunkel, ohne Suffix)
      cover-01-hell.html …      ← Gold · Creme
      cover-01-tuerkis.html …   ← Türkis · Navy
      cover-01-tuerkis-hell.html … ← Türkis · Creme
      _cover.css / _cover-*.css ← Layout je Format & Welt
      index.html                ← Galerie des Formats (alle 4 Welten)
      vorlage.png               ← DU legst hier deinen Hintergrund ab (optional)
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
   npm run covers:png                       # alle Bereiche, Formate & Welten
   node docs/reels/covers/export-png.mjs stufen          # nur ein Bereich
   node docs/reels/covers/export-png.mjs stufen reel-9x16   # Bereich + Format
   node docs/reels/covers/export-png.mjs stufen reel-9x16 tuerkis  # + nur eine Welt
   SCALE=2 npm run covers:png               # doppelte Auflösung
   ```
   Ergebnis: `docs/reels/covers/export/<bereich>/<format>/cover-NN<welt>.png` –
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
