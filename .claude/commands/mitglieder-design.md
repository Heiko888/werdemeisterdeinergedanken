---
description: UX/UI-Review des Mitgliederbereichs durch das Mitglieder-UX-Team (Reise, Navigation, Motivation, Interface, Lücken)
---

Führe ein **UX/UI-Review des geschützten Mitgliederbereichs** (`/mitglieder/*`) durch. Leitfrage: *„Wenn ich gerade bezahlt hätte – fühlt sich das wie mein persönliches Entwicklungs-Zuhause an, und was fehlt noch?"* Nutze das Mitglieder-UX-Team – starte die fünf Spezialisten **parallel** (in einer Nachricht):

1. **nutzerreise-designer** – Kauf → erster Login → erste Woche → Wiederkehr → Abschluss; Onboarding, Leerzustände, „Was als Nächstes?".
2. **navigations-architekt** – Struktur, `MemberNav`, Benennung, Auffindbarkeit, Suche, Querverbindungen, Sackgassen.
3. **motivations-designer** – Fortschritt, Gewohnheit, Rituale, Meilensteine, Personalisierung, Beziehung zu Heiko.
4. **mitglieder-ui-designer** – Dashboard-Komposition, Karten, Formulare, Chat, Zustände, mobile Darstellung.
5. **luecken-scout** – „Was fehlt?": Abgleich mit dem, was hochwertige Lern-/Achtsamkeits-Plattformen bieten.

Wenn `$ARGUMENTS` einen Schwerpunkt nennt (z. B. „nur Dashboard", „nur mobil", „nur Lücken"), starte nur die passenden Agenten bzw. gib den Fokus an alle weiter.

Alle Agenten lesen vorab `docs/audit/mitgliederbereich-ux-audit-2026-08-26.md` und die neueren Einträge in `docs/AENDERUNGEN.md` – Erledigtes wird nicht erneut gemeldet.

Wenn alle fertig sind, führe die Ergebnisse wie der **mitglieder-ux-lead** zusammen:
- **Gesamteindruck** + direkte Antwort auf **„Was fehlt?"** (3–5 Punkte).
- **Status Alt-Audit** (✅/⏳), **Quick Wins**, Funde nach 🔴/🟠/🟡 mit Datei:Zeile und konkretem Vorschlag.
- **Fehlende Bausteine** mit Nutzen, Aufwand (S/M/L) und vorhandener Vorarbeit.
- **Roadmap** in 3 Wellen.
- Schreibe den Bericht nach `docs/design/mitglieder/mitglieder-ux-<datum>.md` (JJJJ-MM-TT), trage ihn in `docs/AENDERUNGEN.md` ein und nenne die 3 wichtigsten nächsten Schritte.

Ändere in diesem Durchlauf **keinen** Produktivcode – reines Review. Umsetzungen erst nach Rücksprache.
