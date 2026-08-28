# 04 · Farben

Alle Farben sind als **Design-Tokens** in `src/app/globals.css` (`@theme`)
definiert und über Tailwind als Utility-Klassen nutzbar (z. B. `bg-navy-900`,
`text-teal-400`). **Diese Datei ist die Quelle der Wahrheit** – das Brandbook
spiegelt sie.

## Markencharakter

Ruhiges **Anthrazit/Navy** als Basis (entsättigt, mit kühlem Blau-Unterton) –
eine realistisch-cinematische Tiefe statt „kosmischer" Weite. Der **tragende
Marken-Akzent ist warmes Gold** (Wortmarke „Meister", Akzentwörter, CTAs);
**Teal/Cyan** ist die Bewusstseinsfarbe (Eyebrows, Fokus, Kachel-Akzente).
Königsblau kommt nur noch dezent in Verläufen vor. Für helle Flächen ein
warmes Elfenbein-Papier.

> **Kurswechsel (2026):** Weg von der kosmischen Bildwelt (Sternenfelder,
> spirituelle Violett-Sphären) hin zu realistisch-cinematisch. Navy ist
> entsättigt, `cosmic-violet` ist entfallen, Sternenfelder sind deaktiviert.
> Siehe Kap. 06.

---

## Navy → Anthrazit — Basis / dunkle Flächen

Entsättigt Richtung Graphit-Anthrazit (kühler Blau-Unterton bleibt) – trägt
die ruhige, cinematische Grundstimmung statt des früheren gesättigten
Mitternachtsblau.

| Token | Hex | Zweck |
|-------|-----|-------|
| `navy-950` | `#090b10` | tiefstes Anthrazit (Grafik-BG, `.bg-cosmic`) |
| `navy-900` | `#0f1218` | Haupt-Hintergrund dunkel |
| `navy-850` | `#141821` | |
| `navy-800` | `#1b202b` | |
| `navy-700` | `#232935` | |
| `navy-600` | `#2e3542` | |
| `navy-500` | `#3b4453` | |

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

## Teal/Cyan — die Bewusstseinsfarbe

**Teal ist der Bewusstseins-/Fokus-Akzent** der Marke: Eyebrows, Links auf
Dunkel, Kachel-Akzente, Fokus-Glows. Das frühere Lindgrün (`leaf-*`) ist
**Legacy** und stark zurückgenommen – die tragende Signatur ist heute Gold
(siehe unten), nicht mehr der Grün-Türkis-Verlauf.

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

## Gold — der tragende Marken-Akzent

Das Gold aus dem Logo ist die **tragende Signatur der Marke**: Wortmarke
(„Meister"), Akzentwörter in Headlines (`.accent`), CTAs, Feinlinien und
Bewertungssterne. Auf Dunkel leuchtet `gold-300`, auf Hell tragen die
abgedunkelten `gold-600/700` echten AA-Text-Kontrast.

| Token | Hex | Zweck |
|-------|-----|-------|
| `gold-300` | `#f2d489` | leuchtendes Gold auf Dunkel (Wortmarke, Akzent) |
| `gold-400` | `#e8c15f` | Signatur-Verlauf, CTAs |
| `gold-500` | `#d9a93a` | Sterne, kräftiger Akzent |
| `gold-600` | `#a8842a` | warmes Antikgold – Feinlinien/Deko auf Hell |
| `gold-700` | `#7e6410` | tiefes Gold – AA-Text/Links auf hellen Flächen (`--color-accent`) |

> **Regel:** Gold ist der Leitakzent – **sparsam und gezielt** einsetzen
> (ein Akzentwort je Satz, Wortmarke, primärer CTA, Sterne), nicht flächig.
> Auf Hell für Text/Links nur die AA-tauglichen `gold-600/700` verwenden.

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
