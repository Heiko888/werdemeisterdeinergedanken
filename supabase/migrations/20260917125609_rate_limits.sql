-- Verteilte Ratenbegrenzung (C2).
--
-- Ersetzt das bisherige In-Memory-Limit (pro Container, ging beim Neustart
-- verloren und wirkte bei mehreren Instanzen nicht) durch einen gemeinsamen
-- Speicher in der Datenbank. Fixed-Window-Zähler pro (bucket, ident).
-- Nur über den Service-Role-Key erreichbar (RLS aktiv, keine Policy).
--
-- Eingespielt in Produktion am 2026-09-17 (Version 20260917125609).

create table if not exists public.rate_limits (
  bucket       text not null,
  ident        text not null,
  window_start timestamptz not null default now(),
  count        integer not null default 0,
  primary key (bucket, ident)
);

alter table public.rate_limits enable row level security;

create index if not exists rate_limits_window_idx
  on public.rate_limits (window_start);

-- Atomarer Check-and-Increment in EINER Anweisung: zählt hoch, setzt bei
-- abgelaufenem Fenster zurück, und gibt zurück, ob der Aufruf noch erlaubt ist
-- (count <= p_max). security definer, damit der Aufruf unabhängig von RLS läuft.
create or replace function public.rate_limit_hit(
  p_bucket text,
  p_ident text,
  p_max integer,
  p_window interval
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer;
begin
  insert into public.rate_limits (bucket, ident, window_start, count)
  values (p_bucket, p_ident, now(), 1)
  on conflict (bucket, ident) do update
    set
      count = case
        when public.rate_limits.window_start < now() - p_window then 1
        else public.rate_limits.count + 1
      end,
      window_start = case
        when public.rate_limits.window_start < now() - p_window then now()
        else public.rate_limits.window_start
      end
  returning count into v_count;

  return v_count <= p_max;
end;
$$;

revoke all on function public.rate_limit_hit(text, text, integer, interval) from public, anon, authenticated;
