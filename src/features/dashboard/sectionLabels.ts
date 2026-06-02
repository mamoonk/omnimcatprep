import type { McatSection } from "../../types";

export const SECTION_LABELS: Record<McatSection, string> = {
  "chem-phys": "Chem/Phys",
  cars: "CARS",
  "bio-biochem": "Bio/Biochem",
  "psych-soc": "Psych/Soc",
};

export const ALL_SECTIONS: McatSection[] = [
  "chem-phys",
  "cars",
  "bio-biochem",
  "psych-soc",
];

export function sectionLabel(section: McatSection): string {
  return SECTION_LABELS[section] ?? section;
}
