"use client";

import { useState } from "react";
import { Check } from "@/components/ui/Icon";

/**
 * Teilbarer Link zum Vorab-Fragebogen (`/klarheitsgespraech`).
 *
 * Zeigt die volle URL, einen „Kopieren"-Knopf und einen fertigen E-Mail-Entwurf
 * (mailto), damit Heiko den Fragebogen vor Ort oder per Mail verschicken kann,
 * wenn ihn jemand noch nicht ausgefüllt hat.
 */
export function FragebogenLink({ url }: { url: string }) {
  const [kopiert, setKopiert] = useState(false);

  async function kopieren() {
    try {
      await navigator.clipboard.writeText(url);
      setKopiert(true);
      setTimeout(() => setKopiert(false), 2000);
    } catch {
      // Clipboard-API nicht verfügbar (z. B. ohne HTTPS) – Nutzer kann den
      // markierten Text von Hand kopieren.
      setKopiert(false);
    }
  }

  const betreff = "Dein Fragebogen zum Klarheitsgespräch";
  const text = `Hallo,

hier ist der kurze Fragebogen zur Vorbereitung unseres Klarheitsgesprächs. Nimm dir 5–10 Minuten und beantworte die Fragen so ehrlich wie möglich:

${url}

Danke dir und bis bald!
Heiko`;
  const mailto = `mailto:?subject=${encodeURIComponent(betreff)}&body=${encodeURIComponent(text)}`;

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-ink/10 bg-white/70 p-5 shadow-card">
      <p className="text-sm font-semibold text-ink">
        Fragebogen-Link zum Weitergeben
      </p>
      <p className="mt-1 text-sm text-ink-mid">
        Schick diesen Link an Interessenten, die den Fragebogen noch nicht
        ausgefüllt haben – vor Ort oder per E-Mail. Ausgefüllte Fragebögen
        erscheinen automatisch oben unter „Offene Fragebögen“.
      </p>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          readOnly
          value={url}
          onFocus={(e) => e.currentTarget.select()}
          aria-label="Fragebogen-Link"
          className="min-w-0 flex-1 rounded-full border border-ink/15 bg-paper px-4 py-2 text-sm text-ink outline-none focus:border-accent"
        />
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={kopieren}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            {kopiert ? (
              <>
                <Check />
                Kopiert
              </>
            ) : (
              "Link kopieren"
            )}
          </button>
          <a
            href={mailto}
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink/30"
          >
            Per E-Mail
          </a>
        </div>
      </div>
    </div>
  );
}
