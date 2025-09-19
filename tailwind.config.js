/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background_dark: "#FFFFFF1A",
        "light-black": "#1C1C1C",
        "primary-brand": "#C6C7F8",
      },
      height: {
        navbar: "68px",
      },
      width: {
        sidebar: "212px",
      },
      fontSize: {
        sm: ["14px", { lineHeight: "20px" }],
      },
    },
  },
  plugins: [],
};
