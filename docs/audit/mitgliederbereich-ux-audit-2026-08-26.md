# UX-, Content- & Qualitäts-Audit: Mitgliederbereich

**Plattform:** „Werde Meister deiner Gedanken" · geschützter Bereich `/mitglieder/*`
**Datum:** 2026-08-26
**Methode:** Vollständiger User-Test aus Sicht eines neuen Mitglieds, belegt durch Analyse des realen Quellcodes (`src/app/mitglieder/**`, `src/components/members/**`, `src/lib/**`, `proxy.ts`) sowie physische Prüfung aller Assets (`public/`, `content/`). Sechs parallele Tiefenprüfungen: Onboarding/Navigation · 7-Stufen-System · Bewusstseinstest/Profil · Lerninhalte/Vertiefungen · Praxis/Journal/Begleiter · UI/Mobile/QA/Fortschritt.
**Leitfrage durchgehend:** *„Wenn ich diese Plattform gerade gekauft hätte und zum ersten Mal hier wäre – weiß ich jederzeit, wo ich bin, warum ich hier bin und was ich als Nächstes tun soll?"*

> **Grundtenor vorab:** Dies ist **kein Kulissenbau.** Die inhaltliche und technische Substanz ist überdurchschnittlich – echte, sorgfältig geschriebene Lektionen, 29 vollständige Vertiefungen, ein durchdachtes 21-Tage-Programm, 45 real existierende, doppelt geschützte PDFs, ein sauberes Design-System, vorbildliche Security und graceful KI-Degradation. Die Schwächen liegen fast durchgehend **nicht in der Einzelqualität, sondern in der Verzahnung und im Erwartungsmanagement**: gute Bausteine stehen als Inseln nebeneinander, der rote Faden der 7 Stufen trägt sie nicht aktiv, und an einer sehr sichtbaren Stelle (Videos) wird mehr versprochen als eingelöst.

---

## A. Executive Summary – die 5 wichtigsten Erkenntnisse

1. **🔴 Fast alle Videos sind dasselbe Platzhalter-Video – hinter maßgeschneiderten Thumbnails.** Von ~50 Video-Flächen im Bezahlbereich spielt genau **eine** echten Inhalt ab (eine Atemübung). Alle 7 Stufen-Videos, alle 29 Vertiefungs-Videos, 13 von 14 Praxis-Videos und das „Willkommensvideo" fallen auf `site.placeholderVideoId = "gOvtKBnqGvk"` zurück – dieselbe ID wie das öffentliche Startseiten-Video. Weil jedes Thema ein eigenes, gebrandetes Poster hat (alle 51 existieren real), sieht es nach individuellem Video aus und spielt dann generischen Platzhalter. Das ist **schädlicher als ein ehrliches „folgt in Kürze"** und der größte Vertrauensbruch direkt nach dem Kauf. **Sofort-Fix: eine Zeile (`placeholderVideoId: null`).**

2. **🔴 Das Testergebnis personalisiert den Lernpfad nicht – obwohl der Code es wörtlich verspricht.** Der Bewusstseinstest berechnet und speichert zuverlässig eine `start_stage` (1–7). Das Dashboard liest sie, nutzt sie aber **nicht** für den „Hier weitermachen"-Anker (`page.tsx:132`) – dieser zeigt jedem Neuen „Weiter mit Stufe 1". Der Hinweistext daneben behauptet aber: *„dein Ergebnis passt den Startpunkt an"* (`page.tsx:356`). **Code steht gegen Copy** – der wertvollste Personalisierungs-Hebel verpufft genau im stärksten Engagement-Moment.

3. **🟠 Es gibt keine Mitglieder-Navigation.** Das Mitglieder-Layout hat keine eigene Nav; die einzige persistente Leiste ist der **Marketing-Header**, dessen Links aus dem Bereich hinausführen (inkl. „Mitgliedschaft" und „Kostenloses Erstgespräch" – einem zahlenden Mitglied angeboten). Die ~10 echten Member-Bereiche sind nur vom Dashboard erreichbar; Lateral-Navigation (Tool → Tool) kostet immer den Umweg übers Dashboard. Orientierung „was gibt es hier noch" ist ausschließlich am Dashboard beantwortbar.

