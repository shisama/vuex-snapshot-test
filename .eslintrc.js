module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'jest/globals': true
  },
  'extends': [
    'standard',
    'prettier'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018
  },
  'plugins': [
    'jest',
    'prettier'
  ],
  'rules': {
    'prettier/prettier': 'error',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error'
  }
}