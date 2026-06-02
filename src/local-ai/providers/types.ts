export type ProviderId =
  | "local"
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
