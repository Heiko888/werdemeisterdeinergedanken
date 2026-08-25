import type { Metadata } from "next";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LessonHero } from "@/components/members/LessonHero";
import { NewsletterToggle } from "@/components/members/NewsletterToggle";
import { DisplayNameForm } from "@/components/members/DisplayNameForm";
import { PasswordForm } from "@/components/members/PasswordForm";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { signOut } from "@/app/auth/actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Einstellungen",
  robots: { index: false, follow: false },
};

/** Einheitliche Karten-Sektion für die Einstellungen. */
function SettingCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-5 rounded-2xl border border-ink/10 bg-white p-6 shadow-card sm:p-8">
      <div className="flex flex-col gap-1.5">
        <h2 className="font-display text-xl font-medium text-ink">{title}</h2>
        <p className="text-[0.98rem] leading-relaxed text-ink-mid">{description}</p>
      </div>
      {children}
    </section>
  );
}

export default async function EinstellungenPage() {
  if (!isSupabaseConfigured) {
    return (
      <>
        <LessonHero eyebrow="Mein Bereich" title="Einstellungen" />
        <section className="py-14 sm:py-20">
          <Container size="narrow">
            <div className="rounded-2xl border border-ink/10 bg-white p-8 text-center shadow-card">
              <p className="text-ink-mid">
                Der Mitgliederbereich ist noch nicht konfiguriert.
              </p>
            </div>
          </Container>
        </section>
      </>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirect=/mitglieder/einstellungen");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, newsletter_opt_in")
    .eq("id", user.id)
    .maybeSingle();

  const fullName =
    profile?.full_name ||
    (user.user_metadata?.full_name as string | undefined) ||
    "";
  const newsletterOptIn = Boolean(profile?.newsletter_opt_in);
  const email = user.email ?? "";

  return (
    <>
      <LessonHero
        eyebrow="Mein Bereich"
        title="Einstellungen"
        subtitle="Verwalte deinen Namen, deine Impulse, dein Passwort und dein Konto."
      />

      <section className="py-14 sm:py-20">
        <Container size="narrow" className="flex flex-col gap-6">
          <SettingCard
            title="Anzeigename"
            description="Wie du in deinem Bereich angesprochen wirst. Angezeigt wird nur dein Vorname."
          >
            <DisplayNameForm initialName={fullName} />
          </SettingCard>

          <SettingCard
            title="E-Mail-Impulse"
            description="Kurze, bodenständige Impulse entlang der 7 Stufen – jederzeit mit einem Klick abbestellbar."
          >
            <NewsletterToggle initialOptIn={newsletterOptIn} />
          </SettingCard>

          <SettingCard
            title="Passwort"
            description="Setze ein neues Passwort für deinen Zugang."
          >
            <PasswordForm />
          </SettingCard>

          <SettingCard
            title="Konto"
            description="Deine Anmeldedaten und Sitzung."
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-ink-muted">
                  E-Mail-Adresse
                </span>
                <span className="text-ink">{email}</span>
              </div>
              <form action={signOut}>
                <Button type="submit" variant="secondary">
                  Abmelden
                </Button>
              </form>
            </div>
          </SettingCard>
        </Container>
      </section>
    </>
  );
}
