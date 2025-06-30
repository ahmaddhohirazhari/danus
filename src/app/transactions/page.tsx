import { AppLayout } from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Upload } from 'lucide-react';
import type { Transaction } from '@/lib/types';

const mockTransactions: Transaction[] = [
  { id: '1', date: '2023-10-26', description: 'Penjualan barang dagang', category: 'Sales', type: 'Income', amount: 1500000 },
  { id: '2', date: '2023-10-25', description: 'Beli ATK', category: 'Supplies', type: 'Expense', amount: 250000 },
  { id: '3', date: '2023-10-25', description: 'Pembayaran dari Klien A', category: 'Sales', type: 'Income', amount: 3000000 },
  { id: '4', date: '2023-10-24', description: 'Bayar tagihan listrik', category: 'Utilities', type: 'Expense', amount: 450000 },
  { id: '5', date: '2023-10-23', description: 'Bahan baku produksi', category: 'Inventory', type: 'Expense', amount: 1200000 },
  { id: '6', date: '2023-10-22', description: 'Jasa konsultasi', category: 'Services', type: 'Income', amount: 5000000 },
  { id: '7', date: '2023-10-21', description: 'Biaya sewa toko', category: 'Rent', type: 'Expense', amount: 2000000 },
];

export default function TransactionsPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <AppLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-end">
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Upload Receipt
            </Button>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>A record of your recent income and expenses.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="hidden sm:table-cell">{transaction.date}</TableCell>
                    <TableCell>
                        <div className='font-medium'>{transaction.description}</div>
                        <div className="text-sm text-muted-foreground md:hidden">{transaction.category} - {transaction.date}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">{transaction.category}</Badge>
                    </TableCell>
                    <TableCell className={`text-right font-semibold ${transaction.type === 'Income' ? 'text-success' : 'text-destructive'}`}>
                      {transaction.type === 'Income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
