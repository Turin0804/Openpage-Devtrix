import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: ["selector", '[data-theme="dark"]'],
    theme: {
        extend: {
            colors: {
                accent: "#F8F1E7",
                primary: "#E7700D",
            },
            fontFamily: {
                rye: ["Rye", "serif"],
                sans: ["Inter", "ui-sans-serif", "system-ui"],
            },
        },
    },
    plugins: [daisyui],
    daisyui: {
        themes: [
            {
                light: {
                    "base-100": "#fafaf8",
                    "base-200": "#f4f3ef",
                    "base-300": "#e8e7e2",
                    primary: "#E7700D",
                    "primary-content": "#ffffff",
                },
            },
            {
                dark: {
                    "base-100": "#09090b",
                    "base-200": "#18181b",
                    "base-300": "#27272a",
                    primary: "#E7700D",
                    "primary-content": "#ffffff",
                },
            },
        ],
    },
};
