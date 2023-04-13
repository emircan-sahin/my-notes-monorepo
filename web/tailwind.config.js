/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#1A1D1E",
        danger: '#DA5745'
      }
    },
    // add container here
    container: {
      center: true,
      padding: '1rem',
    }
  },
  plugins: [],
}

