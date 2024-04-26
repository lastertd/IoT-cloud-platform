module.exports = {
  root: true,
  extends: ["@nuxt/eslint-config", "@nuxtjs/eslint-config-typescript", "prettier"],
  plugins: ["prettier"],
  rules: {
    "import/named": "off",
    "prettier/prettier": "warn",
    "@typescript-eslint/no-unused-vars": "off",
    "no-console": "off"
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "valid-jsdoc": 0
      }
    }
  ]
};
