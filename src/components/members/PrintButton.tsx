"use client";

import { Download } from "@/components/ui/Icon";

/**
 * Löst den Druck-/„Als PDF speichern"-Dialog des Browsers aus.
 * Das Journal ist pro Person dynamisch – ein serverseitiges PDF wäre auf
 * Serverless unnötig aufwendig. Über die Druckansicht (print-Styles auf der
 * Journal-Seite) entsteht ein sauberes, markengerechtes PDF direkt im Browser.
 */
export function PrintButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className={className}>
      <Download />
      Als PDF speichern
    </button>
  );
}
