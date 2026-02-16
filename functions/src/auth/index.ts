import { onCall, onRequest, HttpsError } from "firebase-functions/v2/https";
import {
  adminAuth,
  assertCanReadClaims,
  assertPlatformAdmin,
  isTenantClaims,
  requireCallableAuth,
  requireHttpAuth,
} from "../shared/auth.js";
import {
  extractRequestIdFromHeaders,
  logAudit,
  logInfo,
  logWarn,
} from "../shared/logger.js";
import { logAndMapError, toHttpsError } from "../shared/errors.js";
import type { TenantClaims } from "../shared/types.js";

interface SetUserClaimsInput {
  uid: string;
  claims: TenantClaims;
}

interface GetUserClaimsInput {
  uid: string;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function parseSetClaimsInput(input: unknown): SetUserClaimsInput {
  if (!input || typeof input !== "object") {
    throw new HttpsError("invalid-argument", "Input must be an object.");
  }

  const payload = input as Record<string, unknown>;
  const uid = payload.uid;
  const claims = payload.claims;

  if (!isNonEmptyString(uid)) {
    throw new HttpsError("invalid-argument", "uid must be a non-empty string.");
  }

  if (!isTenantClaims(claims)) {
    throw new HttpsError("invalid-argument", "claims payload is invalid.");
  }

  return {
    uid,
    claims,
  };
}

function parseGetClaimsInput(input: unknown): GetUserClaimsInput {
  if (!input || typeof input !== "object") {
    throw new HttpsError("invalid-argument", "Input must be an object.");
  }

  const payload = input as Record<string, unknown>;
  if (!isNonEmptyString(payload.uid)) {
    throw new HttpsError("invalid-argument", "uid must be a non-empty string.");
  }

  return { uid: payload.uid };
}

async function applyUserClaims(uid: string, claims: TenantClaims): Promise<void> {
  await adminAuth.setCustomUserClaims(uid, {
    tenantType: claims.tenantType,
    tenantId: claims.tenantId,
    role: claims.role,
    linkedTenants: claims.linkedTenants ?? [],
  });
}

async function readUserClaims(uid: string): Promise<Record<string, unknown>> {
  const user = await adminAuth.getUser(uid);
  const customClaims = user.customClaims ?? {};

  return {
    uid: user.uid,
    claims: {
      tenantType: customClaims.tenantType,
      tenantId: customClaims.tenantId,
      role: customClaims.role,
      linkedTenants: customClaims.linkedTenants,
      platformAdmin: customClaims.platformAdmin,
    },
  };
}

const setUserClaims = onCall(async (request) => {
  const requestId = extractRequestIdFromHeaders(
    (request.rawRequest as { headers?: unknown } | undefined)?.headers
  );

  try {
    const caller = requireCallableAuth(request);
    assertPlatformAdmin(caller.claims);

    const { uid, claims } = parseSetClaimsInput(request.data);

    logInfo({
      event: "auth.claims.set.callable.request",
      module: "auth",
      requestId,
      uid: caller.uid,
      tenantType: caller.claims.tenantType,
      tenantId: caller.claims.tenantId,
      role: caller.claims.role,
      data: {
        targetUid: uid,
        targetTenantType: claims.tenantType,
        targetTenantId: claims.tenantId,
        targetRole: claims.role,
      },
    });

    await applyUserClaims(uid, claims);

    logAudit({
      event: "auth.claims.set.callable.success",
      module: "auth",
      requestId,
      uid: caller.uid,
      tenantType: caller.claims.tenantType,
      tenantId: caller.claims.tenantId,
      role: caller.claims.role,
      data: {
        targetUid: uid,
      },
    });

    return {
      success: true,
      uid,
      claims,
    };
  } catch (error) {
    logAndMapError(error, {
      event: "auth.claims.set.callable.error",
      module: "auth",
      requestId,
    });
    throw toHttpsError(error);
  }
});

const getUserClaims = onCall(async (request) => {
  const requestId = extractRequestIdFromHeaders(
    (request.rawRequest as { headers?: unknown } | undefined)?.headers
  );

  try {
    const caller = requireCallableAuth(request);
    assertCanReadClaims(caller.claims);

    const { uid } = parseGetClaimsInput(request.data);

    logInfo({
      event: "auth.claims.get.callable.request",
      module: "auth",
      requestId,
      uid: caller.uid,
      tenantType: caller.claims.tenantType,
      tenantId: caller.claims.tenantId,
      role: caller.claims.role,
      data: {
        targetUid: uid,
      },
    });

    const result = await readUserClaims(uid);

    return {
      success: true,
      ...result,
    };
  } catch (error) {
    throw toHttpsError(
      logAndMapError(error, {
        event: "auth.claims.get.callable.error",
        module: "auth",
        requestId,
      })
    );
  }
});

const setUserClaimsHttp = onRequest(async (request, response) => {
  const requestId = extractRequestIdFromHeaders(request.headers);

  try {
    if (request.method !== "POST") {
      logWarn({
        event: "auth.claims.set.http.method_not_allowed",
        module: "auth",
        requestId,
        data: { method: request.method },
      });
      response.status(405).json({ success: false, error: "Method Not Allowed" });
      return;
    }

    const caller = await requireHttpAuth(request);
    assertPlatformAdmin(caller.claims);

    const { uid, claims } = parseSetClaimsInput(request.body);

    logInfo({
      event: "auth.claims.set.http.request",
      module: "auth",
      requestId,
      uid: caller.uid,
      tenantType: caller.claims.tenantType,
      tenantId: caller.claims.tenantId,
      role: caller.claims.role,
      data: {
        targetUid: uid,
        targetTenantType: claims.tenantType,
        targetTenantId: claims.tenantId,
        targetRole: claims.role,
      },
    });

    await applyUserClaims(uid, claims);

    logAudit({
      event: "auth.claims.set.http.success",
      module: "auth",
      requestId,
      uid: caller.uid,
      tenantType: caller.claims.tenantType,
      tenantId: caller.claims.tenantId,
      role: caller.claims.role,
      data: { targetUid: uid },
    });

    response.status(200).json({ success: true, uid, claims });
  } catch (error) {
    const normalized = logAndMapError(error, {
      event: "auth.claims.set.http.error",
      module: "auth",
      requestId,
      data: {
        method: request.method,
      },
    });
    response.status(normalized.statusCode).json({ success: false, error: normalized.message });
  }
});

const getUserClaimsHttp = onRequest(async (request, response) => {
  const requestId = extractRequestIdFromHeaders(request.headers);

  try {
    if (request.method !== "GET") {
      logWarn({
        event: "auth.claims.get.http.method_not_allowed",
        module: "auth",
        requestId,
        data: { method: request.method },
      });
      response.status(405).json({ success: false, error: "Method Not Allowed" });
      return;
    }

    const caller = await requireHttpAuth(request);
    assertCanReadClaims(caller.claims);

    const uid = request.query.uid;
    if (!isNonEmptyString(uid)) {
      throw new HttpsError("invalid-argument", "Query param uid is required.");
    }

    logInfo({
      event: "auth.claims.get.http.request",
      module: "auth",
      requestId,
      uid: caller.uid,
      tenantType: caller.claims.tenantType,
      tenantId: caller.claims.tenantId,
      role: caller.claims.role,
      data: {
        targetUid: uid,
      },
    });

    const result = await readUserClaims(uid);
    response.status(200).json({ success: true, ...result });
  } catch (error) {
    const normalized = logAndMapError(error, {
      event: "auth.claims.get.http.error",
      module: "auth",
      requestId,
      data: {
        method: request.method,
        queryUid: request.query.uid,
      },
    });
    response.status(normalized.statusCode).json({ success: false, error: normalized.message });
  }
});

export const auth = {
  setUserClaims,
  getUserClaims,
  setUserClaimsHttp,
  getUserClaimsHttp,
};
