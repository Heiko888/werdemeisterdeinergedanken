# Website-Check – Gesamtbericht

**Datum:** 2026-08-19
**Art:** Reiner Prüflauf (kein Produktivcode geändert)
**Prüf-Team:** mitglieder-waechter · seiten-pruefer · sicherheits-pruefer · barrierefreiheit-pruefer · inhalts-pruefer
**Schwerpunkt (Auftrag):** Logik & Benutzerfreundlichkeit – besonders Mitgliederbereich – sowie der Bewusstseinstest öffentlich **und** im geschützten Bereich.

---

## Kurzfazit

Die Codebasis ist technisch solide und sicherheitsbewusst gebaut: sauberer Build (Next.js 16, 169 Seiten, keine Fehler/Warnungen), korrekt migrierter `proxy.ts`-Schutz statt Middleware, durchgängige `notFound()`-Behandlung, RLS + Auth-Erzwingung in jeder Server Action, verifizierter Stripe-Webhook, keine geleakten Secrets. **Kein Login-Bypass und kein IDOR** beim gespeicherten Testprofil gefunden.

Die wirkungsvollsten Baustellen sind **funktional/UX**, nicht sicherheitskritisch:
1. ein **toter interner Link** auf 27 Wissensdatenbank-Seiten,
2. **kaputte Social-Vorschauen** bei allen 23 Blog-Artikeln,
3. mehrere **Tastatur-Barrieren** (unsichtbare, aber fokussierbare Elemente; fehlendes Fokus-/Escape-Management im KI-Begleiter).

Zählung nach Konsolidierung (Doppelungen entfernt): **5× 🔴 · 15× 🟠 · 10× 🟡**.

---

## 🔴 Kritisch – vor dem nächsten Marketing-Push / Live-Gang beheben

### 🔴-1 Toter interner Link „Zur Praxis" auf allen 27 Wissensdatenbank-Kapiteln
**Datei:** `src/app/mitglieder/wissensdatenbank/[slug]/page.tsx:123`
`<Button href="/mitglieder/praxis" …>Zur Praxis</Button>` zeigt auf eine Route, die **nicht existiert** (es gibt nur `/mitglieder/praxis/[slug]`, keine Übersicht `/mitglieder/praxis/page.tsx`). Jeder Klick landet auf der 404-Seite – auf jeder der 27 Kapitel-Detailseiten.
**Empfehlung:** Entweder eine echte Übersichtsseite `src/app/mitglieder/praxis/page.tsx` anlegen oder den Link auf einen existierenden Anker/eine sinnvolle Übungsseite umbiegen (z. B. `/mitglieder#praxis` oder `practicesForStage`).

