/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],  
  theme: {
    extend: {
      fontFamily: {
        'pacifico': ['"Pacifico"', 'cursive'],
        'monserrat': ['"Montserrat"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

