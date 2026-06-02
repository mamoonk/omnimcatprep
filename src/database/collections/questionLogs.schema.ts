import type { RxJsonSchema } from "rxdb";
import type { QuestionLog } from "../../types";

export const questionLogSchema: RxJsonSchema<QuestionLog> = {
  title: "question_log schema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: { type: "string", maxLength: 100 },
    questionId: { type: "string" },
    section: { type: "string" },
    isCorrect: { type: "boolean" },
    selectedAnswer: { type: "string" },
    timeSpentSeconds: { type: "integer" },
    timestamp: { type: "integer" },
    complianceLogged: { type: "boolean" },
    errorType: { type: "string" },
    mistakeAnalysis: {
      type: "object",
      properties: {
        infoGap: { type: "string" },
        distractorTrap: { type: "string" },
        preventiveRule: { type: "string" },
      },
    },
  },
  required: [
    "id",
    "questionId",
    "section",
    "isCorrect",
    "timeSpentSeconds",
    "timestamp",
    "complianceLogged",
  ],
};
