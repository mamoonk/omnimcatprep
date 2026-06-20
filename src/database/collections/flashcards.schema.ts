import type { RxJsonSchema } from "rxdb";
import type { Flashcard } from "../../types";

export const flashcardSchema: RxJsonSchema<Flashcard> = {
  title: "flashcard schema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: { type: "string", maxLength: 100 },
    front: { type: "string" },
    back: { type: "string" },
    stability: { type: "number" },
    difficulty: { type: "number" },
    elapsedDays: { type: "integer" },
    scheduledDays: { type: "integer" },
    reps: { type: "integer" },
    lapses: { type: "integer" },
    state: { type: "integer" },
    dueDate: { type: "integer" },
    contentCategoryId: { type: "string" },
    section: { type: "string" },
  },
  required: ["id", "front", "back", "stability", "difficulty", "state", "dueDate"],
};
