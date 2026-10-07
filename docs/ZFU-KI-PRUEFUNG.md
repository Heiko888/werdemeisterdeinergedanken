# ZFU-KI-Prüfung – Leitlinie und Prüfbericht

> **Interne Produkt- und Entwicklungsleitlinie.** Keine Rechtsberatung und keine
> Aussage darüber, welche Vorschriften im Einzelfall gelten. Sie beschreibt, wie
> die KI-Funktionen tatsächlich arbeiten und wo die Grenze zur individuellen
> Lernerfolgskontrolle verläuft. Ergänzt `docs/RECHTLICHE-PRODUKTABGRENZUNG.md`.
> Auf der Website erscheinen keine Disclaimer wie „kein Fernunterricht“.

Stand: 2026-10-05 · Bezug: `docs/AENDERUNGEN.md`, Eintrag vom selben Tag.
Alle vier KI-Schalter stehen weiterhin auf **aus** (siehe Abschnitt 8).

---

## 1. Grundprinzip

Die WMDG-Mitgliedschaft ist eine digitale Plattform zur eigenständigen Nutzung.

Die KI-Funktionen dienen **Reflexion, Orientierung, Navigation, Strukturierung
und allgemeiner Information**. Sie dienen **nicht** der individuellen Kontrolle
des Lernerfolgs.

**KI darf:** Informationen strukturieren · bestehende Inhalte zusammenfassen ·
allgemeine Begriffe erläutern · auf vorhandene Inhalte verweisen · persönliche
Aussagen spiegeln · Reflexionsfragen anbieten · Perspektiven sichtbar machen ·
freiwillige Möglichkeiten zur weiteren Beschäftigung nennen.

**KI darf nicht:** Wissen oder Verständnis prüfen · kontrollieren, ob Inhalte
richtig verstanden wurden · Antworten mit einer Soll-Lösung vergleichen ·
beurteilen, ob etwas richtig angewendet wurde · Lernziele überprüfen · einen
Lernstand feststellen · Fortschritt fachlich bewerten · Aufgaben korrigieren ·
benoten · bestanden/nicht bestanden vergeben · Zertifizierungscharakter
erzeugen · bestätigen, dass jemand eine vermittelte Fähigkeit „beherrscht“.

## 2. Rote Linie

> Keine KI-Funktion darf feststellen oder bewerten, ob ein Nutzer vermittelte
> Inhalte richtig verstanden, richtig angewendet oder erfolgreich gelernt hat.

Technisch verankert in **`KI_ZFU_GRENZEN`** (`src/lib/ki-grenzen.ts`) – wortgleich
in den Prompts von Begleiter, Reading und Muster-Spiegel. Eine Änderung dort
wirkt auf alle drei.

## 3. Reflexion vs. Lernkontrolle

| Erlaubt | Nicht erlaubt |
|---|---|
| „Was erkennst du davon in deinem Alltag?“ | „Erkläre mir das Konzept, damit ich prüfen kann, ob du es verstanden hast.“ |
| „In deinen Notizen taucht das Thema Kontrolle mehrfach auf.“ | „Du hast die Lektion über Kontrolle noch nicht verstanden.“ |
| „Hier findest du den Abschnitt über kognitive Dissonanz.“ | „Deine Antwort zeigt, dass du kognitive Dissonanz jetzt beherrschst.“ |
| „Du hast Stufe 2 bereits als bearbeitet markiert.“ | „Du hast Stufe 2 erfolgreich abgeschlossen.“ / „Du bist bereit für Stufe 3.“ |
| „Deine Selbsteinschätzung zeigt einen stärkeren Schwerpunkt bei …“ | „Hier hast du Nachholbedarf.“ / „Hier bist du fortgeschritten.“ |
| „Du beschreibst wiederholt …“ | „Du setzt inzwischen erfolgreich … um.“ |
| „Was löst dieser Gedanke bei dir aus?“ | „Nenne mir drei Punkte aus diesem Kapitel.“ |

Faustregel: **Reflexion über eigene Erfahrung = erlaubt. Kontrolle des
vermittelten Wissens = vermeiden.**

## 4. Technische Guardrails (`src/lib/ki-grenzen.ts`)

| Baustein | Zweck | Genutzt von |
|---|---|---|
| `KI_ZFU_GRENZEN` | gemeinsame rote Linie | Begleiter, Reading, Muster-Spiegel |
| `BEGLEITER_KEINE_LERNKONTROLLE` | Umgang mit Bewertungswünschen, Quiz-Verbot, Nutzung von Profil/Journal/Nutzungsdaten | Begleiter |
| `selbsteinschaetzungFacts()` | Testwerte **ohne** markierte Stufen, ohne „verankert/Bedarf“ | Begleiter, Reading |
| `bearbeitungsstandFacts()` | markierte Stufen, ausdrücklich nur Navigation | Begleiter |
| `behaviorFacts()` | Nutzungsdaten neutral („als erledigt markiert“) | Begleiter |
| `readingSystemPrompt()` / `musterSystemPrompt()` | vollständige Prompts | Reading / Muster-Spiegel |

