import { setup, assign } from "xstate";
import type { MistakeAnalysis } from "../../types";

export interface GuaranteeContext {
  guaranteeModeActive: boolean;
  pendingAnalysis: Partial<MistakeAnalysis> | null;
  lastErrorQuestionId: string | null;
}

export type GuaranteeEvent =
  | { type: "TOGGLE_GUARANTEE"; active: boolean }
  | { type: "INCORRECT_ANSWER"; questionId: string }
  | { type: "UPDATE_FIELD"; field: keyof MistakeAnalysis; value: string }
  | { type: "SUBMIT_ANALYSIS" }
  | { type: "DISMISS" }
  | { type: "RESET" };

function isAnalysisComplete(analysis: Partial<MistakeAnalysis> | null): boolean {
  if (!analysis) return false;
  return Boolean(
    analysis.infoGap?.trim() &&
      analysis.distractorTrap?.trim() &&
      analysis.preventiveRule?.trim(),
  );
}

export const guaranteeMachine = setup({
  types: {
    context: {} as GuaranteeContext,
    events: {} as GuaranteeEvent,
  },
  guards: {
    analysisComplete: ({ context }) =>
      isAnalysisComplete(context.pendingAnalysis),
  },
  actions: {
    setGuarantee: assign({
      guaranteeModeActive: ({ event }) =>
        event.type === "TOGGLE_GUARANTEE" ? event.active : false,
    }),
    startBlockade: assign({
      lastErrorQuestionId: ({ event }) =>
        event.type === "INCORRECT_ANSWER" ? event.questionId : null,
      pendingAnalysis: () => ({
        infoGap: "",
        distractorTrap: "",
        preventiveRule: "",
      }),
    }),
    updateField: assign({
      pendingAnalysis: ({ context, event }) => {
        if (event.type !== "UPDATE_FIELD") return context.pendingAnalysis;
        return {
          ...context.pendingAnalysis,
          [event.field]: event.value,
        };
      },
    }),
    clearBlockade: assign({
      pendingAnalysis: () => null,
      lastErrorQuestionId: () => null,
    }),
  },
}).createMachine({
  id: "guaranteeMode",
  initial: "idle",
  context: {
    guaranteeModeActive: false,
    pendingAnalysis: null,
    lastErrorQuestionId: null,
  },
  on: {
    TOGGLE_GUARANTEE: [
      {
        guard: ({ event }) => event.type === "TOGGLE_GUARANTEE" && !event.active,
        target: ".idle",
        actions: ["setGuarantee", "clearBlockade"],
      },
      { actions: "setGuarantee" },
    ],
    RESET: {
      target: ".idle",
      actions: "clearBlockade",
    },
  },
  states: {
    idle: {
      on: {
        INCORRECT_ANSWER: {
          target: "blocked",
          actions: "startBlockade",
        },
      },
    },
    blocked: {
      on: {
        UPDATE_FIELD: { actions: "updateField" },
        SUBMIT_ANALYSIS: {
          guard: "analysisComplete",
          target: "idle",
          actions: "clearBlockade",
        },
        DISMISS: {
          target: "idle",
          actions: "clearBlockade",
        },
        RESET: {
          target: "idle",
          actions: "clearBlockade",
        },
      },
    },
  },
});

export function buildMistakeAnalysis(
  pending: Partial<MistakeAnalysis> | null,
): MistakeAnalysis | null {
  if (!isAnalysisComplete(pending)) return null;
  return {
    infoGap: pending!.infoGap!.trim(),
    distractorTrap: pending!.distractorTrap!.trim(),
    preventiveRule: pending!.preventiveRule!.trim(),
  };
}
