---
description: Aktualisiert die Generator-Dokumentation durch das Generator-Team
---

Bringe die Generator-Dokumentation unter `docs/generatoren/` auf den aktuellen
Stand. Nutze das **Generator-Team** – starte die vier Dokumentar-Agenten
**parallel** (in einer Nachricht), damit sie gleichzeitig arbeiten:

1. **pdf-dokumentar** – PDF-Generatoren (`tools/pdf/`) → `docs/generatoren/pdf-generatoren.md`.
2. **visual-dokumentar** – Carousels, Reels-Cover, Marketing, Vorlagen-Galerie
   → `docs/generatoren/visual-generatoren.md` und `marketing-und-galerie.md`.
3. **workshop-dokumentar** – Workshop-Generator + Spec-Format
   → `docs/generatoren/workshop-generator.md`.
4. **content-inventar** – vollständiges Inhalts-Inventar
   → `docs/generatoren/content-inventar.md`.

Wenn `$ARGUMENTS` einen Schwerpunkt nennt (z. B. „nur PDF" oder „nur Inventar"),
starte nur die passenden Agenten.

Wenn alle fertig sind, lass den **generator-architekt** die Übersicht
`docs/generatoren/README.md` aktualisieren: Generator-Tabelle, das Mermaid-
Diagramm „Quelle → Generator → Ausgabe" und das Umgebungs-/Reproduzierbarkeits-
Kapitel. Er gleicht jeden dokumentierten Aufruf gegen `package.json` ab und
markiert offene Punkte als „⚠ zu klären".

Jeder Fakt muss am Code belegt sein – keine Vermutungen. Die Agenten schreiben
ausschließlich nach `docs/generatoren/`; **kein** Generator- oder App-Code wird
in diesem Durchlauf verändert.