Die Datei hat keine Laufzeit-Importe und ist deshalb in `npm test` prüfbar
(`src/lib/ki-grenzen.test.ts`, seit 2026-10-07 13 Tests, keine Anthropic-Aufrufe). Der Detektor
hat eine eigene, auf ihn zugeschnittene Zeile im Prompt (analysiert den fremden
Text, nicht die Person).

### Erwartetes Verhalten bei kritischen Anfragen (Begleiter)

| Anfrage | Systemvorgabe |
|---|---|
| „Habe ich Stufe 3 richtig verstanden?“ | keine Bewertung; Inhalt von Stufe 3 allgemein erklären, Reflexionsfrage anbieten |
| „Prüfe, ob meine Antwort stimmt.“ | keine Korrektur, kein Abgleich; Gedanken aus der Plattform erläutern, Perspektive anbieten |
| „Bin ich bereit für die nächste Stufe?“ | keine Freigabe-Aussage; die Person entscheidet selbst; Inhalt der nächsten Stufe beschreiben |
| „Bewerte bitte, ob ich das Konzept richtig angewendet habe.“ | keine Anwendungskontrolle; Konzept erklären, Reflexionsfrage zur eigenen Erfahrung |
| „Teste mein Wissen zu Stufe 4.“ | kein Quiz; Stufe 4 zusammenfassen, auf Inhalte verweisen |

Der kurze Hinweis („Ich bewerte nicht, ob du das richtig verstanden hast …“)
kommt **nur** bei solchen ausdrücklichen Bewertungswünschen – nicht als
Disclaimer bei normalen Fragen. Alle fünf Anfragen stehen wörtlich im Prompt und
werden in `ki-grenzen.test.ts` abgeprüft.

---

## 5. Prüfbericht

### 5.1 KI-Inventar

Alle produktiven Anthropic-Aufrufe (`new Anthropic(`) im Repository:

| Funktion | Einstieg | KI-Aufruf | Schalter |
|---|---|---|---|
| KI-Begleiter | `src/app/mitglieder/begleiter/page.tsx`, `BegleiterChat.tsx`, `BegleiterLauncher.tsx` | `src/app/mitglieder/begleiter/antwort/route.ts` (Stream), Prompt `src/lib/begleiter-prompt.ts` | `KI_BEGLEITER_ENABLED` |
| KI-Reading | `ReadingPanel.tsx` auf `/mitglieder/gedankenprofil` | `src/app/mitglieder/reading-actions.ts` | `KI_READING_ENABLED` |
| Muster-Spiegel | `MusterSpiegelPanel.tsx` auf `/mitglieder/journal` | `src/app/mitglieder/muster-actions.ts` | `KI_MUSTER_SPIEGEL_ENABLED` |
| Manipulations-Detektor | `/mitglieder/detektor`, `DetektorPanel.tsx` | `src/app/mitglieder/detektor-actions.ts` | `KI_DETEKTOR_ENABLED` |

`src/lib/ki-modell.ts` enthält nur Modellwahl und Ausweichlogik, keine eigene
Funktion. Keine weiteren KI-Aufrufe in `src/`, `tools/` oder `supabase/`
(Supabase-Funktionen, Seeds und Migrationen enthalten nur die Tabellen
`gedanken_readings`, `begleiter_messages`, `muster_spiegel`, `detektor_checks`).
Die Wortsuche (verstanden, richtig, falsch, prüfen, Fortschritt, Aufgabe …)
traf außerhalb dieser Dateien nur Fachinhalte (Vertiefungen, Blog, Bibliothek),
interne Dokumentation oder Code-Kommentare – keine Nutzerfunktion.

### 5.2 Aktuelle Funktion und Ampel

#### KI-Begleiter – **GELB** (nach Patch: Guardrails vorhanden)

- **Eingaben:** freie Nachricht (max. 2 000 Zeichen), Verlauf (24 Nachrichten),
  Name, Selbsteinschätzung aus dem Test, als bearbeitet markierte Stufen
  (nur Navigation), Journal-Ausschnitte (8 × 180 Zeichen), Nutzungsdaten
  (Rückkehr, Programmtage; Detektor-Funde und letzter Spiegel nur bei
  eingeschaltetem Werkzeug), Inhaltsverzeichnis. Seit 2026-10-07 nicht mehr:
  Praxis-Zähler und Reading-Auszug (Begründung: `docs/KI-PRODUKTMODELL.md`,
  Abschnitt 4).
- **Antwort:** freier Text, 120–200 Wörter, mit Verweisen auf echte Pfade.
- **Prüft Nutzerwissen?** Nein – per Prompt ausdrücklich ausgeschlossen, Quiz
  verboten.
- **Bewertet Leistung?** Nein – keine Aussage über Lernstand, Lernziele,
  „beherrscht“, „bereit“.
- **Soll-Lösungs-Vergleich?** Nein – ausdrücklich ausgeschlossen.
- **Anwendungskontrolle?** Nein – ausdrücklich ausgeschlossen.
- **Freischaltungen/Abschluss?** Nein. Die Antwort wird nur gespeichert und
  angezeigt; sie ändert keinen Status.
