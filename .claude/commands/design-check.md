---
description: Design-Review der Website durch das Design-Team (Komponenten, Layout, Bild, Marke)
---

Führe eine vollständige **Designprüfung** der Website durch – rein visuell/gestalterisch. Ziel: sehen, wo das Design noch „stumpf" oder flach wirkt, ob Aufbau und Bilder sitzen, und **konkrete Verbesserungsvorschläge** liefern. Nutze das Design-Team – starte die vier Spezial-Agenten **parallel** (in einer Nachricht):

1. **komponenten-designer** – Buttons, Karten, Links, Formular-Controls; Zustände & Micro-Interactions (der „wirkt stumpf"-Verdacht).
2. **layout-architekt** – Aufbau, Hierarchie, Abstände/Rhythmus, Ausrichtung, Weißraum, Responsive-Komposition.
3. **bild-kurator** – Bilder: Passung, Ausschnitt/Crop, Seitenverhältnis, Qualität, einheitliche Bildsprache.
4. **marken-hueter** – Farb-, Typo- und Token-Konsistenz, Gold-Akzent-Dosierung, Markenwirkung.

Wenn `$ARGUMENTS` einen Schwerpunkt nennt (z. B. „nur Buttons", „nur Startseite", „nur Bilder", „nur Marke"), starte nur die passenden Agenten bzw. gib den Fokus an alle weiter.

Wenn alle Agenten fertig sind:
- Fasse die Ergebnisse in **einem** Bericht auf Deutsch zusammen.
- Beginne mit einem **Gesamteindruck** (2–4 Sätze) und **Quick Wins** (3–5 Vorschläge mit größter Wirkung bei kleinstem Aufwand).
- Danach die Funde streng nach Schweregrad: zuerst 🔴 (stört die Wirkung deutlich), dann 🟠 (merklich), dann 🟡 (Feinschliff). Pro Fund: Bereich/Datei:Zeile, Beobachtung und **konkreter Vorschlag mit Token/Wert**.
- Entferne Doppelungen, wenn mehrere Agenten dasselbe finden.
- Schreibe den vollständigen Bericht nach `docs/design/design-check-<datum>.md` (Datum im Format JJJJ-MM-TT) und nenne am Ende die 3 wichtigsten nächsten Schritte.

Bleib im bestehenden Design-System (Tokens aus `src/app/globals.css`) – schlage neue Werte als Ergänzung vor, keine Stilbrüche. Ändere in diesem Durchlauf **keinen** Produktivcode – dies ist ein reiner Design-Review. Umsetzungen erst nach Rücksprache.
