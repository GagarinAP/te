module.exports = {
  root: true,
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "@react-native-community",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
  ],
  plugins: ["react", "@typescript-eslint", "prettier", "import"],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    "prettier/prettier": ["error", { singleQuote: false }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/ban-ts-comment": "warn",
    "react-native/no-inline-styles": 2,
    "import/order": ["error", { groups: [["builtin", "external", "internal"]] }],
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
};
