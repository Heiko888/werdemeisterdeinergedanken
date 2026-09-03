# 09 · Marken-Übersicht (Farben, Logos & Vorlagen-Bestand)

Eine Admin-Seite im Marketing-Cockpit, die auf **einen Blick** zeigt, was es an
Marken-Material gibt – damit der Überblick nicht verloren geht.

**Route:** `/admin/marken-uebersicht` (nur Admin-E-Mails, `noindex`)
**Seite:** `src/app/admin/marken-uebersicht/page.tsx`
**Daten:** `src/lib/marken-uebersicht.ts`

## Was die Seite zeigt

1. **Die drei Farbwelten** – jedes Motiv entsteht in drei Welten:
   - **Dunkel · Gold** – Grund `#090b10`, Gold-Gehirn (`logo-brain-gold.png`) +
     Gold-Akzente. Standard (Datei **ohne** Suffix).
   - **Hell · Creme** – Grund `#f6f4ee`, **buntes Seitenansicht-Gehirn**
     (`logo-brain-tuerkis.png`, transparent) + Gold-Text-Akzente. Suffix `-hell`.
     Nur die **dunklen** Standard-Folien nutzen noch das Gold-Front-Emblem.
   - **Türkis · Navy** – Navy-Grund mit Teal-Schimmer, Türkis-Gehirn
     (`logo-brain-tuerkis.png`, Seitenansicht grün→teal→blau) + Grün→Teal-Akzente.
     Datei-Suffix `-tuerkis`. **Neu**.
   - **Türkis · Creme** – heller Papier-Grund + Türkis-Gehirn + tieferes
     Grün→Teal (AA-lesbar). Datei-Suffix `-tuerkis-hell`. **Neu**.

   Systematik = zwei Achsen: **Grund** (Navy/Creme) × **Akzent** (Gold/Türkis)
   → vier Kombinationen. Alle in den Generatoren angelegt (siehe unten),
   Dateien entstehen beim Rendern.
2. **Komplettes Farbsystem** – alle Marken-Farben mit Hex-Wert, Token-Name und
   Rolle (Quelle: `src/app/globals.css`).
3. **Sämtliche Logos** – jedes Logo auf Creme **und** auf Dunkel nebeneinander.
4. **Vorlagen-Bestand & Lücken-Check** – pro Motiv-Familie: wie viele Motive es
   gibt und in welchen der drei Welten sie vorliegen.

## Die drei Farbwelten rendern

Die 4-Wege-Theme-Logik (`dunkel` / `hell` / `tuerkis` / `tuerkis-hell`) steckt in
jedem Marketing-Generator. Alle Welten in einem Befehl erzeugen:

```
npm run marketing:all
```

Das führt nacheinander aus: `brand-assets`, `content-overlays`, `story-overlays`,
`story-carousels`, `whatsapp:mitgliedschaft` und `vorlagen:galerie`.

Nur eine Welt: `THEME=tuerkis-hell node docs/marketing/brand-assets.mjs`
(analog für jeden Generator; `THEME` ∈ `dunkel|hell|tuerkis|tuerkis-hell`).
Danach in `src/lib/marken-uebersicht.ts` `tuerkisStatus.gerendert = true` setzen.

## Serverstand der Marken-Assets (01.09.2026)

| Kennzahl | Wert |
|----------|------|
| Motive gesamt (alle Familien & Formate) | **360** |
| davon paarig vorhanden (Dunkel ↔ Creme) | **100 %** |
| Türkis (dritte Welt) | **neu** – nach Render erwartet: 360 |
| themen-neutrale Vorlagen (Hilfslinien/Hintergründe) | 18 |
| Quell-Foto ohne Hell-Variante (kein Template) | 1 |
| Bilddateien gesamt unter `docs/marketing/` (2 Welten) | 756 |
| Logo-Varianten | 6 |

**Ergebnis des Lücken-Checks:** Dunkel/Gold und Creme/Hell sind vollständig – es
fehlt keine Variante. **Türkis/Teal ist neu** in allen Generatoren angelegt und
liefert nach dem Rendern dieselben 360 Motive (`-tuerkis.png`). Einzige bewusste
Nicht-Paarung bleibt das rohe Greenscreen-Porträt
`assets/portrait-greenscreen-20260616.jpg` (Bildquelle, kein Template).

**Aufräum-Hinweis:** `public/logo-brain-frei.png` ist byte-identisch mit
`public/logo-brain.png` (Dublette – eine Datei würde genügen).

## Änderungsprotokoll

- **03.09.2026 – E-Book-PDF neu gerendert (aktuelles Gold-Seitengehirn).** Das
  Lead-Magnet-PDF `public/Die-7-Stufen-der-Bewusstseinsentwicklung.pdf` stammte
  noch vom 31.08. – also **vor** der Gold-Seitengehirn-Umstellung (02.09.) – und
  zeigte auf dem Cover noch das alte Front-Gehirn. Neu gebaut mit
  `tools/pdf/build-ebook.py` (bindet `public/logo-brain-gold.png` ein) →
  Chromium-Print; Header-Emblem und großes Cover-Motiv sind jetzt das aktuelle
  Seitengehirn. Voller Neubau aller PDFs via `npm run pdf`.
