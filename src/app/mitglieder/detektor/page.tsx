import { APP_GLOW } from "@/lib/gradients";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icon";
import { createClient } from "@/lib/supabase/server";
import {
  isSupabaseConfigured,
  REQUIRE_MEMBER_LOGIN,
} from "@/lib/supabase/config";
import { DetektorPanel } from "@/components/members/DetektorPanel";
import {
  isDetektorConfigured,
  getDetektorHistory,
} from "@/app/mitglieder/detektor-actions";

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
  const verlauf = configured ? await getDetektorHistory(8) : [];
  const dateFmt = new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeZone: "Europe/Berlin",
  });

  return (
    <>
      <section className="member-hero flex flex-col justify-center overflow-hidden py-16 min-h-[22rem] sm:min-h-[34rem] sm:py-20">
        {/* Ruhiger Marken-Verlauf (member-hero) mit weichem APP_GLOW für den
            Farbton – ohne Titelbild. */}
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
            <Card as="p" className="text-[1rem] leading-relaxed text-ink-mid">
              Der Manipulations-Detektor ist gerade nicht verfügbar. Schau in den
              Vertiefungen unter „Mentale Selbstverteidigung“ vorbei – dort
              stehen alle 16 Techniken ausführlich.
            </Card>
          )}
        </Container>
      </section>

      {/* Verlauf der letzten Prüfungen */}
      {verlauf.length > 0 && (
        <section className="border-t border-ink/10 py-12 sm:py-16">
          <Container className="max-w-2xl">
            <Eyebrow>Dein Verlauf</Eyebrow>
            <h2 className="mt-1 font-display text-2xl font-medium text-ink">
              Zuletzt geprüft
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-mid">
              Deine letzten Prüfungen – nur für dich sichtbar. Mit der Zeit siehst
              du, welche Hebel dir immer wieder begegnen.
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {verlauf.map((v) => (
                <li
                  key={v.id}
                  className="flex flex-col gap-2 rounded-2xl border border-ink/10 bg-white p-5 shadow-card"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-xs font-medium text-ink-muted">
                      {dateFmt.format(new Date(v.createdAt))}
                    </span>
                    <span className="text-xs text-ink-muted">
                      {v.funde.length === 0
                        ? "keine Technik erkannt"
                        : `${v.funde.length} Technik${v.funde.length === 1 ? "" : "en"}`}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-[0.95rem] italic leading-relaxed text-ink-mid">
                    „{v.eingabe.slice(0, 180)}
                    {v.eingabe.length > 180 ? "…" : ""}&ldquo;
                  </p>
                  {v.funde.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {v.funde.map((f) => (
                        <Link
                          key={f.slug}
                          href={f.href}
                          className="rounded-full border border-accent/25 bg-accent/[0.06] px-3 py-1 text-xs font-medium text-accent hover:bg-accent/10"
                        >
                          {f.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
