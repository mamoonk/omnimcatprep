const WIZARD_HIDDEN_KEY = "mcatprep_wizard_hidden";
const LEGACY_WIZARD_KEY = "mcatprep_wizard_done";

/** User opted out via "Don't display this next time" */
export function isWizardHidden(): boolean {
  try {
    // Legacy key from earlier builds — clear so tour shows by default again
    if (localStorage.getItem(LEGACY_WIZARD_KEY)) {
      localStorage.removeItem(LEGACY_WIZARD_KEY);
    }
    return localStorage.getItem(WIZARD_HIDDEN_KEY) === "true";
  } catch {
    return false;
  }
}

export function setWizardHidden(hidden: boolean): void {
  try {
    if (hidden) {
      localStorage.setItem(WIZARD_HIDDEN_KEY, "true");
    } else {
      localStorage.removeItem(WIZARD_HIDDEN_KEY);
    }
  } catch {
    /* ignore */
  }
}

/** Re-enable the guided tour on Home (Settings) */
export function enableWizardOnStartup(): void {
  setWizardHidden(false);
}