- **03.09.2026 – Website-Cover/Mockup ans PDF angeglichen (creme/gold).** Die
  bisher **inkonsistenten** statischen Bilder (`public/ebook-cover.png`/`.webp`
  war navy/türkis, `public/ebook-mockup.webp` creme mit altem Front-Gehirn)
  wurden durch das **echte PDF-Cover-Design** ersetzt: flaches Cover
  (1000×1414, creme/gold, neues Seitengehirn) aus der gerenderten Cover-Seite,
  plus ein neues creme Hardcover-3D-**Mockup** (1200×1600) mit demselben Cover.
  Damit sehen Download-PDF, Website-Vorschau und Mockup einheitlich aus.
- **03.09.2026 – Rundes Emblem-Profilbild lebendiger.** Die Scheibe von
  `avatarRoundPlain` (`WMDG-Profilbild-Rund-Emblem`) war zu flach. Jetzt mit
  warmem Kern-Verlauf (Gold bzw. Türkis je Welt), diagonalem Sheen oben links,
  Rand-Vignette und Rim-Light (inset-Schatten), zweitem feinem Innenring und
  stärkerer Aura/Core-Glow hinter dem Gehirn – wirkt plastisch statt flach.
  Alle vier Welten neu gerendert. **Dasselbe** gilt jetzt für das
  **quadratische** Emblem-Profilbild (`avatarSquarePlain`,
  `WMDG-Profilbild-Quadrat`): warme Fläche mit Kern-Verlauf, Sheen,
  Eck-Vignette und feinem gold-getöntem Innenrahmen.
- **03.09.2026 – Alte Front-Gehirn-Profilbilder entfernt.** Die Legacy-Dateien
  `WMDG-Profilbild-1080`, `WMDG-Profilbild-rund-1080` und `WMDG-Profilbild-rund-500`
  (je dunkel + Creme) trugen noch das frühere **frontale** Gehirn und passten nicht
  mehr zum Seitengehirn-Look. Sie sind gelöscht; der zugehörige Alt-Generator
  `docs/marketing/profile-avatar.mjs` (nicht in `marketing:all`) wurde ebenfalls
  entfernt. Ersetzt durch die brand-assets-Profilbilder `WMDG-Profilbild-Rund`,
  `WMDG-Profilbild-Rund-Emblem` und `WMDG-Profilbild-Quadrat` (aktuelles
  Seitengehirn, alle vier Welten).
- **03.09.2026 – Echtes Schriftlogo überall + neues rundes Emblem-Profilbild.**
  Drei Dinge:
  1. **Kanalbild** (`channelSquare` in `brand-assets.mjs`: `WMDG-WhatsApp-Kanalbild`,
     `WMDG-Messenger-Kanalbild`, `WMDG-Kanalbild-Quadrat`) zeigte die Wortmarke nur
     als schlichten Versal-Blocktext. Jetzt trägt es das **vollständige
     Header-Lockup**: „WERDE MEISTER" in Fraunces („Meister" im Gold-Verlauf) über
     „— DEINER GEDANKEN —" mit Flankier-Strichen (identisch zu
     `src/components/visuals/Logo.tsx`). Alle vier Welten neu gerendert.
  2. **Instagram-Story-Logo** (`logoBody` in `docs/marketing/social-banners.mjs`)
     nutzte denselben falschen Block-Schriftzug → jetzt ebenfalls echtes Lockup
     (dunkel + Creme). Andere Banner unverändert.
  3. Neues **rundes Emblem-Profilbild ohne Schriftzug** (`avatarRoundPlain`,
     Ziel `profil/WMDG-Profilbild-Rund-Emblem.png`): runde Scheibe mit feinem Ring
     und zentriertem 3D-Gehirn, in allen vier Welten – die Creme-Variante zeigt das
     **goldene** Gehirn.
  Story-Carousels und Content-Overlays trugen das Lockup bereits korrekt.
  Neu erzeugen: `ONLY=Kanalbild node docs/marketing/brand-assets.mjs` ·
  `ONLY=Profilbild-Rund-Emblem node docs/marketing/brand-assets.mjs` ·
  `node docs/marketing/social-banners.mjs`.
- **03.09.2026 – Willkommens-Thumbnail: „Mitgliederbereich · Video"-Tag unten
  links.** Auf dem Willkommens-Thumbnail (`public/video-thumbnails/willkommen*.png`,
  einziges Motiv mit freigestelltem Porträt) saß der Reihen-Tag oben rechts direkt
  neben dem Kopf. Er sitzt jetzt **unten links** in der freien Fußzeile, klar weg
  vom Gesicht (`.frame.has-portrait .tag` absolut positioniert in
  `docs/marketing/video-thumbnails.mjs`). Neu gerendert in allen vier Welten mit
  `ONLY=willkommen node docs/marketing/video-thumbnails.mjs`.
