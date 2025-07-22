import path from 'path';
import { PROMPT_TEMPLATES } from './prompts-config.js';
import fs from 'fs/promises';

/**
 * Generates a quiz prompt by combining the quiz template with content
 * @param content - The content to generate a quiz about
 * @returns The complete prompt string
 */

export function generateQuizPrompt(): Promise<string> {
   const content = fs.readFile("/Users/davi/Library/CloudStorage/GoogleDrive-davisena145@gmail.com/My Drive/Desktop/Knowledge/Spare/Games/Sports/Football/players.md", 'utf-8');
   return content.then((data) => {
       return PROMPT_TEMPLATES.Quiz + data });
}

export async function generateQuizPrompt2(): Promise<string> {
    const folderPath = "/Users/davi/Library/CloudStorage/GoogleDrive-davisena145@gmail.com/My Drive/Desktop/Knowledge/";
    
    try {
        // Read all files in the directory
        const files = await fs.readdir(folderPath, { recursive: true });
        
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
        const content =  textFiles[randomIndex].toString();
        return PROMPT_TEMPLATES.Quiz + content;
        
    } catch (error) {
        console.error("Error reading folder:", error);
        // Fallback to a default file
        return "Spare/Games/Sports/Football/players.md";
    }
}

async function testGenerateFilePath() {
    try {
        const result = await generateQuizPrompt();
        console.log("Success! Generated prompt:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}

