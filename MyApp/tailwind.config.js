/** @type {import('tailwindcss').Config} */

// const colors = require("tailwindcss/colors");

module.exports = {
    content: ["./public/index.html", "./src/**/*.{js,tsx,jsx,ts}"],
    theme: {
        extend: {},
        colors: {
            transparent: "transparent",
            current: "currentColor",
            white: "#ffffff",
            yellow: "#ffc107",
            purple: "#3f3cbb",
            midnight: "#121063",
            metal: "#565584",
            tahiti: "#3ab7bf",
            silver: "#ecebff",
            "bubble-gum": "#ff77e9",
            bermuda: "#78dcca",
            gray: "#6c757d",
            "gray-dark": "#343a40",
            primary: "#7a8ea3",
            secondary: "#6c757d",
            light: "#f8f9fa",
            dark: "#343a40",
            sky: "#38BDF8",
            error: "#cc0000",
            success: "#4bb543",
        },
        "min-height": {
            "min-h-dvh": "100dvh",
        },
        left: {
            "-left-2": "-0.5rem",
            "-left-4": "-1rem",
            "-left-6": "-1.5rem",
            "-left-8": "-2rem",
        },
    },
    plugins: [],
};
