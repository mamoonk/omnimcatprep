import type { RxJsonSchema } from "rxdb";
import type { Lesson } from "../../types/lesson";

export const lessonSchema: RxJsonSchema<Lesson> = {
  title: "lessons schema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: { type: "string", maxLength: 100 },
    contentCategoryId: { type: "string" },
    title: { type: "string" },
    body: { type: "string" },
    orderIndex: { type: "integer" },
    completed: { type: "boolean" },
  },
  required: ["id", "contentCategoryId", "title", "body", "orderIndex"],
};
