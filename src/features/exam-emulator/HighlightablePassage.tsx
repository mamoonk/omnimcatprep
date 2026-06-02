import { useCallback, useRef } from "react";
import { VUE_STYLES } from "./styles";

interface HighlightablePassageProps {
  text: string;
}

export function HighlightablePassage({ text }: HighlightablePassageProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleHighlight = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !ref.current) return;
    const range = selection.getRangeAt(0);
    if (!ref.current.contains(range.commonAncestorContainer)) return;

    const span = document.createElement("span");
    span.style.backgroundColor = VUE_STYLES.highlightColor;
    span.style.color = "#fff";
    try {
      range.surroundContents(span);
    } catch {
      // partial selection across nodes — skip
    }
    selection.removeAllRanges();
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="flex gap-2 border-b border-[#999] bg-[#e8e8e8] px-2 py-1">
        <button
          type="button"
          onClick={handleHighlight}
          className="rounded border border-[#999] bg-white px-2 py-0.5 text-xs hover:bg-[#3399ff] hover:text-white"
        >
          Highlight
        </button>
      </div>
      <div
        ref={ref}
        className="flex-1 overflow-y-auto p-4 text-sm leading-relaxed"
        style={{ fontFamily: VUE_STYLES.fontFamily }}
      >
        {text}
      </div>
    </div>
  );
}
