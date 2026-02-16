import { getFirestore } from "firebase-admin/firestore";
import { logInfo } from "../shared/logger.js";

/**
 * Seed data for Phase 0.5 Prototype
 * Target: University of Oklahoma (inst_ou)
 */
export async function seedPrototypeData() {
  const db = getFirestore();
  const instId = "inst_ou";

  logInfo({
    event: "seed.prototype.start",
    module: "gm",
    data: { instId },
  });

  const batch = db.batch();

  // 1. Institution Profile
  const instRef = db.collection("institutions").doc(instId);
  batch.set(instRef.collection("profile").doc("main"), {
    institutionId: instId,
    name: "University of Oklahoma",
    conference: "SEC",
    division: "D1",
    updatedAt: new Date().toISOString(),
  });

  // 2. Roster + Total Comp Summary (pre-computed for prototype)
  const athletes = [
    { id: "ath_001", name: "Jackson Arnold", sport: "football", revShare: 850000, nil: 1200000 },
    { id: "ath_002", name: "Danny Stutsman", sport: "football", revShare: 750000, nil: 600000 },
    { id: "ath_003", name: "Skylar Vann", sport: "basketball", revShare: 150000, nil: 75000 },
    { id: "ath_004", name: "Patty Gasso", sport: "softball", revShare: 200000, nil: 150000 },
  ];

  for (const athlete of athletes) {
    const athleteRef = instRef.collection("roster").doc(athlete.id);
    batch.set(athleteRef, {
      athleteId: athlete.id,
      name: athlete.name,
      sport: athlete.sport,
      status: "active",
      totalComp: {
        revShare: athlete.revShare,
        nil: athlete.nil,
        total: athlete.revShare + athlete.nil,
      },
      updatedAt: new Date().toISOString(),
    });
  }

  // 3. Cap Management Summary
  batch.set(instRef.collection("capManagement").doc("summary"), {
    institutionId: instId,
    totalCap: 20500000,
    allocatedRevShare: 12500000,
    allocatedNIL: 3500000,
    updatedAt: new Date().toISOString(),
  });

  // 4. Title IX Summary
  batch.set(instRef.collection("titleIX").doc("summary"), {
    institutionId: instId,
    menSpend: 10500000,
    womenSpend: 5500000,
    menCount: 450,
    womenCount: 380,
    updatedAt: new Date().toISOString(),
  });

  await batch.commit();

  logInfo({
    event: "seed.prototype.complete",
    module: "gm",
    data: { instId, athletesCount: athletes.length },
  });
}
