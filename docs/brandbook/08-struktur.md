# 08 · Struktur & Quellen der Wahrheit

Wo im Projekt jedes Markenelement **verbindlich** definiert ist. Diese Karte
ist das Rückgrat des Brandbooks: Ändert sich Marke, ändert man **zuerst hier
in der jeweiligen Quelle**, dann zieht das Brandbook nach.

## Übersicht: Element → Quelle der Wahrheit

| Markenelement | Quelle der Wahrheit | Brandbook-Kapitel |
|---------------|---------------------|-------------------|
| Name, Tagline, Domain, Social | `src/lib/site.ts` (`site`) | 01, 07 |
| Navigation | `src/lib/site.ts` (`mainNav`, `legalNav` – eigene Exporte) | 07 |
| Werte, 7 Stufen, Erwartungen, Testimonials, FAQ | `src/lib/content.ts` | 01 |
| Farben (Tokens) | `src/app/globals.css` (`@theme`) | 04 |
| Verläufe, Glas, Animationen, h-Stile | `src/app/globals.css` | 04, 05, 06 |
| Schriften (Einbindung) | `src/app/layout.tsx` | 05 |
| Font-Dateien & Lizenzen | `src/app/fonts/` | 05 |
| Logo (Web-Komponente) | `src/components/visuals/Logo.tsx` | 03 |
| Logo-Dateien | `public/logo-*.{png,svg}` | 03 |
| Favicon / App-Icon | `src/app/icon.png` | 03 |
| Icon-Set (Funktions- & Social-Icons) | `src/components/ui/Icon.tsx` | 06 |
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
    icon.png             → Favicon / App-Icon
    fonts/               → Selbst gehostete Fonts + OFL-Lizenzen
  components/
    visuals/Logo.tsx     → Logo (Emblem + Wortmarke)                    ★
    visuals/             → CosmicBackground, NeuralOrb
    ui/Icon.tsx          → Icon-Set (15 Funktions- + 5 Social-Icons)    ★
    ui/                  → Button, Container …
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

## Erledigt (Vollständigkeits-Check, Schritt 2)

- ✅ **README-Font-Fehler** („Sora" → Fraunces) korrigiert (Kap. 05).
- ✅ **Testimonials & FAQ** in Kapitel 01 ergänzt.
- ✅ **Favicon/App-Icon** (`src/app/icon.png`) dokumentiert (Kap. 03, 08).
- ✅ **Icon-Set** aus `Icon.tsx` dokumentiert (Kap. 06).
- ✅ **Logo-Schutzraum/Mindestgrößen** (digital) aus Code verbindlich gemacht (Kap. 03).
- ✅ **Motion-Regeln** ergänzt (Kap. 06).
- ✅ **Gold-Regel** auf öffentliche Flächen präzisiert (Kap. 04).
- ✅ **Zielgruppe/Persona** festgelegt: Kern „bewusst Suchende", sekundär
  bodenständig-skeptisch (Kap. 01).
- ✅ **Foto-Richtlinie** „Heiko im Zentrum" festgeschrieben (Kap. 06).

## Offene Punkte — brauchen eine Entscheidung/Inhalt von Heiko

Diese Lücken lassen sich **nicht** aus dem Code füllen:

- ⚠️ **Einfarbige Logo-Fallback-Version** erstellen (Kap. 03).
- ⚠️ **Vektorisierte Wortmarke** (SVG mit Pfaden) erstellen (Kap. 03).
- ⚠️ **Print-Mindestgrößen** des Logos (mm) festlegen (Kap. 03).
- ⚠️ **Foto-Richtlinie** schriftlich fixieren (Kap. 06).
- ⚠️ **Kontrast der Akzentfarben als Text** auf Hell messen/festlegen (Kap. 04).
- ⚠️ **Fehlende Kapitel** (optional, je nach Bedarf): E-Mail-Signatur, Print-
  Anwendungen (Visitenkarte/Briefpapier), Marken-/Trademark-Recht,
  Asset-Zugriff für Externe.

---

**Quelle der Wahrheit:** dieses Verzeichnis + die oben verlinkten Dateien.
