import { APP_GLOW } from "@/lib/gradients";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icon";
import { createClient } from "@/lib/supabase/server";
import {
  isSupabaseConfigured,
  REQUIRE_MEMBER_LOGIN,
} from "@/lib/supabase/config";
import { BegleiterChat } from "@/components/members/BegleiterChat";
import {
  isBegleiterConfigured,
  getConversation,
} from "@/app/mitglieder/begleiter/actions";
import { isKiBegleiterEnabled } from "@/lib/ki-features";

/**
 * Der KI-Begleiter im Mitgliederbereich.
 *
 * Ein KI-gestützter Reflexions- und Orientierungsdialog, der die Inhalte der
 * Plattform kennt – zum Strukturieren, Nachdenken und Auffinden passender
 * Inhalte. Keine Lernkontrolle (docs/ZFU-KI-PRUEFUNG.md). Ohne ANTHROPIC_API_KEY (oder ohne Migration 0009) bleibt
 * die Seite erreichbar und erklärt ruhig, dass der Begleiter noch schläft.
 *
 * Solange der Schalter KI_BEGLEITER_ENABLED nicht auf "true" steht (Standard,
 * src/lib/ki-features.ts), leitet die Seite still ins Dashboard um – so landet
 * niemand über einen alten Link auf einer toten Seite.
 */

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dein Begleiter",
  robots: { index: false, follow: false },
};

export default async function BegleiterPage() {
  if (!isKiBegleiterEnabled()) redirect("/mitglieder");

  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (REQUIRE_MEMBER_LOGIN && !user) {
      redirect("/login?redirect=/mitglieder/begleiter");
    }
  }

  const configured = await isBegleiterConfigured();
  const messages = configured ? await getConversation() : [];

  return (
    <>
      {/* Kopf */}
      <section className="member-hero overflow-hidden py-10 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: APP_GLOW }}
        />
        <Container className="flex flex-col items-start gap-4 sm:gap-5">
          <Link
            href="/mitglieder"
            className="inline-flex items-center gap-2 text-sm text-ink-mid transition-colors hover:text-ink"
          >
            <ArrowRight className="rotate-180" />
            Mein Bereich
          </Link>
          <Eyebrow>Dein Begleiter · KI-gestützt</Eyebrow>
          <h1 className="text-[2rem] font-medium text-ink sm:text-4xl">
            Sprich mit deinem <em className="accent">Begleiter</em>
          </h1>
          <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-mid">
            Ein KI-gestützter Dialog zum Strukturieren, Nachdenken und Auffinden
            passender Inhalte. Er kennt die 7 Stufen, die Vertiefungen und die
            Praxis-Anleitungen und bezieht deine Selbsteinschätzung und deine
            Notizen als Gesprächskontext ein. Er erklärt Begriffe, fasst Inhalte
            zusammen und bietet Perspektiven an – eine Bewertung deines
            Verständnisses ist er nicht.
          </p>
        </Container>
      </section>

      {/* Gespräch */}
      <section className="py-6 sm:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            {configured ? (
              <BegleiterChat initialMessages={messages} />
            ) : (
              <div className="flex flex-col items-start gap-4 rounded-2xl border border-accent/25 bg-white p-8 shadow-card">
                <h2 className="font-display text-xl font-medium text-ink">
                  Der Begleiter schläft noch
                </h2>
                <p className="text-[1.02rem] leading-relaxed text-ink-mid">
                  Er ist noch nicht eingerichtet. Bis dahin findest du alles
                  Wichtige in deinem Bereich – die 7 Stufen, die Vertiefungen und
                  die geführten Praxen warten schon auf dich.
                </p>
                <Button href="/mitglieder" variant="secondary">
                  Zurück in meinen Bereich
                  <ArrowRight />
                </Button>
              </div>
            )}

            {/* Einordnung – bewusst unter dem Gespräch, nicht davor. */}
            <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-ink-muted">
              Der Begleiter ist eine KI – seine Antworten schreibt nicht Heiko
              persönlich. Er ergänzt die Inhalte, ersetzt aber
              keine Therapie, keine Beratung und kein Gespräch mit einem
              Menschen. In einer akuten Krise erreichst du die Telefonseelsorge
              rund um die Uhr und kostenlos unter 0800 111 0 111 oder
              0800 111 0 222.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
