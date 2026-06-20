import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { LessonBody } from "./LessonBody";
import { getDatabase } from "../../database";
import { getLessonById, ALL_LESSONS } from "../../data/lessons";
import { getCategoryById } from "../../data/aamc-taxonomy";
import { SECTION_LABELS } from "../dashboard/sectionLabels";

export function LessonReader() {
  const { id } = useParams<{ id: string }>();
  const [completed, setCompleted] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  const lesson = id ? getLessonById(id) : undefined;
  const category = lesson
    ? getCategoryById(lesson.contentCategoryId)
    : undefined;

  useEffect(() => {
    let cancelled = false;
    void getDatabase().then(async (db) => {
      if (id) {
        const doc = await db.lessons.findOne(id).exec();
        if (!cancelled) {
          setCompleted(doc?.completed ?? false);
        }
      }
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleToggleComplete = async () => {
    if (!id) return;
    const db = await getDatabase();
    const doc = await db.lessons.findOne(id).exec();
    if (doc) {
      await doc.patch({ completed: !completed });
      setCompleted(!completed);
      if (!completed) setJustCompleted(true);
    } else if (lesson) {
      await db.lessons.insert({ ...lesson, completed: true });
      setCompleted(true);
      setJustCompleted(true);
    }
  };

  if (!lesson) {
    return (
      <div className="mx-auto max-w-3xl">
        <PageHeader title="Lesson not found" subtitle="Check the lesson library." />
        <Link
          to="/lessons"
          className="text-sm font-medium text-[#003366] underline"
        >
          ← Back to lessons
        </Link>
      </div>
    );
  }

  const currentIndex = ALL_LESSONS.findIndex((l) => l.id === id);
  const prevLesson = currentIndex > 0 ? ALL_LESSONS[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < ALL_LESSONS.length - 1
      ? ALL_LESSONS[currentIndex + 1]
      : null;

  const sectionLabel = category
    ? SECTION_LABELS[category.section]
    : "Unknown";

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 text-xs text-slate-500">
        <Link to="/lessons" className="underline hover:text-[#003366]">
          Content Review
        </Link>
        {category && (
          <>
            <span className="mx-2">/</span>
            <span>{sectionLabel}</span>
            <span className="mx-2">/</span>
            <span className="text-slate-700">{category.name}</span>
          </>
        )}
      </div>

      <Card hover={false} className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#003366]">
              {lesson.title}
            </h1>
            {category && (
              <p className="mt-1 text-sm text-slate-500">
                {sectionLabel} · {category.name}
              </p>
            )}
          </div>
          <Button
            variant={completed ? "secondary" : "primary"}
            onClick={() => void handleToggleComplete()}
            className="shrink-0"
          >
            {completed ? "Completed ✓" : "Mark complete"}
          </Button>
        </div>
      </Card>

      <Card hover={false} className="max-w-none">
        <LessonBody body={lesson.body} />
      </Card>

      <div className="mt-6 flex items-center justify-between">
        <div>
          {prevLesson && (
            <Link
              to={`/lessons/${prevLesson.id}`}
              className="text-sm font-medium text-[#003366] underline"
            >
              ← {prevLesson.title}
            </Link>
          )}
        </div>
        <div>
          {nextLesson && (
            <Link
              to={`/lessons/${nextLesson.id}`}
              className="text-sm font-medium text-[#003366] underline"
            >
              {nextLesson.title} →
            </Link>
          )}
        </div>
      </div>

      {justCompleted && (
        <Card hover={false} className="mb-6 border-emerald-200 bg-emerald-50">
          <div className="text-center">
            <p className="mb-2 text-sm font-semibold text-emerald-800">
              Lesson completed! Ready to test your knowledge?
            </p>
            <Link
              to={`/practice?category=${lesson.contentCategoryId}`}
              className="inline-block rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Practice this topic
            </Link>
          </div>
        </Card>
      )}

      <div className="mt-4 flex justify-center gap-3">
        {category && (
          <Link
            to={`/practice?category=${lesson.contentCategoryId}`}
            className="rounded-xl bg-[#003366] px-5 py-2.5 text-sm font-semibold text-white"
          >
            Practice this topic
          </Link>
        )}
      </div>
    </div>
  );
}
