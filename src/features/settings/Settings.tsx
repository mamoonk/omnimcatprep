import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import {
  enableWizardOnStartup,
  isWizardHidden,
  setWizardHidden,
} from "../onboarding/wizardPreferences";

import { ProviderModelSelector } from "../../local-ai/ProviderModelSelector";

export function Settings() {
  const navigate = useNavigate();
  const [showTourOnHome, setShowTourOnHome] = useState(!isWizardHidden());

  const handleTourToggle = (enabled: boolean) => {
    setShowTourOnHome(enabled);
    if (enabled) {
      enableWizardOnStartup();
    } else {
      setWizardHidden(true);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        title="Settings"
        subtitle="Customize your MCAT Prep experience. All preferences are stored locally."
      />

      <Card hover={false} className="space-y-6">
        <section>
          <h3 className="font-semibold text-[#003366]">Guided tour</h3>
          <p className="mt-1 text-sm text-slate-500">
            The walkthrough appears on Home each visit unless you opt out.
          </p>

          <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
            <input
              type="checkbox"
              checked={showTourOnHome}
              onChange={(e) => handleTourToggle(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#003366] focus:ring-[#3399ff]"
            />
            <div>
              <span className="text-sm font-medium text-slate-800">
                Show guided tour on Home
              </span>
              <p className="mt-1 text-xs text-slate-500">
                When enabled, the step-by-step wizard opens automatically whenever you visit
                Home.
              </p>
            </div>
          </label>

          <Button
            variant="secondary"
            className="mt-4"
            onClick={() => navigate("/?tour=1")}
          >
            Launch tour now
          </Button>
        </section>
      </Card>

      <Card hover={false} className="mt-6 space-y-4">
        <section>
          <h3 className="font-semibold text-[#003366]">AI provider &amp; model</h3>
          <p className="mt-1 text-sm text-slate-500">
            Choose local offline inference or an online provider. You will be prompted for an API
            key or token when an online provider is selected.
          </p>
          <div className="mt-4">
            <ProviderModelSelector compact />
          </div>
        </section>
      </Card>
    </div>
  );
}
