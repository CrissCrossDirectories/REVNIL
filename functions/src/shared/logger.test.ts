import { describe, it, expect, vi, beforeEach, type MockInstance } from "vitest";
import { 
  logInfo, 
  logError, 
  logAudit, 
  extractRequestIdFromHeaders 
} from "./logger.js";

describe("logger", () => {
  let logSpy: MockInstance;
  let errorSpy: MockInstance;

  beforeEach(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("extracts requestId from x-request-id header", () => {
    const headers = { "x-request-id": "req-123" };
    expect(extractRequestIdFromHeaders(headers)).toBe("req-123");
  });

  it("extracts requestId from x-cloud-trace-context header", () => {
    const headers = { "x-cloud-trace-context": "trace-456/v1;o=1" };
    expect(extractRequestIdFromHeaders(headers)).toBe("trace-456");
  });

  it("redacts sensitive keys in log data", () => {
    logInfo({
      event: "test.event",
      module: "test-module",
      data: {
        apiKey: "secret-key",
        password: "my-password",
        safeField: "safe-value"
      }
    });

    const lastLog = JSON.parse(logSpy.mock.calls[0][0] as string);
    expect(lastLog.data.apiKey).toBe("[REDACTED]");
    expect(lastLog.data.password).toBe("[REDACTED]");
    expect(lastLog.data.safeField).toBe("safe-value");
  });

  it("logs errors with truncated stack traces", () => {
    const error = new Error("Test error");
    logError({
      event: "error.event",
      module: "test-module"
    }, error);

    const lastLog = JSON.parse(errorSpy.mock.calls[0][0] as string);
    expect(lastLog.severity).toBe("ERROR");
    expect(lastLog.error.message).toBe("Test error");
    expect(lastLog.error.stack).toBeDefined();
    expect(lastLog.error.stack.split("\n").length).toBeLessThanOrEqual(5);
  });

  it("logs audit events with NOTICE severity", () => {
    logAudit({
      event: "audit.event",
      module: "test-module"
    });

    const lastLog = JSON.parse(logSpy.mock.calls[0][0] as string);
    expect(lastLog.severity).toBe("NOTICE");
  });
});
