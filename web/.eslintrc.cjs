module.exports = {
  root: true,
  extends: ["@nuxt/eslint-config", "@nuxtjs/eslint-config-typescript", "prettier"],
  plugins: ["prettier"],
  rules: {
    "import/named": "off",
    "prettier/prettier": "warn",
    "@typescript-eslint/no-unused-vars": "off",
    "require-jsdoc": [
      "error",
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
          ArrowFunctionExpression: true,
          FunctionExpression: true
        }
      }
    ],
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
