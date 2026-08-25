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

## Fotografie

- Portraits von Heiko: warm, nahbar, freigestellt oder vor ruhigem Hintergrund
  (`public/heiko-*.webp`).
- Hero-Motive pro Thema als `public/hero-*.webp` (großer, kuratierter Bestand
  zu Bewusstseins-/Neuro-Themen).
- Über Fotos werden Marken-Overlays gelegt (transparente Zitat-/Fakten-Ebenen),
  statt Text direkt einzubetten – siehe `tools/marketing/content-overlays.mjs`.

⚠️ PRÜFEN / FESTLEGEN: Verbindliche Foto-Richtlinie (Bildstil, Farbstimmung,
erlaubte Motive, Freisteller-Regeln) ist noch nicht schriftlich fixiert.

## Wiederkehrende CSS-Bausteine (Web)

Quelle: `src/app/globals.css`.

- `.text-gradient`, `.text-gradient-leaf` – Marken-Verläufe für Text.
- `.glass`, `.glass-strong` – milchige Glas-Flächen auf Dunkel.
- Kosmische Hintergründe/Sterne als Layer-Klassen.
- Animationen: `float`, `pulse-slow`, `drift` – dezente, langsame Bewegung
  (respektiert `prefers-reduced-motion`).

## Ikonografie

Eigene Icons (z. B. `compass`, `spark`, `shield`) über `src/components/ui/Icon`.

⚠️ PRÜFEN: Vollständige Icon-Liste & Stilregeln (Strichstärke, Größenraster)
dokumentieren.

## Bild-Don'ts

- Keine grellen, gesättigten Vollfarbflächen als Hintergrund – die Tiefe
  (Navy + Glow) ist zentral.
- Sterne/Glow dezent halten, nicht überladen.
- Marken-Verlauf nicht flächig als Hintergrund – er ist Akzent, kein Füller.

---

**Quelle der Wahrheit:** `docs/marketing/brand-assets.mjs`,
`tools/marketing/content-overlays.mjs`, `src/app/globals.css`,
`src/components/visuals/`
