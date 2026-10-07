import Link from "next/link";
import {
  KI_DATENSCHUTZ_HREF,
  KI_EINWILLIGUNG,
  KI_EINWILLIGUNG_WIDERRUF,
  type KiWerkzeug,
} from "@/lib/ki-einwilligung";

/**
 * Kurzer Einwilligungshinweis direkt am Start-Element eines KI-Werkzeugs
 * (Senden-Feld, Button). Sachlich, klein, ohne Warnton – Texte zentral in
 * `src/lib/ki-einwilligung.ts`.
 */
export function KiEinwilligungsHinweis({
  werkzeug,
  vorsatz,
}: {
  werkzeug: KiWerkzeug;
  /** Optionaler Satz davor, z. B. die KI-Kennzeichnung des Begleiters. */
  vorsatz?: string;
}) {
  return (
    <p className="text-xs leading-relaxed text-ink-muted">
      {vorsatz ? `${vorsatz} ` : ""}
      {KI_EINWILLIGUNG[werkzeug]} {KI_EINWILLIGUNG_WIDERRUF}{" "}
      <Link
        href={KI_DATENSCHUTZ_HREF}
        className="underline underline-offset-2 hover:text-ink"
      >
        Datenschutz, Punkt 14
      </Link>
    </p>
  );
}
