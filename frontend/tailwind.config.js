/** @type {import('tailwindcss').Config} */
module.exports = {
  // important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./subcomponents/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gold' : "linear-gradient(180deg, #FAE892 0%, #B3903E 100%)",
      }
    }
  },
  plugins: [],
}
