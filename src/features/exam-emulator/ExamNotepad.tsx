interface ExamNotepadProps {
  value: string;
  onChange: (value: string) => void;
  docked?: boolean;
}

export function ExamNotepad({ value, onChange, docked = true }: ExamNotepadProps) {
  return (
    <div
      className={
        docked
          ? "flex h-full flex-col border-l border-[#999] bg-white"
          : "rounded border border-[#999] bg-white p-2"
      }
    >
      <div className="border-b border-[#999] bg-[#e8e8e8] px-2 py-1 text-xs font-semibold text-[#003366]">
        Scratchpad (Markdown)
      </div>
      <textarea
        className="min-h-[120px] flex-1 resize-none p-2 font-mono text-sm outline-none"
        placeholder="# Notes&#10;- Key terms&#10;- Eliminated choices"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
