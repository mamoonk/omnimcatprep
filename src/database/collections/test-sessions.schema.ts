import type { RxJsonSchema } from "rxdb";
import type { TestSession } from "../../types/test";

export const testSessionSchema: RxJsonSchema<TestSession> = {
  title: "test_sessions schema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: { type: "string", maxLength: 100 },
    userId: { type: "string" },
    templateId: { type: "string" },
    startedAt: { type: "integer" },
    completedAt: { type: "integer" },
    state: { type: "string" },
    sectionResults: {
      type: "array",
      items: {
        type: "object",
        properties: {
          section: { type: "string" },
          rawCorrect: { type: "integer" },
          totalQuestions: { type: "integer" },
          scaledScore: { type: "integer" },
          timeSpentSeconds: { type: "integer" },
        },
        required: ["section", "rawCorrect", "totalQuestions", "scaledScore", "timeSpentSeconds"],
      },
    },
    totalScaledScore: { type: "integer" },
  },
  required: ["id", "userId", "templateId", "startedAt", "state", "sectionResults"],
};
