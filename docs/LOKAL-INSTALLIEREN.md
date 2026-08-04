# Vorlagen & Website lokal installieren

Diese Anleitung zeigt in einfachen Schritten, wie du das komplette Projekt –
inklusive der Vorlagen-Bibliothek unter `/admin/vorlagen` – auf deinem eigenen
Rechner (Windows oder Mac) betreibst. Es liegt **nichts** „nur auf dem Server":
Alle Vorlagen-Dateien und alle Bau-Funktionen sind Teil dieses Projekts.

Für die reinen Vorlagen-Funktionen brauchst du **nur Node.js**. Für die
geschützte Admin-Ansicht selbst zusätzlich die Supabase-Zugangsdaten
(siehe Abschnitt 5).

---

## 1. Node.js installieren (einmalig)

Node.js ist das Programm, das den Website-Code und die Vorlagen-Skripte
ausführt.

1. Öffne <https://nodejs.org>
2. Lade die **LTS-Version** herunter (empfohlen: Node 20 oder neuer)
3. Installiere sie mit den Standard-Einstellungen (immer „Weiter" klicken)

**Prüfen, ob es geklappt hat:** Öffne ein Terminal
(Windows: „Eingabeaufforderung" oder „PowerShell" · Mac: „Terminal") und tippe:

```bash
node -v
```

Wenn eine Versionsnummer wie `v20.x.x` erscheint, ist alles bereit.

---

## 2. Projekt öffnen

Wechsle im Terminal in den Projektordner (dahin, wo diese Datei liegt),
zum Beispiel:

```bash
cd Pfad/zu/werdemeisterdeinergedanken
```

Tipp: Du kannst den Ordner auch bei den meisten Systemen ins Terminal-Fenster
ziehen, dann wird der Pfad automatisch eingefügt.

---

## 3. Abhängigkeiten installieren (einmalig pro Rechner)

```bash
npm install
```

Das lädt alle benötigten Bausteine herunter. Beim ersten Mal dauert es ein paar
Minuten – danach ist es erledigt.

---

## 4. Website lokal starten

```bash
npm run dev
```

Danach im Browser öffnen: <http://localhost:3000>

Die Vorlagen-Seite erreichst du unter:
<http://localhost:3000/admin/vorlagen>

Zum Beenden im Terminal `Strg + C` (Mac: `Ctrl + C`) drücken.

---

## 5. Login für die Admin-Seite (nur für `/admin/vorlagen`)

Die Galerie-Seite ist durch einen Login geschützt. Damit sie lokal wie auf dem
Server funktioniert, brauchst du eine kleine Konfigurationsdatei:

1. Kopiere die Vorlage `.env.local.example` und nenne die Kopie `.env.local`
2. Trage darin mindestens ein:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

   (Beide Werte findest du im Supabase-Dashboard unter
   *Project Settings → API*.)
3. `npm run dev` neu starten und unter
   <http://localhost:3000/login> mit deiner Admin-E-Mail anmelden.
   Deine Adresse `heiko.schwaninger@gmail.com` ist bereits als Admin
   hinterlegt.

**Ohne diese Datei** zeigt die Seite nur den Hinweis „Noch nicht verbunden" –
die Vorlagen-Dateien und die Bau-Befehle (Abschnitt 6) funktionieren aber
trotzdem.

---

## 6. Vorlagen neu erzeugen (die „Funktionen")

Diese Befehle laufen komplett auf deinem Rechner, **ganz ohne Server und ohne
Login**. Jeder Befehl kommt in ein Terminal im Projektordner:

| Befehl | Was es macht |
| --- | --- |
| `npm run pdf` | Erzeugt die gestalteten PDF-Dokumente |
| `npm run covers` | Baut die Reel-Cover (Titelbilder) |
| `npm run carousels:slides` | Baut die Carousel-Folien |
| `npm run vorlagen:galerie` | Aktualisiert die Galerie auf `/admin/vorlagen` |

Weitere Befehle stehen in der `package.json` unter `"scripts"`.

**Ablauf:** Zuerst die einzelnen Vorlagen bauen (z. B. `npm run covers`),
danach `npm run vorlagen:galerie`, damit die neuen Dateien in der Galerie
auftauchen.

---

## Kurzfassung

```bash
# einmalig:
# 1. Node.js von nodejs.org installieren
npm install

# jedes Mal:
npm run dev            # Website lokal: http://localhost:3000

# Vorlagen bauen (nach Bedarf):
npm run pdf
npm run covers
npm run carousels:slides
npm run vorlagen:galerie
```
