import type { RxJsonSchema } from "rxdb";
import type { ContentCategory } from "../../types/aamc-taxonomy";

export const contentCategorySchema: RxJsonSchema<ContentCategory> = {
  title: "content_categories schema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: { type: "string", maxLength: 100 },
    section: { type: "string" },
    aamcCode: { type: "string" },
    name: { type: "string" },
    description: { type: "string" },
    parentId: { type: ["string", "null"] },
    orderIndex: { type: "integer" },
  },
  required: ["id", "section", "aamcCode", "name", "description", "orderIndex"],
};
