import type { Question } from "../../types/question";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";

interface PlayerAnswer {
  questionId: string;
  selectedOption: string | null;
  isCorrect: boolean;
  timeMs: number;
}

interface Props {
  answers: PlayerAnswer[];
  questions: Question[];
  mode: "tutor" | "timed";
  onBackToFilters: () => void;
}

export function SetSummary({
  answers,
  questions,
  mode,
  onBackToFilters,
}: Props) {
  const total = questions.length;
  const correct = answers.filter((a) => a.isCorrect).length;
  const incorrect = total - correct;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  const totalTimeMs = answers.reduce((sum, a) => sum + a.timeMs, 0);
  const avgTimePerQuestion = total > 0 ? totalTimeMs / total : 0;

  return (
    <div className="mx-auto max-w-3xl">
      <Card hover={false} className="mb-6 text-center">
        <h1 className="mb-2 text-2xl font-bold text-[#003366]">
          Session Complete
        </h1>
        <p className="text-sm text-slate-500">
          {mode === "tutor" ? "Tutor mode" : "Timed mode"} · {total} questions
        </p>
      </Card>

      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        {[
          { label: "Correct", value: correct, color: "text-emerald-600" },
          { label: "Incorrect", value: incorrect, color: "text-red-600" },
          { label: "Accuracy", value: `${accuracy}%`, color: "text-[#003366]" },
          {
            label: "Avg time",
            value: `${(avgTimePerQuestion / 1000).toFixed(1)}s`,
            color: "text-slate-600",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-3 text-center"
          >
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-xs text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <Card hover={false}>
        <h3 className="mb-3 text-sm font-bold text-slate-600">
          Question Review
        </h3>
        <div className="space-y-2">
          {questions.map((q, i) => {
            const answer = answers.find((a) => a.questionId === q.id);
            return (
              <div
                key={q.id}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${
                  answer?.isCorrect
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                    answer?.isCorrect ? "bg-emerald-500" : "bg-red-500"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="flex-1 truncate">{q.stem}</span>
                <span className="text-xs text-slate-500">
                  {answer?.isCorrect ? "Correct" : "Incorrect"}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="mt-6 flex justify-center">
        <Button onClick={onBackToFilters}>Practice More</Button>
      </div>
    </div>
  );
}
