#!/usr/bin/env bash
# Rendert beide Serien (Serie A Porträt + Serie B Posen) zu fertigen 1080x1350-PNGs.
#
# Voraussetzung: ein headless Chromium. Pfad via $CHROME setzbar, sonst wird der
# Playwright-Chromium dieses Environments genutzt.
#
# Ablauf: HTML erzeugen (Node) -> mit 60px Überscan rendern (Headless-Viewport-
# Versatz) -> mit lib/pngcrop.js exakt auf 1080x1350 zuschneiden.
set -euo pipefail
cd "$(dirname "$0")"

CHROME="${CHROME:-/opt/pw-browsers/chromium-1194/chrome-linux/chrome}"
# Ausgabe unter tools/.../output – bewusst NICHT unter public/, damit die großen
# Bilder nicht Teil des Vercel-Deployments werden (Deploy-Größenlimit).
OUT="output"
BUILD="build"
W=1080
OVERSCAN=120   # Überscan gegen Headless-Viewport-Versatz, wird weggeschnitten

command -v node >/dev/null || { echo "node fehlt"; exit 1; }
[ -x "$CHROME" ] || { echo "Chromium nicht gefunden: $CHROME (via \$CHROME setzen)"; exit 1; }

mkdir -p "$OUT" "$BUILD"
rm -f "$BUILD"/*.html "$BUILD"/*.png   # alte Zwischenstände raus (sonst werden sie mitgerendert)
node gen-portrait.js        # Serie A (Porträt, 4:5 1080x1350)
node gen-posen.js           # Serie B (Posen, 4:5 1080x1350)
node gen-story-posen.js     # Serie C1 (Posen-Story, 9:16 1080x1920)
node gen-story-portrait.js  # Serie C2 (Porträt-Story, 9:16 1080x1920)

shopt -s nullglob
for html in "$BUILD"/*.html; do
  base="$(basename "$html" .html)"
  case "$base" in
    *story*) H=1920 ;;   # 9:16
    *)       H=1350 ;;   # 4:5
  esac
  "$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars \
    --force-device-scale-factor=1 --window-size=${W},$((H + OVERSCAN)) \
    --screenshot="$BUILD/_big.png" "file://$(pwd)/$html" >/dev/null 2>&1
  node lib/pngcrop.js "$BUILD/_big.png" "$OUT/$base.png" $W $H >/dev/null
  echo "  $OUT/$base.png"
done
rm -f "$BUILD/_big.png"
echo "Fertig: $(ls "$OUT"/weisheit-*.png | wc -l) PNGs in $OUT"
