# Produktabgrenzung der Mitgliedschaft

> **Hinweis zum Charakter dieser Datei:** Diese Datei ist eine Produkt- und
> Entwicklungsleitlinie, keine Aussage darüber, welche gesetzlichen Vorschriften
> im Einzelfall anwendbar sind. Sie beschreibt, wie das Produkt tatsächlich
> funktioniert und wie es nach außen beschrieben werden soll – beides muss
> übereinstimmen. Rechtliche Einordnungen gehören nicht als Disclaimer auf die
> Website („kein Fernunterricht“, „nicht ZFU-pflichtig“ o. Ä. werden bewusst
> **nicht** verwendet).

Stand: 2026-10-03 · Bezug: `docs/AENDERUNGEN.md`, Eintrag vom selben Tag.

---

## Was die Mitgliedschaft ist

„Werde Meister deiner Gedanken“ ist eine **digitale Mitgliederplattform** zur
eigenverantwortlichen Selbstreflexion, Bewusstseinsentwicklung und persönlichen
Orientierung. Mitglieder nutzen die Plattform **eigenständig, in ihrem Tempo**.

| Erlaubt / Bestandteil | Hinweis |
|---|---|
| Videos, Texte, Audios | selbstständig abrufbar |
| Praxisimpulse (Atem, Meditationen, Rituale) | zum Selbermachen |
| Freiwillige Reflexionsübungen | ohne Pflicht, ohne Auswertung durch Dritte |
| Journal | bleibt privat beim Nutzer (RLS, nur eigene Zeilen) |
| Fortschrittshäkchen (Stufen, Übungen, Programmtage) | dienen **nur der persönlichen Orientierung** |
| Bewusstseinstest | **Selbsteinschätzung**, keine Diagnostik |

## Was die Mitgliedschaft nicht ist

- **Keine menschliche individuelle Online-Betreuung** innerhalb der
  Mitgliedschaft.
- **Keine Korrektur oder Bewertung** von Reflexionsantworten.
- **Keine Prüfungen.**
- **Keine Lernzielkontrolle.**
- **Keine Zertifizierung** aufgrund von Leistung.
- **Keine medizinische oder psychotherapeutische Behandlung.**
- **Keine Heilversprechen.**

## Einzelregeln

### Fortschritt

Die technische Logik (`completed`, `in_progress`, Stufen- und Übungs-Häkchen,
Programmtage, Journal) bleibt vollständig erhalten. In sichtbaren Texten:

- bevorzugt: „Nutzungsfortschritt“, „Bearbeitungsstand“, „als gemacht
  markiert“, „mit dieser Stufe gearbeitet“
- vermeiden: „Lernfortschritt“, „Lernerfolg“, „bestanden“, „erreicht“ (im Sinne
  eines Leistungsnachweises)

### Bewusstseinstest

- Das Ergebnis beruht **ausschließlich auf den eigenen Antworten** der Person.
- Es ist eine **persönliche Selbsteinschätzung / Standortbestimmung**.
- **Keine psychologische Diagnostik**, **kein Leistungs- oder Wissenstest**.
- Formulierungen subjektbezogen: „Schwerpunkt deiner aktuellen
  Selbsteinschätzung“, „Bereiche, die du dir näher ansehen könntest“, „deine
  Standortübersicht“, „Orientierung aus deinen Antworten“ – statt „du bist …“,
  „Hauptstufe“, „hier besteht Bedarf“, „Bedarfsanalyse“.
- Die Punkteberechnung (`src/lib/consciousness-test.ts`) bleibt unverändert;
  interne Bezeichner wie `bedarf` in `src/lib/gedankenprofil.ts` dürfen bleiben,
  solange sie nicht sichtbar sind.

### KI-Funktionen

Die KI darf **nicht prüfen, benoten oder richtig/falsch bewerten** – auch keine
Aussage über „bestanden“ oder erreichte Lernziele. Sie spiegelt und strukturiert
nur, was die Person selbst eingebracht hat.

