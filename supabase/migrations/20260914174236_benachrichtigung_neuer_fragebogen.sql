-- E-Mail-Benachrichtigung bei neuem Fragebogen
-- Angelegt am 14.09.2026.
--
-- Nachträglich ins Repo aufgenommen (2026-09-16): existierte bereits in der
-- Produktion (Migrationsversion 20260914174236). Datei = Produktionsstand,
-- idempotent.
--
-- ⚠️ SICHERHEIT: Das gemeinsame Webhook-Geheimnis (Trigger ↔ Edge Function)
-- ist hier bewusst NICHT im Klartext hinterlegt, damit es nicht im Repo landet.
-- In der Produktion liegt es bereits im Vault (Secret
-- 'fragebogen_webhook_secret') – dank `if not exists` wird es hier nicht
-- überschrieben. Für eine FRISCHE Umgebung: unten den Platzhalter durch ein
-- starkes, zufälliges Geheimnis ersetzen und DENSELBEN Wert als Secret
-- WEBHOOK_SECRET der Edge Function `neuer-fragebogen` setzen.

create extension if not exists pg_net with schema extensions;

-- Geheimnis, mit dem sich der Trigger bei der Edge Function ausweist.
do $$
begin
  if not exists (select 1 from vault.secrets where name = 'fragebogen_webhook_secret') then
    perform vault.create_secret(
      'CHANGE-ME-erzeuge-ein-starkes-zufaelliges-geheimnis',
      'fragebogen_webhook_secret',
      'Gemeinsames Geheimnis fuer die Edge Function neuer-fragebogen'
    );
  end if;
end $$;

create or replace function public.benachrichtige_neuer_fragebogen()
returns trigger
language plpgsql
security definer
set search_path = public, extensions, vault
as $$
declare
  geheimnis text;
begin
  select decrypted_secret into geheimnis
  from vault.decrypted_secrets
  where name = 'fragebogen_webhook_secret';

  if geheimnis is null then
    raise warning 'fragebogen_webhook_secret fehlt im Vault, keine Benachrichtigung verschickt';
    return new;
  end if;

  perform net.http_post(
    url     := 'https://csnyohpbyhwiattnkzuz.supabase.co/functions/v1/neuer-fragebogen',
    headers := jsonb_build_object(
                 'Content-Type', 'application/json',
                 'x-webhook-secret', geheimnis
               ),
    body    := jsonb_build_object('record', to_jsonb(new)),
    timeout_milliseconds := 5000
  );

  return new;
exception when others then
  -- Eine gescheiterte Benachrichtigung darf den Fragebogen nie verhindern.
  raise warning 'Benachrichtigung fehlgeschlagen: %', sqlerrm;
  return new;
end $$;

drop trigger if exists erstgespraech_fragebogen_benachrichtigung on public.erstgespraech_fragebogen;
create trigger erstgespraech_fragebogen_benachrichtigung
  after insert on public.erstgespraech_fragebogen
  for each row execute function public.benachrichtige_neuer_fragebogen();
