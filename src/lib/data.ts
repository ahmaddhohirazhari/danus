import type { Transaction } from '@/lib/types';

export const mockTransactions: Transaction[] = [
  { id: '1', date: '2023-10-26', description: 'Penjualan barang dagang', category: 'Sales', type: 'Income', amount: 1500000 },
  { id: '2', date: '2023-10-25', description: 'Beli ATK', category: 'Supplies', type: 'Expense', amount: 250000 },
  { id: '3', date: '2023-10-25', description: 'Pembayaran dari Klien A', category: 'Sales', type: 'Income', amount: 3000000 },
  { id: '4', date: '2023-10-24', description: 'Bayar tagihan listrik', category: 'Utilities', type: 'Expense', amount: 450000 },
  { id: '5', date: '2023-10-23', description: 'Bahan baku produksi', category: 'Inventory', type: 'Expense', amount: 1200000 },
  { id: '6', date: '2023-10-22', description: 'Jasa konsultasi', category: 'Services', type: 'Income', amount: 5000000 },
  { id: '7', date: '2023-10-21', description: 'Biaya sewa toko', category: 'Rent', type: 'Expense', amount: 2000000 },
];

export const chartData = [
  { month: 'Aug', income: 18600000, expenses: 8000000 },
  { month: 'Sep', income: 30500000, expenses: 12000000 },
  { month: 'Oct', income: 23700000, expenses: 9800000 },
  { month: 'Nov', income: 27800000, expenses: 11000000 },
  { month: 'Dec', income: 18900000, expenses: 8500000 },
  { month: 'Jan', income: 23900000, expenses: 10200000 },
];

export const pnlData = {
  revenue: 55000000,
  cogs: 21000000,
  grossProfit: 34000000,
  operatingExpenses: 12500000,
  operatingIncome: 21500000,
  taxes: 4300000,
  netIncome: 17200000,
};
