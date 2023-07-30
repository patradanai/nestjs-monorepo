module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'simple-import-sort',
    'security',
    'sonarjs',
    'jest',
    'unicorn',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    "plugin:@typescript-eslint/eslint-recommended",
    'plugin:prettier/recommended',
    'plugin:security/recommended',
    'plugin:you-dont-need-lodash-underscore/compatible',
    'plugin:sonarjs/recommended',
    'plugin:jest/recommended',
    'plugin:unicorn/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'unicorn/prevent-abbreviations': 'off',
    'jest/expect-expect': 'off',
    'unicorn/prefer-top-level-await': 'off',
    "unicorn/filename-case": [
      "error",
      {
        "case": "camelCase"
      }
    ],
    '@typescript-eslint/naming-convention': [
      "error",
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "custom": {
          "regex": "^I[A-Z]",
          "match": true
        }
      }
    ],
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-explicit-any': ['error'],
    'security/detect-object-injection': ['error'],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'max-len': [
      'error',
      {
        code: 120,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreUrls: true,
      },
    ],
    'no-console': ['error'],
    complexity: ['error', 5],
    'spaced-comment': [2, 'always'],
  },
}
