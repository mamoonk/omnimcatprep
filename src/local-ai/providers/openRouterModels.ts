import type { OpenRouterModel } from "./types";

const OPENROUTER_MODELS_URL =
  "https://openrouter.ai/api/v1/models?output_modalities=text";
const CACHE_KEY = "mcatprep_openrouter_models_v2";
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

interface OpenRouterModelRecord {
  id: string;
  name?: string;
  description?: string;
  context_length?: number;
  expiration_date?: string | null;
  architecture?: {
    output_modalities?: string[];
    modality?: string;
  };
  pricing?: {
    prompt?: string | number;
    completion?: string | number;
    request?: string | number;
  };
}

interface CachedOpenRouterModels {
  fetchedAt: number;
  models: OpenRouterModel[];
}

function parsePrice(value: string | number | undefined): number {
  if (value === undefined || value === null || value === "") return 0;
  const n = typeof value === "number" ? value : Number.parseFloat(value);
  return Number.isFinite(n) ? n : 0;
}

export function isOpenRouterModelFree(pricing?: OpenRouterModelRecord["pricing"]): boolean {
  if (!pricing) return false;
  const prompt = parsePrice(pricing.prompt);
  const completion = parsePrice(pricing.completion);
  const request = parsePrice(pricing.request);
  return prompt === 0 && completion === 0 && request === 0;
}

function isUsableChatModel(model: OpenRouterModelRecord): boolean {
  const id = model.id.toLowerCase();
  if (id.includes("embed")) return false;
  if (model.expiration_date) {
    const expires = Date.parse(model.expiration_date);
    if (!Number.isNaN(expires) && expires < Date.now()) return false;
  }

  const outputs = model.architecture?.output_modalities;
  if (outputs?.length && !outputs.includes("text")) return false;

  return true;
}

function extractOrg(modelId: string): string {
  const slash = modelId.indexOf("/");
  return slash > 0 ? modelId.slice(0, slash) : modelId;
}

function toOpenRouterModel(model: OpenRouterModelRecord): OpenRouterModel {
  const isFree = isOpenRouterModelFree(model.pricing);
  const context =
    model.context_length && model.context_length > 0
      ? `${Math.round(model.context_length / 1000)}k ctx`
      : undefined;

  const noteParts = [isFree ? "Free" : undefined, context].filter(Boolean);

  return {
    id: model.id,
    label: model.name?.trim() || model.id,
    note: noteParts.length ? noteParts.join(" · ") : undefined,
    org: extractOrg(model.id),
    isFree,
  };
}

export function readOpenRouterModelCache(): OpenRouterModel[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw) as CachedOpenRouterModels;
    if (Date.now() - cached.fetchedAt > CACHE_TTL_MS) return null;
    return cached.models;
  } catch {
    return null;
  }
}

function writeOpenRouterModelCache(models: OpenRouterModel[]): void {
  const payload: CachedOpenRouterModels = {
    fetchedAt: Date.now(),
    models,
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
}

export async function fetchOpenRouterModels(
  apiKey?: string,
  options?: { forceRefresh?: boolean },
): Promise<OpenRouterModel[]> {
  if (!options?.forceRefresh) {
    const cached = readOpenRouterModelCache();
    if (cached?.length) return cached;
  }

  const headers: Record<string, string> = {};
  if (apiKey?.trim()) {
    headers.Authorization = `Bearer ${apiKey.trim()}`;
  }

  const response = await fetch(OPENROUTER_MODELS_URL, { headers });
  if (!response.ok) {
    throw new Error(
      `Could not load OpenRouter models (${response.status} ${response.statusText})`,
    );
  }

  const body = (await response.json()) as { data?: OpenRouterModelRecord[] };
  const models = (body.data ?? [])
    .filter(isUsableChatModel)
    .map(toOpenRouterModel)
    .sort((a, b) => a.label.localeCompare(b.label));

  if (models.length === 0) {
    throw new Error("OpenRouter returned no text chat models.");
  }

  writeOpenRouterModelCache(models);
  return models;
}

export function clearOpenRouterModelCache(): void {
  localStorage.removeItem(CACHE_KEY);
  localStorage.removeItem("mcatprep_openrouter_models_v1");
}
