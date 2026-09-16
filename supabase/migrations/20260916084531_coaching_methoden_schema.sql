-- Migration: Coaching-Methoden-Bibliothek (Admin-Bereich)
-- Projekt: werde-meister-deiner-gedanken (Supabase csnyohpbyhwiattnkzuz)
-- Stand: 2026-09-16 · v1.4
-- Konvention wie bestehende Admin-Tabellen: RLS aktiv, Zugriff ausschließlich über public.ist_admin()

create table if not exists public.coaching_kategorien (
  id            text primary key,                 -- z. B. 'achtsamkeit', 'nlp', 'fuehrung'
  name          text not null,
  beschreibung  text not null default '',
  sortierung    integer not null default 0,
  erstellt_am   timestamptz not null default now(),
  aktualisiert_am timestamptz not null default now()
);
comment on table public.coaching_kategorien is
  'Kategorien der Coaching-Methoden-Bibliothek (Achtsamkeit, Innere Anteile, NLP, Systemisch, Trance, Team, Führung …). Nur für Admins.';

create table if not exists public.coaching_methoden (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  kategorie_id    text not null references public.coaching_kategorien(id) on update cascade on delete restrict,
  name            text not null,
  herkunft        text not null default '',          -- Urheber / Schule
  kern            text not null default '',          -- Ein-Satz-Essenz
  wann_einsetzen  text not null default '',
  ablauf          text[] not null default '{}',      -- Schritte in Reihenfolge
  beispielfragen  text[] not null default '{}',
  dauer           text not null default '',
  setting         text not null default '',
  hinweise        text not null default '',          -- Grenzen, Kontraindikationen
  tags            text[] not null default '{}',
  sortierung      integer not null default 0,
  aktiv           boolean not null default true,
  eigene_notizen  text not null default '',          -- Platz für persönliche Erfahrungen des Coaches
  erstellt_am     timestamptz not null default now(),
  aktualisiert_am timestamptz not null default now()
);
comment on table public.coaching_methoden is
  'Detaillierte Coaching-Methoden mit Ablauf, Beispielfragen, Dauer, Setting und Grenzen. Nachschlagewerk im Admin-Bereich. Nur für Admins.';

create index if not exists coaching_methoden_kategorie_idx on public.coaching_methoden (kategorie_id, sortierung);
create index if not exists coaching_methoden_tags_idx on public.coaching_methoden using gin (tags);

-- Volltextsuche (deutsch) über alle Textfelder – per Trigger gepflegt
-- (array_to_string ist nicht IMMUTABLE, daher keine generierte Spalte)
alter table public.coaching_methoden add column if not exists suchtext tsvector;
create index if not exists coaching_methoden_suchtext_idx on public.coaching_methoden using gin (suchtext);

-- aktualisiert_am und suchtext automatisch pflegen
create or replace function public.setze_aktualisiert_am()
returns trigger language plpgsql set search_path = public as $$
begin
  new.aktualisiert_am := now();
  return new;
end $$;

create or replace function public.coaching_methoden_suchtext_pflegen()
returns trigger language plpgsql set search_path = public as $$
begin
  new.aktualisiert_am := now();
  new.suchtext := to_tsvector('german',
    coalesce(new.name,'') || ' ' || coalesce(new.herkunft,'') || ' ' || coalesce(new.kern,'') || ' ' ||
    coalesce(new.wann_einsetzen,'') || ' ' || coalesce(new.hinweise,'') || ' ' ||
    coalesce(array_to_string(new.ablauf,' '),'') || ' ' || coalesce(array_to_string(new.beispielfragen,' '),'') || ' ' ||
    coalesce(array_to_string(new.tags,' '),'') || ' ' || coalesce(new.eigene_notizen,''));
  return new;
end $$;

drop trigger if exists coaching_methoden_aktualisiert on public.coaching_methoden;
create trigger coaching_methoden_aktualisiert
  before insert or update on public.coaching_methoden
  for each row execute function public.coaching_methoden_suchtext_pflegen();

drop trigger if exists coaching_kategorien_aktualisiert on public.coaching_kategorien;
create trigger coaching_kategorien_aktualisiert
  before update on public.coaching_kategorien
  for each row execute function public.setze_aktualisiert_am();

-- RLS: nur Admins (gleiches Muster wie erstgespraech_*)
alter table public.coaching_kategorien enable row level security;
alter table public.coaching_methoden enable row level security;

drop policy if exists coaching_kategorien_admin on public.coaching_kategorien;
create policy coaching_kategorien_admin on public.coaching_kategorien
  for all to authenticated using (public.ist_admin()) with check (public.ist_admin());

drop policy if exists coaching_methoden_admin on public.coaching_methoden;
create policy coaching_methoden_admin on public.coaching_methoden
  for all to authenticated using (public.ist_admin()) with check (public.ist_admin());
