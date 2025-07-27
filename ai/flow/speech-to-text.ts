'use server';

/**
 * @fileOverview A flow for converting text to speech using Google's TTS model.
 *
 * - synthesizeSpeech - Converts text into an audio data URI.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';
import { SynthesizeSpeechOutputSchema, type SynthesizeSpeechOutput } from './text-to-speech.dt';

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const synthesizeSpeechFlow = ai.defineFlow(
  {
    name: 'synthesizeSpeechFlow',
    inputSchema: z.string(),
    outputSchema: SynthesizeSpeechOutputSchema,
  },
  async (text) => {
    if (!text) {
        return { audioDataUri: undefined };
    }
    
    try {
        const { media } = await ai.generate({
            model: 'googleai/gemini-2.5-flash-preview-tts',
            config: {
                responseModalities: ['AUDIO'],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Algenib' },
                    },
                },
            },
            prompt: text,
        });

        if (!media || !media.url) {
            throw new Error('No media returned from TTS model.');
        }

        const audioBuffer = Buffer.from(
            media.url.substring(media.url.indexOf(',') + 1),
            'base64'
        );

        const wavBase64 = await toWav(audioBuffer);
        
        return {
            audioDataUri: 'data:audio/wav;base64,' + wavBase64,
        };
    } catch (error) {
        console.error("Error in TTS flow:", error);
        return { audioDataUri: undefined };
    }
  }
);

export async function synthesizeSpeech(text: string): Promise<SynthesizeSpeechOutput> {
  return synthesizeSpeechFlow(text);
}
