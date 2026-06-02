import { describe, it, expect } from "vitest";
import {
  calculateIntervalDays,
  scheduleFlashcard,
  countOverdueFlashcards,
  shouldBlockNewPractice,
  TARGET_RETRIEVABILITY,
  OVERDUE_BLOCK_THRESHOLD,
} from "./fsrs";
import type { Flashcard } from "../../types";

describe("FSRS interval formula", () => {
  it("computes I(s, r) = s * ln(r) / ln(0.9)", () => {
    const stability = 10;
    const interval = calculateIntervalDays(stability, TARGET_RETRIEVABILITY);
    const expected =
      (stability * Math.log(TARGET_RETRIEVABILITY)) / Math.log(0.9);
    expect(interval).toBe(Math.max(1, Math.round(expected)));
  });

  it("returns minimum 1 day for low stability", () => {
    expect(calculateIntervalDays(0)).toBe(1);
  });
});

describe("scheduleFlashcard", () => {
  const base: Flashcard = {
    id: "1",
    front: "Q",
    back: "A",
    stability: 2,
    difficulty: 5,
    state: 0,
    dueDate: Date.now(),
    reps: 0,
    lapses: 0,
  };

  it("increases stability on good rating", () => {
    const updated = scheduleFlashcard(base, 3);
    expect(updated.stability).toBeGreaterThan(base.stability);
    expect(updated.dueDate).toBeGreaterThan(Date.now());
  });

  it("decreases stability on again rating", () => {
    const updated = scheduleFlashcard(base, 1);
    expect(updated.stability).toBeLessThan(base.stability);
    expect(updated.lapses).toBe(1);
  });
});

describe("overdue guard", () => {
  it("blocks when overdue exceeds threshold", () => {
    expect(shouldBlockNewPractice(OVERDUE_BLOCK_THRESHOLD + 1)).toBe(true);
    expect(shouldBlockNewPractice(OVERDUE_BLOCK_THRESHOLD)).toBe(false);
  });

  it("counts overdue cards", () => {
    const now = Date.now();
    const cards: Flashcard[] = [
      { ...({} as Flashcard), id: "a", dueDate: now - 1, front: "", back: "", stability: 1, difficulty: 1, state: 0 },
      { ...({} as Flashcard), id: "b", dueDate: now + 1000, front: "", back: "", stability: 1, difficulty: 1, state: 0 },
    ];
    expect(countOverdueFlashcards(cards, now)).toBe(1);
  });
});
