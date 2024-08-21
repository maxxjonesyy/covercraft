/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        wf: ["WFVisualSans", "sans-serif"],
        fontWeight: {
          regular: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
        },
      },

      colors: {
        primary: "#292929",
        secondary: "#d1d5db",
        accentBlue: "#3943B7",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
