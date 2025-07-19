# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is an MCP (Model Context Protocol) server project that reads from files and explains their contents.

You can find more info and examples at https://modelcontextprotocol.io/llms-full.txt

## Project Overview
- This MCP server provides tools to read file contents and explain what's written in files
- Built using TypeScript and the @modelcontextprotocol/sdk
- Uses Node.js filesystem APIs to read files
- Provides natural language explanations of file contents

## Key Tools
- `read_file`: Reads the contents of a file from the filesystem
- `explain_file`: Analyzes and explains what is written in a file

## Development Guidelines
- Follow TypeScript best practices
- Use proper error handling for file operations
- Ensure file paths are validated and secure
- Provide clear, helpful explanations in tool responses
