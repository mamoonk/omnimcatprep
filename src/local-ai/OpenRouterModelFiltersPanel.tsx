import { useMemo, useState } from "react";
import type { OpenRouterModel } from "./providers/types";
import {
  filterOpenRouterModels,
  listOpenRouterOrgs,
  readOpenRouterFilters,
  saveOpenRouterFilters,
  toggleExcludedOrg,
  type OpenRouterModelFilters,
} from "./providers/openRouterFilters";

interface OpenRouterModelFiltersPanelProps {
  models: OpenRouterModel[];
  filters: OpenRouterModelFilters;
  onChange: (filters: OpenRouterModelFilters) => void;
  loading?: boolean;
}

export function OpenRouterModelFiltersPanel({
  models,
  filters,
  onChange,
  loading,
}: OpenRouterModelFiltersPanelProps) {
  const [showProviderFilters, setShowProviderFilters] = useState(
    filters.excludedOrgs.length > 0,
  );
  const [orgSearch, setOrgSearch] = useState("");

  const orgs = useMemo(() => listOpenRouterOrgs(models), [models]);
  const filteredOrgs = useMemo(() => {
    const q = orgSearch.trim().toLowerCase();
    if (!q) return orgs;
    return orgs.filter((org) => org.includes(q));
  }, [orgs, orgSearch]);

  const filteredModels = useMemo(
    () => filterOpenRouterModels(models, filters),
    [models, filters],
  );

  const freeCount = useMemo(() => models.filter((m) => m.isFree).length, [models]);

  const update = (patch: Partial<OpenRouterModelFilters>) => {
    const next = { ...filters, ...patch };
    onChange(next);
    saveOpenRouterFilters(next);
  };

  return (
    <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Catalog filters
        </p>
        {!loading && (
          <p className="text-xs text-slate-500">
            {filteredModels.length} of {models.length} shown · {freeCount} free
          </p>
        )}
      </div>

      <input
        type="search"
        value={filters.search}
        onChange={(e) => update({ search: e.target.value })}
        placeholder="Search by name, id, or provider…"
        disabled={loading}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#3399ff] focus:outline-none focus:ring-2 focus:ring-[#3399ff]/20 disabled:opacity-60"
      />

      <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={filters.freeOnly}
          onChange={(e) => update({ freeOnly: e.target.checked })}
          disabled={loading}
          className="h-4 w-4 rounded border-slate-300 text-[#003366] focus:ring-[#3399ff]"
        />
        Free models only
      </label>

      <div>
        <button
          type="button"
          onClick={() => setShowProviderFilters((v) => !v)}
          className="flex w-full items-center justify-between rounded-lg px-1 py-1 text-sm font-medium text-slate-700 hover:text-[#003366]"
        >
          <span>
            Hide providers
            {filters.excludedOrgs.length > 0 && (
              <span className="ml-2 rounded-full bg-slate-200 px-2 py-0.5 text-xs font-normal">
                {filters.excludedOrgs.length} hidden
              </span>
            )}
          </span>
          <span className="text-xs text-slate-400">{showProviderFilters ? "▲" : "▼"}</span>
        </button>

        {showProviderFilters && (
          <div className="mt-2 space-y-2 rounded-lg border border-slate-200 bg-white p-3">
            <input
              type="search"
              value={orgSearch}
              onChange={(e) => setOrgSearch(e.target.value)}
              placeholder="Filter provider list…"
              className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#3399ff] focus:outline-none"
            />
            <div className="flex gap-2">
              <button
                type="button"
                className="text-xs text-[#3399ff] hover:underline"
                onClick={() => update({ excludedOrgs: [...orgs] })}
              >
                Hide all
              </button>
              <button
                type="button"
                className="text-xs text-[#3399ff] hover:underline"
                onClick={() => update({ excludedOrgs: [] })}
              >
                Show all
              </button>
            </div>
            <div className="max-h-40 space-y-1 overflow-y-auto pr-1">
              {filteredOrgs.map((org) => {
                const count = models.filter((m) => m.org === org).length;
                const excluded = filters.excludedOrgs.includes(org);
                return (
                  <label
                    key={org}
                    className="flex cursor-pointer items-center gap-2 rounded px-1 py-0.5 text-xs text-slate-700 hover:bg-slate-50"
                  >
                    <input
                      type="checkbox"
                      checked={excluded}
                      onChange={(e) =>
                        update({
                          excludedOrgs: toggleExcludedOrg(
                            filters.excludedOrgs,
                            org,
                            e.target.checked,
                          ),
                        })
                      }
                      className="h-3.5 w-3.5 rounded border-slate-300 text-[#003366] focus:ring-[#3399ff]"
                    />
                    <span className="font-mono">{org}</span>
                    <span className="text-slate-400">({count})</span>
                  </label>
                );
              })}
            </div>
            <p className="text-[11px] text-slate-400">
              Checked providers are hidden from the model list.
            </p>
          </div>
        )}
      </div>

      {!loading && filteredModels.length === 0 && (
        <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
          No models match your filters. Try clearing provider exclusions or turning off Free only.
        </p>
      )}
    </div>
  );
}

export function useOpenRouterFiltersState() {
  return useState<OpenRouterModelFilters>(() => readOpenRouterFilters());
}

export { filterOpenRouterModels };
