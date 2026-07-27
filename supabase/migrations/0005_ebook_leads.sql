-- ============================================================
-- Lead-Erfassung für das Gratis-E-Book (Double-Opt-in, DSGVO)
--
-- Anonyme Interessent*innen (ohne Mitglieds-Account) tragen ihre E-Mail
-- im Lead-Magnet ein. Erst nach Klick auf den Bestätigungslink (Double-
-- Opt-in) gilt die Einwilligung – dann wird das E-Book verschickt.
--
-- Bewusst getrennt von `profiles` (die an auth.users hängt): Leads sind
-- kein Mitglieds-Account. Für den DSGVO-Nachweis der Einwilligung werden
-- Zeitpunkte und IP-Adressen von Anfrage und Bestätigung gespeichert.
--
-- Sicherheit: RLS ist aktiv, aber es gibt KEINE Policies. Dadurch kommen
-- weder anon- noch authenticated-Clients an die Tabelle – ausschließlich
-- der Service-Role-Key (RLS-Bypass) in den serverseitigen API-Routen.
-- E-Mail-Adressen sind so niemals über die öffentliche API lesbar.
--
-- Setzt Migration 0002 voraus (Funktion public.touch_updated_at()).
-- ============================================================

create table if not exists public.ebook_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'unsubscribed')),
  confirm_token uuid not null default gen_random_uuid(),
  unsubscribe_token uuid not null default gen_random_uuid(),
  source text not null default 'lead-magnet',
  requested_at timestamptz not null default now(),
  confirmed_at timestamptz,
  unsubscribed_at timestamptz,
  request_ip text,
  confirm_ip text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.ebook_leads enable row level security;

-- Schnelles Nachschlagen über die Tokens aus den E-Mail-Links.
create index if not exists ebook_leads_confirm_token_idx
  on public.ebook_leads (confirm_token);
create index if not exists ebook_leads_unsubscribe_token_idx
  on public.ebook_leads (unsubscribe_token);

drop trigger if exists t_ebook_leads_touch on public.ebook_leads;
create trigger t_ebook_leads_touch
  before update on public.ebook_leads
  for each row execute function public.touch_updated_at();
