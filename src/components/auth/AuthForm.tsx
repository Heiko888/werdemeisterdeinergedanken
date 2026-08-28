"use client";

import { useActionState, useState } from "react";
import { signIn, signUp, type AuthState } from "@/app/auth/actions";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Check } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

const initial: AuthState = {};

const inputClass =
  "w-full rounded-xl border border-ink/15 bg-paper/60 px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function AuthForm({
  redirectTo = "/mitglieder",
  allowRegister = true,
}: {
  redirectTo?: string;
  allowRegister?: boolean;
}) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loginState, loginAction, loginPending] = useActionState(signIn, initial);
  const [signupState, signupAction, signupPending] = useActionState(
    signUp,
    initial,
  );

  // Geschlossener Bereich: immer Anmelde-Modus erzwingen
  const activeMode = allowRegister ? mode : "login";
  const state = activeMode === "login" ? loginState : signupState;
  const pending = activeMode === "login" ? loginPending : signupPending;

  return (
    <div className="w-full max-w-md">
      {/* Umschalter (nur wenn Registrierung offen) */}
      {allowRegister && (
        <div className="mb-6 grid grid-cols-2 gap-1 rounded-full border border-ink/10 bg-white p-1 shadow-card">
          {(["login", "register"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={cn(
                "rounded-full py-2.5 text-sm font-medium transition-colors",
                mode === m
                  ? "bg-ink text-paper"
                  : "text-ink-soft hover:text-ink",
              )}
            >
              {m === "login" ? "Anmelden" : "Registrieren"}
            </button>
          ))}
        </div>
      )}

      {state.message ? (
        <div
          role="status"
          className="flex flex-col items-center gap-3 rounded-2xl border border-accent/30 bg-accent/10 p-8 text-center"
        >
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-xl text-accent">
            <Check />
          </span>
          <p className="text-sm leading-relaxed text-ink-soft">{state.message}</p>
        </div>
      ) : (
        <form
          action={activeMode === "login" ? loginAction : signupAction}
          className="flex flex-col gap-4 rounded-2xl border border-ink/10 bg-white p-6 shadow-card sm:p-8"
        >
          {activeMode === "register" && (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-medium text-ink">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="Dein Name"
                className={inputClass}
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-ink">
              E-Mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="du@beispiel.de"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-ink">
              Passwort
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={activeMode === "login" ? "current-password" : "new-password"}
              required
              minLength={activeMode === "register" ? 8 : undefined}
              placeholder={activeMode === "register" ? "Mind. 8 Zeichen" : "••••••••"}
              className={inputClass}
            />
          </div>

          <input type="hidden" name="redirect" value={redirectTo} />

          {state.error && (
            <p
              role="alert"
              className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {state.error}
            </p>
          )}

          <Button
            type="submit"
            variant="accent"
            size="lg"
            className="mt-1 w-full"
          >
            {pending
              ? "Bitte warten …"
              : activeMode === "login"
                ? "Anmelden"
                : "Konto erstellen"}
            {!pending && <ArrowRight />}
          </Button>

          <p className="text-center text-xs text-ink-muted">
            {!allowRegister ? (
              <>
                Noch keinen Zugang?{" "}
                <a href="/kontakt" className="font-medium text-accent hover:text-ink">
                  Schreib mir
                </a>{" "}
                – Zugänge werden persönlich vergeben.
              </>
            ) : activeMode === "login" ? (
              <>
                Noch kein Zugang?{" "}
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="font-medium text-accent hover:text-ink"
                >
                  Jetzt registrieren
                </button>
              </>
            ) : (
              <>
                Mit der Registrierung stimmst du der{" "}
                <a href="/datenschutz" className="underline hover:text-ink">
                  Datenschutzerklärung
                </a>{" "}
                zu.
              </>
            )}
          </p>
        </form>
      )}
    </div>
  );
}
