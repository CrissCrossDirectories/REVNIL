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
          eyebrow="Governance"
          title="Organization Governance"
          subtitle="Control role assignments, sport visibility boundaries, and permission audit posture."
          metadata="Last sync: 8:38 AM CT · Source: identity claims + org policy · Audit trail available"
        />

        <EmptyState
          title="Governance workspace is routed and protected"
          description="No active governance tasks require execution in this prototype snapshot."
          guidance="Next action: open role matrix controls and verify permission explainability for each coach and staff account before weekly lock."
          metadata="Decision owner: Org Admin · Confidence: High · Evidence: Access claim logs"
        />
      </main>
    </AuthGuard>
  );
}
