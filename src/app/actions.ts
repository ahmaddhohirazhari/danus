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

    // The instructions for the AI are in the prompt itself.
    // We only need to provide the raw data here.
    const financialData = `Recent Transactions:\n${mockTransactions
      .map(
        (t) =>
          `- ${t.date}: ${t.description} | Category: ${t.category} | Type: ${t.type} | Amount: ${t.amount} IDR`
      )
      .join('\n')}`;

    const input: CreditworthinessInput = {
      financialData,
    };
    const result = await analyzeCreditworthiness(input);
    return { data: result, message: 'success' };
  } catch (error) {
    console.error('Error during credit analysis:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred.';
    return {
      data: null,
      // Provide a more detailed error message to the client to help with debugging.
      message: `Analysis failed: ${errorMessage}`,
    };
  }
}
