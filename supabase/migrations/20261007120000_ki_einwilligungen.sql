-- Nachweis der Einwilligung für die KI-Werkzeuge (Art. 7 Abs. 1 DSGVO).
--
-- Append-only-Protokoll: Bei JEDER Nutzung eines KI-Werkzeugs schreibt der
-- Server – bevor Daten an Anthropic gehen – eine Zeile mit Zeitpunkt,
-- Werkzeug, Version und SHA-256 des am Werkzeug angezeigten
-- Einwilligungstexts (src/lib/ki-einwilligung.ts). Der Text selbst steht
-- versioniert im Repository; der Hash belegt, welcher Wortlaut galt.
--
-- Schutz gegen Manipulation:
-- - RLS aktiv, nur LESEN der eigenen Zeilen.
-- - Kein INSERT/UPDATE/DELETE für Nutzer; geschrieben wird ausschließlich
--   über die security-definer-Funktion ki_einwilligung_erfassen(), die die
--   user_id selbst aus auth.uid() nimmt und nur einfügt.
-- - Löschung nur mit dem Account (on delete cascade) oder durch den Betreiber.
--
-- Muss VOR dem Einschalten eines KI-Werkzeugs eingespielt sein: Ohne
-- erfolgreichen Eintrag bricht der Server die Übertragung ab.

create table if not exists public.ki_einwilligungen (
  id           bigint generated always as identity primary key,
  user_id      uuid not null references auth.users (id) on delete cascade,
  werkzeug     text not null
                 check (werkzeug in ('begleiter', 'reading', 'muster', 'detektor')),
  text_version text not null check (length(text_version) between 1 and 40),
  text_sha256  text not null check (text_sha256 ~ '^[0-9a-f]{64}$'),
  created_at   timestamptz not null default now()
);

alter table public.ki_einwilligungen enable row level security;

drop policy if exists "ki_einwilligungen_read_own" on public.ki_einwilligungen;
create policy "ki_einwilligungen_read_own"
  on public.ki_einwilligungen for select
  using (auth.uid() = user_id);

create index if not exists ki_einwilligungen_user_idx
  on public.ki_einwilligungen (user_id, werkzeug, created_at desc);

create or replace function public.ki_einwilligung_erfassen(
  p_werkzeug text,
  p_text_version text,
  p_text_sha256 text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'nicht angemeldet';
  end if;

  insert into public.ki_einwilligungen (user_id, werkzeug, text_version, text_sha256)
  values (auth.uid(), p_werkzeug, p_text_version, p_text_sha256);
end;
$$;

revoke all on function public.ki_einwilligung_erfassen(text, text, text) from public, anon;
grant execute on function public.ki_einwilligung_erfassen(text, text, text) to authenticated;
