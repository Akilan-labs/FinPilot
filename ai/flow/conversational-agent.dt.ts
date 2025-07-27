/**
 * @fileOverview Data types for the conversational agent flow.
 * 
 * - MessageSchema - The Zod schema for a single message.
 * - Message - The type for a single message in the conversation.
 * - ConverseOutputSchema - The Zod schema for the conversation output.
 * - ConverseOutput - The return type for the converse function.
 */

import { z } from 'genkit';

export const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type Message = z.infer<typeof MessageSchema>;

export const ConverseOutputSchema = z.object({
  response: z.string().describe("The AI's response to the user's message."),
});
export type ConverseOutput = z.infer<typeof ConverseOutputSchema>;
