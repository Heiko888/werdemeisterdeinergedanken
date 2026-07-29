---
description: Kompletter Website-Check durch das Prüf-Team (inkl. Mitgliederbereich)
---

Führe einen vollständigen Prüfdurchlauf der Website durch. Nutze das Prüf-Team – starte die fünf Spezial-Agenten **parallel** (in einer Nachricht), damit sie gleichzeitig arbeiten:

1. **mitglieder-waechter** – Zugriffsschutz des Mitgliederbereichs (wichtigster Prüfer).
2. **seiten-pruefer** – technischer Rundgang: Build, Links, Routen, Metadaten.
3. **sicherheits-pruefer** – API-Routen, Secrets, Eingabevalidierung, Supabase/RLS.
4. **barrierefreiheit-pruefer** – a11y, Tastatur, Kontrast, mobile Darstellung.
5. **inhalts-pruefer** – Vollständigkeit von Stufen, Praxis, Vertiefungen, Blog, PDFs, Rechtstexten.

Wenn `$ARGUMENTS` einen Schwerpunkt nennt (z. B. „nur Mitgliederbereich" oder „nur Sicherheit"), starte nur die passenden Agenten.

Wenn alle Agenten fertig sind:
- Fasse die Ergebnisse in **einem** priorisierten Bericht auf Deutsch zusammen.
- Sortiere streng nach Schweregrad: zuerst alle 🔴 kritischen Funde (mit Datei:Zeile und konkreter Empfehlung), dann 🟠 mittel, dann 🟡 niedrig.
- Entferne Doppelungen, wenn mehrere Agenten dasselbe finden.
- Schreibe den vollständigen Bericht nach `docs/audit/seiten-check-<datum>.md` (Datum im Format JJJJ-MM-TT) und nenne am Ende die 3 wichtigsten nächsten Schritte.

Ändere in diesem Durchlauf **keinen** Produktivcode – dies ist ein reiner Prüflauf. Umsetzungen erst nach Rücksprache.
