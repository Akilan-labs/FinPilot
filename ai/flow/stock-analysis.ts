'use server';

/**
 * @fileOverview An AI agent that provides stock analysis and recommendations.
 *
 * - getStockRecommendations - A function that returns personalized stock recommendations.
 * - StockRecommendationsInput - The input type for the getStockRecommendations function.
 * - StockRecommendationsOutput - The return type for the getStockRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StockRecommendationsInputSchema = z.object({
  riskProfile: z.enum(['Low', 'Moderate', 'High']).describe("The user's risk tolerance."),
  timeHorizon: z.string().describe("The user's investment time horizon (e.g., '6 months', '5 years')."),
  sectorBias: z.string().describe("The user's preferred investment sectors (e.g., 'IT', 'Pharma', 'Any')."),
  marketConditions: z.string().describe('A summary of the current stock market conditions.'),
});
export type StockRecommendationsInput = z.infer<typeof StockRecommendationsInputSchema>;

const StockRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      stock: z.string().describe('The stock ticker symbol (e.g., "INFY", "RELIANCE").'),
      reason: z.string().describe('The reasoning behind the recommendation.'),
      rating: z.enum(['BUY', 'SELL', 'HOLD']).describe('The recommendation rating.'),
      confidence: z.enum(['Low', 'Medium', 'High']).describe('The confidence level of the recommendation.'),
    })
  ).describe('A list of stock recommendations.'),
});
export type StockRecommendationsOutput = z.infer<typeof StockRecommendationsOutputSchema>;

export async function getStockRecommendations(input: StockRecommendationsInput): Promise<StockRecommendationsOutput> {
  return stockRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'stockRecommendationsPrompt',
  input: {schema: StockRecommendationsInputSchema},
  output: {schema: StockRecommendationsOutputSchema},
  prompt: `You are a personal stock advisor. Given the user's risk profile is {{riskProfile}} and they have a {{timeHorizon}} time horizon with a preference for {{sectorBias}} stocks, suggest 3 large-cap Indian stocks.

Use the following market data to inform your recommendations:
Market Conditions: {{{marketConditions}}}

Provide a reason, rating (BUY, SELL, or HOLD), and a confidence level for each recommendation.`,
});

const stockRecommendationsFlow = ai.defineFlow(
  {
    name: 'stockRecommendationsFlow',
    inputSchema: StockRecommendationsInputSchema,
    outputSchema: StockRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
