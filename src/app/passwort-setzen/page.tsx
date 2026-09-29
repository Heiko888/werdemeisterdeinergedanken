import { APP_GLOW } from "@/lib/gradients";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { PasswortSetzenForm } from "@/components/auth/PasswortSetzenForm";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Passwort setzen",
  description: "Lege das Passwort für deinen Mitgliederbereich fest.",
  robots: { index: false, follow: false },
};

/**
 * Ziel der Links aus Willkommens- (Stripe-Webhook, `#access_token` im Fragment)
 * und „Passwort vergessen“-Mails (`?code=`, PKCE). Die Auswertung passiert
 * komplett im Browser (das Fragment erreicht den Server nie).
 */
export default function PasswortSetzenPage() {
  return (
    <section className="grain relative overflow-hidden py-14 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: APP_GLOW }}
      />
      <Container className="flex flex-col items-center gap-8 text-center">
        <Eyebrow>Mitgliederbereich</Eyebrow>
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-[2rem] font-medium text-ink sm:text-4xl">
            Passwort setzen
          </h1>
          <p className="max-w-md text-[1.02rem] leading-relaxed text-ink-mid">
            Wähle ein Passwort für deinen Zugang. Danach geht es direkt in
            deinen persönlichen Bereich.
          </p>
        </div>

        {isSupabaseConfigured ? (
          <PasswortSetzenForm />
        ) : (
          <p className="max-w-md text-sm text-ink-mid">
            Der Mitgliederbereich ist noch nicht aktiviert.
          </p>
        )}
      </Container>
    </section>
  );
}
