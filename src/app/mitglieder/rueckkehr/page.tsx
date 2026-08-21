import { APP_GLOW } from "@/lib/gradients";
import type { Metadata } from "next";
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
import { TaeglicheRueckkehr } from "@/components/members/TaeglicheRueckkehr";
import { getRueckkehrDaten } from "@/app/mitglieder/rueckkehr-actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Die tägliche Rückkehr",
  robots: { index: false, follow: false },
};

export default async function RueckkehrPage() {
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (REQUIRE_MEMBER_LOGIN && !user) {
      redirect("/login?redirect=/mitglieder/rueckkehr");
    }
  }

  const { tage } = await getRueckkehrDaten();

  return (
    <>
      <section className="grain relative overflow-hidden border-b border-ink/10 py-16 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: APP_GLOW }}
        />
        <Container className="flex flex-col items-start gap-5">
          <Link
            href="/mitglieder"
            className="inline-flex items-center gap-2 text-sm text-ink-mid transition-colors hover:text-ink"
          >
            <ArrowRight className="rotate-180" />
            Mein Bereich
          </Link>
          <Eyebrow>Deine tägliche Praxis</Eyebrow>
          <h1 className="text-[2rem] font-medium text-ink sm:text-4xl">
            Die tägliche <em className="accent">Rückkehr</em>
          </h1>
          <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-mid">
            Nach dem Programm bleibt eine einzige Gewohnheit: einmal am Tag
            innehalten und in deine Mitte zurückkehren. Nicht das Nie-mehr-Fallen
            ist das Ziel, sondern das ruhige Zurückkommen – jeden Tag ein wenig
            vertrauter.
          </p>
        </Container>
      </section>

      <section className="py-14 sm:py-16">
        <Container className="max-w-2xl">
          <TaeglicheRueckkehr initialTage={tage} />
        </Container>
      </section>
    </>
  );
}
