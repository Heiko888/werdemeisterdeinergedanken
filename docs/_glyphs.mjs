/**
 * Gezeichnete Glyphen für die Bild-Generatoren.
 *
 * Hintergrund: Die eingebetteten Schriften (Fraunces/Inter in
 * `tools/pdf/assets/fonts.css` bzw. `docs/reels/covers/_fonts.css`) decken
 * `U+2192` (→) NICHT ab – der `unicode-range` des Latin-Subsets kennt zwar
 * `U+2191` (↑) und `U+2193` (↓), aber keinen Rechtspfeil. Chromium holt das
 * Zeichen deshalb aus einer Schrift des Betriebssystems. Ergebnis: dieselbe
 * Codebasis rendert auf zwei Rechnern minimal verschiedene PNGs (verschobene
 * Grundlinie, andere Strichstärke), und weil die fremde Glyphe die Zeilenhöhe
 * ihres Elternelements verändert, verrutscht auch die Zeile darunter.
 *
 * Lösung: den Pfeil zeichnen statt setzen. Das SVG bringt seine Maße selbst
 * mit (`1em`, an der Schriftgröße), erbt die Farbe über `currentColor` und
 * braucht daher in keinem der Generator-Stylesheets eine eigene Regel.
 *
 * Verwendung – überall dort, wo vorher ein „→" oder „≠" im Markup stand:
 *
 *   import { ARROW, NEQ } from "../_glyphs.mjs";
 *   `<div class="cta">E-Book gratis sichern ${ARROW}</div>`
 *   `Dein ${A("Feed")}<br>${NEQ} die Welt`
 *
 * `≠` (U+2260) fehlt ebenfalls im eingebetteten Subset und wird deshalb hier
 * gezeichnet. Es steht in den Cover-Headlines direkt neben Fraunces-Glyphen,
 * darum sind Strichstärke und Kontrast bewusst an einen fetten Serif angelehnt
 * (flache Enden wie beim Gleichheitszeichen, kräftiger Balken).
 */

/** Rechtspfeil als Inline-SVG. Ersetzt „→" (U+2192) in gerendertem Markup. */
export const ARROW =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"' +
  ' stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' +
  ' style="width:1em;height:1em;vertical-align:-0.125em">' +
  '<path d="M3.5 12h16M13 5.5l6.5 6.5-6.5 6.5"/></svg>';

/**
 * Ungleich-Zeichen als Inline-SVG. Ersetzt „≠" (U+2260) in gerendertem Markup.
 * Für die fetten Cover-Headlines (Fraunces 600) ausgelegt: zwei kräftige
 * Balken mit flachen Enden + Schrägstrich, Farbe via `currentColor`.
 */
export const NEQ =
  '<svg viewBox="0 0 17 24" fill="none" stroke="currentColor" stroke-width="2.5"' +
  ' stroke-linecap="butt" aria-hidden="true"' +
  ' style="width:0.68em;height:1em;vertical-align:-0.11em">' +
  '<path d="M3 10h11M3 15.5h11"/>' +
  '<path d="M12.6 5.2 4.4 20.3"/></svg>';
