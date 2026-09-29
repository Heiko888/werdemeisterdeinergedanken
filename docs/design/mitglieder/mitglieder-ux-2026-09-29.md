# Mitglieder-UX-Review – geschützter Bereich `/mitglieder/*`

**Datum:** 2026-09-29 · **Team:** Mitglieder-UX-Team (erster Durchlauf, `/mitglieder-design`)
**Beteiligt:** nutzerreise-designer · navigations-architekt · motivations-designer · mitglieder-ui-designer · luecken-scout · Zusammenführung: mitglieder-ux-lead
**Methode:** Code-Review (kein Produktivcode geändert), Abgleich mit `docs/audit/mitgliederbereich-ux-audit-2026-08-26.md` und `docs/AENDERUNGEN.md`. Jeder Fund ist am Code belegt; eine eingeloggte Sichtprüfung (Playwright) steht noch aus – siehe Ende.

---

## 1. Gesamteindruck

Seit dem Audit vom 26.08. ist viel passiert: Mitglieder-Navigation, Momentum-Reihe, Startstufe aus dem Test, Praxis-Reflexion ins Journal, kuratiertes Dashboard, Gelesen-Status – die **Verzahnung** ist deutlich besser. Inhaltlich und technisch ist der Bereich stark.

Das Gefühl „irgendwie fehlt noch was" hat trotzdem einen klaren Grund: **Der Bereich ist ein sehr gutes Buch, aber noch keine Begleitung.** Es fehlt, was zwischen Mensch und Mitglied passiert – Heikos Stimme und Gesicht, ein Takt für den Alltag, würdige Momente am Ende einer Etappe und das Gefühl, nicht allein zu sein. Dazu kommen zwei harte Lücken an den Rändern der Reise (erster Login und Kündigung).

### Was fehlt? – die direkte Antwort

1. **Heikos Stimme und Gesicht.** Keine einzige Übung ist zum Anhören da (der Audio-Player ist fertig gebaut, aber leer), und wo ein Video steht, läuft überall derselbe fremde Platzhalter. Der Mentor ist praktisch unsichtbar – nur ein Satz „Schreib mir" mit Link zum Kontaktformular.
2. **Ein Takt für den Alltag.** Es gibt kein „Heute dran (5 Min.)", keine Zeitangaben pro Stufe, keine Erinnerung außer einer standardmäßig abgeschalteten Wochen-Mail. Das 21-Tage-Programm – der eigentliche Tagesrhythmus – versteckt sich als Kachel im Werkzeugkasten.
3. **Würdige Abschluss-Momente.** Stufe geschafft = ein Häkchen (das man vor dem Inhalt setzen kann), 21 Tage geschafft = ein Satz, alle 7 Stufen = ein Link zum Journal. Kein Rückblick, kein „Du vor 30 Tagen", kein Danach.
4. **Soforthilfe & Wiederfinden.** Kein Einstieg „Was ist gerade los?" (Grübeln, Stress, Streit, Einschlafen), keine Suche, keine Merkliste, kein „Zuletzt gemacht".
5. **Die Ränder der Reise.** Der erste Login nach dem Kauf endet sehr wahrscheinlich in einer Sackgasse, und Kündigen/Rechnungen sind im Bereich nicht möglich – obwohl „jederzeit kündbar" versprochen wird.

---

## 2. Status Alt-Audit (Top-10 vom 26.08.)

