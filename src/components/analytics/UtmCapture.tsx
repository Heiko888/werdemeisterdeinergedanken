"use client";

import { useEffect } from "react";
import { captureUtm } from "@/lib/utm";

/**
 * Merkt die UTM-Parameter des ersten Seitenaufrufs in sessionStorage
 * (siehe src/lib/utm.ts). Rendert nichts; braucht keine Einwilligung, weil
 * nur im eigenen Tab gespeichert und nichts an Dritte gesendet wird.
 */
export function UtmCapture() {
  useEffect(() => {
    captureUtm();
  }, []);
  return null;
}
