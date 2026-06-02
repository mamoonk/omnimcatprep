import { describe, expect, it } from "vitest";
import type { QuestionLog } from "../../types";
import {
  buildAccuracyTrend,
  buildDailyActivity,
  computeActiveDayStreak,
  computePracticeAnalytics,
  toDateKey,
} from "./analytics";

const DAY = 86_400_000;

function log(
  overrides: Partial<QuestionLog> & Pick<QuestionLog, "timestamp" | "isCorrect">,
): QuestionLog {
  return {
    id: "id",
    questionId: "q-1",
    section: "bio-biochem",
    timeSpentSeconds: 60,
    complianceLogged: false,
    ...overrides,
  };
}

describe("dashboard analytics", () => {
  it("groups daily activity for the last N days", () => {
    const now = new Date("2026-06-02T12:00:00").getTime();
    const logs = [
      log({ timestamp: now, isCorrect: true }),
      log({ timestamp: now - DAY, isCorrect: false, errorType: "content_gap" }),
    ];

    const activity = buildDailyActivity(logs, 3, now);
    expect(activity).toHaveLength(3);
    expect(activity[2].attempts).toBe(1);
    expect(activity[1].attempts).toBe(1);
    expect(activity[0].attempts).toBe(0);
  });

  it("computes active-day streak including today", () => {
    const now = new Date("2026-06-02T12:00:00").getTime();
    const logs = [
      log({ timestamp: now, isCorrect: true }),
      log({ timestamp: now - DAY, isCorrect: true }),
      log({ timestamp: now - 2 * DAY, isCorrect: false }),
    ];

    expect(computeActiveDayStreak(logs, now)).toBe(3);
  });

  it("builds rolling and cumulative accuracy trend", () => {
    const sorted = [
      log({ timestamp: 1, isCorrect: true }),
      log({ timestamp: 2, isCorrect: false }),
      log({ timestamp: 3, isCorrect: true }),
    ];

    const trend = buildAccuracyTrend(sorted, 2);
    expect(trend[0].rollingAccuracy).toBe(100);
    expect(trend[1].rollingAccuracy).toBe(50);
    expect(trend[2].cumulativeAccuracy).toBe(67);
  });

  it("summarizes practice metrics", () => {
    const now = new Date("2026-06-02T12:00:00").getTime();
    const logs = [
      log({
        timestamp: now,
        isCorrect: false,
        section: "cars",
        complianceLogged: true,
        errorType: "cognitive_trap",
      }),
      log({ timestamp: now - DAY, isCorrect: true, section: "cars" }),
    ];

    const stats = computePracticeAnalytics(logs, now);
    expect(stats.totalAttempts).toBe(2);
    expect(stats.accuracyPct).toBe(50);
    expect(stats.complianceCount).toBe(1);
    expect(stats.errorBreakdown).toHaveLength(1);
    expect(stats.errorBreakdown[0].type).toBe("cognitive_trap");
  });

  it("formats stable date keys", () => {
    const ts = new Date("2026-01-05T08:00:00").getTime();
    expect(toDateKey(ts)).toBe("2026-01-05");
  });
});
