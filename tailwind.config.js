/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './page/**/*.{js,ts,jsx,tsx}', './ui/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        cupcake: {
          ...require('daisyui/src/colors/themes')['[data-theme=cupcake]'],
          primary: '#DEB6AB',
          'primary-focus': '#AC7D88',
          'primary-content': '#85586F',
          neutral: '#EED6C4',
          'neutral-focus': '#6B4F4F',
          'neutral-content': '#483434',
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
