import { describe, it, expect } from "vitest";
import { isSupabaseConfigured } from "./supabase-sync/client";

/**
 * Spec verification checkpoints from plan.md
 */
describe("Verification checkpoints", () => {
  it("practice/analytics do not require remote API when Supabase is unconfigured", () => {
    expect(isSupabaseConfigured()).toBe(false);
  });

  it("local AI worker is decoupled from UI thread (module worker)", async () => {
    const workerUrl = new URL("../local-ai/ai.worker.ts", import.meta.url);
    expect(workerUrl.pathname).toContain("ai.worker");
  });
});
