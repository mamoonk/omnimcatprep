import { RECOMMENDED_MODELS } from "./modelCatalog";

/** Local models — no API key, no account, runs on-device after one-time download. */
export const FREE_LOCAL_OPTIONS = RECOMMENDED_MODELS.map((model) => ({
  id: model.id,
  label: model.label,
  detail: model.size,
  note: model.note ?? "Offline · WebGPU · $0",
}));

export const FREE_TIER_INFO = {
  local: {
    title: "Local (Transformers.js)",
    badge: "No account needed",
    description:
      "Runs on your GPU via WebGPU. Models download once from Hugging Face, then work offline. No API key or subscription.",
  },
  openRouter: {
    title: "OpenRouter ($0 models)",
    badge: "Free API key required to run",
    description:
      "These models have $0 prompt and completion pricing on OpenRouter. Create a free account at openrouter.ai to get an API key — you are not charged for these models, but a key is still required to call the API.",
  },
  paidProviders: {
    title: "Other online providers",
    description:
      "OpenAI, Anthropic, Google Gemini, and Groq require paid API keys from each vendor. They are not included in the free catalog below.",
  },
} as const;

export function groupModelsByOrg<T extends { org: string }>(models: T[]): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const model of models) {
    const list = map.get(model.org) ?? [];
    list.push(model);
    map.set(model.org, list);
  }
  return map;
}
