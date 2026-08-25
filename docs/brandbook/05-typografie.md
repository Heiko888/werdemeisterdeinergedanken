# 05 · Typografie

## Schriften

| Rolle | Schrift | Einsatz |
|-------|---------|---------|
| **Display / Headlines** | **Fraunces** (Serife, variabel) | Überschriften h1–h5, Zitate, editoriale Akzente |
| **Fließtext / UI** | **Inter** (Sans, variabel) | Body, Navigation, Buttons, Wortmarke, Eyebrows |

- Beide Schriften sind **selbst gehostet** (`next/font/local`) – kein
  Google-Fonts-Request im Browser (DSGVO-freundlich, deterministische Builds).
- Lizenz: **SIL Open Font License** (siehe `src/app/fonts/*-OFL.txt`).
- Dateien: `src/app/fonts/Inter-latin-variable.woff2`,
  `Fraunces-latin-variable.woff2`, `Fraunces-latin-italic-variable.woff2`.
- Variable Achsen: Gewicht `100–900`; Fraunces zusätzlich mit Kursive.

> ✅ ERLEDIGT — Frühere Abweichung: Die `README.md` nannte als Font noch
> „Sora". Verbindlich ist und war der Code (**Fraunces + Inter**); die README
> wurde entsprechend korrigiert.

## CSS-Variablen (Tokens)

Quelle: `src/app/globals.css`.

```
--font-sans:    Inter, ui-sans-serif, system-ui, …        (Fließtext)
--font-display: Fraunces, Georgia, "Times New Roman", serif (Headlines)
--font-serif:   Fraunces, Georgia, serif
```

## Überschriften-Stil (Basis)

Automatisch auf `h1`–`h5` angewandt (`globals.css`):

- Schrift: `--font-display` (Fraunces)
- Gewicht: **500**
- Laufweite: `letter-spacing: -0.01em`
- Zeilenhöhe: `line-height: 1.12`
- Farbe: `ink`
- `text-wrap: balance`, `hyphens: auto`, `overflow-wrap: anywhere`
  (saubere Umbrüche langer deutscher Komposita)

## Fließtext

- Schrift: Inter (`--font-sans`)
- `text-wrap: pretty` auf `<p>`
- Optimiert: `text-rendering: optimizeLegibility`, Antialiasing aktiv.

## Eyebrows / Labels

Kleine Vorzeilen über Headlines (in Grafik & Web):

- Inter, **bold/700**, `text-transform: uppercase`
- weite Laufweite (`letter-spacing` ~ `0.16em`–`0.2em` bzw. `4px` in Grafik)
- Farbe Türkis (`teal-400` / `#34c4c4`) auf Dunkel

## Typografische Do & Don't

**Do**
- Headlines in Fraunces, ruhig und mit negativer Laufweite.
- Ein Akzentwort in Headlines/Zitaten kursiv (Fraunces Italic) + Marken-Verlauf.
- Fließtext ausschließlich Inter.

**Don't**
- Headlines nicht in Inter setzen (Ausnahme: Wortmarke ist bewusst Inter/Versalien).
- Keine dritte Schriftfamilie einführen.
- Keine reinen Versalien für lange Fließtexte.

---

**Quelle der Wahrheit:** `src/app/layout.tsx` (Font-Einbindung),
`src/app/globals.css` (Tokens & h-Stile), `src/app/fonts/`
