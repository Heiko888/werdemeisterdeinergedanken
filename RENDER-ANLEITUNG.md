# Render-Anleitung – Carousels & Reels-Cover lokal erzeugen

Die **Carousel- und Reels-Cover-Bilder** sind bewusst *nicht* im Repo (sie sind
Build-Artefakte und stehen in `.gitignore`). Du erzeugst sie mit wenigen Befehlen
selbst. Ergebnis: **alle Formate × alle 4 Farbwelten** (Gold/Türkis × Dunkel/Creme).

> Schon fertig im Repo (kein Rendern nötig): Instagram-Weisheiten
> (`tools/social/weisheiten/output/` + ZIPs unter `…/download/`), die Marketing-
> Bilder (`docs/marketing/…`) und alle PDFs (`content/pdf/`, `docs/workshop/`).
> Diese bekommst du direkt über **„Code → ZIP herunterladen"** auf GitHub.

## Voraussetzungen (einmalig)
- **Node.js 18+** – https://nodejs.org

## 1) Repo holen & vorbereiten
```bash
git clone -b claude/exciting-brahmagupta-9ezawa https://github.com/Heiko888/werdemeisterdeinergedanken.git
cd werdemeisterdeinergedanken
npm install
npx playwright install chromium
```

## 2) Rendern
```bash
# Marketing-/Funnel-Carousels (7 Serien × 4 Farbwelten × 3 Formate)
node docs/carousels/marketing-serien.mjs

# Studio-Carousels (7 Stufen, Praxis, Vertiefungen, Selbstverteidigung, Mitgliederbereich)
npm run carousels:slides && npm run carousels:png

# Alle Reels-Cover (Landing, 7 Stufen, Praxis, Selbstverteidigung, Vertiefungen, Wissenschaft, Endcard)
npm run covers && npm run covers:png
```

## 3) Ergebnis-Ordner
| Inhalt | Pfad |
|---|---|
| Carousels (Marketing + Studio) | `docs/carousels/export/<serie>/<format-farbwelt>/slide-NN.png` |
| Reels-Cover | `docs/reels/covers/export/<serie>/<format-farbwelt>/…` |

Formate: `feed-4x5`, `feed-1x1`, `reel-9x16` (Carousels) bzw. zusätzlich
`landscape-16x9`, `pin-2x3` (Reels-Cover).
Farbwelt-Suffixe: *(ohne)* = Gold·Dunkel, `-hell` = Gold·Creme,
`-tuerkis` = Türkis·Dunkel, `-tuerkis-hell` = Türkis·Creme.

Nur eine Farbwelt/ein Format? Beispiele:
```bash
THEME=dunkel node docs/carousels/marketing-serien.mjs        # nur Gold·Dunkel
FORMAT=feed-4x5 node docs/carousels/marketing-serien.mjs      # nur 4:5
```

## Zugehörige Texte / Captions
- Carousel-Captions: `docs/skripte/carousels/*.md`
- Instagram-Weisheiten-Captions: `tools/social/weisheiten/captions.md`

## Bei Problemen
- „Kein Chromium gefunden": `npx playwright install chromium` erneut ausführen
  oder `CHROME_BIN=/pfad/zu/chrome` vor den Befehl setzen.
- Wenig Speicher/Abbruch: einzeln pro Format rendern (`FORMAT=…`, s. o.).
