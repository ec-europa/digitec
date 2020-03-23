module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react', 'prettier/unicorn'],
  plugins: ['compat', 'prettier'],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    // Turn on
    'compat/compat': 'error',

    // Turn off
    'no-console': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/no-danger': 'off',
    'react/forbid-prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',

    // Tweak
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        labelComponents: ['CustomInputLabel'],
        labelAttributes: ['label'],
        controlComponents: ['CustomInput'],
        depth: 3,
      },
    ],
    'prettier/prettier': ['error', { trailingComma: 'es5', singleQuote: true }],
  },
  settings: {
    polyfills: ['Object.entries', 'window.scrollY'],
  },
};
