/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './page/**/*.{js,ts,jsx,tsx}',
    './ui/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    styled: false,
    themes: ['cupcake', 'business'],
    logs: false,
    darkTheme: 'business',
  },
};