- **Warum trotzdem GELB:** Als freier Dialog kann ein Sprachmodell bei
  hartnäckigen Nutzereingaben von Prompt-Regeln abweichen. Strukturell ist er
  nicht auf Kontrolle ausgerichtet, aber das Restrisiko liegt in der Natur
  eines offenen Chats. Gegenmaßnahmen: Prompt-Regeln mit Beispielen, Hinweis
  auf der Seite, keine Häkchen-Daten in der Selbsteinschätzung.

#### KI-Reading – **GRÜN** (vorher GELB)

- **Eingaben:** nur noch die eigenen Testantworten (Prozent je Stufe,
  Schwerpunkt). Markierte Stufen (`getCompletedStages()`) gehen **nicht mehr**
  ein – sie hatten keinen Mehrwert für eine Reflexion der Selbsteinschätzung,
  aber erzeugten Lernstand-Anmutung („abgeschlossen“, „Bedarf“).
- **Antwort:** ein Text (200–300 Wörter), nur auf Klick.
- **Prüft Wissen / bewertet Leistung / Soll-Vergleich / Anwendungskontrolle?**
  Nein. Keine Nutzerantwort auf Inhalte wird verarbeitet, nur
  Selbsteinschätzungs-Werte.
- **Freischaltungen?** Nein – nur Anzeige; der Text geht höchstens als Auszug
  in den Begleiter-Kontext.
- Begründung: Eingabe und Prompt sind auf Reflexion der eigenen Angaben
  begrenzt; es gibt keine freie Eingabe, über die eine Prüfung verlangt werden
  könnte.

#### Muster-Spiegel – **GRÜN**

- **Eingaben:** eigene Journaltexte (max. 6 000 Zeichen, mindestens 3 Einträge
  zu 2 Themen) samt zugehöriger Reflexionsfrage als Kontext.
- **Antwort:** ein Text (180–280 Wörter), nur auf Klick.
- **Prüft Wissen?** Nein. Die Journaltexte sind Reflexionen über die eigene
  Erfahrung; der Prompt verbietet Verständnisprüfung und fachliche Bewertung.
- **Bewertet Leistung / Entwicklung?** Nein – jetzt auch ausdrücklich keine
  Aussagen wie „Du hast offensichtlich gelernt …“, „Deine Entwicklung zeigt …“.
- **Soll-Vergleich / Anwendungskontrolle?** Nein – es gibt keine Soll-Lösung.
- **Freischaltungen?** Nein.
- Hinweis: Die Reflexionsfragen werden als Kontext mitgegeben. Weil der Prompt
  jede Bewertung der Antworten untersagt, entsteht daraus keine Korrektur.

#### Manipulations-Detektor – **GRÜN**

- **Eingaben:** ein vom Mitglied eingefügter fremder Text (40–5 000 Zeichen).
- **Antwort:** JSON mit Gesamteindruck und Funden aus fester Taxonomie
  (16 Techniken), serverseitig gegen die Taxonomie gefiltert.
- **Prüft Wissen?** Nein – das Mitglied wird nichts gefragt.
- **Bewertet Fähigkeiten?** Nein – analysiert wird der Text, nicht die Person.
  Neu im Prompt: eigene Vermutungen der Person im Text werden weder bestätigt
  noch korrigiert.
- **Soll-Vergleich?** Nein – es gibt keine Antwort der Person, die verglichen würde.
- **Freischaltungen?** Nein. Der Verlauf ist nur eine Liste für die Person.
- Bewusst nicht weiter umgebaut.

**Ausgangshypothese vs. Ergebnis:** Detektor GRÜN (bestätigt), Muster-Spiegel
GRÜN (oberes Ende der Hypothese), Reading **GRÜN statt GELB** – weil nach dem
Patch keine Bearbeitungsdaten mehr eingehen und es keine freie Eingabe gibt –,
Begleiter GELB (bestätigt, höchste Priorität).

### 5.3 Gefundene problematische Promptstellen (vor dem Patch)

| Datei | Stelle | Problem |
|---|---|---|
| `src/lib/begleiter-prompt.ts` | Rolle „Einordnen, Vertiefen und Dranbleiben … konkrete nächste Schritte“ | Coach-/Tutor-Anmutung |
| `src/lib/begleiter-prompt.ts` | `profileFacts`: „verankert“, „abgeschlossen“, „Größter Bedarf“ | Lernstand aus Testwerten + Häkchen ableitbar |
| `src/lib/begleiter-prompt.ts` | `behaviorFacts`: „abgeschlossen (durch!)“, Überschrift „MOMENTUM“ | Erfolgs-/Leistungsanmutung |
| `src/lib/begleiter-prompt.ts` | Grenzen nur ein Satz, kein Umgang mit „Habe ich das richtig verstanden?“, kein Quiz-Verbot | Kontrolle bei Nachfrage möglich |
| `src/app/mitglieder/reading-actions.ts` | `getCompletedStages()` → „abgeschlossen“ im Prompt | Lernstand-Anmutung |
| `src/app/mitglieder/reading-actions.ts` | Struktur „was schon trägt / wo es sich lohnt, noch einmal dranzugehen“ | „Nachholbedarf“-Logik |
| `src/app/mitglieder/muster-actions.ts` | kein Verbot von „Du hast gelernt / Deine Entwicklung zeigt“ | Lernerfolgsaussage möglich |
| `src/app/mitglieder/detektor-actions.ts` | – | unkritisch; nur Klarstellung ergänzt |

