# Bildplan — Fotohintergründe für Carousels & Reel-Cover

> **Zweck:** Konkreter Produktionsplan, um **eigene Fotos von Heiko** als
> Hintergrund in die Carousel-Posts und die Reel-Cover zu integrieren – ohne
> den Marken-Look zu brechen. Beschreibt den *aktuellen Serverstand*, die zwei
> möglichen Wege, alle Maße/Safe-Zones und die Foto-Zuordnung je Serie.
>
> Grundlage: `docs/brandbook/06-bildwelt.md` (Richtlinie „Heiko im Zentrum").
> Betrifft die Generatoren `docs/carousels/` und `docs/reels/covers/`.

---

## 0. Kurzfassung — was du wissen musst

- **Es gibt schon einen fertigen Weg für eigene Fotos:** Beide Generatoren
  exportieren neben dem fertigen Bild eine **transparente Overlay-PNG**
  (nur Logo + Text + Scrim, *ohne* Hintergrund). Die legst du in Canva über
  dein eigenes Foto → fertig. Das ist der **markenkonforme Standardweg**
  (Text wird nicht ins Foto eingebrannt) und funktioniert **heute schon**
  für Reels **und** Carousels.
- **Reel-Cover** können ein Foto zusätzlich **fest einbrennen**: eine
  `vorlage.png` in den Format-Ordner legen → der Build rendert das Foto direkt
  als Hintergrund. Bereits eingebaut.
- **Carousels** können das **seit 2026-09-10 ebenfalls**: Foto in
  `docs/carousels/vorlagen/<serie>/<slug>/` ablegen → der Build brennt es auf
  **Cover- und CTA-Slide** ein (Body-Slides bleiben auf dem Verlauf).
  Siehe Abschnitt 7.

**Empfehlung:** Für den Start **Weg A (Overlay über Foto in Canva)** nehmen –
kein Code nötig, flexibel, brandkonform. Weg B (einbrennen) nur, wenn du eine
komplett automatisierte PNG-Pipeline ohne Canva willst.

---

## 1. Aktueller Serverstand (Schichten-Modell)

Jede Slide / jedes Cover besteht aus vier übereinanderliegenden Ebenen:

| z | Ebene | Reel-Cover | Carousel |
|---|-------|-----------|----------|
| 0 | **Marken-Grund** (`::before`) | Verlauf `P.bg` | Verlauf `P.bg` |
| 1 | **Foto** (`.bg`) | `url("vorlage.png")` **aktiv** | **aktiv** auf Cover/CTA (seit 2026-09-10) |
| 2 | **Scrim** (Abdunkler) | stark unten (für Headline) | dezent oben+unten |
| 3 | **Inhalt** (`.content`) | Logo, Reihen-Tag, Headline, Handle | Logo, Tag, Text, Dots |

- **Reel-Cover** (`docs/reels/covers/build.mjs`, Zeile 46–47): die `.bg`-Ebene
  lädt `vorlage.png` aus dem jeweiligen `<serie>/<format>`-Ordner. Liegt keine
  Datei da, bleibt der Marken-Verlauf sichtbar.
- **Carousel** (`docs/carousels/build.mjs`): die Foto-Ebene ist standardmäßig
  aus und wird **nur für Cover- und CTA-Slides** aktiviert (`.slide.has-photo`),
  wenn für das Carousel ein Foto unter
  `docs/carousels/vorlagen/<serie>/<slug>/` liegt. Body-Slides bleiben immer auf
  dem Marken-Verlauf.

### Vier Farbwelten (Themes)
Beide Systeme rendern jede Slide in vier Welten:
`dunkel` (Standard), `hell` (Gold/Creme), `tuerkis` (dunkel/Türkis),
`tuerkis-hell` (Türkis/Creme).

> **Für Fotohintergründe die dunklen Welten (`dunkel` / `tuerkis`) bevorzugen.**
> Ihr Scrim dunkelt zum Rand ab und hält hellen Text auf dem Foto lesbar. Die
> Creme-Welten (`hell`) helligen stattdessen auf – nur sinnvoll bei hellen,
> ruhigen Foto-Rändern.

---

## 2. Foto-Regeln (aus dem Brandbook, verbindlich)

Quelle: `docs/brandbook/06-bildwelt.md` → „Fotografie – Heiko im Zentrum".

- **Heiko trägt die Marke.** Der Marken-Look (Grund, Glow, Emblem, Overlay)
  ist der **Rahmen**, nicht der Star. Person nie „ertränken".
- **Warm & nahbar**, natürliche Hauttöne. Ruhiger, präsenter Ausdruck –
  kein Guru-Pathos, kein Dauerlächeln.
- **Freigestellt oder ruhiger Hintergrund.** Bevorzugt Heiko freigestellt vor
  Anthrazit, oder Foto mit klarem Freiraum für Text.
- **Blickrichtung/Freiraum = Textzone.** Person nicht dort platzieren, wo
  Eyebrow → Headline → CTA sitzen (siehe Safe-Zones, Abschnitt 3).
- **Kein harter Farbfilter** auf der Haut. Anbindung über Rahmen/Glow/Overlay.
- **Keine generischen Stockfotos.**

### Vorhandene Heiko-Fotos (in `public/`)
| Datei | Charakter | Eignung |
|-------|-----------|---------|
| `heiko-portrait.webp` | Sauberes Portrait | Cover, CTA – Allrounder |
| `heiko-hero.webp` | Hero/Weite | Cover 9:16 / 16:9 |
| `heiko-brain-portrait.webp` | Mit Gehirn-Motiv | Wissenschaft/Selbstverteidigung |
| `heiko-brain-portrait-creme.webp` | Gehirn-Motiv, hell | Creme-Welten |
| `ueber-heiko-berg.webp` | Natur, privat/nahbar | Praxis, Vertiefungen |
| `heiko-avatar.webp` | Klein/rund | **nicht** für Hintergründe |

> **Neue Fotos** immer als hochauflösendes Hochformat schießen (mind. die
> Zielmaße aus Abschnitt 3, besser 2× für Retina/Crop-Reserve).

---

## 3. Technische Specs je Format

Breite immer 1080 px (außer 16:9 / Pinterest). Export via Playwright
pixelgenau; `SCALE=2 node …` verdoppelt die Auflösung (z. B. 2160×3840).

### Reel-Cover-Formate (`docs/reels/covers/data.mjs`)
| Format | Maße (px) | Einsatz | Textzone (frei halten) |
|--------|-----------|---------|------------------------|
| `reel-9x16` | 1080 × 1920 | Reel / Story | **unteres Drittel** (Headline) + oben Logo/Tag |
| `feed-4x5` | 1080 × 1350 | Feed hoch | unteres Drittel + oben |
| `feed-1x1` | 1080 × 1080 | Feed quadr. | unten + oben |
| `landscape-16x9` | 1920 × 1080 | YouTube/quer | **untere linke Hälfte** (Headline max. 66 % Breite) |
| `pin-2x3` | 1000 × 1500 | Pinterest | unteres Drittel + oben |

**Cover-Layout:** Logo oben links, Reihen-Tag oben rechts, **Headline unten
links**, Handle darunter. Der Scrim dunkelt das **untere ~40 %** ab.
→ **Foto so wählen/croppen, dass Heikos Gesicht in der oberen/mittleren Hälfte
sitzt und die untere linke Ecke ruhig bleibt.**

### Carousel-Formate (`docs/carousels/data.mjs`)
| Format | Maße (px) | Einsatz |
|--------|-----------|---------|
| `feed-4x5` | 1080 × 1350 | Carousel-Standard |
| `feed-1x1` | 1080 × 1080 | Feed |
| `reel-9x16` | 1080 × 1920 | Reel/Story |

**Slide-Layout:** Logo oben links, Serien-Tag oben rechts, **Text vertikal
zentriert (`.mid`)**, Fuß (Handle · Dots · Zähler) unten.
→ Der Text steht **mitten im Bild**. Deshalb bei Carousels Foto **nur auf
Cover- und CTA-Slides** einsetzen (dort ist die Mitte kürzer belegt), Body-
Slides auf dem ruhigen Marken-Verlauf lassen. Bei Foto-Cover: Heiko **seitlich
(links oder rechts)** platzieren, Text in die freie Hälfte.

---

## 4. Bildplan — Reel-Cover je Serie

Serien im Cover-Studio: `selbstverteidigung`, `stufen`, `praxis`,
`vertiefungen`, `wissenschaft`, `landing`.

| Serie | Stimmung | Foto-Idee | Startfoto aus `public/` |
|-------|----------|-----------|--------------------------|
| **selbstverteidigung** | wach, klar, standhaft | Heiko frontal, ruhiger Blick, Anthrazit | `heiko-portrait.webp` / `heiko-brain-portrait.webp` |
| **stufen** | Entwicklung, Weg | Heiko halbnah, Blick nach vorn/oben, Freiraum unten | `heiko-hero.webp` |
| **praxis** | nahbar, alltagsnah | Heiko in echter Situation, natürlich, warm | `ueber-heiko-berg.webp` |
| **vertiefungen** | ruhig, nachdenklich | Heiko seitlich, weicher Hintergrund | `heiko-portrait.webp` |
| **wissenschaft** | Neuro/Fokus | Heiko mit Gehirn-Motiv/Fokuslicht | `heiko-brain-portrait.webp` |
| **landing** | Marke gesamt, einladend | stärkstes Portrait, viel Freiraum für Claim | `heiko-hero.webp` |

**Umsetzung Reel-Cover — zwei Wege:**

- **Weg A · Overlay (empfohlen):** Overlay-PNG aus
  `docs/reels/covers/export-overlay/<serie>/<format>/overlay-NN.png` in Canva
  **über dein Foto** legen. Kein Code, sofort einsetzbar.
- **Weg B · Einbrennen:** dein Foto als **`vorlage.png`** in
  `docs/reels/covers/<serie>/<format>/` legen, dann
  `node docs/reels/covers/export-png.mjs <serie>` → fertiges PNG in
  `docs/reels/covers/export/<serie>/<format>/`.

---

## 5. Bildplan — Carousel je Serie

Serien im Carousel-Studio: `selbstverteidigung`, `stufen`, `praxis`,
`vertiefungen`, `mitgliederbereich`.

**Regel für Carousels:** Foto **nur** auf **Cover-Slide (Slide 1)** und
**CTA-Slide (letzte)**. Body-Slides bleiben auf dem Marken-Verlauf – dort steht
langer Text, ein Foto würde die Lesbarkeit kosten.

| Serie | Cover-Foto (Slide 1) | CTA-Foto (letzte) | Body-Slides |
|-------|----------------------|-------------------|-------------|
| **selbstverteidigung** | `heiko-portrait.webp`, seitlich | dto., einladend | Verlauf (kein Foto) |
| **stufen** | `heiko-hero.webp` | `heiko-portrait.webp` | Verlauf |
| **praxis** | `ueber-heiko-berg.webp` | `heiko-portrait.webp` | Verlauf |
| **vertiefungen** | `heiko-portrait.webp` | `heiko-portrait.webp` | Verlauf |
| **mitgliederbereich** | `heiko-hero.webp`, warm | `heiko-portrait.webp` | Verlauf |

**Umsetzung Carousel — beide Wege verfügbar:**

- **Weg A · Overlay:** Overlay-PNG aus
  `docs/carousels/export-overlay/<serie>/<slug>/<format>/slide-NN.png` in Canva
  über dein Foto legen. Für Cover + CTA dein Foto, für Body-Slides einfach das
  fertige `export/...`-PNG mit Verlauf nehmen.
- **Weg B · Einbrennen (seit 2026-09-10):** Foto ablegen unter
  `docs/carousels/vorlagen/<serie>/<slug>/<format>.png` (oder `vorlage.png` für
  alle Formate), dann `node docs/carousels/export-png.mjs <serie> <slug>` →
  fertiges PNG in `docs/carousels/export/<serie>/<slug>/<format>/`. Es landet
  automatisch nur auf **Cover- und CTA-Slide**.

---

## 6. Datei- & Namenskonvention

- **Eingebrannt (Reel-Cover):** genau `vorlage.png` (Kleinschreibung) im
  Ordner `docs/reels/covers/<serie>/<format>/`. Pro Format eine eigene, passend
  gecroppte Datei (9:16 ≠ 1:1 ≠ 16:9).
- **Eingebrannt (Carousel):** `docs/carousels/vorlagen/<serie>/<slug>/<format>.png`
  (z. B. `feed-4x5.png`) oder `vorlage.png` als Allrounder. Wirkt nur auf
  Cover-/CTA-Slide.
- **Foto-Ablage der Quellen:** neue Heiko-Fotos nach `public/` (Web) bzw. für
  die reine Grafik-Pipeline zusätzlich als zugeschnittene `vorlage.png`.
- **Export-Ergebnisse** (git-ignoriert, nicht committen):
  - Reel-Cover: `docs/reels/covers/export/…` + `export-overlay/…`
  - Carousel: `docs/carousels/export/…` + `docs/carousels/export-overlay/…`
- **Crop-Regel:** jedes Format separat schneiden – nie ein 1:1-Foto in 9:16
  hochskalieren. Gesicht in die Nicht-Textzone (Abschnitt 3).

---

## 7. Carousel-Einbrennen — so funktioniert es (umgesetzt am 2026-09-10)

Carousels können ein Foto jetzt **fest einbrennen** – automatisch nur auf
**Cover- und CTA-Slide**, Body-Slides bleiben auf dem Marken-Verlauf.

**So legst du ein Foto ab:**

```
docs/carousels/vorlagen/<serie>/<slug>/<format>.png   ← pro Format (empfohlen)
docs/carousels/vorlagen/<serie>/<slug>/vorlage.png    ← ein Foto für alle Formate
```

- `<serie>`: `selbstverteidigung` · `stufen` · `praxis` · `vertiefungen` · `mitgliederbereich`
- `<slug>`: Carousel-Ordnername (z. B. `autopilot`) – wie unter `docs/carousels/export/<serie>/<slug>/`.
- `<format>`: `feed-4x5` · `feed-1x1` · `reel-9x16`
- Der Build sucht zuerst `<format>.png`, sonst `vorlage.png`; fehlt beides,
  bleibt der Verlauf. Details: `docs/carousels/vorlagen/README.md`.

**Was der Code macht** (`docs/carousels/build.mjs`):

1. `findVorlage()` sucht das Quell-Foto und kopiert es in den Build-Ordner.
2. Cover-/CTA-Slides bekommen die Klasse `has-photo` → die Foto-Ebene `.bg`
   wird sichtbar (`background-size:cover`), die Partikel-Sterne aus.
3. Über dem Foto liegt ein **kräftigerer Scrim** (`photoScrim`): dunkle Welten
   dunkeln ab, Creme-Welten hellen auf – Text bleibt lesbar.

Die Fotos selbst sind **gitignoriert** (`.gitignore`: `docs/carousels/vorlagen/**`),
nur die README ist versioniert. Nichts an bestehenden Carousels ändert sich,
solange kein Foto abgelegt ist.

---

## 8. Nächste Schritte (Checkliste)

- [ ] Entscheiden: **Weg A (Overlay/Canva)** oder **Weg B (einbrennen)** –
      Empfehlung: mit Weg A starten.
- [ ] Pro Serie ein Startfoto aus Abschnitt 4/5 festlegen.
- [ ] Fotos je Format croppen (Gesicht in Nicht-Textzone, siehe Abschnitt 3).
- [ ] Weg A: Overlays exportieren
      (`node docs/reels/covers/export-png.mjs` bzw.
      `node docs/carousels/export-png.mjs`) und in Canva über die Fotos legen.
- [ ] Weg B: Foto ablegen und PNG exportieren –
      Reel-Cover: `vorlage.png` je `docs/reels/covers/<serie>/<format>/`;
      Carousel: `docs/carousels/vorlagen/<serie>/<slug>/<format>.png`.
- [x] Carousel-Einbrennen freigeschaltet (Abschnitt 7) – erledigt 2026-09-10.
