import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  // 1) Global ignores
  {
    ignores: ['dist/**', 'node_modules/**'],
  },

  // 2) TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      prettier: prettierPlugin,
      // Optional: uncomment if you install nestjs-typed
      // 'nestjs-typed': require('eslint-plugin-nestjs-typed'),
    },
    extends: [
      'plugin:@typescript-eslint/strict-type-checked',
      'plugin:@typescript-eslint/stylistic-type-checked',
      'plugin:prettier/recommended',
      // Optional: 'plugin:@darraghor/nestjs-typed/recommended',
    ],
    rules: {
      // General best practices
      'prettier/prettier': 'error',
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unused-vars': 'warn',
      'no-implicit-coercion': 'error',
      eqeqeq: ['error', 'always'],

      // TypeScript best practices
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    },
  },
];
