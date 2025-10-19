module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint', // or '@babel/eslint-parser' if you're using that
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['vue'],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended' // or 'plugin:vue/recommended' for Vue 2
  ],
  rules: {
    // You can also customize rules here
  },
};