/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#C3CC5A",
        dark: "#222222",
        darker: "#303030",
        black: "#000000",
        white: "#FFFFFF",
      },
      fontFamily: {
        sofia: ["Sofia Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
