import { describe, expect, it, beforeEach } from "vitest";
import { getAiSelection, setAiSelection } from "./aiPreferences";

describe("ai preferences", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("defaults to pollinations provider", () => {
    expect(getAiSelection()).toEqual({
      providerId: "pollinations",
      modelId: "openai",
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
