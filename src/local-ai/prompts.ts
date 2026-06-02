export interface IncorrectItemContext {
  passage: string;
  stem: string;
  choices: { key: string; text: string }[];
  selectedAnswer: string;
  correctAnswer: string;
  errorType?: string;
}

export function buildIncorrectRationalePrompt(ctx: IncorrectItemContext): string {
  const choicesText = ctx.choices
    .map((c) => `${c.key}. ${c.text}`)
    .join("\n");
  return `You are an MCAT tutor. Analyze this incorrect response locally.

PASSAGE:
${ctx.passage}

QUESTION:
${ctx.stem}

CHOICES:
${choicesText}

STUDENT SELECTED: ${ctx.selectedAnswer}
CORRECT ANSWER: ${ctx.correctAnswer}
${ctx.errorType ? `ERROR TYPE: ${ctx.errorType}` : ""}

Provide:
1. Conceptual gap explanation
2. Why the selected distractor traps students
3. A preventive rule for future questions`;
}
