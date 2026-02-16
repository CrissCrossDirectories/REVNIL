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
    <Card className="w-full hover:-translate-y-0.5 hover:shadow-elevated motion-standard">
      <CardHeader>
        <p className="eyebrow-label">Cap Exposure</p>
        <CardTitle>House Settlement Allocation Status</CardTitle>
        <p className="confidence-meta">
          Last sync: 8:38 AM CT · Source: CAPS import (seed) · Audit trail available
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Approved cap ceiling</p>
            <p className="text-3xl font-bold">{formatCurrency(capData.totalCap)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-muted-foreground">Committed allocations</p>
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
          <span className="font-medium">{percentUsed.toFixed(1)}% committed</span>
          <span className="text-muted-foreground">{formatCurrency(capData.totalCap - capData.allocated)} remaining capacity</span>
        </div>
      </CardContent>
    </Card>
  );
}
