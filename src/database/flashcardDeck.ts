import type { McatDatabase } from "./index";
import type { Flashcard } from "../types";

const EXTRA_FLASHCARDS: Flashcard[] = [
  {
    id: "fc-3",
    front: "Competitive inhibition affects {{c1::Km}} but not {{c2::Vmax}}",
    back: "Km increases; Vmax unchanged",
    stability: 2,
    difficulty: 5,
    elapsedDays: 0,
    scheduledDays: 1,
    reps: 0,
    lapses: 0,
    state: 0,
    dueDate: 0,
  },
  {
    id: "fc-4",
    front: "CARS passages test {{c1::reasoning}} within the text, not outside knowledge",
    back: "Stay within the four corners of the passage",
    stability: 2,
    difficulty: 4,
    elapsedDays: 0,
    scheduledDays: 1,
    reps: 0,
    lapses: 0,
    state: 0,
    dueDate: 0,
  },
  {
    id: "fc-5",
    front: "The MCAT psych/soc section includes {{c1::sociological}} and {{c2::psychological}} foundations",
    back: "Behavior, identity, social structure, research methods",
    stability: 2,
    difficulty: 4,
    elapsedDays: 0,
    scheduledDays: 1,
    reps: 0,
    lapses: 0,
    state: 0,
    dueDate: 0,
  },
];

/** Ensures a usable starter deck exists (safe to call on every flashcard page load). */
export async function ensureFlashcardDeck(db: McatDatabase): Promise<void> {
  const now = Date.now();

  for (const template of EXTRA_FLASHCARDS) {
    const existing = await db.flashcards.findOne(template.id).exec();
    if (!existing) {
      await db.flashcards.insert({ ...template, dueDate: now - 60_000 });
    }
  }

  // Legacy seed had fc-2 due tomorrow — pull it forward if user never reviewed it
  const fc2 = await db.flashcards.findOne("fc-2").exec();
  if (fc2 && fc2.dueDate > now && (fc2.reps ?? 0) <= 2) {
    await fc2.patch({ dueDate: now - 60_000 });
  }
}

export async function fetchDueFlashcards(db: McatDatabase): Promise<Flashcard[]> {
  const now = Date.now();
  const cards = await db.flashcards.find().exec();
  return cards
    .map((c) => c.toJSON())
    .filter((c) => c.dueDate <= now)
    .sort((a, b) => a.dueDate - b.dueDate);
}

export async function countFlashcardsInDeck(db: McatDatabase): Promise<number> {
  return db.flashcards.count().exec();
}

function isPracticeCard(id: string): boolean {
  return id.startsWith("qcard-");
}

export async function countFlashcardsByType(
  db: McatDatabase,
): Promise<{ regular: number; practice: number; duePractice: number }> {
  const cards = await db.flashcards.find().exec();
  const now = Date.now();
  let regular = 0;
  let practice = 0;
  let duePractice = 0;
  for (const card of cards) {
    const c = card.toJSON();
    if (isPracticeCard(c.id)) {
      practice += 1;
      if (c.dueDate <= now) duePractice += 1;
    } else {
      regular += 1;
    }
  }
  return { regular, practice, duePractice };
}
