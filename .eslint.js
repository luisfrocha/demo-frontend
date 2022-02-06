module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
    jquery: true,
  },

  rules: {
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
        imports: 'always-multiline',
        objects: 'always-multiline',
      },
    ],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreUrls: true,
      },
    ],
    'no-console': 'off',
    'no-debugger': 'off',
    'no-unused-vars': 'off',
    'prettier/prettier': {
      quotes: 'single',
    },
    'quote-props': ['error', 'as-needed'],
    quotes: ['error', 'single'],
    'space-before-blocks': ['error', 'always'],
    'space-in-brackets': ['error', 'always'],
    'space-in-parens': ['error', 'never'],
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    'vue/no-v-html': 'off',
    'vue/valid-template-root': 'off',
    'vue/script-indent': [
      'error',
      2,
      {
        baseIndent: 1,
        ignores: [],
        switchCase: 1,
      },
    ],
  },
};
