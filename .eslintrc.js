module.exports = {
    "extends": "eslint:recommended",
    "globals": {
      "atom": true
    },
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "atomtest": true
    },
    "rules": {
        "semi": "error",
        "no-console": ["error", {allow: ["warn", "error"]}]
    },
    "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module"
    }
};
