import { AuthGuard } from "@/components/auth/auth-guard";
import { EmptyState } from "@/components/layout/empty-state";
import { PageHeader } from "@/components/layout/page-header";

const ADMIN_POLICY = {
  roles: ["org_admin", "ad_leadership"],
} as const;

export default function OrganizationAdminPage() {
  return (
    <AuthGuard policy={ADMIN_POLICY}>
      <main className="space-y-8">
        <PageHeader
          title="Organization Admin"
          subtitle="Manage role assignments, sport-level permissions, and organization access governance."
        />

        <EmptyState
          title="Admin workspace initialized"
          description="This section is now routed and protected. In the next slice, it will include editable users, role matrix controls, and sport assignment workflows for coaches and staff."
        />
      </main>
    </AuthGuard>
  );
}

