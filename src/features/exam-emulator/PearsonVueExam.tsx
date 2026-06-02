import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMachine } from "@xstate/react";

import { HighlightablePassage } from "./HighlightablePassage";

import { ExamNotepad } from "./ExamNotepad";

import { MOCK_EXAM_QUESTIONS } from "./mockQuestions";

import { useExamState } from "./useExamState";

import { VUE_STYLES } from "./styles";

import { guaranteeMachine, buildMistakeAnalysis } from "../compliance/guaranteeMachine";

import { GuaranteeModal } from "../compliance/GuaranteeModal";

import { buildIncorrectRationalePrompt } from "../../local-ai/prompts";
import { ExitExamModal } from "./ExitExamModal";



interface PearsonVueExamProps {

  guaranteeModeActive: boolean;

  onToggleGuarantee: (active: boolean) => void;

  onIncorrectForAi?: (prompt: string) => void;

}



function formatTime(seconds: number): string {

  const m = Math.floor(seconds / 60);

  const s = seconds % 60;

  return `${m}:${s.toString().padStart(2, "0")}`;

}



export function PearsonVueExam({

  guaranteeModeActive,

  onToggleGuarantee,

  onIncorrectForAi,

}: PearsonVueExamProps) {

  const { state, dispatch, currentQuestion, logAttempt, totalQuestions } =

    useExamState(MOCK_EXAM_QUESTIONS);

  const [notepad, setNotepad] = useState("");

  const [examComplete, setExamComplete] = useState(false);
  const [examCancelled, setExamCancelled] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [guarantee, send] = useMachine(guaranteeMachine);
  const navigate = useNavigate();



  useEffect(() => {

    send({ type: "TOGGLE_GUARANTEE", active: guaranteeModeActive });

  }, [guaranteeModeActive, send]);



  const advanceOrComplete = () => {

    send({ type: "RESET" });

    if (state.currentIndex < totalQuestions - 1) {

      dispatch({ type: "NEXT" });

    } else {

      setExamComplete(true);

    }

  };



  const handleSubmit = async () => {

    if (!currentQuestion || !state.selectedAnswer || submitting) return;

    const isCorrect = state.selectedAnswer === currentQuestion.correctAnswer;



    if (!isCorrect && guaranteeModeActive) {

      send({ type: "INCORRECT_ANSWER", questionId: currentQuestion.id });

      onIncorrectForAi?.(

        buildIncorrectRationalePrompt({

          passage: currentQuestion.passage,

          stem: currentQuestion.stem,

          choices: currentQuestion.choices,

          selectedAnswer: state.selectedAnswer,

          correctAnswer: currentQuestion.correctAnswer,

        }),

      );

      return;

    }



    setSubmitting(true);

    try {

      await logAttempt(isCorrect, false);

      advanceOrComplete();

    } finally {

      setSubmitting(false);

    }

  };



  const handleGuaranteeSubmit = async () => {

    const analysis = buildMistakeAnalysis(guarantee.context.pendingAnalysis);

    if (!analysis || !currentQuestion || submitting) return;



    setSubmitting(true);

    try {

      await logAttempt(false, true, analysis);

      send({ type: "SUBMIT_ANALYSIS" });

      advanceOrComplete();

    } finally {

      setSubmitting(false);

    }

  };



  const handleExitExam = () => {
    send({ type: "RESET" });
    setShowExitConfirm(false);
    setExamCancelled(true);
  };

  if (examCancelled) {
    return (
      <div
        className="flex h-screen flex-col items-center justify-center bg-gray-100"
        style={{ fontFamily: VUE_STYLES.fontFamily }}
      >
        <div className="max-w-md rounded border border-gray-300 bg-white p-8 text-center shadow">
          <h2 className="text-xl font-bold text-[#003366]">Exam Ended</h2>
          <p className="mt-2 text-sm text-gray-600">
            You exited on question {state.currentIndex + 1} of {totalQuestions}. Submitted
            answers have been saved locally.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <button
              type="button"
              className="rounded border border-[#999] px-6 py-2 text-sm"
              onClick={() => navigate("/dashboard")}
            >
              View Dashboard
            </button>
            <button
              type="button"
              className="rounded bg-[#003366] px-6 py-2 text-sm text-white"
              onClick={() => navigate("/")}
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (examComplete) {

    return (

      <div

        className="flex h-screen flex-col items-center justify-center bg-gray-100"

        style={{ fontFamily: VUE_STYLES.fontFamily }}

      >

        <div className="max-w-md rounded border border-gray-300 bg-white p-8 text-center shadow">

          <h2 className="text-xl font-bold text-[#003366]">Section Complete</h2>

          <p className="mt-2 text-sm text-gray-600">

            You answered all {totalQuestions} practice questions. Review your performance on

            the Dashboard.

          </p>

          <button

            type="button"

            className="mt-6 rounded bg-[#003366] px-6 py-2 text-white"

            onClick={() => navigate("/")}

          >

            Return Home

          </button>

        </div>

      </div>

    );

  }



  if (!currentQuestion) return null;



  const isBlocked = guarantee.matches("blocked");



  return (

    <div

      className="flex h-screen flex-col"

      style={{ fontFamily: VUE_STYLES.fontFamily }}

    >

      <header

        className="flex items-center justify-between px-4 py-2 text-white"

        style={{ backgroundColor: VUE_STYLES.headerBg }}

      >

        <span className="text-sm font-semibold">MCAT Practice — Pearson VUE Emulator</span>

        <span

          className={`font-mono text-lg ${state.secondsRemaining < 300 ? "text-red-300" : ""}`}

        >

          {formatTime(state.secondsRemaining)}

        </span>

        <label className="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={guaranteeModeActive}
            onChange={(e) => {
              onToggleGuarantee(e.target.checked);
              send({ type: "TOGGLE_GUARANTEE", active: e.target.checked });
            }}
          />
          Guarantee Mode
        </label>
        <button
          type="button"
          onClick={() => setShowExitConfirm(true)}
          className="ml-2 rounded border border-red-400/60 px-2.5 py-1 text-xs text-red-200 transition hover:bg-red-900/40 hover:text-white"
        >
          End Exam
        </button>

      </header>



      <div className="flex flex-1 overflow-hidden border border-[#999]">

        <div className="w-1/2 border-r border-[#999]" style={{ background: VUE_STYLES.passageBg }}>

          <HighlightablePassage text={currentQuestion.passage} />

        </div>

        <div className="flex w-1/2 flex-col" style={{ background: VUE_STYLES.questionBg }}>

          <div className="flex-1 overflow-y-auto p-4">

            <p className="mb-4 text-sm font-medium">{currentQuestion.stem}</p>

            <ul className="space-y-2">

              {currentQuestion.choices.map((choice) => {

                const crossed = state.crossedOut.has(choice.key);

                const selected = state.selectedAnswer === choice.key;

                return (

                  <li key={choice.key}>

                    <button

                      type="button"

                      onClick={() => dispatch({ type: "SELECT_ANSWER", key: choice.key })}

                      className={`w-full rounded border px-3 py-2 text-left text-sm ${

                        selected ? "border-[#003366] bg-[#e0e8f0]" : "border-[#ccc] bg-white"

                      } ${crossed ? "line-through opacity-50" : ""}`}

                    >

                      <span className="mr-2 font-bold">{choice.key}.</span>

                      {choice.text}

                    </button>

                    <button

                      type="button"

                      className="ml-2 text-xs text-[#003366] underline"

                      onClick={() =>

                        dispatch({ type: "TOGGLE_CROSSOUT", key: choice.key })

                      }

                    >

                      {crossed ? "Undo cross-out" : "Cross out"}

                    </button>

                  </li>

                );

              })}

            </ul>

          </div>

          <div className="h-40 border-t border-[#999]">

            <ExamNotepad value={notepad} onChange={setNotepad} />

          </div>

        </div>

      </div>



      <footer

        className="flex items-center justify-between px-4 py-2 text-sm"

        style={{ backgroundColor: VUE_STYLES.toolbarBg }}

      >

        <span>

          Question {state.currentIndex + 1} of {totalQuestions}

          {state.flagged.has(state.currentIndex) && " [Flagged]"}

        </span>

        <div className="flex gap-2">

          <button

            type="button"

            className="rounded border border-[#999] px-3 py-1"

            onClick={() => dispatch({ type: "TOGGLE_FLAG" })}

          >

            Flag

          </button>

          <button

            type="button"

            className="rounded border border-[#999] px-3 py-1"

            disabled={state.currentIndex === 0}

            onClick={() => dispatch({ type: "PREV" })}

          >

            Previous

          </button>

          <button

            type="button"

            className="rounded bg-[#003366] px-4 py-1 text-white disabled:opacity-40"

            disabled={!state.selectedAnswer || isBlocked || submitting}

            onClick={() => void handleSubmit()}

          >

            {submitting ? "Saving…" : "Submit Answer"}

          </button>

        </div>

      </footer>



      <GuaranteeModal
        open={isBlocked}
        pending={guarantee.context.pendingAnalysis}
        onFieldChange={(field, value) =>
          send({ type: "UPDATE_FIELD", field, value })
        }
        onSubmit={() => void handleGuaranteeSubmit()}
      />

      <ExitExamModal
        open={showExitConfirm}
        currentQuestion={state.currentIndex + 1}
        totalQuestions={totalQuestions}
        onConfirm={handleExitExam}
        onCancel={() => setShowExitConfirm(false)}
      />

    </div>

  );

}


