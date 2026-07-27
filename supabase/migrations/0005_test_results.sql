-- ============================================================
-- Mitgliederbereich – Ausbau
-- 0005: Verlauf der Bewusstseinstests
--
-- Jeder abgeschlossene Test wird als eigene Zeile mit Datum gespeichert,
-- damit Mitglieder ihre Entwicklung über die Zeit sehen. Das Profil-Feld
-- start_stage (aus 0002) bleibt der jeweils aktuellste Wert.
-- Row-Level-Security: nur eigene Ergebnisse sicht-/anlegbar.
-- ============================================================

create table if not exists public.test_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  top_stage smallint not null check (top_stage between 1 and 7),
  scores smallint[] not null default '{}',
  taken_at timestamptz not null default now()
);

alter table public.test_results enable row level security;

drop policy if exists "test_results_rw_own" on public.test_results;
create policy "test_results_rw_own"
  on public.test_results for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists test_results_user_taken_idx
  on public.test_results (user_id, taken_at desc);
