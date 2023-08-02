/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bgWhite: {
          100: "#fdfdfd",
          200: "#fbfbfc",
          300: "#f9f9fa",
          400: "#f7f7f9",
          500: "#f5f5f7",
          600: "#c4c4c6",
          700: "#939394",
          800: "#626263",
          900: "#313131",
        },
        bgGray: {
          100: "#fbfafa",
          200: "#f6f5f5",
          300: "#f2f1f1",
          400: "#edecec",
          500: "#e9e7e7",
          600: "#bab9b9",
          700: "#8c8b8b",
          800: "#5d5c5c",
          900: "#2f2e2e",
        },
        bgRed: {
          100: "#f0deda",
          200: "#e0bcb5",
          300: "#d19b91",
          400: "#c1796c",
          500: "#b25847",
          600: "#8e4639",
          700: "#6b352b",
          800: "#47231c",
          900: "#24120e",
        },
      },
      translate: {
        14: "3.5rem",
        18: "4.5rem",
      },
      boxShadow: {
        "card-hover":
          "rgba(255, 255, 255, 0.4) -5px 5px, rgba(255, 255, 255, 0.3) -10px 10px, rgba(255, 255, 255, 0.2) -15px 15px, rgba(255, 255, 255, 0.1) -20px 20px, rgba(255, 255, 255, 0.05) -25px 25px",
      },
      animation: {
        simplePulse: "simplePulse 2s cubic-bezier(0.4, 0, 0.6, 1)  infinite",
      },
      keyframes: {
        simplePulse: {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: 1,
          },
          "50%": {
            transform: "scale(1.08)",
            opacity: 0.85,
          },
        },
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1D1D1F",
          secondary: "#4A4A4A",
          accent: "#b25847",
          neutral: "#191D24",
          "base-100": "#F5F5F7",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
};