Ausführliche Leitlinie, Prüfbericht und Ampel je Funktion:
**`docs/ZFU-KI-PRUEFUNG.md`** (Stand 2026-10-05). Die gemeinsame Promptregel
`KI_ZFU_GRENZEN` liegt in `src/lib/ki-grenzen.ts` und wird von Begleiter,
Reading und Muster-Spiegel genutzt; Tests in `src/lib/ki-grenzen.test.ts`.
Ampel: Detektor GRÜN · Muster-Spiegel GRÜN · Reading GRÜN · Begleiter GELB.
Die vier Funktionen gelten als eigenständige **„WMDG KI-Werkzeuge“** neben der
Plattform (Stufen, Wissen, Praxis, Journal); Produktmodell, spätere
Einzelfreischaltung und Datenschutz je Werkzeug: **`docs/KI-PRODUKTMODELL.md`**.

| Funktion | Datei | Status |
|---|---|---|
| KI-Begleiter (Chat) | `src/app/mitglieder/begleiter/` | **aus** – Schalter `KI_BEGLEITER_ENABLED` (Standard `false`) |
| KI-Reading zum Gedankenprofil | `src/app/mitglieder/reading-actions.ts` | **aus** – Schalter `KI_READING_ENABLED` (Standard `false`). Seit 2026-10-05 nur noch Selbsteinschätzung als Eingabe, keine markierten Stufen |
| Muster-Spiegel (Journal) | `src/app/mitglieder/muster-actions.ts` | **aus** (seit 2026-10-05) – Schalter `KI_MUSTER_SPIEGEL_ENABLED` (Standard `false`). Prompt enthält ausdrücklich: keine Prüfung des Verständnisses, keine Bewertung der fachlichen Richtigkeit, kein bestanden/nicht bestanden, keine Aussage über Lernziele, nur Spiegelung und Strukturierung |
| Manipulations-Detektor | `src/app/mitglieder/detektor-actions.ts` | **aus** (seit 2026-10-05) – Schalter `KI_DETEKTOR_ENABLED` (Standard `false`). Sendet bei Nutzung den eingefügten Text an Anthropic |

Die Schalter liegen in `src/lib/ki-features.ts`; nur der exakte Wert `true`
schaltet ein. Solange sie aus sind, gibt es keinen Launcher, keinen Link,
keinen Button, keine tote Seite (`/mitglieder/begleiter` und
`/mitglieder/detektor` leiten ins Dashboard um) und keine Fehlermeldung an
Mitglieder. Auch direkte Aufrufe der Server-Actions bzw. der Begleiter-Route
übertragen nichts. **Solange alle vier aus sind, gehen keine Nutzereingaben an
Anthropic.** Code und gespeicherte Ergebnisse bleiben vollständig erhalten.

Vor dem Einschalten einer Funktion:
1. diese Datei und `docs/DATENSCHUTZ-TODO.md` prüfen,
2. Datenschutzerklärung Punkt 14 um Anbieter, Daten, Rechtsgrundlage und
   Drittlandbezug ergänzen – nur mit den tatsächlich geltenden
   Anthropic-Vertragsunterlagen,
3. erst dann den Schalter auf `true` setzen.

Hinweis Begleiter: Wird er eingeschaltet, nimmt er auch gespeicherte
Spiegeltexte und Detektor-Ergebnisse als Kontext mit – Punkt 14 muss das dann
ebenfalls nennen.

### Analytics und Bewusstseinstest

An Google Analytics geht beim Test nur die Tatsache „Test abgeschlossen“
(`test_complete` ohne Parameter) bzw. „Lead aus dem Test“ (nur
`source: "bewusstseinstest"`). Keine Stufe, keine Punkte, keine Antworten, kein
Mitgliedsstatus. An Meta geht `test_complete` überhaupt nicht – Meta erhält nur
die in `META_EVENT` (`src/lib/analytics.ts`) zugeordneten Standard-Ereignisse.

### Support

