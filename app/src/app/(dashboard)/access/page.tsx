import { AuthGuard } from "@/components/auth/auth-guard";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ACCESS_POLICY = {
  roles: ["org_admin", "ad_leadership", "coach", "staff"],
} as const;

const SAMPLE_ACCESS = [
  { name: "AD Leadership", role: "ad_leadership", sports: "All Sports", scope: "Organization" },
  { name: "Football Head Coach", role: "coach", sports: "Football", scope: "Assigned Sports" },
  { name: "Basketball Ops", role: "staff", sports: "Basketball", scope: "Assigned Sports" },
];

export default function SportsAccessPage() {
  return (
    <AuthGuard policy={ACCESS_POLICY}>
      <main className="space-y-8">
        <PageHeader
          title="Sports Access"
          subtitle="Visibility model: org_admin and AD leadership see all sports. Coaches and staff see assigned sports only."
        />

        <Card>
          <CardHeader>
            <CardTitle>Role-to-sport assignments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {SAMPLE_ACCESS.map((entry) => (
              <div
                key={entry.name}
                className="flex flex-col gap-2 rounded-md border border-border bg-card p-3 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-medium text-foreground">{entry.name}</p>
                  <p className="text-sm text-muted-foreground">{entry.sports}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{entry.role}</Badge>
                  <Badge variant="secondary">{entry.scope}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </AuthGuard>
  );
}

