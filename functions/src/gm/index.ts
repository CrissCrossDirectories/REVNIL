/**
 * GM (General Manager) Module — Cloud Functions
 *
 * This module will contain functions for the GM/Platform Admin persona:
 * - Tenant provisioning and management
 * - Platform-wide analytics and reporting
 * - User management across tenants
 * - System configuration and settings
 * - Billing and subscription management
 *
 * These functions will be implemented in later subtasks.
 */

import { onCall, HttpsError } from "firebase-functions/v2/https";
import { requireCallableAuth, assertPlatformAdmin } from "../shared/auth.js";
import { logInfo } from "../shared/logger.js";
import { seedPrototypeData } from "./seed.js";

/**
 * gm.healthCheck
 *
 * A simple health check to verify authentication and custom claims.
 * Returns the caller's identity and claims context.
 */
export const healthCheck = onCall((request) => {
  const auth = requireCallableAuth(request);

  logInfo({
    event: "gm.healthCheck.invoked",
    module: "gm",
    uid: auth.uid,
    tenantType: auth.claims.tenantType,
    tenantId: auth.claims.tenantId,
    role: auth.claims.role,
  });

  return {
    status: "healthy",
    timestamp: new Date().toISOString(),
    auth: {
      uid: auth.uid,
      email: auth.email,
      claims: auth.claims,
    },
  };
});

/**
 * gm.seedPrototype
 *
 * Seeds initial data for the Phase 0.5 prototype.
 * Restricted to platform admins.
 */
export const seedPrototype = onCall(async (request) => {
  const auth = requireCallableAuth(request);
  assertPlatformAdmin(auth.claims);

  await seedPrototypeData();

  return {
    success: true,
    message: "Prototype data seeded successfully.",
  };
});

export const gm = {
  healthCheck,
  seedPrototype,
};
