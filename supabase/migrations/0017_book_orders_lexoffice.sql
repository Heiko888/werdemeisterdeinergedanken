-- ============================================================
-- lexoffice-Rechnungsentwurf an der Buch-Bestellung verankern
--
-- Nach einem bezahlten Buch-Einmalkauf legt der Stripe-Webhook
-- (/api/stripe/webhook) zusätzlich einen Rechnungs-ENTWURF in lexoffice an
-- (§ 19 UStG, Absenderdaten aus dem lexoffice-Profil). Damit die Referenz
-- nachvollziehbar bleibt und keine Doppel-Entwürfe entstehen (Idempotenz),
-- speichern wir ID und UI-Link des Entwurfs an der Bestellung.
--
-- Best effort: Ist lexoffice nicht konfiguriert, bleiben beide Felder NULL.
-- Setzt Migration 0016 (public.book_orders) voraus.
-- ============================================================

alter table public.book_orders
  add column if not exists lexoffice_invoice_id text,
  add column if not exists lexoffice_invoice_url text;
