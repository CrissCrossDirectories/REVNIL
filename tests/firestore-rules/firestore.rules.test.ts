import { beforeAll, beforeEach, afterAll, describe, it } from "vitest";

import {
  agentClaims,
  athleteClaims,
  authedDb,
  canRead,
  canWrite,
  cannotRead,
  cannotWrite,
  cleanupRulesTestEnv,
  collectiveClaims,
  institutionClaims,
  resetFirestore,
  seedDocs,
  setupRulesTestEnv,
  unauthedDb,
} from "./helpers";

describe("Firestore Security Rules", () => {
  beforeAll(async () => {
    await setupRulesTestEnv();
  });

  beforeEach(async () => {
    await resetFirestore();
  });

  afterAll(async () => {
    await cleanupRulesTestEnv();
  });

  describe("tenant isolation", () => {
    it("institution user can access own subtree and not other institutions", async () => {
      await seedDocs({
        "institutions/inst-1/profile/main": { name: "Inst 1" },
        "institutions/inst-2/profile/main": { name: "Inst 2" },
      });

      const db = authedDb("inst-user-1", institutionClaims({ tenantId: "inst-1", role: "admin" }));

      await canRead(db, "institutions/inst-1/profile/main");
      await cannotRead(db, "institutions/inst-2/profile/main");
      await canWrite(db, "institutions/inst-1/profile/settings", { timezone: "CST" });
      await cannotWrite(db, "institutions/inst-2/profile/settings", { timezone: "PST" });
    });

    it("collective user can access own subtree and not other collectives", async () => {
      await seedDocs({
        "collectives/col-1/profile/main": { name: "Col 1" },
        "collectives/col-2/profile/main": { name: "Col 2" },
      });

      const db = authedDb("col-user-1", collectiveClaims({ tenantId: "col-1", role: "admin" }));

      await canRead(db, "collectives/col-1/profile/main");
      await cannotRead(db, "collectives/col-2/profile/main");
      await canWrite(db, "collectives/col-1/deals/deal-1", { status: "draft" });
      await cannotWrite(db, "collectives/col-2/deals/deal-2", { status: "draft" });
    });

    it("athlete user can access own subtree and not other athletes", async () => {
      await seedDocs({
        "athletes/ath-1/profile/main": { displayName: "Ath 1" },
        "athletes/ath-2/profile/main": { displayName: "Ath 2" },
      });

      const db = authedDb("ath-user-1", athleteClaims({ tenantId: "ath-1", role: "viewer" }));

      await canRead(db, "athletes/ath-1/profile/main");
      await cannotRead(db, "athletes/ath-2/profile/main");
      await canWrite(db, "athletes/ath-1/income/2026", { amount: 1000 });
      await cannotWrite(db, "athletes/ath-2/income/2026", { amount: 2000 });
    });
  });

  describe("institution role write splits", () => {
    it("only admin|gm can write roster", async () => {
      const adminDb = authedDb("inst-admin", institutionClaims({ tenantId: "inst-1", role: "admin" }));
      const gmDb = authedDb("inst-gm", institutionClaims({ tenantId: "inst-1", role: "gm" }));
      const financeDb = authedDb("inst-finance", institutionClaims({ tenantId: "inst-1", role: "finance" }));

      await canWrite(adminDb, "institutions/inst-1/roster/ath-1", { status: "active" });
      await canWrite(gmDb, "institutions/inst-1/roster/ath-2", { status: "active" });
      await cannotWrite(financeDb, "institutions/inst-1/roster/ath-3", { status: "active" });
    });

    it("only admin|finance can write capManagement", async () => {
      const adminDb = authedDb("inst-admin", institutionClaims({ tenantId: "inst-1", role: "admin" }));
      const financeDb = authedDb("inst-finance", institutionClaims({ tenantId: "inst-1", role: "finance" }));
      const gmDb = authedDb("inst-gm", institutionClaims({ tenantId: "inst-1", role: "gm" }));

      await canWrite(adminDb, "institutions/inst-1/capManagement/main", { cap: 5000000 });
      await canWrite(financeDb, "institutions/inst-1/capManagement/q1", { cap: 4500000 });
      await cannotWrite(gmDb, "institutions/inst-1/capManagement/q2", { cap: 4300000 });
    });

    it("only admin|compliance can write riskAlerts and imports", async () => {
      const adminDb = authedDb("inst-admin", institutionClaims({ tenantId: "inst-1", role: "admin" }));
      const complianceDb = authedDb("inst-comp", institutionClaims({ tenantId: "inst-1", role: "compliance" }));
      const coachDb = authedDb("inst-coach", institutionClaims({ tenantId: "inst-1", role: "coach" }));

      await canWrite(adminDb, "institutions/inst-1/riskAlerts/alert-1", { severity: "high" });
      await canWrite(complianceDb, "institutions/inst-1/imports/job-1", { status: "queued" });

      await cannotWrite(coachDb, "institutions/inst-1/riskAlerts/alert-2", { severity: "low" });
      await cannotWrite(coachDb, "institutions/inst-1/imports/job-2", { status: "queued" });
    });
  });

  describe("consent-based cross-tenant reads", () => {
    it("institution can read athlete profile/deals only with granted consent", async () => {
      await seedDocs({
        "athletes/ath-1/profile/main": { displayName: "Ath One" },
        "athletes/ath-1/deals/deal-1": { value: 25000 },
      });

      const institutionDb = authedDb("inst-user-1", institutionClaims({ tenantId: "inst-1", role: "viewer" }));

      await cannotRead(institutionDb, "athletes/ath-1/profile/main");
      await cannotRead(institutionDb, "athletes/ath-1/deals/deal-1");

      await seedDocs({
        "athletes/ath-1/consent/institution_inst-1": {
          athleteId: "ath-1",
          tenantType: "institution",
          tenantId: "inst-1",
          granted: true,
          revoked: false,
          permissions: { readProfile: true, readDeals: true },
        },
      });

      await canRead(institutionDb, "athletes/ath-1/profile/main");
      await canRead(institutionDb, "athletes/ath-1/deals/deal-1");

      await seedDocs({
        "athletes/ath-1/consent/institution_inst-1": {
          athleteId: "ath-1",
          tenantType: "institution",
          tenantId: "inst-1",
          granted: true,
          revoked: true,
          permissions: { readProfile: true, readDeals: true },
        },
      });

      await cannotRead(institutionDb, "athletes/ath-1/profile/main");
      await cannotRead(institutionDb, "athletes/ath-1/deals/deal-1");
    });

    it("collective can read athlete deals only with consent and linkage constraints", async () => {
      await seedDocs({
        "athletes/ath-1/deals/deal-1": { status: "active" },
        "collectives/col-1/linkedAthletes/ath-1": { linked: true },
        "athletes/ath-1/consent/collective_col-1": {
          athleteId: "ath-1",
          tenantType: "collective",
          tenantId: "col-1",
          granted: true,
          revoked: false,
          permissions: { readDeals: true },
        },
        "athletes/ath-1/consent/collective_col-2": {
          athleteId: "ath-1",
          tenantType: "collective",
          tenantId: "col-2",
          granted: true,
          revoked: false,
          permissions: { readDeals: true },
        },
      });

      const linkedCollectiveDb = authedDb(
        "col-user-1",
        collectiveClaims({ tenantId: "col-1", role: "viewer" }),
      );
      const unlinkedCollectiveDb = authedDb(
        "col-user-2",
        collectiveClaims({ tenantId: "col-2", role: "viewer" }),
      );

      await canRead(linkedCollectiveDb, "athletes/ath-1/deals/deal-1");
      await cannotRead(unlinkedCollectiveDb, "athletes/ath-1/deals/deal-1");
    });

    it("agent can read athlete profile only with granted consent and is denied if consent missing/revoked", async () => {
      await seedDocs({
        "athletes/ath-1/profile/main": { displayName: "Ath One" },
        "agents/agent-1/linkedAthletes/ath-1": { linked: true },
      });

      const agentDb = authedDb(
        "agent-user-1",
        agentClaims({ tenantId: "agent-1", role: "viewer" }),
      );

      await cannotRead(agentDb, "athletes/ath-1/profile/main");

      await seedDocs({
        "athletes/ath-1/consent/agent_agent-1": {
          athleteId: "ath-1",
          tenantType: "agent",
          tenantId: "agent-1",
          granted: true,
          revoked: false,
          permissions: { readProfile: true },
        },
      });

      await canRead(agentDb, "athletes/ath-1/profile/main");

      await seedDocs({
        "athletes/ath-1/consent/agent_agent-1": {
          athleteId: "ath-1",
          tenantType: "agent",
          tenantId: "agent-1",
          granted: false,
          revoked: true,
          permissions: { readProfile: true },
        },
      });

      await cannotRead(agentDb, "athletes/ath-1/profile/main");
    });
  });

  describe("agent linked tenants", () => {
    it("allows agent read for linked athlete with consent", async () => {
      await seedDocs({
        "athletes/ath-1/deals/deal-1": { status: "active" },
        "agents/agent-1/linkedAthletes/ath-1": { linked: true },
        "athletes/ath-1/consent/agent_agent-1": {
          athleteId: "ath-1",
          tenantType: "agent",
          tenantId: "agent-1",
          granted: true,
          revoked: false,
          permissions: { readDeals: true },
        },
      });

      const linkedAgentDb = authedDb(
        "agent-user-1",
        agentClaims({ tenantId: "agent-1", role: "viewer" }),
      );

      await canRead(linkedAgentDb, "athletes/ath-1/deals/deal-1");
    });

    it("denies agent read when athlete is not linked", async () => {
      await seedDocs({
        "athletes/ath-1/deals/deal-1": { status: "active" },
        "athletes/ath-1/consent/agent_agent-1": {
          athleteId: "ath-1",
          tenantType: "agent",
          tenantId: "agent-1",
          granted: true,
          revoked: false,
          permissions: { readDeals: true },
        },
      });

      const unlinkedAgentDb = authedDb(
        "agent-user-2",
        agentClaims({ tenantId: "agent-1", role: "viewer" }),
      );

      await cannotRead(unlinkedAgentDb, "athletes/ath-1/deals/deal-1");
    });
  });

  describe("connect module", () => {
    it("only participants can read/write conversation and messages", async () => {
      await seedDocs({
        "connect/core/conversations/convo-1": {
          participantUids: ["uid-a", "uid-b"],
          lastMessage: "hello",
        },
      });

      const participantA = authedDb("uid-a", institutionClaims({ tenantId: "inst-1", role: "viewer" }));
      const participantB = authedDb("uid-b", collectiveClaims({ tenantId: "col-1", role: "viewer" }));
      const outsider = authedDb("uid-z", athleteClaims({ tenantId: "ath-1", role: "viewer" }));

      await canRead(participantA, "connect/core/conversations/convo-1");
      await canRead(participantB, "connect/core/conversations/convo-1");
      await cannotRead(outsider, "connect/core/conversations/convo-1");

      await canWrite(participantA, "connect/core/conversations/convo-1", {
        participantUids: ["uid-a", "uid-b"],
        lastMessage: "updated",
      });
      await cannotWrite(outsider, "connect/core/conversations/convo-1", {
        participantUids: ["uid-a", "uid-b"],
        lastMessage: "intrusion",
      });

      await canWrite(participantA, "connect/core/conversations/convo-1/messages/msg-1", {
        senderUid: "uid-a",
        body: "hello",
      });
      await cannotWrite(participantB, "connect/core/conversations/convo-1/messages/msg-2", {
        senderUid: "uid-a",
        body: "spoof",
      });
      await cannotWrite(outsider, "connect/core/conversations/convo-1/messages/msg-3", {
        senderUid: "uid-z",
        body: "outside",
      });
    });

    it("notifications are readable/writable only by owner userId path", async () => {
      await seedDocs({
        "connect/notifications/uid-a/n-1": { type: "message" },
      });

      const ownerDb = authedDb("uid-a", institutionClaims({ tenantId: "inst-1", role: "viewer" }));
      const otherDb = authedDb("uid-b", institutionClaims({ tenantId: "inst-1", role: "viewer" }));

      await canRead(ownerDb, "connect/notifications/uid-a/n-1");
      await cannotRead(otherDb, "connect/notifications/uid-a/n-1");

      await canWrite(ownerDb, "connect/notifications/uid-a/n-2", { type: "alert" });
      await cannotWrite(otherDb, "connect/notifications/uid-a/n-3", { type: "alert" });
    });
  });

  describe("deny-by-default sanity checks", () => {
    it("denies unknown paths even for authenticated users", async () => {
      const db = authedDb("inst-user-1", institutionClaims({ tenantId: "inst-1", role: "admin" }));

      await cannotWrite(db, "misc/doc-1", { any: true });
      await cannotRead(db, "misc/doc-1");
    });

    it("denies unauthenticated access to protected paths", async () => {
      await seedDocs({
        "institutions/inst-1/profile/main": { name: "Inst 1" },
      });

      const db = unauthedDb();

      await cannotRead(db, "institutions/inst-1/profile/main");
      await cannotWrite(db, "institutions/inst-1/profile/main", { name: "Nope" });
    });
  });
});
