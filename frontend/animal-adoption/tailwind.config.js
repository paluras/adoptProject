/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        background: '#f6f3e9'
      },
      colors: {
        primary: '#f6f3e9',
        secondary: '#232f61',
        third: "#ff4e4e",
        forth: "#fea485"

      },

      textColor: {
        main: "#232f61"
      },

      fontFamily: {
        yeasty: ["Yeasty Flavors", 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
