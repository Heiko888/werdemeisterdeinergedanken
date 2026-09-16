-- Coaching-Methoden: neues Feld "sprechtext" (wortwörtlicher Text zum Vorlesen,
-- v. a. für Trance/Hypnose-Methoden: Induktion, Vertiefung, Suggestionen, Rückführung).
-- Stand: 2026-09-16 · Inhaltsversion 1.5
alter table public.coaching_methoden
  add column if not exists sprechtext text not null default '';

comment on column public.coaching_methoden.sprechtext is
  'Wortwörtlicher Sprechtext zum Vorlesen (Induktion/Vertiefung/Suggestion/Rückführung), v. a. für Trance & Hypnose.';

-- Volltextsuche um sprechtext erweitern.
create or replace function public.coaching_methoden_suchtext_pflegen()
returns trigger language plpgsql set search_path = public as $$
begin
  new.aktualisiert_am := now();
  new.suchtext := to_tsvector('german',
    coalesce(new.name,'') || ' ' || coalesce(new.herkunft,'') || ' ' || coalesce(new.kern,'') || ' ' ||
    coalesce(new.wann_einsetzen,'') || ' ' || coalesce(new.hinweise,'') || ' ' ||
    coalesce(array_to_string(new.ablauf,' '),'') || ' ' || coalesce(array_to_string(new.beispielfragen,' '),'') || ' ' ||
    coalesce(new.sprechtext,'') || ' ' ||
    coalesce(array_to_string(new.tags,' '),'') || ' ' || coalesce(new.eigene_notizen,''));
  return new;
end $$;

-- Bestehende Zeilen einmalig neu indexieren (Trigger feuert bei UPDATE).
update public.coaching_methoden set sprechtext = sprechtext;