### 5.4 Gefundene problematische Nutzertexte (vor dem Patch)

| Datei | Text | Problem |
|---|---|---|
| `src/lib/begleiter.ts` | Vorschlag „Wo stehe ich gerade – und was wäre mein nächster Schritt?“ | lädt zur Standbewertung ein |
| `src/lib/begleiter.ts` | Vorschlag „Ich komme seit Wochen nicht weiter. Woran kann das liegen?“ | lädt zur Fortschrittsdiagnose ein |
| `src/lib/begleiter.ts` | Begrüßung „dein Begleiter durch die 7 Stufen“ | Tutor-Anmutung |
| `src/app/mitglieder/begleiter/page.tsx` | „er weiß, wo du in deinem Profil gerade stehst … wenn du nicht weiterkommst“ | suggeriert Standkenntnis/Betreuung |
| `src/app/mitglieder/gedankenprofil/page.tsx` | „Dein Begleiter kennt diese Auswertung … welcher nächste Schritt“ | Auswertungs-/Coach-Anmutung |
| `src/components/members/ReadingPanel.tsx` | „Persönliches Reading … dein Gedankenprofil … Auswertung“ | Funktion nicht als Reflexion beschrieben |
| `src/app/mitglieder/detektor/page.tsx` | „Die KI prüft ihn …“ | unglücklich, aber Text ≠ Person; präzisiert |
| `src/app/mitglieder/wissen/[slug]/page.tsx` | Button „Frage stellen“ unter jeder Vertiefung → /kontakt | suggeriert inhaltliche Fragen an Heiko |
| `src/app/kontakt/page.tsx` | „Fragen zu Inhalten, Zugang oder Start beantworte ich dir gern“ | inhaltliche Betreuung lesbar |

**Nicht gefunden** (öffentlich oder im Mitgliederbereich): „Frag die KI zu den
Lerninhalten“, „prüft dein Verständnis“, „zeigt dir, was du schon gelernt
hast“, „Lernfortschritt“, „Wissenslücken“, „korrigiert deine Antworten“,
„Tutor“, „digitaler Lehrer“, „Lerncoach“. Öffentliche Seiten
(`/mitgliedschaft`, FAQ in `src/lib/content.ts`, Startseite) erwähnen die
KI-Funktionen derzeit gar nicht. Die Datenschutzerklärung (Punkt 14) beschreibt
sie neutral („KI-Gespräch“, „KI-Text zum Gedankenprofil“) – unverändert.

### 5.5 Vorgenommene Änderungen

- **Neu `src/lib/ki-grenzen.ts`:** `KI_ZFU_GRENZEN`,
  `BEGLEITER_KEINE_LERNKONTROLLE`, `selbsteinschaetzungFacts`,
  `bearbeitungsstandFacts`, `behaviorFacts` (verschoben und neutralisiert),
  `readingSystemPrompt`, `musterSystemPrompt`.
- **Begleiter** (`begleiter-prompt.ts`, `antwort/route.ts`): neue Rolle
  („KI-gestützter Reflexions- und Orientierungsdialog“, ausdrücklich kein
  Tutor/Lehrer/Prüfer), gemeinsame Grenze + Begleiter-Regeln, Rückfragen nur
  als Reflexionsfragen. Selbsteinschätzung ohne Häkchen; markierte Stufen
  getrennt als „Bearbeitungsstand (nur Navigation)“ – beibehalten, weil sie für
  Verweise („Du hast Stufe 2 bereits als bearbeitet markiert“) nützlich sind.
  Nutzungsdaten neutral, Überschrift „NUTZUNG (nur Orientierung)“.
- **Reading** (`reading-actions.ts`): kein `getCompletedStages()` mehr, neuer
  Prompt („KI-gestützte Reflexion auf Grundlage der eigenen
  Selbsteinschätzung“, keine objektive Bewertung, verbotene Formulierungen
  benannt, neue Struktur ohne „Nachholbedarf“).
- **Muster-Spiegel** (`muster-actions.ts`): Prompt zentralisiert; Verbot von
  Lernerfolgs-/Entwicklungsaussagen; zulässige Formulierungen benannt.
- **Detektor** (`detektor-actions.ts`): eine Prompt-Regel (analysiert den Text,
  nicht die Person; Vermutungen der Person werden weder bestätigt noch
  korrigiert) und Doku-Kommentar. Sonst unverändert.
- **Nutzertexte:** Begrüßung und Einstiegsvorschläge des Begleiters,
  Begleiter-Seite, Gedankenprofil-Box, Reading-Panel („KI-gestützte
  Reflexion“), Muster-Spiegel-Panel („spiegelt … Themen … keine Bewertung“),
  Detektor-Seite („analysiert … anhand transparenter Kriterien“),
  Vertiefungs-Button „Frage stellen“ → „Thema vorschlagen“, Kontaktseite und
  Kontaktthema „Mitgliedschaft“ ohne „Fragen zu Inhalten“.
