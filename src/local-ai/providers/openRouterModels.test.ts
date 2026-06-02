import { describe, expect, it, beforeEach, vi } from "vitest";
import {
  clearOpenRouterModelCache,
  fetchOpenRouterModels,
  isOpenRouterModelFree,
  readOpenRouterModelCache,
} from "./openRouterModels";

describe("openRouterModels", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("detects free pricing", () => {
    expect(isOpenRouterModelFree({ prompt: "0", completion: "0", request: "0" })).toBe(true);
    expect(isOpenRouterModelFree({ prompt: "0.5", completion: "0" })).toBe(false);
  });

  it("maps org and free flag from API payload", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          data: [
            {
              id: "openai/gpt-4o-mini",
              name: "OpenAI: GPT-4o Mini",
              context_length: 128000,
              architecture: { output_modalities: ["text"] },
              pricing: { prompt: "0.15", completion: "0.6" },
            },
            {
              id: "google/gemma-free",
              name: "Gemma Free",
              architecture: { output_modalities: ["text"] },
              pricing: { prompt: "0", completion: "0", request: "0" },
            },
            {
              id: "openai/text-embedding-3-small",
              name: "Embeddings",
              architecture: { output_modalities: ["embeddings"] },
            },
          ],
        }),
      }),
    );

    const models = await fetchOpenRouterModels("sk-or-test", { forceRefresh: true });
    expect(models).toHaveLength(2);
    expect(models.find((m) => m.id === "google/gemma-free")?.isFree).toBe(true);
    expect(models.find((m) => m.id === "openai/gpt-4o-mini")?.org).toBe("openai");
  });

  it("reads cached models within TTL", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          data: [
            {
              id: "meta/llama",
              name: "Llama",
              architecture: { output_modalities: ["text"] },
              pricing: { prompt: "0", completion: "0" },
            },
          ],
        }),
      }),
    );

    await fetchOpenRouterModels(undefined, { forceRefresh: true });
    expect(readOpenRouterModelCache()?.length).toBe(1);

    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const cached = await fetchOpenRouterModels();
    expect(cached).toHaveLength(1);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("clears cache", () => {
    clearOpenRouterModelCache();
    expect(readOpenRouterModelCache()).toBeNull();
  });
});
