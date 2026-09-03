# Repo-Analyse: Warum das Container-Clonen so lange dauert

**Datum:** 2026-09-03
**Erstellt von:** Claude Code (Analyse, keine Änderungen am Repo)

## Kurzfassung

Es gibt **keine echte Endlosschleife**. Der Container klont bei jedem Start das
komplette Git-Repository — und das ist **3,4 GB groß**, obwohl die aktuellen
Dateien nur 1,4 GB ausmachen. Der große, langsame Download sieht aus wie
„hängt / Dauerschleife".

**Ursache:** Generierte Binärdateien (vor allem **PNGs**) liegen im Git und
werden bei jeder Neu-Generierung wieder committet. Git speichert jede Version
einer Binärdatei **komplett** (keine Kompression/Deltas) → die History wächst
mit jedem Marketing-Build.

## Die Zahlen

| Kennwert | Wert |
|----------|------|
| `.git`-History (wird beim Clonen komplett geladen) | **3,4 GB** |
| Aktuelle Arbeitsdateien (working tree) | 1,4 GB |
| Commits | 193 |
| Blob-Versionen in der History gesamt | 7.883 |

### Verbrauch der History nach Dateityp

| Typ | Größe in History | Versionen |
|-----|------------------|-----------|
| **.png** | **4.109 MB (≈ 4 GB!)** | 5.779 |
| .pdf | 297 MB | 276 |
| ohne Endung | 28 MB | 12 |
| .pptx | 15 MB | 9 |
| .webp | 13 MB | 92 |
| gesamter Code (tsx/ts/mjs/css/md/html) | < 20 MB | — |

→ **PNGs allein machen ~93 % der History aus.** Der eigentliche Quellcode ist
winzig (< 20 MB).

### Verbrauch nach Verzeichnis (über alle Versionen)

| Verzeichnis | Größe in History |
|-------------|------------------|
| **docs/** | **3.684 MB** |
| public/ | 610 MB |
| content/ | 131 MB |
| tools/ | 46 MB |
| src/ (Code) | 4,6 MB |

### Aktueller Stand (getrackte Dateien)

- **1.889 PNGs** aktuell im Git-Tracking (1,26 GB)
- davon **1.635 in `docs/`**
- **`docs/marketing/` allein: 1,1 GB**

## Warum die PNGs das Problem sind

Die Assets in `docs/marketing/`, `docs/carousels/` usw. sind **generierte
Ausgaben**. In `package.json` gibt es Generatoren, z. B.:

```
"marketing:all": "npm run brand-assets && npm run content-overlays && ...",
"carousels:png": "node docs/carousels/export-png.mjs",
```

Jeder Lauf erzeugt leicht veränderte PNGs. Werden diese committet, landet
**jede Version in voller Größe** dauerhaft in der History. Beispiele mit
mehrfachen Voll-Kopien:

| Datei | Voll-Versionen in History |
|-------|---------------------------|
| public/Die-7-Stufen-...pdf | 7 |
| tools/print/out/WMDG-Visitenkarte.pdf | 8 |
| tools/print/out/WMDG-Briefpapier*.pdf | je 8 |
| docs/marketing/instagram/WMDG-Instagram-Story-*.png | je 4 |
| docs/marketing/whatsapp-mitgliedschaft/**/*.png | je 4 |

## Handlungsoptionen (noch nicht umgesetzt)

1. **Zukunft entkoppeln (sanft, ungefährlich):**
   Generierte Assets aus dem Tracking nehmen (`git rm --cached`) und per
   `.gitignore` ausschließen. Die History bleibt groß, wächst aber nicht
   weiter. Kein History-Rewrite.

2. **History bereinigen (radikal, größte Wirkung):**
   Alte Binärversionen mit `git filter-repo` aus der History entfernen. Das
   Repo schrumpft auf ~Arbeitsgröße (grob 0,3–0,5 GB Code + benötigte Assets).
   **Achtung:** schreibt History um → `force-push`, alle Klone/Mitarbeitenden
   müssen neu klonen.

3. **Git LFS:** Große Assets nach Git LFS auslagern; Clone lädt nur Pointer,
   Dateien on-demand. Braucht LFS-Unterstützung beim Hosting + Rewrite.

**Empfehlung:** Kombination aus 1 + 2 — generierte PNGs/PDFs künftig ignorieren
**und** einmalig die History bereinigen. Danach klont der Container in Sekunden
statt Minuten.

## Nächster Schritt

Diese Datei ist reine Analyse. Für eine tatsächliche Bereinigung bitte
freigeben, welche Option (1/2/3) umgesetzt werden soll.
