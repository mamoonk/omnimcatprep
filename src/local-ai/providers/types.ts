export type ProviderId =
  | "local"
  | "pollinations"
  | "openai"
  | "anthropic"
  | "google"
  | "groq"
  | "openrouter";

export type ProviderMode = "local" | "online";

export interface ProviderModel {
  id: string;
  label: string;
  note?: string;
}

/** Extended metadata for OpenRouter catalog entries */
export interface OpenRouterModel extends ProviderModel {
  /** Slug before `/` in the model id (e.g. `openai`) */
  org: string;
  isFree: boolean;
}

export interface AiProviderDefinition {
  id: ProviderId;
  label: string;
  description: string;
  mode: ProviderMode;
  requiresCredential: boolean;
  credentialLabel?: string;
  credentialPlaceholder?: string;
  credentialHelpUrl?: string;
  models: ProviderModel[];
  allowCustomModel?: boolean;
  customModelHint?: string;
}

export interface AiSelection {
  providerId: ProviderId;
  modelId: string;
}

export interface GenerateOptions {
  prompt: string;
  maxTokens?: number;
}
