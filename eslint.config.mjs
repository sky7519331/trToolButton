import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  {
    rules: {
      semi: "error", //用來檢查是否有加分號
      "prefer-const": "error", //用來檢查是否在宣告不會更動的變數時使用const
      "no-return-await": "warn", //用來檢查是否在async function中使用return await
      "no-const-assign": "error", // 用來檢查是否有對const變數重新賦值
      "no-unused-vars": "warn", // 用來檢查未使用的變數
      "@typescript-eslint/no-unused-vars": "warn", // 用來檢查未使用的變數
    },
  }
]);
