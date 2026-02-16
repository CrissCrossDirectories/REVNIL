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
          title="Organization Configuration"
          subtitle="Configure organization-specific templates, import mappings, and operational files scoped to this university."
        />

        <Card>
          <CardHeader>
            <CardTitle>Organization-scoped templates and files</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {SAMPLE_IMPORT_TEMPLATES.map((item) => (
              <div
                key={item.name}
                className="flex flex-col gap-2 rounded-md border border-border bg-card p-3 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">Module: {item.module}</p>
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

