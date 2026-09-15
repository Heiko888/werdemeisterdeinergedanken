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
OUT="../../../public/social/weisheiten"
BUILD="build"
W=1080; H=1350; WIN_H=1470   # WIN_H = H + Überscan gegen Headless-Versatz

command -v node >/dev/null || { echo "node fehlt"; exit 1; }
[ -x "$CHROME" ] || { echo "Chromium nicht gefunden: $CHROME (via \$CHROME setzen)"; exit 1; }

mkdir -p "$OUT"
node gen-portrait.js
node gen-posen.js

shopt -s nullglob
for html in "$BUILD"/*.html; do
  base="$(basename "$html" .html)"
  "$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars \
    --force-device-scale-factor=1 --window-size=${W},${WIN_H} \
    --screenshot="$BUILD/_big.png" "file://$(pwd)/$html" >/dev/null 2>&1
  node lib/pngcrop.js "$BUILD/_big.png" "$OUT/$base.png" $W $H >/dev/null
  echo "  $OUT/$base.png"
done
rm -f "$BUILD/_big.png"
echo "Fertig: $(ls "$OUT"/weisheit-*.png | wc -l) PNGs in $OUT"
