import type { ProviderId } from "./types";

const CREDENTIAL_PREFIX = "mcatprep_ai_cred_";

export function getCredentialStorageKey(providerId: ProviderId): string {
  return `${CREDENTIAL_PREFIX}${providerId}`;
}

export function getProviderCredential(providerId: ProviderId): string | null {
  try {
    const value = localStorage.getItem(getCredentialStorageKey(providerId));
    return value?.trim() ? value.trim() : null;
  } catch {
    return null;
  }
}

export function setProviderCredential(providerId: ProviderId, credential: string): void {
  const trimmed = credential.trim();
  if (!trimmed) {
    throw new Error("Enter a valid API key or token.");
  }
  localStorage.setItem(getCredentialStorageKey(providerId), trimmed);
}

export function hasProviderCredential(providerId: ProviderId): boolean {
  return Boolean(getProviderCredential(providerId));
}

export function clearProviderCredential(providerId: ProviderId): void {
  localStorage.removeItem(getCredentialStorageKey(providerId));
}

export function maskCredential(credential: string): string {
  if (credential.length <= 8) return "••••••••";
  return `${credential.slice(0, 4)}••••${credential.slice(-4)}`;
}
