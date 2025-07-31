// Static prompt templates configuration
export const QUESTION_PROMPT_TEMPLATES = {
  PromptPrefix: "Given this text. Please make a specific question about the content, the question can't be something generict about the text, it has to be something specific.",
  PromptVariation: "Please make a very hard question to answer",
  AnswerTemplate: "The question that I am asking you to generate should have the following format: the first line should be how hard the question is between easy, medium and hard, the second line should be the question itself, the third line should be the first alternative, the fourth line should be the second alternative, the fifth line should be the third alternative and the sixth line should be the fourth alternative. The last line should be the right answer.",
  FilePath: "/Users/davi/Library/CloudStorage/GoogleDrive-davisena145@gmail.com/My Drive/Desktop/Knowledge/"

} as const;

export const CONTEXT_PROMPT_TEMPLATES = {  

  ContextPrompt: "Briefly explain the context of this text "

}