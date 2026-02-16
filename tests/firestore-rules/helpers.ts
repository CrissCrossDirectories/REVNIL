import fs from "node:fs";
import path from "node:path";

import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  type RulesTestContext,
  type RulesTestEnvironment,
} from "@firebase/rules-unit-testing";

type TenantType = "institution" | "collective" | "athlete" | "agent";
type Role = "admin" | "gm" | "compliance" | "finance" | "coach" | "viewer";

export type Claims = {
  tenantType: TenantType;
  tenantId: string;
  role: Role;
  linkedTenants?: string[];
};

type ClaimsOverrides = Partial<Claims>;

let testEnv: RulesTestEnvironment;

const PROJECT_ID = process.env.GCLOUD_PROJECT ?? process.env.FIREBASE_PROJECT ?? "nil-rev-dev";

export async function setupRulesTestEnv(): Promise<RulesTestEnvironment> {
  if (testEnv) {
    return testEnv;
  }

  testEnv = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: {
      host: "127.0.0.1",
      port: 8080,
      rules: fs.readFileSync(path.resolve(process.cwd(), "firestore.rules"), "utf8"),
    },
  });

  return testEnv;
}

export async function cleanupRulesTestEnv(): Promise<void> {
  if (testEnv) {
    await testEnv.cleanup();
  }
}

export async function resetFirestore(): Promise<void> {
  await testEnv.clearFirestore();
}

export function authedDb(uid: string, claims: Claims): ReturnType<RulesTestContext["firestore"]> {
  return testEnv.authenticatedContext(uid, claims).firestore();
}

export function unauthedDb(): ReturnType<RulesTestContext["firestore"]> {
  return testEnv.unauthenticatedContext().firestore();
}

export async function seedDocs(seed: Record<string, Record<string, unknown>>): Promise<void> {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore();

    for (const [docPath, data] of Object.entries(seed)) {
      await db.doc(docPath).set(data);
    }
  });
}

export function institutionClaims(overrides: ClaimsOverrides = {}): Claims {
  return {
    tenantType: "institution",
    tenantId: "inst-1",
    role: "viewer",
    ...overrides,
  };
}

export function collectiveClaims(overrides: ClaimsOverrides = {}): Claims {
  return {
    tenantType: "collective",
    tenantId: "col-1",
    role: "viewer",
    ...overrides,
  };
}

export function athleteClaims(overrides: ClaimsOverrides = {}): Claims {
  return {
    tenantType: "athlete",
    tenantId: "ath-1",
    role: "viewer",
    ...overrides,
  };
}

export function agentClaims(overrides: ClaimsOverrides = {}): Claims {
  return {
    tenantType: "agent",
    tenantId: "agent-1",
    role: "viewer",
    ...overrides,
  };
}

export async function canRead(db: ReturnType<RulesTestContext["firestore"]>, docPath: string): Promise<void> {
  await assertSucceeds(db.doc(docPath).get());
}

export async function cannotRead(db: ReturnType<RulesTestContext["firestore"]>, docPath: string): Promise<void> {
  await assertFails(db.doc(docPath).get());
}

export async function canWrite(
  db: ReturnType<RulesTestContext["firestore"]>,
  docPath: string,
  data: Record<string, unknown>,
): Promise<void> {
  await assertSucceeds(db.doc(docPath).set(data));
}

export async function cannotWrite(
  db: ReturnType<RulesTestContext["firestore"]>,
  docPath: string,
  data: Record<string, unknown>,
): Promise<void> {
  await assertFails(db.doc(docPath).set(data));
}
