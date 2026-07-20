import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icon";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured, REQUIRE_MEMBER_LOGIN } from "@/lib/supabase/config";
import { signOut } from "@/app/auth/actions";
import { stages } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mein Bereich",
  robots: { index: false, follow: false },
};

export default async function MembersPage() {
  let name = "";
  let loggedIn = false;

  // Login-Schutz aktiv + Supabase da → echte Auth erzwingen
  if (REQUIRE_MEMBER_LOGIN && isSupabaseConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/login?redirect=/mitglieder");

    loggedIn = true;
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, email")
      .eq("id", user.id)
      .maybeSingle();

    name =
      profile?.full_name ||
      (user.user_metadata?.full_name as string | undefined) ||
      user.email?.split("@")[0] ||
      "";
  } else if (isSupabaseConfigured) {
    // Schutz aus, aber falls jemand eingeloggt ist: mit Namen begrüßen
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      loggedIn = true;
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle();
      name =
        profile?.full_name ||
        (user.user_metadata?.full_name as string | undefined) ||
        user.email?.split("@")[0] ||
        "";
    }
  }

  return (
    <>
      {/* Kopf */}
      <section className="grain relative overflow-hidden border-b border-ink/10 py-16 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(55% 60% at 20% 0%, color-mix(in oklab, var(--color-teal-500) 12%, transparent), transparent 65%)",
          }}
        />
        <Container className="flex flex-col items-start gap-4">
          <Eyebrow>Mein Bereich</Eyebrow>
          <div className="flex w-full flex-wrap items-end justify-between gap-4">
            <h1 className="text-[2rem] font-medium text-ink sm:text-4xl">
              {name ? (
                <>
                  Schön, dass du da bist, <em className="accent">{name}</em>
                </>
              ) : (
                <>
                  Willkommen in deinem <em className="accent">Bereich</em>
                </>
              )}
            </h1>
            {loggedIn && (
              <form action={signOut}>
                <Button type="submit" variant="secondary">
                  Abmelden
                </Button>
              </form>
            )}
          </div>
          <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-soft/75">
            Dein persönlicher Raum für deine Reise durch die 7 Stufen. Hier
            findest du künftig deine Inhalte, deinen Fortschritt und exklusive
            Materialien.
          </p>
        </Container>
      </section>

      {/* Fortschritt (Platzhalter) */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-display text-2xl font-medium text-ink">
              Deine 7 Stufen
            </h2>
            <span className="text-sm text-ink-soft/60">0 / 7 abgeschlossen</span>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stages.map((stage) => (
              <div
                key={stage.number}
                className="flex flex-col gap-2 rounded-2xl border border-ink/10 bg-white p-6 shadow-card"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl italic text-accent">
                    {stage.number}
                  </span>
                  <span className="rounded-full border border-ink/10 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-ink-soft/60">
                    Bald
                  </span>
                </div>
                <h3 className="text-lg font-medium text-ink">{stage.title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft/70">
                  {stage.subtitle}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-accent/25 bg-white p-8 shadow-card">
            <h2 className="font-display text-xl italic text-ink">
              Inhalte sind in Vorbereitung
            </h2>
            <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-soft/75">
              Die Lektionen und Materialien zu den einzelnen Stufen werden Schritt
              für Schritt hier freigeschaltet. Bei Fragen erreichst du mich
              jederzeit direkt.
            </p>
            <Button href="/kontakt" variant="accent">
              Kontakt aufnehmen
              <ArrowRight />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
