-- ============================================================
-- Mitgliederbereich – Ausbau
-- 0009: KI-Begleiter (Chatverlauf)
--
-- Der Begleiter ist ein Gespräch im Mitgliederbereich (/mitglieder/begleiter).
-- Damit ein Gespräch über Sitzungen und Geräte hinweg bestehen bleibt – und
-- damit die KI überhaupt Kontext hat – wird jede Nachricht hier gespeichert:
-- ein Datensatz je Nachricht, `role` unterscheidet Person und Begleiter.
--
-- Der Verlauf gehört ausschließlich der Person selbst: Row-Level-Security
-- lässt nur die eigenen Zeilen lesen, schreiben und löschen. Auch die
-- Löschfunktion („Gespräch löschen“) arbeitet über diese Policy.
--
-- Ohne diese Migration bleibt die Seite lauffähig; sie meldet dann, dass der
-- Begleiter noch nicht eingerichtet ist. Setzt Migration 0001/0002 voraus.
-- ============================================================

create table if not exists public.begleiter_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  -- 'user' = Nachricht der Person, 'assistant' = Antwort des Begleiters.
  role text not null check (role in ('user', 'assistant')),
  body text not null,
  -- Welches Modell geantwortet hat (nur bei 'assistant' gesetzt).
  model text,
  created_at timestamptz not null default now()
);

alter table public.begleiter_messages enable row level security;

-- Lesen/Schreiben/Löschen ausschließlich der eigenen Zeilen.
drop policy if exists "begleiter_messages_rw_own" on public.begleiter_messages;
create policy "begleiter_messages_rw_own"
  on public.begleiter_messages for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Der Verlauf wird immer chronologisch je Person gelesen.
create index if not exists begleiter_messages_user_created_idx
  on public.begleiter_messages (user_id, created_at);
