/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import { light, dark } from "daisyui/src/theming/themes";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          ...light,
          "base-100": "#ffffff",
          "base-200": "#f8f9fa",
          "base-300": "#e9ecef",
        },
        dark: {
          ...dark,
          "base-100": "#1a1a1a",
          "base-200": "#242424",
          "base-300": "#2c2c2c",
        },
      },
    ],
  },
  plugins: [daisyui],
};
