import { LogoutButton } from "@/components/auth/logout-button";
import { PageHeader } from "@/components/layout/page-header";
import { TotalCompDashboard } from "@/components/dashboard/prototype/total-comp-dashboard";
import { CapUtilizationView } from "@/components/dashboard/prototype/cap-utilization-view";
import { TitleIXMonitor } from "@/components/dashboard/prototype/title-ix-monitor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardHomePage() {
  return (
    <main className="executive-section">
      <PageHeader
        eyebrow="Athletic Director Command Center"
        title="GM Command Center"
        subtitle="Today’s decision flow: cap exposure first, Title IX variance second, roster actions third."
        metadata="Last sync: 8:38 AM CT · Data sources: CAPS + NIL Go (prototype seed) · Model confidence: Moderate · Audit trail available"
        actions={<LogoutButton />}
      />

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <p className="eyebrow-label">Headline KPI</p>
            <CardTitle>Current Cap Exposure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-3xl font-semibold tracking-tight text-foreground">$16.0M / $20.5M</p>
            <p className="text-sm text-muted-foreground">78.0% allocated with $4.5M remaining flexibility.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="eyebrow-label">Risk Signal</p>
            <CardTitle>Title IX Variance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-3xl font-semibold tracking-tight text-primary">+1.0%</p>
            <p className="text-sm text-muted-foreground">
              Spending variance remains outside participation baseline and requires allocation correction.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="eyebrow-label">Recommended Action</p>
            <CardTitle>Next Allocation Decision</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-base font-medium text-foreground">Hold new high-value men’s commitments until women’s allocation rebalance is modeled.</p>
            <p className="text-sm text-muted-foreground">Open scenario review in the Title IX monitor before approving the next deal package.</p>
          </CardContent>
        </Card>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <CapUtilizationView />
        <TitleIXMonitor />
      </div>

      <div className="grid grid-cols-1 gap-8">
        <TotalCompDashboard />
      </div>

      <div className="rounded-xl bg-muted/40 p-4 text-xs text-muted-foreground ring-1 ring-border/60">
        Prototype context: current screens render deterministic sample data aligned to seed assumptions. Phase 1 connects
        these views to Firestore listeners with live confidence and sync metadata.
      </div>
    </main>
  );
}
