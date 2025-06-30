// use server'

/**
 * @fileOverview Analyzes financial data to provide a creditworthiness score based on OJK rules.
 *
 * - analyzeCreditworthiness - A function that analyzes financial data and provides a creditworthiness score.
 * - CreditworthinessInput - The input type for the analyzeCreditworthiness function.
 * - CreditworthinessOutput - The return type for the analyzeCreditworthiness function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreditworthinessInputSchema = z.object({
  financialData: z
    .string()
    .describe(
      'A string containing financial data, including transaction records and receipts.'
    ),
});
export type CreditworthinessInput = z.infer<typeof CreditworthinessInputSchema>;

const CreditworthinessOutputSchema = z.object({
  creditScore: z.number().describe('The creditworthiness score.'),
  analysis: z.string().describe('An analysis of the financial data.'),
});
export type CreditworthinessOutput = z.infer<typeof CreditworthinessOutputSchema>;

export async function analyzeCreditworthiness(
  input: CreditworthinessInput
): Promise<CreditworthinessOutput> {
  return creditworthinessAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'creditworthinessAnalysisPrompt',
  input: {schema: CreditworthinessInputSchema},
  output: {schema: CreditworthinessOutputSchema},
  prompt: `You are an expert financial analyst specializing in Indonesian UMKM creditworthiness based on OJK (Otoritas Jasa Keuangan) rules.

You will receive financial data from a UMKM owner and provide a creditworthiness score and analysis based on OJK regulations.

Financial Data: {{{financialData}}}

Provide a creditworthiness score (out of 100) and an analysis of the financial data. Focus on key metrics that OJK would consider, such as profitability, solvency, and liquidity.
`,
});

const creditworthinessAnalysisFlow = ai.defineFlow(
  {
    name: 'creditworthinessAnalysisFlow',
    inputSchema: CreditworthinessInputSchema,
    outputSchema: CreditworthinessOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
