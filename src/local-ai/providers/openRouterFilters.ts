import type { OpenRouterModel } from "./types";

export interface OpenRouterModelFilters {
  search: string;
  freeOnly: boolean;
  excludedOrgs: string[];
}

export const DEFAULT_OPENROUTER_FILTERS: OpenRouterModelFilters = {
  search: "",
  freeOnly: false,
  excludedOrgs: [],
};

const FILTERS_KEY = "mcatprep_openrouter_filters";

export function extractModelOrg(modelId: string): string {
  const slash = modelId.indexOf("/");
  return slash > 0 ? modelId.slice(0, slash).toLowerCase() : modelId.toLowerCase();
}

export function listOpenRouterOrgs(models: OpenRouterModel[]): string[] {
  const orgs = new Set(models.map((m) => m.org));
  return Array.from(orgs).sort((a, b) => a.localeCompare(b));
}

export function filterOpenRouterModels(
  models: OpenRouterModel[],
  filters: OpenRouterModelFilters,
): OpenRouterModel[] {
  const query = filters.search.trim().toLowerCase();

  return models.filter((model) => {
    if (filters.freeOnly && !model.isFree) return false;
    if (filters.excludedOrgs.includes(model.org)) return false;
    if (!query) return true;
    return (
      model.id.toLowerCase().includes(query) ||
      model.label.toLowerCase().includes(query) ||
      model.org.toLowerCase().includes(query)
    );
  });
}

export function readOpenRouterFilters(): OpenRouterModelFilters {
  try {
    const raw = localStorage.getItem(FILTERS_KEY);
    if (!raw) return { ...DEFAULT_OPENROUTER_FILTERS };
    const parsed = JSON.parse(raw) as Partial<OpenRouterModelFilters>;
    return {
      search: typeof parsed.search === "string" ? parsed.search : "",
      freeOnly: Boolean(parsed.freeOnly),
      excludedOrgs: Array.isArray(parsed.excludedOrgs)
        ? parsed.excludedOrgs.filter((o): o is string => typeof o === "string")
        : [],
    };
  } catch {
    return { ...DEFAULT_OPENROUTER_FILTERS };
  }
}

export function saveOpenRouterFilters(filters: OpenRouterModelFilters): void {
  localStorage.setItem(FILTERS_KEY, JSON.stringify(filters));
}

export function toggleExcludedOrg(
  excludedOrgs: string[],
  org: string,
  exclude: boolean,
): string[] {
  if (exclude) {
    return excludedOrgs.includes(org) ? excludedOrgs : [...excludedOrgs, org].sort();
  }
  return excludedOrgs.filter((item) => item !== org);
}
