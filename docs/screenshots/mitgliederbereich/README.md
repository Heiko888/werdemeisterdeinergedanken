# Screenshots – Mitgliederbereich

Vollständige Bildschirmaufnahmen aller Seiten des Mitgliederbereichs
(`/mitglieder`) – zur Verwendung für Instagram, Website-Vorschau und Marketing
(„Was bietet der Mitgliederbereich?").

**Stand:** 2026-09-04
**Erzeugt mit:** `node tools/screenshots/mitglieder-screens.mjs`
(gegen den lokalen Dev-Server; ohne Supabase-Zugangsdaten ist der Bereich
lokal frei einsehbar).

## Varianten

| Ordner            | Auflösung            | Verwendung                          |
| ----------------- | -------------------- | ----------------------------------- |
| `.` (Desktop)     | 1440 px breit, @2x   | Website-Sektion, Vorschaubilder     |
| `.` `*-hero.png`  | sichtbarer Ausschnitt| saubere Kacheln fürs Social         |
| `.` `*-full.png`  | komplette Seite      | zeigt den gesamten Inhalt           |
| `mobil/`          | 390 px (Handy), @2x  | Instagram, Stories (Hochformat)     |

## Seiten

| Datei                         | Seite                        | Pfad                                    |
| ----------------------------- | ---------------------------- | --------------------------------------- |
| `01-dashboard`                | Mein Bereich (Dashboard)     | `/mitglieder`                           |
| `02-programm`                 | Programm                     | `/mitglieder/programm`                  |
| `03-stufe-1`                  | Stufe 1 (Beispiel-Stufe)     | `/mitglieder/stufe/1`                   |
| `04-praxis-uebersicht`        | Praxis – Übersicht           | `/mitglieder/praxis`                    |
| `05-praxis-detail`            | Praxis – Einzelübung         | `/mitglieder/praxis/atembeobachtung`    |
| `06-wissen-uebersicht`        | Wissen / Vertiefungen        | `/mitglieder/wissen`                    |
| `07-wissen-detail`            | Wissen – Einzelartikel       | `/mitglieder/wissen/automatische-gedanken` |
| `08-wissensdatenbank`         | Wissensdatenbank – Übersicht | `/mitglieder/wissensdatenbank`          |
| `09-wissensdatenbank-detail`  | Wissensdatenbank – Kapitel   | `/mitglieder/wissensdatenbank/01-neuroanatomie-aufbau-des-gehirns` |
| `10-journal`                  | Journal                      | `/mitglieder/journal`                   |
| `11-detektor`                 | Manipulations-Detektor       | `/mitglieder/detektor`                  |
| `12-gedankenprofil`           | Gedankenprofil               | `/mitglieder/gedankenprofil`            |
| `13-begleiter`                | Begleiter (KI)               | `/mitglieder/begleiter`                 |
| `14-rueckkehr`                | Rückkehr                     | `/mitglieder/rueckkehr`                 |
| `15-einstellungen`            | Einstellungen                | `/mitglieder/einstellungen`             |

## Hinweise

- **Detektor** und **Begleiter** zeigen einen „gerade nicht verfügbar"-Hinweis,
  weil die KI-Anbindung (Anthropic-API-Key) in der Aufnahme-Umgebung nicht
  gesetzt war. Die erklärenden Kopfbereiche sind trotzdem vollständig sichtbar.
- Die Fortschritts-/Serien-Anzeigen stehen auf 0 %, weil kein eingeloggter
  Nutzer mit echten Daten verbunden war (leerer Beispielzustand).

## Neu erzeugen

```bash
npm install
npm run dev            # Dev-Server auf http://localhost:3000
node tools/screenshots/mitglieder-screens.mjs
```
