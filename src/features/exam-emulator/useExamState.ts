import { useCallback, useEffect, useReducer, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import type { ExamQuestion, McatSection, QuestionLog } from "../../types";
import { getDatabase } from "../../database";
import { SECTION_DURATIONS_MINUTES } from "./styles";

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
      mistakeAnalysis?: QuestionLog["mistakeAnalysis"],
    ) => {
      if (!currentQuestion) return;
      const db = await getDatabase();
      const timeSpentSeconds = Math.round(
        (Date.now() - state.questionStartedAt) / 1000,
      );
      const log: QuestionLog = {
        id: uuidv4(),
        questionId: currentQuestion.id,
        section: currentQuestion.section,
        isCorrect,
        selectedAnswer: state.selectedAnswer ?? undefined,
        timeSpentSeconds,
        timestamp: Date.now(),
        complianceLogged,
        mistakeAnalysis,
        errorType: isCorrect ? undefined : "content_gap",
      };
      await db.question_logs.insert(log);
      return log;
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
