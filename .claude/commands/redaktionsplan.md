---
description: Erstellt/aktualisiert den kanalübergreifenden Redaktionsplan durch das Redaktions-Team
---

Erstelle den Redaktionsplan für Instagram, Facebook, LinkedIn und YouTube –
**ein Wochenthema, alle Kanäle gleichzeitig**. Nutze das **Redaktions-Team**.

Ablauf (der **redaktions-planer** koordiniert):

1. **Thema & Umfang bestimmen** aus `$ARGUMENTS`:
   - Thema, z. B. „Thema Propaganda" – sonst nimmt der Koordinator das nächste
     offene aus `docs/marketing/redaktionsplan/themen-backlog.md`.
   - Anzahl Wochen, z. B. „4 Wochen" (Standard: 1 Woche).
   - Frequenz-Stufe: „fokussiert" (Standard) · „aktiv" · „maximal".
   - Optional Kanal-Fokus, z. B. „nur Instagram".
2. **themen-stratege** erstellt/aktualisiert den Themen-Backlog und die
   Material-Map je Thema (echte Slugs/Pfade).
3. **Kanal-Planer parallel** (in einer Nachricht) zum selben Thema + Frequenz:
   **instagram-planer**, **facebook-planer**, **linkedin-planer**, **youtube-planer**
   → je `docs/marketing/redaktionsplan/<kanal>.md`.
4. **redaktions-planer** führt zusammen:
   - Master-Tagesplan → `docs/marketing/redaktionsplan.md`
   - Kalender (nur `DAYS`-Daten + Thema-Banner) → `docs/marketing/redaktionsplan-kalender.html`

Regeln: ein Thema pro Woche über alle Kanäle; nur vorhandenes Projekt-Material
verwenden (Slugs/Pfade am Code belegen, nichts erfinden); gewählte Frequenz exakt
einhalten; **kein** App-/Generator-/Content-Code wird geändert – es wird nur nach
`docs/marketing/` geplant und dokumentiert.
