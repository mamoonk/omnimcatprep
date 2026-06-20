import type { Question } from "../../types/question";
import type { Passage } from "../../types/passage";
import type { ExamQuestion } from "../../types";

export function toExamQuestion(
  q: Question,
  passageMap: Map<string, Passage>,
): ExamQuestion {
  const passageBody = q.passageId
    ? passageMap.get(q.passageId)?.body ?? ""
    : "";
  return {
    id: q.id,
    section: q.section,
    passage: passageBody,
    stem: q.stem,
    choices: q.options.map((o) => ({ key: o.key, text: o.text })),
    correctAnswer: q.answerKey,
  };
}

export function buildPassageMap(passages: Passage[]): Map<string, Passage> {
  return new Map(passages.map((p) => [p.id, p]));
}
