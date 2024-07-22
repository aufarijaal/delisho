import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "node_modules/daisyui/dist/**/*.js",
        "node_modules/react-daisyui/dist/**/*.js",
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
                serif: ["DM Serif Display", ...defaultTheme.fontFamily.serif],
            },
        },
    },

    plugins: [forms, require("daisyui")],
    daisyui: {
        themes: [
            {
                delisho: {
                    primary: "#18181b",
                    "primary-content": "#fff",
                    secondary: "#A56D46",
                    "secondary-content": "#fff",
                    accent: "#f97316",
                    "accent-content": "#fff",
                    neutral: "#110f0a",
                    "neutral-content": "#fff",
                    "base-100": "#ffffff",
                    "base-200": "#dedede",
                    "base-300": "#bebebe",
                    "base-content": "#161616",
                    info: "#22d3ee",
                    "info-content": "#000",
                    success: "#34d399",
                    "success-content": "#000",
                    warning: "#fbbf24",
                    "warning-content": "#000",
                    error: "#fb7185",
                    "error-content": "#000",
                },
            },
            // {
            //     "delisho-dark": {
            //         primary: "#fafafa",
            //         "primary-content": "#000",
            //         secondary: "#A56D46",
            //         "secondary-content": "#0a0402",
            //         accent: "#f97316",
            //         "accent-content": "#150500",
            //         neutral: "#110f0a",
            //         "neutral-content": "#c9c8c7",
            //         "base-100": "#18181b",
            //         "base-200": "#131316",
            //         "base-300": "#0f0f11",
            //         "base-content": "#cbcbcc",
            //         info: "#22d3ee",
            //         "info-content": "#001014",
            //         success: "#34d399",
            //         "success-content": "#011008",
            //         warning: "#fbbf24",
            //         "warning-content": "#150d00",
            //         error: "#fb7185",
            //         "error-content": "#150406",
            //     },
            // },
        ],
        // darkTheme: "delisho-dark", // name of one of the included themes for dark mode
        // base: true, // applies background color and foreground color for root element by default
        // styled: true, // include daisyUI colors and design decisions for all components
        // utils: true, // adds responsive and modifier utility classes
        // prefix: "dlsh", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
        // logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
        // themeRoot: ":root", // The element that receives theme color CSS variables
    },
};
