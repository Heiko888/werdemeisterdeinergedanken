-- ============================================================
-- Sicherheitshinweise des Supabase-Advisors (Stand 2026-10-11) beheben.
-- Getestet vorab in zurückgerollten Transaktionen (docs/AENDERUNGEN.md).
--
-- 1) set_updated_at(): Migration 0013 hatte die Funktion mit
--    search_path = '' abgesichert; 20260914172539_erstgespraech_cockpit hat sie
--    per create or replace OHNE diese Einstellung überschrieben (Rückschritt).
--    Der Rumpf nutzt nur now() (pg_catalog) – ein leerer search_path ist sicher.
--
-- 2) ist_admin(): SECURITY DEFINER (muss die RLS-geschützte admin_users lesen).
--    Gebraucht wird sie nur von angemeldeten Admins (RLS-Policies „to
--    authenticated“, rpc in /admin/methoden und /admin/erstgespraeche).
--    → EXECUTE für PUBLIC und anon entziehen; authenticated/service_role
--    behalten ihre ausdrücklichen Rechte.
--
-- 3) benachrichtige_neuer_fragebogen(): reine Trigger-Funktion (liest ein
--    Vault-Geheimnis und ruft die Edge-Function auf). Sie soll nie direkt per
--    /rest/v1/rpc aufrufbar sein. → EXECUTE für PUBLIC, anon, authenticated
--    entziehen. Der Trigger feuert weiterhin auch bei anonymen Fragebögen
--    (geprüft: Insert als anon ohne EXECUTE-Recht funktioniert).
-- ============================================================

alter function public.set_updated_at() set search_path = '';

revoke execute on function public.ist_admin() from public, anon;
grant execute on function public.ist_admin() to authenticated, service_role;

revoke execute on function public.benachrichtige_neuer_fragebogen() from public, anon, authenticated;
