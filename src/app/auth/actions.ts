"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import {
  isSupabaseConfigured,
  ALLOW_SELF_REGISTRATION,
} from "@/lib/supabase/config";
import { safeInternalPath } from "@/lib/safe-redirect";

export type AuthState = { error?: string; message?: string };

export async function signIn(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  if (!isSupabaseConfigured)
    return { error: "Der Mitgliederbereich ist noch nicht konfiguriert." };

  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const redirectTo = safeInternalPath(formData.get("redirect"));

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return {
      error:
        error.message === "Invalid login credentials"
          ? "E-Mail oder Passwort ist nicht korrekt."
          : error.message,
    };
  }

  redirect(redirectTo);
}

export async function signUp(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  if (!isSupabaseConfigured)
    return { error: "Der Mitgliederbereich ist noch nicht konfiguriert." };

  if (!ALLOW_SELF_REGISTRATION)
    return {
      error:
        "Die Registrierung ist derzeit nicht möglich. Zugänge werden persönlich vergeben – melde dich gern über die Kontaktseite.",
    };

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!name)
    return { error: "Bitte gib deinen Namen an." };

  if (password.length < 8)
    return { error: "Das Passwort muss mindestens 8 Zeichen lang sein." };

  const hdrs = await headers();
  const host = hdrs.get("x-forwarded-host") ?? hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "https";
  const origin = host ? `${proto}://${host}` : "";

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
      emailRedirectTo: origin ? `${origin}/auth/callback` : undefined,
    },
  });

  if (error) return { error: error.message };

  // E-Mail-Bestätigung aktiv → noch keine Session
  if (!data.session) {
    return {
      message:
        "Fast geschafft! Wir haben dir eine E-Mail geschickt – bitte bestätige deine Adresse, um deinen Zugang zu aktivieren.",
    };
  }

  redirect("/mitglieder");
}

export async function signOut() {
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/login");
}
