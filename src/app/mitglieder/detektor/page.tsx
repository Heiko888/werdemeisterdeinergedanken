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
import { DetektorPanel } from "@/components/members/DetektorPanel";
import { isDetektorConfigured } from "@/app/mitglieder/detektor-actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Manipulations-Detektor",
  robots: { index: false, follow: false },
};

export default async function DetektorPage() {
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (REQUIRE_MEMBER_LOGIN && !user) {
      redirect("/login?redirect=/mitglieder/detektor");
    }
  }

  const configured = await isDetektorConfigured();

  return (
    <>
      <section className="member-hero flex flex-col justify-center overflow-hidden py-16 min-h-[22rem] sm:min-h-[34rem] sm:py-20">
        {/* Titelbild – der Puppenspieler an den Fäden: reine Dekoration hinter
            dem Text, deshalb bewusst alt="". Darüber ein Navy-Schleier (links
            am dichtesten, damit die Überschrift und der Fließtext lesbar
            bleiben) und zuletzt der übliche APP_GLOW für den Farbton. */}
        <Image
          src="/hero-detektor.webp"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="z-0 object-cover object-[center_20%]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-navy-950/92 via-navy-950/80 to-navy-950/62"
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
          <Eyebrow>Mentale Selbstverteidigung</Eyebrow>
          <h1 className="text-[2rem] font-medium text-ink sm:text-4xl">
            Der <em className="accent">Manipulations-Detektor</em>
          </h1>
          <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-mid">
            Füg einen Text ein – eine Schlagzeile, eine Werbung, einen Post. Die
            KI prüft ihn gegen die 16 Techniken aus den Vertiefungen und zeigt
            dir, welche Hebel darin wirken – mit der Textstelle und einer
            nüchternen Erklärung. Nicht, um dir zu sagen, was du denken sollst,
            sondern damit du die Mechanik selbst siehst.
          </p>
        </Container>
      </section>

      <section className="py-14 sm:py-16">
        <Container className="max-w-2xl">
          {configured ? (
            <DetektorPanel />
          ) : (
            <p className="rounded-2xl border border-ink/10 bg-white p-6 text-[1rem] leading-relaxed text-ink-mid shadow-card">
              Der Manipulations-Detektor ist gerade nicht verfügbar. Schau in den
              Vertiefungen unter „Mentale Selbstverteidigung“ vorbei – dort
              stehen alle 16 Techniken ausführlich.
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
