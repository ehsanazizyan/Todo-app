const commonStyles = {
    "error-500": "#c52c17",
};

const lightTheme = {
    lightTheme: {
        ...require("daisyui/src/theming/themes")["light"],
        primary: "#605BFF",
        noStarted: "#f31a08",
        secondary: "#E5E4F4",
        accent: "#ddd6fe",
        neutral: "#f3f4f6",
        info: "#bfdbfe",
        success: "#4ade80",
        warning: "#fcd34d",
        error: "#FF6855",
        ...commonStyles,
    },
};
const darkTheme = {
    darkTheme: {
        ...require("daisyui/src/theming/themes")["dark"],
        primary: "#605BFF",
        secondary: "#1e1230",
        accent: "#a78bfa",
        neutral: "#1f2937",
        "base-100": "#111827",
        info: "#bfdbfe",
        success: "#4ade80",
        warning: "#fcd34d",
        error: "#FF6855",
        ...commonStyles,
    },
};

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                mainStarted: "#fcfcfa",
                started: "#e3e2e0",
                dotStarted: "#91918e",
                mainProgress: "#f5fafc",
                progress: "#ccdfe9",
                dotProgress: "#5b97bd",
                mainReview: "#fbf5e4",
                review: "#f9e4bc",
                dotReview: "#d9ad5d",
                mainDone: "#f7faf7",
                done: "#dbeddb",
                dotDone: "#6c9b7d",
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        styled: true,
        themes: [lightTheme, darkTheme],
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        themeRoot: ":root",
    },
};
