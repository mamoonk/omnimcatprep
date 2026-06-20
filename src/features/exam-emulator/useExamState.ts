import { useCallback, useEffect, useReducer, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import type { ExamQuestion, Flashcard, McatSection } from "../../types";
import type { Attempt } from "../../types/attempt";
import { getDatabase } from "../../database";
import { SECTION_DURATIONS_MINUTES } from "./styles";
import { scheduleFlashcard } from "../flashcards/fsrs";
import type { ReviewRating } from "../flashcards/fsrs";
import { ALL_QUESTIONS } from "../../data/questions";

export interface ExamState {
  currentIndex: number;
  selectedAnswer: string | null;
  crossedOut: Set<string>;
  flagged: Set<number>;
  secondsRemaining: number;
  section: McatSection;
  startedAt: number;
  questionStartedAt: number;
}

type ExamAction =
  | { type: "SELECT_ANSWER"; key: string }
  | { type: "TOGGLE_CROSSOUT"; key: string }
  | { type: "TOGGLE_FLAG" }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "TICK" };

function examReducer(state: ExamState, action: ExamAction): ExamState {
  switch (action.type) {
    case "SELECT_ANSWER":
      return { ...state, selectedAnswer: action.key };
    case "TOGGLE_CROSSOUT": {
      const next = new Set(state.crossedOut);
      if (next.has(action.key)) next.delete(action.key);
      else next.add(action.key);
      return { ...state, crossedOut: next };
    }
    case "TOGGLE_FLAG": {
      const next = new Set(state.flagged);
      if (next.has(state.currentIndex)) next.delete(state.currentIndex);
      else next.add(state.currentIndex);
      return { ...state, flagged: next };
    }
    case "NEXT":
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        selectedAnswer: null,
        crossedOut: new Set(),
        questionStartedAt: Date.now(),
      };
    case "PREV":
      return {
        ...state,
        currentIndex: Math.max(0, state.currentIndex - 1),
        selectedAnswer: null,
        crossedOut: new Set(),
        questionStartedAt: Date.now(),
      };
    case "TICK":
      return {
        ...state,
        secondsRemaining: Math.max(0, state.secondsRemaining - 1),
      };
    default:
      return state;
  }
}

export function useExamState(
  questions: ExamQuestion[],
  section: McatSection = "bio-biochem",
) {
  const minutes = SECTION_DURATIONS_MINUTES[section] ?? 95;
  const [state, dispatch] = useReducer(examReducer, {
    currentIndex: 0,
    selectedAnswer: null,
    crossedOut: new Set<string>(),
    flagged: new Set<number>(),
    secondsRemaining: minutes * 60,
    section,
    startedAt: Date.now(),
    questionStartedAt: Date.now(),
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => dispatch({ type: "TICK" }), 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const currentQuestion = questions[state.currentIndex];

  const logAttempt = useCallback(
    async (
      isCorrect: boolean,
      complianceLogged: boolean,
      mistakeAnalysis?: Attempt["mistakeAnalysis"],
    ) => {
      if (!currentQuestion) return;
      const db = await getDatabase();
      const timeSpentSeconds = Math.round(
        (Date.now() - state.questionStartedAt) / 1000,
      );

      const matchedQuestion = ALL_QUESTIONS.find(
        (q) => q.id === currentQuestion.id,
      );
      if (matchedQuestion) {
        const now = Date.now();
        const rating: ReviewRating = isCorrect ? 3 : 1;
        const correctOption = matchedQuestion.options.find(
          (o) => o.key === matchedQuestion.answerKey,
        );
        const existing = await db.flashcards
          .findOne({ selector: { id: `qcard-${matchedQuestion.id}` } })
          .exec();
        const base: Flashcard = {
          id: `qcard-${matchedQuestion.id}`,
          front: matchedQuestion.stem,
          back: `${correctOption?.text ?? ""}\n\n${
            matchedQuestion.rationales[matchedQuestion.answerKey] ?? ""
          }`,
          stability: existing?.get("stability") ?? 2.5,
          difficulty: existing?.get("difficulty") ?? 5,
          elapsedDays: existing?.get("elapsedDays") ?? 0,
          scheduledDays: existing?.get("scheduledDays") ?? 0,
          reps: existing?.get("reps") ?? 0,
          lapses: existing?.get("lapses") ?? 0,
          state: (existing?.get("state") as 0 | 1 | 2 | 3) ?? 0,
          dueDate: existing?.get("dueDate") ?? now,
          contentCategoryId: matchedQuestion.contentCategoryId,
          section: matchedQuestion.section,
        };
        const scheduled = scheduleFlashcard(base, rating, now);
        await db.flashcards.upsert(scheduled);

        const attempt: Attempt = {
          id: uuidv4(),
          userId: "offline-user",
          questionId: matchedQuestion.id,
          section: matchedQuestion.section,
          contentCategoryId: matchedQuestion.contentCategoryId,
          selectedOption: state.selectedAnswer,
          isCorrect,
          timeMs: timeSpentSeconds * 1000,
          mode: "full-length",
          timestamp: now,
          complianceLogged,
          mistakeAnalysis,
        };
        await db.attempts.insert(attempt);
      }
    },
    [currentQuestion, state.selectedAnswer, state.questionStartedAt],
  );

  return {
    state,
    dispatch,
    currentQuestion,
    logAttempt,
    totalQuestions: questions.length,
  };
}
