module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],

  parserOptions: {
    parser: 'babel-eslint'
  },

  rules: {
    'space-before-function-paren': 0,
    'no-console': 'off',
    'no-debugger': 'off',
    indent: [
      'off',
      2
    ],
    'no-irregular-whitespace': 'off'
  },

  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ]
}
