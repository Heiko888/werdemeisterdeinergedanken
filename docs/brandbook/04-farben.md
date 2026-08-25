# 04 · Farben

Alle Farben sind als **Design-Tokens** in `src/app/globals.css` (`@theme`)
definiert und über Tailwind als Utility-Klassen nutzbar (z. B. `bg-navy-900`,
`text-teal-400`). **Diese Datei ist die Quelle der Wahrheit** – das Brandbook
spiegelt sie.

## Markencharakter

Tiefes Mitternachtsblau + kosmische Weite als Basis, dazu die lebendige
Marken-Signatur **Lindgrün → Türkis** (aus dem Logo) als Akzent. Gold nur
sehr sparsam (Sterne/Bewertungen). Für helle Flächen ein warmes Elfenbein-Papier.

---

## Navy — Basis / dunkle Flächen

| Token | Hex | Zweck |
|-------|-----|-------|
| `navy-950` | `#050914` | tiefstes Schwarzblau |
| `navy-900` | `#08102a` | Haupt-Hintergrund dunkel (auch Grafik-BG) |
| `navy-850` | `#0b1636` | |
| `navy-800` | `#0f1e44` | |
| `navy-700` | `#16294f` | |
| `navy-600` | `#1f3565` | |
| `navy-500` | `#2b4684` | |

## Brand-Blau — Primär / CTA

| Token | Hex |
|-------|-----|
| `brand-50` | `#eef4ff` |
| `brand-100` | `#d9e6ff` |
| `brand-200` | `#b8d0ff` |
| `brand-300` | `#8bb2ff` |
| `brand-400` | `#5b8cff` |
| `brand-500` | `#3670ee` |
| `brand-600` | `#2457d6` |
| `brand-700` | `#1c44ab` |
| `brand-800` | `#1a3a8a` |
| `brand-900` | `#1a336f` |

## Marken-Akzent — Lindgrün → Teal (aus dem Logo)

Die **Marken-Signatur**. Kommt als Verlauf in Logo-Wortmarke, Betonungen,
CTAs und Zitat-Akzenten vor.

| Token | Hex |
|-------|-----|
| `leaf-300` | `#b6e06a` |
| `leaf-400` | `#a3d64f` |
| `leaf-500` | `#8cc63f` |
| `leaf-600` | `#74ab2f` |
| `teal-300` | `#5fd6d2` |
| `teal-400` | `#34c4c4` |
| `teal-500` | `#21b2bd` |
| `teal-600` | `#199aa8` |

## Kosmische Tiefe (dezent, für Verläufe)

| Token | Hex |
|-------|-----|
| `cosmic-violet` | `#6d5ae0` |
| `cosmic-cyan` | `#34c4c4` |
| `cosmic-teal` | `#2dd4bf` |

## Gold — nur Sterne / Bewertungen

| Token | Hex |
|-------|-----|
| `gold-300` | `#f2d489` |
| `gold-400` | `#e8c15f` |
| `gold-500` | `#d9a93a` |

> **Regel:** Gold ausschließlich für Bewertungssterne/Ratings – nicht als
> allgemeiner Akzent.

## Neutral / Licht

| Token | Hex | Zweck |
|-------|-----|-------|
| `mist-50` | `#f6f8fc` | |
| `mist-100` | `#eef2f9` | |
| `mist-200` | `#dde5f1` | |
| `mist-300` | `#c3cfe2` | |
| `cream` | `#f4f2ec` | Off-White für dunkle Flächen (Footer, Grafiktext) |
| `cream-dim` | `#d8d9d2` | gedämpftes Off-White |

## Helles Design — Papier & Tinte

| Token | Hex | Zweck |
|-------|-----|-------|
| `paper` | `#f6f4ee` | Warmes Elfenbein – Haupt-Hintergrund hell |
| `surface` | `#ffffff` | Weiße Karten / Kontrast-Sektionen |
| `surface-2` | `#efece2` | Tieferes Creme für Wechsel-Sektionen |
| `ink` | `#16231f` | Überschriften/Text (tiefes Tannengrün-Schwarz) |
| `ink-soft` | `#48524e` | Ruhiger Fließtext (~7,4:1 auf paper) |
| `ink-mid` | `#565f5b` | Sekundärer Fließtext (~5,6:1 auf paper) |
| `ink-muted` | `#626b67` | Tertiär / Bildunterschriften (~4,7:1 auf paper) |
| `accent` | `#4f9e1c` | Frisches Grün für Labels/Links (hell) |

## Barrierefreiheit (Kontrast)

Die hellen Text-Töne (`ink-soft`, `ink-mid`, `ink-muted`) sind bewusst als
**solide Farben (ohne Opacity)** gewählt und erreichen **≥ 4,5:1 (WCAG AA)**
auf allen drei hellen Flächen (`paper`, `surface`, `surface-2`).

> **Regel:** Für sekundären Text keine Opacity-Stufen auf hellem Grund nutzen –
> stattdessen `ink-mid` / `ink-muted` verwenden.

⚠️ PRÜFEN: Kontraste der Akzentfarben (leaf/teal) als **Text** auf hellen
Flächen – der Verlauf ist v. a. für große Headlines/Grafik gedacht, nicht für
kleinen Fließtext.

---

## Marken-Verläufe

- **Signatur-Verlauf (Logo/Text):** `linear-gradient(100deg, leaf-500 → teal-400)`
  → CSS-Klasse `.text-gradient-leaf`.
- **Erweiterter Text-Verlauf:** `linear-gradient(100deg, leaf-400 → teal-400 → brand-400)`
  → CSS-Klasse `.text-gradient`.
- **Grafik-Verlauf (Kacheln/CTA):** `linear-gradient(100deg, #a3d64f, #34c4c4)`
  (identisch zur Signatur, in `docs/marketing/brand-assets.mjs`).

---

**Quelle der Wahrheit:** `src/app/globals.css` (`@theme`-Block)
