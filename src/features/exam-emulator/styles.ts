/** Pearson VUE layout tokens */
export const VUE_STYLES = {
  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  headerBg: "#003366",
  toolbarBg: "#e8e8e8",
  borderColor: "#999999",
  highlightColor: "#3399ff",
  passageBg: "#ffffff",
  questionBg: "#f5f5f5",
  choiceHover: "#e0e8f0",
  timerWarning: "#cc0000",
} as const;

export const SECTION_DURATIONS_MINUTES: Record<string, number> = {
  "chem-phys": 95,
  cars: 90,
  "bio-biochem": 95,
  "psych-soc": 95,
};
