/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        softGray: '#D9D9D9',
        lightGray: '#f5f5f5',
        darkGray: '#858585',
        lightBlue: '#4678A5',
        darkBlue: '#00305B',
        urgent: '#F65E5E',
        high: '#F59300',
        medium: '#F9E323',
        low: '#83D25D',
        highlight_urgent: '#f72a2a',
        highlight_high: '#fa7e02',
        highlight_medium: '#f7cf02',
        highlight_low: '#50cc14',
      }
    },
  },
  plugins: [],
}