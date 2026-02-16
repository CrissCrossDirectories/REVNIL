import { describe, it, expect } from "vitest";
import { HttpsError } from "firebase-functions/v2/https";
import { normalizeError, toHttpsError } from "./errors.js";

describe("errors", () => {
  it("normalizes HttpsError correctly", () => {
    const error = new HttpsError("permission-denied", "Access denied");
    const normalized = normalizeError(error);
    expect(normalized.code).toBe("permission-denied");
    expect(normalized.statusCode).toBe(403);
    expect(normalized.isHttpsError).toBe(true);
  });

  it("normalizes generic Error to internal by default", () => {
    const error = new Error("Something went wrong");
    const normalized = normalizeError(error);
    expect(normalized.code).toBe("internal");
    expect(normalized.statusCode).toBe(500);
    expect(normalized.message).toBe("Something went wrong");
  });

  it("converts normalized error to HttpsError", () => {
    const error = new Error("Original error");
    const normalized = normalizeError(error);
    const httpsError = toHttpsError(normalized);
    expect(httpsError).toBeInstanceOf(HttpsError);
    expect(httpsError.code).toBe("internal");
    expect(httpsError.message).toBe("Original error");
  });

  it("redacts sensitive messages in production (internal error)", () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";
    
    // For non-HttpsErrors, if code is "internal", message should be default unless specified?
    // Wait, let's check normalizeError implementation for internal
    const error = new Error("Database password is 123");
    const normalized = normalizeError(error);
    const httpsError = toHttpsError(normalized);
    
    // In production, toHttpsError redacts internal messages
    expect(httpsError.message).toBe("An internal error occurred.");
    
    process.env.NODE_ENV = originalEnv;
  });
});
