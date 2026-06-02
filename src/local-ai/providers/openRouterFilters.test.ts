import { describe, expect, it, beforeEach } from "vitest";
import {
  DEFAULT_OPENROUTER_FILTERS,
  filterOpenRouterModels,
  listOpenRouterOrgs,
  readOpenRouterFilters,
  saveOpenRouterFilters,
  toggleExcludedOrg,
} from "./openRouterFilters";
import type { OpenRouterModel } from "./types";

const SAMPLE: OpenRouterModel[] = [
  {
    id: "openai/gpt-4o-mini",
    label: "GPT-4o Mini",
    org: "openai",
    isFree: false,
  },
  {
    id: "google/gemma-2-9b-it:free",
    label: "Gemma 2 9B (free)",
    org: "google",
    isFree: true,
  },
  {
    id: "meta-llama/llama-3.3-70b-instruct",
    label: "Llama 3.3 70B",
    org: "meta-llama",
    isFree: false,
  },
];

describe("openRouterFilters", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("filters free models only", () => {
    const result = filterOpenRouterModels(SAMPLE, {
      ...DEFAULT_OPENROUTER_FILTERS,
      freeOnly: true,
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toContain("gemma");
  });

  it("excludes selected provider orgs", () => {
    const result = filterOpenRouterModels(SAMPLE, {
      ...DEFAULT_OPENROUTER_FILTERS,
      excludedOrgs: ["openai", "meta-llama"],
    });
    expect(result).toHaveLength(1);
    expect(result[0].org).toBe("google");
  });

  it("searches by id, label, and org", () => {
    const result = filterOpenRouterModels(SAMPLE, {
      ...DEFAULT_OPENROUTER_FILTERS,
      search: "meta-llama",
    });
    expect(result).toHaveLength(1);
    expect(result[0].org).toBe("meta-llama");
  });

  it("lists unique orgs sorted", () => {
    expect(listOpenRouterOrgs(SAMPLE)).toEqual(["google", "meta-llama", "openai"]);
  });

  it("persists filter preferences", () => {
    saveOpenRouterFilters({
      search: "llama",
      freeOnly: true,
      excludedOrgs: ["openai"],
    });
    expect(readOpenRouterFilters()).toEqual({
      search: "llama",
      freeOnly: true,
      excludedOrgs: ["openai"],
    });
  });

  it("toggles excluded orgs", () => {
    expect(toggleExcludedOrg([], "openai", true)).toEqual(["openai"]);
    expect(toggleExcludedOrg(["openai"], "openai", false)).toEqual([]);
  });
});
