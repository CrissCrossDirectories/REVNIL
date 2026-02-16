import type { TenantRole, TenantType } from "@/lib/auth/claims";

type AppSeverity = "INFO" | "WARNING" | "ERROR" | "NOTICE";

const APP_SERVICE_NAME = "revnil-app";
const SESSION_STORAGE_KEY = "revnil-session-id";

const REDACTED_KEYS = [
  "authorization",
  "token",
  "password",
  "secret",
  "cookie",
  "email",
  "phone",
  "contract",
] as const;

export interface AppLogContext {
  event: string;
  module: string;
  requestId?: string;
  sessionId?: string;
  uid?: string;
  tenantType?: TenantType;
  tenantId?: string;
  role?: TenantRole;
  data?: unknown;
}

interface AppLogEntry extends AppLogContext {
  severity: AppSeverity;
  service: string;
  timestamp: string;
}

function shouldRedactKey(key: string): boolean {
  const lowered = key.toLowerCase();
  return REDACTED_KEYS.some((candidate) => lowered.includes(candidate));
}

function sanitize(value: unknown, depth: number = 0): unknown {
  if (depth > 4) {
    return "[MaxDepthReached]";
  }

  if (value === null || value === undefined) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.slice(0, 20).map((item) => sanitize(item, depth + 1));
  }

  if (typeof value === "object") {
    const asRecord = value as Record<string, unknown>;
    const output: Record<string, unknown> = {};
    for (const [key, nestedValue] of Object.entries(asRecord)) {
      output[key] = shouldRedactKey(key) ? "[REDACTED]" : sanitize(nestedValue, depth + 1);
    }
    return output;
  }

  if (typeof value === "string" && value.length > 1500) {
    return `${value.slice(0, 1500)}...[truncated]`;
  }

  return value;
}

function createEntry(severity: AppSeverity, context: AppLogContext): AppLogEntry {
  return {
    severity,
    service: APP_SERVICE_NAME,
    timestamp: new Date().toISOString(),
    event: context.event,
    module: context.module,
    requestId: context.requestId,
    sessionId: context.sessionId,
    uid: context.uid,
    tenantType: context.tenantType,
    tenantId: context.tenantId,
    role: context.role,
    data: sanitize(context.data),
  };
}

function write(entry: AppLogEntry): void {
  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction) {
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
    return;
  }

  const label = `[${entry.severity}] ${entry.module}:${entry.event}`;
  console.groupCollapsed(label);
  console.log(entry);
  console.groupEnd();
}

function generateCorrelationId(prefix: string): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  const randomSegment = Math.random().toString(36).slice(2, 11);
  const timeSegment = Date.now().toString(36);
  return `${prefix}-${timeSegment}-${randomSegment}`;
}

export function createRequestId(): string {
  return generateCorrelationId("req");
}

export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") {
    return generateCorrelationId("ssr");
  }

  const existing = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (existing) {
    return existing;
  }

  const generated = generateCorrelationId("sess");
  window.sessionStorage.setItem(SESSION_STORAGE_KEY, generated);
  return generated;
}

export function logInfo(context: AppLogContext): void {
  write(createEntry("INFO", context));
}

export function logWarn(context: AppLogContext): void {
  write(createEntry("WARNING", context));
}

export function logError(context: AppLogContext): void {
  write(createEntry("ERROR", context));
}

export function logAudit(context: AppLogContext): void {
  write(createEntry("NOTICE", context));
}

