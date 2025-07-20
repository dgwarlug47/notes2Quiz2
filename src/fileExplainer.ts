import path from "path";

// Helper function to generate explanation based on content
export function generateExplanation(filePath: string, content: string): string {
  const lines = content.split('\n');
  const fileName = path.basename(filePath);
  
  return `File: ${fileName}\nType: Lines: ${lines.length}\nContent: ${content.slice(0, 2)}${content.length > 200 ? '...' : ''}`;
}
