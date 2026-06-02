interface ExitExamModalProps {
  open: boolean;
  currentQuestion: number;
  totalQuestions: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ExitExamModal({
  open,
  currentQuestion,
  totalQuestions,
  onConfirm,
  onCancel,
}: ExitExamModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-exam-title"
    >
      <div className="animate-scale-in mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <h2 id="exit-exam-title" className="text-lg font-bold text-[#003366]">
          End practice session?
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          You are on question {currentQuestion} of {totalQuestions}. Any unanswered question
          will not be saved. Submitted answers are already stored locally.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Continue exam
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Exit exam
          </button>
        </div>
      </div>
    </div>
  );
}
