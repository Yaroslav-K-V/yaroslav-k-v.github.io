import js from '@eslint/js';
import { transform } from 'sucrase';
import * as espree from 'espree';

const tsEspreeParser = {
  meta: {
    name: 'ts-espree-parser',
    version: '1.0.0',
  },
  parseForESLint(code, options = {}) {
    const isTsx = options.filePath?.endsWith('.tsx');
    const transpiled = transform(code, {
      transforms: isTsx ? ['typescript', 'jsx'] : ['typescript'],
      jsxRuntime: 'preserve',
      disableESTransforms: true,
    });

    const ast = espree.parse(transpiled.code, {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
      loc: true,
      range: true,
      raw: true,
      tokens: true,
      comment: true,
    });

    return {
      ast,
      services: {},
      scopeManager: null,
      visitorKeys: espree.VisitorKeys,
    };
  },
};

export default [
  js.configs.recommended,
  {
    files: ['scripts/**/*.js', '*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
      },
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsEspreeParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // TypeScript compiler (tsc --noEmit) strictly checks types, globals, and unused locals/params
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'no-debugger': 'error',
      'no-duplicate-case': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-unreachable': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
    },
  },
];
