-- ============================================================
-- Mitgliederbereich – Ausbau
-- 0002: Fortschritts-Tracking + Kopplung des Bewusstseinstests ans Profil
--
-- Enthält:
--   1. Allgemeiner updated_at-Trigger (fehlte bislang auch bei `profiles`)
--   2. Bewusstseinstest-Ergebnis am Profil (Personalisierung des Dashboards)
--   3. `progress`-Tabelle: abgeschlossene Stufen / Praxis / Vertiefungen
--
-- Alles mit Row-Level-Security: jede Person sieht/ändert ausschließlich
-- ihre eigenen Daten.
-- ============================================================

-- ------------------------------------------------------------
-- 1. Allgemeiner updated_at-Trigger
-- ------------------------------------------------------------
-- `set search_path = ''` ist Absicht: ohne festen Suchpfad bestimmt die
-- aufrufende Rolle, in welchen Schemata Bezeichner innerhalb der Funktion
-- aufgelöst werden. Der Supabase-Linter meldet das sonst als Sicherheitswarnung
-- (function_search_path_mutable). Die Funktion braucht keine Schema-Objekte,
-- der leere Pfad ist daher unproblematisch.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- `profiles.updated_at` wurde bisher nie aktualisiert – jetzt bei jedem Update.
drop trigger if exists t_profiles_touch on public.profiles;
create trigger t_profiles_touch
  before update on public.profiles
  for each row execute function public.touch_updated_at();

-- ------------------------------------------------------------
-- 2. Bewusstseinstest-Ergebnis am Profil
--    Ermöglicht personalisierten Einstieg ("Deine Startstufe: …").
--    Die bestehende Policy `profiles_update_own` erlaubt der Person,
--    ihr eigenes Ergebnis zu speichern – das ist gewollt.
-- ------------------------------------------------------------
alter table public.profiles
  add column if not exists start_stage smallint
    check (start_stage between 1 and 7),
  add column if not exists test_scores smallint[],
  add column if not exists test_taken_at timestamptz;

-- ------------------------------------------------------------
-- 3. Fortschritt: abgeschlossene Inhalte pro Person
--    Content lebt weiterhin in den TS-Dateien; hier wird nur der
--    nutzerbezogene Zustand referenziert (per stabilem item_key).
-- ------------------------------------------------------------
create table if not exists public.progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  -- Typ + Schlüssel des Inhalts (kein FK auf eine Content-Tabelle)
  item_type text not null check (item_type in ('stage', 'practice', 'deep_dive')),
  item_key  text not null,          -- z. B. '01', 'atembeobachtung', 'automatische-gedanken'
  status text not null default 'completed'
        check (status in ('in_progress', 'completed')),
  completed_at timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (user_id, item_type, item_key)
);

alter table public.progress enable row level security;

-- Lesen/Schreiben ausschließlich der eigenen Zeilen
drop policy if exists "progress_rw_own" on public.progress;
create policy "progress_rw_own"
  on public.progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists progress_user_type_idx
  on public.progress (user_id, item_type);

drop trigger if exists t_progress_touch on public.progress;
create trigger t_progress_touch
  before update on public.progress
  for each row execute function public.touch_updated_at();
