# 06 · Bildwelt & Grafik

## Grundstimmung

Die visuelle Welt von WMDG ist **realistisch, cinematisch und ruhig**:
glaubwürdige Situationen und Motive über tiefem **Anthrazit/Navy**, aus dem
heraus ein Teal-Fokuslicht (Bewusstsein) und warmes Gold (Erkenntnis)
leuchten. Reale Präsenz statt Abstraktion – „Klarheit im eigenen Kopf" statt
mystischer Weite.

> **Kurswechsel (2026):** Der frühere kosmische Look (Sternenfelder,
> spirituelle Violett-Sphären, „Weltraum"-Tiefe) ist bewusst aufgegeben. Er
> passte nicht zur Haltung „ohne Esoterik-Floskeln". Sternenfelder sind
> deaktiviert, `cosmic-violet` ist entfallen, Navy ist zu Anthrazit
> entsättigt.

## Die vier Bausteine des Looks

Quelle: `docs/marketing/brand-assets.mjs` (`BG`, `shell`, Glow) und
`src/app/globals.css` (`.bg-cosmic`).

1. **Anthrazit-Grund** – Basisfarbe `#090b10` (navy-950) mit sehr dezenten
   Radial-Verläufen: führendes Teal (Bewusstsein), stark zurückgenommenes
   Königsblau, ein warmer Gold-Schimmer (Erkenntnis):
   ```css
   background:
     radial-gradient(52% 110% at 86% 10%, rgba(33,178,189,.20), transparent 60%),
     radial-gradient(46% 110% at 6% 96%, rgba(54,112,238,.10), transparent 60%),
     radial-gradient(42% 90% at 74% 92%, rgba(217,169,58,.12), transparent 60%),
     #090b10;
   ```
2. **Kein Sternenfeld** – die Sterne sind entfernt; die Tiefe entsteht aus
   Anthrazit + weichem Fokuslicht, nicht aus „Weltraum".
3. **Fokus-Glow** – weicher radialer Teal-Schein hinter Emblem/Motiven
   (`rgba(52,196,196,.35)`, `filter: blur(...)`) – Licht als Fokus, dezent.
4. **Gold-Signatur** – warmes Gold (`linear-gradient(100deg,#f2d489,#e8c15f)`)
   für Akzentwörter, CTAs und die Wortmarke; Teal bleibt der Eyebrow-/
   Bewusstseins-Akzent.

## Motiv-Kanon (wiederkehrende Bildmotive)

Statt kosmischer Sphären trägt die Bildwelt einen festen Satz **realistischer,
cinematischer Motive**: **Gehirn / neuronales Netz**, **Kompass / Orientierung**,
**Licht & Fokus**, **Weg / Entwicklung**, **Spiegel / Beobachter** und der
**Mensch in realer Situation**. Sie kehren wieder, bleiben aber subtil – nie
plakativ, nie esoterisch.

## Emblem in der Bildwelt

Das freigestellte Gehirn (`public/logo-brain.png`) ist das wiederkehrende
Key-Visual – zentriert (Avatar), als Säule (Story) oder rechts als Motiv
(Thumbnail), immer mit Glow hinterlegt.

## Fotografie — Richtlinie „Heiko im Zentrum"

**Leitprinzip:** Die echte Person **Heiko trägt die Marke.** Vertrauen entsteht
über sein Gesicht und seine Präsenz; der ruhige Anthrazit-Marken-Look bildet den
**Rahmen** (Hintergrund, Glow, Emblem, Overlays) – nicht umgekehrt. Menschen
folgen einem Menschen, nicht einer Abstraktion.

### Hierarchie der Bildmotive

1. **Heiko-Portraits (Priorität 1)** — nahbar, warm, echt. Ruhiger, präsenter
   Ausdruck (kein gestelltes Dauerlächeln, kein Guru-Pathos). Freigestellt oder
   vor ruhigem Hintergrund. Vorhanden: `public/heiko-portrait.webp`,
   `heiko-freigestellt.webp`, `heiko-brain-portrait.webp`,
   `ueber-heiko-hund.webp` (nahbar/privat).
2. **Themen-Heros (Priorität 2)** — kuratierte Motive je Inhaltsthema
   (`public/hero-*.webp`) zu Bewusstseins-/Neuro-Themen. Unterstützen den
   Inhalt, ersetzen aber nicht die Person.
3. **Marken-Key-Visuals (Priorität 3)** — Emblem + Marken-Look, wenn kein
   Foto passt (Zitate, abstrakte Botschaften).

### Bildstil & Farbstimmung

- **Warm & nahbar**, natürliche Hauttöne – nicht kühl-technisch.
- Sanfte Anbindung an die Markenwelt: dunkle/ruhige Hintergründe, dezenter
  Türkis-Glow, viel Ruhe im Bild (Weite, wenig Clutter).
- Zur Marke gebrückt wird über **Rahmen, Glow und Overlays**, nicht über harte
  Farbfilter, die die Person unnatürlich einfärben.

### Freisteller & Komposition

- Heiko bevorzugt **freigestellt** vor ruhigem Anthrazit-Hintergrund oder mit
  klarem Freiraum für Wortmarke/Claim/CTA.
- Blickrichtung/Freiraum so wählen, dass Text (Eyebrow → Headline → CTA) Platz
  hat; Person nicht vom Text überdecken.

### Text auf Fotos

Über Fotos werden **transparente Marken-Overlays** (Zitat-/Fakten-Ebenen)
gelegt, statt Text fest einzubrennen – erzeugt via
`tools/marketing/content-overlays.mjs`. So bleibt das Foto flexibel nutzbar und
der Text konsistent im Marken-Look.

### Foto-Don'ts

- Keine generischen Stockfotos, die Heiko/die Marke nicht repräsentieren.
- Keine grellen Filter oder unnatürlichen Hauttöne.
- Person nicht in unruhige, kontrastarme Hintergründe „ertränken".
- Den Marken-Look nicht die Person überstrahlen lassen – er rahmt, er dominiert nicht.

## Wiederkehrende CSS-Bausteine (Web)

Quelle: `src/app/globals.css`.

- `.text-gradient`, `.text-gradient-leaf` – Marken-Verläufe für Text.
- `.glass`, `.glass-strong` – milchige Glas-Flächen auf Dunkel.
- Dunkle Anthrazit-Hintergründe/Glows als Layer-Klassen.
- Animationen: `float`, `pulse-slow`, `drift` – dezente, langsame Bewegung
  (respektiert `prefers-reduced-motion`).

## Ikonografie

Eigenes, konsistentes Icon-Set. Quelle: `src/components/ui/Icon.tsx`.

**Stilregeln (verbindlich, aus dem Code):**
- Raster: `viewBox="0 0 24 24"`, Größe `1em` (skaliert mit Schriftgröße)
- Strichstärke: `strokeWidth 1.7`
- Linienenden/-ecken: `round` (`strokeLinecap`/`strokeLinejoin`)
- Standard: Outline (`fill: none`) – nur Star & Social-Icons sind gefüllt (`fill: currentColor`)
- Farbe folgt `currentColor` (erbt Textfarbe/Verlauf)

**Funktions-Icons (15):** ArrowRight, ArrowUp, Check, Compass, Spark, Shield,
Brain, Star, Menu, Close, Plus, Download, Play, Chat, Mail.

**Social-Icons (5):** Instagram, Facebook, Youtube, Linkedin, Telegram
(gebündelt als `socialIcons`).

> **Regel:** Neue Icons im selben Stil (24er-Raster, 1.7 Strich, runde Enden,
> Outline) in `Icon.tsx` ergänzen – keine fremden Icon-Fonts/Sets mischen.

## Motion / Animation

Die Marke ist **ruhig** – Bewegung ist dezent und langsam, nie ablenkend.
Quelle: `src/app/globals.css` (`--animate-*`, Keyframes).

| Token | Verhalten | Einsatz |
|-------|-----------|---------|
| `--animate-float` | 7 s, ease-in-out, endlos | sanftes Schweben (Emblem/Orbs) |
| `--animate-pulse-slow` | 5 s, ease-in-out, endlos | langsames Glühen/Pulsieren |
| `--animate-drift` | 22 s, linear, endlos | sehr langsames Driften (Hintergrund/Glows) |

**Regeln:**
- Lange Dauern (5–22 s), weiche Easings – nichts Schnelles/Hektisches.
- `prefers-reduced-motion: reduce` wird respektiert (Animationen praktisch aus).
- Bewegung als Atmosphäre, nicht als Blickfang.

## Bild-Don'ts

- Keine grellen, gesättigten Vollfarbflächen als Hintergrund – die Tiefe
  (Navy + Glow) ist zentral.
- Glow dezent halten, nicht überladen.
- Marken-Verlauf nicht flächig als Hintergrund – er ist Akzent, kein Füller.

---

**Quelle der Wahrheit:** `docs/marketing/brand-assets.mjs`,
`tools/marketing/content-overlays.mjs`, `src/app/globals.css`,
`src/components/visuals/`
