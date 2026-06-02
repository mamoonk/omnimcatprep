import { DEFAULT_MODEL_ID, isValidModelId, normalizeModelId } from "./modelCatalog";
import {
  DEFAULT_PROVIDER_ID,
  findProviderModel,
  getProvider,
} from "./providers/catalog";
import type { AiSelection, ProviderId } from "./providers/types";

const SELECTION_KEY = "mcatprep_ai_selection";
const LEGACY_MODEL_KEY = "mcatprep_ai_model_id";

function isProviderId(value: string): value is ProviderId {
  return ["local", "openai", "anthropic", "google", "groq", "openrouter"].includes(value);
}

function defaultSelectionForProvider(providerId: ProviderId): AiSelection {
  const provider = getProvider(providerId);
  return {
    providerId,
    modelId: provider.models[0]?.id ?? DEFAULT_MODEL_ID,
  };
}

function migrateLegacySelection(): AiSelection | null {
  try {
    const legacyModel = localStorage.getItem(LEGACY_MODEL_KEY);
    if (legacyModel && isValidModelId(legacyModel)) {
      localStorage.removeItem(LEGACY_MODEL_KEY);
      return { providerId: "local", modelId: normalizeModelId(legacyModel) };
    }
  } catch {
    // ignore
  }
  return null;
}

export function getAiSelection(): AiSelection {
  try {
    const raw = localStorage.getItem(SELECTION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<AiSelection>;
      if (
        parsed.providerId &&
        isProviderId(parsed.providerId) &&
        typeof parsed.modelId === "string" &&
        parsed.modelId.trim()
      ) {
        return {
          providerId: parsed.providerId,
          modelId: parsed.modelId.trim(),
        };
      }
    }
  } catch {
    // ignore
  }

  const migrated = migrateLegacySelection();
  if (migrated) {
    setAiSelection(migrated);
    return migrated;
  }

  return defaultSelectionForProvider(DEFAULT_PROVIDER_ID);
}

export function setAiSelection(selection: AiSelection): AiSelection {
  const provider = getProvider(selection.providerId);
  const modelId = selection.modelId.trim();

  if (!modelId) {
    throw new Error("Select a model.");
  }

  if (selection.providerId === "local") {
    if (!isValidModelId(modelId)) {
      throw new Error("Enter a valid Hugging Face model id (e.g. Xenova/Phi-3-mini-4k-instruct).");
    }
  } else if (!provider.allowCustomModel && !findProviderModel(selection.providerId, modelId)) {
    throw new Error("Select a valid model for this provider.");
  } else if (provider.allowCustomModel && modelId.length < 2) {
    throw new Error("Enter a valid model id.");
  }

  const normalized: AiSelection = {
    providerId: selection.providerId,
    modelId: selection.providerId === "local" ? normalizeModelId(modelId) : modelId,
  };

  localStorage.setItem(SELECTION_KEY, JSON.stringify(normalized));
  return normalized;
}

export function selectionRequiresCredential(selection: AiSelection = getAiSelection()): boolean {
  const provider = getProvider(selection.providerId);
  return provider.requiresCredential;
}

/** @deprecated Use getAiSelection().modelId for local models */
export function getSelectedModelId(): string {
  const selection = getAiSelection();
  return selection.providerId === "local" ? selection.modelId : DEFAULT_MODEL_ID;
}

/** @deprecated Use setAiSelection */
export function setSelectedModelId(modelId: string): string {
  const selection = setAiSelection({ providerId: "local", modelId });
  return selection.modelId;
}
