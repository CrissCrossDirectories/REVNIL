import { HttpsError } from "firebase-functions/v2/https";
import { logError, type LogContext } from "./logger.js";

interface ErrorLike {
  code?: string;
  statusCode?: number;
  message?: string;
}

export interface NormalizedError {
  code: string;
  message: string;
  statusCode: number;
  isHttpsError: boolean;
}

const ERROR_CODE_STATUS_MAP: Record<string, number> = {
  unauthenticated: 401,
  "permission-denied": 403,
  "invalid-argument": 400,
  "not-found": 404,
  "already-exists": 409,
  "failed-precondition": 400,
  cancelled: 499,
  internal: 500,
  unknown: 500,
};

type HttpsErrorCode =
  | "cancelled"
  | "unknown"
  | "invalid-argument"
  | "deadline-exceeded"
  | "not-found"
  | "already-exists"
  | "permission-denied"
  | "resource-exhausted"
  | "failed-precondition"
  | "aborted"
  | "out-of-range"
  | "unimplemented"
  | "internal"
  | "unavailable"
  | "data-loss"
  | "unauthenticated";

const HTTPS_ERROR_CODES = new Set<HttpsErrorCode>([
  "cancelled",
  "unknown",
  "invalid-argument",
  "deadline-exceeded",
  "not-found",
  "already-exists",
  "permission-denied",
  "resource-exhausted",
  "failed-precondition",
  "aborted",
  "out-of-range",
  "unimplemented",
  "internal",
  "unavailable",
  "data-loss",
  "unauthenticated",
]);

function asHttpsErrorCode(code: string): HttpsErrorCode {
  return HTTPS_ERROR_CODES.has(code as HttpsErrorCode)
    ? (code as HttpsErrorCode)
    : "internal";
}

export function normalizeError(error: unknown): NormalizedError {
  if (error instanceof HttpsError) {
    return {
      code: error.code,
      message: error.message,
      statusCode: ERROR_CODE_STATUS_MAP[error.code] ?? 500,
      isHttpsError: true,
    };
  }

  const candidate = error as ErrorLike;
  const candidateCode =
    typeof candidate?.code === "string" ? candidate.code.toLowerCase() : "internal";
  const statusCode =
    typeof candidate?.statusCode === "number"
      ? candidate.statusCode
      : ERROR_CODE_STATUS_MAP[candidateCode] ?? 500;

  const message =
    typeof candidate?.message === "string" && candidate.message.trim().length > 0
      ? candidate.message
      : "Unexpected server error.";

  return {
    code: candidateCode,
    message,
    statusCode,
    isHttpsError: false,
  };
}

export function toHttpsError(error: unknown): HttpsError {
  if (error instanceof HttpsError) {
    return error;
  }

  const normalized = normalizeError(error);
  const code = asHttpsErrorCode(normalized.code);
  const message =
    process.env.NODE_ENV === "production" && code === "internal"
      ? "An internal error occurred."
      : normalized.message;

  return new HttpsError(code, message);
}

export function logAndMapError(error: unknown, context: LogContext): NormalizedError {
  const normalized = normalizeError(error);
  logError(
    {
      ...context,
      data: {
        ...(typeof context.data === "object" && context.data ? context.data : {}),
        normalizedCode: normalized.code,
        normalizedStatusCode: normalized.statusCode,
      },
    },
    error
  );
  return normalized;
}
