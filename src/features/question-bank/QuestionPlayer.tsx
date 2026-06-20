import { useCallback, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import type { Attempt } from "../../types/attempt";
import type { Flashcard } from "../../types";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { ALL_QUESTIONS } from "../../data/questions";
import { getCategoryById } from "../../data/aamc-taxonomy";
import { getDatabase } from "../../database";
import { scheduleFlashcard } from "../flashcards/fsrs";
import type { ReviewRating } from "../flashcards/fsrs";
import { QuestionResult } from "./QuestionResult";
import { SetSummary } from "./SetSummary";

interface PlayerAnswer {
  questionId: string;
  selectedOption: string | null;
  isCorrect: boolean;
  timeMs: number;
}

function selectQuestionsWithCoverage(
  questions: typeof ALL_QUESTIONS,
  count: number,
): typeof ALL_QUESTIONS {
  if (questions.length <= count) {
    return [...questions].sort(() => Math.random() - 0.5);
  }

  const byCategory = new Map<string, typeof ALL_QUESTIONS>();
  for (const q of questions) {
    const list = byCategory.get(q.contentCategoryId) ?? [];
    list.push(q);
    byCategory.set(q.contentCategoryId, list);
  }

  // Shuffle within each category
  for (const [key, list] of byCategory.entries()) {
    byCategory.set(
      key,
      list.sort(() => Math.random() - 0.5),
    );
  }

  const categories = Array.from(byCategory.keys()).sort(
    () => Math.random() - 0.5,
  );
  const selected: typeof ALL_QUESTIONS = [];
  const usedIds = new Set<string>();

  while (selected.length < count && usedIds.size < questions.length) {
    let addedThisRound = false;
    for (const cat of categories) {
      if (selected.length >= count) break;
      const available = byCategory
        .get(cat)
        ?.filter((q) => !usedIds.has(q.id));
      if (available && available.length > 0) {
        const pick = available[0];
        selected.push(pick);
        usedIds.add(pick.id);
        addedThisRound = true;
      }
    }
    if (!addedThisRound) break;
  }

  return selected;
}

export function QuestionPlayer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const mode = (searchParams.get("mode") ?? "tutor") as "tutor" | "timed";
  const section = searchParams.get("section") ?? "";
  const categoryId = searchParams.get("category") ?? "";
  const difficulty = searchParams.get("difficulty") ?? "";
  const questionFormat = searchParams.get("format") ?? "";
  const count = Math.max(1, Number(searchParams.get("count") ?? 10));

  const questions = useMemo(() => {
    const filtered = ALL_QUESTIONS.filter((q) => {
      if (section && q.section !== section) return false;
      if (categoryId && q.contentCategoryId !== categoryId) return false;
      if (difficulty && q.difficultyTarget !== difficulty) return false;
      if (questionFormat && q.format !== questionFormat) return false;
      return true;
    });
    return selectQuestionsWithCoverage(filtered, count);
  }, [section, categoryId, difficulty, questionFormat, count]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<PlayerAnswer[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [showSummary, setShowSummary] = useState(false);

  const current = questions[currentIndex] ?? null;
  const isLast = currentIndex >= questions.length - 1;

  const upsertFlashcard = useCallback(
    async (question: typeof current, correct: boolean) => {
      if (!question) return;
      const db = await getDatabase();
      const existing = await db.flashcards
        .findOne({ selector: { id: `qcard-${question.id}` } })
        .exec();
      const now = Date.now();
      const rating: ReviewRating = correct ? 3 : 1;
      const correctOption = question.options.find(
        (o) => o.key === question.answerKey,
      );
      const backText = `${correctOption?.text ?? ""}\n\n${
        question.rationales[question.answerKey] ?? ""
      }`;

      const base: Flashcard = {
        id: `qcard-${question.id}`,
        front: question.stem,
        back: backText,
        stability: existing?.get("stability") ?? 2.5,
        difficulty: existing?.get("difficulty") ?? 5,
        elapsedDays: existing?.get("elapsedDays") ?? 0,
        scheduledDays: existing?.get("scheduledDays") ?? 0,
        reps: existing?.get("reps") ?? 0,
        lapses: existing?.get("lapses") ?? 0,
        state: (existing?.get("state") as 0 | 1 | 2 | 3) ?? 0,
        dueDate: existing?.get("dueDate") ?? now,
        contentCategoryId: question.contentCategoryId,
        section: question.section,
      };
      const scheduled = scheduleFlashcard(base, rating, now);
      await db.flashcards.upsert(scheduled);
    },
    [],
  );

  const handleSubmit = useCallback(async () => {
    if (!current || !selectedOption) return;
    const isCorrect = selectedOption === current.answerKey;
    const timeMs = Date.now() - questionStartTime;

    const db = await getDatabase();
    const attempt: Attempt = {
      id: uuidv4(),
      userId: "local",
      questionId: current.id,
      section: current.section,
      contentCategoryId: current.contentCategoryId,
      selectedOption,
      isCorrect,
      timeMs,
      mode: mode === "tutor" ? "tutor" : "timed",
      timestamp: Date.now(),
      complianceLogged: false,
    };
    await db.attempts.insert(attempt);
    await upsertFlashcard(current, isCorrect);

    const answer: PlayerAnswer = {
      questionId: current.id,
      selectedOption,
      isCorrect,
      timeMs,
    };

    if (mode === "tutor") {
      setAnswers((prev) => [...prev, answer]);
      setSubmitted(true);
    } else {
      setAnswers((prev) => [...prev, answer]);
      if (isLast) {
        setShowSummary(true);
      } else {
        setCurrentIndex((i) => i + 1);
        setSelectedOption(null);
        setQuestionStartTime(Date.now());
      }
    }
  }, [current, selectedOption, mode, questionStartTime, isLast]);

  const handleNext = useCallback(() => {
    if (isLast) {
      setShowSummary(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setSubmitted(false);
      setQuestionStartTime(Date.now());
    }
  }, [isLast]);

  if (questions.length === 0) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <PageHeader title="No questions found" />
        <p className="mb-4 text-slate-600">
          Try adjusting your filters to find practice questions.
        </p>
        <Button onClick={() => navigate("/practice")}>
          Back to filters
        </Button>
      </div>
    );
  }

  if (showSummary) {
    return (
      <SetSummary
        answers={answers}
        questions={questions}
        mode={mode}
        onBackToFilters={() => navigate("/practice")}
      />
    );
  }

  if (mode === "tutor" && submitted && current) {
    const answer = answers[answers.length - 1];
    return (
      <QuestionResult
        question={current}
        selectedOption={answer.selectedOption ?? ""}
        isCorrect={answer.isCorrect}
        onNext={handleNext}
        isLast={isLast}
      />
    );
  }

  if (!current) return null;

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Practice Session"
        subtitle={`${mode === "tutor" ? "Tutor" : "Timed"} mode · Question ${currentIndex + 1} of ${questions.length}`}
      />

      <Card hover={false} className="mb-4">
        <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
          <span>
            {getCategoryById(current.contentCategoryId)?.name ??
              current.section}
          </span>
          <span>
            {current.difficultyTarget} · {current.format}
          </span>
        </div>

        <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#3399ff] to-[#06b6d4] transition-all duration-500"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        {current.format === "passage-based" && current.stem.length > 200 && (
          <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed">
            {current.stem.split(/\n/)[0]}
            {current.stem.includes("\n") && (
              <span className="mt-2 block text-xs text-slate-400">
                (Passage excerpt shown; answer choices below)
              </span>
            )}
          </div>
        )}

        <p className="mb-4 text-base font-medium">{current.stem}</p>

        <div className="space-y-2">
          {current.options.map((option) => {
            const selected = selectedOption === option.key;
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => setSelectedOption(option.key)}
                className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                  selected
                    ? "border-[#003366] bg-[#e0e8f0] font-medium"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <span className="mr-2 font-bold text-slate-500">
                  {option.key}.
                </span>
                {option.text}
              </button>
            );
          })}
        </div>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="secondary"
          onClick={() => navigate("/practice")}
        >
          Exit
        </Button>
        <Button
          disabled={!selectedOption}
          onClick={() => void handleSubmit()}
        >
          {mode === "timed"
            ? isLast
              ? "See Results"
              : "Next"
            : "Submit Answer"}
        </Button>
      </div>
    </div>
  );
}
