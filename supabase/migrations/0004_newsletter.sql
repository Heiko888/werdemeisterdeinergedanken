-- ============================================================
-- Mitgliederbereich – Ausbau
-- 0004: E-Mail-Impulse (Opt-in + Versand-Zustand)
--
-- Speichert am Profil, ob die Person wöchentliche Impulse erhalten möchte,
-- welchen Impuls sie zuletzt bekommen hat und einen Token für den
-- 1-Klick-Abmeldelink (DSGVO). Setzt Migration 0002 voraus.
--
-- Hinweis zur Sicherheit: newsletter_opt_in darf die Person selbst setzen
-- (eigenes Abo) – das erlaubt die bestehende Policy profiles_update_own.
-- Der Serienversand liest/aktualisiert alle Profile ausschließlich über den
-- Service-Role-Key (RLS-Bypass) in der geschützten Cron-Route.
-- ============================================================

alter table public.profiles
  add column if not exists newsletter_opt_in boolean not null default false,
  add column if not exists newsletter_opted_in_at timestamptz,
  add column if not exists impulse_index smallint not null default 0,
  add column if not exists unsubscribe_token uuid not null default gen_random_uuid();

-- Absicherung, falls die Spalte aus einem früheren Lauf bereits (nullbar) existierte.
update public.profiles
  set unsubscribe_token = gen_random_uuid()
  where unsubscribe_token is null;
