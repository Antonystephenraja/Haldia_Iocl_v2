/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        "dark_color": "#0B0833",
        "light-white": "rgba(255,255,255,0.17)",
      }
    },
  },
  plugins: [],
}

