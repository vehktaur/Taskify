/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'winter-400': '#27374D',
        'winter-300': '#526D82',
        'winter-200': '#9DB2BF',
        'winter-100': '#DDE6ED',
        'summer-100': '#FFFBDA',
        'summer-200': '#FFEC9E',
        'summer-300': '#FFBB70',
        'summer-400': '#ED9455',
      }
    }
  },
  plugins: []
};
