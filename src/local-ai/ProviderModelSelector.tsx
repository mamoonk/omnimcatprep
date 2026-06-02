import { useCallback, useEffect, useMemo, useState } from "react";
import { AI_PROVIDERS, getProvider, isOnlineProvider } from "./providers/catalog";
import {
  hasProviderCredential,
  maskCredential,
  getProviderCredential,
} from "./providers/credentials";
import {
  fetchOpenRouterModels,
  readOpenRouterModelCache,
} from "./providers/openRouterModels";
import { filterOpenRouterModels } from "./providers/openRouterFilters";
import type {
  AiProviderDefinition,
  AiSelection,
  OpenRouterModel,
  ProviderId,
} from "./providers/types";
import {
  OpenRouterModelFiltersPanel,
  useOpenRouterFiltersState,
} from "./OpenRouterModelFiltersPanel";
import { getAiSelection, setAiSelection } from "./aiPreferences";
import { isValidModelId, normalizeModelId } from "./modelCatalog";
import { Button } from "../components/Button";
import { ApiKeyDialog } from "./ApiKeyDialog";

const CUSTOM_VALUE = "__custom__";

interface ProviderModelSelectorProps {
  loadedLocalModelId?: string | null;
  onSelectionSaved?: (selection: AiSelection) => void;
  onConfigureCredential?: (provider: AiProviderDefinition) => void;
  compact?: boolean;
}

