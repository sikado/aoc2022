module.exports = {
    env: {
        node: true,
        es2021: true,
    },
    ignorePatterns: ["vite.config.ts"],
    extends: ["standard-with-typescript", "prettier"],
    overrides: [
        {
            files: ["*.ts", "*.tsx"], // Your TypeScript files extension
            parserOptions: {
                project: ["./tsconfig.json"], // Specify it only for TypeScript files
            },
            rules: {
                "@typescript-eslint/explicit-function-return-type": "off",
                "no-unused-vars": "off",
                "@typescript-eslint/no-unused-vars": [
                    "warn",
                    { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
                ],
                "@typescript-eslint/no-non-null-assertion": "off",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {},
};
