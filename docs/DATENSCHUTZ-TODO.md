# Datenschutz – offene Abgleiche (intern)

Interne TODO-Liste: Welche **tatsächlich im Code eingesetzten** externen Dienste
müssen mit der Datenschutzerklärung (`src/app/datenschutz/page.tsx`) noch
vollständig abgeglichen werden? Hier stehen bewusst **keine** fertigen
Klauseln – nur, was geprüft werden muss. Anbieterdaten (Firma, Anschrift,
Drittlandtransfer, AV-Vertrag) bitte aus den Verträgen bzw. Unterlagen der
Anbieter übernehmen, nicht raten.

Stand: 2026-10-03 · Grundlage: Code-Durchsicht (`package.json`,
`src/`, `.env.local.example`).

---

## Bereits am 2026-10-03 korrigiert

- `TTDSG` → `TDDDG` (2×, Cookie-Abschnitt).
- „Lernfortschritt“ → „Nutzungsfortschritt“ (Supabase-Abschnitt).
- Aufsichtsbehörde → Bayerisches Landesamt für Datenschutzaufsicht, Promenade 18,
  91522 Ansbach (ohne Link/Telefon/E-Mail – nicht im Projekt hinterlegt).
- Falsche Querverweise in Punkt 8 (Resend = Punkt 9, Supabase = Punkt 10).

## Am 2026-10-03 ergänzt (zweiter Schritt)

Neue Abschnitte, beschrieben nach dem, was der Code tatsächlich tut:
7 Meta-Pixel, 8 YouTube-Videos, 13 Stripe, 14 KI-Funktionen (Anthropic).
Nummerierung und Querverweise angepasst (jetzt 1–17); Cookie-Abschnitt nennt
den Meta-Pixel und die Cookies, die beim Widerruf gelöscht werden; die
Supabase-Liste nennt KI-Ergebnisse und Buchbestellungen.

**Noch selbst zu prüfen** (stehen bewusst nicht als Behauptung im Text):
- Vertragspartner bei Anthropic (Anthropic PBC oder eine EU-Gesellschaft),
  Grundlage der USA-Übermittlung (z. B. Standardvertragsklauseln, DPF),
  Aufbewahrungsdauer bei Anthropic, Nutzung der Daten zum Training.
- Art. 9 DSGVO: Journal-Reflexionen können Gesundheitsangaben enthalten.
  Klären, ob für den Muster-Spiegel eine ausdrückliche Einwilligung nötig ist
  (dann Rechtsgrundlage und Text vor dem Button anpassen).
- Meta-Pixel: gemeinsame Verantwortlichkeit mit Meta (Art. 26 DSGVO) und
  Grundlage der USA-Übermittlung.
- ~~Test-Stufe an Meta und GA~~ – erledigt 2026-10-05: `test_complete` ohne
  Parameter, nur noch an GA; `generate_lead` aus dem Test ohne Stufe; Meta
  bekommt `test_complete` gar nicht. Punkte 6 und 7 angepasst.
- ~~YouTube-Vorschaubild auf der Startseite~~ – erledigt 2026-10-03:
  `MaybeNotYou.tsx` nutzt immer das lokale Cover
  `public/video-thumbnails/landing/ein-anderer-blickwinkel.png`; vor dem Klick
  wird nichts mehr von YouTube geladen. Punkt 8 entsprechend angepasst.
- Stripe: Rolle (eigener Verantwortlicher für Zahlungsdaten), Grundlage der
  USA-Übermittlung, Aufbewahrungsfristen für Bestellungen in `book_orders`.
- Datenschutz-Links der Anbieter (Meta, Stripe, Anthropic) einmal aufrufen und
  auf Aktualität prüfen.
- Sobald die Mitgliedschaft buchbar ist: Stripe-Abschnitt um das Abo ergänzen.
- Vor Einschalten von `KI_BEGLEITER_ENABLED` / `KI_READING_ENABLED`:
  Punkt 14 ergänzen (Begleiter sendet zusätzlich Vorname, Profilwerte,
  Journal-Auszüge, Gesprächsverlauf sowie gespeicherte Spiegeltexte und
  Detektor-Ergebnisse).

## Am 2026-10-07: Punkt 14 für die KI-Werkzeuge neu geschrieben

Grundlage (Angaben des Betreibers + öffentliche Anthropic-Unterlagen, abgerufen
2026-10-07):
- Vertrag: Anthropic **Commercial Terms** mit einbezogenem **DPA**
  (anthropic.com/legal/commercial-terms, …/data-processing-addendum).
