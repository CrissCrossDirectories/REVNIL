/**
 * Dashboard Layout
 *
 * This layout wraps all authenticated dashboard routes.
 * It will include:
 * - Sidebar navigation (subtask 0.5)
 * - Top header bar with user menu
 * - Auth guard / route protection (subtask 0.2)
 * - Tenant context provider (subtask 0.3)
 *
 * For now, this is a placeholder pass-through layout.
 */
import { AuthGuard } from "@/components/auth/auth-guard";
import { AppShell } from "@/components/layout/app-shell";

const DASHBOARD_POLICY = {
  roles: ["org_admin", "ad_leadership", "coach", "staff", "athlete"],
} as const;

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard policy={DASHBOARD_POLICY}>
      <AppShell>{children}</AppShell>
    </AuthGuard>
  );
}
