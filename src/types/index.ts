export type McatSection = "chem-phys" | "cars" | "bio-biochem" | "psych-soc";

export type ErrorType = "content_gap" | "cognitive_trap";

export interface MistakeAnalysis {
  infoGap: string;
  distractorTrap: string;
  preventiveRule: string;
}

export interface QuestionLog {
  id: string;
  questionId: string;
  section: McatSection;
  isCorrect: boolean;
  selectedAnswer?: string;
  timeSpentSeconds: number;
  timestamp: number;
  complianceLogged: boolean;
  errorType?: ErrorType;
  mistakeAnalysis?: MistakeAnalysis;
}

export type FlashcardState = 0 | 1 | 2 | 3; // New, Learning, Review, Relearning

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  stability: number;
  difficulty: number;
  elapsedDays?: number;
  scheduledDays?: number;
  reps?: number;
  lapses?: number;
  state: FlashcardState;
  dueDate: number;
}

export interface ExamQuestion {
  id: string;
  section: McatSection;
  passage: string;
  stem: string;
  choices: { key: string; text: string }[];
  correctAnswer: string;
}
