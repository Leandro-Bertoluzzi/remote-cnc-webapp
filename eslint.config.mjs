import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = [
    {
        ignores: [".next/**", "out/**", "coverage/**", "node_modules/**", "next-env.d.ts"],
    },
    ...nextCoreWebVitals,
    prettierConfig,
];

export default eslintConfig;
