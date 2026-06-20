import type { Lesson } from "../../types/lesson";
import { BIO_BIOCHEM_LESSONS } from "./bio-biochem";
import { CARS_LESSONS } from "./cars";
import { CHEM_PHYS_LESSONS } from "./chem-phys";
import { PSYCH_SOC_LESSONS } from "./psych-soc";

export const ALL_LESSONS: Lesson[] = [...BIO_BIOCHEM_LESSONS, ...CARS_LESSONS, ...CHEM_PHYS_LESSONS, ...PSYCH_SOC_LESSONS];

export function getLessonById(id: string): Lesson | undefined {
  return ALL_LESSONS.find((l) => l.id === id);
}

export function getLessonsByCategory(categoryId: string): Lesson[] {
  return ALL_LESSONS.filter((l) => l.contentCategoryId === categoryId);
}
