#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { sendQuizQuestion } from "./quiz.js"; // Import the OpenAI function

// Create server instance
const server = new McpServer({
  name: "file-reader-explainer",
  version: "1.0.0",
  capabilities: {
    resources: {
      subscribe: true,
      listChanged: true,
    },
    tools: {},
  },
});

// Register tool to explain file contents from resources
server.tool(
  "quiz_question",
  {
  },
  async ({  }) => {
    const quizQuestion = await sendQuizQuestion();
      
      return {
        content: [
          {
            type: "text",
            text: quizQuestion,
          },
        ],
      };
    } 
);


// Function to generate 100 quiz questions
async function generateQuizQuestions() {
  const fs = await import('fs/promises');
  const results = [];
  
  console.log("Generating 100 quiz questions...");
  
  for (let i = 1; i <= 100; i++) {
    try {
      console.log(`Generating question ${i}/100...`);
      const questionResponse = await sendQuizQuestion();
      
      // Extract question and response - response is the last line, question is the rest
      const lines = questionResponse.split('\n');
      const response = lines[lines.length - 1]; // Last line
      const question = lines.slice(0, -1).join('\n'); // Everything except last line
      
      results.push({
        questionNumber: i,
        timestamp: new Date().toISOString(),
        question: question,
        response: response
      });
      
      // Small delay to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`Error generating question ${i}:`, error);
      results.push({
        questionNumber: i,
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
  
  // Save to file
  const outputFile = 'quiz_questions_100.json';
  await fs.writeFile(outputFile, JSON.stringify(results, null, 2));
  console.log(`Saved 100 quiz questions to ${outputFile}`);
  
  return results;
}

// Main function to run the server
async function main() {
  // Check if we should generate questions instead of running the server
  if (process.argv.includes('--generate-questions')) {
    await generateQuizQuestions();
    return;
  }
  
  // Initialize resources first
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("File Reader & Explainer MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
