# Seed-Referenz: Coaching-Methoden-Bibliothek

Dieser Ordner enthält den Inhalt der Coaching-Methoden-Bibliothek **als Referenz** –
er wird **nicht** automatisch ausgeführt. Migration und Seed sind bereits in der
Produktionsdatenbank eingespielt (siehe `docs/AENDERUNGEN.md`, 2026-09-16).

| Datei | Zweck |
|---|---|
| `coaching_methoden.sql` | Idempotenter Seed (13 Kategorien + 141 Methoden, `on conflict do update`). Überschreibt bewusst **nicht** `eigene_notizen` oder `aktiv`. |
| `coaching_methoden.json` | Gleicher Inhalt als JSON – Fallback, Tests, Import-Skripte. |

**Inhaltsversion:** 1.4 · Prüfsumme (JSON): `370c560d600bf2b5f36b79adc34f104d`

Die Tabellen selbst legt die Migration
`supabase/migrations/20260916084531_coaching_methoden_schema.sql` an. Jede spätere
inhaltliche Änderung erhöht die Version (1.5, 1.6 …) und wird in
`docs/AENDERUNGEN.md` vermerkt, damit der Serverstand nachvollziehbar bleibt.
