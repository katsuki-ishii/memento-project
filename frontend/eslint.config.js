const { FlatCompat } = require('@eslint/eslintrc');
const path = require('node:path');
const fileURLToPath = require('node:url');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {
    extends: ['eslint:recommended']
  }
});

module.exports = [
  ...compat.extends(
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier'
  ),
  {
    rules: {
      // あなたのカスタムルール
    }
  }
];