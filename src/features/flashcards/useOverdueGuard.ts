import { useEffect, useState } from "react";
import { getDatabase } from "../../database";
import {
  countOverdueFlashcards,
  shouldBlockNewPractice,
  OVERDUE_BLOCK_THRESHOLD,
} from "./fsrs";

export function useOverdueGuard() {
  const [overdueCount, setOverdueCount] = useState(0);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const refresh = async () => {
      const db = await getDatabase();
      const cards = await db.flashcards.find().exec();
      const docs = cards.map((c) => c.toJSON());
      const count = countOverdueFlashcards(docs);
      if (!cancelled) {
        setOverdueCount(count);
        setBlocked(shouldBlockNewPractice(count));
      }
    };
    void refresh();
    const sub = setInterval(() => void refresh(), 30_000);
    return () => {
      cancelled = true;
      clearInterval(sub);
    };
  }, []);

  return { overdueCount, blocked, threshold: OVERDUE_BLOCK_THRESHOLD };
}
