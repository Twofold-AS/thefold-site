// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/app/**/*.{ts,tsx}",
        "./src/components/**/*.{ts,tsx}",
        "./src/assets/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                graffity: ["var(--font-graffity)"],
                graffityFill: ["var(--font-graffity-fill)"],
                test: ["var(--font-test)"],
            },
        },
    },
    plugins: [],
};

export default config;
