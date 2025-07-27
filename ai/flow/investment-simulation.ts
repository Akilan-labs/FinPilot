'use server';

/**
 * @fileOverview An AI agent that simulates investment outcomes.
 *
 * - getInvestmentSimulation - A function that returns a simulated investment value.
 * - InvestmentSimulationInput - The input type for the getInvestmentSimulation function.
 * - InvestmentSimulationOutput - The return type for the getInvestmentSimulation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InvestmentSimulationInputSchema = z.object({
  stockTicker: z.string().describe('The stock ticker symbol (e.g., "TCS", "RELIANCE").'),
  investmentAmount: z.number().describe('The initial amount invested.'),
  timeHorizonYears: z.number().describe('The number of years for the investment simulation.'),
  userProfile: z.string().describe('A summary of the user\'s financial profile, including risk tolerance and tax assumptions.'),
});
export type InvestmentSimulationInput = z.infer<typeof InvestmentSimulationInputSchema>;

const InvestmentSimulationOutputSchema = z.object({
  simulatedValue: z.number().describe('The estimated future value of the investment.'),
  commentary: z.string().describe('A brief explanation of the simulation, including assumptions made about growth, inflation, and risk.'),
});
export type InvestmentSimulationOutput = z.infer<typeof InvestmentSimulationOutputSchema>;

export async function getInvestmentSimulation(input: InvestmentSimulationInput): Promise<InvestmentSimulationOutput> {
  return investmentSimulationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'investmentSimulationPrompt',
  input: {schema: InvestmentSimulationInputSchema},
  output: {schema: InvestmentSimulationOutputSchema},
  prompt: `You are a financial analyst. A user wants to simulate an investment.

Based on the provided stock, investment amount, time horizon, and user profile, project the future value.
Use a conservative annualized growth rate for the given stock based on its historical performance and sector outlook.
Factor in an assumed average annual inflation of 4% and a long-term capital gains tax of 10% on the profit.

User Profile: {{{userProfile}}}
Stock: {{stockTicker}}
Investment: ₹{{investmentAmount}}
Time Horizon: {{timeHorizonYears}} years

Provide the final simulated value and a brief commentary on the assumptions.`,
});

const investmentSimulationFlow = ai.defineFlow(
  {
    name: 'investmentSimulationFlow',
    inputSchema: InvestmentSimulationInputSchema,
    outputSchema: InvestmentSimulationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
