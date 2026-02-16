"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const SAMPLE_ROSTER = [
  { id: "ath_001", name: "Jackson Arnold", sport: "Football", revShare: 850000, nil: 1200000 },
  { id: "ath_002", name: "Danny Stutsman", sport: "Football", revShare: 750000, nil: 600000 },
  { id: "ath_003", name: "Skylar Vann", sport: "Basketball", revShare: 150000, nil: 75000 },
  { id: "ath_004", name: "Patty Gasso", sport: "Softball", revShare: 200000, nil: 150000 },
];

export function TotalCompDashboard() {
  const isLoading = false;

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <Card className="w-full hover:-translate-y-0.5 hover:shadow-elevated motion-standard">
      <CardHeader>
        <p className="eyebrow-label">Roster Impact</p>
        <CardTitle>Total Compensation Command Center</CardTitle>
        <p className="confidence-meta">
          Last sync: 8:38 AM CT · Sources: CAPS + NIL Go (seed) · Model confidence: Moderate · Audit trail available
        </p>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3" aria-label="Loading compensation table">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : null}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Athlete</TableHead>
              <TableHead>Sport</TableHead>
              <TableHead className="text-right">Rev Share Exposure</TableHead>
              <TableHead className="text-right">Cleared / Pending NIL</TableHead>
              <TableHead className="text-right">Total Comp Package</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SAMPLE_ROSTER.map((athlete) => (
              <TableRow key={athlete.id} className="motion-standard">
                <TableCell className="font-medium">{athlete.name}</TableCell>
                <TableCell><Badge variant="outline">{athlete.sport} Roster Unit</Badge></TableCell>
                <TableCell className="text-right text-muted-foreground">{formatCurrency(athlete.revShare)}</TableCell>
                <TableCell className="text-right text-muted-foreground">{formatCurrency(athlete.nil)}</TableCell>
                <TableCell className="text-right font-semibold text-primary">
                  {formatCurrency(athlete.revShare + athlete.nil)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <p className="mt-4 text-xs text-muted-foreground">
          Decision guidance: prioritize offers with highest roster impact per dollar before entering next portal cycle.
        </p>
      </CardContent>
    </Card>
  );
}
