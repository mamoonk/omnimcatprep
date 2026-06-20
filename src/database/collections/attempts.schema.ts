import type { RxJsonSchema } from "rxdb";
import type { Attempt } from "../../types/attempt";

export const attemptSchema: RxJsonSchema<Attempt> = {
  title: "attempts schema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: { type: "string", maxLength: 100 },
    userId: { type: "string" },
    questionId: { type: "string" },
    testSessionId: { type: "string" },
    section: { type: "string" },
    contentCategoryId: { type: "string" },
    selectedOption: { type: "string" },
    isCorrect: { type: "boolean" },
    timeMs: { type: "integer" },
    mode: { type: "string" },
    timestamp: { type: "integer" },
    complianceLogged: { type: "boolean" },
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
    "userId",
    "questionId",
    "section",
    "contentCategoryId",
    "isCorrect",
    "timeMs",
    "mode",
    "timestamp",
    "complianceLogged",
  ],
};
