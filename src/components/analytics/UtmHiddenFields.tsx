"use client";

import { useEffect, useState } from "react";
import { getUtm, UTM_KEYS, type UtmParams } from "@/lib/utm";

/**
 * Versteckte Formularfelder mit den gemerkten UTM-Parametern (sessionStorage,
 * siehe src/lib/utm.ts). In die Checkout-Formulare eingebettet, damit die
 * Stripe-Session die Kampagnen-Herkunft als Metadaten bekommt.
 *
 * Erst nach dem Mount befüllt (sessionStorage gibt es auf dem Server nicht);
 * ohne gemerkte UTMs werden keine Felder gerendert.
 */
export function UtmHiddenFields() {
  const [utm, setUtm] = useState<UtmParams>({});

  useEffect(() => {
    // Bewusst per Effekt statt Lazy-Init: die Quelle (sessionStorage) fehlt
    // auf dem Server, ein Lazy-Init würde einen Hydration-Mismatch erzeugen.
    /* eslint-disable react-hooks/set-state-in-effect */
    setUtm(getUtm());
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  return (
    <>
      {UTM_KEYS.filter((k) => utm[k]).map((k) => (
        <input key={k} type="hidden" name={k} value={utm[k]} />
      ))}
    </>
  );
}
