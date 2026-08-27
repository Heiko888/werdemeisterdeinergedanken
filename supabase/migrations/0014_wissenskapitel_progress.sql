-- ============================================================
-- Mitgliederbereich – Ausbau
-- 0014: Lese-Status für die Wissensdatenbank-Kapitel
--
-- Ein gelesenes Kapitel wird – wie Stufen, Praxis und Programm – in der
-- bestehenden `progress`-Tabelle (Migration 0002) abgelegt, mit
-- item_type = 'wissenskapitel' und item_key = Kapitel-Slug (z. B.
-- '03-neuroplastizitaet'). Dafür muss der CHECK-Constraint auf item_type um
-- diesen Wert erweitert werden (wie zuvor 0011 für 'programm').
--
-- Row-Level-Security greift unverändert: die bestehende Policy auf `progress`
-- ist rein user_id-basiert und deckt jeden item_type ab.
-- ============================================================

alter table public.progress
  drop constraint if exists progress_item_type_check;

alter table public.progress
  add constraint progress_item_type_check
  check (item_type in ('stage', 'practice', 'deep_dive', 'programm', 'wissenskapitel'));
