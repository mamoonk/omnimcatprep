import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { setWizardHidden } from "./wizardPreferences";

const STEPS = [
  {
    title: "Welcome to MCAT Prep",
    subtitle:
      "This app runs entirely on your device. Practice exams, flashcards, and analytics all work offline.",
    demo: (
      <div className="flex justify-center gap-3 py-4">
        {["📝", "🃏", "📊", "🤖"].map((icon) => (
          <span
            key={icon}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 text-2xl shadow-sm"
          >
            {icon}
          </span>
        ))}
      </div>
    ),
    tip: "Use the navigation bar to jump between features anytime.",
  },
  {
    title: "Step 1 — Start a practice exam",
    subtitle:
      "Click Exam in the nav bar (or Start Practice on Home). You'll get a Pearson VUE-style split screen: passage on the left, question on the right.",
    demo: (
      <div className="overflow-hidden rounded-xl border border-slate-200 text-xs">
        <div className="bg-[#003366] px-3 py-1.5 text-white">MCAT Practice · 94:32</div>
        <div className="flex h-28">
          <div className="w-1/2 border-r border-slate-200 bg-white p-2 text-slate-500">
            Passage text with highlightable content…
          </div>
          <div className="w-1/2 bg-slate-50 p-2">
            <p className="mb-1 font-medium text-slate-700">Which answer is correct?</p>
            <div className="space-y-1">
              <div className="rounded border border-[#003366] bg-blue-50 px-2 py-1">A. Choice</div>
              <div className="rounded border px-2 py-1 line-through opacity-50">B. Crossed out</div>
            </div>
          </div>
        </div>
      </div>
    ),
    tip: "Select an answer, cross out distractors, flag questions, and use the scratchpad at the bottom.",
  },
  {
    title: "Step 2 — Submit answers & exit early",
    subtitle:
      "Click Submit Answer to record your response and move to the next question. You can exit anytime via End Exam in the header — submitted answers are saved.",
    demo: (
      <div className="space-y-2 py-2">
        <div className="flex items-center justify-between rounded-lg bg-slate-100 px-3 py-2 text-sm">
          <span>Question 2 of 2</span>
          <span className="rounded bg-[#003366] px-3 py-1 text-xs text-white">Submit Answer</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          <span>Need to stop?</span>
          <span className="rounded border border-red-300 px-2 py-0.5 text-xs">End Exam</span>
        </div>
      </div>
    ),
    tip: "When you finish all questions, you'll see a Section Complete screen.",
  },
  {
    title: "Step 3 — Review flashcards",
    subtitle:
      "Open Flashcards to review due cards. Tap Show Answer, then rate yourself: Again, Hard, Good, or Easy. The FSRS algorithm schedules your next review.",
    demo: (
      <div className="rounded-xl bg-gradient-to-br from-slate-50 to-blue-50/50 p-4 text-center">
        <p className="text-sm text-slate-600">What is the ··· constant?</p>
        <div className="mt-3 grid grid-cols-4 gap-1 text-xs">
          {["Again", "Hard", "Good", "Easy"].map((l) => (
            <span key={l} className="rounded-lg border bg-white py-1.5">
              {l}
            </span>
          ))}
        </div>
      </div>
    ),
    tip: "If more than 200 cards are overdue, new exam practice is blocked until you catch up.",
  },
  {
    title: "Step 4 — Guarantee Mode (optional)",
    subtitle:
      "Enable Guarantee Mode in the exam header before practicing. Wrong answers trigger a mandatory mistake analysis with three fields before you can continue.",
    demo: (
      <div className="space-y-2 rounded-xl border border-[#3399ff]/30 bg-blue-50/50 p-3 text-xs">
        <p className="font-semibold text-[#003366]">Mistake Analysis Required</p>
        <div className="h-6 rounded bg-white/80" />
        <div className="h-6 rounded bg-white/80" />
        <div className="h-6 rounded bg-white/80" />
      </div>
    ),
    tip: "Fill in Information Gap, Distractor Trap, and Preventive Rule for every miss.",
  },
  {
    title: "Step 5 — Track your progress",
    subtitle:
      "The Dashboard shows accuracy by section, average time per question, and trends — all computed locally from your question logs.",
    demo: (
      <div className="flex items-end justify-center gap-2 py-2">
        {[40, 70, 55, 85].map((h, i) => (
          <div
            key={i}
            className="w-8 rounded-t-md bg-gradient-to-t from-[#003366] to-[#3399ff]"
            style={{ height: `${h}px` }}
          />
        ))}
      </div>
    ),
    tip: "Complete at least one exam session to populate your dashboard charts.",
  },
  {
    title: "Step 6 — AI Tutor & PDF import",
    subtitle:
      "Load the local AI model on the AI Tutor page for offline explanations. Upload a PDF to auto-generate Cloze flashcards from your study materials.",
    demo: (
      <div className="rounded-xl border-2 border-dashed border-slate-200 py-6 text-center text-sm text-slate-500">
        📄 Drop PDF → Cloze flashcards
      </div>
    ),
    tip: "The model downloads once from Hugging Face, then runs fully offline via WebGPU.",
  },
  {
    title: "You're ready!",
    subtitle:
      "Start with a practice exam or review flashcards. Revisit Help anytime for the full guide.",
    demo: <div className="animate-float py-4 text-center text-4xl">🎓</div>,
    tip: "Re-enable this tour anytime in Settings.",
  },
] as const;

