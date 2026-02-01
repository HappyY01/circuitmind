import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                google: {
                    blue: "#1A73E8",
                    surface: "#FFFFFF",
                    background: "#F8F9FA",
                    text: "#202124",
                    textSecondary: "#5F6368",
                    border: "#DADCE0",
                    hover: "#E8F0FE",
                },
            },
            fontFamily: {
                sans: ["Inter", "Roboto", "system-ui", "sans-serif"],
            },
            boxShadow: {
                sm: "0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15)",
                md: "0 1px 3px 0 rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15)",
            },
        },
    },
    plugins: [],
};

export default config;
