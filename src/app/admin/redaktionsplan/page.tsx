import { APP_GLOW } from "@/lib/gradients";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icon";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import { WOCHEN_META } from "@/lib/redaktionsplan";
import { getPlanPosts } from "./actions";
import { RedaktionsplanCockpit } from "./Planer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Redaktionsplan",
  robots: { index: false, follow: false },
};

export default async function RedaktionsplanPage() {
  if (!isSupabaseConfigured) {
    return (
      <section className="py-24">
        <Container className="mx-auto max-w-xl text-center">
          <Eyebrow>Redaktionsplan</Eyebrow>
          <h1 className="mt-2 text-2xl font-medium text-ink">Noch nicht verbunden</h1>
          <p className="mt-3 text-ink-mid">
            Der Redaktionsplan braucht eine konfigurierte Supabase-Anbindung. Sobald
            die Umgebungsvariablen gesetzt sind, ist diese Seite verfügbar.
          </p>
        </Container>
      </section>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirect=/admin/redaktionsplan");
  if (!isAdminEmail(user.email)) redirect("/mitglieder");

  const { posts, error } = await getPlanPosts();

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
            href="/admin"
            className="inline-flex items-center gap-2 text-sm text-ink-mid transition-colors hover:text-ink"
          >
            <ArrowRight className="rotate-180" />
            Marketing-Cockpit
          </Link>
          <Eyebrow>Redaktionsplan</Eyebrow>
          <h1 className="text-[2rem] font-medium text-ink sm:text-4xl">
            Dein <em className="accent">Redaktionsplan</em>
          </h1>
          <p className="max-w-2xl text-[1.02rem] leading-relaxed text-ink-mid">
            Ein Wochenthema, alle Kanäle gleichzeitig – Instagram, Facebook,
            LinkedIn und YouTube. Plane pro Tag, was wann rausgeht, und markiere,
            was schon erstellt bzw. veröffentlicht ist.
          </p>
        </Container>
      </section>

      <section className="py-10 sm:py-14">
        <Container>
          {error && (
            <div className="mx-auto mb-8 max-w-2xl rounded-2xl border border-gold-400/50 bg-gold-300/15 p-5 text-sm text-ink-mid">
              <strong className="font-semibold text-ink">Hinweis:</strong> {error}
            </div>
          )}
          <RedaktionsplanCockpit
            initialPosts={posts}
            wochenMeta={WOCHEN_META}
          />
        </Container>
      </section>
    </>
  );
}