- **Tests:** `src/lib/ki-grenzen.test.ts` (9 Tests).
- **Doku:** diese Datei, `docs/RECHTLICHE-PRODUKTABGRENZUNG.md`,
  `docs/KI-BEGLEITER.md`, `docs/AENDERUNGEN.md`.

### 5.6 Support-Abgrenzung

Technischer und organisatorischer Support (Login, Zugang, Zahlung, Kündigung,
Fehler) bleibt über `/kontakt` möglich. Nach dem Patch verspricht kein Text
eine individuelle inhaltliche Betreuung: Stufenseite („Bei technischen oder
organisatorischen Fragen …“), Einstellungen (Kündigung/Fragen zur
Verwaltung), Vertiefungen („Thema vorschlagen“), Kontaktseite („Fragen zur
Mitgliedschaft, zum Zugang oder zum Start“). Nicht gefunden: „Schick mir deine
Antworten“, „Ich schaue mir deine Übungen an“, „Bei Verständnisfragen kannst du
mir jederzeit schreiben“. Eingehende inhaltliche Fragen werden nicht technisch
blockiert – sie sind nur keine vertragliche Leistung.

### 5.7 Keine automatische Freischaltung nach Leistung

Geprüft: Kein KI-Ergebnis wird für Freischaltung, Sperrung, Stufenabschluss,
Level oder Zertifikate verwendet. Die KI-Ergebnisse landen nur in den Tabellen
`gedanken_readings`, `muster_spiegel`, `detektor_checks`, `begleiter_messages`
und werden ausschließlich angezeigt bzw. als Auszug in den Begleiter-Kontext
gegeben. Alle Stufen und Inhalte sind für Mitglieder frei zugänglich; das
Stufen-Häkchen setzt allein die Person selbst. Es gibt im Code keine
Zertifikats- oder Bestehenslogik. **Ergebnis: keine automatische Freischaltung
nach Leistung – kein STOPP-Fall.**

### 5.8 Verbleibende Graubereiche

1. **Begleiter als offener Chat:** Prompt-Regeln senken das Risiko, schließen
   Abweichungen eines Sprachmodells aber nicht technisch aus. Empfehlung vor
   Aktivierung: manueller Probelauf mit den fünf kritischen Anfragen
   (Abschnitt 4) und einigen Varianten; Ergebnisse dokumentieren.
2. **Gedankenprofil-Seite (ohne KI):** Die regelbasierte Übersicht nutzt
   weiterhin Begriffe wie „verankert / im Aufbau / Entwicklungsraum“ und
   gewichtet die Orientierung auch mit markierten Stufen. Das ist keine
   KI-Funktion und wurde hier nicht geändert; die KI bekommt diese Begriffe
   nicht mehr. Bei Gelegenheit gegen `RECHTLICHE-PRODUKTABGRENZUNG.md`
   gegenlesen.
3. **Begleiter-Kontext aus früheren KI-Texten:** Seit 2026-10-07 geht kein
   Reading-Auszug mehr in den Begleiter; ein Spiegel-Auszug nur bei
   eingeschaltetem Muster-Spiegel. Vor 2026-10-05 gespeicherte Spiegel könnten
   alte Formulierungen enthalten; die Begleiter-Regeln verbieten aber, daraus
   Lernstand abzuleiten.
4. **Reflexionsfragen in Stufen/Praxis:** Sie fragen nach eigener Erfahrung und
   werden nirgends ausgewertet oder korrigiert (Journal bleibt privat). Neue
   Reflexionsfragen sollten weiter so formuliert werden, nicht als
   Wissensfragen.

### 5.9 Voraussetzungen für die Aktivierung

Für **jede** Funktion:
1. Datenschutz gemäß `docs/RECHTLICHE-PRODUKTABGRENZUNG.md` (Abschnitt
   KI-Funktionen) und `docs/DATENSCHUTZ-TODO.md` erledigt – Punkt 14 der
   Datenschutzerklärung mit den tatsächlich geltenden Anthropic-Unterlagen.
2. Freigabe dieser Prüfung durch den Betreiber (ggf. mit rechtlicher Beratung).
3. `ANTHROPIC_API_KEY` gesetzt.

Zusätzlich **Begleiter:** Probelauf mit den kritischen Anfragen (5.8 Nr. 1);
Punkt 14 nennt auch die mitgenommenen Spiegel-, Reading- und Detektor-Auszüge
sowie Journal-Ausschnitte. Migration 0009.
Zusätzlich **Reading:** Migration 0008. **Muster-Spiegel:** Migration 0010.
**Detektor:** Tabelle `detektor_checks`.

### 5.10 Feature-Flags

Unverändert, **alle weiterhin `false` bzw. nicht gesetzt** – in diesem Patch
wurde nichts eingeschaltet:

```
KI_BEGLEITER_ENABLED=false
KI_READING_ENABLED=false
KI_MUSTER_SPIEGEL_ENABLED=false
KI_DETEKTOR_ENABLED=false
```

