import type { ReactNode } from "react";

const CLOZE_PATTERN = /\{\{c(\d+)::([^}]+)\}\}/g;

/** Strip cloze markup for plain-text display (e.g. card list previews). */
export function stripClozeMarkup(text: string): string {
  return text.replace(CLOZE_PATTERN, "$2");
}

/** True if the card front uses Anki-style cloze deletion syntax. */
export function isClozeCard(front: string): boolean {
  CLOZE_PATTERN.lastIndex = 0;
  return CLOZE_PATTERN.test(front);
}

export type ClozeSegment =
  | { type: "text"; value: string }
  | { type: "cloze"; clozeNum: number; answer: string };

/** Split front text into plain text and cloze segments. */
export function parseClozeSegments(front: string): ClozeSegment[] {
  const segments: ClozeSegment[] = [];
  let lastIndex = 0;
  const pattern = new RegExp(CLOZE_PATTERN.source, "g");
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(front)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", value: front.slice(lastIndex, match.index) });
    }
    segments.push({
      type: "cloze",
      clozeNum: parseInt(match[1], 10),
      answer: match[2],
    });
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < front.length) {
    segments.push({ type: "text", value: front.slice(lastIndex) });
  }

  return segments.length > 0 ? segments : [{ type: "text", value: front }];
}

interface RenderClozeOptions {
  reveal?: boolean;
}

/**
 * Render cloze front text.
 * - Hidden: blanks with underline styling
 * - Revealed: highlighted answers inline
 */
export function renderClozeFront(front: string, options: RenderClozeOptions = {}): ReactNode {
  const { reveal = false } = options;
  const segments = parseClozeSegments(front);

  return segments.map((segment, i) => {
    if (segment.type === "text") {
      return <span key={i}>{segment.value}</span>;
    }

    if (reveal) {
      return (
        <mark
          key={i}
          className="rounded bg-[#3399ff]/25 px-1 font-semibold text-[#003366]"
        >
          {segment.answer}
        </mark>
      );
    }

    const blankWidth = Math.max(segment.answer.length, 4);
    return (
      <span
        key={i}
        className="mx-0.5 inline-block min-w-[3rem] border-b-2 border-[#003366] px-1 text-center text-[#003366]/40"
        style={{ minWidth: `${blankWidth * 0.55}em` }}
        aria-label={`Cloze ${segment.clozeNum} blank`}
      >
        ···
      </span>
    );
  });
}
