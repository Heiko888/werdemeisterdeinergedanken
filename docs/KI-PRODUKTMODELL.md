# WMDG KI-Werkzeuge – Produktmodell (intern)

> **Interne Arbeitsgrundlage, nicht zur Veröffentlichung.** Keine Rechtsberatung.
> Beschreibt die vier KI-Funktionen als eigenständige Werkzeuge, getrennt vom
> Stufen-/Wissensangebot, und bereitet eine spätere separate Freischaltung vor.
> Es wurde **nichts kommerziell umgesetzt**: keine Verkaufsseite, keine Preise,
> keine Stripe-Produkte, keine Migration, kein Feature-Flag aktiviert.

Stand: 2026-10-07 · Bezug: `docs/ZFU-KI-PRUEFUNG.md` (ZFU-Abgrenzung, Ampel),
`docs/RECHTLICHE-PRODUKTABGRENZUNG.md`, `docs/DATENSCHUTZ-TODO.md`,
`docs/AENDERUNGEN.md` (Eintrag vom selben Tag).

---

## 1. Zwei Produktbereiche

| WMDG Plattform | WMDG KI-Werkzeuge |
|---|---|
| 7 Stufen · Videos · Texte · Wissen/Vertiefungen · Praxis · Journal · freiwillige Reflexion · Selbsteinschätzung (Bewusstseinstest) · Nutzung im eigenen Tempo | Reflexionsbegleiter · Muster-Spiegel · Standortreflexion · Manipulations-Detektor |
| funktioniert vollständig **ohne** KI | optional, jedes Werkzeug einzeln abschaltbar |

Die KI-Werkzeuge liegen technisch weiter unter `/mitglieder/…` – das bleibt
vorerst so. Konzeptionell sind sie **kein Bestandteil der Stufen-Inhalte**,
sondern Werkzeuge daneben. Künftige Optionen (Entscheidung offen):

- **A)** Bestandteil einer Mitgliedschaft,
- **B)** separates Zusatzpaket zur Mitgliedschaft,
- **C)** einzeln erhältlich.

Für keines der Werkzeuge gilt: Prüfung, Korrektur, Benotung, Lernstand,
Zertifikat, Freischaltung nach Leistung (siehe `docs/ZFU-KI-PRUEFUNG.md`).

---

## 2. Die vier Werkzeuge

### 2.1 Reflexionsbegleiter (technisch: KI-Begleiter)

- **Zweck:** KI-gestützter Dialog zum Sortieren eigener Gedanken, Einordnen von
  Themen, Auffinden passender Perspektiven und – innerhalb der Mitgliedschaft –
  vorhandener WMDG-Inhalte. Erklärt Begriffe, fasst Inhalte zusammen, spiegelt,
  stellt offene Reflexionsfragen.
- **Ausdrücklich nicht:** Tutor · Wissenstest · Prüfungswerkzeug ·
  Lernerfolgskontrolle · Therapie · Diagnostik.
- **Code:** `src/app/mitglieder/begleiter/` (Seite, `actions.ts`,
  `antwort/route.ts`), `src/lib/begleiter.ts`, `src/lib/begleiter-prompt.ts`,
  `src/lib/ki-grenzen.ts`, `src/components/members/BegleiterChat.tsx`,
  `BegleiterLauncher.tsx`. Schalter `KI_BEGLEITER_ENABLED`.
- **Separate Verkaufbarkeit:** möglich, aber nur als **eigene Variante**: Für
  Nicht-Mitglieder ergibt das Inhaltsverzeichnis mit `/mitglieder/…`-Pfaden
  keinen Sinn, Journal und Selbsteinschätzung fehlen evtl. Nötig wäre ein
  Prompt-Modus „ohne Plattform-Inhalte“ (`buildSystemPrompt` mit leerem
  Katalog/Journal) und eine Route außerhalb des Mitglieder-Layouts (siehe 3.4).
  Positionierungsrisiko: wirkt ohne WMDG-Kontext schnell wie ein allgemeiner
  Chatbot.

### 2.2 Muster-Spiegel

- **Zweck:** Eigene Reflexionen werden auf wiederkehrende Aussagen,
  Formulierungen und Themen gespiegelt – mit kurzen Zitaten der eigenen Worte.
- **Ausdrücklich nicht:** psychologisches Gutachten · Diagnose · Lernbewertung.
- **Code:** `src/app/mitglieder/muster-actions.ts`,
  `src/components/members/MusterSpiegelPanel.tsx` (auf `/mitglieder/journal`).
  Schalter `KI_MUSTER_SPIEGEL_ENABLED`.
