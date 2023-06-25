/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'raleway': ['var(--font-raleway)'],
        'josefin_sans': ['var(--font-josefin_sans)'],
        'montserrat': ['var(--font-montserrat)'],
        'inter': ['var(--font-inter)'],
        'roboto': ['var(--font-roboto)'],
        'aBeeZee': ['var(--font-aBeeZee)'],
        'alice': ['var(--font-alice)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
