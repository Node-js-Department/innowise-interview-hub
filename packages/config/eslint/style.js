/** @type {import('stylelint').Config} */
module.exports = {
  plugins: ["@stylistic/stylelint-plugin"],
  extends: ["@stylistic/stylelint-config"],
  rules: {
    '@stylistic/selector-combinator-space-after': 'always', 
  }
}
