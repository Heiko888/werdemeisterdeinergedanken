# ZFU / FernUSG – Einschätzung für „Werde Meister deiner Gedanken"

> **Kein Rechtsrat.** Diese Notiz ordnet das Angebot anhand des Codes und des
> Leistungsumfangs ein. Die verbindliche Entscheidung trifft die ZFU
> (kostenlose Ersteinschätzung über [zfu.de](https://www.zfu.de)) bzw. eine auf
> FernUSG/E-Learning spezialisierte anwaltliche Prüfung.
>
> Stand: 2026-08-27

## Worum es geht

Die **ZFU** (Staatliche Zentralstelle für Fernunterricht) lässt „Fernunterricht"
nach dem **FernUSG** (Fernunterrichtsschutzgesetz) zu. Wird ein
zulassungspflichtiges Angebot **ohne Zulassung** verkauft, ist der Vertrag nach
**§ 7 FernUSG nichtig** (Kund\*innen können Gezahltes zurückfordern) und es
drohen **Bußgelder**. Deshalb muss vor dem Livegang des kostenpflichtigen
Mitgliederbereichs geklärt sein, ob eine Zulassung nötig ist.

## Die Voraussetzungen (§ 1 Abs. 1 FernUSG)

Eine ZFU-Zulassung ist nötig, wenn **alle** Merkmale erfüllt sind:

| # | Voraussetzung | Trifft auf dieses Projekt zu? |
|---|---|---|
| 1 | Vertragliche Grundlage | ✅ ja – Mitgliedschaft/Abo |
| 2 | Entgeltlich | ✅ ja – 49 €/Monat, 490 €/Jahr (`src/app/mitgliedschaft/page.tsx`) |
| 3 | Vermittlung von Kenntnissen/Fähigkeiten | ✅ ja – 7 Stufen, Videos, Vertiefungen, Praxis, Wissensdatenbank |
| 4 | Überwiegend räumliche Trennung Lehrender/Lernender | ✅ ja – reines Online-Angebot |
| 5 | **Überwachung des Lernerfolgs** durch Anbieter oder Beauftragten | ⚠️ **der entscheidende Punkt** |

Merkmale 1–4 sind klar erfüllt. **Ob eine Zulassung nötig ist, hängt allein an
Merkmal 5 – der Lernerfolgskontrolle.**

## Der kritische Punkt: Lernerfolgskontrolle

Die Rechtsprechung (u. a. OLG Celle, 2023, zu Online-Coachings – seither auf
viele Online-Programme übertragen) legt „Überwachung des Lernerfolgs" **weit**
aus. Es genügt bereits:

- die **vertragliche Möglichkeit**, dem Anbieter Fragen zu stellen und
  **individuelles Feedback** zu erhalten (Chat, Community, Calls) – eine
  tatsächliche Kontrolle im Einzelfall ist nicht erforderlich;
- **Tests/Aufgaben mit Rückmeldung** oder eine begleitete Fortschrittskontrolle.

## Die drei relevanten Stellen im Code

| Stelle | Datei | Risiko für Merkmal 5 |
|---|---|---|
| **KI-Begleiter** – kennt die Inhalte und den Stand in den 7 Stufen, antwortet individuell | `src/app/mitglieder/begleiter/page.tsx`, `.../begleiter/actions.ts`, `.../begleiter/antwort/route.ts` | 🔴 **hoch** – dialogisches, personalisiertes Eingehen auf den Lernstand kann als Lernerfolgskontrolle gelten. Ob **rein KI-basiertes** Feedback (ohne Menschen) rechtlich ausreicht, ist noch nicht höchstrichterlich geklärt → reales, aber unsicheres Risiko. |
| **Bewusstseinstest + Wachstumskurve** – „sieh deine Entwicklung über die Zeit" | `src/components/sections/ConsciousnessTest.tsx`, `src/components/members/TestCurve.tsx`, `src/app/mitglieder/journal/page.tsx` | 🟡 **mittel** – reine **Selbsttests ohne Auswertung durch den Anbieter** gelten i. d. R. *nicht* als Lernerfolgskontrolle. Sobald daraus eine begleitete/kommentierte Fortschrittsbewertung wird, kippt die Einordnung. |
| **Journal / Arbeitshefte** – Selbstreflexion ohne Rückmeldung | `src/app/mitglieder/journal/`, `src/app/mitglieder/arbeitsheft/` | 🟢 **kein** Merkmal 5, solange keine individuelle Rückmeldung dazukommt. |

## Fazit

- **Reines Selbstlern-Angebot** (Videos, Vertiefungen, Praxis, Journal,
  Selbsttest **ohne** individuelle Rückmeldung) → **keine ZFU-Zulassung nötig**,
  weil Merkmal 5 fehlt.
- **Sobald es individuelle Rückmeldung/Begleitung zum Lernstand gibt** – und der
  **KI-Begleiter geht genau in diese Richtung** – ist das Angebot mit hoher
  Wahrscheinlichkeit **zulassungspflichtiger Fernunterricht**.

## Handlungsoptionen (vor dem Livegang)

1. **Richtung festlegen:**
   - **Unter der Schwelle bleiben:** KI-Begleiter/Feedback so gestalten, dass er
     reine Wissens-/Navigationshilfe ist und **nicht** den individuellen
     Lernstand bewertet oder begleitet; Test klar als Selbsteinschätzung
     kennzeichnen. → keine Zulassung nötig.
   - **Begleitung als Feature behalten** (der KI-Begleiter ist ein
     Verkaufsargument): von einer **ZFU-Zulassung ausgehen** und diese **vor dem
     Verkauf** einholen.
2. **Kostenlose Ersteinschätzung der ZFU** einholen: das konkrete Konzept an
   [zfu.de](https://www.zfu.de) schicken.
3. Für den KI-Begleiter-Fall (rechtlicher Graubereich) **anwaltliche Prüfung**
   durch auf FernUSG/E-Learning spezialisierte Kanzlei.

## Checkliste vor dem Livegang

- [ ] Entscheidung getroffen: „unter der Schwelle" **oder** „mit ZFU-Zulassung"
- [ ] KI-Begleiter-Verhalten entsprechend konfiguriert (System-Prompt in
      `src/lib/begleiter.ts` / `begleiter/antwort/route.ts` geprüft)
- [ ] Bewusstseinstest/Kurve klar als Selbsteinschätzung kommuniziert
- [ ] Ersteinschätzung der ZFU eingeholt
- [ ] Ggf. anwaltliche Prüfung erfolgt
- [ ] Ergebnis in AGB/Vertrag und Impressum berücksichtigt
