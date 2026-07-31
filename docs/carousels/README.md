# Carousel-Studio – gebrandete Slides aus den Skripten

Rendert jede Carousel-Slide als gebrandetes Bild (4:5, 1080×1350) – im selben
Look wie das Cover-Studio (Marken-Schrift Fraunces/Inter, leaf→teal-Verlauf,
Logo). **Quelle der Slide-Texte sind die Markdown-Dateien** in
`docs/skripte/carousels/` – hier wird nichts doppelt gepflegt.

## So funktioniert es
```
npm run carousels:slides     # baut die Slide-HTMLs → docs/carousels/build/
npm run carousels:png        # baut + exportiert alle Slides als PNG
node docs/carousels/export-png.mjs stufen            # nur eine Serie
node docs/carousels/export-png.mjs stufen autopilot  # Serie + ein Carousel
SCALE=2 npm run carousels:png                        # doppelte Auflösung
```
- **Vorschau im Browser:** nach `carousels:slides` die Datei
  `docs/carousels/build/index.html` öffnen und ein Carousel anklicken.
- **PNG-Ergebnis:** `docs/carousels/export/<serie>/<slug>/slide-NN.png`.
- Optional eigenes Hintergrundbild als `vorlage.png` in einen Slide-Ordner legen.

## Slide-Rollen (automatisch erkannt)
- **Cover** (Slide 1): große Headline + Unterzeile + „wischen →"
- **Body** (mittlere Slides): Thema als Eyebrow, Text auto-skaliert nach Länge
- **CTA** (letzte Slide): „Dein nächster Schritt" + Handle

Fortschrittspunkte und Handle sitzen auf jeder Slide.

## Texte ändern
Die Slide-Texte stehen in `docs/skripte/carousels/<serie>.md`
(Format: `**Slide N · Cover/CTA:** …`). Danach einfach neu bauen.
Der Parser (`data.mjs`) liest sie ein; das Layout kommt aus `build.mjs`.

## Serien
Mentale Selbstverteidigung (16) · Die 7 Stufen (7) · Praxis (13) ·
Vertiefungen (13) = **49 Carousels, 330 Slides**.

> Generierte Dateien (`build/`, `export/`) und die kopierten Assets
> (`_fonts.css`, `logo.png`) sind bewusst aus Git ausgenommen – sie entstehen
> aus dem Generator und dem Cover-Studio.
