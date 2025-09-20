/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background_dark: "#FFFFFF1A",
        "light-black": "#1C1C1C",
        primary: {
          brand: "#C6C7F8",
          blue: "#E3F5FF",
          purple: "#E5ECF6",
          light: "#F7F9FB",
        },
        secondary: {
          indigo: "#95A4FC",
          green: "#A1E3CB",
          blue: "#B1E3FF",
          yellow: "#FFE999",
        },
        progress: "#8A8CD9",
        complete: "#4AA785",
        pending: "#59A8D4",
        approved: "#FFC555",
      },
      height: {
        container: "calc(100vh - 68px)",
        navbar: "68px",
      },
      width: {
        sidebar: "212px",
        rightSidebar: "280px",
      },
      fontSize: {
        sm: ["14px", { lineHeight: "20px" }],
      },
    },
  },
  plugins: [],
};
