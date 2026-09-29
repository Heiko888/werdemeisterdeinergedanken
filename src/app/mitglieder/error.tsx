"use client"; // Error-Boundaries müssen Client Components sein.

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * Fehlerzustand des Mitgliederbereichs.
 *
 * Ruhige Karte statt technischer Meldung. „Erneut versuchen" nutzt `retry()`
 * (seit Next 16.3 stabil): lädt die Inhalte des Segments neu und rendert sie
 * erneut. Details landen nur in der Konsole – nie in der Oberfläche.
 */
export default function MitgliederError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container size="narrow" className="py-16 sm:py-24">
      <div
        role="alert"
        className="rounded-2xl border border-ink/10 bg-surface p-6 shadow-card sm:p-8"
      >
        <h1 className="font-display text-2xl font-medium text-ink sm:text-3xl">
          Da ist gerade etwas schiefgelaufen
        </h1>
        <p className="mt-3 max-w-prose leading-relaxed text-ink-mid">
          Diese Seite konnte gerade nicht geladen werden. Versuche es gleich
          noch einmal – oder kehre in Ruhe zu deinem Bereich zurück.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button onClick={() => retry()}>Erneut versuchen</Button>
          <Button href="/mitglieder" variant="secondary">
            Zu meinem Bereich
          </Button>
        </div>
      </div>
    </Container>
  );
}
