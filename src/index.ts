#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { promises as fs } from "fs";
import path from "path";
import { generateExplanation } from "./fileExplainer.js";

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
  "explain_file",
  "Analyze and explain what is written in a file resource",
  {
  },
  async ({  }) => {
    const filePath = "/Users/davi/Desktop/Code/notes2Quiz2/test.md";
      
    const content = await fs.readFile(filePath, 'utf-8');
    const explanation = generateExplanation(filePath, content);
      
      return {
        content: [
          {
            type: "text",
            text: explanation,
          },
        ],
      };
    } 
);

//

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
