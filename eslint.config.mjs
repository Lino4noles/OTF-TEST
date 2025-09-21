import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "node_modules/",
      "test-results/",
      "playwright-report/",
      "blob-report/",
      "playwright/.cache/",
      ".features-gen/",
      "reports/",
      "allure-results/",
      "allure-report/",
      "log/",
      ".env*",
      "!.env.example",
      ".vscode/*",
      "!.vscode/settings.json"
    ]
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    languageOptions: { globals: globals.browser },
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "no-empty-pattern": "off"
    }
  },
  tseslint.configs.recommended
]);