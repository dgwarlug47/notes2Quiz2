import OpenAI from 'openai';
import dotenv from 'dotenv';

// Reason to changes: the requests we send to OpenAI

// Load environment variables
dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Basic OpenAI client that sends a request and returns the response
 */
export async function sendOpenAIRequest(prompt: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // You can change to "gpt-4" if you have access
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 1.3,
    });

    return response.choices[0]?.message?.content || "No response generated";
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error(`OpenAI API error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}