# Facebook-Redaktionsplan – Woche 18 · Block C – Mentale Selbstverteidigung · Propaganda

**Block C – Mentale Selbstverteidigung** · Frequenz-Stufe: **fokussiert (3 Posts/Woche)**

Quellen (verifiziert): `src/lib/reels.ts` (Serie „selbstverteidigung", Thema
„Propaganda", Hook „Ohne eine einzige Lüge"), Skript
`docs/skripte/reels/mentale-selbstverteidigung.md` (Abschnitt „1 · Propaganda"),
`src/lib/blog.ts` (`propaganda-erkennst-du-nicht-an-lauten-parolen` → real unter
`/blog/propaganda-erkennst-du-nicht-an-lauten-parolen`,
`src/app/blog/[slug]/page.tsx`), `src/lib/deep-dives.ts` (`propaganda`, real unter
`/mitglieder/wissen/propaganda`, `src/app/mitglieder/wissen/[slug]/page.tsx`),
`docs/marketing/zitate/1x1/`.

Bild-Assets: **Creme-Variante (`-hell.png`) ist Standard**, wo eine Zitat-/Studienkarte
genutzt wird.

| Tag | Uhrzeit | Format | Inhalt/Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel (Crosspost) | Crosspost des IG-Reels zur Serie „Mentale Selbstverteidigung", Thema „Propaganda". Hook: „Ohne eine einzige Lüge." Kontext-Text darunter: Man stellt sich Propaganda gern plump vor – laute Parolen, offensichtliche Lügen. Doch die wirksamste Beeinflussung ist leise: Sie sagt nicht, was man denken soll, sondern sorgt dafür, dass sich eine bestimmte Sicht mit der Zeit einfach richtig anfühlt, über Wiederholung, Emotion und Vereinfachung – ganz ohne eine einzige Lüge. | Reel-Serie „selbstverteidigung", Thema „Propaganda" – `src/lib/reels.ts`; Skript `docs/skripte/reels/mentale-selbstverteidigung.md` (Abschnitt „1 · Propaganda") | Mehr zum Thema in der Vertiefung: `/mitglieder/wissen/propaganda` |
| Mittwoch | 08:00 | 📝 Beitrag | Blog-Anriss: Fast immer wirken drei Hebel zusammen – Wiederholung macht eine Aussage vertraut, Emotion schaltet das ruhige Prüfen aus, und Vereinfachung reduziert ein vielschichtiges Thema auf Gut gegen Böse. Das Bemerkenswerte dabei: Keiner dieser Hebel braucht eine einzige Lüge, man kann mit wahren Einzelfakten allein durch Auswahl und Betonung ein völlig verzerrtes Bild erzeugen. Kurzer Teaser, dann Link zum vollständigen Artikel inklusive der Fragen, mit denen man den eigenen Schutz stärkt. | Blog-Slug `propaganda-erkennst-du-nicht-an-lauten-parolen` → `/blog/propaganda-erkennst-du-nicht-an-lauten-parolen` (`src/lib/blog.ts`) | Ganzen Artikel lesen: `/blog/propaganda-erkennst-du-nicht-an-lauten-parolen` |
| Freitag | 18:00 | 💬 Zitat/Studie + Community-Frage | Zitat-Karte zum Thema „Nichts bindet eine Gruppe so schnell wie ein gemeinsamer Gegner" als Diskussionsanstoß, dazu Kontext: Ein Feindbild liefert eine einfache Ordnung – hier die Guten, dort die Anderen – und wer dazugehören will, übernimmt oft die Sicht der Gruppe, ohne sie je geprüft zu haben; deshalb verteidigen Menschen mit Inbrunst Behauptungen, die sie nie überprüft haben, weil das eigene Selbstbild daran hängt. Community-Frage: „Welche Überzeugung hast du übernommen, ohne sie je wirklich geprüft zu haben – und traust du dich, sie jetzt einmal zu hinterfragen?" | Zitat-Karte `docs/marketing/zitate/1x1/WMDG-Zitat-12-hell.png` (Creme-Variante); inhaltlicher Bezug: Deep-Dive `propaganda` (`src/lib/deep-dives.ts`) | Kommentiere deine Antwort · Mehr zum Thema in der Vertiefung „Propaganda & Konditionierung" (Mitgliedschaft), Einstieg über `/#ebook` |

## Hinweise
- Frequenz exakt eingehalten: 3 Posts (Reel-Crosspost, Blog-Beitrag, Zitat + Community-Frage).
- Reel-Crosspost greift dasselbe Kernthema wie der IG-Reel-Tag der Woche (Serie
  „Mentale Selbstverteidigung" · Propaganda) auf – kein separates Thema.
- Rhythmus wie vorgegeben: Reel früh in der Woche (Montag, früher Abend), Blog-Link
  Mitte der Woche (Mittwoch, 08:00 vormittags), Community-Frage + Zitat zum
  Wochenausklang (Freitag, früher Abend).
- Diskussion sichergestellt: der Freitagspost endet mit einer offenen Frage an die
  Community statt einer reinen CTA.
- Keine dedizierte 🎯 Pitch-Position, da diese Woche kein Pitch-/Funnel-Slot vorgesehen
  ist (fokussierte Stufe = 3 Posts); `/mitglieder/wissen/propaganda` und `/#ebook`
  laufen als weiche CTA im Reel- bzw. Community-Post mit. Da Woche 18 gleichzeitig die
  letzte Woche in Block C ist, kann in der Folgewoche (Übergang zum nächsten Block) ein
  zusätzlicher Programm-Pitch (`/mitglieder`) sinnvoll sein – hier bewusst nicht
  vorgezogen, um die Frequenz „fokussiert" nicht zu überschreiten.
- Blog-Slug gegen `src/lib/blog.ts` geprüft (Zeile mit
  `slug: "propaganda-erkennst-du-nicht-an-lauten-parolen"`, vorhanden). Blog-Pfad ist
  real `/blog/<slug>` (`src/app/blog/[slug]/page.tsx`).
- Deep-Dive-Slug `propaganda` gegen `src/lib/deep-dives.ts` geprüft, Route real
  vorhanden unter `src/app/mitglieder/wissen/[slug]/page.tsx`. Kein `sources`-Feld mit
  zitierten Studien vorhanden – deshalb bewusst eine klassische Zitat-Karte
  (`docs/marketing/zitate/1x1/`) statt einer Studien-Karte gewählt.
- Der Zitat-Karten-Ordner (`docs/marketing/zitate/1x1/`) enthält keine Themen-Zuordnung
  je Nummer – bitte den tatsächlichen Kartentext vor dem Einstellen gegen das Thema
  „Propaganda/Konditionierung" prüfen und ggf. eine passendere Nummer wählen.
- `src/lib/practices.ts` wurde für diese Woche bewusst nicht referenziert – der
  Koordinator hat für Block C nur Reel-Serie, Blog und Deep-Dives als Quellen
  vorgegeben.
