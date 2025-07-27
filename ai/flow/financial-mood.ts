'use server';

/**
 * @fileOverview An AI agent that analyzes financial data to determine a "financial mood."
 *
 * - getFinancialMood - A function that returns a financial mood.
 * - FinancialMoodInput - The input type for the getFinancialMood function.
 * - FinancialMoodOutput - The return type for the getFinancialMood function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialMoodInputSchema = z.object({
  transactionHistory: z
    .string()
    .describe('A list of recent transactions in JSON format.'),
  savingsRate: z
    .number()
    .describe('The user\'s recent savings rate as a percentage.'),
  riskExposure: z
    .string()
    .describe('A description of the user\'s current investment risk exposure.'),
});
export type FinancialMoodInput = z.infer<typeof FinancialMoodInputSchema>;

const FinancialMoodOutputSchema = z.object({
  mood: z.enum(['Calm', 'Alert', 'Stressed']).describe('The detected financial mood.'),
  reasoning: z.string().describe('A brief explanation for the detected mood based on the provided data.'),
});
export type FinancialMoodOutput = z.infer<typeof FinancialMoodOutputSchema>;

export async function getFinancialMood(input: FinancialMoodInput): Promise<FinancialMoodOutput> {
  return financialMoodFlow(input);
}

const prompt = ai.definePrompt({
  name: 'financialMoodPrompt',
  input: {schema: FinancialMoodInputSchema},
  output: {schema: FinancialMoodOutputSchema},
  prompt: `You are a behavioral finance analyst. Your task is to detect the user's financial "mood" based on their recent financial activity.

Analyze the following data points:
- Transaction History: Look for sudden increases in spending, many large purchases, or erratic behavior.
- Savings Rate: Note any significant drops in their savings rate.
- Risk Exposure: Consider if their investments have become significantly more risky.

Based on this, determine if their mood is 'Calm' (stable, positive trends), 'Alert' (some negative trends that need attention), or 'Stressed' (significant negative trends, high spending, low savings).

Transaction History: {{{transactionHistory}}}
Savings Rate: {{savingsRate}}%
Risk Exposure: {{{riskExposure}}}

Provide the mood and a brief, empathetic reasoning for your assessment.`,
});

const financialMoodFlow = ai.defineFlow(
  {
    name: 'financialMoodFlow',
    inputSchema: FinancialMoodInputSchema,
    outputSchema: FinancialMoodOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
