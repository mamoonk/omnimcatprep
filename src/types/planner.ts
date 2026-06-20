export type PlanTaskType = "lesson" | "practice" | "flashcard" | "full-length";

export type PlanTaskStatus = "pending" | "completed" | "skipped";

export interface PlanTask {
  id: string;
  userId: string;
  date: number;
  type: PlanTaskType;
  targetRef: string;
  status: PlanTaskStatus;
}
