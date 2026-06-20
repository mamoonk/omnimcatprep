import type { McatSection } from "./index";
export type { McatSection };

export type Skill =
  | "knowledge"
  | "scientific-reasoning"
  | "reasoning-about-design"
  | "data-based-statistical-reasoning";

export type CarsSkill =
  | "foundations-comprehension"
  | "reasoning-within-text"
  | "reasoning-beyond-text";

export type DifficultyTarget = "easy" | "medium" | "hard";

export type QuestionFormat = "passage-based" | "discrete";

export type ItemStatus =
  | "draft"
  | "in_smr_review"
  | "in_edit"
  | "approved"
  | "field_testing"
  | "live"
  | "retired";

export type Discipline =
  | "gen-chem"
  | "org-chem"
  | "physics"
  | "biochem"
  | "biology"
  | "psychology"
  | "sociology";

export interface ContentCategory {
  id: string;
  section: McatSection;
  aamcCode: string;
  name: string;
  description: string;
  parentId: string | null;
  orderIndex: number;
}

export const DISCIPLINE_LABELS: Record<Discipline, string> = {
  "gen-chem": "General Chemistry",
  "org-chem": "Organic Chemistry",
  physics: "Physics",
  biochem: "Biochemistry",
  biology: "Biology",
  psychology: "Psychology",
  sociology: "Sociology",
};
