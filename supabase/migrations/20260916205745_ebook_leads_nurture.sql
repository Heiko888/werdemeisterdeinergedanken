-- E-Book-Lead-Nurture (B5).
--
-- Bisher bekamen E-Book-Leads nach der Lieferung nie wieder eine Mail; die
-- wöchentlichen Impulse gingen nur an eingeloggte Mitglieder. Diese Spalten
-- erlauben es dem Impuls-Cron (/api/impulses), dieselbe Impuls-Rotation auch an
-- bestätigte E-Book-Leads zu schicken (Brücke E-Book → Mitgliedschaft) und
-- dabei je Lead die Position in der Serie zu merken.
--
-- Eingespielt in Produktion am 2026-09-16 (Version 20260916205745).

alter table public.ebook_leads
  add column if not exists impulse_index integer not null default 0,
  add column if not exists last_impulse_at timestamptz,
  add column if not exists nurture_opt_in boolean not null default true;
