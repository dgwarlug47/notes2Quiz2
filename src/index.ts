#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { QuizManager } from "./quiz.js"; // Import the OpenAI function

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


// Separate user input logic
async function getUserInput(rl: any): Promise<{ differentFile: boolean, keepQuestion: boolean }> {
  // Ask user if they want to continue
  let answer = await new Promise<string>((resolve) => {
    rl.question('Should I keep the question? (y/n): ', resolve);
  });
  const keepQuestion = answer.toLowerCase() === 'y'

  console.log("Continuing quiz generation...");
  answer = await new Promise<string>((resolve) => {
    rl.question('Would you like to change the file? (y/n): ', resolve);
  });
  const differentFile = answer.toLowerCase() === 'y';

  return { differentFile: differentFile, keepQuestion: keepQuestion };
}

// Abstract file saving logic
async function saveQuizResults(result: any, fs: any): Promise<void> {
  const outputFile = 'quiz_questions_100.json';
  await fs.appendFile(outputFile, JSON.stringify(result, null, 2));
  console.log(`Saved quiz question to ${outputFile}`);
}

// Function to generate quiz questions
async function generateQuizQuestions() {
  const fs = await import('fs/promises');
  const readline = await import('readline');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  console.log("Generating quiz questions...");
  
  let i = 1;

  let quizManager = new QuizManager();
  
  while (true) {
    try {
      console.log("");
      console.log("");
      console.log("");

      console.log(`Generating question ${i}...`);
      const questionResponse = await quizManager.generateQuestion();

      // Extract question and response - response is the last line, question is the rest
      const lines = questionResponse.question.split('\n');
      const response = lines[lines.length - 1]; // Last line
      const questionPart = lines.slice(0, -1).join('\n'); // Everything except last line
      
      // Split context and actual question
      const questionStartIndex = questionPart.toLowerCase().indexOf('question:');
      let context = questionResponse.context;
      let category = questionResponse.category;

      let actualQuestion = '';
      
      if (questionStartIndex !== -1) {
        context = questionPart.substring(0, questionStartIndex).trim();
        actualQuestion = questionPart.substring(questionStartIndex).trim();
      } else {
        // If no "Question:" found, treat the whole thing as the question
        context = '';
        actualQuestion = questionPart.trim();
      }
      
      let result = {
        questionNumber: i,
        timestamp: new Date().toISOString(),
        context: context,
        question: actualQuestion,
        response: response,
        category: category
      };
      
      // Small delay to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get user input using separate function
      const userInput = await getUserInput(rl);

      if (userInput.differentFile) {
        await quizManager.resetQuizPrompt();
      }

      if (userInput.keepQuestion) {
        saveQuizResults(result, fs);
      }
      
      i++;
      
    } catch (error) {
      console.error("Error generating question:", error);
      i++;
    }
  }
  
  rl.close();
  
  // Save results using abstracted function
  
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
