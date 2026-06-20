import type { Flashcard, FlashcardState, McatSection, QuestionLog } from "../../types";
import type { Attempt } from "../../types/attempt";
import { countOverdueFlashcards } from "../flashcards/fsrs";
import { ALL_SECTIONS, sectionLabel } from "./sectionLabels";
import { ALL_QUESTIONS } from "../../data/questions";

const MS_PER_DAY = 86_400_000;

export function toDateKey(timestamp: number): string {
  const d = new Date(timestamp);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function startOfDay(timestamp: number): number {
  const d = new Date(timestamp);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function formatShortDate(dateKey: string): string {
  const [y, m, d] = dateKey.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export interface SectionStats {
  section: McatSection;
  label: string;
  accuracy: number;
  correct: number;
  total: number;
  avgTimeSeconds: number;
}

export interface DailyActivityPoint {
  dateKey: string;
  label: string;
  attempts: number;
  correct: number;
  accuracy: number;
}

export interface AccuracyTrendPoint {
  index: number;
  rollingAccuracy: number;
  cumulativeAccuracy: number;
}

export interface SkillStats {
  skill: string;
  label: string;
  accuracy: number;
  correct: number;
  total: number;
}

export interface PracticeAnalytics {
  totalAttempts: number;
  correctCount: number;
  incorrectCount: number;
  accuracyPct: number | null;
  avgTimeSeconds: number;
  attemptsToday: number;
  attemptsThisWeek: number;
  activeDayStreak: number;
  complianceCount: number;
  weakestSection: SectionStats | null;
  sectionStats: SectionStats[];
  dailyActivity: DailyActivityPoint[];
  accuracyTrend: AccuracyTrendPoint[];
  timeTrend: { index: number; seconds: number; section: McatSection }[];
  errorBreakdown: { type: string; label: string; count: number }[];
  sectionVolume: { section: McatSection; label: string; count: number }[];
  skillBreakdown: SkillStats[];
}

const FLASHCARD_STATE_LABELS: Record<FlashcardState, string> = {
  0: "New",
  1: "Learning",
  2: "Review",
  3: "Relearning",
};

const ERROR_LABELS: Record<string, string> = {
  content_gap: "Content gap",
  cognitive_trap: "Cognitive trap",
  unknown: "Unclassified",
};

export interface FlashcardAnalytics {
  totalCards: number;
  dueNow: number;
  overdueCount: number;
  totalReps: number;
  totalLapses: number;
  avgStability: number;
  avgDifficulty: number;
  byState: { state: FlashcardState; label: string; count: number }[];
}

/**
 * Converts Attempt[] to a QuestionLog-compatible array so analytics
 * functions can process both data sources uniformly.
 */
export function attemptsToLogs(attempts: Attempt[]): QuestionLog[] {
  return attempts.map((a) => ({
    id: a.id,
    questionId: a.questionId,
    section: a.section,
    isCorrect: a.isCorrect,
    selectedAnswer: a.selectedOption ?? undefined,
    timeSpentSeconds: Math.round(a.timeMs / 1000),
    timestamp: a.timestamp,
    complianceLogged: a.complianceLogged,
    mistakeAnalysis: a.mistakeAnalysis,
    errorType: a.isCorrect ? undefined : ("content_gap" as const),
  }));
}

export function computePracticeAnalytics(
  logs: QuestionLog[],
  now: number = Date.now(),
): PracticeAnalytics {
  const todayStart = startOfDay(now);
  const weekStart = todayStart - 6 * MS_PER_DAY;

  const attemptsToday = logs.filter((l) => l.timestamp >= todayStart).length;
  const attemptsThisWeek = logs.filter((l) => l.timestamp >= weekStart).length;
  const correctCount = logs.filter((l) => l.isCorrect).length;
  const incorrectCount = logs.length - correctCount;
  const complianceCount = logs.filter((l) => l.complianceLogged).length;

  const avgTimeSeconds =
    logs.length > 0
      ? Math.round(logs.reduce((s, l) => s + l.timeSpentSeconds, 0) / logs.length)
      : 0;

  const accuracyPct =
    logs.length > 0 ? Math.round((correctCount / logs.length) * 100) : null;

  const sectionStats = buildSectionStats(logs);
  const weakestSection =
    sectionStats
      .filter((s) => s.total > 0)
      .sort((a, b) => a.accuracy - b.accuracy || b.total - a.total)[0] ?? null;

  const sorted = [...logs].sort((a, b) => a.timestamp - b.timestamp);

  return {
    totalAttempts: logs.length,
    correctCount,
    incorrectCount,
    accuracyPct,
    avgTimeSeconds,
    attemptsToday,
    attemptsThisWeek,
    activeDayStreak: computeActiveDayStreak(logs, now),
    complianceCount,
    weakestSection,
    sectionStats,
    dailyActivity: buildDailyActivity(logs, 14, now),
    accuracyTrend: buildAccuracyTrend(sorted),
    timeTrend: sorted.map((log, i) => ({
      index: i + 1,
      seconds: log.timeSpentSeconds,
      section: log.section,
    })),
    errorBreakdown: buildErrorBreakdown(logs),
    sectionVolume: buildSectionVolume(logs),
    skillBreakdown: buildSkillBreakdown(logs),
  };
}

export function buildSectionStats(logs: QuestionLog[]): SectionStats[] {
  return ALL_SECTIONS.map((section) => {
    const sectionLogs = logs.filter((l) => l.section === section);
    const correct = sectionLogs.filter((l) => l.isCorrect).length;
    const total = sectionLogs.length;
    const avgTimeSeconds =
      total > 0
        ? Math.round(
            sectionLogs.reduce((s, l) => s + l.timeSpentSeconds, 0) / total,
          )
        : 0;
    return {
      section,
      label: sectionLabel(section),
      accuracy: total ? Math.round((correct / total) * 100) : 0,
      correct,
      total,
      avgTimeSeconds,
    };
  });
}

export function buildDailyActivity(
  logs: QuestionLog[],
  dayCount: number,
  now: number = Date.now(),
): DailyActivityPoint[] {
  const byDay = new Map<string, { attempts: number; correct: number }>();
  for (const log of logs) {
    const key = toDateKey(log.timestamp);
    const entry = byDay.get(key) ?? { attempts: 0, correct: 0 };
    entry.attempts += 1;
    if (log.isCorrect) entry.correct += 1;
    byDay.set(key, entry);
  }

  const points: DailyActivityPoint[] = [];
  const today = startOfDay(now);

  for (let offset = dayCount - 1; offset >= 0; offset -= 1) {
    const dateKey = toDateKey(today - offset * MS_PER_DAY);
    const entry = byDay.get(dateKey) ?? { attempts: 0, correct: 0 };
    points.push({
      dateKey,
      label: formatShortDate(dateKey),
      attempts: entry.attempts,
      correct: entry.correct,
      accuracy: entry.attempts
        ? Math.round((entry.correct / entry.attempts) * 100)
        : 0,
    });
  }

  return points;
}

export function computeActiveDayStreak(
  logs: QuestionLog[],
  now: number = Date.now(),
): number {
  if (logs.length === 0) return 0;

  const activeDays = new Set(logs.map((l) => toDateKey(l.timestamp)));
  let cursor = startOfDay(now);

  if (!activeDays.has(toDateKey(cursor))) {
    cursor -= MS_PER_DAY;
  }

  let streak = 0;
  while (activeDays.has(toDateKey(cursor))) {
    streak += 1;
    cursor -= MS_PER_DAY;
  }

  return streak;
}

export function buildAccuracyTrend(
  sortedLogs: QuestionLog[],
  windowSize = 5,
): AccuracyTrendPoint[] {
  return sortedLogs.map((_, i) => {
    const windowStart = Math.max(0, i - windowSize + 1);
    const window = sortedLogs.slice(windowStart, i + 1);
    const cumulative = sortedLogs.slice(0, i + 1);
    const windowCorrect = window.filter((l) => l.isCorrect).length;
    const cumulativeCorrect = cumulative.filter((l) => l.isCorrect).length;

    return {
      index: i + 1,
      rollingAccuracy: Math.round((windowCorrect / window.length) * 100),
      cumulativeAccuracy: Math.round((cumulativeCorrect / cumulative.length) * 100),
    };
  });
}

export function buildErrorBreakdown(
  logs: QuestionLog[],
): { type: string; label: string; count: number }[] {
  const incorrect = logs.filter((l) => !l.isCorrect);
  const counts = new Map<string, number>();

  for (const log of incorrect) {
    const type = log.errorType ?? "unknown";
    counts.set(type, (counts.get(type) ?? 0) + 1);
  }

  if (incorrect.length === 0) return [];

  return Array.from(counts.entries())
    .map(([type, count]) => ({
      type,
      label: ERROR_LABELS[type] ?? type,
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

export function buildSectionVolume(logs: QuestionLog[]): {
  section: McatSection;
  label: string;
  count: number;
}[] {
  return ALL_SECTIONS.map((section) => ({
    section,
    label: sectionLabel(section),
    count: logs.filter((l) => l.section === section).length,
  })).filter((entry) => entry.count > 0);
}

const SKILL_LABELS: Record<string, string> = {
  knowledge: "Knowledge",
  "scientific-reasoning": "Scientific Reasoning",
  "reasoning-about-design": "Reasoning About Design",
  "data-based-statistical-reasoning": "Data & Statistical Reasoning",
  "foundations-comprehension": "Foundations of Comprehension",
  "reasoning-within-text": "Reasoning Within Text",
  "reasoning-beyond-text": "Reasoning Beyond Text",
};

export function buildSkillBreakdown(logs: QuestionLog[]): SkillStats[] {
  const questionMap = new Map(ALL_QUESTIONS.map((q) => [q.id, q]));
  const bySkill = new Map<string, { correct: number; total: number }>();

  for (const log of logs) {
    const question = questionMap.get(log.questionId);
    if (!question) continue;
    const skill = question.skill;
    const entry = bySkill.get(skill) ?? { correct: 0, total: 0 };
    entry.total += 1;
    if (log.isCorrect) entry.correct += 1;
    bySkill.set(skill, entry);
  }

  return Array.from(bySkill.entries())
    .map(([skill, { correct, total }]) => ({
      skill,
      label: SKILL_LABELS[skill] ?? skill,
      accuracy: total ? Math.round((correct / total) * 100) : 0,
      correct,
      total,
    }))
    .sort((a, b) => a.accuracy - b.accuracy);
}

export function computeFlashcardAnalytics(
  cards: Flashcard[],
  now: number = Date.now(),
): FlashcardAnalytics {
  const dueNow = cards.filter((c) => c.dueDate <= now).length;
  const totalReps = cards.reduce((s, c) => s + (c.reps ?? 0), 0);
  const totalLapses = cards.reduce((s, c) => s + (c.lapses ?? 0), 0);
  const avgStability =
    cards.length > 0
      ? Math.round(
          (cards.reduce((s, c) => s + c.stability, 0) / cards.length) * 10,
        ) / 10
      : 0;
  const avgDifficulty =
    cards.length > 0
      ? Math.round(
          (cards.reduce((s, c) => s + c.difficulty, 0) / cards.length) * 10,
        ) / 10
      : 0;

  const stateCounts = new Map<FlashcardState, number>();
  for (const card of cards) {
    stateCounts.set(card.state, (stateCounts.get(card.state) ?? 0) + 1);
  }

  const byState = ([0, 1, 2, 3] as FlashcardState[])
    .map((state) => ({
      state,
      label: FLASHCARD_STATE_LABELS[state],
      count: stateCounts.get(state) ?? 0,
    }))
    .filter((entry) => entry.count > 0);

  return {
    totalCards: cards.length,
    dueNow,
    overdueCount: countOverdueFlashcards(cards, now),
    totalReps,
    totalLapses,
    avgStability,
    avgDifficulty,
    byState,
  };
}

export interface CategoryStats {
  categoryId: string;
  categoryName: string;
  label: string;
  accuracy: number;
  correct: number;
  total: number;
  avgTimeMs: number;
}

export function computeCategoryAnalytics(
  attempts: Attempt[],
  getCategoryById: (id: string) => { name: string; section: string } | undefined,
): CategoryStats[] {
  const byCategory = new Map<string, Attempt[]>();
  for (const a of attempts) {
    const existing = byCategory.get(a.contentCategoryId) ?? [];
    existing.push(a);
    byCategory.set(a.contentCategoryId, existing);
  }

  return Array.from(byCategory.entries())
    .map(([categoryId, catAttempts]) => {
      const correct = catAttempts.filter((a) => a.isCorrect).length;
      const total = catAttempts.length;
      const cat = getCategoryById(categoryId);
      const categoryName = cat?.name ?? categoryId;
      const section = cat?.section ?? "";
      const sectionPrefix = section ? `${sectionLabel(section as McatSection)} – ` : "";
      return {
        categoryId,
        categoryName,
        label: `${sectionPrefix}${categoryName}`,
        accuracy: total ? Math.round((correct / total) * 100) : 0,
        correct,
        total,
        avgTimeMs: total ? Math.round(catAttempts.reduce((s, a) => s + a.timeMs, 0) / total) : 0,
      };
    })
    .sort((a, b) => b.total - a.total);
}

export const CHART_COLORS = [
  "#3399ff",
  "#003366",
  "#06b6d4",
  "#6366f1",
  "#f59e0b",
  "#ef4444",
];
