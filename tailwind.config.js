/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: '#090708',
          obsidian: '#0B080A',
          surface: '#120C10',
          card: '#181015',
          elevated: '#1F131B',
          border: '#331622',
        },
        ivory: {
          DEFAULT: '#F6F0E8',
          light: '#FAF7F2',
          dark: '#DDD5CA',
        },
        burgundy: {
          DEFAULT: '#652E3C',
          light: '#833449',
          dark: '#4A1D29',
          vivid: '#9B2C46',
          rose: '#D2798F',
        },
        wine: {
          DEFAULT: '#36141E',
          deep: '#200A11',
          hover: '#4A1926',
        },
        charcoal: {
          DEFAULT: '#F6F0E8',
          light: '#FAF7F2',
          muted: '#C4B5AE',
          dark: '#140D12',
        },
        gold: {
          DEFAULT: '#C5A059',
          light: '#DFBF7C',
          dark: '#9E7A3E',
        },
        rose: {
          DEFAULT: '#D2798F',
          light: '#E89AA8',
          dark: '#9B2C46',
        },
        stone: {
          DEFAULT: '#2F1822',
          light: '#C4B5AE',
          dark: '#1E0E15',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        editorial: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        sans: ['Inter', '"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'book': '0 8px 24px -4px rgba(0, 0, 0, 0.6), 0 2px 6px -1px rgba(101, 46, 60, 0.25)',
        'book-hover': '0 20px 32px -8px rgba(101, 46, 60, 0.4), 0 6px 16px -2px rgba(0, 0, 0, 0.7)',
        'subtle': '0 2px 8px rgba(0, 0, 0, 0.4)',
        'modal': '0 25px 50px -12px rgba(0, 0, 0, 0.85), 0 0 24px rgba(101, 46, 60, 0.25)',
      },
    },
  },
  plugins: [],
};
