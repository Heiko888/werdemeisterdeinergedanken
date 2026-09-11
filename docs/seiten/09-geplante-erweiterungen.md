# Geplante Erweiterungen & Roadmap

Diese Seite bündelt alles, was im Projekt zwar **angelegt, angedacht oder
vorbereitet**, aber noch **nicht (voll) aktiv** ist – dazu ausdrückliche
Zukunftshinweise aus Code und Dokumentation.

> **WICHTIGER Hinweis:** Dieser Überblick ist **aus Code- und Doku-Spuren
> abgeleitet** (auskommentierte Features, Platzhalter, Feature-Flags,
> Audit-Empfehlungen, ungenutzte Strukturen). Er beschreibt den **Ist-Stand der
> Absichten**, wie er sich im Repository ablesen lässt – **keine offizielle
> Produkt-Roadmap** des Betreibers. Jeder Punkt ist mit Datei + Fundstelle
> belegt. Wo Audit-Empfehlungen zitiert werden, kann ein Teil davon zwischen
> Audit-Datum und heute bereits umgesetzt sein; verifizierte Umsetzungen sind
> als solche vermerkt.

---

## Deaktivierte / versteckte Funktionen (bereits gebaut)

Fertig entwickelte Bausteine, die im Code liegen, aber bewusst ausgeblendet
sind. Aktivierung ist jeweils ein kleiner, klar umrissener Eingriff.

