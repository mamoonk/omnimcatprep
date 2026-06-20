import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { getDatabase } from "../../database";
import { ALL_LESSONS } from "../../data/lessons";
import { AAMC_TAXONOMY } from "../../data/aamc-taxonomy";
import type { ContentCategory } from "../../types/aamc-taxonomy";
import { SECTION_LABELS } from "../dashboard/sectionLabels";
import type { McatSection } from "../../types";

const ALL_SECTIONS: McatSection[] = [
  "chem-phys",
  "cars",
  "bio-biochem",
  "psych-soc",
];

export function LessonsHome() {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    let cancelled = false;
    void getDatabase().then(async (db) => {
      const stored = await db.lessons.find().exec();
      const completed = new Set(
        stored.filter((l) => l.completed).map((l) => l.id),
      );
      if (!cancelled) setCompletedLessons(completed);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const fcCategories = AAMC_TAXONOMY.filter((c) => c.parentId === null);

  const groupedBySection = (ALL_SECTIONS as McatSection[]).reduce(
    (acc, section) => {
      const fcs = fcCategories.filter((c) => c.section === section);
      acc[section] = fcs.map((fc) => ({
        fc,
        children: AAMC_TAXONOMY.filter((c) => c.parentId === fc.id),
      }));
      return acc;
    },
    {} as Record<string, { fc: ContentCategory; children: ContentCategory[] }[]>,
  );

  return (
    <div>
      <PageHeader
        title="Content Review"
        subtitle="MCAT lessons organized by AAMC content category."
      />

      {ALL_SECTIONS.map((section) => {
        const groups = groupedBySection[section] ?? [];
        if (groups.length === 0) return null;

        return (
          <section key={section} className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-[#003366]">
              {SECTION_LABELS[section]}
            </h2>
            <div className="space-y-4">
              {groups.map(({ fc, children }) => {
                const categoryLessons = children
                  .map((cc) => ({
                    category: cc,
                    lessons: ALL_LESSONS.filter(
                      (l) => l.contentCategoryId === cc.id,
                    ),
                  }))
                  .filter(({ lessons }) => lessons.length > 0);

                if (categoryLessons.length === 0) return null;

                return (
                  <Card key={fc.id} hover={false} className="!p-4">
                    <h3 className="mb-2 text-sm font-semibold text-slate-600">
                      {fc.name}
                    </h3>
                    <div className="space-y-2">
                      {categoryLessons.map(({ category, lessons }) => (
                        <div key={category.id}>
                          <p className="mb-1 text-xs font-medium text-slate-500">
                            {category.name}
                          </p>
                          <div className="space-y-1">
                            {lessons.map((lesson) => {
                              const done = completedLessons.has(lesson.id);
                              return (
                                <Link
                                  key={lesson.id}
                                  to={`/lessons/${lesson.id}`}
                                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                                    done
                                      ? "bg-emerald-50 text-emerald-800"
                                      : "bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-[#003366]"
                                  }`}
                                >
                                  <span
                                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded text-xs ${
                                      done
                                        ? "bg-emerald-400 text-white"
                                        : "border border-slate-300"
                                    }`}
                                  >
                                    {done ? "✓" : ""}
                                  </span>
                                  <span>{lesson.title}</span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
