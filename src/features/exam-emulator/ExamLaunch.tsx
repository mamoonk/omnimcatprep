import type { McatSection } from "../../types";
import { SECTION_DURATIONS_MINUTES } from "./styles";
import { ALL_QUESTIONS } from "../../data/questions";
import { SECTION_LABELS } from "../dashboard/sectionLabels";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";

const SECTIONS: { key: McatSection; description: string; color: string }[] = [
  {
    key: "chem-phys",
    description: "Chemical and Physical Foundations of Biological Systems",
    color: "from-blue-500 to-cyan-500",
  },
  {
    key: "cars",
    description: "Critical Analysis and Reasoning Skills",
    color: "from-purple-500 to-pink-500",
  },
  {
    key: "bio-biochem",
    description: "Biological and Biochemical Foundations of Living Systems",
    color: "from-emerald-500 to-teal-500",
  },
  {
    key: "psych-soc",
    description: "Psychological, Social, and Biological Foundations of Behavior",
    color: "from-amber-500 to-orange-500",
  },
];

interface ExamLaunchProps {
  onStart: (section: McatSection) => void;
}

export function ExamLaunch({ onStart }: ExamLaunchProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3399ff] to-[#06b6d4] text-3xl shadow-lg">
          M
        </div>
        <h1 className="text-3xl font-bold text-[#003366]">
          MCAT Practice Exam
        </h1>
        <p className="mt-2 text-slate-500">
          Select a section to begin. Each section is timed to match the real
          MCAT.
        </p>
      </div>

      <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
        {SECTIONS.map(({ key, description, color }) => {
          const questionCount = ALL_QUESTIONS.filter(
            (q) => q.section === key,
          ).length;
          const minutes = SECTION_DURATIONS_MINUTES[key] ?? 95;
          return (
            <Card key={key} hover={false} className="flex flex-col">
              <div
                className={`mb-3 h-2 rounded-full bg-gradient-to-r ${color}`}
              />
              <h3 className="text-lg font-bold text-[#003366]">
                {SECTION_LABELS[key]}
              </h3>
              <p className="mb-4 text-sm leading-snug text-slate-500">
                {description}
              </p>
              <div className="mb-4 flex gap-4 text-sm text-slate-600">
                <span className="flex items-center gap-1">
                  <span className="text-lg font-bold text-[#003366]">
                    {questionCount}
                  </span>
                  questions
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-lg font-bold text-[#003366]">
                    {minutes}
                  </span>
                  minutes
                </span>
              </div>
              <div className="mt-auto">
                <Button
                  className="w-full"
                  disabled={questionCount === 0}
                  onClick={() => onStart(key)}
                >
                  {questionCount > 0
                    ? "Start Section"
                    : "No questions available"}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
