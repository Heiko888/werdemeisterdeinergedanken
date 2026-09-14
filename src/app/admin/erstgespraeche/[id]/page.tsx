import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/Icon";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import type {
  FragebogenRow,
  GespraechRow,
  ZitatRow,
} from "@/lib/erstgespraech/types";
import { Cockpit } from "./Cockpit";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gesprächs-Cockpit",
  robots: { index: false, follow: false },
};

export default async function CockpitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!isSupabaseConfigured) redirect("/admin/erstgespraeche");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/login?redirect=/admin/erstgespraeche/${id}`);
  if (!isAdminEmail(user.email)) redirect("/mitglieder");

  const { data: gespraech } = await supabase
    .from("erstgespraech_gespraeche")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!gespraech) notFound();
  const g = gespraech as GespraechRow;

  const [fbRes, zitateRes] = await Promise.all([
    g.fragebogen_id
      ? supabase
          .from("erstgespraech_fragebogen")
          .select("*")
          .eq("id", g.fragebogen_id)
          .maybeSingle()
      : Promise.resolve({ data: null }),
    supabase
      .from("erstgespraech_zitate")
      .select("*")
      .eq("gespraech_id", id)
      .order("created_at", { ascending: false }),
  ]);

  const fragebogen = (fbRes.data ?? null) as FragebogenRow | null;
  const zitate = (zitateRes.data ?? []) as ZitatRow[];

  return (
    <div className="min-h-screen">
      <div className="border-b border-ink/10 bg-paper/80 py-3">
        <Container size="wide" className="flex items-center justify-between">
          <Link
            href="/admin/erstgespraeche"
            className="inline-flex items-center gap-2 text-sm text-ink-mid transition-colors hover:text-ink"
          >
            <ArrowRight className="rotate-180" />
            Übersicht
          </Link>
          <span className="text-sm text-ink-muted">
            {g.interessent_name}
          </span>
        </Container>
      </div>

      <Cockpit gespraech={g} fragebogen={fragebogen} zitateInitial={zitate} />
    </div>
  );
}
