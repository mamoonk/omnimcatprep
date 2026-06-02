import type { MistakeAnalysis } from "../../types";

interface GuaranteeModalProps {
  open: boolean;
  pending: Partial<MistakeAnalysis> | null;
  onFieldChange: (field: keyof MistakeAnalysis, value: string) => void;
  onSubmit: () => void;
}

export function GuaranteeModal({
  open,
  pending,
  onFieldChange,
  onSubmit,
}: GuaranteeModalProps) {
  if (!open || !pending) return null;

  const complete =
    pending.infoGap?.trim() &&
    pending.distractorTrap?.trim() &&
    pending.preventiveRule?.trim();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guarantee-title"
    >
      <div className="w-full max-w-lg rounded bg-white p-6 shadow-xl">
        <h2 id="guarantee-title" className="mb-2 text-lg font-bold text-[#003366]">
          Guarantee Mode — Mistake Analysis Required
        </h2>
        <p className="mb-4 text-sm text-gray-600">
          You must complete all three fields before continuing practice.
        </p>
        <div className="space-y-3">
          <label className="block">
            <span className="text-sm font-medium">Information Gap</span>
            <textarea
              className="mt-1 w-full rounded border border-gray-400 p-2 text-sm"
              rows={2}
              value={pending.infoGap ?? ""}
              onChange={(e) => onFieldChange("infoGap", e.target.value)}
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Distractor Trap</span>
            <textarea
              className="mt-1 w-full rounded border border-gray-400 p-2 text-sm"
              rows={2}
              value={pending.distractorTrap ?? ""}
              onChange={(e) => onFieldChange("distractorTrap", e.target.value)}
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Preventive Rule</span>
            <textarea
              className="mt-1 w-full rounded border border-gray-400 p-2 text-sm"
              rows={2}
              value={pending.preventiveRule ?? ""}
              onChange={(e) => onFieldChange("preventiveRule", e.target.value)}
            />
          </label>
        </div>
        <button
          type="button"
          disabled={!complete}
          onClick={onSubmit}
          className="mt-4 w-full rounded bg-[#003366] px-4 py-2 text-white disabled:opacity-40"
        >
          Submit & Continue
        </button>
      </div>
    </div>
  );
}
