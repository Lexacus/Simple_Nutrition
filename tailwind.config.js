/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["ligth"],
          "base-100": "#ffffff",
          "base-200": "#f8f9fa",
          "base-300": "#e9ecef",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "base-100": "#1a1a1a",
          "base-200": "#242424",
          "base-300": "#2c2c2c",
        },
        lex: {
          ...require("daisyui/src/theming/themes")["dark"],
          "primary": "#818cf8",
          "secondary": "#a78bfa",
          "accent": "#fb7185",
        }
      }
    ]
  },
  plugins: [daisyui],
};
