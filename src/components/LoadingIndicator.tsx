interface LoadingIndicatorProps {
  label: string;
  /** 0–100 when known; omit or 0 for indeterminate spinner only */
  progress?: number;
  sublabel?: string;
}

export function LoadingIndicator({ label, progress, sublabel }: LoadingIndicatorProps) {
  const hasProgress = progress !== undefined && progress > 0;

  return (
    <div
      className="glass-card-static animate-scale-in rounded-2xl p-4"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex items-center gap-4">
        <div
          className="h-10 w-10 shrink-0 animate-spin rounded-full border-[3px] border-[#003366]/20 border-t-[#003366]"
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-[#003366]">{label}</p>
          {sublabel && <p className="mt-0.5 text-xs text-gray-500">{sublabel}</p>}
        </div>
        {hasProgress && (
          <span className="shrink-0 text-sm font-semibold tabular-nums text-[#003366]">
            {Math.round(progress)}%
          </span>
        )}
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
        {hasProgress ? (
          <div
            className="h-full rounded-full bg-[#3399ff] transition-all duration-300 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        ) : (
          <div className="loading-bar-indeterminate h-full w-1/3 rounded-full bg-[#3399ff]" />
        )}
      </div>
    </div>
  );
}
