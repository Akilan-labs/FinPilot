'use server';

/**
 * @fileOverview An AI agent that provides buy/sell timing guidance for stocks.
 *
 * - getTimingGuidance - A function that returns personalized stock timing advice.
 * - TimingGuidanceInput - The input type for the getTimingGuidance function.
 * - TimingGuidanceOutput - The return type for the getTimingGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TimingGuidanceInputSchema = z.object({
  query: z.string().describe("The user's question about when to buy or sell a stock (e.g., 'When should I sell my Infosys shares bought in Jan 2022?')."),
  userProfile: z.string().describe('A summary of the user\'s financial profile, including risk tolerance and goals.'),
  marketConditions: z.string().describe('A summary of the current stock market conditions and any relevant technical indicators.'),
});
export type TimingGuidanceInput = z.infer<typeof TimingGuidanceInputSchema>;

const TimingGuidanceOutputSchema = z.object({
  guidance: z.string().describe('The AI-generated advice on whether to buy, sell, or hold, including the reasoning.'),
  confidence: z.enum(['Low', 'Medium', 'High']).describe('The confidence level of the guidance.'),
});
export type TimingGuidanceOutput = z.infer<typeof TimingGuidanceOutputSchema>;

export async function getTimingGuidance(input: TimingGuidanceInput): Promise<TimingGuidanceOutput> {
  return timingGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'timingGuidancePrompt',
  input: {schema: TimingGuidanceInputSchema},
  output: {schema: TimingGuidanceOutputSchema},
  prompt: `You are an expert stock market analyst. A user is asking for advice on when to buy or sell a stock.

Analyze the user's query, their financial profile, and the current market conditions to provide a clear recommendation.
Your guidance should state whether to BUY, SELL, or HOLD, and provide a concise reason based on the provided context (past trends, technical signals, user goals).

User's Query: "{{{query}}}"
User's Profile: {{{userProfile}}}
Market Conditions & Technical Signals: {{{marketConditions}}}

Provide your guidance and a confidence level.`,
});

const timingGuidanceFlow = ai.defineFlow(
  {
    name: 'timingGuidanceFlow',
    inputSchema: TimingGuidanceInputSchema,
    outputSchema: TimingGuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
