import { useCallback, useEffect, useState } from "react";
import { getDatabase } from "../../database";
import {
  countFlashcardsByType,
  countFlashcardsInDeck,
  ensureFlashcardDeck,
  fetchDueFlashcards,
} from "../../database/flashcardDeck";
import type { Flashcard } from "../../types";
import { scheduleFlashcard, type ReviewRating } from "./fsrs";
import { isClozeCard, renderClozeFront, stripClozeMarkup } from "./cloze";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";

function CardFace({ card, revealed }: { card: Flashcard; revealed: boolean }) {
  const cloze = isClozeCard(card.front);

  if (cloze) {
    return (
      <div className="text-lg leading-relaxed">
        {renderClozeFront(card.front, { reveal: revealed })}
      </div>
    );
  }

  return <div className="text-lg leading-relaxed">{revealed ? card.back : card.front}</div>;
}

const RATING_STYLES: Record<ReviewRating, string> = {
  1: "hover:bg-red-50 hover:border-red-300 hover:text-red-700",
  2: "hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700",
  3: "hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700",
  4: "hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700",
};

export function FlashcardReview() {
  const [sessionQueue, setSessionQueue] = useState<Flashcard[]>([]);
  const [totalInDeck, setTotalInDeck] = useState(0);
  const [regularCount, setRegularCount] = useState(0);
  const [practiceCount, setPracticeCount] = useState(0);
  const [duePracticeCount, setDuePracticeCount] = useState(0);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [initialSessionSize, setInitialSessionSize] = useState(0);

  const startSession = useCallback(async () => {
    const db = await getDatabase();
    await ensureFlashcardDeck(db);
    const due = await fetchDueFlashcards(db);
    const total = await countFlashcardsInDeck(db);
    const byType = await countFlashcardsByType(db);
    setSessionQueue(due);
    setInitialSessionSize(due.length);
    setTotalInDeck(total);
    setRegularCount(byType.regular);
    setPracticeCount(byType.practice);
    setDuePracticeCount(byType.duePractice);
    setReviewedCount(0);
    setShowBack(false);
  }, []);

  useEffect(() => {
    void startSession();
  }, [startSession]);

  const current = sessionQueue[0] ?? null;

  const rate = async (rating: ReviewRating) => {
    if (!current) return;
    const updated = scheduleFlashcard(current, rating);
    const db = await getDatabase();
    const doc = await db.flashcards.findOne(current.id).exec();
    if (doc) {
      await doc.patch(updated);
    }

    if (rating === 1) {
      setSessionQueue([...sessionQueue.slice(1), updated]);
    } else {
      setSessionQueue(sessionQueue.slice(1));
      setReviewedCount((n) => n + 1);
    }
    setShowBack(false);
  };

  if (!current) {
    return (
      <div className="mx-auto max-w-xl animate-scale-in text-center">
        <PageHeader title="Flashcards" subtitle="Spaced repetition review queue" />
        <Card hover={false} className="py-10">
          <div className="animate-float mb-4 text-5xl">🎉</div>
          {reviewedCount > 0 ? (
            <>
              <p className="text-lg font-bold text-emerald-700">Session complete!</p>
              <p className="mt-1 text-sm text-slate-500">
                You reviewed {reviewedCount} card(s) this session.
              </p>
            </>
          ) : (
            <p className="text-slate-600">No flashcards due right now. Great work!</p>
          )}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span className="rounded-full bg-slate-100 px-2.5 py-1">
              {regularCount} regular
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1">
              {practiceCount} from practice
            </span>
            {duePracticeCount > 0 && (
              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-700">
                {duePracticeCount} practice due
              </span>
            )}
          </div>
          <p className="mt-3 text-sm text-slate-400">{totalInDeck} total cards in your deck</p>
          <Button className="mt-6" onClick={() => void startSession()}>
            Check for due cards
          </Button>
        </Card>
      </div>
    );
  }

  const cloze = isClozeCard(current.front);
  const cardNumber = reviewedCount + 1;
  const remaining = sessionQueue.length;
  const progressPct =
    initialSessionSize > 0 ? Math.round((reviewedCount / initialSessionSize) * 100) : 0;

  return (
    <div className="mx-auto max-w-xl">
      <PageHeader title="Flashcards" subtitle="Rate each card to schedule your next review" />

      <Card hover={false} className="animate-scale-in">
        <div className="mb-4 flex items-center justify-between text-xs font-medium text-slate-500">
          <span>
            Card {cardNumber} of {initialSessionSize || remaining}
          </span>
          <span>{remaining} remaining</span>
        </div>

        <div className="mb-3 flex items-center gap-2">
          {current.id.startsWith("qcard-") ? (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
              Practice question
            </span>
          ) : (
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
              Flashcard
            </span>
          )}
        </div>

        <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#3399ff] to-[#06b6d4] transition-all duration-500 ease-out"
            style={{ width: `${Math.max(progressPct, 100 / (initialSessionSize || 1))}%` }}
          />
        </div>

        <div
          className={`flashcard-flip mb-4 min-h-[120px] rounded-xl bg-gradient-to-br from-slate-50 to-blue-50/50 p-6 ${showBack ? "flashcard-flip-revealed" : ""}`}
        >
          <CardFace card={current} revealed={showBack} />
        </div>

        {showBack && (
          <div className="animate-fade-in-up mb-4 rounded-xl border border-[#3399ff]/20 bg-[#3399ff]/5 p-4 text-sm">
            {cloze ? (
              <>
                <p className="mb-1 font-semibold text-[#003366]">Answer</p>
                <p>{stripClozeMarkup(current.front)}</p>
                {current.back && current.back !== stripClozeMarkup(current.front) && (
                  <p className="mt-2 text-slate-600">{current.back}</p>
                )}
              </>
            ) : (
              <>
                <p className="mb-1 font-semibold text-[#003366]">Answer</p>
                <p>{current.back}</p>
              </>
            )}
          </div>
        )}

        {!showBack ? (
          <Button className="w-full" onClick={() => setShowBack(true)}>
            Show Answer
          </Button>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {(
              [
                [1, "Again"],
                [2, "Hard"],
                [3, "Good"],
                [4, "Easy"],
              ] as const
            ).map(([r, label]) => (
              <button
                key={r}
                type="button"
                className={`rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-medium transition-all duration-200 ${RATING_STYLES[r]}`}
                onClick={() => void rate(r)}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
