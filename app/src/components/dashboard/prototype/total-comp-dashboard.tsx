"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const SAMPLE_ROSTER = [
  { id: "ath_001", name: "Jackson Arnold", sport: "Football", revShare: 850000, nil: 1200000 },
  { id: "ath_002", name: "Danny Stutsman", sport: "Football", revShare: 750000, nil: 600000 },
  { id: "ath_003", name: "Skylar Vann", sport: "Basketball", revShare: 150000, nil: 75000 },
  { id: "ath_004", name: "Patty Gasso", sport: "Softball", revShare: 200000, nil: 150000 },
];

export function TotalCompDashboard() {
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Total Compensation Command Center</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Athlete</TableHead>
              <TableHead>Sport</TableHead>
              <TableHead className="text-right">Rev Share (Est)</TableHead>
              <TableHead className="text-right">NIL Deals</TableHead>
              <TableHead className="text-right">Total Packages</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SAMPLE_ROSTER.map((athlete) => (
              <TableRow key={athlete.id}>
                <TableCell className="font-medium">{athlete.name}</TableCell>
                <TableCell><Badge variant="outline">{athlete.sport}</Badge></TableCell>
                <TableCell className="text-right text-muted-foreground">{formatCurrency(athlete.revShare)}</TableCell>
                <TableCell className="text-right text-muted-foreground">{formatCurrency(athlete.nil)}</TableCell>
                <TableCell className="text-right font-bold text-primary">
                  {formatCurrency(athlete.revShare + athlete.nil)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
