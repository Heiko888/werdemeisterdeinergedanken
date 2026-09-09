# Quell-Bilder (nicht ausgeliefert)

Hier liegen hochauflösende Original-Uploads, aus denen ausgelieferte Bilder
abgeleitet werden. Dieser Ordner liegt bewusst **nicht** unter `public/`:
alles unter `public/` stellt Next.js unter genau seinem Pfad öffentlich bereit,
und diese Dateien sind mit 7–10 MB zu groß, um sie an Besucher auszuliefern.

| Datei | Abgeleitet nach | Womit |
|-------|-----------------|-------|
| `buchcover-mockup-3d.png` (3000×4000, Alpha) | `public/buch-cover-3d.webp` (1400×1904, 221 KB) | `sharp().trim().resize(1400).webp({quality:92, alphaQuality:100})` |
| `heiko-portrait-freigestellt.png` (3000×4000, Alpha) | – noch ungenutzt – | |

Wird eine dieser Dateien auf der Website gebraucht, nicht das Original nach
`public/` kopieren, sondern eine verkleinerte WebP-Ableitung dort ablegen.