- **Separate Verkaufbarkeit:** gut denkbar. Heute liest er das WMDG-Journal;
  eine eigenständige Variante bräuchte ein eigenes Eingabefeld („eigene Texte
  einfügen“) statt des Journals.

### 2.3 Standortreflexion (technisch: KI-Reading)

- **Zweck:** KI-gestützte Reflexion auf Basis der eigenen Angaben im
  Bewusstseinstest (Selbsteinschätzung).
- **Ausdrücklich nicht:** objektiver Entwicklungsstand · Leistungsbewertung ·
  psychologischer Test · Diagnose.
- **Code:** `src/app/mitglieder/reading-actions.ts`,
  `src/components/members/ReadingPanel.tsx` (auf `/mitglieder/gedankenprofil`).
  Schalter `KI_READING_ENABLED`.
- **Namensempfehlung (noch nicht umgesetzt):** „Reading“ langfristig durch
  **„Standortreflexion“** ersetzen. Gründe: „Reading“ klingt nach Deutung durch
  eine Autorität (bzw. esoterisch, vgl. Tarot-Reading) und passt schlecht zur
  Leitlinie „deine eigenen Angaben, keine Bewertung“; „Standortreflexion“
  greift die bestehende Sprache auf (`docs/RECHTLICHE-PRODUKTABGRENZUNG.md`:
  „Standortübersicht“, „Standortbestimmung“). Sichtbar betroffen wären später:
  `ReadingPanel.tsx` (Eyebrow/Überschrift/Button-Texte), Datenschutz Punkt 14
  („KI-Text zum Gedankenprofil“). Interne Bezeichner (`reading-actions.ts`,
  Tabelle `gedanken_readings`) können bleiben.
- **Separate Verkaufbarkeit:** möglich für eingeloggte Nicht-Mitglieder, da der
  Bewusstseinstest öffentlich ist (`/bewusstseinstest`); die Ergebnisse müssten
  dem Konto zugeordnet sein (heute über das Mitgliederprofil).

### 2.4 Manipulations-Detektor

- **Zweck:** Analyse eines vom Nutzer eingefügten Textes anhand einer
  transparent definierten Taxonomie von 16 Beeinflussungstechniken
  (Vertiefungs-Kategorie „Mentale Selbstverteidigung“).
- **Analysiert wird der TEXT, nicht die PERSON.** Keine Prüfung, ob der Nutzer
  die Techniken gelernt hat oder selbst richtig erkennt.
- **Code:** `src/app/mitglieder/detektor-actions.ts`,
  `src/app/mitglieder/detektor/page.tsx`,
  `src/components/members/DetektorPanel.tsx`. Schalter `KI_DETEKTOR_ENABLED`.
- **Separate Verkaufbarkeit:** am einfachsten. Einzige Abhängigkeit: Die Funde
  verlinken auf `/mitglieder/wissen/<slug>` – für Nicht-Mitglieder bräuchte es
  eine frei lesbare Kurzbeschreibung der 16 Techniken oder Funde ohne Link.

---

## 3. Zugriffsarchitektur

### 3.1 Heutiger Zugriff (Ist-Stand, geprüft)

Ein KI-Werkzeug ist nutzbar, wenn **alle** Bedingungen erfüllt sind:

1. **Login** – `src/proxy.ts` und `src/app/mitglieder/layout.tsx`
   (`REQUIRE_MEMBER_LOGIN`).
2. **Aktive Mitgliedschaft – nur wenn `REQUIRE_ACTIVE_MEMBERSHIP=true`**
   (Standard: aus!). Dann prüft das Layout `isActiveMemberForUser`
   (`src/lib/membership.ts`, Tabelle `memberships`, gepflegt vom
   Stripe-Webhook); Admins (`ADMIN_EMAILS`, `src/lib/admin.ts`) kommen immer
   rein. Ohne diesen Schalter reicht der Login.
3. **Globaler Schalter** je Werkzeug – `src/lib/ki-features.ts`.
4. **`ANTHROPIC_API_KEY`** gesetzt (Begleiter zusätzlich Supabase konfiguriert).

Die Prüfung steckt in `isBegleiterConfigured()`, `isReadingConfigured()`,
`isMusterSpiegelConfigured()`, `isDetektorConfigured()` sowie direkt am Anfang
der Server-Actions bzw. der Begleiter-Route. **Eine personenbezogene
Berechtigung pro Werkzeug gibt es nicht.**

