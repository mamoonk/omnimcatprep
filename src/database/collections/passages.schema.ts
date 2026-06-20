import type { RxJsonSchema } from "rxdb";
import type { Passage } from "../../types/passage";

export const passageSchema: RxJsonSchema<Passage> = {
  title: "passages schema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: { type: "string", maxLength: 100 },
    section: { type: "string" },
    sourceType: { type: "string" },
    sourceRef: { type: "string" },
    title: { type: "string" },
    body: { type: "string" },
    wordCount: { type: "integer" },
    readingLevel: { type: "string" },
  },
  required: ["id", "section", "sourceType", "sourceRef", "title", "body", "wordCount"],
};
