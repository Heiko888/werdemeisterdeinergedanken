# 06 · Bildwelt & Grafik

## Grundstimmung

Die visuelle Welt von WMDG ist **kosmisch, ruhig und tief**: ein nächtlicher
Sternenhimmel über tiefem Mitternachtsblau, aus dem heraus die
Marken-Signatur (Lindgrün → Türkis) und das Gehirn-Emblem leuchten. Sie
übersetzt „Weite des Bewusstseins" und „Klarheit im Dunkel".

## Die vier Bausteine des Looks

Quelle: `docs/marketing/brand-assets.mjs` (`BG`, `shell`, Glow/Stars).

1. **Kosmischer Hintergrund** – Basisfarbe `#08102a` (navy-900) mit weichen
   Radial-Verläufen in Türkis, Königsblau und dezentem Lindgrün:
   ```css
   background:
     radial-gradient(50% 120% at 88% 12%, rgba(33,178,189,.30), transparent 60%),
     radial-gradient(46% 120% at 6% 96%, rgba(54,112,238,.24), transparent 60%),
     radial-gradient(40% 90% at 74% 90%, rgba(140,198,63,.14), transparent 60%),
     #08102a;
   ```
2. **Sternenfeld** – feine, unregelmäßig verteilte Punkte
   (weiß/blau/violett getönt), sehr dezent.
3. **Glow** – weicher radialer Türkis-Schein hinter Emblem/Motiven
   (`rgba(52,196,196,.35)`, `filter: blur(...)`).
4. **Marken-Verlauf** – Lindgrün → Türkis (`linear-gradient(100deg,#a3d64f,#34c4c4)`)
   für Akzentwörter, CTAs und die Wortmarke.

## Emblem in der Bildwelt

Das freigestellte Gehirn (`public/logo-brain.png`) ist das wiederkehrende
Key-Visual – zentriert (Avatar), als Säule (Story) oder rechts als Motiv
(Thumbnail), immer mit Glow hinterlegt.

## Fotografie — Richtlinie „Heiko im Zentrum"

**Leitprinzip:** Die echte Person **Heiko trägt die Marke.** Vertrauen entsteht
über sein Gesicht und seine Präsenz; der kosmische Marken-Look bildet den
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
3. **Kosmische Key-Visuals (Priorität 3)** — Emblem + Marken-Look, wenn kein
   Foto passt (Zitate, abstrakte Botschaften).

### Bildstil & Farbstimmung

- **Warm & nahbar**, natürliche Hauttöne – nicht kühl-technisch.
- Sanfte Anbindung an die Markenwelt: dunkle/ruhige Hintergründe, dezenter
  Türkis-Glow, viel Ruhe im Bild (Weite, wenig Clutter).
- Zur Marke gebrückt wird über **Rahmen, Glow und Overlays**, nicht über harte
  Farbfilter, die die Person unnatürlich einfärben.

### Freisteller & Komposition

- Heiko bevorzugt **freigestellt** vor kosmischem Hintergrund oder mit
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
- Kosmischen Look nicht die Person überstrahlen lassen – er rahmt, er dominiert nicht.

## Wiederkehrende CSS-Bausteine (Web)

Quelle: `src/app/globals.css`.

- `.text-gradient`, `.text-gradient-leaf` – Marken-Verläufe für Text.
- `.glass`, `.glass-strong` – milchige Glas-Flächen auf Dunkel.
- Kosmische Hintergründe/Sterne als Layer-Klassen.
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
| `--animate-drift` | 22 s, linear, endlos | sehr langsames Driften (Hintergrund/Sterne) |

**Regeln:**
- Lange Dauern (5–22 s), weiche Easings – nichts Schnelles/Hektisches.
- `prefers-reduced-motion: reduce` wird respektiert (Animationen praktisch aus).
- Bewegung als Atmosphäre, nicht als Blickfang.

## Bild-Don'ts

- Keine grellen, gesättigten Vollfarbflächen als Hintergrund – die Tiefe
  (Navy + Glow) ist zentral.
- Sterne/Glow dezent halten, nicht überladen.
- Marken-Verlauf nicht flächig als Hintergrund – er ist Akzent, kein Füller.

---

**Quelle der Wahrheit:** `docs/marketing/brand-assets.mjs`,
`tools/marketing/content-overlays.mjs`, `src/app/globals.css`,
`src/components/visuals/`
