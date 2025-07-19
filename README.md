# File Reader & Explainer MCP Server

A Model Context Protocol (MCP) server that exposes files as resources and provides intelligent explanations of their contents. This server can analyze various file types and provide detailed insights about their structure, purpose, and contents.

## Features

- **File Resources**: Exposes files in the current directory as MCP resources
- **Intelligent Analysis**: Automatically detect file types and provide context-aware explanations
- **Multi-format Support**: Supports JavaScript/TypeScript, Python, Markdown, JSON, HTML, CSS, XML, YAML, and more
- **Detailed Insights**: Provides file statistics, content preview, and purpose analysis
- **Safe File Access**: Validates file paths and checks permissions before reading

## Available Resources

The server automatically discovers and exposes files in the current directory as resources with URIs like:
- `file:///path/to/package.json`
- `file:///path/to/src/index.ts` 
- `file:///path/to/README.md`

## Available Tools

### `explain_file`
Analyzes and explains what is written in a file resource, providing:
- File type detection and description
- Statistics (lines, words, characters)
- Content analysis specific to the file type
- Code structure analysis for source files
- Content preview
- Likely purpose and usage suggestions

**Parameters:**
- `resource_uri` (string): The URI of the file resource to analyze and explain

**Returns:** A comprehensive explanation of the file's contents and purpose

## Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```

## Usage

### Running the Server

Start the server in development mode:
```bash
npm run dev
```

Or build and run:
```bash
npm run build
npm start
```

### Connecting to Claude for Desktop

1. Add the server to your Claude for Desktop configuration file (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "file-reader-explainer": {
      "command": "node",
      "args": ["/absolute/path/to/notes2Quiz2/build/index.js"]
    }
  }
}
```

2. Restart Claude for Desktop
3. The tools will appear in the tools panel

### Using with VS Code

The project includes an MCP configuration file at `.vscode/mcp.json` that can be used for debugging and development.

## Example Usage

Once connected to an MCP client like Claude for Desktop, you can:

1. **Browse available file resources:**
   - The server will automatically list all files in the current directory as resources
   - Each file appears with a `file://` URI

2. **Read file contents:**
   - File contents are accessible through the resource system
   - Use the resource URI to access file data

3. **Explain a file:**
   - "Explain the contents of file:///.../README.md"
   - "What does the file:///.../package.json resource contain?"
   - "Analyze the file:///.../src/index.ts resource"

## Supported File Types

The server provides specialized analysis for:

- **JavaScript/TypeScript** (.js, .ts, .jsx, .tsx): Function and import analysis
- **Python** (.py): Function definitions and structure
- **Markdown** (.md): Headers and code blocks analysis
- **JSON** (.json): Object structure and properties
- **HTML** (.html, .htm): Tag analysis and structure
- **CSS** (.css): Style rules analysis
- **Configuration files**: package.json, tsconfig.json, .gitignore
- **XML** (.xml): Markup structure
- **YAML** (.yml, .yaml): Configuration analysis
- **SQL** (.sql): Database queries
- **Plain text** (.txt): General text analysis

## Development

### Project Structure

```
.
├── src/
│   └── index.ts          # Main MCP server implementation
├── build/                # Compiled JavaScript output
├── .vscode/
│   └── mcp.json         # VS Code MCP configuration
├── .github/
│   └── copilot-instructions.md  # Copilot instructions
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md           # This file
```

### Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled server
- `npm run dev` - Build and run in development mode

### Dependencies

- **@modelcontextprotocol/sdk**: Core MCP SDK for TypeScript
- **zod**: Runtime type validation
- **typescript**: TypeScript compiler
- **@types/node**: Node.js type definitions

## Error Handling

The server includes comprehensive error handling for:
- Invalid file paths
- Permission denied errors
- Non-existent files
- Binary files (not supported)
- Directory paths (only files are supported)

## Security

- File paths are validated and resolved to prevent directory traversal attacks
- Only readable files are accessed
- Files must exist and be actual files (not directories)
- No write operations are performed

## Contributing

This is a sample MCP server project. Feel free to extend it with additional file analysis capabilities or support for more file types.

## License

ISC
