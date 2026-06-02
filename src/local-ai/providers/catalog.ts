import { RECOMMENDED_MODELS } from "../modelCatalog";
import type { AiProviderDefinition, ProviderId } from "./types";

export const AI_PROVIDERS: AiProviderDefinition[] = [
  {
    id: "local",
    label: "Local (Transformers.js)",
    description: "Offline inference on your GPU via WebGPU. Models download from Hugging Face once.",
    mode: "local",
    requiresCredential: false,
    allowCustomModel: true,
    customModelHint: "Xenova/Phi-3-mini-4k-instruct",
    models: RECOMMENDED_MODELS.map((m) => ({
      id: m.id,
      label: m.label,
      note: m.size,
    })),
  },
  {
    id: "openai",
    label: "OpenAI",
    description: "Cloud models via the OpenAI API.",
    mode: "online",
    requiresCredential: true,
    credentialLabel: "API Key",
    credentialPlaceholder: "sk-…",
    credentialHelpUrl: "https://platform.openai.com/api-keys",
    models: [
      { id: "gpt-4o-mini", label: "GPT-4o Mini", note: "Fast and cost-effective" },
      { id: "gpt-4o", label: "GPT-4o" },
      { id: "gpt-4.1-mini", label: "GPT-4.1 Mini" },
      { id: "gpt-4.1", label: "GPT-4.1" },
      { id: "o3-mini", label: "o3-mini" },
    ],
  },
  {
    id: "anthropic",
    label: "Anthropic",
    description: "Claude models via the Anthropic API.",
    mode: "online",
    requiresCredential: true,
    credentialLabel: "API Key",
    credentialPlaceholder: "sk-ant-…",
    credentialHelpUrl: "https://console.anthropic.com/settings/keys",
    models: [
      { id: "claude-sonnet-4-20250514", label: "Claude Sonnet 4" },
      { id: "claude-3-5-haiku-20241022", label: "Claude 3.5 Haiku", note: "Fast" },
      { id: "claude-3-5-sonnet-20241022", label: "Claude 3.5 Sonnet" },
    ],
  },
  {
    id: "google",
    label: "Google Gemini",
    description: "Gemini models via the Google AI Studio API.",
    mode: "online",
    requiresCredential: true,
    credentialLabel: "API Key",
    credentialPlaceholder: "AIza…",
    credentialHelpUrl: "https://aistudio.google.com/apikey",
    models: [
      { id: "gemini-2.0-flash", label: "Gemini 2.0 Flash", note: "Recommended" },
      { id: "gemini-2.0-flash-lite", label: "Gemini 2.0 Flash Lite" },
      { id: "gemini-1.5-pro", label: "Gemini 1.5 Pro" },
    ],
  },
  {
    id: "groq",
    label: "Groq",
    description: "Fast inference for open models via Groq.",
    mode: "online",
    requiresCredential: true,
    credentialLabel: "API Key",
    credentialPlaceholder: "gsk_…",
    credentialHelpUrl: "https://console.groq.com/keys",
    models: [
      { id: "llama-3.3-70b-versatile", label: "Llama 3.3 70B" },
      { id: "llama-3.1-8b-instant", label: "Llama 3.1 8B Instant", note: "Fast" },
      { id: "mixtral-8x7b-32768", label: "Mixtral 8x7B" },
    ],
  },
  {
    id: "openrouter",
    label: "OpenRouter",
    description: "Unified API for many hosted models.",
    mode: "online",
    requiresCredential: true,
    credentialLabel: "API Key",
    credentialPlaceholder: "sk-or-…",
    credentialHelpUrl: "https://openrouter.ai/keys",
    allowCustomModel: true,
    customModelHint: "openai/gpt-4o-mini",
    models: [
      { id: "openai/gpt-4o-mini", label: "OpenAI GPT-4o Mini" },
      { id: "anthropic/claude-3.5-sonnet", label: "Anthropic Claude 3.5 Sonnet" },
      { id: "google/gemini-2.0-flash-001", label: "Google Gemini 2.0 Flash" },
      { id: "meta-llama/llama-3.3-70b-instruct", label: "Meta Llama 3.3 70B" },
    ],
  },
];

export const DEFAULT_PROVIDER_ID: ProviderId = "local";

export function getProvider(id: ProviderId): AiProviderDefinition {
  const provider = AI_PROVIDERS.find((p) => p.id === id);
  if (!provider) {
    throw new Error(`Unknown provider: ${id}`);
  }
  return provider;
}

export function isOnlineProvider(id: ProviderId): boolean {
  return getProvider(id).mode === "online";
}

export function findProviderModel(providerId: ProviderId, modelId: string) {
  return getProvider(providerId).models.find((m) => m.id === modelId);
}
