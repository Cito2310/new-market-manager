import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default tseslint.config(
    { ignores: ["dist", "node_modules"] },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    prettier,
    {
        rules: {
            // Enforce arrow functions over function declarations (project style)
            "func-style": ["error", "expression", { allowArrowFunctions: true }],
            "prefer-arrow-callback": "error",
            "prefer-const": "error",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrors: "none",
                    ignoreRestSiblings: true,
                },
            ],
        },
    }
);
