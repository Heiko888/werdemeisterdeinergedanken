import { APP_GLOW } from "@/lib/gradients";
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

  return (
    <>
      <section className="member-hero overflow-hidden py-16 sm:py-20">
        {/* Titelbild – leuchtender Kopf und Weg zum Sonnenaufgang: reine
            Dekoration hinter dem Text (deshalb alt=""). Darüber ein nach links
            dichter werdender Navy-Schleier für die Lesbarkeit, dann der übliche
            APP_GLOW für den Farbton. */}
        <Image
          src="/hero-programm.webp"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="z-0 object-cover object-center"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-navy-950/90 via-navy-950/70 to-navy-950/55"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: APP_GLOW }}
        />
        <Container className="relative z-10 flex flex-col items-start gap-5">
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
