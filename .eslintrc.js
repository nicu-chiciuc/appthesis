module.exports = {
  'parser': 'babel-eslint',
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'node': true
  },
  'extends': ['eslint:recommended', 'plugin:react/recommended'],
  'parserOptions': {
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      'jsx': true
    },
    'sourceType': 'module'
  },
  'plugins': [ 'react' ],
  'rules': {
    'linebreak-style': ['error','unix'],
    'quotes': ['error','single'],
    'semi': ['error','never'],
    'indent': ['error', 'tab', { SwitchCase: 1 }],
    'react/prop-types': [0],
    'no-unused-vars': [1],
    eqeqeq: ["error", "always"],
    'no-console': ['warn', { 'allow': ['info', 'error', 'log'] }],
  }
}