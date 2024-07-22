import globals from "globals";
import pluginJs from "@eslint/js";

export default [
    {
        languageOptions: { globals: globals.browser },
        ignores: ["!node_modules/", "node_modules/*", "!dist/", "dist/*"],
    },
    pluginJs.configs.recommended,
];
