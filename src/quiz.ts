// Entry point of the quiz tool

import { sendOpenAIRequest } from "./openai-client.js";
import { PromptManager } from './prompts-generator.js';

class QuizManager {
  private quizPrompt: string | null = null;
  private category: string = "";

  private promptManager = new PromptManager

  async generateQuestion(): Promise<{ question: string; category: string; difficulty: string; alternatives: string[]; answer: string; context: string }> {
    try {

      // Generate and store the quiz prompt if not already set
      if (this.quizPrompt === null) {
        let x = await this.promptManager.generateQuizPrompt();
        this.category = x[0];
        this.quizPrompt = x[1];
      }

      const quizContext = "";
      const quizQuestion = await sendOpenAIRequest(this.quizPrompt);

      let quizObject = {
        question: quizQuestion,
        category: this.category, // Assuming the second line is the category
        context: quizContext, // Assuming the ninth line is the context
        difficulty: this.quizPrompt.split('\n')[0], // Assuming the third line is the difficulty
        alternatives: this.quizPrompt.split('\n').slice(1, 5), // Assuming the next four lines are alternatives
        answer: this.quizPrompt.split('\n')[6], // Assuming the last line is the answer
      };
      
      console.log("OpenAI Response:", quizQuestion);
      return quizObject;

    } catch (error) {
      console.error("Quiz generation failed:", error);
      throw error;
    }
  }

  async resetQuizPrompt(): Promise<void> {
    this.quizPrompt = null; // Reset the prompt to generate a new one next time
  }
}

export { QuizManager}