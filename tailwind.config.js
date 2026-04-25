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
        sans:    ['DM Sans', 'sans-serif'],
        syne:    ['Syne', 'sans-serif'],
        display: ['Bebas Neue', 'sans-serif'],
        dm:      ['DM Sans', 'sans-serif'],
      },
      colors: {
        dark: { DEFAULT: '#03050d', 2: '#060a18' },
      },
      transitionDuration: { '400':'400ms', '600':'600ms', '800':'800ms' },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34,1.56,0.64,1)',
        'out':    'cubic-bezier(0.16,1,0.3,1)',
      },
      animation: {
        'float-a': 'floatA 7s ease-in-out infinite',
        'float-b': 'floatB 5s ease-in-out infinite',
        'float-c': 'floatC 9s ease-in-out infinite',
        'glow':    'glowPulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
