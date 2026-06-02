export type WorkerRequest =
  | { type: "load"; modelId: string }
  | { type: "generate"; modelId: string; prompt: string; maxNewTokens?: number };

export type WorkerResponse =
  | { type: "ready"; modelId: string }
  | { type: "progress"; progress: number }
  | { type: "result"; text: string }
  | { type: "error"; message: string };
