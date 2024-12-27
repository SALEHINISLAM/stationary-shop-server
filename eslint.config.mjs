import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

export default {
  ignores: ['node_modules', 'dist'],
  files: ['src/**/*.ts'],
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    parser: typescriptParser,
    parserOptions: {
      project: './tsconfig.json', // Ensure this path points to your tsconfig.json
    },
  },
  plugins: {
    '@typescript-eslint': typescriptPlugin,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
