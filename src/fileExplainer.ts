import path from "path";

// Helper function to determine file type and appropriate explanation
function getFileTypeInfo(filePath: string, content: string): { type: string; description: string } {
  const ext = path.extname(filePath).toLowerCase();
  const filename = path.basename(filePath);
  
  // Check for common file types
  if (ext === '.js' || ext === '.ts' || ext === '.jsx' || ext === '.tsx') {
    return { type: 'JavaScript/TypeScript', description: 'Source code file' };
  } else if (ext === '.py') {
    return { type: 'Python', description: 'Python source code file' };
  } else if (ext === '.md') {
    return { type: 'Markdown', description: 'Markdown documentation file' };
  } else if (ext === '.json') {
    return { type: 'JSON', description: 'JSON data file' };
  } else if (ext === '.html' || ext === '.htm') {
    return { type: 'HTML', description: 'HTML markup file' };
  } else if (ext === '.css') {
    return { type: 'CSS', description: 'Cascading Style Sheets file' };
  } else if (ext === '.txt') {
    return { type: 'Text', description: 'Plain text file' };
  } else if (ext === '.xml') {
    return { type: 'XML', description: 'XML markup file' };
  } else if (ext === '.csv') {
    return { type: 'CSV', description: 'Comma-separated values data file' };
  } else if (ext === '.sql') {
    return { type: 'SQL', description: 'SQL database query file' };
  } else if (ext === '.yml' || ext === '.yaml') {
    return { type: 'YAML', description: 'YAML configuration file' };
  } else if (filename === 'README' || filename.startsWith('README.')) {
    return { type: 'README', description: 'Project documentation file' };
  } else if (filename === 'package.json') {
    return { type: 'Package Config', description: 'Node.js package configuration file' };
  } else if (filename === 'tsconfig.json') {
    return { type: 'TypeScript Config', description: 'TypeScript configuration file' };
  } else if (filename === '.gitignore') {
    return { type: 'Git Config', description: 'Git ignore rules file' };
  }
  
  // Try to determine from content
  if (content.trim().startsWith('<!DOCTYPE html') || content.trim().startsWith('<html')) {
    return { type: 'HTML', description: 'HTML markup file' };
  } else if (content.trim().startsWith('<?xml')) {
    return { type: 'XML', description: 'XML markup file' };
  } else if (content.includes('function ') || content.includes('const ') || content.includes('import ')) {
    return { type: 'Source Code', description: 'Programming source code file' };
  }
  
  return { type: 'Unknown', description: 'Unknown file type' };
}

// Helper function to generate explanation based on content
export function generateExplanation(filePath: string, content: string): string {
  const fileInfo = getFileTypeInfo(filePath, content);
  const lines = content.split('\n');
  const lineCount = lines.length;
  const charCount = content.length;
  const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
  
  let explanation = `This is a ${fileInfo.description} (${fileInfo.type}) located at "${filePath}".\n\n`;
  
  explanation += `📊 **File Statistics:**\n`;
  explanation += `- Lines: ${lineCount}\n`;
  explanation += `- Characters: ${charCount}\n`;
  explanation += `- Words: ${wordCount}\n\n`;
  
  // Content analysis based on file type
  if (fileInfo.type === 'JSON') {
    try {
      const parsed = JSON.parse(content);
      explanation += `🔍 **Content Analysis:**\n`;
      explanation += `This JSON file contains structured data with ${Object.keys(parsed).length} top-level properties.\n`;
      if (Object.keys(parsed).length > 0) {
        explanation += `Main properties: ${Object.keys(parsed).slice(0, 5).join(', ')}${Object.keys(parsed).length > 5 ? '...' : ''}\n`;
      }
    } catch {
      explanation += `🔍 **Content Analysis:**\n`;
      explanation += `This appears to be a JSON file, but it may contain syntax errors or be malformed.\n`;
    }
  } else if (fileInfo.type === 'Markdown') {
    const headers = lines.filter(line => line.trim().startsWith('#'));
    const codeBlocks = content.match(/```[\s\S]*?```/g);
    explanation += `🔍 **Content Analysis:**\n`;
    explanation += `This Markdown document contains ${headers.length} headers`;
    if (codeBlocks) {
      explanation += ` and ${codeBlocks.length} code blocks`;
    }
    explanation += `.\n`;
    if (headers.length > 0) {
      explanation += `Headers found: ${headers.slice(0, 3).map(h => h.trim()).join(', ')}${headers.length > 3 ? '...' : ''}\n`;
    }
  } else if (fileInfo.type.includes('JavaScript') || fileInfo.type.includes('TypeScript') || fileInfo.type === 'Python') {
    const functions = content.match(/(function\s+\w+|def\s+\w+|const\s+\w+\s*=|let\s+\w+\s*=)/g);
    const imports = lines.filter(line => line.trim().startsWith('import ') || line.trim().startsWith('from '));
    explanation += `🔍 **Content Analysis:**\n`;
    explanation += `This source code file contains ${functions ? functions.length : 0} function/variable declarations`;
    if (imports.length > 0) {
      explanation += ` and ${imports.length} import statements`;
    }
    explanation += `.\n`;
  } else if (fileInfo.type === 'HTML') {
    const tags = content.match(/<[^>]+>/g);
    const uniqueTags = [...new Set(tags?.map(tag => tag.match(/<(\w+)/)?.[1]) || [])];
    explanation += `🔍 **Content Analysis:**\n`;
    explanation += `This HTML file contains ${tags ? tags.length : 0} HTML tags`;
    if (uniqueTags.length > 0) {
      explanation += ` using elements like: ${uniqueTags.slice(0, 5).join(', ')}${uniqueTags.length > 5 ? '...' : ''}`;
    }
    explanation += `.\n`;
  } else if (fileInfo.type === 'CSS') {
    const rules = content.match(/[^{}]+\{[^}]*\}/g);
    explanation += `🔍 **Content Analysis:**\n`;
    explanation += `This CSS file contains ${rules ? rules.length : 0} style rules.\n`;
  }
  
  // Add content preview
  explanation += `\n📝 **Content Preview:**\n`;
  const previewLines = lines.slice(0, 10);
  explanation += previewLines.map((line, index) => `${(index + 1).toString().padStart(2, ' ')}: ${line}`).join('\n');
  if (lines.length > 10) {
    explanation += `\n... (${lines.length - 10} more lines)`;
  }
  
  // Add purpose/usage suggestions
  explanation += `\n\n💡 **Likely Purpose:**\n`;
  if (fileInfo.type === 'README') {
    explanation += `This is likely the main documentation file for a project, explaining what it does and how to use it.`;
  } else if (fileInfo.type === 'Package Config') {
    explanation += `This file defines the project's dependencies, scripts, and metadata for a Node.js project.`;
  } else if (fileInfo.type.includes('Config')) {
    explanation += `This is a configuration file that defines settings and options for a tool or application.`;
  } else if (fileInfo.type.includes('JavaScript') || fileInfo.type.includes('TypeScript') || fileInfo.type === 'Python') {
    explanation += `This appears to be source code that implements functionality or logic for an application.`;
  } else if (fileInfo.type === 'Markdown') {
    explanation += `This is documentation written in Markdown format, likely containing instructions, explanations, or notes.`;
  } else {
    explanation += `This file appears to contain ${fileInfo.description.toLowerCase()} that serves a specific purpose in the project.`;
  }
  
  return explanation;
}
