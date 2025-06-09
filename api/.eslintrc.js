module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
    // Optional: 'nestjs-typed',
  ],
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
    'eqeqeq': ['error', 'always'],

    // TypeScript best practices
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

    // Add or override additional rules as needed
  },
  ignorePatterns: ['dist/', 'node_modules/'],
};
