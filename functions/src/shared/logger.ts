import type { TenantRole, TenantType } from "./types.js";

const FUNCTIONS_SERVICE_NAME = "revnil-functions";

const REDACTED_KEYS = [
  "authorization",
  "token",
  "idtoken",
  "refreshtoken",
  "password",
  "secret",
  "apikey",
  "api_key",
  "key",
  "signature",
  "cookie",
  "set-cookie",
  "email",
  "phone",
  "ssn",
  "contract",
  "rawcontract",
] as const;

type Severity = "INFO" | "WARNING" | "ERROR" | "NOTICE";

export interface LogContext {
  event: string;
  module: string;
  requestId?: string;
  tenantType?: TenantType;
  tenantId?: string;
  uid?: string;
  role?: TenantRole;
  data?: unknown;
}

interface LogEntry {
  severity: Severity;
  event: string;
  service: string;
  module: string;
  requestId?: string;
  tenantType?: TenantType;
  tenantId?: string;
  uid?: string;
  role?: TenantRole;
  timestamp: string;
  data?: unknown;
  error?: {
    name: string;
    message: string;
    code?: string;
    stack?: string;
  };
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function shouldRedactKey(key: string): boolean {
  const lowered = key.toLowerCase();
  return REDACTED_KEYS.some((redacted) => lowered.includes(redacted));
}

function redactValue(value: unknown, depth: number = 0): unknown {
  if (depth > 4) {
    return "[MaxDepthReached]";
  }

  if (value === null || value === undefined) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.slice(0, 20).map((item) => redactValue(item, depth + 1));
  }

  if (isObject(value)) {
    const sanitized: Record<string, unknown> = {};
    for (const [key, nestedValue] of Object.entries(value)) {
      sanitized[key] = shouldRedactKey(key)
        ? "[REDACTED]"
        : redactValue(nestedValue, depth + 1);
    }
    return sanitized;
  }

  if (typeof value === "string" && value.length > 1500) {
    return `${value.slice(0, 1500)}...[truncated]`;
  }

  return value;
}

function toSafeError(error: unknown): LogEntry["error"] | undefined {
  if (!(error instanceof Error)) {
    return undefined;
  }

  const errorWithCode = error as Error & { code?: string };

  return {
    name: error.name,
    message: error.message,
    code: typeof errorWithCode.code === "string" ? errorWithCode.code : undefined,
    stack:
      typeof error.stack === "string"
        ? error.stack
            .split("\n")
            .slice(0, 5)
            .join("\n")
        : undefined,
  };
}

function buildLogEntry(
  severity: Severity,
  context: LogContext,
  error?: unknown
): LogEntry {
  return {
    severity,
    event: context.event,
    service: FUNCTIONS_SERVICE_NAME,
    module: context.module,
    requestId: context.requestId,
    tenantType: context.tenantType,
    tenantId: context.tenantId,
    uid: context.uid,
    role: context.role,
    timestamp: new Date().toISOString(),
    data: redactValue(context.data),
    error: toSafeError(error),
  };
}

function writeLog(entry: LogEntry): void {
  const payload = JSON.stringify(entry);

  if (entry.severity === "ERROR") {
    console.error(payload);
    return;
  }

  if (entry.severity === "WARNING") {
    console.warn(payload);
    return;
  }

  console.log(payload);
}

export function extractRequestIdFromHeaders(headers: unknown): string | undefined {
  if (!isObject(headers)) {
    return undefined;
  }

  const requestIdHeader = headers["x-request-id"];
  if (typeof requestIdHeader === "string" && requestIdHeader.trim().length > 0) {
    return requestIdHeader.trim();
  }

  const traceHeader = headers["x-cloud-trace-context"];
  if (typeof traceHeader !== "string" || traceHeader.trim().length === 0) {
    return undefined;
  }

  return traceHeader.split("/")[0]?.trim() || undefined;
}

export function logInfo(context: LogContext): void {
  writeLog(buildLogEntry("INFO", context));
}

export function logWarn(context: LogContext): void {
  writeLog(buildLogEntry("WARNING", context));
}

export function logError(context: LogContext, error?: unknown): void {
  writeLog(buildLogEntry("ERROR", context, error));
}

export function logAudit(context: LogContext): void {
  writeLog(buildLogEntry("NOTICE", context));
}

