import { pipeline, env, type ProgressInfo } from "@huggingface/transformers";
import type { WorkerRequest, WorkerResponse } from "./workerTypes";

env.allowLocalModels = false;
env.useBrowserCache = true;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let generator: any = null;
let loadedModelId: string | null = null;

async function ensureModel(modelId: string): Promise<void> {
  if (generator && loadedModelId === modelId) return;

  generator = null;
  loadedModelId = null;

  generator = await pipeline("text-generation", modelId, {
    device: "webgpu",
    dtype: "q4",
    progress_callback: (progressInfo: ProgressInfo) => {
      if ("progress" in progressInfo && typeof progressInfo.progress === "number") {
        self.postMessage({ type: "progress", progress: Math.round(progressInfo.progress) });
      }
    },
  });
  loadedModelId = modelId;
}

self.onmessage = async (event: MessageEvent<WorkerRequest>) => {
  const msg = event.data;
  try {
    if (msg.type === "load") {
      await ensureModel(msg.modelId);
      self.postMessage({ type: "ready", modelId: msg.modelId } satisfies WorkerResponse);
      return;
    }
    if (msg.type === "generate") {
      await ensureModel(msg.modelId);
      const output = await generator(msg.prompt, {
        max_new_tokens: msg.maxNewTokens ?? 256,
        do_sample: false,
      });
      const text = Array.isArray(output)
        ? (output[0] as { generated_text?: string })?.generated_text ?? String(output[0])
        : String(output);
      self.postMessage({ type: "result", text } satisfies WorkerResponse);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    self.postMessage({ type: "error", message } satisfies WorkerResponse);
  }
};

export type { WorkerRequest, WorkerResponse } from "./workerTypes";
