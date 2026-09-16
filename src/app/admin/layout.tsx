import { AdminNav } from "./AdminNav";

/**
 * Gemeinsames Layout für alle Admin-Sektionen.
 *
 * Legt die persistente Sektions-Navigation (AdminNav) über jede /admin-Seite.
 * Der eigentliche Zugriffsschutz bleibt bewusst in den einzelnen Seiten
 * (Supabase-Login + isAdminEmail, teils zusätzlich RLS) – so behält jede Seite
 * ihren passenden „nicht verbunden"-Hinweis und ihr Redirect-Verhalten.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminNav />
      {children}
    </>
  );
}
