module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
  ],
  rules: {
    'comma-dangle': 'off',
    'class-methods-use-this': 'off',
    'vue/no-multiple-template-root': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'implicit-arrow-linebreak': 'off',
    'import/prefer-default-export': 'off',
    "vue/component-name-in-template-casing": ["error", "kebab-case", {
      "ignores": []
    }],  },
};