/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
  "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: '#f95c58'
      },
      backgroundImage: {
        banner: `url('../public/images/banner.png')`
      }
    },
  },
  plugins: [],
}
