/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background_dark: "#FFFFFF1A",
        "light-black": "#1C1C1C",
      },
      height: {
        navbar: "68px",
      },
    },
  },
  plugins: [],
};
