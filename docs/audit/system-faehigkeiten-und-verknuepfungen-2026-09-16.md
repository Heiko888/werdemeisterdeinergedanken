# System-Prüfung: Fähigkeiten & Verknüpfungen

**Datum:** 2026-09-16
**Umfang:** Gesamtsystem „Werde Meister deiner Gedanken" (Next.js + Supabase + Stripe)
**Ziel dieser Prüfung:** Erfassen, *was das System heute kann* (Fähigkeiten/Möglichkeiten) und *wo sinnvolle Verknüpfungen und Ergänzungen* fehlen – mit Schwerpunkt Admin-Bereich und bereichsübergreifende Vernetzung, damit das Gesamtangebot schlüssiger wird.
**Nicht Gegenstand:** Der Zugriffsschutz des Mitgliederbereichs (auf Wunsch ausgeklammert – er ist in Ordnung).
**Vorgehen:** Vier parallele Prüf-Agenten (Admin, öffentlicher Bereich, Backend/API/Datenmodell, Mitgliederbereich). Reine Code-Analyse, es wurde nichts am System verändert.

---

## 0. Gesamtbild in einem Satz

Das System ist funktional breit und technisch sauber gebaut (sichere Bezahl- und Mail-Flüsse, ein datengetriebener Mitgliederbereich mit KI-Funktionen, drei echte Admin-CRUD-Bereiche). Die größte übergreifende Schwäche ist **fehlende Zusammenführung**: Leads, Käufer und Mitglieder laufen in getrennte Kanäle, ohne zentralen Admin-Überblick; die bezahlten Produkte (Buch, Mitgliedschaft) sind im Content kaum verlinkt; und verhaltensnahe Mitglieder-Tools erzeugen Daten, die nirgends zurückfließen.

---

## 1. Was das System heute kann (Fähigkeiten-Landkarte)

### Öffentlicher Bereich (Marketing & Funnel)
- **Landingpage** aus 10 Sektionen (Hero, 7 Stufen, Kompass, WhyMe, Testimonials, LeadMagnet, FAQ …).
- **Content/SEO:** „Die 7 Stufen"-Seite, **Blog** mit Artikeln + kontextabhängigem End-CTA, RSS-Feed, Sitemap, robots.
- **Lead-Magnete:** Gratis-E-Book (E-Mail-Capture mit Double-Opt-in), Bewusstseinstest (21 Fragen → Stufe + Empfehlung).
- **Verkauf:** Buch (PDF 29,90 € / Print 39,90 €) und Mitgliedschaft (49 €/Monat, 490 €/Jahr) – beide über Stripe.
- **Beziehung:** Kontakt/Erstgespräch, Klarheitsgespräch-Fragebogen, Über-mich.

### Bezahlung & Backend (technische Fähigkeiten)
- **Stripe:** Abo-Checkout (Subscription, Promo-Codes, Gast-Checkout) + Buch-Einmalkauf (PDF/Print mit Lieferadresse) + signaturgeprüfter Webhook.
- **Mitglieder-Provisionierung:** Nach Abo-Kauf wird automatisch ein Supabase-Konto angelegt und ein Passwort-Setzen-Link versendet.
- **E-Mail (Resend):** Kontakt-Auto-Antwort, E-Book-DOI + Lieferung, Buch-Lieferung, wöchentliche Impulse, Membership-Mails; überall 1-Klick-Abmeldung wo relevant.
- **Sicherheit:** Signaturprüfung, timing-safe Vergleiche, RLS/Service-Role-Trennung, Double-Opt-in, Honeypots, Rate-Limiting, HMAC-signierte Download-Tokens.
- **Datenmodell:** 13 dokumentierte Supabase-Tabellen (Profile, Fortschritt, Notizen, Testverlauf, Leads, Mitgliedschaften, KI-Snapshots, Rückkehr, Redaktionsplan, Coaching-Methoden).

### Admin-Bereich (8 Sektionen)
- **Echte CRUD-Werkzeuge:** Erstgespräche (voll ausgebautes Gesprächs-Cockpit), Redaktionsplan (Social-Media-Planung), Methoden (Coaching-Methoden-Nachschlagewerk).
- **Read-only Übersichten:** Dashboard/Cockpit (Funnel-Kennzahlen + Content-Status), Seiten-Sitemap, Vorlagen-Galerie mit Download, Bewusstseinsbibliothek, Marken-Übersicht.
- **Funnel-Anbindung:** Klarheitsgespräch-Formular → landet automatisch als „Offener Fragebogen" im Erstgespräch-Cockpit (durchgängig verbunden).

