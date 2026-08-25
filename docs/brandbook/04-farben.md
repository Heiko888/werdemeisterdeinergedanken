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

> **Regel:** Auf **öffentlichen Markenflächen** Gold ausschließlich für
> Bewertungssterne/Ratings – nicht als allgemeiner Akzent. (In internen
> Admin-/Login-Tools wird Gold vereinzelt für Badges genutzt; das ist keine
> nach außen sichtbare Markenfläche und bleibt davon unberührt.)

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

### Akzentfarben als Text auf Hell (gemessen)

Kontrast der Marken-Akzente als **Text** auf den drei hellen Flächen
(WCAG-Verhältnis, gerundet). AA-Normaltext braucht ≥ 4,5:1, Großtext/UI ≥ 3,0:1.

| Farbe | paper `#f6f4ee` | surface `#fff` | surface-2 `#efece2` | Fazit als Text |
|-------|:---:|:---:|:---:|----|
| `accent #4f9e1c` | 3,06 | 3,37 | 2,85 | ❌ kein Normaltext; nur Großtext auf paper/surface |
| `teal-600 #199aa8` | 3,07 | 3,37 | 2,85 | ❌ kein Normaltext; nur Großtext auf paper/surface |
| `leaf-600 #74ab2f` | 2,51 | 2,76 | 2,33 | ❌ nicht für Text |
| `leaf-500 #8cc63f` | 1,86 | 2,05 | 1,73 | ❌ nur Grafik/Verlauf |
| `teal-400 #34c4c4` | 1,94 | 2,13 | 1,81 | ❌ nur Grafik/Verlauf |

**Ergebnis:** **Keine** Marken-Akzentfarbe (leaf/teal) und auch nicht das
aktuelle `accent #4f9e1c` erreicht AA für **Normaltext** auf Hell. Der
Signatur-Verlauf (leaf-500 → teal-400) liegt mit ~1,7–2,1:1 weit darunter.

### Verbindliche Regeln

1. **Fließtext/kleine Links auf Hell** nie in leaf/teal oder im Verlauf setzen –
   dafür `ink`, `ink-soft`, `ink-mid`, `ink-muted` verwenden.
2. **Marken-Verlauf** (`.text-gradient*`) nur für **große Display-Headlines**
   (≥ ~24 px/fett) und **Grafik** – nie für Fließtext oder kleine UI-Labels.
3. Braucht ein **Link/Label in Marken-Grün/-Teal echten AA-Normaltext-Kontrast**
   auf Hell, die abgedunkelten, AA-tauglichen Varianten nutzen:
   - **Grün (AA):** `#3a7615` – ≥ 4,7:1 auf allen drei hellen Flächen
   - **Teal (AA):** `#0f6d77` – ≥ 5,1:1 auf allen drei hellen Flächen
4. Auf **Dunkel** (navy) ist der Verlauf/`teal-300` als Akzent unkritisch –
   dort sorgt der dunkle Grund für ausreichenden Kontrast.

> ⚠️ Empfehlung (Code): `--color-accent` (`#4f9e1c`) erreicht nur Großtext-Niveau
> und fällt auf `surface-2` sogar darunter. Für farbige Links/Labels als
> Normaltext auf Hell ein AA-taugliches Token (z. B. `#3a7615`) ergänzen bzw.
> `accent` darauf umstellen. Das ist eine **Code-Änderung in `globals.css`** –
> hier als Vorschlag dokumentiert, noch nicht umgesetzt.

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
