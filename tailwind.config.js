/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        leaf: {
          50: "#f2faf3",
          100: "#e0f5e4",
          200: "#c2eacb",
          300: "#93d8a4",
          400: "#5cbe75",
          500: "#37a354",
          600: "#278542",
          700: "#216937",
          800: "#1e542f",
          900: "#1a4529",
          950: "#0b2615",
        },
        lime2: "#b4e34a",
      },
      fontFamily: {
        display: ["'Bricolage Grotesque'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,38,21,.06), 0 8px 24px -12px rgba(11,38,21,.18)",
      },
    },
  },
  plugins: [],
};
