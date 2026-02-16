import { initializeApp, getApps } from "firebase-admin/app";
import { getAuth, type DecodedIdToken } from "firebase-admin/auth";
import { HttpsError, type CallableRequest } from "firebase-functions/v2/https";
import type { Request } from "firebase-functions/v2/https";
import {
  extractRequestIdFromHeaders,
  logAudit,
} from "./logger.js";
import {
  TENANT_ROLES,
  TENANT_TYPES,
  type PlatformClaims,
  type RequestAuthContext,
  type TenantClaims,
} from "./types.js";

if (getApps().length === 0) {
  initializeApp();
}

export const adminAuth = getAuth();

export function isTenantClaims(value: unknown): value is TenantClaims {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;

  if (
    !TENANT_TYPES.includes(record.tenantType as (typeof TENANT_TYPES)[number]) ||
    typeof record.tenantId !== "string" ||
    record.tenantId.trim().length === 0 ||
    !TENANT_ROLES.includes(record.role as (typeof TENANT_ROLES)[number])
  ) {
    return false;
  }

  if (
    record.linkedTenants !== undefined &&
    (!Array.isArray(record.linkedTenants) ||
      record.linkedTenants.some(
        (tenantId) => typeof tenantId !== "string" || tenantId.trim().length === 0
      ))
  ) {
    return false;
  }

  if (
    record.sportIds !== undefined &&
    (!Array.isArray(record.sportIds) ||
      record.sportIds.some(
        (sportId) => typeof sportId !== "string" || sportId.trim().length === 0
      ))
  ) {
    return false;
  }

  if (
    record.athleteId !== undefined &&
    (typeof record.athleteId !== "string" || record.athleteId.trim().length === 0)
  ) {
    return false;
  }

  return true;
}

export function toPlatformClaims(token: Record<string, unknown>): PlatformClaims | null {
  const claimsCandidate: unknown = {
    tenantType: token.tenantType,
    tenantId: token.tenantId,
    role: token.role,
    linkedTenants: token.linkedTenants,
    sportIds: token.sportIds,
    athleteId: token.athleteId,
  };

  if (!isTenantClaims(claimsCandidate)) {
    return null;
  }

  return {
    ...claimsCandidate,
    platformAdmin: token.platformAdmin === true,
  };
}

export function assertPlatformAdmin(claims: PlatformClaims): void {
  if (!claims.platformAdmin) {
    throw new HttpsError(
      "permission-denied",
      "Caller must be a platform admin to mutate custom claims."
    );
  }
}

export function assertCanReadClaims(claims: PlatformClaims): void {
  if (claims.platformAdmin || claims.role === "org_admin" || claims.role === "ad_leadership") {
    return;
  }

  throw new HttpsError(
    "permission-denied",
    "Caller must be platform admin, org admin, or AD leadership to read user claims."
  );
}

function tokenToContext(decoded: DecodedIdToken): RequestAuthContext {
  const tokenRecord = decoded as unknown as Record<string, unknown>;
  const claims = toPlatformClaims(tokenRecord);

  if (!claims) {
    throw new HttpsError("permission-denied", "Missing required tenant claims.");
  }

  return {
    uid: decoded.uid,
    email: decoded.email,
    claims,
    token: tokenRecord,
  };
}

export function requireCallableAuth(
  request: CallableRequest<unknown>
): RequestAuthContext {
  const requestId = extractRequestIdFromHeaders(
    (request.rawRequest as { headers?: unknown } | undefined)?.headers
  );

  if (!request.auth?.uid || !request.auth.token) {
    throw new HttpsError("unauthenticated", "Authentication required.");
  }

  const decoded = {
    uid: request.auth.uid,
    email: request.auth.token.email as string | undefined,
    ...(request.auth.token as Record<string, unknown>),
  } as DecodedIdToken;

  const context = tokenToContext(decoded);
  logAudit({
    event: "auth.callable.authenticated",
    module: "shared-auth",
    requestId,
    uid: context.uid,
    tenantType: context.claims.tenantType,
    tenantId: context.claims.tenantId,
    role: context.claims.role,
  });
  return context;
}

export async function requireHttpAuth(request: Request): Promise<RequestAuthContext> {
  const requestId = extractRequestIdFromHeaders(request.headers);
  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new HttpsError("unauthenticated", "Bearer token is required.");
  }

  const idToken = authHeader.slice("Bearer ".length).trim();
  if (!idToken) {
    throw new HttpsError("unauthenticated", "Bearer token is required.");
  }

  const decoded = await adminAuth.verifyIdToken(idToken);
  const context = tokenToContext(decoded);
  logAudit({
    event: "auth.http.authenticated",
    module: "shared-auth",
    requestId,
    uid: context.uid,
    tenantType: context.claims.tenantType,
    tenantId: context.claims.tenantId,
    role: context.claims.role,
  });
  return context;
}
