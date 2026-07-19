/** Minimaler className-Helper (ohne externe Abhängigkeit). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
