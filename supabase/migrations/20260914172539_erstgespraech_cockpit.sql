-- Cockpit fuer das Erstgespraech
-- Angelegt am 14.09.2026. Additiv: keine bestehende Tabelle wird veraendert.
--
-- Nachträglich ins Repo aufgenommen (2026-09-16): existierte bereits in der
-- Produktion (Migrationsversion 20260914172539). Datei = exakter
-- Produktionsstand, idempotent. Enthält das Admin-Fundament (admin_users,
-- ist_admin()), auf das auch die Coaching-Methoden-Migration aufbaut.

-- 1) Adminbegriff --------------------------------------------------------
create table if not exists public.admin_users (
  user_id      uuid primary key references auth.users(id) on delete cascade,
  angelegt_am  timestamptz not null default now()
);

alter table public.admin_users enable row level security;
-- Keine Policy: nur ueber den Service-Key oder das Dashboard aenderbar.

create or replace function public.ist_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users a where a.user_id = auth.uid());
$$;

grant execute on function public.ist_admin() to authenticated;

-- 2) Der Adminzugriff auf die Fragebogen-Antworten -----------------------
drop policy if exists erstgespraech_fragebogen_admin on public.erstgespraech_fragebogen;
create policy erstgespraech_fragebogen_admin
  on public.erstgespraech_fragebogen
  for all to authenticated
  using (public.ist_admin())
  with check (public.ist_admin());

grant select, update, delete on public.erstgespraech_fragebogen to authenticated;

-- 3) Das gefuehrte Gespraech ---------------------------------------------
create table if not exists public.erstgespraech_gespraeche (
  id                  uuid primary key default gen_random_uuid(),
  fragebogen_id       uuid references public.erstgespraech_fragebogen(id) on delete set null,
  interessent_name    text not null check (char_length(interessent_name) between 1 and 120),
  interessent_email   text,
  termin_am           timestamptz,
  gestartet_am        timestamptz,
  beendet_am          timestamptz,
  dauer_sekunden      integer check (dauer_sekunden >= 0),

  -- Notizen je Phase: {"p1":"...","p2":"...", ...}
  notizen             jsonb not null default '{}'::jsonb,
  -- Abgehakte Fragen: {"p2":["f1","f3"], ...}
  abgehakt            jsonb not null default '{}'::jsonb,

  stufe_selbst        smallint check (stufe_selbst between 1 and 7),
  stufe_eingeschaetzt smallint check (stufe_eingeschaetzt between 1 and 7),

  ergebnis            text check (ergebnis in ('offen','zusage','bedenkzeit','absage','nicht_passend')),
  empfehlung          text check (empfehlung in ('mitgliedschaft','standort_session','begleiteter_weg','keine')),
  einwand             text,
  naechster_schritt   text,
  naechster_schritt_am date,
  wertvollstes        text,
  freitext            text,

  created_by          uuid references auth.users(id) on delete set null,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

comment on table public.erstgespraech_gespraeche is
  'Ein gefuehrtes Klarheitsgespraech: Notizen je Phase, Ergebnis, naechster Schritt. Nur fuer Admins.';

alter table public.erstgespraech_gespraeche enable row level security;

drop policy if exists erstgespraech_gespraeche_admin on public.erstgespraech_gespraeche;
create policy erstgespraech_gespraeche_admin
  on public.erstgespraech_gespraeche
  for all to authenticated
  using (public.ist_admin())
  with check (public.ist_admin());

grant select, insert, update, delete on public.erstgespraech_gespraeche to authenticated;

create index if not exists erstgespraech_gespraeche_created_at_idx
  on public.erstgespraech_gespraeche (created_at desc);
create index if not exists erstgespraech_gespraeche_ergebnis_idx
  on public.erstgespraech_gespraeche (ergebnis);

-- 4) Zitatsammlung "Sprache meiner Zielgruppe" ---------------------------
create table if not exists public.erstgespraech_zitate (
  id            uuid primary key default gen_random_uuid(),
  gespraech_id  uuid references public.erstgespraech_gespraeche(id) on delete cascade,
  zitat         text not null check (char_length(zitat) between 3 and 2000),
  phase         text,
  created_at    timestamptz not null default now()
);

alter table public.erstgespraech_zitate enable row level security;

drop policy if exists erstgespraech_zitate_admin on public.erstgespraech_zitate;
create policy erstgespraech_zitate_admin
  on public.erstgespraech_zitate
  for all to authenticated
  using (public.ist_admin())
  with check (public.ist_admin());

grant select, insert, update, delete on public.erstgespraech_zitate to authenticated;

create index if not exists erstgespraech_zitate_gespraech_idx
  on public.erstgespraech_zitate (gespraech_id);

-- 5) updated_at automatisch mitfuehren -----------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists erstgespraech_gespraeche_updated_at on public.erstgespraech_gespraeche;
create trigger erstgespraech_gespraeche_updated_at
  before update on public.erstgespraech_gespraeche
  for each row execute function public.set_updated_at();
