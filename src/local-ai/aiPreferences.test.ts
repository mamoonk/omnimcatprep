import { describe, expect, it, beforeEach } from "vitest";
import { DEFAULT_MODEL_ID } from "./modelCatalog";
import { getAiSelection, setAiSelection } from "./aiPreferences";

describe("ai preferences", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("defaults to local provider", () => {
    expect(getAiSelection()).toEqual({
      providerId: "local",
      modelId: DEFAULT_MODEL_ID,
    });
  });

  it("persists provider and model", () => {
    setAiSelection({ providerId: "openai", modelId: "gpt-4o-mini" });
    expect(getAiSelection()).toEqual({
      providerId: "openai",
      modelId: "gpt-4o-mini",
    });
  });

  it("migrates legacy local model id", () => {
    localStorage.setItem("mcatprep_ai_model_id", "Xenova/gpt2");
    expect(getAiSelection()).toEqual({ providerId: "local", modelId: "Xenova/gpt2" });
  });
});
