"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Check } from "@/components/ui/Icon";
import { requestPasswordReset, type AuthState } from "@/app/auth/actions";
import { authInputClass } from "./styles";

const initial: AuthState = {};

/** Formular „Passwort vergessen“ – schickt einen Link zum Neu-Setzen. */
export function PasswortVergessenForm() {
  const [state, action, pending] = useActionState(requestPasswordReset, initial);

  if (state.message) {
    return (
      <div
        role="status"
        className="flex w-full max-w-md flex-col items-center gap-3 rounded-2xl border border-accent/30 bg-accent/10 p-8 text-center"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-xl text-accent">
          <Check />
        </span>
        <p className="text-sm leading-relaxed text-ink-soft">{state.message}</p>
        <Link
          href="/login"
          className="text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          Zurück zur Anmeldung
        </Link>
      </div>
    );
  }

  return (
    <Card as="form" action={action} className="flex w-full max-w-md flex-col gap-4 sm:p-8">
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
          className={authInputClass}
        />
      </div>

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
        disabled={pending}
      >
        {pending ? "Bitte warten …" : "Link zuschicken"}
        {!pending && <ArrowRight />}
      </Button>

      <p className="text-center text-xs text-ink-muted">
        Doch wieder eingefallen?{" "}
        <Link href="/login" className="font-medium text-accent hover:text-ink">
          Zur Anmeldung
        </Link>
      </p>
    </Card>
  );
}
