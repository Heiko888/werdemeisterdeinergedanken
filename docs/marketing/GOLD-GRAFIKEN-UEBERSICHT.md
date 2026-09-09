# Social-Media-Grafiken in Gold — Übersicht (Serverstand)

> **Stand:** siehe Kopf von `gold-grafiken-manifest.txt` (automatisch mit Datum + Commit erzeugt).
> **Zweck:** Vollständige Auflistung aller **Gold**-Grafiken pro Kanal, damit klar ist,
> welche Datei für welchen Post genommen wird. Es wurde **nichts gelöscht und nichts neu erzeugt** —
> dies ist eine reine Bestandsaufnahme.

## Was „Gold" hier bedeutet

Jede Grafik existiert in mehreren **Farbwelten (Themes)**. „Gold" umfasst **zwei** davon:

| Datei-Suffix | Theme | Optik | Rolle |
|---|---|---|---|
| *(kein Suffix)* | `dunkel` | **Gold-Akzent auf Navy** (`#090b10`) | **Standard / Flagship** |
| `-hell` | `hell` | **Gold-Akzent auf Creme** (`#f6f4ee`) | helle Variante, gleiche Gold-Marke |
| `-tuerkis` | `tuerkis` | Türkis auf Navy | *Variante — NICHT Gold* |
| `-tuerkis-hell` | `tuerkis-hell` | Türkis auf Creme | *Variante — NICHT Gold* |

**Faustregel:** Alles **ohne** `-tuerkis` im Dateinamen ist Gold.
Für den „klassischen" goldenen Look → Datei **ohne Suffix**. Für hellen Hintergrund → `-hell`.

- **Gold-Dateien gesamt:** **828 PNG** (≈ 553 MB), verteilt auf die unten gelisteten Kanäle.
- Vollständige, maschinenlesbare Liste jeder einzelnen Datei: **`gold-grafiken-manifest.txt`** (im selben Ordner).

---

## Kanal-Grafiken (Header, Profil, Banner)

### Instagram — `docs/marketing/instagram/`
Story-Startbilder / Kachel-Vorlagen. Gold = ohne Suffix (`dunkel`) bzw. `-hell` (Creme).

| Datei (Gold, Standard) | Zweck |
|---|---|
| `WMDG-Instagram-Story.png` | Story-Startbild (Text + Emblem) |
| `WMDG-Instagram-Story-Logo.png` | Story nur Logo/Emblem |
| `WMDG-Instagram-Story-1x1.png` | Feed quadratisch 1:1 |
| `WMDG-Instagram-Story-4x5.png` | Feed Hochformat 4:5 |
| `WMDG-Instagram-Story-9x16.png` | Story/Reel-Cover 9:16 |
| `WMDG-Instagram-Story-2x3.png` | Pin/Hochformat 2:3 |
| `WMDG-Instagram-Story-16x9.png` | Querformat 16:9 |

Jeweils zusätzlich als `-hell.png` (Creme-Gold). **14 Gold-Dateien.**

### Facebook — `docs/marketing/facebook/`
| Datei | Zweck |
|---|---|
| `WMDG-Facebook-Cover.png` / `-hell.png` | Titelbild (1640×624) |
| `WMDG-Facebook-Cover@2x.png` / `-hell@2x.png` | Retina-Variante |

**4 Gold-Dateien.** (Kein Türkis vorhanden.)

### LinkedIn — `docs/marketing/linkedin/`
| Datei | Zweck |
|---|---|
| `WMDG-LinkedIn-Banner.png` / `-hell.png` | Profil-Banner (1584×396) |
| `WMDG-LinkedIn-Banner@2x.png` / `-hell@2x.png` | Retina-Variante |

**4 Gold-Dateien.** (Kein Türkis vorhanden.)

### YouTube — `docs/marketing/youtube/`
| Datei | Zweck |
|---|---|
| `WMDG-YouTube-Banner.png` / `-hell.png` | Kanalbanner (2560×1440) |

**2 Gold-Dateien** + **Thumbnails** (siehe unten).

### WhatsApp — `docs/marketing/whatsapp/`
Banner (LinkedIn-Optik), Kanalbild, Profilbild, Status 9:16, 1920×1080-Variante, SafeZone-Vorlage.
**13 Gold-Dateien** (Banner zusätzlich als `@2x`).

