require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  parser: 'vue-eslint-parser',
  plugins: ['vue', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  ignorePatterns: [
    '*.cs',
    '*.cshtml',
    'node_modules/',
    '*.analytics.js',
    'dist/',
    '*.story.vue'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  rules: {
    'max-len': [1, { code: 120 }],
    'linebreak-style': [1, 'windows'],
    'require-jsdoc': 0,
    'no-invalid-this': 0,
    'vue/no-deprecated-slot-attribute': 'off',
  },
};