- Vertragspartner für Kunden im EWR: **Anthropic Ireland, Limited**.
- Anthropic ist **Auftragsverarbeiter**; Drittlandübermittlung über
  **EU-Standardvertragsklauseln** (Module 2/3). Das DPA erwähnt das
  EU-US Data Privacy Framework **nicht** – deshalb nicht genannt.
- **Kein Training** auf Kundeninhalten („Anthropic may not train models on
  Customer Content from Services.“).
- **Speicherdauer bei Anthropic:** Das DPA nennt keine feste Frist (nur
  Löschung binnen 30 Tagen nach Vertragsende). Deshalb steht in Punkt 14
  **keine** Frist. Bei Bedarf in der Anthropic-Konsole/den Unterlagen klären
  und nachtragen.
- Rechtsgrundlage (Entscheidung Betreiber): **Einwilligung** Art. 6 Abs. 1
  lit. a, für mögliche Gesundheitsangaben Art. 9 Abs. 2 lit. a DSGVO.
- Text bewusst so formuliert („wenn du ein Werkzeug startest …“), dass er
  auch stimmt, solange die Schalter aus sind.

**Noch offen vor dem Einschalten:**
- ~~**Einwilligung in der Oberfläche**~~ – erledigt 2026-10-07: Hinweis direkt
  am Start-Element aller vier Werkzeuge („Mit dem Senden/Klick willigst du
  ein, dass … an Anthropic übertragen wird“, bei Begleiter und Spiegel mit
  Gesundheitsangaben, Widerruf, Link auf `/datenschutz#ki-werkzeuge`).
  Texte: `src/lib/ki-einwilligung.ts`, Komponente
  `src/components/members/KiEinwilligungsHinweis.tsx`, Tests
  `src/lib/ki-einwilligung.test.ts`. Es wird **keine** Einwilligung
  gespeichert (Button-Einwilligung je Nutzung). Falls ein Nachweis gewünscht
  ist: später einmalige Bestätigung mit Zeitstempel in Supabase (Migration
  nötig).
- Unterauftragsverarbeiter-Liste von Anthropic einmal ansehen.
- Prüfen, ob der DPA im Anthropic-Konto tatsächlich akzeptiert/abgeschlossen
  ist (nicht nur öffentlich verfügbar).
- Juristische Durchsicht des neuen Punkt 14 empfohlen.

## Am 2026-10-05: alle KI-Funktionen aus

Bis die Datenschutzgrundlage für Journalinhalte und Anthropic geklärt ist,
sind **alle vier KI-Funktionen abgeschaltet** (Begleiter, Reading,
Muster-Spiegel, Manipulations-Detektor; Schalter in `src/lib/ki-features.ts`,
Standard aus). Es gehen keine Nutzereingaben an Anthropic. Punkt 14 der
Erklärung sagt nur noch, dass die Funktionen vorbereitet, aber nicht aktiv sind
– **ohne** Angaben zu Vertragspartner, Speicherdauer, Training,
Drittlandtransfer oder Standardvertragsklauseln/DPF.

Vor dem Einschalten von `KI_MUSTER_SPIEGEL_ENABLED` bzw. `KI_DETEKTOR_ENABLED`:
- alle Anthropic-Fragen unten mit den tatsächlich für dieses Projekt geltenden
  Vertragsunterlagen beantworten,
- Art. 9 DSGVO für Journalinhalte klären (ausdrückliche Einwilligung?),
- Punkt 14 der Erklärung neu schreiben,
- den Hinweis im `MusterSpiegelPanel.tsx` (bereits vorbereitet: Übertragung an
  den KI-Dienstleister, keine Aussage zur Speicherung beim Anbieter) prüfen.
- Bereits gespeicherte Ergebnisse (`muster_spiegel`, `detektor_checks`) bleiben
  erhalten; ob sie aus früherer Nutzung stammen, in Supabase nachsehen.

## Offen – je Dienst

### Anthropic API (KI)
- **Im Code:** `@anthropic-ai/sdk`; Muster-Spiegel, Manipulations-Detektor,
  KI-Begleiter und KI-Reading – seit 2026-10-05 alle per Schalter **aus**.
