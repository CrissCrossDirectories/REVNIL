import { AuthGuard } from "@/components/auth/auth-guard";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ORG_CONFIG_POLICY = {
  roles: ["org_admin", "ad_leadership"],
} as const;

const SAMPLE_IMPORT_TEMPLATES = [
  { name: "Roster Intake Template", type: "CSV", module: "Roster" },
  { name: "Deal Intake Template", type: "CSV", module: "NIL Deals" },
  { name: "Compliance Checklist", type: "PDF", module: "Compliance" },
];

export default function OrganizationConfigurationPage() {
  return (
    <AuthGuard policy={ORG_CONFIG_POLICY}>
      <main className="space-y-8">
        <PageHeader
          eyebrow="Implementation Controls"
          title="Organization Configuration"
          subtitle="Manage institution templates, import mappings, and compliance artifacts used in daily operations."
          metadata="Last sync: 8:38 AM CT · Source: org config registry · Audit trail available"
        />

        <Card>
          <CardHeader>
            <CardTitle>Institution-scoped templates and artifacts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {SAMPLE_IMPORT_TEMPLATES.map((item) => (
              <div
                key={item.name}
                className="motion-standard flex flex-col gap-2 rounded-lg bg-card p-3 ring-1 ring-border/60 md:flex-row md:items-center md:justify-between hover:-translate-y-0.5 hover:shadow-soft"
              >
                <div>
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">Operational module: {item.module}</p>
                </div>
                <Badge variant="outline">{item.type}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </AuthGuard>
  );
}
