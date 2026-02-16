"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CapUtilizationView() {
  const capData = {
    totalCap: 20500000,
    allocated: 16000000,
  };

  const percentUsed = (capData.allocated / capData.totalCap) * 100;
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Cap Allocation Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total House Cap</p>
            <p className="text-3xl font-bold">{formatCurrency(capData.totalCap)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-muted-foreground">Allocated to Date</p>
            <p className="text-2xl font-semibold text-primary">{formatCurrency(capData.allocated)}</p>
          </div>
        </div>

        <div className="relative h-4 w-full overflow-hidden rounded-full bg-muted">
          <div 
            className="h-full bg-primary transition-all" 
            style={{ width: `${percentUsed}%` }}
          />
        </div>

        <div className="flex justify-between text-sm">
          <span className="font-medium">{percentUsed.toFixed(1)}% Used</span>
          <span className="text-muted-foreground">{formatCurrency(capData.totalCap - capData.allocated)} Remaining</span>
        </div>
      </CardContent>
    </Card>
  );
}
