import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useSearchParams } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { Button } from "./components/Button";
import { Dashboard } from "./features/dashboard/Dashboard";
import { PearsonVueExam } from "./features/exam-emulator/PearsonVueExam";
import { FlashcardReview } from "./features/flashcards/FlashcardReview";
import { useOverdueGuard } from "./features/flashcards/useOverdueGuard";
import { useAi } from "./local-ai/useAi";
import { AiActivityPanel } from "./local-ai/AiActivityPanel";
import { PdfClozeUpload } from "./local-ai/PdfClozeUpload";
import { ApiKeyDialog } from "./local-ai/ApiKeyDialog";
import { ProviderModelSelector } from "./local-ai/ProviderModelSelector";
import { getDatabase, seedMockData } from "./database";
import { useSupabaseAuth } from "./database/supabase-sync/useAuth";
import { Help } from "./features/help/Help";
import { PageHeader } from "./components/PageHeader";
import { Card } from "./components/Card";
import { QuickAction } from "./components/QuickAction";
import { OnboardingWizard, WizardLauncher, isWizardHidden } from "./features/onboarding/OnboardingWizard";
import { Settings } from "./features/settings/Settings";

function HomePage() {
  const { overdueCount, blocked } = useOverdueGuard();
  const { configured, user, signOut } = useSupabaseAuth();
  const [dbReady, setDbReady] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    void getDatabase()
      .then((db) => seedMockData(db))
      .then(() => setDbReady(true));
  }, []);

  useEffect(() => {
    if (searchParams.get("tour") === "1") {
      setWizardOpen(true);
      setSearchParams({}, { replace: true });
      return;
    }
    if (!isWizardHidden()) {
      setWizardOpen(true);
    }
  }, [searchParams, setSearchParams]);

  return (
    <div>
      <OnboardingWizard open={wizardOpen} onClose={() => setWizardOpen(false)} />

      <PageHeader
        title="MCAT Local-First Platform"
        subtitle="Practice offline, track progress, and master concepts with spaced repetition and AI tutoring."
      />

      <WizardLauncher onStart={() => setWizardOpen(true)} />

      <Card hover={false} className="mb-6 flex items-center gap-4">
        <div
          className={`h-3 w-3 shrink-0 rounded-full ${dbReady ? "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]" : "skeleton-shimmer animate-pulse-soft"}`}
        />
        <p className="text-sm text-slate-700">
          {dbReady ? (
            <>
              <span className="font-semibold text-emerald-700">Local database ready</span>
              {" — "}All practice runs work offline.
            </>
          ) : (
            "Initializing local database…"
          )}
        </p>
      </Card>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <QuickAction
          to="/exam"
          icon="📝"
          title="Start Practice"
          description="Pearson VUE exam emulator with timers and scratchpad"
          delay={50}
        />
        <QuickAction
          to="/flashcards"
          icon="🃏"
          title="Review Flashcards"
          description="FSRS spaced repetition for long-term retention"
          delay={100}
        />
        <QuickAction
          to="/dashboard"
          icon="📊"
          title="View Analytics"
          description="Track accuracy and time per question by section"
          delay={150}
        />
        <QuickAction
          to="/ai"
          icon="🤖"
          title="AI Tutor"
          description="Local or online AI for concept explanations"
          delay={200}
        />
        <QuickAction
          to="/help"
          icon="📖"
          title="Help Guide"
          description="Learn how to use every feature"
          delay={250}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card delay={300}>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Flashcard Status
          </p>
          <p className="mt-2 text-3xl font-bold text-[#003366]">{overdueCount}</p>
          <p className="text-sm text-slate-500">overdue cards</p>
          {blocked && (
            <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
              New practice blocked — complete flashcard reviews first.
            </p>
          )}
        </Card>

        {configured && (
          <Card delay={350}>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Cloud Sync
            </p>
            <p className="mt-2 text-sm text-slate-700">
              {user ? (
                <>
                  Signed in as <strong>{user.email}</strong>
                </>
              ) : (
                "Not signed in — offline mode active"
              )}
            </p>
            {user && (
              <Button variant="secondary" className="mt-3" onClick={() => void signOut()}>
                Sign out
              </Button>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}

function ExamPage() {
  const { blocked } = useOverdueGuard();
  const [guaranteeMode, setGuaranteeMode] = useState(false);
  const {
    generate,
    result,
    loading,
    phase,
    progress,
    error,
    credentialPrompt,
    dismissCredentialPrompt,
    handleCredentialSaved,
    provider,
  } = useAi();

  if (blocked) {
    return <Navigate to="/flashcards" replace />;
  }

  return (
    <div>
      <PearsonVueExam
        guaranteeModeActive={guaranteeMode}
        onToggleGuarantee={setGuaranteeMode}
        onIncorrectForAi={(prompt) => {
          generate(prompt);
        }}
      />
      {(loading || result || error) && (
        <div className="fixed bottom-4 right-4 z-50 w-full max-w-md px-4">
          <AiActivityPanel
            phase={phase}
            progress={progress}
            result={result}
            error={error}
            providerLabel={provider.label}
            isOnline={provider.mode === "online"}
          />
        </div>
      )}
      {credentialPrompt && (
        <ApiKeyDialog
          open
          provider={credentialPrompt}
          onClose={dismissCredentialPrompt}
          onSaved={handleCredentialSaved}
        />
      )}
    </div>
  );
}

function AiPage() {
  const {
    ready,
    loading,
    loadingModel,
    generating,
    phase,
    progress,
    result,
    error,
    loadModel,
    generate,
    loadedModelId,
    modelMismatch,
    refreshSelection,
    isLocal,
    provider,
    hasCredential,
    credentialPrompt,
    dismissCredentialPrompt,
    handleCredentialSaved,
    selection,
  } = useAi();

  const canLoad = isLocal && !loadingModel && (!ready || modelMismatch);
  const canGenerate = isLocal ? !loading : hasCredential && !loading;

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        title="AI Tutor"
        subtitle="Run models locally offline or connect online providers with your own API key."
      />

      <Card hover={false} className="mb-6 space-y-4">
        <div>
          <h3 className="font-semibold text-[#003366]">Provider &amp; model</h3>
          <p className="mt-1 text-sm text-slate-500">
            Choose local WebGPU inference or an online provider. Online providers prompt for an API
            key or token when selected.
          </p>
        </div>
        <ProviderModelSelector
          loadedLocalModelId={loadedModelId}
          onSelectionSaved={() => refreshSelection()}
        />
      </Card>

      <Card hover={false} className="space-y-4">
        <div className="flex flex-wrap gap-3">
          {isLocal && (
            <Button onClick={() => loadModel()} disabled={!canLoad} className="min-w-[140px]">
              {loadingModel
                ? "Loading…"
                : ready && !modelMismatch
                  ? "Model Ready ✓"
                  : modelMismatch
                    ? "Reload Model"
                    : "Load Model"}
            </Button>
          )}
          <Button
            variant="secondary"
            disabled={!canGenerate}
            className="min-w-[140px]"
            onClick={() =>
              generate(
                "Explain competitive enzyme inhibition for MCAT biochemistry in 3 bullet points.",
              )
            }
          >
            {generating ? "Generating…" : "Test Generation"}
          </Button>
        </div>

        {!isLocal && !hasCredential && (
          <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
            Add your {provider.credentialLabel ?? "API key"} for {provider.label} above to enable
            generation.
          </p>
        )}

        {isLocal && loadedModelId && (
          <p className="text-xs text-slate-500">
            Loaded: <span className="font-mono text-slate-700">{loadedModelId}</span>
          </p>
        )}

        {!isLocal && hasCredential && (
          <p className="text-xs text-slate-500">
            Using:{" "}
            <span className="font-mono text-slate-700">
              {selection.providerId}/{selection.modelId}
            </span>
          </p>
        )}

        <AiActivityPanel
          phase={phase}
          progress={progress}
          result={result}
          error={error}
          providerLabel={provider.label}
          isOnline={!isLocal}
        />

        {!loading && !result && ready && !modelMismatch && (
          <p className="text-xs text-slate-400">
            Click Test Generation to run a sample prompt through{" "}
            {isLocal ? "the local model" : provider.label}.
          </p>
        )}
      </Card>
      <div className="mt-6 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
        <PdfClozeUpload />
      </div>

      {credentialPrompt && (
        <ApiKeyDialog
          open
          provider={credentialPrompt}
          onClose={dismissCredentialPrompt}
          onSaved={handleCredentialSaved}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/exam" element={<ExamPage />} />
        <Route
          path="/*"
          element={
            <AppShell>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/flashcards" element={<FlashcardReview />} />
                <Route path="/ai" element={<AiPage />} />
                <Route path="/help" element={<Help />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </AppShell>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
