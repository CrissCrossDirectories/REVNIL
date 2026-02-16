import { describe, it, expect, vi, beforeEach } from "vitest";
import { seedPrototypeData } from "./seed.js";

// Mock firebase-admin/firestore
const mockBatch = {
  set: vi.fn(),
  commit: vi.fn().mockResolvedValue(null),
};

const mockCollection = vi.fn().mockReturnValue({
  doc: vi.fn().mockReturnValue({
    collection: vi.fn().mockReturnValue({
        doc: vi.fn().mockReturnValue({})
    })
  })
});

vi.mock("firebase-admin/firestore", () => ({
  getFirestore: vi.fn(() => ({
    batch: () => mockBatch,
    collection: mockCollection,
  })),
}));

vi.mock("../shared/logger.js", () => ({
  logInfo: vi.fn(),
}));

describe("seedPrototypeData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls set on the batch for institution and athletes", async () => {
    await seedPrototypeData();
    expect(mockBatch.set).toHaveBeenCalled();
    expect(mockBatch.commit).toHaveBeenCalled();
  });
});
