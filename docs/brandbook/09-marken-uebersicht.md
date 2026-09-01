# 09 · Marken-Übersicht (Farben, Logos & Vorlagen-Bestand)

Eine Admin-Seite im Marketing-Cockpit, die auf **einen Blick** zeigt, was es an
Marken-Material gibt – damit der Überblick nicht verloren geht.

**Route:** `/admin/marken-uebersicht` (nur Admin-E-Mails, `noindex`)
**Seite:** `src/app/admin/marken-uebersicht/page.tsx`
**Daten:** `src/lib/marken-uebersicht.ts`

## Was die Seite zeigt

1. **Die zwei Farbwelten** – jedes Motiv existiert in zwei Welten:
   - **Dunkel · Navy** – Grund `#090b10`, Standard (Datei **ohne** Suffix).
   - **Hell · Creme** – Grund `#f6f4ee`, Datei-Suffix `-hell`.
   - **Türkis (Teal)** und **Gold** sind in beiden Welten die Akzente.
2. **Komplettes Farbsystem** – alle Marken-Farben mit Hex-Wert, Token-Name und
   Rolle (Quelle: `src/app/globals.css`).
3. **Sämtliche Logos** – jedes Logo auf Creme **und** auf Dunkel nebeneinander.
4. **Vorlagen-Bestand & Lücken-Check** – pro Motiv-Familie: wie viele Motive es
   gibt und ob sie in beiden Welten (Creme/Dunkel) vorliegen.

## Serverstand der Marken-Assets (01.09.2026)

| Kennzahl | Wert |
|----------|------|
| Motive gesamt (alle Familien & Formate) | **360** |
| davon paarig vorhanden (Creme ↔ Dunkel) | **100 %** |
| themen-neutrale Vorlagen (Hilfslinien/Hintergründe) | 18 |
| Quell-Foto ohne Hell-Variante (kein Template) | 1 |
| Bilddateien gesamt unter `docs/marketing/` | 756 |
| Logo-Varianten | 6 |

**Ergebnis des Lücken-Checks:** Das Farbwelt-System ist vollständig – es fehlt
keine Farbvariante. Einzige Nicht-Paarung ist das rohe Greenscreen-Porträt
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
