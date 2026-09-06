/**
 * Gemeinsame Helfer für die Galerie-Generatoren: begrenzte Nebenläufigkeit und
 * alpha-bewusste WebP-Optionen.
 *
 * Hintergrund (gemessen am 06.09.2026 auf dem Server, 3 Kerne):
 *
 *  1. Der Galerie-Build lief streng sequenziell und lastete damit genau einen
 *     Kern aus. `parallel()` arbeitet unabhängige Einheiten über eine
 *     Warteschlange begrenzter Breite ab.
 *  2. `effort: 6` kostet bei Bildern MIT Alpha-Kanal ein Vielfaches: ein
 *     transparentes 2160px-Overlay brauchte 7,39 s statt 0,60 s bei
 *     `effort: 4` – für gerade 12 % kleinere Dateien (118 statt 134 KB). Bei
 *     deckenden Bildern ist der Unterschied klein (1,60 s vs. 1,32 s).
 *     `effort` ist beim WebP-Encoder reine Suchtiefe und kein Qualitätsregler;
 *     bei gleichem `quality` bleibt das Bild praktisch identisch. Deshalb geht
 *     `webpOpts()` nur für transparente Vorlagen auf 4 herunter und lässt
 *     deckende Bilder unverändert bei der bisherigen Einstellung.
 */
import { cpus } from "node:os";
import sharp from "sharp";

/** Breite der Warteschlange. Über GALERIE_JOBS überschreibbar (1 = sequenziell). */
export const MAX_JOBS = Math.max(
  1,
  Number(process.env.GALERIE_JOBS) || cpus().length,
);

/**
 * Wie `Promise.all(items.map(fn))`, aber mit höchstens MAX_JOBS gleichzeitig.
 * Die Ergebnisreihenfolge entspricht der Eingabereihenfolge – darauf beruhen
 * die Katalog-IDs (`social-001`…) und die Slide-Reihenfolge, die sich durch
 * die Parallelisierung nicht ändern dürfen.
 *
 * ACHTUNG: nicht verschachteln. Ein `parallel()` innerhalb einer Einheit eines
 * anderen `parallel()` kann alle Plätze mit Wartenden belegen (Deadlock).
 */
export async function parallel(items, fn) {
  const liste = [...items];
  const out = new Array(liste.length);
  let naechster = 0;
  let fehler = null;

  const arbeiter = async () => {
    while (fehler === null) {
      const i = naechster++;
      if (i >= liste.length) return;
      try {
        out[i] = await fn(liste[i], i);
      } catch (e) {
        fehler ??= e;
        return;
      }
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(MAX_JOBS, liste.length) }, arbeiter),
  );
  if (fehler) throw fehler;
  return out;
}

/** effort-Stufe für Bilder mit Alpha-Kanal (siehe Modul-Kommentar). */
const ALPHA_EFFORT = 4;

/**
 * WebP-Optionen für eine Quelle (Pfad oder Buffer). Liefert die übergebene
 * Qualität mit `smartSubsample` und wählt `effort` anhand des Alpha-Kanals.
 * `sharp().metadata()` liest nur den Header, dekodiert das Bild also nicht.
 */
export async function webpOpts(quelle, { quality, effort = 6 }) {
  let effektiv = effort;
  if (effort > ALPHA_EFFORT) {
    try {
      const { hasAlpha } = await sharp(quelle).metadata();
      if (hasAlpha) effektiv = ALPHA_EFFORT;
    } catch {
      // Unlesbarer Header: bei der bisherigen Einstellung bleiben, der
      // eigentliche sharp-Aufruf meldet den Fehler ohnehin gleich selbst.
    }
  }
  return { quality, effort: effektiv, smartSubsample: true };
}
