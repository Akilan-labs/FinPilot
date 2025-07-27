'use server';

/**
 * @fileOverview Anomaly detection AI agent.
 *
 * - anomalyDetection - A function that handles the anomaly detection process.
 * - AnomalyDetectionInput - The input type for the anomalyDetection function.
 * - AnomalyDetectionOutput - The return type for the anomalyDetection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnomalyDetectionInputSchema = z.object({
  transactionHistory: z
    .string()
    .describe('A list of transactions in JSON format.'),
  userProfile: z
    .string()
    .describe('A description of the user and their typical spending habits.'),
});
export type AnomalyDetectionInput = z.infer<typeof AnomalyDetectionInputSchema>;

const AnomalyDetectionOutputSchema = z.object({
  anomalies: z.array(
    z.object({
      date: z.string().describe('The date of the anomaly.'),
      description: z.string().describe('A description of the anomaly.'),
      severity: z.enum(['Low', 'Medium', 'High']).describe('The severity of the anomaly.'),
      details: z.string().describe('Any relevant details about the anomaly.'),
    })
  ).describe('A list of detected anomalies.'),
});
export type AnomalyDetectionOutput = z.infer<typeof AnomalyDetectionOutputSchema>;

export async function anomalyDetection(input: AnomalyDetectionInput): Promise<AnomalyDetectionOutput> {
  return anomalyDetectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'anomalyDetectionPrompt',
  input: {schema: AnomalyDetectionInputSchema},
  output: {schema: AnomalyDetectionOutputSchema},
  prompt: `You are an expert financial analyst specializing in detecting fraudulent transactions and unusual spending patterns.

You will receive a transaction history and a user profile. Your task is to analyze the transaction history and identify any anomalies that could indicate fraud or errors.

Consider the user's profile and spending habits when determining whether a transaction is anomalous. For example, a large purchase at a jewelry store might be normal for a high-income user, but anomalous for a low-income user.

Output the anomalies in a JSON format.

Transaction History: {{{transactionHistory}}}
User Profile: {{{userProfile}}}`,
});

const anomalyDetectionFlow = ai.defineFlow(
  {
    name: 'anomalyDetectionFlow',
    inputSchema: AnomalyDetectionInputSchema,
    outputSchema: AnomalyDetectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
