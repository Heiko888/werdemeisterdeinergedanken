import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { openAboPortal } from "./abo-actions";
import type { AboUebersicht } from "./abo-status";

/**
 * Inhalt der Karte „Mitgliedschaft“ (Status, Datum, Kündigen/Verwalten).
 * § 312k BGB: Die Kündigungsmöglichkeit ist direkt sichtbar und eindeutig
 * mit „Mitgliedschaft kündigen“ beschriftet.
 */

const KONTAKT_HREF = "/kontakt?thema=mitgliedschaft";

const FEHLER_TEXT: Record<string, string> = {
  "nicht-konfiguriert":
    "Die Online-Verwaltung ist gerade nicht verfügbar. Schreib mir kurz – ich kümmere mich persönlich um deine Kündigung oder Frage.",
  "kein-kunde":
    "Zu deinem Konto habe ich keine Zahlungsdaten gefunden. Schreib mir kurz – ich kümmere mich persönlich darum.",
  fehler:
    "Das Zahlungssystem hat gerade nicht geantwortet. Versuch es bitte gleich noch einmal oder schreib mir – ich helfe dir persönlich weiter.",
};

function formatDatum(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Berlin",
  });
}

function statusText(abo: AboUebersicht): { label: string; detail: string | null } {
  const datum = formatDatum(abo.datum);
  switch (abo.zustand) {
    case "aktiv":
      return {
        label: "Aktiv",
        detail: datum ? `Verlängert sich am ${datum}.` : null,
      };
    case "testphase":
      return {
        label: "Aktiv (Testphase)",
        detail: datum ? `Testphase läuft bis ${datum}.` : null,
      };
    case "gekuendigt":
      return {
        label: datum ? `Gekündigt zum ${datum}` : "Gekündigt",
        detail: datum
          ? `Dein Zugang läuft bis ${datum} und endet dann automatisch.`
          : "Dein Zugang bleibt bis zum Ende des bezahlten Zeitraums bestehen.",
      };
    case "zahlung-offen":
      return {
        label: "Zahlung offen",
        detail:
          "Die letzte Zahlung ist nicht durchgegangen. Bitte prüfe deine Zahlungsart.",
      };
    case "beendet":
      return {
        label: "Beendet",
        detail: datum ? `Deine Mitgliedschaft lief bis ${datum}.` : null,
      };
    case "in-bearbeitung":
      return {
        label: "In Bearbeitung",
        detail: "Deine Zahlung wird gerade noch verarbeitet.",
      };
    default:
      return {
        label: "Keine Mitgliedschaft gefunden",
        detail: abo.istAdmin
          ? "Als Admin hast du Zugang ohne eigene Mitgliedschaft."
          : null,
      };
  }
}

export function MitgliedschaftKarte({
  abo,
  fehler,
}: {
  abo: AboUebersicht;
  fehler?: string | null;
}) {
  const { label, detail } = statusText(abo);
  const fehlerText = fehler ? FEHLER_TEXT[fehler] ?? FEHLER_TEXT.fehler : null;
  const hatAbo = abo.zustand !== "keine";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-0.5">
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-ink-muted">
          Status
        </span>
        <span className="text-ink">{label}</span>
        {detail && <span className="text-sm text-ink-mid">{detail}</span>}
      </div>

      {fehlerText && (
        <p
          role="alert"
          className="rounded-xl border border-gold-500/40 bg-gold-300/15 px-4 py-3 text-sm leading-relaxed text-ink"
        >
          {fehlerText}{" "}
          <Link href={KONTAKT_HREF} className="font-medium text-accent underline">
            Zum Kontaktformular
          </Link>
        </p>
      )}

      {abo.portalMoeglich ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {abo.kuendigenMoeglich && (
            <form action={openAboPortal.bind(null, "kuendigen")}>
              <Button type="submit" variant="secondary" className="w-full sm:w-auto">
                Mitgliedschaft kündigen
              </Button>
            </form>
          )}
          <form action={openAboPortal.bind(null, "uebersicht")}>
            <Button type="submit" variant="secondary" className="w-full sm:w-auto">
              {abo.kuendigenMoeglich
                ? "Rechnungen & Zahlungsart"
                : "Mitgliedschaft verwalten / kündigen"}
            </Button>
          </form>
        </div>
      ) : fehlerText ? null : !hatAbo ? (
        !abo.istAdmin && (
          <p className="text-sm leading-relaxed text-ink-mid">
            Du hast eine Mitgliedschaft abgeschlossen, siehst sie hier aber nicht?{" "}
            <Link href={KONTAKT_HREF} className="font-medium text-accent underline">
              Schreib mir kurz
            </Link>{" "}
            – ich kläre das persönlich mit dir.
          </p>
        )
      ) : (
        (
          <p className="text-sm leading-relaxed text-ink-mid">
            Die Online-Verwaltung ist gerade nicht verfügbar. Zum Kündigen oder bei
            Fragen{" "}
            <Link href={KONTAKT_HREF} className="font-medium text-accent underline">
              schreib mir einfach
            </Link>{" "}
            – ich kümmere mich persönlich darum.
          </p>
        )
      )}
    </div>
  );
}