### Profil & Messenger
- `docs/marketing/profil/` — Profil-/Kanalbild rund & quadratisch, mit/ohne Emblem — **8 Gold-Dateien**
- `docs/marketing/messenger/` — Messenger-Kanalbild — **2 Gold-Dateien**

### E-Book-Werbung — `docs/marketing/ebook/`
`WMDG-Ebook-{1x1,2x3,4x5,9x16,16x9}.png` (+ `-hell`) — **10 Gold-Dateien.**

---

## Post-Grafiken (Serien / mehrere Motive)

Diese Ordner enthalten **durchnummerierte** Motive. Jede Nummer gibt es als Gold (ohne Suffix) und Creme-Gold (`-hell`).

| Ordner | Inhalt | Gold-Dateien |
|---|---|---|
| `docs/marketing/zitate/1x1` · `4x5` · `9x16` | Zitat-Karten `WMDG-Zitat-NN` (3 Formate) | 52 + 52 + 52 = **156** |
| `docs/marketing/zitate/studien-1x1` · `studien-4x5` · `studien-9x16` | Studien-Fakten `WMDG-Studienfakt-NN` | 28 + 28 + 28 = **84** |
| `docs/marketing/content-overlays/zitate/{1x1,4x5,9x16}` | Zitate mit Foto-Overlay-Zone | 54 × 3 = **162** |
| `docs/marketing/content-overlays/studien-fakten/{1x1,4x5,9x16}` | Studien mit Overlay-Zone | 30 × 3 = **90** |
| `docs/marketing/story-overlays/{1x1,4x5,9x16}` | Story-Overlays (Text auf eigenem Foto) | 14 × 3 = **42** |
| `docs/marketing/story-carousels/sommer-2023/{1x1,4x5,9x16}` | Story-Carousel-Serie | 20 × 3 = **60** |
| `docs/marketing/youtube/thumbnails` | Video-Thumbnails `WMDG-Thumbnail-NN` | **56** |
| `docs/marketing/whatsapp-mitgliedschaft/{16x9,1x1,4x5,9x16}` (+ `/overlay`) | Mitgliedschafts-Kacheln | 4×(14+16) = **120** |

> Für Instagram-**Carousels** liegt der Generator unter `docs/carousels/` (Export nach
> `docs/carousels/export/…`). Diese PNGs sind aktuell **nicht** eingecheckt (Export-Ordner leer) —
> sie werden bei Bedarf mit `npm run carousels:png` erzeugt (Gold = Themes `dunkel`/`hell`).

---

## Gold gezielt neu erzeugen (nur falls nötig)

Alle Generatoren unterstützen die Umschaltung per `THEME`-Umgebungsvariable
(`dunkel` = Gold, `hell` = Creme-Gold). Ohne `THEME` werden alle vier Themes erzeugt.

```bash
# Nur die beiden Gold-Themes rendern:
THEME=dunkel npm run brand-assets      # IG-Stories, Zitate, Studien, Profil, Messenger, E-Book, WhatsApp-Profil
THEME=hell   npm run brand-assets

THEME=dunkel npm run content-overlays  # Zitate/Studien mit Overlay-Zone
THEME=dunkel npm run story-overlays     # Story-Overlays
THEME=dunkel npm run story-carousels    # Story-Carousels

node docs/marketing/social-banners.mjs  # YT/FB/IG/LinkedIn/WhatsApp-Banner (immer nur Gold)
node docs/marketing/video-thumbnails.mjs # YouTube-Thumbnails
npm run carousels:png                    # Instagram-Carousels → docs/carousels/export/
```

> Die Banner-Generatoren (`social-banners.mjs`) erzeugen ausschließlich Gold
> (`dunkel` + `hell`) — dort gibt es kein Türkis.

---

## Zusammenfassung

- **Gold ist bereits das Standard-Theme** der Website und aller Grafiken (Dateien ohne Suffix).
- Für jeden Kanal existiert die Gold-Version parallel zur Türkis-Variante — **du musst nichts neu bauen**, um Gold zu posten: einfach die Datei **ohne `-tuerkis`** nehmen.
- **Dunkel/Gold** (ohne Suffix) für den klassischen Look, **`-hell`** wenn ein heller Creme-Hintergrund besser passt.
- Komplette Dateiliste: `docs/marketing/gold-grafiken-manifest.txt`.
