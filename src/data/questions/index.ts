import type { Question } from "../../types/question";
import { BIO_BIOCHEM_QUESTIONS } from "./bio-biochem";
import { CHEM_PHYS_QUESTIONS } from "./chem-phys";
import { PSYCH_SOC_QUESTIONS } from "./psych-soc";
import { CARS_QUESTIONS } from "./cars";

export const ALL_QUESTIONS: Question[] = [
  ...BIO_BIOCHEM_QUESTIONS,
  ...CHEM_PHYS_QUESTIONS,
  ...PSYCH_SOC_QUESTIONS,
  ...CARS_QUESTIONS,
];

export function getQuestionsByCategory(categoryId: string): Question[] {
  return ALL_QUESTIONS.filter((q) => q.contentCategoryId === categoryId);
}

export function getQuestionsBySection(section: string): Question[] {
  return ALL_QUESTIONS.filter((q) => q.section === section);
}

export function getQuestionById(id: string): Question | undefined {
  return ALL_QUESTIONS.find((q) => q.id === id);
}