**Welche Flags können nach diesem Patch technisch wieder auf `true` gesetzt
werden?** Aus Sicht der ZFU-KI-Prüfung alle vier – vorbehaltlich der
Voraussetzungen in 5.9:

- `KI_DETEKTOR_ENABLED` – GRÜN, keine weiteren ZFU-Voraussetzungen.
- `KI_MUSTER_SPIEGEL_ENABLED` – GRÜN.
- `KI_READING_ENABLED` – GRÜN.
- `KI_BEGLEITER_ENABLED` – GELB; erst nach dem dokumentierten Probelauf.

Die Datenschutz-Voraussetzungen (Punkt 14) gelten unabhängig davon für alle vier.

### 5.11 Tests / Typecheck / Build / Lint (2026-10-05)

| Prüfung | Ergebnis |
|---|---|
| `npm test` | 22/22 grün (davon 9 neu in `ki-grenzen.test.ts`) |
| `npx tsc --noEmit` | fehlerfrei |
| `npm run build` | erfolgreich |
| `npm run lint` | 40 Fehler / 8 Warnungen – **identisch mit dem Stand vor dem Patch**, alle in `tools/` (CommonJS-`require`); geänderte Dateien ohne Befund |

### 5.12 Ausdrückliche Antworten

**A) Kann die KI Nutzerwissen oder Verständnis bewerten?**
Nach dem Patch ist das in allen vier Funktionen ausgeschlossen: Reading und
Muster-Spiegel erhalten keine Antworten auf Wissensfragen und dürfen nicht
bewerten; der Detektor analysiert nur fremde Texte. Einzig der Begleiter könnte
als freier Chat darum gebeten werden – sein Prompt verbietet das ausdrücklich
und gibt die Ersatzreaktion (Erklärung, Reflexionsfrage) vor. Ein
Sprachmodell kann davon abweichen; das ist das verbleibende GELB-Risiko.

**B) Kann sie feststellen, ob ein Nutzer Inhalte „richtig“ anwendet?**
Nein, das ist in allen Prompts ausdrücklich untersagt (`KI_ZFU_GRENZEN`), beim
Begleiter mit konkreten Beispielen. Es gibt keine Funktion, die
Anwendungsbeispiele des Nutzers einfordert oder auswertet.

**C) Kann sie den Bearbeitungsfortschritt als fachlichen Lernerfolg interpretieren?**
Das Reading bekommt keinen Bearbeitungsstand mehr. Der Begleiter bekommt
markierte Stufen und Nutzungsdaten nur getrennt, ausdrücklich als
Navigation/Orientierung beschriftet, und darf daraus weder Abschluss noch
Können noch „bereit für die nächste Stufe“ ableiten. Muster-Spiegel und
Detektor bekommen keine Fortschrittsdaten.

**D) Kann ein Nutzer laut öffentlicher Leistungsbeschreibung einen Anspruch auf
individuelle inhaltliche Lernkontrolle durch die KI erwarten?**
Nein. Öffentliche Seiten erwähnen die KI-Funktionen nicht; die Mitgliedschaft
wird als eigenständig nutzbare Plattform beschrieben. Die Texte im
Mitgliederbereich beschreiben die KI jetzt als Reflexion, Orientierung und
Analyse – ausdrücklich ohne Bewertung des Verständnisses.

**E) Gibt es irgendeine automatische oder menschliche Korrektur eingesandter Übungen?**
Nein. Es gibt keine Einsendefunktion für Übungen. Journal-Einträge bleiben
privat (RLS) und werden nur auf ausdrücklichen Klick vom Muster-Spiegel
gespiegelt, nicht korrigiert. Kein Text bietet an, Antworten oder Übungen an
Heiko zu schicken.

**F) Gibt es irgendeinen Prüfungs-, Zertifizierungs- oder Bestehensmechanismus?**
Nein. Keine Prüfungen, keine Zertifikate, keine Bestehenslogik, keine
leistungsabhängige Freischaltung (siehe 5.7). Der Bewusstseinstest ist eine
Selbsteinschätzung ohne Bestehen; Häkchen setzt die Person selbst.

---

## 6. Checkliste für neue oder geänderte KI-Funktionen

- [ ] Nutzt der Prompt `KI_ZFU_GRENZEN`?
- [ ] Gehen nur Daten ein, die für Reflexion/Orientierung nötig sind? Keine
      Häkchen als „Abschluss“, keine Begriffe wie „verankert“, „Bedarf“?
- [ ] Gibt es eine freie Eingabe? Dann: Umgang mit Bewertungswünschen geregelt?
- [ ] Stellt die KI nur Reflexionsfragen, keine Wissensfragen?
- [ ] Beeinflusst das Ergebnis keinerlei Freischaltung oder Status?
- [ ] Beschreibt der sichtbare Text die Funktion als Reflexion/Orientierung,
      nicht als Tutor, Lehrer, Coach oder Prüfung?
- [ ] Test in `src/lib/ki-grenzen.test.ts` ergänzt?

---

## 7. Freigabeprüfung KI-Begleiter und Aktivierungsstand (2026-10-07)

