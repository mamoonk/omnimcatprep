import { useCallback, useEffect, useRef, useState } from "react";
import { getAiSelection } from "./aiPreferences";
import { getProvider, isOnlineProvider } from "./providers/catalog";
import { hasProviderCredential } from "./providers/credentials";
import { generateWithOnlineProvider } from "./providers/onlineClient";
import type { AiProviderDefinition, AiSelection } from "./providers/types";
import type { WorkerRequest, WorkerResponse } from "./workerTypes";

export type AiPhase = "idle" | "loading-model" | "generating";

export function useAi() {
  const workerRef = useRef<Worker | null>(null);
  const pendingPromptRef = useRef<string | null>(null);

  const [selection, setSelection] = useState<AiSelection>(getAiSelection);
  const [ready, setReady] = useState(false);
  const [loadedModelId, setLoadedModelId] = useState<string | null>(null);
  const [phase, setPhase] = useState<AiPhase>("idle");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [credentialPrompt, setCredentialPrompt] = useState<AiProviderDefinition | null>(
    null,
  );

  const isLocal = !isOnlineProvider(selection.providerId);
  const provider = getProvider(selection.providerId);
  const hasCredential =
    !provider.requiresCredential || hasProviderCredential(selection.providerId);
  const modelMismatch = Boolean(
    isLocal && ready && loadedModelId && loadedModelId !== selection.modelId,
  );

  const loading = phase !== "idle";
  const loadingModel = phase === "loading-model";
  const generating = phase === "generating";

  useEffect(() => {
    const worker = new Worker(new URL("./ai.worker.ts", import.meta.url), {
      type: "module",
    });
    workerRef.current = worker;

    worker.onmessage = (e: MessageEvent<WorkerResponse>) => {
      const msg = e.data;
      switch (msg.type) {
        case "ready":
          setReady(true);
          setLoadedModelId(msg.modelId);
          setPhase("idle");
          break;
        case "progress":
          setProgress(msg.progress);
          break;
        case "result":
          setResult(msg.text);
          setProgress(0);
          setPhase("idle");
          setReady(true);
          setLoadedModelId((current) => current ?? getAiSelection().modelId);
          break;
        case "error":
          setError(msg.message);
          setProgress(0);
          setPhase("idle");
          break;
      }
    };

    return () => worker.terminate();
  }, []);

  const refreshSelection = useCallback(() => {
    const next = getAiSelection();
    setSelection(next);
    if (isOnlineProvider(next.providerId)) {
      setReady(hasProviderCredential(next.providerId));
      setLoadedModelId(null);
    }
  }, []);

  const runOnlineGenerate = useCallback(async (prompt: string, active: AiSelection) => {
    try {
      const text = await generateWithOnlineProvider(active, { prompt, maxTokens: 512 });
      setResult(text);
      setReady(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setPhase("idle");
    }
  }, []);

  const runGenerate = useCallback(
    (prompt: string, active: AiSelection = getAiSelection()) => {
      setSelection(active);

      if (isOnlineProvider(active.providerId)) {
        const onlineProvider = getProvider(active.providerId);
        if (!hasProviderCredential(active.providerId)) {
          pendingPromptRef.current = prompt;
          setCredentialPrompt(onlineProvider);
          return;
        }
        setPhase("generating");
        setError(null);
        setResult(null);
        void runOnlineGenerate(prompt, active);
        return;
      }

      setPhase("generating");
      setError(null);
      setResult(null);
      workerRef.current?.postMessage({
        type: "generate",
        modelId: active.modelId,
        prompt,
        maxNewTokens: 256,
      } satisfies WorkerRequest);
    },
    [runOnlineGenerate],
  );

  const loadModel = useCallback((modelId?: string) => {
    const active = getAiSelection();
    if (isOnlineProvider(active.providerId)) {
      setSelection(active);
      setReady(hasProviderCredential(active.providerId));
      return;
    }

    const id = modelId ?? active.modelId;
    setSelection({ ...active, modelId: id });
    setReady(false);
    setLoadedModelId(null);
    setPhase("loading-model");
    setProgress(0);
    setError(null);
    workerRef.current?.postMessage({ type: "load", modelId: id } satisfies WorkerRequest);
  }, []);

  const generate = useCallback(
    (prompt: string) => {
      runGenerate(prompt, getAiSelection());
    },
    [runGenerate],
  );

  const dismissCredentialPrompt = useCallback(() => {
    setCredentialPrompt(null);
    pendingPromptRef.current = null;
  }, []);

  const handleCredentialSaved = useCallback(() => {
    const prompt = pendingPromptRef.current;
    pendingPromptRef.current = null;
    setCredentialPrompt(null);
    refreshSelection();
    if (prompt) {
      runGenerate(prompt, getAiSelection());
    }
  }, [refreshSelection, runGenerate]);

  return {
    selection,
    provider,
    isLocal,
    hasCredential,
    ready: isLocal ? ready : hasCredential,
    loadedModelId,
    modelMismatch,
    loading,
    loadingModel,
    generating,
    phase,
    progress,
    result,
    error,
    credentialPrompt,
    loadModel,
    generate,
    refreshSelection,
    dismissCredentialPrompt,
    handleCredentialSaved,
  };
}

/** @deprecated Use useAi */
export const useLocalAi = useAi;