| # | Problem damals | Heute | Beleg |
|:-:|---|:-:|---|
| 1 | Platzhalter-Video hinter gebrandeten Postern | ⏳ offen | `src/lib/site.ts:34` weiterhin `placeholderVideoId: "gOvtKBnqGvk"` |
| 2 | Test-Startstufe personalisiert „Hier weitermachen" nicht | ✅ | `mitglieder/page.tsx:184-197` |
| 3 | Keine Mitglieder-Navigation | ✅ (neue Schwächen, s. u.) | `MemberNav.tsx`, `layout.tsx:58`, Header bereinigt |
| 4 | Praxis ohne Ergebnis/Journal; Stufe ohne Praxis-Link | ✅ | `praxis/[slug]/page.tsx:159-178`, `stufe/[nr]/page.tsx:190-222` |
| 5 | Dashboard schüttet Bibliothek aus | ◐ teilweise | kuratiert auf 3+3 (`page.tsx:207-208`), aber weiter 8 Sektionen, Video vor dem Anker |
| 6 | Zwei namensgleiche Bibliotheken | ◐ teilweise | Rollen-Querkarten + 4 Brücken (`library-links.ts`); Labels widersprechen sich noch |
| 7 | Fortschritt = Selbst-Häkchen; Momentum unsichtbar | ◐ teilweise | Momentum ✅, „Begonnen" aus Aktivität ✅; Häkchen steht weiter vor dem Inhalt (`stufe/[nr]/page.tsx:86-87`) |
| 8 | Wissensdatenbank ohne Fortschritt/Reflexion | ◐ teilweise | Gelesen-Status ✅ (Migration 0014); keine Reflexion, 23/27 Kapitel ohne Stufen-Brücke |
| 9 | Detektor/Muster-Spiegel schlecht auffindbar | ◐ teilweise | Detektor-Verlauf ✅; Werkzeuge weiter nur ganz unten im Dashboard |
| 10 | Post-Kauf ohne Self-Service; kein Abo-Portal | ⏳ offen | kein `billingPortal`, kein „Passwort vergessen" |

---

## 3. Quick Wins (wenig Aufwand, große Wirkung)

