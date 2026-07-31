-- ============================================================
-- Bezahl-Mitgliedschaft (Stripe-Abo)
--
-- Pflegt pro E-Mail den Abo-Status, den der Stripe-Webhook
-- (/api/stripe/webhook) schreibt. Bewusst nach E-Mail geschlüsselt und
-- getrennt von `profiles`: So kann der Webhook die Mitgliedschaft schon
-- beim Bezahlen anlegen, auch bevor (oder ohne dass) ein Login-Konto
-- existiert. Der Zugang wird anschließend über die E-Mail verknüpft.
--
-- Sicherheit: RLS ist aktiv, aber es gibt KEINE Policies. Damit kommen
-- weder anon- noch authenticated-Clients an die Tabelle – ausschließlich
-- der Service-Role-Key (RLS-Bypass) in den serverseitigen Routen. Damit
-- sind Kunden-E-Mails und Stripe-IDs nie über die öffentliche API lesbar.
--
-- Setzt Migration 0002 voraus (Funktion public.touch_updated_at()).
-- ============================================================

create table if not exists public.memberships (
  email text primary key,
  status text not null default 'active',
  stripe_customer_id text,
  stripe_subscription_id text,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.memberships enable row level security;

-- Nachschlagen per Subscription-ID (Webhook: subscription.updated/deleted).
create index if not exists memberships_subscription_idx
  on public.memberships (stripe_subscription_id);

drop trigger if exists t_memberships_touch on public.memberships;
create trigger t_memberships_touch
  before update on public.memberships
  for each row execute function public.touch_updated_at();
