"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Check } from "@/components/ui/Icon";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/lib/supabase/config";
import { authInputClass } from "./styles";

/** Mindestlänge – identisch mit Registrierung und Einstellungen (updatePassword). */
const MIN_LENGTH = 8;

type Phase =
  | { kind: "loading" }
  | { kind: "ready"; email: string | null }
  | { kind: "invalid"; reason: "expired" | "missing" | "otherBrowser" }
  | { kind: "done" };

/**
 * Eigener Browser-Client ohne automatische URL-Erkennung: Der Standard-Client
 * (PKCE) würde ein `#access_token`-Fragment aus dem Admin-Link (Implicit Flow)
 * als „kein gültiger PKCE-Link“ verwerfen und einen `?code=` selbstständig
 * einlösen. Hier steuern wir beide Varianten bewusst selbst. Die Session landet
 * trotzdem in denselben Cookies wie beim normalen Client.
 */
function createRecoveryClient() {
  return createBrowserClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    isSingleton: false,
    auth: { detectSessionInUrl: false },
  });
}

type RecoveryClient = ReturnType<typeof createRecoveryClient>;

/** Liest Session aus Fragment (Implicit), `?code=` (PKCE) oder bestehender Anmeldung. */
async function establishSession(client: RecoveryClient): Promise<Phase> {
  const { pathname, search, hash } = window.location;
  const hashParams = new URLSearchParams(hash.replace(/^#/, ""));
  const queryParams = new URLSearchParams(search);

  // Token/Code sofort aus der Adresszeile entfernen (Verlauf, Screenshots, Referrer).
  if (hash || search) window.history.replaceState(null, "", pathname);

  const urlError =
    hashParams.get("error_code") ||
    hashParams.get("error") ||
    queryParams.get("error_code") ||
    queryParams.get("error");

  const accessToken = hashParams.get("access_token");
  const refreshToken = hashParams.get("refresh_token");
  const code = queryParams.get("code");

  if (accessToken && refreshToken) {
    const { error } = await client.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    if (error) return { kind: "invalid", reason: "expired" };
  } else if (code) {
    const { error } = await client.auth.exchangeCodeForSession(code);
    if (error) {
      // Fehlt der Code-Verifier, wurde der Link in einem anderen Browser geöffnet.
      const otherBrowser = /code verifier/i.test(error.message);
      // Evtl. besteht trotzdem eine Sitzung (z. B. Link doppelt geöffnet).
      const { data } = await client.auth.getUser();
      if (!data.user)
        return { kind: "invalid", reason: otherBrowser ? "otherBrowser" : "expired" };
    }
  }

  const { data } = await client.auth.getUser();
  if (data.user) return { kind: "ready", email: data.user.email ?? null };

  return { kind: "invalid", reason: urlError || accessToken || code ? "expired" : "missing" };
}

function translateError(message: string, code?: string): string {
  if (code === "same_password" || /different from the old/i.test(message))
    return "Das neue Passwort muss sich von deinem bisherigen unterscheiden.";
  if (code === "weak_password" || /weak|should be at least/i.test(message))
    return "Dieses Passwort ist zu schwach. Wähle bitte ein längeres oder weniger gängiges Passwort.";
  if (/session|jwt|expired/i.test(message))
    return "Deine Sitzung ist abgelaufen. Bitte fordere einen neuen Link an.";
  return "Das Passwort konnte nicht gespeichert werden. Bitte versuch es noch einmal.";
}

export function PasswortSetzenForm() {
  const clientRef = useRef<RecoveryClient | null>(null);
  const startedRef = useRef(false);
  const [phase, setPhase] = useState<Phase>({ kind: "loading" });
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    // Nur einmal ausführen (StrictMode ruft Effekte doppelt auf – ein Code
    // lässt sich aber nur einmal einlösen).
    if (startedRef.current) return;
    startedRef.current = true;
    const client = createRecoveryClient();
    clientRef.current = client;
    establishSession(client)
      .then(setPhase)
      .catch(() => setPhase({ kind: "invalid", reason: "expired" }));
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const password = String(form.get("password") || "");
    const confirm = String(form.get("confirm") || "");

    if (password.length < MIN_LENGTH) {
      setError(`Das Passwort muss mindestens ${MIN_LENGTH} Zeichen lang sein.`);
      return;
    }
    if (password !== confirm) {
      setError("Die beiden Passwörter stimmen nicht überein.");
      return;
    }

    const client = clientRef.current;
    if (!client) return;
    setError(null);
    setPending(true);
    const { error: updateError } = await client.auth.updateUser({ password });
    if (updateError) {
      setPending(false);
      setError(translateError(updateError.message, updateError.code));
      return;
    }

    setPhase({ kind: "done" });
    // Vollständiger Seitenaufruf, damit der Server die neuen Cookies sieht.
    window.location.replace("/mitglieder");
  }

  if (phase.kind === "loading") {
    return (
      <Card className="w-full max-w-md text-center sm:p-8">
        <p role="status" className="text-sm text-ink-mid">
          Dein Link wird geprüft …
        </p>
      </Card>
    );
  }

  if (phase.kind === "invalid") {
    const text =
      phase.reason === "missing"
        ? "Diese Seite funktioniert nur über den Link aus deiner E-Mail. Fordere dir einfach einen neuen an."
        : phase.reason === "otherBrowser"
          ? "Der Link wurde in einem anderen Browser geöffnet als dem, in dem du ihn angefordert hast. Fordere bitte einen neuen Link an und öffne ihn im selben Browser."
          : "Der Link ist abgelaufen oder wurde bereits verwendet. Aus Sicherheitsgründen gilt jeder Link nur kurz und nur einmal.";
    return (
      <Card className="flex w-full max-w-md flex-col items-center gap-5 text-center sm:p-8">
        <strong className="text-lg font-medium text-ink">
          {phase.reason === "missing" ? "Kein gültiger Link" : "Link abgelaufen"}
        </strong>
        <p className="text-sm leading-relaxed text-ink-soft">{text}</p>
        <Button href="/passwort-vergessen" variant="accent" size="md">
          Neuen Link anfordern
          <ArrowRight />
        </Button>
        <Link href="/login" className="text-xs font-medium text-accent hover:text-ink">
          Zur Anmeldung
        </Link>
      </Card>
    );
  }

  if (phase.kind === "done") {
    return (
      <div
        role="status"
        className="flex w-full max-w-md flex-col items-center gap-3 rounded-2xl border border-accent/30 bg-accent/10 p-8 text-center"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-xl text-accent">
          <Check />
        </span>
        <p className="text-sm leading-relaxed text-ink-soft">
          Dein Passwort ist gespeichert. Du wirst jetzt in deinen Bereich
          weitergeleitet …
        </p>
      </div>
    );
  }

  return (
    <Card
      as="form"
      onSubmit={onSubmit}
      noValidate
      className="flex w-full max-w-md flex-col gap-4 text-left sm:p-8"
    >
      {phase.email && (
        <>
          {/* Hilft Passwort-Managern, das neue Passwort dem Konto zuzuordnen. */}
          <input
            type="email"
            name="username"
            autoComplete="username"
            value={phase.email}
            readOnly
            hidden
          />
          <p className="text-sm text-ink-mid">
            Für <strong className="font-medium text-ink">{phase.email}</strong>
          </p>
        </>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-ink">
          Neues Passwort
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={MIN_LENGTH}
          placeholder={`Mind. ${MIN_LENGTH} Zeichen`}
          className={authInputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="confirm" className="text-sm font-medium text-ink">
          Passwort wiederholen
        </label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          autoComplete="new-password"
          required
          minLength={MIN_LENGTH}
          placeholder="Noch einmal eingeben"
          className={authInputClass}
        />
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <Button
        type="submit"
        variant="accent"
        size="lg"
        className="mt-1 w-full"
        disabled={pending}
      >
        {pending ? "Wird gespeichert …" : "Passwort speichern"}
        {!pending && <ArrowRight />}
      </Button>
    </Card>
  );
}
