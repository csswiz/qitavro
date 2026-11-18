/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F6F0E8',
          light: '#FAF6F0',
          dark: '#EBE2D5',
        },
        burgundy: {
          DEFAULT: '#652E3C',
          light: '#7A3849',
          dark: '#522531',
        },
        wine: {
          DEFAULT: '#421F2A',
          deep: '#331720',
          hover: '#3A1B25',
        },
        charcoal: {
          DEFAULT: '#272321',
          light: '#3C3734',
          muted: '#635C57',
        },
        gold: {
          DEFAULT: '#B69A72',
          light: '#C7B08E',
          dark: '#9E825A',
        },
        rose: {
          DEFAULT: '#C7A7A2',
          light: '#DAC1BD',
        },
        stone: {
          DEFAULT: '#DED6CC',
          light: '#EBE5DC',
          dark: '#C8BEB2',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        editorial: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        sans: ['Inter', '"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'book': '0 8px 24px -4px rgba(39, 35, 33, 0.12), 0 2px 6px -1px rgba(39, 35, 33, 0.06)',
        'book-hover': '0 20px 32px -8px rgba(66, 31, 42, 0.2), 0 6px 12px -2px rgba(39, 35, 33, 0.08)',
        'subtle': '0 2px 8px rgba(39, 35, 33, 0.05)',
        'modal': '0 25px 50px -12px rgba(39, 35, 33, 0.25)',
      },
    },
  },
  plugins: [],
};
