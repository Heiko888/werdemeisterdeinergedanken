-- ============================================================
-- Mitgliederbereich – Ausbau
-- 0008: Gespeicherte KI-Readings zum Gedankenprofil
--
-- Das Gedankenprofil selbst ist regelbasiert und deterministisch. Zusätzlich
-- kann eine Person auf ausdrückliche Freigabe (Button-Klick) ein persönliches,
-- KI-generiertes Reading erzeugen. Damit es nicht bei jedem Seitenaufruf neu
-- (und kostenpflichtig) erzeugt wird, wird jedes Reading hier gespeichert.
--
-- Bewusst als Verlauf angelegt (ein Datensatz je Erzeugung); die Profilseite
-- zeigt das jeweils neueste. Row-Level-Security: jede Person sieht/schreibt
-- ausschließlich ihre eigenen Readings.
--
-- Setzt Migration 0002 voraus (Funktion public.touch_updated_at() wird hier
-- nicht gebraucht, aber die profiles-Grundlage schon).
-- ============================================================

create table if not exists public.gedanken_readings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  -- Der generierte Text.
  body text not null,
  -- Momentaufnahme der Datengrundlage (für Nachvollziehbarkeit).
  source_stage smallint check (source_stage between 1 and 7),
  source_scores smallint[],
  -- Welches Modell den Text erzeugt hat.
  model text,
  created_at timestamptz not null default now()
);

alter table public.gedanken_readings enable row level security;

-- Lesen/Schreiben ausschließlich der eigenen Zeilen.
drop policy if exists "gedanken_readings_rw_own" on public.gedanken_readings;
create policy "gedanken_readings_rw_own"
  on public.gedanken_readings for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists gedanken_readings_user_created_idx
  on public.gedanken_readings (user_id, created_at desc);
