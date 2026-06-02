import { describe, expect, it } from "vitest";
import { FREE_LOCAL_OPTIONS, groupModelsByOrg } from "./freeAiCatalog";

describe("freeAiCatalog", () => {
  it("lists local free options from recommended models", () => {
    expect(FREE_LOCAL_OPTIONS.length).toBeGreaterThan(0);
    expect(FREE_LOCAL_OPTIONS[0].id).toContain("/");
  });

  it("groups models by org", () => {
    const grouped = groupModelsByOrg([
      { org: "google", id: "a" },
      { org: "openai", id: "b" },
      { org: "google", id: "c" },
    ]);
    expect(grouped.get("google")).toHaveLength(2);
    expect(grouped.get("openai")).toHaveLength(1);
  });
});
