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


// Main function to run the server
async function main() {
  // Initialize resources first
  
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("File Reader & Explainer MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
