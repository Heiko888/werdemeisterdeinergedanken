# 09 · Marken-Übersicht (Farben, Logos & Vorlagen-Bestand)

Eine Admin-Seite im Marketing-Cockpit, die auf **einen Blick** zeigt, was es an
Marken-Material gibt – damit der Überblick nicht verloren geht.

**Route:** `/admin/marken-uebersicht` (nur Admin-E-Mails, `noindex`)
**Seite:** `src/app/admin/marken-uebersicht/page.tsx`
**Daten:** `src/lib/marken-uebersicht.ts`

## Was die Seite zeigt

1. **Die drei Farbwelten** – jedes Motiv entsteht in drei Welten:
   - **Dunkel · Gold** – Grund `#090b10`, Gold-Gehirn (`logo-brain-gold.png`) +
     Gold-Akzente. Standard (Datei **ohne** Suffix).
   - **Hell · Creme** – Grund `#f6f4ee`, Gold-Gehirn, Datei-Suffix `-hell`.
   - **Türkis · Teal** – Navy-Grund mit Teal-Schimmer, Türkis-Gehirn
     (`logo-brain-tuerkis.png`, Seitenansicht grün→teal→blau) + Grün→Teal-Akzente.
     Datei-Suffix `-tuerkis`. **Neu** – in allen Generatoren angelegt (siehe
     unten), Dateien entstehen beim Rendern.
2. **Komplettes Farbsystem** – alle Marken-Farben mit Hex-Wert, Token-Name und
   Rolle (Quelle: `src/app/globals.css`).
3. **Sämtliche Logos** – jedes Logo auf Creme **und** auf Dunkel nebeneinander.
4. **Vorlagen-Bestand & Lücken-Check** – pro Motiv-Familie: wie viele Motive es
   gibt und in welchen der drei Welten sie vorliegen.

## Die drei Farbwelten rendern

Die 3-Wege-Theme-Logik (`dunkel` / `hell` / `tuerkis`) steckt in jedem
Marketing-Generator. Alle Welten neu erzeugen:

```
node docs/marketing/brand-assets.mjs
node tools/marketing/content-overlays.mjs
node tools/marketing/story-overlays.mjs
node tools/marketing/story-carousels.mjs
node tools/marketing/whatsapp-mitgliedschaft.mjs
npm run vorlagen:galerie
```

Nur eine Welt: `THEME=tuerkis node docs/marketing/brand-assets.mjs` (analog für
jeden Generator; `THEME` ∈ `dunkel|hell|tuerkis`). Danach in
`src/lib/marken-uebersicht.ts` `tuerkisStatus.gerendert = true` setzen.

## Serverstand der Marken-Assets (01.09.2026)

| Kennzahl | Wert |
|----------|------|
| Motive gesamt (alle Familien & Formate) | **360** |
| davon paarig vorhanden (Dunkel ↔ Creme) | **100 %** |
| Türkis (dritte Welt) | **neu** – nach Render erwartet: 360 |
| themen-neutrale Vorlagen (Hilfslinien/Hintergründe) | 18 |
| Quell-Foto ohne Hell-Variante (kein Template) | 1 |
| Bilddateien gesamt unter `docs/marketing/` (2 Welten) | 756 |
| Logo-Varianten | 6 |

**Ergebnis des Lücken-Checks:** Dunkel/Gold und Creme/Hell sind vollständig – es
fehlt keine Variante. **Türkis/Teal ist neu** in allen Generatoren angelegt und
liefert nach dem Rendern dieselben 360 Motive (`-tuerkis.png`). Einzige bewusste
Nicht-Paarung bleibt das rohe Greenscreen-Porträt
`assets/portrait-greenscreen-20260616.jpg` (Bildquelle, kein Template).

**Aufräum-Hinweis:** `public/logo-brain-frei.png` ist byte-identisch mit
`public/logo-brain.png` (Dublette – eine Datei würde genügen).

## Daten aktualisieren

Nach dem Erzeugen neuer Grafiken die Zahlen in
`src/lib/marken-uebersicht.ts` nachziehen (Farben in `src/app/globals.css`).
Grafiken entstehen über `docs/marketing/brand-assets.mjs`, die
Download-Galerie über `npm run vorlagen:galerie` (`/admin/vorlagen`).

---

**Quelle der Wahrheit:** `src/lib/marken-uebersicht.ts`,
`src/app/globals.css`, `public/logo-*.{png,svg}`, `docs/marketing/**`