### 3.2 Vorschlag: zusätzliche persönliche Berechtigung

```
ZUGRIFF = Login
        ∧ globaler Schalter (Kill-Switch, bleibt!)
        ∧ ANTHROPIC_API_KEY
        ∧ persönliche Berechtigung für genau dieses Werkzeug
```

Werkzeug-Kennungen: `ki_begleiter`, `ki_reading`, `ki_muster_spiegel`,
`ki_detektor`.

Persönliche Berechtigung, wenn **eine** Quelle zutrifft:

| Quelle | Umsetzung |
|---|---|
| Mitgliedschaft enthält Werkzeug | Konstante im Code, z. B. `MITGLIEDSCHAFT_ENTHAELT: KiWerkzeug[]` + `isActiveMemberForUser` – kein DB-Eintrag pro Person nötig |
| Manuelle Freischaltung | Zeile in neuer Tabelle (Quelle `manuell`) |
| Eigenständiger Kauf | Zeile in neuer Tabelle (Quelle `kauf`), später vom Stripe-Webhook gesetzt |
| Admin-/Testzugang | `isAdminEmail()` (wie heute beim Rate-Limit) oder Zeile mit Quelle `admin_test` |

**Minimales Datenmodell (später, NICHT jetzt):** Tabelle
`ki_berechtigungen` mit `user_id`, `werkzeug` (die vier Kennungen), `quelle`
(`manuell` | `kauf` | `admin_test`), `gueltig_bis` (optional),
`widerrufen_am` (optional), `notiz`, `erstellt_am`. RLS: Person darf **nur
lesen** (eigene Zeilen); Schreiben nur serverseitig mit Service-Role (sonst
könnte sich jemand selbst freischalten).

**Zentrale Prüffunktion (später):** `src/lib/ki-zugang.ts` mit
`hatKiZugriff(user, werkzeug)`, die die vier Bedingungen bündelt. Sie ersetzt
die vier `is…Configured()`-Funktionen und wird an **jedem** Einstieg und an
**jedem** KI-Aufruf geprüft (UI allein reicht nicht).

### 3.3 Betroffene Dateien bei späterer Umsetzung

- Schalter/Zugang: `src/lib/ki-features.ts` (bleibt Kill-Switch), neu
  `src/lib/ki-zugang.ts`
- Begleiter: `src/app/mitglieder/begleiter/actions.ts`
  (`isBegleiterConfigured`), `begleiter/page.tsx`, `begleiter/antwort/route.ts`,
  `src/app/mitglieder/layout.tsx` (Launcher)
- Reading: `src/app/mitglieder/reading-actions.ts`,
  `src/app/mitglieder/gedankenprofil/page.tsx`
- Muster-Spiegel: `src/app/mitglieder/muster-actions.ts`,
  `src/app/mitglieder/journal/page.tsx`
- Detektor: `src/app/mitglieder/detektor-actions.ts`,
  `src/app/mitglieder/detektor/page.tsx`
- Verweise auf den Begleiter: `src/app/mitglieder/page.tsx` (Dashboard,
  auch Detektor-Link), `src/app/mitglieder/stufe/[nr]/page.tsx`,
  `src/app/mitglieder/soforthilfe/page.tsx`, `gedankenprofil/page.tsx`
- Begleiter-Kontext: In `antwort/route.ts` fließen Detektor- und
  Spiegel-Ergebnisse schon heute **nur bei eingeschaltetem Werkzeug** ein;
  später zusätzlich nur bei persönlicher Berechtigung für das jeweilige Werkzeug.
- Kauf: `src/app/api/stripe/webhook/route.ts` (später), `src/lib/membership.ts`
- Admin: `src/app/admin/mitglieder/` (passender Ort für eine spätere Freischalt-Ansicht), `src/lib/admin-guard.ts`

### 3.4 Wichtiger Architekturpunkt für Option C (Einzelverkauf)

Das Mitglieder-Layout (`src/app/mitglieder/layout.tsx`) setzt bei
`REQUIRE_ACTIVE_MEMBERSHIP=true` eine aktive Mitgliedschaft voraus. Wer **nur**
ein KI-Werkzeug kauft, käme dann nicht auf `/mitglieder/detektor` usw. – oder
müsste den ganzen Mitgliederbereich sehen. Für Option C braucht es deshalb
später einen eigenen Routenbereich (z. B. `src/app/werkzeuge/…`, nicht
öffentlich beworben, mit eigenem Layout: Login + Berechtigung) oder eine
Layout-Logik, die Werkzeug-Seiten getrennt freigibt. Für A und B genügt die
Berechtigungsschicht innerhalb `/mitglieder`.

