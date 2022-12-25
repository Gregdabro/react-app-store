module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard', 'plugin:react/jsx-runtime'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/display-name': 'off',
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'prefer-const': 'warn',
    camelcase: 'off',
    indent: [0, 4],
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
        avoidEscape: true
      }
    ],
    'comma-dangle': ['error', 'never'],
    'space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'never' }
    ],
    'react/prop-types': 'off',
    'spaced-comment': ['warn', 'always'],
    'multiline-ternary': ['off']
  }
}
