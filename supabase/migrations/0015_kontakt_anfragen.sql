-- ============================================================
-- Kontaktanfragen (Persistenz des Kontaktformulars)
--
-- Bisher verschickte /api/kontakt nur eine E-Mail an Heiko. Bei Mail-Ausfall
-- oder Spam-Filter gingen Anfragen verloren und es gab keinen Überblick.
-- Diese Tabelle sichert jede eingehende Anfrage zusätzlich in der Datenbank,
-- sichtbar unter /admin/kontakt. Der Mailversand bleibt unverändert; das
-- Speichern ist „best effort" und darf den Versand nicht blockieren.
--
-- Sicherheit: RLS ist aktiv, aber es gibt KEINE Policies. Dadurch kommen
-- weder anon- noch authenticated-Clients an die Tabelle – ausschließlich der
-- Service-Role-Key (RLS-Bypass) in den serverseitigen Routen.
--
-- Setzt Migration 0002 voraus (Funktion public.touch_updated_at()).
-- ============================================================

create table if not exists public.kontakt_anfragen (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  thema text,
  message text not null,
  status text not null default 'neu'
    check (status in ('neu', 'beantwortet', 'archiviert')),
  request_ip text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.kontakt_anfragen enable row level security;

create index if not exists kontakt_anfragen_created_idx
  on public.kontakt_anfragen (created_at desc);

drop trigger if exists t_kontakt_anfragen_touch on public.kontakt_anfragen;
create trigger t_kontakt_anfragen_touch
  before update on public.kontakt_anfragen
  for each row execute function public.touch_updated_at();
