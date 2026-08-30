# Design-Prüfung — Werde Meister deiner Gedanken

> Erstellt am 2026-08-30 durch den Agenten **design-pruefer** (read-only Code-Analyse
> + stichprobenartige Bild-Sichtprüfung). Prüfgegenstand: Ist der Design-Wechsel vom
> früheren „kosmischen" Look (Mitternachtsblau, Sternenfeld) auf das neue Design
> (Anthrazit/Navy + Gold, Papier-Flächen, realistisch-cinematische Bildwelt)
> vollständig vollzogen? Passen alle Bilder zum Design?

**Fazit:** Design-Wechsel weitgehend, mit Restpunkten 🟠 — Token-System, Typografie und die meisten Sektionen/Seiten sind vollständig auf Navy/Gold/Papier umgestellt; es bestehen aber **mehrere aktive, sichtbare Altlasten** (u. a. das **Favicon**, ein hartcodierter alter „Mitternachtsblau"-Ton in 6 Dateien, inkonsistente Glow-Farben auf identischen UI-Elementen, OG-Preview-Bilder in Teal/Leaf statt Gold) sowie **eine Reihe von Bildern mit deutlich kosmisch-blauer/neon-türkiser Bildsprache**, die dem neuen „warmes Gold, dunkel, realistisch-cinematisch"-Look widersprechen.

**Kennzahlen:**
- **4 aktive, browser-sichtbare Design-Altlasten** (Favicon, hartcodiertes Alt-Blau `#08102a`, inkonsistenter Teal-Glow auf Stufen-Badges, Teal/Leaf-Glow in OG-Bildern)
- **9 Kategorien harmloser Namens-/Codereste** (`bg-cosmic`, `bg-stars`, `cosmic`-AccentKey, 2 tote Komponenten, tote `brand-*`-Tokens, 4 verwaiste Logo-Dateien, 50 verwaiste „-hell"-Thumbnails)
- **6–8 Bilder passen stilistisch nicht** zur neuen Bildwelt (deutlich blau/türkis-neon statt warm-golden/cinematic), bei weiteren ~25 Blog-Cover ist eine vollständige Sichtprüfung sinnvoll
- **0 tote Bild-Pfade** (alle referenzierten Dateien unter `public/` existieren)
- **0 Fremd-Paletten** (`slate/gray/blue/indigo/…`) im Code gefunden

---

## A) Design-Umstellung

### A.1 Echte, sichtbare Altlasten (Alt-Look wird noch gerendert)

| Sev | Fundstelle | Problem | Empfehlung |
|---|---|---|---|
| 🔴 | `src/app/icon.png` (256×256, Favicon) | Zeigt das **alte blau/grün/türkise Neon-Gehirn** – nicht das neue Gold-Emblem. Anders als bei `logo-brain.png` kann hier kein CSS-Filter (`.logo-gold`) greifen; das Icon ist auf **jeder Seite im Browser-Tab** sichtbar. | Favicon aus `public/logo-brain-gold.png` (bereits fertig golden, s. u.) neu exportieren/generieren. |
| 🔴 | `src/components/sections/Hero.tsx:98`, `src/app/mitgliedschaft/page.tsx:228`, `src/app/die-7-stufen/page.tsx:129`, `src/app/opengraph-image.tsx:24`, `src/app/blog/[slug]/opengraph-image.tsx:44`, `src/app/api/stripe/webhook/route.ts:198` | Hartcodierter Farbwert **`#08102a` / `rgba(8,16,42,…)`** – ein gesättigtes „Mitternachtsblau", spürbar blaustichiger als der dokumentierte `--color-navy-950` (`#090b10`). Genau der Farbton, den der „Kosmos-Rückbau"-Kommentar in `globals.css` explizit als überwunden beschreibt, taucht hier wieder auf. | Auf `var(--color-navy-950)` bzw. `color-mix(...)` umstellen (bei `next/og`-Bildern, wo keine CSS-Variablen möglich sind, den Hex-Wert von `navy-950` `#090b10` verwenden statt `#08102a`). |
| 🔴 | `src/app/mitgliedschaft/page.tsx:230` `boxShadow: "0 0 22px -4px rgba(52,196,196,.5)"` und `src/components/sections/Hero.tsx:100` `boxShadow: "0 0 26px -6px rgba(52,196,196,.5)"` | **Halbzustand bewiesen:** Dieselbe UI-Komponente (goldgerahmtes Kennzahl-/Stufen-Badge) wurde in `src/app/die-7-stufen/page.tsx:131` bereits korrekt auf goldenen Glow migriert (`rgba(232,193,95,.5)`), in `Hero.tsx` und `mitgliedschaft/page.tsx` aber **nicht** – dort leuchtet das identische Element weiterhin türkis (`teal-400`-Wert `rgb(52,196,196)`). | Auf denselben Gold-Wert wie in `die-7-stufen/page.tsx` angleichen. |
| 🟠 | `src/app/opengraph-image.tsx:26` und `src/app/blog/[slug]/opengraph-image.tsx:46` | Social-Share-Vorschaubilder (OG/Twitter) nutzen einen Hintergrund-Glow aus **Teal (`rgba(33,178,189,.28)`) + Leaf-Grün (`rgba(140,198,63,.20)`)** statt der im Rest der Seite konsequent genutzten Gold-Verläufe (`HERO_GLOW`/`APP_GLOW` in `src/lib/gradients.ts`). Wer einen Link teilt, sieht damit eine andere Farbwelt als auf der Seite selbst. | Auf `HERO_GLOW`-äquivalente Gold-Radialverläufe umstellen (Werte lassen sich 1:1 aus `gold-400`/`gold-600` ableiten, da `next/og` keine CSS-Variablen unterstützt). |
| 🟠 | `src/components/visuals/Logo.tsx`, `src/components/blog/BlogIndex.tsx:210-213`, `src/app/mitgliedschaft/page.tsx:165-168` | Das aktiv genutzte Logo-Master-Asset `public/logo-brain.png` ist am Quell-File selbst weiterhin **blau/grün/türkis** und wird erst per CSS-Filter `.logo-gold` (`globals.css:583`) zur Laufzeit in Gold umgefärbt. Funktioniert aktuell überall korrekt (Filter wird an allen 3 Stellen angewendet), ist aber fragil – der Favicon-Fund oben zeigt, was passiert, wenn die Klasse an einer Stelle fehlt bzw. nicht greifen kann. | Stattdessen `public/logo-brain-gold.png` (bereits vorhandene, fertig goldene Version, aktuell **ungenutzt**, s. Abschnitt B) direkt einbinden und den Filter-Hack sowie das alte PNG entfernen. |

### A.2 Harmlose Namensreste (Wirkung bereits neutral – nur Aufräum-Empfehlung)

| Sev | Fundstelle | Befund |
|---|---|---|
| 🟡 | `src/app/globals.css:523` `.bg-cosmic` | Klasse liefert inzwischen den neuen, ausschließlich goldenen Radial-Verlauf auf `navy-950` – **kein** Kosmos-Look mehr. Wird aktiv genutzt in `src/components/sections/Compass.tsx:18`, `src/components/sections/Testimonials.tsx:11`, `src/app/ueber-mich/page.tsx:141`, `src/app/die-7-stufen/page.tsx` (Kommentar). Nur der Klassenname ist Altlast, die Optik ist bereits neu. |
| 🟡 | `src/app/globals.css:547` `.bg-stars` | Bewusst deaktiviert (`background-image: none`), Kommentar dokumentiert das explizit. Wird aber weiterhin im Markup eingehängt: `src/components/blog/BlogCover.tsx:71` (aktiv gerendert, aber wirkungslos) und `src/components/visuals/CosmicBackground.tsx:23-24` (toter Code, s. u.). |
| 🟡 | `src/lib/blog-accent.ts:10,22,24` `AccentKey "cosmic"` | Zwei Blog-Kategorien (Präsenz, Selbstführung) sind auf `"cosmic"` gemappt; in `src/components/blog/BlogCover.tsx:20` löst das auf ein reines Gold-Farbpaar auf. Nur der Bezeichner ist alt, keine optische Auswirkung. |
| 🟡 | `src/components/visuals/CosmicBackground.tsx` | **Komplett toter Code** – laut `grep -rn "CosmicBackground" src` nur die eigene Definition, **nirgendwo importiert/gerendert**. Enthält noch `bg-stars`/`bg-cosmic`-Referenzen. Empfehlung: Datei löschen oder klar als „unused" markieren. |
| 🟡 | `src/components/visuals/NeuralOrb.tsx` | Ebenfalls **komplett toter Code** (nur Eigenreferenz, kein Import). Enthält hartcodierte Alt-Palette-Hex-Werte (`#3670ee`, `#0b1636`, `#5b8cff`, `#8bb2ff`, `#a6d64c`, `#34c4c4` …), die exakt dem alten Blau/Grün-Cosmic-Look entsprechen. Da unused, aktuell **kein sichtbarer** Bruch – aber Risiko, falls die Komponente reaktiviert wird. Empfehlung: löschen. |
| 🟡 | `src/app/globals.css:29-39` `--color-brand-50…900` | Komplette Blau-Token-Familie („Brand-Blau / Primär / CTA") im `@theme` definiert, aber **0 Verwendungen** im gesamten `src`-Baum (`grep -rIn "brand-[0-9]" src` → keine Treffer). Toter Rest aus der alten Blau-zentrierten Markenwelt. Empfehlung: entweder entfernen oder Nutzungszweck dokumentieren. |
| 🟡 | `src/app/mitglieder/wissensdatenbank/page.tsx:199` „…komplexeste bekannte Struktur des Universums…" | Reiner Fließtext-Inhalt (keine Design-Klasse/Farbe), keine Design-Altlast. |

### A.3 Farb-/Palette-/Typografie-Prüfung

- **Hartcodierte Hex/RGB außerhalb `globals.css`:** durchsucht (`grep -rInE "#[0-9a-fA-F]{3,8}|rgb\(|rgba\("`). Alle Treffer sind entweder (a) technisch bedingt (E-Mail-HTML in `src/lib/ebook-mail.ts`, `src/app/api/**/route.ts` – Inline-Styles in Mail-Clients benötigen zwingend Hex-Werte, Farben entsprechen den Marken-Tokens) oder (b) die oben unter A.1 gelisteten Altlasten. Keine zusätzlichen verdächtigen Blau-/Violett-Töne gefunden.
- **Fremd-Paletten** (`slate/zinc/gray/neutral/stone/blue/indigo/violet/purple/fuchsia`): `grep -rInE "(bg|text|from|to|via|border|ring|fill|stroke)-(…)-[0-9]{2,3}"` → **0 Treffer**. Sauber.
- **Typografie:** `h1–h5` erhalten global über `@layer base` (`globals.css:178-194`) automatisch `font-family: var(--font-display)` (Fraunces); Fließtext über `body { font-family: var(--font-sans) }` (Inter). Stichproben von Überschriften ohne explizite `font-display`-Klasse (`SectionHeading.tsx`, `WhyMe.tsx`, `Hero.tsx`, `Footer.tsx` u. a.) sind **korrekt**, da die Regel bereits auf Tag-Ebene greift – kein Fund. Einzige zusätzliche Font-Nutzung: `font-mono` in `admin/vorlagen/page.tsx:141` und `admin/redaktionsplan/Planer.tsx:283` (interne Admin-Tools, unkritisch) sowie `fontFamily: "sans-serif"` in den beiden `opengraph-image.tsx`-Dateien (bedingt durch `next/og`/Satori, das keine Web Fonts ohne explizites Laden nutzt – kein Fehler, aber optisch weicht das Social-Preview-Bild damit von Inter/Fraunces ab; niedrige Priorität).
- **Dunkel/Hell-System:** Alle dunklen Sektionen folgen konsequent dem Muster `on-dark` + `bg-navy-900`/`bg-navy-950` + `text-cream` (`FinalCta.tsx`, `Hero.tsx`, `PageHero.tsx`, `Footer.tsx`, `BlogIndex.tsx`, `blog/[slug]/page.tsx`, `gratis-ebook/page.tsx`, `bewusstseinstest/page.tsx`, `mitgliedschaft/page.tsx`). Helle Sektionen nutzen durchgängig `paper`/`surface`/`surface-2` mit `ink*`-Text (`kontakt`, `impressum`, `datenschutz`, `not-found.tsx`, `PhotoFrame.tsx`, `Button.tsx`). Kein Fund von Alt-Kontrastlogik.

### A.4 Flächendeckung nach Seite

| Seite | Status |
|---|---|
| Startseite (`Hero`, `Compass`, `Testimonials`, `WhyMe`, `WhatToExpect`, `MaybeNotYou`, `FinalCta`) | ✅ neues System, bis auf die unter A.1 genannten Hero.tsx-Punkte |
| `die-7-stufen` | ✅ größtenteils vorbildlich migriert (bereits Gold-Glow statt Teal), einzige Alt-Farbe: `#08102a` |
| `blog` (Index + `[slug]`) | ✅ Layout/Farben neu; **Bildwelt** teils Altlast (s. Block B) |
| `ueber-mich` | ✅ neues System (`bg-cosmic on-dark`, neu golden) |
| `mitgliedschaft` (+ `willkommen`) | 🟠 Layout neu, aber Alt-Farbwerte `#08102a` + Teal-Glow (A.1) |
| Mitglieder-Bereich (`mitglieder/**`) | ✅ `member-hero`/`on-dark`-System konsequent; Bildwelt teils Altlast (`hero-mitglieder.webp`, `hero-gedankenprofil.webp`, `hero-programm.webp`, s. Block B) |
| `kontakt` | ✅ neues System |
| Rechtstexte (`impressum`, `datenschutz`) | ✅ neues System, nutzt `Prose`/`paper-aura` |
| `not-found.tsx`, `login` | ✅ `APP_GLOW` (Gold), sauber |
| OG-/Twitter-Preview (`opengraph-image.tsx`, `blog/[slug]/opengraph-image.tsx`) | 🟠 s. A.1 |
| Favicon (`icon.png`) | 🔴 s. A.1 |

---

## B) Bildwelt

### B.1 Referenz-Integrität

Alle in Code referenzierten lokalen Bildpfade wurden geprüft (statische `next/image`-`src`, `import`-Assets, Template-Literal-Pfade für `video-thumbnails/**`, `poster`-Attribute, `blog.ts`-Cover):

- **Blog-Cover** (`src/lib/blog.ts`, 29 Einträge `/blog/*.png`): alle vorhanden.
- **Statische Imports** (`heiko-hero.webp`, `ebook-mockup.webp`, `heiko-portrait.webp`, `logo-brain.png`, `kompass-weg.webp`, `hero-*.webp` etc.): alle vorhanden.
- **Dynamische Pfade** `/video-thumbnails/praxis/${slug}.png`, `/video-thumbnails/vertiefungen/${slug}.png`, `/video-thumbnails/stufen/stufe-${nr}.png`: gegen alle Slugs aus `src/lib/practices.ts` (13) und `src/lib/deep-dives.ts` (29) sowie alle 7 Stufen geprüft – **alle Dateien vorhanden**.
- Kein `/public/…`-Präfix-Fehler gefunden (`grep -rn '"/public/' src` → 0 Treffer außerhalb von JSDoc-Beispielen wie `src/lib/blog.ts:20` und `PhotoFrame.tsx:7`, die korrekt nur als Kommentar/Beispiel dienen).
- **Ergebnis: keine toten Bildpfade.**

### B.2 Stil-Konsistenz zur neuen Bildwelt — Sichtprüfung durchgeführt

Es wurde eine Stichprobe zentraler Marketing-/Blog-Bilder direkt geöffnet und visuell geprüft. Ergebnis: ein **wiederkehrendes Muster** aus blau/türkis-neonfarbenem „Kosmos"-Look (Sternennetz-Silhouetten, glühende Neuronen-Netze in Cyan/Blau/Grün) steht neben Bildern, die bereits vorbildlich warm-golden/cinematic sind.

| Sev | Datei | Befund (visuell geprüft) |
|---|---|---|
| 🔴 | `public/blog/neuroplastizitaet.png` (Artikel „neuroplastizitaet") | Fast vollständig blau/grün-neonfarbenes Gehirn-Netzwerk auf Schwarz – **kein** Gold, klassischer alter Kosmos-/Sci-Fi-Look. |
| 🔴 | `public/hero-mitglieder.webp` (Hero `src/app/mitglieder/page.tsx:252`) | Abstraktes „Space-Smoke"-Bild, rechte Hälfte komplett blau/türkis-neon, nur linke Hälfte golden. |
| 🟠 | `public/hero-programm.webp` (`src/app/mitglieder/programm/page.tsx:46`) | Linkes Kopfprofil als blaues „Sternen-Konstellations"-Netz (visuell nahezu ein Sternenfeld/Galaxie-Motiv) neben warmem Gold-Sonnenuntergang rechts. |
| 🟠 | `public/hero-gedankenprofil.webp` (`src/app/mitglieder/gedankenprofil/page.tsx:93`) | Gleiches Muster: blaues Neuronen-Kopfprofil links vs. warmer Gold-Wanderpfad rechts. |
| 🟠 | `public/blog/meditation.png`, `public/blog/placebo-effekt.png` | Enthalten große blaue/türkise/regenbogenfarbene „Sternen-Netzwerk"-Flächen neben dem goldenen Bildzentrum. |
| 🟡 | `public/blog/asch-experiment.png`, `public/blog/freier-wille.png` | Bewusst wirkende Blau-vs-Gold-Kontrastkomposition (vermutlich „alt/negativ = blau, neu/positiv = gold"); Blau-Anteil ist deutlich wahrnehmbar und erinnert an den früheren Kosmos-Look. Ggf. gewolltes Stilmittel – bitte im Team klären, ob das beibehalten werden soll. |
| 🟡 | `public/blog/freier-wille.png` | Zusätzlich: **Text ist direkt ins Bild eingebrannt** (deutsche Labels „KONDITIONIERUNG", „ANGST", „BEWUSSTSEIN" etc.) – typisches KI-Bild-Artefakt, nicht barrierefrei/lokalisierbar, wirkt nicht editoriell hochwertig. |
| 🔴 | `public/logo-brain.png` (Quelldatei) | Quell-PNG selbst ist blau/grün/türkis; wird nur per CSS-Filter optisch golden (siehe A.1). |
| 🔴 | `src/app/icon.png` | Identisches blau/grün/türkises Motiv **ohne** Filter – im Browser-Tab sichtbar (siehe A.1). |

**Positivbeispiele** (stilistisch bereits stimmig, dunkel/warm-golden/cinematic-realistisch): `public/kompass-weg.webp`, `public/blog/denkfehler.png`, `public/blog/willenskraft.png`, `public/blog/muster-erkennen.png`, `public/blog/gedanken-koerper.png`, `public/hero-detektor.webp`, `public/ebook-mockup.webp`, `public/heiko-hero.webp`, `public/ueber-heiko-hund.webp` (reales Foto, passt thematisch, wirkt aber durch helles Tageslicht-Blau am Himmel weniger „dunkel-cinematic" als der Rest – vertretbar, da authentisches Porträtfoto).

**Weitere Sichtprüfung nötig:** Von den 29 Blog-Cover-PNGs wurden 8 stichprobenartig geöffnet. Da mehrere der geprüften Bilder das blau/türkise Muster zeigen, empfiehlt sich, **alle verbleibenden ~21 Cover** (`public/blog/*.png` – u. a. `gruppendruck.png`, `angst-steuerung.png`, `normalisierung.png`, `bildmacht.png`, `propaganda.png`, `medien-agenda.png`, `algorithmen.png` …) im Browser/Bildbetrachter durchzusehen und gegen die Gold/Warm-Vorgabe zu prüfen, bevor der Bilder-Block final freigegeben wird.

### B.3 Format & Technik

- **Public-Ordner Gesamtgröße:** 131 MB (135 PNG, 78 WebP, 1 SVG, 1 PDF).
- **Auffällig große Dateien** (`find public -type f -size +500k`): alle 29 Blog-Cover-PNGs (1,7–2,7 MB je Datei, größtenteils `hund-praesenz.png` 2,7 MB, `reizueberflutung.png`/`medien-agenda.png`/`freier-wille.png` je ~2,5 MB), `Die-7-Stufen-…pdf` (3,2 MB), `logo-brain.png`/`logo-brain-frei.png` (je 1,1 MB), `logo.svg` (**827 KB** – ungewöhnlich groß für ein SVG, enthält eingebettete Filter/Rasterdaten), `ebook-cover.png` (753 KB), sowie **~100 `video-thumbnails/**.png`** rund um 500–535 KB je Datei. Die Hero-/Portrait-Bilder sind dagegen bereits als schlankes `.webp` eingebunden – die Inkonsistenz liegt also gezielt bei Blog-Covern und Video-Thumbnails, die noch als unkomprimiertes PNG vorliegen. **Empfehlung:** Blog-Cover und Video-Thumbnails nach `.webp`/`.avif` konvertieren (Next/Image optimiert zwar zur Laufzeit, die großen Quelldateien vergrößern aber Repo/Build unnötig).
- **Verwaiste „-hell"-Varianten:** 50 Dateien (`*-hell.png` unter `video-thumbnails/**`, ~26 MB gesamt) sind **im Code nirgendwo referenziert** (`grep -rn "hell.png" src` → 0 Treffer). Wirken wie ein abgebrochener Light-Mode-Thumbnail-Ansatz. Empfehlung: löschen oder Verwendungszweck klären.
- **Verwaiste Logo-Dateien:** `public/logo-full.png`, `public/logo-brain-gold.png`, `public/logo-brain-frei.png`, `public/logo.svg` – keine Referenz in `src/` gefunden. Besonders bemerkenswert: `logo-brain-gold.png` ist **bereits die fertige goldene Version** des Logos und könnte den CSS-Filter-Hack (A.1) ersetzen.
- **`width`/`height`/`fill`:** Stichprobe zeigt durchgängig sinnvolle Werte – Hero-Bilder mit `fill` + `sizes="100vw"` (`die-7-stufen/page.tsx`), Portraits mit expliziten `width`/`height` (`kontakt/page.tsx:38-39` `1536×2048`), Cover/Thumbnails mit `fill` in fest dimensionierten Containern (`BlogIndex.tsx`, `PhotoFrame.tsx`). Kein Hinweis auf fehlende Dimensionen/Layout-Sprünge.

### B.4 Barrierefreiheit der Bilder (nur Bildwelt-Aspekt)

- **Inhaltliche Bilder** (Blog-Cover) haben durchgängig ausführliche, beschreibende `alt`-Texte (Pflichtfeld im Typ `PostImage`, s. `src/lib/blog.ts:18-26`) – vorbildlich.
- **Dekorative Bilder** sind korrekt mit `alt=""` **und** zusätzlich `aria-hidden`/`aria-hidden`-Wrapper versehen (`PageHero.tsx:64-66`, `die-7-stufen/page.tsx:44-51`, alle `hero-*.webp`-Einbindungen in den Mitglieder-Unterseiten, `LessonHero.tsx`) – Muster ist konsistent.
- Tiefere A11y-Prüfung (Kontraste, Fokusreihenfolge etc.) liegt außerhalb dieses Checks (Aufgabe des **barrierefreiheit-pruefers**).

---

## Rest-/Aufräum-Liste (harmlose Namensreste, keine Design-Brüche)

1. `src/components/visuals/CosmicBackground.tsx` – toter Code, nirgends importiert. Löschen oder Nutzung dokumentieren.
2. `src/components/visuals/NeuralOrb.tsx` – toter Code, nirgends importiert, enthält hartcodierte Alt-Palette-Hex-Werte. Löschen.
3. `.bg-cosmic` (`globals.css:523`) – Klassenname alt, Wirkung bereits neu (reines Gold). Später umbenennen (z. B. `.bg-dark-glow`), nicht dringend.
4. `.bg-stars` (`globals.css:547`) – bewusst neutralisiert, wird aber in `BlogCover.tsx:71` weiter eingehängt (wirkungslos). Aufruf könnte entfernt werden.
5. `AccentKey "cosmic"` in `src/lib/blog-accent.ts` – nur Bezeichner, Farbwelt bereits Gold. Umbenennen optional.
6. `--color-brand-50…900` in `globals.css` – vollständig ungenutzte Blau-Token-Familie. Entfernen oder Zweck klären.
7. `public/logo-full.png`, `public/logo-brain-frei.png`, `public/logo.svg` (827 KB) – unreferenzierte Alt-Assets. Prüfen und ggf. löschen.
8. 50 `video-thumbnails/**/*-hell.png` (~26 MB) – unreferenzierte Alt-Assets. Prüfen und ggf. löschen.
9. Kommentar-Restbegriffe „Kosmos-Feld"/„kosmisch" in `die-7-stufen/page.tsx:42`, `globals.css` (mehrfach) – rein dokumentarisch, keine Wirkung, bei Gelegenheit aktualisieren.

---

## Wo eine Browser-Sichtprüfung den Code-Befund noch bestätigen sollte

- **Favicon-Fix** (`icon.png`) nach Austausch im Browser-Tab/Lesezeichen-Vorschau kontrollieren (Cache leeren).
- **OG-/Twitter-Preview** nach Farbanpassung über einen Share-Debugger (z. B. Facebook Sharing Debugger, Twitter Card Validator) neu rendern lassen, da `next/og` zur Build-/Request-Zeit generiert.
- **Alle 29 Blog-Cover-PNGs** vollständig durchsehen (aktuell nur 8 stichprobenartig geprüft) und gegen die Gold/Warm-Vorgabe bewerten – ggf. gemeinsam mit dem Team festlegen, ob der wiederkehrende „Blau = alt/negativ vs. Gold = neu/positiv"-Kontrast als bewusstes Stilmittel bestehen bleibt oder vereinheitlicht werden soll.
- **Stage-Badge-Glow** (`Hero.tsx`, `mitgliedschaft/page.tsx`, `die-7-stufen/page.tsx`) nach Farbangleichung nebeneinander im Browser vergleichen.
- **Logo-Ersetzung** (`logo-brain.png` → `logo-brain-gold.png`) nach Umstellung in allen drei Einbindungsorten (`Logo.tsx`, `BlogIndex.tsx`, `mitgliedschaft/page.tsx`) visuell gegenprüfen, insbesondere Kantenschärfe/Transparenz des bereits vorhandenen Gold-Assets.
