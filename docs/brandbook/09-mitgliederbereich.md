# 09 · Mitgliederbereich

Der geschützte Lernbereich unter `/mitglieder` – das Herzstück des Angebots.
Dieses Kapitel beschreibt **was er kann** (Funktionen) und **wie man ihn
bedient** (Anleitung). Er ist nur nach Login erreichbar.

## Was ist der Mitgliederbereich?

Ein begleiteter Lernraum, der die **7 Stufen der Bewusstseinsentwicklung** in
einen strukturierten Weg übersetzt – mit Lektionen, Übungen, einem
beschreibbaren Journal, Fortschrittsverfolgung, einer großen Wissens- und
Praxis-Bibliothek, geführten Programmen, PDF-Downloads und KI-gestützten
Werkzeugen.

## Funktionsübersicht

| Bereich | Was es kann |
|---------|-------------|
| **Dashboard** (`/mitglieder`) | Begrüßung mit Namen, Fortschrittsbalken (x/7), personalisierter Einstieg aus dem Bewusstseinstest, Schnellzugriffe, Newsletter-Opt-in |
| **Die 7 Stufen** (`/mitglieder/stufe/[nr]`) | Kerngedanke, Intro, Video, Lektion, 2 Übungen, Reflexionsfragen, Leitsatz, passende Vertiefungen, PDF-Downloads |
| **Vertiefungen** (`/mitglieder/wissen/[slug]`) | 29 Deep Dives: Lektion, Übungen, Reflexion, Quellen, optional PDF |
| **Praxis** (`/mitglieder/praxis`) | 13 geführte Meditationen, Atemübungen & Rituale mit Schritt-für-Schritt-Anleitung |
| **Wissensdatenbank** (`/mitglieder/wissensdatenbank`) | 27 Kapitel in 5 Teilen + Glossar, mit Evidenz-Legende |
| **Journal** (`/mitglieder/journal`) | Alle Reflexionen gesammelt, Statistik-Cockpit, Wachstumskurve, Muster-Spiegel, Druckfunktion |
| **Gedankenprofil** (`/mitglieder/gedankenprofil`) | Auswertung der 7 Stufen aus dem Bewusstseinstest, Bedarfsanalyse, optional KI-Reading |
| **21-Tage-Programm** (`/mitglieder/programm`) | „Autopilot-Ausstieg": geführtes Programm über 3 Wochen mit Tagesfortschritt |
| **Tägliche Rückkehr** (`/mitglieder/rueckkehr`) | Tägliche Mini-Praxis (Streak-artig) nach dem Programm |
| **KI-Begleiter** (`/mitglieder/begleiter`) | Chat, der Stufen/Vertiefungen/Praxis und den eigenen Stand kennt |
| **Manipulations-Detektor** (`/mitglieder/detektor`) | KI prüft eingefügten Text gegen 16 Manipulationstechniken |

> Der schwebende **KI-Begleiter** ist auf allen Mitglieder-Seiten erreichbar.

## Bedienungsanleitung (für Mitglieder)

Ein empfohlener Weg durch den Bereich:

1. **Anmelden** – über `/login` mit E-Mail & Passwort einloggen.
2. **Bewusstseinstest machen** (falls noch nicht) – daraus entsteht dein
   **Gedankenprofil** und ein personalisierter Einstieg auf dem Dashboard.
3. **Dashboard öffnen** – hier siehst du deinen Fortschritt und den empfohlenen
   nächsten Schritt.
4. **Stufe für Stufe arbeiten** – jede der 7 Stufen: Lektion lesen, die beiden
   Übungen machen, **Reflexionsfragen direkt ausfüllen** (wird automatisch
   gespeichert), Leitsatz mitnehmen. Stufe als **abgeschlossen** markieren – der
   Balken wächst.
5. **Vertiefen** – passende **Vertiefungen** (Deep Dives), **Praxis**-Übungen und
   die **Wissensdatenbank** nutzen, um einzelne Themen zu vertiefen.
6. **Dranbleiben** – das **21-Tage-Programm** gibt einen festen Rahmen; die
   **tägliche Rückkehr** hält die Praxis danach lebendig.
7. **KI-Werkzeuge** – den **Begleiter** bei Fragen nutzen, den **Detektor** für
   verdächtige Texte, **Muster-Spiegel/Reading** für tiefere Auswertungen.
8. **Journal & Downloads** – im **Journal** deinen Weg nachvollziehen (inkl.
   Wachstumskurve) und **PDFs** herunterladen (Arbeitsheft, Lektionen, Übungen,
   Vertiefungen).

## Downloads (PDFs)

Geschützt ausgeliefert (nur eingeloggt, aus `content/pdf/`, nicht öffentlich):

| Dokumenttyp | Anzahl |
|-------------|:------:|
| Gesamt-Arbeitsheft (alle 7 Stufen) | 1 |
| Stufen-Lektionen | 7 |
| Stufen-Übungen (mit Ausfüll-Linien) | 7 |
| Vertiefungen | 29 |
| **Gesamt** | **44** |

## Zugang & Schutz

- **Login** über Supabase Auth (E-Mail/Passwort).
- **Zweifacher Schutz** (Defense-in-Depth): zentral in der Middleware/Proxy und
  zusätzlich im `mitglieder/layout.tsx` sowie in jedem Download-Handler.
- **Bezahlschranke (Stripe)** ist vorbereitet, standardmäßig aber **aus**
  (`REQUIRE_ACTIVE_MEMBERSHIP=false`) – aktuell genügt ein Login.
- **Selbst-Registrierung** standardmäßig aus; Zugänge über Stripe-Checkout
  (Webhook) oder manuell.

## Umfang in Zahlen

| Element | Anzahl |
|---------|:------:|
| Stufen | 7 |
| Stufen-Lektionen | 7 |
| Übungen in den Lektionen | 14 (2 je Stufe) |
| Vertiefungen (Deep Dives) | 29 |
| Praxis-Übungen | 13 |
| Wissensdatenbank-Kapitel | 27 (+ Glossar) |
| 21-Tage-Programm | 21 Tage / 3 Wochen |
| PDF-Downloads | 44 |

## Hinweise zum Stand (⚠️ vor Livegang klären)

- **Preise sind Platzhalter** (aktuell 49 €/Monat, 490 €/Jahr) – vor dem
  Livegang durch das echte Modell ersetzen (`mitgliedschaft/page.tsx`).
- **Bezahlschranke aus:** derzeit sieht jeder eingeloggte Nutzer alles – für
  echten Paywall-Betrieb `REQUIRE_ACTIVE_MEMBERSHIP` aktivieren.
- **Videos fehlen fast überall** (`video: null`); nur eine Praxis hat eine echte
  YouTube-ID, sonst greift der Platzhalter „Video folgt in Kürze".
- **KI-Features** (Begleiter, Detektor, Reading, Muster-Spiegel) erscheinen nur
  bei gesetztem `ANTHROPIC_API_KEY`; sonst Fallback-Texte.
- **Wissensdatenbank vs. Vertiefungen** sind zwei getrennte Systeme
  (27 Markdown-Kapitel vs. 29 Deep Dives) – die Abgrenzung bewusst kommunizieren.

---

**Quelle der Wahrheit:** `src/app/mitglieder/**`, `src/lib/stage-lessons.ts`,
`src/lib/deep-dives.ts`, `src/lib/practices.ts`, `content/wissensdatenbank/`,
`content/pdf/`, `src/lib/membership.ts`, `src/lib/supabase/`