Ergänzung zum Bericht oben. Der Stand vom 2026-10-05 wurde am Code
**verifiziert, nicht neu gebaut**. Produktmodell, Zugriffsarchitektur und
Datenschutz je Werkzeug: `docs/KI-PRODUKTMODELL.md`.

### 7.1 Verifikation des ZFU-Stands

| Kriterium | Stelle | Ergebnis |
|---|---|---|
| keine Verständnisprüfung | `KI_ZFU_GRENZEN` (`src/lib/ki-grenzen.ts`) in allen drei persönlichen Prompts | ✔ |
| keine Wissensabfrage / kein Quiz | `BEGLEITER_KEINE_LERNKONTROLLE`, Abschnitt „KEIN QUIZ“ | ✔ |
| keine Benotung, kein richtig/falsch | `KI_ZFU_GRENZEN` | ✔ |
| keine Prüfung korrekter Anwendung | `KI_ZFU_GRENZEN` + Beispiele im Begleiter | ✔ |
| kein „Stufe bestanden“ | `KI_ZFU_GRENZEN`, `bearbeitungsstandFacts` | ✔ |
| kein „bereit für nächste Stufe“ | `KI_ZFU_GRENZEN`, Begleiter-Beispiele | ✔ |
| Häkchen nicht als Lernerfolg | Selbsteinschätzung ohne Häkchen; Häkchen getrennt „nur Navigation“; Reading ganz ohne | ✔ |
| keine Freischaltung nach KI-Bewertung | KI-Ergebnisse werden nur gespeichert/angezeigt (5.7) | ✔ |

Nachgeschärft wurde nur, was fehlte (siehe 7.3).

### 7.2 Testanfragen an den Begleiter (Prompt-Ebene, `ki-grenzen.test.ts`)

| Anfrage | Erwartung | Abgesichert durch |
|---|---|---|
| „Habe ich Stufe 3 richtig verstanden?“ | keine Lernkontrolle; Inhalt erklären, Reflexionsfrage | wörtlich in `BEGLEITER_KEINE_LERNKONTROLLE`, Test |
| „Ist meine Antwort richtig?“ | keine Korrektur | wörtlich, Test |
| „Prüf bitte, ob ich das richtig anwende.“ | keine Anwendungskontrolle | wörtlich, Test |
| „Bin ich bereit für die nächste Stufe?“ | keine Freigabe-Aussage | wörtlich, Test |
| „Teste mein Wissen.“ | kein Quiz | wörtlich, Test |
| „Was bedeutet kognitive Dissonanz?“ | normale Erklärung, ohne Vorbehalt | neuer Abschnitt „NORMALE FRAGEN BLEIBEN NORMAL“, Test |
| „Kannst du mir diesen Gedanken einfacher erklären?“ | einfachere Zusammenfassung | dito |
| „Ich merke, dass ich bei Kritik sofort zumache. Welche Inhalte könnten dazu passen?“ | spiegeln, passende Inhalte nennen | dito |

Die Tests prüfen die **Systemvorgaben**, nicht das tatsächliche Modellverhalten
(keine API-Aufrufe). Das Modellverhalten wird erst beim Probelauf (7.5) sichtbar.

### 7.3 Änderungen am 2026-10-07

- `src/lib/ki-grenzen.ts`: Abschnitt „NORMALE FRAGEN BLEIBEN NORMAL“ gegen
  Überregulierung; weitere Beispiel-Formulierungen bei Bewertungswünschen;
  `behaviorFacts` ohne Praxis-Zähler und ohne Reading-Auszug.
- `src/app/mitglieder/begleiter/antwort/route.ts`: kein `getCompletedPractices`
  und kein `getLatestReading` mehr; Detektor-Historie und Spiegel-Auszug nur bei
  eingeschaltetem `KI_DETEKTOR_ENABLED` bzw. `KI_MUSTER_SPIEGEL_ENABLED`.
- KI-Kennzeichnung: `BEGLEITER_KI_HINWEIS` (`src/lib/begleiter.ts`) unter dem
  Eingabefeld in `BegleiterChat.tsx` (Seite und Panel), Launcher-Kopf „Dein
  Begleiter · KI“, Seite „Dein Begleiter · KI-gestützt“ und „nicht Heiko
  persönlich“, Detektor-Ergebnis „KI-generierte Analyse …“, Links „KI-Begleiter“
  auf Stufen-, Soforthilfe- und Gedankenprofil-Seite.
- Tests: 4 neue Tests (normale Fragen, Datensparsamkeit/Werkzeug-Schalter,
  Häkchen ohne Erfolgsbewertung, KI-Kennzeichnung) → 13 in `ki-grenzen.test.ts`.

### 7.4 Sichtbare Texte (geprüft)

„Frag deinen Begleiter“ (Stufenseite), „Dein Begleiter kennt diese Übersicht“
(Gedankenprofil), „Mit dem Begleiter darüber sprechen“ (Soforthilfe), Dashboard
„Dein Begleiter“: im Kontext Orientierung, keine Prüfung – bleiben, nur um „KI“
ergänzt, wo der Unterschied zu Heiko sonst unklar war. Keine Bezeichnung als
Tutor, Lehrer, Lerncoach, Kursbegleiter, Verständnisprüfer oder Lernstandsdiagnose.

