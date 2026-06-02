import { describe, expect, it, beforeEach, vi } from "vitest";
import {
  clearProviderCredential,
  getProviderCredential,
  hasProviderCredential,
  maskCredential,
  setProviderCredential,
} from "./credentials";

describe("provider credentials", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("stores and retrieves credentials per provider", () => {
    setProviderCredential("openai", "sk-test-key");
    expect(getProviderCredential("openai")).toBe("sk-test-key");
    expect(hasProviderCredential("openai")).toBe(true);
    expect(hasProviderCredential("anthropic")).toBe(false);
  });

  it("rejects empty credentials", () => {
    expect(() => setProviderCredential("openai", "   ")).toThrow();
  });

  it("clears credentials", () => {
    setProviderCredential("groq", "gsk_test");
    clearProviderCredential("groq");
    expect(getProviderCredential("groq")).toBeNull();
  });

  it("masks credentials for display", () => {
    expect(maskCredential("sk-1234567890abcdef")).toBe("sk-1••••cdef");
  });
});

describe("online client", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("calls OpenAI-compatible endpoint with bearer token", async () => {
    const { generateWithOnlineProvider } = await import("./onlineClient");
    setProviderCredential("openai", "sk-test");

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: "Competitive inhibition blocks active site." } }],
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const text = await generateWithOnlineProvider(
      { providerId: "openai", modelId: "gpt-4o-mini" },
      { prompt: "Explain inhibition" },
    );

    expect(text).toContain("Competitive inhibition");
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.openai.com/v1/chat/completions",
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: "Bearer sk-test" }),
      }),
    );
  });

  it("requires a saved credential", async () => {
    const { generateWithOnlineProvider } = await import("./onlineClient");
    await expect(
      generateWithOnlineProvider(
        { providerId: "anthropic", modelId: "claude-3-5-haiku-20241022" },
        { prompt: "Hi" },
      ),
    ).rejects.toThrow(/API key/i);
  });
});
