import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        moss: {
          50: "#f3f7f4",
          100: "#e4ede7",
          200: "#c8dbcf",
          300: "#a3c2ae",
          400: "#6e9f83",
          500: "#4f8567",
          600: "#3d6d54",
          700: "#325946",
          800: "#2a4739",
          900: "#243c31",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
