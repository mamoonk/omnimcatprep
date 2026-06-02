export interface ModelOption {
  id: string;
  label: string;
  size: string;
  note?: string;
}

/** Transformers.js-compatible ONNX models (typically Xenova/* on Hugging Face). */
export const RECOMMENDED_MODELS: ModelOption[] = [
  {
    id: "Xenova/Phi-3-mini-4k-instruct",
    label: "Phi-3 Mini Instruct",
    size: "~2.3 GB",
    note: "Default — strong quality for explanations",
  },
  {
    id: "Xenova/Qwen2.5-0.5B-Instruct",
    label: "Qwen 2.5 0.5B Instruct",
    size: "~350 MB",
    note: "Lightweight, faster downloads",
  },
  {
    id: "Xenova/smollm2-360m-instruct",
    label: "SmolLM2 360M Instruct",
    size: "~250 MB",
    note: "Smallest recommended instruct model",
  },
  {
    id: "Xenova/LaMini-GPT-774M",
    label: "LaMini GPT 774M",
    size: "~450 MB",
  },
  {
    id: "Xenova/gpt2",
    label: "GPT-2",
    size: "~150 MB",
    note: "Legacy baseline — not instruction-tuned",
  },
];

export const DEFAULT_MODEL_ID = RECOMMENDED_MODELS[0].id;

/** Hugging Face repo id: `organization/model-name` */
export function normalizeModelId(input: string): string {
  return input.trim();
}

export function isValidModelId(id: string): boolean {
  const normalized = normalizeModelId(id);
  if (normalized.length < 3 || normalized.length > 120) return false;
  return /^[\w.-]+\/[\w.-]+$/.test(normalized);
}

export function findRecommendedModel(id: string): ModelOption | undefined {
  return RECOMMENDED_MODELS.find((m) => m.id === id);
}
