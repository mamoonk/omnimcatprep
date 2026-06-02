import type { AiSelection, GenerateOptions, ProviderId } from "./types";
import { getProvider } from "./catalog";
import { getProviderCredential } from "./credentials";

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as {
      error?: { message?: string };
      message?: string;
    };
    return body.error?.message ?? body.message ?? response.statusText;
  } catch {
    return response.statusText || "Request failed";
  }
}

async function openAiCompatibleChat(
  url: string,
  apiKey: string,
  model: string,
  prompt: string,
  maxTokens: number,
  extraHeaders?: Record<string, string>,
): Promise<string> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      ...extraHeaders,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: maxTokens,
    }),
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("Empty response from provider.");
  return text;
}

async function generateAnthropic(
  apiKey: string,
  model: string,
  prompt: string,
  maxTokens: number,
): Promise<string> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  const data = (await response.json()) as {
    content?: { type: string; text?: string }[];
  };
  const text = data.content?.find((part) => part.type === "text")?.text?.trim();
  if (!text) throw new Error("Empty response from Anthropic.");
  return text;
}

async function generateGoogle(
  apiKey: string,
  model: string,
  prompt: string,
): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  const data = (await response.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!text) throw new Error("Empty response from Google Gemini.");
  return text;
}

export async function generateWithOnlineProvider(
  selection: AiSelection,
  options: GenerateOptions,
): Promise<string> {
  const provider = getProvider(selection.providerId);
  if (provider.mode !== "online") {
    throw new Error("Provider is not an online provider.");
  }

  const apiKey = getProviderCredential(selection.providerId);
  if (!apiKey) {
    throw new Error(`Add your ${provider.credentialLabel ?? "API key"} for ${provider.label}.`);
  }

  const maxTokens = options.maxTokens ?? 512;
  const { modelId } = selection;
  const { prompt } = options;

  switch (selection.providerId as ProviderId) {
    case "openai":
      return openAiCompatibleChat(
        "https://api.openai.com/v1/chat/completions",
        apiKey,
        modelId,
        prompt,
        maxTokens,
      );
    case "groq":
      return openAiCompatibleChat(
        "https://api.groq.com/openai/v1/chat/completions",
        apiKey,
        modelId,
        prompt,
        maxTokens,
      );
    case "openrouter":
      return openAiCompatibleChat(
        "https://openrouter.ai/api/v1/chat/completions",
        apiKey,
        modelId,
        prompt,
        maxTokens,
        {
          "HTTP-Referer": window.location.origin,
          "X-Title": "MCAT Prep",
        },
      );
    case "anthropic":
      return generateAnthropic(apiKey, modelId, prompt, maxTokens);
    case "google":
      return generateGoogle(apiKey, modelId, prompt);
    default:
      throw new Error(`Online generation is not configured for ${provider.label}.`);
  }
}