### Mitgliederbereich (datengetrieben + KI)
- **Lernpfad:** 7 Stufen mit Lektionen/Videos/PDFs + Abschluss-Markierung, 21-Tage-Programm, Wissensdatenbank (27 Kapitel, Lesefortschritt), Vertiefungen (16+), Praxis-Bibliothek.
- **Reflexion:** Journal mit Autosave, Standortbestimmung, Wachstumskurve (Testverlauf), tägliche „Rückkehr" mit Streak.
- **KI-Funktionen (Anthropic Claude):** KI-Begleiter (Chat mit Profil-/Journal-/Katalog-Kontext), KI-Reading, Muster-Spiegel, Manipulations-Detektor.
- **Roter Faden, der gut funktioniert:** Test → Profil/Dashboard/Begleiter → Journal-Reflexion → Fortschritt.

---

## 2. Die größten Verknüpfungs-Lücken (bereichsübergreifend)

Drei Muster ziehen sich durch alle vier Analysen:

1. **Leads/Käufer/Mitglieder fließen in kein zentrales Admin-Bild.** Kontaktanfragen und Buch-Bestellungen werden gar nicht gespeichert; E-Book-Leads und Mitgliedschaften existieren als Daten, sind im Admin aber nur als nackte Summen sichtbar.
2. **Die bezahlten Produkte sind Sackgassen.** Buch und Mitgliedschaft werden fast nur über die Hauptnavigation erreicht – der Content (Startseite, Blog, 7-Stufen, Testergebnis) führt kaum dorthin.
3. **Verhaltensnahe Tools sind Inseln.** Detektor, Praxis, Programm, Rückkehr und Lesefortschritt erzeugen Daten, die weder in den KI-Begleiter noch in die Empfehlungslogik zurückfließen.

---

## 3. Priorisierte Empfehlungen

Legende Aufwand: **S** klein · **M** mittel · **L** groß.

### 🔴 HOCH – zuerst angehen

| # | Thema | Was fehlt / Problem | Vorschlag | Aufwand |
|---|-------|---------------------|-----------|---------|
| A1 | **Zentrale Lead-/Kunden-Übersicht im Admin** | Kontaktanfragen (`/api/kontakt`) werden nur gemailt, nicht gespeichert; Buch-Bestellungen werden nirgends persistiert; E-Book-Leads & Mitgliedschaften nur als Summen sichtbar. | Kontaktanfragen + Buch-Bestellungen in DB schreiben; Admin-Listen `/admin/leads`, `/admin/mitglieder`, `/admin/bestellungen` (Status, CSV-Export). | M |
| A2 | **Admin zeigt echte Abos/Umsätze nicht** | Dashboard zählt als „Mitglieder" alle `profiles`-Konten, liest die `memberships`-Tabelle nie (kein active/cancelled-Breakdown, kein Buch-Umsatz). | `memberships` nach Status auswerten + eigene Kacheln; Buch-Orders aufnehmen. | M |
| A3 | **Bug: falscher Anker nach dem Bewusstseinstest** | Button „E-Book sichern" im Testergebnis verlinkt auf `/#angebot` (= 7-Stufen-Karten), nicht auf das E-Book-Formular. | `href` auf `/gratis-ebook` (bevorzugt) bzw. `/#ebook` korrigieren. | S |
| A4 | **Bezahlte Produkte im Content verlinken** | Kein interner Link auf `/buch` außer der Nav; 7-Stufen-Seite & Testergebnis führen nicht zur Mitgliedschaft; Blog kann nie zu Buch/Mitgliedschaft leiten (CTA-Varianten fehlen). | Buch-Sektion auf Startseite; „Mitgliedschaft"-CTA auf 7-Stufen & im Testergebnis; Blog-CTA-Varianten `buch` + `mitgliedschaft` ergänzen. | M |
| A5 | **Fehlende Migrationen für das Admin-/Erstgespräch-Fundament** | `erstgespraech_*`-Tabellen, `ist_admin()`, `admin_users`, DB-Trigger + Edge Function `neuer-fragebogen` leben nur in der Live-DB, in keiner Migrationsdatei → DB nicht reproduzierbar. | Live-Schema als Migration(en) + `supabase/functions/neuer-fragebogen/` nachziehen. | M |
| A6 | **Detektor & Praxis sind Sackgassen (Mitglieder)** | Detektor-Ergebnisse werden nicht gespeichert; Praxis hat keine „erledigt"-Markierung → kein Rückfluss in Profil/Begleiter/Momentum. | Detektor-Funde als Journal-Typ speichern; Praxis-Completion analog Stufenabschluss. | M |

### 🟡 MITTEL – lohnt sich als Nächstes

