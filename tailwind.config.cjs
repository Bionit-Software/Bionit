/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {

        primary: "#F0533E",
        secondary: "#ffed4a",
        background: "#272727",
        light_grey: "#9B9B9B",
        gradient_gray: "#37302F",
        primary_hover: "#CC3824",
        input:"#404040",
        linear:"linear-gradient(to bottom right, red, yellow)",
      },
    },
  },

  plugins: [],
};
