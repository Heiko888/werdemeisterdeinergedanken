/**
 * Gemeinsame UI-Bausteine der Admin-Übersichten (Mitglieder, Leads, Kontakt,
 * Bestellungen). Der Unterstrich macht `_ui` zu einem privaten Ordner-Nachbarn,
 * der nicht als Route erscheint.
 */
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRight, Download } from "@/components/ui/Icon";
import { APP_GLOW } from "@/lib/gradients";

const dateFmt = new Intl.DateTimeFormat("de-DE", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Europe/Berlin",
});

const dayFmt = new Intl.DateTimeFormat("de-DE", {
  dateStyle: "medium",
  timeZone: "Europe/Berlin",
});

export function formatDateTime(value?: string | null): string {
  if (!value) return "–";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? "–" : dateFmt.format(d);
}

export function formatDay(value?: string | null): string {
  if (!value) return "–";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? "–" : dayFmt.format(d);
}

export function formatEuro(amountMinor?: number | null, currency?: string | null): string {
  if (amountMinor === null || amountMinor === undefined) return "–";
  try {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: (currency || "eur").toUpperCase(),
    }).format(amountMinor / 100);
  } catch {
    return `${(amountMinor / 100).toFixed(2)} ${currency ?? ""}`.trim();
  }
}

export function AdminHeader({
  eyebrow,
  title,
  count,
  description,
  exportHref,
  exportLabel = "CSV exportieren",
}: {
  eyebrow: string;
  title: React.ReactNode;
  count?: number;
  description?: string;
  exportHref?: string;
  exportLabel?: string;
}) {
  return (
    <section className="grain relative overflow-hidden border-b border-ink/10 py-12 sm:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: APP_GLOW }}
      />
      <Container className="flex flex-col items-start gap-4">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm text-ink-mid transition-colors hover:text-ink"
        >
          <ArrowRight className="rotate-180" />
          Cockpit
        </Link>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="text-[1.8rem] font-medium text-ink sm:text-4xl">{title}</h1>
        {description && (
          <p className="max-w-2xl text-[1.02rem] leading-relaxed text-ink-mid">
            {description}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-3">
          {typeof count === "number" && (
            <span className="rounded-full bg-ink/5 px-3 py-1 text-sm font-medium text-ink-mid">
              {count} Einträge
            </span>
          )}
          {exportHref && count !== 0 && (
            <a
              href={exportHref}
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-1.5 text-sm font-medium text-ink transition-colors hover:border-ink/30"
            >
              <Download className="h-4 w-4" />
              {exportLabel}
            </a>
          )}
        </div>
      </Container>
    </section>
  );
}

/** Hinweis, wenn eine Tabelle (Migration) noch nicht eingespielt ist. */
export function TableMissingHint({
  table,
  migration,
}: {
  table: string;
  migration: string;
}) {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-gold-400/50 bg-gold-300/15 p-5 text-sm text-ink-mid">
      <strong className="font-semibold text-ink">
        Tabelle <code className="rounded bg-ink/5 px-1">{table}</code> noch nicht
        vorhanden.
      </strong>{" "}
      Spiele die Migration{" "}
      <code className="rounded bg-ink/5 px-1">{migration}</code> in Supabase ein,
      damit hier Einträge erscheinen. Solange die Tabelle fehlt, werden neue
      Einträge nur per E-Mail zugestellt (nicht gespeichert).
    </div>
  );
}

export function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-ink/15 bg-white/60 p-8 text-center text-sm text-ink-mid">
      {text}
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const tone: Record<string, string> = {
    active: "bg-emerald-100 text-emerald-800",
    trialing: "bg-emerald-100 text-emerald-800",
    confirmed: "bg-emerald-100 text-emerald-800",
    versendet: "bg-emerald-100 text-emerald-800",
    beantwortet: "bg-emerald-100 text-emerald-800",
    pending: "bg-gold-300/50 text-ink",
    neu: "bg-gold-300/50 text-ink",
    bezahlt: "bg-gold-300/50 text-ink",
    past_due: "bg-red-100 text-red-800",
    unpaid: "bg-red-100 text-red-800",
    canceled: "bg-ink/10 text-ink-mid",
    cancelled: "bg-ink/10 text-ink-mid",
    unsubscribed: "bg-ink/10 text-ink-mid",
    archiviert: "bg-ink/10 text-ink-mid",
    erstattet: "bg-ink/10 text-ink-mid",
  };
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        tone[status] ?? "bg-ink/5 text-ink-mid"
      }`}
    >
      {status}
    </span>
  );
}

/** Responsive Tabellen-Hülle mit einheitlichem Rahmen/Scroll. */
export function TableShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-ink/10 bg-white shadow-card">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        {children}
      </table>
    </div>
  );
}

export function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="border-b border-ink/10 px-4 py-3 font-semibold text-ink-mid">
      {children}
    </th>
  );
}

export function Td({ children }: { children: React.ReactNode }) {
  return <td className="border-b border-ink/5 px-4 py-3 align-top text-ink">{children}</td>;
}
