-- ============================================================
-- Mitgliederbereich – Ausbau
-- 0010: Gespeicherte KI-„Muster-Spiegel" aus dem Journal
--
-- Die Standortbestimmung auf der Journal-Seite ist regelbasiert und
-- deterministisch. Zusätzlich kann eine Person auf ausdrückliche Freigabe
-- (Button-Klick) einen persönlichen „Muster-Spiegel" erzeugen: eine KI liest
-- die gesammelten Reflexionen und benennt behutsam ein bis zwei wiederkehrende
-- Muster – belegt mit den eigenen Worten der Person.
--
-- Damit der (kostenpflichtige) KI-Aufruf nicht bei jedem Seitenaufruf neu
-- passiert, wird jeder Spiegel hier gespeichert. Bewusst als Verlauf angelegt
-- (ein Datensatz je Erzeugung); die Journal-Seite zeigt den jeweils neuesten.
--
-- Es wird KEIN Reflexionstext gespeichert – nur der erzeugte Spiegel und eine
-- knappe Momentaufnahme der Datengrundlage (Anzahl + Zeitraum) zur
-- Nachvollziehbarkeit. Row-Level-Security: jede Person sieht/schreibt
-- ausschließlich ihre eigenen Spiegel.
--
-- Setzt Migration 0003 (notes) voraus; die Grundlage profiles/0002 ebenso.
-- ============================================================

create table if not exists public.muster_spiegel (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  -- Der generierte Spiegel-Text.
  body text not null,
  -- Momentaufnahme der Datengrundlage (für Nachvollziehbarkeit) – bewusst
  -- ohne die Reflexionstexte selbst.
  source_entry_count smallint,
  source_from timestamptz,
  source_to timestamptz,
  -- Welches Modell den Text erzeugt hat.
  model text,
  created_at timestamptz not null default now()
);

alter table public.muster_spiegel enable row level security;

-- Lesen/Schreiben ausschließlich der eigenen Zeilen.
drop policy if exists "muster_spiegel_rw_own" on public.muster_spiegel;
create policy "muster_spiegel_rw_own"
  on public.muster_spiegel for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists muster_spiegel_user_created_idx
  on public.muster_spiegel (user_id, created_at desc);
