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
          100: "#f1e7e1",
          200: "#e4cfc3",
          300: "#d6b6a5",
          400: "#c99e87",
          500: "#bb8669",
          600: "#966b54",
          700: "#70503f",
          800: "#4b362a",
          900: "#251b15",
        },
      },
      translate: {
        "14": "3.5rem",
        "18": "4.5rem",
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1D1D1F",
          secondary: "#4A4A4A",
          accent: "9D4515",
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
