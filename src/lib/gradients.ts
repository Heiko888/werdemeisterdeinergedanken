/**
 * Gemeinsamer Hero-/Sektions-Verlauf für die ganze Seite.
 * Eine Quelle der Wahrheit – überall importieren statt inline definieren,
 * damit die Verläufe nie wieder auseinanderdriften.
 * Gold oben rechts · Königsblau unten links (auf bg-navy-900) – warmes,
 * edles Licht wie der goldene Logo-Schriftzug, kein Grün mehr.
 */
export const HERO_GLOW =
  "radial-gradient(55% 45% at 82% 6%, color-mix(in oklab, var(--color-gold-500) 20%, transparent), transparent 60%), radial-gradient(52% 45% at 6% 98%, color-mix(in oklab, var(--color-brand-500) 24%, transparent), transparent 60%)";

/**
 * Dezenter Verlauf für Mitgliederbereich, Login & Systemseiten.
 * Ruhiger als HERO_GLOW (ein Teal-Schimmer oben), damit funktionale
 * Ansichten nicht zu bunt wirken.
 */
export const APP_GLOW =
  "radial-gradient(55% 55% at 50% 0%, color-mix(in oklab, var(--color-gold-500) 12%, transparent), transparent 65%)";
