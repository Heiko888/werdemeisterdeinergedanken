# 07 · Anwendungen

Wie die Marke über die Kanäle hinweg konkret aussieht – und womit die Assets
erzeugt werden. Vieles ist **generiert** (reproduzierbar per Skript), nicht
manuell gebaut.

## Kanäle

Quelle: `src/lib/site.ts` (`social`).

| Kanal | Profil |
|-------|--------|
| Instagram | @werde.meister.deiner.gedanken |
| YouTube | @WerdeMeisterdeinerGedanken |
| Facebook | werde.meister.deiner.gedanken.2024 |
| LinkedIn | in/werdemeisterdeinergedanken |

Website: **www.werdemeisterdeinergedanken.de**

## Wiederkehrende Asset-Typen

Quelle: `docs/marketing/brand-assets.mjs`.

- **Profil-/Avatarbilder** (rund-sicher) und **Kanalbilder** (quadratisch mit Wortmarke)
- **WhatsApp-Business**: rundes Profilbild, Info-Kachel, Status-Banner 9:16
- **YouTube-Thumbnails** (16:9, großer Fraunces-Titel + Akzentwort)
- **Zitat-Kacheln** aus den Marken-Kernsätzen (1:1, 4:5, 9:16)
- **Studien-Fakten-Kacheln** (1:1, 4:5, 9:16)
- **Gratis-E-Book-Posts** (9:16, 4:5, 1:1, 16:9, 2:3)
- **Instagram-Story / Key-Visual** (dieselben 5 Formate)

## Standard-Formate

| Format | Maße | Einsatz |
|--------|------|---------|
| 1:1 | 1080×1080 | Feed quadratisch, Avatar, Kanalbild |
| 4:5 | 1080×1350 | Feed hoch (Instagram) |
| 9:16 | 1080×1920 | Story / Reel / WhatsApp-Status |
| 16:9 | 1920×1080 (Thumbnail 1280×720) | YouTube / Querformat |
| 2:3 | 1000×1500 | Pinterest |

> Höhere Auflösung: `SCALE=2 node docs/marketing/brand-assets.mjs`
> (z. B. für schärfere textlastige Kacheln).

## Layout-Prinzipien der Kacheln