### 3.5 Manuelle Freischaltung / Offline-Verkauf (später)

1. Kunde kauft außerhalb des Website-Checkouts (Rechnung, Workshop, persönlich)
   oder bekommt Zugriff geschenkt.
2. Admin legt für das **bestehende Nutzerkonto** eine Zeile in
   `ki_berechtigungen` an (`werkzeug`, `quelle = manuell`, optional
   `gueltig_bis`, `notiz` z. B. Rechnungsnummer). Minimal reicht anfangs ein
   SQL-Statement im Supabase-Dashboard; komfortabel später eine kleine
   Admin-Seite unter `/admin` (hinter `admin-guard`).
3. Beim nächsten Seitenaufruf erscheint **nur dieses Werkzeug** (Link, Seite,
   Panel).
4. Andere Werkzeuge bleiben unsichtbar – ihre Prüfung schlägt fehl.
5. Widerruf: `widerrufen_am` setzen (Zeile nicht löschen → nachvollziehbar);
   ab dem nächsten Aufruf ist das Werkzeug wieder weg. Gespeicherte Ergebnisse
   bleiben im Konto, bis die Person Löschung verlangt.

Minimal nötig: eine Migration (Tabelle + RLS), `src/lib/ki-zugang.ts`,
Umstellung der Einstiege aus 3.3. Keine Stripe-Änderung.

---

## 4. Kontext des Reflexionsbegleiters (geprüft 2026-10-07)

| Feld | Warum? | Nur Reflexion/Orientierung? | Risiko Lernstandsbeurteilung | Entscheidung |
|---|---|---|---|---|
| Name | natürliche Anrede | ja | keins | bleibt |
| Selbsteinschätzung (Schwerpunkt, Stufenwerte) | Gespräch an eigene Angaben anknüpfen, passende Inhalte finden | ja, als „Selbsteinschätzung, keine Messung“ beschriftet, ohne „verankert/Bedarf“ | gering | bleibt |
| Als bearbeitet markierte Stufen | Navigation („hast du schon als bearbeitet markiert“) | ja, getrennt als „nur Navigation, kein Nachweis“ | gering, durch Regel abgefangen | bleibt |
| Journal-Auszüge (max. 8 × 180 Zeichen) | an eigene Reflexionen anknüpfen | ja | gering; Prompt verbietet „noch nicht verstanden“-Deutungen | bleibt (Datenschutz beachten, s. 5) |
| Rückkehr-Daten (Serie, Gesamt) | Rhythmus freundlich anerkennen | ja | gering | bleibt |
| 21-Tage-Programm (Anzahl markierter Tage) | Navigation im Programm | ja, „als erledigt markiert“ | gering | bleibt |
| Praxis-Häkchen (Anzahl) | – nackte Zahl ohne Navigationswert | – | lädt zu Leistungsdeutung ein | **entfernt (2026-10-07)** |
| Detektor-Historie (Top-3-Technik-Titel) | Themen, denen die Person in Texten begegnet | ja | keins (betrifft fremde Texte) | bleibt, **nur bei eingeschaltetem Detektor** |
| Letztes Reading (Auszug) | doppelt zur Selbsteinschätzung | – | Altexte vor 2026-10-05 können Lernstand-Sprache enthalten | **entfernt (2026-10-07)** |
| Letzter Muster-Spiegel (Auszug) | Anknüpfen an gespiegelte Themen | ja | gering | bleibt, **nur bei eingeschaltetem Spiegel** |
| Chatverlauf (letzte 24 Nachrichten) | Gesprächszusammenhang | ja | gering | bleibt |

Inhaltsverzeichnis (Stufen, Vertiefungen, Praxis, Kapitel mit Pfaden) ist kein
persönlicher Kontext und bleibt Grundlage für Verweise.

---

## 5. Datenschutz je Werkzeug

> **Abgrenzung:** Die Spalten unten sind eine **Produkt-/Datenbeschreibung**.
> Sie sind **keine datenschutzrechtliche Prüfung** und nennen bewusst **keine
> Rechtsgrundlagen**. Die rechtliche Prüfung (Anbieter, Vertrag/DPA,
> Drittlandbezug, Speicherdauer beim Anbieter, Training, Rechtsgrundlage,
> Text der Datenschutzerklärung Punkt 14) bleibt offen und wird in
> **`docs/DATENSCHUTZ-TODO.md`** (Abschnitte „Am 2026-10-05: alle
> KI-Funktionen aus“ und „Anthropic API (KI)“) geführt.