interface OnboardingWizardProps {
  open: boolean;
  onClose: () => void;
}

export function OnboardingWizard({ open, onClose }: OnboardingWizardProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    if (open) {
      setStep(0);
      setDontShowAgain(false);
    }
  }, [open]);

  if (!open) return null;

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const isFirst = step === 0;

  const finish = () => {
    if (dontShowAgain) {
      setWizardHidden(true);
    }
    onClose();
  };

  const goNext = () => {
    if (isLast) {
      finish();
    } else {
      setStep((s) => s + 1);
    }
  };

  const startPractice = () => {
    finish();
    navigate("/exam");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <Card hover={false} className="animate-scale-in w-full max-w-lg overflow-hidden !p-0">
        <div className="border-b border-slate-100 bg-gradient-to-r from-[#003366] to-[#0055aa] px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider opacity-80">
              Guided tour · Step {step + 1} of {STEPS.length}
            </p>
            <button
              type="button"
              onClick={finish}
              className="text-xs opacity-75 transition hover:opacity-100"
            >
              Skip tour
            </button>
          </div>
          <div className="mt-3 flex gap-1">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  i <= step ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="px-6 py-5">
          <h2 className="text-xl font-bold text-[#003366]">{current.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{current.subtitle}</p>
          <div className="my-5">{current.demo}</div>
          <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
            💡 {current.tip}
          </p>
        </div>

        <div className="border-t border-slate-100 px-6 py-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-[#003366] focus:ring-[#3399ff]"
            />
            Don&apos;t display this next time
          </label>
        </div>

        <div className="flex gap-3 border-t border-slate-100 px-6 py-4">
          {!isFirst && (
            <Button variant="secondary" className="flex-1" onClick={() => setStep((s) => s - 1)}>
              Back
            </Button>
          )}
          {isLast ? (
            <>
              <Button variant="secondary" className="flex-1" onClick={finish}>
                Done
              </Button>
              <Button className="flex-1" onClick={startPractice}>
                Start exam
              </Button>
            </>
          ) : (
            <Button className={`${isFirst ? "w-full" : "flex-1"}`} onClick={goNext}>
              Next
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

/** Compact card on home to launch the wizard manually */
export function WizardLauncher({ onStart }: { onStart: () => void }) {
  return (
    <Card
      hover={false}
      className="mb-6 border border-[#3399ff]/20 bg-gradient-to-r from-blue-50/80 to-cyan-50/50"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#3399ff]">
            Guided tour
          </p>
          <h3 className="mt-1 font-semibold text-[#003366]">Need a walkthrough?</h3>
          <p className="mt-1 text-sm text-slate-500">
            Replay the step-by-step demo of exams, flashcards, dashboard, and AI tutor.
          </p>
        </div>
        <Button onClick={onStart} className="shrink-0">
          Start tour
        </Button>
      </div>
    </Card>
  );
}

export { isWizardHidden, enableWizardOnStartup, setWizardHidden } from "./wizardPreferences";
