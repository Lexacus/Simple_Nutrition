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
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#6366f1",
          secondary: "#8b5cf6",
          accent: "#f43f5e",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#818cf8",
          secondary: "#a78bfa",
          accent: "#fb7185",
        },
      },
    ],
  },
  plugins: [daisyui],
};
