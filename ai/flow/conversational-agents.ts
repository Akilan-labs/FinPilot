'use server';

/**
 * @fileOverview A conversational AI agent for financial queries.
 * 
 * - converse - A function that handles the conversational exchange.
 * - Message - The type for a single message in the conversation.
 * - ConverseOutput - The return type for the converse function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { mockFinancialData } from '@/lib/mock-data';
import { MessageSchema, ConverseOutputSchema, type Message, type ConverseOutput } from './conversational-agent.dt';

export async function converse(history: Message[]): Promise<ConverseOutput> {
  const cleanHistory = history.filter(Boolean);
  if (cleanHistory.length === 0) {
    return { response: "I'm sorry, there was an issue with the conversation history. Please start over." };
  }
  return conversationalAgentFlow(cleanHistory);
}

const systemPrompt = `You are FinPilot, an expert financial co-pilot. Your role is to provide helpful, accurate, and conversational advice.

You have access to the user's financial data. Use this data to answer their questions precisely.

- Always respond in the same language as the user's last message.
- Keep your answers concise and easy to understand.
- Be friendly and empathetic in your tone.

Here is the user's financial data for context:
- Profile: ${JSON.stringify(mockFinancialData.profile)}
- Recent Transactions: ${JSON.stringify(mockFinancialData.recentTransactions)}
- Investments: ${JSON.stringify(mockFinancialData.assetAllocation)}
- Financial Goals: ${mockFinancialData.financialHealthInput.financialGoals}
`;

const conversationalAgentFlow = ai.defineFlow(
  {
    name: 'conversationalAgentFlow',
    inputSchema: z.array(MessageSchema),
    outputSchema: ConverseOutputSchema,
  },
  async (history) => {
    try {
      const cleanHistory = history.filter(Boolean);

      if (cleanHistory.length === 0) {
          throw new Error('Conversation history is empty after cleaning.');
      }
      
      const lastMessage = cleanHistory.pop();
      if(lastMessage?.role !== 'user') {
          throw new Error('The last message must be from the user.');
      }

      const response = await ai.generate({
        model: 'googleai/gemini-2.0-flash',
        system: systemPrompt,
        history: cleanHistory,
        prompt: lastMessage.content,
      });
      
      const responseText = response.text;
      
      if (!responseText) {
        throw new Error('Received an empty response from the AI model.');
      }

      return { response: responseText };

    } catch (error) {
      console.error("Error in conversationalAgentFlow:", error);
      // Return a safe, user-friendly error message to the client.
      return { response: "I'm sorry, but I encountered an error and can't respond right now. Please try again later." };
    }
  }
);