- **Eyebrow** (Türkis, Versalien, weite Laufweite) → **Headline** (Fraunces,
  ein Akzentwort im Verlauf) → optionaler Untertitel/Quelle → **Signatur unten**
  (Emblem + „Werde Meister deiner Gedanken").
- CTA-Buttons: Pill-Form, Marken-Verlauf, dunkle Schrift (`#06222a`),
  Zusatz „Link in Bio".
- Zitat-Kacheln: großes, sehr transparentes Anführungszeichen als Deko.

## Wichtige Generatoren (Marketing)

| Skript | Erzeugt |
|--------|---------|
| `docs/marketing/brand-assets.mjs` | Avatare, Kanalbilder, Thumbnails, Zitat-/Fakten-/E-Book-/Story-Kacheln |
| `tools/marketing/content-overlays.mjs` | Transparente Overlays (Zitat/Fakt) für eigene Fotos |
| `docs/marketing/content-data.mjs` | Gemeinsame Textquelle (Zitate + Fakten) |

⚠️ PRÜFEN: Weitere Generatoren in `tools/` (PDF, Carousels, Reels-Cover,
Banner, Workshop) sind in `docs/generatoren/` dokumentiert – Verweis hier
genügt, Details dort.

## Print & Geschäftsausstattung

Visitenkarte und Briefpapier werden – wie die Social-Assets – **generiert**
(reproduzierbar per Skript), nicht manuell gebaut. Rendering über
Playwright/Chromium als **Vektor-PDF** mit eingebetteten Schriften.

```bash
npm run print          # → tools/print/out/
```

Quelle: `tools/print/geschaeftsausstattung.mjs` (Kontaktdaten dort im
`CONTACT`-Objekt, gespiegelt aus `src/lib/site.ts` + `src/app/impressum/page.tsx`).

| Anwendung | Maße | Aufbau |
|-----------|------|--------|
| **Visitenkarte** | 85×55 mm + 3 mm Beschnitt, doppelseitig | **Vorderseite** dunkel (Anthrazit + Marken-Verlauf): Emblem, Wortmarke (Signatur-Verlauf auf „Gedanken"), Tagline als Eyebrow. **Rückseite** hell (Papier): Name + Rolle, Kontaktspalte (Mail/Web/Instagram), Markenzeile in der Fußzeile. Schnittmarken angelegt. |
| **Briefpapier** | A4 (210×297 mm) | Kopf mit Emblem + Wortmarke + Tagline, feine Signatur-Linie; DIN-5008-naher Satzspiegel (Rücksende-Zeile, Adressfeld, Datum, Betreff); Fußzeile mit Anschrift, Kontakt, USt-IdNr. Als leerer Bogen **und** als Muster-Anschreiben. |

**Print-Regeln:**

- **Beschnitt** 3 mm ringsum bei randabfallenden Elementen (Visitenkarten-
  Vorderseite); Schnittmarken sind im PDF eingezeichnet.
- Chromium rendert **RGB** – für Offsetdruck beim Dienstleister nach **CMYK**
  wandeln lassen (oder RGB-Digitaldruck wählen).
- Emblem-Mindestgröße im Druck: mind. **12 mm** Höhe (Visitenkarte nutzt 16 mm,
  Briefbogen 15 mm). Schutzraum wie in Kap. 03 (mind. halbe Emblemhöhe ringsum).
- Farben/Schriften spiegeln die Quelle der Wahrheit (Kap. 04/05). Der
  **goldene Logo-Schriftzug** ist der tragende Akzent: auf Dunkel leuchtet
  Gold (`gold-300/400`), auf Hell tragen die tiefen Töne (`gold-600`
  Antikgold für Feinlinien, `gold-700` als AA-Text/Link). Fließtext bleibt
  in `ink`-Tönen.

Für den Alltag gibt es den Briefbogen zusätzlich als **Word-Vorlage** zum
Download (`npm run briefpapier:word` → `WMDG-Briefpapier-Vorlage.docx`):
beschreibbarer A4-Bogen mit Marken-Kopf/-Fuß in der Word-Kopf-/Fußzeile und
DIN-5008-nahem Satzspiegel mit Platzhaltern. Websichere Schriften (Georgia ≈
Fraunces, Arial ≈ Inter) und solide, AA-taugliche Markenfarben.

Details & Datenpflege: `tools/print/README.md`.

## E-Mail-Signatur

Ebenfalls generiert (`npm run signatur`, Quelle
`tools/print/email-signatur.mjs`). Ausgabe: fertige HTML-Signatur (Anleitungs-
seite + Snippet) sowie eine Nur-Text-Variante in `tools/print/out/`.

**E-Mail-Besonderheiten** (bewusst anders als Web/Print):

- **Tabellen-Layout + Inline-Styles** – E-Mail-Clients strippen `<style>`,
  `<head>` und unterstützen kein Flexbox/Grid.
- **Websichere Schriften** statt Fraunces/Inter: **Georgia** (≈ Fraunces) für
  den Namen, **Arial** (≈ Inter) für den Rest – Clients laden keine eigenen
  Fonts.
- **Keine Verlaufsschrift** – der `-webkit-background-clip`-Trick rendert in
  Gmail/Outlook nicht. Stattdessen solide, **AA-taugliche** Markenfarben
  (`ink`, Teal `#0f6d77`, Grün `#3a7615`) und ein Teal-Trennbalken.
- **Logo als gehostetes Bild** (`public/email/wmdg-signatur-logo.png`, ~120 px,
  ausgeliefert über die Website) – eingebettete Bilder werden von Clients
  entfernt.

Aufbau: Emblem · Teal-Trennlinie · Name (Serife) + Rolle (Teal) · Kontaktzeilen
(Tel/Mail/Web/Insta) · Markenzeile + Tagline als Eyebrow.

**Zwei Varianten:** **hell** (für helle Mail-Oberflächen, AA-Ersatztöne) und
**dunkel** (Navy-Karte mit eigenem Grund für Dark-Mode-Clients; auf Navy sind
Teal-300/Grün als Akzent unkritisch, Kap. 04). Beide werden vom selben Generator
erzeugt (`signature("light" | "dark")`).

## Redaktionsplan

Ein kanalübergreifender Redaktionsplan wird über das Redaktions-Team gepflegt
(`docs/marketing/redaktionsplan.md`, Kalender `redaktionsplan-kalender.html`;
Skill `/redaktionsplan`).

---

**Quelle der Wahrheit:** `docs/marketing/`, `tools/marketing/`,
`tools/print/`, `src/lib/site.ts`