export function ProviderModelSelector({
  loadedLocalModelId,
  onSelectionSaved,
  onConfigureCredential,
  compact,
}: ProviderModelSelectorProps) {
  const initial = getAiSelection();
  const initialProvider = getProvider(initial.providerId);
  const initialPreset = initialProvider.models.find((m) => m.id === initial.modelId);

  const [providerId, setProviderId] = useState<ProviderId>(initial.providerId);
  const [modelMode, setModelMode] = useState<"preset" | "custom">(
    initialPreset || !initialProvider.allowCustomModel ? "preset" : "custom",
  );
  const [presetModelId, setPresetModelId] = useState(
    initialPreset?.id ?? initialProvider.models[0]?.id ?? "",
  );
  const [customModelId, setCustomModelId] = useState(
    initialPreset ? "" : initial.modelId,
  );
  const [savedSelection, setSavedSelection] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const [savedNotice, setSavedNotice] = useState(false);
  const [credentialDialogProvider, setCredentialDialogProvider] =
    useState<AiProviderDefinition | null>(null);
  const [credentialRev, setCredentialRev] = useState(0);
  const [openRouterModels, setOpenRouterModels] = useState<OpenRouterModel[] | null>(
    () => readOpenRouterModelCache(),
  );
  const [modelsLoading, setModelsLoading] = useState(false);
  const [modelsError, setModelsError] = useState<string | null>(null);
  const [openRouterFilters, setOpenRouterFilters] = useOpenRouterFiltersState();

  const provider = useMemo(() => getProvider(providerId), [providerId]);

  const catalogModels = useMemo(() => {
    if (providerId === "openrouter" && openRouterModels?.length) {
      return openRouterModels;
    }
    return provider.models;
  }, [providerId, provider.models, openRouterModels]);

  const filteredModels = useMemo(() => {
    if (providerId === "openrouter" && openRouterModels?.length) {
      return filterOpenRouterModels(openRouterModels, openRouterFilters);
    }
    return catalogModels;
  }, [providerId, openRouterModels, openRouterFilters, catalogModels]);

  const draftModelId =
    modelMode === "custom" && provider.allowCustomModel
      ? normalizeModelId(customModelId)
      : presetModelId;

  const draftValid =
    providerId === "local"
      ? isValidModelId(draftModelId)
      : Boolean(draftModelId) &&
        (modelMode === "custom" && provider.allowCustomModel
          ? draftModelId.length >= 2
          : catalogModels.some((m) => m.id === draftModelId));

  const draftSelection: AiSelection = { providerId, modelId: draftModelId };
  const hasUnsavedChanges =
    draftValid &&
    (draftSelection.providerId !== savedSelection.providerId ||
      draftSelection.modelId !== savedSelection.modelId);

  const credentialConfigured = !provider.requiresCredential || hasProviderCredential(providerId);
  const savedCredential = getProviderCredential(providerId);
  const needsLocalReload =
    savedSelection.providerId === "local" &&
    Boolean(loadedLocalModelId && loadedLocalModelId !== savedSelection.modelId);

  const loadOpenRouterModels = useCallback(async (forceRefresh = false) => {
    setModelsLoading(true);
    setModelsError(null);
    try {
      const apiKey = getProviderCredential("openrouter") ?? undefined;
      const models = await fetchOpenRouterModels(apiKey, { forceRefresh });
      setOpenRouterModels(models);
      if (!models.some((m) => m.id === presetModelId)) {
        setPresetModelId(models[0]?.id ?? presetModelId);
        setModelMode("preset");
      }
    } catch (err) {
      setModelsError(err instanceof Error ? err.message : String(err));
    } finally {
      setModelsLoading(false);
    }
  }, [presetModelId]);

  useEffect(() => {
    if (providerId !== "openrouter" || modelMode !== "preset") return;
    if (filteredModels.length === 0) return;
    if (!filteredModels.some((m) => m.id === presetModelId)) {
      setPresetModelId(filteredModels[0].id);
    }
  }, [providerId, modelMode, filteredModels, presetModelId]);

  useEffect(() => {
    if (providerId !== "openrouter") return;
    if (!hasProviderCredential("openrouter")) {
      setOpenRouterModels(null);
      setModelsError(null);
      return;
    }
    void loadOpenRouterModels(false);
  }, [providerId, credentialRev, loadOpenRouterModels]);

  const openCredentialDialog = (target: AiProviderDefinition) => {
    setCredentialDialogProvider(target);
    onConfigureCredential?.(target);
  };

  const persistSelection = () => {
    setError(null);
    setSavedNotice(false);
    try {
      const selection = setAiSelection(draftSelection);
      setSavedSelection(selection);
      setSavedNotice(true);
      onSelectionSaved?.(selection);

      if (isOnlineProvider(selection.providerId) && !hasProviderCredential(selection.providerId)) {
        openCredentialDialog(getProvider(selection.providerId));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const handleProviderChange = (nextProviderId: ProviderId) => {
    setProviderId(nextProviderId);
    setSavedNotice(false);
    const nextProvider = getProvider(nextProviderId);
    setPresetModelId(nextProvider.models[0]?.id ?? "");
    setModelMode("preset");
    setCustomModelId("");

    if (nextProvider.requiresCredential && !hasProviderCredential(nextProviderId)) {
      openCredentialDialog(nextProvider);
    }
  };

  const handleCredentialSaved = () => {
    setCredentialDialogProvider(null);
    setCredentialRev((v) => v + 1);
    if (credentialDialogProvider?.id === "openrouter") {
      void loadOpenRouterModels(true);
    }
  };

  return (
    <>
      <div className={compact ? "space-y-3" : "space-y-4"}>
        <div>
          <label htmlFor="ai-provider" className="text-sm font-medium text-slate-700">
            Provider
          </label>
          <select
            id="ai-provider"
            value={providerId}
            onChange={(e) => handleProviderChange(e.target.value as ProviderId)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 focus:border-[#3399ff] focus:outline-none focus:ring-2 focus:ring-[#3399ff]/20"
          >
            {AI_PROVIDERS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
                {item.mode === "local" ? " · Offline" : " · Online"}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-xs text-slate-500">
            {providerId === "openrouter" && credentialConfigured
              ? "Full OpenRouter catalog loads after your API key is saved."
              : provider.description}
          </p>
        </div>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label htmlFor="ai-model" className="text-sm font-medium text-slate-700">
              Model
            </label>
            {providerId === "openrouter" && credentialConfigured && (
              <button
                type="button"
                onClick={() => void loadOpenRouterModels(true)}
                disabled={modelsLoading}
                className="text-xs font-medium text-[#3399ff] hover:underline disabled:opacity-50"
              >
                {modelsLoading ? "Loading…" : "Refresh catalog"}
              </button>
            )}
          </div>

          {providerId === "openrouter" && credentialConfigured && openRouterModels && (
            <OpenRouterModelFiltersPanel
              models={openRouterModels}
              filters={openRouterFilters}
              onChange={setOpenRouterFilters}
              loading={modelsLoading}
            />
          )}

          {providerId === "openrouter" && !credentialConfigured && (
            <p className="mt-2 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
              Save your OpenRouter API key below to load the full model catalog (300+ models).
            </p>
          )}

          {modelsLoading && providerId === "openrouter" && (
            <p className="mt-2 text-xs text-slate-500">Fetching models from OpenRouter…</p>
          )}

          {modelsError && providerId === "openrouter" && (
            <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
              {modelsError} Showing built-in shortcuts. Use Custom model id or try Refresh catalog.
            </p>
          )}

          <select
            id="ai-model"
            value={modelMode === "custom" ? CUSTOM_VALUE : presetModelId}
            onChange={(e) => {
              const value = e.target.value;
              if (value === CUSTOM_VALUE) {
                setModelMode("custom");
                if (!customModelId) setCustomModelId(presetModelId);
              } else {
                setModelMode("preset");
                setPresetModelId(value);
              }
              setSavedNotice(false);
            }}
            disabled={
              (providerId === "openrouter" && modelsLoading) ||
              (providerId === "openrouter" && filteredModels.length === 0 && modelMode === "preset")
            }
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 focus:border-[#3399ff] focus:outline-none focus:ring-2 focus:ring-[#3399ff]/20 disabled:opacity-60"
          >
            {(providerId === "openrouter" && credentialConfigured && openRouterModels
              ? filteredModels
              : provider.models
            ).map((model) => (
              <option key={model.id} value={model.id}>
                {model.label}
                {model.note ? ` (${model.note})` : ""}
              </option>
            ))}
            {provider.allowCustomModel && (
              <option value={CUSTOM_VALUE}>
                {providerId === "local" ? "Custom Hugging Face model…" : "Custom model id…"}
              </option>
            )}
          </select>
        </div>

        {modelMode === "custom" && provider.allowCustomModel && (
          <div>
            <label htmlFor="ai-custom-model" className="text-sm font-medium text-slate-700">
              Custom model id
            </label>
            <input
              id="ai-custom-model"
              type="text"
              value={customModelId}
              onChange={(e) => {
                setCustomModelId(e.target.value);
                setSavedNotice(false);
              }}
              placeholder={provider.customModelHint}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#3399ff] focus:outline-none focus:ring-2 focus:ring-[#3399ff]/20"
            />
          </div>
        )}

        {provider.requiresCredential && (
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-800">
                  {provider.credentialLabel ?? "API Key"}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {credentialConfigured && savedCredential
                    ? `Configured (${maskCredential(savedCredential)})`
                    : "Required before online generation."}
                </p>
              </div>
              <Button
                variant="secondary"
                onClick={() => openCredentialDialog(provider)}
              >
                {credentialConfigured ? "Update key" : "Add key"}
              </Button>
            </div>
          </div>
        )}

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}

        {savedNotice && !hasUnsavedChanges && (
          <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            Provider and model saved.
            {isOnlineProvider(savedSelection.providerId) && !credentialConfigured && (
              <> Add your API key to start generating.</>
            )}
          </p>
        )}

        {needsLocalReload && (
          <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
            A different local model is loaded ({loadedLocalModelId}). Reload the model on the AI
            Tutor page.
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="secondary"
            onClick={persistSelection}
            disabled={!draftValid || !hasUnsavedChanges}
          >
            Save choice
          </Button>
          <p className="text-xs text-slate-500">
            Active:{" "}
            <span className="font-mono text-slate-700">
              {savedSelection.providerId}/{savedSelection.modelId}
            </span>
          </p>
        </div>
      </div>

      {credentialDialogProvider && (
        <ApiKeyDialog
          open
          provider={credentialDialogProvider}
          onClose={() => setCredentialDialogProvider(null)}
          onSaved={handleCredentialSaved}
        />
      )}
    </>
  );
}
