import { describe, it, expect, vi } from "vitest";
import { isTenantClaims, toPlatformClaims } from "./auth.js";

// Mock firebase-admin/app to prevent initialization error
vi.mock("firebase-admin/app", () => ({
  getApps: vi.fn(() => [{}]),
  initializeApp: vi.fn(),
}));

// Mock firebase-admin/auth
vi.mock("firebase-admin/auth", () => ({
  getAuth: vi.fn(),
}));

describe("auth utils", () => {
  describe("isTenantClaims", () => {
    it("returns true for valid claims", () => {
      const claims = {
        tenantType: "institution",
        tenantId: "inst_1",
        role: "admin",
      };
      expect(isTenantClaims(claims)).toBe(true);
    });

    it("returns false for invalid tenantType", () => {
      const claims = {
        tenantType: "invalid",
        tenantId: "inst_1",
        role: "admin",
      };
      expect(isTenantClaims(claims)).toBe(false);
    });

    it("returns false for missing fields", () => {
      expect(isTenantClaims({ tenantId: "1" })).toBe(false);
    });
  });

  describe("toPlatformClaims", () => {
    it("extracts and validates claims from token record", () => {
      const token = {
        tenantType: "athlete",
        tenantId: "ath_1",
        role: "viewer",
        platformAdmin: true,
        extra: "field"
      };
      const result = toPlatformClaims(token);
      expect(result).toEqual({
        tenantType: "athlete",
        tenantId: "ath_1",
        role: "viewer",
        platformAdmin: true,
        linkedTenants: undefined
      });
    });

    it("returns null for invalid claims in token", () => {
      const token = {
        tenantType: "invalid",
      };
      expect(toPlatformClaims(token)).toBeNull();
    });
  });
});
