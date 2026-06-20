import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { ALL_QUESTIONS } from "../../data/questions";
import { getCategoryById, getLeafCategories } from "../../data/aamc-taxonomy";
import { SECTION_LABELS } from "../dashboard/sectionLabels";
import type { McatSection, DifficultyTarget } from "../../types/aamc-taxonomy";

const ALL_SECTIONS: McatSection[] = [
  "chem-phys",
  "cars",
  "bio-biochem",
  "psych-soc",
];

const DIFFICULTIES: { value: DifficultyTarget | ""; label: string }[] = [
  { value: "", label: "All difficulties" },
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const FORMATS: { value: string; label: string }[] = [
  { value: "", label: "All formats" },
  { value: "discrete", label: "Discrete" },
  { value: "passage-based", label: "Passage-based" },
];

const COUNTS: { value: number; label: string }[] = [
  { value: 5, label: "5 questions" },
  { value: 10, label: "10 questions" },
  { value: 15, label: "15 questions" },
  { value: 20, label: "20 questions" },
  { value: 50, label: "50 questions" },
];

export function QuestionBank() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "";

  const [section, setSection] = useState<string>(
    initialCategory
      ? getCategoryById(initialCategory)?.section ?? "bio-biochem"
      : "bio-biochem",
  );
  const [categoryId, setCategoryId] = useState(initialCategory);
  const [difficulty, setDifficulty] = useState<DifficultyTarget | "">("");
  const [format, setFormat] = useState("");
  const [count, setCount] = useState(10);
  const [mode, setMode] = useState<"tutor" | "timed">("tutor");

  const leafCategories = getLeafCategories(section || undefined);

  const filtered = ALL_QUESTIONS.filter((q) => {
    if (section && q.section !== section) return false;
    if (categoryId && q.contentCategoryId !== categoryId) return false;
    if (difficulty && q.difficultyTarget !== difficulty) return false;
    if (format && q.format !== format) return false;
    return true;
  });

  const handleStartPractice = () => {
    const params = new URLSearchParams();
    params.set("mode", mode);
    params.set("count", String(count));
    if (categoryId) params.set("category", categoryId);
    if (difficulty) params.set("difficulty", difficulty);
    if (format) params.set("format", format);
    params.set("section", section);
    navigate(`/practice/session?${params.toString()}`);
  };

  useEffect(() => {
    if (initialCategory && filtered.length > 0) {
      handleStartPractice();
    }
  }, []);

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Practice Questions"
        subtitle="Filter by topic, difficulty, and format to build your custom practice set."
      />

      <Card hover={false} className="mb-6 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Section
            </label>
            <select
              value={section}
              onChange={(e) => {
                setSection(e.target.value);
                setCategoryId("");
              }}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
            >
              {ALL_SECTIONS.map((s) => (
                <option key={s} value={s}>
                  {SECTION_LABELS[s]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Content category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
            >
              <option value="">All categories</option>
              {leafCategories
                .filter((c) => c.section === section)
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as DifficultyTarget | "")}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
            >
              {DIFFICULTIES.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
            >
              {FORMATS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Questions
            </label>
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
            >
              {COUNTS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Mode
          </label>
          <div className="flex gap-3">
            <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm">
              <input
                type="radio"
                name="mode"
                checked={mode === "tutor"}
                onChange={() => setMode("tutor")}
                className="text-[#003366]"
              />
              Tutor mode — immediate feedback
            </label>
            <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm">
              <input
                type="radio"
                name="mode"
                checked={mode === "timed"}
                onChange={() => setMode("timed")}
                className="text-[#003366]"
              />
              Timed mode — feedback at end
            </label>
          </div>
        </div>
      </Card>

      <Card hover={false} className="mb-6 text-center">
        <p className="text-sm text-slate-600">
          <span className="text-2xl font-bold text-[#003366]">
            {filtered.length}
          </span>{" "}
          question{filtered.length !== 1 ? "s" : ""} match your filters
        </p>
        <Button
          className="mt-4"
          disabled={filtered.length === 0}
          onClick={handleStartPractice}
        >
          Start Practice
        </Button>
      </Card>
    </div>
  );
}