- **02.09.2026 – Türkis-Emblem global auf neues 3D-Seitengehirn.** Das
  Türkis-Marken-Emblem ist jetzt das neue, freigestellte **3D-Seitengehirn**
  (Grün→Türkis→Blau, Neon-3D-Look). Getauscht: `public/logo-brain-tuerkis.png`
  **und** `docs/reels/covers/logo.png` (1200 px, transparent, 367 KB).
  Neu gerendert wurden **alle Türkis-Welten** (`-tuerkis` + `-tuerkis-hell`):
  Zitate, Studienfakten, Content-Overlays, Story-Overlays, Story-Carousels,
  WhatsApp-Mitgliedschaft, Instagram-Stories, Profilbilder und
  Video-Thumbnails (866 Dateien). Die Cover-HTML referenzieren das Emblem nur
  (PNGs lokal via `npm run covers:png`). Analog zur früheren globalen
  Gold-Emblem-Umstellung – damit sind alle vier Welten formkonsistent auf
  freigestellten Seitengehirnen (Gold / Türkis). Lokal neu erzeugen:
  `npm run marketing:all` · `node docs/marketing/video-thumbnails.mjs` ·
  `npm run covers:png`.
- **02.09.2026 – Gold-Emblem global auf Seitengehirn + Schriftlogo überall.**
  Das goldene Marken-Emblem (`public/logo-brain-gold.png`) ist jetzt dasselbe
  freigestellte **Seitengehirn** wie in Türkis (nur golden), damit alle
  Gold-Grafiken formgleich sind. Betroffen und neu gerendert: Banner
  (LinkedIn/YouTube/WhatsApp/Facebook/Instagram), Profilbilder, Zitat-/Fakt-Kacheln,
  E-Book-CTA (brand-assets), sowie Content-Overlays, Story-Overlays,
  Story-Carousels, WhatsApp-Mitgliedschaft und Video-Thumbnails. Außerdem trägt
  das **runde Profilbild jetzt in allen Welten die Wortmarke** – vorher war das
  Schriftlogo nur in Türkis aktiv (`avatarRound` ohne `if (P.teal)`-Sonderfall).
- **02.09.2026 – Video-/Reel-Cover: Schriftlogo + 4 Farbwelten.** Der
  Cover-Generator (`docs/reels/covers/`) trägt jetzt oben links das komplette
  Marken-Lockup (Gehirn + „WERDE MEISTER / DEINER GEDANKEN") und existiert in
  **allen vier Welten** – vorher gab es nur Türkis-Navy. Neu: `dunkel` (Gold,
  Standard, ohne Suffix), `hell` (Gold/Creme, `-hell`), `tuerkis` (`-tuerkis`,
  das bisherige Design) und `tuerkis-hell` (`-tuerkis-hell`). Betroffen:
  `data.mjs` (Palette), `build.mjs`, `export-png.mjs`, neues `logo-gold.png`,
  alle Cover-HTML (59 Motive × 5 Formate × 4 Welten = 1180). PNGs erzeugen mit
  `npm run covers:png`. Nachgebessert: das Reihen-Label oben rechts – der
  Reihenname bricht jetzt ruhig um, die Nummer sitzt darunter mit feiner Linie
  (statt des baumelnden „· NN"). Das Gold-Emblem ist jetzt dasselbe
  **Seitengehirn** wie in den Türkis-Welten, nur golden (`logo-gold.png`,
  freigestellt) – dadurch sind alle vier Welten form- und größengleich
  (das frühere quadratische Gold-Front-Gehirn wirkte zu groß). `logo-gold.png`
  auf 900 px verkleinert (0,3 MB) – die 3,3-MB-Fassung sprengte in der
  Artifact-Galerie das CSS-Custom-Property-Limit, wodurch das Gold-Gehirn dort
  nicht angezeigt wurde. Das Cover-Studio-Artifact zeigt die Welten jetzt live
  umschaltbar; die Marken-Übersicht hat einen eigenen Cover-Abschnitt.
- **02.09.2026 – Schriftlogo in den Story-Carousels.** Neben dem Gehirn-Emblem
  oben links sitzt jetzt die vollständige Wortmarke („WERDE MEISTER / DEINER
  GEDANKEN") als Marken-Lockup – in allen vier Welten mit welt-eigenen Farben
  (Gold auf Dunkel & Creme, Türkis/Grün auf Türkis-Navy & Türkis-Creme).
  Betroffen: `tools/marketing/story-carousels.mjs` und alle neu gerenderten
  Folien unter `docs/marketing/story-carousels/**` (9 Slides × 3 Formate ×
  4 Welten). Neu erzeugen mit `npm run story-carousels`.

## Daten aktualisieren

Nach dem Erzeugen neuer Grafiken die Zahlen in
`src/lib/marken-uebersicht.ts` nachziehen (Farben in `src/app/globals.css`).
Grafiken entstehen über `docs/marketing/brand-assets.mjs`, die
Download-Galerie über `npm run vorlagen:galerie` (`/admin/vorlagen`).

---

**Quelle der Wahrheit:** `src/lib/marken-uebersicht.ts`,
`src/app/globals.css`, `public/logo-*.{png,svg}`, `docs/marketing/**`
