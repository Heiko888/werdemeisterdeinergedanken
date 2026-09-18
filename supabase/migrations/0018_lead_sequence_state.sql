-- ============================================================
-- Versandstand der E-Mail-Verkaufsstrecken (Kampagnen-Check 2026-09-18, Punkt 4)
--
-- Nach der Bestätigung (Double-Opt-in) durchläuft jeder Lead eine feste
-- Mail-Sequenz (src/lib/sequences.ts): die 7-Mail-Strecke nach Test/E-Book
-- (Tag 0, 1, 3, 5, 7, 9, 11) bzw. die 3-Mail-Strecke für Buch-Käufer
-- (Tag 3, 10, 21). Diese Tabelle merkt sich je Lead, Sequenz und Schritt,
-- wann die Mail rausging – so ist der Versand idempotent: ein Cron-Lauf kann
-- beliebig oft wiederholt werden, ohne eine Mail doppelt zu schicken.
--
-- Solange ein Lead in einer laufenden Sequenz steckt, pausiert der Impuls-
-- Mailer (/api/impulses) für ihn; danach übernimmt die Impuls-Rotation.
--
-- Sicherheit: RLS aktiv, keine Policies – nur der Service-Role-Key
-- (Cron-Route src/app/api/sequences/route.ts) schreibt hier.
-- ============================================================

create table if not exists public.lead_sequence_state (
  lead_id uuid not null references public.ebook_leads (id) on delete cascade,
  sequence text not null,
  step integer not null,
  sent_at timestamptz not null default now(),
  primary key (lead_id, sequence, step)
);

alter table public.lead_sequence_state enable row level security;

create index if not exists lead_sequence_state_sequence_idx
  on public.lead_sequence_state (sequence, lead_id);
