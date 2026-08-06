# Workshop-Materialien

Gebrandete Vorlagen für Präsentationen und Workshops rund um „Werde Meister
deiner Gedanken". Jedes Thema enthält drei Bausteine:

- **Präsentation** (`.pptx`) – editierbar, mit Sprecher-Notizen auf jeder Folie
- **Teilnehmer-Workbook** (`.pdf`, A4) – zum Ausdrucken, mit Reflexionsfragen
  und Schreibfeldern
- **Moderations-/Ablaufplan** (`.pdf`, A4) – Drehbuch für die Leitung: Zeitplan,
  Ablauf, Material-Checkliste, Moderations-Tipps

## Universelle Vorlage

- **`WMDG-Praesentationsvorlage.pptx`** – leere, gebrandete Folien-Layouts
  (Titel, Kapiteltrenner, Agenda, Inhalt + Kennzahl, Aufzählung, nummerierter
  Punkt, Übung, Zitat, Abschluss). Platzhalter in `[Klammern]` überschreiben.
  Basis für jede eigene Präsentation.

## Themen

| Ordner | Thema | Fokus |
|---|---|---|
| `7-stufen/` | Die 7 Stufen der Bewusstseinsentwicklung | Der Kern-Weg vom Autopilot zur Meisterschaft |
| `mentale-selbstverteidigung/` | Mentale Selbstverteidigung (Ganztags) | Alle 16 Mechanismen, mit denen Denken gelenkt wird |
| `praxis/` | Der Praxis-Werkzeugkasten (Ganztags) | Alle 13 Übungen: Atem, Meditation und Rituale |
| `vertiefungen/` | Deinen Kopf verstehen (Ganztags) | Alle 13 Bausteine: die Mechanismen hinter den Gedanken |
| `wissensdatenbank/` | Dein Gehirn verstehen (Ganztags) | Die Wissensreise: 27 Kapitel in 10 Modulen |
| `bewusstseinstest/` | Wo stehst du gerade? (Halbtags) | Bewusstseinstest & Gedankenprofil – die 7 Stufen als Selbsteinschätzung |
| `blog/` | Deinen Kopf durchdenken (Ganztags) | Kuratierte Themenreihe aus Blog & Deep-Dives |
| `journal/` | Die Kraft der Reflexion (Halbtags) | Journal & Impulse: Schreiben als Praxis |

## Aufbau der Präsentationen

Jeder Foliensatz folgt demselben Bogen: Titel → Agenda → Kernbotschaft →
Ausgangspunkt (mit Kennzahl) → Übung 1 → Kapitel → Themen-Überblick →
Themen-Folien → Übung 2 → Zusammenfassung → Angebot → Abschluss.

- **7 Stufen** – Halbtag, ~18 Folien, 7 Stufen
- **Mentale Selbstverteidigung** – Ganztag, 28 Folien, 16 Mechanismen
- **Praxis-Werkzeugkasten** – Ganztag, 25 Folien, 13 Übungen
- **Deinen Kopf verstehen** – Ganztag, 25 Folien, 13 Bausteine
- **Dein Gehirn verstehen** (Wissensdatenbank) – Ganztag, 21 Folien, 10 Module
- **Wo stehst du gerade?** (Bewusstseinstest) – Halbtag, 18 Folien, 7 Stufen
- **Deinen Kopf durchdenken** (Blog & Deep-Dives) – Ganztag, 22 Folien, 11 Themen
- **Die Kraft der Reflexion** (Journal & Impulse) – Halbtag, 18 Folien, 7 Bausteine

## Neue Themen erzeugen

Die vier Themen oben (Wissensdatenbank, Bewusstseinstest, Blog, Journal) werden
aus JSON-Content-Specs generiert:

```
python3 tools/workshop/build.py tools/workshop/specs/<thema>.json
```

Der Generator (`tools/workshop/build.py`) erzeugt je Spec die drei Bausteine
(PPTX + Workbook-PDF + Moderationsplan-PDF), legt sie unter `docs/workshop/<slug>/`
ab und spiegelt sie nach `content/vorlagen/workshop/` (Admin-Galerie). Design,
Marke und Folien-Bogen sind fest im Generator hinterlegt. Die Specs liegen in
`tools/workshop/specs/` und lassen sich zum Feinschliff direkt bearbeiten.

> Hinweis: `npm run vorlagen:galerie` würde die Galerie zwar neu aufbauen,
> löscht dabei aber Reels/Carousels, deren Quelldateien nicht im Repo liegen.
> Neue Workshop-Dateien daher wie oben generieren; der Katalogeintrag in
> `src/lib/vorlagen-assets.ts` ist bereits ergänzt.

## Marke

- Farben: Navy `#08102a`, Leaf `#8cc63f`, Teal `#21b2bd`, Akzent-Grün `#4f9e1c`
- Schrift: Überschrift **Cambria** (PPTX) bzw. **Fraunces** (PDF), Text
  **Calibri** (PPTX) bzw. **Inter** (PDF)
- Motiv: nummerierte Kreise (Leaf→Teal-Verlauf), Gehirn-Logo

## Hinweise

- **Schriften in PowerPoint:** Cambria/Calibri sind auf jedem Office-Rechner
  vorhanden. Wer die Markenschriften Fraunces/Inter installiert hat, kann sie
  per „Schriftarten ersetzen" umstellen.
- **Preis:** Auf der Angebots-Folie steht `49 €/Monat` als Platzhalter – vor dem
  Einsatz an das echte Modell anpassen.
