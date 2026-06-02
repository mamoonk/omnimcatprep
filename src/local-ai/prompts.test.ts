import { describe, it, expect } from "vitest";
import { buildIncorrectRationalePrompt } from "./prompts";

describe("buildIncorrectRationalePrompt", () => {
  it("includes passage, choices, and answers", () => {
    const prompt = buildIncorrectRationalePrompt({
      passage: "Test passage",
      stem: "What is Km?",
      choices: [
        { key: "A", text: "Vmax/2" },
        { key: "B", text: "Substrate at half Vmax" },
      ],
      selectedAnswer: "A",
      correctAnswer: "B",
    });
    expect(prompt).toContain("Test passage");
    expect(prompt).toContain("STUDENT SELECTED: A");
    expect(prompt).toContain("CORRECT ANSWER: B");
  });
});
