-- Mitgliedschaft fest ans Login-Konto koppeln (B3).
--
-- Bisher war `memberships` nur per E-Mail geschlüsselt. Ändert ein Kunde seine
-- Login-E-Mail (oder zahlt mit einer anderen Adresse als er sich anmeldet),
-- fand die Bezahlschranke die Mitgliedschaft nicht mehr. `user_id` verankert den
-- Zugang stabil an auth.users; der Stripe-Webhook füllt sie beim Bereitstellen
-- des Kontos. Additiv & nullable – bricht keine bestehende Zeile.
--
-- Eingespielt in Produktion am 2026-09-16 (Version 20260916193035).

alter table public.memberships
  add column if not exists user_id uuid references auth.users(id) on delete set null;

create index if not exists memberships_user_id_idx
  on public.memberships (user_id);