### 🔴-2 Blog-Artikel verlieren beim Teilen Bild, URL und Twitter-Titel
**Datei:** `src/app/blog/[slug]/page.tsx:113`
`openGraph: { title, description, type }` – Next.js merged verschachtelte `openGraph`-Felder **nicht** feldweise, sondern ersetzt das Objekt je Segment komplett (belegt in `node_modules/next/dist/docs/.../generate-metadata.md`, Abschnitt „Merging/Overwriting"). Im Build-Output verifiziert: kein `og:image`, kein `og:url`, `twitter:*` zeigt weiter die generischen Homepage-Texte. Ergebnis: leere/falsche Linkvorschauen bei jedem Share – direkter Marketing-Schaden, da der Blog aktiv über RSS/Social beworben wird.
**Empfehlung:** Pro Artikel `url: \`${site.url}/blog/${slug}\`` und ein `images`-Array setzen (z. B. artikelspezifisches `app/blog/[slug]/opengraph-image.tsx`) bzw. Basisfelder aus dem Layout explizit mitgeben. Schwächere Ausprägung desselben Musters (dort `noindex`, daher unkritischer) in `src/app/mitglieder/wissensdatenbank/[slug]/page.tsx:28`.

### 🔴-3 Mobiles Menü bleibt bei geschlossenem Zustand tab-erreichbar
**Datei:** `src/components/layout/Header.tsx:83-119`
Das Mobilmenü wird nur visuell versteckt (`max-h-0 opacity-0 overflow-hidden`), bleibt aber im DOM tab-/fokussierbar. Tastaturnutzer laufen auf jeder Seite (mobil) durch unsichtbare Links, bevor sie sichtbaren Inhalt erreichen. Zusätzlich fehlen `aria-controls`-Bezug und Escape-Handler.
**Empfehlung:** Bei geschlossenem Zustand `hidden`/`inert` setzen, `aria-controls` auf die Menü-ID, Escape zum Schließen, Fokus-Management beim Öffnen/Schließen.

### 🔴-4 „Nach oben"-Button bleibt bei unsichtbar fokussierbar
**Datei:** `src/components/ui/BackToTop.tsx:51-54`
Nur `opacity-0 pointer-events-none`, kein `tabIndex={-1}`/`hidden`. Am Seitenanfang entsteht ein unsichtbarer Fokus-Stopp in der Ecke.
**Empfehlung:** `tabIndex={visible ? 0 : -1}` oder `hidden`, solange nicht sichtbar.

### 🔴-5 Honeypot-Feld im Kontaktformular ohne `tabIndex={-1}`
**Datei:** `src/components/sections/ContactForm.tsx:131-144`
Das off-screen Honeypot-Input `company` ist – anders als das Pendant in `EbookForm.tsx:134-143` – tab-erreichbar. Der Fokus verschwindet beim Tabben in den Off-Screen-Bereich; fokussierbares Kind eines `aria-hidden`-Containers verstößt zudem gegen die ARIA-Spec.
**Empfehlung:** `tabIndex={-1}` und `autoComplete="off"` ergänzen (analog `EbookForm`).

---

## 🟠 Mittel

### Sicherheit / Zugriffsschutz

**🟠-6 Offener Redirect im Auth-Callback (Phishing-Vektor)**
`src/app/auth/callback/route.ts:9,15` – `next` wird ungeprüft aus der Query an `origin` gehängt (kein `/`-Präfix-Check, kein Verbot von `//`/`@`/absoluten URLs). Ein präparierter Bestätigungs-/Magic-Link (`…&next=@evil.tld/phish`) leitet das Opfer nach dem Code-Exchange auf eine Fremddomain – unter dem Deckmantel der echten Domain. Die korrekte `safeRedirect()`-Prüfung existiert bereits in `src/app/auth/actions.ts:13-17`, wird im Callback aber nicht genutzt.
**Empfehlung:** Dieselbe `safeRedirect()`-Logik im Callback anwenden, bevor `next` eingesetzt wird.

**🟠-7 PDF-Download-Routen prüfen die Bezahlschranke nicht**
`src/app/mitglieder/arbeitsheft/route.ts`, `.../stufe/[nr]/lektion/route.ts`, `.../stufe/[nr]/uebungen/route.ts`, `.../wissen/[slug]/lektion/route.ts` – die Bezahlschranke `REQUIRE_ACTIVE_MEMBERSHIP` wird nur im Layout (`src/app/mitglieder/layout.tsx:42-45`) geprüft, das `route.ts`-Handler **nicht** umschließt. Der Proxy prüft dort nur `!user`. Sobald `REQUIRE_ACTIVE_MEMBERSHIP=true` (aktuell Default `false`, `src/lib/supabase/config.ts:36-37`) gesetzt wird, könnte jeder eingeloggte, nicht zahlende Nutzer alle PDFs direkt herunterladen – die Bezahlschranke wäre für Downloads wirkungslos.
**Empfehlung:** Vor Aktivierung der Bezahlschranke denselben `isActiveMember`-Check in die vier `route.ts`-Dateien aufnehmen.

**🟠-8 PDF-Downloads: Proxy als einzige Schutzschicht (Single Point of Failure)**
Dieselben vier `route.ts`-Dateien haben keinen eigenen `getUser()`-Guard (bewusst dokumentiert). Wirksam im Normalbetrieb, aber bei künftiger Änderung des `matcher` (`src/proxy.ts:139-141`) oder versehentlichem Umbenennen von `proxy.ts` sofort ungeschützt. Next.js' eigene Doku warnt genau davor.
**Empfehlung:** Leichten `getUser()`-Guard in den vier Handlern ergänzen – Vorbild: `src/app/mitglieder/begleiter/antwort/route.ts:50-54`.

**🟠-9 `/admin` ohne Proxy-Schutzschicht (Architektur-Inkonsistenz)**
`src/proxy.ts:74` schützt nur `/mitglieder` und `/login`. `/admin` verlässt sich allein auf den serverseitigen Redirect in `src/app/admin/page.tsx:99-100` (+ eigener `isAdminEmail()`-Check je Seite/Route). Funktional korrekt, weicht aber vom dokumentierten Defense-in-Depth-Prinzip ab.
**Empfehlung:** `/admin` in den Proxy-Matcher aufnehmen, damit der Schutz zweischichtig ist.

### Barrierefreiheit / UX (Mitgliederbereich)

**🟠-10 KI-Begleiter-Overlay: kein Escape, kein Fokus-Trap**
`src/components/members/BegleiterLauncher.tsx:49-86` – Panel hat `role="dialog"`, aber kein `aria-modal="true"`, keinen Escape-Handler, keine Fokus-Verschiebung ins Panel beim Öffnen und kein Zurücksetzen beim Schließen. Codebase-weit existiert **kein** Escape-Handler. Der zentrale KI-Begleiter ist für Tastatur-/Screenreader-Nutzer dadurch schwer zu bedienen.
**Empfehlung:** `aria-modal="true"`, Escape-Listener, Fokus beim Öffnen auf Schließen-Button/Überschrift, beim Schließen zurück auf den Auslöser.

**🟠-11 Fehlende `aria-live`-Regionen bei Formularfehlern**
`src/components/auth/AuthForm.tsx:116-120` (Login/Registrierung) und `src/components/sections/ContactForm.tsx:157-161` (Kontakt) rendern Fehler als schlichtes `<p>` ohne `role="alert"`/`aria-live`. Screenreader-Nutzer bemerken den Fehler nicht. Vorbild bereits vorhanden: `BegleiterChat.tsx:294-301` (`role="status"`).
**Empfehlung:** `role="alert"` auf die Fehler-Elemente; bei `ContactForm` die Erfolgsmeldung (Zeile 56-77) mit `aria-live="polite"` bzw. Fokusverschiebung.

**🟠-12 TestCurve ohne Textalternative der Datenpunkte**
`src/components/members/TestCurve.tsx:26-32` (eingebunden `src/app/mitglieder/journal/page.tsx:223-225`). SVG hat `role="img"` + sinnvolles `aria-label`, aber keine textuelle Wiedergabe der Werte (Datum → Stufe). Screenreader-Nutzer erfahren *dass*, nicht *welchen* Verlauf.
**Empfehlung:** `sr-only`-Liste/-Tabelle „TT.MM.JJJJ: Stufe X" pro Punkt oder `aria-describedby`.

**🟠-13 FAQ-Akkordeon ohne `aria-controls`/Panel-`id`**
`src/components/sections/Faq.tsx:31-55` – `aria-expanded` vorhanden, aber Button und Antwort-Panel nicht per `aria-controls`/`id` verknüpft, Panel ohne `role="region"`.
**Empfehlung:** Panel-`id` vergeben und per `aria-controls` verknüpfen.

**🟠-14 Bewusstseinstest: Antwort-Buttons nicht mit Frage verknüpft**
`src/components/sections/ConsciousnessTest.tsx:226-260` – Frage steht als eigenständiges `<p>`, Antwort-Buttons ohne `aria-labelledby`/`role="group"`-Bezug. Bei Sprung-Navigation geht der Fragenkontext verloren.
**Empfehlung:** `<div role="group" aria-labelledby="frage-id">` um die Optionen, `id` auf das Fragen-`<p>`.

### Inhalt / SEO

**🟠-15 `/mitgliedschaft` fehlt in der Sitemap** *(von zwei Agenten gemeldet)*
`src/app/sitemap.ts:10-19` – die wichtigste Conversion-Seite (kostenpflichtige Mitgliedschaft, eigener `alternates.canonical`, zentral in `mainNav`) fehlt in der `routes`-Liste.
**Empfehlung:** `"/mitgliedschaft"` aufnehmen.

**🟠-16 Sitemap listet Seiten, die robots.txt blockiert**
`src/app/sitemap.ts:17-18` listet `/impressum` und `/datenschutz`, während `src/app/robots.ts:9` genau diese per `disallow` blockiert – und beide Seiten zusätzlich `robots:{index:false}` tragen. Drei widersprüchliche Crawler-Signale.
**Empfehlung:** Aus der Sitemap entfernen **oder** `disallow` entfernen und nur per Meta-`noindex` steuern (sonst kann Google den `noindex` gar nicht lesen).

**🟠-17 Fehlende `canonical`/`og:url` auf den meisten öffentlichen Seiten**
Nur `/bewusstseinstest` und `/mitgliedschaft` setzen `alternates.canonical`. `/die-7-stufen`, `/ueber-mich`, `/kontakt`, `/blog`, `/impressum`, `/datenschutz` haben keinen Canonical, ihr `og:url` zeigt (im Build verifiziert) fälschlich auf die Startseite.
**Empfehlung:** Pro öffentlicher Seite `alternates.canonical` + passendes `openGraph.url` setzen – am besten zentral über einen Metadata-Helper.

**🟠-18 Impressum: USt-IdNr.-Platzhalter live sichtbar**
`src/app/impressum/page.tsx:20-48` – gelber Hinweis-Banner „Noch offen ist die USt-IdNr. … bitte eintragen" und `[USt-IdNr. bitte eintragen]` im Fließtext. Anschrift/Name/E-Mail sind korrekt gefüllt.
**Empfehlung:** USt-IdNr. eintragen oder (falls keine vorhanden, z. B. Kleinunternehmer) den Absatz neutral formulieren und den TODO-Banner entfernen.

**🟠-19 Alle Stufen-/Praxis-/Vertiefungsvideos zeigen dasselbe Platzhaltervideo**
`src/lib/site.ts:22-27` (`placeholderVideoId: "gOvtKBnqGvk"`), genutzt u. a. in `stufe/[nr]/page.tsx:117`, `praxis/[slug]/page.tsx:123`. Nur `atembeobachtung` hat eine echte YouTube-ID; sonst überall `video: null` → generisches Begrüßungsvideo. Technisch sauberer Fallback, aber jeder zahlende Besucher sieht bei jeder Stufe dasselbe Video (kann als „stufenspezifisch" missverstanden werden).
**Empfehlung:** Für die 7 Stufen-Lektionen eigene Videos produzieren oder bis dahin den bereits implementierten „folgt in Kürze"-Zustand statt des generischen Videos aktivieren.

**🟠-20 Mitgliedschaftspreis laut Code-Kommentar noch Platzhalter**
`src/app/mitgliedschaft/page.tsx:21` (`// Preis-Platzhalter – vor dem Livegang durch das echte Modell ersetzen.`). Angezeigt: 49 €/Monat, 490 €/Jahr – plausibel, aber laut eigener Doku zwingend gegen den in Stripe hinterlegten Preis abzugleichen.
**Empfehlung:** Vor Live-Gang verifizieren, dass `PRICE`/`PRICE_PER` exakt der Stripe-`STRIPE_PRICE_ID` entsprechen.

---

## 🟡 Niedrig / Politur

**🟡-21 Bewusstseinstest → Login: Sackgasse für ausgeloggte Mitglieder (UX)**
`src/components/sections/ConsciousnessTest.tsx:160-188` – ohne aktive Session (`memberSaved === false`) zeigt das Ergebnis nur „Klarheitsgespräch"/„E-Book". Kein „Bereits Mitglied? Einloggen, um dein Ergebnis zu speichern", und die Antworten werden nirgends zwischengespeichert. Ein bestehendes, gerade ausgeloggtes Mitglied muss den Test nach dem Login komplett neu durchlaufen, damit `saveStartStage` (`src/app/bewusstseinstest/actions.ts:15`) greift.
**Empfehlung:** Bei `memberSaved === false` einen Login-Link (`/login?redirect=/bewusstseinstest`) anzeigen bzw. das Ergebnis clientseitig zwischenspeichern und nach dem Login automatisch nachtragen.

**🟡-22 Bewusstseinstest: Score/Stufe nicht serverseitig neu berechnet**
`src/app/bewusstseinstest/actions.ts:15-28` – `saveStartStage(stage, scores)` prüft nur Wertebereich/Typ; die Berechnung (`scoreByStage()`) passiert nur im Client. Ein Nutzer kann sich per DevTools beliebige (Max-)Werte ins **eigene** Profil schreiben. Identität ist erzwungen (`.eq("id", user.id)`), kein Fremdzugriff/keine Rechte-Eskalation – nur die eigene „Wachstumskurve" ist manipulierbar.
**Empfehlung:** Rohe Antworten (0–4, 21 Werte) übergeben und Score/Stufe serverseitig mit `scoreByStage()`/`topStage()` neu berechnen.

**🟡-23 Rate-Limiting nur In-Memory**
`src/app/api/kontakt/route.ts:30-42`, `src/app/api/ebook/route.ts:26-37` – Map im Prozessspeicher (5/10 Min pro IP), geht bei Neustart/Skalierung verloren, kein Schutz gegen verteilten Spam. Bewusste Design-Entscheidung für die Ein-Container-Installation; durch Honeypot + Servervalidierung + Resend-Kontingent abgefedert.
**Empfehlung:** Bei beobachtetem Missbrauch auf gemeinsamen Speicher (Redis/Upstash) umstellen.

**🟡-24 `CRON_SECRET`-Vergleich nicht zeitkonstant**
`src/app/api/impulses/route.ts:32-37` – `===` statt `crypto.timingSafeEqual`. Theoretisches Timing-Risiko, praktisch sehr gering (langes Zufalls-Secret).
**Empfehlung:** Bei Bedarf `crypto.timingSafeEqual`.

**🟡-25 Path-Traversal-Route ohne automatisierten Test**
`src/app/admin/vorlagen/datei/[...pfad]/route.ts` – Schutz ist robust (normalize + Präfix-Verweigerung + `startsWith(ROOT+"/")` + Endungs-Whitelist + Admin-Auth mit bewusstem 404), aber ungetestet. Kein akuter Fund.
**Empfehlung:** Bei künftigen Änderungen gegen Encoding-Tricks (`%2e%2e`, doppelt kodierte Slashes) erneut prüfen; Regressionstest ergänzen.

**🟡-26 Reduzierte Text-Deckkraft nahe AA-Schwelle**
`text-cream/50`–`/60` auf `bg-navy-900`, u. a. `src/app/mitgliedschaft/page.tsx:337,363,372,381,386,391`, `Hero.tsx:64,104`, `FinalCta.tsx:40`. Rechnerisch meist über AA, `/50` bei kleinen Texten grenzwertig.
**Empfehlung:** Bei `text-xs`/`text-sm` auf dunklem Grund mind. `/60`; mit Kontrast-Tool nachmessen.

**🟡-27 Autosave-Status im Journal nicht live angesagt**
`src/components/members/JournalReflection.tsx:111-122` – „Speichert…"/„Gespeichert ✓" ohne `aria-live`.
**Empfehlung:** `aria-live="polite"` auf den Status-`<span>`.

**🟡-28 ReadingPanel-Fehlermeldung ohne Live-Region**
`src/components/members/ReadingPanel.tsx:94-98` – analog 🟠-11, geringere Priorität (Zusatzfunktion).
**Empfehlung:** `role="status"` ergänzen.

**🟡-29 `src/lib/vorlagen.ts` mit veraltetem Platzhalter-Hinweis**
`src/lib/vorlagen.ts:171` – interner Admin-Hinweis „Impressum/Datenschutz enthalten Platzhalter…" ist nur noch für die USt-IdNr korrekt. Kein Nutzerimpact.
**Empfehlung:** Redaktionell auf aktuellen Stand bringen.

**🟡-30 Telegram-Social-Link als offener TODO-Kommentar**
`src/lib/site.ts:34` – reiner Code-Kommentar, kein Nutzerimpact.
**Empfehlung:** Bei Gelegenheit auflösen oder entfernen.

---

## Sonderthema: Bewusstseinstest (öffentlich + geschützt)

Der Test wurde in beiden Kontexten von vier Agenten geprüft. Gemeinsame Datenquelle ist `src/lib/consciousness-test.ts`; öffentlicher Test (`src/app/bewusstseinstest/`), gespeichertes Gedankenprofil (`src/app/mitglieder/gedankenprofil/`), Standortbestimmung und die Verlaufskurve (`src/components/members/TestCurve.tsx`) speisen sich daraus – **Skala und Stufen-Benennung sind dadurch automatisch synchron**.

| Aspekt | Befund |
|---|---|
| Inhaltliche Vollständigkeit (21 Fragen, 7 Auswertungen) | ✅ lückenlos, öffentlich ↔ geschützt konsistent |
| Datenschutz gespeicherter Ergebnisse (IDOR) | ✅ an Session gebunden, serverseitig `.eq("id", user.id)`, RLS aktiv – **kein Fremdzugriff** |
| Speicher-Integrität | 🟡 Score/Stufe kommt vom Client, nur eigenes Profil manipulierbar (🟡-22) |
| Übergang öffentlich → geschützt | 🟡 Sackgasse für ausgeloggte Mitglieder, kein Login-Hinweis/Zwischenspeicher (🟡-21) |
| Bedienbarkeit (a11y) | 🟠 Frage↔Antwort nicht per ARIA verknüpft (🟠-14); Verlaufskurve ohne Textalternative (🟠-12) |
| Progress/Navigation | ✅ „Frage X von Y" als Textalternative vorhanden, Fortschrittsbalken sichtbar |

Fazit: Der Test ist inhaltlich und beim Datenschutz **stark**. Handlungsbedarf besteht bei UX-Feinschliff (Login-Übergang), Speicher-Integrität (serverseitige Neuberechnung) und Screenreader-Zugänglichkeit.

---

## Positiv bestätigt (kein Handlungsbedarf)

- **Login-Schutz:** zentraler `proxy.ts` + Layout-Guard (Defense-in-Depth) für `/mitglieder/**`; alle 9 Mitglieder-Seiten `noindex`.
- **Kein IDOR / keine Login-Umgehung** in den geprüften Pfaden.
- **RLS** auf allen nutzerbezogenen Tabellen aktiv (`auth.uid() = user_id`); `ebook_leads`/`memberships` bewusst nur per Service-Role.
- **Stripe-Webhook** mit korrekter Signaturprüfung; ohne Secret 503.
- **Keine geleakten Secrets**; Service-Role-Key ausschließlich serverseitig.
- **Kein XSS** (`dangerouslySetInnerHTML` nirgends; `escapeHtml()` in E-Mail-HTML).
- **Security-Header** (HSTS, X-Frame-Options, CSP …) global gesetzt.
- **Build & Lint** fehlerfrei; `generateStaticParams` + `notFound()` durchgängig.
- **Content vollständig:** 7 Stufen, 14 Praxis, 29 Vertiefungen, 27 WDB-Kapitel, 23 Blog-Beiträge, alle referenzierten PDFs vorhanden.
- **a11y-Grundlage:** `html lang="de"`, funktionierender Skip-Link, `:focus-visible`, `prefers-reduced-motion`, beschreibende Alt-Texte, verknüpfte Formular-Labels, keine klickbaren `<div>`s.

---

## Die 3 wichtigsten nächsten Schritte

1. **Funktion/Marketing zuerst:** Toten „Zur Praxis"-Link (🔴-1) und den Verlust der Blog-Social-Vorschauen (🔴-2) beheben – beides trifft echte Nutzer bzw. jede geteilte URL und ist mit kleinem Eingriff erledigt.
2. **Tastatur-Barrieren schließen:** Unsichtbare, aber fokussierbare Elemente (🔴-3/-4/-5) und das Fokus-/Escape-Management im KI-Begleiter (🟠-10) – zusammen der größte Hebel für die Benutzerfreundlichkeit im Mitgliederbereich.
3. **Live-Gang-Hygiene:** Offenen Auth-Redirect (🟠-6) schließen, Impressum-USt-IdNr. und Stripe-Preis final setzen (🟠-18/-20) und die SEO-Trias korrigieren (Sitemap-Eintrag `/mitgliedschaft`, Sitemap↔robots-Widerspruch, fehlende Canonicals – 🟠-15/-16/-17). **Wichtig:** Vor jeder Aktivierung von `REQUIRE_ACTIVE_MEMBERSHIP=true` zuerst 🟠-7 umsetzen, sonst ist die Bezahlschranke für PDF-Downloads wirkungslos.

---

*Reiner Prüflauf – es wurde kein Produktivcode verändert. Umsetzung der Empfehlungen erst nach Rücksprache.*
