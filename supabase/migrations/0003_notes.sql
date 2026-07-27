-- ============================================================
-- Mitgliederbereich – Ausbau
-- 0003: Persistentes Journal (Notizen zu Reflexionsfragen)
--
-- Jede Reflexionsfrage einer Stufe/Vertiefung kann beschrieben werden.
-- Referenz per item_type + item_key + ref (z. B. 'reflection-0').
-- Row-Level-Security: nur eigene Notizen sicht-/änderbar.
-- Setzt Migration 0002 voraus (Funktion public.touch_updated_at()).
-- ============================================================

create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  item_type text not null check (item_type in ('stage', 'deep_dive', 'practice')),
  item_key  text not null,          -- z. B. '01' oder 'automatische-gedanken'
  ref       text not null default '', -- Anker innerhalb des Inhalts, z. B. 'reflection-0'
  body      text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, item_type, item_key, ref)
);

alter table public.notes enable row level security;

drop policy if exists "notes_rw_own" on public.notes;
create policy "notes_rw_own"
  on public.notes for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists notes_user_item_idx
  on public.notes (user_id, item_type, item_key);

drop trigger if exists t_notes_touch on public.notes;
create trigger t_notes_touch
  before update on public.notes
  for each row execute function public.touch_updated_at();
