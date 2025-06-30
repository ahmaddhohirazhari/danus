'use server';

import {
  analyzeCreditworthiness,
  type CreditworthinessInput,
  type CreditworthinessOutput,
} from '@/ai/flows/creditworthiness-analysis';
import { mockTransactions } from '@/lib/data';

export async function getCreditAnalysis(): Promise<{
  data: CreditworthinessOutput | null;
  message: string;
}> {
  try {
    if (!mockTransactions || mockTransactions.length === 0) {
      return {
        data: null,
        message: 'No transaction data available for analysis.',
      };
    }

    const financialData = `
      Analyze the following UMKM transaction data to determine creditworthiness. 
      Provide a score and a detailed analysis based on OJK rules, considering profitability, cash flow patterns, and debt-to-income indicators.

      Recent Transactions:
      ${mockTransactions
        .map(
          (t) =>
            `- ${t.date}: ${t.description} | Category: ${t.category} | Type: ${t.type} | Amount: ${t.amount} IDR`
        )
        .join('\n')}
    `;

    const input: CreditworthinessInput = {
      financialData,
    };
    const result = await analyzeCreditworthiness(input);
    return { data: result, message: 'success' };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      message: 'Failed to analyze creditworthiness. Please try again later.',
    };
  }
}
