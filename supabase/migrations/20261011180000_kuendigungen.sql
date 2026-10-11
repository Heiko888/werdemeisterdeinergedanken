-- ============================================================
-- Kündigungen (Kündigungsbutton /kuendigen, § 312k BGB)
--
-- Jede über /api/kuendigung eingereichte Kündigung wird mit
-- Eingangszeitpunkt und Referenz gesichert – zusätzlich zur Benachrichtigung
-- per E-Mail und zur Kündigungsbestätigung an die Person.
-- Übersicht unter /admin/kuendigungen. Die Kündigung in Stripe wird manuell
-- ausgeführt (status 'bearbeitet').
--
-- Sicherheit: RLS aktiv, KEINE Policies → weder anon noch authenticated haben
-- Zugriff; geschrieben und gelesen wird nur serverseitig mit dem
-- Service-Role-Key (wie widerrufe, Migration 20261011120000).
--
-- Setzt Migration 0002 voraus (Funktion public.touch_updated_at()).
-- ============================================================

create table if not exists public.kuendigungen (
  id uuid primary key default gen_random_uuid(),
  referenz text not null unique,
  name text not null,
  email text not null,
  vertrag text not null default 'mitgliedschaft'
    check (vertrag in ('mitgliedschaft')),
  vertragsnummer text,
  art text not null
    check (art in ('ordentlich', 'ausserordentlich')),
  grund text,
  zeitpunkt text not null
    check (zeitpunkt in ('naechstmoeglich', 'datum')),
  wunschdatum date,
  -- Ende des Abrechnungszeitraums laut memberships zum Eingang (falls gefunden).
  periode_ende timestamptz,
  status text not null default 'neu'
    check (status in ('neu', 'bearbeitet', 'archiviert')),
  eingegangen_at timestamptz not null default now(),
  request_ip text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (art <> 'ausserordentlich' or grund is not null),
  check (zeitpunkt <> 'datum' or wunschdatum is not null)
);

alter table public.kuendigungen enable row level security;

create index if not exists kuendigungen_eingegangen_idx
  on public.kuendigungen (eingegangen_at desc);

drop trigger if exists t_kuendigungen_touch on public.kuendigungen;
create trigger t_kuendigungen_touch
  before update on public.kuendigungen
  for each row execute function public.touch_updated_at();
