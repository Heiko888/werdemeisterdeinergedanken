# 03 · Logo

## Aufbau

Das Logo besteht aus zwei Elementen:

1. **Emblem / Bildmarke** – ein stilisiertes Gehirn („Brain-Mark"), das mit
   organischen Blatt-/Neuronen-Formen die Verbindung von Natur und Geist trägt.
   Farblich **teal-dominant** (Bewusstsein), mit lebendigem Neon-Glow; die
   Wortmarke „Meister" setzt dazu den warmen **Gold**-Akzent (Erkenntnis).
2. **Wortmarke** – „Werde Meister deiner **Gedanken**", in Versalien (uppercase).

Quelle (Web-Komponente): `src/components/visuals/Logo.tsx`.

> **Zwei Wortmarken-Renderings – nicht verwechseln:**
> - **Grafisches Logo** (`public/logo-full.png`): **handgezeichnete** Wortmarke –
>   „WERDE MEISTER DEINER" in Schwarz, „GEDANKEN" in Grün (Grunge-Stil).
> - **Digitale Web-Wortmarke** (`Logo.tsx`): in **Inter** gesetzt, mit dem
>   Marken-Verlauf **Lindgrün → Türkis** (siehe „Wortmarke im Web" unten).
>
> ⚠️ PRÜFEN: Ob die beiden Wortmarken-Stile bewusst nebeneinander bestehen
> sollen oder langfristig vereinheitlicht werden.

## Logo-Dateien

Alle im Ordner `public/`:

| Datei | Verwendung |
|-------|------------|
| `logo-brain.png` | Freigestelltes Gehirn-Emblem (Standard im Web, Header) |
| `logo-brain-frei.png` | Freigestellte Variante des Emblems |
| `logo.svg` | Vektor-Logo (skalierbar, für Print/große Flächen) |
| `logo-full.png` | Vollständiges Logo (Emblem + Wortmarke) als Rastergrafik |
| `docs/marketing/logo-paket/` | **Logo-Paket zum Weitergeben:** Gold-Emblem, Schriftlogo (hell/dunkel), Komplett-Logo, Creme-Hintergründe – `npm run logo-paket` |
| `src/app/icon.png` | Favicon / App-Icon (Next.js App-Icon-Konvention), 28 KB |

⚠️ PRÜFEN: Ob eine **rein vektorisierte Wortmarke** (SVG mit Text als Pfade)
existiert – aktuell wird die Wortmarke im Web als HTML-Text mit CSS-Verlauf
gerendert (`Logo.tsx`), nicht als Bilddatei.

## Wortmarke im Web

- Font: **Inter**, `font-weight` 600/700, `text-transform: uppercase`.
- Tracking: obere Zeile `0.2em`, untere Zeile `0.12em`.
- Farbe: Verlaufsklasse `.text-gradient-leaf` (Lindgrün → Türkis).
- Zwei Zeilen: „Werde Meister deiner" (klein) / „Gedanken" (groß).

## Tonwert-Varianten

Die Komponente unterstützt zwei Kontraste (Prop `tone`):

- `onLight` – für helle Flächen (Papier/Weiß). Dezenter Glow.
- `onDark` – für dunkle Flächen (Navy/Footer). Stärkerer Glow
  (Türkis + Lindgrün Drop-Shadow).

Zusätzlich `compact` = nur Emblem ohne Wortmarke (z. B. enge Header, Favicon-Kontext).

## Schutzraum & Mindestgröße

Verbindliche Werte, abgeleitet aus dem gelebten Web-Standard (`Logo.tsx`):

- **Emblemhöhe im Web:** `h-10` ≈ **40 px** (Header-Standard).
- **Abstand Emblem ↔ Wortmarke:** `gap-3` = **0.75 rem** (12 px).
- **Mindesthöhe Emblem:** **32 px** digital (darunter Detailverlust).
- **Schutzraum:** mindestens die **halbe Emblemhöhe** ringsum freihalten.

⚠️ PRÜFEN: Print-Mindestgrößen (mm) noch festzulegen.

## Logo-Don'ts

- Emblem nicht verzerren, drehen oder umfärben (der Verlauf ist Teil der Marke).
- Wortmarke nicht in Kleinbuchstaben setzen (immer Versalien).
- Nicht auf unruhige Fotos ohne ausreichenden Kontrast / Abdunkelung setzen.
- Marken-Verlauf nicht durch Vollfarben ersetzen (außer bewusst als 1-Farb-Version,
  siehe unten).

⚠️ PRÜFEN / FESTLEGEN: **Einfarbige Fallback-Version** (z. B. reines Cream auf
Navy, reines Ink auf Papier) für Fax/Stempel/Gravur/sehr kleine Größen.

---

**Quelle der Wahrheit:** `src/components/visuals/Logo.tsx`, `public/logo-*.{png,svg}`
