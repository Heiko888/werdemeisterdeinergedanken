import { APP_GLOW } from "@/lib/gradients";
import { heroImageAspect } from "@/lib/hero-image";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icon";
import { createClient } from "@/lib/supabase/server";
import {
  isSupabaseConfigured,
  REQUIRE_MEMBER_LOGIN,
} from "@/lib/supabase/config";
import { ProgrammBegleiter } from "@/components/members/ProgrammBegleiter";
import { getProgrammFortschritt } from "@/app/mitglieder/programm-actions";
import { programmTage, programmWochen } from "@/lib/programm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "21 Tage Autopilot-Ausstieg",
  robots: { index: false, follow: false },
};

export default async function ProgrammPage() {
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (REQUIRE_MEMBER_LOGIN && !user) {
      redirect("/login?redirect=/mitglieder/programm");
    }
  }

  const done = await getProgrammFortschritt();

  // Titelbild des Programms: horizontal gespiegelt dargestellt (-scale-x-100).
  // Wie bei LessonHero – Seitenverhältnis für das mobile Bildband kommt
  // automatisch aus der Datei (Fallback auf das native Format, falls es nicht
  // gelesen werden kann).
  const heroImage = "/hero-programm.webp";
  const bandAspect = heroImageAspect(heroImage) ?? "1672 / 941";

  return (
    <>
      <section className="member-hero flex flex-col overflow-hidden lg:min-h-[34rem] lg:justify-center">
        {/* Bild: bis lg als Band im Fluss (volle Höhe, unbeschnitten),
            ab lg als vollflächiger Hintergrund hinter dem Text. */}
        <div
          className="relative w-full shrink-0 lg:absolute lg:inset-0 lg:z-0"
          style={{ aspectRatio: bandAspect }}
        >
          <Image
            src={heroImage}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="z-0 -scale-x-100 object-cover object-center"
          />
          {/* Unterkante mobil ins Navy blenden, damit Bildband und Textblock
              weich ineinander übergehen. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-950 to-transparent lg:hidden"
          />
        </div>
        {/* Navy-Schleier links→rechts für die Lesbarkeit der linksbündigen
            Schrift – erst ab lg; darunter steht der Text auf reinem Navy unter
            dem Band. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 hidden bg-gradient-to-r from-navy-950/92 via-navy-950/80 to-navy-950/62 lg:block"
        />
        {/* Ruhiger Marken-Verlauf (member-hero) mit weichem APP_GLOW für den
            Farbton. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: APP_GLOW }}
        />
        <Container className="relative z-10 flex flex-col items-start gap-5 pb-14 pt-8 sm:pb-16 sm:pt-10 lg:py-16">
          <Link
            href="/mitglieder"
            className="inline-flex items-center gap-2 text-sm text-ink-mid transition-colors hover:text-ink"
          >
            <ArrowRight className="rotate-180" />
            Mein Bereich
          </Link>
          <Eyebrow>Ein geführtes Programm</Eyebrow>
          <h1 className="text-[2rem] font-medium text-ink sm:text-4xl">
            21 Tage <em className="accent">Autopilot-Ausstieg</em>
          </h1>
          <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-mid">
            Drei Wochen, ein Bogen: vom Bemerken über das Beobachten und
            Loslassen bis zum bewussten Gestalten. Jeden Tag ein Impuls und eine
            kleine Übung – in deinem Tempo. Ein verpasster Tag ist kein Bruch;
            du machst einfach weiter.
          </p>
        </Container>
      </section>

      <section className="py-14 sm:py-16">
        <Container className="max-w-2xl">
          <ProgrammBegleiter
            tage={programmTage}
            wochen={programmWochen}
            initialDone={done}
          />
        </Container>
      </section>
    </>
  );
}
