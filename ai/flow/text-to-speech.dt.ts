/**
 * @fileOverview Data types for the text-to-speech flow.
 * 
 * - SynthesizeSpeechOutputSchema - The Zod schema for the TTS output.
 * - SynthesizeSpeechOutput - The return type for the synthesizeSpeech function.
 */

import { z } from 'genkit';

export const SynthesizeSpeechOutputSchema = z.object({
  audioDataUri: z.string().optional().describe('The base64 encoded audio data URI for the speech.'),
});

export type SynthesizeSpeechOutput = z.infer<typeof SynthesizeSpeechOutputSchema>;
