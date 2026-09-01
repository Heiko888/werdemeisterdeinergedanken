# Facebook-Redaktionsplan – Woche 7 · Stufe 7 · Meisterschaft

**Block A – Die 7 Stufen** · Frequenz-Stufe: **fokussiert (3 Posts/Woche)**

Quellen (verifiziert): `src/lib/reels.ts` (Serie „stufen", Thema „Meisterschaft",
Skript `docs/skripte/reels/stufen.md`, Abschnitt „07 · Meisterschaft"),
`src/lib/blog.ts` (`wie-frei-ist-unser-geist` → real unter
`/blog/wie-frei-ist-unser-geist`, `src/app/blog/[slug]/page.tsx`),
`src/lib/deep-dives.ts` (`integration-und-weitergabe`), `src/lib/practices.ts`
(`box-breathing`), `content/pdf/stufe-7-lektion.pdf`, `docs/marketing/zitate/1x1/`.

Bild-Assets: **Creme-Variante (`-hell.png`) ist Standard**, wo eine Zitat-/Studienkarte
genutzt wird.

⚠ Hinweis aus dem Themen-Backlog: Für Stufe 7 ist der Blog-Slug thematisch
„naheliegend" (Gedankenfreiheit allgemein statt wörtlich „Meisterschaft"), aber real
vorhanden und inhaltlich passend – geprüft in `src/lib/blog.ts`.

| Tag | Uhrzeit | Format | Inhalt/Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel (Crosspost) | Crosspost des IG-Reels zu Stufe 7, Variante A („Vom Reagieren zum Gestalten"). Hook: „Ich dachte, irgendwann wackelt nichts mehr. Das war ein Irrtum." Kontext-Text darunter: Meisterschaft ist kein Punkt, an dem man fertig ist, und ganz sicher kein Zustand ohne Sturm. Auf den Stufen davor wurde gelernt: innehalten, hinschauen, loslassen, neu wählen – irgendwann wird daraus keine Übung mehr, sondern einfach eine Haltung. Zwischen dem, was passiert, und dem, was man tut, liegt ein Raum, die Reiz-Reaktions-Lücke – am Anfang muss man ihn suchen, irgendwann wohnt man da. | Reel-Serie „stufen", Thema „Meisterschaft", Variante A – `src/lib/reels.ts`; Skript `docs/skripte/reels/stufen.md` (Abschnitt „07 · Meisterschaft — Variante A") | Mehr zu Stufe 7 in der Lektion: `/mitglieder/stufe/7` |
| Mittwoch | 08:00 | 📝 Beitrag | Blog-Anriss: Der menschliche Geist erzeugt unaufhörlich Gedanken – bis zu 60.000 pro Tag, viele davon unbewusst und automatisiert. In einer Welt voller Einflüsse, von sozialen Medien bis zu subtilen gesellschaftlichen Normen, stellt sich die Frage: Wie viel Kontrolle hat man wirklich über die eigenen Gedanken? Selbstkontrolle ist ein Ausdruck von Freiheit, Manipulation zielt darauf, genau diese Freiheit einzuschränken. Kurzer Teaser der vier Wege zu mehr mentaler Freiheit, dann Link zum vollständigen Artikel. | Blog-Slug `wie-frei-ist-unser-geist` → `/blog/wie-frei-ist-unser-geist` (`src/lib/blog.ts`) | Ganzen Artikel lesen: `/blog/wie-frei-ist-unser-geist` |
| Freitag | 18:00 | 💬 Zitat/Studie + Community-Frage | Zitat-Karte zum Thema „Meisterschaft als tägliche Rückkehr" als Diskussionsanstoß, dazu Kontext: Niemand ist für immer Meister – auch nach der siebten Stufe werfen einen Tage aus der Bahn. Der Unterschied zu früher ist nicht, dass keine Stürme mehr kommen, sondern wie schnell man zurückfindet: früher Wochen, dann Tage, irgendwann nur noch Minuten. Aus bewusster Technik wird mit genug Wiederholung eine Haltung, die von selbst greift – ein Zuhause, kein Ziel. Community-Frage: „Woran erkennst du bei dir am schnellsten, dass du gerade aus deiner Mitte gefallen bist – und was bringt dich am zuverlässigsten zurück?" | Zitat-Karte `docs/marketing/zitate/1x1/WMDG-Zitat-04-hell.png` (Creme-Variante); inhaltlicher Bezug: Deep-Dive `integration-und-weitergabe` (`src/lib/deep-dives.ts`) und Praxis `box-breathing` (`src/lib/practices.ts`) | Kommentiere deine Antwort · Mini-Übung zum Ausprobieren: Praxis „Box Breathing" (in der Mitgliedschaft), Einstieg über `/#ebook` |

## Hinweise
- Frequenz exakt eingehalten: 3 Posts (Reel-Crosspost, Blog-Beitrag, Zitat + Community-Frage).
- Reel-Crosspost greift dasselbe Kernthema wie der IG-Reel-Tag der Woche (Stufe 7 ·
  Meisterschaft, Variante A) auf – kein separates Thema.
- Rhythmus wie vorgegeben: Reel früh in der Woche (Montag, früher Abend), Blog-Link
  Mitte der Woche (Mittwoch, 08:00 vormittags), Community-Frage + Zitat zum
  Wochenausklang (Freitag, früher Abend).
- Diskussion sichergestellt: der Freitagspost endet mit einer offenen Frage an die
  Community statt einer reinen CTA.
- Keine dedizierte 🎯 Pitch-Position, da diese Woche kein Pitch-/Funnel-Slot vorgesehen
  ist (fokussierte Stufe = 3 Posts); die Lektion `/mitglieder/stufe/7` und `/#ebook`
  laufen als weiche CTA im Reel- bzw. Community-Post mit. Da Woche 7 gleichzeitig die
  letzte Stufen-Woche in Block A ist, kann in Woche 8 (Übergang zu Block B) ein
  zusätzlicher Programm-Pitch (`/mitglieder`) sinnvoll sein – hier bewusst nicht
  vorgezogen, um die Frequenz „fokussiert" nicht zu überschreiten.
- Blog-Slug gegen `src/lib/blog.ts` geprüft (Zeile mit `slug: "wie-frei-ist-unser-geist"`,
  vorhanden). Blog-Pfad ist real `/blog/<slug>` (`src/app/blog/[slug]/page.tsx`), nicht
  `/wissen/blog/…`.
- Praxis-Abweichung geprüft: `box-breathing` trägt in `src/lib/practices.ts` das Feld
  `relatedStage: 6`, wird von der Themen-Backlog-Tabelle aber Woche 7 zugeordnet. Der
  Slug selbst existiert und passt inhaltlich zu „Fokus und Ruhe unter Druck" auch für
  Stufe 7 (Meisterschaft) – hier wie vom Koordinator vorgegeben übernommen, zur
  Kenntnisnahme aber vermerkt.
- Der Zitat-Karten-Ordner (`docs/marketing/zitate/1x1/`) enthält keine Themen-Zuordnung
  je Nummer – bitte den tatsächlichen Kartentext vor dem Einstellen gegen das Thema
  „Meisterschaft/tägliche Rückkehr" prüfen und ggf. eine passendere Nummer wählen.
