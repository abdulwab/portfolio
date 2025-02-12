import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: true
});

export default [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'react/no-unescaped-entities': 'error',
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  }
];
