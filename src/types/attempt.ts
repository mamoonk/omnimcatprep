import type { McatSection } from "./aamc-taxonomy";
import type { MistakeAnalysis } from "./index";

export type AttemptMode = "tutor" | "timed" | "full-length";

export interface Attempt {
  id: string;
  userId: string;
  questionId: string;
  testSessionId?: string;
  section: McatSection;
  contentCategoryId: string;
  selectedOption: string | null;
  isCorrect: boolean;
  timeMs: number;
  mode: AttemptMode;
  timestamp: number;
  complianceLogged: boolean;
  mistakeAnalysis?: MistakeAnalysis;
}
