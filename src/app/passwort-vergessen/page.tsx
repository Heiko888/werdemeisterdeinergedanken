import { APP_GLOW } from "@/lib/gradients";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { PasswortVergessenForm } from "@/components/auth/PasswortVergessenForm";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Passwort vergessen",
  description: "Fordere einen Link an, um das Passwort für deinen Mitgliederbereich neu zu setzen.",
  robots: { index: false, follow: false },
};

export default function PasswortVergessenPage() {
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
            Passwort vergessen?
          </h1>
          <p className="max-w-md text-[1.02rem] leading-relaxed text-ink-mid">
            Gib die E-Mail-Adresse deines Zugangs ein. Wir schicken dir einen
            Link, mit dem du ein neues Passwort festlegst. Auch wenn du dein
            Passwort nach der Buchung noch nie gesetzt hast, bist du hier richtig.
          </p>
        </div>

        {isSupabaseConfigured ? (
          <PasswortVergessenForm />
        ) : (
          <p className="max-w-md text-sm text-ink-mid">
            Der Mitgliederbereich ist noch nicht aktiviert.
          </p>
        )}
      </Container>
    </section>
  );
}
