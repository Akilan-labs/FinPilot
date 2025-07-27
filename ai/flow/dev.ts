'use server';
/**
 * @fileOverview A development server for Genkit.
 */

import {config} from 'dotenv';
config();

import '@/ai/flows/anomaly-detection.ts';
import '@/ai/flows/financial-analysis.ts';
import '@/ai/flows/investment-simulation.ts';
import '@/ai/flows/stock-analysis.ts';
import '@/ai/flows/timing-guidance.ts';
import '@/ai/flows/portfolio-rebalancing.ts';
import '@/ai/flows/financial-personality.ts';
import '@/ai/flows/financial-mood.ts';
import '@/ai/flows/conversational-agent.ts';
import '@/ai/flows/text-to-speech.ts';
import '@/ai/flows/investment-coach.ts';