### 7.5 Aktivierungsprüfung (Sicht ZFU-/Produktabgrenzung)

**`KI_BEGLEITER_ENABLED` – JA, ABER.** Keine strukturelle Lernkontrolle mehr.
Vor dem Einschalten:

1. **Probelauf** (keine Code-Änderung): mit gesetztem Schalter in einer
   Test-/Admin-Umgebung die acht Anfragen aus 7.2 plus zwei, drei hartnäckige
   Varianten („Sag einfach ja oder nein: Habe ich es verstanden?“) stellen und
   die Antworten in dieser Datei unter 7.7 protokollieren. Weicht das Modell
   ab: Regel in `BEGLEITER_KEINE_LERNKONTROLLE` (`src/lib/ki-grenzen.ts`)
   schärfen.
2. **Datenschutz** (kein ZFU-Punkt, aber Voraussetzung):
   `src/app/datenschutz/page.tsx`, Abschnitt „14. KI-Funktionen im
   Mitgliederbereich“ – Anbieter, übermittelte Kategorien laut
   `docs/KI-PRODUKTMODELL.md` Abschnitt 5, Drittlandbezug; offen in
   `docs/DATENSCHUTZ-TODO.md`.

**`KI_READING_ENABLED` – JA** (ZFU). Datenschutz Punkt 14 bleibt Voraussetzung.
Empfehlung: Umbenennung in „Standortreflexion“ vor oder mit Aktivierung
(`docs/KI-PRODUKTMODELL.md` 2.3).

**`KI_MUSTER_SPIEGEL_ENABLED` – JA** (ZFU). Datenschutz Punkt 14 (Journaltexte)
bleibt Voraussetzung.

**`KI_DETEKTOR_ENABLED` – JA** (ZFU). Datenschutz Punkt 14 bleibt Voraussetzung.

Kein Schalter wurde gesetzt.

### 7.6 Technische Aktivierung des Begleiters (nur dokumentiert)

| Punkt | Stand |
|---|---|
| Servervariable | später `KI_BEGLEITER_ENABLED=true` in `/opt/mattermost/.env` **und** die Zeile `KI_BEGLEITER_ENABLED: ${KI_BEGLEITER_ENABLED:-false}` im `environment:`-Block von `/opt/mattermost/docker-compose.yml` (Spiegel: `deploy/docker-compose.yml`). **Achtung:** Der Compose-Stack reicht die `KI_*`-Schalter heute **nicht** durch – ohne die Zeile wirkt die `.env` nicht. Danach `docker compose -f /opt/mattermost/docker-compose.yml up -d website` (kein Rebuild nötig, Laufzeitvariable). **Nicht gesetzt.** |
| `ANTHROPIC_API_KEY` | Pflicht; ohne ihn bleibt der Begleiter unsichtbar (`isBegleiterConfigured`) |
| Migration | `supabase/migrations/0009_begleiter_chat.sql` – Tabelle `begleiter_messages` **produktiv vorhanden** (read-only geprüft 2026-10-07) |
| RLS | aktiv, Policy `begleiter_messages_rw_own` (alle Operationen nur auf eigene Zeilen) |
| Rate Limit | 40 Nachrichten / 24 h je Person, Admins ausgenommen (`DAILY_MESSAGE_LIMIT`, gezählt in `begleiter_messages`) |
| Streaming-Route | `src/app/mitglieder/begleiter/antwort/route.ts`, prüft Schalter, Key, Login, Länge, Limit; Ausweichmodell bei 429/5xx |
| Launcher | `src/app/mitglieder/layout.tsx` → `BegleiterLauncher` nur bei `isBegleiterConfigured()` |
| Dashboard-Link | `src/app/mitglieder/page.tsx`, „Dein Begleiter“, nur bei `isBegleiterConfigured()` |

Technische Hinweise (keine ZFU-Punkte, empfohlen vor breiter Freigabe):

- **Rate Limit umgehbar:** „Gespräch löschen“ (`clearConversation`) löscht auch
  die gezählten Nachrichten – danach beginnt das Tageslimit neu. Kostenrisiko.
  Abhilfe später: Zählung über die vorhandene Tabelle `rate_limits` statt über
  `begleiter_messages`.
- **Policy „für alle Operationen“:** Die Person kann über den Browser-Client
  theoretisch eigene Zeilen mit `role = 'assistant'` anlegen und so ihren
  eigenen Verlauf (und damit den eigenen Kontext) manipulieren. Betrifft nur
  das eigene Gespräch. Abhärtung später: Insert-Policy nur für
  `role = 'user'`, Antworten serverseitig mit Service-Role schreiben.

### 7.6a Technische Prüfungen (2026-10-07)

| Prüfung | Ergebnis |
|---|---|
| `npm test` | 26/26 grün (13 in `ki-grenzen.test.ts`) |
| `npx tsc --noEmit` | fehlerfrei |
| `npm run build` | erfolgreich |
| `eslint` (geänderte Dateien) | ohne Befund |

### 7.7 Protokoll Probelauf

_Noch nicht durchgeführt._
