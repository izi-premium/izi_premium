import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  // Base JavaScript recommended rules
  js.configs.recommended,

  // Next.js configurations (includes React, React Hooks, and Next.js rules)
  ...compat.extends(
    "next/core-web-vitals", // Includes react, react-hooks, next plugins
    "next/typescript", // TypeScript-specific Next.js rules
    "prettier" // Keep prettier last to override conflicting rules
  ),

  // TypeScript files configuration
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },
    rules: {
      // TypeScript-specific rules (beyond what Next.js provides)
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/prefer-const": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
        },
      ],
      "@typescript-eslint/no-import-type-side-effects": "error",

      // Override Next.js defaults if needed
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },

  // JavaScript/JSX files configuration
  {
    files: ["**/*.{js,jsx}"],
    rules: {
      // Only override defaults when necessary
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },

  // Configuration files
  {
    files: ["*.config.{js,mjs,ts}", "tailwind.config.{js,ts}"],
    rules: {
      "import/no-default-export": "off",
    },
  },

  // Global ignore patterns
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "dist/**",
      "build/**",
      ".vercel/**",
      "public/**",
    ],
  },
];

export default eslintConfig;
