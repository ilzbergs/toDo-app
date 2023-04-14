/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

  theme: {
    screens: {
      md: "768px",
      lg: "1024px",
      xl: "1400px"
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
};