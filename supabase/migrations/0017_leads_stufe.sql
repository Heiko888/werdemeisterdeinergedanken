-- ============================================================
-- Leads: Test-Stufe + UTM-Herkunft (Kampagnen-Check 2026-09-18, Punkte 1 + 6)
--
-- Der Bewusstseinstest fragt jetzt VOR dem Ergebnis eine E-Mail-Adresse ab
-- (Double-Opt-in wie beim E-Book). Diese Leads landen in derselben Tabelle
-- public.ebook_leads mit `source = 'bewusstseinstest'`; die ermittelte
-- Hauptstufe (1–7) wird in `stufe` gemerkt, damit Ergebnis-Mail und
-- Verkaufsstrecke die passende Stufe adressieren können.
--
-- Zusätzlich speichern E-Book- und Test-Formular die UTM-Parameter des
-- ersten Seitenaufrufs (utm_source/medium/campaign/content), damit sich
-- Leads je Kampagne/Reel auswerten lassen. Alle Spalten sind optional.
--
-- Sicherheit unverändert: RLS aktiv, keine Policies – nur der Service-Role-
-- Key (serverseitige API-Routen) liest und schreibt diese Tabelle.
-- ============================================================

alter table public.ebook_leads
  add column if not exists stufe smallint check (stufe between 1 and 7),
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists utm_content text;

comment on column public.ebook_leads.stufe is
  'Hauptstufe (1–7) aus dem Bewusstseinstest; null bei reinen E-Book-Leads.';
comment on column public.ebook_leads.utm_source is
  'UTM-Quelle des ersten Seitenaufrufs (z. B. instagram), aus sessionStorage übergeben.';
comment on column public.ebook_leads.utm_medium is
  'UTM-Medium (z. B. reel, story, bio).';
comment on column public.ebook_leads.utm_campaign is
  'UTM-Kampagne (z. B. test-launch-2026-10).';
comment on column public.ebook_leads.utm_content is
  'UTM-Content (z. B. Reel-Nummer oder Hook-Variante).';