4. **🟠 Das Dashboard schüttet die komplette Bibliothek auf einmal aus.** ~10 vollbreite Sektionen, 40+ Links, die gesamte Vertiefungs- (29) und Praxis-Bibliothek als Kartenwall, dazu ein zweites Intro direkt unter dem Hero. Der eigentlich klug gedachte 3-Ebenen-Aufbau (ein dominanter „Hier weitermachen"-Anker) ertrinkt im Scroll. Für einen Erstbesucher ist nicht eindeutig, was Pflicht, was Vertiefung, was optional ist.

5. **🟠 Die 7 Stufen sind auf der Detailseite ein tragendes System – auf dem Dashboard eine Kachel unter vielen.** Stufe ↔ Lektion ↔ Übung ↔ Vertiefung ist auf der Stufenseite gut verdrahtet, aber der Fortschritt ist ein **folgenloses Selbst-Häkchen** (an keine Aktivität gekoppelt), die stärksten Motivationssignale (Streak, 21-Tage-Fortschritt, „zuletzt geschrieben") leben nur auf Unterseiten, und die reiche Aktivität eines Mitglieds (Reflexion, Praxis) hinterlässt keine Spur im Fortschritt – obwohl das Datenschema das bereits könnte.

**Ein Satz zum Kern:** Aus einem inhaltlich starken Stufen*angebot* ist noch kein glaubwürdiges Entwicklungs*system* geworden – die Lücke ist Verzahnung, Personalisierung und Ehrlichkeit an den Video-Flächen, nicht der Inhalt selbst.

---

## B. Gesamtbewertung (1–10)

| Dimension | Score | Kurzbegründung |
|---|:---:|---|
| **Erster Eindruck** | **5** | Ruhiges, hochwertiges Design und persönlicher Ton – aber der erste Klick landet auf einem generischen Platzhalter-Video, und der Marketing-Header wirkt im bezahlten Bereich fehl am Platz. |
| **Onboarding** | **6** | Guter 3-Schritte-Willkommensguide, starker „Hier weitermachen"-Anker. Geschwächt durch fragile Passwort-Mail-Abhängigkeit ohne Self-Service, fehlende Zeit-/Pfaderwartung und ein Orientierungsvideo, das nicht orientiert. |
| **Orientierung** | **7** | Stepper mit „Du bist hier / % / von 7" beantwortet „wo stehe ich" klar. Abzüge: Abschnittsebene nicht getrackt, hohe Dichte konkurrierender CTAs. |
| **Navigation** | **4** | Rückweg zum Dashboard immer 1 Klick (gut), aber keine Member-Nav in der persistenten Leiste, keine Lateral-Navigation, keine Suche; Header verweist nach draußen ins Marketing. |
| **UX/UI** | **7** | Starkes, konsistentes Design-System, kluge Hero-Umschaltung, saubere Typografie. Abzüge: extrem lange Dashboard-Seite mit Bibliotheks-Dump und Kartenwiederholung. |
| **Content-Struktur** | **7** | Einzelne Vertiefungsseite strukturell vorbildlich (voller Lernkreis, Autosave-Reflexion). Abzüge: zwei namensgleiche Bibliotheken, 29-Karten-Wall ohne Filter, Wissensdatenbank als reine Lesestrecke. |
| **Praxisorientierung** | **6** | Inhaltlich exzellente Übungen (Wofür/Wann/Schritte/Dauer). Aber schwache Integration: keine Ergebnis-Festhaltung, keine Journal-Rückbindung, Stufenseite verlinkt die passende Praxis nicht. |
| **7-Stufen-System** | **7** | Echte, hochwertige Lektionen, klarer Stepper, sauberer N→N+1-Übergang, RLS-Datenmodell. Abzüge: folgenloser Selbst-Toggle, ignorierte Test-Startstufe, Platzhalter-Videos. |
| **Bewusstseinstest** | **7.5** | Handwerklich stark: Erwartungsmanagement, ein Item pro Screen, manipulationssichere Serverauswertung, eleganter Login-Umweg, reiches Ergebnis. Abzüge: fehlende Dashboard-Personalisierung, Text-Button-Bruch für Anonyme, methodische Angreifbarkeit. |
| **Journal** | **7** | Automatische, kontextbezogene Übernahme der Reflexionsfragen, strikte Privatsphäre (RLS), Autosave, Standortbestimmung + Wachstumskurve + PDF-Export. Abzüge: Praxis speist nichts ein, an zu wenigen Stellen angeboten, keine Filter/Suche. |
| **Fortschritt / Motivation** | **7** | Exzellente Einzelbausteine (nicht-bestrafende Streak, 21-Tage, Profil, Kurve). Abzüge: fragmentiert statt zentral sichtbar, rein manueller Stufen-Toggle, keine übergreifenden Meilensteine. |
| **Mobile Experience** | **8** | Solide Responsive-Grundlage, eigener `xs`-Breakpoint sinnvoll genutzt, responsives SVG-Chart, kein Horizontal-Scroll. Nur kleine Drängel-Stellen. |
| **Wahrgenommener Wert der Mitgliedschaft** | **6** | Die Substanz rechtfertigt deutlich mehr (8+), aber Platzhalter-Videos, fehlende Personalisierung und die Marketing-Nav im Bezahlbereich lassen den gefühlten Wert unter dem realen Wert liegen. |

---

## C. Top-10-Probleme (größter Hebel zuerst)

| # | Problem | Prio | Fundstelle |
|:--:|---|:--:|---|
| 1 | ~50 Video-Flächen spielen dasselbe Platzhalter-Video hinter gebrandeten Thumbnails | 🔴 | `site.ts:27`; `page.tsx:271`, `stufe/[nr]:91`, `praxis/[slug]:103`, `wissen/[slug]:106` |
| 2 | Test-Startstufe personalisiert den Dashboard-Anker nicht – trotz gegenteiligem Versprechen | 🔴 | `mitglieder/page.tsx:132` vs. `:356`; `bewusstseinstest/actions.ts:52` |
| 3 | Keine Mitglieder-Navigation; persistente Leiste ist die Marketing-Nav nach außen | 🟠 | `mitglieder/layout.tsx:53`; `Header.tsx:54`; `site.ts:41` |
| 4 | Übungen ohne Ergebnis-Festhaltung / ohne Journal-Rückbindung; Stufenseite verlinkt keine Praxis | 🟠 | `praxis/[slug]/page.tsx`; `JournalReflection.tsx:18`; `stufe/[nr]/page.tsx` |
| 5 | Dashboard schüttet die komplette Bibliothek aus (~10 Sektionen, 40+ Links, doppeltes Intro) | 🟠 | `mitglieder/page.tsx:253–690` |
| 6 | Zwei fast namensgleiche Bibliotheken (Vertiefungen ↔ Wissensdatenbank) ohne erklärten Unterschied | 🟠 | `page.tsx:566–598`; `deep-dives.ts` ↔ `wissensdatenbank.ts` |
| 7 | Fortschritt = folgenloser Selbst-Toggle; Momentum-Signale (Serie/21-Tage/zuletzt) nicht im Dashboard | 🟠 | `StageCompleteToggle.tsx`; `actions.ts:55`; `page.tsx:293` |
| 8 | Wissensdatenbank = 27 reine Lesetexte ohne Fortschritt, Übung oder Reflexion („Blog hinter der Bezahlschranke") | 🟠 | `wissensdatenbank/[slug]/page.tsx` |
| 9 | Detektor & Muster-Spiegel schlecht auffindbar; Journal an reflexionsstärksten Stellen nicht angeboten | 🟠 | `page.tsx:141–174`; `journal/page.tsx:206` |
| 10 | Post-Kauf: Passwort-Mail-Abhängigkeit ohne Self-Service; Einstellungen ohne Kündigung/Abo-Portal | 🟠 | `mitgliedschaft/willkommen/page.tsx`; `einstellungen/page.tsx:110` |

---

## D. Quick Wins (wenig Aufwand, große Wirkung)

- **`placeholderVideoId: null` setzen** (`site.ts:27`). Ein Einzeiler entschärft den gravierendsten Qualitätsbruch – der Code rendert dann überall den bereits vorhandenen, ehrlichen „folgt in Kürze"-Zustand. **Größter Hebel im ganzen Audit.**
- **Widerspruch Code↔Copy auflösen** (`page.tsx:356`): Entweder den „Hier weitermachen"-Anker bei `completedCount === 0 && startStage` auf die Test-Startstufe setzen, oder die falsche Zusage streichen.
- **`practicesForStage()` auf der Stufenseite verlinken** (Block „Praxis zu dieser Stufe", analog zum vorhandenen „Passende Vertiefungen"-Block). Schließt die Lücke Stufe → Übung.
- **`JournalReflection` für Praxis freischalten**: Der Typ erlaubt nur `stage`/`deep_dive`, die DB-Tabelle `notes` erlaubt `item_type='practice'` aber schon (`0003_notes.sql:14`). Ein Reflexionsblock unter „So geht's" bringt Praxis automatisch ins Journal.
- **„Mitgliedschaft" / „Kostenloses Erstgespräch" für eingeloggte Mitglieder ausblenden** – ein bezahltes Mitglied soll nicht erneut zum Kauf eingeladen werden.
- **Willkommensvideo nur bei `completedCount === 0` zeigen** – für Wiederkehrer rutscht „Hier weitermachen" nach ganz oben.
- **Stripe-Kundenportal-Link in die „Konto"-Karte der Einstellungen** (`einstellungen/page.tsx`) – erfüllt Erwartung an Self-Service-Kündigung (in DE zunehmend rechtlich erwartet).
- **Momentum-Reihe in den Hero** (Serie · 21-Tage-Fortschritt · zuletzt aktiv) neben dem Stufenbalken – die aufwändig gebaute Streak wird sonst nie gesehen.
- **Prozent-Anzeige/Balken des Tests aus einer Formel speisen** (`ConsciousnessTest.tsx:288` vs. `:303`) – kleine Unrundheit beheben.
- **Detektor-Link an `isDetektorConfigured` hängen** statt an `begleiterVerfuegbar` (`page.tsx:153`) – gleiche Wirkung, sauberere Semantik.

---

## E. Strukturelle Verbesserungen (größere Änderungen)

**1. Persistente Mitglieder-Navigation einführen.** Eine schlanke Subnav im `mitglieder/layout.tsx` (Dashboard · Meine Stufen · Praxis · Journal · Wissen · Einstellungen) – oder den globalen Header innerhalb `/mitglieder` durch eine Member-Variante ersetzen. Beseitigt die fehlende Lateral-Navigation und den Marketing-Kontext im Bezahlbereich.

**2. Dashboard vom Index zum Cockpit umbauen.** Das Dashboard soll enden bei „was jetzt dran ist", nicht bei „hier ist alles". Konkret: pro Sektion nur 3–6 **zur aktuellen Stufe passende** Karten + „Alle ansehen"-Link auf eigene Übersichtsseiten; Featured-Meditation aus Ebene 1 heraus in die Praxis-Sektion; komplette Bibliotheken in Unterseiten auslagern.

**3. Die 7 Stufen zum echten Betriebssystem machen.** Fortschritt an sichtbare Aktivität koppeln (Reflexion geschrieben / Praxis gemacht → Stufe weich „begonnen"/„bearbeitet"), das Schema (`item_type in ('stage','practice','deep_dive')`) endlich voll nutzen, und Vertiefungen/Praxis konsequent stufenkontextualisiert ausspielen statt als gleichrangige Silos.

**4. Zwei Bibliotheken entwirren.** Klare Rollen: Vertiefungen = „anwenden & üben zu deiner Stufe" (voller Lernkreis), Wissensdatenbank = „nachschlagen & wissenschaftlich vertiefen". Bei Themendopplungen (Neuroplastizität, kognitive Verzerrungen, Konditionierung, Sprache) wechselseitig verlinken; der Wissensdatenbank mindestens einen Gelesen-Status + eine Reflexionsfrage pro Kapitel geben.

**5. Diagnose-Reise statt Diagnose-Inseln.** Test → Gedankenprofil → (bei Bedarf) Detektor/Muster-Spiegel als zusammenhängenden Pfad verdrahten. Muster-Spiegel aus der Standortbestimmung verlinken, Detektor an die Kategorie „Mentale Selbstverteidigung" koppeln, im Test-Ergebnis kontextuelle Verweise setzen.

**6. Post-Kauf-Flow absichern.** Auf `mitgliedschaft/willkommen` die Stripe-`session_id` serverseitig prüfen, Status spiegeln („Zugang wird eingerichtet…") und einen „Passwort-Mail erneut senden"-Trigger anbieten, damit niemand im euphorischsten Moment in einer Sackgasse landet.

---

## F. Seitenbezogene Findings

Format je Eintrag: **Route / Fundstelle → Beobachtung → Problem → Auswirkung → Verbesserung → Priorität.**

### Dashboard – `/mitglieder` (`mitglieder/page.tsx`)

- **`:271` (Willkommensvideo) → 🔴** Zeigt das globale Platzhalter-Video, betitelt als „Kurz zur Orientierung". → Das erste, was ein Neuling sieht, orientiert nicht, sondern spielt Marketing-Clip. → Qualitätsverlust direkt nach Kauf. → Echtes 2-Min-Orientierungsvideo oder `placeholderVideoId: null`.
- **`:132` vs. `:356` → 🔴** „Hier weitermachen" ignoriert `start_stage`, Copy verspricht das Gegenteil. → Frisch eingestufter Nutzer wird wie ein Anfänger behandelt. → Anker an `max(erste-offene, start_stage)` setzen oder Zusage entfernen.
- **`:253–690` → 🟠** ~10 Sektionen, komplette Bibliothek, doppeltes Intro, ~40 Links. → Entscheidungslast statt Führung. → Kuratieren + auslagern (siehe E2).
- **`:141–174` (Werkzeugkasten) → 🟠** Gedankenprofil, Detektor, Muster-Spiegel, Rückkehr liegen gleichrangig ganz unten „im Hintergrund". → Wertvolle Werkzeuge werden nicht entdeckt. → Kontextuell verlinken, Rückkehr/Momentum nach oben.
- **`:260–287` (Hero-Kopf) → 🟡 [MOBILE]** `flex-wrap items-end` lässt „Einstellungen"/„Abmelden" bei langem Vornamen unter die H1 drängen. → Gedrängte Kopfzone auf schmalen Phones. → Buttons `< sm` in eigene Zeile (`w-full justify-end`).

### 7 Stufen – `/mitglieder/stufe/[nr]` (`stufe/[nr]/page.tsx`)

- **`:91–106` → 🟠** `lesson?.video ?? site.placeholderVideoId` – alle 7 Lektionen `video:null` → immer Platzhalter; der „folgt in Kürze"-Zweig ist toter Code. „Video zur Stufe"-Label steht statisch. → Attrappen-Eindruck. → Platzhalter entschärfen; Label/Poster nur bei echtem Video rendern.
- **`:84` (StageCompleteToggle) → 🟠** Abschluss-Toggle sitzt **vor** Video/Lektion/Übungen; reine Selbsteinschätzung, an nichts gekoppelt. → Man hakt ab, bevor man etwas gesehen hat; 100 % in 5 Sekunden erreichbar. → Toggle zu den Übungen/Reflexion rücken, an weiche Aktivitätssignale koppeln, ehrlichere Sprache („Ich habe mit dieser Stufe gearbeitet").
- **Fehlender Praxis-Link → 🟠** Kein Import von `practicesForStage`; die Stufe zeigt Vertiefungen, aber nicht die passende Praxis. → Übungen wirken als loses Zusatzangebot. → „Praxis zu dieser Stufe"-Block ergänzen.
- **Positiv → ✅** Vollständige, gut sequenzierte Detailseite mit dominantem „Nächster Schritt"-CTA und sauberem N→N+1-Übergang; echte Lektionsinhalte; PDFs real und geschützt.

### Bewusstseinstest – `/bewusstseinstest` (öffentlich) (`ConsciousnessTest.tsx`, `consciousness-test.ts`)

- **`:236–245` → ✅** Für Eingeloggte zwei klare CTAs nach dem Ergebnis („Zu meinem Gedankenprofil", „Direkt zu Stufe {nr}") – die „Was mache ich danach?"-Frage ist hier beantwortet.
- **`:246–256` vs. `consciousness-test.ts:100` → 🟠** Für Anonyme sagt der Empfehlungstext „Stufe X ist dein nächster Schritt", die Buttons führen aber nur zu „Klarheitsgespräch"/„E-Book". → Kognitive Dissonanz im Conversion-Moment. → Primär-CTA „Deine Reise ab Stufe X starten" (Registrierung mit Stufen-Vormerkung).
- **`consciousness-test.ts:174–289` → 🟠** Fragen streng nach Stufe 1→7 gruppiert, alle gleichsinnig gepolt, keine Umkehr-Items, Winner-takes-all. → Ja-Sage-Tendenz kann Ergebnis „zu hoch" ausfallen lassen – heikel bei einem Ehrlichkeits-Tool. → Reihenfolge mischen, 2–3 reverse-kodierte Items, bei knappem Abstand „zwischen Stufe X und Y" anzeigen.
- **`:288` vs. `:303` → 🟡** Kopf-Prozentzahl und Balkenlänge laufen minimal auseinander. → Beide aus einer Formel speisen.
- **Positiv → ✅** Erwartungsmanagement (21 Fragen, ~5 Min, „kein richtig/falsch"), ein Item pro Screen mit Auto-Advance, manipulationssichere Serverauswertung (nur Rohantworten gehen an den Server), eleganter localStorage-Login-Umweg ohne Datenverlust, reiches 7-Stufen-Ergebnisprofil + Wachstumskurve.

### Gedankenprofil / Detektor / Muster-Spiegel

- **`gedankenprofil/page.tsx:290–313` → ✅** Echte gewichtete Bedarfsanalyse mit Begründung, priorisiertem nächstem Schritt und Deep-Links zu Stufe + Praxis + Vertiefung. Fällt ohne Test sauber auf eine Einladung zurück. Didaktisch das stärkste Werkzeug.
- **Discoverability → 🟠** Muster-Spiegel existiert nur auf `/mitglieder/journal` (ab ≥1 Reflexion), von nirgends sonst verlinkt; Detektor/Profil nur im Werkzeugkasten unten. → Isolierte Inseln statt Diagnose-Reise. → Kontextuell aus Test-Ergebnis/Standortbestimmung/Profil verlinken.
- **KI-Degradation → ✅** Detektor ohne API-Key rendert Ersatztext mit Verweis auf die 16 Techniken – keine Sackgasse; Muster-Spiegel/Reading werden sauber ausgeblendet. Datenschutz-Kommunikation vorbildlich („erst beim Klick geht Text an die KI").

### Vertiefungen – `/mitglieder/wissen/[slug]` (`deep-dives.ts`)

- **`wissen/[slug]/page.tsx:106` → 🔴** Alle 29 `video:null` → immer Platzhalter hinter spezifischem Poster. → Siehe Top-Finding 1.
- **`page.tsx:600–625` (Index) → 🟠** Flacher 29-Karten-Wall, keine Suche/Filter/Empfehlung/Fortschritt; `relatedStage` existiert, wird auf der Karte aber nicht gezeigt. → Erschlagend, kein Einstiegspunkt priorisierbar. → Stufen-Badge, „Empfohlen für Stufe X"-Block, Erledigt-Häkchen, Kategorie-Filter.
- **Kategorien-Schieflage 16/29 → 🟠** 16 Vertiefungen sind „Mentale Selbstverteidigung" – zugleich die Detektor-Taxonomie („Single Source of Truth", `detektor-actions.ts:33`). Doppelrolle nirgends erklärt; Kern-Kategorien (Gehirn, Emotion, Körper) mit je 1 Eintrag unterbesetzt. → Wirkt Richtung „Manipulationsabwehr" verzogen. → Block optisch bündeln/trennen, Kern-Kategorien ausbauen.
- **`:236–267` (Seitenende) → 🟡** Kein „Nächste Vertiefung"-CTA, keine Sequenz zwischen Vertiefungen; `relatedStage` erst ganz unten. → Jede Vertiefung wirkt wie Sackgasse. → „Als Nächstes"-Empfehlung + Stufen-Eyebrow oben.
- **`sources` nur 7/29 → 🟡** Ausgerechnet die 16 wertungsnahen Selbstverteidigungs-Themen ohne Quellen. → Schwächt die betonte Evidenz-Ehrlichkeit dort, wo sie am wichtigsten wäre. → `sources` verbindlich ergänzen.
- **Positiv → ✅** Struktur einer Vertiefungsseite ist mustergültig: Kerngedanke → Einleitung → Abschnitte → nummerierte Übungen mit Dauer → Autosave-Reflexion → Kernbotschaft → Evidenz → Stufen-Querverweis → PDF. Content-Qualität durchweg hoch, kein Füllmaterial.

### Wissensdatenbank – `/mitglieder/wissensdatenbank` (`wissensdatenbank.ts`, 27 Kapitel)

- **`[slug]/page.tsx` gesamt → 🟠** Reiner Fließtext (~150 Zeilen/Kapitel) + Vor/Zurück + Pauschal-CTA „Vom Wissen zur Praxis". Kein Fortschritt, keine Übung, keine Reflexion, kein Bezug zur konkreten Stufe. → Hier ist der „Blog hinter der Bezahlschranke" real verwirklicht; nichts bleibt hängen. → Gelesen-Status (`item_type='wissenskapitel'`), 1 Reflexionsfrage pro Kapitel, kapitelspezifischer Verweis auf passende Vertiefung/Stufe.
- **Überlappung mit Vertiefungen → 🟠** Fast namensgleich, überschneidende Themen, kein erklärter Unterschied (siehe E4).
- **Positiv → ✅** Evidenz-Legende (✅/⚠️/🔬), Glossar, „Ein Wort zur Vorsicht"-Disclaimer (kein Therapieersatz) – seriös und vertrauensbildend; Slug-Whitelist gegen Path-Traversal.

### Praxis – `/mitglieder/praxis` & `/praxis/[slug]` (`practices.ts`)

- **`[slug]/page.tsx` gesamt → 🔴** Keine Ergebnis-Festhaltung, kein „Wie war es?"-Feld; `JournalReflection` akzeptiert `practice` nicht, `journal.ts:71` behandelt den Fall nur als toten Ballast. → Übungen wirken wie Verbrauchsmaterial; das Kernversprechen „innerer Beobachter" wird bei der Praxis nicht eingelöst. → `reflection`-Feld + Journal-Anbindung (DB kann es).
- **`:174–183` → 🟡** Kein „Als Nächstes" nach der Übung, nur „Zur Übersicht". → Kein Sog zum Dranbleiben. → „Als Nächstes"-Karte (nächste Übung der Kategorie/Stufe).
- **Audio-Zweig → 🟢** `practices.ts:33` + Player im Code, aber keine Übung hat `audio`, keine MP3 in `public/`. Aktuell folgenlos, ungenutzter Code.
- **Positiv → ✅** „Wofür/Wann"-Karten beantworten Zweck und Zeitpunkt explizit; nummerierte Schritte, Dauer prominent, bodenständig ohne Esoterik-Ballast; saubere Kategorie-Gruppierung.

### Journal – `/mitglieder/journal` (`journal.ts`, `JournalReflection.tsx`)

- **Einbindung → 🟠** `JournalReflection` nur auf Stufen-/Vertiefungsseiten – nicht auf Praxis, Wissensdatenbank, Programm, Rückkehr. → Genau die reflexionsstärksten Momente bieten kein Schreibfeld. → Überall einbinden + freien „Schnelleintrag".
- **`JournalReflection.tsx:74` → 🟡** Notizen per Array-Index (`reflection-N`) an Fragen gebunden. → Umsortieren einer Frage ordnet alte Antworten falsch zu. → Stabile Frage-Slugs statt Position.
- **`journal/page.tsx:271–299` → 🟡** Nur chronologische Liste, kein Filter/Suche/Gruppierung. → Mit wachsendem Journal sinkt der Nutzen für die aktivsten Mitglieder. → Filter-Chips (Stufe/Vertiefung) + Volltextsuche über `body`.
- **Positiv → ✅** Strikte Privatsphäre (RLS `auth.uid()=user_id`), ehrliche Kommunikation („nur für dich sichtbar"), automatische kontextbezogene Übernahme mit Rücklink zur Quelle, Autosave mit `aria-live`, aussagekräftige Stats + Standortbestimmung + Wachstumskurve + PDF-Druck.

### Begleiter (KI) – `/mitglieder/begleiter` (`begleiter*`, `BegleiterChat.tsx`)

- **Passives Angebot → 🟡** Immer erreichbar (schwebender Button), aber nie situativ angeboten; die Stufenseite verweist bei Fragen aufs Kontaktformular statt auf den Begleiter. → Stärkster Mehrwert (kontextbewusste Hilfe hier) bleibt dem Zufall überlassen. → „Frag den Begleiter zu dieser Stufe"-Anstoß mit vorbelegter Frage.
- **Positiv → ✅** Vorbildliche graceful Degradation (ohne API-Key verschwindet Button + Link sauber, Seite bleibt mit Erklärung erreichbar – keine Sackgasse); Krisen-Handling mit Telefonseelsorge-Nummern und harten Grenzen; echte Kontext-Integration (Inhaltskatalog, Gedankenprofil, jüngste Journal-Einträge); Halluzinationsschutz (Link-Allowlist, „erfinde niemals Titel/Pfade/Studien"); RLS, Tageslimit, Fallback-Modell bei Overload.

### Tägliche Rückkehr – `/mitglieder/rueckkehr` (`TaeglicheRueckkehr.tsx`)

- **Prominenz → 🟡** Nur eine von acht Werkzeugkasten-Kacheln, kein „Heute schon zurückgekehrt?"-Element auf dem Dashboard; für Neue explizit als Post-Programm-Praxis gerahmt, steht aber zwischen Erst-Tools. → Das beste Retention-Feature bleibt unsichtbar. → Kompakten Streifen mit Heute-Status ins Dashboard heben, für Neue erst ab Fortschritt einblenden.
- **Positiv → ✅** Nicht-bestrafende Serie (Gesamtsumme schrumpft nie), idempotentes Server-Action mit Plausibilitätsprüfung, lokale Zeitzone, sanfte deterministische Tagesimpulse – erwachsene, glaubwürdige Gamification.

### Einstellungen – `/mitglieder/einstellungen`

- **`:110–127` → 🟠** „Konto"-Karte zeigt nur E-Mail + „Abmelden"; trotz Stripe-Abo kein Weg zu Rechnung/Zahlungsmethode/Kündigung. → Vertrauens-/Transparenzminus, Support-Aufwand, in DE ggf. rechtliche Erwartung (Kündigungsbutton). → Stripe-Kundenportal-Link ergänzen.
- **Positiv → ✅** Klare Namens-/Passwort-Formulare, Newsletter-Toggle.

### Post-Kauf – `/mitgliedschaft/willkommen`

- **`:14–69` → 🟠** Guter 3-Schritte-Guide, aber die „Passwort setzen"-Mail hängt am Stripe-Webhook; die Seite verifiziert die `session_id` nicht und zeigt denselben Text auch ohne echten Kauf; bei aus­geschalteter Selbstregistrierung ist der einzige Ausweg der Kontakt. → Sackgasse im euphorischsten Moment. → `session_id` serverseitig prüfen, Status spiegeln, „Mail erneut senden"-Trigger.

---

## G. Fehlende Elemente (sinnvoll, aber aktuell nicht vorhanden)

- **Persistente Mitglieder-Navigation** (siehe E1) – das größte strukturelle Loch.
- **Echte Videos** – bis auf eine Atemübung existiert keins; der ganze „geführte" Anspruch ist noch nicht eingelöst.
- **Dashboard-Momentum-Blick**: Serie, 21-Tage-Fortschritt, „zuletzt angesehen"/Reflexionszahl zentral – existiert alles, nur nicht am Hub.
- **Resume auf Abschnittsebene**: „Wo war ich?" wird nur auf Stufen-Granularität beantwortet; innerhalb einer langen Stufe keine Scroll-/Leseposition, keine Abschnitts-Anker.
- **Zeit-/Aufwandsangaben pro Stufe** und ein empfohlener Rhythmus („eine Stufe pro Woche") – Praxis hat Dauer, Stufen nicht.
- **Fortschritt für Praxis, Vertiefungen und Wissenskapitel** – das Schema kann `practice`/`deep_dive`, genutzt wird nur `stage`.
- **Filter/Suche** in Vertiefungs-Index und Journal.
- **Wenige, erwachsene Meilensteine** übergreifend („Woche 1 geschafft", „10 Reflexionen") – bewusst sparsam.
- **Abo-Selbstverwaltung** (Stripe-Portal) in den Einstellungen.
- **Personalisierter Einstieg für Anonyme** nach dem Test (Registrierung mit Stufen-Vormerkung).

---

## H. Was unbedingt bleiben sollte (nicht verschlechtern)

- **Die inhaltliche Substanz:** echte, sorgfältig geschriebene Lektionen für alle 7 Stufen, 29 vollständige Vertiefungen mit vollem Lernkreis, ein didaktisch durchdachtes 21-Tage-Programm. Kein Lorem-Ipsum, keine TODOs im Datenmodell.
- **Der „Hier weitermachen"-Anker + 7-Stufen-Stepper** mit „Erledigt / Du bist hier / Als Nächstes"-Badges und sanfter Führung statt Sperre – konzeptionell genau richtig.
- **Security & Robustheit:** dreifacher Defense-in-Depth-Schutz, PDFs bewusst in `content/` statt `public/`, konsequentes `robots: noindex`, keine geleakten geschützten Inhalte, keine toten Buttons, alle 45 PDFs und 51 Poster real vorhanden (kein 404-Klick möglich).
- **Der Bewusstseinstest** als öffentlicher Lead-Magnet: Erwartungsmanagement, ein Item pro Screen, manipulationssichere Serverauswertung, verlustfreier Login-Umweg, reiches Ergebnisprofil.
- **Das Gedankenprofil** mit echter, priorisierter Bedarfsanalyse und Deep-Links.
- **Der KI-Begleiter**: graceful Degradation, Krisen-Handling, Kontext-Integration, Halluzinationsschutz, vorbildliche Datenschutz-Kommunikation.
- **Die nicht-bestrafende Streak** der Täglichen Rückkehr – seltene, glaubwürdige Gamification, die zur seriösen Tonalität passt.
- **Das Design-System** (Button/Card/Container/Icon), der `member-hero`-Kontrast-Trick, das Video-Facade-Muster (nur der Inhalt dahinter ist das Problem), die solide mobile Basis.
- **Der ehrliche, respektvolle Ton**: neutrale Begrüßung ohne Fantasie-Namen, „folgt in Kürze"-Fallbacks, „Lektion in Vorbereitung"-Zustände.

---

## I. Idealer Mitgliederbereich (Neustrukturierung auf Basis des Vorhandenen)

Das Ziel ist **nicht mehr Funktionen**, sondern dass die Aufmerksamkeit des Mitglieds auf seiner Entwicklung liegt – nicht auf der Bedienung. Auf Basis der bereits vorhandenen Inhalte:

**Das Dashboard wird zum Cockpit, nicht zum Index.** Oben: persönliche Begrüßung + Momentum-Reihe (aktuelle Stufe · % · Serie · zuletzt aktiv). Genau **ein** dominanter „Hier weitermachen"-Anker, gespeist aus `max(erste-offene Stufe, Test-Startstufe)`. Darunter maximal drei kuratierte, **zur aktuellen Stufe passende** Vorschläge (eine Vertiefung, eine Praxis, eine Reflexion). Die vollständigen Bibliotheken wandern hinter „Alles ansehen" auf eigene, filterbare Seiten. Eine schlanke persistente Subnav macht alle Bereiche jederzeit erreichbar.

**Der konkrete Nutzerpfad:**

1. **Erster Login** → Cockpit mit *einem* klaren Angebot: „Finde in 5 Minuten heraus, wo du stehst" → Bewusstseinstest. Ein echtes 2-Min-Orientierungsvideo (oder ehrlich keins) statt Platzhalter.
2. **Test** → 21 Fragen, ein Item pro Screen (bleibt wie es ist).
3. **Ergebnis** → Stufe X + Interpretation + **ein** primärer CTA „Deine Reise ab Stufe X starten".
4. **Persönliche Orientierung** → Gedankenprofil zeigt priorisiert, woran zu arbeiten ist, mit Deep-Links.
5. **Stufe X** → Kerngedanke → Lektion (echtes Video oder ehrlich keins) → **direkt daneben** die passende Praxis und die passende Vertiefung, nicht in fernen Silos.
6. **Übung** → durchführen, danach ein „Was hast du bemerkt?"-Feld, das **automatisch ins Journal** fließt.
7. **Reflexion/Journal** → der Eintrag markiert die Stufe weich als „bearbeitet" (Fortschritt aus echter Aktivität, nicht aus einem Häkchen).
8. **Fortschritt** → Stufe rückt einen Schritt weiter, die Serie zählt, ein dezenter Meilenstein wird gefeiert.
9. **Nächster Schritt** → das Cockpit schlägt beim nächsten Öffnen genau die nächste sinnvolle Handlung vor.
10. **Nächster Login** → „Heute schon zurückgekehrt?" + „Weiter mit Stufe X, Abschnitt 3" – nahtlos dort, wo man aufgehört hat.

In diesem Bild sind die 7 Stufen das tragende Betriebssystem; Vertiefungen, Praxis, Wissensdatenbank, Detektor und Begleiter sind **kontextbezogene Werkzeuge entlang des Wegs**, nicht konkurrierende Bibliotheken daneben.

---

## J. Maßnahmenplan (3 Phasen)

### Phase 1 – sofort: größte Probleme & Quick Wins
- `placeholderVideoId: null` setzen (🔴, Einzeiler) – ehrlicher „folgt in Kürze"-Zustand überall.
- Code↔Copy-Widerspruch bei der Test-Startstufe auflösen (🔴): Anker personalisieren **oder** Zusage entfernen.
- „Mitgliedschaft"/„Erstgespräch" für Eingeloggte ausblenden; Willkommensvideo nur bei 0 % Fortschritt.
- `practicesForStage()` auf der Stufenseite verlinken; `JournalReflection` für Praxis freischalten (DB kann es).
- Stripe-Kundenportal-Link in die Einstellungen; Detektor-Link an `isDetektorConfigured`; Test-Prozentformel vereinheitlichen.

### Phase 2 – optimieren: UX, Struktur & Nutzerführung
- Persistente Mitglieder-Navigation einführen; Marketing-Header im Bezahlbereich ersetzen.
- Dashboard vom Index zum Cockpit umbauen (kuratieren + Bibliotheken auslagern, Featured aus Ebene 1 nehmen, doppeltes Intro entfernen).
- Momentum-Reihe (Serie/21-Tage/zuletzt) + „Zuletzt angesehen"-Resume in den Hero.
- Zwei Bibliotheken entwirren (klare Rollen, wechselseitige Links, Gelesen-Status + Reflexion für Wissenskapitel).
- Journal an reflexionsstärksten Stellen anbieten (Praxis/Programm/Rückkehr) + Filter/Suche; Diagnose-Werkzeuge kontextuell verlinken.
- Post-Kauf-Flow absichern (session_id prüfen, „Mail erneut senden").
- Zeit-/Aufwandsangaben pro Stufe; Abschnitts-Anker & Resume innerhalb der Stufe.

### Phase 3 – ausbauen: Personalisierung, Motivation & weiterführende Funktionen
- Echte Videos für Stufen, Vertiefungen und Praxis produzieren und einpflegen.
- Fortschritt aus echter Aktivität ableiten (Reflexion/Praxis → Stufe „bearbeitet"), Schema voll nutzen.
- Vertiefungs-Index personalisieren („Empfohlen für Stufe X", Stufen-Badges, Erledigt-Status, Filter).
- Wenige, erwachsene, übergreifende Meilensteine.
- Test-Methodik härten (Umkehr-Items, gemischte Reihenfolge, „zwischen Stufe X und Y"); personalisierter Einstieg für Anonyme.
- Kern-Kategorien der Vertiefungen ausbauen, damit alle 7 Stufen gleichmäßig abgedeckt sind.

---

### Entscheidender Maßstab

> Das Ziel ist nicht, möglichst viele Funktionen einzubauen. Ein Mitglied loggt sich ein und soll möglichst wenig darüber nachdenken müssen, *wie die Plattform funktioniert* – seine Aufmerksamkeit soll auf seiner eigenen Entwicklung liegen.

Gemessen daran ist der Bereich heute **inhaltlich reif, aber strukturell noch selbsterklärungsbedürftig**: Der Nutzer muss zu oft selbst herausfinden, was als Nächstes dran ist, wo er weiterschreibt und warum ein Inhalt gerade jetzt zählt. Die gute Nachricht: Die Bausteine für die Antwort sind fast alle schon da – sie müssen verdrahtet, kuratiert und an einer Stelle (Videos) ehrlich gemacht werden. Der Hebel liegt in Verzahnung und Führung, nicht in neuem Content.
