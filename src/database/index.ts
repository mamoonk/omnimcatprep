import {
  createRxDatabase,
  addRxPlugin,
  type RxDatabase,
  type RxCollection,
} from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { wrappedValidateAjvStorage } from "rxdb/plugins/validate-ajv";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder";
import { RxDBUpdatePlugin } from "rxdb/plugins/update";
import { questionLogSchema } from "./collections/questionLogs.schema";
import { flashcardSchema } from "./collections/flashcards.schema";
import { contentCategorySchema } from "./collections/content-categories.schema";
import { questionSchema } from "./collections/questions.schema";
import { passageSchema } from "./collections/passages.schema";
import { lessonSchema } from "./collections/lessons.schema";
import { testSessionSchema } from "./collections/test-sessions.schema";
import { attemptSchema } from "./collections/attempts.schema";
import type { QuestionLog, Flashcard } from "../types";
import type { ContentCategory } from "../types/aamc-taxonomy";
import type { Question } from "../types/question";
import type { Passage } from "../types/passage";
import type { Lesson } from "../types/lesson";
import type { TestSession } from "../types/test";
import type { Attempt } from "../types/attempt";
import { AAMC_TAXONOMY } from "../data/aamc-taxonomy";
import { ALL_QUESTIONS } from "../data/questions";
import { CARS_PASSAGES } from "../data/passages/cars";
import { ALL_LESSONS } from "../data/lessons";

if (import.meta.env.DEV && import.meta.env.MODE !== "test") {
  addRxPlugin(RxDBDevModePlugin);
}
addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(RxDBUpdatePlugin);

interface McatCollections {
  question_logs: RxCollection<QuestionLog>;
  flashcards: RxCollection<Flashcard>;
  content_categories: RxCollection<ContentCategory>;
  questions: RxCollection<Question>;
  passages: RxCollection<Passage>;
  lessons: RxCollection<Lesson>;
  test_sessions: RxCollection<TestSession>;
  attempts: RxCollection<Attempt>;
}

export type McatDatabase = RxDatabase<McatCollections>;

let dbPromise: Promise<McatDatabase> | null = null;

export async function getDatabase(): Promise<McatDatabase> {
  if (!dbPromise) {
    dbPromise = createDatabase();
  }
  return dbPromise;
}

async function createDatabase(): Promise<McatDatabase> {
  const db = await createRxDatabase<McatCollections>({
    name: "mcatprepdb",
    storage: wrappedValidateAjvStorage({
      storage: getRxStorageDexie(),
    }),
    ...(import.meta.env.DEV && import.meta.env.MODE !== "test"
      ? { ignoreDuplicate: true }
      : {}),
  });

  await db.addCollections({
    question_logs: { schema: questionLogSchema },
    flashcards: { schema: flashcardSchema },
    content_categories: { schema: contentCategorySchema },
    questions: { schema: questionSchema },
    passages: { schema: passageSchema },
    lessons: { schema: lessonSchema },
    test_sessions: { schema: testSessionSchema },
    attempts: { schema: attemptSchema },
  });

  return db;
}

export async function seedMockData(db: McatDatabase): Promise<void> {
  const existingQuestions = await db.questions.find().limit(1).exec();
  if (existingQuestions.length > 0) return;

  await db.content_categories.bulkInsert(
    AAMC_TAXONOMY.map((cat) => ({
      ...cat,
      parentId: cat.parentId ?? null,
    })),
  );

  await db.passages.bulkInsert(
    CARS_PASSAGES.map((p) => ({ ...p })),
  );

  await db.questions.bulkInsert(
    ALL_QUESTIONS.map((q) => ({ ...q })),
  );

  await db.lessons.bulkInsert(
    ALL_LESSONS.map((l) => ({ ...l })),
  );

  const now = Date.now();
  await db.question_logs.bulkInsert([
    {
      id: "log-1",
      questionId: "q-1",
      section: "bio-biochem",
      isCorrect: false,
      selectedAnswer: "B",
      timeSpentSeconds: 95,
      timestamp: now - 12 * 86_400_000,
      complianceLogged: true,
      errorType: "content_gap",
      mistakeAnalysis: {
        infoGap: "Missed enzyme kinetics curve interpretation",
        distractorTrap: "Confused Vmax with Km",
        preventiveRule: "Always label axes before eliminating choices",
      },
    },
    {
      id: "log-2",
      questionId: "q-2",
      section: "cars",
      isCorrect: true,
      selectedAnswer: "D",
      timeSpentSeconds: 72,
      timestamp: now - 10 * 86_400_000,
      complianceLogged: false,
    },
    {
      id: "log-3",
      questionId: "q-3",
      section: "chem-phys",
      isCorrect: false,
      selectedAnswer: "A",
      timeSpentSeconds: 110,
      timestamp: now - 7 * 86_400_000,
      complianceLogged: true,
      errorType: "cognitive_trap",
      mistakeAnalysis: {
        infoGap: "Skipped unit conversion step",
        distractorTrap: "Picked answer with matching magnitude",
        preventiveRule: "Convert units before comparing values",
      },
    },
    {
      id: "log-4",
      questionId: "q-4",
      section: "psych-soc",
      isCorrect: true,
      selectedAnswer: "C",
      timeSpentSeconds: 58,
      timestamp: now - 5 * 86_400_000,
      complianceLogged: false,
    },
    {
      id: "log-5",
      questionId: "q-5",
      section: "bio-biochem",
      isCorrect: true,
      selectedAnswer: "A",
      timeSpentSeconds: 64,
      timestamp: now - 3 * 86_400_000,
      complianceLogged: false,
    },
    {
      id: "log-6",
      questionId: "q-6",
      section: "cars",
      isCorrect: false,
      selectedAnswer: "B",
      timeSpentSeconds: 88,
      timestamp: now - 86_400_000,
      complianceLogged: false,
      errorType: "content_gap",
    },
    {
      id: "log-7",
      questionId: "q-7",
      section: "chem-phys",
      isCorrect: true,
      selectedAnswer: "D",
      timeSpentSeconds: 70,
      timestamp: now - 43_200_000,
      complianceLogged: false,
    },
    {
      id: "log-8",
      questionId: "q-8",
      section: "psych-soc",
      isCorrect: true,
      selectedAnswer: "B",
      timeSpentSeconds: 55,
      timestamp: now - 3_600_000,
      complianceLogged: false,
    },
  ]);

  await db.flashcards.bulkInsert([
    {
      id: "fc-1",
      front: "What is the {{c1::Michaelis constant}}?",
      back: "Km — substrate concentration at half Vmax",
      stability: 2.5,
      difficulty: 5,
      elapsedDays: 0,
      scheduledDays: 1,
      reps: 0,
      lapses: 0,
      state: 0,
      dueDate: now - 86_400_000,
    },
    {
      id: "fc-2",
      front: "FSRS interval formula uses target retrievability {{c1::0.9}}",
      back: "r = 0.9 default",
      stability: 4,
      difficulty: 4,
      elapsedDays: 2,
      scheduledDays: 3,
      reps: 2,
      lapses: 0,
      state: 2,
      dueDate: now - 60_000,
    },
  ]);
}

export async function resetDatabaseForTests(): Promise<void> {
  if (dbPromise) {
    const db = await dbPromise;
    await db.remove();
    dbPromise = null;
  }
}