| # | Thema | Vorschlag | Aufwand |
|---|-------|-----------|---------|
| B1 | **Gemeinsame Admin-Navigation** | Ein `admin/layout.tsx` mit Sidebar/Tabs über alle 8 Sektionen – heute erzwingt jeder Wechsel den Umweg übers Dashboard. | M |
| B2 | **Admin-Sitemap unvollständig** | In `admin/seiten` fehlen die Einträge `erstgespraeche` und `methoden` (existieren, aber nicht verlinkt). | S |
| B3 | **Zahlung ↔ Konto fest verknüpfen** | `memberships` ist nur per E-Mail geschlüsselt, ohne FK zu `auth.users`/`profiles` → bei abweichender/geänderter E-Mail droht Zugangsverlust. `memberships.user_id` ergänzen. | M |
| B4 | **`/gratis-ebook` einbinden** | Die dedizierte Lead-Magnet-Seite ist öffentlich nirgends verlinkt (nur Homepage-Anker `/#ebook` wird genutzt). Öffentliche E-Book-CTAs dorthin lenken. | S |
| B5 | **E-Book-Leads in eine Nurture-Strecke** | E-Book-Leads bekommen nach der Lieferung nie wieder eine Mail; Impulse gehen nur an eingeloggte Mitglieder → keine Brücke E-Book → Mitgliedschaft. | M |
| B6 | **Begleiter-Kontext um Verhaltensdaten erweitern** | KI-Begleiter kennt nur Profil + Journal, nicht Rückkehr-Streak/Programm-/Lesefortschritt → kann „Dranbleiben" nicht konkret spiegeln. | S |
| B7 | **Test-Ergebnis → Programm-Empfehlung** | `start_stage` steuert nur Dashboard-Anker; keine Weiche „niedrige Stufe → 21-Tage-Programm / hohe Stufe → vertiefen". | M |
| B8 | **Begriffe vereinheitlichen** | „Erstgespräch" vs. „Klarheitsgespräch" plus separate gleichnamige Seite verwirren – einen Begriff/Weg festlegen. | S |
| B9 | **Buch ↔ Mitgliedschaft gegenseitig verlinken** | Aktuell nur `/buch` → `/mitgliedschaft`, nicht zurück. | S |

### 🟢 NIEDRIG – Feinschliff / später

- **C1** Impuls-Serie: läuft endlos zyklisch (dieselben 7 Impulse) und der Cron ist nicht im Repo definiert → Cron einchecken, Serie beenden oder bewusst kennzeichnen.
- **C2** In-Memory-Rate-Limiting (Kontakt/E-Book/Klarheitsgespräch) ist bei mehreren Instanzen wirkungslos → gemeinsamer Speicher bei Skalierung.
- **C3** Buch-Käufer erhalten keinen Account → optionaler Upsell/Onboarding-Flow Buchkäufer → Mitglied.
- **C4** KI-Snapshots (Reading/Muster-Spiegel) werden gespeichert, aber vom Begleiter nie referenziert.
- **C5** Lesefortschritt Wissensdatenbank ist außerhalb der eigenen Seite unsichtbar (nicht im Dashboard/Profil).
- **C6** Keine Erinnerungs-Schleife für die tägliche Rückkehr (Streak-Logik ist da).
- **C7** Stufenabschluss ohne „nächster Schritt/Feier" und ohne Anstoß zur Test-Wiederholung (die Wachstumskurve lebt davon).
- **C8** Content bewusst „as Code" (Blog/Stufen/Bibliothek/Marken) – kein CMS. Konsistente Entscheidung, nur als Erwartungslücke notiert.
- **C9** `ebook_leads.source` wird nie gesetzt (Lead-Herkunft nicht unterscheidbar); Coaching-Methoden-Seed läuft nicht automatisch; Stripe-API-Version nicht gepinnt.

---

## 4. Empfohlene Reihenfolge (Vorschlag)

1. **Schnelle Gewinne (S):** A3 (Anker-Bug), B2 (Sitemap-Links), B4 (`/gratis-ebook` einbinden), B8/B9 (Begriffe & Buch↔Mitgliedschaft).
2. **Admin schlüssig machen (M):** A1 + A2 + B1 – zentrale Lead-/Kunden-/Umsatz-Sicht mit gemeinsamer Navigation.
3. **Funnel schärfen (M):** A4 – bezahlte Produkte im Content verankern.
4. **Fundament sichern (M):** A5 (Migrationen nachziehen) + B3 (Zahlung↔Konto).
5. **Mitglieder-Erlebnis runden (M):** A6 + B6 + B7.

---

## 5. Herkunft der Befunde

Erstellt durch ein Team aus vier Prüf-Agenten (2026-09-16):
- **Admin-Bereich** – Fähigkeiten & Verknüpfungen der 8 Sektionen.
- **Öffentlicher Bereich** – Seiten, Navigation, Conversion-Funnels.
- **Backend/API/Datenmodell** – API-Routen, Stripe, E-Mail/Leads, Supabase-Migrationen.
- **Mitgliederbereich** – Feature-Fähigkeiten, KI-Funktionen, Vernetzung.

Alle Befunde stammen aus reiner Code-Analyse; am laufenden System wurde nichts verändert. Die Detail-Befunde mit exakten Datei-/Zeilen-Belegen liegen in den jeweiligen Agenten-Berichten dieser Session vor.
