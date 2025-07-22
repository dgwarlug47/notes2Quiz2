// Entry point of the quiz tool

import { sendOpenAIRequest } from "./openai-client.js";
import { generateQuizPrompt } from './prompts-generator.js';

export default async function sendQuizQuestion(): Promise<string> {
  try {
    const quizPrompt = await generateQuizPrompt();
    const result = await sendOpenAIRequest(quizPrompt);
    
    console.log("OpenAI Response:", result);
    return result.valueOf();
  } catch (error) {
    console.error("Test failed:", error);
    throw error;
  }
}

/**
 * Simple test function to verify the client works
 */
sendQuizQuestion().catch((error) => {
  console.error("Fatal error in testOpenAI():", error);
  process.exit(1);
});

export { sendQuizQuestion }