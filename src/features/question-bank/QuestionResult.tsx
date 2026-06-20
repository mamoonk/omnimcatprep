import type { Question } from "../../types/question";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";

interface Props {
  question: Question;
  selectedOption: string;
  isCorrect: boolean;
  onNext: () => void;
  isLast: boolean;
}

export function QuestionResult({
  question,
  selectedOption,
  isCorrect,
  onNext,
  isLast,
}: Props) {
  return (
    <div className="mx-auto max-w-3xl">
      <div
        className={`mb-4 rounded-xl border p-4 text-center text-sm font-bold ${
          isCorrect
            ? "border-emerald-300 bg-emerald-50 text-emerald-800"
            : "border-red-300 bg-red-50 text-red-800"
        }`}
      >
        {isCorrect ? "Correct!" : "Incorrect"}
      </div>

      <Card hover={false} className="mb-4">
        <p className="mb-3 text-lg font-medium">{question.stem}</p>

        <div className="space-y-2">
          {question.options.map((option) => {
            const isSelected = option.key === selectedOption;
            const isAnswer = option.key === question.answerKey;

            let borderClass = "border-slate-200 bg-white";
            if (isSelected && isCorrect) {
              borderClass = "border-emerald-400 bg-emerald-50";
            } else if (isSelected && !isCorrect) {
              borderClass = "border-red-400 bg-red-50";
            } else if (isAnswer) {
              borderClass = "border-emerald-400 bg-emerald-50";
            }

            return (
              <div
                key={option.key}
                className={`rounded-xl border px-4 py-3 text-sm ${borderClass}`}
              >
                <span className="mr-2 font-bold text-slate-500">
                  {option.key}.
                </span>
                {option.text}
                {isAnswer && (
                  <span className="ml-2 text-xs font-semibold text-emerald-600">
                    ✓ Correct answer
                  </span>
                )}
                {isSelected && !isCorrect && (
                  <span className="ml-2 text-xs font-semibold text-red-600">
                    ← Your answer
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {question.rationales && Object.keys(question.rationales).length > 0 && (
        <Card hover={false} className="mb-4">
          <h3 className="mb-2 text-sm font-bold text-slate-600">
            Explanations
          </h3>
          <div className="space-y-3 text-sm leading-relaxed text-slate-700">
            {Object.entries(question.rationales).map(([key, text]) => (
              <div key={key}>
                <strong className="text-slate-500">{key}:</strong> {text}
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="flex justify-end">
        <Button onClick={onNext}>
          {isLast ? "See Summary" : "Next Question"}
        </Button>
      </div>
    </div>
  );
}
