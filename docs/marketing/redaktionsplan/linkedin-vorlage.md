# LinkedIn-Vorlage · Werde Meister deiner Gedanken

> Wiederverwendbares Gerüst für LinkedIn-Posts im Marken-Ton (sachlich, wertig,
> These zuerst). Platzhalter in `[…]` ersetzen. Regeln unten beachten.

---

## A) Text-Vorlage (Copy-Paste-Gerüst)

```
[HOOK – eine konkrete Frage oder steile These, allein in Zeile 1]

[Ein-Satz-Antwort oder Zuspitzung.]

[Szene 1 – kurze, konkrete Alltagsbeobachtung.]
[Szene 2 – konkrete Alltagsbeobachtung.]
[Szene 3 – konkrete Alltagsbeobachtung.]

[Die Mechanik: der (neuro-)psychologische Grund dahinter – 2–3 Sätze,
z. B. „Bis zu 60.000 Gedanken am Tag … dein Gehirn spart Energie …".]

[Überleitung: „Drei Muster / Wege / Punkte laufen fast überall mit:"]

→ [Fett-Lead] – [eine Zeile Erklärung.]
→ [Fett-Lead] – [eine Zeile Erklärung.]
→ [Fett-Lead] – [eine Zeile Erklärung.]

[Wende / Kernsatz: „Der erste Schritt ist nicht … Sondern …".]

[Mikro-Übung / konkreter nächster Schritt – niedrigschwellig, z. B. 2-Minuten-Check.]

[Merksatz, der hängen bleibt.]

[Community-Frage – lädt zum Kommentieren ein.]

—
[Soft-CTA: kostenloses E-Book / Vertiefung → Link in den ersten Kommentar.]

#[Tag1] #[Tag2] #[Tag3] #[Tag4] #[Tag5]
```

## B) Formate (visuell, Serie `autopilot-meeting` als Muster)

Folien-Rollen im Generator `docs/carousels/marketing-serien.mjs`:

| Slot | Rolle | Zweck |
|------|-------|-------|
| 1 | `cover` | Hook + Unterzeile |
| 2 | `list` | 2–3 konkrete Szenen (Lead – Text) |
| 3 | `stat` | eine große Zahl + Erklärung |
| 4 | `recap` | 3 nummerierte Muster/Wege + Abschlusssatz |
| 5 | `remedy` | die Übung + Merksatz (kursiv) |
| 6 | `cta` | Community-Frage + Button/E-Book |

Weitere Rollen: `compare` (zwei Karten gut/schlecht), `step` (nummerierter Schritt), `setup` (Eyebrow+Titel+Text).
Formate: `feed-4x5` (1080×1350, Standard LinkedIn-Dokument), `feed-1x1`, `reel-9x16`.
Designwelten: `hell` (Creme/Gold, Standard), `dunkel` (Navy/Gold), `tuerkis`, `tuerkis-hell`.

## C) Regeln (immer)

- **Hook** allein in Zeile 1 – LinkedIn zeigt in der Timeline nur die erste Zeile.
- **Links** in den ersten Kommentar, nicht in den Post-Text (schützt Reichweite).
- **These zuerst**, kein Klickbait ohne Substanz.
- **Carousel = Dokument-Post** (PDF aus den 4:5-Folien) → höchste Verweildauer.
- **Ton:** sachlich, wertig; „du"-Ansprache; kein Boulevard.
- **Quelle belegen:** jeder Post erdet auf echtem Content (Blog / Praxis / Vertiefung / E-Book).
- **Frequenz „fokussiert":** Di–Do, beste DACH-Zeiten (ca. 07:30 / 08:15 / 07:45).

---

*Beispiel-Umsetzung dieser Vorlage: `woche-1/linkedin-posts.md` (3 Posts) + Carousel-Serie `autopilot-meeting`.*
