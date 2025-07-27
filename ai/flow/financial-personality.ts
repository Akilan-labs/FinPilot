'use server';

/**
 * @fileOverview An AI agent that analyzes a user's financial behavior to determine their financial personality.
 *
 * - getFinancialPersonality - A function that returns a financial personality profile.
 * - FinancialPersonalityInput - The input type for the getFinancialPersonality function.
 * - FinancialPersonalityOutput - The return type for the getFinancialPersonality function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialPersonalityInputSchema = z.object({
  transactionHistory: z
    .string()
    .describe('A list of transactions in JSON format.'),
  userProfile: z
    .string()
    .describe('A summary of the user\'s financial profile, goals, and investment habits.'),
});
export type FinancialPersonalityInput = z.infer<typeof FinancialPersonalityInputSchema>;

const FinancialPersonalityOutputSchema = z.object({
  personalityType: z.enum([
    'Strategic Investor', 
    'Low-Risk Planner', 
    'Impulse Spender', 
    'Consistent Saver', 
    'Debt-Conscious Repayer',
    'Balanced Manager'
  ]).describe('The financial personality tag assigned to the user.'),
  analysis: z.string().describe('A brief explanation of why the personality type was assigned based on the provided data.'),
});
export type FinancialPersonalityOutput = z.infer<typeof FinancialPersonalityOutputSchema>;

export async function getFinancialPersonality(input: FinancialPersonalityInput): Promise<FinancialPersonalityOutput> {
  return financialPersonalityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'financialPersonalityPrompt',
  input: {schema: FinancialPersonalityInputSchema},
  output: {schema: FinancialPersonalityOutputSchema},
  prompt: `You are a behavioral finance expert. Analyze the user's transaction history and financial profile to determine their dominant financial personality.

Consider their spending habits, saving patterns, investment choices, and approach to debt. Based on this analysis, assign one of the following personality tags:
- Strategic Investor: Focuses on long-term growth, regular investments.
- Low-Risk Planner: Prioritizes safety, saving, and avoiding debt.
- Impulse Spender: Frequent non-essential spending, irregular savings.
- Consistent Saver: High savings rate, cautious spending.
- Debt-Conscious Repayer: Actively focuses on paying down liabilities.
- Balanced Manager: A healthy mix of spending, saving, and investing.

Transaction History: {{{transactionHistory}}}
User Profile: {{{userProfile}}}

Provide the personality tag and a brief analysis explaining your reasoning.`,
});

const financialPersonalityFlow = ai.defineFlow(
  {
    name: 'financialPersonalityFlow',
    inputSchema: FinancialPersonalityInputSchema,
    outputSchema: FinancialPersonalityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
