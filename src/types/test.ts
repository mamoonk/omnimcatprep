import type { McatSection } from "./aamc-taxonomy";

export interface SectionSpec {
  section: McatSection;
  questionCount: number;
  timeLimitMinutes: number;
}

export interface TestTemplate {
  id: string;
  name: string;
  sections: SectionSpec[];
  breakMinutes: number;
}

export type TestSessionState =
  | "not_started"
  | "section_active"
  | "section_submitted"
  | "on_break"
  | "completed"
  | "abandoned";

export interface SectionResult {
  section: McatSection;
  rawCorrect: number;
  totalQuestions: number;
  scaledScore: number;
  timeSpentSeconds: number;
}

export interface TestSession {
  id: string;
  userId: string;
  templateId: string;
  startedAt: number;
  completedAt?: number;
  state: TestSessionState;
  sectionResults: SectionResult[];
  totalScaledScore?: number;
}
