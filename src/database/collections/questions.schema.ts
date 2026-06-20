import type { RxJsonSchema } from "rxdb";
import type { Question } from "../../types/question";

export const questionSchema: RxJsonSchema<Question> = {
  title: "questions schema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: { type: "string", maxLength: 100 },
    version: { type: "integer" },
    status: { type: "string" },
    createdBy: { type: "string" },
    reviewedBy: { type: "string" },
    editedBy: { type: "string" },
    createdAt: { type: "integer" },
    updatedAt: { type: "integer" },

    section: { type: "string" },
    contentCategoryId: { type: "string" },
    discipline: { type: "string" },
    skill: { type: "string" },
    difficultyTarget: { type: "string" },
    format: { type: "string" },
    passageId: { type: "string" },
    topic: { type: "string" },
    subtopic: { type: "string" },

    stem: { type: "string" },
    options: {
      type: "array",
      items: {
        type: "object",
        properties: {
          key: { type: "string" },
          text: { type: "string" },
        },
        required: ["key", "text"],
      },
    },
    answerKey: { type: "string" },
    rationales: {
      type: "object",
      additionalProperties: { type: "string" },
    },
    teachingPoint: { type: "string" },
    estimatedTimeSeconds: { type: "integer" },

    sourceRefs: {
      type: "array",
      items: { type: "string" },
    },
    originalityCheck: { type: "string" },
    biasReview: { type: "string" },
    reviewNotes: { type: "string" },

    pValue: { type: "number" },
    discrimination: { type: "number" },
    timesServed: { type: "integer" },
    optionDistribution: {
      type: "object",
      additionalProperties: { type: "number" },
    },
    flagCount: { type: "integer" },
    retiredReason: { type: "string" },
  },
  required: [
    "id",
    "version",
    "status",
    "createdBy",
    "createdAt",
    "updatedAt",
    "section",
    "contentCategoryId",
    "skill",
    "difficultyTarget",
    "format",
    "stem",
    "options",
    "answerKey",
    "rationales",
    "teachingPoint",
    "estimatedTimeSeconds",
    "sourceRefs",
    "timesServed",
    "flagCount",
  ],
};
