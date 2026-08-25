# 08 · Struktur & Quellen der Wahrheit

Wo im Projekt jedes Markenelement **verbindlich** definiert ist. Diese Karte
ist das Rückgrat des Brandbooks: Ändert sich Marke, ändert man **zuerst hier
in der jeweiligen Quelle**, dann zieht das Brandbook nach.

## Übersicht: Element → Quelle der Wahrheit

| Markenelement | Quelle der Wahrheit | Brandbook-Kapitel |
|---------------|---------------------|-------------------|
| Name, Tagline, Domain, Social, Navigation | `src/lib/site.ts` | 01, 07 |
| Werte, 7 Stufen, Erwartungen, Testimonials, FAQ | `src/lib/content.ts` | 01 |
| Farben (Tokens) | `src/app/globals.css` (`@theme`) | 04 |
| Verläufe, Glas, Animationen, h-Stile | `src/app/globals.css` | 04, 05, 06 |
| Schriften (Einbindung) | `src/app/layout.tsx` | 05 |
| Font-Dateien & Lizenzen | `src/app/fonts/` | 05 |
| Logo (Web-Komponente) | `src/components/visuals/Logo.tsx` | 03 |
| Logo-Dateien | `public/logo-*.{png,svg}` | 03 |
| Visual-Bausteine (Hintergrund, Orb) | `src/components/visuals/` | 06 |
| Kernsätze / Studien-Fakten (Text) | `docs/marketing/content-data.mjs` | 02, 07 |
| Grafik-Assets & Look (Generator) | `docs/marketing/brand-assets.mjs` | 06, 07 |
| Foto-Overlays | `tools/marketing/content-overlays.mjs` | 06, 07 |
| Fotos / Hero-Motive | `public/*.webp`, `public/blog/`, `public/wissensdatenbank/` | 06 |
| Redaktionsplan | `docs/marketing/redaktionsplan.md` | 07 |
| Generator-Doku (PDF, Reels, Carousels, Workshop) | `docs/generatoren/` | 07 |

## Verzeichnis-Landkarte (markenrelevant)

```
src/
  app/
    globals.css          → Design-Tokens: Farben, Verläufe, Typo-Stile  ★
    layout.tsx           → Font-Einbindung (Fraunces + Inter)           ★
    fonts/               → Selbst gehostete Fonts + OFL-Lizenzen
  components/
    visuals/Logo.tsx     → Logo (Emblem + Wortmarke)                    ★
    visuals/             → CosmicBackground, NeuralOrb
    ui/                  → Button, Icon, Container …
  lib/
    site.ts              → Name, Tagline, Kontakt, Social, Navigation   ★
    content.ts           → Werte, 7 Stufen, Erwartungen, FAQ            ★

public/
  logo-brain.png, logo-brain-frei.png, logo.svg, logo-full.png          ★
  heiko-*.webp           → Portraits
  hero-*.webp            → Hero-Motive je Thema
  ebook-*.{png,webp}     → E-Book-Cover/Mockup
  blog/, wissensdatenbank/, video-thumbnails/

docs/
  brandbook/             → DIESES Brandbook
  marketing/
    brand-assets.mjs     → Generator für Marken-Grafiken                ★
    content-data.mjs     → Kernsätze + Studien-Fakten (Textquelle)      ★
    redaktionsplan.md    → Redaktionsplan
    instagram/ facebook/ linkedin/ youtube/ whatsapp/ zitate/ profil/ …
  generatoren/           → Doku aller Generatoren

tools/
  marketing/content-overlays.mjs → transparente Foto-Overlays
  pdf/, workshop/, vorlagen/     → weitere Generatoren
```

★ = Kern-Markenquellen.

## Bekannte Abweichung / offene Punkte (für den Vollständigkeits-Check)

- ⚠️ **README nennt „Sora"**, Code nutzt **Fraunces** → README korrigieren
  (verbindlich: Fraunces + Inter). Siehe Kapitel 05.
- ⚠️ **Logo:** einfarbige Fallback-Version & vektorisierte Wortmarke prüfen (Kap. 03).
- ⚠️ **Schutzraum/Mindestgrößen** des Logos formal festlegen (Kap. 03).
- ⚠️ **Foto-Richtlinie** schriftlich fixieren (Kap. 06).
- ⚠️ **Icon-Set** dokumentieren (Kap. 06).
- ⚠️ **Zielgruppe/Persona** schärfen (Kap. 01).
- ⚠️ **Kontrast der Akzentfarben als Text** auf Hell prüfen (Kap. 04).

> Diese Liste ist die Agenda für Schritt 2 („prüfen, ob alles vorhanden ist").

---

**Quelle der Wahrheit:** dieses Verzeichnis + die oben verlinkten Dateien.
