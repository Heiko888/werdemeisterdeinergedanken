-- ============================================================
-- Mitgliederbereich – Ausbau
-- 0012: „Die tägliche Rückkehr" – offene Tages-Praxis
--
-- Anders als das endliche 21-Tage-Programm ist die tägliche Rückkehr ohne
-- Ende: pro Kalendertag kann eine Person einmal „zurückkehren" (die kurze
-- Praxis machen und das bewusst festhalten). Jede Rückkehr ist eine Zeile.
--
-- Bewusst als eigenes, schlankes Log statt über die progress-Tabelle: hier
-- ist der Schlüssel ein Datum (ein Eintrag je Kalendertag), nicht ein
-- Inhalts-Item. Der Kalendertag kommt aus der lokalen Zeit der Person.
--
-- Row-Level-Security: jede Person sieht/schreibt ausschließlich ihre eigenen
-- Rückkehr-Tage. Setzt die profiles-Grundlage (0002) voraus.
-- ============================================================

create table if not exists public.rueckkehr (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  -- Der Kalendertag der Rückkehr (lokaler Tag der Person).
  datum date not null,
  created_at timestamptz not null default now(),
  unique (user_id, datum)
);

alter table public.rueckkehr enable row level security;

drop policy if exists "rueckkehr_rw_own" on public.rueckkehr;
create policy "rueckkehr_rw_own"
  on public.rueckkehr for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists rueckkehr_user_datum_idx
  on public.rueckkehr (user_id, datum desc);
