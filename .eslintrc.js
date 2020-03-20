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
    'jsx-a11y/anchor-is-valid': 0,
    'react/forbid-prop-types': 0,
    'react/require-default-props': 0,
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        labelComponents: ['CustomInputLabel'],
        labelAttributes: ['label'],
        controlComponents: ['CustomInput'],
        depth: 3,
      },
    ],
    'compat/compat': 2,
    'prettier/prettier': [2, { trailingComma: 'es5', singleQuote: true }],
    'react/jsx-props-no-spreading': [2, { html: 'ignore' }],
  },
  settings: {
    polyfills: ['Object.entries'],
  },
};
