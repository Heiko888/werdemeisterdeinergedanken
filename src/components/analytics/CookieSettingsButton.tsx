"use client";

import { OPEN_CONSENT_EVENT } from "@/lib/analytics";

/**
 * Footer-Link, der den Cookie-/Analytics-Einwilligungsbanner erneut öffnet,
 * damit Besucher ihre Entscheidung jederzeit ändern oder widerrufen können
 * (Art. 7 Abs. 3 DSGVO).
 */
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className="text-left text-sm text-mist-300/70 transition-colors hover:text-white"
    >
      Cookie-Einstellungen
    </button>
  );
}
