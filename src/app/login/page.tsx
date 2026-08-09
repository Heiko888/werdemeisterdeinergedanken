import { APP_GLOW } from "@/lib/gradients";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { AuthForm } from "@/components/auth/AuthForm";
import {
  isSupabaseConfigured,
  ALLOW_SELF_REGISTRATION,
} from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mitglieder-Login",
  description: "Melde dich in deinem geschützten Mitgliederbereich an.",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await searchParams;

  return (
    <section className="grain relative overflow-hidden py-14 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            APP_GLOW,
        }}
      />
      <Container className="flex flex-col items-center gap-8 text-center">
        <Eyebrow>Mitgliederbereich</Eyebrow>
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-[2rem] font-medium text-ink sm:text-4xl">
            Willkommen zurück
          </h1>
          <p className="max-w-md text-[1.02rem] leading-relaxed text-ink-mid">
            {ALLOW_SELF_REGISTRATION
              ? "Melde dich an oder erstelle deinen Zugang, um in deinen persönlichen Bereich zu gelangen."
              : "Melde dich mit deinem persönlichen Zugang an, um in deinen Bereich zu gelangen."}
          </p>
        </div>

        {isSupabaseConfigured ? (
          <div className="flex w-full max-w-md flex-col items-center gap-5">
            <AuthForm
              redirectTo={redirect ?? "/mitglieder"}
              allowRegister={ALLOW_SELF_REGISTRATION}
            />
            {!ALLOW_SELF_REGISTRATION && (
              <p className="text-sm leading-relaxed text-ink-mid">
                Noch kein Zugang?{" "}
                <Link
                  href="/mitgliedschaft"
                  className="font-semibold text-accent underline-offset-4 hover:underline"
                >
                  Jetzt Mitglied werden
                </Link>{" "}
                – nach der Buchung richtest du dein Passwort ein und bist sofort
                drin.
              </p>
            )}
          </div>
        ) : (
          <div className="w-full max-w-md rounded-2xl border border-gold-500/40 bg-gold-300/20 p-6 text-left text-sm leading-relaxed text-ink-soft shadow-card">
            <strong className="block font-semibold text-ink">
              Mitgliederbereich noch nicht aktiviert
            </strong>
            Der Login wird verfügbar, sobald die Supabase-Zugangsdaten
            (Umgebungsvariablen) hinterlegt sind. Das Grundgerüst ist bereits
            vollständig eingebaut.
          </div>
        )}
      </Container>
    </section>
  );
}
