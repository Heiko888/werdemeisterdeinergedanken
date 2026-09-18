"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useSyncExternalStore } from "react";
import {
  META_PIXEL_ID,
  subscribeConsent,
  getStoredConsent,
  getServerConsent,
} from "@/lib/analytics";

/**
 * Meta-Pixel (Facebook/Instagram) – optional, nur mit NEXT_PUBLIC_META_PIXEL_ID.
 *
 * Verhält sich wie GoogleAnalytics.tsx: Vor einer aktiven Einwilligung im
 * Cookie-Banner wird NICHTS geladen und kein Cookie gesetzt. Erst nach
 * „Akzeptieren" kommt fbevents.js; Konversionen (Lead, InitiateCheckout,
 * Purchase) schickt dann `trackEvent` aus src/lib/analytics.ts. Der Banner
 * selbst lebt in GoogleAnalytics.tsx und deckt beide Dienste ab.
 *
 * CSP: connect.facebook.net (Script) und www.facebook.com (Bild/Beacon) sind
 * in next.config.ts freigegeben.
 */
export function MetaPixel() {
  const stored = useSyncExternalStore(
    subscribeConsent,
    getStoredConsent,
    getServerConsent,
  );
  const pathname = usePathname();
  // Der erste PageView kommt aus dem Init-Script; diesen Effektlauf überspringen.
  const skipFirst = useRef(true);

  useEffect(() => {
    if (stored !== "granted" || !META_PIXEL_ID) return;
    if (skipFirst.current) {
      skipFirst.current = false;
      return;
    }
    if (typeof window.fbq !== "function") return;
    window.fbq("track", "PageView");
  }, [pathname, stored]);

  if (!META_PIXEL_ID || stored !== "granted") return null;

  return (
    <Script id="meta-pixel-init" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${META_PIXEL_ID}');
        fbq('track', 'PageView');
      `}
    </Script>
  );
}
