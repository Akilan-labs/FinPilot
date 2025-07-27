'use server';

/**
 * @fileOverview An AI agent that provides a summary of the user's financial health, with suggestions for improvement.
 *
 * - getFinancialHealthSummary - A function that returns a summary of the user's financial health.
 * - FinancialHealthSummaryInput - The input type for the getFinancialHealthSummary function.
 * - FinancialHealthSummaryOutput - The return type for the getFinancialHealthSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialHealthSummaryInputSchema = z.object({
  income: z.number().describe('The user\'s monthly income.'),
  expenses: z.number().describe('The user\'s monthly expenses.'),
  assets: z.number().describe('The user\'s total assets.'),
  liabilities: z.number().describe('The user\'s total liabilities.'),
  creditScore: z.number().describe('The user\'s credit score.'),
  financialGoals: z
    .string()
    .describe('The user\'s financial goals, as a text description.'),
});
export type FinancialHealthSummaryInput = z.infer<
  typeof FinancialHealthSummaryInputSchema
>;

const FinancialHealthSummaryOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A summary of the user\'s financial health, with suggestions for improvement.'
    ),
});
export type FinancialHealthSummaryOutput = z.infer<
  typeof FinancialHealthSummaryOutputSchema
>;

export async function getFinancialHealthSummary(
  input: FinancialHealthSummaryInput
): Promise<FinancialHealthSummaryOutput> {
  return financialHealthSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'financialHealthSummaryPrompt',
  input: {schema: FinancialHealthSummaryInputSchema},
  output: {schema: FinancialHealthSummaryOutputSchema},
  prompt: `You are a personal finance advisor. Please provide a summary of the user\'s financial health, with suggestions for improvement, based on the following information:

Income: {{income}}
Expenses: {{expenses}}
Assets: {{assets}}
Liabilities: {{liabilities}}
Credit Score: {{creditScore}}
Financial Goals: {{financialGoals}}`,
});

const financialHealthSummaryFlow = ai.defineFlow(
  {
    name: 'financialHealthSummaryFlow',
    inputSchema: FinancialHealthSummaryInputSchema,
    outputSchema: FinancialHealthSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
