-- ============================================================
-- Buch-Bestellungen (Persistenz des Einmalkaufs)
--
-- Der Buch-Einmalkauf (PDF/Print) lief bisher nur über Stripe + Liefermail;
-- in der eigenen Datenbank landete nichts. Damit fehlte jede Übersicht der
-- verkauften Bücher und – besonders bei der Print-Edition – ein
-- nachvollziehbarer Versandstatus (offen/verschickt).
--
-- Diese Tabelle protokolliert jeden bezahlten Buch-Kauf, geschrieben vom
-- Stripe-Webhook (/api/stripe/webhook). Sichtbar unter /admin/bestellungen.
-- Das Schreiben ist „best effort" und darf die Auslieferung nicht blockieren.
--
-- Sicherheit: RLS ist aktiv, aber es gibt KEINE Policies. Dadurch kommen
-- weder anon- noch authenticated-Clients an die Tabelle – ausschließlich der
-- Service-Role-Key (RLS-Bypass) in den serverseitigen Routen.
--
-- Setzt Migration 0002 voraus (Funktion public.touch_updated_at()).
-- ============================================================

create table if not exists public.book_orders (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  edition text not null default 'pdf'
    check (edition in ('pdf', 'print')),
  amount_total integer,            -- in kleinster Währungseinheit (Cent)
  currency text,
  stripe_session_id text unique,   -- Idempotenz: verhindert Doppel-Einträge
  stripe_customer_id text,
  -- Versandstatus: PDF gilt sofort als geliefert; Print startet als 'offen'.
  status text not null default 'bezahlt'
    check (status in ('bezahlt', 'versendet', 'erstattet')),
  shipping_name text,
  shipping_address text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.book_orders enable row level security;

create index if not exists book_orders_created_idx
  on public.book_orders (created_at desc);

drop trigger if exists t_book_orders_touch on public.book_orders;
create trigger t_book_orders_touch
  before update on public.book_orders
  for each row execute function public.touch_updated_at();