1. **`placeholderVideoId: null`** in `src/lib/site.ts:34` – überall erscheint dann der ehrliche „folgt in Kürze"-Zustand. Den Platzhalter optisch aufwerten (dunkler Verlauf + abgedunkeltes Poster + Schild „In Produktion") statt gestrichelter Box.
2. **Willkommensvideo nur für Neue** (`completedCount === 0 && started.size === 0`) und **„Hier weitermachen" direkt unter den Kopf** ziehen (`page.tsx:335-446`).
3. **Stufen-Häkchen ans Seitenende** hinter die Reflexion, ehrlicher Text „Ich habe mit dieser Stufe gearbeitet" + kurze Rückmeldung nach dem Klick (`stufe/[nr]/page.tsx:86-87`, `StageCompleteToggle.tsx:79`).
4. **„Heute"-Streifen im Dashboard**: Tagesimpuls + Knopf „Heute zurückkehren" (Server-Action `markiereRueckkehr` existiert) bzw. „Programm Tag N · 5 Min.".
5. **Mitglieder-Footer**: im Bereich den Marketing-Footer (inkl. „Mitgliedschaft") durch einen schlanken Footer ersetzen (Rechtliches, Hilfe/Kontakt, Zur Website) – `Footer.tsx:46-66`.
6. **Kleine Wegführungs-Fixes**: „Zur Übersicht" auf Praxis/Vertiefung zeigt auf `/mitglieder` statt auf die Bibliothek (`praxis/[slug]/page.tsx:201`, `wissen/[slug]/page.tsx:317`); Programm-Ende verlinkt die Rückkehr (`ProgrammBegleiter.tsx:97-101`); leeres Journal nutzt die Startstufe statt „Stufe 1" (`journal/page.tsx:273-277`); Journal-Texte nennen die Praxis als Quelle.

---

## 4. Funde nach Schweregrad

### 🔴 Kritisch

**R1 · Erster Login nach dem Kauf: sehr wahrscheinlich Sackgasse** *(nutzerreise-designer, vom Lead am Code gegengeprüft)*
- `src/app/api/stripe/webhook/route.ts:310-313`: `generateLink({ type: "recovery", redirectTo: \`${site.url}/login\` })`. Ein per Admin-API erzeugter Link liefert die Session als `#access_token` im URL-Fragment.
- Nichts liest dieses Fragment: `/auth/callback` verarbeitet nur `?code=` (`src/app/auth/callback/route.ts`), `/login` zeigt nur „Willkommen zurück" + Login-Formular; es gibt weder „Passwort setzen" noch „Passwort vergessen" (`AuthForm.tsx`; `updateUser({ password })` existiert nur in den Einstellungen, `mitglieder/actions.ts:519`, also erst *nach* dem Login).
- **Wirkung:** Ein neuer Käufer hat kein Passwort und keinen Selbsthilfe-Weg – im euphorischsten Moment.
- **Vorschlag:** neue Route `/passwort-setzen` (Client liest Session aus dem Hash → `updateUser({ password })` → `/mitglieder?erstbesuch=1`), `redirectTo` dorthin; „Passwort vergessen?" in `AuthForm` (`resetPasswordForEmail`); `/login`-Titel neutral „Anmelden". **Unbedingt mit einem echten Testkauf bestätigen.**

**R2 · Kündigung/Rechnungen nicht selbst verwaltbar** *(nutzerreise, luecken-scout)*
- Konto-Karte zeigt nur E-Mail + Abmelden (`einstellungen/page.tsx:111-127`), kein `billingPortal` im Code – obwohl „jederzeit kündbar" (`mitgliedschaft/page.tsx:188`), „hörst einfach auf" (`sequences.ts:139`) und „7 Tage testen" (`ConsciousnessTest.tsx:331`) versprochen werden. Kündigungsbutton ist in DE für Online-Abos Pflicht (§ 312k BGB).
- **Vorschlag:** Karte „Mitgliedschaft" mit Status, „läuft bis", Knopf zum Stripe-Kundenportal (`stripe_customer_id` liegt vor, `0007_membership.sql`). „7 Tage testen" entweder umsetzen oder aus der Copy nehmen.

**R3 · Platzhalter-Video überall** *(alle fünf)* – siehe Quick Win 1. Zusätzlich verspricht `page.tsx:345-351` „In zwei Minuten zeige ich dir, wie du dich hier zurechtfindest".

**R4 · Keine Lade-/Fehlerzustände, Datenverlust-Risiko beim Schreiben** *(mitglieder-ui-designer)*
- Kein `loading.tsx`/`error.tsx` unter `src/app/mitglieder/`; Dashboard macht ~10 Abfragen nacheinander (`page.tsx:65-170`) → nach Nav-Klick passiert sichtbar nichts.
- `JournalReflection.tsx:73-79`: Speicherfehler verschwindet still, bei Netzfehler hängt „Speichert …" ewig; `:41` schaltet das Feld auch frei, wenn das Laden scheitert → Tippen überschreibt die gespeicherte Antwort.
- **Vorschlag:** `loading.tsx` (Skeleton) + `error.tsx` (ruhige Karte mit `reset()`), Abfragen per `Promise.all`; Zustand `"error"` mit „Nicht gespeichert – erneut versuchen"; bei Ladefehler `readOnly`. Token `--color-danger` einführen.

**R5 · Heiko als Mentor unsichtbar** *(motivations-designer, luecken-scout)*
- Einziger persönlicher Bezug: `stufe/[nr]/page.tsx:296-308` („ich bin jederzeit für dich da" → `/kontakt`). Keine Botschaft, keine Neuigkeiten, keine Live-/Q&A-Termine.
- **Vorschlag:** Dashboard-Karte „Von Heiko" (ein Gedanke pro Monat + nächster Q&A-Termin + „Frage einreichen"). Beispiel: *„Diesen Monat beschäftigt mich, warum Zurückkommen leichter ist als Durchhalten. Am 14. Oktober beantworte ich eure Fragen live – schick mir deine vorab."*

### 🟠 Merklich

**O1 · Kein Alltagstakt** – kein Dauer-Feld in `StageLesson` (`stage-lessons.ts:19-35`), Programm nur als Werkzeug-Kachel (`page.tsx:228-232`), Wochen-Impuls `default false` (`0004_newsletter.sql:16`) und nicht an die eigene Stufe angepasst (`impulses.ts`). → Aufwand pro Stufe („ca. 25 Min. lesen + 1 Woche üben"), Empfehlung „eine Stufe pro Woche", Programm für Neue aktiv anbieten, Impuls beim ersten Login anbieten und an `start_stage`/aktuelle Stufe koppeln.

**O2 · Keine Abschluss-Momente** – `StageCompleteToggle.tsx:64-71` ohne Rückmeldung, `ProgrammBegleiter.tsx:97-101` ein Satz, `page.tsx:376-395` nur Journal-Link; Stufe 7 zeigt „Geschafft" unabhängig vom Stand (`stufe/[nr]/page.tsx:345-360`). → Nach jeder Stufe: eigener Leitsatz + eigene erste Reflexion („Was ist heute anders?"); nach 21 Tagen Übergang zur täglichen Rückkehr; nach 7 Stufen „Reise-Chronik" (Journal-Druck existiert), Wiederholungstest, persönliche Botschaft.

**O3 · Test vor dem Kauf geht verloren** – `ebook_leads.stufe` wird beim Kauf nicht nach `profiles.start_stage` übernommen; Dashboard bittet erneut um den Test (`page.tsx:429-440`); Willkommensseite widerspricht sich (`willkommen/page.tsx:25-28`). → Übernahme in `provisionAccess`.

**O4 · Navigation** *(navigations-architekt, ui-designer)*
- Die 7 Stufen fehlen in der `MemberNav`; auf `/stufe/*`, `/gedankenprofil`, `/detektor`, `/begleiter`, `/rueckkehr` ist kein Eintrag aktiv (`MemberNav.tsx:20-42`); keine Übersicht `/mitglieder/stufe` (404).
- Mobil: 6 Pillen (~560 px) auf ~350 px ohne Hinweis auf mehr; aktive Pille kann außerhalb liegen (`MemberNav.tsx:51-52`).
- Werkzeuge (Rückkehr, Gedankenprofil, Detektor, Arbeitsheft) nur ganz unten im Dashboard verlinkt – fast Waisen.
- **Soll:** Mein Weg (inkl. Stufen, 21 Tage) · Üben (inkl. Rückkehr) · Journal · Wissen (Tabs Vertiefungen / Nachschlagen / Glossar) · Werkzeuge · Konto-Icon. Fade-Maske rechts + aktives Element in den sichtbaren Bereich scrollen.

**O5 · Begriffe widersprechen sich** – „Wissen" (Nav) = Vertiefungen, Seite heißt „Die Vertiefungen", Eyebrow „Wissens-Bibliothek"; Vertiefungen nennen sich ebenfalls „zum Nachschlagen" (`wissen/page.tsx:17,40`); „Programm" wird als 7-Stufen-Programm gelesen; „Tägliche Rückkehr" gibt es zweimal (Werkzeug + Praxis). → Label „21 Tage", „Nachschlagen" nur für die Wissensdatenbank.

**O6 · Keine Suche, Merkliste, „Zuletzt gemacht"** – nur im Admin (`BibliothekBrowser.tsx`, wiederverwendbar). → Reihenfolge: „Zuletzt gemacht" im Cockpit → gemeinsame Client-Suche (statische Daten) → Merkliste (neuer `item_type`/`status` in `progress`).

**O7 · Dashboard ist noch eine Liste, kein Cockpit** – 8 gleich gebaute Sektionen, Dopplungen (Einstellungen im Kopf + Nav, Newsletter-Box + Einstellungen `page.tsx:551-571`, Wissensdatenbank zweimal). → Newsletter raus, Werkzeugkasten nur mit Nicht-Nav-Zielen, Vertiefungen + Praxis zu „Passend zu Stufe N" zusammenlegen.

**O8 · Innen sieht teils aus wie draußen** – `praxis`, `wissen`, `wissensdatenbank`, `wissensdatenbank/[slug]` nutzen den öffentlichen `PageHero` (zentriert, bis 40 rem hoch), der Rest `member-hero`/`LessonHero`; fünf verschiedene Rücklink-Texte; keine Breadcrumbs. → Im Bereich nur `LessonHero`, Breadcrumb-Zeile, Rücklinks zur Eltern-Übersicht.

**O9 · Stille Fehler beim Abhaken** – `programm-actions.ts:55-75` ignoriert DB-Fehler; `TaeglicheRueckkehr.tsx:91-100`, `NewsletterToggle.tsx:20` rollen still zurück. KI-Panels (Detektor, Muster-Spiegel, Reading) zeigen beim Laden nur Button-Text. → `{ok:false}` + sichtbare Zeile; Skeleton im Ergebnisbereich.

**O10 · Schreibfläche & Formulare** – Reflexionsfeld `text-[0.98rem]` (< 16 px → iOS-Zoom), `rows={3}`, kein `<label>`, Haken-Icon wirkt wie „erledigt" (`JournalReflection.tsx:97-109`). Einstellungen mit drei Button-Formen. → `text-base`, `rows={5}`, Label, Fragenummer; alle Aktionen über `<Button>`.

**O11 · Begleiter-Overlay mobil** – kein echtes Sheet, keine Abdunklung/Scroll-Sperre trotz `aria-modal` (`BegleiterLauncher.tsx:96`); kein Krisenhinweis im Overlay (nur auf `/begleiter`). → Bottom-Sheet `h-[88dvh]`, Backdrop, Fußzeile „KI · keine Therapie · Krise: 0800 111 0 111".

**O12 · Mobil ~137 px fest oben belegt** (Header 72 + MemberNav ~65), unten rechts zwei goldene Schwebe-Buttons übereinander (`BackToTop.tsx:52-54` + Launcher). → Header im Bereich mobil `h-14`, Nav beim Scrollen ausblenden; BackToTop im Bereich neutral.

**O13 · Stufen 5–7 werden dünner statt tiefer** – Vertiefungen/Praxis pro Stufe: 1 → 8/1, 3 → 9/2, 5 → 1/1, 6 → 2/2, 7 → 1/1. → Für 5–7 je 2–3 Einheiten ergänzen, Rückgriff auf frühere eigene Journal-Einträge, Begleiter ab Stufe 5 aktiv anbieten.

**O14 · Mail-Kanal verstummt nach dem Kauf** – Verkaufsstrecke nimmt Mitglieder zu Recht aus (`sequence-mailer.ts:187-193`), eine Begleitstrecke fehlt. → Tag 1 / 3 / 7 + eine sanfte Wiederkehr-Mail nach 10 Tagen Inaktivität.

**O15 · Wachstumskurve nutzt nur die Schwerpunkt-Stufe**, obwohl `test_results.scores` je Stufe gespeichert ist (`0006_test_history.sql`, `actions.ts:369-379`). → Vorher/Nachher je Stufe im Gedankenprofil; datierte Einladung zum Wiederholungstest nach ~6 Wochen.

**O16 · Footer & Ausstiege** – Marketing-Footer inkl. „Mitgliedschaft" im Bereich (`Footer.tsx:46-66`); Links zum Bewusstseinstest/Kontakt holen die volle Marketing-Nav zurück (Header entscheidet nach Pfad, `Header.tsx:30`). → Login-Status statt Pfad auswerten.

**O17 · Wissensdatenbank-Brücken** – 23 von 27 Kapiteln ohne Bezug zu Stufe/Vertiefung (`library-links.ts:13-21`); Detektor ↔ Selbstverteidigungs-Vertiefungen nur in eine Richtung. → `relatedStage` pro Kapitel, „Prüf einen Text im Detektor" in der Kategorie.

### 🟡 Feinschliff

- Kein „Willkommen zurück" nach Pause, obwohl `lastActivity` berechnet wird (`page.tsx:145-160, 270-279`).
- „0 Tage in Folge" groß angezeigt (`TaeglicheRueckkehr.tsx:119-126`) → „Heute ist ein guter Tag zum Zurückkommen".
- „Zuletzt aktiv" ignoriert Übungen/Programm-Tage; kein Übungs-Chip in `MomentumRow`.
- `gedankenprofil.ts:121` „Du bist bei Tag X" meint erledigte Tage.
- Kopf „Stufe 4 von 7" neben „0 %" bei höherer Startstufe; übersprungene Stufen wirken „nicht gemacht" (`page.tsx:306-311, 470-481`).
- Stufenseite verweist bei Fragen aufs Kontaktformular statt auf den Begleiter (`stufe/[nr]/page.tsx:295-308`).
- Programm und Rückkehr ohne Reflexionsfeld; Praxis-Übersicht ohne Stufen-Badge/„gemacht"-Häkchen; Vertiefungs-Index ohne Filter/Erledigt-Status (Vertiefungen haben keinen Fortschritt, obwohl das Schema es erlaubt).
- Willkommensseite zeigt „Zahlung erfolgreich" auch ohne gültige `session_id`, „melde dich kurz bei uns" unverlinkt (`willkommen/page.tsx:50-95`).
- Abmelden 3×, Einstellungen 2× vorhanden; Hamburger im Bereich nur mit 2 Punkten (`Header.tsx:166-180`).
- Hohe leere Kopfbereiche auf Detektor/Gedankenprofil (`min-h-[34rem]`); warme `bg-paper`-Flächen auf kühlem `mist-50`-Grund.
- Statusmeldungen („Gespeichert.") bleiben dauerhaft stehen; Fehler sehen aus wie neutrale Hinweise, `text-red-600` hart kodiert.
- Chat: Enter sendet auch mobil, Tastatur-Hinweis mobil sinnlos, „Gespräch löschen" ohne Rückfrage und < 44 px.
- Konsistenz: 41 nachgebaute Karten statt `<Card>`, vier Fortschrittsbalken-Stile (→ `<ProgressBar>`), Werkzeug-Icons mehrdeutig (`Spark` 3×), Hauptknopf nachgebaut statt `<Button variant="accent">`.

---

## 5. Fehlende Bausteine (Feature-Ideen)

| # | Baustein | Nutzen fürs Mitglied | Aufwand | Vorarbeit im Code |
|:-:|---|---|:-:|---|
| 1 | **Geführte Audios** für die 14 Praxis-Übungen (Heiko spricht, mit Download) | „Ich höre statt abzulesen" – Kern einer Achtsamkeits-Begleitung | M (Aufnahme) / S (Code) | Player + Feld fertig (`praxis/[slug]/page.tsx:89-104`, `practices.ts:33-34`), Sprechtexte als `steps` |
| 2 | **Abo-Selbstverwaltung** (Stripe-Portal) | Vertrauen, Pflicht | S | `stripe_customer_id`, `getMembershipForUser`, `src/lib/stripe.ts` |
| 3 | **Passwort setzen / vergessen** | Überhaupt hineinkommen | S | Supabase-Client, `updateUser` |
| 4 | **Soforthilfe „Was ist gerade los?"** (Grübeln, Stress, Streit, Einschlafen → 3-Min.-Übung + Vertiefung + Krisennummern) | Hilfe in zwei Taps im akuten Moment | S–M | `when`-Felder in `practices.ts`, Vertiefung Grübeln, Krisentexte im Begleiter-Prompt |
| 5 | **„Heute"-Karte + persönliche Erinnerungen** (Mail zur Wunschzeit, `.ics` für 21 Tage) | Takt, Gewohnheit | M | Rückkehr-Action, Resend-Mailer, `impuls-cron` |
| 6 | **„Von Heiko"** (Monatsgedanke, Live-Q&A-Termine, Frage einreichen) + echtes Willkommensvideo | Beziehung = stärkster Bleibe-Grund | S (Code) / laufend (Inhalt) | `VideoEmbed`, Poster, Kontakt-Themen |
| 7 | **„Mein Weg"** – Rückblick auf alles Erledigte, 4–5 erwachsene Meilensteine, „Du vor 30 Tagen", Vorher/Nachher je Stufe | Fortschritt fühlbar machen | M | `progress` (5 `item_type`s), `notes`, `rueckkehr`, `test_results.scores`, `TestCurve` |
| 8 | **Suche + Merkliste + Zuletzt gemacht** | Wiederfinden | M | `BibliothekBrowser` (Admin), statische Inhaltsdaten |
| 9 | **Daten-Export & Konto löschen**, Hilfe/FAQ im Bereich | Kontrolle über intime Daten | S–M | Kaskaden-Löschung, CSV-Export-Muster, `PrintButton` |
| 10 | **Mitglieder-Onboarding-Mails** (Tag 1/3/7, Wiederkehr) | Kein Verstummen nach dem Kauf | M | `sequence-mailer.ts` |
| 11 | **Anonyme Zugehörigkeit** („Diese Woche sind 132 Menschen hier zurückgekehrt.") | „Ich bin nicht allein" – ohne Rangliste | S | Aggregat aus `rueckkehr` |
| 12 | PWA („Zum Home-Bildschirm"), Abendmodus (dunkel) | App-Gefühl, Abendnutzung | S–M | – |

---

## 6. Roadmap-Vorschlag

**Welle 1 – sofort (Vertrauen & Ränder, je S):**
Passwort setzen/vergessen (R1, mit Testkauf prüfen) · Stripe-Kundenportal (R2) · `placeholderVideoId: null` + schönerer Platzhalter (R3) · `loading.tsx`/`error.tsx` + Fehlerzustand im Autosave (R4) · Video nur für Neue, Anker nach oben · Häkchen ans Stufenende · Mitglieder-Footer · kleine Wegführungs-Fixes (Quick Win 6).

**Welle 2 – nächste 2–4 Wochen (Takt & Orientierung):**
„Heute"-Streifen + Zeitangaben pro Stufe · Programm aktiv für Neue · Lead-Stufe beim Kauf übernehmen · MemberNav neu schneiden (Mein Weg / Üben / Journal / Wissen / Werkzeuge) + Stufen-Übersicht + Breadcrumbs · `PageHero` im Bereich ersetzen · Abschluss-Momente (Stufe, 21 Tage, 7 Stufen) · Begleiter-Sheet mobil + Krisenhinweis · Soforthilfe-Kachel · Onboarding-Mails Tag 1/3/7.

**Welle 3 – später (Stimme & Tiefe):**
Geführte Audios · echtes Willkommensvideo + Stufen-Intros · „Von Heiko" mit Live-Q&A · „Mein Weg" mit Meilensteinen und Vorher/Nachher · Suche + Merkliste · Inhalte für Stufen 5–7 ausbauen · Daten-Export/Konto löschen · PWA/Abendmodus.

---

## 7. Die 3 wirkungsvollsten nächsten Schritte

1. **Die Ränder dicht machen:** Passwort-Flow reparieren (nach Testkauf) und Stripe-Kundenportal einbauen. Ohne das verliert man Mitglieder am Anfang und Vertrauen am Ende.
2. **Ehrlich und ruhig statt Attrappe:** Platzhalter-Video aus, Lade-/Fehlerzustände rein, Dashboard beginnt mit „Hier weitermachen" + „Heute".
3. **Heikos Stimme hineinbringen:** mit 3–4 eingesprochenen Übungen und einem echten 2-Minuten-Willkommen anfangen – der Player wartet schon. Das ist das „eine Ding", das am meisten fehlt.

## 8. Eingeloggte Sichtprüfung (Playwright, 390 px + 1440 px) empfohlen für

`/mitglieder` (erster Bildschirm, langer Name, Schwebe-Buttons, offenes Begleiter-Overlay mit iOS-Tastatur) · `/mitglieder/stufe/1` (Häkchen-Position, iOS-Zoom im Reflexionsfeld) · `/mitglieder/journal` (Kennzahlen bei 390 px, leer/gefüllt) · `/mitglieder/einstellungen` (Button-Mix, aktive Pille außerhalb) · `/mitglieder/programm` + `/rueckkehr` (Abhaken bei gedrosseltem Netz) · `/mitglieder/praxis`, `/wissen`, `/wissensdatenbank/[slug]` (`PageHero` vs. `member-hero`) · Seitenwechsel mit 3G-Drosselung · **kompletter Testkauf bis zum ersten Login**.
