import path from 'path';
import { CONTEXT_PROMPT_TEMPLATES, QUESTION_PROMPT_TEMPLATES } from './prompts-config.js';
import fs from 'fs/promises';

/**
 * Generates a quiz prompt by combining the quiz template with content
 * @param content - The content to generate a quiz about
 * @returns The complete prompt string
 */

class PromptManager {
  private folderPath: string;

  constructor(folderPath?: string) {
    this.folderPath = folderPath || "/Users/davi/Library/CloudStorage/GoogleDrive-davisena145@gmail.com/My Drive/Desktop/Knowledge/";
  }

  generateStaticQuestionPromptComponent(): string {
    return QUESTION_PROMPT_TEMPLATES.PromptPrefix + QUESTION_PROMPT_TEMPLATES.AnswerTemplate;
  }

  generateContextPrompt(): string {
    return CONTEXT_PROMPT_TEMPLATES.ContextPrompt;
  }


  async generateQuizPrompt(): Promise<[string, string]> {
    try {
      // Read all files in the directory
      const files = await fs.readdir(this.folderPath, { recursive: true });
      
      // Filter only files (not directories) and common text file extensions
      const textFiles = files.filter(file => {
        const ext = path.extname(file.toString()).toLowerCase();
        return ['.md'].includes(ext);
      });
      
      if (textFiles.length === 0) {
        throw new Error("No text files found in the folder");
      }
      
      // Get a random file
      const randomIndex = Math.floor(Math.random() * textFiles.length);
      const selectedFile = textFiles[randomIndex].toString();
      
      // Basic way to extract file name
      const fileName = path.basename(selectedFile);
      console.log("Selected file:", fileName);
      
      // Read the actual file content
      const fullPath = path.join(this.folderPath, selectedFile);
      const fileContent = await fs.readFile(fullPath, 'utf-8');
      
      return [fullPath, this.generateStaticQuestionPromptComponent() + fileContent];
      
    } catch (error) {
      console.error("Error reading folder:", error);
      // Fallback to a default file
      return Promise.resolve(["", "Please provide a valid file path or ensure the folder contains text files."]);
    }
  }

}

// Export the PromptManager class
export { PromptManager };

