'use server';

import {
  analyzeCreditworthiness,
  type CreditworthinessInput,
  type CreditworthinessOutput,
} from '@/ai/flows/creditworthiness-analysis';
import { z } from 'zod';

const creditAnalysisSchema = z.object({
  financialData: z.string().min(50, 'Please provide more detailed financial data for an accurate analysis.'),
});

export async function getCreditAnalysis(
  prevState: any,
  formData: FormData
): Promise<{
  data: CreditworthinessOutput | null;
  message: string;
}> {
  const financialData = formData.get('financialData') as string;

  const validatedFields = creditAnalysisSchema.safeParse({
    financialData,
  });

  if (!validatedFields.success) {
    return {
      data: null,
      message: validatedFields.error.flatten().fieldErrors.financialData?.[0] || 'Invalid input.',
    };
  }

  try {
    const input: CreditworthinessInput = {
      financialData: validatedFields.data.financialData,
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
