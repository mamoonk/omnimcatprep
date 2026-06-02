import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getDatabase, seedMockData, resetDatabaseForTests } from "./index";

describe("RxDB local persistence", () => {
  beforeEach(async () => {
    await resetDatabaseForTests();
  });

  afterEach(async () => {
    await resetDatabaseForTests();
  });

  it("persists question logs offline", async () => {
    const db = await getDatabase();
    await seedMockData(db);
    const logs = await db.question_logs.find().exec();
    expect(logs.length).toBeGreaterThanOrEqual(2);
    expect(logs[0].toJSON().section).toBeDefined();
  });

  it("persists flashcards offline", async () => {
    const db = await getDatabase();
    await seedMockData(db);
    const cards = await db.flashcards.find().exec();
    expect(cards.length).toBeGreaterThanOrEqual(2);
  });

  it("writes new documents without network", async () => {
    const db = await getDatabase();
    await db.question_logs.insert({
      id: "offline-test",
      questionId: "q-offline",
      section: "cars",
      isCorrect: true,
      timeSpentSeconds: 60,
      timestamp: Date.now(),
      complianceLogged: false,
    });
    const found = await db.question_logs.findOne("offline-test").exec();
    expect(found?.isCorrect).toBe(true);
  });
});
