-- ============================================================
-- Mitgliederbereich – Ausbau
-- 0011: Fortschritt für das Programm „21 Tage Autopilot-Ausstieg"
--
-- Das Programm speichert je abgeschlossenem Tag eine Zeile in der bestehenden
-- `progress`-Tabelle (Migration 0002) – mit item_type = 'programm' und
-- item_key = '01' … '21'. Dafür muss der CHECK-Constraint auf item_type um
-- den neuen Wert erweitert werden; die Tabelle, RLS und Indizes bleiben
-- unverändert.
--
-- Setzt Migration 0002 (progress) voraus.
-- ============================================================

alter table public.progress
  drop constraint if exists progress_item_type_check;

alter table public.progress
  add constraint progress_item_type_check
  check (item_type in ('stage', 'practice', 'deep_dive', 'programm'));
