-- Fragebogen vor dem Klarheitsgespräch
-- Angelegt am 10.09.2026. Additiv: verändert keine bestehende Tabelle.
--
-- Nachträglich ins Repo aufgenommen (2026-09-16): Diese Tabelle existierte
-- bereits in der Produktion (Migrationsversion 20260910190940), war aber nicht
-- eingecheckt. Datei = exakter Produktionsstand, idempotent (if not exists).

create table if not exists public.erstgespraech_fragebogen (
  id            uuid primary key default gen_random_uuid(),
  name          text not null check (char_length(name) between 2 and 120),
  email         text not null check (char_length(email) between 5 and 200 and position('@' in email) > 1),
  anlass        text not null check (char_length(anlass) between 10 and 4000),
  muster        text not null check (char_length(muster) between 5 and 4000),
  versucht      text not null check (char_length(versucht) between 5 and 4000),
  veraenderung  text not null check (char_length(veraenderung) between 5 and 4000),
  stufe         smallint check (stufe between 1 and 7),
  sonstiges     text check (char_length(sonstiges) <= 4000),
  einwilligung  boolean not null default false check (einwilligung = true),
  quelle        text not null default 'buchungsseite' check (char_length(quelle) <= 60),
  status        text not null default 'neu' check (status in ('neu','gelesen','gespraech_gefuehrt','archiviert')),
  notiz         text,
  created_at    timestamptz not null default now()
);

comment on table public.erstgespraech_fragebogen is
  'Antworten aus dem Vorab-Fragebogen zum kostenlosen Klarheitsgespraech. Anonyme Inserts erlaubt, kein Lesezugriff ueber den Public Key.';

alter table public.erstgespraech_fragebogen enable row level security;

-- Nur Einfuegen erlaubt, und nur mit gesetzter Einwilligung.
drop policy if exists erstgespraech_fragebogen_insert on public.erstgespraech_fragebogen;
create policy erstgespraech_fragebogen_insert
  on public.erstgespraech_fragebogen
  for insert to anon, authenticated
  with check (einwilligung = true);

-- Kein SELECT/UPDATE/DELETE fuer anon: es gibt bewusst keine weitere Policy.
-- Spaltenweise Rechte, damit ueber das Formular weder status noch notiz gesetzt werden koennen.
revoke all on public.erstgespraech_fragebogen from anon, authenticated;
grant insert (name, email, anlass, muster, versucht, veraenderung, stufe, sonstiges, einwilligung, quelle)
  on public.erstgespraech_fragebogen to anon, authenticated;

create index if not exists erstgespraech_fragebogen_created_at_idx
  on public.erstgespraech_fragebogen (created_at desc);

create index if not exists erstgespraech_fragebogen_status_idx
  on public.erstgespraech_fragebogen (status);
