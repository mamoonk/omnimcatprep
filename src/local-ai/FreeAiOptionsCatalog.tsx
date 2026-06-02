import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Button } from "../components/Button";
import { FREE_LOCAL_OPTIONS, FREE_TIER_INFO, groupModelsByOrg } from "./freeAiCatalog";
import { fetchOpenRouterModels } from "./providers/openRouterModels";
import type { OpenRouterModel } from "./providers/types";
import { setAiSelection } from "./aiPreferences";

interface FreeAiOptionsCatalogProps {
  onSelectionApplied?: () => void;
}

function CollapsibleHeader({
  id,
  title,
  subtitle,
  badge,
  countLabel,
  open,
  onToggle,
  tone = "neutral",
}: {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  countLabel?: string;
  open: boolean;
  onToggle: () => void;
  tone?: "neutral" | "emerald" | "blue";
}) {
  const titleClass =
    tone === "emerald"
      ? "text-emerald-900"
      : tone === "blue"
        ? "text-[#003366]"
        : "text-[#003366]";
  const badgeClass =
    tone === "emerald"
      ? "bg-emerald-100 text-emerald-800"
      : tone === "blue"
        ? "bg-blue-100 text-[#003366]"
        : "bg-slate-100 text-slate-700";

  return (
    <button
      type="button"
      id={`${id}-header`}
      aria-expanded={open}
      aria-controls={`${id}-panel`}
      onClick={onToggle}
      className="flex w-full items-start justify-between gap-3 rounded-xl px-1 py-1 text-left transition hover:opacity-90"
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className={`font-semibold ${titleClass}`}>{title}</h3>
          {badge && (
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeClass}`}>
              {badge}
            </span>
          )}
          {countLabel && (
            <span className="text-xs font-medium text-slate-500">{countLabel}</span>
          )}
        </div>
        {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
      </div>
      <span
        className="mt-0.5 shrink-0 text-slate-400 transition-transform duration-200"
        aria-hidden
        style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
      >
        ▼
      </span>
    </button>
  );
}

function CollapsiblePanel({
  id,
  open,
  children,
  className,
}: {
  id: string;
  open: boolean;
  children: ReactNode;
  className?: string;
}) {
  if (!open) return null;
  return (
    <div id={`${id}-panel`} role="region" aria-labelledby={`${id}-header`} className={className}>
      {children}
    </div>
  );
}

export function FreeAiOptionsCatalog({ onSelectionApplied }: FreeAiOptionsCatalogProps) {
  const [catalogOpen, setCatalogOpen] = useState(true);
  const [localOpen, setLocalOpen] = useState(true);
  const [openRouterOpen, setOpenRouterOpen] = useState(false);

  const [openRouterFree, setOpenRouterFree] = useState<OpenRouterModel[]>([]);
  const [loadingOnline, setLoadingOnline] = useState(true);
  const [onlineError, setOnlineError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [expandedOrg, setExpandedOrg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoadingOnline(true);
    setOnlineError(null);
    void fetchOpenRouterModels(undefined, { forceRefresh: false })
      .then((models) => {
        if (!cancelled) {
          setOpenRouterFree(models.filter((m) => m.isFree));
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setOnlineError(err instanceof Error ? err.message : String(err));
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingOnline(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredFree = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return openRouterFree;
    return openRouterFree.filter(
      (m) =>
        m.id.toLowerCase().includes(q) ||
        m.label.toLowerCase().includes(q) ||
        m.org.toLowerCase().includes(q),
    );
  }, [openRouterFree, search]);

  const grouped = useMemo(() => groupModelsByOrg(filteredFree), [filteredFree]);
  const sortedOrgs = useMemo(
    () => Array.from(grouped.keys()).sort((a, b) => a.localeCompare(b)),
    [grouped],
  );

  const applyLocal = (modelId: string) => {
    setAiSelection({ providerId: "local", modelId });
    onSelectionApplied?.();
  };

  const applyOpenRouter = (modelId: string) => {
    setAiSelection({ providerId: "openrouter", modelId });
    onSelectionApplied?.();
  };

  const openRouterCountLabel =
    !loadingOnline && !onlineError ? `${openRouterFree.length} free models` : undefined;

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white/80 shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4">
        <CollapsibleHeader
          id="free-ai-catalog"
          title="Free AI options"
          subtitle="Browse no-cost choices before configuring providers below."
          open={catalogOpen}
          onToggle={() => setCatalogOpen((v) => !v)}
        />
      </div>

      <CollapsiblePanel id="free-ai-catalog" open={catalogOpen} className="space-y-4 p-5">
        {/* Local — fully free, no account */}
        <section className="rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50/80 to-white p-4">
          <CollapsibleHeader
            id="free-ai-local"
            title={FREE_TIER_INFO.local.title}
            subtitle={FREE_TIER_INFO.local.description}
            badge={FREE_TIER_INFO.local.badge}
            countLabel={`${FREE_LOCAL_OPTIONS.length} models`}
            open={localOpen}
            onToggle={() => setLocalOpen((v) => !v)}
            tone="emerald"
          />

          <CollapsiblePanel id="free-ai-local" open={localOpen} className="mt-4">
            <ul className="divide-y divide-emerald-100 rounded-xl border border-emerald-100 bg-white/80">
              {FREE_LOCAL_OPTIONS.map((model) => (
                <li
                  key={model.id}
                  className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-slate-800">{model.label}</p>
                    <p className="font-mono text-xs text-slate-500">{model.id}</p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {model.detail} · {model.note}
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    className="shrink-0 border-emerald-200 text-emerald-800 hover:bg-emerald-50"
                    onClick={() => applyLocal(model.id)}
                  >
                    Use locally
                  </Button>
                </li>
              ))}
            </ul>
          </CollapsiblePanel>
        </section>

        {/* OpenRouter free catalog */}
        <section className="rounded-2xl border border-[#3399ff]/20 bg-gradient-to-br from-blue-50/50 to-white p-4">
          <CollapsibleHeader
            id="free-ai-openrouter"
            title={FREE_TIER_INFO.openRouter.title}
            subtitle={FREE_TIER_INFO.openRouter.description}
            badge={FREE_TIER_INFO.openRouter.badge}
            countLabel={openRouterCountLabel}
            open={openRouterOpen}
            onToggle={() => setOpenRouterOpen((v) => !v)}
            tone="blue"
          />

          <CollapsiblePanel id="free-ai-openrouter" open={openRouterOpen} className="mt-4">
            <a
              href="https://openrouter.ai/keys"
              target="_blank"
              rel="noreferrer"
              className="mb-3 inline-block text-xs font-medium text-[#3399ff] hover:underline"
            >
              Get a free OpenRouter API key →
            </a>

            {loadingOnline && (
              <p className="text-sm text-slate-500">Loading free OpenRouter catalog…</p>
            )}

            {onlineError && (
              <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
                Could not load online free models ({onlineError}). Local options above still work
                offline.
              </p>
            )}

            {!loadingOnline && !onlineError && openRouterFree.length > 0 && (
              <>
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search free OpenRouter models…"
                  className="mb-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-[#3399ff] focus:outline-none focus:ring-2 focus:ring-[#3399ff]/20"
                />
                <p className="mb-3 text-xs text-slate-500">
                  {filteredFree.length} matching · grouped by provider
                </p>

                <div className="max-h-96 space-y-2 overflow-y-auto pr-1">
                  {sortedOrgs.map((org) => {
                    const models = grouped.get(org) ?? [];
                    const isOpen = expandedOrg === org || Boolean(search.trim());
                    return (
                      <div key={org} className="rounded-xl border border-slate-200 bg-white/90">
                        <button
                          type="button"
                          onClick={() => setExpandedOrg(isOpen && !search ? null : org)}
                          className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm font-medium text-slate-800 hover:bg-slate-50"
                        >
                          <span className="font-mono">{org}</span>
                          <span className="text-xs text-slate-400">
                            {models.length} free {isOpen ? "▲" : "▼"}
                          </span>
                        </button>
                        {isOpen && (
                          <ul className="divide-y divide-slate-100 border-t border-slate-100">
                            {models.map((model) => (
                              <li
                                key={model.id}
                                className="flex flex-col gap-2 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between"
                              >
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-slate-800">
                                    {model.label}
                                  </p>
                                  <p className="font-mono text-xs text-slate-500">{model.id}</p>
                                  {model.note && (
                                    <p className="text-xs text-slate-400">{model.note}</p>
                                  )}
                                </div>
                                <Button
                                  variant="secondary"
                                  className="shrink-0 text-xs"
                                  onClick={() => applyOpenRouter(model.id)}
                                >
                                  Select
                                </Button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </CollapsiblePanel>
        </section>

        <p className="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs text-slate-500">
          <span className="font-medium text-slate-700">{FREE_TIER_INFO.paidProviders.title}:</span>{" "}
          {FREE_TIER_INFO.paidProviders.description}
        </p>
      </CollapsiblePanel>
    </div>
  );
}
