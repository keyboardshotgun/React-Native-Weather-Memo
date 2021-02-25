module.exports = {
  root: true,
  extends: ["airbnb",'@react-native-community'],
  parser: "babel-eslint",
  parserOptions: {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  env: {
    "browser": true,
    "node": true,
    "es6": true
  },
  plugins: [
    "import",
    "react-hooks"
  ],
  rules : {
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "no-console": "off",
    "no-underscore-dangle": "off",
    "react/forbid-prop-types": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-one-expression-per-line": "off",
    "object-curly-newline": "off",
    "linebreak-style": "off",
    "no-param-reassign": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
};
