import {
  replicateSupabase,
  type RxSupabaseReplicationState,
} from "rxdb/plugins/replication-supabase";
import type { McatDatabase } from "../index";
import type { QuestionLog, Flashcard } from "../../types";
import { getSupabaseClient, isSupabaseConfigured } from "./client";

export type ReplicationHandles = {
  questionLogs?: RxSupabaseReplicationState<QuestionLog>;
  flashcards?: RxSupabaseReplicationState<Flashcard>;
};

let replicationHandles: ReplicationHandles | null = null;

export async function startReplication(
  db: McatDatabase,
): Promise<ReplicationHandles | null> {
  if (!isSupabaseConfigured() || !navigator.onLine) return null;

  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return null;

  if (replicationHandles) return replicationHandles;

  const questionLogsReplication = replicateSupabase({
    collection: db.question_logs,
    client: supabase,
    tableName: "question_logs",
    replicationIdentifier: "question_logs-supabase",
    live: true,
    pull: { batchSize: 50 },
    push: { batchSize: 50 },
  });

  const flashcardsReplication = replicateSupabase({
    collection: db.flashcards,
    client: supabase,
    tableName: "flashcards",
    replicationIdentifier: "flashcards-supabase",
    live: true,
    pull: { batchSize: 50 },
    push: { batchSize: 50 },
  });

  await Promise.all([
    questionLogsReplication.awaitInitialReplication(),
    flashcardsReplication.awaitInitialReplication(),
  ]);

  replicationHandles = {
    questionLogs: questionLogsReplication,
    flashcards: flashcardsReplication,
  };

  return replicationHandles;
}

export async function stopReplication(): Promise<void> {
  if (!replicationHandles) return;
  await Promise.all([
    replicationHandles.questionLogs?.cancel(),
    replicationHandles.flashcards?.cancel(),
  ]);
  replicationHandles = null;
}
