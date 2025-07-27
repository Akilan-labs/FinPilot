'use server';

/**
 * @fileOverview An AI agent that provides portfolio rebalancing suggestions.
 *
 * - getRebalancingSuggestions - A function that returns personalized portfolio rebalancing advice.
 * - RebalancingInput - The input type for the getRebalancingSuggestions function.
 * - RebalancingOutput - The return type for the getRebalancingSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RebalancingInputSchema = z.object({
  portfolio: z
    .string()
    .describe('A JSON string representing the user\'s current investment portfolio.'),
  riskProfile: z.enum(['Low', 'Moderate', 'High']).describe("The user's risk tolerance."),
   userProfile: z
    .string()
    .describe('A summary of the user\'s financial profile and goals.'),
});
export type RebalancingInput = z.infer<typeof RebalancingInputSchema>;

const RebalancingOutputSchema = z.object({
  suggestions: z.array(
    z.string().describe('A specific, actionable rebalancing suggestion.')
  ).describe('A list of suggestions to improve portfolio allocation.'),
   summary: z.string().describe('A brief summary of the portfolio\'s current state and the rationale for the suggestions.'),
});
export type RebalancingOutput = z.infer<typeof RebalancingOutputSchema>;

export async function getRebalancingSuggestions(input: RebalancingInput): Promise<RebalancingOutput> {
  return rebalancingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rebalancingPrompt',
  input: {schema: RebalancingInputSchema},
  output: {schema: RebalancingOutputSchema},
  prompt: `You are an expert financial advisor specializing in portfolio management.

Analyze the user's current investment portfolio and risk profile. Determine if they are over-exposed in any particular sector or asset class.
Provide actionable suggestions to rebalance the portfolio for better diversification and alignment with their risk tolerance. For example, suggest reducing exposure in one sector and adding an ETF or a different asset class.

User's Profile: {{{userProfile}}}
User's Risk Profile: {{riskProfile}}
Current Portfolio (JSON): {{{portfolio}}}

Provide a summary of your findings and a list of clear, actionable rebalancing suggestions.`,
});

const rebalancingFlow = ai.defineFlow(
  {
    name: 'rebalancingFlow',
    inputSchema: RebalancingInputSchema,
    outputSchema: RebalancingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
