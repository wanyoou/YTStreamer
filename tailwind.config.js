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
    themes: [
      {
        cupcake: {
          ...require('daisyui/src/colors/themes')['[data-theme=cupcake]'],
          'base-100': '#FFFBF5',
          'base-200': '#F7EFE5',
          'base-300': '#C3ACD0',
          'base-content': '#674188',
        },
      },
      'business',
    ],
    logs: false,
    darkTheme: 'business',
  },
};
