const esLint = {
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    settings: {
        react: {
            version: "detect", // Automatically detect the version of React to use
        },
        "import/resolver": {
            typescript: {}, // This loads <rootdir>/tsconfig.json to eslint
        },
    },
    extends: [
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
    ],
    overrides: [
        {
            files: [".eslintrc.{js,ts,cjs,tsx}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json", // Specify the path to your TypeScript config file
        tsconfigRootDir: __dirname,
        ecmaVersion: "latest", // Allows for the parsing of modern ECMAScript features
        sourceType: "module", // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    plugins: [
        "@typescript-eslint",
        "react",
        "react-hooks",
        "jsx-a11y",
        "import",
    ],
    rules: {
        "jsx-a11y/label-has-associated-control": [
            2,
            {
                labelComponents: ["CustomLabel"],
                labelAttributes: ["inputLabel"],
                controlComponents: ["CustomInput"],
                assert: "both",
                depth: 3,
            },
        ],
        semi: "off",
        quotes: ["error", "double"],
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-unused-vars": [
            "warn", // Change this line to 'warn'
            { argsIgnorePattern: "^_" },
        ],
    },
};

//   "rules": {
//     "jsx-a11y/label-has-associated-control": [ 2, {
//       "labelComponents": ["CustomLabel"],
//       "labelAttributes": ["inputLabel"],
//       "controlComponents": ["CustomInput"],
//       "assert": "both",
//       "depth": 3,
//     }],
//   }


module.exports = esLint