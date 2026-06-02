import type { ExamQuestion } from "../../types";

export const MOCK_EXAM_QUESTIONS: ExamQuestion[] = [
  {
    id: "q-1",
    section: "bio-biochem",
    passage:
      "Enzyme kinetics experiments measured reaction velocity at varying substrate concentrations. The Lineweaver-Burk plot revealed a competitive inhibitor shifting the x-intercept while maintaining the y-intercept.",
    stem: "Which change is most consistent with competitive inhibition?",
    choices: [
      { key: "A", text: "Decreased Vmax with unchanged Km" },
      { key: "B", text: "Unchanged Vmax with increased apparent Km" },
      { key: "C", text: "Decreased Vmax and decreased Km" },
      { key: "D", text: "Increased Vmax with decreased Km" },
    ],
    correctAnswer: "B",
  },
  {
    id: "q-2",
    section: "cars",
    passage:
      "The author argues that scientific consensus emerges not from unanimity but from sustained scrutiny of dissenting hypotheses within methodological constraints.",
    stem: "The author's primary claim is that consensus:",
    choices: [
      { key: "A", text: "Requires complete agreement among experts" },
      { key: "B", text: "Emerges through rigorous evaluation of alternatives" },
      { key: "C", text: "Discourages methodological dissent" },
      { key: "D", text: "Precedes empirical validation" },
    ],
    correctAnswer: "B",
  },
];
