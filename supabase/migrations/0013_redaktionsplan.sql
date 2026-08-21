-- ============================================================
-- Marketing-Cockpit – Redaktionsplan
-- 0013: bearbeitbarer Social-Media-Redaktionsplan
--
-- Ein Post je Zeile: Woche + Wochentag + Kanal + Format + Text. Der
-- Standard-Plan (20 Wochen, Block A/B/C) wird aus `src/lib/redaktionsplan.ts`
-- importiert (Button „Standardplan importieren" im Cockpit). Danach werden
-- Posts hier bearbeitet.
--
-- Zugriff NUR über den Service-Role-Key (createAdminClient), nachdem die Route
-- die Admin-Berechtigung (ADMIN_EMAILS) geprüft hat – genau wie die
-- Funnel-Zahlen. Deshalb: RLS an, aber KEINE Policy für anon/authenticated →
-- mit dem öffentlichen Anon-Key ist die Tabelle vollständig gesperrt. Der
-- Service-Role-Key umgeht RLS.
-- ============================================================

create table if not exists public.redaktionsplan_posts (
  id uuid primary key default gen_random_uuid(),
  woche smallint not null,
  -- Block A/B/C (7 Stufen · Praxis & Wissenschaft · Mentale Selbstverteidigung)
  block text not null default 'A',
  -- Kurzthema der Woche (redundant zu WOCHEN_META, erlaubt DB-eigene Anzeige)
  thema text not null default '',
  -- 1 = Montag … 7 = Sonntag
  wochentag smallint not null check (wochentag between 1 and 7),
  uhrzeit text not null default '',
  -- Kanal: ig | fb | li | yt
  kanal text not null,
  format text not null default '',
  titel text not null default '',
  quelle text not null default '',
  cta text not null default '',
  -- Produktionsstatus: geplant | erstellt | veroeffentlicht
  status text not null default 'geplant',
  optional boolean not null default false,
  notiz text not null default '',
  -- Sortierung innerhalb eines Tages
  sort smallint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.redaktionsplan_posts enable row level security;

-- Bewusst KEINE Policy: der öffentliche Anon-Key darf nichts. Zugriff nur über
-- den Service-Role-Key (RLS-Bypass) aus den admin-geschützten Routen.

create index if not exists redaktionsplan_woche_idx
  on public.redaktionsplan_posts (woche, wochentag, sort);

-- updated_at bei jeder Änderung automatisch pflegen.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists redaktionsplan_set_updated_at on public.redaktionsplan_posts;
create trigger redaktionsplan_set_updated_at
  before update on public.redaktionsplan_posts
  for each row execute function public.set_updated_at();
