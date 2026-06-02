import { useEffect, useState } from "react";
import type { AiProviderDefinition } from "./providers/types";
import {
  getProviderCredential,
  maskCredential,
  setProviderCredential,
} from "./providers/credentials";
import { Button } from "../components/Button";
import { Card } from "../components/Card";

interface ApiKeyDialogProps {
  open: boolean;
  provider: AiProviderDefinition;
  onClose: () => void;
  onSaved: (credential: string) => void;
}

export function ApiKeyDialog({ open, provider, onClose, onSaved }: ApiKeyDialogProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setValue(getProviderCredential(provider.id) ?? "");
      setError(null);
    }
  }, [open, provider.id]);

  if (!open) return null;

  const existing = getProviderCredential(provider.id);

  const handleSave = () => {
    setError(null);
    try {
      setProviderCredential(provider.id, value);
      onSaved(value.trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <Card hover={false} className="animate-scale-in w-full max-w-md">
        <h2 className="text-lg font-bold text-[#003366]">
          {provider.credentialLabel ?? "API Key"} for {provider.label}
        </h2>
        <p className="mt-2 text-sm text-slate-600">{provider.description}</p>

        {existing && (
          <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
            Saved key: <span className="font-mono">{maskCredential(existing)}</span>. Enter a new
            value to replace it.
          </p>
        )}

        <label className="mt-4 block text-sm font-medium text-slate-700">
          {provider.credentialLabel ?? "API Key"}
          <input
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={provider.credentialPlaceholder ?? "Paste your key or token"}
            autoComplete="off"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#3399ff] focus:outline-none focus:ring-2 focus:ring-[#3399ff]/20"
          />
        </label>

        <p className="mt-2 text-xs text-slate-500">
          Stored only on this device in local storage. Never shared with MCAT Prep servers.
          {provider.credentialHelpUrl && (
            <>
              {" "}
              <a
                href={provider.credentialHelpUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#3399ff] underline"
              >
                Get a key from {provider.label}
              </a>
            </>
          )}
        </p>

        {error && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}

        <div className="mt-5 flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={handleSave} disabled={!value.trim()}>
            Save {provider.credentialLabel ?? "Key"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
