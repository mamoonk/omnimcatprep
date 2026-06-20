interface Props {
  body: string;
}

export function LessonBody({ body }: Props) {
  const lines = body.split("\n");
  const elements: React.ReactNode[] = [];
  let inList = false;
  let listItems: React.ReactNode[] = [];
  let listKey = 0;

  function flushList() {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${listKey++}`} className="mb-4 list-disc space-y-1 pl-6 text-sm">
          {listItems}
        </ul>,
      );
      listItems = [];
    }
    inList = false;
  }

  function renderInline(text: string): React.ReactNode {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let idx = 0;

    const boldRegex = /\*\*(.+?)\*\*/g;
    let match: RegExpExecArray | null;
    let lastIndex = 0;

    while ((match = boldRegex.exec(remaining)) !== null) {
      if (match.index > lastIndex) {
        parts.push(remaining.slice(lastIndex, match.index));
      }
      parts.push(<strong key={idx++}>{match[1]}</strong>);
      lastIndex = boldRegex.lastIndex;
    }
    if (lastIndex < remaining.length) {
      parts.push(remaining.slice(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  }

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (line.startsWith("## ")) {
      flushList();
      elements.push(
        <h3 key={`h3-${elements.length}`} className="mb-3 mt-6 text-base font-bold text-[#003366]">
          {renderInline(line.slice(3))}
        </h3>,
      );
    } else if (line.startsWith("### ")) {
      flushList();
      elements.push(
        <h4 key={`h4-${elements.length}`} className="mb-2 mt-4 text-sm font-semibold text-slate-700">
          {renderInline(line.slice(4))}
        </h4>,
      );
    } else if (line.startsWith("- ")) {
      inList = true;
      listItems.push(
        <li key={`li-${listItems.length}`}>{renderInline(line.slice(2))}</li>,
      );
    } else if (line === "") {
      if (inList) flushList();
    } else {
      flushList();
      elements.push(
        <p key={`p-${elements.length}`} className="mb-3 text-sm leading-relaxed text-slate-700">
          {renderInline(line)}
        </p>,
      );
    }
  }
  flushList();

  return <div className="lesson-body">{elements}</div>;
}
