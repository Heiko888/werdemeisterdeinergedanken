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

## Redaktionsplan

Ein kanalübergreifender Redaktionsplan wird über das Redaktions-Team gepflegt
(`docs/marketing/redaktionsplan.md`, Kalender `redaktionsplan-kalender.html`;
Skill `/redaktionsplan`).

---

**Quelle der Wahrheit:** `docs/marketing/`, `tools/marketing/`,
`src/lib/site.ts`
