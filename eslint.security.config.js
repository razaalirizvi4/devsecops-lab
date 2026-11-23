module.exports = {
  plugins: ['security'],
  rules: {
    'security/detect-child-process': 'error',
    'security/detect-eval-with-expression': 'error',
    'security/detect-non-literal-regexp': 'warn',
    'security/detect-object-injection': 'warn',
  },
};
