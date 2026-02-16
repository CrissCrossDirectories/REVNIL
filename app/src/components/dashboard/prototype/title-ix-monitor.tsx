"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TitleIXMonitor() {
  const stats = {
    menSpend: 10500000,
    womenSpend: 5500000,
    menCount: 450,
    womenCount: 380,
  };

  const totalSpend = stats.menSpend + stats.womenSpend;
  const menSpendPct = (stats.menSpend / totalSpend) * 100;
  const womenSpendPct = (stats.womenSpend / totalSpend) * 100;

  const totalAthletes = stats.menCount + stats.womenCount;
  const menAthPct = (stats.menCount / totalAthletes) * 100;
  const womenAthPct = (stats.womenCount / totalAthletes) * 100;

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <Card className="w-full hover:-translate-y-0.5 hover:shadow-elevated motion-standard">
      <CardHeader>
        <p className="eyebrow-label">Compliance Risk</p>
        <CardTitle>Title IX Variance Monitor</CardTitle>
        <p className="confidence-meta">
          Last sync: 8:38 AM CT · Sources: roster + cap snapshots · Model confidence: High · Audit trail available
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Spending distribution</p>
            <div className="flex h-8 w-full overflow-hidden rounded-md bg-muted/60 ring-1 ring-border/60">
              <div 
                className="flex h-full items-center justify-center bg-primary text-[10px] font-bold text-primary-foreground" 
                style={{ width: `${menSpendPct}%` }}
              >
                Men {menSpendPct.toFixed(0)}%
              </div>
              <div 
                className="flex h-full items-center justify-center bg-secondary text-[10px] font-bold text-secondary-foreground" 
                style={{ width: `${womenSpendPct}%` }}
              >
                Women {womenSpendPct.toFixed(0)}%
              </div>
            </div>
            <div className="flex justify-between text-xs font-medium">
              <span>{formatCurrency(stats.menSpend)}</span>
              <span>{formatCurrency(stats.womenSpend)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Participation baseline</p>
            <div className="flex h-8 w-full overflow-hidden rounded-md bg-muted/60 ring-1 ring-border/60">
              <div 
                className="flex h-full items-center justify-center bg-primary/80 text-[10px] font-bold text-primary-foreground" 
                style={{ width: `${menAthPct}%` }}
              >
                {menAthPct.toFixed(0)}%
              </div>
              <div 
                className="flex h-full items-center justify-center bg-secondary/85 text-[10px] font-bold text-secondary-foreground" 
                style={{ width: `${womenAthPct}%` }}
              >
                {womenAthPct.toFixed(0)}%
              </div>
            </div>
            <div className="flex justify-between text-xs font-medium">
              <span>{stats.menCount} Athletes</span>
              <span>{stats.womenCount} Athletes</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-primary/10 p-4 text-sm text-foreground ring-1 ring-primary/30">
          <p className="flex items-center gap-2 font-semibold">
            ⚠️ Decision required: proportionality variance
          </p>
          <p>
            Spending delta is {(menSpendPct - menAthPct).toFixed(1)}% outside participation alignment. Route the next high-value
            commitment to women’s programs or document counsel-approved rationale before approval.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
