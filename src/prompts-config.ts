// Static prompt templates configuration
export const PROMPT_TEMPLATES = {
  Quiz: "Given this text. Please make a specific question about the content, the question can't be something generict about the text, it has to be something specific. But before ask a question, please make a summary on the context of the question. Make 4 alternatives of the response, where only one option is true, and the others are plausible but incorrect and in the end print the right quiz answer.",
  FilePath: "/Users/davi/Library/CloudStorage/GoogleDrive-davisena145@gmail.com/My Drive/Desktop/Knowledge/"

} as const;
