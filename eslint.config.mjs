import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  {
    rules: {
      "no-unused-vars": "error",
      "no-unused-expression":"error",
      "prefer-constant":"error",
      "no-console":"warn"
    },
    "globals":{
    "process":"readonly"
  }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];