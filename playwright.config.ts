import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./features", 
  timeout: 30 * 1000,
  retries: 1,
  use: {
    headless: true,
    trace: "on-first-retry",
  },
});
