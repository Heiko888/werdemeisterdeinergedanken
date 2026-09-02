import { closeSync, openSync, readSync } from "node:fs";
import { join } from "node:path";

/**
 * Liefert das natürliche Seitenverhältnis eines Herobildes aus `/public` als
 * CSS-`aspect-ratio`-Wert (z. B. "1672 / 941").
 *
 * Damit kann ein Herobild auf Mobile als vollflächiges, unbeschnittenes
 * Bildband im Fluss liegen (wie auf der Mitgliedschaftsseite), ohne dass pro
 * Seite ein Seitenverhältnis von Hand gepflegt werden muss – jedes künftige
 * Herobild bekommt die Mobil-Bandansicht automatisch.
 *
 * Nur für lokale Pfade (beginnend mit "/"). Bei externen URLs, unbekanntem
 * Format oder Lesefehlern kommt `undefined` zurück – die aufrufende Komponente
 * fällt dann auf ihr bisheriges Verhalten (Vollflächen-Hintergrund) zurück.
 *
 * Läuft serverseitig; für die statischen Seiten also zur Build-Zeit. Es wird
 * nur der Dateikopf gelesen, nicht das ganze Bild, und das Ergebnis gecacht.
 */
export function heroImageAspect(src: string): string | undefined {
  if (!src.startsWith("/")) return undefined;
  const cached = cache.get(src);
  if (cached !== undefined) return cached ?? undefined;
  const aspect = readAspect(src);
  cache.set(src, aspect ?? null);
  return aspect;
}

// Dasselbe Bild soll nicht bei jedem Render neu von der Platte gelesen werden.
const cache = new Map<string, string | null>();

function readAspect(src: string): string | undefined {
  let fd: number | undefined;
  try {
    fd = openSync(join(process.cwd(), "public", src), "r");
    const buf = Buffer.alloc(65536);
    const n = readSync(fd, buf, 0, buf.length, 0);
    const dim = dimensions(buf.subarray(0, n));
    if (!dim || dim.w <= 0 || dim.h <= 0) return undefined;
    return `${dim.w} / ${dim.h}`;
  } catch {
    return undefined;
  } finally {
    if (fd !== undefined) closeSync(fd);
  }
}

type Dim = { w: number; h: number };

/** Bildmaße aus dem Dateikopf lesen – WebP, PNG und JPEG. */
function dimensions(b: Buffer): Dim | undefined {
  // WebP (RIFF … WEBP)
  if (
    b.length >= 30 &&
    b.toString("ascii", 0, 4) === "RIFF" &&
    b.toString("ascii", 8, 12) === "WEBP"
  ) {
    const fmt = b.toString("ascii", 12, 16);
    if (fmt === "VP8 ") {
      return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
    }
    if (fmt === "VP8L") {
      const b0 = b[21];
      const b1 = b[22];
      const b2 = b[23];
      const b3 = b[24];
      return {
        w: 1 + (((b1 & 0x3f) << 8) | b0),
        h: 1 + (((b3 & 0xf) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6)),
      };
    }
    if (fmt === "VP8X") {
      return {
        w: 1 + (b[24] | (b[25] << 8) | (b[26] << 16)),
        h: 1 + (b[27] | (b[28] << 8) | (b[29] << 16)),
      };
    }
    return undefined;
  }
  // PNG
  if (
    b.length >= 24 &&
    b[0] === 0x89 &&
    b.toString("ascii", 1, 4) === "PNG"
  ) {
    return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
  }
  // JPEG – erstes SOF-Segment suchen
  if (b.length >= 4 && b[0] === 0xff && b[1] === 0xd8) {
    let o = 2;
    while (o + 9 < b.length) {
      if (b[o] !== 0xff) {
        o++;
        continue;
      }
      const marker = b[o + 1];
      const isSof =
        marker >= 0xc0 &&
        marker <= 0xcf &&
        marker !== 0xc4 &&
        marker !== 0xc8 &&
        marker !== 0xcc;
      if (isSof) {
        return { h: b.readUInt16BE(o + 5), w: b.readUInt16BE(o + 7) };
      }
      o += 2 + b.readUInt16BE(o + 2);
    }
    return undefined;
  }
  return undefined;
}
