import { describe, it, expect, vi, beforeEach, type MockInstance } from "vitest";
import { logInfo, logError } from "./logger";

describe("app logger", () => {
  let logSpy: MockInstance;
  let errorSpy: MockInstance;

  beforeEach(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    // Mock NODE_ENV to production to test JSON output
    vi.stubEnv("NODE_ENV", "production");
  });

  it("redacts sensitive keys in app log data", () => {
    logInfo({
      event: "app.test",
      module: "test-module",
      data: {
        password: "my-secret",
        normal: "value"
      }
    });

    const lastLog = JSON.parse(logSpy.mock.calls[0][0] as string);
    expect(lastLog.data.password).toBe("[REDACTED]");
    expect(lastLog.data.normal).toBe("value");
  });

  it("logs with ERROR severity for logError", () => {
    logError({
      event: "app.error",
      module: "test-module"
    });

    const lastLog = JSON.parse(errorSpy.mock.calls[0][0] as string);
    expect(lastLog.severity).toBe("ERROR");
  });
});
