import type { Flashcard, FlashcardState } from "../../types";

/** Target retrievability threshold (r) per spec */
export const TARGET_RETRIEVABILITY = 0.9;

/**
 * FSRS interval: I(s, r) = s * ln(r) / ln(0.9)
 * Returns interval in days.
 */
export function calculateIntervalDays(
  stability: number,
  retrievability: number = TARGET_RETRIEVABILITY,
): number {
  if (stability <= 0) return 1;
  const interval = (stability * Math.log(retrievability)) / Math.log(0.9);
  return Math.max(1, Math.round(interval));
}

export type ReviewRating = 1 | 2 | 3 | 4; // Again, Hard, Good, Easy

export function scheduleFlashcard(
  card: Flashcard,
  rating: ReviewRating,
  now: number = Date.now(),
): Flashcard {
  let { stability, difficulty, state, reps = 0, lapses = 0, elapsedDays = 0 } =
    card;

  if (rating === 1) {
    lapses += 1;
    stability = Math.max(0.5, stability * 0.5);
    difficulty = Math.min(10, difficulty + 0.5);
    state = 3 as FlashcardState;
    elapsedDays = 0;
  } else {
    reps += 1;
    const multiplier = rating === 4 ? 1.3 : rating === 3 ? 1.0 : 0.8;
    stability = Math.max(0.5, stability * multiplier + 0.5);
    difficulty = Math.max(1, difficulty - (rating === 4 ? 0.2 : 0));
    state = reps < 2 ? (1 as FlashcardState) : (2 as FlashcardState);
    elapsedDays = card.scheduledDays ?? 0;
  }

  const scheduledDays = calculateIntervalDays(stability);
  const dueDate =
    rating === 1
      ? now + 10 * 60 * 1000 // re-learn in 10 minutes if session reloads
      : now + scheduledDays * 86_400_000;

  return {
    ...card,
    stability,
    difficulty,
    elapsedDays,
    scheduledDays,
    reps,
    lapses,
    state,
    dueDate,
  };
}

export function countOverdueFlashcards(
  cards: Flashcard[],
  now: number = Date.now(),
): number {
  return cards.filter((c) => c.dueDate < now).length;
}

export const OVERDUE_BLOCK_THRESHOLD = 200;

export function shouldBlockNewPractice(overdueCount: number): boolean {
  return overdueCount > OVERDUE_BLOCK_THRESHOLD;
}
