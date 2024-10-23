import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import sonarjs from 'eslint-plugin-sonarjs';

export default [
  eslint.configs.recommended,
  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslint,
      'sonarjs': sonarjs
    },
    languageOptions: {
      parser: tsparser,
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      // TypeScript Specific

      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', {
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_'
      }],
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          'selector': 'interface',
          'format': ['PascalCase'],

        },
        {
          'selector': 'class',
          'format': ['PascalCase']
        }
      ],

      // Backend Specific
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-return-await': 'error',
      'require-await': 'error',
      'no-async-promise-executor': 'error',
      'no-promise-executor-return': 'error',
      'max-nested-callbacks': ['error', 3],

      // Code Quality (SonarJS)
      'sonarjs/cognitive-complexity': ['error', 15],
      'sonarjs/no-duplicate-string': 'error',
      'sonarjs/no-identical-functions': 'error',
      'sonarjs/no-collapsible-if': 'error',
      'sonarjs/no-redundant-jump': 'error',
      'sonarjs/no-unused-collection': 'error',

      // Error Prevention
      'no-unused-expressions': 'error',
      'no-throw-literal': 'error',
      'prefer-promise-reject-errors': 'error',
      'no-param-reassign': 'error',

      // Clean Code
      'max-lines-per-function': ['error', {
        max: 50,
        skipBlankLines: true,
        skipComments: true
      }],
      'max-depth': ['error', 3],
      'complexity': ['error', 10],

      // API Specific
      'consistent-return': 'error',
      'no-fallthrough': 'error',
    }
  }
];