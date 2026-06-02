import { LoadingIndicator } from "../components/LoadingIndicator";
import type { AiPhase } from "./useAi";

interface AiActivityPanelProps {
  phase: AiPhase;
  progress: number;
  result: string | null;
  error: string | null;
  providerLabel?: string;
  isOnline?: boolean;
}

export function AiActivityPanel({
  phase,
  progress,
  result,
  error,
  providerLabel,
  isOnline,
}: AiActivityPanelProps) {
  return (
    <div className="space-y-4">
      {phase === "loading-model" && (
        <LoadingIndicator
          label="Loading AI model…"
          progress={progress}
          sublabel={
            progress > 0
              ? "Downloading and initializing on WebGPU — first run may take a few minutes."
              : "Starting download from Hugging Face…"
          }
        />
      )}

      {phase === "generating" && (
        <LoadingIndicator
          label={
            progress > 0
              ? "Loading AI model…"
              : isOnline
                ? `Contacting ${providerLabel ?? "provider"}…`
                : "Generating response…"
          }
          progress={progress > 0 ? progress : undefined}
          sublabel={
            progress > 0
              ? "Downloading and initializing on WebGPU — first run may take a few minutes."
              : isOnline
                ? "Sending your prompt to the online API. Requires an internet connection."
                : "Running inference locally on your GPU. This may take 10–30 seconds."
          }
        />
      )}

      {error && (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {result && phase === "idle" && (
        <div className="rounded border border-gray-300 bg-white p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Response
          </p>
          <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}
