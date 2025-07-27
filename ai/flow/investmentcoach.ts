'use server';

/**
 * @fileOverview An AI agent that provides investment coaching.
 *
 * - getInvestmentAdvice - A function that returns personalized investment advice.
 * - InvestmentAdviceInput - The input type for the getInvestmentAdvice function.
 * - InvestmentAdviceOutput - The return type for the getInvestmentAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InvestmentAdviceInputSchema = z.object({
  userProfile: z.string().describe("A summary of the user's financial profile, including risk tolerance and goals."),
  portfolio: z.string().describe("A JSON string representing the user's current investment portfolio."),
  marketConditions: z.string().describe('A summary of the current stock market conditions.'),
});
export type InvestmentAdviceInput = z.infer<typeof InvestmentAdviceInputSchema>;

const InvestmentAdviceOutputSchema = z.object({
  advice: z.string().describe('Actionable investment advice for the user.'),
});
export type InvestmentAdviceOutput = z.infer<typeof InvestmentAdviceOutputSchema>;

export async function getInvestmentAdvice(input: InvestmentAdviceInput): Promise<InvestmentAdviceOutput> {
  return investmentCoachFlow(input);
}

const prompt = ai.definePrompt({
  name: 'investmentCoachPrompt',
  input: {schema: InvestmentAdviceInputSchema},
  output: {schema: InvestmentAdviceOutputSchema},
  prompt: `You are a friendly and encouraging investment coach. Your goal is to provide simple, actionable advice to help users improve their investment strategy. Avoid complex jargon.

Analyze the user's profile, portfolio, and current market conditions to give one clear, actionable piece of advice. Focus on the most impactful change they could make right now.

User Profile: {{{userProfile}}}
Current Portfolio (JSON): {{{portfolio}}}
Market Conditions: {{{marketConditions}}}

Provide a single, encouraging piece of advice. For example: "Your portfolio looks solid! Have you considered adding some international stocks to diversify? An ETF that tracks the S&P 500 could be a great, simple option." or "You have a great start in tech stocks. To balance things out, maybe look into a stable dividend-paying stock from the consumer goods sector."`,
});

const investmentCoachFlow = ai.defineFlow(
  {
    name: 'investmentCoachFlow',
    inputSchema: InvestmentAdviceInputSchema,
    outputSchema: InvestmentAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
