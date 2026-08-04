# Vorlagen & Website lokal installieren

Diese Anleitung zeigt Schritt für Schritt, wie du das komplette Projekt auf
deinem eigenen Rechner (Windows oder Mac) betreibst – **inklusive der
Funktionen, um die Vorlagen selbst neu zu erzeugen** (Reel-Cover, Carousels,
PDFs). Diese Bau-Funktionen waren ursprünglich für die Server-Umgebung
eingerichtet; mit dieser Anleitung laufen sie auch lokal.

Es gibt **zwei Ebenen**:

| Ebene | Was du brauchst |
| --- | --- |
| **A. Vorlagen ansehen & herunterladen** (Website + Galerie) | nur Node.js |
| **B. Vorlagen NEU erzeugen** (Bilder & PDFs bauen) | zusätzlich Playwright/Chromium – und für PDFs Python 3 |

---

## Ebene A – Website & Galerie lokal betreiben

### 1. Node.js installieren (einmalig)

Node.js ist das Programm, das den Website-Code und die Skripte ausführt.

1. Öffne <https://nodejs.org>
2. Lade die **LTS-Version** herunter (empfohlen: Node 20 oder neuer)
3. Installiere sie mit den Standard-Einstellungen

**Prüfen:** Terminal öffnen (Windows: „PowerShell" · Mac: „Terminal") und
tippen:

```bash
node -v
```

Erscheint eine Version wie `v20.x.x`, ist alles bereit.

### 2. In den Projektordner wechseln

```bash
cd Pfad/zu/werdemeisterdeinergedanken
```

Tipp: Du kannst den Ordner meist ins Terminal ziehen, dann steht der Pfad da.

### 3. Abhängigkeiten installieren (einmalig)

```bash
npm install
```

Beim ersten Mal dauert es ein paar Minuten.

### 4. Website starten

```bash
npm run dev
```

Im Browser öffnen: <http://localhost:3000> ·
Vorlagen-Galerie: <http://localhost:3000/admin/vorlagen>
(Beenden mit `Strg + C` bzw. `Ctrl + C`.)

### 5. Login für die Admin-Seite

Die Galerie ist durch einen Login geschützt. Damit sie lokal funktioniert:

1. Kopiere `.env.local.example` und nenne die Kopie `.env.local`
2. Trage darin ein (Werte aus Supabase → *Project Settings → API*):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. `npm run dev` neu starten, unter <http://localhost:3000/login> mit deiner
   Admin-E-Mail anmelden (`heiko.schwaninger@gmail.com` ist bereits als Admin
   hinterlegt).

Ohne `.env.local` zeigt die Seite nur „Noch nicht verbunden" – die fertigen
Vorlagen-Dateien liegen aber trotzdem im Projekt.

---

## Ebene B – Vorlagen selbst neu erzeugen

Die fertigen Vorlagen sind bereits im Projekt. Wenn du sie **neu bauen**
willst, brauchst du zusätzlich einen Browser (Chromium) zum Rendern – und für
die PDFs außerdem Python.

### 6. Chromium für Playwright installieren (einmalig)

Nach `npm install` (Schritt 3) einmal ausführen:

```bash
npx playwright install chromium
```

Das lädt einen Browser herunter, mit dem die Bilder und PDFs pixelgenau
gerendert werden. Die Skripte finden dieses Chromium anschließend automatisch.

> Alternativ nutzen die Skripte ein bereits installiertes Google Chrome /
> Chromium aus dem System. Du kannst den Pfad auch fest vorgeben, z. B.:
> `CHROME_BIN="/Pfad/zu/chrome" npm run covers:png`

### 7. Für die PDFs zusätzlich: Python 3

Nur nötig für `npm run pdf`. Prüfen mit `python3 --version`. Falls nicht
vorhanden, von <https://www.python.org/downloads/> installieren.

### 8. Vorlagen bauen

| Befehl | Was es macht | Browser? | Python? |
| --- | --- | :---: | :---: |
| `npm run covers` | Reel-Cover als HTML bauen | – | – |
| `npm run covers:png` | Reel-Cover als PNG exportieren | ✓ | – |
| `npm run carousels:slides` | Carousel-Folien als HTML bauen | – | – |
| `npm run carousels:png` | Carousel-Folien als PNG exportieren | ✓ | – |
| `npm run pdf` | Alle PDF-Dokumente erzeugen | ✓ | ✓ |
| `npm run vorlagen:galerie` | Galerie auf `/admin/vorlagen` aktualisieren | – | – |

**Typischer Ablauf:** zuerst bauen/exportieren (z. B. `npm run covers:png`),
danach `npm run vorlagen:galerie`, damit die neuen Dateien in der Galerie
erscheinen.

### 9. Eigene Hintergrundbilder (optional)

Einige Cover-/Carousel-Vorlagen können ein Hintergrundbild `vorlage.png`
verwenden. Diese Bilder sind **bewusst nicht im Projekt gespeichert**
(`.gitignore`). Ohne sie wird automatisch der Marken-Farbverlauf gerendert –
das Bauen funktioniert also auch ohne. Möchtest du einen echten Foto-
Hintergrund, lege eine `vorlage.png` in den jeweiligen Format-Ordner unter
`docs/reels/covers/<bereich>/<format>/` bzw. das passende Carousel-Verzeichnis,
bevor du den PNG-Export startest.

---

## Kurzfassung

```bash
# Einmalig einrichten:
# 1. Node.js von nodejs.org installieren (LTS)
npm install
npx playwright install chromium     # nur für Ebene B (Vorlagen bauen)

# Website lokal:
npm run dev                          # http://localhost:3000

# Vorlagen neu bauen (nach Bedarf):
npm run covers:png
npm run carousels:png
npm run pdf                          # braucht zusätzlich Python 3
npm run vorlagen:galerie
```
