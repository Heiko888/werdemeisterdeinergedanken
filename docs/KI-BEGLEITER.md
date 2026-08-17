# KI-Begleiter im Mitgliederbereich

Ein Gespräch unter **`/mitglieder/begleiter`**: Mitglieder fragen, der Begleiter
antwortet – auf Basis der echten Inhalte des Angebots und des eigenen
Gedankenprofils.

---

## Was der Begleiter kann

- Er kennt **alle Inhalte**: die 7 Stufen, alle Vertiefungen, alle
  Praxis-Anleitungen und die Kapitel der Wissensdatenbank – jeweils mit dem
  echten Pfad. Er verweist nur auf Seiten, die es wirklich gibt.
- Er kennt den **Stand der Person**: Schwerpunkt-Stufe, Ausprägung aller sieben
  Stufen und abgeschlossene Stufen – dieselbe Grundlage wie das Gedankenprofil.
  Ohne Bewusstseinstest weiß er das und fragt nach, statt zu raten.
- Er **merkt sich das Gespräch**: Der Verlauf liegt in Supabase und ist beim
  nächsten Besuch wieder da – auch auf einem anderen Gerät.
- Er **antwortet gestreamt**, Wort für Wort, statt zehn Sekunden lang einen
  Ladepunkt zu zeigen.

## Was er bewusst nicht tut

Im System-Prompt (`src/lib/begleiter-prompt.ts`) stehen harte Grenzen:

- keine Therapie, keine Beratung, keine Diagnosen, keine Deutung von Symptomen,
- keine medizinischen, juristischen oder finanziellen Ratschläge,
- keine erfundenen Titel, Pfade, Studien oder Zitate,
- keine Heilsversprechen und kein esoterisches Übertreiben.

Bei Hinweisen auf eine **akute Krise** (Suizidgedanken, Selbstverletzung, schwere
Not) bietet er keine Übung als Lösung an, sondern verweist ruhig auf
professionelle Hilfe: Telefonseelsorge 0800 111 0 111 / 0800 111 0 222
(kostenlos, rund um die Uhr), Österreich 142, Schweiz 143, Notfall 112. Derselbe
Hinweis steht dauerhaft unter dem Gespräch auf der Seite.

---

## Einrichten

1. **`ANTHROPIC_API_KEY`** setzen (lokal in `.env.local`, in Produktion in den
   Umgebungsvariablen). Derselbe Key versorgt auch das KI-Reading zum
   Gedankenprofil. Niemals mit `NEXT_PUBLIC_` prefixen.
2. **Migration einspielen:** `supabase/migrations/0009_begleiter_chat.sql`
   (Tabelle `public.begleiter_messages` mit Row-Level-Security).

Fehlt eines von beidem, bleibt die Seite erreichbar und erklärt ruhig, dass der
Begleiter noch nicht eingerichtet ist. Der Link im Mitglieder-Dashboard wird
dann gar nicht erst angezeigt – es entsteht also kein toter Weg.

---

## Kosten im Griff behalten

- **40 Nachrichten pro Mitglied und Tag** (rollierende 24 Stunden). Admins aus
  `ADMIN_EMAILS` sind ausgenommen. Einstellbar über `DAILY_MESSAGE_LIMIT` in
  `src/lib/begleiter.ts`.
- **Höchstens 2000 Zeichen je Frage** (`MAX_INPUT_CHARS`) – verhindert, dass
  ganze Dokumente hineinkopiert werden.
- **Nur die letzten 24 Nachrichten** gehen als Kontext mit (`HISTORY_LIMIT`).
  Ältere bleiben sichtbar, kosten aber nichts mehr.
- Antworten sind auf 120–200 Wörter angelegt; das Modell läuft mit niedrigem
  Denkaufwand (`effort: "low"`).

---

## Datenschutz

- Der Verlauf gehört ausschließlich dem Mitglied: Row-Level-Security lässt nur
  die eigenen Zeilen lesen, schreiben und löschen.
- **„Gespräch löschen“** unter dem Eingabefeld entfernt den kompletten Verlauf
  unwiderruflich.
- Die Seite ist auf `noindex` gesetzt und liegt hinter dem Login.

---

## Wie es zusammenhängt

| Datei | Aufgabe |
|-------|---------|
| `src/app/mitglieder/begleiter/page.tsx` | Die Seite (Server-Komponente, Login-Prüfung) |
| `src/components/members/BegleiterChat.tsx` | Das Gespräch im Browser samt Streaming-Anzeige |
| `src/app/mitglieder/begleiter/antwort/route.ts` | Erzeugt die Antwort und streamt sie |
| `src/app/mitglieder/begleiter/actions.ts` | Verlauf laden und löschen |
| `src/lib/begleiter.ts` | Typen, Grenzen, Texte (auch im Browser nutzbar) |
| `src/lib/begleiter-prompt.ts` | System-Prompt und Inhaltsverzeichnis (nur Server) |
| `supabase/migrations/0009_begleiter_chat.sql` | Tabelle für den Verlauf |

**Warum ein Route-Handler und keine Server-Action?** Nur so lässt sich die
Antwort streamen. Der Pfad liegt unter `/mitglieder` und wird deshalb schon vom
Proxy (`src/proxy.ts`) geschützt; weil Route-Handler von keinem Layout
umschlossen werden, prüft der Handler die Anmeldung zusätzlich selbst.

**Warum kommt der Verlauf aus der Datenbank und nicht aus dem Request?** So kann
niemand dem Begleiter über die Browser-Konsole eine erfundene Vorgeschichte
unterschieben.
