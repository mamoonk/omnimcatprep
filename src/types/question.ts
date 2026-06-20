import type {
  McatSection,
  Skill,
  CarsSkill,
  DifficultyTarget,
  QuestionFormat,
  ItemStatus,
  Discipline,
} from "./aamc-taxonomy";

export interface QuestionOption {
  key: string;
  text: string;
}

export interface Question {
  id: string;
  version: number;
  status: ItemStatus;
  createdBy: string;
  reviewedBy?: string;
  editedBy?: string;
  createdAt: number;
  updatedAt: number;

  section: McatSection;
  contentCategoryId: string;
  discipline?: Discipline;
  skill: Skill | CarsSkill;
  difficultyTarget: DifficultyTarget;
  format: QuestionFormat;
  passageId?: string;
  topic?: string;
  subtopic?: string;

  stem: string;
  options: QuestionOption[];
  answerKey: string;
  rationales: Record<string, string>;
  teachingPoint: string;
  estimatedTimeSeconds: number;

  sourceRefs: string[];
  originalityCheck?: string;
  biasReview?: "pass" | "flag";
  reviewNotes?: string;

  pValue?: number;
  discrimination?: number;
  timesServed: number;
  optionDistribution?: Record<string, number>;
  flagCount: number;
  retiredReason?: string;
}
