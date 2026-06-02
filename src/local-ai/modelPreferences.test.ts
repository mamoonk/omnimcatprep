import { describe, expect, it, beforeEach } from "vitest";
import { DEFAULT_MODEL_ID, isValidModelId, normalizeModelId } from "./modelCatalog";
import { getSelectedModelId, setSelectedModelId } from "./modelPreferences";

describe("model preferences", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("validates Hugging Face model ids", () => {
    expect(isValidModelId("Xenova/Phi-3-mini-4k-instruct")).toBe(true);
    expect(isValidModelId("invalid")).toBe(false);
    expect(isValidModelId("")).toBe(false);
  });

  it("normalizes whitespace", () => {
    expect(normalizeModelId("  Xenova/gpt2  ")).toBe("Xenova/gpt2");
  });

  it("returns default when unset", () => {
    expect(getSelectedModelId()).toBe(DEFAULT_MODEL_ID);
  });

  it("persists a custom model choice", () => {
    const id = setSelectedModelId("Xenova/Qwen2.5-0.5B-Instruct");
    expect(id).toBe("Xenova/Qwen2.5-0.5B-Instruct");
    expect(getSelectedModelId()).toBe("Xenova/Qwen2.5-0.5B-Instruct");
  });

  it("rejects invalid model ids", () => {
    expect(() => setSelectedModelId("not-a-model")).toThrow();
  });
});
