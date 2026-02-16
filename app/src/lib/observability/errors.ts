import { logError, type AppLogContext } from "@/lib/observability/logger";

interface FirebaseLikeError {
  code?: string;
  message?: string;
}

export interface AppNormalizedError {
  code: string;
  message: string;
  isAuthError: boolean;
}

const AUTH_ERROR_CODE_LABELS: Record<string, string> = {
  "auth/invalid-credential": "Invalid credentials. Check your email and password.",
  "auth/user-not-found": "No account found for that email.",
  "auth/wrong-password": "Invalid credentials. Check your email and password.",
  "auth/popup-closed-by-user": "Google sign-in popup was closed before completion.",
  "auth/network-request-failed": "Network error. Please retry.",
  "auth/too-many-requests": "Too many attempts. Please wait and try again.",
};

export function normalizeAppError(error: unknown): AppNormalizedError {
  const candidate = error as FirebaseLikeError;
  const code = typeof candidate?.code === "string" ? candidate.code : "unknown";
  const fallbackMessage =
    typeof candidate?.message === "string" && candidate.message.trim().length > 0
      ? candidate.message
      : "An unexpected error occurred.";

  return {
    code,
    message: AUTH_ERROR_CODE_LABELS[code] ?? fallbackMessage,
    isAuthError: code.startsWith("auth/"),
  };
}

export function reportAppError(error: unknown, context: AppLogContext): AppNormalizedError {
  const normalized = normalizeAppError(error);
  logError({
    ...context,
    data: {
      ...(typeof context.data === "object" && context.data ? context.data : {}),
      normalizedCode: normalized.code,
      normalizedMessage: normalized.message,
      isAuthError: normalized.isAuthError,
    },
  });
  return normalized;
}