| Funktion | Beleg | Was ist geplant / beabsichtigt | Zum Aktivieren nötig |
|---|---|---|---|
| **„Der Grundgedanke"-Sektion (Creed)** auf der Startseite | Import u. Einbindung auskommentiert: `src/app/page.tsx:6` (`// import { Creed } …`) und `:21` (`{/* <Creed /> */}`); Komponente vollständig vorhanden: `src/components/sections/Creed.tsx` | Zusätzliche Marken-Sektion „Dein Bewusstsein ist der Schlüssel. Deine Gedanken sind der Code." auf der Home | Beide Zeilen in `page.tsx` einkommentieren |
| **Blog-Kategorie „Mentale Selbstverteidigung"** komplett deaktiviert | `src/lib/blog.ts:1779-1781` (`DEACTIVATED_CATEGORIES = new Set(["Mentale Selbstverteidigung"])`), Filter `isCategoryDeactivated` `:1783-1786` | **16 fertig geschriebene Artikel** (verifiziert per Zählung) erscheinen nirgends – nicht in Übersicht, RSS, Sitemap; eigene URL → 404. Inhalte bleiben im Code erhalten und sind jederzeit reaktivierbar | Kategorie-Eintrag aus dem Set entfernen. **Vorher klären** (bewusst/sensibel vs. versehentlich); Konflikt beachten: der Redaktionsplan verlinkt weiter auf diese Slugs (s. u.) |
| **Buch-Stimmen-Sektion** auf `/buch` | Leeres Array: `src/lib/content.ts:199` (`export const bookTestimonials: Testimonial[] = []`); bedingtes Rendern: `src/app/buch/page.tsx:487` (`bookTestimonials.length > 0 && …`) | Testimonial-Abschnitt speziell zum Buch (bewusst getrennt von den 7-Stufen-`testimonials`); solange leer, blendet `/buch` den Abschnitt aus | Echte Leser-Rückmeldungen (mit Einverständnis) ins Array eintragen |
| **Persönliche Videobotschaft** auf der Startseite („Ein anderer Blickwinkel") | `src/lib/site.ts:25-28` (`videoMessage.youtubeId: null`); Fallback-/„folgt in Kürze"-Zweig in `src/components/sections/MaybeNotYou.tsx` (laut Audit `:58-64`) | Statt echtem Video läuft aktuell das globale Platzhalter-Video hinter dem Marken-Thumbnail | Echte YouTube-ID in `videoMessage.youtubeId` eintragen (oder `placeholderVideoId: null`, um ehrlich „folgt in Kürze" zu zeigen) |
| **Echte Lektions-/Vertiefungs-/Praxis-Videos** (Platzhalter aktiv) | `src/lib/site.ts:34` (`placeholderVideoId: "gOvtKBnqGvk"`). Alle 7 Stufen-Lektionen, alle 29 Vertiefungen und 13/14 Praxis-Übungen haben `video: null`; genau **eine** echte Ausnahme: `src/lib/practices.ts:84` (`video: "3XiHP4U683Q"`) | Der „folgt in Kürze"-Zustand ist im Code vorhanden, wird durch den globalen Platzhalter aber nie gezeigt | Echte Video-IDs pro Inhalt hinterlegen, **oder** `placeholderVideoId: null` setzen (ehrlicher Fallback) |
| **Telegram-Social-Link** (Icon erscheint automatisch bei URL) | `src/lib/site.ts:41-42` (`// TODO: echte URLs ergänzen …` / `// telegram: "https://t.me/…"`) | Weiterer Social-Kanal; Icons werden automatisch angezeigt, sobald eine URL gesetzt ist | Echte Telegram-URL im `social`-Objekt einkommentieren |
| **`session_id` auf der Willkommensseite nicht ausgelesen** | Checkout übergibt sie: `src/app/api/checkout/route.ts:84` (`success_url: …/willkommen?session_id={CHECKOUT_SESSION_ID}`); Seite ignoriert den Parameter vollständig: `src/app/mitgliedschaft/willkommen/page.tsx` (kein `searchParams`-Zugriff) | Geplant/empfohlen (UX-Audit E6/F): serverseitige Prüfung der `session_id`, Status spiegeln („Zugang wird eingerichtet…"), „Passwort-Mail erneut senden"-Trigger | `willkommen/page.tsx` auf async Page mit `searchParams` umbauen und Stripe-Session serverseitig verifizieren |

---

## Platzhalter & vorläufige Werte

| Wert | Beleg | Erklärung | Zum Finalisieren nötig |
|---|---|---|---|
| **Mitgliedschaftspreis 49 €/Monat, 490 €/Jahr** hartcodiert | `src/app/mitgliedschaft/page.tsx:23` (Kommentar „Preis-Platzhalter – vor dem Livegang durch das echte Modell ersetzen."), Werte `:24-41` | Angezeigter Betrag ist unabhängig von den Stripe-Preis-IDs (die aus Env kommen). Gefahr: Diskrepanz Anzeige ↔ Abbuchung | Angezeigten Preis exakt an den in Stripe hinterlegten Preis angleichen |
| **Globales Platzhalter-Video** `gOvtKBnqGvk` | `src/lib/site.ts:29-34` | „Vorerst überall dort, wo noch kein eigenes Video produziert wurde"; auf `null` setzen = wieder „folgt in Kürze" | Echte Videos hinterlegen oder Platzhalter global entfernen |
| **Platzhalter-Kommentare in Datenquellen** (echte URLs, Video-IDs) | `src/lib/site.ts:3` u. `:41`; Sammelbefund im Generatoren-Audit: `docs/audit/vorlagen-generatoren-audit-2026-08-13.md:477` („Diverse Platzhalter-TODOs … in `site.ts`, `stage-lessons.ts`, `deep-dives.ts`, `practices.ts` — redaktionell, keine Integrationen") | Redaktionell zu befüllende Felder, keine offenen technischen Integrationen | Echte Daten nachtragen |
| **13 in `src/` gelesene, produktiv aber nicht gesetzte Env-Variablen** | `docs/AENDERUNGEN.md` (Eintrag 2026-09-10 „`deploy/` …"): `CONTACT_*`, `*_FROM`, `BUCH_DOWNLOAD_SECRET`, `STRIPE_*`, `REQUIRE_ACTIVE_MEMBERSHIP`, `ALLOW_SELF_REGISTRATION`; dokumentiert in `deploy/.env.example` | Alle mit Fallback – „nichts kaputt, aber bisher unsichtbar". Betrifft v. a. Zahlung/Mailversand | Vor Nutzung der jeweiligen Funktion in der Laufzeitumgebung setzen |

---

## Feature-Flags & Schalter

Konfigurierbare Ein/Aus-Funktionen und „graceful degradation"-Zweige (Feature
bleibt latent, bis ein Dienst konfiguriert ist).

| Flag / Bedingung | Beleg | Default | Wirkung / geplanter Zweck |
|---|---|---|---|
| `ALLOW_SELF_REGISTRATION` | `src/lib/supabase/config.ts:19-26`; genutzt in `src/app/auth/actions.ts:47`, `src/app/login/page.tsx:44,54,56`; Doku `.env.local.example:73-76` | `false` | Freie Selbst-Registrierung (Konten ohne Zahlung). Vorbereitet für das Modell **„erst registrieren, dann bezahlen"** – dann auf `true` |
| `REQUIRE_ACTIVE_MEMBERSHIP` | `src/lib/supabase/config.ts:28-37`; genutzt in `src/app/mitglieder/layout.tsx:43`, `src/lib/members/download-guard.ts:48`; Anleitung `docs/STRIPE-MITGLIEDSCHAFT.md:90-97` | `false` | Bezahlschranke für `/mitglieder`. Ausdrücklich geplant: **„Erst umlegen, wenn der Stripe-Checkout live und getestet ist."** |
| `REQUIRE_MEMBER_LOGIN` | `src/lib/supabase/config.ts:12-16` | `true` | Login-Schutz des Mitgliederbereichs |
| `ENFORCE_CANONICAL_HOST` | `.env.local.example:108-112`; Kontext `docs/DOMAIN-UMZUG.md` | `true` | 301 auf www; „false = vorübergehend abschalten, solange www noch nicht live ist" |
| `STRIPE_PRICE_ID_YEARLY` | `.env.local.example:49-50` | (leer) | Optional: **schaltet die Jahres-Abo-Option frei**, sobald der zweite Preis angelegt ist |
| `STRIPE_BOOK_PRICE_ID` / `STRIPE_BOOK_PRICE_ID_PRINT` | `.env.local.example:51-58`; `src/lib/stripe.ts` (`bookPriceIdForEdition`) | (leer) | PDF- bzw. Druck-Edition auf `/buch`. **Ohne die Variable fällt der Button sanft aufs Kontaktformular** (`/kontakt?thema=buch`) |
| `ANTHROPIC_API_KEY` (+ Migrationen 0008/0009) | `.env.local.example:78-97`; `docs/KI-BEGLEITER.md:48` | (leer) | Schaltet **KI-Reading** (Gedankenprofil) und **KI-Begleiter** frei. Ohne Key bleiben beide Seiten nutzbar/erreichbar, die Optionen/Links werden schlicht ausgeblendet (graceful degradation) |
| E-Book Double-Opt-in | `.env.local.example:17-25` (Migration `0005_ebook_leads.sql` + Service-Role-Key) | direkter Versand | Ohne Service-Role-Key: direkter Versand ohne Lead-Speicherung; mit → Double-Opt-in + `public.ebook_leads` |
| `NEXT_PUBLIC_GA_ID` (kein Code-Default) | `.env.local.example:99-106`; `src/lib/analytics.ts` | (leer) | Analytics lädt **nur** mit gesetzter ID (sonst kein Tracking, kein Cookie-Banner) |
| `BUCH_DOWNLOAD_SECRET` | `.env.local.example:66-70` | Fallback auf `STRIPE_WEBHOOK_SECRET` | Aktiviert den signierten, 30-Tage-gültigen PDF-Download-Link in der Liefermail; fehlt beides → nur PDF-Anhang |

---

## Offene Punkte aus Audits & Doku

Konkrete offene Empfehlungen und geplante Maßnahmen aus den Audit-/Design-Dokumenten.

### Vor-Launch-Check (`docs/audit/launch-check-2026-09-09.md`)

**Vor Go-live zu entscheiden:**
- **B1** – Mitgliedschaftspreis als Code-Platzhalter (`:20-26`) → Anzeige = Stripe-Preis sicherstellen.
- **B2** – Fast alle Mitglieder-Videos = Platzhalter (`:28-34`) → echte Videos oder `placeholderVideoId: null`.
- **B3** – Persönliche Videobotschaft = Platzhalter (`:36-42`).

**Wichtig (W1-W7, `:46-91`):** Hero zu dunkel (W1 – **Entscheidung laut `AENDERUNGEN.md` 2026-09-09: Hero bleibt bewusst dunkel, keine Aufhellung**), Porträt-Glow (W2), uneinheitliche H2-Größen (W3 – **umgesetzt** laut `AENDERUNGEN.md` 2026-09-09), Teal-Schatten im Badge (W4 – **umgesetzt**), Blog-Kategorie deaktiviert bestätigen (W5), `npm run lint`-Fehler (W6 – **behoben**), Next.js-Sicherheitsupdate (W7 – **erledigt**, 16.2.10 → 16.3.4).

**Nice-to-have (N1-N6, `:96-106`):** Kompass-Crop (N1), `robots.ts` deckt `/admin` nicht ab (N2), **zweites Buch-PDF nirgends als Verkaufsschritt eingebunden** (N3 – Hinweis: wird inzwischen per Liefermail nach Kauf zugestellt, `src/lib/pdf/buch-file.ts`), offene TODOs `site.ts:41` + `Creed` (N4), kein eigenes `favicon.ico` (N5), `AGENTS.md` verweist auf nicht existierendes Verzeichnis (N6).

**Ausdrückliche Ausbau-Ideen nach dem Launch (KI-Spiegel, Chat & Profil, `:110-128`):**
1. „Ins Profil übernehmen"-Button im Begleiter-Chat (Erkenntnis → Journal/Profil).
2. Muster-Spiegel auch aus Chat-Verläufen speisen (Verlauf liegt bereits in Supabase).
3. „Lebendiges Profil": kuratierter Freitext „Was ich über mich gelernt habe".
Grundlage laut Doku „sauber gebaut – gut nachrüstbar, kein Launch-Blocker".

### Mitgliederbereich-UX-Audit (`docs/audit/mitgliederbereich-ux-audit-2026-08-26.md`)

3-Phasen-Maßnahmenplan (`:231-255`). Mehrere **Phase-1-Punkte sind inzwischen
umgesetzt** (verifiziert im Code): `practicesForStage()` auf der Stufenseite
(`src/app/mitglieder/stufe/[nr]/page.tsx:54`), `JournalReflection` für Praxis
freigeschaltet (`src/components/members/JournalReflection.tsx:20` akzeptiert
`practice`; `praxis/[slug]/page.tsx:159`), und die Test-Startstufe personalisiert
den Dashboard-Anker (`src/app/mitglieder/page.tsx:180-185`, `floorIndex` aus
`startStage`).

**Weiterhin geplant/offen (Auswahl):**
- **Persistente Mitglieder-Navigation** (E1 `:82`, „das größte strukturelle Loch").
- **Dashboard vom Index zum Cockpit** umbauen (E2 `:84`, Bibliotheken auslagern, kuratieren).
- **Echte Videos** produzieren (G `:182`).
- **Fortschritt aus echter Aktivität** ableiten; Schema `item_type in ('stage','practice','deep_dive')` voll nutzen (E3 `:86`).
- **Zwei Bibliotheken entwirren** (Vertiefungen ↔ Wissensdatenbank, E4 `:88`); Wissensdatenbank Gelesen-Status + Reflexionsfrage.
- **Filter/Suche** in Vertiefungs-Index und Journal (G `:187`); Stufen-Badges/„Empfohlen für Stufe X".
- **Stripe-Kundenportal-Link** (Abo-Selbstverwaltung/Kündigung) in den Einstellungen (D `:73`, F `:170`).
- **Test-Methodik härten** (Umkehr-Items, gemischte Reihenfolge, „zwischen Stufe X und Y") (`:119`).
- **Kern-Kategorien der Vertiefungen ausbauen** – Schieflage 16/29 „Mentale Selbstverteidigung", andere Kategorien mit je 1 Eintrag (verifiziert: Gehirn 1, Emotion 1, Körper 1) (`:133`).

### Design-Check (`docs/design/design-check-2026-09-09.md:202-218`)
Drei nächste Schritte: Hero aufhellen (überholt – Betreiber-Freigabe „bleibt dunkel"), Sektions-H2 vereinheitlichen (umgesetzt), zwei Farbkorrekturen.

### Generatoren-/Vorlagen-Audit (`docs/audit/vorlagen-generatoren-audit-2026-08-13.md:532`)
Prioritäten P1-P4 weitgehend umgesetzt; **offen bleibt nur P4-Canva** (Brand-Templates mit Datensatz in Canva anlegen – kein Code).

### Buch – juristische & redaktionelle Restpunkte
- Juristische Vorprüfung (`docs/AENDERUNGEN.md` 2026-09-08): anwaltlich abzunehmen bleiben vollständiges Impressum/Anschrift (Anschrift inzwischen eingetragen), Einordnung „Lena"/Angehörigen-Einverständnis, finale Disclaimer-Freigabe, Marketing-Claims. Vertriebsform-spezifische Pflichtangaben „ggf. später prüfen".
- Buch-Verkaufsseite: **vollständige Gliederung Teil I-IV noch nicht abgebildet** – aktuell nur Teil V (Kap. 19-24) als Schwerpunkt/Leseprobe; „restliche Teile können ergänzt werden, sobald die Titel vorliegen" (`docs/AENDERUNGEN.md` 2026-09-09).
- Buch-PDF-Ablage/Auslieferung war „noch offen und separat zu entscheiden" (`docs/AENDERUNGEN.md` 2026-09-08) – inzwischen via signiertem Link + Anhang gelöst.

### Content-Inventar (`docs/generatoren/content-inventar.md:85-89`)
**„Noch nicht gebaut":** `cover-overlay/` und `carousel-overlay/` fehlen im Repo; sie brauchen git-ignorierte lokale Exporte (`npm run covers:png` / `carousels:png`) vor dem Galerie-Bau, sonst tragen die Schritte still 0 Einträge ein.

### Redaktionsplan-Konflikt (`docs/AENDERUNGEN.md:554-560`)
Der Redaktionsplan (`src/lib/redaktionsplan.ts` + `docs/marketing/`) plant weiter Social-Posts mit `/blog/<slug>`-Links auf die **16 deaktivierten** „Mentale Selbstverteidigung"-Artikel – diese URLs liefern öffentlich 404. Kein Website-Bug, aber ein Planungskonflikt, der beim Ausspielen zu beachten ist (bzw. sich mit Reaktivierung der Kategorie auflöst).

---

## Angelegte, noch ungenutzte Strukturen

Vorbereitete Code-/Datenstrukturen, für die aktuell keine Nutzung nachweisbar ist.

| Struktur | Beleg | Status |
|---|---|---|
| **Audio-Zweig für Praxis-Übungen** | Feld `audio?: string \| null` in `src/lib/practices.ts:34`; Auswahl `featuredPractice()` `:372-374` (`p.video \|\| p.audio`); Player im UI `src/app/mitglieder/praxis/[slug]/page.tsx:88-103` | **Ungenutzt** – verifiziert: keine Übung hat ein `audio`-Feld gesetzt, keine Audiodatei (`*.mp3/m4a/wav/ogg`) in `public/` oder `content/`. Der Player-/Auswahlzweig ist vorbereitet, aber toter Code, bis Aufnahmen ergänzt werden |
| **Zweites Buch-PDF `content/pdf/Werde-Meister-deiner-Gedanken.pdf`** | Laut Launch-Check N3 „wird nirgends eingebunden"; tatsächlich geladen für die Liefermail nach Kauf: `src/lib/pdf/buch-file.ts:15` | Für die Post-Kauf-Zustellung genutzt; **nicht** als direkter Download/Verkaufsschritt auf einer Seite verlinkt (bewusste Login-/Nicht-öffentlich-Ablage) |

> Hinweis: Die zur Audit-Zeit als „ungenutzt" bemängelte Notiz-Spalte
> `item_type='practice'` (`supabase/migrations/0003_notes.sql:14`) wird
> **inzwischen** genutzt (`src/lib/journal.ts:14` + Praxis-Reflexion), ebenso das
> `start_stage`-Feld für die Dashboard-Personalisierung. Diese gelten daher nicht
> mehr als latent.

---

## Sonstige TODO-/Marker-Fundstellen

| Fundstelle | Inhalt |
|---|---|
| `src/lib/site.ts:3` | „Alle mit «TODO» markierten Felder bitte mit echten Daten befüllen (Kontakt, Social-Links, rechtliche Angaben)." |
| `src/lib/site.ts:41` | `// TODO: echte URLs ergänzen …` (Telegram, s. o.) |
| `src/lib/admin-stats.ts:95` | `// Tabelle evtl. noch nicht migriert` – toleranter Fallback, falls eine Migration fehlt |
| `src/app/bewusstseinstest/actions.ts:64` | „Bewusst nicht-fatal – falls Migration 0006 noch nicht eingespielt ist …" (graceful bei fehlender `test_history`) |
| `src/app/mitglieder/reading-actions.ts:150` | Kommentar zu asynchronem Nachreichen („und später als fertig angezeigt wird") |
| `src/app/blog/[slug]/page.tsx:144` | Vorausdatierte Artikel „Noch nicht erschienen: erreichbar, aber nicht für Suchmaschinen" – Redaktionsplan-Mechanik für künftige Beiträge |

---

_Stand: 2026-09-11 — automatisch dokumentiert_
