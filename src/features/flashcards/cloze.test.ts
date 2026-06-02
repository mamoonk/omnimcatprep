import { describe, it, expect } from "vitest";
import {
  isClozeCard,
  parseClozeSegments,
  stripClozeMarkup,
} from "./cloze";

describe("cloze parsing", () => {
  it("detects cloze syntax", () => {
    expect(isClozeCard("What is {{c1::Km}}?")).toBe(true);
    expect(isClozeCard("Plain question")).toBe(false);
  });

  it("strips markup to plain text", () => {
    expect(stripClozeMarkup("What is the {{c1::Michaelis constant}}?")).toBe(
      "What is the Michaelis constant?",
    );
  });

  it("parses mixed text and cloze segments", () => {
    const segments = parseClozeSegments("What is the {{c1::Michaelis constant}}?");
    expect(segments).toEqual([
      { type: "text", value: "What is the " },
      { type: "cloze", clozeNum: 1, answer: "Michaelis constant" },
      { type: "text", value: "?" },
    ]);
  });

  it("handles multiple clozes", () => {
    const segments = parseClozeSegments("{{c1::A}} and {{c2::B}}");
    expect(segments).toHaveLength(3);
    expect(segments[2]).toMatchObject({ type: "cloze", clozeNum: 2, answer: "B" });
  });
});
