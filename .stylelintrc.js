module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-sass-guidelines',
    'stylelint-config-css-modules',
    'stylelint-config-prettier',
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['function', 'if', 'each', 'include', 'mixin'],
      },
    ],
    'declaration-property-value-blacklist': {
      '/^border/': [],
    },
    'selector-class-pattern': null,
    'selector-max-compound-selectors': 4,
    'max-nesting-depth': [
      3,
      {
        ignore: ['pseudo-classes'],
      },
    ],
  },
};
