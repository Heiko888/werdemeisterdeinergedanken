import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { APP_GLOW } from "@/lib/gradients";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icon";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import {
  sortiereKategorien,
  type KategorieRow,
  type MethodeRow,
} from "@/lib/coaching-methoden";
import { MethodeEditor } from "../MethodeEditor";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Methode bearbeiten",
  robots: { index: false, follow: false },
};

export default async function MethodeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const istNeu = slug === "neu";

  if (!isSupabaseConfigured) {
    return (
      <section className="py-24">
        <Container size="narrow" className="text-center">
          <Eyebrow>Coaching-Methoden</Eyebrow>
          <h1 className="mt-2 text-2xl font-medium text-ink">Noch nicht verbunden</h1>
          <p className="mt-3 text-ink-mid">
            Die Methoden-Bibliothek braucht eine konfigurierte Supabase-Anbindung.
          </p>
        </Container>
      </section>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/login?redirect=/admin/methoden/${slug}`);
  if (!isAdminEmail(user.email)) redirect("/mitglieder");

  const [{ data: kategorienRaw }, methodeRes] = await Promise.all([
    supabase.from("coaching_kategorien").select("*"),
    istNeu
      ? Promise.resolve({ data: null })
      : supabase.from("coaching_methoden").select("*").eq("slug", slug).maybeSingle(),
  ]);

  const kategorien = sortiereKategorien((kategorienRaw ?? []) as KategorieRow[]);
  const methode = (methodeRes.data as MethodeRow | null) ?? null;

  if (!istNeu && !methode) notFound();

  return (
    <>
      <section className="grain relative overflow-hidden border-b border-ink/10 py-12 sm:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: APP_GLOW }}
        />
        <Container className="flex flex-col items-start gap-4">
          <Link
            href="/admin/methoden"
            className="inline-flex items-center gap-2 text-sm text-ink-mid transition-colors hover:text-ink"
          >
            <ArrowRight className="rotate-180" />
            Alle Methoden
          </Link>
          <Eyebrow>{istNeu ? "Neue Methode" : "Bearbeiten"}</Eyebrow>
          <h1 className="text-[1.6rem] font-medium text-ink sm:text-3xl">
            {istNeu ? (
              <>
                Neue <em className="accent">Methode</em> anlegen
              </>
            ) : (
              methode!.name
            )}
          </h1>
        </Container>
      </section>

      <section className="py-10">
        <Container size="narrow">
          <MethodeEditor kategorien={kategorien} methode={methode} />
        </Container>
      </section>
    </>
  );
}
