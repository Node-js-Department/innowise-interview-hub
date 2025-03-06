/** @type {import('eslint').Linter.Config} */
module.exports = [
  {
    files: ['*.js', '*.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        node: 'readonly',
        es2020: 'readonly',
      },
    },
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'warn',
    },
  },
];
