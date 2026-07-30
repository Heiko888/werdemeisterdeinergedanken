-- ============================================================
-- Mitgliederbereich – Ausbau
-- 0006: Verlauf des Bewusstseinstests (Wachstumskurve)
--
-- Bisher lag nur das LETZTE Testergebnis am Profil (0002). Für die
-- Entwicklung über die Zeit wird hier jedes Ergebnis als eigener Datensatz
-- gespeichert. Der Test bleibt öffentlich nutzbar; gespeichert wird nur für
-- angemeldete Personen.
--
-- Row-Level-Security: jede Person sieht/schreibt ausschließlich ihre eigenen
-- Ergebnisse. Setzt Migration 0002 nicht zwingend voraus.
-- ============================================================

create table if not exists public.test_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  top_stage smallint not null check (top_stage between 1 and 7),
  scores smallint[],
  taken_at timestamptz not null default now()
);

alter table public.test_results enable row level security;

drop policy if exists "test_results_rw_own" on public.test_results;
create policy "test_results_rw_own"
  on public.test_results for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists test_results_user_taken_idx
  on public.test_results (user_id, taken_at);
