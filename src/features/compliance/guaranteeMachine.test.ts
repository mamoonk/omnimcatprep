import { describe, it, expect, beforeEach } from "vitest";
import { createActor } from "xstate";
import { guaranteeMachine, buildMistakeAnalysis } from "./guaranteeMachine";

describe("Guarantee Mode state machine", () => {
  beforeEach(() => {
    const actor = createActor(guaranteeMachine);
    actor.start();
    actor.send({ type: "TOGGLE_GUARANTEE", active: true });
    actor.stop();
  });

  it("enters blocked state on incorrect answer", () => {
    const actor = createActor(guaranteeMachine);
    actor.start();
    actor.send({ type: "INCORRECT_ANSWER", questionId: "q-1" });
    expect(actor.getSnapshot().matches("blocked")).toBe(true);
    actor.stop();
  });

  it("requires all three analysis fields before submit", () => {
    const actor = createActor(guaranteeMachine);
    actor.start();
    actor.send({ type: "TOGGLE_GUARANTEE", active: true });
    actor.send({ type: "INCORRECT_ANSWER", questionId: "q-1" });
    actor.send({ type: "UPDATE_FIELD", field: "infoGap", value: "gap" });
    actor.send({ type: "SUBMIT_ANALYSIS" });
    expect(actor.getSnapshot().matches("blocked")).toBe(true);

    actor.send({ type: "UPDATE_FIELD", field: "distractorTrap", value: "trap" });
    actor.send({ type: "UPDATE_FIELD", field: "preventiveRule", value: "rule" });
    actor.send({ type: "SUBMIT_ANALYSIS" });
    expect(actor.getSnapshot().matches("idle")).toBe(true);
    actor.stop();
  });
});

describe("buildMistakeAnalysis", () => {
  it("returns null for incomplete analysis", () => {
    expect(buildMistakeAnalysis({ infoGap: "a" })).toBeNull();
  });

  it("returns trimmed analysis when complete", () => {
    const result = buildMistakeAnalysis({
      infoGap: " gap ",
      distractorTrap: " trap ",
      preventiveRule: " rule ",
    });
    expect(result).toEqual({
      infoGap: "gap",
      distractorTrap: "trap",
      preventiveRule: "rule",
    });
  });
});
