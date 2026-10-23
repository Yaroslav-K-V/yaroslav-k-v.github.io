import js from '@eslint/js';

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
];
