import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/assets/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                // Custom fonts
                graffity: ["var(--font-graffity)", "sans-serif"],
                "graffity-fill": ["var(--font-graffity-fill)", "sans-serif"],
                test: ["var(--font-test)", "sans-serif"],
                
                // System fonts
                sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
                mono: ["var(--font-geist-mono)", "monospace"],
            },
            colors: {
                // Add your brand colors here for consistency
                brand: {
                    purple: "#B19EEF",
                    blue: "#5227FF",
                    accent: "#ff6b6b",
                    dark: "#0c505e",
                }
            },
            animation: {
                // Custom animations
                "fade-in": "fadeIn 0.5s ease-in-out",
                "slide-up": "slideUp 0.3s ease-out",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { transform: "translateY(20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
            },
        },
    },
    plugins: [],
};

export default config;