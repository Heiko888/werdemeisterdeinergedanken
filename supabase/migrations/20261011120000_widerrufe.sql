-- ============================================================
-- Widerrufe (Widerrufsfunktion /widerruf, EU-Richtlinie 2023/2673)
--
-- Jeder über /api/widerruf eingereichte Widerruf wird mit Eingangszeitpunkt
-- und Referenz gesichert – zusätzlich zur Benachrichtigung per E-Mail und zur
-- Eingangsbestätigung an die Person. Übersicht unter /admin/widerrufe.
--
-- Sicherheit: RLS aktiv, KEINE Policies → weder anon noch authenticated haben
-- Zugriff; geschrieben und gelesen wird nur serverseitig mit dem
-- Service-Role-Key (wie kontakt_anfragen, Migration 0015).
--
-- Setzt Migration 0002 voraus (Funktion public.touch_updated_at()).
-- ============================================================

create table if not exists public.widerrufe (
  id uuid primary key default gen_random_uuid(),
  referenz text not null unique,
  name text not null,
  email text not null,
  produkt text not null
    check (produkt in ('buch-pdf', 'buch-print', 'mitgliedschaft', 'sonstiges')),
  bestellung text,
  nachricht text,
  status text not null default 'neu'
    check (status in ('neu', 'bearbeitet', 'archiviert')),
  eingegangen_at timestamptz not null default now(),
  request_ip text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.widerrufe enable row level security;

create index if not exists widerrufe_eingegangen_idx
  on public.widerrufe (eingegangen_at desc);

drop trigger if exists t_widerrufe_touch on public.widerrufe;
create trigger t_widerrufe_touch
  before update on public.widerrufe
  for each row execute function public.touch_updated_at();