Technische und organisatorische Supportanfragen (Login, Zugang, Zahlung,
Kündigung, Fehler) laufen über das Kontaktformular bzw. E-Mail und sind von
den Inhalten der Mitgliedschaft getrennt. Sie sind keine inhaltliche
Betreuung. Themenvorschläge für neue Inhalte sind ebenfalls willkommen.

### Über-mich-Seite und Rolle von Heiko

`src/app/ueber-mich/page.tsx` erzählt Heikos tatsächlichen Weg – persönlich und
unverwässert. Botschaft: „Das ist meine Geschichte. Daraus ist Werde Meister
deiner Gedanken entstanden.“ Nicht: „Ich betreue, berate oder coache dich
persönlich innerhalb dieses digitalen Angebots.“

- Primäre Positionierung: **Gründer von Werde Meister deiner Gedanken**.
- Keine Rollenbezeichnung als Coach, persönlicher Begleiter, Therapeut, Berater
  oder „Begleiter für mentale Entprogrammierung“ im Zusammenhang mit dem
  digitalen Produkt. „Mentale Entprogrammierung“ darf als Thema vorkommen,
  nicht als Berufsbezeichnung.
- Keine erfundenen Abschlüsse oder Qualifikationen; Ausbildungen erklären nur,
  woher Wissen stammt – ausdrücklich keine heilkundliche Qualifikation.
- Kein Überkorrigieren: „Dieser Gedanke hat mich begleitet“ ist unproblematisch.
  Geändert wird nur, was eine geschuldete persönliche Betreuung suggeriert.
- Feste Chronologie (Stand 2026-10-05): Lenas Tod → rund zwei Jahre Vollgas →
  etwa drei Jahre nach ihrem Tod die Implosion → Reset/Neuaufbau → erst danach
  Programmierung, Docker, Server, KI. Das Coaching ist eines, das Heiko selbst
  erhalten hat – kein Angebot. Keine privaten Familien- oder Geldgeschichten.
- Die Werte (`values` in `src/lib/content.ts`) erscheinen auf `/ueber-mich` und
  auf der Startseite (`WhyMe.tsx`) und folgen derselben Regel.

### Persönliche 1:1-Leistungen

Offline angebotene persönliche 1:1-Leistungen sind ein **separates Angebot**
und **nicht Bestandteil der Mitgliedschaft**. Sie werden derzeit nicht
öffentlich auf der Website angeboten:

- Kein Mitgliedschafts-, Test-, Newsletter-, Blog- oder Verkaufsweg verweist auf
  „Erstgespräch“, „Klarheitsgespräch“ oder ähnliche 1:1-Angebote.
- `/klarheitsgespraech` (Vorab-Fragebogen, `noindex`, nicht in der Sitemap)
  bleibt als direkt geteilter Link bestehen, ebenso das Admin-Cockpit
  `/admin/erstgespraeche` und `src/lib/erstgespraech/`. Beides ist intern.
- Der Kontakt bleibt neutral möglich (Header-Button „Kontakt“, Thema
  „Frage zur Mitgliedschaft“ unter `/kontakt?thema=mitgliedschaft`).

---

## Checkliste für neue Inhalte und Funktionen

- [ ] Beschreibt der Text die Plattform als eigenständig nutzbar?
- [ ] Suggeriert nichts eine persönliche Betreuung innerhalb der Mitgliedschaft?
- [ ] Wird nichts geprüft, korrigiert, benotet oder zertifiziert?
- [ ] Sind Häkchen/Fortschritt nur Orientierung für die Person selbst?
- [ ] Ist der Test als Selbsteinschätzung formuliert?
- [ ] Bleibt jede KI-Funktion bei Spiegelung und Strukturierung? (Checkliste in
      `docs/ZFU-KI-PRUEFUNG.md`, Abschnitt 6)
- [ ] Verspricht kein Text inhaltliche Fragen/Antworten an Heiko (Support nur
      technisch/organisatorisch, Vertiefungen: „Thema vorschlagen“)?
- [ ] Kein Heilversprechen, keine Therapie-Anmutung?
