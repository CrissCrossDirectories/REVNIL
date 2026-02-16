/**
 * REVNIL — Cloud Functions Entry Point
 *
 * This file re-exports all Cloud Function modules.
 * Each module is organized by domain/persona:
 *
 * - gm:           GM / Platform Admin functions
 * - collective:   NIL Collective management functions
 * - athlete:      Athlete-facing functions
 * - connect:      Fan engagement / Connect functions
 * - ai:           AI-powered service functions (Vertex AI)
 * - integrations: External system connectors
 *
 * Firebase automatically discovers and deploys all exported functions.
 */

import { getApps, initializeApp } from "firebase-admin/app";

// Initialize Firebase Admin SDK (singleton)
if (getApps().length === 0) {
  initializeApp();
}

// Re-export all module functions
export { gm } from "./gm/index.js";
export { collective } from "./collective/index.js";
export { athlete } from "./athlete/index.js";
export { connect } from "./connect/index.js";
export { ai } from "./ai/index.js";
export { integrations } from "./integrations/index.js";
export { auth } from "./auth/index.js";
