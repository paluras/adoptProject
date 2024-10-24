import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
      'sonarjs': sonarjsPlugin,
      'import': importPlugin
    },
    rules: {
      // TypeScript
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',

      // React
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Code Quality (SonarJS)
      'sonarjs/cognitive-complexity': ['error', 15],
      'sonarjs/no-duplicate-string': 'warn',
      'sonarjs/no-identical-functions': 'error',

      // Import Organization
      'import/order': ['error', {
        'groups': ['builtin', 'external', 'internal'],
        'pathGroups': [{
          'pattern': 'react',
          'group': 'external',
          'position': 'before'
        }],
        'newlines-between': 'always',
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true
        }
      }],

      // General
      'complexity': ['warn', 10],
      'max-lines': ['warn', 300],
      'no-console': 'warn',
      'no-duplicate-imports': 'error',
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    // Specific rules for test files
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    rules: {
      'max-lines': 'off',
      'sonarjs/no-duplicate-string': 'off'
    }
  }
];