/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'mid': '760px'
      },
      width: {
        '15': '60px',
        '35pr': '35%',
        '90pr': '90%',
        '70pr': '70%',
        '48pr': '48%',
        '30pr': '30%',
        '20pr': '20%',
        '60vw': '60vw',
        '90vw': '90vw',
      },
      borderRadius: {
        '2rem': '2rem',
      },
      height: {
        '35pr': '35%',
        '60vh': '60vh',
        '80vh': '80vh',
        '87vh': '87vh',
        '80pr': '80%',
        '90vh': '90vh',
      },
      letterSpacing: {
        '1': '1.4px',
        '2': '4.2px',
        '3': '5.2px'
      },
      fontFamily: {
        urbanist: ['var(--urbanist)']
      },
      fontSize: {
        '10px': '10px',
        '13px': '13px',
      },
      colors: {
        'gotham-black': '#383838',
        'pinky': "#FF4A60"
      },
      backgroundImage: {
        "pinky": "#FF4A60"
      },
      backgroundColor: {
        'gold': "#FF4A60",
        'subtle-white': "linear-gradient(180deg, rgba(0, 0, 0, 0), #FFFFFF 130%)",
        'gold-land': "#FF4A60",
        'metal-gold': "linear-gradient(270deg, rgba(250, 232, 146, 0.2) 0.02%, rgba(179, 144, 62, 0) 55.35%);"
      }
    }
  },
  plugins: [],
}
