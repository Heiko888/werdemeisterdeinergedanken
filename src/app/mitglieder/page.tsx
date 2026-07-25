import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Download } from "@/components/ui/Icon";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured, REQUIRE_MEMBER_LOGIN } from "@/lib/supabase/config";
import { signOut } from "@/app/auth/actions";
import { stages } from "@/lib/content";
import { deepDivesByCategory } from "@/lib/deep-dives";

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
          <a
            href="/mitglieder/arbeitsheft"
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-white px-5 py-2.5 text-sm font-medium text-ink shadow-card transition-all hover:border-accent/40 hover:text-accent"
          >
            <Download />
            Gesamt-Arbeitsheft (alle 7 Stufen) als PDF
          </a>
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
            {stages.map((stage, i) => (
              <Link
                key={stage.number}
                href={`/mitglieder/stufe/${i + 1}`}
                className="group flex flex-col gap-2 rounded-2xl border border-ink/10 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl italic text-accent">
                    {stage.number}
                  </span>
                  <ArrowRight className="text-ink-soft/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
                </div>
                <h3 className="text-lg font-medium text-ink transition-colors group-hover:text-accent">
                  {stage.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-soft/70">
                  {stage.subtitle}
                </p>
              </Link>
            ))}
          </div>

        </Container>
      </section>

      {/* Vertiefungen – psychologische Wissens-Bibliothek */}
      <section className="border-t border-ink/10 bg-white/60 py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-2">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
              Wissens-Bibliothek
            </span>
            <h2 className="font-display text-2xl font-medium text-ink">
              Vertiefungen
            </h2>
            <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-soft/75">
              Die psychologischen Mechanismen hinter den 7 Stufen – zum
              Nachschlagen und Vertiefen. Jedes Thema mit Übungen und
              Reflexionsfragen.
            </p>
          </div>

          {deepDivesByCategory().map((group) => (
            <div key={group.category} className="mt-10">
              <h3 className="text-[0.8rem] font-semibold uppercase tracking-[0.15em] text-ink-soft/50">
                {group.category}
              </h3>
              <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((dive) => (
                  <Link
                    key={dive.slug}
                    href={`/mitglieder/wissen/${dive.slug}`}
                    className="group flex flex-col gap-2 rounded-2xl border border-ink/10 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-lg font-medium text-ink transition-colors group-hover:text-accent">
                        {dive.title}
                      </h4>
                      <ArrowRight className="mt-1 shrink-0 text-ink-soft/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
                    </div>
                    <p className="text-sm leading-relaxed text-ink-soft/70">
                      {dive.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-accent/25 bg-white p-8 shadow-card">
            <h3 className="font-display text-xl italic text-ink">
              Ein Thema fehlt dir?
            </h3>
            <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-soft/75">
              Die Bibliothek wächst Schritt für Schritt. Wenn dich ein bestimmter
              psychologischer Mechanismus beschäftigt, schreib mir – oft wird
              daraus die nächste Vertiefung.
            </p>
            <Button href="/kontakt" variant="accent">
              Thema vorschlagen
              <ArrowRight />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
