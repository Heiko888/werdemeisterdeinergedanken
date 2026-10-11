# Eingabe-Ordner für persönliche Marken-Grafiken

Lege hier dein **freigestelltes** Portrait als PNG ab:

    docs/marketing/_input/portrait.png   (transparenter Hintergrund empfohlen)

Danach rendern:

    node tools/marketing/personal-brand.mjs
    # optional: SCALE=2 …  (doppelte Auflösung),  THEME=hell …  (nur Creme)

Ergebnis: `docs/marketing/personal/WMDG-Personal-<format><theme>.png`
(Foto auf Marken-Hintergrund mit zentralem Glow – 1:1, 4:5, 9:16, 16:9;
je Creme/Dunkel/Türkis/Türkis-Creme).
