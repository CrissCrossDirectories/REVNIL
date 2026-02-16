import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: false,
    environment: "node",
    include: ["functions/src/**/*.test.ts", "app/src/**/*.test.ts"],
    exclude: ["**/node_modules/**", "**/dist/**", "functions/lib/**"],
    alias: {
      "@": path.resolve(__dirname, "./app/src"),
    },
  },
});
