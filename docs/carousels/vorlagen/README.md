# Eigene Foto-Hintergründe für Carousels

Hier liegen **deine eigenen Fotos**, die als Hintergrund in Carousel-Slides
eingebrannt werden (Cover- und CTA-Slide). Body-Slides bleiben bewusst auf dem
Marken-Verlauf – dort steht langer Text.

> Die Bilddateien selbst sind **gitignoriert** (nicht im Repo), nur diese README
> ist versioniert. So bleiben große/private Fotos lokal bzw. auf dem Server.

## Ablage

```
docs/carousels/vorlagen/<serie>/<slug>/<format>.png   ← pro Format (empfohlen)
docs/carousels/vorlagen/<serie>/<slug>/vorlage.png    ← ein Foto für alle Formate
```

- `<serie>` = `selbstverteidigung` · `stufen` · `praxis` · `vertiefungen` · `mitgliederbereich`
- `<slug>` = der Carousel-Ordnername (z. B. `autopilot`) – wie unter
  `docs/carousels/build/<serie>/<slug>/` bzw. `docs/carousels/export/<serie>/<slug>/`.
- `<format>` = `feed-4x5` (1080×1350) · `feed-1x1` (1080×1080) · `reel-9x16` (1080×1920)

Der Build sucht **zuerst** `<format>.png`, sonst `vorlage.png`. Fehlt beides,
bleibt der normale Marken-Verlauf (kein Foto).

### Beispiel

```
docs/carousels/vorlagen/stufen/autopilot/feed-4x5.png
docs/carousels/vorlagen/stufen/autopilot/feed-1x1.png
docs/carousels/vorlagen/stufen/autopilot/reel-9x16.png
```

## Bild-Tipps

- **Motiv/Gesicht** in die **obere/mittlere** Bildhälfte, Text steht zentriert;
  seitlicher Freiraum hilft. Details: `docs/marketing/BILDPLAN-Fotohintergruende.md`.
- Am besten **je Format separat croppen** (4:5 ≠ 1:1 ≠ 9:16).
- Foto ruhig, warm, natürliche Hauttöne – siehe Brandbook `06-bildwelt.md`.
- Der Build legt automatisch einen **kräftigeren Scrim** über das Foto, damit
  der Text lesbar bleibt (dunkle Welten dunkeln ab, Creme-Welten hellen auf).

## Erzeugen

```bash
node docs/carousels/build.mjs          # Slide-HTML (Foto wird eingebettet)
node docs/carousels/export-png.mjs     # PNG-Export nach docs/carousels/export/
# nur eine Serie / ein Carousel:
node docs/carousels/export-png.mjs stufen autopilot
```
