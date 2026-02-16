import { LogoutButton } from "@/components/auth/logout-button";
import { PageHeader } from "@/components/layout/page-header";
import { TotalCompDashboard } from "@/components/dashboard/prototype/total-comp-dashboard";
import { CapUtilizationView } from "@/components/dashboard/prototype/cap-utilization-view";
import { TitleIXMonitor } from "@/components/dashboard/prototype/title-ix-monitor";

export default function DashboardHomePage() {
  return (
    <main className="space-y-8">
      <PageHeader
        title="GM Command Center"
        subtitle="Phase 0.5 Prototype — Unified Roster & Cap Management"
        actions={<LogoutButton />}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <CapUtilizationView />
        <TitleIXMonitor />
      </div>

      <div className="grid grid-cols-1 gap-8">
        <TotalCompDashboard />
      </div>

      <div className="rounded-lg border bg-muted/50 p-4 text-xs text-muted-foreground italic">
        Prototype Mode: Components are currently using deterministic sample data aligned with the seed script. 
        In Phase 1, these will be populated via Firestore real-time listeners.
      </div>
    </main>
  );
}
