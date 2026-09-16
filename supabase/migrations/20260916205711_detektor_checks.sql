-- Verlauf des Manipulations-Detektors (A6).
--
-- Bisher wurde jede Detektor-Prüfung nur angezeigt und dann verworfen. Diese
-- Tabelle sichert die geprüften Texte + Funde pro Person – als Verlauf und als
-- Kontext für den KI-Begleiter. Muster wie gedanken_readings/muster_spiegel:
-- RLS aktiv, jede Person sieht/ändert nur ihre eigenen Zeilen.
--
-- Eingespielt in Produktion am 2026-09-16 (Version 20260916205711).
-- Setzt Migration 0002 voraus (public.touch_updated_at()).

create table if not exists public.detektor_checks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  eingabe text not null,
  gesamt text not null default '',
  funde jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.detektor_checks enable row level security;

drop policy if exists "detektor_checks_rw_own" on public.detektor_checks;
create policy "detektor_checks_rw_own"
  on public.detektor_checks for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists detektor_checks_user_idx
  on public.detektor_checks (user_id, created_at desc);