| Werkzeug | An den KI-Anbieter (Anthropic) übermittelt | Gespeichert in Supabase | Offene Punkte (→ DATENSCHUTZ-TODO) |
|---|---|---|---|
| Reflexionsbegleiter | Chatnachrichten + Verlauf (24), Name, Selbsteinschätzungswerte, markierte Stufen, Journal-Auszüge, Rückkehr-/Programmzahlen, ggf. Detektor-Technik-Titel und Spiegel-Auszug | `begleiter_messages` (RLS: nur eigene Zeilen) | Punkt 14 muss alle Kontextkategorien nennen; Journal-Auszüge können sehr persönliche/gesundheitsnahe Inhalte enthalten – Einordnung prüfen; Löschkonzept Verlauf (Nutzer kann Gespräch selbst löschen) |
| Muster-Spiegel | eigene Journal-Reflexionen (max. 6 000 Zeichen) inkl. Reflexionsfrage | `muster_spiegel` (RLS) | wie oben, Journalinhalte; Hinweis im Panel vorhanden |
| Standortreflexion | Selbsteinschätzungswerte (Prozent je Stufe, Schwerpunkt) | `gedanken_readings` (RLS) | geringster Umfang; trotzdem Punkt 14 |
| Manipulations-Detektor | vom Nutzer eingefügter Text (40–5 000 Zeichen) | `detektor_checks` (RLS) | Text kann Daten Dritter enthalten (z. B. kopierte Nachrichten) – Hinweis prüfen |

Seit 2026-10-07 beschreibt Punkt 14 der Datenschutzerklärung
(`src/app/datenschutz/page.tsx`) diese Datenkategorien je Werkzeug, Anbieter
Anthropic Ireland, Limited, Auftragsverarbeitung, Standardvertragsklauseln,
kein Training, Einwilligung (Art. 6 Abs. 1 lit. a / Art. 9 Abs. 2 lit. a).
Der Einwilligungshinweis steht an allen vier Werkzeugen
(`src/lib/ki-einwilligung.ts`, `KiEinwilligungsHinweis.tsx`).

Produktiver Ist-Stand (read-only geprüft 2026-10-07): Alle vier Tabellen
existieren mit aktivem RLS und je einer Policy `…_rw_own`.

---

## 6. KI-Transparenz in der UI (Stand 2026-10-07)

| Werkzeug | KI erkennbar | optional | nicht Heiko persönlich |
|---|---|---|---|
| Begleiter | Eyebrow „Dein Begleiter · KI-gestützt“, Launcher „Dein Begleiter · KI“, Hinweis unter dem Eingabefeld | „Die Nutzung ist freiwillig.“ | „Antworten erzeugt eine KI – nicht Heiko persönlich.“ (Seite und Panel) |
| Standortreflexion | Eyebrow „KI-gestützte Reflexion“, Ergebnis „KI-generiert · Datum“ | „Auf deinen Wunsch … mit einem Klick frei“ | ergibt sich aus „eine KI formuliert“ |
| Muster-Spiegel | „liest eine KI“, Ergebnis „KI-generiert · Datum“ | „Auf deinen Wunsch“ | ergibt sich aus „eine KI“ |
| Detektor | „Die KI analysiert …“, Ergebnis „KI-generierte Analyse des eingefügten Textes“ | Aufruf nur per Klick | ergibt sich aus „KI“ |

Links auf den Begleiter von Stufen-, Soforthilfe- und Gedankenprofil-Seite
heißen jetzt „KI-Begleiter“; die Stufenseite steht direkt neben „Mir
schreiben“, dort war die Unterscheidung Mensch/KI sonst unklar. Keine
Warn- oder Angsttexte.

---

## 7. Nächste Schritte (zur Freigabe, nichts davon umgesetzt)

1. Entscheidung A/B/C je Werkzeug.
2. Datenschutz Punkt 14 je eingeschaltetem Werkzeug (DATENSCHUTZ-TODO).
3. Danach ggf. `ki_berechtigungen` + `src/lib/ki-zugang.ts` (3.2, 3.5).
4. Erst danach: Verkaufsseite, Preise, Stripe-Produkte.