- **In der Erklärung:** Punkt 14, nur als „vorbereitet, nicht aktiv“.
- Prüfen: Welche Daten gehen raus (Journal-Texte, Detektor-Eingaben,
  Profilwerte)? Rechtsgrundlage, Einwilligung vor dem Klick, Anbieter/Sitz,
  Drittlandtransfer, AV-Vertrag/Datenschutzbedingungen, Speicherdauer beim
  Anbieter, Speicherung der Ergebnisse in Supabase (`muster_spiegel`,
  `detektor_checks`, `gedanken_readings`, `begleiter_messages`).

### Stripe (Zahlungen)
- **Im Code:** `stripe`; `/api/buch-checkout` (Buchverkauf, aktiv),
  `/api/checkout` (Mitgliedschaft, derzeit gesperrt), `/api/stripe/webhook`.
- **In der Erklärung:** seit 2026-10-03 Punkt 13 (offene Fragen siehe oben).
- Prüfen: Rolle (eigener Verantwortlicher vs. Auftragsverarbeiter), übermittelte
  Daten (E-Mail, Zahlungsdaten bei Stripe), Rechtsgrundlage, Drittland,
  Aufbewahrung (steuerliche Pflichten).

### Supabase (Auth & Datenbank)
- **Im Code:** Login, Profile, Fortschritt, Journal, Test-Ergebnisse,
  Leads inkl. Test-Stufe (`ebook_leads`), Kontaktanfragen (`kontakt_anfragen`),
  Klarheitsgespräch-Fragebögen, Rate-Limits (IP-bezogen).
- **In der Erklärung:** vorhanden, aber unvollständig.
- Prüfen: Server-Standort „Frankfurt“ gegen das tatsächliche Projekt prüfen;
  Liste der gespeicherten Daten ergänzen (Kontaktanfragen, Test-Leads mit
  Test-Stufe, KI-Ergebnisse, Fragebögen, IP für Rate-Limiting);
  Speicherdauern je Tabelle; AV-Vertrag.

### Resend (E-Mail)
- **Im Code:** `resend`; Double-Opt-in, E-Book, Test-Ergebnis-Mails,
  E-Mail-Folgen (`src/lib/sequences.ts`), Kontakt-Benachrichtigung,
  Impulse-Mails, Buch-Download.
- **In der Erklärung:** vorhanden.
- Prüfen: Anbieterangaben, Drittlandtransfer und Rechtsgrundlage gegen die
  aktuellen Resend-Unterlagen; ob die automatisierten E-Mail-Folgen und
  Öffnungs-/Klick-Tracking (falls aktiv) beschrieben sind.

### Google Analytics 4
- **Im Code:** `src/components/analytics/GoogleAnalytics.tsx`, nur mit
  `NEXT_PUBLIC_GA_ID` und nach Einwilligung.
- **In der Erklärung:** vorhanden.
- Prüfen: Angaben zu Anbieter, Datenkategorien, Speicherdauer der Cookies,
  „IP-Anonymisierung“ (bei GA4 anders gelöst als bei Universal Analytics –
  Formulierung prüfen), Drittlandtransfer.

### Hetzner (Hosting)
- **Im Code/Doku:** Hosting laut Datenschutzerklärung.
- **In der Erklärung:** vorhanden.
- Prüfen: Anbieterangaben gegen den Vertrag, AV-Vertrag, tatsächliche
  Log-Speicherdauer (Erklärung nennt 14 Tage) gegen die Server-Konfiguration.

## Weitere im Code gefundene Dienste (nicht in der Aufgabenliste, aber zu prüfen)

- **Meta-Pixel** (`src/components/analytics/MetaPixel.tsx`): lädt nach
  Einwilligung, sobald `NEXT_PUBLIC_META_PIXEL_ID` gesetzt ist. Seit
  2026-10-03 Punkt 7 der Erklärung.
- **YouTube** (`youtube-nocookie.com`, Vorschaubilder direkt von `i.ytimg.com`)
  in `VideoEmbed.tsx` / `VideoMessage.tsx`: seit 2026-10-03 Punkt 8 der
  Erklärung. Geprüft: Im Mitgliederbereich eigene Vorschaubilder, auf der
  Startseite seit 2026-10-03 ebenfalls lokales Cover – vor dem Klick kein
  Kontakt zu YouTube.
- **Bewusstseinstest-Leads** (`/api/test-lead`): Speicherung von E-Mail und
  ermittelter Test-Stufe in `ebook_leads`, danach E-Mail-Folge – in Punkt 10 nur
  „Newsletter & E-Book“ genannt.
- **Kontaktformular**: Speicherung in Supabase (`kontakt_anfragen`) zusätzlich
  zur E-Mail – Speicherdauer fehlt.
