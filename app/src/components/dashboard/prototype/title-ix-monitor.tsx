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
    <Card className="w-full border-l-4 border-l-primary">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Title IX Proportionality Monitor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Spending Ratio</p>
            <div className="flex h-8 w-full overflow-hidden rounded-md border border-muted">
              <div 
                className="flex h-full items-center justify-center bg-primary text-[10px] font-bold text-primary-foreground" 
                style={{ width: `${menSpendPct}%` }}
              >
                MEN {menSpendPct.toFixed(0)}%
              </div>
              <div 
                className="flex h-full items-center justify-center bg-secondary text-[10px] font-bold text-secondary-foreground" 
                style={{ width: `${womenSpendPct}%` }}
              >
                WOMEN {womenSpendPct.toFixed(0)}%
              </div>
            </div>
            <div className="flex justify-between text-xs font-medium">
              <span>{formatCurrency(stats.menSpend)}</span>
              <span>{formatCurrency(stats.womenSpend)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Participation Ratio</p>
            <div className="flex h-8 w-full overflow-hidden rounded-md border border-muted">
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

        <div className="rounded-md border border-primary/40 bg-primary/10 p-3 text-sm text-foreground">
          <p className="font-bold flex items-center gap-2">
            ⚠️ Variance Detected
          </p>
          <p>Spending delta is {(menSpendPct - menAthPct).toFixed(1)}% outside of participation proportionality. Review recommended for next round of allocations.</p>
        </div>
      </CardContent>
    </Card>
  );
}
