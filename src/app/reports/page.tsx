'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartTooltipContent, ChartContainer, type ChartConfig, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { chartData, pnlData } from '@/lib/data';

const chartConfig = {
  income: {
    label: 'Income',
    color: 'hsl(var(--chart-1))',
  },
  expenses: {
    label: 'Expenses',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

export default function ReportsPage() {
  const handleExport = () => {
    const pnlForExport = [
      { category: 'Revenue', amount: pnlData.revenue },
      { category: 'Cost of Goods Sold', amount: -pnlData.cogs },
      { category: 'Gross Profit', amount: pnlData.grossProfit },
      { category: 'Operating Expenses', amount: -pnlData.operatingExpenses },
      { category: 'Operating Income', amount: pnlData.operatingIncome },
      { category: 'Taxes', amount: -pnlData.taxes },
      { category: 'Net Income', amount: pnlData.netIncome },
    ];
    
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Category,Amount (IDR)\n";
    pnlForExport.forEach(row => {
      csvContent += `"${row.category}",${row.amount}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "profit-and-loss-summary.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AppLayout>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-full lg:col-span-4">
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
            <CardDescription>Income vs. Expenses over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis
                    tickFormatter={(value) => `Rp${Number(value) / 1000000} Jt`}
                    tickLine={false}
                    axisLine={false}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                   <Tooltip
                    cursor={false}
                    content={<ChartTooltipContent
                      formatter={(value) => formatCurrency(Number(value))}
                      indicator="dot"
                    />}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="income" fill="var(--color-income)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" fill="var(--color-expenses)" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-full lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Profit & Loss</CardTitle>
              <CardDescription>Summary for Q4 2023.</CardDescription>
            </div>
            <Button size="sm" variant="outline" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Revenue</TableCell>
                  <TableCell className="text-right">{formatCurrency(pnlData.revenue)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">Cost of Goods Sold</TableCell>
                  <TableCell className="text-right text-muted-foreground">({formatCurrency(pnlData.cogs)})</TableCell>
                </TableRow>
                <TableRow className="font-bold border-t">
                  <TableCell>Gross Profit</TableCell>
                  <TableCell className="text-right">{formatCurrency(pnlData.grossProfit)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground pt-4">Operating Expenses</TableCell>
                  <TableCell className="text-right text-muted-foreground pt-4">({formatCurrency(pnlData.operatingExpenses)})</TableCell>
                </TableRow>
                <TableRow className="font-bold border-t">
                  <TableCell>Operating Income</TableCell>
                  <TableCell className="text-right">{formatCurrency(pnlData.operatingIncome)}</TableCell>
                </TableRow>
                 <TableRow>
                  <TableCell className="text-muted-foreground">Taxes</TableCell>
                  <TableCell className="text-right text-muted-foreground">({formatCurrency(pnlData.taxes)})</TableCell>
                </TableRow>
                <TableRow className="border-t-2 border-primary font-extrabold text-lg">
                  <TableCell>Net Income</TableCell>
                  <TableCell className="text-right text-primary">{formatCurrency(pnlData.netIncome)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
